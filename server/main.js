import { Meteor } from 'meteor/meteor';

Question = new Mongo.Collection("question");
Answer = new Mongo.Collection("answer");
Vote = new Mongo.Collection("vote");
Notification = new Mongo.Collection("notification");

Meteor.publish('questionsIndex', function(){
  return Question.find();
});
Meteor.publish('answersIndex', function(){
  return Answer.find();
});
Meteor.publish('votes', function(){
  return Vote.find();
});
Meteor.publish("notifications", function () {
    return Notification.find({userId: this.userId});
});
Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId});
});
Meteor.publish("allUserData", function () {
    return Meteor.users.find({}, {fields: {'profile.name': 1, 'services.google.picture': 1}});
});

Meteor.methods({

});
