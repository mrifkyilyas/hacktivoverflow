
const { Question,User,Answer } = require('../models')
class answerController {

  static post(req, res) {
    let instanceAnswer
    req.body.user = req.userLogin
    Answer
      .create({
        ...req.body
      })
      .then(answer => {
        console.log(answer)
        instanceAnswer = answer
        return Question
          .findById(answer.question)
          .populate('answers')
      })
      .then(question => {
        console.log(question)
        question.answers.push(instanceAnswer._id)
        return question.save()
      })
      .then(() => {
        return Question
          .findById(req.params.id)
          .populate('questioner')
          .populate({
            path: 'answers',
            populate: {
              path: 'responder'
            }
          })
      })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  

}
module.exports = answerController