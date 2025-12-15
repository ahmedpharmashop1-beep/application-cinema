// Configuration TMDb
const TMDB_API_KEY = '24c376e6452d1701a62fa28fd5a06d3d';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMG_BASE = 'https://image.tmdb.org/t/p/w500';
const DEFAULT_LANGUAGE = 'fr-FR';
const FALLBACK_POSTER = 'https://via.placeholder.com/500x750?text=Affiche+indisponible';
const MAX_PAGES = 5; // nombre de pages à charger pour récupérer un maximum de films
const PAGE_SIZE = 20;
const THEME_KEY = 'cinema-theme';
const FAVORITES_KEY = 'cinema-favorites';

// Mapping des genres utilisés par les filtres
const GENRES = {
    action: { id: 28, label: 'Action' },
    drame: { id: 18, label: 'Drame' },
    comedie: { id: 35, label: 'Comédie' },
    'science-fiction': { id: 878, label: 'Science-Fiction' },
    aventure: { id: 12, label: 'Aventure' }
};

// Éléments DOM
const elements = {
    grid: document.getElementById('moviesGrid'),
    search: document.getElementById('searchInput'),
    searchBtn: document.getElementById('searchBtn'),
    filters: document.querySelectorAll('.filter-btn'),
    noResults: document.getElementById('noResults'),
    status: document.getElementById('statusMessage'),
    sort: document.getElementById('sortSelect'),
    pagination: document.getElementById('pagination'),
    prevPage: document.getElementById('prevPage'),
    nextPage: document.getElementById('nextPage'),
    pageInfo: document.getElementById('pageInfo'),
    themeToggle: document.getElementById('themeToggle'),
    modalTitle: document.getElementById('modalTitle'),
    modalOverview: document.getElementById('modalOverview'),
    modalGenres: document.getElementById('modalGenres'),
    modalPoster: document.getElementById('modalPoster'),
    modalMeta: document.getElementById('modalMeta'),
    modal: document.getElementById('playerModal'),
    modalLoader: document.getElementById('modalLoader'),
    modalMessage: document.getElementById('modalMessage'),
    playerFrame: document.getElementById('playerFrame'),
    modalClose: document.getElementById('modalClose')
};

// État de l'application
const state = {
    filter: 'all',
    search: '',
    movies: [],
    isLoading: false,
    error: '',
    favorites: new Set(loadFavorites()),
    sort: 'popularity.desc',
    page: 1
};

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    setupEvents();
    restoreTheme();
    loadInitialMovies();
});

// Chargement initial
function loadInitialMovies() {
    loadMovies({ endpoint: 'movie/popular', params: { pages: MAX_PAGES } });
}

// Récupération des films via TMDb
async function loadMovies({ endpoint, params = {} }) {
    if (!TMDB_API_KEY || TMDB_API_KEY === 'VOTRE_CLE_TMDB') {
        setStatus('Ajoutez votre clé TMDb dans app.js (const TMDB_API_KEY).', 'warning');
        return;
    }

    state.isLoading = true;
    setStatus('Chargement des films...', 'loading');
    elements.noResults.style.display = 'none';

    try {
        const pages = params.pages ?? 1;
        const results = await fetchMultiplePages(endpoint, params, pages);
        const mapped = results.map(mapMovieFromAPI);
        state.movies = mapped;
        state.page = 1;
        renderMovies();

        if (!mapped.length) {
            setStatus('Aucun film trouvé. Essayez un autre mot-clé ou filtre.', 'info');
        } else {
            clearStatus();
        }
    } catch (error) {
        console.error('Erreur TMDb', error);
        state.error = 'Impossible de récupérer les films. Vérifiez votre connexion ou votre clé TMDb.';
        elements.grid.innerHTML = '';
        elements.noResults.style.display = 'block';
        setStatus(state.error, 'error');
    } finally {
        state.isLoading = false;
    }
}

// Appel générique TMDb
async function fetchFromTMDB(endpoint, params = {}) {
    const url = new URL(`${TMDB_BASE_URL}/${endpoint}`);
    url.searchParams.set('api_key', TMDB_API_KEY);
    url.searchParams.set('language', DEFAULT_LANGUAGE);

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            url.searchParams.set(key, value);
        }
    });

    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error(`TMDb request failed: ${response.status}`);
    }
    return response.json();
}

