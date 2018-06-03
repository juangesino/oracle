Template.questionCard.helpers({
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
  getAnswersCount: function () {
    return Answer.find({questionId: this._id}).fetch().length
  },
  isOwnCard: function () {
    return Meteor.userId() === this.userId
  },
  isFollowing: function () {
    return _.contains(this.followers, Meteor.userId());
  }
});

Template.questionCard.events({
  'click .panel': function (event) {
    let paths = _.map(event.originalEvent.path, function(e) { return e.id })
    if (!_.contains(paths, 'deleteQuestion') && !_.contains(paths, 'followQuestion')) {
      Router.go('showQuestion', {id: this._id});
    }
  },
  'click #deleteQuestion': function (event) {
    event.preventDefault();
    Meteor.call('deleteQuestion', this, function (res, err) {
      if (res) {
        toastr.success('Question deleted successfully.');
      } else if (!err) {
        toastr.error('Could not delete question. Try again later.');
      }
    });
  },
  'click #followQuestion': function () {
    event.preventDefault();
    Meteor.call('followQuestion', this, function (res, err) {
      if (res) {
        toastr.success('Question followed successfully.');
      } else if (!err) {
        toastr.error('Could not follow question. Try again later.');
      }
    });
  }
});
