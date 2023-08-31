const Questions = require("../models/question");
const Options = require("../models/option");

// Functionality to create a question in the database
module.exports.create = function (req, res) {
  Questions.create(
    { title: req.body.title, vote: false },
    function (err, question) {
      if (err) {
        return res.status(500).json({
          message: "Question is not created",
          data: err,
        });
      }
      if (question) {
        return res.status(200).json({
          message: "Question Created",
          data: question,
        });
      } else {
        return res.status(400).json({
          message: "Question not created",
        });
      }
    }
  );
};

// Functionality to delete question from the database with all its options
module.exports.deleteQuestion = function (req, res) {
  console.log(req.params.id);
  Questions.findByIdAndDelete(
    { _id: req.params.id },
    function (err, deletedQuestion) {
      if (err) {
        return res.status(500).json({
          message: "Question could not be deleted",
          data: err,
        });
      }

      Options.deleteMany({ question: req.params.id }, function (err, deleteOption) {
        if (err) {
          return res.status(500).json({
            message: "Could not delete Option",
            data: err,
          });
        }
        return res.status(200).json({
          message: "Question Deleted Successfully",
        });
      });
    }
  );
};

// Functionality to add options to a question
module.exports.addOptions = function (req, res) {
  Questions.findById({ _id: req.params.id }, function (err, question) {
    if (err) {
      return res.status(500).json({
        message: "Could not find question",
        data: err,
      });
    }
    if (question) {
      const id = question.option.length + 1;
      Options.create(
        {
          id: question.option.length + 1,
          question: req.params.id,
          text: req.body.text,
          votes: 0,
          // link: `http://127.0.0.1:27017:8000/options/${id}/add_vote`,
          link: `mongodb+srv://bendkolinanda12: Nanda123@cluster0.sj5feyg.mongodb.net/api-polling?retryWrites=true&w=majority/options/${id}/add_vote`,

        },
        function (err, optionCreated) {
          if (err) {
            return res.status(500).json({
              message: "Option not created",
              data: err,
            });
          }
          Questions.update(
            { _id: req.params.id },
            {
              $push: { option: [optionCreated._id] },
            },
            function (err, QuestionAndOption) {
              if (err) {
                return res.status(500).json({
                  message: "Question not updated",
                  data: err,
                });
              }
              return res.status(200).json({
                message: "Question And Option Updated",
              });
            }
          );
        }
      );
    } else {
      return res.status(404).json({
        message: "Problem",
        data: err,
      });
    }
  });
};

// Functionality to show all full question with all its options
module.exports.showAllQuestions = async (req, res) => {
  try {
    // Finding all the questions and returning
    let question = await Questions.findById(req.params.id).populate({
      path: "option",
    });

    if (question) {
      return res.status(200).json({
        message: "Here is the questions",
        data: question,
      });
    } else {
      return res.status(400).json({
        message: "Question does not exist",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error from the server",
      data: err,
    });
  }
};
