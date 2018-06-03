Template.notificationCard.helpers({
  getImage: function (object) {
    let userId = object.userId;
    let user = Meteor.users.findOne(userId);
    if (user && user.services && user.services.google && user.services.google.picture) {
      return user.services.google.picture;
    } else {
      return 'http://placehold.it/30x30';
    }
  },
  getUserName: function () {
    let userId = this.notifierId;
    let user = Meteor.users.findOne(userId);
    if (user && user.profile && user.profile.name) {
      return user.profile.name;
    } else {
      return 'Anonymous';
    }
  },
  getDate: function (object) {
    return moment(object.createdOn).fromNow();
  },
  getAnswersCount: function () {
    return Answer.find({questionId: this._id}).fetch().length
  },
  isReadClass: function () {
    if (this.read) {
      return 'hidden';
    }
  },
  getNotificationPath: function () {
    return Router.path("showQuestion", {id: this.questionId});
  },
  getActionText: function () {
    let notificationType = this.type;
    let notificationsReason = this.reason;
    switch (notificationType) {
      case 'newAnswer':
        if (notificationsReason === 'author') {
          return 'added an answer to your question'
        } else if (notificationsReason === 'follower') {
          return 'added an answer to a question you follow'
        }
        break;
      default:
        return ''
    }
  }
});

Template.notificationCard.events({
  'click .js-mark-as-read': function (event) {
    Notification.update(this._id, {
      $set: {
        read: true
      }
    });
  },

});
