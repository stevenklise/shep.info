(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var AppView, EventDateView, EventView, EventsView, MessageView, MessagesView, _ref;
    AppView = (function(_super) {

      __extends(AppView, _super);

      function AppView() {
        AppView.__super__.constructor.apply(this, arguments);
      }

      AppView.prototype.el = '#content';

      AppView.prototype.initialize = function(options) {
        this.collection.bind('reset', this.render, this);
        return this.messagesview = new MessagesView({
          collection: this.collection
        });
      };

      AppView.prototype.render = function() {};

      return AppView;

    })(Backbone.View);
    MessageView = (function(_super) {

      __extends(MessageView, _super);

      function MessageView() {
        MessageView.__super__.constructor.apply(this, arguments);
      }

      MessageView.prototype.className = 'message';

      MessageView.prototype.tagName = 'li';

      MessageView.prototype.template = $('#message-template').html();

      MessageView.prototype.render = function() {
        this.template = $("#" + (this.model.get(type)) + "-message-template").html();
        $(this.el).html(Mustache.render(this.template, this.model.toJSON()));
        return this;
      };

      return MessageView;

    })(Backbone.View);
    MessagesView = (function(_super) {

      __extends(MessagesView, _super);

      function MessagesView() {
        MessagesView.__super__.constructor.apply(this, arguments);
      }

      MessagesView.prototype.el = '#chat-window';

      MessagesView.prototype.template = $('#chat-window-template').html();

      MessagesView.prototype.events = {
        'click .exitable-room': 'leaveChannel',
        'mouseenter .exitable-room': 'showX',
        'mouseleave .exitable-room': 'hideX',
        'blur .chat-name': 'updateName',
        'keyup .new-message-input': 'resizeInput',
        'keypress .new-message-input': 'sendMessage'
      };

      MessagesView.prototype.initialize = function(options) {
        var view;
        view = this;
        this.promptUserName();
        return $(window).bind('resize', function() {
          return view.fitHeight($(this).height());
        });
      };

      MessagesView.prototype.fitHeight = function(windowHeight) {
        var chatInterior, chatWindowHeight, toolbarHeight;
        toolbarHeight = $('#chat-toolbar').height();
        console.log($(this.el));
        $('#chat-window').css('height', windowHeight + 'px');
        chatWindowHeight = windowHeight - toolbarHeight;
        chatInterior = chatWindowHeight - this.$('#new-message').height();
        this.$('#chat-log-container').height(chatInterior);
        return this.$('#chat-log').css('min-height', chatInterior);
      };

      MessagesView.prototype.promptUserName = function() {
        var $input, namePrompt,
          _this = this;
        namePrompt = new ui.Confirmation({
          title: "Please enter a name.",
          message: $('<p>No spaces, names must be between<br>4 and 20 characters. </p><input type="text">')
        }).modal().show(function(ok) {
          if (ok) return now.changeName($(this.el).find('input').val().trim());
        });
        namePrompt.el.find('.ok').attr('disabled', 'true').end().find('.cancel').remove();
        $input = $(namePrompt.el).find('input');
        $input.focus();
        $input.keydown(function(event) {
          if (event.keyCode === 32) return false;
        });
        return $input.keypress(function(event) {
          var origVal;
          origVal = $input.val().trim();
          if (origVal.length >= 20) return false;
          if (origVal.length > 3) {
            if (event.keyCode === 13) {
              namePrompt.emit('ok');
              namePrompt.callback(true);
              namePrompt.hide();
            }
            return namePrompt.el.find('.ok').removeAttr('disabled');
          } else {
            return namePrompt.el.find('.ok').attr('disabled', 'disabled');
          }
        });
      };

      MessagesView.prototype.render = function() {
        $(this.el).empty().html(Mustache.render(this.template));
        this.fitHeight($(window).height());
        return this;
      };

      MessagesView.prototype.resizeInput = function(e) {
        var message;
        message = $(e.target).val();
        if (message.length > 80) {
          return $(e.target).attr('rows', 2);
        } else {
          return $(e.target).attr('rows', 1);
        }
      };

      MessagesView.prototype.sendMessage = function(e) {
        var message;
        message = $(e.target).val().trim();
        if (e.which === 13) {
          if (message.length === 0) return false;
          now.distributeChatMessage(now.name, message);
          $(e.target).val('').attr('rows', 1);
          return false;
        }
      };

      MessagesView.prototype.updateName = function(e) {
        var oldname, raw;
        raw = $(e.target).val();
        console.log(raw);
        if (raw !== now.name) {
          oldname = now.name;
          now.name = raw;
          now.changeNick(oldname, now.name);
          return true;
        } else {
          return false;
        }
      };

      MessagesView.prototype.showX = function(e) {
        return $(e.target).text('*');
      };

      MessagesView.prototype.hideX = function(e) {
        return $(e.target).text('q');
      };

      MessagesView.prototype.leaveChannel = function() {
        var channelName,
          _this = this;
        channelName = $(this).closest('li').data('channel-name');
        return new ui.Confirmation({
          title: "Leave " + channelName + " channel",
          message: 'are you sure?'
        }).show(function(ok) {
          if (ok) {
            $(_this).closest('li').remove();
            return ui.dialog('Seeya!').show().hide(1500);
          }
        });
      };

      return MessagesView;

    })(Backbone.View);
    EventsView = (function(_super) {

      __extends(EventsView, _super);

      function EventsView() {
        EventsView.__super__.constructor.apply(this, arguments);
      }

      EventsView.prototype.id = 'event-feed';

      EventsView.prototype.tagName = 'ul';

      EventsView.prototype.template = ($('#events-template')).html();

      EventsView.prototype.initialize = function(options) {
        var fit;
        fit = this.fitHeight;
        return $(window).bind('resize', function() {
          return fit($(this).height());
        });
      };

      EventsView.prototype.fitHeight = function(windowHeight) {
        var headerHeight, toolbarHeight;
        headerHeight = $('#header').height();
        toolbarHeight = $('#toolbars').height();
        return $('#event-window').css('height', windowHeight - headerHeight - toolbarHeight);
      };

      EventsView.prototype.render = function() {
        var event, eventView, _i, _len, _ref;
        $(this.el).empty();
        _ref = this.collection.models;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          event = _ref[_i];
          eventView = new EventView({
            model: event
          });
          $(this.el).append(eventView.render().el);
        }
        this.fitHeight($(window).height());
        return this;
      };

      return EventsView;

    })(Backbone.View);
    EventDateView = (function(_super) {

      __extends(EventDateView, _super);

      function EventDateView() {
        EventDateView.__super__.constructor.apply(this, arguments);
      }

      EventDateView.prototype.tagName = 'li';

      EventDateView.prototype.className = 'event-date';

      EventDateView.prototype.template = ($('#event-date')).html();

      EventDateView.prototype.render = function() {
        $(this.el).html(Mustache.render(this.template, this.model.toJSON()));
        return this;
      };

      return EventDateView;

    })(Backbone.View);
    EventView = (function(_super) {

      __extends(EventView, _super);

      function EventView() {
        EventView.__super__.constructor.apply(this, arguments);
      }

      EventView.prototype.className = 'event';

      EventView.prototype.tagName = 'li';

      EventView.prototype.template = ($('#event-template')).html();

      EventView.prototype.events = {
        'click': 'toggleExpanded'
      };

      EventView.prototype.render = function() {
        $(this.el).html(Mustache.render(this.template, this.model.toJSON()));
        return this;
      };

      EventView.prototype.toggleExpanded = function() {
        return this.$('.details').toggle();
      };

      return EventView;

    })(Backbone.View);
    this.app = (_ref = window.app) != null ? _ref : {};
    this.app.AppView = AppView;
    return this.app.MessagesView = new MessagesView;
  });

}).call(this);
