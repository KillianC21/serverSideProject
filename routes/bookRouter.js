const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const client = require('../models/client')


const bookRouter = express.Router();


bookRouter.route('/')
.get((req, res, next)=> {
    res.render('booksession.ejs', { title: 'Book Session', currentDate: new Date().toISOString() });});


bookRouter.post('/', async (req, res, next) => {
    try {
        //current time and date
        const currentDate = new Date();
        //parse the booking date from the request body
        const bookingDate = new Date(req.body.date);

        //reject if date is in the past
        if (bookingDate < currentDate) {
             return res.status(400).send("Cannot book a past date.");
        }
        // Create a new client with the data from the request body
        await client.create(req.body);
        
        // Redirect to the client list after creation
        res.redirect('/viewClients'); 
    } catch (err) {
        next(err); // Handle errors if the creation fails
    }
})



.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported');

})





module.exports = bookRouter;