// Récupère plusieurs pages TMDb pour multiplier le nombre de films
async function fetchMultiplePages(endpoint, params = {}, pages = 1) {
    const results = [];
    let totalPages = pages;

    for (let page = 1; page <= totalPages; page++) {
        const data = await fetchFromTMDB(endpoint, { ...params, page });
        if (data?.results) results.push(...data.results);
        if (page === 1 && data?.total_pages) {
            totalPages = Math.min(totalPages, data.total_pages);
        }
    }

    // supprime les doublons éventuels par id
    const deduped = Array.from(
        results.reduce((map, movie) => map.set(movie.id, movie), new Map()).values()
    );
    return deduped;
}

// Conversion des données TMDb vers notre modèle
function mapMovieFromAPI(movie) {
    const posterPath = movie.poster_path ? `${TMDB_IMG_BASE}${movie.poster_path}` : FALLBACK_POSTER;
    const ratingOnFive = Number((movie.vote_average / 2).toFixed(1));
    const yearValue = movie.release_date ? Number(movie.release_date.slice(0, 4)) : 0;

    return {
        id: movie.id,
        title: movie.title || movie.name || 'Titre indisponible',
        year: yearValue || '—',
        yearValue,
        rating: ratingOnFive,
        description: movie.overview || 'Synopsis indisponible pour ce film.',
        genreIds: movie.genre_ids || [],
        genres: (movie.genre_ids || [])
            .map(id => Object.values(GENRES).find(g => g.id === id)?.label)
            .filter(Boolean),
        poster: posterPath,
        popularity: movie.popularity || 0
    };
}

// Rendu des films (inclut le filtrage client)
function renderMovies() {
    const filtered = applyFilter(state.movies);
    const sorted = applySort(filtered);
    const { pageItems, totalPages } = applyPagination(sorted);
    displayMovies(pageItems);
    updatePagination(totalPages);
    attachCardListeners();
}

function applyFilter(list) {
    if (state.filter === 'favorites') {
        return list.filter(movie => state.favorites.has(movie.id));
    }
    if (state.filter === 'all') return list;
    const genre = GENRES[state.filter];
    if (!genre) return list;
    return list.filter(movie => movie.genreIds.includes(genre.id));
}

function applySort(list) {
    const [key, direction] = state.sort.split('.');
    const dir = direction === 'desc' ? -1 : 1;
    return [...list].sort((a, b) => {
        if (key === 'title') return a.title.localeCompare(b.title) * dir;
        if (key === 'release_date' || key === 'year') return ((a.yearValue || 0) - (b.yearValue || 0)) * dir;
        if (key === 'vote_average') return (a.rating - b.rating) * dir;
        if (key === 'popularity') return (a.popularity - b.popularity) * dir;
        return 0;
    });
}

function applyPagination(list) {
    const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
    const page = Math.min(state.page, totalPages);
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    state.page = page;
    return { pageItems: list.slice(start, end), totalPages };
}

// Affichage des films
function displayMovies(moviesArray) {
    elements.grid.innerHTML = moviesArray.length
        ? moviesArray.map(createMovieCard).join('')
        : (elements.noResults.style.display = 'block', '');

    if (moviesArray.length) elements.noResults.style.display = 'none';
}

// Création d'une carte de film
function createMovieCard(movie) {
    return `
        <article class="movie-card" data-movie-id="${movie.id}" role="button" tabindex="0">
            <div class="movie-poster">
                <button class="fav-btn ${state.favorites.has(movie.id) ? 'active' : ''}" data-fav-btn aria-label="Ajouter aux favoris">
                    <i class="fas fa-heart"></i>
                </button>
                <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <span class="movie-year">
                        <i class="far fa-calendar-alt"></i> ${movie.year}
                    </span>
                    <span class="movie-rating">
                        <i class="fas fa-star"></i> ${movie.rating}/5
                    </span>
                </div>
                <p class="movie-description">${movie.description}</p>
                <div class="movie-genres">
                    ${movie.genres.length ? movie.genres.map(g => `<span class="genre">${g}</span>`).join('') : ''}
                </div>
            </div>
        </article>
    `;
}

