Template.newQuestion.events({
  'submit #newQuestionForm': function (event) {
    event.preventDefault();
    var title = event.target.title.value;
    var description = event.target.description.value;
    if (title && title != '') {
      var question = Question.insert({
        userId: Meteor.userId(),
        title: title,
        description: description,
        createdOn: new Date(),
      });
      Router.go('ask');
    } else {
      $('#newQuestionTitleAlert').show();
      $('#newQuestionTitle').addClass('has-error');
    }
    return false;
  },
});
