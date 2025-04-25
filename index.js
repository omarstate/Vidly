const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const genres = [
    { id: 1, name: "Horror" },
    { id: 2, name: "Romance" },
    { id: 3, name: "Thriller" },
    { id: 4, name: "Fantasy" }
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

app.get('/api/genres', (req, res) => {
    res.send({ success: true, data: genres });
});

app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send({ success: false, message: error.details[0].message });

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send({ success: true, data: genre });
});

app.put('/api/genres/:id', (req, res) => {
    const genre = findGenreById(req.params.id);
    if (!genre) return res.status(400).send({ success: false, message: "The genre with the given ID isn't available!" });

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send({ success: false, message: error.details[0].message });

    genre.name = req.body.name;
    res.send({ success: true, data: genre });
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = findGenreById(req.params.id);
    if (!genre) return res.status(400).send({ success: false, message: "The genre with the given ID isn't available!" });

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send({ success: true, data: genre });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));