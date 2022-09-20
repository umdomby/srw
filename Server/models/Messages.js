const {Schema, model} = require('mongoose')

const schema = new Schema({
    //connection: { ref : 'Connection', type: Schema.Types.ObjectId, required: false},
    user: {type: String, required: false, unique: false},
    messages: {type: String, required: false, unique: false}
},{versionKey: false})

module.exports = model('Message', schema)
