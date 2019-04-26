const { User } = require('../models')
const { bcrypt, jwt } = require('../helpers')
class userController {
    static register(req, res) {
        let { name, email, password } = req.body
        User.create({
            name, email, password
        })
            .then(success => {
                res.status(201).json(success)
            })
            .catch(err => {
                res.status(500).json({
                    err: err.message
                })
            })
    }

    static login(req, res) {
        User.findOne({
            email: req.body.email
        })
            .then(found => {
                // console.log(req.body.password)
                // console.log(found)
                if (found && bcrypt.compare(req.body.password, found.password)) {
                    let access_token = jwt.sign({                        
                        email: found.email,
                        id:found._id
                    })
                    res.status(200).json({
                        access_token,name:found.name,id:found._id
                    })
                } else {
                    res.status(400).json({
                        message: 'password yang anda masukan salah'
                    })
                }

            })
            .catch(err => {
                res.status(500).json('password yang anda masukan salah')
            })
    }
}

module.exports = userController