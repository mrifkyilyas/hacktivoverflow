const { Question,User,Answer } = require('../models')
class questionController {
    static addQuestion(req, res) {
      console.log(req.body)
        const {title,description} = req.body
        const user = req.userLogin
        Question
            .create({
                title,description,user              
            })
            .then(succes => {
                res.status(201).json(succes)

            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static list(req, res) {
        Question
          .find({})
          .populate('answers user')
          .exec((err, docs) => {
            if(err) {
              res.status(500).json(err);
            } else {
              User.populate(docs, {
                path: 'answers.user',
                Model: Answer,
              }, (err, docs) => {
                if(err) {
                  res.status(500).json(err);
                } else {
                  res.status(200).json(docs);
                }
              });
            }
          });
    }
    static getOne(req, res) {
      Question
        .findById(req.params.id)
        .populate('answers user')
        .exec((err, docs) => {
          if(err) {
            res.status(500).json(err);
          } else {
            User.populate(docs, {
              path: 'answers.user',
              Model: Answer,
            }, (err, docs) => {
              if(err) {
                res.status(500).json(err);
              } else {
                res.status(200).json(docs);
              }
            });
          }
        });
    }
  
}

module.exports = questionController