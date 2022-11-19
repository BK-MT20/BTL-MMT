
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const verifyToken = (req, res, next) => {
    const token = req.headers.token
    if(token){
        const accessToken = token.split(' ')[1]
        jwt.verify(accessToken,process.env.ACCESS_SECRET_KEY,(err,user)=>{
            if(err){
                res.status(403).json('Token is not valid')
            }
            req.user=user
            next() 
        })
    }
    else{
        res.status(401).json('You are not authentication')
    }
}

const checkDuplicateUsername = (req, res, next) => {
    User.findOne({
        username: req.body.username,
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: `checkDuplicateUsernameOrEmail: username ${err}` })
            return;
        }
        if (user) {
            res.status(400).send({ message: 'Failed! Username already in use!' })
            return;
        }
        next()
    })
}



const authJWT = {
    verifyToken,
    checkDuplicateUsername
}
module.exports = authJWT