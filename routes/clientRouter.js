const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const client = require('../models/client')

const clientRouter = express.Router();

clientRouter.route('/')
.get((req, res, next)=> {
    client.find()
        .then((clientsfound) => {
            res.render('viewClients', { clientList: clientsfound, title: 'Client Sessions'});
        })
    .catch((err) => next(err));
})

clientRouter.get('/search', async (req, res, next)=>{
    const clientId = req.query.clientId;
    try {
        //if client id is not found, redirect to viewClients page
        if(!clientId){
            return res.redirect('/viewClients');
        }
        //attempt to find client
        const clientData = await client.findById(clientId);

        if(clientData){
            res.render('viewClients', {clientList: [clientData], title:'Search Results'});
        } 
        //if not found
        else {
            res.render('viewClients', {clientList: [], title:'Search Results', message: 'No client found'})
        }
    } catch(error){
        console.error('Error searching', error);
        next(error);
    }
})

clientRouter.post('/clientDelete/:clientId', (req, res, next) => {
    client.deleteOne({_id: req.params.clientId})
        .then((deletedClient) => {
            //deletion is successful, render deleteconfirmation page
            res.render('deleteconfirm', {title: 'Delete Confirm', client: deletedClient})
    })
    .catch((err) => next(err));
})

clientRouter.get('/sessionupdate/:clientId', async(req, res, next)=>{
    try {
        const clientId = req.params.clientId;
        //fetch client data from database using Id
        const clientData = await client.findById(clientId);

        //if found render sessionupdate page with client detail
        if (clientData) {
            res.render('sessionupdate', {client: clientData});
        } else {
            res.status(404).send('client not found');
        }

    } catch(error) {
        console.error('Error fetching', error)
        next(error);

    }
})

clientRouter.post('/sessionupdate/:clientId', (req, res, next) => {
    //data from the request body
    const {id, full_name, email, phone, date} = req.body;

    //find the client id and update the fields
    client.updateOne({_id: req.params.clientId}, 
        {$set: {id, full_name, email, phone, date}})
       
    .then(()=> {
        //redirect viewclients page on success
        res.redirect('/viewClients');

    })
    .catch((err) => next(err));
});

module.exports = clientRouter;