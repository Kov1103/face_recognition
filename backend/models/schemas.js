const { timestamps } = require('browser-sync/dist/default-config')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    name: String,
    password: String,
    fullname: String
})

const peopleSchema = new Schema({
    id_person: Number,
    name: String,
    recog: Number
})

const historySchema = new Schema({
    name: String,
    time: Date
})

const Admin = mongoose.model('admins', adminSchema)
const People = mongoose.model('peoples', peopleSchema)
const History = mongoose.model('histories', historySchema)

const mySchema = {
    'admins': Admin,
    'people': People,
    'history': History
}
module.exports = mySchema