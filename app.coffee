scout = null
class Scout
  constructor: ->
    @initialized = false
    @scouters = []
    @currentScouter = null
    @version = 1.1
    @colors = [
      [255,0,0] # red
      [0,255,0] # green
      [0,0,255] # blue
    ]
    @widths = ['outerWidth', 'width', 'innerWidth'];
    @opacity = [ 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9 ]
    @UIConsole = $('<div class="scout-console" />').hide()
    @UILogo = $('<div class="scout-logo" />').text("Scout").appendTo(@UIConsole)
    @UIInfoLogger = $('<details class="scout-info" open><summary>Scouters</summary></details>').appendTo(@UIConsole)
    $("""
      <details class="scout-info">
        <summary>Key</summary>
        <p> Change Color: Shift+C </p>
        <p> Change Opacity: Shift+X </p>
        <p> Quick Close: Esc </p>
      </details>
    """).appendTo(@UIConsole)
    @UIScouters = $('<div class="scout-scouters" />').hide()
    @UIConsole.prependTo('body')
    @UIScouters.prependTo('body')
    @currentScouter = new Scouter(@UIInfoLogger, @UIScouters, @scouters.length, @colors[0], @opacity[0], @widths[0])
    @scouters.push @currentScouter
  onKeydown: (event) =>
    event.stopImmediatePropagation()
    # console.log 'keydown', event, event.which
    if event.which is 27 then @destroy()
    if event.shiftKey
      if event.which is 67
        #color
        cc = @colors.indexOf(@currentScouter.color)
        @currentScouter.color = @colors[(cc+1) % @colors.length]
        @currentScouter.render()
      if event.which is 88
        co = @opacity.indexOf(@currentScouter.opacity)
        @currentScouter.opacity = @opacity[(co+1) % @opacity.length]
        @currentScouter.render()
  onMousemove: (event) =>
    unless @currentScouter then return
    event.stopImmediatePropagation()
    $target = $(event.currentTarget)
    $.extend @currentScouter,
      x: $target.offset().left
      y: $target.offset().top
      width: $target.outerWidth()
      height: $target.outerHeight()
    @UIScouters.html @currentScouter.render()
  onClick: (event) =>
    event.stopImmediatePropagation()
    if @currentScouter
      # console.log "drop scouter"
    else
      # console.log "creating new scouter"
  initialize: ->
    if window.top is window
      @initialized = true
      $(document).on
        keydown: @onKeydown
      $('body').on
        click: @onClick
        mousemove: @onMousemove
      , "*:visible"
      # add console
      # add first scouter instance
      # console.log 'scout built!'
      @UIConsole.show()
      @UIScouters.show()
  destroy: ->
    if window.top is window
      @initialized = false
       # hide scout instance
      # console.log "destroy instance"
      @UIConsole.hide()
      @UIScouters.hide()
      $(document).on
        keydown: @onkeydown
      $('body').on
        click: @onClick
        mousemove: @onMousemove
      , "*:visible"

class Scouter
  constructor: (@logger,@parent,@id,@color,@opacity,@widthType,@x=0,@y=0,@width=0,@height=0) ->
    @el = $('<div class="scouter" />').appendTo(@parent)
    @log = $('<div class="scout-scouter-info">').appendTo(@logger)
  hide: -> @el.hide()
  show: -> @el.show()
  toJSON: ->
    x: @x
    y: @y
    width: @width
    height: @height
    color: @color
    opacity: @opacity
  render: ->
    @log.html """
      <p>x: #{@x}px</p>
      <p>y: #{@y}px</p>
      <p>width: #{@width}px</p>
      <p>height: #{@el[@widthType]()}px</p>
      <p>color: rgb(#{@color})</p>
      <p>opacity: #{@opacity}</p>
    """
    @el.css
      position: 'absolute'
      pointerEvents: 'none'
      zIndex: 9999
      left: @x
      top: @y
      width: @width
      height: @height
      backgroundColor: "rgba(#{@color.join(',')+','+@opacity})"

# commandHandler = (event) -> console.log arguments
# validateHandler = (event) -> console.log arguments
messageHandler = (event) ->
  # console.log arguments
  # console.log scout
  switch event.name
    when "initialize"
      unless scout
        scout = new Scout()
        scout.initialize()
      else if scout.initialized isnt true then scout.initialize()
      else scout.destroy()

# safari.self.addEventListener "command", commandHandler, false
# safari.self.addEventListener "validate", validateHandler, false
safari.self.addEventListener "message", messageHandler, false