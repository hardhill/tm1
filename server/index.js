const bodyParser = require('body-parser')
const express = require('express')
const mongo = require('mongoose')
const app = express()
const cors = require('cors')
const passport = require('passport')

const passportStrategy = require('./middlewares/passport-strategy')
const keys = require('./keys')
const authRoutes = require('./routes/auth.routes')
const postRoutes = require('./routes/post.routes')





mongo.connect(keys.MONGO_URI)
  .then(()=>console.log('Connected database'))
  .catch((error)=>console.log(error))

app.use(passport.initialize())
passport.use(passportStrategy)
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())


// регистрация роутов
app.use('/auth',authRoutes)
app.use('/post', postRoutes)




// test route - line below
app.get('/test', (req, res) => res.status(200).json([{name: "Robert"}, {name: "John"}]))

// Export express app
module.exports = app
