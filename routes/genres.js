const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, name: "Action" },
    { id: 2, name: "Adventure" },
    { id: 3, name: "Animation" },
    { id: 4, name: "Comedy" },
    { id: 5, name: "Crime" },
    { id: 6, name: "Documentary" },
    { id: 7, name: "Drama" },
    { id: 8, name: "Family" },
    { id: 9, name: "Fantasy" },
    { id: 10, name: "History" },
    { id: 11, name: "Horror" },
    { id: 12, name: "Music" },
    { id: 13, name: "Mystery" },
    { id: 14, name: "Romance" },
    { id: 15, name: "Science Fiction" },
    { id: 16, name: "Thriller" },
    { id: 17, name: "War" },
    { id: 18, name: "Western" },
    { id: 19, name: "Biography" },
    { id: 20, name: "Sport" }
];

router.get('/', (req, res) => {
    res.send({ success: true, data: genres });
});


router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
})

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send({ success: false, message: error.details[0].message });

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send({ success: true, data: genre });
});

router.put('/:id', (req, res) => {
    const genre = findGenreById(req.params.id);
    if (!genre) return res.status(400).send({ success: false, message: "The genre with the given ID isn't available!" });

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send({ success: false, message: error.details[0].message });

    genre.name = req.body.name;
    res.send({ success: true, data: genre });
});


router.delete('/:id', (req, res) => {
    const genre = findGenreById(req.params.id);
    if (!genre) return res.status(400).send({ success: false, message: "The genre with the given ID isn't available!" });

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send({ success: true, data: genre });
});



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



module.exports = router;
