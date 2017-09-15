// Contains: 
//	owl.carousel.js
//	jquery.magnific-popup.js
//	foundation.min.js
//	slick.min.js
//	jquery.lazyload.js

// owl.carousel.js STARTS
! function(a, b, c, d) {
    function e(b, c) {
        this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: {
                start: null,
                current: null
            },
            direction: null
        }, this._states = {
            current: {},
            tags: {
                initializing: ["busy"],
                animating: ["busy"],
                dragging: ["interacting"]
            }
        }, a.each(["onResize", "onThrottledResize"], a.proxy(function(b, c) {
            this._handlers[c] = a.proxy(this[c], this)
        }, this)), a.each(e.Plugins, a.proxy(function(a, b) {
            this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this)
        }, this)), a.each(e.Workers, a.proxy(function(b, c) {
            this._pipe.push({
                filter: c.filter,
                run: a.proxy(c.run, this)
            })
        }, this)), this.setup(), this.initialize()
    }
    e.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: b,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab"
    }, e.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    }, e.Type = {
        Event: "event",
        State: "state"
    }, e.Plugins = {}, e.Workers = [{
        filter: ["width", "settings"],
        run: function() {
            this._width = this.$element.width()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            a.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            this.$stage.children(".cloned").remove()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = this.settings.margin || "",
                c = !this.settings.autoWidth,
                d = this.settings.rtl,
                e = {
                    width: "auto",
                    "margin-left": d ? b : "",
                    "margin-right": d ? "" : b
                };
            !c && this.$stage.children().css(e), a.css = e
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                c = null,
                d = this._items.length,
                e = !this.settings.autoWidth,
                f = [];
            for (a.items = {
                    merge: !1,
                    width: b
                }; d--;) c = this._mergers[d], c = this.settings.mergeFit && Math.min(c, this.settings.items) || c, a.items.merge = c > 1 || a.items.merge, f[d] = e ? b * c : this._items[d].width();
            this._widths = f
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var b = [],
                c = this._items,
                d = this.settings,
                e = Math.max(2 * d.items, 4),
                f = 2 * Math.ceil(c.length / 2),
                g = d.loop && c.length ? d.rewind ? e : Math.max(e, f) : 0,
                h = "",
                i = "";
            for (g /= 2; g--;) b.push(this.normalize(b.length / 2, !0)), h += c[b[b.length - 1]][0].outerHTML, b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)), i = c[b[b.length - 1]][0].outerHTML + i;
            this._clones = b, a(h).addClass("cloned").appendTo(this.$stage), a(i).addClass("cloned").prependTo(this.$stage)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            for (var a = this.settings.rtl ? 1 : -1, b = this._clones.length + this._items.length, c = -1, d = 0, e = 0, f = []; ++c < b;) d = f[c - 1] || 0, e = this._widths[this.relative(c)] + this.settings.margin, f.push(d + e * a);
            this._coordinates = f
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var a = this.settings.stagePadding,
                b = this._coordinates,
                c = {
                    width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
                    "padding-left": a || "",
                    "padding-right": a || ""
                };
            this.$stage.css(c)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = this._coordinates.length,
                c = !this.settings.autoWidth,
                d = this.$stage.children();
            if (c && a.items.merge)
                for (; b--;) a.css.width = this._widths[this.relative(b)], d.eq(b).css(a.css);
            else c && (a.css.width = a.items.width, d.css(a.css))
        }
    }, {
        filter: ["items"],
        run: function() {
            this._coordinates.length < 1 && this.$stage.removeAttr("style")
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            a.current = a.current ? this.$stage.children().index(a.current) : 0, a.current = Math.max(this.minimum(), Math.min(this.maximum(), a.current)), this.reset(a.current)
        }
    }, {
        filter: ["position"],
        run: function() {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"],
        run: function() {
            var a, b, c, d, e = this.settings.rtl ? 1 : -1,
                f = 2 * this.settings.stagePadding,
                g = this.coordinates(this.current()) + f,
                h = g + this.width() * e,
                i = [];
            for (c = 0, d = this._coordinates.length; d > c; c++) a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
            this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass("active"), this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center"))
        }
    }], e.prototype.initialize = function() {
        if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
            var b, c, e;
            b = this.$element.find("img"), c = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, e = this.$element.children(c).width(), b.length && 0 >= e && this.preloadAutoWidthImages(b)
        }
        this.$element.addClass(this.options.loadingClass), this.$stage = a("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this.$element.is(":visible") ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
    }, e.prototype.setup = function() {
        var b = this.viewport(),
            c = this.options.responsive,
            d = -1,
            e = null;
        c ? (a.each(c, function(a) {
            b >= a && a > d && (d = Number(a))
        }), e = a.extend({}, this.options, c[d]), delete e.responsive, e.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + d))) : e = a.extend({}, this.options), (null === this.settings || this._breakpoint !== d) && (this.trigger("change", {
            property: {
                name: "settings",
                value: e
            }
        }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        }))
    }, e.prototype.optionsLogic = function() {
        this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, e.prototype.prepare = function(b) {
        var c = this.trigger("prepare", {
            content: b
        });
        return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(b)), this.trigger("prepared", {
            content: c.data
        }), c.data
    }, e.prototype.update = function() {
        for (var b = 0, c = this._pipe.length, d = a.proxy(function(a) {
                return this[a]
            }, this._invalidated), e = {}; c > b;)(this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
        this._invalidated = {}, !this.is("valid") && this.enter("valid")
    }, e.prototype.width = function(a) {
        switch (a = a || e.Width.Default) {
            case e.Width.Inner:
            case e.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, e.prototype.refresh = function() {
        this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
    }, e.prototype.onThrottledResize = function() {
        b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
    }, e.prototype.onResize = function() {
        return this._items.length ? this._width === this.$element.width() ? !1 : this.$element.is(":visible") ? (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized"))) : !1 : !1
    }, e.prototype.registerEventHandlers = function() {
        a.support.transition && this.$stage.on(a.support.transition.end + ".owl.core", a.proxy(this.onTransitionEnd, this)), this.settings.responsive !== !1 && this.on(b, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
            return !1
        })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this)))
    }, e.prototype.onDragStart = function(b) {
        var d = null;
        3 !== b.which && (a.support.transform ? (d = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), d = {
            x: d[16 === d.length ? 12 : 4],
            y: d[16 === d.length ? 13 : 5]
        }) : (d = this.$stage.position(), d = {
            x: this.settings.rtl ? d.left + this.$stage.width() - this.width() + this.settings.margin : d.left,
            y: d.top
        }), this.is("animating") && (a.support.transform ? this.animate(d.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === b.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = a(b.target), this._drag.stage.start = d, this._drag.stage.current = d, this._drag.pointer = this.pointer(b), a(c).on("mouseup.owl.core touchend.owl.core", a.proxy(this.onDragEnd, this)), a(c).one("mousemove.owl.core touchmove.owl.core", a.proxy(function(b) {
            var d = this.difference(this._drag.pointer, this.pointer(b));
            a(c).on("mousemove.owl.core touchmove.owl.core", a.proxy(this.onDragMove, this)), Math.abs(d.x) < Math.abs(d.y) && this.is("valid") || (b.preventDefault(), this.enter("dragging"), this.trigger("drag"))
        }, this)))
    }, e.prototype.onDragMove = function(a) {
        var b = null,
            c = null,
            d = null,
            e = this.difference(this._drag.pointer, this.pointer(a)),
            f = this.difference(this._drag.stage.start, e);
        this.is("dragging") && (a.preventDefault(), this.settings.loop ? (b = this.coordinates(this.minimum()), c = this.coordinates(this.maximum() + 1) - b, f.x = ((f.x - b) % c + c) % c + b) : (b = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()), c = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()), d = this.settings.pullDrag ? -1 * e.x / 5 : 0, f.x = Math.max(Math.min(f.x, b + d), c + d)), this._drag.stage.current = f, this.animate(f.x))
    }, e.prototype.onDragEnd = function(b) {
        var d = this.difference(this._drag.pointer, this.pointer(b)),
            e = this._drag.stage.current,
            f = d.x > 0 ^ this.settings.rtl ? "left" : "right";
        a(c).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== d.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = f, (Math.abs(d.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function() {
            return !1
        })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
    }, e.prototype.closest = function(b, c) {
        var d = -1,
            e = 30,
            f = this.width(),
            g = this.coordinates();
        return this.settings.freeDrag || a.each(g, a.proxy(function(a, h) {
            return b > h - e && h + e > b ? d = a : this.op(b, "<", h) && this.op(b, ">", g[a + 1] || h - f) && (d = "left" === c ? a + 1 : a), -1 === d
        }, this)), this.settings.loop || (this.op(b, ">", g[this.minimum()]) ? d = b = this.minimum() : this.op(b, "<", g[this.maximum()]) && (d = b = this.maximum())), d
    }, e.prototype.animate = function(b) {
        var c = this.speed() > 0;
        this.is("animating") && this.onTransitionEnd(), c && (this.enter("animating"), this.trigger("translate")), a.support.transform3d && a.support.transition ? this.$stage.css({
            transform: "translate3d(" + b + "px,0px,0px)",
            transition: this.speed() / 1e3 + "s"
        }) : c ? this.$stage.animate({
            left: b + "px"
        }, this.speed(), this.settings.fallbackEasing, a.proxy(this.onTransitionEnd, this)) : this.$stage.css({
            left: b + "px"
        })
    }, e.prototype.is = function(a) {
        return this._states.current[a] && this._states.current[a] > 0
    }, e.prototype.current = function(a) {
        if (a === d) return this._current;
        if (0 === this._items.length) return d;
        if (a = this.normalize(a), this._current !== a) {
            var b = this.trigger("change", {
                property: {
                    name: "position",
                    value: a
                }
            });
            b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }, e.prototype.invalidate = function(b) {
        return "string" === a.type(b) && (this._invalidated[b] = !0, this.is("valid") && this.leave("valid")), a.map(this._invalidated, function(a, b) {
            return b
        })
    }, e.prototype.reset = function(a) {
        a = this.normalize(a), a !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]))
    }, e.prototype.normalize = function(b, c) {
        var e = this._items.length,
            f = c ? 0 : this._clones.length;
        return !a.isNumeric(b) || 1 > e ? b = d : (0 > b || b >= e + f) && (b = ((b - f / 2) % e + e) % e + f / 2), b
    }, e.prototype.relative = function(a) {
        return a -= this._clones.length / 2, this.normalize(a, !0)
    }, e.prototype.maximum = function(a) {
        var b, c = this.settings,
            d = this._coordinates.length,
            e = Math.abs(this._coordinates[d - 1]) - this._width,
            f = -1;
        if (c.loop) d = this._clones.length / 2 + this._items.length - 1;
        else if (c.autoWidth || c.merge)
            for (; d - f > 1;) Math.abs(this._coordinates[b = d + f >> 1]) < e ? f = b : d = b;
        else d = c.center ? this._items.length - 1 : this._items.length - c.items;
        return a && (d -= this._clones.length / 2), Math.max(d, 0)
    }, e.prototype.minimum = function(a) {
        return a ? 0 : this._clones.length / 2
    }, e.prototype.items = function(a) {
        return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a])
    }, e.prototype.mergers = function(a) {
        return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a])
    }, e.prototype.clones = function(b) {
        var c = this._clones.length / 2,
            e = c + this._items.length,
            f = function(a) {
                return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2
            };
        return b === d ? a.map(this._clones, function(a, b) {
            return f(b)
        }) : a.map(this._clones, function(a, c) {
            return a === b ? f(c) : null
        })
    }, e.prototype.speed = function(a) {
        return a !== d && (this._speed = a), this._speed
    }, e.prototype.coordinates = function(b) {
        var c = null;
        return b === d ? a.map(this._coordinates, a.proxy(function(a, b) {
            return this.coordinates(b)
        }, this)) : (this.settings.center ? (c = this._coordinates[b], c += (this.width() - c + (this._coordinates[b - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : c = this._coordinates[b - 1] || 0, c)
    }, e.prototype.duration = function(a, b, c) {
        return Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
    }, e.prototype.to = function(a, b) {
        var c = this.current(),
            d = null,
            e = a - this.relative(c),
            f = (e > 0) - (0 > e),
            g = this._items.length,
            h = this.minimum(),
            i = this.maximum();
        this.settings.loop ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += -1 * f * g), a = c + e, d = ((a - h) % g + g) % g + h, d !== a && i >= d - e && d - e > 0 && (c = d - e, a = d, this.reset(c))) : this.settings.rewind ? (i += 1, a = (a % i + i) % i) : a = Math.max(h, Math.min(i, a)), this.speed(this.duration(c, a, b)), this.current(a), this.$element.is(":visible") && this.update()
    }, e.prototype.next = function(a) {
        a = a || !1, this.to(this.relative(this.current()) + 1, a)
    }, e.prototype.prev = function(a) {
        a = a || !1, this.to(this.relative(this.current()) - 1, a)
    }, e.prototype.onTransitionEnd = function(a) {
        return a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0)) ? !1 : (this.leave("animating"), void this.trigger("translated"))
    }, e.prototype.viewport = function() {
        var d;
        if (this.options.responsiveBaseElement !== b) d = a(this.options.responsiveBaseElement).width();
        else if (b.innerWidth) d = b.innerWidth;
        else {
            if (!c.documentElement || !c.documentElement.clientWidth) throw "Can not detect viewport width.";
            d = c.documentElement.clientWidth
        }
        return d
    }, e.prototype.replace = function(b) {
        this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function() {
            return 1 === this.nodeType
        }).each(a.proxy(function(a, b) {
            b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(a.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, e.prototype.add = function(b, c) {
        var e = this.relative(this._current);
        c = c === d ? this._items.length : this.normalize(c, !0), b = b instanceof jQuery ? b : a(b), this.trigger("add", {
            content: b,
            position: c
        }), b = this.prepare(b), 0 === this._items.length || c === this._items.length ? (0 === this._items.length && this.$stage.append(b), 0 !== this._items.length && this._items[c - 1].after(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[c].before(b), this._items.splice(c, 0, b), this._mergers.splice(c, 0, 1 * b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)), this._items[e] && this.reset(this._items[e].index()), this.invalidate("items"), this.trigger("added", {
            content: b,
            position: c
        })
    }, e.prototype.remove = function(a) {
        a = this.normalize(a, !0), a !== d && (this.trigger("remove", {
            content: this._items[a],
            position: a
        }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: a
        }))
    }, e.prototype.preloadAutoWidthImages = function(b) {
        b.each(a.proxy(function(b, c) {
            this.enter("pre-loading"), c = a(c), a(new Image).one("load", a.proxy(function(a) {
                c.attr("src", a.target.src), c.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
            }, this)).attr("src", c.attr("src") || c.attr("data-src") || c.attr("data-src-retina"))
        }, this))
    }, e.prototype.destroy = function() {
        this.$element.off(".owl.core"), this.$stage.off(".owl.core"), a(c).off(".owl.core"), this.settings.responsive !== !1 && (b.clearTimeout(this.resizeTimer), this.off(b, "resize", this._handlers.onThrottledResize));
        for (var d in this._plugins) this._plugins[d].destroy();
        this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
    }, e.prototype.op = function(a, b, c) {
        var d = this.settings.rtl;
        switch (b) {
            case "<":
                return d ? a > c : c > a;
            case ">":
                return d ? c > a : a > c;
            case ">=":
                return d ? c >= a : a >= c;
            case "<=":
                return d ? a >= c : c >= a
        }
    }, e.prototype.on = function(a, b, c, d) {
        a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
    }, e.prototype.off = function(a, b, c, d) {
        a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
    }, e.prototype.trigger = function(b, c, d, f, g) {
        var h = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            },
            i = a.camelCase(a.grep(["on", b, d], function(a) {
                return a
            }).join("-").toLowerCase()),
            j = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
                relatedTarget: this
            }, h, c));
        return this._supress[b] || (a.each(this._plugins, function(a, b) {
            b.onTrigger && b.onTrigger(j)
        }), this.register({
            type: e.Type.Event,
            name: b
        }), this.$element.trigger(j), this.settings && "function" == typeof this.settings[i] && this.settings[i].call(this, j)), j
    }, e.prototype.enter = function(b) {
        a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
            this._states.current[b] === d && (this._states.current[b] = 0), this._states.current[b]++
        }, this))
    }, e.prototype.leave = function(b) {
        a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
            this._states.current[b]--
        }, this))
    }, e.prototype.register = function(b) {
        if (b.type === e.Type.Event) {
            if (a.event.special[b.name] || (a.event.special[b.name] = {}), !a.event.special[b.name].owl) {
                var c = a.event.special[b.name]._default;
                a.event.special[b.name]._default = function(a) {
                    return !c || !c.apply || a.namespace && -1 !== a.namespace.indexOf("owl") ? a.namespace && a.namespace.indexOf("owl") > -1 : c.apply(this, arguments)
                }, a.event.special[b.name].owl = !0
            }
        } else b.type === e.Type.State && (this._states.tags[b.name] ? this._states.tags[b.name] = this._states.tags[b.name].concat(b.tags) : this._states.tags[b.name] = b.tags, this._states.tags[b.name] = a.grep(this._states.tags[b.name], a.proxy(function(c, d) {
            return a.inArray(c, this._states.tags[b.name]) === d
        }, this)))
    }, e.prototype.suppress = function(b) {
        a.each(b, a.proxy(function(a, b) {
            this._supress[b] = !0
        }, this))
    }, e.prototype.release = function(b) {
        a.each(b, a.proxy(function(a, b) {
            delete this._supress[b]
        }, this))
    }, e.prototype.pointer = function(a) {
        var c = {
            x: null,
            y: null
        };
        return a = a.originalEvent || a || b.event, a = a.touches && a.touches.length ? a.touches[0] : a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : a, a.pageX ? (c.x = a.pageX, c.y = a.pageY) : (c.x = a.clientX, c.y = a.clientY), c
    }, e.prototype.difference = function(a, b) {
        return {
            x: a.x - b.x,
            y: a.y - b.y
        }
    }, a.fn.owlCarousel = function(b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var d = a(this),
                f = d.data("owl.carousel");
            f || (f = new e(this, "object" == typeof b && b), d.data("owl.carousel", f), a.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function(b, c) {
                f.register({
                    type: e.Type.Event,
                    name: c
                }), f.$element.on(c + ".owl.carousel.core", a.proxy(function(a) {
                    a.namespace && a.relatedTarget !== this && (this.suppress([c]), f[c].apply(this, [].slice.call(arguments, 1)), this.release([c]))
                }, f))
            })), "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c)
        })
    }, a.fn.owlCarousel.Constructor = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._interval = null, this._visible = null, this._handlers = {
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoRefresh && this.watch()
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        autoRefresh: !0,
        autoRefreshInterval: 500
    }, e.prototype.watch = function() {
        this._interval || (this._visible = this._core.$element.is(":visible"), this._interval = b.setInterval(a.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
    }, e.prototype.refresh = function() {
        this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
    }, e.prototype.destroy = function() {
        var a, c;
        b.clearInterval(this._interval);
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._loaded = [], this._handlers = {
            "initialized.owl.carousel change.owl.carousel": a.proxy(function(b) {
                if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type))
                    for (var c = this._core.settings, d = c.center && Math.ceil(c.items / 2) || c.items, e = c.center && -1 * d || 0, f = (b.property && b.property.value || this._core.current()) + e, g = this._core.clones().length, h = a.proxy(function(a, b) {
                            this.load(b)
                        }, this); e++ < d;) this.load(g / 2 + this._core.relative(f)), g && a.each(this._core.clones(this._core.relative(f)), h), f++
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        lazyLoad: !1
    }, e.prototype.load = function(c) {
        var d = this._core.$stage.children().eq(c),
            e = d && d.find(".owl-lazy");
        !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function(c, d) {
            var e, f = a(d),
                g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src");
            this._core.trigger("load", {
                element: f,
                url: g
            }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function() {
                f.css("opacity", 1), this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this)).attr("src", g) : (e = new Image, e.onload = a.proxy(function() {
                f.css({
                    "background-image": "url(" + g + ")",
                    opacity: "1"
                }), this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this), e.src = g)
        }, this)), this._loaded.push(d.get(0)))
    }, e.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Lazy = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._handlers = {
            "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && this.update()
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && "position" == a.property.name && this.update()
            }, this),
            "loaded.owl.lazy": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        autoHeight: !1,
        autoHeightClass: "owl-height"
    }, e.prototype.update = function() {
        var b = this._core._current,
            c = b + this._core.settings.items,
            d = this._core.$stage.children().toArray().slice(b, c);
        heights = [], maxheight = 0, a.each(d, function(b, c) {
            heights.push(a(c).height())
        }), maxheight = Math.max.apply(null, heights), this._core.$stage.parent().height(maxheight).addClass(this._core.settings.autoHeightClass)
    }, e.prototype.destroy = function() {
        var a, b;
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._videos = {}, this._playing = null, this._handlers = {
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.register({
                    type: "state",
                    name: "playing",
                    tags: ["interacting"]
                })
            }, this),
            "resize.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.video && this.isInFullScreen() && a.preventDefault()
            }, this),
            "refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" === a.property.name && this._playing && this.stop()
            }, this),
            "prepared.owl.carousel": a.proxy(function(b) {
                if (b.namespace) {
                    var c = a(b.content).find(".owl-video");
                    c.length && (c.css("display", "none"), this.fetch(c, a(b.content)))
                }
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function(a) {
            this.play(a)
        }, this))
    };
    e.Defaults = {
        video: !1,
        videoHeight: !1,
        videoWidth: !1
    }, e.prototype.fetch = function(a, b) {
        var c = a.attr("data-vimeo-id") ? "vimeo" : "youtube",
            d = a.attr("data-vimeo-id") || a.attr("data-youtube-id"),
            e = a.attr("data-width") || this._core.settings.videoWidth,
            f = a.attr("data-height") || this._core.settings.videoHeight,
            g = a.attr("href");
        if (!g) throw new Error("Missing video URL.");
        if (d = g.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";
        else {
            if (!(d[3].indexOf("vimeo") > -1)) throw new Error("Video URL not supported.");
            c = "vimeo"
        }
        d = d[6], this._videos[g] = {
            type: c,
            id: d,
            width: e,
            height: f
        }, b.attr("data-video", g), this.thumbnail(a, this._videos[g])
    }, e.prototype.thumbnail = function(b, c) {
        var d, e, f, g = c.width && c.height ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"' : "",
            h = b.find("img"),
            i = "src",
            j = "",
            k = this._core.settings,
            l = function(a) {
                e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>', b.after(d), b.after(e)
            };
        return b.wrap('<div class="owl-video-wrapper"' + g + "></div>"), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length ? (l(h.attr(i)), h.remove(), !1) : void("youtube" === c.type ? (f = "http://img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type && a.ajax({
            type: "GET",
            url: "http://vimeo.com/api/v2/video/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(a) {
                f = a[0].thumbnail_large, l(f)
            }
        }))
    }, e.prototype.stop = function() {
        this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
    }, e.prototype.play = function(b) {
        var c, d = a(b.target),
            e = d.closest("." + this._core.settings.itemClass),
            f = this._videos[e.attr("data-video")],
            g = f.width || "100%",
            h = f.height || this._core.$stage.height();
        this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), e = this._core.items(this._core.relative(e.index())), this._core.reset(e.index()), "youtube" === f.type ? c = '<iframe width="' + g + '" height="' + h + '" src="http://www.youtube.com/embed/' + f.id + "?autoplay=1&v=" + f.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === f.type && (c = '<iframe src="http://player.vimeo.com/video/' + f.id + '?autoplay=1" width="' + g + '" height="' + h + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), a('<div class="owl-video-frame">' + c + "</div>").insertAfter(e.find(".owl-video")), this._playing = e.addClass("owl-video-playing"))
    }, e.prototype.isInFullScreen = function() {
        var b = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
        return b && a(b).parent().hasClass("owl-video-frame")
    }, e.prototype.destroy = function() {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Video = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
            "change.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value)
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function(a) {
                a.namespace && (this.swapping = "translated" == a.type)
            }, this),
            "translate.owl.carousel": a.proxy(function(a) {
                a.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    e.Defaults = {
        animateOut: !1,
        animateIn: !1
    }, e.prototype.swap = function() {
        if (1 === this.core.settings.items && a.support.animation && a.support.transition) {
            this.core.speed(0);
            var b, c = a.proxy(this.clear, this),
                d = this.core.$stage.children().eq(this.previous),
                e = this.core.$stage.children().eq(this.next),
                f = this.core.settings.animateIn,
                g = this.core.settings.animateOut;
            this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.one(a.support.animation.end, c).css({
                left: b + "px"
            }).addClass("animated owl-animated-out").addClass(g)), f && e.one(a.support.animation.end, c).addClass("animated owl-animated-in").addClass(f))
        }
    }, e.prototype.clear = function(b) {
        a(b.target).css({
            left: ""
        }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
    }, e.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._interval = null, this._paused = !1, this._handlers = {
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "settings" === a.property.name && (this._core.settings.autoplay ? this.play() : this.stop())
            }, this),
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoplay && this.play()
            }, this),
            "play.owl.autoplay": a.proxy(function(a, b, c) {
                a.namespace && this.play(b, c)
            }, this),
            "stop.owl.autoplay": a.proxy(function(a) {
                a.namespace && this.stop()
            }, this),
            "mouseover.owl.autoplay": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this),
            "mouseleave.owl.autoplay": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
            }, this)
        }, this._core.$element.on(this._handlers), this._core.options = a.extend({}, e.Defaults, this._core.options)
    };
    e.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    }, e.prototype.play = function(d, e) {
        this._paused = !1, this._core.is("rotating") || (this._core.enter("rotating"), this._interval = b.setInterval(a.proxy(function() {
            this._paused || this._core.is("busy") || this._core.is("interacting") || c.hidden || this._core.next(e || this._core.settings.autoplaySpeed)
        }, this), d || this._core.settings.autoplayTimeout))
    }, e.prototype.stop = function() {
        this._core.is("rotating") && (b.clearInterval(this._interval), this._core.leave("rotating"))
    }, e.prototype.pause = function() {
        this._core.is("rotating") && (this._paused = !0)
    }, e.prototype.destroy = function() {
        var a, b;
        this.stop();
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.autoplay = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    "use strict";
    var e = function(b) {
        this._core = b, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        }, this._handlers = {
            "prepared.owl.carousel": a.proxy(function(b) {
                b.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot") + "</div>")
            }, this),
            "added.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 0, this._templates.pop())
            }, this),
            "remove.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 1)
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" == a.property.name && this.draw()
            }, this),
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
            }, this),
            "refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    e.Defaults = {
        nav: !1,
        navText: ["prev", "next"],
        navSpeed: !1,
        navElement: "div",
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotsData: !1,
        dotsSpeed: !1,
        dotsContainer: !1
    }, e.prototype.initialize = function() {
        var b, c = this._core.settings;
        this._controls.$relative = (c.navContainer ? a(c.navContainer) : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = a("<" + c.navElement + ">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click", a.proxy(function(a) {
            this.prev(c.navSpeed)
        }, this)), this._controls.$next = a("<" + c.navElement + ">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click", a.proxy(function(a) {
            this.next(c.navSpeed)
        }, this)), c.dotsData || (this._templates = [a("<div>").addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]), this._controls.$absolute = (c.dotsContainer ? a(c.dotsContainer) : a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "div", a.proxy(function(b) {
            var d = a(b.target).parent().is(this._controls.$absolute) ? a(b.target).index() : a(b.target).parent().index();
            b.preventDefault(), this.to(d, c.dotsSpeed)
        }, this));
        for (b in this._overrides) this._core[b] = a.proxy(this[b], this)
    }, e.prototype.destroy = function() {
        var a, b, c, d;
        for (a in this._handlers) this.$element.off(a, this._handlers[a]);
        for (b in this._controls) this._controls[b].remove();
        for (d in this.overides) this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, e.prototype.update = function() {
        var a, b, c, d = this._core.clones().length / 2,
            e = d + this._core.items().length,
            f = this._core.maximum(!0),
            g = this._core.settings,
            h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
        if ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)), g.dots || "page" == g.slideBy)
            for (this._pages = [], a = d, b = 0, c = 0; e > a; a++) {
                if (b >= h || 0 === b) {
                    if (this._pages.push({
                            start: Math.min(f, a - d),
                            end: a - d + h - 1
                        }), Math.min(f, a - d) === f) break;
                    b = 0, ++c
                }
                b += this._core.mergers(this._core.relative(a))
            }
    }, e.prototype.draw = function() {
        var b, c = this._core.settings,
            d = this._core.items().length <= c.items,
            e = this._core.relative(this._core.current()),
            f = c.loop || c.rewind;
        this._controls.$relative.toggleClass("disabled", !c.nav || d), c.nav && (this._controls.$previous.toggleClass("disabled", !f && e <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !f && e >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !c.dots || d), c.dots && (b = this._pages.length - this._controls.$absolute.children().length, c.dotsData && 0 !== b ? this._controls.$absolute.html(this._templates.join("")) : b > 0 ? this._controls.$absolute.append(new Array(b + 1).join(this._templates[0])) : 0 > b && this._controls.$absolute.children().slice(b).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(a.inArray(this.current(), this._pages)).addClass("active"))
    }, e.prototype.onTrigger = function(b) {
        var c = this._core.settings;
        b.page = {
            index: a.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: c && (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items)
        }
    }, e.prototype.current = function() {
        var b = this._core.relative(this._core.current());
        return a.grep(this._pages, a.proxy(function(a, c) {
            return a.start <= b && a.end >= b
        }, this)).pop()
    }, e.prototype.getPosition = function(b) {
        var c, d, e = this._core.settings;
        return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c
    }, e.prototype.next = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
    }, e.prototype.prev = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
    }, e.prototype.to = function(b, c, d) {
        var e;
        d ? a.proxy(this._overrides.to, this._core)(b, c) : (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c))
    }, a.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    "use strict";
    var e = function(c) {
        this._core = c, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.owl.carousel": a.proxy(function(c) {
                c.namespace && "URLHash" === this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
            }, this),
            "prepared.owl.carousel": a.proxy(function(b) {
                if (b.namespace) {
                    var c = a(b.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
                    if (!c) return;
                    this._hashes[c] = b.content
                }
            }, this),
            "changed.owl.carousel": a.proxy(function(c) {
                if (c.namespace && "position" === c.property.name) {
                    var d = this._core.items(this._core.relative(this._core.current())),
                        e = a.map(this._hashes, function(a, b) {
                            return a === d ? b : null
                        }).join();
                    if (!e || b.location.hash.slice(1) === e) return;
                    b.location.hash = e
                }
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function(a) {
            var c = b.location.hash.substring(1),
                e = this._core.$stage.children(),
                f = this._hashes[c] && e.index(this._hashes[c]);
            f !== d && f !== this._core.current() && this._core.to(this._core.relative(f), !1, !0)
        }, this))
    };
    e.Defaults = {
        URLhashListener: !1
    }, e.prototype.destroy = function() {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Hash = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    function e(b, c) {
        var e = !1,
            f = b.charAt(0).toUpperCase() + b.slice(1);
        return a.each((b + " " + h.join(f + " ") + f).split(" "), function(a, b) {
            return g[b] !== d ? (e = c ? b : !0, !1) : void 0
        }), e
    }

    function f(a) {
        return e(a, !0)
    }
    var g = a("<support>").get(0).style,
        h = "Webkit Moz O ms".split(" "),
        i = {
            transition: {
                end: {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    transition: "transitionend"
                }
            },
            animation: {
                end: {
                    WebkitAnimation: "webkitAnimationEnd",
                    MozAnimation: "animationend",
                    OAnimation: "oAnimationEnd",
                    animation: "animationend"
                }
            }
        },
        j = {
            csstransforms: function() {
                return !!e("transform")
            },
            csstransforms3d: function() {
                return !!e("perspective")
            },
            csstransitions: function() {
                return !!e("transition")
            },
            cssanimations: function() {
                return !!e("animation")
            }
        };
    j.csstransitions() && (a.support.transition = new String(f("transition")), a.support.transition.end = i.transition.end[a.support.transition]), j.cssanimations() && (a.support.animation = new String(f("animation")), a.support.animation.end = i.animation.end[a.support.animation]), j.csstransforms() && (a.support.transform = new String(f("transform")), a.support.transform3d = j.csstransforms3d())
}(window.Zepto || window.jQuery, window, document);
// owl.carousel.js ENDS

