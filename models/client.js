const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    id: {
        type:Number,
        required:true,
        unique: true
    }, 

    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true

    },
    card: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
    }
}, {
        timestamps: true
    
})

const client = mongoose.model('client', clientSchema);

module.exports = client;