const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('config');
const User = require('../models/User');

const signup = (req, res) => {
  const {name, email, password} = req.body;

  if(!name || !email || !password) {
    return res.status(400).json({msg: "Please enter all fields!"});
  }

  User.findOne({email})
    .then(user => {
      if(user) {
        return res.status(400).json({msg: "User already exists"});
      }

      const newUser = new User({name, email, password});

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw new Error('Problem with hashing. Please check.');
          newUser.password = hash;
          newUser.save()
            .then(user => {
              jwt.sign(
                {id: user._id},
                config.get('jwtsecret'),
                {expiresIn: 3600},
                (err, token) => {
                  if (err) throw new Error('Problem with JWT token generation. Please check.');
                  res.json({
                    token,
                    user: {
                      id: user._id,
                      name: user.name,
                      email: user.email
                    }
                  })
                }
              )
            })
        })
      }) 
    })
}

const login = (req, res) => {
  const {email, password} = req.body;

  if(!email || !password) {
    return res.status(400).json({msg: "Please enter all login fields"});
  }

  User.findOne({email})
    .then(user => {
      if(!user) {
        return res.status(400).json({msg: "User not found"});
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) return res.status(400).json({msg: "Incorrect Credentials"});

          jwt.sign(
            {id: user._id},
            config.get('jwtsecret'),
            {expiresIn: 3600}, 
            (token, err) => {
              if(err) return res.status(400).json({msg: "Issue with JWT token"});
              res.json({
                token,
                user: {
                  id: user._id,
                  name: user.name,
                  email: user.email
                }
              })
            }
          )
        })
    })
}

module.exports = {signup, login}