// jquery.magnific-popup.js STARTS
/*! Magnific Popup - v0.9.9 - 2013-12-27
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2013 Dmitry Semenov; */
;(function(jQuery) {

/*>>core*/
/**
 * 
 * Magnific Popup Core JS file
 * 
 */


/**
 * Private static constants
 */
var CLOSE_EVENT = 'Close',
	BEFORE_CLOSE_EVENT = 'BeforeClose',
	AFTER_CLOSE_EVENT = 'AfterClose',
	BEFORE_APPEND_EVENT = 'BeforeAppend',
	MARKUP_PARSE_EVENT = 'MarkupParse',
	OPEN_EVENT = 'Open',
	CHANGE_EVENT = 'Change',
	NS = 'mfp',
	EVENT_NS = '.' + NS,
	READY_CLASS = 'mfp-ready',
	REMOVING_CLASS = 'mfp-removing',
	PREVENT_CLOSE_CLASS = 'mfp-prevent-close';


/**
 * Private vars 
 */
var mfp, // As we have only one instance of MagnificPopup object, we define it locally to not to use 'this'
	MagnificPopup = function(){},
	_isJQ = !!(window.jQuery),
	_prevStatus,
	_window = jQuery(window),
	_body,
	_document,
	_prevContentType,
	_wrapClasses,
	_currPopupType;


/**
 * Private functions
 */
var _mfpOn = function(name, f) {
		mfp.ev.on(NS + name + EVENT_NS, f);
	},
	_getEl = function(className, appendTo, html, raw) {
		var el = document.createElement('div');
		el.className = 'mfp-'+className;
		if(html) {
			el.innerHTML = html;
		}
		if(!raw) {
			el = jQuery(el);
			if(appendTo) {
				el.appendTo(appendTo);
			}
		} else if(appendTo) {
			appendTo.appendChild(el);
		}
		return el;
	},
	_mfpTrigger = function(e, data) {
		mfp.ev.triggerHandler(NS + e, data);

		if(mfp.st.callbacks) {
			// converts "mfpEventName" to "eventName" callback and triggers it if it's present
			e = e.charAt(0).toLowerCase() + e.slice(1);
			if(mfp.st.callbacks[e]) {
				mfp.st.callbacks[e].apply(mfp, jQuery.isArray(data) ? data : [data]);
			}
		}
	},
	_getCloseBtn = function(type) {
		if(type !== _currPopupType || !mfp.currTemplate.closeBtn) {
			mfp.currTemplate.closeBtn = jQuery( mfp.st.closeMarkup.replace('%title%', mfp.st.tClose ) );
			_currPopupType = type;
		}
		return mfp.currTemplate.closeBtn;
	},
	// Initialize Magnific Popup only when called at least once
	_checkInstance = function() {
		if(!jQuery.magnificPopup.instance) {
			mfp = new MagnificPopup();
			mfp.init();
			jQuery.magnificPopup.instance = mfp;
		}
	},
	// CSS transition detection, http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
	supportsTransitions = function() {
		var s = document.createElement('p').style, // 's' for style. better to create an element if body yet to exist
			v = ['ms','O','Moz','Webkit']; // 'v' for vendor

		if( s['transition'] !== undefined ) {
			return true; 
		}
			
		while( v.length ) {
			if( v.pop() + 'Transition' in s ) {
				return true;
			}
		}
				
		return false;
	};



/**
 * Public functions
 */
MagnificPopup.prototype = {

	constructor: MagnificPopup,

	/**
	 * Initializes Magnific Popup plugin. 
	 * This function is triggered only once when jQuery.fn.magnificPopup or jQuery.magnificPopup is executed
	 */
	init: function() {
		var appVersion = navigator.appVersion;
		mfp.isIE7 = appVersion.indexOf("MSIE 7.") !== -1; 
		mfp.isIE8 = appVersion.indexOf("MSIE 8.") !== -1;
		mfp.isLowIE = mfp.isIE7 || mfp.isIE8;
		mfp.isAndroid = (/android/gi).test(appVersion);
		mfp.isIOS = (/iphone|ipad|ipod/gi).test(appVersion);
		mfp.supportsTransition = supportsTransitions();

		// We disable fixed positioned lightbox on devices that don't handle it nicely.
		// If you know a better way of detecting this - let me know.
		mfp.probablyMobile = (mfp.isAndroid || mfp.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent) );
		_document = jQuery(document);

		mfp.popupsCache = {};
	},

	/**
	 * Opens popup
	 * @param  data [description]
	 */
	open: function(data) {

		if(!_body) {
			_body = jQuery(document.body);
		}

		var i;

		if(data.isObj === false) { 
			// convert jQuery collection to array to avoid conflicts later
			mfp.items = data.items.toArray();

			mfp.index = 0;
			var items = data.items,
				item;
			for(i = 0; i < items.length; i++) {
				item = items[i];
				if(item.parsed) {
					item = item.el[0];
				}
				if(item === data.el[0]) {
					mfp.index = i;
					break;
				}
			}
		} else {
			mfp.items = jQuery.isArray(data.items) ? data.items : [data.items];
			mfp.index = data.index || 0;
		}

		// if popup is already opened - we just update the content
		if(mfp.isOpen) {
			mfp.updateItemHTML();
			return;
		}
		
		mfp.types = []; 
		_wrapClasses = '';
		if(data.mainEl && data.mainEl.length) {
			mfp.ev = data.mainEl.eq(0);
		} else {
			mfp.ev = _document;
		}

		if(data.key) {
			if(!mfp.popupsCache[data.key]) {
				mfp.popupsCache[data.key] = {};
			}
			mfp.currTemplate = mfp.popupsCache[data.key];
		} else {
			mfp.currTemplate = {};
		}



		mfp.st = jQuery.extend(true, {}, jQuery.magnificPopup.defaults, data ); 
		mfp.fixedContentPos = mfp.st.fixedContentPos === 'auto' ? !mfp.probablyMobile : mfp.st.fixedContentPos;

		if(mfp.st.modal) {
			mfp.st.closeOnContentClick = false;
			mfp.st.closeOnBgClick = false;
			mfp.st.showCloseBtn = false;
			mfp.st.enableEscapeKey = false;
		}
		

		// Building markup
		// main containers are created only once
		if(!mfp.bgOverlay) {

			// Dark overlay
			mfp.bgOverlay = _getEl('bg').on('click'+EVENT_NS, function() {
				mfp.close();
			});

			mfp.wrap = _getEl('wrap').attr('tabindex', -1).on('click'+EVENT_NS, function(e) {
				if(mfp._checkIfClose(e.target)) {
					mfp.close();
				}
			});

			mfp.container = _getEl('container', mfp.wrap);
		}

		mfp.contentContainer = _getEl('content');
		if(mfp.st.preloader) {
			mfp.preloader = _getEl('preloader', mfp.container, mfp.st.tLoading);
		}


		// Initializing modules
		var modules = jQuery.magnificPopup.modules;
		for(i = 0; i < modules.length; i++) {
			var n = modules[i];
			n = n.charAt(0).toUpperCase() + n.slice(1);
			mfp['init'+n].call(mfp);
		}
		_mfpTrigger('BeforeOpen');


		if(mfp.st.showCloseBtn) {
			// Close button
			if(!mfp.st.closeBtnInside) {
				mfp.wrap.append( _getCloseBtn() );
			} else {
				_mfpOn(MARKUP_PARSE_EVENT, function(e, template, values, item) {
					values.close_replaceWith = _getCloseBtn(item.type);
				});
				_wrapClasses += ' mfp-close-btn-in';
			}
		}

		if(mfp.st.alignTop) {
			_wrapClasses += ' mfp-align-top';
		}

	

		if(mfp.fixedContentPos) {
			mfp.wrap.css({
				overflow: mfp.st.overflowY,
				overflowX: 'hidden',
				overflowY: mfp.st.overflowY
			});
		} else {
			mfp.wrap.css({ 
				top: _window.scrollTop(),
				position: 'absolute'
			});
		}
		if( mfp.st.fixedBgPos === false || (mfp.st.fixedBgPos === 'auto' && !mfp.fixedContentPos) ) {
			mfp.bgOverlay.css({
				height: _document.height(),
				position: 'absolute'
			});
		}

		

		if(mfp.st.enableEscapeKey) {
			// Close on ESC key
			_document.on('keyup' + EVENT_NS, function(e) {
				if(e.keyCode === 27) {
					mfp.close();
				}
			});
		}

		_window.on('resize' + EVENT_NS, function() {
			mfp.updateSize();
		});


		if(!mfp.st.closeOnContentClick) {
			_wrapClasses += ' mfp-auto-cursor';
		}
		
		if(_wrapClasses)
			mfp.wrap.addClass(_wrapClasses);


		// this triggers recalculation of layout, so we get it once to not to trigger twice
		var windowHeight = mfp.wH = _window.height();

		
		var windowStyles = {};

		if( mfp.fixedContentPos ) {
            if(mfp._hasScrollBar(windowHeight)){
                var s = mfp._getScrollbarSize();
                if(s) {
                    windowStyles.marginRight = s;
                }
            }
        }

		if(mfp.fixedContentPos) {
			if(!mfp.isIE7) {
				windowStyles.overflow = 'hidden';
			} else {
				// ie7 double-scroll bug
				jQuery('body, html').css('overflow', 'hidden');
			}
		}

		
		
		var classesToadd = mfp.st.mainClass;
		if(mfp.isIE7) {
			classesToadd += ' mfp-ie7';
		}
		if(classesToadd) {
			mfp._addClassToMFP( classesToadd );
		}

		// add content
		mfp.updateItemHTML();

		_mfpTrigger('BuildControls');

		// remove scrollbar, add margin e.t.c
		jQuery('html').css(windowStyles);
		
		// add everything to DOM
		mfp.bgOverlay.add(mfp.wrap).prependTo( mfp.st.prependTo || _body );

		// Save last focused element
		mfp._lastFocusedEl = document.activeElement;
		
		// Wait for next cycle to allow CSS transition
		setTimeout(function() {
			
			if(mfp.content) {
				mfp._addClassToMFP(READY_CLASS);
				mfp._setFocus();
			} else {
				// if content is not defined (not loaded e.t.c) we add class only for BG
				mfp.bgOverlay.addClass(READY_CLASS);
			}
			
			// Trap the focus in popup
			_document.on('focusin' + EVENT_NS, mfp._onFocusIn);

		}, 16);

		mfp.isOpen = true;
		mfp.updateSize(windowHeight);
		_mfpTrigger(OPEN_EVENT);

		return data;
	},

	/**
	 * Closes the popup
	 */
	close: function() {
		if(!mfp.isOpen) return;
		_mfpTrigger(BEFORE_CLOSE_EVENT);

		mfp.isOpen = false;
		// for CSS3 animation
		if(mfp.st.removalDelay && !mfp.isLowIE && mfp.supportsTransition )  {
			mfp._addClassToMFP(REMOVING_CLASS);
			setTimeout(function() {
				mfp._close();
			}, mfp.st.removalDelay);
		} else {
			mfp._close();
		}
	},

	/**
	 * Helper for close() function
	 */
	_close: function() {
		_mfpTrigger(CLOSE_EVENT);

		var classesToRemove = REMOVING_CLASS + ' ' + READY_CLASS + ' ';

		mfp.bgOverlay.detach();
		mfp.wrap.detach();
		mfp.container.empty();

		if(mfp.st.mainClass) {
			classesToRemove += mfp.st.mainClass + ' ';
		}

		mfp._removeClassFromMFP(classesToRemove);

		if(mfp.fixedContentPos) {
			var windowStyles = {marginRight: ''};
			if(mfp.isIE7) {
				jQuery('body, html').css('overflow', '');
			} else {
				windowStyles.overflow = '';
			}
			jQuery('html').css(windowStyles);
		}
		
		_document.off('keyup' + EVENT_NS + ' focusin' + EVENT_NS);
		mfp.ev.off(EVENT_NS);

		// clean up DOM elements that aren't removed
		mfp.wrap.attr('class', 'mfp-wrap').removeAttr('style');
		mfp.bgOverlay.attr('class', 'mfp-bg');
		mfp.container.attr('class', 'mfp-container');

		// remove close button from target element
		if(mfp.st.showCloseBtn &&
		(!mfp.st.closeBtnInside || mfp.currTemplate[mfp.currItem.type] === true)) {
			if(mfp.currTemplate.closeBtn)
				mfp.currTemplate.closeBtn.detach();
		}


		if(mfp._lastFocusedEl) {
			jQuery(mfp._lastFocusedEl).focus(); // put tab focus back
		}
		mfp.currItem = null;	
		mfp.content = null;
		mfp.currTemplate = null;
		mfp.prevHeight = 0;

		_mfpTrigger(AFTER_CLOSE_EVENT);
	},
	
	updateSize: function(winHeight) {

		if(mfp.isIOS) {
			// fixes iOS nav bars https://github.com/dimsemenov/Magnific-Popup/issues/2
			var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
			var height = window.innerHeight * zoomLevel;
			mfp.wrap.css('height', height);
			mfp.wH = height;
		} else {
			mfp.wH = winHeight || _window.height();
		}
		// Fixes #84: popup incorrectly positioned with position:relative on body
		if(!mfp.fixedContentPos) {
			mfp.wrap.css('height', mfp.wH);
		}

		_mfpTrigger('Resize');

	},

	/**
	 * Set content of popup based on current index
	 */
	updateItemHTML: function() {
		var item = mfp.items[mfp.index];

		// Detach and perform modifications
		mfp.contentContainer.detach();

		if(mfp.content)
			mfp.content.detach();

		if(!item.parsed) {
			item = mfp.parseEl( mfp.index );
		}

		var type = item.type;	

		_mfpTrigger('BeforeChange', [mfp.currItem ? mfp.currItem.type : '', type]);
		// BeforeChange event works like so:
		// _mfpOn('BeforeChange', function(e, prevType, newType) { });
		
		mfp.currItem = item;

		

		

		if(!mfp.currTemplate[type]) {
			var markup = mfp.st[type] ? mfp.st[type].markup : false;

			// allows to modify markup
			_mfpTrigger('FirstMarkupParse', markup);

			if(markup) {
				mfp.currTemplate[type] = jQuery(markup);
			} else {
				// if there is no markup found we just define that template is parsed
				mfp.currTemplate[type] = true;
			}
		}

		if(_prevContentType && _prevContentType !== item.type) {
			mfp.container.removeClass('mfp-'+_prevContentType+'-holder');
		}
		
		var newContent = mfp['get' + type.charAt(0).toUpperCase() + type.slice(1)](item, mfp.currTemplate[type]);
		mfp.appendContent(newContent, type);

		item.preloaded = true;

		_mfpTrigger(CHANGE_EVENT, item);
		_prevContentType = item.type;
		
		// Append container back after its content changed
		mfp.container.prepend(mfp.contentContainer);

		_mfpTrigger('AfterChange');
	},


	/**
	 * Set HTML content of popup
	 */
	appendContent: function(newContent, type) {
		mfp.content = newContent;
		
		if(newContent) {
			if(mfp.st.showCloseBtn && mfp.st.closeBtnInside &&
				mfp.currTemplate[type] === true) {
				// if there is no markup, we just append close button element inside
				if(!mfp.content.find('.mfp-close').length) {
					mfp.content.append(_getCloseBtn());
				}
			} else {
				mfp.content = newContent;
			}
		} else {
			mfp.content = '';
		}

		_mfpTrigger(BEFORE_APPEND_EVENT);
		mfp.container.addClass('mfp-'+type+'-holder');

		mfp.contentContainer.append(mfp.content);
	},



	
	/**
	 * Creates Magnific Popup data object based on given data
	 * @param  {int} index Index of item to parse
	 */
	parseEl: function(index) {
		var item = mfp.items[index],
			type;

		if(item.tagName) {
			item = { el: jQuery(item) };
		} else {
			type = item.type;
			item = { data: item, src: item.src };
		}

		if(item.el) {
			var types = mfp.types;

			// check for 'mfp-TYPE' class
			for(var i = 0; i < types.length; i++) {
				if( item.el.hasClass('mfp-'+types[i]) ) {
					type = types[i];
					break;
				}
			}

			item.src = item.el.attr('data-mfp-src');
			if(!item.src) {
				item.src = item.el.attr('href');
			}
		}

		item.type = type || mfp.st.type || 'inline';
		item.index = index;
		item.parsed = true;
		mfp.items[index] = item;
		_mfpTrigger('ElementParse', item);

		return mfp.items[index];
	},


	/**
	 * Initializes single popup or a group of popups
	 */
	addGroup: function(el, options) {
		var eHandler = function(e) {
			e.mfpEl = this;
			mfp._openClick(e, el, options);
		};

		if(!options) {
			options = {};
		} 

		var eName = 'click.magnificPopup';
		options.mainEl = el;
		
		if(options.items) {
			options.isObj = true;
			el.off(eName).on(eName, eHandler);
		} else {
			options.isObj = false;
			if(options.delegate) {
				el.off(eName).on(eName, options.delegate , eHandler);
			} else {
				options.items = el;
				el.off(eName).on(eName, eHandler);
			}
		}
	},
	_openClick: function(e, el, options) {
		var midClick = options.midClick !== undefined ? options.midClick : jQuery.magnificPopup.defaults.midClick;


		if(!midClick && ( e.which === 2 || e.ctrlKey || e.metaKey ) ) {
			return;
		}

		var disableOn = options.disableOn !== undefined ? options.disableOn : jQuery.magnificPopup.defaults.disableOn;

		if(disableOn) {
			if(jQuery.isFunction(disableOn)) {
				if( !disableOn.call(mfp) ) {
					return true;
				}
			} else { // else it's number
				if( _window.width() < disableOn ) {
					return true;
				}
			}
		}
		
		if(e.type) {
			e.preventDefault();

			// This will prevent popup from closing if element is inside and popup is already opened
			if(mfp.isOpen) {
				e.stopPropagation();
			}
		}
			

		options.el = jQuery(e.mfpEl);
		if(options.delegate) {
			options.items = el.find(options.delegate);
		}
		mfp.open(options);
	},


	/**
	 * Updates text on preloader
	 */
	updateStatus: function(status, text) {

		if(mfp.preloader) {
			if(_prevStatus !== status) {
				mfp.container.removeClass('mfp-s-'+_prevStatus);
			}

			if(!text && status === 'loading') {
				text = mfp.st.tLoading;
			}

			var data = {
				status: status,
				text: text
			};
			// allows to modify status
			_mfpTrigger('UpdateStatus', data);

			status = data.status;
			text = data.text;

			mfp.preloader.html(text);

			mfp.preloader.find('a').on('click', function(e) {
				e.stopImmediatePropagation();
			});

			mfp.container.addClass('mfp-s-'+status);
			_prevStatus = status;
		}
	},


	/*
		"Private" helpers that aren't private at all
	 */
	// Check to close popup or not
	// "target" is an element that was clicked
	_checkIfClose: function(target) {

		if(jQuery(target).hasClass(PREVENT_CLOSE_CLASS)) {
			return;
		}

		var closeOnContent = mfp.st.closeOnContentClick;
		var closeOnBg = mfp.st.closeOnBgClick;

		if(closeOnContent && closeOnBg) {
			return true;
		} else {

			// We close the popup if click is on close button or on preloader. Or if there is no content.
			if(!mfp.content || jQuery(target).hasClass('mfp-close') || (mfp.preloader && target === mfp.preloader[0]) ) {
				return true;
			}

			// if click is outside the content
			if(  (target !== mfp.content[0] && !jQuery.contains(mfp.content[0], target))  ) {
				if(closeOnBg) {
					// last check, if the clicked element is in DOM, (in case it's removed onclick)
					if( jQuery.contains(document, target) ) {
						return true;
					}
				}
			} else if(closeOnContent) {
				return true;
			}

		}
		return false;
	},
	_addClassToMFP: function(cName) {
		mfp.bgOverlay.addClass(cName);
		mfp.wrap.addClass(cName);
	},
	_removeClassFromMFP: function(cName) {
		this.bgOverlay.removeClass(cName);
		mfp.wrap.removeClass(cName);
	},
	_hasScrollBar: function(winHeight) {
		return (  (mfp.isIE7 ? _document.height() : document.body.scrollHeight) > (winHeight || _window.height()) );
	},
	_setFocus: function() {
		(mfp.st.focus ? mfp.content.find(mfp.st.focus).eq(0) : mfp.wrap).focus();
	},
	_onFocusIn: function(e) {
		if( e.target !== mfp.wrap[0] && !jQuery.contains(mfp.wrap[0], e.target) ) {
			mfp._setFocus();
			return false;
		}
	},
	_parseMarkup: function(template, values, item) {
		var arr;
		if(item.data) {
			values = jQuery.extend(item.data, values);
		}
		_mfpTrigger(MARKUP_PARSE_EVENT, [template, values, item] );

		jQuery.each(values, function(key, value) {
			if(value === undefined || value === false) {
				return true;
			}
			arr = key.split('_');
			if(arr.length > 1) {
				var el = template.find(EVENT_NS + '-'+arr[0]);

				if(el.length > 0) {
					var attr = arr[1];
					if(attr === 'replaceWith') {
						if(el[0] !== value[0]) {
							el.replaceWith(value);
						}
					} else if(attr === 'img') {
						if(el.is('img')) {
							el.attr('src', value);
						} else {
							el.replaceWith( '<img src="'+value+'" class="' + el.attr('class') + '" />' );
						}
					} else {
						el.attr(arr[1], value);
					}
				}

			} else {
				template.find(EVENT_NS + '-'+key).html(value);
			}
		});
	},

	_getScrollbarSize: function() {
		// thx David
		if(mfp.scrollbarSize === undefined) {
			var scrollDiv = document.createElement("div");
			scrollDiv.id = "mfp-sbm";
			scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
			document.body.appendChild(scrollDiv);
			mfp.scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
			document.body.removeChild(scrollDiv);
		}
		return mfp.scrollbarSize;
	}

}; /* MagnificPopup core prototype end */




/**
 * Public static functions
 */
jQuery.magnificPopup = {
	instance: null,
	proto: MagnificPopup.prototype,
	modules: [],

	open: function(options, index) {
		_checkInstance();	

		if(!options) {
			options = {};
		} else {
			options = jQuery.extend(true, {}, options);
		}
			

		options.isObj = true;
		options.index = index || 0;
		return this.instance.open(options);
	},

	close: function() {
		return jQuery.magnificPopup.instance && jQuery.magnificPopup.instance.close();
	},

	registerModule: function(name, module) {
		if(module.options) {
			jQuery.magnificPopup.defaults[name] = module.options;
		}
		jQuery.extend(this.proto, module.proto);			
		this.modules.push(name);
	},

	defaults: {   

		// Info about options is in docs:
		// http://dimsemenov.com/plugins/magnific-popup/documentation.html#options
		
		disableOn: 0,	

		key: null,

		midClick: false,

		mainClass: '',

		preloader: true,

		focus: '', // CSS selector of input to focus after popup is opened
		
		closeOnContentClick: false,

		closeOnBgClick: true,

		closeBtnInside: true, 

		showCloseBtn: true,

		enableEscapeKey: true,

		modal: false,

		alignTop: false,
	
		removalDelay: 0,

		prependTo: null,
		
		fixedContentPos: 'auto', 
	
		fixedBgPos: 'auto',

		overflowY: 'auto',

		closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',

		tClose: 'Close (Esc)',

		tLoading: 'Loading...'

	}
};



jQuery.fn.magnificPopup = function(options) {
	_checkInstance();

	var jqEl = jQuery(this);

	// We call some API method of first param is a string
	if (typeof options === "string" ) {

		if(options === 'open') {
			var items,
				itemOpts = _isJQ ? jqEl.data('magnificPopup') : jqEl[0].magnificPopup,
				index = parseInt(arguments[1], 10) || 0;

			if(itemOpts.items) {
				items = itemOpts.items[index];
			} else {
				items = jqEl;
				if(itemOpts.delegate) {
					items = items.find(itemOpts.delegate);
				}
				items = items.eq( index );
			}
			mfp._openClick({mfpEl:items}, jqEl, itemOpts);
		} else {
			if(mfp.isOpen)
				mfp[options].apply(mfp, Array.prototype.slice.call(arguments, 1));
		}

	} else {
		// clone options obj
		options = jQuery.extend(true, {}, options);
		
		/*
		 * As Zepto doesn't support .data() method for objects 
		 * and it works only in normal browsers
		 * we assign "options" object directly to the DOM element. FTW!
		 */
		if(_isJQ) {
			jqEl.data('magnificPopup', options);
		} else {
			jqEl[0].magnificPopup = options;
		}

		mfp.addGroup(jqEl, options);

	}
	return jqEl;
};


//Quick benchmark
/*
var start = performance.now(),
	i,
	rounds = 1000;

for(i = 0; i < rounds; i++) {

}
console.log('Test #1:', performance.now() - start);

start = performance.now();
for(i = 0; i < rounds; i++) {

}
console.log('Test #2:', performance.now() - start);
*/


/*>>core*/

/*>>inline*/

var INLINE_NS = 'inline',
	_hiddenClass,
	_inlinePlaceholder, 
	_lastInlineElement,
	_putInlineElementsBack = function() {
		if(_lastInlineElement) {
			_inlinePlaceholder.after( _lastInlineElement.addClass(_hiddenClass) ).detach();
			_lastInlineElement = null;
		}
	};

jQuery.magnificPopup.registerModule(INLINE_NS, {
	options: {
		hiddenClass: 'hide', // will be appended with `mfp-` prefix
		markup: '',
		tNotFound: 'Content not found'
	},
	proto: {

		initInline: function() {
			mfp.types.push(INLINE_NS);

			_mfpOn(CLOSE_EVENT+'.'+INLINE_NS, function() {
				_putInlineElementsBack();
			});
		},

		getInline: function(item, template) {

			_putInlineElementsBack();

			if(item.src) {
				var inlineSt = mfp.st.inline,
					el = jQuery(item.src);

				if(el.length) {

					// If target element has parent - we replace it with placeholder and put it back after popup is closed
					var parent = el[0].parentNode;
					if(parent && parent.tagName) {
						if(!_inlinePlaceholder) {
							_hiddenClass = inlineSt.hiddenClass;
							_inlinePlaceholder = _getEl(_hiddenClass);
							_hiddenClass = 'mfp-'+_hiddenClass;
						}
						// replace target inline element with placeholder
						_lastInlineElement = el.after(_inlinePlaceholder).detach().removeClass(_hiddenClass);
					}

					mfp.updateStatus('ready');
				} else {
					mfp.updateStatus('error', inlineSt.tNotFound);
					el = jQuery('<div>');
				}

				item.inlineElement = el;
				return el;
			}

			mfp.updateStatus('ready');
			mfp._parseMarkup(template, {}, item);
			return template;
		}
	}
});

/*>>inline*/

/*>>ajax*/
var AJAX_NS = 'ajax',
	_ajaxCur,
	_removeAjaxCursor = function() {
		if(_ajaxCur) {
			_body.removeClass(_ajaxCur);
		}
	},
	_destroyAjaxRequest = function() {
		_removeAjaxCursor();
		if(mfp.req) {
			mfp.req.abort();
		}
	};

jQuery.magnificPopup.registerModule(AJAX_NS, {

	options: {
		settings: null,
		cursor: 'mfp-ajax-cur',
		tError: '<a href="%url%">The content</a> could not be loaded.'
	},

	proto: {
		initAjax: function() {
			mfp.types.push(AJAX_NS);
			_ajaxCur = mfp.st.ajax.cursor;

			_mfpOn(CLOSE_EVENT+'.'+AJAX_NS, _destroyAjaxRequest);
			_mfpOn('BeforeChange.' + AJAX_NS, _destroyAjaxRequest);
		},
		getAjax: function(item) {

			if(_ajaxCur)
				_body.addClass(_ajaxCur);

			mfp.updateStatus('loading');

			var opts = jQuery.extend({
				url: item.src,
				success: function(data, textStatus, jqXHR) {
					var temp = {
						data:data,
						xhr:jqXHR
					};

					_mfpTrigger('ParseAjax', temp);

					mfp.appendContent( jQuery(temp.data), AJAX_NS );

					item.finished = true;

					_removeAjaxCursor();

					mfp._setFocus();

					setTimeout(function() {
						mfp.wrap.addClass(READY_CLASS);
					}, 16);

					mfp.updateStatus('ready');

					_mfpTrigger('AjaxContentAdded');
				},
				error: function() {
					_removeAjaxCursor();
					item.finished = item.loadError = true;
					mfp.updateStatus('error', mfp.st.ajax.tError.replace('%url%', item.src));
				}
			}, mfp.st.ajax.settings);

			mfp.req = jQuery.ajax(opts);

			return '';
		}
	}
});





	

/*>>ajax*/

/*>>image*/
var _imgInterval,
	_getTitle = function(item) {
		if(item.data && item.data.title !== undefined) 
			return item.data.title;

		var src = mfp.st.image.titleSrc;

		if(src) {
			if(jQuery.isFunction(src)) {
				return src.call(mfp, item);
			} else if(item.el) {
				return item.el.attr(src) || '';
			}
		}
		return '';
	};

jQuery.magnificPopup.registerModule('image', {

	options: {
		markup: '<div class="mfp-figure">'+
					'<div class="mfp-close"></div>'+
					'<figure>'+
						'<div class="mfp-img"></div>'+
						'<figcaption>'+
							'<div class="mfp-bottom-bar">'+
								'<div class="mfp-title"></div>'+
								'<div class="mfp-counter"></div>'+
							'</div>'+
						'</figcaption>'+
					'</figure>'+
				'</div>',
		cursor: 'mfp-zoom-out-cur',
		titleSrc: 'title', 
		verticalFit: true,
		tError: '<a href="%url%">The image</a> could not be loaded.'
	},

	proto: {
		initImage: function() {
			var imgSt = mfp.st.image,
				ns = '.image';

			mfp.types.push('image');

			_mfpOn(OPEN_EVENT+ns, function() {
				if(mfp.currItem.type === 'image' && imgSt.cursor) {
					_body.addClass(imgSt.cursor);
				}
			});

			_mfpOn(CLOSE_EVENT+ns, function() {
				if(imgSt.cursor) {
					_body.removeClass(imgSt.cursor);
				}
				_window.off('resize' + EVENT_NS);
			});

			_mfpOn('Resize'+ns, mfp.resizeImage);
			if(mfp.isLowIE) {
				_mfpOn('AfterChange', mfp.resizeImage);
			}
		},
		resizeImage: function() {
			var item = mfp.currItem;
			if(!item || !item.img) return;

			if(mfp.st.image.verticalFit) {
				var decr = 0;
				// fix box-sizing in ie7/8
				if(mfp.isLowIE) {
					decr = parseInt(item.img.css('padding-top'), 10) + parseInt(item.img.css('padding-bottom'),10);
				}
				item.img.css('max-height', mfp.wH-decr);
			}
		},
		_onImageHasSize: function(item) {
			if(item.img) {
				
				item.hasSize = true;

				if(_imgInterval) {
					clearInterval(_imgInterval);
				}
				
				item.isCheckingImgSize = false;

				_mfpTrigger('ImageHasSize', item);

				if(item.imgHidden) {
					if(mfp.content)
						mfp.content.removeClass('mfp-loading');
					
					item.imgHidden = false;
				}

			}
		},

		/**
		 * Function that loops until the image has size to display elements that rely on it asap
		 */
		findImageSize: function(item) {

			var counter = 0,
				img = item.img[0],
				mfpSetInterval = function(delay) {

					if(_imgInterval) {
						clearInterval(_imgInterval);
					}
					// decelerating interval that checks for size of an image
					_imgInterval = setInterval(function() {
						if(img.naturalWidth > 0) {
							mfp._onImageHasSize(item);
							return;
						}

						if(counter > 200) {
							clearInterval(_imgInterval);
						}

						counter++;
						if(counter === 3) {
							mfpSetInterval(10);
						} else if(counter === 40) {
							mfpSetInterval(50);
						} else if(counter === 100) {
							mfpSetInterval(500);
						}
					}, delay);
				};

			mfpSetInterval(1);
		},

		getImage: function(item, template) {

			var guard = 0,

				// image load complete handler
				onLoadComplete = function() {
					if(item) {
						if (item.img[0].complete) {
							item.img.off('.mfploader');
							
							if(item === mfp.currItem){
								mfp._onImageHasSize(item);

								mfp.updateStatus('ready');
							}

							item.hasSize = true;
							item.loaded = true;

							_mfpTrigger('ImageLoadComplete');
							
						}
						else {
							// if image complete check fails 200 times (20 sec), we assume that there was an error.
							guard++;
							if(guard < 200) {
								setTimeout(onLoadComplete,100);
							} else {
								onLoadError();
							}
						}
					}
				},

				// image error handler
				onLoadError = function() {
					if(item) {
						item.img.off('.mfploader');
						if(item === mfp.currItem){
							mfp._onImageHasSize(item);
							mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src) );
						}

						item.hasSize = true;
						item.loaded = true;
						item.loadError = true;
					}
				},
				imgSt = mfp.st.image;


			var el = template.find('.mfp-img');
			if(el.length) {
				var img = document.createElement('img');
				img.className = 'mfp-img';
				item.img = jQuery(img).on('load.mfploader', onLoadComplete).on('error.mfploader', onLoadError);
				img.src = item.src;

				// without clone() "error" event is not firing when IMG is replaced by new IMG
				// TODO: find a way to avoid such cloning
				if(el.is('img')) {
					item.img = item.img.clone();
				}

				img = item.img[0];
				if(img.naturalWidth > 0) {
					item.hasSize = true;
				} else if(!img.width) {										
					item.hasSize = false;
				}
			}

			mfp._parseMarkup(template, {
				title: _getTitle(item),
				img_replaceWith: item.img
			}, item);

			mfp.resizeImage();

			if(item.hasSize) {
				if(_imgInterval) clearInterval(_imgInterval);

				if(item.loadError) {
					template.addClass('mfp-loading');
					mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src) );
				} else {
					template.removeClass('mfp-loading');
					mfp.updateStatus('ready');
				}
				return template;
			}

			mfp.updateStatus('loading');
			item.loading = true;

			if(!item.hasSize) {
				item.imgHidden = true;
				template.addClass('mfp-loading');
				mfp.findImageSize(item);
			} 

			return template;
		}
	}
});



