// Données des films
const movies = [
    {
        id: 1,
        title: "Dune : Deuxième Partie",
        year: 2024,
        rating: 4.7,
        description: "Paul Atreides s'allie avec Chani et les Fremen pour mener la révolte contre ceux qui ont détruit sa famille. Affrontant un choix entre l'amour de sa vie et le destin de l'univers, il doit empêcher un terrible futur que lui seul peut prédire.",
        genres: ["Science-Fiction", "Aventure", "Drame"],
        poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 2,
        title: "Oppenheimer",
        year: 2023,
        rating: 4.5,
        description: "L'histoire du scientifique J. Robert Oppenheimer et son rôle clé dans le développement de la bombe atomique pendant la Seconde Guerre mondiale.",
        genres: ["Drame", "Histoire"],
        poster: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 3,
        title: "Mission: Impossible - Dead Reckoning",
        year: 2023,
        rating: 4.3,
        description: "Ethan Hunt et son équipe de l'IMF doivent retrouver une nouvelle arme terrifiante avant qu'elle ne tombe entre de mauvaises mains.",
        genres: ["Action", "Aventure", "Thriller"],
        poster: "https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 4,
        title: "Barbie",
        year: 2023,
        rating: 4.0,
        description: "Barbie et Ken s'aventurent dans le monde réel et découvrent les joies et les périls de vivre parmi les humains.",
        genres: ["Comédie", "Aventure", "Fantaisie"],
        poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 5,
        title: "John Wick 4",
        year: 2023,
        rating: 4.4,
        description: "John Wick découvre un moyen de vaincre la Grande Table. Mais avant de pouvoir gagner sa liberté, il doit affronter un nouvel ennemi aux alliances puissantes.",
        genres: ["Action", "Thriller", "Crime"],
        poster: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 6,
        title: "Interstellar",
        year: 2014,
        rating: 4.8,
        description: "Une équipe d'explorateurs voyage à travers un trou de ver dans l'espace dans l'espoir de garantir la survie de l'humanité.",
        genres: ["Science-Fiction", "Drame", "Aventure"],
        poster: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 7,
        title: "The Dark Knight",
        year: 2008,
        rating: 4.9,
        description: "Batman relève le défi ultime lorsqu'il affronte le Joker, un criminel dont le but est de semer le chaos à Gotham.",
        genres: ["Action", "Crime", "Drame"],
        poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 8,
        title: "La La Land",
        year: 2016,
        rating: 4.2,
        description: "Une histoire d'amour entre une actrice en herbe et un pianiste de jazz qui luttent pour concilier leurs relations et leurs ambitions à Los Angeles.",
        genres: ["Drame", "Comédie", "Musical"],
        poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 9,
        title: "Inception",
        year: 2010,
        rating: 4.8,
        description: "Un voleur qui s'infiltre dans les rêves des autres pour voler leurs secrets doit faire le contraire : implanter une idée dans l'esprit d'une cible.",
        genres: ["Science-Fiction", "Action", "Thriller"],
        poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 10,
        title: "Parasite",
        year: 2019,
        rating: 4.6,
        description: "Une famille pauvre s'infiltre petit à petit dans la vie d'une famille riche en se faisant passer pour des personnes qualifiées.",
        genres: ["Drame", "Comédie", "Thriller"],
        poster: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 11,
        title: "Avengers: Endgame",
        year: 2019,
        rating: 4.4,
        description: "Les Avengers restants tentent de ramener à la vie leurs alliés disparus pour affronter Thanos une fois pour toutes.",
        genres: ["Action", "Aventure", "Science-Fiction"],
        poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 12,
        title: "Le Parrain",
        year: 1972,
        rating: 4.9,
        description: "Le patriarche vieillissant d'une dynastie de la mafia new-yorkaise transfère le contrôle de son empire clandestin à son fils réticent.",
        genres: ["Drame", "Crime"],
        poster: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
];