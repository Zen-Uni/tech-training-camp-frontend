/**
 * @description Server Model
 * @author Uni
 */

 const mongoose = require('./connect')

 // define Schema
 const userSchema = mongoose.Schema({
     username: String,
     password: String,
     email: {
         type: String,
         unique: true,
     }
 })
 
 const captchaSchema = mongoose.Schema({
     email: {
         type: String,
         unique: true,
     },
     captcha: String
 })

// TODO:设定文章模型
 let cut = 1
 const articleSchema = mongoose.Schema({
    id: {
        type: Number,
        default: () => {
            return cut++
        }
    },
    title: String,
    content: String,
    username: String,
    share: {
        type: Boolean,
        default: false
    },
    email: String
 })
 
 
 //define data model
 const User = mongoose.model('users', userSchema)
 const Captcha = mongoose.model('captchas', captchaSchema)
 const Article = mongoose.model('articles', articleSchema)
 
 module.exports = {
     User,
     Captcha,
     Article,
 }