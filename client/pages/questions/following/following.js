Template.following.helpers({
  questions: function () {
    let followingIds = Meteor.user().followingQuestions || [];
    let questions = Question.find({_id: { $in: followingIds } }, { limit: Session.get('queryLimit'), sort: {createdOn: -1}}).fetch();
    return questions;
  },
  explorePath: function () {
    return Router.path("answer");
  },
  isEmpty: function (array) {
    return array.length === 0;
  }
});