/*>>image*/

/*>>zoom*/
var hasMozTransform,
	getHasMozTransform = function() {
		if(hasMozTransform === undefined) {
			hasMozTransform = document.createElement('p').style.MozTransform !== undefined;
		}
		return hasMozTransform;		
	};

jQuery.magnificPopup.registerModule('zoom', {

	options: {
		enabled: false,
		easing: 'ease-in-out',
		duration: 300,
		opener: function(element) {
			return element.is('img') ? element : element.find('img');
		}
	},

	proto: {

		initZoom: function() {
			var zoomSt = mfp.st.zoom,
				ns = '.zoom',
				image;
				
			if(!zoomSt.enabled || !mfp.supportsTransition) {
				return;
			}

			var duration = zoomSt.duration,
				getElToAnimate = function(image) {
					var newImg = image.clone().removeAttr('style').removeAttr('class').addClass('mfp-animated-image'),
						transition = 'all '+(zoomSt.duration/1000)+'s ' + zoomSt.easing,
						cssObj = {
							position: 'fixed',
							zIndex: 9999,
							left: 0,
							top: 0,
							'-webkit-backface-visibility': 'hidden'
						},
						t = 'transition';

					cssObj['-webkit-'+t] = cssObj['-moz-'+t] = cssObj['-o-'+t] = cssObj[t] = transition;

					newImg.css(cssObj);
					return newImg;
				},
				showMainContent = function() {
					mfp.content.css('visibility', 'visible');
				},
				openTimeout,
				animatedImg;

			_mfpOn('BuildControls'+ns, function() {
				if(mfp._allowZoom()) {

					clearTimeout(openTimeout);
					mfp.content.css('visibility', 'hidden');

					// Basically, all code below does is clones existing image, puts in on top of the current one and animated it
					
					image = mfp._getItemToZoom();

					if(!image) {
						showMainContent();
						return;
					}

					animatedImg = getElToAnimate(image); 
					
					animatedImg.css( mfp._getOffset() );

					mfp.wrap.append(animatedImg);

					openTimeout = setTimeout(function() {
						animatedImg.css( mfp._getOffset( true ) );
						openTimeout = setTimeout(function() {

							showMainContent();

							setTimeout(function() {
								animatedImg.remove();
								image = animatedImg = null;
								_mfpTrigger('ZoomAnimationEnded');
							}, 16); // avoid blink when switching images 

						}, duration); // this timeout equals animation duration

					}, 16); // by adding this timeout we avoid short glitch at the beginning of animation


					// Lots of timeouts...
				}
			});
			_mfpOn(BEFORE_CLOSE_EVENT+ns, function() {
				if(mfp._allowZoom()) {

					clearTimeout(openTimeout);

					mfp.st.removalDelay = duration;

					if(!image) {
						image = mfp._getItemToZoom();
						if(!image) {
							return;
						}
						animatedImg = getElToAnimate(image);
					}
					
					
					animatedImg.css( mfp._getOffset(true) );
					mfp.wrap.append(animatedImg);
					mfp.content.css('visibility', 'hidden');
					
					setTimeout(function() {
						animatedImg.css( mfp._getOffset() );
					}, 16);
				}

			});

			_mfpOn(CLOSE_EVENT+ns, function() {
				if(mfp._allowZoom()) {
					showMainContent();
					if(animatedImg) {
						animatedImg.remove();
					}
					image = null;
				}	
			});
		},

		_allowZoom: function() {
			return mfp.currItem.type === 'image';
		},

		_getItemToZoom: function() {
			if(mfp.currItem.hasSize) {
				return mfp.currItem.img;
			} else {
				return false;
			}
		},

		// Get element postion relative to viewport
		_getOffset: function(isLarge) {
			var el;
			if(isLarge) {
				el = mfp.currItem.img;
			} else {
				el = mfp.st.zoom.opener(mfp.currItem.el || mfp.currItem);
			}

			var offset = el.offset();
			var paddingTop = parseInt(el.css('padding-top'),10);
			var paddingBottom = parseInt(el.css('padding-bottom'),10);
			offset.top -= ( jQuery(window).scrollTop() - paddingTop );


			/*
			
			Animating left + top + width/height looks glitchy in Firefox, but perfect in Chrome. And vice-versa.

			 */
			var obj = {
				width: el.width(),
				// fix Zepto height+padding issue
				height: (_isJQ ? el.innerHeight() : el[0].offsetHeight) - paddingBottom - paddingTop
			};

			// I hate to do this, but there is no another option
			if( getHasMozTransform() ) {
				obj['-moz-transform'] = obj['transform'] = 'translate(' + offset.left + 'px,' + offset.top + 'px)';
			} else {
				obj.left = offset.left;
				obj.top = offset.top;
			}
			return obj;
		}

	}
});



