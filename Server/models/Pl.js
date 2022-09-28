const {Schema, model} = require('mongoose')

const schema = new Schema({
    link: {type: String, required: false, unique: false},
    name: {type: String, required: false, unique: false},
    pl: {type: String, required: false, unique: false}
},{versionKey: false})

module.exports = model('pl', schema)