// Gestion de l'état du statut
function setStatus(message, type = 'info') {
    if (!elements.status) return;
    elements.status.textContent = message;
    elements.status.dataset.type = type;
    elements.status.className = `status-message ${type}`;
}

function clearStatus() {
    if (!elements.status) return;
    elements.status.textContent = '';
    elements.status.className = 'status-message';
    delete elements.status.dataset.type;
}

// Configuration des événements
function setupEvents() {
    const handleSearch = () => {
        state.search = elements.search.value;
        state.page = 1;
        triggerSearch();
    };

    elements.searchBtn.addEventListener('click', handleSearch);
    elements.search.addEventListener('input', handleSearch);
    elements.search.addEventListener('keyup', e => e.key === 'Enter' && handleSearch());

    elements.filters.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.filters.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            state.filter = btn.dataset.filter;
            state.page = 1;
            triggerSearch();
        });
    });

    elements.sort.addEventListener('change', () => {
        state.sort = elements.sort.value;
        state.page = 1;
        renderMovies();
    });

    elements.prevPage.addEventListener('click', () => changePage(-1));
    elements.nextPage.addEventListener('click', () => changePage(1));

    elements.themeToggle.addEventListener('click', toggleTheme);

    // Modal close handlers
    elements.modal.addEventListener('click', e => {
        if (e.target.dataset.closeModal !== undefined) closeModal();
    });
    elements.modalClose.addEventListener('click', closeModal);
    document.addEventListener('keyup', e => {
        if (e.key === 'Escape') closeModal();
    });
}

// Écoute des clics sur cartes pour lancer la lecture
function attachCardListeners() {
    // délégation : une seule fois
    if (elements.grid.dataset.bound) return;
    elements.grid.dataset.bound = 'true';

    elements.grid.addEventListener('click', event => {
        const favBtn = event.target.closest('[data-fav-btn]');
        if (favBtn) {
            event.stopPropagation();
            const card = favBtn.closest('.movie-card');
            toggleFavorite(card?.dataset.movieId);
            return;
        }
        const card = event.target.closest('.movie-card');
        if (!card) return;
        const movieId = card.dataset.movieId;
        if (movieId) openMovieDetails(movieId);
    });

    elements.grid.addEventListener('keyup', event => {
        if (event.key !== 'Enter') return;
        const card = event.target.closest('.movie-card');
        if (!card) return;
        const movieId = card.dataset.movieId;
        if (movieId) openMovieDetails(movieId);
    });
}

function toggleFavorite(movieId) {
    if (!movieId) return;
    const idNum = Number(movieId);
    if (state.favorites.has(idNum)) {
        state.favorites.delete(idNum);
    } else {
        state.favorites.add(idNum);
    }
    saveFavorites();
    renderMovies();
}

function saveFavorites() {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...state.favorites]));
}

