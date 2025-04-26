const express = require('express');
const app = express();
const Joi = require('joi');
const genres = require('./routes/genres');

app.use(express.json());
app.use('/api/genres', genres);



const movies = [
    { id: 1, title: "The Dark Knight", genreId: 1, numberInStock: 5, dailyRentalRate: 2.99 }, // Action
    { id: 2, title: "Indiana Jones: Raiders of the Lost Ark", genreId: 2, numberInStock: 3, dailyRentalRate: 2.49 }, // Adventure
    { id: 3, title: "Toy Story", genreId: 3, numberInStock: 7, dailyRentalRate: 1.99 }, // Animation
    { id: 4, title: "The Hangover", genreId: 4, numberInStock: 4, dailyRentalRate: 2.49 }, // Comedy
    { id: 5, title: "The Godfather", genreId: 5, numberInStock: 2, dailyRentalRate: 2.99 }, // Crime
    { id: 6, title: "March of the Penguins", genreId: 6, numberInStock: 3, dailyRentalRate: 1.99 }, // Documentary
    { id: 7, title: "The Shawshank Redemption", genreId: 7, numberInStock: 4, dailyRentalRate: 2.99 }, // Drama
    { id: 8, title: "Finding Nemo", genreId: 8, numberInStock: 6, dailyRentalRate: 1.99 }, // Family
    { id: 9, title: "The Lord of the Rings", genreId: 9, numberInStock: 3, dailyRentalRate: 2.99 }, // Fantasy
    { id: 10, title: "Schindler's List", genreId: 10, numberInStock: 2, dailyRentalRate: 2.99 }, // History
    { id: 11, title: "The Shining", genreId: 11, numberInStock: 3, dailyRentalRate: 2.49 }, // Horror
    { id: 12, title: "Bohemian Rhapsody", genreId: 12, numberInStock: 4, dailyRentalRate: 2.49 }, // Music
    { id: 13, title: "Gone Girl", genreId: 13, numberInStock: 3, dailyRentalRate: 2.49 }, // Mystery
    { id: 14, title: "Titanic", genreId: 14, numberInStock: 5, dailyRentalRate: 2.99 }, // Romance
    { id: 15, title: "Inception", genreId: 15, numberInStock: 4, dailyRentalRate: 2.99 }, // Science Fiction
    { id: 16, title: "The Silence of the Lambs", genreId: 16, numberInStock: 3, dailyRentalRate: 2.49 }, // Thriller
    { id: 17, title: "Saving Private Ryan", genreId: 17, numberInStock: 2, dailyRentalRate: 2.99 }, // War
    { id: 18, title: "The Good, the Bad and the Ugly", genreId: 18, numberInStock: 2, dailyRentalRate: 2.49 }, // Western
    { id: 19, title: "The Social Network", genreId: 19, numberInStock: 3, dailyRentalRate: 2.49 }, // Biography
    { id: 20, title: "Rocky", genreId: 20, numberInStock: 4, dailyRentalRate: 2.49 } // Sport
];

// Helper function to find a genre by ID
function findGenreById(id) {
    return genres.find(c => c.id === parseInt(id));
}

// Validation function
function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(genre);
}

app.get('/', (req, res) => {
    res.send("Home Page");
});



app.get('/api/movies', (req, res) => {
    res.send({ success: true, data: movies });
});

app.get('/api/movies/:id', (req, res) => {
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send({ success: false, message: "The movie with the given ID isn't available!" });
    res.send({ success: true, data: movie });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));