Template.navBar.helpers({
  user_name: function () {
    return Meteor.user().profile.name;
  },
  profile_image: function () {
    if (Meteor.user() && Meteor.user().services.google && Meteor.user().services.google.picture) {
      return Meteor.user().services.google.picture;
    } else {
      return 'http://placehold.it/30x30';
    }
  },
  getClass: function (route_path) {
    if (route_path == Iron.Location.get().path) {
      return 'active';
    } else {
      return '';
    }
  },
  getNotificationClass: function () {
    let notifications = Notification.find({userId: Meteor.userId(), read: false}).fetch().length;
    if (notifications === 0) {
      return 'hidden';
    } else {
      return '';
    }
  },
  getNotificationCount: function () {
    return Notification.find({userId: Meteor.userId(), read: false}).fetch().length;
  },
  home_path: function () {
    return Router.path("home");
  },
  ask_path: function () {
    return Router.path("ask");
  },
  answer_path: function () {
    return Router.path("answer");
  },
  notifications_path: function () {
    return Router.path("indexNotifications");
  },
  following_path: function () {
    return Router.path("following");
  },
});