/*>>zoom*/

/*>>iframe*/

var IFRAME_NS = 'iframe',
	_emptyPage = '//about:blank',
	
	_fixIframeBugs = function(isShowing) {
		if(mfp.currTemplate[IFRAME_NS]) {
			var el = mfp.currTemplate[IFRAME_NS].find('iframe');
			if(el.length) { 
				// reset src after the popup is closed to avoid "video keeps playing after popup is closed" bug
				if(!isShowing) {
					el[0].src = _emptyPage;
				}

				// IE8 black screen bug fix
				if(mfp.isIE8) {
					el.css('display', isShowing ? 'block' : 'none');
				}
			}
		}
	};

jQuery.magnificPopup.registerModule(IFRAME_NS, {

	options: {
		markup: '<div class="mfp-iframe-scaler">'+
					'<div class="mfp-close"></div>'+
					'<iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe>'+
				'</div>',

		srcAction: 'iframe_src',

		// we don't care and support only one default type of URL by default
		patterns: {
			youtube: {
				index: 'youtube.com', 
				id: 'v=', 
				src: '//www.youtube.com/embed/%id%?autoplay=1'
			},
			vimeo: {
				index: 'vimeo.com/',
				id: '/',
				src: '//player.vimeo.com/video/%id%?autoplay=1'
			},
			gmaps: {
				index: '//maps.google.',
				src: '%id%&output=embed'
			}
		}
	},

	proto: {
		initIframe: function() {
			mfp.types.push(IFRAME_NS);

			_mfpOn('BeforeChange', function(e, prevType, newType) {
				if(prevType !== newType) {
					if(prevType === IFRAME_NS) {
						_fixIframeBugs(); // iframe if removed
					} else if(newType === IFRAME_NS) {
						_fixIframeBugs(true); // iframe is showing
					} 
				}// else {
					// iframe source is switched, don't do anything
				//}
			});

			_mfpOn(CLOSE_EVENT + '.' + IFRAME_NS, function() {
				_fixIframeBugs();
			});
		},

		getIframe: function(item, template) {
			var embedSrc = item.src;
			var iframeSt = mfp.st.iframe;
				
			jQuery.each(iframeSt.patterns, function() {
				if(embedSrc.indexOf( this.index ) > -1) {
					if(this.id) {
						if(typeof this.id === 'string') {
							embedSrc = embedSrc.substr(embedSrc.lastIndexOf(this.id)+this.id.length, embedSrc.length);
						} else {
							embedSrc = this.id.call( this, embedSrc );
						}
					}
					embedSrc = this.src.replace('%id%', embedSrc );
					return false; // break;
				}
			});
			
			var dataObj = {};
			if(iframeSt.srcAction) {
				dataObj[iframeSt.srcAction] = embedSrc;
			}
			mfp._parseMarkup(template, dataObj, item);

			mfp.updateStatus('ready');

			return template;
		}
	}
});



/*>>iframe*/

/*>>gallery*/
/**
 * Get looped index depending on number of slides
 */
var _getLoopedId = function(index) {
		var numSlides = mfp.items.length;
		if(index > numSlides - 1) {
			return index - numSlides;
		} else  if(index < 0) {
			return numSlides + index;
		}
		return index;
	},
	_replaceCurrTotal = function(text, curr, total) {
		return text.replace(/%curr%/gi, curr + 1).replace(/%total%/gi, total);
	};

jQuery.magnificPopup.registerModule('gallery', {

	options: {
		enabled: false,
		arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
		preload: [0,2],
		navigateByImgClick: true,
		arrows: true,

		tPrev: 'Previous (Left arrow key)',
		tNext: 'Next (Right arrow key)',
		tCounter: '%curr% of %total%'
	},

	proto: {
		initGallery: function() {

			var gSt = mfp.st.gallery,
				ns = '.mfp-gallery',
				supportsFastClick = Boolean(jQuery.fn.mfpFastClick);

			mfp.direction = true; // true - next, false - prev
			
			if(!gSt || !gSt.enabled ) return false;

			_wrapClasses += ' mfp-gallery';

			_mfpOn(OPEN_EVENT+ns, function() {

				if(gSt.navigateByImgClick) {
					mfp.wrap.on('click'+ns, '.mfp-img', function() {
						if(mfp.items.length > 1) {
							mfp.next();
							return false;
						}
					});
				}

				_document.on('keydown'+ns, function(e) {
					if (e.keyCode === 37) {
						mfp.prev();
					} else if (e.keyCode === 39) {
						mfp.next();
					}
				});
			});

			_mfpOn('UpdateStatus'+ns, function(e, data) {
				if(data.text) {
					data.text = _replaceCurrTotal(data.text, mfp.currItem.index, mfp.items.length);
				}
			});

			_mfpOn(MARKUP_PARSE_EVENT+ns, function(e, element, values, item) {
				var l = mfp.items.length;
				values.counter = l > 1 ? _replaceCurrTotal(gSt.tCounter, item.index, l) : '';
			});

			_mfpOn('BuildControls' + ns, function() {
				if(mfp.items.length > 1 && gSt.arrows && !mfp.arrowLeft) {
					var markup = gSt.arrowMarkup,
						arrowLeft = mfp.arrowLeft = jQuery( markup.replace(/%title%/gi, gSt.tPrev).replace(/%dir%/gi, 'left') ).addClass(PREVENT_CLOSE_CLASS),			
						arrowRight = mfp.arrowRight = jQuery( markup.replace(/%title%/gi, gSt.tNext).replace(/%dir%/gi, 'right') ).addClass(PREVENT_CLOSE_CLASS);

					var eName = supportsFastClick ? 'mfpFastClick' : 'click';
					arrowLeft[eName](function() {
						mfp.prev();
					});			
					arrowRight[eName](function() {
						mfp.next();
					});	

					// Polyfill for :before and :after (adds elements with classes mfp-a and mfp-b)
					if(mfp.isIE7) {
						_getEl('b', arrowLeft[0], false, true);
						_getEl('a', arrowLeft[0], false, true);
						_getEl('b', arrowRight[0], false, true);
						_getEl('a', arrowRight[0], false, true);
					}

					mfp.container.append(arrowLeft.add(arrowRight));
				}
			});

			_mfpOn(CHANGE_EVENT+ns, function() {
				if(mfp._preloadTimeout) clearTimeout(mfp._preloadTimeout);

				mfp._preloadTimeout = setTimeout(function() {
					mfp.preloadNearbyImages();
					mfp._preloadTimeout = null;
				}, 16);		
			});


			_mfpOn(CLOSE_EVENT+ns, function() {
				_document.off(ns);
				mfp.wrap.off('click'+ns);
			
				if(mfp.arrowLeft && supportsFastClick) {
					mfp.arrowLeft.add(mfp.arrowRight).destroyMfpFastClick();
				}
				mfp.arrowRight = mfp.arrowLeft = null;
			});

		}, 
		next: function() {
			mfp.direction = true;
			mfp.index = _getLoopedId(mfp.index + 1);
			mfp.updateItemHTML();
		},
		prev: function() {
			mfp.direction = false;
			mfp.index = _getLoopedId(mfp.index - 1);
			mfp.updateItemHTML();
		},
		goTo: function(newIndex) {
			mfp.direction = (newIndex >= mfp.index);
			mfp.index = newIndex;
			mfp.updateItemHTML();
		},
		preloadNearbyImages: function() {
			var p = mfp.st.gallery.preload,
				preloadBefore = Math.min(p[0], mfp.items.length),
				preloadAfter = Math.min(p[1], mfp.items.length),
				i;

			for(i = 1; i <= (mfp.direction ? preloadAfter : preloadBefore); i++) {
				mfp._preloadItem(mfp.index+i);
			}
			for(i = 1; i <= (mfp.direction ? preloadBefore : preloadAfter); i++) {
				mfp._preloadItem(mfp.index-i);
			}
		},
		_preloadItem: function(index) {
			index = _getLoopedId(index);

			if(mfp.items[index].preloaded) {
				return;
			}

			var item = mfp.items[index];
			if(!item.parsed) {
				item = mfp.parseEl( index );
			}

			_mfpTrigger('LazyLoad', item);

			if(item.type === 'image') {
				item.img = jQuery('<img class="mfp-img" />').on('load.mfploader', function() {
					item.hasSize = true;
				}).on('error.mfploader', function() {
					item.hasSize = true;
					item.loadError = true;
					_mfpTrigger('LazyLoadError', item);
				}).attr('src', item.src);
			}


			item.preloaded = true;
		}
	}
});

/*
Touch Support that might be implemented some day

addSwipeGesture: function() {
	var startX,
		moved,
		multipleTouches;

		return;

	var namespace = '.mfp',
		addEventNames = function(pref, down, move, up, cancel) {
			mfp._tStart = pref + down + namespace;
			mfp._tMove = pref + move + namespace;
			mfp._tEnd = pref + up + namespace;
			mfp._tCancel = pref + cancel + namespace;
		};

	if(window.navigator.msPointerEnabled) {
		addEventNames('MSPointer', 'Down', 'Move', 'Up', 'Cancel');
	} else if('ontouchstart' in window) {
		addEventNames('touch', 'start', 'move', 'end', 'cancel');
	} else {
		return;
	}
	_window.on(mfp._tStart, function(e) {
		var oE = e.originalEvent;
		multipleTouches = moved = false;
		startX = oE.pageX || oE.changedTouches[0].pageX;
	}).on(mfp._tMove, function(e) {
		if(e.originalEvent.touches.length > 1) {
			multipleTouches = e.originalEvent.touches.length;
		} else {
			//e.preventDefault();
			moved = true;
		}
	}).on(mfp._tEnd + ' ' + mfp._tCancel, function(e) {
		if(moved && !multipleTouches) {
			var oE = e.originalEvent,
				diff = startX - (oE.pageX || oE.changedTouches[0].pageX);

			if(diff > 20) {
				mfp.next();
			} else if(diff < -20) {
				mfp.prev();
			}
		}
	});
},
*/


/*>>gallery*/

/*>>retina*/

var RETINA_NS = 'retina';

jQuery.magnificPopup.registerModule(RETINA_NS, {
	options: {
		replaceSrc: function(item) {
			return item.src.replace(/\.\w+jQuery/, function(m) { return '@2x' + m; });
		},
		ratio: 1 // Function or number.  Set to 1 to disable.
	},
	proto: {
		initRetina: function() {
			if(window.devicePixelRatio > 1) {

				var st = mfp.st.retina,
					ratio = st.ratio;

				ratio = !isNaN(ratio) ? ratio : ratio();

				if(ratio > 1) {
					_mfpOn('ImageHasSize' + '.' + RETINA_NS, function(e, item) {
						item.img.css({
							'max-width': item.img[0].naturalWidth / ratio,
							'width': '100%'
						});
					});
					_mfpOn('ElementParse' + '.' + RETINA_NS, function(e, item) {
						item.src = st.replaceSrc(item, ratio);
					});
				}
			}

		}
	}
});

/*>>retina*/

/*>>fastclick*/
/**
 * FastClick event implementation. (removes 300ms delay on touch devices)
 * Based on https://developers.google.com/mobile/articles/fast_buttons
 *
 * You may use it outside the Magnific Popup by calling just:
 *
 * jQuery('.your-el').mfpFastClick(function() {
 *     console.log('Clicked!');
 * });
 *
 * To unbind:
 * jQuery('.your-el').destroyMfpFastClick();
 * 
 * 
 * Note that it's a very basic and simple implementation, it blocks ghost click on the same element where it was bound.
 * If you need something more advanced, use plugin by FT Labs https://github.com/ftlabs/fastclick
 * 
 */