function loadFavorites() {
    try {
        const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

function changePage(delta) {
    state.page = Math.max(1, state.page + delta);
    renderMovies();
}

function updatePagination(totalPages) {
    if (!elements.pagination) return;
    elements.pagination.style.display = totalPages <= 1 ? 'none' : 'flex';
    elements.prevPage.disabled = state.page <= 1;
    elements.nextPage.disabled = state.page >= totalPages;
    elements.pageInfo.textContent = `Page ${state.page} / ${totalPages}`;
}

async function openMovieDetails(movieId) {
    openModal();
    setModalLoading(true);
    setModalMessage('');
    elements.playerFrame.src = '';

    try {
        const detail = await fetchMovieDetails(movieId);
        fillModalDetails(detail);

        const trailerKey = pickTrailerKey(detail.videos?.results);

        if (!trailerKey) {
            setModalMessage('Bande-annonce indisponible. Recherche d\'une alternative...', false);
            const fallback = await findFallbackTrailer();
            if (!fallback) {
                setModalMessage('Aucune bande-annonce disponible pour ce film.', true);
                setModalLoading(false);
                return;
            }
            setModalMessage(`Bande-annonce alternative : ${fallback.title}`, false);
            elements.playerFrame.src = buildYoutubeUrl(fallback.key);
            setModalLoading(false);
            return;
        }

        elements.playerFrame.src = buildYoutubeUrl(trailerKey);
        setModalLoading(false);
    } catch (error) {
        console.error('Erreur lors du chargement de la vidéo', error);
        setModalMessage('Impossible de charger la vidéo. Réessayez plus tard.', true);
        setModalLoading(false);
    }
}

async function fetchMovieDetails(movieId) {
    return fetchFromTMDB(`movie/${movieId}`, { append_to_response: 'videos' });
}

function fillModalDetails(detail) {
    const title = detail.title || detail.name || 'Titre indisponible';
    const year = detail.release_date ? detail.release_date.slice(0, 4) : '—';
    const runtime = detail.runtime ? `${detail.runtime} min` : '';
    const rating = detail.vote_average ? `${(detail.vote_average / 2).toFixed(1)}/5` : '';
    const genres = (detail.genres || []).map(g => g.name);
    const poster = detail.poster_path ? `${TMDB_IMG_BASE}${detail.poster_path}` : FALLBACK_POSTER;

    elements.modalTitle.textContent = title;
    elements.modalOverview.textContent = detail.overview || 'Synopsis indisponible pour ce film.';
    elements.modalPoster.src = poster;
    elements.modalPoster.alt = `Affiche de ${title}`;
    elements.modalMeta.textContent = [year, rating, runtime].filter(Boolean).join(' • ');
    elements.modalGenres.innerHTML = genres.map(g => `<span class="genre">${g}</span>`).join('');
}

function pickTrailerKey(videos = []) {
    const trailer = videos.find(v =>
        v.site === 'YouTube' &&
        v.type === 'Trailer' &&
        v.official
    ) || videos.find(v => v.site === 'YouTube' && v.type === 'Trailer') ||
        videos.find(v => v.site === 'YouTube');
    return trailer?.key || null;
}

async function findFallbackTrailer() {
    try {
        const data = await fetchFromTMDB('movie/popular', { page: 1 });
        const candidates = (data.results || []).slice(0, 8); // limite pour éviter trop d'appels
        for (const movie of candidates) {
            const key = await getTrailerKey(movie.id);
            if (key) return { key, title: movie.title || movie.name || 'Film' };
        }
    } catch (e) {
        console.error('Erreur fallback trailer', e);
    }
    return null;
}

function buildYoutubeUrl(key) {
    return `https://www.youtube.com/embed/${key}?autoplay=1`;
}

function openModal() {
    elements.modal.classList.add('active');
    elements.modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
    elements.modal.classList.remove('active');
    elements.modal.setAttribute('aria-hidden', 'true');
    elements.playerFrame.src = '';
    setModalMessage('');
}

function setModalLoading(isLoading) {
    elements.modalLoader.style.display = isLoading ? 'grid' : 'none';
    elements.playerFrame.style.visibility = isLoading ? 'hidden' : 'visible';
}

function setModalMessage(message, isError = false) {
    elements.modalMessage.textContent = message;
    elements.modalMessage.className = isError ? 'modal-message error' : 'modal-message';
}

// Thème clair / sombre
function toggleTheme() {
    const isLight = document.body.classList.toggle('light');
    localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
}

function restoreTheme() {
    const saved = localStorage.getItem(THEME_KEY) || 'dark';
    if (saved === 'light') {
        document.body.classList.add('light');
    } else {
        document.body.classList.remove('light');
    }
}

// Orchestration de la recherche / filtrage
function triggerSearch() {
    const genre = GENRES[state.filter];
    const hasFilter = Boolean(genre);
    const searchTerm = state.search.trim();

    if (!searchTerm) {
        loadMovies({
            endpoint: 'discover/movie',
            params: hasFilter
                ? { with_genres: genre.id, sort_by: 'popularity.desc', pages: MAX_PAGES }
                : { sort_by: 'popularity.desc', pages: MAX_PAGES }
        });
        return;
    }

    loadMovies({
        endpoint: 'search/movie',
        params: {
            query: searchTerm,
            include_adult: 'false',
            pages: MAX_PAGES
        }
    });
}
