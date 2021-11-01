const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        text: true
    },
    age: {
        type: Number,
        required: false,
        default: 0
    },
    email: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
        default: "default@duck.com",
        validate(value){
            if(validator.isEmail(value) === false){
                throw new Error("Please provide a valid Email ID")
            }
        }
    },
    githubCode:{
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        required: false
    },
    uploadedPDFs: {
        type: [String],
        required: false
    }
},{ 
    timestamps: true 
} 
)

module.exports = mongoose.model('user', UserSchema)