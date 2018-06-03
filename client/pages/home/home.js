Template.home.onRendered(function(){
  // $.getScript("/assets/js/bootstrap-toggle.min.js");
});

Template.home.helpers({
  questions: function () {
    let questions = Question.find({}, { limit: Session.get('queryLimit'), sort: {createdOn: -1}}).fetch();
    return questions;
  },
  newQuestionPath: function () {
    return Router.path("newQuestion");
  },
  isEmpty: function (array) {
    return array.length === 0;
  }
});

Template.home.events({
  // 'submit .js-add-pixel': function (event) {
  //   event.preventDefault();
  //   var name = event.target.name.value;
  //   if (name && name != '') {
  //     var pixel = Pixels.insert({
  //       userId: Meteor.userId(),
  //       name: name,
  //       views: 0,
  //       active: true,
  //       createdOn: new Date(),
  //     });
  //     $('#name').val("");
  //     $('#new-pixel-modal').modal('hide');
  //     toastr.success('New pixel created succesfully');
  //     Tracker.flush();
  //     Meteor.defer(function(){
  //       $('.js-pixel-toggle').bootstrapToggle();
  //     });
  //
  //   } else {
  //     $('#new-pixel-error').show();
  //     $('.js-name-form-group').addClass('has-error');
  //   }
  //   return false;
  // },
  // 'change .js-pixel-toggle': function (event) {
  //   $('#show-pixel-modal').modal('hide');
  //   Pixels.update({ _id: this._id }, { $set: { active: !this.active } });
  // },
  // 'click .js-clickable': function () {
  //   let url = Meteor.absoluteUrl() + 'pxl/' + this._id;
  //   let imgTag = '&lt;img src="'+url+'" alt=""/&gt;';
  //   $('#showPixelTitle').text(this.name);
  //   $('#showPixelUrl').text(url);
  //   $('#showPixelImg').html(imgTag);
  //   $('#showPixelViews').text(this.views);
  //   $('#removePixel').val(this._id);
  //   $('#show-pixel-modal').modal('show');
  // },
  // 'click #removePixel': function (event) {
  //   let pixelId = event.target.value;
  //   Pixels.remove(pixelId);
  //   $('#show-pixel-modal').modal('hide');
  //   toastr.success('Pixel deleted succesfully');
  // }
});