(function() {
	var ghostClickDelay = 1000,
		supportsTouch = 'ontouchstart' in window,
		unbindTouchMove = function() {
			_window.off('touchmove'+ns+' touchend'+ns);
		},
		eName = 'mfpFastClick',
		ns = '.'+eName;


	// As Zepto.js doesn't have an easy way to add custom events (like jQuery), so we implement it in this way
	jQuery.fn.mfpFastClick = function(callback) {

		return jQuery(this).each(function() {

			var elem = jQuery(this),
				lock;

			if( supportsTouch ) {

				var timeout,
					startX,
					startY,
					pointerMoved,
					point,
					numPointers;

				elem.on('touchstart' + ns, function(e) {
					pointerMoved = false;
					numPointers = 1;

					point = e.originalEvent ? e.originalEvent.touches[0] : e.touches[0];
					startX = point.clientX;
					startY = point.clientY;

					_window.on('touchmove'+ns, function(e) {
						point = e.originalEvent ? e.originalEvent.touches : e.touches;
						numPointers = point.length;
						point = point[0];
						if (Math.abs(point.clientX - startX) > 10 ||
							Math.abs(point.clientY - startY) > 10) {
							pointerMoved = true;
							unbindTouchMove();
						}
					}).on('touchend'+ns, function(e) {
						unbindTouchMove();
						if(pointerMoved || numPointers > 1) {
							return;
						}
						lock = true;
						e.preventDefault();
						clearTimeout(timeout);
						timeout = setTimeout(function() {
							lock = false;
						}, ghostClickDelay);
						callback();
					});
				});

			}

			elem.on('click' + ns, function() {
				if(!lock) {
					callback();
				}
			});
		});
	};

	jQuery.fn.destroyMfpFastClick = function() {
		jQuery(this).off('touchstart' + ns + ' click' + ns);
		if(supportsTouch) _window.off('touchmove'+ns+' touchend'+ns);
	};
})();

/*>>fastclick*/
 _checkInstance(); })(window.jQuery || window.Zepto);
// jquery.magnific-popup.js ENDS

