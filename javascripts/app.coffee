class @Scout
  constructor: ->
    @initialized = false
    @scouters = []
    @currentScouter = null
    @version = "1.1.6"
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
    @UIInfoKey = $("""
      <details class="scout-info">
        <summary>Key</summary>
        <p> Change Color: Shift+C </p>
        <p> Change Opacity: Shift+X </p>
        <p> Quick Close: Esc </p>
        <p> <a href="mailto:aaron@lifeiscontent.net">Contact</a> </p>
      </details>
    """).appendTo(@UIConsole)
    @UIScouters = $('<div class="scout-scouters" />').hide()
    @UIConsole.prependTo('body')
    @UIScouters.prependTo('body')
    @currentScouter = new Scouter(@UIInfoLogger, @UIScouters, @scouters.length, @colors[0], @opacity[0], @widths[0])
    @scouters.push @currentScouter
    @UIConsole.on 'click', '.scout-referral-link', (event) ->
      $('body').trigger('scout::referral-link')
  onKeydown: (event) =>
    event.stopImmediatePropagation()
    # console.log 'keydown', event, event.keyCode
    if event.keyCode is 27 then @destroy()
    if event.shiftKey
      if event.keyCode is 67
        #color
        cc = @colors.indexOf(@currentScouter.color)
        @currentScouter.color = @colors[(cc+1) % @colors.length]
        @currentScouter.render()
      if event.keyCode is 88
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
  initialize: ->
    if window.top is window
      @initialized = true
      $(document).on
        keydown: @onKeydown
      $('body').on({
        click: @onClick,
        mousemove: @onMousemove
      }, "*:visible")
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
      $('body').on({
        click: @onClick,
        mousemove: @onMousemove
      }, "*:visible")


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
      <p>height: #{@height}px</p>
      <p>color: rgb(#{@color})</p>
      <p>opacity: #{@opacity}</p>
      <p><a href="http://join.hired.com/x/gCzYIT" class="scout-referral-link" target="_blank">Looking for a job?</a></p>
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