const {Schema, model} = require('mongoose')

const schema = new Schema({
    user: {type: String, required: false, unique: true}
},{versionKey: false})

module.exports = model('Connection', schema)

