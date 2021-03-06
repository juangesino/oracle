Template.ask.helpers({
  questions: function () {
    let questions = Question.find({userId: Meteor.userId()}, { limit: Session.get('queryLimit'), sort: {createdOn: -1}}).fetch();
    return questions;
  },
  newQuestionPath: function () {
    return Router.path("newQuestion");
  },
  isEmpty: function (array) {
    return array.length === 0;
  }
});
