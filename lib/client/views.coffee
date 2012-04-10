jQuery ->
  class AppView extends Backbone.View
    el: '#content'
    initialize: (options) ->
      @collection.bind 'reset', @render, @
      @messagesview = new MessagesView collection: @collection
      # @eventsview = new EventsView collection: @collection
    render: ->
      # $(@el).find('#event-window').append @eventsview.render().el
      @messagesview.render().el
  
  # Chat Message
  #---------------------------------------------------
  
  class MessageView extends Backbone.View
    className: 'message'
    tagName: 'li'
    template: ($('#message-template').html())
    render: ->
      $(@el).html Mustache.render(@template, @model.toJSON())
      @

  # Chat Window
  #---------------------------------------------------
  
  class MessagesView extends Backbone.View
    el: '#chat-window'
    initialize: (options) ->
      fit = @fitHeight
      $(window).bind 'resize', ->
        fit($(this).height())
    fitHeight: (windowHeight) ->
      headerHeight = $('#header').height()
      toolbarHeight = $('#toolbars').height()
      console.log $(@el)
      $('#chat-window').css('height', (windowHeight - headerHeight - toolbarHeight) + 'px')
      chatWindowHeight = windowHeight - headerHeight - toolbarHeight
      chatInterior = chatWindowHeight - @$('#new-message').height()
      @$('#chat-log-container').height(chatInterior)
      @$('#chat-log').css('min-height', chatInterior)
    render: ->
      @fitHeight $(window).height()
      @
  

  # Events Roll
  #---------------------------------------------------
  # class EventsView extends Backbone.View
  #   id: 'event-feed'
  #   tagName: 'ul'
  #   template: ($ '#events-template').html()
  #   initialize: (options) ->
  #     fit = @fitHeight
  #     $(window).bind 'resize', ->
  #       fit($(this).height())
  #   fitHeight: (windowHeight) ->
  #     headerHeight = $('#header').height()
  #     toolbarHeight = $('#toolbars').height()
  #     $('#event-window').css('height', windowHeight - headerHeight - toolbarHeight)
  #   render: ->
  #     $(@el).empty()
  #     for event in @collection.models
  #       eventView = new EventView model: event
  #       $(@el).append(eventView.render().el)
  #     @fitHeight $(window).height()
  #     @

  # Event Date
  #---------------------------------------------------
  # class EventDateView extends Backbone.View
  #   tagName: 'li'
  #   className: 'event-date'
  #   template: ($ '#event-date').html()
  #   render: ->
  #     $(@el).html Mustache.render(@template, @model.toJSON())
  #     @


  # Event View
  #---------------------------------------------------
  class EventView extends Backbone.View
    className: 'event'
    tagName: 'li'
    template: ($ '#event-template').html()
    events:
      'click' : 'toggleExpanded'
    render: ->
      $(@el).html Mustache.render(@template, @model.toJSON())
      @
    toggleExpanded: ->
      # I don't like how this is working currently. When you click on the link
      # for Google Calendar it toggles. Also clicking this one doesn't close
      # the rest.
      @$('.details').toggle()

  @app = window.app ? {}
  @app.AppView = AppView