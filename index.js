const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());


const genres = [
    {id: 1, name: "Horror"},
    {id: 2, name: "Romance"},
    {id: 3, name: "Thriller"},
    {id: 4, name: "Fantasy"}
]


app.get('/', (req, res) => {
    res.send("Home Page")
});

app.get('/api/genres', (req, res) => {
    res.send(genres);
})

app.post('/api/genres', (req, res) => {
    // Validate the input
    const { error } = Validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    // If it passes -> then we create the new object
    const genre = {
        name: req.body.name,
        id: genres.length + 1
    }
    genres.push(genre);
    res.send(genre);
})

app.put('/api/genres/:id', (req, res) => {
    // Check for the given genre if available
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if (!genre) return res.status(400).send("The genre with the given id isn't available!");
    // Validate
    const { error } = Validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    // Update the genre
    genre.name = req.body.name;
    res.send(genre);
});

// Helper function to find genre by ID
function findGenreById(id) {
    return genres.find(c => c.id === parseInt(id));
}

// DELETE route
app.delete('/api/genres/:id', (req, res) => {
    const genre = findGenreById(req.params.id);
    if (!genre) return res.status(400).send("Genre not found with the given ID.");

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send({ success: true, data: genre });
});

// Use environment variable for port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

function Validate(genre){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
      });

     return schema.validate(genre);
}