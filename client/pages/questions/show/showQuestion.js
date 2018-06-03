Template.showQuestion.helpers({
  question: function () {
    let question = Question.findOne({_id: Session.get('showQuestion') });
    return question;
  },
  answers: function () {
    let answers = Answer.find({ questionId: Session.get('showQuestion') }, { limit: Session.get('queryLimit'), sort: {createdOn: -1}}).fetch();
    return answers;
  },
  getImage: function (question) {
    let userId = question.userId;
    let user = Meteor.users.findOne(userId);
    if (user && user.services && user.services.google && user.services.google.picture) {
      return user.services.google.picture;
    } else {
      return 'http://placehold.it/30x30';
    }
  },
  getUserName: function (question) {
    let userId = question.userId;
    let user = Meteor.users.findOne(userId);
    if (user && user.profile && user.profile.name) {
      return user.profile.name;
    } else {
      return 'Anonymous';
    }
  },
  getDate: function (question) {
    return moment(question.createdOn).fromNow();
  },
  newQuestionPath: function () {
    return Router.path("newQuestion");
  },
  isFollowing: function (question) {
    return _.contains(question.followers, Meteor.userId());
  }
});

Template.showQuestion.events({
  'submit #newAnswerForm': function (event) {
    event.preventDefault();
    let text = event.target.text.value;
    if (text && text != '') {
      var answer = Answer.insert({
        userId: Meteor.userId(),
        questionId: Session.get('showQuestion'),
        text: text,
        createdOn: new Date(),
      });
      Meteor.call('notifyAnswer', answer);
      $('#newAnswerTextAlert').hide();
      $('#newAnswerText').removeClass('has-error');
      $('textarea').val('');
      toastr.success('Answer was successfully submitted.');
    } else {
      $('#newAnswerTextAlert').show();
      $('#newAnswerText').addClass('has-error');
    }
    return false;
  },
  'click #followQuestion': function () {
    event.preventDefault();
    let question = Question.findOne(Session.get('showQuestion'));
    Meteor.call('followQuestion', question, function (res, err) {
      if (res) {
        toastr.success('Question followed successfully.');
      } else if (!err) {
        toastr.error('Could not follow question. Try again later.');
      }
    });
  }
});
