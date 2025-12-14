// Éléments DOM
const elements = {
    grid: document.getElementById('moviesGrid'),
    search: document.getElementById('searchInput'),
    searchBtn: document.getElementById('searchBtn'),
    filters: document.querySelectorAll('.filter-btn'),
    noResults: document.getElementById('noResults')
};

// État de l'application
const state = {
    filter: 'all',
    search: ''
};

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    displayMovies(movies);
    setupEvents();
});

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
        <article class="movie-card">
            <div class="movie-poster">
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
                    ${movie.genres.map(g => `<span class="genre">${g}</span>`).join('')}
                </div>
            </div>
        </article>
    `;
}

// Filtrage des films
function filterMovies() {
    const filtered = movies.filter(movie => {
        const matchesFilter = state.filter === 'all' || 
            movie.genres.some(g => g.toLowerCase().includes(state.filter.toLowerCase()));
        
        if (!matchesFilter) return false;
        
        if (!state.search.trim()) return true;
        
        const term = state.search.toLowerCase();
        return movie.title.toLowerCase().includes(term) ||
               movie.description.toLowerCase().includes(term) ||
               movie.genres.some(g => g.toLowerCase().includes(term));
    });
    
    displayMovies(filtered);
}

// Configuration des événements
function setupEvents() {
    // Recherche
    const updateSearch = () => {
        state.search = elements.search.value;
        filterMovies();
    };
    
    elements.searchBtn.addEventListener('click', updateSearch);
    elements.search.addEventListener('input', updateSearch);
    elements.search.addEventListener('keyup', e => e.key === 'Enter' && updateSearch());
    
    // Filtres
    elements.filters.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.filters.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            state.filter = btn.dataset.filter;
            filterMovies();
        });
    });
}
