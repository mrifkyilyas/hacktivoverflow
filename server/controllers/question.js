const { Question,User,Answer } = require('../models')
class questionController {
    static addQuestion(req, res) {
      console.log(req.body)
        const {title,description} = req.body
        const user = req.userLogin
        const createdAt = new Date()
        console.log(createdAt)
        Question
            .create({
                title,description,user,createdAt              
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

    static mylist(req, res) {
      Question
        .find({user:req.userLogin})
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

    static upvotes(req, res) {
      Question
        .findById(req.params.id)
        .populate('user')
        .populate({
          path: 'answers',
          populate: {
            path: 'user'
          }
        })
        .then(question => {
          console.log(question.user._id,req.userLogin)
          let samePerson = question.user._id == req.userLogin
          let isExistUp = question.upvotes.indexOf(req.userLogin) < 0
          let isExistDown = question.downvotes.indexOf(req.userLogin) < 0
          
          if (samePerson) {
            res.status(400).json({error: 'You cannot vote your question'})
          } else if (isExistUp && isExistDown) {
            question.upvotes.push(req.userLogin)
            return question.save()
          } else if (!isExistDown) {
            question.downvotes = question.downvotes.filter(el => el != req.userLogin)
            question.upvotes.push(req.userLogin)
            return question.save()
          } else {
            question.upvotes = question.upvotes.filter(el => el != req.userLogin)
            return question.save()
          }
        })
        .then(data => {
          res.status(200).json(data)
        })
        .catch(err => {
          console.log(err)
        })
    }
    
  
    static downvotes(req, res) {
      Question
      .findById(req.params.id)
      .populate('user')
      .populate({
        path: 'answers',
        populate: {
          path: 'user'
        }
      })
        .then(question => {
          let samePerson = question.user._id == req.userLogin
          let isExistUp = question.upvotes.indexOf(req.userLogin) < 0
          let isExistDown = question.downvotes.indexOf(req.userLogin) < 0          
          if (samePerson) {
            res.status(400).json({error: 'You cannot vote your question'})
          } else if (isExistUp && isExistDown) {
            question.downvotes.push(req.userLogin)
            return question.save()
          } else if (!isExistUp){
            question.upvotes = question.upvotes.filter(el => el != req.userLogin)
            question.downvotes.push(req.userLogin)
            return question.save()
          } else {
            question.downvotes = question.downvotes.filter(el => el != req.userLogin)
            return question.save()
          }
        })
        .then(data => {
          res.status(200).json(data)
        })
        .catch(err => {
          console.log(err)
        })
      }
      static delete(req, res) {
        console.log('masuk delete')
        Question
          .findOneAndDelete({
            _id: req.params.id,
          })
          .then(question => {
            return Answer
              .deleteMany({
                question: question._id,
              });
          })
          .then(() => {
            res.status(200).json({
              message: 'Successfully deleted question'
            })
          })
          .catch(err => {
            res.status(500).json(err);
          })
      }

      static editQuestion(req, res) {
        const {title,description} = req.body
        Question
          .findByIdAndUpdate(req.params.id, {
            title,description
          })
          .then(question => {
            res.status(200).json(question)
          })
          .catch(err => {
            console.log(err)
            res.status(500).json(err)
          })
    }
    
  
  
}

module.exports = questionController