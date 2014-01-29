// Generated by CoffeeScript 1.7.0
(function() {
  var Scouter,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.Scout = (function() {
    function Scout() {
      this.onClick = __bind(this.onClick, this);
      this.onMousemove = __bind(this.onMousemove, this);
      this.onKeydown = __bind(this.onKeydown, this);
      this.initialized = false;
      this.scouters = [];
      this.currentScouter = null;
      this.version = "1.1.6";
      this.colors = [[255, 0, 0], [0, 255, 0], [0, 0, 255]];
      this.widths = ['outerWidth', 'width', 'innerWidth'];
      this.opacity = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
      this.UIConsole = $('<div class="scout-console" />').hide();
      this.UILogo = $('<div class="scout-logo" />').text("Scout").appendTo(this.UIConsole);
      this.UIInfoLogger = $('<details class="scout-info" open><summary>Scouters</summary></details>').appendTo(this.UIConsole);
      this.UIInfoKey = $("<details class=\"scout-info\">\n  <summary>Key</summary>\n  <p> Change Color: Shift+C </p>\n  <p> Change Opacity: Shift+X </p>\n  <p> Quick Close: Esc </p>\n  <p> <a href=\"mailto:aaron@lifeiscontent.net\">Contact</a> </p>\n</details>").appendTo(this.UIConsole);
      this.UIScouters = $('<div class="scout-scouters" />').hide();
      this.UIConsole.prependTo('body');
      this.UIScouters.prependTo('body');
      this.currentScouter = new Scouter(this.UIInfoLogger, this.UIScouters, this.scouters.length, this.colors[0], this.opacity[0], this.widths[0]);
      this.scouters.push(this.currentScouter);
      this.UIConsole.on('click', '.scout-referral-link', function(event) {
        return $('body').trigger('scout::referral-link');
      });
    }

    Scout.prototype.onKeydown = function(event) {
      var cc, co;
      event.stopImmediatePropagation();
      if (event.keyCode === 27) {
        this.destroy();
      }
      if (event.shiftKey) {
        if (event.keyCode === 67) {
          cc = this.colors.indexOf(this.currentScouter.color);
          this.currentScouter.color = this.colors[(cc + 1) % this.colors.length];
          this.currentScouter.render();
        }
        if (event.keyCode === 88) {
          co = this.opacity.indexOf(this.currentScouter.opacity);
          this.currentScouter.opacity = this.opacity[(co + 1) % this.opacity.length];
          return this.currentScouter.render();
        }
      }
    };

    Scout.prototype.onMousemove = function(event) {
      var $target;
      if (!this.currentScouter) {
        return;
      }
      event.stopImmediatePropagation();
      $target = $(event.currentTarget);
      $.extend(this.currentScouter, {
        x: $target.offset().left,
        y: $target.offset().top,
        width: $target.outerWidth(),
        height: $target.outerHeight()
      });
      return this.UIScouters.html(this.currentScouter.render());
    };

    Scout.prototype.onClick = function(event) {
      return event.stopImmediatePropagation();
    };

    Scout.prototype.initialize = function() {
      if (window.top === window) {
        this.initialized = true;
        $(document).on({
          keydown: this.onKeydown
        });
        $('body').on({
          click: this.onClick,
          mousemove: this.onMousemove
        }, "*:visible");
        this.UIConsole.show();
        return this.UIScouters.show();
      }
    };

    Scout.prototype.destroy = function() {
      if (window.top === window) {
        this.initialized = false;
        this.UIConsole.hide();
        this.UIScouters.hide();
        $(document).on({
          keydown: this.onkeydown
        });
        return $('body').on({
          click: this.onClick,
          mousemove: this.onMousemove
        }, "*:visible");
      }
    };

    return Scout;

  })();

  Scouter = (function() {
    function Scouter(logger, parent, id, color, opacity, widthType, x, y, width, height) {
      this.logger = logger;
      this.parent = parent;
      this.id = id;
      this.color = color;
      this.opacity = opacity;
      this.widthType = widthType;
      this.x = x != null ? x : 0;
      this.y = y != null ? y : 0;
      this.width = width != null ? width : 0;
      this.height = height != null ? height : 0;
      this.el = $('<div class="scouter" />').appendTo(this.parent);
      this.log = $('<div class="scout-scouter-info">').appendTo(this.logger);
    }

    Scouter.prototype.hide = function() {
      return this.el.hide();
    };

    Scouter.prototype.show = function() {
      return this.el.show();
    };

    Scouter.prototype.toJSON = function() {
      return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        color: this.color,
        opacity: this.opacity
      };
    };

    Scouter.prototype.render = function() {
      this.log.html("<p>x: " + this.x + "px</p>\n<p>y: " + this.y + "px</p>\n<p>width: " + this.width + "px</p>\n<p>height: " + this.height + "px</p>\n<p>color: rgb(" + this.color + ")</p>\n<p>opacity: " + this.opacity + "</p>\n<p><a href=\"http://join.hired.com/x/gCzYIT\" class=\"scout-referral-link\" target=\"_blank\">Looking for a job?</a></p>");
      return this.el.css({
        position: 'absolute',
        pointerEvents: 'none',
        zIndex: 9999,
        left: this.x,
        top: this.y,
        width: this.width,
        height: this.height,
        backgroundColor: "rgba(" + (this.color.join(',') + ',' + this.opacity) + ")"
      });
    };

    return Scouter;

  })();

}).call(this);

//# sourceMappingURL=app.map
