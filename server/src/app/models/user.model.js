const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        passwords: { type: String, default: '' },
        username: { type: String, default: '' },
        name: { type: String, default: '' },
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