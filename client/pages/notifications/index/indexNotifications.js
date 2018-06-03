Template.onCreated(function () {
  Session.set('queryLimit', 15);
});

Template.indexNotifications.helpers({
  notifications: function () {
    let notifications = Notification.find({ userId: Meteor.userId() }, { limit: Session.get('queryLimit'), sort: {createdOn: -1}}).fetch();
    return notifications;
  },
  isEmpty: function (array) {
    return array.length === 0;
  },
});

Template.indexNotifications.events({
  'click #markAllAsRead': function (event) {
    event.preventDefault();
    Meteor.call('markAllAsRead', function (res, err) {
      if (res) {
        toastr.success('Marked all notifications as read.');
      } else if (!err) {
        toastr.error('Could not mark notifications as read. Try again later.');
      }
    })
  }
});