// foundation.min.js STARTS
 /*
 * Foundation Responsive Library
 * http://foundation.zurb.com
 * Copyright 2014, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/
(function($,window,document,undefined){'use strict';var header_helpers=function(class_array){var i=class_array.length;var head=$('head');while(i--){if(head.has('.'+class_array[i]).length===0){head.append('<meta class="'+class_array[i]+'" />');}}};header_helpers(['foundation-mq-small','foundation-mq-small-only','foundation-mq-medium','foundation-mq-medium-only','foundation-mq-large','foundation-mq-large-only','foundation-mq-xlarge','foundation-mq-xlarge-only','foundation-mq-xxlarge','foundation-data-attribute-namespace']);$(function(){if(typeof FastClick!=='undefined'){if(typeof document.body!=='undefined'){FastClick.attach(document.body);}}});var S=function(selector,context){if(typeof selector==='string'){if(context){var cont;if(context.jquery){cont=context[0];if(!cont){return context;}}else{cont=context;}
return $(cont.querySelectorAll(selector));}
return $(document.querySelectorAll(selector));}
return $(selector,context);};var attr_name=function(init){var arr=[];if(!init){arr.push('data');}
if(this.namespace.length>0){arr.push(this.namespace);}
arr.push(this.name);return arr.join('-');};var add_namespace=function(str){var parts=str.split('-'),i=parts.length,arr=[];while(i--){if(i!==0){arr.push(parts[i]);}else{if(this.namespace.length>0){arr.push(this.namespace,parts[i]);}else{arr.push(parts[i]);}}}
return arr.reverse().join('-');};var bindings=function(method,options){var self=this,bind=function(){var $this=S(this),should_bind_events=!$this.data(self.attr_name(true)+'-init');$this.data(self.attr_name(true)+'-init',$.extend({},self.settings,(options||method),self.data_options($this)));if(should_bind_events){self.events(this);}};if(S(this.scope).is('['+this.attr_name()+']')){bind.call(this.scope);}else{S('['+this.attr_name()+']',this.scope).each(bind);}
if(typeof method==='string'){return this[method].call(this,options);}};var single_image_loaded=function(image,callback){function loaded(){callback(image[0]);}
function bindLoad(){this.one('load',loaded);if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var src=this.attr('src'),param=src.match(/\?/)?'&':'?';param+='random='+(new Date()).getTime();this.attr('src',src+param);}}
if(!image.attr('src')){loaded();return;}
if(image[0].complete||image[0].readyState===4){loaded();}else{bindLoad.call(image);}};window.matchMedia=window.matchMedia||(function(doc){'use strict';var bool,docElem=doc.documentElement,refNode=docElem.firstElementChild||docElem.firstChild,fakeBody=doc.createElement('body'),div=doc.createElement('div');div.id='mq-test-1';div.style.cssText='position:absolute;top:-100em';fakeBody.style.background='none';fakeBody.appendChild(div);return function(q){div.innerHTML='&shy;<style media="'+q+'"> #mq-test-1 { width: 42px; }</style>';docElem.insertBefore(fakeBody,refNode);bool=div.offsetWidth===42;docElem.removeChild(fakeBody);return{matches:bool,media:q};};}(document));(function(jQuery){var animating,lastTime=0,vendors=['webkit','moz'],requestAnimationFrame=window.requestAnimationFrame,cancelAnimationFrame=window.cancelAnimationFrame,jqueryFxAvailable='undefined'!==typeof jQuery.fx;for(;lastTime<vendors.length&&!requestAnimationFrame;lastTime++){requestAnimationFrame=window[vendors[lastTime]+'RequestAnimationFrame'];cancelAnimationFrame=cancelAnimationFrame||window[vendors[lastTime]+'CancelAnimationFrame']||window[vendors[lastTime]+'CancelRequestAnimationFrame'];}
function raf(){if(animating){requestAnimationFrame(raf);if(jqueryFxAvailable){jQuery.fx.tick();}}}
if(requestAnimationFrame){window.requestAnimationFrame=requestAnimationFrame;window.cancelAnimationFrame=cancelAnimationFrame;if(jqueryFxAvailable){jQuery.fx.timer=function(timer){if(timer()&&jQuery.timers.push(timer)&&!animating){animating=true;raf();}};jQuery.fx.stop=function(){animating=false;};}}else{window.requestAnimationFrame=function(callback){var currTime=new Date().getTime(),timeToCall=Math.max(0,16-(currTime-lastTime)),id=window.setTimeout(function(){callback(currTime+timeToCall);},timeToCall);lastTime=currTime+timeToCall;return id;};window.cancelAnimationFrame=function(id){clearTimeout(id);};}}($));function removeQuotes(string){if(typeof string==='string'||string instanceof String){string=string.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g,'');}
return string;}
window.Foundation={name:'Foundation',version:'5.5.1',media_queries:{'small':S('.foundation-mq-small').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,''),'small-only':S('.foundation-mq-small-only').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,''),'medium':S('.foundation-mq-medium').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,''),'medium-only':S('.foundation-mq-medium-only').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,''),'large':S('.foundation-mq-large').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,''),'large-only':S('.foundation-mq-large-only').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,''),'xlarge':S('.foundation-mq-xlarge').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,''),'xlarge-only':S('.foundation-mq-xlarge-only').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,''),'xxlarge':S('.foundation-mq-xxlarge').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,'')},stylesheet:$('<style></style>').appendTo('head')[0].sheet,global:{namespace:undefined},init:function(scope,libraries,method,options,response){var args=[scope,method,options,response],responses=[];this.rtl=/rtl/i.test(S('html').attr('dir'));this.scope=scope||this.scope;this.set_namespace();if(libraries&&typeof libraries==='string'&&!/reflow/i.test(libraries)){if(this.libs.hasOwnProperty(libraries)){responses.push(this.init_lib(libraries,args));}}else{for(var lib in this.libs){responses.push(this.init_lib(lib,libraries));}}
S(window).load(function(){S(window).trigger('resize.fndtn.clearing').trigger('resize.fndtn.dropdown').trigger('resize.fndtn.equalizer').trigger('resize.fndtn.interchange').trigger('resize.fndtn.joyride').trigger('resize.fndtn.magellan').trigger('resize.fndtn.topbar').trigger('resize.fndtn.slider');});return scope;},init_lib:function(lib,args){if(this.libs.hasOwnProperty(lib)){this.patch(this.libs[lib]);if(args&&args.hasOwnProperty(lib)){if(typeof this.libs[lib].settings!=='undefined'){$.extend(true,this.libs[lib].settings,args[lib]);}else if(typeof this.libs[lib].defaults!=='undefined'){$.extend(true,this.libs[lib].defaults,args[lib]);}
return this.libs[lib].init.apply(this.libs[lib],[this.scope,args[lib]]);}
args=args instanceof Array?args:new Array(args);return this.libs[lib].init.apply(this.libs[lib],args);}
return function(){};},patch:function(lib){lib.scope=this.scope;lib.namespace=this.global.namespace;lib.rtl=this.rtl;lib['data_options']=this.utils.data_options;lib['attr_name']=attr_name;lib['add_namespace']=add_namespace;lib['bindings']=bindings;lib['S']=this.utils.S;},inherit:function(scope,methods){var methods_arr=methods.split(' '),i=methods_arr.length;while(i--){if(this.utils.hasOwnProperty(methods_arr[i])){scope[methods_arr[i]]=this.utils[methods_arr[i]];}}},set_namespace:function(){var namespace=(this.global.namespace===undefined)?$('.foundation-data-attribute-namespace').css('font-family'):this.global.namespace;this.global.namespace=(namespace===undefined||/false/i.test(namespace))?'':namespace;},libs:{},utils:{S:S,throttle:function(func,delay){var timer=null;return function(){var context=this,args=arguments;if(timer==null){timer=setTimeout(function(){func.apply(context,args);timer=null;},delay);}};},debounce:function(func,delay,immediate){var timeout,result;return function(){var context=this,args=arguments;var later=function(){timeout=null;if(!immediate){result=func.apply(context,args);}};var callNow=immediate&&!timeout;clearTimeout(timeout);timeout=setTimeout(later,delay);if(callNow){result=func.apply(context,args);}
return result;};},data_options:function(el,data_attr_name){data_attr_name=data_attr_name||'options';var opts={},ii,p,opts_arr,data_options=function(el){var namespace=Foundation.global.namespace;if(namespace.length>0){return el.data(namespace+'-'+data_attr_name);}
return el.data(data_attr_name);};var cached_options=data_options(el);if(typeof cached_options==='object'){return cached_options;}
opts_arr=(cached_options||':').split(';');ii=opts_arr.length;function isNumber(o){return!isNaN(o-0)&&o!==null&&o!==''&&o!==false&&o!==true;}
function trim(str){if(typeof str==='string'){return $.trim(str);}
return str;}
while(ii--){p=opts_arr[ii].split(':');p=[p[0],p.slice(1).join(':')];if(/true/i.test(p[1])){p[1]=true;}
if(/false/i.test(p[1])){p[1]=false;}
if(isNumber(p[1])){if(p[1].indexOf('.')===-1){p[1]=parseInt(p[1],10);}else{p[1]=parseFloat(p[1]);}}
if(p.length===2&&p[0].length>0){opts[trim(p[0])]=trim(p[1]);}}
return opts;},register_media:function(media,media_class){if(Foundation.media_queries[media]===undefined){$('head').append('<meta class="'+media_class+'"/>');Foundation.media_queries[media]=removeQuotes($('.'+media_class).css('font-family'));}},add_custom_rule:function(rule,media){if(media===undefined&&Foundation.stylesheet){Foundation.stylesheet.insertRule(rule,Foundation.stylesheet.cssRules.length);}else{var query=Foundation.media_queries[media];if(query!==undefined){Foundation.stylesheet.insertRule('@media '+Foundation.media_queries[media]+'{ '+rule+' }');}}},image_loaded:function(images,callback){var self=this,unloaded=images.length;if(unloaded===0){callback(images);}
images.each(function(){single_image_loaded(self.S(this),function(){unloaded-=1;if(unloaded===0){callback(images);}});});},random_str:function(){if(!this.fidx){this.fidx=0;}
this.prefix=this.prefix||[(this.name||'F'),(+new Date).toString(36)].join('-');return this.prefix+(this.fidx++).toString(36);},match:function(mq){return window.matchMedia(mq).matches;},is_small_up:function(){return this.match(Foundation.media_queries.small);},is_medium_up:function(){return this.match(Foundation.media_queries.medium);},is_large_up:function(){return this.match(Foundation.media_queries.large);},is_xlarge_up:function(){return this.match(Foundation.media_queries.xlarge);},is_xxlarge_up:function(){return this.match(Foundation.media_queries.xxlarge);},is_small_only:function(){return!this.is_medium_up()&&!this.is_large_up()&&!this.is_xlarge_up()&&!this.is_xxlarge_up();},is_medium_only:function(){return this.is_medium_up()&&!this.is_large_up()&&!this.is_xlarge_up()&&!this.is_xxlarge_up();},is_large_only:function(){return this.is_medium_up()&&this.is_large_up()&&!this.is_xlarge_up()&&!this.is_xxlarge_up();},is_xlarge_only:function(){return this.is_medium_up()&&this.is_large_up()&&this.is_xlarge_up()&&!this.is_xxlarge_up();},is_xxlarge_only:function(){return this.is_medium_up()&&this.is_large_up()&&this.is_xlarge_up()&&this.is_xxlarge_up();}}};$.fn.foundation=function(){var args=Array.prototype.slice.call(arguments,0);return this.each(function(){Foundation.init.apply(Foundation,[this].concat(args));return this;});};}(jQuery,window,window.document));;(function($,window,document,undefined){'use strict';Foundation.libs.equalizer={name:'equalizer',version:'5.5.1',settings:{use_tallest:true,before_height_change:$.noop,after_height_change:$.noop,equalize_on_stack:false},init:function(scope,method,options){Foundation.inherit(this,'image_loaded');this.bindings(method,options);this.reflow();},events:function(){this.S(window).off('.equalizer').on('resize.fndtn.equalizer',function(e){this.reflow();}.bind(this));},equalize:function(equalizer){var isStacked=false,vals=equalizer.find('['+this.attr_name()+'-watch]:visible'),settings=equalizer.data(this.attr_name(true)+'-init');if(vals.length===0){return;}
var firstTopOffset=vals.first().offset().top;settings.before_height_change();equalizer.trigger('before-height-change').trigger('before-height-change.fndth.equalizer');vals.height('inherit');vals.each(function(){var el=$(this);if(el.offset().top!==firstTopOffset){isStacked=true;}});if(settings.equalize_on_stack===false){if(isStacked){return;}};var heights=vals.map(function(){return $(this).outerHeight(false)}).get();if(settings.use_tallest){var max=Math.max.apply(null,heights);vals.css('height',max);}else{var min=Math.min.apply(null,heights);vals.css('height',min);}
settings.after_height_change();equalizer.trigger('after-height-change').trigger('after-height-change.fndtn.equalizer');},reflow:function(){var self=this;this.S('['+this.attr_name()+']',this.scope).each(function(){var $eq_target=$(this);self.image_loaded(self.S('img',this),function(){self.equalize($eq_target)});});}};})(jQuery,window,window.document);;(function($,window,document,undefined){'use strict';Foundation.libs.interchange={name:'interchange',version:'5.5.1',cache:{},images_loaded:false,nodes_loaded:false,settings:{load_attr:'interchange',named_queries:{'default':'only screen','small':Foundation.media_queries['small'],'small-only':Foundation.media_queries['small-only'],'medium':Foundation.media_queries['medium'],'medium-only':Foundation.media_queries['medium-only'],'large':Foundation.media_queries['large'],'large-only':Foundation.media_queries['large-only'],'xlarge':Foundation.media_queries['xlarge'],'xlarge-only':Foundation.media_queries['xlarge-only'],'xxlarge':Foundation.media_queries['xxlarge'],'landscape':'only screen and (orientation: landscape)','portrait':'only screen and (orientation: portrait)','retina':'only screen and (-webkit-min-device-pixel-ratio: 2),'+'only screen and (min--moz-device-pixel-ratio: 2),'+'only screen and (-o-min-device-pixel-ratio: 2/1),'+'only screen and (min-device-pixel-ratio: 2),'+'only screen and (min-resolution: 192dpi),'+'only screen and (min-resolution: 2dppx)'},directives:{replace:function(el,path,trigger){if(/IMG/.test(el[0].nodeName)){var orig_path=el[0].src;if(new RegExp(path,'i').test(orig_path)){return;}
el[0].src=path;return trigger(el[0].src);}
var last_path=el.data(this.data_attr+'-last-path'),self=this;if(last_path==path){return;}
if(/\.(gif|jpg|jpeg|tiff|png)([?#].*)?/i.test(path)){$(el).css('background-image','url('+path+')');el.data('interchange-last-path',path);return trigger(path);}
return $.get(path,function(response){el.html(response);el.data(self.data_attr+'-last-path',path);trigger();});}}},init:function(scope,method,options){Foundation.inherit(this,'throttle random_str');this.data_attr=this.set_data_attr();$.extend(true,this.settings,method,options);this.bindings(method,options);this.load('images');this.load('nodes');},get_media_hash:function(){var mediaHash='';for(var queryName in this.settings.named_queries){mediaHash+=matchMedia(this.settings.named_queries[queryName]).matches.toString();}
return mediaHash;},events:function(){var self=this,prevMediaHash;$(window).off('.interchange').on('resize.fndtn.interchange',self.throttle(function(){var currMediaHash=self.get_media_hash();if(currMediaHash!==prevMediaHash){self.resize();}
prevMediaHash=currMediaHash;},50));return this;},resize:function(){var cache=this.cache;if(!this.images_loaded||!this.nodes_loaded){setTimeout($.proxy(this.resize,this),50);return;}
for(var uuid in cache){if(cache.hasOwnProperty(uuid)){var passed=this.results(uuid,cache[uuid]);if(passed){this.settings.directives[passed.scenario[1]].call(this,passed.el,passed.scenario[0],(function(passed){if(arguments[0]instanceof Array){var args=arguments[0];}else{var args=Array.prototype.slice.call(arguments,0);}
return function(){passed.el.trigger(passed.scenario[1],args);}}(passed)));}}}},results:function(uuid,scenarios){var count=scenarios.length;if(count>0){var el=this.S('['+this.add_namespace('data-uuid')+'="'+uuid+'"]');while(count--){var mq,rule=scenarios[count][2];if(this.settings.named_queries.hasOwnProperty(rule)){mq=matchMedia(this.settings.named_queries[rule]);}else{mq=matchMedia(rule);}
if(mq.matches){return{el:el,scenario:scenarios[count]};}}}
return false;},load:function(type,force_update){if(typeof this['cached_'+type]==='undefined'||force_update){this['update_'+type]();}
return this['cached_'+type];},update_images:function(){var images=this.S('img['+this.data_attr+']'),count=images.length,i=count,loaded_count=0,data_attr=this.data_attr;this.cache={};this.cached_images=[];this.images_loaded=(count===0);while(i--){loaded_count++;if(images[i]){var str=images[i].getAttribute(data_attr)||'';if(str.length>0){this.cached_images.push(images[i]);}}
if(loaded_count===count){this.images_loaded=true;this.enhance('images');}}
return this;},update_nodes:function(){var nodes=this.S('['+this.data_attr+']').not('img'),count=nodes.length,i=count,loaded_count=0,data_attr=this.data_attr;this.cached_nodes=[];this.nodes_loaded=(count===0);while(i--){loaded_count++;var str=nodes[i].getAttribute(data_attr)||'';if(str.length>0){this.cached_nodes.push(nodes[i]);}
if(loaded_count===count){this.nodes_loaded=true;this.enhance('nodes');}}
return this;},enhance:function(type){var i=this['cached_'+type].length;while(i--){this.object($(this['cached_'+type][i]));}
return $(window).trigger('resize').trigger('resize.fndtn.interchange');},convert_directive:function(directive){var trimmed=this.trim(directive);if(trimmed.length>0){return trimmed;}
return'replace';},parse_scenario:function(scenario){var directive_match=scenario[0].match(/(.+),\s*(\w+)\s*$/),media_query=scenario[1];if(directive_match){var path=directive_match[1],directive=directive_match[2];}else{var cached_split=scenario[0].split(/,\s*$/),path=cached_split[0],directive='';}
return[this.trim(path),this.convert_directive(directive),this.trim(media_query)];},object:function(el){var raw_arr=this.parse_data_attr(el),scenarios=[],i=raw_arr.length;if(i>0){while(i--){var split=raw_arr[i].split(/\(([^\)]*?)(\))$/);if(split.length>1){var params=this.parse_scenario(split);scenarios.push(params);}}}
return this.store(el,scenarios);},store:function(el,scenarios){var uuid=this.random_str(),current_uuid=el.data(this.add_namespace('uuid',true));if(this.cache[current_uuid]){return this.cache[current_uuid];}
el.attr(this.add_namespace('data-uuid'),uuid);return this.cache[uuid]=scenarios;},trim:function(str){if(typeof str==='string'){return $.trim(str);}
return str;},set_data_attr:function(init){if(init){if(this.namespace.length>0){return this.namespace+'-'+this.settings.load_attr;}
return this.settings.load_attr;}
if(this.namespace.length>0){return'data-'+this.namespace+'-'+this.settings.load_attr;}
return'data-'+this.settings.load_attr;},parse_data_attr:function(el){var raw=el.attr(this.attr_name()).split(/\[(.*?)\]/),i=raw.length,output=[];while(i--){if(raw[i].replace(/[\W\d]+/,'').length>4){output.push(raw[i]);}}
return output;},reflow:function(){this.load('images',true);this.load('nodes',true);}};}(jQuery,window,window.document));;(function($,window,document,undefined){'use strict';Foundation.libs.dropdown={name:'dropdown',version:'5.5.1',settings:{active_class:'open',disabled_class:'disabled',mega_class:'mega',align:'bottom',is_hover:false,hover_timeout:150,opened:function(){},closed:function(){}},init:function(scope,method,options){Foundation.inherit(this,'throttle');$.extend(true,this.settings,method,options);this.bindings(method,options);},events:function(scope){var self=this,S=self.S;S(this.scope).off('.dropdown').on('click.fndtn.dropdown','['+this.attr_name()+']',function(e){var settings=S(this).data(self.attr_name(true)+'-init')||self.settings;if(!settings.is_hover||Modernizr.touch){e.preventDefault();if(S(this).parent('[data-reveal-id]')){e.stopPropagation();}
self.toggle($(this));}}).on('mouseenter.fndtn.dropdown','['+this.attr_name()+'], ['+this.attr_name()+'-content]',function(e){var $this=S(this),dropdown,target;clearTimeout(self.timeout);if($this.data(self.data_attr())){dropdown=S('#'+$this.data(self.data_attr()));target=$this;}else{dropdown=$this;target=S('['+self.attr_name()+'="'+dropdown.attr('id')+'"]');}
var settings=target.data(self.attr_name(true)+'-init')||self.settings;if(S(e.currentTarget).data(self.data_attr())&&settings.is_hover){self.closeall.call(self);}
if(settings.is_hover){self.open.apply(self,[dropdown,target]);}}).on('mouseleave.fndtn.dropdown','['+this.attr_name()+'], ['+this.attr_name()+'-content]',function(e){var $this=S(this);var settings;if($this.data(self.data_attr())){settings=$this.data(self.data_attr(true)+'-init')||self.settings;}else{var target=S('['+self.attr_name()+'="'+S(this).attr('id')+'"]'),settings=target.data(self.attr_name(true)+'-init')||self.settings;}
self.timeout=setTimeout(function(){if($this.data(self.data_attr())){if(settings.is_hover){self.close.call(self,S('#'+$this.data(self.data_attr())));}}else{if(settings.is_hover){self.close.call(self,$this);}}}.bind(this),settings.hover_timeout);}).on('click.fndtn.dropdown',function(e){var parent=S(e.target).closest('['+self.attr_name()+'-content]');var links=parent.find('a');if(links.length>0&&parent.attr('aria-autoclose')!=='false'){self.close.call(self,S('['+self.attr_name()+'-content]'));}
if(e.target!==document&&!$.contains(document.documentElement,e.target)){return;}
if(S(e.target).closest('['+self.attr_name()+']').length>0){return;}
if(!(S(e.target).data('revealId'))&&(parent.length>0&&(S(e.target).is('['+self.attr_name()+'-content]')||$.contains(parent.first()[0],e.target)))){e.stopPropagation();return;}
self.close.call(self,S('['+self.attr_name()+'-content]'));}).on('opened.fndtn.dropdown','['+self.attr_name()+'-content]',function(){self.settings.opened.call(this);}).on('closed.fndtn.dropdown','['+self.attr_name()+'-content]',function(){self.settings.closed.call(this);});S(window).off('.dropdown').on('resize.fndtn.dropdown',self.throttle(function(){self.resize.call(self);},50));this.resize();},close:function(dropdown){var self=this;dropdown.each(function(){var original_target=$('['+self.attr_name()+'='+dropdown[0].id+']')||$('aria-controls='+dropdown[0].id+']');original_target.attr('aria-expanded','false');if(self.S(this).hasClass(self.settings.active_class)){self.S(this).css(Foundation.rtl?'right':'left','-99999px').attr('aria-hidden','true').removeClass(self.settings.active_class).prev('['+self.attr_name()+']').removeClass(self.settings.active_class).removeData('target');self.S(this).trigger('closed').trigger('closed.fndtn.dropdown',[dropdown]);}});dropdown.removeClass('f-open-'+this.attr_name(true));},closeall:function(){var self=this;$.each(self.S('.f-open-'+this.attr_name(true)),function(){self.close.call(self,self.S(this));});},open:function(dropdown,target){this.css(dropdown.addClass(this.settings.active_class),target);dropdown.prev('['+this.attr_name()+']').addClass(this.settings.active_class);dropdown.data('target',target.get(0)).trigger('opened').trigger('opened.fndtn.dropdown',[dropdown,target]);dropdown.attr('aria-hidden','false');target.attr('aria-expanded','true');dropdown.focus();dropdown.addClass('f-open-'+this.attr_name(true));},data_attr:function(){if(this.namespace.length>0){return this.namespace+'-'+this.name;}
return this.name;},toggle:function(target){if(target.hasClass(this.settings.disabled_class)){return;}
var dropdown=this.S('#'+target.data(this.data_attr()));if(dropdown.length===0){return;}
this.close.call(this,this.S('['+this.attr_name()+'-content]').not(dropdown));if(dropdown.hasClass(this.settings.active_class)){this.close.call(this,dropdown);if(dropdown.data('target')!==target.get(0)){this.open.call(this,dropdown,target);}}else{this.open.call(this,dropdown,target);}},resize:function(){var dropdown=this.S('['+this.attr_name()+'-content].open');var target=$(dropdown.data("target"));if(dropdown.length&&target.length){this.css(dropdown,target);}},css:function(dropdown,target){var left_offset=Math.max((target.width()-dropdown.width())/2,8),settings=target.data(this.attr_name(true)+'-init')||this.settings;this.clear_idx();if(this.small()){var p=this.dirs.bottom.call(dropdown,target,settings);dropdown.attr('style','').removeClass('drop-left drop-right drop-top').css({position:'absolute',width:'95%','max-width':'none',top:p.top});dropdown.css(Foundation.rtl?'right':'left',left_offset);}else{this.style(dropdown,target,settings);}
return dropdown;},style:function(dropdown,target,settings){var css=$.extend({position:'absolute'},this.dirs[settings.align].call(dropdown,target,settings));dropdown.attr('style','').css(css);},dirs:{_base:function(t){var o_p=this.offsetParent(),o=o_p.offset(),p=t.offset();p.top-=o.top;p.left-=o.left;p.missRight=false;p.missTop=false;p.missLeft=false;p.leftRightFlag=false;var actualBodyWidth;if(document.getElementsByClassName('row')[0]){actualBodyWidth=document.getElementsByClassName('row')[0].clientWidth;}else{actualBodyWidth=window.outerWidth;}
var actualMarginWidth=(window.outerWidth-actualBodyWidth)/2;var actualBoundary=actualBodyWidth;if(!this.hasClass('mega')){if(t.offset().top<=this.outerHeight()){p.missTop=true;actualBoundary=window.outerWidth-actualMarginWidth;p.leftRightFlag=true;}
if(t.offset().left+this.outerWidth()>t.offset().left+actualMarginWidth&&t.offset().left-actualMarginWidth>this.outerWidth()){p.missRight=true;p.missLeft=false;}
if(t.offset().left-this.outerWidth()<=0){p.missLeft=true;p.missRight=false;}}
return p;},top:function(t,s){var self=Foundation.libs.dropdown,p=self.dirs._base.call(this,t);this.addClass('drop-top');if(p.missTop==true){p.top=p.top+t.outerHeight()+this.outerHeight();this.removeClass('drop-top');}
if(p.missRight==true){p.left=p.left-this.outerWidth()+t.outerWidth();}
if(t.outerWidth()<this.outerWidth()||self.small()||this.hasClass(s.mega_menu)){self.adjust_pip(this,t,s,p);}
if(Foundation.rtl){return{left:p.left-this.outerWidth()+t.outerWidth(),top:p.top-this.outerHeight()};}
return{left:p.left,top:p.top-this.outerHeight()};},bottom:function(t,s){var self=Foundation.libs.dropdown,p=self.dirs._base.call(this,t);if(p.missRight==true){p.left=p.left-this.outerWidth()+t.outerWidth();}
if(t.outerWidth()<this.outerWidth()||self.small()||this.hasClass(s.mega_menu)){self.adjust_pip(this,t,s,p);}
if(self.rtl){return{left:p.left-this.outerWidth()+t.outerWidth(),top:p.top+t.outerHeight()};}
return{left:p.left,top:p.top+t.outerHeight()};},left:function(t,s){var p=Foundation.libs.dropdown.dirs._base.call(this,t);this.addClass('drop-left');if(p.missLeft==true){p.left=p.left+this.outerWidth();p.top=p.top+t.outerHeight();this.removeClass('drop-left');}
return{left:p.left-this.outerWidth(),top:p.top};},right:function(t,s){var p=Foundation.libs.dropdown.dirs._base.call(this,t);this.addClass('drop-right');if(p.missRight==true){p.left=p.left-this.outerWidth();p.top=p.top+t.outerHeight();this.removeClass('drop-right');}else{p.triggeredRight=true;}
var self=Foundation.libs.dropdown;if(t.outerWidth()<this.outerWidth()||self.small()||this.hasClass(s.mega_menu)){self.adjust_pip(this,t,s,p);}
return{left:p.left+t.outerWidth(),top:p.top};}},adjust_pip:function(dropdown,target,settings,position){var sheet=Foundation.stylesheet,pip_offset_base=8;if(dropdown.hasClass(settings.mega_class)){pip_offset_base=position.left+(target.outerWidth()/2)-8;}else if(this.small()){pip_offset_base+=position.left-8;}
this.rule_idx=sheet.cssRules.length;var sel_before='.f-dropdown.open:before',sel_after='.f-dropdown.open:after',css_before='left: '+pip_offset_base+'px;',css_after='left: '+(pip_offset_base-1)+'px;';if(position.missRight==true){pip_offset_base=dropdown.outerWidth()-23;sel_before='.f-dropdown.open:before',sel_after='.f-dropdown.open:after',css_before='left: '+pip_offset_base+'px;',css_after='left: '+(pip_offset_base-1)+'px;';}
if(position.triggeredRight==true){sel_before='.f-dropdown.open:before',sel_after='.f-dropdown.open:after',css_before='left:-12px;',css_after='left:-14px;';}
if(sheet.insertRule){sheet.insertRule([sel_before,'{',css_before,'}'].join(' '),this.rule_idx);sheet.insertRule([sel_after,'{',css_after,'}'].join(' '),this.rule_idx+1);}else{sheet.addRule(sel_before,css_before,this.rule_idx);sheet.addRule(sel_after,css_after,this.rule_idx+1);}},clear_idx:function(){var sheet=Foundation.stylesheet;if(typeof this.rule_idx!=='undefined'){sheet.deleteRule(this.rule_idx);sheet.deleteRule(this.rule_idx);delete this.rule_idx;}},small:function(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches;},off:function(){this.S(this.scope).off('.fndtn.dropdown');this.S('html, body').off('.fndtn.dropdown');this.S(window).off('.fndtn.dropdown');this.S('[data-dropdown-content]').off('.fndtn.dropdown');},reflow:function(){}};}(jQuery,window,window.document));;(function($,window,document,undefined){'use strict';Foundation.libs.accordion={name:'accordion',version:'5.5.1',settings:{content_class:'content',active_class:'active',multi_expand:false,toggleable:true,callback:function(){}},init:function(scope,method,options){this.bindings(method,options);},events:function(){var self=this;var S=this.S;S(this.scope).off('.fndtn.accordion').on('click.fndtn.accordion','['+this.attr_name()+'] > .accordion-navigation > a',function(e){var accordion=S(this).closest('['+self.attr_name()+']'),groupSelector=self.attr_name()+'='+accordion.attr(self.attr_name()),settings=accordion.data(self.attr_name(true)+'-init')||self.settings,target=S('#'+this.href.split('#')[1]),aunts=$('> .accordion-navigation',accordion),siblings=aunts.children('.'+settings.content_class),active_content=siblings.filter('.'+settings.active_class);e.preventDefault();if(accordion.attr(self.attr_name())){siblings=siblings.add('['+groupSelector+'] dd > '+'.'+settings.content_class);aunts=aunts.add('['+groupSelector+'] .accordion-navigation');}
if(settings.toggleable&&target.is(active_content)){target.parent('.accordion-navigation').toggleClass(settings.active_class,false);target.toggleClass(settings.active_class,false);settings.callback(target);target.triggerHandler('toggled',[accordion]);accordion.triggerHandler('toggled',[target]);return;}
if(!settings.multi_expand){siblings.removeClass(settings.active_class);aunts.removeClass(settings.active_class);}
target.addClass(settings.active_class).parent().addClass(settings.active_class);settings.callback(target);target.triggerHandler('toggled',[accordion]);accordion.triggerHandler('toggled',[target]);});},off:function(){},reflow:function(){}};}(jQuery,window,window.document));;(function($,window,document,undefined){'use strict';Foundation.libs.alert={name:'alert',version:'5.5.1',settings:{callback:function(){}},init:function(scope,method,options){this.bindings(method,options);},events:function(){var self=this,S=this.S;$(this.scope).off('.alert').on('click.fndtn.alert','['+this.attr_name()+'] .close',function(e){var alertBox=S(this).closest('['+self.attr_name()+']'),settings=alertBox.data(self.attr_name(true)+'-init')||self.settings;e.preventDefault();if(Modernizr.csstransitions){alertBox.addClass('alert-close');alertBox.on('transitionend webkitTransitionEnd oTransitionEnd',function(e){S(this).trigger('close').trigger('close.fndtn.alert').remove();settings.callback();});}else{alertBox.fadeOut(300,function(){S(this).trigger('close').trigger('close.fndtn.alert').remove();settings.callback();});}});},reflow:function(){}};}(jQuery,window,window.document));;(function($,window,document,undefined){'use strict';Foundation.libs.clearing={name:'clearing',version:'5.5.1',settings:{templates:{viewing:'<a href="#" class="clearing-close">&times;</a>'+'<div class="visible-img" style="display: none"><div class="clearing-touch-label"></div><img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" />'+'<p class="clearing-caption"></p><a href="#" class="clearing-main-prev"><span></span></a>'+'<a href="#" class="clearing-main-next"><span></span></a></div>'},close_selectors:'.clearing-close, div.clearing-blackout',open_selectors:'',skip_selector:'',touch_label:'',init:false,locked:false},init:function(scope,method,options){var self=this;Foundation.inherit(this,'throttle image_loaded');this.bindings(method,options);if(self.S(this.scope).is('['+this.attr_name()+']')){this.assemble(self.S('li',this.scope));}else{self.S('['+this.attr_name()+']',this.scope).each(function(){self.assemble(self.S('li',this));});}},events:function(scope){var self=this,S=self.S,$scroll_container=$('.scroll-container');if($scroll_container.length>0){this.scope=$scroll_container;}
S(this.scope).off('.clearing').on('click.fndtn.clearing','ul['+this.attr_name()+'] li '+this.settings.open_selectors,function(e,current,target){var current=current||S(this),target=target||current,next=current.next('li'),settings=current.closest('['+self.attr_name()+']').data(self.attr_name(true)+'-init'),image=S(e.target);e.preventDefault();if(!settings){self.init();settings=current.closest('['+self.attr_name()+']').data(self.attr_name(true)+'-init');}
if(target.hasClass('visible')&&current[0]===target[0]&&next.length>0&&self.is_open(current)){target=next;image=S('img',target);}
self.open(image,current,target);self.update_paddles(target);}).on('click.fndtn.clearing','.clearing-main-next',function(e){self.nav(e,'next')}).on('click.fndtn.clearing','.clearing-main-prev',function(e){self.nav(e,'prev')}).on('click.fndtn.clearing',this.settings.close_selectors,function(e){Foundation.libs.clearing.close(e,this)});$(document).on('keydown.fndtn.clearing',function(e){self.keydown(e)});S(window).off('.clearing').on('resize.fndtn.clearing',function(){self.resize()});this.swipe_events(scope);},swipe_events:function(scope){var self=this,S=self.S;S(this.scope).on('touchstart.fndtn.clearing','.visible-img',function(e){if(!e.touches){e=e.originalEvent;}
var data={start_page_x:e.touches[0].pageX,start_page_y:e.touches[0].pageY,start_time:(new Date()).getTime(),delta_x:0,is_scrolling:undefined};S(this).data('swipe-transition',data);e.stopPropagation();}).on('touchmove.fndtn.clearing','.visible-img',function(e){if(!e.touches){e=e.originalEvent;}
if(e.touches.length>1||e.scale&&e.scale!==1){return;}
var data=S(this).data('swipe-transition');if(typeof data==='undefined'){data={};}
data.delta_x=e.touches[0].pageX-data.start_page_x;if(Foundation.rtl){data.delta_x=-data.delta_x;}
if(typeof data.is_scrolling==='undefined'){data.is_scrolling=!!(data.is_scrolling||Math.abs(data.delta_x)<Math.abs(e.touches[0].pageY-data.start_page_y));}
if(!data.is_scrolling&&!data.active){e.preventDefault();var direction=(data.delta_x<0)?'next':'prev';data.active=true;self.nav(e,direction);}}).on('touchend.fndtn.clearing','.visible-img',function(e){S(this).data('swipe-transition',{});e.stopPropagation();});},assemble:function($li){var $el=$li.parent();if($el.parent().hasClass('carousel')){return;}
$el.after('<div id="foundationClearingHolder"></div>');var grid=$el.detach(),grid_outerHTML='';if(grid[0]==null){return;}else{grid_outerHTML=grid[0].outerHTML;}
var holder=this.S('#foundationClearingHolder'),settings=$el.data(this.attr_name(true)+'-init'),data={grid:'<div class="carousel">'+grid_outerHTML+'</div>',viewing:settings.templates.viewing},wrapper='<div class="clearing-assembled"><div>'+data.viewing+data.grid+'</div></div>',touch_label=this.settings.touch_label;if(Modernizr.touch){wrapper=$(wrapper).find('.clearing-touch-label').html(touch_label).end();}
holder.after(wrapper).remove();},open:function($image,current,target){var self=this,body=$(document.body),root=target.closest('.clearing-assembled'),container=self.S('div',root).first(),visible_image=self.S('.visible-img',container),image=self.S('img',visible_image).not($image),label=self.S('.clearing-touch-label',container),error=false;$('body').on('touchmove',function(e){e.preventDefault();});image.error(function(){error=true;});function startLoad(){setTimeout(function(){this.image_loaded(image,function(){if(image.outerWidth()===1&&!error){startLoad.call(this);}else{cb.call(this,image);}}.bind(this));}.bind(this),100);}
function cb(image){var $image=$(image);$image.css('visibility','visible');body.css('overflow','hidden');root.addClass('clearing-blackout');container.addClass('clearing-container');visible_image.show();this.fix_height(target).caption(self.S('.clearing-caption',visible_image),self.S('img',target)).center_and_label(image,label).shift(current,target,function(){target.closest('li').siblings().removeClass('visible');target.closest('li').addClass('visible');});visible_image.trigger('opened.fndtn.clearing')}
if(!this.locked()){visible_image.trigger('open.fndtn.clearing');image.attr('src',this.load($image)).css('visibility','hidden');startLoad.call(this);}},close:function(e,el){e.preventDefault();var root=(function(target){if(/blackout/.test(target.selector)){return target;}else{return target.closest('.clearing-blackout');}}($(el))),body=$(document.body),container,visible_image;if(el===e.target&&root){body.css('overflow','');container=$('div',root).first();visible_image=$('.visible-img',container);visible_image.trigger('close.fndtn.clearing');this.settings.prev_index=0;$('ul['+this.attr_name()+']',root).attr('style','').closest('.clearing-blackout').removeClass('clearing-blackout');container.removeClass('clearing-container');visible_image.hide();visible_image.trigger('closed.fndtn.clearing');}
$('body').off('touchmove');return false;},is_open:function(current){return current.parent().prop('style').length>0;},keydown:function(e){var clearing=$('.clearing-blackout ul['+this.attr_name()+']'),NEXT_KEY=this.rtl?37:39,PREV_KEY=this.rtl?39:37,ESC_KEY=27;if(e.which===NEXT_KEY){this.go(clearing,'next');}
if(e.which===PREV_KEY){this.go(clearing,'prev');}
if(e.which===ESC_KEY){this.S('a.clearing-close').trigger('click').trigger('click.fndtn.clearing');}},nav:function(e,direction){var clearing=$('ul['+this.attr_name()+']','.clearing-blackout');e.preventDefault();this.go(clearing,direction);},resize:function(){var image=$('img','.clearing-blackout .visible-img'),label=$('.clearing-touch-label','.clearing-blackout');if(image.length){this.center_and_label(image,label);image.trigger('resized.fndtn.clearing')}},fix_height:function(target){var lis=target.parent().children(),self=this;lis.each(function(){var li=self.S(this),image=li.find('img');if(li.height()>image.outerHeight()){li.addClass('fix-height');}}).closest('ul').width(lis.length*100+'%');return this;},update_paddles:function(target){target=target.closest('li');var visible_image=target.closest('.carousel').siblings('.visible-img');if(target.next().length>0){this.S('.clearing-main-next',visible_image).removeClass('disabled');}else{this.S('.clearing-main-next',visible_image).addClass('disabled');}
if(target.prev().length>0){this.S('.clearing-main-prev',visible_image).removeClass('disabled');}else{this.S('.clearing-main-prev',visible_image).addClass('disabled');}},center_and_label:function(target,label){if(!this.rtl&&label.length>0){label.css({marginLeft:-(label.outerWidth()/2),marginTop:-(target.outerHeight()/2)-label.outerHeight()-10});}else{label.css({marginRight:-(label.outerWidth()/2),marginTop:-(target.outerHeight()/2)-label.outerHeight()-10,left:'auto',right:'50%'});}
return this;},load:function($image){var href;if($image[0].nodeName==='A'){href=$image.attr('href');}else{href=$image.closest('a').attr('href');}
this.preload($image);if(href){return href;}
return $image.attr('src');},preload:function($image){this.img($image.closest('li').next()).img($image.closest('li').prev());},img:function(img){if(img.length){var new_img=new Image(),new_a=this.S('a',img);if(new_a.length){new_img.src=new_a.attr('href');}else{new_img.src=this.S('img',img).attr('src');}}
return this;},caption:function(container,$image){var caption=$image.attr('data-caption');if(caption){container.html(caption).show();}else{container.text('').hide();}
return this;},go:function($ul,direction){var current=this.S('.visible',$ul),target=current[direction]();if(this.settings.skip_selector&&target.find(this.settings.skip_selector).length!=0){target=target[direction]();}
if(target.length){this.S('img',target).trigger('click',[current,target]).trigger('click.fndtn.clearing',[current,target]).trigger('change.fndtn.clearing');}},shift:function(current,target,callback){var clearing=target.parent(),old_index=this.settings.prev_index||target.index(),direction=this.direction(clearing,current,target),dir=this.rtl?'right':'left',left=parseInt(clearing.css('left'),10),width=target.outerWidth(),skip_shift;var dir_obj={};if(target.index()!==old_index&&!/skip/.test(direction)){if(/left/.test(direction)){this.lock();dir_obj[dir]=left+width;clearing.animate(dir_obj,300,this.unlock());}else if(/right/.test(direction)){this.lock();dir_obj[dir]=left-width;clearing.animate(dir_obj,300,this.unlock());}}else if(/skip/.test(direction)){skip_shift=target.index()-this.settings.up_count;this.lock();if(skip_shift>0){dir_obj[dir]=-(skip_shift*width);clearing.animate(dir_obj,300,this.unlock());}else{dir_obj[dir]=0;clearing.animate(dir_obj,300,this.unlock());}}
callback();},direction:function($el,current,target){var lis=this.S('li',$el),li_width=lis.outerWidth()+(lis.outerWidth()/4),up_count=Math.floor(this.S('.clearing-container').outerWidth()/li_width)-1,target_index=lis.index(target),response;this.settings.up_count=up_count;if(this.adjacent(this.settings.prev_index,target_index)){if((target_index>up_count)&&target_index>this.settings.prev_index){response='right';}else if((target_index>up_count-1)&&target_index<=this.settings.prev_index){response='left';}else{response=false;}}else{response='skip';}
this.settings.prev_index=target_index;return response;},adjacent:function(current_index,target_index){for(var i=target_index+1;i>=target_index-1;i--){if(i===current_index){return true;}}
return false;},lock:function(){this.settings.locked=true;},unlock:function(){this.settings.locked=false;},locked:function(){return this.settings.locked;},off:function(){this.S(this.scope).off('.fndtn.clearing');this.S(window).off('.fndtn.clearing');},reflow:function(){this.init();}};}(jQuery,window,window.document));;(function($,window,document,undefined){'use strict';Foundation.libs.offcanvas={name:'offcanvas',version:'5.5.1',settings:{open_method:'move',close_on_click:false},init:function(scope,method,options){this.bindings(method,options);},events:function(){var self=this,S=self.S,move_class='',right_postfix='',left_postfix='';if(this.settings.open_method==='move'){move_class='move-';right_postfix='right';left_postfix='left';}else if(this.settings.open_method==='overlap_single'){move_class='offcanvas-overlap-';right_postfix='right';left_postfix='left';}else if(this.settings.open_method==='overlap'){move_class='offcanvas-overlap';}
S(this.scope).off('.offcanvas').on('click.fndtn.offcanvas','.left-off-canvas-toggle',function(e){self.click_toggle_class(e,move_class+right_postfix);if(self.settings.open_method!=='overlap'){S('.left-submenu').removeClass(move_class+right_postfix);}
$('.left-off-canvas-toggle').attr('aria-expanded','true');}).on('click.fndtn.offcanvas','.left-off-canvas-menu a',function(e){var settings=self.get_settings(e);var parent=S(this).parent();if(settings.close_on_click&&!parent.hasClass('has-submenu')&&!parent.hasClass('back')){self.hide.call(self,move_class+right_postfix,self.get_wrapper(e));parent.parent().removeClass(move_class+right_postfix);}else if(S(this).parent().hasClass('has-submenu')){e.preventDefault();S(this).siblings('.left-submenu').toggleClass(move_class+right_postfix);}else if(parent.hasClass('back')){e.preventDefault();parent.parent().removeClass(move_class+right_postfix);}
$('.left-off-canvas-toggle').attr('aria-expanded','true');}).on('click.fndtn.offcanvas','.right-off-canvas-toggle',function(e){self.click_toggle_class(e,move_class+left_postfix);if(self.settings.open_method!=='overlap'){S('.right-submenu').removeClass(move_class+left_postfix);}
$('.right-off-canvas-toggle').attr('aria-expanded','true');}).on('click.fndtn.offcanvas','.right-off-canvas-menu a',function(e){var settings=self.get_settings(e);var parent=S(this).parent();if(settings.close_on_click&&!parent.hasClass('has-submenu')&&!parent.hasClass('back')){self.hide.call(self,move_class+left_postfix,self.get_wrapper(e));parent.parent().removeClass(move_class+left_postfix);}else if(S(this).parent().hasClass('has-submenu')){e.preventDefault();S(this).siblings('.right-submenu').toggleClass(move_class+left_postfix);}else if(parent.hasClass('back')){e.preventDefault();parent.parent().removeClass(move_class+left_postfix);}
$('.right-off-canvas-toggle').attr('aria-expanded','true');}).on('click.fndtn.offcanvas','.exit-off-canvas',function(e){self.click_remove_class(e,move_class+left_postfix);S('.right-submenu').removeClass(move_class+left_postfix);if(right_postfix){self.click_remove_class(e,move_class+right_postfix);S('.left-submenu').removeClass(move_class+left_postfix);}
$('.right-off-canvas-toggle').attr('aria-expanded','true');}).on('click.fndtn.offcanvas','.exit-off-canvas',function(e){self.click_remove_class(e,move_class+left_postfix);$('.left-off-canvas-toggle').attr('aria-expanded','false');if(right_postfix){self.click_remove_class(e,move_class+right_postfix);$('.right-off-canvas-toggle').attr('aria-expanded','false');}});},toggle:function(class_name,$off_canvas){$off_canvas=$off_canvas||this.get_wrapper();if($off_canvas.is('.'+class_name)){this.hide(class_name,$off_canvas);}else{this.show(class_name,$off_canvas);}},show:function(class_name,$off_canvas){$off_canvas=$off_canvas||this.get_wrapper();$off_canvas.trigger('open').trigger('open.fndtn.offcanvas');$off_canvas.addClass(class_name);},hide:function(class_name,$off_canvas){$off_canvas=$off_canvas||this.get_wrapper();$off_canvas.trigger('close').trigger('close.fndtn.offcanvas');$off_canvas.removeClass(class_name);},click_toggle_class:function(e,class_name){e.preventDefault();var $off_canvas=this.get_wrapper(e);this.toggle(class_name,$off_canvas);},click_remove_class:function(e,class_name){e.preventDefault();var $off_canvas=this.get_wrapper(e);this.hide(class_name,$off_canvas);},get_settings:function(e){var offcanvas=this.S(e.target).closest('['+this.attr_name()+']');return offcanvas.data(this.attr_name(true)+'-init')||this.settings;},get_wrapper:function(e){var $off_canvas=this.S(e?e.target:this.scope).closest('.off-canvas-wrap');if($off_canvas.length===0){$off_canvas=this.S('.off-canvas-wrap');}
return $off_canvas;},reflow:function(){}};}(jQuery,window,window.document));;(function($,window,document,undefined){'use strict';Foundation.libs.reveal={name:'reveal',version:'5.5.1',locked:false,settings:{animation:'fadeAndPop',animation_speed:250,close_on_background_click:true,close_on_esc:true,dismiss_modal_class:'close-reveal-modal',multiple_opened:false,bg_class:'reveal-modal-bg',root_element:'body',open:function(){},opened:function(){},close:function(){},closed:function(){},bg:$('.reveal-modal-bg'),css:{open:{'opacity':0,'visibility':'visible','display':'block'},close:{'opacity':1,'visibility':'hidden','display':'none'}}},init:function(scope,method,options){$.extend(true,this.settings,method,options);this.bindings(method,options);},events:function(scope){var self=this,S=self.S;S(this.scope).off('.reveal').on('click.fndtn.reveal','['+this.add_namespace('data-reveal-id')+']:not([disabled])',function(e){e.preventDefault();if(!self.locked){var element=S(this),ajax=element.data(self.data_attr('reveal-ajax'));self.locked=true;if(typeof ajax==='undefined'){self.open.call(self,element);}else{var url=ajax===true?element.attr('href'):ajax;self.open.call(self,element,{url:url});}}});S(document).on('click.fndtn.reveal',this.close_targets(),function(e){e.preventDefault();if(!self.locked){var settings=S('['+self.attr_name()+'].open').data(self.attr_name(true)+'-init')||self.settings,bg_clicked=S(e.target)[0]===S('.'+settings.bg_class)[0];if(bg_clicked){if(settings.close_on_background_click){e.stopPropagation();}else{return;}}
self.locked=true;self.close.call(self,bg_clicked?S('['+self.attr_name()+'].open'):S(this).closest('['+self.attr_name()+']'));}});if(S('['+self.attr_name()+']',this.scope).length>0){S(this.scope).on('open.fndtn.reveal',this.settings.open).on('opened.fndtn.reveal',this.settings.opened).on('opened.fndtn.reveal',this.open_video).on('close.fndtn.reveal',this.settings.close).on('closed.fndtn.reveal',this.settings.closed).on('closed.fndtn.reveal',this.close_video);}else{S(this.scope).on('open.fndtn.reveal','['+self.attr_name()+']',this.settings.open).on('opened.fndtn.reveal','['+self.attr_name()+']',this.settings.opened).on('opened.fndtn.reveal','['+self.attr_name()+']',this.open_video).on('close.fndtn.reveal','['+self.attr_name()+']',this.settings.close).on('closed.fndtn.reveal','['+self.attr_name()+']',this.settings.closed).on('closed.fndtn.reveal','['+self.attr_name()+']',this.close_video);}
return true;},key_up_on:function(scope){var self=this;self.S('body').off('keyup.fndtn.reveal').on('keyup.fndtn.reveal',function(event){var open_modal=self.S('['+self.attr_name()+'].open'),settings=open_modal.data(self.attr_name(true)+'-init')||self.settings;if(settings&&event.which===27&&settings.close_on_esc&&!self.locked){self.close.call(self,open_modal);}});return true;},key_up_off:function(scope){this.S('body').off('keyup.fndtn.reveal');return true;},open:function(target,ajax_settings){var self=this,modal;if(target){if(typeof target.selector!=='undefined'){modal=self.S('#'+target.data(self.data_attr('reveal-id'))).first();}else{modal=self.S(this.scope);ajax_settings=target;}}else{modal=self.S(this.scope);}
var settings=modal.data(self.attr_name(true)+'-init');settings=settings||this.settings;if(modal.hasClass('open')&&target.attr('data-reveal-id')==modal.attr('id')){return self.close(modal);}
if(!modal.hasClass('open')){var open_modal=self.S('['+self.attr_name()+'].open');if(typeof modal.data('css-top')==='undefined'){modal.data('css-top',parseInt(modal.css('top'),10)).data('offset',this.cache_offset(modal));}
this.key_up_on(modal);modal.on('open.fndtn.reveal').trigger('open.fndtn.reveal');if(open_modal.length<1){this.toggle_bg(modal,true);}
if(typeof ajax_settings==='string'){ajax_settings={url:ajax_settings};}
if(typeof ajax_settings==='undefined'||!ajax_settings.url){if(open_modal.length>0){if(settings.multiple_opened){this.to_back(open_modal);}else{this.hide(open_modal,settings.css.close);}}
this.show(modal,settings.css.open);}else{var old_success=typeof ajax_settings.success!=='undefined'?ajax_settings.success:null;$.extend(ajax_settings,{success:function(data,textStatus,jqXHR){if($.isFunction(old_success)){var result=old_success(data,textStatus,jqXHR);if(typeof result=='string'){data=result;}}
modal.html(data);self.S(modal).foundation('section','reflow');self.S(modal).children().foundation();if(open_modal.length>0){if(settings.multiple_opened){this.to_back(open_modal);}else{this.hide(open_modal,settings.css.close);}}
self.show(modal,settings.css.open);}});$.ajax(ajax_settings);}}
self.S(window).trigger('resize');},close:function(modal){var modal=modal&&modal.length?modal:this.S(this.scope),open_modals=this.S('['+this.attr_name()+'].open'),settings=modal.data(this.attr_name(true)+'-init')||this.settings;if(open_modals.length>0){this.locked=true;this.key_up_off(modal);modal.trigger('close').trigger('close.fndtn.reveal');if((settings.multiple_opened&&open_modals.length===1)||!settings.multiple_opened||modal.length>1){this.toggle_bg(modal,false);this.to_front(modal);}
if(settings.multiple_opened){this.hide(modal,settings.css.close,settings);this.to_front($($.makeArray(open_modals).reverse()[1]));}else{this.hide(open_modals,settings.css.close,settings);}}},close_targets:function(){var base='.'+this.settings.dismiss_modal_class;if(this.settings.close_on_background_click){return base+', .'+this.settings.bg_class;}
return base;},toggle_bg:function(modal,state){if(this.S('.'+this.settings.bg_class).length===0){this.settings.bg=$('<div />',{'class':this.settings.bg_class}).appendTo('body').hide();}
var visible=this.settings.bg.filter(':visible').length>0;if(state!=visible){if(state==undefined?visible:!state){this.hide(this.settings.bg);}else{this.show(this.settings.bg);}}},show:function(el,css){if(css){var settings=el.data(this.attr_name(true)+'-init')||this.settings,root_element=settings.root_element;if(el.parent(root_element).length===0){var placeholder=el.wrap('<div style="display: none;" />').parent();el.on('closed.fndtn.reveal.wrapped',function(){el.detach().appendTo(placeholder);el.unwrap().unbind('closed.fndtn.reveal.wrapped');});el.detach().appendTo(root_element);}
var animData=getAnimationData(settings.animation);if(!animData.animate){this.locked=false;}
//if(animData.pop){css.top=$(window).scrollTop()-el.data('offset')+'px';var end_css={top:$(window).scrollTop()+el.data('css-top')+'px',opacity:1};return setTimeout(function(){return el.css(css).animate(end_css,settings.animation_speed,'linear',function(){this.locked=false;el.trigger('opened').trigger('opened.fndtn.reveal');}.bind(this)).addClass('open');}.bind(this),settings.animation_speed/2);}
//if(animData.fade){css.top=$(window).scrollTop()+el.data('css-top')+'px';var end_css={opacity:1};return setTimeout(function(){return el.css(css).animate(end_css,settings.animation_speed,'linear',function(){this.locked=false;el.trigger('opened').trigger('opened.fndtn.reveal');}.bind(this)).addClass('open');}.bind(this),settings.animation_speed/2);}
return el.css(css).show().css({opacity:1}).addClass('open').trigger('opened').trigger('opened.fndtn.reveal');}
var settings=this.settings;if(getAnimationData(settings.animation).fade){return el.fadeIn(settings.animation_speed/2);}
this.locked=false;return el.show();},to_back:function(el){el.addClass('toback');},to_front:function(el){el.removeClass('toback');},hide:function(el,css){if(css){var settings=el.data(this.attr_name(true)+'-init');settings=settings||this.settings;var animData=getAnimationData(settings.animation);if(!animData.animate){this.locked=false;}
if(animData.pop){var end_css={top:-$(window).scrollTop()-el.data('offset')+'px',opacity:0};return setTimeout(function(){return el.animate(end_css,settings.animation_speed,'linear',function(){this.locked=false;el.css(css).trigger('closed').trigger('closed.fndtn.reveal');}.bind(this)).removeClass('open');}.bind(this),settings.animation_speed/2);}
if(animData.fade){var end_css={opacity:0};return setTimeout(function(){return el.animate(end_css,settings.animation_speed,'linear',function(){this.locked=false;el.css(css).trigger('closed').trigger('closed.fndtn.reveal');}.bind(this)).removeClass('open');}.bind(this),settings.animation_speed/2);}
return el.hide().css(css).removeClass('open').trigger('closed').trigger('closed.fndtn.reveal');}
var settings=this.settings;if(getAnimationData(settings.animation).fade){return el.fadeOut(settings.animation_speed/2);}
return el.hide();},close_video:function(e){var video=$('.flex-video',e.target),iframe=$('iframe',video);if(iframe.length>0){iframe.attr('data-src',iframe[0].src);iframe.attr('src',iframe.attr('src'));video.hide();}},open_video:function(e){var video=$('.flex-video',e.target),iframe=video.find('iframe');if(iframe.length>0){var data_src=iframe.attr('data-src');if(typeof data_src==='string'){iframe[0].src=iframe.attr('data-src');}else{var src=iframe[0].src;iframe[0].src=undefined;iframe[0].src=src;}
video.show();}},data_attr:function(str){if(this.namespace.length>0){return this.namespace+'-'+str;}
return str;},cache_offset:function(modal){var offset=modal.show().height()+parseInt(modal.css('top'),10);modal.hide();return offset;},off:function(){$(this.scope).off('.fndtn.reveal');},reflow:function(){}};function getAnimationData(str){var fade=/fade/i.test(str);var pop=/pop/i.test(str);return{animate:fade||pop,pop:pop,fade:fade};}}(jQuery,window,window.document));;(function($,window,document,undefined){'use strict';Foundation.libs.slider={name:'slider',version:'5.5.1',settings:{start:0,end:100,step:1,precision:null,initial:null,display_selector:'',vertical:false,trigger_input_change:false,on_change:function(){}},cache:{},init:function(scope,method,options){Foundation.inherit(this,'throttle');this.bindings(method,options);this.reflow();},events:function(){var self=this;$(this.scope).off('.slider').on('mousedown.fndtn.slider touchstart.fndtn.slider pointerdown.fndtn.slider','['+self.attr_name()+']:not(.disabled, [disabled]) .range-slider-handle',function(e){if(!self.cache.active){e.preventDefault();self.set_active_slider($(e.target));}}).on('mousemove.fndtn.slider touchmove.fndtn.slider pointermove.fndtn.slider',function(e){if(!!self.cache.active){e.preventDefault();if($.data(self.cache.active[0],'settings').vertical){var scroll_offset=0;if(!e.pageY){scroll_offset=window.scrollY;}
self.calculate_position(self.cache.active,self.get_cursor_position(e,'y')+scroll_offset);}else{self.calculate_position(self.cache.active,self.get_cursor_position(e,'x'));}}}).on('mouseup.fndtn.slider touchend.fndtn.slider pointerup.fndtn.slider',function(e){self.remove_active_slider();}).on('change.fndtn.slider',function(e){self.settings.on_change();});self.S(window).on('resize.fndtn.slider',self.throttle(function(e){self.reflow();},300));},get_cursor_position:function(e,xy){var pageXY='page'+xy.toUpperCase(),clientXY='client'+xy.toUpperCase(),position;if(typeof e[pageXY]!=='undefined'){position=e[pageXY];}else if(typeof e.originalEvent[clientXY]!=='undefined'){position=e.originalEvent[clientXY];}else if(e.originalEvent.touches&&e.originalEvent.touches[0]&&typeof e.originalEvent.touches[0][clientXY]!=='undefined'){position=e.originalEvent.touches[0][clientXY];}else if(e.currentPoint&&typeof e.currentPoint[xy]!=='undefined'){position=e.currentPoint[xy];}
return position;},set_active_slider:function($handle){this.cache.active=$handle;},remove_active_slider:function(){this.cache.active=null;},calculate_position:function($handle,cursor_x){var self=this,settings=$.data($handle[0],'settings'),handle_l=$.data($handle[0],'handle_l'),handle_o=$.data($handle[0],'handle_o'),bar_l=$.data($handle[0],'bar_l'),bar_o=$.data($handle[0],'bar_o');requestAnimationFrame(function(){var pct;if(Foundation.rtl&&!settings.vertical){pct=self.limit_to(((bar_o+bar_l-cursor_x)/bar_l),0,1);}else{pct=self.limit_to(((cursor_x-bar_o)/bar_l),0,1);}
pct=settings.vertical?1-pct:pct;var norm=self.normalized_value(pct,settings.start,settings.end,settings.step,settings.precision);self.set_ui($handle,norm);});},set_ui:function($handle,value){var settings=$.data($handle[0],'settings'),handle_l=$.data($handle[0],'handle_l'),bar_l=$.data($handle[0],'bar_l'),norm_pct=this.normalized_percentage(value,settings.start,settings.end),handle_offset=norm_pct*(bar_l-handle_l)-1,progress_bar_length=norm_pct*100,$handle_parent=$handle.parent(),$hidden_inputs=$handle.parent().children('input[type=hidden]');if(Foundation.rtl&&!settings.vertical){handle_offset=-handle_offset;}
handle_offset=settings.vertical?-handle_offset+bar_l-handle_l+1:handle_offset;this.set_translate($handle,handle_offset,settings.vertical);if(settings.vertical){$handle.siblings('.range-slider-active-segment').css('height',progress_bar_length+'%');}else{$handle.siblings('.range-slider-active-segment').css('width',progress_bar_length+'%');}
$handle_parent.attr(this.attr_name(),value).trigger('change').trigger('change.fndtn.slider');$hidden_inputs.val(value);if(settings.trigger_input_change){$hidden_inputs.trigger('change');}
if(!$handle[0].hasAttribute('aria-valuemin')){$handle.attr({'aria-valuemin':settings.start,'aria-valuemax':settings.end});}
$handle.attr('aria-valuenow',value);if(settings.display_selector!=''){$(settings.display_selector).each(function(){if(this.hasOwnProperty('value')){$(this).val(value);}else{$(this).text(value);}});}},normalized_percentage:function(val,start,end){return Math.min(1,(val-start)/(end-start));},normalized_value:function(val,start,end,step,precision){var range=end-start,point=val*range,mod=(point-(point%step))/step,rem=point%step,round=(rem>=step*0.5?step:0);return((mod*step+round)+start).toFixed(precision);},set_translate:function(ele,offset,vertical){if(vertical){$(ele).css('-webkit-transform','translateY('+offset+'px)').css('-moz-transform','translateY('+offset+'px)').css('-ms-transform','translateY('+offset+'px)').css('-o-transform','translateY('+offset+'px)').css('transform','translateY('+offset+'px)');}else{$(ele).css('-webkit-transform','translateX('+offset+'px)').css('-moz-transform','translateX('+offset+'px)').css('-ms-transform','translateX('+offset+'px)').css('-o-transform','translateX('+offset+'px)').css('transform','translateX('+offset+'px)');}},limit_to:function(val,min,max){return Math.min(Math.max(val,min),max);},initialize_settings:function(handle){var settings=$.extend({},this.settings,this.data_options($(handle).parent())),decimal_places_match_result;if(settings.precision===null){decimal_places_match_result=(''+settings.step).match(/\.([\d]*)/);settings.precision=decimal_places_match_result&&decimal_places_match_result[1]?decimal_places_match_result[1].length:0;}
if(settings.vertical){$.data(handle,'bar_o',$(handle).parent().offset().top);$.data(handle,'bar_l',$(handle).parent().outerHeight());$.data(handle,'handle_o',$(handle).offset().top);$.data(handle,'handle_l',$(handle).outerHeight());}else{$.data(handle,'bar_o',$(handle).parent().offset().left);$.data(handle,'bar_l',$(handle).parent().outerWidth());$.data(handle,'handle_o',$(handle).offset().left);$.data(handle,'handle_l',$(handle).outerWidth());}
$.data(handle,'bar',$(handle).parent());$.data(handle,'settings',settings);},set_initial_position:function($ele){var settings=$.data($ele.children('.range-slider-handle')[0],'settings'),initial=((typeof settings.initial=='number'&&!isNaN(settings.initial))?settings.initial:Math.floor((settings.end-settings.start)*0.5/settings.step)*settings.step+settings.start),$handle=$ele.children('.range-slider-handle');this.set_ui($handle,initial);},set_value:function(value){var self=this;$('['+self.attr_name()+']',this.scope).each(function(){$(this).attr(self.attr_name(),value);});if(!!$(this.scope).attr(self.attr_name())){$(this.scope).attr(self.attr_name(),value);}
self.reflow();},reflow:function(){var self=this;self.S('['+this.attr_name()+']').each(function(){var handle=$(this).children('.range-slider-handle')[0],val=$(this).attr(self.attr_name());self.initialize_settings(handle);if(val){self.set_ui($(handle),parseFloat(val));}else{self.set_initial_position($(this));}});}};}(jQuery,window,window.document));;(function($,window,document,undefined){'use strict';Foundation.libs.tab={name:'tab',version:'5.5.1',settings:{active_class:'active',callback:function(){},deep_linking:false,scroll_to_content:true,is_hover:false},default_tab_hashes:[],init:function(scope,method,options){var self=this,S=this.S;this.bindings(method,options);self.entry_location=window.location.href;this.handle_location_hash_change();S('['+this.attr_name()+'] > .active > a',this.scope).each(function(){self.default_tab_hashes.push(this.hash);});},events:function(){var self=this,S=this.S;var usual_tab_behavior=function(e){var settings=S(this).closest('['+self.attr_name()+']').data(self.attr_name(true)+'-init');if(!settings.is_hover||Modernizr.touch){e.preventDefault();e.stopPropagation();self.toggle_active_tab(S(this).parent());}};S(this.scope).off('.tab').on('focus.fndtn.tab','['+this.attr_name()+'] > * > a',usual_tab_behavior).on('click.fndtn.tab','['+this.attr_name()+'] > * > a',usual_tab_behavior).on('mouseenter.fndtn.tab','['+this.attr_name()+'] > * > a',function(e){var settings=S(this).closest('['+self.attr_name()+']').data(self.attr_name(true)+'-init');if(settings.is_hover){self.toggle_active_tab(S(this).parent());}});S(window).on('hashchange.fndtn.tab',function(e){e.preventDefault();self.handle_location_hash_change();});},handle_location_hash_change:function(){var self=this,S=this.S;S('['+this.attr_name()+']',this.scope).each(function(){var settings=S(this).data(self.attr_name(true)+'-init');if(settings.deep_linking){var hash;if(settings.scroll_to_content){hash=self.scope.location.hash;}else{hash=self.scope.location.hash.replace('fndtn-','');}
if(hash!=''){var hash_element=S(hash);if(hash_element.hasClass('content')&&hash_element.parent().hasClass('tabs-content')){self.toggle_active_tab($('['+self.attr_name()+'] > * > a[href='+hash+']').parent());}else{var hash_tab_container_id=hash_element.closest('.content').attr('id');if(hash_tab_container_id!=undefined){self.toggle_active_tab($('['+self.attr_name()+'] > * > a[href=#'+hash_tab_container_id+']').parent(),hash);}}}else{for(var ind=0;ind<self.default_tab_hashes.length;ind++){self.toggle_active_tab($('['+self.attr_name()+'] > * > a[href='+self.default_tab_hashes[ind]+']').parent());}}}});},toggle_active_tab:function(tab,location_hash){var self=this,S=self.S,tabs=tab.closest('['+this.attr_name()+']'),tab_link=tab.find('a'),anchor=tab.children('a').first(),target_hash='#'+anchor.attr('href').split('#')[1],target=S(target_hash),siblings=tab.siblings(),settings=tabs.data(this.attr_name(true)+'-init'),interpret_keyup_action=function(e){var $original=$(this);var $prev=$(this).parents('li').prev().children('[role="tab"]');var $next=$(this).parents('li').next().children('[role="tab"]');var $target;switch(e.keyCode){case 37:$target=$prev;break;case 39:$target=$next;break;default:$target=false
break;}
if($target.length){$original.attr({'tabindex':'-1','aria-selected':null});$target.attr({'tabindex':'0','aria-selected':true}).focus();}
$('[role="tabpanel"]').attr('aria-hidden','true');$('#'+$(document.activeElement).attr('href').substring(1)).attr('aria-hidden',null);},go_to_hash=function(hash){var is_entry_location=window.location.href===self.entry_location,default_hash=settings.scroll_to_content?self.default_tab_hashes[0]:is_entry_location?window.location.hash:'fndtn-'+self.default_tab_hashes[0].replace('#','')
if(!(is_entry_location&&hash===default_hash)){window.location.hash=hash;}};if(S(this).data(this.data_attr('tab-content'))){target_hash='#'+S(this).data(this.data_attr('tab-content')).split('#')[1];target=S(target_hash);}
if(settings.deep_linking){if(settings.scroll_to_content){go_to_hash(location_hash||target_hash);if(location_hash==undefined||location_hash==target_hash){tab.parent()[0].scrollIntoView();}else{S(target_hash)[0].scrollIntoView();}}else{if(location_hash!=undefined){go_to_hash('fndtn-'+location_hash.replace('#',''));}else{go_to_hash('fndtn-'+target_hash.replace('#',''));}}}
tab.addClass(settings.active_class).triggerHandler('opened');tab_link.attr({'aria-selected':'true',tabindex:0});siblings.removeClass(settings.active_class)
siblings.find('a').attr({'aria-selected':'false',tabindex:-1});target.siblings().removeClass(settings.active_class).attr({'aria-hidden':'true',tabindex:-1});target.addClass(settings.active_class).attr('aria-hidden','false').removeAttr('tabindex');settings.callback(tab);target.triggerHandler('toggled',[tab]);tabs.triggerHandler('toggled',[target]);tab_link.off('keydown').on('keydown',interpret_keyup_action);},data_attr:function(str){if(this.namespace.length>0){return this.namespace+'-'+str;}
return str;},off:function(){},reflow:function(){}};}(jQuery,window,window.document));
// foundation.min.js ENDS

// slick.min.js STARTS
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.4.1
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */

