const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const Users = require('../models/user.model')
const keys = require('../keys')


module.exports.login = async (req, res) => {
  const candidate = await Users.findOne({login: req.body.login})

  if (candidate) {
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, candidate.password)
    if (isPasswordCorrect) {
      const token = jwt.sign({
        login: candidate.login,
        userId: candidate._id
      }, keys.JWT, {expiresIn: 3600})
      res.json({token})
    } else {
      res.status(401).json({message: 'User not found'})
    }
  } else {
    res.status(404).json({message: 'User not found'})
  }
}


module.exports.createUser = async (req, res) => {
  const candidate = await Users.findOne({login: req.body.login})
  if (candidate) {
    res.status(409).json({message: 'Login not vacant'})
  } else {
    const salt = bcrypt.genSaltSync(10)
    const user = new Users({
      login: req.body.login,
      password: bcrypt.hashSync(req.body.password, salt)
    })
    console.log(user)
    await user.save()
    res.status(201).json(user)
  }
}
