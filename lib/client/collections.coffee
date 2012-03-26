class Events extends Backbone.Collection
  model: app.Event
  url: 'http://itp-api.herokuapp.com/calendar/week?callback=?'

class Messages extends Backbone.Collection
  model: app.Message

@app = window.app ? {}
@app.Events = new Events
@app.Messages = new Messages