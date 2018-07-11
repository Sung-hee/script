/*
 Highcharts JS v6.1.1 (2018-06-27)
 Drag-panes module

 (c) 2010-2017 Highsoft AS
 Author: Kacper Madej

 License: www.highcharts.com/license
*/
(function(f) {
    "object" === typeof module && module.exports ? module.exports = f : f(Highcharts)
})(function(f) {
    (function(b) {
        var f = b.hasTouch,
            x = b.merge,
            u = b.wrap,
            m = b.each,
            y = b.isNumber,
            e = b.addEvent,
            v = b.relativeLength,
            z = b.objectEach,
            n = b.Axis,
            w = b.Pointer;
        x(!0, n.prototype.defaultYAxisOptions, {
            minLength: "10%",
            maxLength: "100%",
            resize: {
                controlledAxis: {
                    next: [],
                    prev: []
                },
                enabled: !1,
                cursor: "ns-resize",
                lineColor: "#cccccc",
                lineDashStyle: "Solid",
                lineWidth: 4,
                x: 0,
                y: 0
            }
        });
        b.AxisResizer = function(a) {
            this.init(a)
        };
        b.AxisResizer.prototype = {
            init: function(a, c) {
                this.axis = a;
                this.options = a.options.resize;
                this.render();
                c || this.addMouseEvents()
            },
            render: function() {
                var a = this.axis,
                    c = a.chart,
                    d = this.options,
                    b = d.x,
                    e = d.y,
                    k = Math.min(Math.max(a.top + a.height + e, c.plotTop), c.plotTop + c.plotHeight),
                    l;
                l = {
                    cursor: d.cursor,
                    stroke: d.lineColor,
                    "stroke-width": d.lineWidth,
                    dashstyle: d.lineDashStyle
                };
                this.lastPos = k - e;
                this.controlLine || (this.controlLine = c.renderer.path().addClass("highcharts-axis-resizer"));
                this.controlLine.add(a.axisGroup);
                l.d = c.renderer.crispLine(["M",
                    a.left + b, k, "L", a.left + a.width + b, k
                ], d.lineWidth);
                this.controlLine.attr(l)
            },
            addMouseEvents: function() {
                var a = this,
                    c = a.controlLine.element,
                    d = a.axis.chart.container,
                    b = [],
                    t, k, l;
                a.mouseMoveHandler = t = function(c) {
                    a.onMouseMove(c)
                };
                a.mouseUpHandler = k = function(c) {
                    a.onMouseUp(c)
                };
                a.mouseDownHandler = l = function(c) {
                    a.onMouseDown(c)
                };
                b.push(e(d, "mousemove", t), e(d.ownerDocument, "mouseup", k), e(c, "mousedown", l));
                f && b.push(e(d, "touchmove", t), e(d.ownerDocument, "touchend", k), e(c, "touchstart", l));
                a.eventsToUnbind = b
            },
            onMouseMove: function(a) {
                a.touches &&
                    0 === a.touches[0].pageX || !this.grabbed || (this.hasDragged = !0, this.updateAxes(this.axis.chart.pointer.normalize(a).chartY - this.options.y))
            },
            onMouseUp: function(a) {
                this.hasDragged && this.updateAxes(this.axis.chart.pointer.normalize(a).chartY - this.options.y);
                this.grabbed = this.hasDragged = this.axis.chart.activeResizer = null
            },
            onMouseDown: function() {
                this.axis.chart.pointer.reset(!1, 0);
                this.grabbed = this.axis.chart.activeResizer = !0
            },
            updateAxes: function(a) {
                var c = this,
                    d = c.axis.chart,
                    e = c.options.controlledAxis,
                    f =
                    0 === e.next.length ? [b.inArray(c.axis, d.yAxis) + 1] : e.next,
                    e = [c.axis].concat(e.prev),
                    k = [],
                    l = !1,
                    n = d.plotTop,
                    q = d.plotHeight,
                    r = n + q,
                    p;
                a = Math.max(Math.min(a, r), n);
                p = a - c.lastPos;
                1 > p * p || (m([e, f], function(b, e) {
                    m(b, function(b, h) {
                        var g = (b = y(b) ? d.yAxis[b] : e || h ? d.get(b) : b) && b.options,
                            f, m;
                        g && "navigator-y-axis" !== g.id && (h = b.top, m = Math.round(v(g.minLength, q)), f = Math.round(v(g.maxLength, q)), e ? (p = a - c.lastPos, g = Math.round(Math.min(Math.max(b.len - p, m), f)), h = b.top + p, h + g > r && (f = r - g - h, a += f, h += f), h < n && (h = n, h + g > r && (g = q)), g ===
                            m && (l = !0), k.push({
                                axis: b,
                                options: {
                                    top: Math.round(h),
                                    height: g
                                }
                            })) : (g = Math.round(Math.min(Math.max(a - h, m), f)), g === f && (l = !0), a = h + g, k.push({
                            axis: b,
                            options: {
                                height: g
                            }
                        })))
                    })
                }), l || (m(k, function(a) {
                    a.axis.update(a.options, !1)
                }), d.redraw(!1)))
            },
            destroy: function() {
                var a = this;
                delete a.axis.resizer;
                this.eventsToUnbind && m(this.eventsToUnbind, function(a) {
                    a()
                });
                a.controlLine.destroy();
                z(a, function(b, d) {
                    a[d] = null
                })
            }
        };
        n.prototype.keepProps.push("resizer");
        e(n, "afterRender", function() {
            var a = this.resizer,
                c = this.options.resize;
            c && (c = !1 !== c.enabled, a ? c ? a.init(this, !0) : a.destroy() : c && (this.resizer = new b.AxisResizer(this)))
        });
        e(n, "destroy", function(a) {
            !a.keepEvents && this.resizer && this.resizer.destroy()
        });
        u(w.prototype, "runPointActions", function(a) {
            this.chart.activeResizer || a.apply(this, Array.prototype.slice.call(arguments, 1))
        });
        u(w.prototype, "drag", function(a) {
            this.chart.activeResizer || a.apply(this, Array.prototype.slice.call(arguments, 1))
        })
    })(f)
});