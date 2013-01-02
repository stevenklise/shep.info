$(document).ready(function () {
  // Feedback Form
  //___________________________________________________________________________
  var FeedbackView = Backbone.View.extend({
    el: '#feedback-box',

    events: {
      'click .feedback-button': 'toggleForm',
      'click .feedback-send': 'sendFeedback'
    },

    initialize: function (options) {
      this.render().el;
    },

    templateSource: $('#feedback-template').html(),

    render: function () {
      this.template = Handlebars.compile(this.templateSource);
      $(this.el).append(this.template());
      return this;
    },

    // Renders feedback form to the page prepopulated with urrent chat name or if the form is already on the page, removes it.
    toggleForm: function (event) {
      var $feedbackForm = $('#feedback-form');
      if ($feedbackForm.html().length === 0) {
        $feedbackForm.append(Mustache.render($('#feedback-form-template').html(), {
          name: now.name
        }));
      } else {
        $feedbackForm.empty();
      }
      return false;
    },

    // When the "Send Feedback" button is clicked, save the feedback message to
    // Redis and empty the feedback form.
    sendFeedback: function (event) {
      var sender = $('#feedback-name').val();
      var message = $('#feedback-message').val();
      now.logFeedback(sender, message);
      $('#feedback-form').empty();
      return false;
    }
  });

  this.app = window.app != null ? window.app : {}
  this.app.FeedbackView = FeedbackView;
});