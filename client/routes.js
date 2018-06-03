// Define the template for Iron Router.
Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

// Create the index route.
Router.map(function() {
  this.route('home', {
    path: '/',
    to: 'main',
    name: 'home',
    template: 'home',
    loadingTemplate: 'loading',
    waitOn: function () {
      return Meteor.subscribe('questionsIndex');
    },
    onBeforeAction: function () {
      if (!Meteor.userId()) {
        return this.redirect('/login');
      }
      this.next();
    }
  });
  this.route('indexNotifications', {
    path: '/notifications',
    to: 'main',
    name: 'indexNotifications',
    template: 'indexNotifications',
    loadingTemplate: 'loading',
    waitOn: function () {
      return Meteor.subscribe('notifications');
    },
    onBeforeAction: function () {
      if (!Meteor.userId()) {
        return this.redirect('/login');
      }
      this.next();
    }
  });
  this.route('following', {
    path: '/following',
    to: 'main',
    name: 'following',
    template: 'following',
    loadingTemplate: 'loading',
    waitOn: function () {
      return Meteor.subscribe('questionsIndex');
    },
    onBeforeAction: function () {
      if (!Meteor.userId()) {
        return this.redirect('/login');
      }
      this.next();
    }
  });
  this.route('ask', {
    path: '/ask',
    to: 'main',
    name: 'ask',
    template: 'ask',
    loadingTemplate: 'loading',
    waitOn: function () {
      return Meteor.subscribe('questionsIndex');
    },
    onBeforeAction: function () {
      if (!Meteor.userId()) {
        return this.redirect('/login');
      }
      this.next();
    }
  });
  this.route('answer', {
    path: '/answer',
    to: 'main',
    name: 'answer',
    template: 'answer',
    loadingTemplate: 'loading',
    waitOn: function () {
      return Meteor.subscribe('questionsIndex');
    },
    onBeforeAction: function () {
      if (!Meteor.userId()) {
        return this.redirect('/login');
      }
      this.next();
    }
  });
  this.route('newQuestion', {
    path: '/questions/new',
    to: 'main',
    name: 'newQuestion',
    template: 'newQuestion',
    loadingTemplate: 'loading',
    waitOn: function () {
      // return Meteor.subscribe('pixelsIndex');
    },
    onBeforeAction: function () {
      if (!Meteor.userId()) {
        return this.redirect('/login');
      }
      this.next();
    }
  });
  this.route('showQuestion', {
    path: '/questions/:id',
    to: 'main',
    name: 'showQuestion',
    template: 'showQuestion',
    loadingTemplate: 'loading',
    waitOn: function () {
      return [
        Meteor.subscribe('questionsIndex'),
        Meteor.subscribe('answersIndex')
      ];
    },
    onBeforeAction: function () {
      if (!Meteor.userId()) {
        return this.redirect('/login');
      }
      if (this.params.id) {
        Session.set('showQuestion', this.params.id);
      } else {
        // If no ID present, redirect to home.
        return this.redirect('/');
      }
      this.next();
    }
  });
  this.route('sign_in', {
    path: '/login',
    to: 'main',
    layoutTemplate: "MainLayout",
    onBeforeAction: function () {
      this.next();
    }
  });

  this.route('signOut', {
    path: '/logout',
    onBeforeAction: function () {
      Meteor.logout();
      return this.redirect('/login');
    }
  });
});