!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,g,h,e=this;if(e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(a,b){return'<button type="button" data-role="none">'+(b+1)+"</button>"},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rtl:!1,slide:"",slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,variableWidth:!1,vertical:!1,waitForAnimate:!0},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.hidden="hidden",e.paused=!1,e.positionProp=null,e.respondTo=null,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,f,d),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,g=e.options.responsive||null,g&&g.length>-1){e.respondTo=e.options.respondTo||"window";for(h in g)g.hasOwnProperty(h)&&(e.breakpoints.push(g[h].breakpoint),e.breakpointSettings[g[h].breakpoint]=g[h].settings);e.breakpoints.sort(function(a,b){return e.options.mobileFirst===!0?a-b:b-a})}"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.msHidden?(e.hidden="msHidden",e.visibilityChange="msvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.init(),e.checkResponsive(!0)}var b=0;return c}(),b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),d[e.animType]=e.options.vertical===!1?"translate3d("+b+"px, 0px, 0px)":"translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.asNavFor=function(b){var c=this,d=null!==c.options.asNavFor?a(c.options.asNavFor).slick("getSlick"):null;null!==d&&d.slideHandler(b,!0)},b.prototype.applyTransition=function(a){var b=this,c={};c[b.transitionType]=b.options.fade===!1?b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:"opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer),a.slideCount>a.options.slidesToShow&&a.paused!==!0&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this;a.options.infinite===!1?1===a.direction?(a.currentSlide+1===a.slideCount-1&&(a.direction=0),a.slideHandler(a.currentSlide+a.options.slidesToScroll)):(0===a.currentSlide-1&&(a.direction=1),a.slideHandler(a.currentSlide-a.options.slidesToScroll)):a.slideHandler(a.currentSlide+a.options.slidesToScroll)},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow=a(b.options.prevArrow),b.$nextArrow=a(b.options.nextArrow),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.appendTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled"))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(d='<ul class="'+b.options.dotsClass+'">',c=0;c<=b.getDotCount();c+=1)d+="<li>"+b.options.customPaging.call(this,b,c)+"</li>";d+="</ul>",b.$dots=a(d).appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),b.$slidesCache=b.$slides,b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.options.accessibility===!0&&b.$list.prop("tabIndex",0),b.setSlideClasses("number"==typeof this.currentSlide?this.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.checkResponsive=function(b){var d,e,f,c=this,g=c.$slider.width(),h=window.innerWidth||a(window).width();if("window"===c.respondTo?f=h:"slider"===c.respondTo?f=g:"min"===c.respondTo&&(f=Math.min(h,g)),c.originalSettings.responsive&&c.originalSettings.responsive.length>-1&&null!==c.originalSettings.responsive){e=null;for(d in c.breakpoints)c.breakpoints.hasOwnProperty(d)&&(c.originalSettings.mobileFirst===!1?f<c.breakpoints[d]&&(e=c.breakpoints[d]):f>c.breakpoints[d]&&(e=c.breakpoints[d]));null!==e?null!==c.activeBreakpoint?e!==c.activeBreakpoint&&(c.activeBreakpoint=e,"unslick"===c.breakpointSettings[e]?c.unslick():(c.options=a.extend({},c.originalSettings,c.breakpointSettings[e]),b===!0&&(c.currentSlide=c.options.initialSlide),c.refresh())):(c.activeBreakpoint=e,"unslick"===c.breakpointSettings[e]?c.unslick():(c.options=a.extend({},c.originalSettings,c.breakpointSettings[e]),b===!0&&(c.currentSlide=c.options.initialSlide),c.refresh())):null!==c.activeBreakpoint&&(c.activeBreakpoint=null,c.options=c.originalSettings,b===!0&&(c.currentSlide=c.options.initialSlide),c.refresh())}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.target);switch(e.is("a")&&b.preventDefault(),h=0!==d.slideCount%d.options.slidesToScroll,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||a(b.target).parent().index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c);break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(){var b=this;b.autoPlayClear(),b.touchObject={},a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&"object"!=typeof b.options.prevArrow&&b.$prevArrow.remove(),b.$nextArrow&&"object"!=typeof b.options.nextArrow&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-center slick-visible").removeAttr("data-slick-index").css({position:"",left:"",top:"",zIndex:"",opacity:"",width:""}),b.$slider.removeClass("slick-slider"),b.$slider.removeClass("slick-initialized"),b.$list.off(".slick"),a(window).off(".slick-"+b.instanceUid),a(document).off(".slick-"+b.instanceUid),b.$slider.html(b.$slides)},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:1e3}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:1e3}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)d=Math.ceil(a.slideCount/a.options.slidesToScroll);else if(a.options.centerMode===!0)d=a.slideCount;else for(;b<a.slideCount;)++d,b=c+a.options.slidesToShow,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=-1*b.slideWidth*b.options.slidesToShow,e=-1*d*b.options.slidesToShow),0!==b.slideCount%b.options.slidesToScroll&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=-1*(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth,e=-1*(b.options.slidesToShow-(a-b.slideCount))*d):(b.slideOffset=-1*b.slideCount%b.options.slidesToScroll*b.slideWidth,e=-1*b.slideCount%b.options.slidesToScroll*d))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?-1*a*b.slideWidth+b.slideOffset:-1*a*d+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?(e=a.slideCount-a.options.slidesToShow+1,a.options.centerMode===!0&&(e=a.slideCount)):(b=-1*a.slideCount,c=-1*a.slideCount,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(){var b=this;a(b.$slider).hasClass("slick-initialized")||(a(b.$slider).addClass("slick-initialized"),b.buildOut(),b.setProps(),b.startLoad(),b.loadSlider(),b.initializeEvents(),b.updateArrows(),b.updateDots()),b.$slider.trigger("init",[b])},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&b.options.autoplay===!0&&a("li",b.$dots).on("mouseenter.slick",function(){b.paused=!0,b.autoPlayClear()}).on("mouseleave.slick",function(){b.paused=!1,b.autoPlay()})},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),b.options.autoplay===!0&&(a(document).on(b.visibilityChange,function(){b.visibility()}),b.options.pauseOnHover===!0&&(b.$list.on("mouseenter.slick",function(){b.paused=!0,b.autoPlayClear()}),b.$list.on("mouseleave.slick",function(){b.paused=!1,b.autoPlay()}))),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,function(){b.checkResponsive(),b.setPosition()}),a(window).on("resize.slick.slick-"+b.instanceUid,function(){a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.setPosition()},50))}),a("*[draggable!=true]",b.$slideTrack).on("dragstart",function(a){a.preventDefault()}),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show(),a.options.autoplay===!0&&a.autoPlay()},b.prototype.keyHandler=function(a){var b=this;37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:"next"}})},b.prototype.lazyLoad=function(){function g(b){a("img[data-lazy]",b).each(function(){var b=a(this),c=a(this).attr("data-lazy");b.load(function(){b.animate({opacity:1},200)}).css({opacity:0}).attr("src",c).removeAttr("data-lazy").removeClass("slick-loading")})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=e+b.options.slidesToShow,b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.paused=!1,a.autoPlay()},b.prototype.postSlide=function(a){var b=this;b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay===!0&&b.paused===!1&&b.autoPlay()},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.progressiveLazyLoad=function(){var c,d,b=this;c=a("img[data-lazy]",b.$slider).length,c>0&&(d=a("img[data-lazy]",b.$slider).first(),d.attr("src",d.attr("data-lazy")).removeClass("slick-loading").load(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad()}).error(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad()}))},b.prototype.refresh=function(){var b=this,c=b.currentSlide;b.destroy(),a.extend(b,b.initials),b.init(),b.changeSlide({data:{message:"index",index:c}},!0)},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses(0),b.setPosition(),b.$slider.trigger("reInit",[b])},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,d.reinit(),void 0)},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;if(a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1)a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length));else if(a.options.variableWidth===!0){var b=0;a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.children(".slick-slide").each(function(){b+=a.listWidth}),a.$slideTrack.width(Math.ceil(b)+1)}else a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length));var c=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-c)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=-1*b.slideWidth*d,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:800,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:800,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:900,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(a,b,c){var d=this;d.options[a]=b,c===!0&&(d.unload(),d.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;b.$slider.find(".slick-slide").removeClass("slick-active").removeClass("slick-center"),d=b.$slider.find(".slick-slide"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active"):(e=b.options.slidesToShow+a,d.slice(e-c+1,e+c+2).addClass("slick-active")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active"):d.length<=b.options.slidesToShow?d.addClass("slick-active"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.selectHandler=function(b){var c=this,d=parseInt(a(b.target).parents(".slick-slide").attr("data-slick-index"));return d||(d=0),c.slideCount<=c.options.slidesToShow?(c.$slider.find(".slick-slide").removeClass("slick-active"),c.$slides.eq(d).addClass("slick-active"),c.options.centerMode===!0&&(c.$slider.find(".slick-slide").removeClass("slick-center"),c.$slides.eq(d).addClass("slick-center")),c.asNavFor(d),void 0):(c.slideHandler(d),void 0)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d)),void 0):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d)),void 0):(i.options.autoplay===!0&&clearInterval(i.autoPlayTimer),e=0>d?0!==i.slideCount%i.options.slidesToScroll?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?0!==i.slideCount%i.options.slidesToScroll?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?i.fadeSlide(e,function(){i.postSlide(e)}):i.postSlide(e),i.animateHeight(),void 0):(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e),void 0)))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":"vertical"},b.prototype.swipeEnd=function(){var c,b=this;if(b.dragging=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe)switch(b.swipeDirection()){case"left":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.slideHandler(c),b.currentDirection=0,b.touchObject={},b.$slider.trigger("swipe",[b,"left"]);break;case"right":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.slideHandler(c),b.currentDirection=1,b.touchObject={},b.$slider.trigger("swipe",[b,"right"])}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.swipeLeft=b.options.vertical===!1?d+f*g:d+f*(b.$list.height()/b.listWidth)*g,b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):(b.setCSS(b.swipeLeft),void 0)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return 1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,b.dragging=!0,void 0)},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&"object"!=typeof b.options.prevArrow&&b.$prevArrow.remove(),b.$nextArrow&&"object"!=typeof b.options.nextArrow&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible").css("width","")},b.prototype.unslick=function(){var a=this;a.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.options.infinite!==!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.removeClass("slick-disabled"),a.$nextArrow.removeClass("slick-disabled"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled"),a.$nextArrow.removeClass("slick-disabled")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled"),a.$prevArrow.removeClass("slick-disabled")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled"),a.$prevArrow.removeClass("slick-disabled")))
},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active"))},b.prototype.visibility=function(){var a=this;document[a.hidden]?(a.paused=!0,a.autoPlayClear()):(a.paused=!1,a.autoPlay())},a.fn.slick=function(){var g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length,f=0;for(f;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a},a(function(){a("[data-slick]").slick()})});
// slick.min.js ENDS

// jquery.lazyload.js STARTS
/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.3
 *
 */

(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : true,
            appear          : null,
            load            : null,
            placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };

        function update() {
            var counter = 0;

            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                        /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                        /* if we found an image we'll load, reset the counter */
                        counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function() {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* If no src attribute given use data:uri. */
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function() {

                            var original = $self.attr("data-" + settings.data_attribute);
                            $self.hide();
                            if ($self.is("img")) {
                                $self.attr("src", original);
                            } else {
                                $self.css("background-image", "url('" + original + "')");
                            }
                            $self[settings.effect](settings.effect_speed);

                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.attr("data-" + settings.data_attribute));
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function() {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function() {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.leftofbegin = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);
//jquery.lazyload.js ENDS


