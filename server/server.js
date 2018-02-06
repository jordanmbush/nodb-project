require('dotenv').config();

const express = require('express');
const app = express();
const axios = require('axios');
const programmers = require("./controllers/programmers");
const pics = require('./controllers/funnypics');
const bodyParser = require('body-parser');
const cors = require('cors');


const port = 4000;
app.use(bodyParser());
app.use(cors());

// process.env.API_KEY


// CREATE
app.post('/api/programmers/', programmers.create);
// READ
app.get('/api/programmers/', programmers.read);
app.get('/api/funnypics', pics.read);
// UPDATE
app.put('/api/programmer/:id', programmers.update);
// DELETE
app.delete('/api/programmer', programmers.delete);

app.listen(port, () => {console.log(`listening on port ${port}`)}); 