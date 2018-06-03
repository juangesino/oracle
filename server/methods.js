Meteor.methods({
  notifyAnswer: function (answerId) {
    this.unblock();
    let answer = Answer.findOne(answerId);
    let questionId = answer.questionId;
    let question = Question.findOne(questionId);
    // We need to notify the question's author (and followers).
    // Don't notify if self answer.
    if (answer.userId !== question.userId) {
      Notification.insert({
        type: 'newAnswer',
        reason: 'author',
        userId: question.userId,
        notifierId: Meteor.userId(),
        questionId: questionId,
        answerId: answerId,
        read: false,
        createdOn: new Date(),
      });
    }
    let followers = question.followers;
    _.each(followers, function (follower) {
      // Don't notify if self answer.
      if (answer.userId !== follower) {
        Notification.insert({
          type: 'newAnswer',
          reason: 'follower',
          userId: follower,
          notifierId: Meteor.userId(),
          questionId: questionId,
          answerId: answerId,
          read: false,
          createdOn: new Date(),
        });
      }
    })
    return true;
  },
  markAllAsRead: function () {
    Notification.update({userId: Meteor.userId()}, {$set: {read: true}}, {multi: true});
    return true;
  },
  followQuestion: function (question) {
    let followers = question.followers || [];
    let following = Meteor.user().followingQuestions || [];
    if (_.contains(followers, Meteor.userId())) {
      // The user is already following the question.
      // Let's unfollow.
      followers = _.reject(followers, function (id) { return id === Meteor.userId(); });
      following = _.reject(following, function (id) { return id === question._id; });
      Question.update(question._id, {
        $set: {
          followers: followers,
          updatedOn: new Date(),
        }
      });
      Meteor.users.update(Meteor.userId(), {
        $set: {
          followingQuestions: following
        }
      });
    } else {
      // The user is not following the question.
      // Let's follow.
      followers.push(Meteor.userId());
      following.push(question._id);
      Question.update(question._id, {
        $set: {
          followers: followers,
          updatedOn: new Date(),
        }
      });
      Meteor.users.update(Meteor.userId(), {
        $set: {
          followingQuestions: following
        }
      });
    }
    return true;
  },
  deleteAnswer: function (answer) {
    this.unblock();
    let answerId = answer._id;
    if (answer.userId === this.userId) {
      Answer.remove(answerId);
      Vote.remove({answerId: answerId});
      return true;
    } else {
      return false;
    }
  },
  deleteQuestion: function (question) {
    this.unblock();
    let questionId = question._id;
    if (question.userId === this.userId) {
      Question.remove(questionId);
      Answer.remove({questionId: questionId});
      Vote.remove({questionId: questionId});
      return true;
    } else {
      return false;
    }
  },
});
