/* eslint-disable no-undef */
const express = require('express');
require('dotenv').config();
const app = express();

const {
    BASE_URL,
    PORT
} = process.env;

// User data information
const userInfoData = [
    {
        id: 1,
        firstName: 'Abhishek',
        lastName: 'Agrawal',
        country:'India'
    },
    {
        id: 2,
        firstName: 'Sachin',
        lastName: 'Tendulkar',
        country: 'India'
    },
    {
        id: 3,
        firstName: 'Kane',
        lastName: 'Williamson',
        country: 'New Zealand'
    },
    {
        id: 4,
        firstName: 'Ricky',
        lastName: 'Ponting',
        country: 'Australia'
    },
];

// API to give information to you!
app.get(`${BASE_URL}/greet`,(req, res) => {
    res.send(`Hi,
            I'm an API. Geneated by Abhishek Agrawal
            Nice to meet you!`);
})

// Get all the users
app.get(`${BASE_URL}/users`, (req,res) => {
    res.json(userInfoData);
})

// Get a particular user based on given ID
app.get(`${BASE_URL}/users/:id`, (req, res) => {
    let id = req.params.id;
    let user = userInfoData.find(user => user.id === Number.parseInt(id));
    if (user) {
        res.json(user);    
    } else {
        res.send('User does not exists.')
    }
})

// Delete a particular user based on given ID
app.delete(`${BASE_URL}/users/:id`, (req, res) => {
    let id = req.params.id;
    for (let i = 0; i < userInfoData.length; i++) {
        if (userInfoData[i].id === Number.parseInt(id)) {
            userInfoData.splice(i, 1);
            break;
        }
    }
    res.send(`User with id ${id} has been deleted successfully.`)
})

// Starting a server
app.listen(PORT,()=>console.log(`Server started on PORT ${PORT}`));