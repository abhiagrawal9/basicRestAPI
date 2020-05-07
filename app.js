/* eslint-disable no-empty */
/* eslint-disable no-undef */
const express = require('express');
require('dotenv').config();
const app = express();

const {
    BASE_URL,
    PORT
} = process.env;

// const customMiddleWare = (req,res,next) => {
//     next();
// }

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

// app.use(customMiddleWare);
app.use(express.json());

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
    let requestId = req.params.id;
    let user = userInfoData.find(user => user.id === Number.parseInt(requestId));
    if (user) {
        res.json(user);    
    } else {
        res.send('User does not exists.')
    }
})

// Create a user based on given information (id should be unique)
app.post(`${BASE_URL}/users`, (req, res) => { 
    let isExist = userInfoData.find(user => user.id === Number.parseInt(req.body.id));
    const user = {
        id: Number.parseInt(req.body.id),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        country: req.body.country
    }
    if (!isExist) {
        userInfoData.push(user);
        res.json(user);
    } else {
        res.send('User with given id already exists.');
    }
})

// Update a particular user based on given ID
app.put(`${BASE_URL}/users/:id`, (req, res) => { 
    let requestId = req.params.id;
    let user = userInfoData.find(user => user.id === Number.parseInt(requestId));
    if (user) {
        const index = userInfoData.indexOf(user);
        const keys = Object.keys(req.body);
        keys.forEach(key => {
            user[key] = req.body[key];
        })
        userInfoData[index] = user;
        res.json(userInfoData[index]);
    } else {
        res.send('User does not exists.')
    }
})

// Delete a particular user based on given ID
app.delete(`${BASE_URL}/users/:id`, (req, res) => {
    let id = req.params.id;
    let user = userInfoData.find(user => user.id === Number.parseInt(id));
    if (user) {
        for (let i = 0; i < userInfoData.length; i++) {
            if (userInfoData[i].id === Number.parseInt(id)) {
                userInfoData.splice(i, 1);
                break;
            }
        }
        res.send(`User with id ${id} has been deleted successfully.`)
    }
    else (
        res.send('User does not exist with given id.')
    )
})

// Starting a server
app.listen(PORT,()=>console.log(`Server started on PORT ${PORT}`));