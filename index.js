const express = require('express');

const fs = require('fs');
const path = './users.json';

const app = express();

app.use(express.json());

// middleware to check time
const logger = require('./middleware/logger');


// importing dummy data 
const {members} = require('./data');

const port = process.env.PORT || 8000;

/* app.use(checkTime); */

// GET all members
app.get('/api/members',logger,(req, res) => {
    res.json(members);
});

//get member by id
app.get('/api/members/:id', (req, res) => {
    const id = req.params.id;

    const member = members.find(member => member.id === parseInt(id));

    res.json(
        {
            message: "Member fetched successfully.",
            member: member
        }
    ).status(200);
})

// DELETE member by id
app.delete('/api/members/:id', (req, res) => {
    const id = req.params.id;

    const filteredMembers = members.filter(member => member.id !== parseInt(id));

    res.json({
        message: "Member deleted successfully 😎😎",
        filteredMembers: filteredMembers
    }).status(204)
    
})

// POST member
app.post('/api/members', (req, res) => {
    const {id, name, age, school, course, location} = req.body;

    const newMember = {
        id,
        name,
        age,
        school,
        course,
        location
    };

    members.push(newMember);

    res.json({
        message: `${newMember.name} has been added successfully.`,
        members: members
    }).status(201);
});

//EDIT member
app.put('/api/members/:id', (req, res) => {
    const id = req.params.id;

    const member = members.find(member => member.id === parseInt(id));

    member.id = req.body.id;
    member.name = req.body.name;
    member.age = req.body.age;
    member.school = req.body.school;
    member.course = req.body.course;
    member.location = req.body.location;

    res.json(member).status(200);
})

//DEFAULT route
app.get("/", (req, res) => {
    res.send('<h1>Hello World!</h1>').status(200);
});

app.listen(port, (req, res) => {
    console.log(`server is listening on port: ${port}`);
});

// GET all Users
/* app.get("/users",checkTime, (req, res) => {
    fs.readFile(path, (err, data) => {
        if(err){
            res.status(500).send("Internal Server error");
            console.log(err.message);
        }

        let users = [];
        if (data.length > 0) {
            users = JSON.parse(data);
        } else{
            res.send("No users found !!!").status(200);
        }

        res.json({message:"Users fetched successfully :)", users});
    });
}); */

// GET user by ID
/* app.get("/users/:id", (req, res) => {
    const id = req.params.id;

    fs.readFile(path, (err, data) => {
        if(err){
            res.status(500).send("Internal Server error");
            console.log(err.message);
        }

        let users = [];
        if (data.length > 0) {
            users = JSON.parse(data);
        } else{
            res.send("No users found !!!").status(200);
        }

        const user = users.find(user => user.id === parseInt(id) );


        res.json({message:"User fetched successfully :)", user});
    });
}); */

// POST new user
/* app.post("/users", (req, res) => {
    const { id, name, age, school, course, location } = req.body;

    const newUser = {
        id,
        name,
        age,
        school,
        course,
        location
    };

    // Read existing users from the file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        let users = [];
        if (data.length > 0) {
            users = JSON.parse(data);
        }

        // Add the new user to the list
        users.push(newUser);

        // Save the updated list back to the file
        fs.writeFile(path, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }

            res.status(201).json({message:"User created Successfully", newUser});
        });
    });
}); */

// DELETE user by ID
/* app.delete("/users/:id", (req, res) => {
    const {id} = req.params;

    fs.readFile(path, (err, data) => {
        if(err){
            res.status(500).send("Internal Server error");
            console.log(err.message);
        }

        let users = [];
        if (data.length > 0) {
            users = JSON.parse(data);
        }

        const filterdUsers = users.filter(user => user.id !== parseInt(id));

        // Save the updated list back to the file
        fs.writeFile(path, JSON.stringify(filterdUsers, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }

            res.status(204).json({message:"User deleted Successfully", filterdUsers});
        });
    })
}); */