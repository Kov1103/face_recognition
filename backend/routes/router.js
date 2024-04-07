const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')

router.post('/nowlogin', (req, res) => {
  const {username, password} = req.body
  console.log(username)
  try {
    schemas.admins.findOne({name: username})
    .then(admin => {
      if (admin) {
        if (admin.password === password) {
            res.json("logged in")
        }
        else {
          res.json("Incorrect password")
        }
      }
      else {
        res.json("not exist")
      }
    })
  }
  catch(e) {
    console.log(e)
  }
});

router.get('/getHistory', (req, res) => {
  schemas.history.find()
  .then(history => res.json(history))
  .catch(err => res.json(err))
})

router.get('/getAdmins', (req, res) => {
  schemas.admins.find()
  .then(admins => res.json(admins))
  .catch(err => res.json(err))
})

router.get('/getPeople', (req, res) => {
  schemas.people.find()
  .then(people => res.json(people))
  .catch(err => res.json(err))
})

router.post('/insert', (req, res) => {
  const {username, password, fullname} = req.body
  const new_obj = {
    "name": username,
    "password": password,
    "fullname": fullname
  }

  try {
    schemas.admins.create(new_obj)
    .then(() => {
      res.json("Inserted")
    })
  }
  catch(e) {
    console.log(e)
  }
});

router.post('/delete', (req, res) => {
  const {username} = req.body
  try {
    schemas.admins.deleteOne({name: username})
    .then(() => {
      res.json("Deleted")
    })
  }
  catch(e) {
    console.log(e)
  }
});

router.post('/edit', (req, res) => {
  const {username, password, newusername, newpassword} = req.body
  try {
    schemas.admins.updateOne({name: username}, {$set: { name: newusername }, $set: { password: newpassword }})
    .then(() => {
      res.json("Edited")
    })
  }
  catch(e) {
    console.log(e)
  }
});

module.exports = router