Template.answerCard.helpers({
  getImage: function (answer) {
    let userId = answer.userId;
    let user = Meteor.users.findOne(userId);
    if (user && user.services && user.services.google && user.services.google.picture) {
      return user.services.google.picture;
    } else {
      return 'http://placehold.it/30x30';
    }
  },
  getUserName: function (answer) {
    let userId = answer.userId;
    let user = Meteor.users.findOne(userId);
    if (user && user.profile && user.profile.name) {
      return user.profile.name;
    } else {
      return 'Anonymous';
    }
  },
  getDate: function (answer) {
    return moment(answer.createdOn).fromNow();
  },
  isOwnCard: function () {
    return Meteor.userId() === this.userId
  },
  getVotes: function (vote) {
    let votes = Vote.find({answerId: this._id, value: vote}).fetch().length;
    return votes;
  },
  getVoteButtonClass: function (vote) {
    let votes = Vote.find({ answerId: this._id, value: vote, userId: Meteor.userId() }).fetch().length;
    if (votes === 0) {
      return 'btn-default';
    } else {
      return 'btn-accent';
    }
  }
});

Template.answerCard.events({
  'click #deleteAnswer': function (event) {
    event.preventDefault();
    Meteor.call('deleteAnswer', this, function (res, err) {
      if (res) {
        toastr.success('Answer was successfully removed.');
      } else if (!err) {
        toastr.error('Could not delete answer. Try again later.');
      }
    });
  },
  'click .js-answer-vote': function (event) {
    event.preventDefault();
    let voteValue = parseInt($(event.target).data('voteValue'));
    if (_.contains([1, -1], voteValue)) {
      let votes = Vote.find({ answerId: this._id, userId: Meteor.userId() }).fetch();
      if (votes.length === 0) {
        // No previous vote. Need to add a new one.
        let vote = Vote.insert({
          answerId: this._id,
          questionId: this.questionId,
          userId: Meteor.userId(),
          value: voteValue,
          createdOn: new Date(),
        });
        toastr.success('Successfully submitted vote.');
      } else if (votes.length === 1) {
        // There's already a vote submitted by this user for this answer.
        let vote = votes[0];
        if (vote.value === voteValue) {
          // Voted the same value, removing vote by setting value to zero.
          voteValue = 0;
        }
        Vote.update({ _id: vote._id }, { $set: { updatedOn: new Date(), value: voteValue } });
        toastr.success('Successfully updated vote.');
      } else {
        // There are more than one vote for this answer by this user. :|
        toastr.error('Could not submit vote. Try again later.');
      }
    } else {
      toastr.error('Could not submit vote. Try again later.');
    }
  }
});
