import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Meteor.subscribe('questionsIndex');
Meteor.subscribe('answersIndex');
Meteor.subscribe('votes');
Meteor.subscribe('notifications');
Meteor.subscribe('userData');
Meteor.subscribe('allUserData');

Question = new Mongo.Collection("question");
Answer = new Mongo.Collection("answer");
Vote = new Mongo.Collection("vote");
Notification = new Mongo.Collection("notification");

// toastr Configuration (http://codeseven.github.io/toastr/demo.html)
toastr.options.progressBar = true;
toastr.options.positionClass = "toast-bottom-left";
toastr.options.preventDuplicates = true;

Session.set('queryLimit', 5);

lastScrollTop = 0;
$(window).scroll(function(event){
  if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
    var scrollTop = $(this).scrollTop();
    if (scrollTop > lastScrollTop) {
      Session.set('queryLimit', Session.get('queryLimit') + 10);
    }
    lastScrollTop = scrollTop;
  }
});
