const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        username: { 
            type: String, 
            required:true,
            minlength: 6,
            maxlength:20,
            unique:true
        },
        passwords: { 
            type: String, 
            required:true,
            minlength:6,
        },
        name: { 
            type: String, 
            required:true,
            maxlength:20
        },
        friends: [
            {
                id: { type: String, required: true }
            }
        ]
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', User)