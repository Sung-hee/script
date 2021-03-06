/*
 Highstock JS v6.0.6 (2018-02-05)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(T, L) {
    "object" === typeof module && module.exports ? module.exports = T.document ? L(T) : L : T.Highcharts = L(T)
})("undefined" !== typeof window ? window : this, function(T) {
    var L = function() {
        var a = "undefined" === typeof T ? window : T,
            C = a.document,
            G = a.navigator && a.navigator.userAgent || "",
            D = C && C.createElementNS && !! C.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            q = /(edge|msie|trident)/i.test(G) && !a.opera,
            n = -1 !== G.indexOf("Firefox"),
            h = -1 !== G.indexOf("Chrome"),
            x = n && 4 > parseInt(G.split("Firefox/")[1],
                10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
            product: "Highstock",
            version: "6.0.6",
            deg2rad: 2 * Math.PI / 360,
            doc: C,
            hasBidiBug: x,
            hasTouch: C && void 0 !== C.documentElement.ontouchstart,
            isMS: q,
            isWebKit: -1 !== G.indexOf("AppleWebKit"),
            isFirefox: n,
            isChrome: h,
            isSafari: !h && -1 !== G.indexOf("Safari"),
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(G),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: D,
            win: a,
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function() {},
            charts: []
        }
    }();
    (function(a) {
        a.timers = [];
        var C = a.charts,
            G = a.doc,
            D = a.win;
        a.error = function(q, n) {
            q = a.isNumber(q) ? "Highcharts error #" + q + ": www.highcharts.com/errors/" + q : q;
            if (n) throw Error(q);
            D.console && console.log(q)
        };
        a.Fx = function(a, n, h) {
            this.options = n;
            this.elem = a;
            this.prop = h
        };
        a.Fx.prototype = {
            dSetter: function() {
                var a = this.paths[0],
                    n = this.paths[1],
                    h = [],
                    x = this.now,
                    r = a.length,
                    u;
                if (1 === x) h = this.toD;
                else if (r === n.length && 1 > x)
                    for (; r--;) u = parseFloat(a[r]), h[r] = isNaN(u) ? n[r] : x * parseFloat(n[r] - u) + u;
                else h = n;
                this.elem.attr("d",
                    h, null, !0)
            },
            update: function() {
                var a = this.elem,
                    n = this.prop,
                    h = this.now,
                    x = this.options.step;
                if (this[n + "Setter"]) this[n + "Setter"]();
                else a.attr ? a.element && a.attr(n, h, null, !0) : a.style[n] = h + this.unit;
                x && x.call(a, h, this)
            },
            run: function(q, n, h) {
                var x = this,
                    r = x.options,
                    u = function(a) {
                        return u.stopped ? !1 : x.step(a)
                    }, A = D.requestAnimationFrame || function(a) {
                        setTimeout(a, 13)
                    }, f = function() {
                        for (var c = 0; c < a.timers.length; c++) a.timers[c]() || a.timers.splice(c--, 1);
                        a.timers.length && A(f)
                    };
                q === n ? (delete r.curAnim[this.prop],
                    r.complete && 0 === a.keys(r.curAnim).length && r.complete.call(this.elem)) : (this.startTime = +new Date, this.start = q, this.end = n, this.unit = h, this.now = this.start, this.pos = 0, u.elem = this.elem, u.prop = this.prop, u() && 1 === a.timers.push(u) && A(f))
            },
            step: function(q) {
                var n = +new Date,
                    h, x = this.options,
                    r = this.elem,
                    u = x.complete,
                    A = x.duration,
                    f = x.curAnim;
                r.attr && !r.element ? q = !1 : q || n >= A + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), h = f[this.prop] = !0, a.objectEach(f, function(a) {
                    !0 !== a && (h = !1)
                }), h && u && u.call(r), q = !1) : (this.pos = x.easing((n - this.startTime) / A), this.now = this.start + (this.end - this.start) * this.pos, this.update(), q = !0);
                return q
            },
            initPath: function(q, n, h) {
                function x(a) {
                    var b, g;
                    for (v = a.length; v--;) b = "M" === a[v] || "L" === a[v], g = /[a-zA-Z]/.test(a[v + 3]), b && g && a.splice(v + 1, 0, a[v + 1], a[v + 2], a[v + 1], a[v + 2])
                }

                function r(a, c) {
                    for (; a.length < g;) {
                        a[0] = c[g - a.length];
                        var m = a.slice(0, b);
                        [].splice.apply(a, [0, 0].concat(m));
                        e && (m = a.slice(a.length - b), [].splice.apply(a, [a.length, 0].concat(m)), v--)
                    }
                    a[0] = "M"
                }

                function u(a, c) {
                    for (var m =
                        (g - a.length) / b; 0 < m && m--;) p = a.slice().splice(a.length / w - b, b * w), p[0] = c[g - b - m * b], l && (p[b - 6] = p[b - 2], p[b - 5] = p[b - 1]), [].splice.apply(a, [a.length / w, 0].concat(p)), e && m--
                }
                n = n || "";
                var A, f = q.startX,
                    c = q.endX,
                    l = -1 < n.indexOf("C"),
                    b = l ? 7 : 3,
                    g, p, v;
                n = n.split(" ");
                h = h.slice();
                var e = q.isArea,
                    w = e ? 2 : 1,
                    E;
                l && (x(n), x(h));
                if (f && c) {
                    for (v = 0; v < f.length; v++)
                        if (f[v] === c[0]) {
                            A = v;
                            break
                        } else if (f[0] === c[c.length - f.length + v]) {
                        A = v;
                        E = !0;
                        break
                    }
                    void 0 === A && (n = [])
                }
                n.length && a.isNumber(A) && (g = h.length + A * w * b, E ? (r(n, h), u(h, n)) : (r(h, n), u(n,
                    h)));
                return [n, h]
            }
        };
        a.Fx.prototype.fillSetter = a.Fx.prototype.strokeSetter = function() {
            this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0)
        };
        a.merge = function() {
            var q, n = arguments,
                h, x = {}, r = function(h, q) {
                    "object" !== typeof h && (h = {});
                    a.objectEach(q, function(f, c) {
                        !a.isObject(f, !0) || a.isClass(f) || a.isDOMElement(f) ? h[c] = q[c] : h[c] = r(h[c] || {}, f)
                    });
                    return h
                };
            !0 === n[0] && (x = n[1], n = Array.prototype.slice.call(n, 2));
            h = n.length;
            for (q = 0; q < h; q++) x = r(x, n[q]);
            return x
        };
        a.pInt = function(a,
            n) {
            return parseInt(a, n || 10)
        };
        a.isString = function(a) {
            return "string" === typeof a
        };
        a.isArray = function(a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function(q, n) {
            return !!q && "object" === typeof q && (!n || !a.isArray(q))
        };
        a.isDOMElement = function(q) {
            return a.isObject(q) && "number" === typeof q.nodeType
        };
        a.isClass = function(q) {
            var n = q && q.constructor;
            return !(!a.isObject(q, !0) || a.isDOMElement(q) || !n || !n.name || "Object" === n.name)
        };
        a.isNumber = function(a) {
            return "number" ===
                typeof a && !isNaN(a) && Infinity > a && -Infinity < a
        };
        a.erase = function(a, n) {
            for (var h = a.length; h--;)
                if (a[h] === n) {
                    a.splice(h, 1);
                    break
                }
        };
        a.defined = function(a) {
            return void 0 !== a && null !== a
        };
        a.attr = function(q, n, h) {
            var x;
            a.isString(n) ? a.defined(h) ? q.setAttribute(n, h) : q && q.getAttribute && (x = q.getAttribute(n)) : a.defined(n) && a.isObject(n) && a.objectEach(n, function(a, h) {
                q.setAttribute(h, a)
            });
            return x
        };
        a.splat = function(q) {
            return a.isArray(q) ? q : [q]
        };
        a.syncTimeout = function(a, n, h) {
            if (n) return setTimeout(a, n, h);
            a.call(0,
                h)
        };
        a.extend = function(a, n) {
            var h;
            a || (a = {});
            for (h in n) a[h] = n[h];
            return a
        };
        a.pick = function() {
            var a = arguments,
                n, h, x = a.length;
            for (n = 0; n < x; n++)
                if (h = a[n], void 0 !== h && null !== h) return h
        };
        a.css = function(q, n) {
            a.isMS && !a.svg && n && void 0 !== n.opacity && (n.filter = "alpha(opacity\x3d" + 100 * n.opacity + ")");
            a.extend(q.style, n)
        };
        a.createElement = function(q, n, h, x, r) {
            q = G.createElement(q);
            var u = a.css;
            n && a.extend(q, n);
            r && u(q, {
                padding: 0,
                border: "none",
                margin: 0
            });
            h && u(q, h);
            x && x.appendChild(q);
            return q
        };
        a.extendClass = function(q,
            n) {
            var h = function() {};
            h.prototype = new q;
            a.extend(h.prototype, n);
            return h
        };
        a.pad = function(a, n, h) {
            return Array((n || 2) + 1 - String(a).length).join(h || 0) + a
        };
        a.relativeLength = function(a, n, h) {
            return /%$/.test(a) ? n * parseFloat(a) / 100 + (h || 0) : parseFloat(a)
        };
        a.wrap = function(a, n, h) {
            var x = a[n];
            a[n] = function() {
                var a = Array.prototype.slice.call(arguments),
                    u = arguments,
                    A = this;
                A.proceed = function() {
                    x.apply(A, arguments.length ? arguments : u)
                };
                a.unshift(x);
                a = h.apply(this, a);
                A.proceed = null;
                return a
            }
        };
        a.formatSingle = function(q,
            n, h) {
            var x = /\.([0-9])/,
                r = a.defaultOptions.lang;
            /f$/.test(q) ? (h = (h = q.match(x)) ? h[1] : -1, null !== n && (n = a.numberFormat(n, h, r.decimalPoint, -1 < q.indexOf(",") ? r.thousandsSep : ""))) : n = (h || a.time).dateFormat(q, n);
            return n
        };
        a.format = function(q, n, h) {
            for (var x = "{", r = !1, u, A, f, c, l = [], b; q;) {
                x = q.indexOf(x);
                if (-1 === x) break;
                u = q.slice(0, x);
                if (r) {
                    u = u.split(":");
                    A = u.shift().split(".");
                    c = A.length;
                    b = n;
                    for (f = 0; f < c; f++) b && (b = b[A[f]]);
                    u.length && (b = a.formatSingle(u.join(":"), b, h));
                    l.push(b)
                } else l.push(u);
                q = q.slice(x + 1);
                x = (r = !r) ? "}" : "{"
            }
            l.push(q);
            return l.join("")
        };
        a.getMagnitude = function(a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function(q, n, h, x, r) {
            var u, A = q;
            h = a.pick(h, 1);
            u = q / h;
            n || (n = r ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === x && (1 === h ? n = a.grep(n, function(a) {
                return 0 === a % 1
            }) : .1 >= h && (n = [1 / h])));
            for (x = 0; x < n.length && !(A = n[x], r && A * h >= q || !r && u <= (n[x] + (n[x + 1] || n[x])) / 2); x++);
            return A = a.correctFloat(A * h, -Math.round(Math.log(.001) / Math.LN10))
        };
        a.stableSort = function(a, n) {
            var h =
                a.length,
                x, r;
            for (r = 0; r < h; r++) a[r].safeI = r;
            a.sort(function(a, r) {
                x = n(a, r);
                return 0 === x ? a.safeI - r.safeI : x
            });
            for (r = 0; r < h; r++) delete a[r].safeI
        };
        a.arrayMin = function(a) {
            for (var n = a.length, h = a[0]; n--;) a[n] < h && (h = a[n]);
            return h
        };
        a.arrayMax = function(a) {
            for (var n = a.length, h = a[0]; n--;) a[n] > h && (h = a[n]);
            return h
        };
        a.destroyObjectProperties = function(q, n) {
            a.objectEach(q, function(a, x) {
                a && a !== n && a.destroy && a.destroy();
                delete q[x]
            })
        };
        a.discardElement = function(q) {
            var n = a.garbageBin;
            n || (n = a.createElement("div"));
            q && n.appendChild(q);
            n.innerHTML = ""
        };
        a.correctFloat = function(a, n) {
            return parseFloat(a.toPrecision(n || 14))
        };
        a.setAnimation = function(q, n) {
            n.renderer.globalAnimation = a.pick(q, n.options.chart.animation, !0)
        };
        a.animObject = function(q) {
            return a.isObject(q) ? a.merge(q) : {
                duration: q ? 500 : 0
            }
        };
        a.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        };
        a.numberFormat = function(q, n, h, x) {
            q = +q || 0;
            n = +n;
            var r = a.defaultOptions.lang,
                u = (q.toString().split(".")[1] || "").split("e")[0].length,
                A,
                f, c = q.toString().split("e"); - 1 === n ? n = Math.min(u, 20) : a.isNumber(n) ? n && c[1] && 0 > c[1] && (A = n + +c[1], 0 <= A ? (c[0] = (+c[0]).toExponential(A).split("e")[0], n = A) : (c[0] = c[0].split(".")[0] || 0, q = 20 > n ? (c[0] * Math.pow(10, c[1])).toFixed(n) : 0, c[1] = 0)) : n = 2;
            f = (Math.abs(c[1] ? c[0] : q) + Math.pow(10, -Math.max(n, u) - 1)).toFixed(n);
            u = String(a.pInt(f));
            A = 3 < u.length ? u.length % 3 : 0;
            h = a.pick(h, r.decimalPoint);
            x = a.pick(x, r.thousandsSep);
            q = (0 > q ? "-" : "") + (A ? u.substr(0, A) + x : "");
            q += u.substr(A).replace(/(\d{3})(?=\d)/g, "$1" + x);
            n && (q += h + f.slice(-n));
            c[1] && 0 !== +q && (q += "e" + c[1]);
            return q
        };
        Math.easeInOutSine = function(a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        };
        a.getStyle = function(q, n, h) {
            if ("width" === n) return Math.min(q.offsetWidth, q.scrollWidth) - a.getStyle(q, "padding-left") - a.getStyle(q, "padding-right");
            if ("height" === n) return Math.min(q.offsetHeight, q.scrollHeight) - a.getStyle(q, "padding-top") - a.getStyle(q, "padding-bottom");
            D.getComputedStyle || a.error(27, !0);
            if (q = D.getComputedStyle(q, void 0)) q = q.getPropertyValue(n), a.pick(h, "opacity" !== n) && (q = a.pInt(q));
            return q
        };
        a.inArray = function(q, n) {
            return (a.indexOfPolyfill || Array.prototype.indexOf).call(n, q)
        };
        a.grep = function(q, n) {
            return (a.filterPolyfill || Array.prototype.filter).call(q, n)
        };
        a.find = Array.prototype.find ? function(a, n) {
            return a.find(n)
        } : function(a, n) {
            var h, x = a.length;
            for (h = 0; h < x; h++)
                if (n(a[h], h)) return a[h]
        };
        a.map = function(a, n) {
            for (var h = [], x = 0, r = a.length; x < r; x++) h[x] = n.call(a[x], a[x], x, a);
            return h
        };
        a.keys = function(q) {
            return (a.keysPolyfill || Object.keys).call(void 0, q)
        };
        a.reduce = function(q, n, h) {
            return (a.reducePolyfill ||
                Array.prototype.reduce).call(q, n, h)
        };
        a.offset = function(a) {
            var n = G.documentElement;
            a = a.parentElement ? a.getBoundingClientRect() : {
                top: 0,
                left: 0
            };
            return {
                top: a.top + (D.pageYOffset || n.scrollTop) - (n.clientTop || 0),
                left: a.left + (D.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)
            }
        };
        a.stop = function(q, n) {
            for (var h = a.timers.length; h--;) a.timers[h].elem !== q || n && n !== a.timers[h].prop || (a.timers[h].stopped = !0)
        };
        a.each = function(q, n, h) {
            return (a.forEachPolyfill || Array.prototype.forEach).call(q, n, h)
        };
        a.objectEach = function(a,
            n, h) {
            for (var x in a) a.hasOwnProperty(x) && n.call(h, a[x], x, a)
        };
        a.addEvent = function(q, n, h) {
            var x, r, u = q.addEventListener || a.addEventListenerPolyfill;
            q.hcEvents && !Object.prototype.hasOwnProperty.call(q, "hcEvents") && (r = {}, a.objectEach(q.hcEvents, function(a, f) {
                r[f] = a.slice(0)
            }), q.hcEvents = r);
            x = q.hcEvents = q.hcEvents || {};
            u && u.call(q, n, h, !1);
            x[n] || (x[n] = []);
            x[n].push(h);
            return function() {
                a.removeEvent(q, n, h)
            }
        };
        a.removeEvent = function(q, n, h) {
            function x(c, f) {
                var b = q.removeEventListener || a.removeEventListenerPolyfill;
                b && b.call(q, c, f, !1)
            }

            function r() {
                var c, f;
                q.nodeName && (n ? (c = {}, c[n] = !0) : c = A, a.objectEach(c, function(a, g) {
                    if (A[g])
                        for (f = A[g].length; f--;) x(g, A[g][f])
                }))
            }
            var u, A = q.hcEvents,
                f;
            A && (n ? (u = A[n] || [], h ? (f = a.inArray(h, u), -1 < f && (u.splice(f, 1), A[n] = u), x(n, h)) : (r(), A[n] = [])) : (r(), q.hcEvents = {}))
        };
        a.fireEvent = function(q, n, h, x) {
            var r;
            r = q.hcEvents;
            var u, A;
            h = h || {};
            if (G.createEvent && (q.dispatchEvent || q.fireEvent)) r = G.createEvent("Events"), r.initEvent(n, !0, !0), a.extend(r, h), q.dispatchEvent ? q.dispatchEvent(r) : q.fireEvent(n,
                r);
            else if (r)
                for (r = r[n] || [], u = r.length, h.target || a.extend(h, {
                    preventDefault: function() {
                        h.defaultPrevented = !0
                    },
                    target: q,
                    type: n
                }), n = 0; n < u; n++)(A = r[n]) && !1 === A.call(q, h) && h.preventDefault();
            x && !h.defaultPrevented && x(h)
        };
        a.animate = function(q, n, h) {
            var x, r = "",
                u, A, f;
            a.isObject(h) || (f = arguments, h = {
                duration: f[2],
                easing: f[3],
                complete: f[4]
            });
            a.isNumber(h.duration) || (h.duration = 400);
            h.easing = "function" === typeof h.easing ? h.easing : Math[h.easing] || Math.easeInOutSine;
            h.curAnim = a.merge(n);
            a.objectEach(n, function(c,
                f) {
                a.stop(q, f);
                A = new a.Fx(q, h, f);
                u = null;
                "d" === f ? (A.paths = A.initPath(q, q.d, n.d), A.toD = n.d, x = 0, u = 1) : q.attr ? x = q.attr(f) : (x = parseFloat(a.getStyle(q, f)) || 0, "opacity" !== f && (r = "px"));
                u || (u = c);
                u && u.match && u.match("px") && (u = u.replace(/px/g, ""));
                A.run(x, u, r)
            })
        };
        a.seriesType = function(q, n, h, x, r) {
            var u = a.getOptions(),
                A = a.seriesTypes;
            u.plotOptions[q] = a.merge(u.plotOptions[n], h);
            A[q] = a.extendClass(A[n] || function() {}, x);
            A[q].prototype.type = q;
            r && (A[q].prototype.pointClass = a.extendClass(a.Point, r));
            return A[q]
        };
        a.uniqueKey =
            function() {
                var a = Math.random().toString(36).substring(2, 9),
                    n = 0;
                return function() {
                    return "highcharts-" + a + "-" + n++
                }
        }();
        D.jQuery && (D.jQuery.fn.highcharts = function() {
            var q = [].slice.call(arguments);
            if (this[0]) return q[0] ? (new(a[a.isString(q[0]) ? q.shift() : "Chart"])(this[0], q[0], q[1]), this) : C[a.attr(this[0], "data-highcharts-chart")]
        })
    })(L);
    (function(a) {
        var C = a.each,
            G = a.isNumber,
            D = a.map,
            q = a.merge,
            n = a.pInt;
        a.Color = function(h) {
            if (!(this instanceof a.Color)) return new a.Color(h);
            this.init(h)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function(a) {
                    return [n(a[1]), n(a[2]), n(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function(a) {
                    return [n(a[1]), n(a[2]), n(a[3]), 1]
                }
            }],
            names: {
                none: "rgba(255,255,255,0)",
                white: "#ffffff",
                black: "#000000"
            },
            init: function(h) {
                var n, r, u, A;
                if ((this.input = h = this.names[h && h.toLowerCase ? h.toLowerCase() : ""] || h) && h.stops) this.stops = D(h.stops,
                    function(f) {
                        return new a.Color(f[1])
                    });
                else if (h && h.charAt && "#" === h.charAt() && (n = h.length, h = parseInt(h.substr(1), 16), 7 === n ? r = [(h & 16711680) >> 16, (h & 65280) >> 8, h & 255, 1] : 4 === n && (r = [(h & 3840) >> 4 | (h & 3840) >> 8, (h & 240) >> 4 | h & 240, (h & 15) << 4 | h & 15, 1])), !r)
                    for (u = this.parsers.length; u-- && !r;) A = this.parsers[u], (n = A.regex.exec(h)) && (r = A.parse(n));
                this.rgba = r || []
            },
            get: function(a) {
                var h = this.input,
                    r = this.rgba,
                    u;
                this.stops ? (u = q(h), u.stops = [].concat(u.stops), C(this.stops, function(r, f) {
                    u.stops[f] = [u.stops[f][0], r.get(a)]
                })) :
                    u = r && G(r[0]) ? "rgb" === a || !a && 1 === r[3] ? "rgb(" + r[0] + "," + r[1] + "," + r[2] + ")" : "a" === a ? r[3] : "rgba(" + r.join(",") + ")" : h;
                return u
            },
            brighten: function(a) {
                var h, r = this.rgba;
                if (this.stops) C(this.stops, function(r) {
                    r.brighten(a)
                });
                else if (G(a) && 0 !== a)
                    for (h = 0; 3 > h; h++) r[h] += n(255 * a), 0 > r[h] && (r[h] = 0), 255 < r[h] && (r[h] = 255);
                return this
            },
            setOpacity: function(a) {
                this.rgba[3] = a;
                return this
            },
            tweenTo: function(a, n) {
                var r = this.rgba,
                    h = a.rgba;
                h.length && r && r.length ? (a = 1 !== h[3] || 1 !== r[3], n = (a ? "rgba(" : "rgb(") + Math.round(h[0] + (r[0] -
                    h[0]) * (1 - n)) + "," + Math.round(h[1] + (r[1] - h[1]) * (1 - n)) + "," + Math.round(h[2] + (r[2] - h[2]) * (1 - n)) + (a ? "," + (h[3] + (r[3] - h[3]) * (1 - n)) : "") + ")") : n = a.input || "none";
                return n
            }
        };
        a.color = function(h) {
            return new a.Color(h)
        }
    })(L);
    (function(a) {
        var C, G, D = a.addEvent,
            q = a.animate,
            n = a.attr,
            h = a.charts,
            x = a.color,
            r = a.css,
            u = a.createElement,
            A = a.defined,
            f = a.deg2rad,
            c = a.destroyObjectProperties,
            l = a.doc,
            b = a.each,
            g = a.extend,
            p = a.erase,
            v = a.grep,
            e = a.hasTouch,
            w = a.inArray,
            E = a.isArray,
            m = a.isFirefox,
            z = a.isMS,
            t = a.isObject,
            H = a.isString,
            I = a.isWebKit,
            K = a.merge,
            d = a.noop,
            y = a.objectEach,
            F = a.pick,
            k = a.pInt,
            B = a.removeEvent,
            O = a.stop,
            N = a.svg,
            M = a.SVG_NS,
            P = a.symbolSizes,
            Q = a.win;
        C = a.SVGElement = function() {
            return this
        };
        g(C.prototype, {
            opacity: 1,
            SVG_NS: M,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),
            init: function(a, k) {
                this.element = "span" === k ? u(k) : l.createElementNS(this.SVG_NS, k);
                this.renderer = a
            },
            animate: function(k, d, B) {
                d = a.animObject(F(d, this.renderer.globalAnimation, !0));
                0 !== d.duration ? (B && (d.complete = B), q(this, k, d)) : (this.attr(k, null, B), d.step && d.step.call(this));
                return this
            },
            colorGradient: function(k, d, B) {
                var J = this.renderer,
                    g, e, c, f, m, p, v, z, w, t, F = [],
                    M;
                k.radialGradient ? e = "radialGradient" : k.linearGradient && (e = "linearGradient");
                e && (c = k[e], m = J.gradients, v = k.stops, t = B.radialReference, E(c) && (k[e] = c = {
                        x1: c[0],
                        y1: c[1],
                        x2: c[2],
                        y2: c[3],
                        gradientUnits: "userSpaceOnUse"
                    }), "radialGradient" === e && t && !A(c.gradientUnits) && (f = c, c = K(c, J.getRadialAttr(t, f), {
                        gradientUnits: "userSpaceOnUse"
                    })),
                    y(c, function(a, k) {
                        "id" !== k && F.push(k, a)
                    }), y(v, function(a) {
                        F.push(a)
                    }), F = F.join(","), m[F] ? t = m[F].attr("id") : (c.id = t = a.uniqueKey(), m[F] = p = J.createElement(e).attr(c).add(J.defs), p.radAttr = f, p.stops = [], b(v, function(k) {
                        0 === k[1].indexOf("rgba") ? (g = a.color(k[1]), z = g.get("rgb"), w = g.get("a")) : (z = k[1], w = 1);
                        k = J.createElement("stop").attr({
                            offset: k[0],
                            "stop-color": z,
                            "stop-opacity": w
                        }).add(p);
                        p.stops.push(k)
                    })), M = "url(" + J.url + "#" + t + ")", B.setAttribute(d, M), B.gradient = F, k.toString = function() {
                        return M
                    })
            },
            applyTextOutline: function(k) {
                var J =
                    this.element,
                    d, B, g, e, c; - 1 !== k.indexOf("contrast") && (k = k.replace(/contrast/g, this.renderer.getContrast(J.style.fill)));
                k = k.split(" ");
                B = k[k.length - 1];
                if ((g = k[0]) && "none" !== g && a.svg) {
                    this.fakeTS = !0;
                    k = [].slice.call(J.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    g = g.replace(/(^[\d\.]+)(.*?)$/g, function(a, k, J) {
                        return 2 * k + J
                    });
                    for (c = k.length; c--;) d = k[c], "highcharts-text-outline" === d.getAttribute("class") && p(k, J.removeChild(d));
                    e = J.firstChild;
                    b(k, function(a, k) {
                        0 === k && (a.setAttribute("x", J.getAttribute("x")),
                            k = J.getAttribute("y"), a.setAttribute("y", k || 0), null === k && J.setAttribute("y", 0));
                        a = a.cloneNode(1);
                        n(a, {
                            "class": "highcharts-text-outline",
                            fill: B,
                            stroke: B,
                            "stroke-width": g,
                            "stroke-linejoin": "round"
                        });
                        J.insertBefore(a, e)
                    })
                }
            },
            attr: function(a, k, d, B) {
                var J, g = this.element,
                    b, e = this,
                    c, m;
                "string" === typeof a && void 0 !== k && (J = a, a = {}, a[J] = k);
                "string" === typeof a ? e = (this[a + "Getter"] || this._defaultGetter).call(this, a, g) : (y(a, function(k, J) {
                    c = !1;
                    B || O(this, J);
                    this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(J) &&
                        (b || (this.symbolAttr(a), b = !0), c = !0);
                    !this.rotation || "x" !== J && "y" !== J || (this.doTransform = !0);
                    c || (m = this[J + "Setter"] || this._defaultSetter, m.call(this, k, J, g), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(J) && this.updateShadows(J, k, m))
                }, this), this.afterSetters());
                d && d.call(this);
                return e
            },
            afterSetters: function() {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            },
            updateShadows: function(a, k, d) {
                for (var J = this.shadows, B = J.length; B--;) d.call(J[B], "height" === a ? Math.max(k -
                    (J[B].cutHeight || 0), 0) : "d" === a ? this.d : k, a, J[B])
            },
            addClass: function(a, k) {
                var J = this.attr("class") || ""; - 1 === J.indexOf(a) && (k || (a = (J + (J ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
                return this
            },
            hasClass: function(a) {
                return -1 !== w(a, (this.attr("class") || "").split(" "))
            },
            removeClass: function(a) {
                return this.attr("class", (this.attr("class") || "").replace(a, ""))
            },
            symbolAttr: function(a) {
                var k = this;
                b("x y r start end width height innerR anchorX anchorY".split(" "), function(J) {
                    k[J] = F(a[J], k[J])
                });
                k.attr({
                    d: k.renderer.symbols[k.symbolName](k.x,
                        k.y, k.width, k.height, k)
                })
            },
            clip: function(a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function(a, k) {
                var d;
                k = k || a.strokeWidth || 0;
                d = Math.round(k) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + d;
                a.y = Math.floor(a.y || this.y || 0) + d;
                a.width = Math.floor((a.width || this.width || 0) - 2 * d);
                a.height = Math.floor((a.height || this.height || 0) - 2 * d);
                A(a.strokeWidth) && (a.strokeWidth = k);
                return a
            },
            css: function(a) {
                var d = this.styles,
                    B = {}, J = this.element,
                    b, e = "",
                    c, m = !d,
                    f = ["textOutline", "textOverflow",
                        "width"
                    ];
                a && a.color && (a.fill = a.color);
                d && y(a, function(a, k) {
                    a !== d[k] && (B[k] = a, m = !0)
                });
                m && (d && (a = g(d, B)), b = this.textWidth = a && a.width && "auto" !== a.width && "text" === J.nodeName.toLowerCase() && k(a.width), this.styles = a, b && !N && this.renderer.forExport && delete a.width, J.namespaceURI === this.SVG_NS ? (c = function(a, k) {
                    return "-" + k.toLowerCase()
                }, y(a, function(a, k) {
                    -1 === w(k, f) && (e += k.replace(/([A-Z])/g, c) + ":" + a + ";")
                }), e && n(J, "style", e)) : r(J, a), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this),
                    a && a.textOutline && this.applyTextOutline(a.textOutline)));
                return this
            },
            strokeWidth: function() {
                return this["stroke-width"] || 0
            },
            on: function(a, k) {
                var d = this,
                    B = d.element;
                e && "click" === a ? (B.ontouchstart = function(a) {
                    d.touchEventFired = Date.now();
                    a.preventDefault();
                    k.call(B, a)
                }, B.onclick = function(a) {
                    (-1 === Q.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (d.touchEventFired || 0)) && k.call(B, a)
                }) : B["on" + a] = k;
                return this
            },
            setRadialReference: function(a) {
                var k = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                k && k.radAttr && k.animate(this.renderer.getRadialAttr(a, k.radAttr));
                return this
            },
            translate: function(a, k) {
                return this.attr({
                    translateX: a,
                    translateY: k
                })
            },
            invert: function(a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function() {
                var a = this.translateX || 0,
                    k = this.translateY || 0,
                    d = this.scaleX,
                    B = this.scaleY,
                    g = this.inverted,
                    b = this.rotation,
                    e = this.matrix,
                    c = this.element;
                g && (a += this.width, k += this.height);
                a = ["translate(" + a + "," + k + ")"];
                A(e) && a.push("matrix(" + e.join(",") +
                    ")");
                g ? a.push("rotate(90) scale(-1,1)") : b && a.push("rotate(" + b + " " + F(this.rotationOriginX, c.getAttribute("x"), 0) + " " + F(this.rotationOriginY, c.getAttribute("y") || 0) + ")");
                (A(d) || A(B)) && a.push("scale(" + F(d, 1) + " " + F(B, 1) + ")");
                a.length && c.setAttribute("transform", a.join(" "))
            },
            toFront: function() {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function(a, k, d) {
                var B, g, b, J, e = {};
                g = this.renderer;
                b = g.alignedObjects;
                var c, m;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = k, !d || H(d)) this.alignTo =
                        B = d || "renderer", p(b, this), b.push(this), d = null
                } else a = this.alignOptions, k = this.alignByTranslate, B = this.alignTo;
                d = F(d, g[B], g);
                B = a.align;
                g = a.verticalAlign;
                b = (d.x || 0) + (a.x || 0);
                J = (d.y || 0) + (a.y || 0);
                "right" === B ? c = 1 : "center" === B && (c = 2);
                c && (b += (d.width - (a.width || 0)) / c);
                e[k ? "translateX" : "x"] = Math.round(b);
                "bottom" === g ? m = 1 : "middle" === g && (m = 2);
                m && (J += (d.height - (a.height || 0)) / m);
                e[k ? "translateY" : "y"] = Math.round(J);
                this[this.placed ? "animate" : "attr"](e);
                this.placed = !0;
                this.alignAttr = e;
                return this
            },
            getBBox: function(a,
                k) {
                var d, B = this.renderer,
                    e, J = this.element,
                    c = this.styles,
                    m, p = this.textStr,
                    y, v = B.cache,
                    z = B.cacheKeys,
                    w;
                k = F(k, this.rotation);
                e = k * f;
                m = c && c.fontSize;
                A(p) && (w = p.toString(), -1 === w.indexOf("\x3c") && (w = w.replace(/[0-9]/g, "0")), w += ["", k || 0, m, c && c.width, c && c.textOverflow].join());
                w && !a && (d = v[w]);
                if (!d) {
                    if (J.namespaceURI === this.SVG_NS || B.forExport) {
                        try {
                            (y = this.fakeTS && function(a) {
                                b(J.querySelectorAll(".highcharts-text-outline"), function(k) {
                                    k.style.display = a
                                })
                            }) && y("none"), d = J.getBBox ? g({}, J.getBBox()) : {
                                width: J.offsetWidth,
                                height: J.offsetHeight
                            }, y && y("")
                        } catch (fa) {}
                        if (!d || 0 > d.width) d = {
                            width: 0,
                            height: 0
                        }
                    } else d = this.htmlGetBBox();
                    B.isSVG && (a = d.width, B = d.height, c && "11px" === c.fontSize && 17 === Math.round(B) && (d.height = B = 14), k && (d.width = Math.abs(B * Math.sin(e)) + Math.abs(a * Math.cos(e)), d.height = Math.abs(B * Math.cos(e)) + Math.abs(a * Math.sin(e))));
                    if (w && 0 < d.height) {
                        for (; 250 < z.length;) delete v[z.shift()];
                        v[w] || z.push(w);
                        v[w] = d
                    }
                }
                return d
            },
            show: function(a) {
                return this.attr({
                    visibility: a ? "inherit" : "visible"
                })
            },
            hide: function() {
                return this.attr({
                    visibility: "hidden"
                })
            },
            fadeOut: function(a) {
                var k = this;
                k.animate({
                    opacity: 0
                }, {
                    duration: a || 150,
                    complete: function() {
                        k.attr({
                            y: -9999
                        })
                    }
                })
            },
            add: function(a) {
                var k = this.renderer,
                    d = this.element,
                    B;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && k.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) B = this.zIndexSetter();
                B || (a ? a.element : k.box).appendChild(d);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function(a) {
                var k = a.parentNode;
                k && k.removeChild(a)
            },
            destroy: function() {
                var a =
                    this,
                    k = a.element || {}, d = a.renderer.isSVG && "SPAN" === k.nodeName && a.parentGroup,
                    B = k.ownerSVGElement,
                    g = a.clipPath;
                k.onclick = k.onmouseout = k.onmouseover = k.onmousemove = k.point = null;
                O(a);
                g && B && (b(B.querySelectorAll("[clip-path],[CLIP-PATH]"), function(a) {
                    var k = a.getAttribute("clip-path"),
                        d = g.element.id;
                    (-1 < k.indexOf("(#" + d + ")") || -1 < k.indexOf('("#' + d + '")')) && a.removeAttribute("clip-path")
                }), a.clipPath = g.destroy());
                if (a.stops) {
                    for (B = 0; B < a.stops.length; B++) a.stops[B] = a.stops[B].destroy();
                    a.stops = null
                }
                a.safeRemoveChild(k);
                for (a.destroyShadows(); d && d.div && 0 === d.div.childNodes.length;) k = d.parentGroup, a.safeRemoveChild(d.div), delete d.div, d = k;
                a.alignTo && p(a.renderer.alignedObjects, a);
                y(a, function(k, d) {
                    delete a[d]
                });
                return null
            },
            shadow: function(a, k, d) {
                var B = [],
                    g, b, e = this.element,
                    c, J, m, y;
                if (!a) this.destroyShadows();
                else if (!this.shadows) {
                    J = F(a.width, 3);
                    m = (a.opacity || .15) / J;
                    y = this.parentInverted ? "(-1,-1)" : "(" + F(a.offsetX, 1) + ", " + F(a.offsetY, 1) + ")";
                    for (g = 1; g <= J; g++) b = e.cloneNode(0), c = 2 * J + 1 - 2 * g, n(b, {
                        isShadow: "true",
                        stroke: a.color || "#000000",
                        "stroke-opacity": m * g,
                        "stroke-width": c,
                        transform: "translate" + y,
                        fill: "none"
                    }), d && (n(b, "height", Math.max(n(b, "height") - c, 0)), b.cutHeight = c), k ? k.element.appendChild(b) : e.parentNode && e.parentNode.insertBefore(b, e), B.push(b);
                    this.shadows = B
                }
                return this
            },
            destroyShadows: function() {
                b(this.shadows || [], function(a) {
                    this.safeRemoveChild(a)
                }, this);
                this.shadows = void 0
            },
            xGetter: function(a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function(a) {
                a =
                    F(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function(a, k, d) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                this[k] !== a && (d.setAttribute(k, a), this[k] = a)
            },
            dashstyleSetter: function(a) {
                var d, B = this["stroke-width"];
                "inherit" === B && (B = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash",
                        "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (d = a.length; d--;) a[d] = k(a[d]) * B;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            },
            alignSetter: function(a) {
                this.alignValue = a;
                this.element.setAttribute("text-anchor", {
                    left: "start",
                    center: "middle",
                    right: "end"
                }[a])
            },
            opacitySetter: function(a, k, d) {
                this[k] = a;
                d.setAttribute(k, a)
            },
            titleSetter: function(a) {
                var k = this.element.getElementsByTagName("title")[0];
                k || (k = l.createElementNS(this.SVG_NS,
                    "title"), this.element.appendChild(k));
                k.firstChild && k.removeChild(k.firstChild);
                k.appendChild(l.createTextNode(String(F(a), "").replace(/<[^>]*>/g, "").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")))
            },
            textSetter: function(a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            fillSetter: function(a, k, d) {
                "string" === typeof a ? d.setAttribute(k, a) : a && this.colorGradient(a, k, d)
            },
            visibilitySetter: function(a, k, d) {
                "inherit" === a ? d.removeAttribute(k) : this[k] !== a && d.setAttribute(k,
                    a);
                this[k] = a
            },
            zIndexSetter: function(a, d) {
                var B = this.renderer,
                    g = this.parentGroup,
                    b = (g || B).element || B.box,
                    e, c = this.element,
                    m, y, B = b === B.box;
                e = this.added;
                var f;
                A(a) && (c.zIndex = a, a = +a, this[d] === a && (e = !1), this[d] = a);
                if (e) {
                    (a = this.zIndex) && g && (g.handleZ = !0);
                    d = b.childNodes;
                    for (f = d.length - 1; 0 <= f && !m; f--)
                        if (g = d[f], e = g.zIndex, y = !A(e), g !== c)
                            if (0 > a && y && !B && !f) b.insertBefore(c, d[f]), m = !0;
                            else if (k(e) <= a || y && (!A(a) || 0 <= a)) b.insertBefore(c, d[f + 1] || null), m = !0;
                    m || (b.insertBefore(c, d[B ? 3 : 0] || null), m = !0)
                }
                return m
            },
            _defaultSetter: function(a,
                k, d) {
                d.setAttribute(k, a)
            }
        });
        C.prototype.yGetter = C.prototype.xGetter;
        C.prototype.translateXSetter = C.prototype.translateYSetter = C.prototype.rotationSetter = C.prototype.verticalAlignSetter = C.prototype.rotationOriginXSetter = C.prototype.rotationOriginYSetter = C.prototype.scaleXSetter = C.prototype.scaleYSetter = C.prototype.matrixSetter = function(a, k) {
            this[k] = a;
            this.doTransform = !0
        };
        C.prototype["stroke-widthSetter"] = C.prototype.strokeSetter = function(a, k, d) {
            this[k] = a;
            this.stroke && this["stroke-width"] ? (C.prototype.fillSetter.call(this,
                this.stroke, "stroke", d), d.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === k && 0 === a && this.hasStroke && (d.removeAttribute("stroke"), this.hasStroke = !1)
        };
        G = a.SVGRenderer = function() {
            this.init.apply(this, arguments)
        };
        g(G.prototype, {
            Element: C,
            SVG_NS: M,
            init: function(a, k, d, B, g, b) {
                var e;
                B = this.createElement("svg").attr({
                    version: "1.1",
                    "class": "highcharts-root"
                }).css(this.getStyle(B));
                e = B.element;
                a.appendChild(e);
                n(a, "dir", "ltr"); - 1 === a.innerHTML.indexOf("xmlns") && n(e, "xmlns",
                    this.SVG_NS);
                this.isSVG = !0;
                this.box = e;
                this.boxWrapper = B;
                this.alignedObjects = [];
                this.url = (m || I) && l.getElementsByTagName("base").length ? Q.location.href.replace(/#.*?$/, "").replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(l.createTextNode("Created with Highstock 6.0.6"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = b;
                this.forExport = g;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(k,
                    d, !1);
                var c;
                m && a.getBoundingClientRect && (k = function() {
                    r(a, {
                        left: 0,
                        top: 0
                    });
                    c = a.getBoundingClientRect();
                    r(a, {
                        left: Math.ceil(c.left) - c.left + "px",
                        top: Math.ceil(c.top) - c.top + "px"
                    })
                }, k(), this.unSubPixelFix = D(Q, "resize", k))
            },
            getStyle: function(a) {
                return this.style = g({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, a)
            },
            setStyle: function(a) {
                this.boxWrapper.css(this.getStyle(a))
            },
            isHidden: function() {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function() {
                var a =
                    this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                c(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            },
            createElement: function(a) {
                var k = new this.Element;
                k.init(this, a);
                return k
            },
            draw: d,
            getRadialAttr: function(a, k) {
                return {
                    cx: a[0] - a[2] / 2 + k.cx * a[2],
                    cy: a[1] - a[2] / 2 + k.cy * a[2],
                    r: k.r * a[2]
                }
            },
            getSpanWidth: function(a) {
                return a.getBBox(!0).width
            },
            applyEllipsis: function(a, k, d, B) {
                var g = a.rotation,
                    b = d,
                    e, c = 0,
                    m =
                        d.length,
                    f = function(a) {
                        k.removeChild(k.firstChild);
                        a && k.appendChild(l.createTextNode(a))
                    }, y;
                a.rotation = 0;
                b = this.getSpanWidth(a, k);
                if (y = b > B) {
                    for (; c <= m;) e = Math.ceil((c + m) / 2), b = d.substring(0, e) + "\u2026", f(b), b = this.getSpanWidth(a, k), c === m ? c = m + 1 : b > B ? m = e - 1 : c = e;
                    0 === m && f("")
                }
                a.rotation = g;
                return y
            },
            escapes: {
                "\x26": "\x26amp;",
                "\x3c": "\x26lt;",
                "\x3e": "\x26gt;",
                "'": "\x26#39;",
                '"': "\x26quot;"
            },
            buildText: function(a) {
                var d = a.element,
                    B = this,
                    g = B.forExport,
                    e = F(a.textStr, "").toString(),
                    c = -1 !== e.indexOf("\x3c"),
                    m = d.childNodes,
                    f, p, z, t, I = n(d, "x"),
                    J = a.styles,
                    E = a.textWidth,
                    K = J && J.lineHeight,
                    O = J && J.textOutline,
                    H = J && "ellipsis" === J.textOverflow,
                    P = J && "nowrap" === J.whiteSpace,
                    h = J && J.fontSize,
                    u, A, Q = m.length,
                    J = E && !a.added && this.box,
                    x = function(a) {
                        var g;
                        g = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : h || B.style.fontSize || 12;
                        return K ? k(K) : B.fontMetrics(g, a.getAttribute("style") ? a : d).h
                    }, q = function(a, k) {
                        y(B.escapes, function(d, B) {
                            k && -1 !== w(d, k) || (a = a.toString().replace(new RegExp(d, "g"), B))
                        });
                        return a
                    };
                u = [e, H, P, K, O, h, E].join();
                if (u !== a.textCache) {
                    for (a.textCache = u; Q--;) d.removeChild(m[Q]);
                    c || O || H || E || -1 !== e.indexOf(" ") ? (f = /<.*class="([^"]+)".*>/, p = /<.*style="([^"]+)".*>/, z = /<.*href="([^"]+)".*>/, J && J.appendChild(d), e = c ? e.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [e], e = v(e, function(a) {
                        return "" !== a
                    }), b(e, function(k, e) {
                        var c, m = 0;
                        k = k.replace(/^\s+|\s+$/g,
                            "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
                        c = k.split("|||");
                        b(c, function(k) {
                            if ("" !== k || 1 === c.length) {
                                var b = {}, y = l.createElementNS(B.SVG_NS, "tspan"),
                                    v, w;
                                f.test(k) && (v = k.match(f)[1], n(y, "class", v));
                                p.test(k) && (w = k.match(p)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), n(y, "style", w));
                                z.test(k) && !g && (n(y, "onclick", 'location.href\x3d"' + k.match(z)[1] + '"'), n(y, "class", "highcharts-anchor"), r(y, {
                                    cursor: "pointer"
                                }));
                                k = q(k.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
                                if (" " !== k) {
                                    y.appendChild(l.createTextNode(k));
                                    m ? b.dx = 0 : e && null !== I && (b.x = I);
                                    n(y, b);
                                    d.appendChild(y);
                                    !m && A && (!N && g && r(y, {
                                        display: "block"
                                    }), n(y, "dy", x(y)));
                                    if (E) {
                                        b = k.replace(/([^\^])-/g, "$1- ").split(" ");
                                        v = 1 < c.length || e || 1 < b.length && !P;
                                        var F = [],
                                            J, K = x(y),
                                            O = a.rotation;
                                        for (H && (t = B.applyEllipsis(a, y, k, E)); !H && v && (b.length || F.length);) a.rotation = 0, J = B.getSpanWidth(a, y), k = J > E, void 0 === t && (t = k), k && 1 !== b.length ? (y.removeChild(y.firstChild), F.unshift(b.pop())) : (b = F, F = [], b.length && !P && (y = l.createElementNS(M, "tspan"), n(y, {
                                                dy: K,
                                                x: I
                                            }), w && n(y, "style", w), d.appendChild(y)),
                                            J > E && (E = J)), b.length && y.appendChild(l.createTextNode(b.join(" ").replace(/- /g, "-")));
                                        a.rotation = O
                                    }
                                    m++
                                }
                            }
                        });
                        A = A || d.childNodes.length
                    }), t && a.attr("title", q(a.textStr, ["\x26lt;", "\x26gt;"])), J && J.removeChild(d), O && a.applyTextOutline && a.applyTextOutline(O)) : d.appendChild(l.createTextNode(q(e)))
                }
            },
            getContrast: function(a) {
                a = x(a).rgba;
                return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            },
            button: function(a, k, d, B, b, e, c, m, y) {
                var f = this.label(a, k, d, y, null, null, null, null, "button"),
                    p = 0;
                f.attr(K({
                    padding: 8,
                    r: 2
                }, b));
                var v,
                    w, t, F;
                b = K({
                    fill: "#f7f7f7",
                    stroke: "#cccccc",
                    "stroke-width": 1,
                    style: {
                        color: "#333333",
                        cursor: "pointer",
                        fontWeight: "normal"
                    }
                }, b);
                v = b.style;
                delete b.style;
                e = K(b, {
                    fill: "#e6e6e6"
                }, e);
                w = e.style;
                delete e.style;
                c = K(b, {
                    fill: "#e6ebf5",
                    style: {
                        color: "#000000",
                        fontWeight: "bold"
                    }
                }, c);
                t = c.style;
                delete c.style;
                m = K(b, {
                    style: {
                        color: "#cccccc"
                    }
                }, m);
                F = m.style;
                delete m.style;
                D(f.element, z ? "mouseover" : "mouseenter", function() {
                    3 !== p && f.setState(1)
                });
                D(f.element, z ? "mouseout" : "mouseleave", function() {
                    3 !== p && f.setState(p)
                });
                f.setState =
                    function(a) {
                        1 !== a && (f.state = p = a);
                        f.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
                        f.attr([b, e, c, m][a || 0]).css([v, w, t, F][a || 0])
                };
                f.attr(b).css(g({
                    cursor: "default"
                }, v));
                return f.on("click", function(a) {
                    3 !== p && B.call(f, a)
                })
            },
            crispLine: function(a, k) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - k % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + k % 2 / 2);
                return a
            },
            path: function(a) {
                var k = {
                    fill: "none"
                };
                E(a) ? k.d = a : t(a) && g(k,
                    a);
                return this.createElement("path").attr(k)
            },
            circle: function(a, k, d) {
                a = t(a) ? a : {
                    x: a,
                    y: k,
                    r: d
                };
                k = this.createElement("circle");
                k.xSetter = k.ySetter = function(a, k, d) {
                    d.setAttribute("c" + k, a)
                };
                return k.attr(a)
            },
            arc: function(a, k, d, B, b, g) {
                t(a) ? (B = a, k = B.y, d = B.r, a = B.x) : B = {
                    innerR: B,
                    start: b,
                    end: g
                };
                a = this.symbol("arc", a, k, d, d, B);
                a.r = d;
                return a
            },
            rect: function(a, k, d, B, b, g) {
                b = t(a) ? a.r : b;
                var e = this.createElement("rect");
                a = t(a) ? a : void 0 === a ? {} : {
                    x: a,
                    y: k,
                    width: Math.max(d, 0),
                    height: Math.max(B, 0)
                };
                void 0 !== g && (a.strokeWidth =
                    g, a = e.crisp(a));
                a.fill = "none";
                b && (a.r = b);
                e.rSetter = function(a, k, d) {
                    n(d, {
                        rx: a,
                        ry: a
                    })
                };
                return e.attr(a)
            },
            setSize: function(a, k, d) {
                var B = this.alignedObjects,
                    b = B.length;
                this.width = a;
                this.height = k;
                for (this.boxWrapper.animate({
                    width: a,
                    height: k
                }, {
                    step: function() {
                        this.attr({
                            viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                        })
                    },
                    duration: F(d, !0) ? void 0 : 0
                }); b--;) B[b].align()
            },
            g: function(a) {
                var k = this.createElement("g");
                return a ? k.attr({
                    "class": "highcharts-" + a
                }) : k
            },
            image: function(a, k, d, B, b) {
                var e = {
                    preserveAspectRatio: "none"
                };
                1 < arguments.length && g(e, {
                    x: k,
                    y: d,
                    width: B,
                    height: b
                });
                e = this.createElement("image").attr(e);
                e.element.setAttributeNS ? e.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : e.element.setAttribute("hc-svg-href", a);
                return e
            },
            symbol: function(a, k, d, B, e, c) {
                var m = this,
                    y, f = /^url\((.*?)\)$/,
                    p = f.test(a),
                    v = !p && (this.symbols[a] ? a : "circle"),
                    w = v && this.symbols[v],
                    z = A(k) && w && w.call(this.symbols, Math.round(k), Math.round(d), B, e, c),
                    t, M;
                w ? (y = this.path(z), y.attr("fill", "none"), g(y, {
                    symbolName: v,
                    x: k,
                    y: d,
                    width: B,
                    height: e
                }), c && g(y, c)) : p && (t = a.match(f)[1], y = this.image(t), y.imgwidth = F(P[t] && P[t].width, c && c.width), y.imgheight = F(P[t] && P[t].height, c && c.height), M = function() {
                        y.attr({
                            width: y.width,
                            height: y.height
                        })
                    }, b(["width", "height"], function(a) {
                        y[a + "Setter"] = function(a, k) {
                            var d = {}, B = this["img" + k],
                                b = "width" === k ? "translateX" : "translateY";
                            this[k] = a;
                            A(B) && (this.element && this.element.setAttribute(k, B), this.alignByTranslate || (d[b] = ((this[k] || 0) - B) / 2, this.attr(d)))
                        }
                    }), A(k) && y.attr({
                        x: k,
                        y: d
                    }), y.isImg = !0, A(y.imgwidth) &&
                    A(y.imgheight) ? M() : (y.attr({
                        width: 0,
                        height: 0
                    }), u("img", {
                        onload: function() {
                            var a = h[m.chartIndex];
                            0 === this.width && (r(this, {
                                position: "absolute",
                                top: "-999em"
                            }), l.body.appendChild(this));
                            P[t] = {
                                width: this.width,
                                height: this.height
                            };
                            y.imgwidth = this.width;
                            y.imgheight = this.height;
                            y.element && M();
                            this.parentNode && this.parentNode.removeChild(this);
                            m.imgCount--;
                            if (!m.imgCount && a && a.onload) a.onload()
                        },
                        src: t
                    }), this.imgCount++));
                return y
            },
            symbols: {
                circle: function(a, k, d, B) {
                    return this.arc(a + d / 2, k + B / 2, d / 2, B / 2, {
                        start: 0,
                        end: 2 * Math.PI,
                        open: !1
                    })
                },
                square: function(a, k, d, B) {
                    return ["M", a, k, "L", a + d, k, a + d, k + B, a, k + B, "Z"]
                },
                triangle: function(a, k, d, B) {
                    return ["M", a + d / 2, k, "L", a + d, k + B, a, k + B, "Z"]
                },
                "triangle-down": function(a, k, d, B) {
                    return ["M", a, k, "L", a + d, k, a + d / 2, k + B, "Z"]
                },
                diamond: function(a, k, d, B) {
                    return ["M", a + d / 2, k, "L", a + d, k + B / 2, a + d / 2, k + B, a, k + B / 2, "Z"]
                },
                arc: function(a, k, d, B, b) {
                    var e = b.start,
                        g = b.r || d,
                        c = b.r || B || d,
                        y = b.end - .001;
                    d = b.innerR;
                    B = F(b.open, .001 > Math.abs(b.end - b.start - 2 * Math.PI));
                    var m = Math.cos(e),
                        f = Math.sin(e),
                        p = Math.cos(y),
                        y = Math.sin(y);
                    b = .001 > b.end - e - Math.PI ? 0 : 1;
                    g = ["M", a + g * m, k + c * f, "A", g, c, 0, b, 1, a + g * p, k + c * y];
                    A(d) && g.push(B ? "M" : "L", a + d * p, k + d * y, "A", d, d, 0, b, 0, a + d * m, k + d * f);
                    g.push(B ? "" : "Z");
                    return g
                },
                callout: function(a, k, d, B, b) {
                    var e = Math.min(b && b.r || 0, d, B),
                        g = e + 6,
                        c = b && b.anchorX;
                    b = b && b.anchorY;
                    var y;
                    y = ["M", a + e, k, "L", a + d - e, k, "C", a + d, k, a + d, k, a + d, k + e, "L", a + d, k + B - e, "C", a + d, k + B, a + d, k + B, a + d - e, k + B, "L", a + e, k + B, "C", a, k + B, a, k + B, a, k + B - e, "L", a, k + e, "C", a, k, a, k, a + e, k];
                    c && c > d ? b > k + g && b < k + B - g ? y.splice(13, 3, "L", a + d, b - 6, a + d + 6, b, a + d, b + 6, a + d,
                        k + B - e) : y.splice(13, 3, "L", a + d, B / 2, c, b, a + d, B / 2, a + d, k + B - e) : c && 0 > c ? b > k + g && b < k + B - g ? y.splice(33, 3, "L", a, b + 6, a - 6, b, a, b - 6, a, k + e) : y.splice(33, 3, "L", a, B / 2, c, b, a, B / 2, a, k + e) : b && b > B && c > a + g && c < a + d - g ? y.splice(23, 3, "L", c + 6, k + B, c, k + B + 6, c - 6, k + B, a + e, k + B) : b && 0 > b && c > a + g && c < a + d - g && y.splice(3, 3, "L", c - 6, k, c, k - 6, c + 6, k, d - e, k);
                    return y
                }
            },
            clipRect: function(k, d, B, b) {
                var e = a.uniqueKey(),
                    g = this.createElement("clipPath").attr({
                        id: e
                    }).add(this.defs);
                k = this.rect(k, d, B, b, 0).add(g);
                k.id = e;
                k.clipPath = g;
                k.count = 0;
                return k
            },
            text: function(a,
                k, d, B) {
                var b = {};
                if (B && (this.allowHTML || !this.forExport)) return this.html(a, k, d);
                b.x = Math.round(k || 0);
                d && (b.y = Math.round(d));
                if (a || 0 === a) b.text = a;
                a = this.createElement("text").attr(b);
                B || (a.xSetter = function(a, k, d) {
                    var B = d.getElementsByTagName("tspan"),
                        b, e = d.getAttribute(k),
                        g;
                    for (g = 0; g < B.length; g++) b = B[g], b.getAttribute(k) === e && b.setAttribute(k, a);
                    d.setAttribute(k, a)
                });
                return a
            },
            fontMetrics: function(a, d) {
                a = a || d && d.style && d.style.fontSize || this.style && this.style.fontSize;
                a = /px/.test(a) ? k(a) : /em/.test(a) ?
                    parseFloat(a) * (d ? this.fontMetrics(null, d.parentNode).f : 16) : 12;
                d = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {
                    h: d,
                    b: Math.round(.8 * d),
                    f: a
                }
            },
            rotCorr: function(a, k, d) {
                var B = a;
                k && d && (B = Math.max(B * Math.cos(k * f), 4));
                return {
                    x: -a / 3 * Math.sin(k * f),
                    y: B
                }
            },
            label: function(k, d, e, c, y, m, f, p, v) {
                var w = this,
                    t = w.g("button" !== v && "label"),
                    z = t.text = w.text("", 0, 0, f).attr({
                        zIndex: 1
                    }),
                    F, M, I = 0,
                    N = 3,
                    l = 0,
                    E, O, H, P, r, h = {}, J, u, n = /^url\((.*?)\)$/.test(c),
                    Q = n,
                    x, q, Y, V;
                v && t.addClass("highcharts-" + v);
                Q = n;
                x = function() {
                    return (J || 0) % 2 / 2
                };
                q = function() {
                    var a =
                        z.element.style,
                        k = {};
                    M = (void 0 === E || void 0 === O || r) && A(z.textStr) && z.getBBox();
                    t.width = (E || M.width || 0) + 2 * N + l;
                    t.height = (O || M.height || 0) + 2 * N;
                    u = N + w.fontMetrics(a && a.fontSize, z).b;
                    Q && (F || (t.box = F = w.symbols[c] || n ? w.symbol(c) : w.rect(), F.addClass(("button" === v ? "" : "highcharts-label-box") + (v ? " highcharts-" + v + "-box" : "")), F.add(t), a = x(), k.x = a, k.y = (p ? -u : 0) + a), k.width = Math.round(t.width), k.height = Math.round(t.height), F.attr(g(k, h)), h = {})
                };
                Y = function() {
                    var a = l + N,
                        k;
                    k = p ? 0 : u;
                    A(E) && M && ("center" === r || "right" === r) && (a += {
                        center: .5,
                        right: 1
                    }[r] * (E - M.width));
                    if (a !== z.x || k !== z.y) z.attr("x", a), void 0 !== k && z.attr("y", k);
                    z.x = a;
                    z.y = k
                };
                V = function(a, k) {
                    F ? F.attr(a, k) : h[a] = k
                };
                t.onAdd = function() {
                    z.add(t);
                    t.attr({
                        text: k || 0 === k ? k : "",
                        x: d,
                        y: e
                    });
                    F && A(y) && t.attr({
                        anchorX: y,
                        anchorY: m
                    })
                };
                t.widthSetter = function(k) {
                    E = a.isNumber(k) ? k : null
                };
                t.heightSetter = function(a) {
                    O = a
                };
                t["text-alignSetter"] = function(a) {
                    r = a
                };
                t.paddingSetter = function(a) {
                    A(a) && a !== N && (N = t.padding = a, Y())
                };
                t.paddingLeftSetter = function(a) {
                    A(a) && a !== l && (l = a, Y())
                };
                t.alignSetter =
                    function(a) {
                        a = {
                            left: 0,
                            center: .5,
                            right: 1
                        }[a];
                        a !== I && (I = a, M && t.attr({
                            x: H
                        }))
                };
                t.textSetter = function(a) {
                    void 0 !== a && z.textSetter(a);
                    q();
                    Y()
                };
                t["stroke-widthSetter"] = function(a, k) {
                    a && (Q = !0);
                    J = this["stroke-width"] = a;
                    V(k, a)
                };
                t.strokeSetter = t.fillSetter = t.rSetter = function(a, k) {
                    "r" !== k && ("fill" === k && a && (Q = !0), t[k] = a);
                    V(k, a)
                };
                t.anchorXSetter = function(a, k) {
                    y = t.anchorX = a;
                    V(k, Math.round(a) - x() - H)
                };
                t.anchorYSetter = function(a, k) {
                    m = t.anchorY = a;
                    V(k, a - P)
                };
                t.xSetter = function(a) {
                    t.x = a;
                    I && (a -= I * ((E || M.width) + 2 * N));
                    H =
                        Math.round(a);
                    t.attr("translateX", H)
                };
                t.ySetter = function(a) {
                    P = t.y = Math.round(a);
                    t.attr("translateY", P)
                };
                var ea = t.css;
                return g(t, {
                    css: function(a) {
                        if (a) {
                            var k = {};
                            a = K(a);
                            b(t.textProps, function(d) {
                                void 0 !== a[d] && (k[d] = a[d], delete a[d])
                            });
                            z.css(k)
                        }
                        return ea.call(t, a)
                    },
                    getBBox: function() {
                        return {
                            width: M.width + 2 * N,
                            height: M.height + 2 * N,
                            x: M.x - N,
                            y: M.y - N
                        }
                    },
                    shadow: function(a) {
                        a && (q(), F && F.shadow(a));
                        return t
                    },
                    destroy: function() {
                        B(t.element, "mouseenter");
                        B(t.element, "mouseleave");
                        z && (z = z.destroy());
                        F && (F = F.destroy());
                        C.prototype.destroy.call(t);
                        t = w = q = Y = V = null
                    }
                })
            }
        });
        a.Renderer = G
    })(L);
    (function(a) {
        var C = a.attr,
            G = a.createElement,
            D = a.css,
            q = a.defined,
            n = a.each,
            h = a.extend,
            x = a.isFirefox,
            r = a.isMS,
            u = a.isWebKit,
            A = a.pick,
            f = a.pInt,
            c = a.SVGRenderer,
            l = a.win,
            b = a.wrap;
        h(a.SVGElement.prototype, {
            htmlCss: function(a) {
                var b = this.element;
                if (b = a && "SPAN" === b.tagName && a.width) delete a.width, this.textWidth = b, this.updateTransform();
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = h(this.styles, a);
                D(this.element,
                    a);
                return this
            },
            htmlGetBBox: function() {
                var a = this.element;
                return {
                    x: a.offsetLeft,
                    y: a.offsetTop,
                    width: a.offsetWidth,
                    height: a.offsetHeight
                }
            },
            htmlUpdateTransform: function() {
                if (this.added) {
                    var a = this.renderer,
                        b = this.element,
                        c = this.translateX || 0,
                        e = this.translateY || 0,
                        w = this.x || 0,
                        l = this.y || 0,
                        m = this.textAlign || "left",
                        z = {
                            left: 0,
                            center: .5,
                            right: 1
                        }[m],
                        t = this.styles,
                        H = t && t.whiteSpace;
                    D(b, {
                        marginLeft: c,
                        marginTop: e
                    });
                    this.shadows && n(this.shadows, function(a) {
                        D(a, {
                            marginLeft: c + 1,
                            marginTop: e + 1
                        })
                    });
                    this.inverted && n(b.childNodes,
                        function(d) {
                            a.invertChild(d, b)
                        });
                    if ("SPAN" === b.tagName) {
                        var t = this.rotation,
                            I = this.textWidth && f(this.textWidth),
                            K = [t, m, b.innerHTML, this.textAlign].join(),
                            d;
                        (d = I !== this.oldTextWidth) && !(d = I > this.oldTextWidth) && ((d = this.textPxLength) || (D(b, {
                                width: "",
                                whiteSpace: H || "nowrap"
                            }), d = b.offsetWidth), d = d > I);
                        d && /[ \-]/.test(b.textContent || b.innerText) && (D(b, {
                            width: I + "px",
                            display: "block",
                            whiteSpace: H || "normal"
                        }), this.oldTextWidth = I);
                        K !== this.cTT && (H = a.fontMetrics(b.style.fontSize).b, q(t) && t !== (this.oldRotation ||
                            0) && this.setSpanRotation(t, z, H), this.getSpanCorrection(this.textPxLength || b.offsetWidth, H, z, t, m));
                        D(b, {
                            left: w + (this.xCorr || 0) + "px",
                            top: l + (this.yCorr || 0) + "px"
                        });
                        this.cTT = K;
                        this.oldRotation = t
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function(a, b, c) {
                var e = {}, g = this.renderer.getTransformKey();
                e[g] = e.transform = "rotate(" + a + "deg)";
                e[g + (x ? "Origin" : "-origin")] = e.transformOrigin = 100 * b + "% " + c + "px";
                D(this.element, e)
            },
            getSpanCorrection: function(a, b, c) {
                this.xCorr = -a * c;
                this.yCorr = -b
            }
        });
        h(c.prototype, {
            getTransformKey: function() {
                return r && !/Edge/.test(l.navigator.userAgent) ? "-ms-transform" : u ? "-webkit-transform" : x ? "MozTransform" : l.opera ? "-o-transform" : ""
            },
            html: function(a, c, f) {
                var e = this.createElement("span"),
                    g = e.element,
                    v = e.renderer,
                    m = v.isSVG,
                    p = function(a, e) {
                        n(["opacity", "visibility"], function(g) {
                            b(a, g + "Setter", function(a, d, b, g) {
                                a.call(this, d, b, g);
                                e[b] = d
                            })
                        })
                    };
                e.textSetter = function(a) {
                    a !== g.innerHTML && delete this.bBox;
                    this.textStr = a;
                    g.innerHTML = A(a, "");
                    e.doTransform = !0
                };
                m && p(e, e.element.style);
                e.xSetter = e.ySetter = e.alignSetter = e.rotationSetter =
                    function(a, b) {
                        "align" === b && (b = "textAlign");
                        e[b] = a;
                        e.doTransform = !0
                };
                e.attr({
                    text: a,
                    x: Math.round(c),
                    y: Math.round(f)
                }).css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize,
                    position: "absolute"
                });
                g.style.whiteSpace = "nowrap";
                e.css = e.htmlCss;
                e.afterSetters = function() {
                    this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
                };
                m && (e.add = function(a) {
                    var b, c = v.box.parentNode,
                        m = [];
                    if (this.parentGroup = a) {
                        if (b = a.div, !b) {
                            for (; a;) m.push(a), a = a.parentGroup;
                            n(m.reverse(), function(a) {
                                function d(k,
                                    d) {
                                    a[d] = k;
                                    "translateX" === d ? g.left = k + "px" : g.top = k + "px";
                                    a.doTransform = !0
                                }
                                var g, k = C(a.element, "class");
                                k && (k = {
                                    className: k
                                });
                                b = a.div = a.div || G("div", k, {
                                    position: "absolute",
                                    left: (a.translateX || 0) + "px",
                                    top: (a.translateY || 0) + "px",
                                    display: a.display,
                                    opacity: a.opacity,
                                    pointerEvents: a.styles && a.styles.pointerEvents
                                }, b || c);
                                g = b.style;
                                h(a, {
                                    classSetter: function(a) {
                                        return function(k) {
                                            this.element.setAttribute("class", k);
                                            a.className = k
                                        }
                                    }(b),
                                    on: function() {
                                        m[0].div && e.on.apply({
                                            element: m[0].div
                                        }, arguments);
                                        return a
                                    },
                                    translateXSetter: d,
                                    translateYSetter: d
                                });
                                p(a, g)
                            })
                        }
                    } else b = c;
                    b.appendChild(g);
                    e.added = !0;
                    e.alignOnAdd && e.htmlUpdateTransform();
                    return e
                });
                return e
            }
        })
    })(L);
    (function(a) {
        var C = a.defined,
            G = a.each,
            D = a.extend,
            q = a.merge,
            n = a.pick,
            h = a.timeUnits,
            x = a.win;
        a.Time = function(a) {
            this.update(a, !1)
        };
        a.Time.prototype = {
            defaultOptions: {},
            update: function(r) {
                var h = n(r && r.useUTC, !0),
                    A = this;
                this.options = r = q(!0, this.options || {}, r);
                this.Date = r.Date || x.Date;
                this.timezoneOffset = (this.useUTC = h) && r.timezoneOffset;
                this.getTimezoneOffset =
                    this.timezoneOffsetFunction();
                (this.variableTimezone = !(h && !r.getTimezoneOffset && !r.timezone)) || this.timezoneOffset ? (this.get = function(a, c) {
                        var f = c.getTime(),
                            b = f - A.getTimezoneOffset(c);
                        c.setTime(b);
                        a = c["getUTC" + a]();
                        c.setTime(f);
                        return a
                    }, this.set = function(f, c, l) {
                        var b;
                        if (-1 !== a.inArray(f, ["Milliseconds", "Seconds", "Minutes"])) c["set" + f](l);
                        else b = A.getTimezoneOffset(c), b = c.getTime() - b, c.setTime(b), c["setUTC" + f](l), f = A.getTimezoneOffset(c), b = c.getTime() + f, c.setTime(b)
                    }) : h ? (this.get = function(a, c) {
                        return c["getUTC" +
                            a]()
                    }, this.set = function(a, c, l) {
                        return c["setUTC" + a](l)
                    }) : (this.get = function(a, c) {
                        return c["get" + a]()
                    }, this.set = function(a, c, l) {
                        return c["set" + a](l)
                    })
            },
            makeTime: function(r, h, A, f, c, l) {
                var b, g, p;
                this.useUTC ? (b = this.Date.UTC.apply(0, arguments), g = this.getTimezoneOffset(b), b += g, p = this.getTimezoneOffset(b), g !== p ? b += p - g : g - 36E5 !== this.getTimezoneOffset(b - 36E5) || a.isSafari || (b -= 36E5)) : b = (new this.Date(r, h, n(A, 1), n(f, 0), n(c, 0), n(l, 0))).getTime();
                return b
            },
            timezoneOffsetFunction: function() {
                var r = this,
                    h = this.options,
                    n = x.moment;
                if (!this.useUTC) return function(a) {
                    return 6E4 * (new Date(a)).getTimezoneOffset()
                };
                if (h.timezone) {
                    if (n) return function(a) {
                        return 6E4 * -n.tz(a, h.timezone).utcOffset()
                    };
                    a.error(25)
                }
                return this.useUTC && h.getTimezoneOffset ? function(a) {
                    return 6E4 * h.getTimezoneOffset(a)
                } : function() {
                    return 6E4 * (r.timezoneOffset || 0)
                }
            },
            dateFormat: function(r, h, n) {
                if (!a.defined(h) || isNaN(h)) return a.defaultOptions.lang.invalidDate || "";
                r = a.pick(r, "%Y-%m-%d %H:%M:%S");
                var f = this,
                    c = new this.Date(h),
                    l = this.get("Hours", c),
                    b = this.get("Day", c),
                    g = this.get("Date", c),
                    p = this.get("Month", c),
                    v = this.get("FullYear", c),
                    e = a.defaultOptions.lang,
                    w = e.weekdays,
                    E = e.shortWeekdays,
                    m = a.pad,
                    c = a.extend({
                        a: E ? E[b] : w[b].substr(0, 3),
                        A: w[b],
                        d: m(g),
                        e: m(g, 2, " "),
                        w: b,
                        b: e.shortMonths[p],
                        B: e.months[p],
                        m: m(p + 1),
                        y: v.toString().substr(2, 2),
                        Y: v,
                        H: m(l),
                        k: l,
                        I: m(l % 12 || 12),
                        l: l % 12 || 12,
                        M: m(f.get("Minutes", c)),
                        p: 12 > l ? "AM" : "PM",
                        P: 12 > l ? "am" : "pm",
                        S: m(c.getSeconds()),
                        L: m(Math.round(h % 1E3), 3)
                    }, a.dateFormats);
                a.objectEach(c, function(a, b) {
                    for (; - 1 !== r.indexOf("%" +
                        b);) r = r.replace("%" + b, "function" === typeof a ? a.call(f, h) : a)
                });
                return n ? r.substr(0, 1).toUpperCase() + r.substr(1) : r
            },
            getTimeTicks: function(a, u, A, f) {
                var c = this,
                    l = [],
                    b = {}, g, p = new c.Date(u),
                    v = a.unitRange,
                    e = a.count || 1,
                    w;
                if (C(u)) {
                    c.set("Milliseconds", p, v >= h.second ? 0 : e * Math.floor(c.get("Milliseconds", p) / e));
                    v >= h.second && c.set("Seconds", p, v >= h.minute ? 0 : e * Math.floor(c.get("Seconds", p) / e));
                    v >= h.minute && c.set("Minutes", p, v >= h.hour ? 0 : e * Math.floor(c.get("Minutes", p) / e));
                    v >= h.hour && c.set("Hours", p, v >= h.day ? 0 : e * Math.floor(c.get("Hours",
                        p) / e));
                    v >= h.day && c.set("Date", p, v >= h.month ? 1 : e * Math.floor(c.get("Date", p) / e));
                    v >= h.month && (c.set("Month", p, v >= h.year ? 0 : e * Math.floor(c.get("Month", p) / e)), g = c.get("FullYear", p));
                    v >= h.year && c.set("FullYear", p, g - g % e);
                    v === h.week && c.set("Date", p, c.get("Date", p) - c.get("Day", p) + n(f, 1));
                    g = c.get("FullYear", p);
                    f = c.get("Month", p);
                    var E = c.get("Date", p),
                        m = c.get("Hours", p);
                    u = p.getTime();
                    c.variableTimezone && (w = A - u > 4 * h.month || c.getTimezoneOffset(u) !== c.getTimezoneOffset(A));
                    p = p.getTime();
                    for (u = 1; p < A;) l.push(p), p =
                        v === h.year ? c.makeTime(g + u * e, 0) : v === h.month ? c.makeTime(g, f + u * e) : !w || v !== h.day && v !== h.week ? w && v === h.hour && 1 < e ? c.makeTime(g, f, E, m + u * e) : p + v * e : c.makeTime(g, f, E + u * e * (v === h.day ? 1 : 7)), u++;
                    l.push(p);
                    v <= h.hour && 1E4 > l.length && G(l, function(a) {
                        0 === a % 18E5 && "000000000" === c.dateFormat("%H%M%S%L", a) && (b[a] = "day")
                    })
                }
                l.info = D(a, {
                    higherRanks: b,
                    totalRange: v * e
                });
                return l
            }
        }
    })(L);
    (function(a) {
        var C = a.color,
            G = a.merge;
        a.defaultOptions = {
            colors: "#0000FF #FFC000 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "1월 2월 3월 4월 5월 6월 7월 8월 9월 10월 11월 12월".split(" "),
                shortMonths: "1월 2월 3월 4월 5월 6월 7월 8월 9월 10월 11월 12월".split(" "),
                weekdays: "일요일 월요일 화요일 수요일 목요일 금요일 토요일".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {},
            time: a.Time.prototype.defaultOptions,
            chart: {
                borderRadius: 0,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {
                        zIndex: 6
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                widthAdjust: -44
            },
            plotOptions: {},
            labels: {
                style: {
                    position: "absolute",
                    color: "#333333"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                layout: "horizontal",
                labelFormatter: function() {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {
                    activeColor: "#003399",
                    inactiveColor: "#cccccc"
                },
                itemStyle: {
                    color: "#333333",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textOverflow: "ellipsis"
                },
                itemHoverStyle: {
                    color: "#000000"
                },
                itemHiddenStyle: {
                    color: "#cccccc"
                },
                shadow: !1,
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative",
                    top: "45%"
                },
                style: {
                    position: "absolute",
                    backgroundColor: "#ffffff",
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%b %e %A, %H:%M:%S.%L",
                    second: "%b %e %A, %H:%M:%S",
                    minute: "%b %e %A, %H:%M",
                    hour: "%b %e %A, %H:%M",
                    day: "%Y, %b %e, %A",
                    week: "%Y, %b %e, %A",
                    month: "%Y %B",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                backgroundColor: C("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                headerFormat: '\x3cspan style\x3d"font-size: 10px; "\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
                shadow: !0,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "http://www.highcharts.com",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                style: {
                    cursor: "pointer",
                    color: "#999999",
                    fontSize: "9px"
                },
                text: "Highcharts.com"
            }
        };
        a.setOptions = function(C) {
            a.defaultOptions = G(!0, a.defaultOptions, C);
            a.time.update(G(a.defaultOptions.global,
                a.defaultOptions.time), !1);
            return a.defaultOptions
        };
        a.getOptions = function() {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        a.time = new a.Time(G(a.defaultOptions.global, a.defaultOptions.time));
        a.dateFormat = function(C, q, n) {
            return a.time.dateFormat(C, q, n)
        }
    })(L);
    (function(a) {
        var C = a.correctFloat,
            G = a.defined,
            D = a.destroyObjectProperties,
            q = a.isNumber,
            n = a.merge,
            h = a.pick,
            x = a.deg2rad;
        a.Tick = function(a, h, n, f) {
            this.axis = a;
            this.pos = h;
            this.type = n || "";
            this.isNewLabel = this.isNew = !0;
            n ||
                f || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function() {
                var a = this.axis,
                    u = a.options,
                    A = a.chart,
                    f = a.categories,
                    c = a.names,
                    l = this.pos,
                    b = u.labels,
                    g = a.tickPositions,
                    p = l === g[0],
                    v = l === g[g.length - 1],
                    c = f ? h(f[l], c[l], l) : l,
                    f = this.label,
                    g = g.info,
                    e;
                a.isDatetimeAxis && g && (e = u.dateTimeLabelFormats[g.higherRanks[l] || g.unitName]);
                this.isFirst = p;
                this.isLast = v;
                u = a.labelFormatter.call({
                    axis: a,
                    chart: A,
                    isFirst: p,
                    isLast: v,
                    dateTimeLabelFormat: e,
                    value: a.isLog ? C(a.lin2log(c)) : c,
                    pos: l
                });
                if (G(f)) f && f.attr({
                    text: u
                });
                else {
                    if (this.label =
                        f = G(u) && b.enabled ? A.renderer.text(u, 0, 0, b.useHTML).css(n(b.style)).add(a.labelGroup) : null) f.textPxLength = f.getBBox().width;
                    this.rotation = 0
                }
            },
            getLabelSize: function() {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            },
            handleOverflow: function(a) {
                var r = this.axis,
                    n = r.options.labels,
                    f = a.x,
                    c = r.chart.chartWidth,
                    l = r.chart.spacing,
                    b = h(r.labelLeft, Math.min(r.pos, l[3])),
                    l = h(r.labelRight, Math.max(r.isRadial ? 0 : r.pos + r.len, c - l[1])),
                    g = this.label,
                    p = this.rotation,
                    v = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[r.labelAlign ||
                        g.attr("align")
                    ],
                    e = g.getBBox().width,
                    w = r.getSlotWidth(),
                    E = w,
                    m = 1,
                    z, t = {};
                if (p || !1 === n.overflow) 0 > p && f - v * e < b ? z = Math.round(f / Math.cos(p * x) - b) : 0 < p && f + v * e > l && (z = Math.round((c - f) / Math.cos(p * x)));
                else if (c = f + (1 - v) * e, f - v * e < b ? E = a.x + E * (1 - v) - b : c > l && (E = l - a.x + E * v, m = -1), E = Math.min(w, E), E < w && "center" === r.labelAlign && (a.x += m * (w - E - v * (w - Math.min(e, E)))), e > E || r.autoRotation && (g.styles || {}).width) z = E;
                z && (t.width = z, (n.style || {}).textOverflow || (t.textOverflow = "ellipsis"), g.css(t))
            },
            getPosition: function(a, h, n, f) {
                var c = this.axis,
                    l = c.chart,
                    b = f && l.oldChartHeight || l.chartHeight;
                return {
                    x: a ? c.translate(h + n, null, null, f) + c.transB : c.left + c.offset + (c.opposite ? (f && l.oldChartWidth || l.chartWidth) - c.right - c.left : 0),
                    y: a ? b - c.bottom + c.offset - (c.opposite ? c.height : 0) : b - c.translate(h + n, null, null, f) - c.transB
                }
            },
            getLabelPosition: function(a, h, n, f, c, l, b, g) {
                var p = this.axis,
                    v = p.transA,
                    e = p.reversed,
                    w = p.staggerLines,
                    E = p.tickRotCorr || {
                        x: 0,
                        y: 0
                    }, m = c.y,
                    z = f || p.reserveSpaceDefault ? 0 : -p.labelOffset * ("center" === p.labelAlign ? .5 : 1);
                G(m) || (m = 0 === p.side ? n.rotation ? -8 : -n.getBBox().height : 2 === p.side ? E.y + 8 : Math.cos(n.rotation * x) * (E.y - n.getBBox(!1, 0).height / 2));
                a = a + c.x + z + E.x - (l && f ? l * v * (e ? -1 : 1) : 0);
                h = h + m - (l && !f ? l * v * (e ? 1 : -1) : 0);
                w && (n = b / (g || 1) % w, p.opposite && (n = w - n - 1), h += p.labelOffset / w * n);
                return {
                    x: a,
                    y: Math.round(h)
                }
            },
            getMarkPath: function(a, h, n, f, c, l) {
                return l.crispLine(["M", a, h, "L", a + (c ? 0 : -n), h + (c ? n : 0)], f)
            },
            renderGridLine: function(a, h, n) {
                var f = this.axis,
                    c = f.options,
                    l = this.gridLine,
                    b = {}, g = this.pos,
                    p = this.type,
                    v = f.tickmarkOffset,
                    e = f.chart.renderer,
                    w = p ? p + "Grid" : "grid",
                    E = c[w + "LineWidth"],
                    m = c[w + "LineColor"],
                    c = c[w + "LineDashStyle"];
                l || (b.stroke = m, b["stroke-width"] = E, c && (b.dashstyle = c), p || (b.zIndex = 1), a && (b.opacity = 0), this.gridLine = l = e.path().attr(b).addClass("highcharts-" + (p ? p + "-" : "") + "grid-line").add(f.gridGroup));
                if (!a && l && (a = f.getPlotLinePath(g + v, l.strokeWidth() * n, a, !0))) l[this.isNew ? "attr" : "animate"]({
                    d: a,
                    opacity: h
                })
            },
            renderMark: function(a, n, A) {
                var f = this.axis,
                    c = f.options,
                    l = f.chart.renderer,
                    b = this.type,
                    g = b ? b + "Tick" : "tick",
                    p = f.tickSize(g),
                    v = this.mark,
                    e = !v,
                    w = a.x;
                a = a.y;
                var E = h(c[g + "Width"], !b && f.isXAxis ? 1 : 0),
                    c = c[g + "Color"];
                p && (f.opposite && (p[0] = -p[0]), e && (this.mark = v = l.path().addClass("highcharts-" + (b ? b + "-" : "") + "tick").add(f.axisGroup), v.attr({
                    stroke: c,
                    "stroke-width": E
                })), v[e ? "attr" : "animate"]({
                    d: this.getMarkPath(w, a, p[0], v.strokeWidth() * A, f.horiz, l),
                    opacity: n
                }))
            },
            renderLabel: function(a, n, A, f) {
                var c = this.axis,
                    l = c.horiz,
                    b = c.options,
                    g = this.label,
                    p = b.labels,
                    v = p.step,
                    c = c.tickmarkOffset,
                    e = !0,
                    w = a.x;
                a = a.y;
                g && q(w) && (g.xy = a = this.getLabelPosition(w, a, g, l, p, c, f, v), this.isFirst && !this.isLast && !h(b.showFirstLabel, 1) || this.isLast && !this.isFirst && !h(b.showLastLabel, 1) ? e = !1 : !l || p.step || p.rotation || n || 0 === A || this.handleOverflow(a), v && f % v && (e = !1), e && q(a.y) ? (a.opacity = A, g[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) : (g.attr("y", -9999), this.isNewLabel = !0))
            },
            render: function(a, n, A) {
                var f = this.axis,
                    c = f.horiz,
                    l = this.getPosition(c, this.pos, f.tickmarkOffset, n),
                    b = l.x,
                    g = l.y,
                    f = c && b === f.pos + f.len || !c && g === f.pos ? -1 : 1;
                A = h(A, 1);
                this.isActive = !0;
                this.renderGridLine(n, A, f);
                this.renderMark(l,
                    A, f);
                this.renderLabel(l, n, A, a);
                this.isNew = !1
            },
            destroy: function() {
                D(this, this.axis)
            }
        }
    })(L);
    var da = function(a) {
        var C = a.addEvent,
            G = a.animObject,
            D = a.arrayMax,
            q = a.arrayMin,
            n = a.color,
            h = a.correctFloat,
            x = a.defaultOptions,
            r = a.defined,
            u = a.deg2rad,
            A = a.destroyObjectProperties,
            f = a.each,
            c = a.extend,
            l = a.fireEvent,
            b = a.format,
            g = a.getMagnitude,
            p = a.grep,
            v = a.inArray,
            e = a.isArray,
            w = a.isNumber,
            E = a.isString,
            m = a.merge,
            z = a.normalizeTickInterval,
            t = a.objectEach,
            H = a.pick,
            I = a.removeEvent,
            K = a.splat,
            d = a.syncTimeout,
            y = a.Tick,
            F = function() {
                this.init.apply(this,
                    arguments)
            };
        a.extend(F.prototype, {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%b %e",
                    week: "%b %e",
                    month: "%Y %b",
                    year: "%Y"
                },
                endOnTick: !1,
                labels: {
                    enabled: !0,
                    style: {
                        color: "#666666",
                        cursor: "default",
                        fontSize: "11px"
                    },
                    x: 0
                },
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                title: {
                    align: "middle",
                    style: {
                        color: "#666666"
                    }
                },
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                maxPadding: .05,
                minPadding: .05,
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    allowOverlap: !1,
                    enabled: !1,
                    formatter: function() {
                        return a.numberFormat(this.total, -1)
                    },
                    style: {
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: "#000000",
                        textOutline: "1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            },
            defaultRightAxisOptions: {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            },
            defaultBottomAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            defaultTopAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            init: function(a, d) {
                var k = d.isX,
                    b = this;
                b.chart = a;
                b.horiz = a.inverted && !b.isZAxis ? !k : k;
                b.isXAxis = k;
                b.coll = b.coll || (k ? "xAxis" : "yAxis");
                b.opposite = d.opposite;
                b.side = d.side || (b.horiz ?
                    b.opposite ? 0 : 2 : b.opposite ? 1 : 3);
                b.setOptions(d);
                var B = this.options,
                    e = B.type;
                b.labelFormatter = B.labels.formatter || b.defaultLabelFormatter;
                b.userOptions = d;
                b.minPixelPadding = 0;
                b.reversed = B.reversed;
                b.visible = !1 !== B.visible;
                b.zoomEnabled = !1 !== B.zoomEnabled;
                b.hasNames = "category" === e || !0 === B.categories;
                b.categories = B.categories || b.hasNames;
                b.names = b.names || [];
                b.plotLinesAndBandsGroups = {};
                b.isLog = "logarithmic" === e;
                b.isDatetimeAxis = "datetime" === e;
                b.positiveValuesOnly = b.isLog && !b.allowNegativeLog;
                b.isLinked =
                    r(B.linkedTo);
                b.ticks = {};
                b.labelEdge = [];
                b.minorTicks = {};
                b.plotLinesAndBands = [];
                b.alternateBands = {};
                b.len = 0;
                b.minRange = b.userMinRange = B.minRange || B.maxZoom;
                b.range = B.range;
                b.offset = B.offset || 0;
                b.stacks = {};
                b.oldStacks = {};
                b.stacksTouched = 0;
                b.max = null;
                b.min = null;
                b.crosshair = H(B.crosshair, K(a.options.tooltip.crosshairs)[k ? 0 : 1], !1);
                d = b.options.events; - 1 === v(b, a.axes) && (k ? a.axes.splice(a.xAxis.length, 0, b) : a.axes.push(b), a[b.coll].push(b));
                b.series = b.series || [];
                a.inverted && !b.isZAxis && k && void 0 === b.reversed &&
                    (b.reversed = !0);
                t(d, function(a, k) {
                    C(b, k, a)
                });
                b.lin2log = B.linearToLogConverter || b.lin2log;
                b.isLog && (b.val2lin = b.log2lin, b.lin2val = b.lin2log)
            },
            setOptions: function(a) {
                this.options = m(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], m(x[this.coll], a))
            },
            defaultLabelFormatter: function() {
                var k = this.axis,
                    d = this.value,
                    e = k.chart.time,
                    g = k.categories,
                    c = this.dateTimeLabelFormat,
                    y = x.lang,
                    m = y.numericSymbols,
                    y = y.numericSymbolMagnitude || 1E3,
                    f = m && m.length,
                    v, p = k.options.labels.format,
                    k = k.isLog ? Math.abs(d) : k.tickInterval;
                if (p) v = b(p, this, e);
                else if (g) v = d;
                else if (c) v = e.dateFormat(c, d);
                else if (f && 1E3 <= k)
                    for (; f-- && void 0 === v;) e = Math.pow(y, f + 1), k >= e && 0 === 10 * d % e && null !== m[f] && 0 !== d && (v = a.numberFormat(d / e, -1) + m[f]);
                void 0 === v && (v = 1E4 <= Math.abs(d) ? a.numberFormat(d, -1) : a.numberFormat(d, -1, void 0, ""));
                return v
            },
            getSeriesExtremes: function() {
                var a = this,
                    d = a.chart;
                a.hasVisibleSeries = !1;
                a.dataMin =
                    a.dataMax = a.threshold = null;
                a.softThreshold = !a.isXAxis;
                a.buildStacks && a.buildStacks();
                f(a.series, function(k) {
                    if (k.visible || !d.options.chart.ignoreHiddenSeries) {
                        var b = k.options,
                            B = b.threshold,
                            e;
                        a.hasVisibleSeries = !0;
                        a.positiveValuesOnly && 0 >= B && (B = null);
                        if (a.isXAxis) b = k.xData, b.length && (k = q(b), e = D(b), w(k) || k instanceof Date || (b = p(b, w), k = q(b), e = D(b)), b.length && (a.dataMin = Math.min(H(a.dataMin, b[0], k), k), a.dataMax = Math.max(H(a.dataMax, b[0], e), e)));
                        else if (k.getExtremes(), e = k.dataMax, k = k.dataMin, r(k) && r(e) &&
                            (a.dataMin = Math.min(H(a.dataMin, k), k), a.dataMax = Math.max(H(a.dataMax, e), e)), r(B) && (a.threshold = B), !b.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
                    }
                })
            },
            translate: function(a, d, b, e, g, c) {
                var k = this.linkedParent || this,
                    B = 1,
                    y = 0,
                    m = e ? k.oldTransA : k.transA;
                e = e ? k.oldMin : k.min;
                var f = k.minPixelPadding;
                g = (k.isOrdinal || k.isBroken || k.isLog && g) && k.lin2val;
                m || (m = k.transA);
                b && (B *= -1, y = k.len);
                k.reversed && (B *= -1, y -= B * (k.sector || k.len));
                d ? (a = (a * B + y - f) / m + e, g && (a = k.lin2val(a))) : (g && (a = k.val2lin(a)), a = w(e) ? B * (a - e) *
                    m + y + B * f + (w(c) ? m * c : 0) : void 0);
                return a
            },
            toPixels: function(a, d) {
                return this.translate(a, !1, !this.horiz, null, !0) + (d ? 0 : this.pos)
            },
            toValue: function(a, d) {
                return this.translate(a - (d ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function(a, d, b, e, g) {
                var k = this.chart,
                    B = this.left,
                    c = this.top,
                    y, m, f = b && k.oldChartHeight || k.chartHeight,
                    v = b && k.oldChartWidth || k.chartWidth,
                    p;
                y = this.transB;
                var t = function(a, k, d) {
                    if (a < k || a > d) e ? a = Math.min(Math.max(k, a), d) : p = !0;
                    return a
                };
                g = H(g, this.translate(a, null, null, b));
                g = Math.min(Math.max(-1E5,
                    g), 1E5);
                a = b = Math.round(g + y);
                y = m = Math.round(f - g - y);
                w(g) ? this.horiz ? (y = c, m = f - this.bottom, a = b = t(a, B, B + this.width)) : (a = B, b = v - this.right, y = m = t(y, c, c + this.height)) : (p = !0, e = !1);
                return p && !e ? null : k.renderer.crispLine(["M", a, y, "L", b, m], d || 1)
            },
            getLinearTickPositions: function(a, d, b) {
                var k, B = h(Math.floor(d / a) * a);
                b = h(Math.ceil(b / a) * a);
                var e = [],
                    g;
                h(B + a) === B && (g = 20);
                if (this.single) return [d];
                for (d = B; d <= b;) {
                    e.push(d);
                    d = h(d + a, g);
                    if (d === k) break;
                    k = d
                }
                return e
            },
            getMinorTickInterval: function() {
                var a = this.options;
                return !0 ===
                    a.minorTicks ? H(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval
            },
            getMinorTickPositions: function() {
                var a = this,
                    d = a.options,
                    b = a.tickPositions,
                    e = a.minorTickInterval,
                    g = [],
                    c = a.pointRangePadding || 0,
                    y = a.min - c,
                    c = a.max + c,
                    m = c - y;
                if (m && m / e < a.len / 3)
                    if (a.isLog) f(this.paddedTicks, function(k, d, b) {
                        d && g.push.apply(g, a.getLogTickPositions(e, b[d - 1], b[d], !0))
                    });
                    else if (a.isDatetimeAxis && "auto" === this.getMinorTickInterval()) g = g.concat(a.getTimeTicks(a.normalizeTimeTickInterval(e), y, c, d.startOfWeek));
                else
                    for (d = y + (b[0] - y) % e; d <= c && d !== g[0]; d += e) g.push(d);
                0 !== g.length && a.trimTicks(g);
                return g
            },
            adjustForMinRange: function() {
                var a = this.options,
                    d = this.min,
                    b = this.max,
                    e, g, c, y, m, v, p, t;
                this.isXAxis && void 0 === this.minRange && !this.isLog && (r(a.min) || r(a.max) ? this.minRange = null : (f(this.series, function(a) {
                    v = a.xData;
                    for (y = p = a.xIncrement ? 1 : v.length - 1; 0 < y; y--)
                        if (m = v[y] - v[y - 1], void 0 === c || m < c) c = m
                }), this.minRange = Math.min(5 * c, this.dataMax - this.dataMin)));
                b - d < this.minRange && (g = this.dataMax - this.dataMin >= this.minRange,
                    t = this.minRange, e = (t - b + d) / 2, e = [d - e, H(a.min, d - e)], g && (e[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), d = D(e), b = [d + t, H(a.max, d + t)], g && (b[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), b = q(b), b - d < t && (e[0] = b - t, e[1] = H(a.min, b - t), d = D(e)));
                this.min = d;
                this.max = b
            },
            getClosest: function() {
                var a;
                this.categories ? a = 1 : f(this.series, function(k) {
                    var d = k.closestPointRange,
                        b = k.visible || !k.chart.options.chart.ignoreHiddenSeries;
                    !k.noSharedTooltip && r(d) && b && (a = r(a) ? Math.min(a, d) : d)
                });
                return a
            },
            nameToX: function(a) {
                var k =
                    e(this.categories),
                    d = k ? this.categories : this.names,
                    b = a.options.x,
                    g;
                a.series.requireSorting = !1;
                r(b) || (b = !1 === this.options.uniqueNames ? a.series.autoIncrement() : k ? v(a.name, d) : H(d["s" + a.name], -1)); - 1 === b ? k || (g = d.length) : g = b;
                void 0 !== g && (this.names[g] = a.name, this.names["s" + a.name] = g);
                return g
            },
            updateNames: function() {
                var a = this,
                    d = this.names,
                    b = d.length;
                if (0 < b) {
                    for (; b--;) delete d["s" + d[b]];
                    d.length = 0;
                    this.minRange = this.userMinRange;
                    f(this.series || [], function(k) {
                        k.xIncrement = null;
                        if (!k.points || k.isDirtyData) k.processData(),
                        k.generatePoints();
                        f(k.points, function(d, b) {
                            var e;
                            d.options && (e = a.nameToX(d), void 0 !== e && e !== d.x && (d.x = e, k.xData[b] = e))
                        })
                    })
                }
            },
            setAxisTranslation: function(a) {
                var k = this,
                    d = k.max - k.min,
                    b = k.axisPointRange || 0,
                    e, g = 0,
                    c = 0,
                    y = k.linkedParent,
                    m = !! k.categories,
                    v = k.transA,
                    t = k.isXAxis;
                if (t || m || b) e = k.getClosest(), y ? (g = y.minPointOffset, c = y.pointRangePadding) : f(k.series, function(a) {
                    var d = m ? 1 : t ? H(a.options.pointRange, e, 0) : k.axisPointRange || 0;
                    a = a.options.pointPlacement;
                    b = Math.max(b, d);
                    k.single || (g = Math.max(g, E(a) ? 0 :
                        d / 2), c = Math.max(c, "on" === a ? 0 : d))
                }), y = k.ordinalSlope && e ? k.ordinalSlope / e : 1, k.minPointOffset = g *= y, k.pointRangePadding = c *= y, k.pointRange = Math.min(b, d), t && (k.closestPointRange = e);
                a && (k.oldTransA = v);
                k.translationSlope = k.transA = v = k.options.staticScale || k.len / (d + c || 1);
                k.transB = k.horiz ? k.left : k.bottom;
                k.minPixelPadding = v * g
            },
            minFromRange: function() {
                return this.max - this.range
            },
            setTickInterval: function(k) {
                var d = this,
                    b = d.chart,
                    e = d.options,
                    c = d.isLog,
                    y = d.log2lin,
                    m = d.isDatetimeAxis,
                    v = d.isXAxis,
                    t = d.isLinked,
                    p = e.maxPadding,
                    F = e.minPadding,
                    I = e.tickInterval,
                    E = e.tickPixelInterval,
                    K = d.categories,
                    n = d.threshold,
                    A = d.softThreshold,
                    u, x, q, C;
                m || K || t || this.getTickAmount();
                q = H(d.userMin, e.min);
                C = H(d.userMax, e.max);
                t ? (d.linkedParent = b[d.coll][e.linkedTo], b = d.linkedParent.getExtremes(), d.min = H(b.min, b.dataMin), d.max = H(b.max, b.dataMax), e.type !== d.linkedParent.options.type && a.error(11, 1)) : (!A && r(n) && (d.dataMin >= n ? (u = n, F = 0) : d.dataMax <= n && (x = n, p = 0)), d.min = H(q, u, d.dataMin), d.max = H(C, x, d.dataMax));
                c && (d.positiveValuesOnly && !k && 0 >= Math.min(d.min,
                    H(d.dataMin, d.min)) && a.error(10, 1), d.min = h(y(d.min), 15), d.max = h(y(d.max), 15));
                d.range && r(d.max) && (d.userMin = d.min = q = Math.max(d.dataMin, d.minFromRange()), d.userMax = C = d.max, d.range = null);
                l(d, "foundExtremes");
                d.beforePadding && d.beforePadding();
                d.adjustForMinRange();
                !(K || d.axisPointRange || d.usePercentage || t) && r(d.min) && r(d.max) && (y = d.max - d.min) && (!r(q) && F && (d.min -= y * F), !r(C) && p && (d.max += y * p));
                w(e.softMin) && !w(d.userMin) && (d.min = Math.min(d.min, e.softMin));
                w(e.softMax) && !w(d.userMax) && (d.max = Math.max(d.max,
                    e.softMax));
                w(e.floor) && (d.min = Math.max(d.min, e.floor));
                w(e.ceiling) && (d.max = Math.min(d.max, e.ceiling));
                A && r(d.dataMin) && (n = n || 0, !r(q) && d.min < n && d.dataMin >= n ? d.min = n : !r(C) && d.max > n && d.dataMax <= n && (d.max = n));
                d.tickInterval = d.min === d.max || void 0 === d.min || void 0 === d.max ? 1 : t && !I && E === d.linkedParent.options.tickPixelInterval ? I = d.linkedParent.tickInterval : H(I, this.tickAmount ? (d.max - d.min) / Math.max(this.tickAmount - 1, 1) : void 0, K ? 1 : (d.max - d.min) * E / Math.max(d.len, E));
                v && !k && f(d.series, function(a) {
                    a.processData(d.min !==
                        d.oldMin || d.max !== d.oldMax)
                });
                d.setAxisTranslation(!0);
                d.beforeSetTickPositions && d.beforeSetTickPositions();
                d.postProcessTickInterval && (d.tickInterval = d.postProcessTickInterval(d.tickInterval));
                d.pointRange && !I && (d.tickInterval = Math.max(d.pointRange, d.tickInterval));
                k = H(e.minTickInterval, d.isDatetimeAxis && d.closestPointRange);
                !I && d.tickInterval < k && (d.tickInterval = k);
                m || c || I || (d.tickInterval = z(d.tickInterval, null, g(d.tickInterval), H(e.allowDecimals, !(.5 < d.tickInterval && 5 > d.tickInterval && 1E3 < d.max &&
                    9999 > d.max)), !! this.tickAmount));
                this.tickAmount || (d.tickInterval = d.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function() {
                var a = this.options,
                    d, b = a.tickPositions;
                d = this.getMinorTickInterval();
                var e = a.tickPositioner,
                    g = a.startOnTick,
                    c = a.endOnTick;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === d && this.tickInterval ? this.tickInterval / 5 : d;
                this.single = this.min === this.max && r(this.min) && !this.tickAmount && (parseInt(this.min,
                    10) === this.min || !1 !== a.allowDecimals);
                this.tickPositions = d = b && b.slice();
                !d && (d = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), d.length > this.len && (d = [d[0], d.pop()], d[0] === d[1] && (d.length = 1)), this.tickPositions = d, e && (e = e.apply(this, [this.min,
                    this.max
                ]))) && (this.tickPositions = d = e);
                this.paddedTicks = d.slice(0);
                this.trimTicks(d, g, c);
                this.isLinked || (this.single && 2 > d.length && (this.min -= .5, this.max += .5), b || e || this.adjustTickAmount())
            },
            trimTicks: function(a, d, b) {
                var k = a[0],
                    e = a[a.length - 1],
                    g = this.minPointOffset || 0;
                if (!this.isLinked) {
                    if (d && -Infinity !== k) this.min = k;
                    else
                        for (; this.min - g > a[0];) a.shift(); if (b) this.max = e;
                    else
                        for (; this.max + g < a[a.length - 1];) a.pop();
                    0 === a.length && r(k) && !this.options.tickPositions && a.push((e + k) / 2)
                }
            },
            alignToOthers: function() {
                var a = {}, d, b = this.options;
                !1 === this.chart.options.chart.alignTicks || !1 === b.alignTicks || this.isLog || f(this.chart[this.coll], function(k) {
                    var b = k.options,
                        b = [k.horiz ? b.left : b.top, b.width, b.height, b.pane].join();
                    k.series.length && (a[b] ? d = !0 : a[b] = 1)
                });
                return d
            },
            getTickAmount: function() {
                var a = this.options,
                    d = a.tickAmount,
                    b = a.tickPixelInterval;
                !r(a.tickInterval) && this.len < b && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (d = 2);
                !d && this.alignToOthers() && (d = Math.ceil(this.len / b) + 1);
                4 > d && (this.finalTickAmt =
                    d, d = 5);
                this.tickAmount = d
            },
            adjustTickAmount: function() {
                var a = this.tickInterval,
                    d = this.tickPositions,
                    b = this.tickAmount,
                    e = this.finalTickAmt,
                    g = d && d.length,
                    c = H(this.threshold, this.softThreshold ? 0 : null);
                if (this.hasData()) {
                    if (g < b) {
                        for (; d.length < b;) d.length % 2 || this.min === c ? d.push(h(d[d.length - 1] + a)) : d.unshift(h(d[0] - a));
                        this.transA *= (g - 1) / (b - 1);
                        this.min = d[0];
                        this.max = d[d.length - 1]
                    } else g > b && (this.tickInterval *= 2, this.setTickPositions()); if (r(e)) {
                        for (a = b = d.length; a--;)(3 === e && 1 === a % 2 || 2 >= e && 0 < a && a < b - 1) && d.splice(a,
                            1);
                        this.finalTickAmt = void 0
                    }
                }
            },
            setScale: function() {
                var a, d;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                d = this.len !== this.oldAxisLength;
                f(this.series, function(d) {
                    if (d.isDirtyData || d.isDirty || d.xAxis.isDirty) a = !0
                });
                d || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin =
                    this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = d || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
            },
            setExtremes: function(a, d, b, e, g) {
                var k = this,
                    y = k.chart;
                b = H(b, !0);
                f(k.series, function(a) {
                    delete a.kdTree
                });
                g = c(g, {
                    min: a,
                    max: d
                });
                l(k, "setExtremes", g, function() {
                    k.userMin = a;
                    k.userMax = d;
                    k.eventArgs = g;
                    b && y.redraw(e)
                })
            },
            zoom: function(a, d) {
                var k = this.dataMin,
                    b = this.dataMax,
                    e = this.options,
                    g = Math.min(k, H(e.min, k)),
                    e = Math.max(b, H(e.max, b));
                if (a !== this.min ||
                    d !== this.max) this.allowZoomOutside || (r(k) && (a < g && (a = g), a > e && (a = e)), r(b) && (d < g && (d = g), d > e && (d = e))), this.displayBtn = void 0 !== a || void 0 !== d, this.setExtremes(a, d, !1, void 0, {
                    trigger: "zoom"
                });
                return !0
            },
            setAxisSize: function() {
                var d = this.chart,
                    b = this.options,
                    e = b.offsets || [0, 0, 0, 0],
                    g = this.horiz,
                    c = this.width = Math.round(a.relativeLength(H(b.width, d.plotWidth - e[3] + e[1]), d.plotWidth)),
                    y = this.height = Math.round(a.relativeLength(H(b.height, d.plotHeight - e[0] + e[2]), d.plotHeight)),
                    m = this.top = Math.round(a.relativeLength(H(b.top,
                        d.plotTop + e[0]), d.plotHeight, d.plotTop)),
                    b = this.left = Math.round(a.relativeLength(H(b.left, d.plotLeft + e[3]), d.plotWidth, d.plotLeft));
                this.bottom = d.chartHeight - y - m;
                this.right = d.chartWidth - c - b;
                this.len = Math.max(g ? c : y, 0);
                this.pos = g ? b : m
            },
            getExtremes: function() {
                var a = this.isLog,
                    d = this.lin2log;
                return {
                    min: a ? h(d(this.min)) : this.min,
                    max: a ? h(d(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function(a) {
                var d = this.isLog,
                    k = this.lin2log,
                    b = d ?
                        k(this.min) : this.min,
                    d = d ? k(this.max) : this.max;
                null === a ? a = b : b > a ? a = b : d < a && (a = d);
                return this.translate(a, 0, 1, 0, 1)
            },
            autoLabelAlign: function(a) {
                a = (H(a, 0) - 90 * this.side + 720) % 360;
                return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
            },
            tickSize: function(a) {
                var d = this.options,
                    k = d[a + "Length"],
                    b = H(d[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                if (b && k) return "inside" === d[a + "Position"] && (k = -k), [k, b]
            },
            labelMetrics: function() {
                var a = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style &&
                    this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
            },
            unsquish: function() {
                var a = this.options.labels,
                    d = this.horiz,
                    b = this.tickInterval,
                    e = b,
                    g = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / b),
                    c, y = a.rotation,
                    m = this.labelMetrics(),
                    v, t = Number.MAX_VALUE,
                    p, w = function(a) {
                        a /= g || 1;
                        a = 1 < a ? Math.ceil(a) : 1;
                        return a * b
                    };
                d ? (p = !a.staggerLines && !a.step && (r(y) ? [y] : g < H(a.autoRotationLimit, 80) && a.autoRotation)) && f(p, function(a) {
                    var d;
                    if (a === y || a && -90 <= a && 90 >= a) v = w(Math.abs(m.h / Math.sin(u * a))), d = v +
                        Math.abs(a / 360), d < t && (t = d, c = a, e = v)
                }) : a.step || (e = w(m.h));
                this.autoRotation = p;
                this.labelRotation = H(c, y);
                return e
            },
            getSlotWidth: function() {
                var a = this.chart,
                    d = this.horiz,
                    b = this.options.labels,
                    e = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    g = a.margin[3];
                return d && 2 > (b.step || 0) && !b.rotation && (this.staggerLines || 1) * this.len / e || !d && (b.style && parseInt(b.style.width, 10) || g && g - a.spacing[3] || .33 * a.chartWidth)
            },
            renderUnsquish: function() {
                var a = this.chart,
                    d = a.renderer,
                    b = this.tickPositions,
                    e = this.ticks,
                    g = this.options.labels,
                    c = this.horiz,
                    y = this.getSlotWidth(),
                    m = Math.max(1, Math.round(y - 2 * (g.padding || 5))),
                    v = {}, t = this.labelMetrics(),
                    p = g.style && g.style.textOverflow,
                    w, z, F = 0,
                    I;
                E(g.rotation) || (v.rotation = g.rotation || 0);
                f(b, function(a) {
                    (a = e[a]) && a.label && a.label.textPxLength > F && (F = a.label.textPxLength)
                });
                this.maxLabelLength = F;
                if (this.autoRotation) F > m && F > t.h ? v.rotation = this.labelRotation : this.labelRotation = 0;
                else if (y && (w = m, !p))
                    for (z = "clip", m = b.length; !c && m--;)
                        if (I = b[m], I = e[I].label) I.styles && "ellipsis" ===
                            I.styles.textOverflow ? I.css({
                                textOverflow: "clip"
                            }) : I.textPxLength > y && I.css({
                                width: y + "px"
                            }), I.getBBox().height > this.len / b.length - (t.h - t.f) && (I.specificTextOverflow = "ellipsis");
                v.rotation && (w = F > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight, p || (z = "ellipsis"));
                if (this.labelAlign = g.align || this.autoLabelAlign(this.labelRotation)) v.align = this.labelAlign;
                f(b, function(a) {
                    var d = (a = e[a]) && a.label;
                    d && (d.attr(v), !w || g.style && g.style.width || !(w < d.textPxLength || "SPAN" === d.element.tagName) || d.css({
                        width: w,
                        textOverflow: d.specificTextOverflow || z
                    }), delete d.specificTextOverflow, a.rotation = v.rotation)
                });
                this.tickRotCorr = d.rotCorr(t.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function() {
                return this.hasVisibleSeries || r(this.min) && r(this.max) && this.tickPositions && 0 < this.tickPositions.length
            },
            addTitle: function(a) {
                var d = this.chart.renderer,
                    b = this.horiz,
                    k = this.opposite,
                    e = this.options.title,
                    g;
                this.axisTitle || ((g = e.textAlign) || (g = (b ? {
                        low: "left",
                        middle: "center",
                        high: "right"
                    } : {
                        low: k ? "right" : "left",
                        middle: "center",
                        high: k ? "left" : "right"
                    })[e.align]),
                    this.axisTitle = d.text(e.text, 0, 0, e.useHTML).attr({
                        zIndex: 7,
                        rotation: e.rotation || 0,
                        align: g
                    }).addClass("highcharts-axis-title").css(e.style).add(this.axisGroup), this.axisTitle.isNew = !0);
                e.style.width || this.isRadial || this.axisTitle.css({
                    width: this.len
                });
                this.axisTitle[a ? "show" : "hide"](!0)
            },
            generateTick: function(a) {
                var d = this.ticks;
                d[a] ? d[a].addLabel() : d[a] = new y(this, a)
            },
            getOffset: function() {
                var a = this,
                    d = a.chart,
                    b = d.renderer,
                    e = a.options,
                    g = a.tickPositions,
                    c = a.ticks,
                    y = a.horiz,
                    m = a.side,
                    v = d.inverted && !a.isZAxis ? [1, 0, 3, 2][m] : m,
                    p, w, z = 0,
                    F, I = 0,
                    l = e.title,
                    E = e.labels,
                    K = 0,
                    h = d.axisOffset,
                    d = d.clipOffset,
                    n = [-1, 1, 1, -1][m],
                    A = e.className,
                    u = a.axisParent,
                    x = this.tickSize("tick");
                p = a.hasData();
                a.showAxis = w = p || H(e.showEmpty, !0);
                a.staggerLines = a.horiz && E.staggerLines;
                a.axisGroup || (a.gridGroup = b.g("grid").attr({
                        zIndex: e.gridZIndex || 1
                    }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (A || "")).add(u), a.axisGroup = b.g("axis").attr({
                        zIndex: e.zIndex || 2
                    }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (A || "")).add(u), a.labelGroup =
                    b.g("axis-labels").attr({
                        zIndex: E.zIndex || 7
                    }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (A || "")).add(u));
                p || a.isLinked ? (f(g, function(d, b) {
                    a.generateTick(d, b)
                }), a.renderUnsquish(), a.reserveSpaceDefault = 0 === m || 2 === m || {
                    1: "left",
                    3: "right"
                }[m] === a.labelAlign, H(E.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) && f(g, function(a) {
                    K = Math.max(c[a].getLabelSize(), K)
                }), a.staggerLines && (K *= a.staggerLines), a.labelOffset = K * (a.opposite ? -1 : 1)) : t(c, function(a, d) {
                    a.destroy();
                    delete c[d]
                });
                l && l.text && !1 !== l.enabled && (a.addTitle(w), w && !1 !== l.reserveSpace && (a.titleOffset = z = a.axisTitle.getBBox()[y ? "height" : "width"], F = l.offset, I = r(F) ? 0 : H(l.margin, y ? 5 : 10)));
                a.renderLine();
                a.offset = n * H(e.offset, h[m]);
                a.tickRotCorr = a.tickRotCorr || {
                    x: 0,
                    y: 0
                };
                b = 0 === m ? -a.labelMetrics().h : 2 === m ? a.tickRotCorr.y : 0;
                I = Math.abs(K) + I;
                K && (I = I - b + n * (y ? H(E.y, a.tickRotCorr.y + 8 * n) : E.x));
                a.axisTitleMargin = H(F, I);
                h[m] = Math.max(h[m], a.axisTitleMargin + z + n * a.offset, I, p && g.length && x ? x[0] + n * a.offset : 0);
                e = e.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() /
                    2);
                d[v] = Math.max(d[v], e)
            },
            getLinePath: function(a) {
                var d = this.chart,
                    b = this.opposite,
                    k = this.offset,
                    e = this.horiz,
                    g = this.left + (b ? this.width : 0) + k,
                    k = d.chartHeight - this.bottom - (b ? this.height : 0) + k;
                b && (a *= -1);
                return d.renderer.crispLine(["M", e ? this.left : g, e ? k : this.top, "L", e ? d.chartWidth - this.right : g, e ? k : d.chartHeight - this.bottom], a)
            },
            renderLine: function() {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                }))
            },
            getTitlePosition: function() {
                var a = this.horiz,
                    d = this.left,
                    b = this.top,
                    e = this.len,
                    g = this.options.title,
                    c = a ? d : b,
                    y = this.opposite,
                    m = this.offset,
                    v = g.x || 0,
                    f = g.y || 0,
                    t = this.axisTitle,
                    p = this.chart.renderer.fontMetrics(g.style && g.style.fontSize, t),
                    t = Math.max(t.getBBox(null, 0).height - p.h - 1, 0),
                    e = {
                        low: c + (a ? 0 : e),
                        middle: c + e / 2,
                        high: c + (a ? e : 0)
                    }[g.align],
                    d = (a ? b + this.height : d) + (a ? 1 : -1) * (y ? -1 : 1) * this.axisTitleMargin + [-t, t, p.f, -t][this.side];
                return {
                    x: a ? e + v : d + (y ? this.width :
                        0) + m + v,
                    y: a ? d + f - (y ? this.height : 0) + m : e + f
                }
            },
            renderMinorTick: function(a) {
                var d = this.chart.hasRendered && w(this.oldMin),
                    b = this.minorTicks;
                b[a] || (b[a] = new y(this, a, "minor"));
                d && b[a].isNew && b[a].render(null, !0);
                b[a].render(null, !1, 1)
            },
            renderTick: function(a, d) {
                var b = this.isLinked,
                    k = this.ticks,
                    e = this.chart.hasRendered && w(this.oldMin);
                if (!b || a >= this.min && a <= this.max) k[a] || (k[a] = new y(this, a)), e && k[a].isNew && k[a].render(d, !0, .1), k[a].render(d)
            },
            render: function() {
                var b = this,
                    e = b.chart,
                    g = b.options,
                    c = b.isLog,
                    m = b.lin2log,
                    v = b.isLinked,
                    p = b.tickPositions,
                    z = b.axisTitle,
                    F = b.ticks,
                    I = b.minorTicks,
                    l = b.alternateBands,
                    E = g.stackLabels,
                    K = g.alternateGridColor,
                    H = b.tickmarkOffset,
                    h = b.axisLine,
                    n = b.showAxis,
                    r = G(e.renderer.globalAnimation),
                    A, u;
                b.labelEdge.length = 0;
                b.overlap = !1;
                f([F, I, l], function(a) {
                    t(a, function(a) {
                        a.isActive = !1
                    })
                });
                if (b.hasData() || v) b.minorTickInterval && !b.categories && f(b.getMinorTickPositions(), function(a) {
                    b.renderMinorTick(a)
                }), p.length && (f(p, function(a, d) {
                    b.renderTick(a, d)
                }), H && (0 === b.min || b.single) && (F[-1] || (F[-1] =
                    new y(b, -1, null, !0)), F[-1].render(-1))), K && f(p, function(d, k) {
                    u = void 0 !== p[k + 1] ? p[k + 1] + H : b.max - H;
                    0 === k % 2 && d < b.max && u <= b.max + (e.polar ? -H : H) && (l[d] || (l[d] = new a.PlotLineOrBand(b)), A = d + H, l[d].options = {
                        from: c ? m(A) : A,
                        to: c ? m(u) : u,
                        color: K
                    }, l[d].render(), l[d].isActive = !0)
                }), b._addedPlotLB || (f((g.plotLines || []).concat(g.plotBands || []), function(a) {
                    b.addPlotBandOrLine(a)
                }), b._addedPlotLB = !0);
                f([F, I, l], function(a) {
                    var b, k = [],
                        g = r.duration;
                    t(a, function(a, d) {
                        a.isActive || (a.render(d, !1, 0), a.isActive = !1, k.push(d))
                    });
                    d(function() {
                        for (b = k.length; b--;) a[k[b]] && !a[k[b]].isActive && (a[k[b]].destroy(), delete a[k[b]])
                    }, a !== l && e.hasRendered && g ? g : 0)
                });
                h && (h[h.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(h.strokeWidth())
                }), h.isPlaced = !0, h[n ? "show" : "hide"](!0));
                z && n && (g = b.getTitlePosition(), w(g.y) ? (z[z.isNew ? "attr" : "animate"](g), z.isNew = !1) : (z.attr("y", -9999), z.isNew = !0));
                E && E.enabled && b.renderStackTotals();
                b.isDirty = !1
            },
            redraw: function() {
                this.visible && (this.render(), f(this.plotLinesAndBands, function(a) {
                    a.render()
                }));
                f(this.series, function(a) {
                    a.isDirty = !0
                })
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function(a) {
                var d = this,
                    b = d.stacks,
                    k = d.plotLinesAndBands,
                    e;
                a || I(d);
                t(b, function(a, d) {
                    A(a);
                    b[d] = null
                });
                f([d.ticks, d.minorTicks, d.alternateBands], function(a) {
                    A(a)
                });
                if (k)
                    for (a = k.length; a--;) k[a].destroy();
                f("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "), function(a) {
                    d[a] && (d[a] = d[a].destroy())
                });
                for (e in d.plotLinesAndBandsGroups) d.plotLinesAndBandsGroups[e] =
                    d.plotLinesAndBandsGroups[e].destroy();
                t(d, function(a, b) {
                    -1 === v(b, d.keepProps) && delete d[b]
                })
            },
            drawCrosshair: function(a, d) {
                var b, e = this.crosshair,
                    k = H(e.snap, !0),
                    g, c = this.cross;
                a || (a = this.cross && this.cross.e);
                this.crosshair && !1 !== (r(d) || !k) ? (k ? r(d) && (g = this.isXAxis ? d.plotX : this.len - d.plotY) : g = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos), r(g) && (b = this.getPlotLinePath(d && (this.isXAxis ? d.x : H(d.stackY, d.y)), null, null, null, g) || null), r(b) ? (d = this.categories && !this.isRadial, c || (this.cross =
                    c = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (d ? "category " : "thin ") + e.className).attr({
                        zIndex: H(e.zIndex, 2)
                    }).add(), c.attr({
                        stroke: e.color || (d ? n("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                        "stroke-width": H(e.width, 1)
                    }).css({
                        "pointer-events": "none"
                    }), e.dashStyle && c.attr({
                        dashstyle: e.dashStyle
                    })), c.show().attr({
                    d: b
                }), d && !e.width && c.attr({
                    "stroke-width": this.transA
                }), this.cross.e = a) : this.hideCrosshair()) : this.hideCrosshair()
            },
            hideCrosshair: function() {
                this.cross &&
                    this.cross.hide()
            }
        });
        return a.Axis = F
    }(L);
    (function(a) {
        var C = a.Axis,
            G = a.getMagnitude,
            D = a.normalizeTickInterval,
            q = a.timeUnits;
        C.prototype.getTimeTicks = function() {
            return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
        };
        C.prototype.normalizeTimeTickInterval = function(a, h) {
            var n = h || [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1, 2]],
                ["week", [1, 2]],
                ["month", [1, 2, 3, 4, 6]],
                ["year", null]
            ];
            h = n[n.length -
                1];
            var r = q[h[0]],
                u = h[1],
                A;
            for (A = 0; A < n.length && !(h = n[A], r = q[h[0]], u = h[1], n[A + 1] && a <= (r * u[u.length - 1] + q[n[A + 1][0]]) / 2); A++);
            r === q.year && a < 5 * r && (u = [1, 2, 5]);
            a = D(a / r, u, "year" === h[0] ? Math.max(G(a / r), 1) : 1);
            return {
                unitRange: r,
                count: a,
                unitName: h[0]
            }
        }
    })(L);
    (function(a) {
        var C = a.Axis,
            G = a.getMagnitude,
            D = a.map,
            q = a.normalizeTickInterval,
            n = a.pick;
        C.prototype.getLogTickPositions = function(a, x, r, u) {
            var h = this.options,
                f = this.len,
                c = this.lin2log,
                l = this.log2lin,
                b = [];
            u || (this._minorAutoInterval = null);
            if (.5 <= a) a = Math.round(a),
            b = this.getLinearTickPositions(a, x, r);
            else if (.08 <= a)
                for (var f = Math.floor(x), g, p, v, e, w, h = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; f < r + 1 && !w; f++)
                    for (p = h.length, g = 0; g < p && !w; g++) v = l(c(f) * h[g]), v > x && (!u || e <= r) && void 0 !== e && b.push(e), e > r && (w = !0), e = v;
            else x = c(x), r = c(r), a = u ? this.getMinorTickInterval() : h.tickInterval, a = n("auto" === a ? null : a, this._minorAutoInterval, h.tickPixelInterval / (u ? 5 : 1) * (r - x) / ((u ? f / this.tickPositions.length : f) || 1)), a = q(a, null, G(a)), b = D(this.getLinearTickPositions(a, x, r), l), u ||
                (this._minorAutoInterval = a / 5);
            u || (this.tickInterval = a);
            return b
        };
        C.prototype.log2lin = function(a) {
            return Math.log(a) / Math.LN10
        };
        C.prototype.lin2log = function(a) {
            return Math.pow(10, a)
        }
    })(L);
    (function(a, C) {
        var G = a.arrayMax,
            D = a.arrayMin,
            q = a.defined,
            n = a.destroyObjectProperties,
            h = a.each,
            x = a.erase,
            r = a.merge,
            u = a.pick;
        a.PlotLineOrBand = function(a, f) {
            this.axis = a;
            f && (this.options = f, this.id = f.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function() {
                var h = this,
                    f = h.axis,
                    c = f.horiz,
                    l = h.options,
                    b = l.label,
                    g = h.label,
                    p = l.to,
                    v = l.from,
                    e = l.value,
                    w = q(v) && q(p),
                    E = q(e),
                    m = h.svgElem,
                    z = !m,
                    t = [],
                    H = l.color,
                    I = u(l.zIndex, 0),
                    K = l.events,
                    t = {
                        "class": "highcharts-plot-" + (w ? "band " : "line ") + (l.className || "")
                    }, d = {}, y = f.chart.renderer,
                    F = w ? "bands" : "lines",
                    k = f.log2lin;
                f.isLog && (v = k(v), p = k(p), e = k(e));
                E ? (t = {
                    stroke: H,
                    "stroke-width": l.width
                }, l.dashStyle && (t.dashstyle = l.dashStyle)) : w && (H && (t.fill = H), l.borderWidth && (t.stroke = l.borderColor, t["stroke-width"] = l.borderWidth));
                d.zIndex = I;
                F += "-" + I;
                (H = f.plotLinesAndBandsGroups[F]) || (f.plotLinesAndBandsGroups[F] =
                    H = y.g("plot-" + F).attr(d).add());
                z && (h.svgElem = m = y.path().attr(t).add(H));
                if (E) t = f.getPlotLinePath(e, m.strokeWidth());
                else if (w) t = f.getPlotBandPath(v, p, l);
                else return;
                z && t && t.length ? (m.attr({
                    d: t
                }), K && a.objectEach(K, function(a, d) {
                    m.on(d, function(a) {
                        K[d].apply(h, [a])
                    })
                })) : m && (t ? (m.show(), m.animate({
                    d: t
                })) : (m.hide(), g && (h.label = g = g.destroy())));
                b && q(b.text) && t && t.length && 0 < f.width && 0 < f.height && !t.flat ? (b = r({
                    align: c && w && "center",
                    x: c ? !w && 4 : 10,
                    verticalAlign: !c && w && "middle",
                    y: c ? w ? 16 : 10 : w ? 6 : -4,
                    rotation: c && !w && 90
                }, b), this.renderLabel(b, t, w, I)) : g && g.hide();
                return h
            },
            renderLabel: function(a, f, c, l) {
                var b = this.label,
                    g = this.axis.chart.renderer;
                b || (b = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (c ? "band" : "line") + "-label " + (a.className || "")
                }, b.zIndex = l, this.label = b = g.text(a.text, 0, 0, a.useHTML).attr(b).add(), b.css(a.style));
                l = f.xBounds || [f[1], f[4], c ? f[6] : f[1]];
                f = f.yBounds || [f[2], f[5], c ? f[7] : f[2]];
                c = D(l);
                g = D(f);
                b.align(a, !1, {
                    x: c,
                    y: g,
                    width: G(l) - c,
                    height: G(f) - g
                });
                b.show()
            },
            destroy: function() {
                x(this.axis.plotLinesAndBands,
                    this);
                delete this.axis;
                n(this)
            }
        };
        a.extend(C.prototype, {
            getPlotBandPath: function(a, f) {
                var c = this.getPlotLinePath(f, null, null, !0),
                    l = this.getPlotLinePath(a, null, null, !0),
                    b = [],
                    g = this.horiz,
                    p = 1,
                    v;
                a = a < this.min && f < this.min || a > this.max && f > this.max;
                if (l && c)
                    for (a && (v = l.toString() === c.toString(), p = 0), a = 0; a < l.length; a += 6) g && c[a + 1] === l[a + 1] ? (c[a + 1] += p, c[a + 4] += p) : g || c[a + 2] !== l[a + 2] || (c[a + 2] += p, c[a + 5] += p), b.push("M", l[a + 1], l[a + 2], "L", l[a + 4], l[a + 5], c[a + 4], c[a + 5], c[a + 1], c[a + 2], "z"), b.flat = v;
                return b
            },
            addPlotBand: function(a) {
                return this.addPlotBandOrLine(a,
                    "plotBands")
            },
            addPlotLine: function(a) {
                return this.addPlotBandOrLine(a, "plotLines")
            },
            addPlotBandOrLine: function(h, f) {
                var c = (new a.PlotLineOrBand(this, h)).render(),
                    l = this.userOptions;
                c && (f && (l[f] = l[f] || [], l[f].push(h)), this.plotLinesAndBands.push(c));
                return c
            },
            removePlotBandOrLine: function(a) {
                for (var f = this.plotLinesAndBands, c = this.options, l = this.userOptions, b = f.length; b--;) f[b].id === a && f[b].destroy();
                h([c.plotLines || [], l.plotLines || [], c.plotBands || [], l.plotBands || []], function(g) {
                    for (b = g.length; b--;) g[b].id ===
                        a && x(g, g[b])
                })
            },
            removePlotBand: function(a) {
                this.removePlotBandOrLine(a)
            },
            removePlotLine: function(a) {
                this.removePlotBandOrLine(a)
            }
        })
    })(L, da);
    (function(a) {
        var C = a.each,
            G = a.extend,
            D = a.format,
            q = a.isNumber,
            n = a.map,
            h = a.merge,
            x = a.pick,
            r = a.splat,
            u = a.syncTimeout,
            A = a.timeUnits;
        a.Tooltip = function() {
            this.init.apply(this, arguments)
        };
        a.Tooltip.prototype = {
            init: function(a, c) {
                this.chart = a;
                this.options = c;
                this.crosshairs = [];
                this.now = {
                    x: 0,
                    y: 0
                };
                this.isHidden = !0;
                this.split = c.split && !a.inverted;
                this.shared = c.shared || this.split
            },
            cleanSplit: function(a) {
                C(this.chart.series, function(c) {
                    var f = c && c.tt;
                    f && (!f.isActive || a ? c.tt = f.destroy() : f.isActive = !1)
                })
            },
            getLabel: function() {
                var a = this.chart.renderer,
                    c = this.options;
                this.label || (this.split ? this.label = a.g("tooltip") : (this.label = a.label("", 0, 0, c.shape || "callout", null, null, c.useHTML, null, "tooltip").attr({
                    padding: c.padding,
                    r: c.borderRadius
                }), this.label.attr({
                    fill: c.backgroundColor,
                    "stroke-width": c.borderWidth
                }).css(c.style).shadow(c.shadow)), this.label.attr({
                    zIndex: 8
                }).add());
                return this.label
            },
            update: function(a) {
                this.destroy();
                h(!0, this.chart.options.tooltip.userOptions, a);
                this.init(this.chart, h(!0, this.options, a))
            },
            destroy: function() {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                clearTimeout(this.hideTimer);
                clearTimeout(this.tooltipTimeout)
            },
            move: function(a, c, l, b) {
                var g = this,
                    p = g.now,
                    v = !1 !== g.options.animation && !g.isHidden && (1 < Math.abs(a - p.x) || 1 < Math.abs(c - p.y)),
                    e = g.followPointer || 1 < g.len;
                G(p, {
                    x: v ? (2 * p.x + a) / 3 : a,
                    y: v ? (p.y + c) / 2 : c,
                    anchorX: e ? void 0 : v ? (2 * p.anchorX + l) / 3 : l,
                    anchorY: e ? void 0 : v ? (p.anchorY + b) / 2 : b
                });
                g.getLabel().attr(p);
                v && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
                    g && g.move(a, c, l, b)
                }, 32))
            },
            hide: function(a) {
                var c = this;
                clearTimeout(this.hideTimer);
                a = x(a, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = u(function() {
                    c.getLabel()[a ? "fadeOut" : "hide"]();
                    c.isHidden = !0
                }, a))
            },
            getAnchor: function(a, c) {
                var f, b = this.chart,
                    g = b.inverted,
                    p = b.plotTop,
                    v = b.plotLeft,
                    e = 0,
                    w =
                        0,
                    E, m;
                a = r(a);
                f = a[0].tooltipPos;
                this.followPointer && c && (void 0 === c.chartX && (c = b.pointer.normalize(c)), f = [c.chartX - b.plotLeft, c.chartY - p]);
                f || (C(a, function(a) {
                    E = a.series.yAxis;
                    m = a.series.xAxis;
                    e += a.plotX + (!g && m ? m.left - v : 0);
                    w += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!g && E ? E.top - p : 0)
                }), e /= a.length, w /= a.length, f = [g ? b.plotWidth - w : e, this.shared && !g && 1 < a.length && c ? c.chartY - p : g ? b.plotHeight - e : w]);
                return n(f, Math.round)
            },
            getPosition: function(a, c, l) {
                var b = this.chart,
                    g = this.distance,
                    p = {}, v = b.inverted &&
                        l.h || 0,
                    e, f = ["y", b.chartHeight, c, l.plotY + b.plotTop, b.plotTop, b.plotTop + b.plotHeight],
                    E = ["x", b.chartWidth, a, l.plotX + b.plotLeft, b.plotLeft, b.plotLeft + b.plotWidth],
                    m = !this.followPointer && x(l.ttBelow, !b.inverted === !! l.negative),
                    z = function(a, d, b, e, k, c) {
                        var y = b < e - g,
                            t = e + g + b < d,
                            f = e - g - b;
                        e += g;
                        if (m && t) p[a] = e;
                        else if (!m && y) p[a] = f;
                        else if (y) p[a] = Math.min(c - b, 0 > f - v ? f : f - v);
                        else if (t) p[a] = Math.max(k, e + v + b > d ? e : e + v);
                        else return !1
                    }, t = function(a, d, b, e) {
                        var k;
                        e < g || e > d - g ? k = !1 : p[a] = e < b / 2 ? 1 : e > d - b / 2 ? d - b - 2 : e - b / 2;
                        return k
                    }, H =
                        function(a) {
                            var d = f;
                            f = E;
                            E = d;
                            e = a
                    }, I = function() {
                        !1 !== z.apply(0, f) ? !1 !== t.apply(0, E) || e || (H(!0), I()) : e ? p.x = p.y = 0 : (H(!0), I())
                    };
                (b.inverted || 1 < this.len) && H();
                I();
                return p
            },
            defaultFormatter: function(a) {
                var c = this.points || r(this),
                    f;
                f = [a.tooltipFooterHeaderFormatter(c[0])];
                f = f.concat(a.bodyFormatter(c));
                f.push(a.tooltipFooterHeaderFormatter(c[0], !0));
                return f
            },
            refresh: function(a, c) {
                var f, b = this.options,
                    g, p = a,
                    v, e = {}, w = [];
                f = b.formatter || this.defaultFormatter;
                var e = this.shared,
                    E;
                b.enabled && (clearTimeout(this.hideTimer),
                    this.followPointer = r(p)[0].series.tooltipOptions.followPointer, v = this.getAnchor(p, c), c = v[0], g = v[1], !e || p.series && p.series.noSharedTooltip ? e = p.getLabelConfig() : (C(p, function(a) {
                        a.setState("hover");
                        w.push(a.getLabelConfig())
                    }), e = {
                        x: p[0].category,
                        y: p[0].y
                    }, e.points = w, p = p[0]), this.len = w.length, e = f.call(e, this), E = p.series, this.distance = x(E.tooltipOptions.distance, 16), !1 === e ? this.hide() : (f = this.getLabel(), this.isHidden && f.attr({
                        opacity: 1
                    }).show(), this.split ? this.renderSplit(e, r(a)) : (b.style.width || f.css({
                            width: this.chart.spacingBox.width
                        }),
                        f.attr({
                            text: e && e.join ? e.join("") : e
                        }), f.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + x(p.colorIndex, E.colorIndex)), f.attr({
                            stroke: b.borderColor || p.color || E.color || "#666666"
                        }), this.updatePosition({
                            plotX: c,
                            plotY: g,
                            negative: p.negative,
                            ttBelow: p.ttBelow,
                            h: v[2] || 0
                        })), this.isHidden = !1))
            },
            renderSplit: function(f, c) {
                var l = this,
                    b = [],
                    g = this.chart,
                    p = g.renderer,
                    v = !0,
                    e = this.options,
                    w = 0,
                    E = this.getLabel();
                a.isString(f) && (f = [!1, f]);
                C(f.slice(0, c.length + 1), function(a, f) {
                    if (!1 !== a) {
                        f = c[f - 1] || {
                            isHeader: !0,
                            plotX: c[0].plotX
                        };
                        var m = f.series || l,
                            z = m.tt,
                            I = f.series || {}, K = "highcharts-color-" + x(f.colorIndex, I.colorIndex, "none");
                        z || (m.tt = z = p.label(null, null, null, "callout", null, null, e.useHTML).addClass("highcharts-tooltip-box " + K).attr({
                            padding: e.padding,
                            r: e.borderRadius,
                            fill: e.backgroundColor,
                            stroke: e.borderColor || f.color || I.color || "#333333",
                            "stroke-width": e.borderWidth
                        }).add(E));
                        z.isActive = !0;
                        z.attr({
                            text: a
                        });
                        z.css(e.style).shadow(e.shadow);
                        a = z.getBBox();
                        I = a.width + z.strokeWidth();
                        f.isHeader ? (w =
                            a.height, I = Math.max(0, Math.min(f.plotX + g.plotLeft - I / 2, g.chartWidth - I))) : I = f.plotX + g.plotLeft - x(e.distance, 16) - I;
                        0 > I && (v = !1);
                        a = (f.series && f.series.yAxis && f.series.yAxis.pos) + (f.plotY || 0);
                        a -= g.plotTop;
                        b.push({
                            target: f.isHeader ? g.plotHeight + w : a,
                            rank: f.isHeader ? 1 : 0,
                            size: m.tt.getBBox().height + 1,
                            point: f,
                            x: I,
                            tt: z
                        })
                    }
                });
                this.cleanSplit();
                a.distribute(b, g.plotHeight + w);
                C(b, function(a) {
                    var b = a.point,
                        c = b.series;
                    a.tt.attr({
                        visibility: void 0 === a.pos ? "hidden" : "inherit",
                        x: v || b.isHeader ? a.x : b.plotX + g.plotLeft + x(e.distance,
                            16),
                        y: a.pos + g.plotTop,
                        anchorX: b.isHeader ? b.plotX + g.plotLeft : b.plotX + c.xAxis.pos,
                        anchorY: b.isHeader ? a.pos + g.plotTop - 15 : b.plotY + c.yAxis.pos
                    })
                })
            },
            updatePosition: function(a) {
                var c = this.chart,
                    f = this.getLabel(),
                    f = (this.options.positioner || this.getPosition).call(this, f.width, f.height, a);
                this.move(Math.round(f.x), Math.round(f.y || 0), a.plotX + c.plotLeft, a.plotY + c.plotTop)
            },
            getDateFormat: function(a, c, l, b) {
                var g = this.chart.time,
                    f = g.dateFormat("%m-%d %H:%M:%S.%L", c),
                    v, e, w = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    }, E = "millisecond";
                for (e in A) {
                    if (a === A.week && +g.dateFormat("%w", c) === l && "00:00:00.000" === f.substr(6)) {
                        e = "week";
                        break
                    }
                    if (A[e] > a) {
                        e = E;
                        break
                    }
                    if (w[e] && f.substr(w[e]) !== "01-01 00:00:00.000".substr(w[e])) break;
                    "week" !== e && (E = e)
                }
                e && (v = b[e]);
                return v
            },
            getXDateFormat: function(a, c, l) {
                c = c.dateTimeLabelFormats;
                var b = l && l.closestPointRange;
                return (b ? this.getDateFormat(b, a.x, l.options.startOfWeek, c) : c.day) || c.year
            },
            tooltipFooterHeaderFormatter: function(a, c) {
                c = c ? "footer" : "header";
                var f = a.series,
                    b = f.tooltipOptions,
                    g = b.xDateFormat,
                    p = f.xAxis,
                    v = p && "datetime" === p.options.type && q(a.key),
                    e = b[c + "Format"];
                v && !g && (g = this.getXDateFormat(a, b, p));
                v && g && C(a.point && a.point.tooltipDateKeys || ["key"], function(a) {
                    e = e.replace("{point." + a + "}", "{point." + a + ":" + g + "}")
                });
                return D(e, {
                    point: a,
                    series: f
                }, this.chart.time)
            },
            bodyFormatter: function(a) {
                return n(a, function(a) {
                    var c = a.series.tooltipOptions;
                    return (c[(a.point.formatPrefix || "point") + "Formatter"] || a.point.tooltipFormatter).call(a.point, c[(a.point.formatPrefix || "point") + "Format"])
                })
            }
        }
    })(L);
    (function(a) {
        var C = a.addEvent,
            G = a.attr,
            D = a.charts,
            q = a.color,
            n = a.css,
            h = a.defined,
            x = a.each,
            r = a.extend,
            u = a.find,
            A = a.fireEvent,
            f = a.isNumber,
            c = a.isObject,
            l = a.offset,
            b = a.pick,
            g = a.splat,
            p = a.Tooltip;
        a.Pointer = function(a, b) {
            this.init(a, b)
        };
        a.Pointer.prototype = {
            init: function(a, e) {
                this.options = e;
                this.chart = a;
                this.runChartClick = e.chart.events && !! e.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                p && (a.tooltip = new p(a, e.tooltip), this.followTouchMove = b(e.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            },
            zoomOption: function(a) {
                var e = this.chart,
                    g = e.options.chart,
                    c = g.zoomType || "",
                    e = e.inverted;
                /touch/.test(a.type) && (c = b(g.pinchType, c));
                this.zoomX = a = /x/.test(c);
                this.zoomY = c = /y/.test(c);
                this.zoomHor = a && !e || c && e;
                this.zoomVert = c && !e || a && e;
                this.hasZoom = a || c
            },
            normalize: function(a, b) {
                var e;
                e = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                b || (this.chartPosition = b = l(this.chart.container));
                return r(a, {
                    chartX: Math.round(e.pageX - b.left),
                    chartY: Math.round(e.pageY - b.top)
                })
            },
            getCoordinates: function(a) {
                var b = {
                    xAxis: [],
                    yAxis: []
                };
                x(this.chart.axes, function(e) {
                    b[e.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: e,
                        value: e.toValue(a[e.horiz ? "chartX" : "chartY"])
                    })
                });
                return b
            },
            findNearestKDPoint: function(a, b, g) {
                var e;
                x(a, function(a) {
                    var m = !(a.noSharedTooltip && b) && 0 > a.options.findNearestPointBy.indexOf("y");
                    a = a.searchPoint(g, m);
                    if ((m = c(a, !0)) && !(m = !c(e, !0))) var m = e.distX - a.distX,
                    f = e.dist - a.dist, p = (a.series.group && a.series.group.zIndex) - (e.series.group && e.series.group.zIndex), m = 0 < (0 !== m && b ? m : 0 !== f ? f : 0 !== p ? p : e.series.index >
                        a.series.index ? -1 : 1);
                    m && (e = a)
                });
                return e
            },
            getPointFromEvent: function(a) {
                a = a.target;
                for (var b; a && !b;) b = a.point, a = a.parentNode;
                return b
            },
            getChartCoordinatesFromPoint: function(a, e) {
                var g = a.series,
                    c = g.xAxis,
                    g = g.yAxis,
                    m = b(a.clientX, a.plotX);
                if (c && g) return e ? {
                    chartX: c.len + c.pos - m,
                    chartY: g.len + g.pos - a.plotY
                } : {
                    chartX: m + c.pos,
                    chartY: a.plotY + g.pos
                }
            },
            getHoverData: function(g, e, f, p, m, z, t) {
                var v, I = [],
                    w = t && t.isBoosting;
                p = !(!p || !g);
                t = e && !e.stickyTracking ? [e] : a.grep(f, function(a) {
                    return a.visible && !(!m && a.directTouch) &&
                        b(a.options.enableMouseTracking, !0) && a.stickyTracking
                });
                e = (v = p ? g : this.findNearestKDPoint(t, m, z)) && v.series;
                v && (m && !e.noSharedTooltip ? (t = a.grep(f, function(a) {
                    return a.visible && !(!m && a.directTouch) && b(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
                }), x(t, function(a) {
                    var d = u(a.points, function(a) {
                        return a.x === v.x && !a.isNull
                    });
                    c(d) && (w && (d = a.getPoint(d)), I.push(d))
                })) : I.push(v));
                return {
                    hoverPoint: v,
                    hoverSeries: e,
                    hoverPoints: I
                }
            },
            runPointActions: function(g, e) {
                var c = this.chart,
                    f = c.tooltip && c.tooltip.options.enabled ?
                        c.tooltip : void 0,
                    m = f ? f.shared : !1,
                    p = e || c.hoverPoint,
                    t = p && p.series || c.hoverSeries,
                    t = this.getHoverData(p, t, c.series, !! e || t && t.directTouch && this.isDirectTouch, m, g, {
                        isBoosting: c.isBoosting
                    }),
                    v, p = t.hoverPoint;
                v = t.hoverPoints;
                e = (t = t.hoverSeries) && t.tooltipOptions.followPointer;
                m = m && t && !t.noSharedTooltip;
                if (p && (p !== c.hoverPoint || f && f.isHidden)) {
                    x(c.hoverPoints || [], function(b) {
                        -1 === a.inArray(b, v) && b.setState()
                    });
                    x(v || [], function(a) {
                        a.setState("hover")
                    });
                    if (c.hoverSeries !== t) t.onMouseOver();
                    c.hoverPoint && c.hoverPoint.firePointEvent("mouseOut");
                    if (!p.series) return;
                    p.firePointEvent("mouseOver");
                    c.hoverPoints = v;
                    c.hoverPoint = p;
                    f && f.refresh(m ? v : p, g)
                } else e && f && !f.isHidden && (p = f.getAnchor([{}], g), f.updatePosition({
                    plotX: p[0],
                    plotY: p[1]
                }));
                this.unDocMouseMove || (this.unDocMouseMove = C(c.container.ownerDocument, "mousemove", function(b) {
                    var e = D[a.hoverChartIndex];
                    if (e) e.pointer.onDocumentMouseMove(b)
                }));
                x(c.axes, function(e) {
                    var c = b(e.crosshair.snap, !0),
                        d = c ? a.find(v, function(a) {
                            return a.series[e.coll] === e
                        }) : void 0;
                    d || !c ? e.drawCrosshair(g, d) : e.hideCrosshair()
                })
            },
            reset: function(a, b) {
                var e = this.chart,
                    c = e.hoverSeries,
                    m = e.hoverPoint,
                    f = e.hoverPoints,
                    p = e.tooltip,
                    v = p && p.shared ? f : m;
                a && v && x(g(v), function(b) {
                    b.series.isCartesian && void 0 === b.plotX && (a = !1)
                });
                if (a) p && v && (p.refresh(v), m && (m.setState(m.state, !0), x(e.axes, function(a) {
                    a.crosshair && a.drawCrosshair(null, m)
                })));
                else {
                    if (m) m.onMouseOut();
                    f && x(f, function(a) {
                        a.setState()
                    });
                    if (c) c.onMouseOut();
                    p && p.hide(b);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    x(e.axes, function(a) {
                        a.hideCrosshair()
                    });
                    this.hoverX =
                        e.hoverPoints = e.hoverPoint = null
                }
            },
            scaleGroups: function(a, b) {
                var e = this.chart,
                    g;
                x(e.series, function(c) {
                    g = a || c.getPlotBox();
                    c.xAxis && c.xAxis.zoomEnabled && c.group && (c.group.attr(g), c.markerGroup && (c.markerGroup.attr(g), c.markerGroup.clip(b ? e.clipRect : null)), c.dataLabelsGroup && c.dataLabelsGroup.attr(g))
                });
                e.clipRect.attr(b || e.clipBox)
            },
            dragStart: function(a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            },
            drag: function(a) {
                var b =
                    this.chart,
                    g = b.options.chart,
                    c = a.chartX,
                    m = a.chartY,
                    f = this.zoomHor,
                    p = this.zoomVert,
                    v = b.plotLeft,
                    I = b.plotTop,
                    l = b.plotWidth,
                    d = b.plotHeight,
                    y, F = this.selectionMarker,
                    k = this.mouseDownX,
                    B = this.mouseDownY,
                    h = g.panKey && a[g.panKey + "Key"];
                F && F.touch || (c < v ? c = v : c > v + l && (c = v + l), m < I ? m = I : m > I + d && (m = I + d), this.hasDragged = Math.sqrt(Math.pow(k - c, 2) + Math.pow(B - m, 2)), 10 < this.hasDragged && (y = b.isInsidePlot(k - v, B - I), b.hasCartesianSeries && (this.zoomX || this.zoomY) && y && !h && !F && (this.selectionMarker = F = b.renderer.rect(v, I, f ? 1 : l,
                    p ? 1 : d, 0).attr({
                    fill: g.selectionMarkerFill || q("#335cad").setOpacity(.25).get(),
                    "class": "highcharts-selection-marker",
                    zIndex: 7
                }).add()), F && f && (c -= k, F.attr({
                    width: Math.abs(c),
                    x: (0 < c ? 0 : c) + k
                })), F && p && (c = m - B, F.attr({
                    height: Math.abs(c),
                    y: (0 < c ? 0 : c) + B
                })), y && !F && g.panning && b.pan(a, g.panning)))
            },
            drop: function(a) {
                var b = this,
                    g = this.chart,
                    c = this.hasPinched;
                if (this.selectionMarker) {
                    var m = {
                        originalEvent: a,
                        xAxis: [],
                        yAxis: []
                    }, p = this.selectionMarker,
                        t = p.attr ? p.attr("x") : p.x,
                        v = p.attr ? p.attr("y") : p.y,
                        I = p.attr ? p.attr("width") :
                            p.width,
                        l = p.attr ? p.attr("height") : p.height,
                        d;
                    if (this.hasDragged || c) x(g.axes, function(e) {
                        if (e.zoomEnabled && h(e.min) && (c || b[{
                            xAxis: "zoomX",
                            yAxis: "zoomY"
                        }[e.coll]])) {
                            var g = e.horiz,
                                k = "touchend" === a.type ? e.minPixelPadding : 0,
                                y = e.toValue((g ? t : v) + k),
                                g = e.toValue((g ? t + I : v + l) - k);
                            m[e.coll].push({
                                axis: e,
                                min: Math.min(y, g),
                                max: Math.max(y, g)
                            });
                            d = !0
                        }
                    }), d && A(g, "selection", m, function(a) {
                        g.zoom(r(a, c ? {
                            animation: !1
                        } : null))
                    });
                    f(g.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    c && this.scaleGroups()
                }
                g && f(g.index) &&
                    (n(g.container, {
                    cursor: g._cursor
                }), g.cancelClick = 10 < this.hasDragged, g.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            },
            onContainerMouseDown: function(a) {
                2 !== a.button && (a = this.normalize(a), this.zoomOption(a), a.preventDefault && a.preventDefault(), this.dragStart(a))
            },
            onDocumentMouseUp: function(b) {
                D[a.hoverChartIndex] && D[a.hoverChartIndex].pointer.drop(b)
            },
            onDocumentMouseMove: function(a) {
                var b = this.chart,
                    g = this.chartPosition;
                a = this.normalize(a, g);
                !g || this.inClass(a.target, "highcharts-tracker") ||
                    b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
            },
            onContainerMouseLeave: function(b) {
                var e = D[a.hoverChartIndex];
                e && (b.relatedTarget || b.toElement) && (e.pointer.reset(), e.pointer.chartPosition = null)
            },
            onContainerMouseMove: function(b) {
                var e = this.chart;
                h(a.hoverChartIndex) && D[a.hoverChartIndex] && D[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = e.index);
                b = this.normalize(b);
                b.returnValue = !1;
                "mousedown" === e.mouseIsDown && this.drag(b);
                !this.inClass(b.target, "highcharts-tracker") && !e.isInsidePlot(b.chartX -
                    e.plotLeft, b.chartY - e.plotTop) || e.openMenu || this.runPointActions(b)
            },
            inClass: function(a, b) {
                for (var e; a;) {
                    if (e = G(a, "class")) {
                        if (-1 !== e.indexOf(b)) return !0;
                        if (-1 !== e.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            },
            onTrackerMouseOut: function(a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                this.isDirectTouch = !1;
                if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
            },
            onContainerClick: function(a) {
                var b = this.chart,
                    g = b.hoverPoint,
                    c = b.plotLeft,
                    m = b.plotTop;
                a = this.normalize(a);
                b.cancelClick || (g && this.inClass(a.target, "highcharts-tracker") ? (A(g.series, "click", r(a, {
                    point: g
                })), b.hoverPoint && g.firePointEvent("click", a)) : (r(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - c, a.chartY - m) && A(b, "click", a)))
            },
            setDOMEvents: function() {
                var b = this,
                    e = b.chart.container,
                    g = e.ownerDocument;
                e.onmousedown = function(a) {
                    b.onContainerMouseDown(a)
                };
                e.onmousemove = function(a) {
                    b.onContainerMouseMove(a)
                };
                e.onclick = function(a) {
                    b.onContainerClick(a)
                };
                this.unbindContainerMouseLeave = C(e, "mouseleave", b.onContainerMouseLeave);
                a.unbindDocumentMouseUp || (a.unbindDocumentMouseUp = C(g, "mouseup", b.onDocumentMouseUp));
                a.hasTouch && (e.ontouchstart = function(a) {
                    b.onContainerTouchStart(a)
                }, e.ontouchmove = function(a) {
                    b.onContainerTouchMove(a)
                }, a.unbindDocumentTouchEnd || (a.unbindDocumentTouchEnd = C(g, "touchend", b.onDocumentTouchEnd)))
            },
            destroy: function() {
                var b = this;
                b.unDocMouseMove && b.unDocMouseMove();
                this.unbindContainerMouseLeave();
                a.chartCount || (a.unbindDocumentMouseUp && (a.unbindDocumentMouseUp = a.unbindDocumentMouseUp()), a.unbindDocumentTouchEnd && (a.unbindDocumentTouchEnd = a.unbindDocumentTouchEnd()));
                clearInterval(b.tooltipTimeout);
                a.objectEach(b, function(a, g) {
                    b[g] = null
                })
            }
        }
    })(L);
    (function(a) {
        var C = a.charts,
            G = a.each,
            D = a.extend,
            q = a.map,
            n = a.noop,
            h = a.pick;
        D(a.Pointer.prototype, {
            pinchTranslate: function(a, h, n, q, f, c) {
                this.zoomHor && this.pinchTranslateDirection(!0, a, h, n, q, f, c);
                this.zoomVert && this.pinchTranslateDirection(!1, a, h, n, q,
                    f, c)
            },
            pinchTranslateDirection: function(a, h, n, q, f, c, l, b) {
                var g = this.chart,
                    p = a ? "x" : "y",
                    v = a ? "X" : "Y",
                    e = "chart" + v,
                    w = a ? "width" : "height",
                    E = g["plot" + (a ? "Left" : "Top")],
                    m, z, t = b || 1,
                    H = g.inverted,
                    I = g.bounds[a ? "h" : "v"],
                    K = 1 === h.length,
                    d = h[0][e],
                    y = n[0][e],
                    F = !K && h[1][e],
                    k = !K && n[1][e],
                    B;
                n = function() {
                    !K && 20 < Math.abs(d - F) && (t = b || Math.abs(y - k) / Math.abs(d - F));
                    z = (E - y) / t + d;
                    m = g["plot" + (a ? "Width" : "Height")] / t
                };
                n();
                h = z;
                h < I.min ? (h = I.min, B = !0) : h + m > I.max && (h = I.max - m, B = !0);
                B ? (y -= .8 * (y - l[p][0]), K || (k -= .8 * (k - l[p][1])), n()) : l[p] = [y, k];
                H || (c[p] = z - E, c[w] = m);
                c = H ? 1 / t : t;
                f[w] = m;
                f[p] = h;
                q[H ? a ? "scaleY" : "scaleX" : "scale" + v] = t;
                q["translate" + v] = c * E + (y - c * d)
            },
            pinch: function(a) {
                var r = this,
                    u = r.chart,
                    x = r.pinchDown,
                    f = a.touches,
                    c = f.length,
                    l = r.lastValidTouch,
                    b = r.hasZoom,
                    g = r.selectionMarker,
                    p = {}, v = 1 === c && (r.inClass(a.target, "highcharts-tracker") && u.runTrackerClick || r.runChartClick),
                    e = {};
                1 < c && (r.initiated = !0);
                b && r.initiated && !v && a.preventDefault();
                q(f, function(a) {
                    return r.normalize(a)
                });
                "touchstart" === a.type ? (G(f, function(a, b) {
                    x[b] = {
                        chartX: a.chartX,
                        chartY: a.chartY
                    }
                }), l.x = [x[0].chartX, x[1] && x[1].chartX], l.y = [x[0].chartY, x[1] && x[1].chartY], G(u.axes, function(a) {
                    if (a.zoomEnabled) {
                        var b = u.bounds[a.horiz ? "h" : "v"],
                            e = a.minPixelPadding,
                            g = a.toPixels(h(a.options.min, a.dataMin)),
                            c = a.toPixels(h(a.options.max, a.dataMax)),
                            p = Math.max(g, c);
                        b.min = Math.min(a.pos, Math.min(g, c) - e);
                        b.max = Math.max(a.pos + a.len, p + e)
                    }
                }), r.res = !0) : r.followTouchMove && 1 === c ? this.runPointActions(r.normalize(a)) : x.length && (g || (r.selectionMarker = g = D({
                    destroy: n,
                    touch: !0
                }, u.plotBox)), r.pinchTranslate(x,
                    f, p, g, e, l), r.hasPinched = b, r.scaleGroups(p, e), r.res && (r.res = !1, this.reset(!1, 0)))
            },
            touch: function(n, r) {
                var u = this.chart,
                    q, f;
                if (u.index !== a.hoverChartIndex) this.onContainerMouseLeave({
                    relatedTarget: !0
                });
                a.hoverChartIndex = u.index;
                1 === n.touches.length ? (n = this.normalize(n), (f = u.isInsidePlot(n.chartX - u.plotLeft, n.chartY - u.plotTop)) && !u.openMenu ? (r && this.runPointActions(n), "touchmove" === n.type && (r = this.pinchDown, q = r[0] ? 4 <= Math.sqrt(Math.pow(r[0].chartX - n.chartX, 2) + Math.pow(r[0].chartY - n.chartY, 2)) : !1), h(q, !0) && this.pinch(n)) : r && this.reset()) : 2 === n.touches.length && this.pinch(n)
            },
            onContainerTouchStart: function(a) {
                this.zoomOption(a);
                this.touch(a, !0)
            },
            onContainerTouchMove: function(a) {
                this.touch(a)
            },
            onDocumentTouchEnd: function(h) {
                C[a.hoverChartIndex] && C[a.hoverChartIndex].pointer.drop(h)
            }
        })
    })(L);
    (function(a) {
        var C = a.addEvent,
            G = a.charts,
            D = a.css,
            q = a.doc,
            n = a.extend,
            h = a.noop,
            x = a.Pointer,
            r = a.removeEvent,
            u = a.win,
            A = a.wrap;
        if (!a.hasTouch && (u.PointerEvent || u.MSPointerEvent)) {
            var f = {}, c = !! u.PointerEvent,
                l = function() {
                    var b = [];
                    b.item = function(a) {
                        return this[a]
                    };
                    a.objectEach(f, function(a) {
                        b.push({
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.target
                        })
                    });
                    return b
                }, b = function(b, c, f, e) {
                    "touch" !== b.pointerType && b.pointerType !== b.MSPOINTER_TYPE_TOUCH || !G[a.hoverChartIndex] || (e(b), e = G[a.hoverChartIndex].pointer, e[c]({
                        type: f,
                        target: b.currentTarget,
                        preventDefault: h,
                        touches: l()
                    }))
                };
            n(x.prototype, {
                onContainerPointerDown: function(a) {
                    b(a, "onContainerTouchStart", "touchstart", function(a) {
                        f[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.currentTarget
                        }
                    })
                },
                onContainerPointerMove: function(a) {
                    b(a, "onContainerTouchMove", "touchmove", function(a) {
                        f[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY
                        };
                        f[a.pointerId].target || (f[a.pointerId].target = a.currentTarget)
                    })
                },
                onDocumentPointerUp: function(a) {
                    b(a, "onDocumentTouchEnd", "touchend", function(a) {
                        delete f[a.pointerId]
                    })
                },
                batchMSEvents: function(a) {
                    a(this.chart.container, c ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, c ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(q, c ?
                        "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            A(x.prototype, "init", function(a, b, c) {
                a.call(this, b, c);
                this.hasZoom && D(b.container, {
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                })
            });
            A(x.prototype, "setDOMEvents", function(a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(C)
            });
            A(x.prototype, "destroy", function(a) {
                this.batchMSEvents(r);
                a.call(this)
            })
        }
    })(L);
    (function(a) {
        var C = a.addEvent,
            G = a.css,
            D = a.discardElement,
            q = a.defined,
            n = a.each,
            h = a.isFirefox,
            x = a.marginNames,
            r = a.merge,
            u = a.pick,
            A = a.setAnimation,
            f = a.stableSort,
            c = a.win,
            l = a.wrap;
        a.Legend = function(a, g) {
            this.init(a, g)
        };
        a.Legend.prototype = {
            init: function(a, g) {
                this.chart = a;
                this.setOptions(g);
                g.enabled && (this.render(), C(this.chart, "endResize", function() {
                    this.legend.positionCheckboxes()
                }))
            },
            setOptions: function(a) {
                var b = u(a.padding, 8);
                this.options = a;
                this.itemStyle = a.itemStyle;
                this.itemHiddenStyle = r(this.itemStyle, a.itemHiddenStyle);
                this.itemMarginTop = a.itemMarginTop || 0;
                this.padding = b;
                this.initialItemY = b - 5;
                this.itemHeight =
                    this.maxItemWidth = 0;
                this.symbolWidth = u(a.symbolWidth, 16);
                this.pages = []
            },
            update: function(a, g) {
                var b = this.chart;
                this.setOptions(r(!0, this.options, a));
                this.destroy();
                b.isDirtyLegend = b.isDirtyBox = !0;
                u(g, !0) && b.redraw()
            },
            colorizeItem: function(a, g) {
                a.legendGroup[g ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                var b = this.options,
                    c = a.legendItem,
                    e = a.legendLine,
                    f = a.legendSymbol,
                    l = this.itemHiddenStyle.color,
                    b = g ? b.itemStyle.color : l,
                    m = g ? a.color || l : l,
                    z = a.options && a.options.marker,
                    t = {
                        fill: m
                    };
                c && c.css({
                    fill: b,
                    color: b
                });
                e && e.attr({
                    stroke: m
                });
                f && (z && f.isMarker && (t = a.pointAttribs(), g || (t.stroke = t.fill = l)), f.attr(t))
            },
            positionItem: function(a) {
                var b = this.options,
                    c = b.symbolPadding,
                    b = !b.rtl,
                    f = a._legendItemPos,
                    e = f[0],
                    f = f[1],
                    l = a.checkbox;
                (a = a.legendGroup) && a.element && a.translate(b ? e : this.legendWidth - e - 2 * c - 4, f);
                l && (l.x = e, l.y = f)
            },
            destroyItem: function(a) {
                var b = a.checkbox;
                n(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function(b) {
                    a[b] && (a[b] = a[b].destroy())
                });
                b && D(a.checkbox)
            },
            destroy: function() {
                function a(a) {
                    this[a] &&
                        (this[a] = this[a].destroy())
                }
                n(this.getAllItems(), function(b) {
                    n(["legendItem", "legendGroup"], a, b)
                });
                n("clipRect up down pager nav box title group".split(" "), a, this);
                this.display = null
            },
            positionCheckboxes: function() {
                var a = this.group && this.group.alignAttr,
                    g, c = this.clipHeight || this.legendHeight,
                    f = this.titleHeight;
                a && (g = a.translateY, n(this.allItems, function(b) {
                    var e = b.checkbox,
                        p;
                    e && (p = g + f + e.y + (this.scrollOffset || 0) + 3, G(e, {
                        left: a.translateX + b.checkboxOffset + e.x - 20 + "px",
                        top: p + "px",
                        display: p > g - 6 && p < g + c - 6 ? "" : "none"
                    }))
                }, this))
            },
            renderTitle: function() {
                var a = this.options,
                    g = this.padding,
                    c = a.title,
                    f = 0;
                c.text && (this.title || (this.title = this.chart.renderer.label(c.text, g - 3, g - 4, null, null, null, a.useHTML, null, "legend-title").attr({
                    zIndex: 1
                }).css(c.style).add(this.group)), a = this.title.getBBox(), f = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
                    translateY: f
                }));
                this.titleHeight = f
            },
            setText: function(b) {
                var c = this.options;
                b.legendItem.attr({
                    text: c.labelFormat ? a.format(c.labelFormat, b, this.chart.time) : c.labelFormatter.call(b)
                })
            },
            renderItem: function(a) {
                var b = this.chart,
                    c = b.renderer,
                    f = this.options,
                    e = "horizontal" === f.layout,
                    l = this.symbolWidth,
                    h = f.symbolPadding,
                    m = this.itemStyle,
                    z = this.itemHiddenStyle,
                    t = this.padding,
                    n = e ? u(f.itemDistance, 20) : 0,
                    I = !f.rtl,
                    K = f.width,
                    d = f.itemMarginBottom || 0,
                    y = this.itemMarginTop,
                    F = a.legendItem,
                    k = !a.series,
                    B = !k && a.series.drawLegendSymbol ? a.series : a,
                    q = B.options,
                    N = this.createCheckboxForItem && q && q.showCheckbox,
                    q = l + h + n + (N ? 20 : 0),
                    M = f.useHTML,
                    P = a.options.className;
                F || (a.legendGroup = c.g("legend-item").addClass("highcharts-" +
                        B.type + "-series highcharts-color-" + a.colorIndex + (P ? " " + P : "") + (k ? " highcharts-series-" + a.index : "")).attr({
                        zIndex: 1
                    }).add(this.scrollGroup), a.legendItem = F = c.text("", I ? l + h : -h, this.baseline || 0, M).css(r(a.visible ? m : z)).attr({
                        align: I ? "left" : "right",
                        zIndex: 2
                    }).add(a.legendGroup), this.baseline || (l = m.fontSize, this.fontMetrics = c.fontMetrics(l, F), this.baseline = this.fontMetrics.f + 3 + y, F.attr("y", this.baseline)), this.symbolHeight = f.symbolHeight || this.fontMetrics.f, B.drawLegendSymbol(this, a), this.setItemEvents &&
                    this.setItemEvents(a, F, M), N && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                m.width || F.css({
                    width: (f.itemWidth || f.width || b.spacingBox.width) - q
                });
                this.setText(a);
                c = F.getBBox();
                m = a.checkboxOffset = f.itemWidth || a.legendItemWidth || c.width + q;
                this.itemHeight = c = Math.round(a.legendItemHeight || c.height || this.symbolHeight);
                e && this.itemX - t + m > (K || b.spacingBox.width - 2 * t - f.x) && (this.itemX = t, this.itemY += y + this.lastLineHeight + d, this.lastLineHeight = 0);
                this.maxItemWidth = Math.max(this.maxItemWidth, m);
                this.lastItemY = y + this.itemY + d;
                this.lastLineHeight = Math.max(c, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                e ? this.itemX += m : (this.itemY += y + c + d, this.lastLineHeight = c);
                this.offsetWidth = K || Math.max((e ? this.itemX - t - (a.checkbox ? 0 : n) : m) + t, this.offsetWidth)
            },
            getAllItems: function() {
                var a = [];
                n(this.chart.series, function(b) {
                    var c = b && b.options;
                    b && u(c.showInLegend, q(c.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === c.legendType ? b.data : b)))
                });
                return a
            },
            getAlignment: function() {
                var a =
                    this.options;
                return a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0)
            },
            adjustMargins: function(a, c) {
                var b = this.chart,
                    g = this.options,
                    e = this.getAlignment();
                e && n([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function(f, p) {
                    f.test(e) && !q(a[p]) && (b[x[p]] = Math.max(b[x[p]], b.legend[(p + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][p] * g[p % 2 ? "x" : "y"] + u(g.margin, 12) + c[p] + (0 === p ? b.titleOffset + b.options.title.margin : 0)))
                })
            },
            render: function() {
                var a = this,
                    c = a.chart,
                    p = c.renderer,
                    l = a.group,
                    e, w, h, m, z = a.box,
                    t = a.options,
                    H = a.padding;
                a.itemX = H;
                a.itemY = a.initialItemY;
                a.offsetWidth = 0;
                a.lastItemY = 0;
                l || (a.group = l = p.g("legend").attr({
                    zIndex: 7
                }).add(), a.contentGroup = p.g().attr({
                    zIndex: 1
                }).add(l), a.scrollGroup = p.g().add(a.contentGroup));
                a.renderTitle();
                e = a.getAllItems();
                f(e, function(a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                t.reversed && e.reverse();
                a.allItems = e;
                a.display = w = !! e.length;
                a.lastLineHeight = 0;
                n(e, function(b) {
                    a.renderItem(b)
                });
                h =
                    (t.width || a.offsetWidth) + H;
                m = a.lastItemY + a.lastLineHeight + a.titleHeight;
                m = a.handleOverflow(m);
                m += H;
                z || (a.box = z = p.rect().addClass("highcharts-legend-box").attr({
                    r: t.borderRadius
                }).add(l), z.isNew = !0);
                z.attr({
                    stroke: t.borderColor,
                    "stroke-width": t.borderWidth || 0,
                    fill: t.backgroundColor || "none"
                }).shadow(t.shadow);
                0 < h && 0 < m && (z[z.isNew ? "attr" : "animate"](z.crisp.call({}, {
                    x: 0,
                    y: 0,
                    width: h,
                    height: m
                }, z.strokeWidth())), z.isNew = !1);
                z[w ? "show" : "hide"]();
                a.legendWidth = h;
                a.legendHeight = m;
                n(e, function(b) {
                    a.positionItem(b)
                });
                w && (p = c.spacingBox, /(lth|ct|rth)/.test(a.getAlignment()) && (p = r(p, {
                    y: p.y + c.titleOffset + c.options.title.margin
                })), l.align(r(t, {
                    width: h,
                    height: m
                }), !0, p));
                c.isResizing || this.positionCheckboxes()
            },
            handleOverflow: function(a) {
                var b = this,
                    c = this.chart,
                    f = c.renderer,
                    e = this.options,
                    l = e.y,
                    h = this.padding,
                    c = c.spacingBox.height + ("top" === e.verticalAlign ? -l : l) - h,
                    l = e.maxHeight,
                    m, z = this.clipRect,
                    t = e.navigation,
                    H = u(t.animation, !0),
                    I = t.arrowSize || 12,
                    K = this.nav,
                    d = this.pages,
                    y, F = this.allItems,
                    k = function(a) {
                        "number" === typeof a ?
                            z.attr({
                                height: a
                            }) : z && (b.clipRect = z.destroy(), b.contentGroup.clip());
                        b.contentGroup.div && (b.contentGroup.div.style.clip = a ? "rect(" + h + "px,9999px," + (h + a) + "px,0)" : "auto")
                    };
                "horizontal" !== e.layout || "middle" === e.verticalAlign || e.floating || (c /= 2);
                l && (c = Math.min(c, l));
                d.length = 0;
                a > c && !1 !== t.enabled ? (this.clipHeight = m = Math.max(c - 20 - this.titleHeight - h, 0), this.currentPage = u(this.currentPage, 1), this.fullHeight = a, n(F, function(a, b) {
                    var e = a._legendItemPos[1],
                        k = Math.round(a.legendItem.getBBox().height),
                        c = d.length;
                    if (!c || e - d[c - 1] > m && (y || e) !== d[c - 1]) d.push(y || e), c++;
                    a.pageIx = c - 1;
                    y && (F[b - 1].pageIx = c - 1);
                    b === F.length - 1 && e + k - d[c - 1] > m && (d.push(e), a.pageIx = c);
                    e !== y && (y = e)
                }), z || (z = b.clipRect = f.clipRect(0, h, 9999, 0), b.contentGroup.clip(z)), k(m), K || (this.nav = K = f.g().attr({
                    zIndex: 1
                }).add(this.group), this.up = f.symbol("triangle", 0, 0, I, I).on("click", function() {
                    b.scroll(-1, H)
                }).add(K), this.pager = f.text("", 15, 10).addClass("highcharts-legend-navigation").css(t.style).add(K), this.down = f.symbol("triangle-down", 0, 0, I, I).on("click",
                    function() {
                        b.scroll(1, H)
                    }).add(K)), b.scroll(0), a = c) : K && (k(), this.nav = K.destroy(), this.scrollGroup.attr({
                    translateY: 1
                }), this.clipHeight = 0);
                return a
            },
            scroll: function(a, c) {
                var b = this.pages,
                    g = b.length;
                a = this.currentPage + a;
                var e = this.clipHeight,
                    f = this.options.navigation,
                    l = this.pager,
                    m = this.padding;
                a > g && (a = g);
                0 < a && (void 0 !== c && A(c, this.chart), this.nav.attr({
                        translateX: m,
                        translateY: e + this.padding + 7 + this.titleHeight,
                        visibility: "visible"
                    }), this.up.attr({
                        "class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    }),
                    l.attr({
                        text: a + "/" + g
                    }), this.down.attr({
                        x: 18 + this.pager.getBBox().width,
                        "class": a === g ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    }), this.up.attr({
                        fill: 1 === a ? f.inactiveColor : f.activeColor
                    }).css({
                        cursor: 1 === a ? "default" : "pointer"
                    }), this.down.attr({
                        fill: a === g ? f.inactiveColor : f.activeColor
                    }).css({
                        cursor: a === g ? "default" : "pointer"
                    }), this.scrollOffset = -b[a - 1] + this.initialItemY, this.scrollGroup.animate({
                        translateY: this.scrollOffset
                    }), this.currentPage = a, this.positionCheckboxes())
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function(a, c) {
                var b = a.symbolHeight,
                    g = a.options.squareSymbol;
                c.legendSymbol = this.chart.renderer.rect(g ? (a.symbolWidth - b) / 2 : 0, a.baseline - b + 1, g ? b : a.symbolWidth, b, u(a.options.symbolRadius, b / 2)).addClass("highcharts-point").attr({
                    zIndex: 3
                }).add(c.legendGroup)
            },
            drawLineMarker: function(a) {
                var b = this.options,
                    c = b.marker,
                    f = a.symbolWidth,
                    e = a.symbolHeight,
                    l = e / 2,
                    h = this.chart.renderer,
                    m = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var z;
                z = {
                    "stroke-width": b.lineWidth || 0
                };
                b.dashStyle &&
                    (z.dashstyle = b.dashStyle);
                this.legendLine = h.path(["M", 0, a, "L", f, a]).addClass("highcharts-graph").attr(z).add(m);
                c && !1 !== c.enabled && (b = Math.min(u(c.radius, l), l), 0 === this.symbol.indexOf("url") && (c = r(c, {
                    width: e,
                    height: e
                }), b = 0), this.legendSymbol = c = h.symbol(this.symbol, f / 2 - b, a - b, 2 * b, 2 * b, c).addClass("highcharts-point").add(m), c.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(c.navigator.userAgent) || h) && l(a.Legend.prototype, "positionItem", function(a, c) {
            var b = this,
                g = function() {
                    c._legendItemPos && a.call(b, c)
                };
            g();
            setTimeout(g)
        })
    })(L);
    (function(a) {
        var C = a.addEvent,
            G = a.animate,
            D = a.animObject,
            q = a.attr,
            n = a.doc,
            h = a.Axis,
            x = a.createElement,
            r = a.defaultOptions,
            u = a.discardElement,
            A = a.charts,
            f = a.css,
            c = a.defined,
            l = a.each,
            b = a.extend,
            g = a.find,
            p = a.fireEvent,
            v = a.grep,
            e = a.isNumber,
            w = a.isObject,
            E = a.isString,
            m = a.Legend,
            z = a.marginNames,
            t = a.merge,
            H = a.objectEach,
            I = a.Pointer,
            K = a.pick,
            d = a.pInt,
            y = a.removeEvent,
            F = a.seriesTypes,
            k = a.splat,
            B = a.syncTimeout,
            O = a.win,
            N = a.Chart = function() {
                this.getArgs.apply(this, arguments)
            };
        a.chart = function(a, d, b) {
            return new N(a,
                d, b)
        };
        b(N.prototype, {
            callbacks: [],
            getArgs: function() {
                var a = [].slice.call(arguments);
                if (E(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1])
            },
            init: function(d, b) {
                var e, c, k = d.series,
                    g = d.plotOptions || {};
                d.series = null;
                e = t(r, d);
                for (c in e.plotOptions) e.plotOptions[c].tooltip = g[c] && t(g[c].tooltip) || void 0;
                e.tooltip.userOptions = d.chart && d.chart.forExport && d.tooltip.userOptions || d.tooltip;
                e.series = d.series = k;
                this.userOptions = d;
                c = e.chart;
                k = c.events;
                this.margin = [];
                this.spacing = [];
                this.bounds = {
                    h: {},
                    v: {}
                };
                this.labelCollectors = [];
                this.callback = b;
                this.isResizing = 0;
                this.options = e;
                this.axes = [];
                this.series = [];
                this.time = d.time && a.keys(d.time).length ? new a.Time(d.time) : a.time;
                this.hasCartesianSeries = c.showAxes;
                var f = this;
                f.index = A.length;
                A.push(f);
                a.chartCount++;
                k && H(k, function(a, d) {
                    C(f, d, a)
                });
                f.xAxis = [];
                f.yAxis = [];
                f.pointCount = f.colorCounter = f.symbolCounter = 0;
                f.firstRender()
            },
            initSeries: function(d) {
                var b = this.options.chart;
                (b = F[d.type || b.type || b.defaultSeriesType]) || a.error(17, !0);
                b = new b;
                b.init(this,
                    d);
                return b
            },
            orderSeries: function(a) {
                var d = this.series;
                for (a = a || 0; a < d.length; a++) d[a] && (d[a].index = a, d[a].name = d[a].getName())
            },
            isInsidePlot: function(a, d, b) {
                var e = b ? d : a;
                a = b ? a : d;
                return 0 <= e && e <= this.plotWidth && 0 <= a && a <= this.plotHeight
            },
            redraw: function(d) {
                var e = this.axes,
                    c = this.series,
                    k = this.pointer,
                    g = this.legend,
                    f = this.isDirtyLegend,
                    y, m, t = this.hasCartesianSeries,
                    F = this.isDirtyBox,
                    I, z = this.renderer,
                    B = z.isHidden(),
                    v = [];
                this.setResponsive && this.setResponsive(!1);
                a.setAnimation(d, this);
                B && this.temporaryDisplay();
                this.layOutTitles();
                for (d = c.length; d--;)
                    if (I = c[d], I.options.stacking && (y = !0, I.isDirty)) {
                        m = !0;
                        break
                    }
                if (m)
                    for (d = c.length; d--;) I = c[d], I.options.stacking && (I.isDirty = !0);
                l(c, function(a) {
                    a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), f = !0);
                    a.isDirtyData && p(a, "updatedData")
                });
                f && g.options.enabled && (g.render(), this.isDirtyLegend = !1);
                y && this.getStacks();
                t && l(e, function(a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                t && (l(e, function(a) {
                    a.isDirty && (F = !0)
                }), l(e, function(a) {
                    var d =
                        a.min + "," + a.max;
                    a.extKey !== d && (a.extKey = d, v.push(function() {
                        p(a, "afterSetExtremes", b(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (F || y) && a.redraw()
                }));
                F && this.drawChartBox();
                p(this, "predraw");
                l(c, function(a) {
                    (F || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1
                });
                k && k.reset(!0);
                z.draw();
                p(this, "redraw");
                p(this, "render");
                B && this.temporaryDisplay(!0);
                l(v, function(a) {
                    a.call()
                })
            },
            get: function(a) {
                function d(d) {
                    return d.id === a || d.options && d.options.id === a
                }
                var b, e = this.series,
                    c;
                b = g(this.axes, d) ||
                    g(this.series, d);
                for (c = 0; !b && c < e.length; c++) b = g(e[c].points || [], d);
                return b
            },
            getAxes: function() {
                var a = this,
                    d = this.options,
                    b = d.xAxis = k(d.xAxis || {}),
                    d = d.yAxis = k(d.yAxis || {});
                l(b, function(a, d) {
                    a.index = d;
                    a.isX = !0
                });
                l(d, function(a, d) {
                    a.index = d
                });
                b = b.concat(d);
                l(b, function(d) {
                    new h(a, d)
                })
            },
            getSelectedPoints: function() {
                var a = [];
                l(this.series, function(d) {
                    a = a.concat(v(d.data || [], function(a) {
                        return a.selected
                    }))
                });
                return a
            },
            getSelectedSeries: function() {
                return v(this.series, function(a) {
                    return a.selected
                })
            },
            setTitle: function(a, d, b) {
                var e = this,
                    c = e.options,
                    k;
                k = c.title = t({
                    style: {
                        color: "#333333",
                        fontSize: c.isStock ? "16px" : "18px"
                    }
                }, c.title, a);
                c = c.subtitle = t({
                    style: {
                        color: "#666666"
                    }
                }, c.subtitle, d);
                l([
                    ["title", a, k],
                    ["subtitle", d, c]
                ], function(a, d) {
                    var b = a[0],
                        c = e[b],
                        k = a[1];
                    a = a[2];
                    c && k && (e[b] = c = c.destroy());
                    a && !c && (e[b] = e.renderer.text(a.text, 0, 0, a.useHTML).attr({
                        align: a.align,
                        "class": "highcharts-" + b,
                        zIndex: a.zIndex || 4
                    }).add(), e[b].update = function(a) {
                        e.setTitle(!d && a, d && a)
                    }, e[b].css(a.style))
                });
                e.layOutTitles(b)
            },
            layOutTitles: function(a) {
                var d = 0,
                    e, c = this.renderer,
                    k = this.spacingBox;
                l(["title", "subtitle"], function(a) {
                    var e = this[a],
                        g = this.options[a];
                    a = "title" === a ? -3 : g.verticalAlign ? 0 : d + 2;
                    var f;
                    e && (f = g.style.fontSize, f = c.fontMetrics(f, e).b, e.css({
                        width: (g.width || k.width + g.widthAdjust) + "px"
                    }).align(b({
                        y: a + f
                    }, g), !1, "spacingBox"), g.floating || g.verticalAlign || (d = Math.ceil(d + e.getBBox(g.useHTML).height)))
                }, this);
                e = this.titleOffset !== d;
                this.titleOffset = d;
                !this.isDirtyBox && e && (this.isDirtyBox = e, this.hasRendered && K(a, !0) && this.isDirtyBox && this.redraw())
            },
            getChartSize: function() {
                var d = this.options.chart,
                    b = d.width,
                    d = d.height,
                    e = this.renderTo;
                c(b) || (this.containerWidth = a.getStyle(e, "width"));
                c(d) || (this.containerHeight = a.getStyle(e, "height"));
                this.chartWidth = Math.max(0, b || this.containerWidth || 600);
                this.chartHeight = Math.max(0, a.relativeLength(d, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
            },
            temporaryDisplay: function(d) {
                var b = this.renderTo;
                if (d)
                    for (; b && b.style;) b.hcOrigStyle && (a.css(b, b.hcOrigStyle),
                        delete b.hcOrigStyle), b.hcOrigDetached && (n.body.removeChild(b), b.hcOrigDetached = !1), b = b.parentNode;
                else
                    for (; b && b.style;) {
                        n.body.contains(b) || b.parentNode || (b.hcOrigDetached = !0, n.body.appendChild(b));
                        if ("none" === a.getStyle(b, "display", !1) || b.hcOricDetached) b.hcOrigStyle = {
                            display: b.style.display,
                            height: b.style.height,
                            overflow: b.style.overflow
                        }, d = {
                            display: "block",
                            overflow: "hidden"
                        }, b !== this.renderTo && (d.height = 0), a.css(b, d), b.offsetWidth || b.style.setProperty("display", "block", "important");
                        b = b.parentNode;
                        if (b === n.body) break
                    }
            },
            setClassName: function(a) {
                this.container.className = "highcharts-container " + (a || "")
            },
            getContainer: function() {
                var c, k = this.options,
                    g = k.chart,
                    f, y;
                c = this.renderTo;
                var m = a.uniqueKey(),
                    t;
                c || (this.renderTo = c = g.renderTo);
                E(c) && (this.renderTo = c = n.getElementById(c));
                c || a.error(13, !0);
                f = d(q(c, "data-highcharts-chart"));
                e(f) && A[f] && A[f].hasRendered && A[f].destroy();
                q(c, "data-highcharts-chart", this.index);
                c.innerHTML = "";
                g.skipClone || c.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                f = this.chartWidth;
                y = this.chartHeight;
                t = b({
                    position: "relative",
                    overflow: "hidden",
                    width: f + "px",
                    height: y + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                }, g.style);
                this.container = c = x("div", {
                    id: m
                }, t, c);
                this._cursor = c.style.cursor;
                this.renderer = new(a[g.renderer] || a.Renderer)(c, f, y, null, g.forExport, k.exporting && k.exporting.allowHTML);
                this.setClassName(g.className);
                this.renderer.setStyle(g.style);
                this.renderer.chartIndex = this.index
            },
            getMargins: function(a) {
                var d =
                    this.spacing,
                    b = this.margin,
                    e = this.titleOffset;
                this.resetMargins();
                e && !c(b[0]) && (this.plotTop = Math.max(this.plotTop, e + this.options.title.margin + d[0]));
                this.legend && this.legend.display && this.legend.adjustMargins(b, d);
                this.extraMargin && (this[this.extraMargin.type] = (this[this.extraMargin.type] || 0) + this.extraMargin.value);
                this.adjustPlotArea && this.adjustPlotArea();
                a || this.getAxisMargins()
            },
            getAxisMargins: function() {
                var a = this,
                    d = a.axisOffset = [0, 0, 0, 0],
                    b = a.margin;
                a.hasCartesianSeries && l(a.axes, function(a) {
                    a.visible &&
                        a.getOffset()
                });
                l(z, function(e, k) {
                    c(b[k]) || (a[e] += d[k])
                });
                a.setChartSize()
            },
            reflow: function(d) {
                var b = this,
                    e = b.options.chart,
                    k = b.renderTo,
                    g = c(e.width) && c(e.height),
                    f = e.width || a.getStyle(k, "width"),
                    e = e.height || a.getStyle(k, "height"),
                    k = d ? d.target : O;
                if (!g && !b.isPrinting && f && e && (k === O || k === n)) {
                    if (f !== b.containerWidth || e !== b.containerHeight) clearTimeout(b.reflowTimeout), b.reflowTimeout = B(function() {
                        b.container && b.setSize(void 0, void 0, !1)
                    }, d ? 100 : 0);
                    b.containerWidth = f;
                    b.containerHeight = e
                }
            },
            initReflow: function() {
                var a =
                    this,
                    d;
                d = C(O, "resize", function(d) {
                    a.reflow(d)
                });
                C(a, "destroy", d)
            },
            setSize: function(d, b, e) {
                var c = this,
                    k = c.renderer;
                c.isResizing += 1;
                a.setAnimation(e, c);
                c.oldChartHeight = c.chartHeight;
                c.oldChartWidth = c.chartWidth;
                void 0 !== d && (c.options.chart.width = d);
                void 0 !== b && (c.options.chart.height = b);
                c.getChartSize();
                d = k.globalAnimation;
                (d ? G : f)(c.container, {
                    width: c.chartWidth + "px",
                    height: c.chartHeight + "px"
                }, d);
                c.setChartSize(!0);
                k.setSize(c.chartWidth, c.chartHeight, e);
                l(c.axes, function(a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                c.isDirtyLegend = !0;
                c.isDirtyBox = !0;
                c.layOutTitles();
                c.getMargins();
                c.redraw(e);
                c.oldChartHeight = null;
                p(c, "resize");
                B(function() {
                    c && p(c, "endResize", null, function() {
                        --c.isResizing
                    })
                }, D(d).duration)
            },
            setChartSize: function(a) {
                var d = this.inverted,
                    b = this.renderer,
                    c = this.chartWidth,
                    e = this.chartHeight,
                    k = this.options.chart,
                    g = this.spacing,
                    f = this.clipOffset,
                    y, m, t, p;
                this.plotLeft = y = Math.round(this.plotLeft);
                this.plotTop = m = Math.round(this.plotTop);
                this.plotWidth = t = Math.max(0, Math.round(c - y - this.marginRight));
                this.plotHeight = p = Math.max(0, Math.round(e - m - this.marginBottom));
                this.plotSizeX = d ? p : t;
                this.plotSizeY = d ? t : p;
                this.plotBorderWidth = k.plotBorderWidth || 0;
                this.spacingBox = b.spacingBox = {
                    x: g[3],
                    y: g[0],
                    width: c - g[3] - g[1],
                    height: e - g[0] - g[2]
                };
                this.plotBox = b.plotBox = {
                    x: y,
                    y: m,
                    width: t,
                    height: p
                };
                c = 2 * Math.floor(this.plotBorderWidth / 2);
                d = Math.ceil(Math.max(c, f[3]) / 2);
                b = Math.ceil(Math.max(c, f[0]) / 2);
                this.clipBox = {
                    x: d,
                    y: b,
                    width: Math.floor(this.plotSizeX - Math.max(c, f[1]) / 2 - d),
                    height: Math.max(0, Math.floor(this.plotSizeY -
                        Math.max(c, f[2]) / 2 - b))
                };
                a || l(this.axes, function(a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                })
            },
            resetMargins: function() {
                var a = this,
                    d = a.options.chart;
                l(["margin", "spacing"], function(b) {
                    var c = d[b],
                        e = w(c) ? c : [c, c, c, c];
                    l(["Top", "Right", "Bottom", "Left"], function(c, k) {
                        a[b][k] = K(d[b + c], e[k])
                    })
                });
                l(z, function(d, b) {
                    a[d] = K(a.margin[b], a.spacing[b])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0]
            },
            drawChartBox: function() {
                var a = this.options.chart,
                    d = this.renderer,
                    b = this.chartWidth,
                    c = this.chartHeight,
                    e = this.chartBackground,
                    k = this.plotBackground,
                    g = this.plotBorder,
                    f, y = this.plotBGImage,
                    m = a.backgroundColor,
                    t = a.plotBackgroundColor,
                    p = a.plotBackgroundImage,
                    F, I = this.plotLeft,
                    l = this.plotTop,
                    z = this.plotWidth,
                    B = this.plotHeight,
                    v = this.plotBox,
                    K = this.clipRect,
                    h = this.clipBox,
                    w = "animate";
                e || (this.chartBackground = e = d.rect().addClass("highcharts-background").add(), w = "attr");
                f = a.borderWidth || 0;
                F = f + (a.shadow ? 8 : 0);
                m = {
                    fill: m || "none"
                };
                if (f || e["stroke-width"]) m.stroke = a.borderColor, m["stroke-width"] = f;
                e.attr(m).shadow(a.shadow);
                e[w]({
                    x: F / 2,
                    y: F / 2,
                    width: b - F - f % 2,
                    height: c - F - f % 2,
                    r: a.borderRadius
                });
                w = "animate";
                k || (w = "attr", this.plotBackground = k = d.rect().addClass("highcharts-plot-background").add());
                k[w](v);
                k.attr({
                    fill: t || "none"
                }).shadow(a.plotShadow);
                p && (y ? y.animate(v) : this.plotBGImage = d.image(p, I, l, z, B).add());
                K ? K.animate({
                    width: h.width,
                    height: h.height
                }) : this.clipRect = d.clipRect(h);
                w = "animate";
                g || (w = "attr", this.plotBorder = g = d.rect().addClass("highcharts-plot-border").attr({
                    zIndex: 1
                }).add());
                g.attr({
                    stroke: a.plotBorderColor,
                    "stroke-width": a.plotBorderWidth || 0,
                    fill: "none"
                });
                g[w](g.crisp({
                    x: I,
                    y: l,
                    width: z,
                    height: B
                }, -g.strokeWidth()));
                this.isDirtyBox = !1
            },
            propFromSeries: function() {
                var a = this,
                    d = a.options.chart,
                    b, c = a.options.series,
                    e, k;
                l(["inverted", "angular", "polar"], function(g) {
                    b = F[d.type || d.defaultSeriesType];
                    k = d[g] || b && b.prototype[g];
                    for (e = c && c.length; !k && e--;)(b = F[c[e].type]) && b.prototype[g] && (k = !0);
                    a[g] = k
                })
            },
            linkSeries: function() {
                var a = this,
                    d = a.series;
                l(d, function(a) {
                    a.linkedSeries.length = 0
                });
                l(d, function(d) {
                    var b = d.options.linkedTo;
                    E(b) && (b = ":previous" ===
                        b ? a.series[d.index - 1] : a.get(b)) && b.linkedParent !== d && (b.linkedSeries.push(d), d.linkedParent = b, d.visible = K(d.options.visible, b.options.visible, d.visible))
                })
            },
            renderSeries: function() {
                l(this.series, function(a) {
                    a.translate();
                    a.render()
                })
            },
            renderLabels: function() {
                var a = this,
                    c = a.options.labels;
                c.items && l(c.items, function(e) {
                    var k = b(c.style, e.style),
                        g = d(k.left) + a.plotLeft,
                        f = d(k.top) + a.plotTop + 12;
                    delete k.left;
                    delete k.top;
                    a.renderer.text(e.html, g, f).attr({
                        zIndex: 2
                    }).css(k).add()
                })
            },
            render: function() {
                var a =
                    this.axes,
                    d = this.renderer,
                    b = this.options,
                    c, e, k;
                this.setTitle();
                this.legend = new m(this, b.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                b = this.plotWidth;
                c = this.plotHeight = Math.max(this.plotHeight - 21, 0);
                l(a, function(a) {
                    a.setScale()
                });
                this.getAxisMargins();
                e = 1.1 < b / this.plotWidth;
                k = 1.05 < c / this.plotHeight;
                if (e || k) l(a, function(a) {
                    (a.horiz && e || !a.horiz && k) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && l(a, function(a) {
                    a.visible &&
                        a.render()
                });
                this.seriesGroup || (this.seriesGroup = d.g("series-group").attr({
                    zIndex: 3
                }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            },
            addCredits: function(a) {
                var d = this;
                a = t(!0, this.options.credits, a);
                a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
                        a.href && (O.location.href = a.href)
                    }).attr({
                        align: a.position.align,
                        zIndex: 8
                    }).css(a.style).add().align(a.position),
                    this.credits.update = function(a) {
                        d.credits = d.credits.destroy();
                        d.addCredits(a)
                    })
            },
            destroy: function() {
                var d = this,
                    b = d.axes,
                    c = d.series,
                    e = d.container,
                    k, g = e && e.parentNode;
                p(d, "destroy");
                d.renderer.forExport ? a.erase(A, d) : A[d.index] = void 0;
                a.chartCount--;
                d.renderTo.removeAttribute("data-highcharts-chart");
                y(d);
                for (k = b.length; k--;) b[k] = b[k].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (k = c.length; k--;) c[k] = c[k].destroy();
                l("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),
                    function(a) {
                        var b = d[a];
                        b && b.destroy && (d[a] = b.destroy())
                    });
                e && (e.innerHTML = "", y(e), g && u(e));
                H(d, function(a, b) {
                    delete d[b]
                })
            },
            firstRender: function() {
                var a = this,
                    d = a.options;
                if (!a.isReadyToRender || a.isReadyToRender()) {
                    a.getContainer();
                    p(a, "init");
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    l(d.series || [], function(d) {
                        a.initSeries(d)
                    });
                    a.linkSeries();
                    p(a, "beforeRender");
                    I && (a.pointer = new I(a, d));
                    a.render();
                    if (!a.renderer.imgCount && a.onload) a.onload();
                    a.temporaryDisplay(!0)
                }
            },
            onload: function() {
                l([this.callback].concat(this.callbacks),
                    function(a) {
                        a && void 0 !== this.index && a.apply(this, [this])
                    }, this);
                p(this, "load");
                p(this, "render");
                c(this.index) && !1 !== this.options.chart.reflow && this.initReflow();
                this.onload = null
            }
        })
    })(L);
    (function(a) {
        var C, G = a.each,
            D = a.extend,
            q = a.erase,
            n = a.fireEvent,
            h = a.format,
            x = a.isArray,
            r = a.isNumber,
            u = a.pick,
            A = a.removeEvent;
        a.Point = C = function() {};
        a.Point.prototype = {
            init: function(a, c, l) {
                this.series = a;
                this.color = a.color;
                this.applyOptions(c, l);
                a.options.colorByPoint ? (c = a.options.colors || a.chart.options.colors, this.color =
                    this.color || c[a.colorCounter], c = c.length, l = a.colorCounter, a.colorCounter++, a.colorCounter === c && (a.colorCounter = 0)) : l = a.colorIndex;
                this.colorIndex = u(this.colorIndex, l);
                a.chart.pointCount++;
                return this
            },
            applyOptions: function(a, c) {
                var f = this.series,
                    b = f.options.pointValKey || f.pointValKey;
                a = C.prototype.optionsToObject.call(this, a);
                D(this, a);
                this.options = this.options ? D(this.options, a) : a;
                a.group && delete this.group;
                b && (this.y = this[b]);
                this.isNull = u(this.isValid && !this.isValid(), null === this.x || !r(this.y, !0));
                this.selected && (this.state = "select");
                "name" in this && void 0 === c && f.xAxis && f.xAxis.hasNames && (this.x = f.xAxis.nameToX(this));
                void 0 === this.x && f && (this.x = void 0 === c ? f.autoIncrement(this) : c);
                return this
            },
            optionsToObject: function(a) {
                var c = {}, f = this.series,
                    b = f.options.keys,
                    g = b || f.pointArrayMap || ["y"],
                    p = g.length,
                    v = 0,
                    e = 0;
                if (r(a) || null === a) c[g[0]] = a;
                else if (x(a))
                    for (!b && a.length > p && (f = typeof a[0], "string" === f ? c.name = a[0] : "number" === f && (c.x = a[0]), v++); e < p;) b && void 0 === a[v] || (c[g[e]] = a[v]), v++, e++;
                else "object" ===
                    typeof a && (c = a, a.dataLabels && (f._hasPointLabels = !0), a.marker && (f._hasPointMarkers = !0));
                return c
            },
            getClassName: function() {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
            },
            getZone: function() {
                var a =
                    this.series,
                    c = a.zones,
                    a = a.zoneAxis || "y",
                    l = 0,
                    b;
                for (b = c[l]; this[a] >= b.value;) b = c[++l];
                b && b.color && !this.options.color && (this.color = b.color);
                return b
            },
            destroy: function() {
                var a = this.series.chart,
                    c = a.hoverPoints,
                    l;
                a.pointCount--;
                c && (this.setState(), q(c, this), c.length || (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel) A(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (l in this) this[l] = null
            },
            destroyElements: function() {
                for (var a = ["graphic",
                    "dataLabel", "dataLabelUpper", "connector", "shadowGroup"
                ], c, l = 6; l--;) c = a[l], this[c] && (this[c] = this[c].destroy())
            },
            getLabelConfig: function() {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            },
            tooltipFormatter: function(a) {
                var c = this.series,
                    f = c.tooltipOptions,
                    b = u(f.valueDecimals, ""),
                    g = f.valuePrefix || "",
                    p = f.valueSuffix || "";
                G(c.pointArrayMap || ["y"], function(c) {
                    c =
                        "{point." + c;
                    if (g || p) a = a.replace(c + "}", g + c + "}" + p);
                    a = a.replace(c + "}", c + ":,." + b + "f}")
                });
                return h(a, {
                    point: this,
                    series: this.series
                }, c.chart.time)
            },
            firePointEvent: function(a, c, l) {
                var b = this,
                    g = this.series.options;
                (g.point.events[a] || b.options && b.options.events && b.options.events[a]) && this.importEvents();
                "click" === a && g.allowPointSelect && (l = function(a) {
                    b.select && b.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                n(this, a, c, l)
            },
            visible: !0
        }
    })(L);
    (function(a) {
        var C = a.addEvent,
            G = a.animObject,
            D = a.arrayMax,
            q = a.arrayMin,
            n = a.correctFloat,
            h = a.defaultOptions,
            x = a.defaultPlotOptions,
            r = a.defined,
            u = a.each,
            A = a.erase,
            f = a.extend,
            c = a.fireEvent,
            l = a.grep,
            b = a.isArray,
            g = a.isNumber,
            p = a.isString,
            v = a.merge,
            e = a.objectEach,
            w = a.pick,
            E = a.removeEvent,
            m = a.splat,
            z = a.SVGElement,
            t = a.syncTimeout,
            H = a.win;
        a.Series = a.seriesType("line", null, {
            lineWidth: 2,
            allowPointSelect: !1,
            showCheckbox: !1,
            animation: {
                duration: 1E3
            },
            events: {},
            marker: {
                lineWidth: 0,
                lineColor: "#ffffff",
                enabledThreshold: 2,
                radius: 4,
                states: {
                    normal: {
                        animation: !0
                    },
                    hover: {
                        animation: {
                            duration: 50
                        },
                        enabled: !0,
                        radiusPlus: 2,
                        lineWidthPlus: 1
                    },
                    select: {
                        fillColor: "#cccccc",
                        lineColor: "#000000",
                        lineWidth: 2
                    }
                }
            },
            point: {
                events: {}
            },
            dataLabels: {
                align: "center",
                formatter: function() {
                    return null === this.y ? "" : a.numberFormat(this.y, -1)
                },
                style: {
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "contrast",
                    textOutline: "1px contrast"
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                padding: 5
            },
            cropThreshold: 300,
            pointRange: 0,
            softThreshold: !0,
            states: {
                normal: {
                    animation: !0
                },
                hover: {
                    animation: {
                        duration: 50
                    },
                    lineWidthPlus: 1,
                    marker: {},
                    halo: {
                        size: 10,
                        opacity: .25
                    }
                },
                select: {
                    marker: {}
                }
            },
            stickyTracking: !0,
            turboThreshold: 1E3,
            findNearestPointBy: "x"
        }, {
            isCartesian: !0,
            pointClass: a.Point,
            sorted: !0,
            requireSorting: !0,
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            coll: "series",
            init: function(a, b) {
                var d = this,
                    c, g = a.series,
                    k;
                d.chart = a;
                d.options = b = d.setOptions(b);
                d.linkedSeries = [];
                d.bindAxes();
                f(d, {
                    name: b.name,
                    state: "",
                    visible: !1 !== b.visible,
                    selected: !0 === b.selected
                });
                c = b.events;
                e(c, function(a, b) {
                    C(d, b, a)
                });
                if (c && c.click || b.point && b.point.events &&
                    b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
                d.getColor();
                d.getSymbol();
                u(d.parallelArrays, function(a) {
                    d[a + "Data"] = []
                });
                d.setData(b.data, !1);
                d.isCartesian && (a.hasCartesianSeries = !0);
                g.length && (k = g[g.length - 1]);
                d._i = w(k && k._i, -1) + 1;
                a.orderSeries(this.insert(g))
            },
            insert: function(a) {
                var b = this.options.index,
                    d;
                if (g(b)) {
                    for (d = a.length; d--;)
                        if (b >= w(a[d].options.index, a[d]._i)) {
                            a.splice(d + 1, 0, this);
                            break
                        } - 1 === d && a.unshift(this);
                    d += 1
                } else a.push(this);
                return w(d, a.length - 1)
            },
            bindAxes: function() {
                var b =
                    this,
                    c = b.options,
                    d = b.chart,
                    e;
                u(b.axisTypes || [], function(g) {
                    u(d[g], function(a) {
                        e = a.options;
                        if (c[g] === e.index || void 0 !== c[g] && c[g] === e.id || void 0 === c[g] && 0 === e.index) b.insert(a.series), b[g] = a, a.isDirty = !0
                    });
                    b[g] || b.optionalAxis === g || a.error(18, !0)
                })
            },
            updateParallelArrays: function(a, b) {
                var d = a.series,
                    c = arguments,
                    e = g(b) ? function(c) {
                        var e = "y" === c && d.toYData ? d.toYData(a) : a[c];
                        d[c + "Data"][b] = e
                    } : function(a) {
                        Array.prototype[b].apply(d[a + "Data"], Array.prototype.slice.call(c, 2))
                    };
                u(d.parallelArrays, e)
            },
            autoIncrement: function() {
                var a =
                    this.options,
                    b = this.xIncrement,
                    d, c = a.pointIntervalUnit,
                    e = this.chart.time,
                    b = w(b, a.pointStart, 0);
                this.pointInterval = d = w(this.pointInterval, a.pointInterval, 1);
                c && (a = new e.Date(b), "day" === c ? e.set("Date", a, e.get("Date", a) + d) : "month" === c ? e.set("Month", a, e.get("Month", a) + d) : "year" === c && e.set("FullYear", a, e.get("FullYear", a) + d), d = a.getTime() - b);
                this.xIncrement = b + d;
                return b
            },
            setOptions: function(a) {
                var b = this.chart,
                    d = b.options,
                    c = d.plotOptions,
                    e = (b.userOptions || {}).plotOptions || {}, k = c[this.type];
                this.userOptions =
                    a;
                b = v(k, c.series, a);
                this.tooltipOptions = v(h.tooltip, h.plotOptions.series && h.plotOptions.series.tooltip, h.plotOptions[this.type].tooltip, d.tooltip.userOptions, c.series && c.series.tooltip, c[this.type].tooltip, a.tooltip);
                this.stickyTracking = w(a.stickyTracking, e[this.type] && e[this.type].stickyTracking, e.series && e.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : b.stickyTracking);
                null === k.marker && delete b.marker;
                this.zoneAxis = b.zoneAxis;
                a = this.zones = (b.zones || []).slice();
                !b.negativeColor && !b.negativeFillColor || b.zones || a.push({
                    value: b[this.zoneAxis + "Threshold"] || b.threshold || 0,
                    className: "highcharts-negative",
                    color: b.negativeColor,
                    fillColor: b.negativeFillColor
                });
                a.length && r(a[a.length - 1].value) && a.push({
                    color: this.color,
                    fillColor: this.fillColor
                });
                return b
            },
            getName: function() {
                return this.name || "Series " + (this.index + 1)
            },
            getCyclic: function(a, b, d) {
                var c, e = this.chart,
                    k = this.userOptions,
                    g = a + "Index",
                    f = a + "Counter",
                    m = d ? d.length : w(e.options.chart[a + "Count"], e[a + "Count"]);
                b || (c = w(k[g], k["_" + g]),
                    r(c) || (e.series.length || (e[f] = 0), k["_" + g] = c = e[f] % m, e[f] += 1), d && (b = d[c]));
                void 0 !== c && (this[g] = c);
                this[a] = b
            },
            getColor: function() {
                this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || x[this.type].color, this.chart.options.colors)
            },
            getSymbol: function() {
                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
            setData: function(c, e, d, f) {
                var m = this,
                    k = m.points,
                    y = k && k.length || 0,
                    t, l = m.options,
                    z =
                        m.chart,
                    I = null,
                    v = m.xAxis,
                    h = l.turboThreshold,
                    n = this.xData,
                    H = this.yData,
                    K = (t = m.pointArrayMap) && t.length;
                c = c || [];
                t = c.length;
                e = w(e, !0);
                if (!1 !== f && t && y === t && !m.cropped && !m.hasGroupedData && m.visible) u(c, function(a, d) {
                    k[d].update && a !== l.data[d] && k[d].update(a, !1, null, !1)
                });
                else {
                    m.xIncrement = null;
                    m.colorCounter = 0;
                    u(this.parallelArrays, function(a) {
                        m[a + "Data"].length = 0
                    });
                    if (h && t > h) {
                        for (d = 0; null === I && d < t;) I = c[d], d++;
                        if (g(I))
                            for (d = 0; d < t; d++) n[d] = this.autoIncrement(), H[d] = c[d];
                        else if (b(I))
                            if (K)
                                for (d = 0; d < t; d++) I =
                                    c[d], n[d] = I[0], H[d] = I.slice(1, K + 1);
                            else
                                for (d = 0; d < t; d++) I = c[d], n[d] = I[0], H[d] = I[1];
                            else a.error(12)
                    } else
                        for (d = 0; d < t; d++) void 0 !== c[d] && (I = {
                            series: m
                        }, m.pointClass.prototype.applyOptions.apply(I, [c[d]]), m.updateParallelArrays(I, d));
                    H && p(H[0]) && a.error(14, !0);
                    m.data = [];
                    m.options.data = m.userOptions.data = c;
                    for (d = y; d--;) k[d] && k[d].destroy && k[d].destroy();
                    v && (v.minRange = v.userMinRange);
                    m.isDirty = z.isDirtyBox = !0;
                    m.isDirtyData = !! k;
                    d = !1
                }
                "point" === l.legendType && (this.processData(), this.generatePoints());
                e &&
                    z.redraw(d)
            },
            processData: function(b) {
                var c = this.xData,
                    d = this.yData,
                    e = c.length,
                    g;
                g = 0;
                var k, f, m = this.xAxis,
                    t, p = this.options;
                t = p.cropThreshold;
                var l = this.getExtremesFromAll || p.getExtremesFromAll,
                    z = this.isCartesian,
                    p = m && m.val2lin,
                    I = m && m.isLog,
                    v = this.requireSorting,
                    h, w;
                if (z && !this.isDirty && !m.isDirty && !this.yAxis.isDirty && !b) return !1;
                m && (b = m.getExtremes(), h = b.min, w = b.max);
                if (z && this.sorted && !l && (!t || e > t || this.forceCrop))
                    if (c[e - 1] < h || c[0] > w) c = [], d = [];
                    else if (c[0] < h || c[e - 1] > w) g = this.cropData(this.xData,
                    this.yData, h, w), c = g.xData, d = g.yData, g = g.start, k = !0;
                for (t = c.length || 1; --t;) e = I ? p(c[t]) - p(c[t - 1]) : c[t] - c[t - 1], 0 < e && (void 0 === f || e < f) ? f = e : 0 > e && v && (a.error(15), v = !1);
                this.cropped = k;
                this.cropStart = g;
                this.processedXData = c;
                this.processedYData = d;
                this.closestPointRange = f
            },
            cropData: function(a, b, d, c) {
                var e = a.length,
                    k = 0,
                    g = e,
                    f = w(this.cropShoulder, 1),
                    m;
                for (m = 0; m < e; m++)
                    if (a[m] >= d) {
                        k = Math.max(0, m - f);
                        break
                    }
                for (d = m; d < e; d++)
                    if (a[d] > c) {
                        g = d + f;
                        break
                    }
                return {
                    xData: a.slice(k, g),
                    yData: b.slice(k, g),
                    start: k,
                    end: g
                }
            },
            generatePoints: function() {
                var a =
                    this.options,
                    b = a.data,
                    d = this.data,
                    c, e = this.processedXData,
                    k = this.processedYData,
                    g = this.pointClass,
                    f = e.length,
                    t = this.cropStart || 0,
                    p, l = this.hasGroupedData,
                    a = a.keys,
                    z, v = [],
                    h;
                d || l || (d = [], d.length = b.length, d = this.data = d);
                a && l && (this.options.keys = !1);
                for (h = 0; h < f; h++) p = t + h, l ? (z = (new g).init(this, [e[h]].concat(m(k[h]))), z.dataGroup = this.groupMap[h]) : (z = d[p]) || void 0 === b[p] || (d[p] = z = (new g).init(this, b[p], e[h])), z && (z.index = p, v[h] = z);
                this.options.keys = a;
                if (d && (f !== (c = d.length) || l))
                    for (h = 0; h < c; h++) h !== t || l ||
                        (h += f), d[h] && (d[h].destroyElements(), d[h].plotX = void 0);
                this.data = d;
                this.points = v
            },
            getExtremes: function(a) {
                var c = this.yAxis,
                    d = this.processedXData,
                    e, f = [],
                    k = 0;
                e = this.xAxis.getExtremes();
                var m = e.min,
                    t = e.max,
                    p, l, z, h;
                a = a || this.stackedYData || this.processedYData || [];
                e = a.length;
                for (h = 0; h < e; h++)
                    if (l = d[h], z = a[h], p = (g(z, !0) || b(z)) && (!c.positiveValuesOnly || z.length || 0 < z), l = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (d[h + 1] || l) >= m && (d[h - 1] || l) <= t, p && l)
                        if (p = z.length)
                            for (; p--;) "number" ===
                                typeof z[p] && (f[k++] = z[p]);
                        else f[k++] = z;
                this.dataMin = q(f);
                this.dataMax = D(f)
            },
            translate: function() {
                this.processedXData || this.processData();
                this.generatePoints();
                var a = this.options,
                    b = a.stacking,
                    d = this.xAxis,
                    c = d.categories,
                    e = this.yAxis,
                    k = this.points,
                    f = k.length,
                    m = !! this.modifyValue,
                    t = a.pointPlacement,
                    p = "between" === t || g(t),
                    l = a.threshold,
                    z = a.startFromThreshold ? l : 0,
                    h, v, H, E, u = Number.MAX_VALUE;
                "between" === t && (t = .5);
                g(t) && (t *= w(a.pointRange || d.pointRange));
                for (a = 0; a < f; a++) {
                    var q = k[a],
                        x = q.x,
                        A = q.y;
                    v = q.low;
                    var C =
                        b && e.stacks[(this.negStacks && A < (z ? 0 : l) ? "-" : "") + this.stackKey],
                        G;
                    e.positiveValuesOnly && null !== A && 0 >= A && (q.isNull = !0);
                    q.plotX = h = n(Math.min(Math.max(-1E5, d.translate(x, 0, 0, 0, 1, t, "flags" === this.type)), 1E5));
                    b && this.visible && !q.isNull && C && C[x] && (E = this.getStackIndicator(E, x, this.index), G = C[x], A = G.points[E.key], v = A[0], A = A[1], v === z && E.key === C[x].base && (v = w(l, e.min)), e.positiveValuesOnly && 0 >= v && (v = null), q.total = q.stackTotal = G.total, q.percentage = G.total && q.y / G.total * 100, q.stackY = A, G.setOffset(this.pointXOffset ||
                        0, this.barW || 0));
                    q.yBottom = r(v) ? Math.min(Math.max(-1E5, e.translate(v, 0, 1, 0, 1)), 1E5) : null;
                    m && (A = this.modifyValue(A, q));
                    q.plotY = v = "number" === typeof A && Infinity !== A ? Math.min(Math.max(-1E5, e.translate(A, 0, 1, 0, 1)), 1E5) : void 0;
                    q.isInside = void 0 !== v && 0 <= v && v <= e.len && 0 <= h && h <= d.len;
                    q.clientX = p ? n(d.translate(x, 0, 0, 0, 1, t)) : h;
                    q.negative = q.y < (l || 0);
                    q.category = c && void 0 !== c[q.x] ? c[q.x] : q.x;
                    q.isNull || (void 0 !== H && (u = Math.min(u, Math.abs(h - H))), H = h);
                    q.zone = this.zones.length && q.getZone()
                }
                this.closestPointRangePx =
                    u
            },
            getValidPoints: function(a, b) {
                var d = this.chart;
                return l(a || this.points || [], function(a) {
                    return b && !d.isInsidePlot(a.plotX, a.plotY, d.inverted) ? !1 : !a.isNull
                })
            },
            setClip: function(a) {
                var b = this.chart,
                    d = this.options,
                    c = b.renderer,
                    e = b.inverted,
                    k = this.clipBox,
                    g = k || b.clipBox,
                    f = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, g.height, d.xAxis, d.yAxis].join(),
                    m = b[f],
                    t = b[f + "m"];
                m || (a && (g.width = 0, e && (g.x = b.plotSizeX), b[f + "m"] = t = c.clipRect(e ? b.plotSizeX + 99 : -99, e ? -b.plotLeft : -b.plotTop, 99, e ? b.chartWidth :
                    b.chartHeight)), b[f] = m = c.clipRect(g), m.count = {
                    length: 0
                });
                a && !m.count[this.index] && (m.count[this.index] = !0, m.count.length += 1);
                !1 !== d.clip && (this.group.clip(a || k ? m : b.clipRect), this.markerGroup.clip(t), this.sharedClipKey = f);
                a || (m.count[this.index] && (delete m.count[this.index], --m.count.length), 0 === m.count.length && f && b[f] && (k || (b[f] = b[f].destroy()), b[f + "m"] && (b[f + "m"] = b[f + "m"].destroy())))
            },
            animate: function(a) {
                var b = this.chart,
                    d = G(this.options.animation),
                    c;
                a ? this.setClip(d) : (c = this.sharedClipKey, (a = b[c]) &&
                    a.animate({
                        width: b.plotSizeX,
                        x: 0
                    }, d), b[c + "m"] && b[c + "m"].animate({
                        width: b.plotSizeX + 99,
                        x: 0
                    }, d), this.animate = null)
            },
            afterAnimate: function() {
                this.setClip();
                c(this, "afterAnimate");
                this.finishedAnimating = !0
            },
            drawPoints: function() {
                var a = this.points,
                    b = this.chart,
                    d, c, e, k, g = this.options.marker,
                    f, m, t, p = this[this.specialGroup] || this.markerGroup,
                    l, z = w(g.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx >= g.enabledThreshold * g.radius);
                if (!1 !== g.enabled || this._hasPointMarkers)
                    for (d = 0; d < a.length; d++) c =
                        a[d], k = c.graphic, f = c.marker || {}, m = !! c.marker, e = z && void 0 === f.enabled || f.enabled, t = c.isInside, e && !c.isNull ? (e = w(f.symbol, this.symbol), l = this.markerAttribs(c, c.selected && "select"), k ? k[t ? "show" : "hide"](!0).animate(l) : t && (0 < l.width || c.hasImage) && (c.graphic = k = b.renderer.symbol(e, l.x, l.y, l.width, l.height, m ? f : g).add(p)), k && k.attr(this.pointAttribs(c, c.selected && "select")), k && k.addClass(c.getClassName(), !0)) : k && (c.graphic = k.destroy())
            },
            markerAttribs: function(a, b) {
                var d = this.options.marker,
                    c = a.marker || {},
                    e = c.symbol || d.symbol,
                    k = w(c.radius, d.radius);
                b && (d = d.states[b], b = c.states && c.states[b], k = w(b && b.radius, d && d.radius, k + (d && d.radiusPlus || 0)));
                a.hasImage = e && 0 === e.indexOf("url");
                a.hasImage && (k = 0);
                a = {
                    x: Math.floor(a.plotX) - k,
                    y: a.plotY - k
                };
                k && (a.width = a.height = 2 * k);
                return a
            },
            pointAttribs: function(a, b) {
                var d = this.options.marker,
                    c = a && a.options,
                    e = c && c.marker || {}, k = this.color,
                    g = c && c.color,
                    f = a && a.color,
                    c = w(e.lineWidth, d.lineWidth);
                a = a && a.zone && a.zone.color;
                k = g || a || f || k;
                a = e.fillColor || d.fillColor || k;
                k = e.lineColor ||
                    d.lineColor || k;
                b && (d = d.states[b], b = e.states && e.states[b] || {}, c = w(b.lineWidth, d.lineWidth, c + w(b.lineWidthPlus, d.lineWidthPlus, 0)), a = b.fillColor || d.fillColor || a, k = b.lineColor || d.lineColor || k);
                return {
                    stroke: k,
                    "stroke-width": c,
                    fill: a
                }
            },
            destroy: function() {
                var a = this,
                    b = a.chart,
                    d = /AppleWebKit\/533/.test(H.navigator.userAgent),
                    g, f, k = a.data || [],
                    m, t;
                c(a, "destroy");
                E(a);
                u(a.axisTypes || [], function(d) {
                    (t = a[d]) && t.series && (A(t.series, a), t.isDirty = t.forceRedraw = !0)
                });
                a.legendItem && a.chart.legend.destroyItem(a);
                for (f = k.length; f--;)(m = k[f]) && m.destroy && m.destroy();
                a.points = null;
                clearTimeout(a.animationTimeout);
                e(a, function(a, b) {
                    a instanceof z && !a.survive && (g = d && "group" === b ? "hide" : "destroy", a[g]())
                });
                b.hoverSeries === a && (b.hoverSeries = null);
                A(b.series, a);
                b.orderSeries();
                e(a, function(d, b) {
                    delete a[b]
                })
            },
            getGraphPath: function(a, b, d) {
                var c = this,
                    e = c.options,
                    k = e.step,
                    g, f = [],
                    m = [],
                    t;
                a = a || c.points;
                (g = a.reversed) && a.reverse();
                (k = {
                    right: 1,
                    center: 2
                }[k] || k && 3) && g && (k = 4 - k);
                !e.connectNulls || b || d || (a = this.getValidPoints(a));
                u(a, function(g, p) {
                    var y = g.plotX,
                        l = g.plotY,
                        z = a[p - 1];
                    (g.leftCliff || z && z.rightCliff) && !d && (t = !0);
                    g.isNull && !r(b) && 0 < p ? t = !e.connectNulls : g.isNull && !b ? t = !0 : (0 === p || t ? p = ["M", g.plotX, g.plotY] : c.getPointSpline ? p = c.getPointSpline(a, g, p) : k ? (p = 1 === k ? ["L", z.plotX, l] : 2 === k ? ["L", (z.plotX + y) / 2, z.plotY, "L", (z.plotX + y) / 2, l] : ["L", y, z.plotY], p.push("L", y, l)) : p = ["L", y, l], m.push(g.x), k && m.push(g.x), f.push.apply(f, p), t = !1)
                });
                f.xMap = m;
                return c.graphPath = f
            },
            drawGraph: function() {
                var a = this,
                    b = this.options,
                    d = (this.gappedPath ||
                        this.getGraphPath).call(this),
                    c = [
                        ["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]
                    ];
                u(this.zones, function(d, e) {
                    c.push(["zone-graph-" + e, "highcharts-graph highcharts-zone-graph-" + e + " " + (d.className || ""), d.color || a.color, d.dashStyle || b.dashStyle])
                });
                u(c, function(c, e) {
                    var k = c[0],
                        g = a[k];
                    g ? (g.endX = a.preventGraphAnimation ? null : d.xMap, g.animate({
                        d: d
                    })) : d.length && (a[k] = a.chart.renderer.path(d).addClass(c[1]).attr({
                        zIndex: 1
                    }).add(a.group), g = {
                        stroke: c[2],
                        "stroke-width": b.lineWidth,
                        fill: a.fillGraph && a.color || "none"
                    }, c[3] ? g.dashstyle = c[3] : "square" !== b.linecap && (g["stroke-linecap"] = g["stroke-linejoin"] = "round"), g = a[k].attr(g).shadow(2 > e && b.shadow));
                    g && (g.startX = d.xMap, g.isArea = d.isArea)
                })
            },
            applyZones: function() {
                var a = this,
                    b = this.chart,
                    d = b.renderer,
                    c = this.zones,
                    e, k, g = this.clips || [],
                    f, m = this.graph,
                    t = this.area,
                    p = Math.max(b.chartWidth, b.chartHeight),
                    l = this[(this.zoneAxis || "y") + "Axis"],
                    z, h, v = b.inverted,
                    n, H, E, r, q = !1;
                c.length && (m || t) && l && void 0 !== l.min && (h = l.reversed, n = l.horiz, m && m.hide(), t && t.hide(),
                    z = l.getExtremes(), u(c, function(c, y) {
                        e = h ? n ? b.plotWidth : 0 : n ? 0 : l.toPixels(z.min);
                        e = Math.min(Math.max(w(k, e), 0), p);
                        k = Math.min(Math.max(Math.round(l.toPixels(w(c.value, z.max), !0)), 0), p);
                        q && (e = k = l.toPixels(z.max));
                        H = Math.abs(e - k);
                        E = Math.min(e, k);
                        r = Math.max(e, k);
                        l.isXAxis ? (f = {
                            x: v ? r : E,
                            y: 0,
                            width: H,
                            height: p
                        }, n || (f.x = b.plotHeight - f.x)) : (f = {
                            x: 0,
                            y: v ? r : E,
                            width: p,
                            height: H
                        }, n && (f.y = b.plotWidth - f.y));
                        v && d.isVML && (f = l.isXAxis ? {
                            x: 0,
                            y: h ? E : r,
                            height: f.width,
                            width: b.chartWidth
                        } : {
                            x: f.y - b.plotLeft - b.spacingBox.x,
                            y: 0,
                            width: f.height,
                            height: b.chartHeight
                        });
                        g[y] ? g[y].animate(f) : (g[y] = d.clipRect(f), m && a["zone-graph-" + y].clip(g[y]), t && a["zone-area-" + y].clip(g[y]));
                        q = c.value > z.max
                    }), this.clips = g)
            },
            invertGroups: function(a) {
                function b() {
                    u(["group", "markerGroup"], function(b) {
                        d[b] && (c.renderer.isVML && d[b].attr({
                            width: d.yAxis.len,
                            height: d.xAxis.len
                        }), d[b].width = d.yAxis.len, d[b].height = d.xAxis.len, d[b].invert(a))
                    })
                }
                var d = this,
                    c = d.chart,
                    e;
                d.xAxis && (e = C(c, "resize", b), C(d, "destroy", e), b(a), d.invertGroups = b)
            },
            plotGroup: function(a, b, d, c, e) {
                var g =
                    this[a],
                    f = !g;
                f && (this[a] = g = this.chart.renderer.g().attr({
                    zIndex: c || .1
                }).add(e));
                g.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (r(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (g.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                g.attr({
                    visibility: d
                })[f ? "attr" : "animate"](this.getPlotBox());
                return g
            },
            getPlotBox: function() {
                var a = this.chart,
                    b = this.xAxis,
                    d = this.yAxis;
                a.inverted && (b = d, d = this.xAxis);
                return {
                    translateX: b ? b.left : a.plotLeft,
                    translateY: d ? d.top : a.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            },
            render: function() {
                var a = this,
                    b = a.chart,
                    d, c = a.options,
                    e = !! a.animate && b.renderer.isSVG && G(c.animation).duration,
                    g = a.visible ? "inherit" : "hidden",
                    f = c.zIndex,
                    m = a.hasRendered,
                    p = b.seriesGroup,
                    l = b.inverted;
                d = a.plotGroup("group", "series", g, f, p);
                a.markerGroup = a.plotGroup("markerGroup", "markers", g, f, p);
                e && a.animate(!0);
                d.inverted = a.isCartesian ? l : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels && a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(l);
                !1 === c.clip || a.sharedClipKey || m || d.clip(b.clipRect);
                e && a.animate();
                m || (a.animationTimeout = t(function() {
                    a.afterAnimate()
                }, e));
                a.isDirty = !1;
                a.hasRendered = !0
            },
            redraw: function() {
                var a = this.chart,
                    b = this.isDirty || this.isDirtyData,
                    d = this.group,
                    c = this.xAxis,
                    e = this.yAxis;
                d && (a.inverted && d.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), d.animate({
                    translateX: w(c && c.left, a.plotLeft),
                    translateY: w(e && e.top,
                        a.plotTop)
                }));
                this.translate();
                this.render();
                b && delete this.kdTree
            },
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function(a, b) {
                var d = this.xAxis,
                    c = this.yAxis,
                    e = this.chart.inverted;
                return this.searchKDTree({
                    clientX: e ? d.len - a.chartY + d.pos : a.chartX - d.pos,
                    plotY: e ? c.len - a.chartX + c.pos : a.chartY - c.pos
                }, b)
            },
            buildKDTree: function() {
                function a(d, c, e) {
                    var g, k;
                    if (k = d && d.length) return g = b.kdAxisArray[c % e], d.sort(function(a, d) {
                        return a[g] - d[g]
                    }), k = Math.floor(k / 2), {
                        point: d[k],
                        left: a(d.slice(0, k), c + 1, e),
                        right: a(d.slice(k +
                            1), c + 1, e)
                    }
                }
                this.buildingKdTree = !0;
                var b = this,
                    d = -1 < b.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                delete b.kdTree;
                t(function() {
                    b.kdTree = a(b.getValidPoints(null, !b.directTouch), d, d);
                    b.buildingKdTree = !1
                }, b.options.kdNow ? 0 : 1)
            },
            searchKDTree: function(a, b) {
                function d(a, b, k, m) {
                    var t = b.point,
                        p = c.kdAxisArray[k % m],
                        y, l, z = t;
                    l = r(a[e]) && r(t[e]) ? Math.pow(a[e] - t[e], 2) : null;
                    y = r(a[g]) && r(t[g]) ? Math.pow(a[g] - t[g], 2) : null;
                    y = (l || 0) + (y || 0);
                    t.dist = r(y) ? Math.sqrt(y) : Number.MAX_VALUE;
                    t.distX = r(l) ? Math.sqrt(l) : Number.MAX_VALUE;
                    p = a[p] - t[p];
                    y = 0 > p ? "left" : "right";
                    l = 0 > p ? "right" : "left";
                    b[y] && (y = d(a, b[y], k + 1, m), z = y[f] < z[f] ? y : t);
                    b[l] && Math.sqrt(p * p) < z[f] && (a = d(a, b[l], k + 1, m), z = a[f] < z[f] ? a : z);
                    return z
                }
                var c = this,
                    e = this.kdAxisArray[0],
                    g = this.kdAxisArray[1],
                    f = b ? "distX" : "dist";
                b = -1 < c.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree || this.buildKDTree();
                if (this.kdTree) return d(a, this.kdTree, b, b)
            }
        })
    })(L);
    (function(a) {
        var C = a.Axis,
            G = a.Chart,
            D = a.correctFloat,
            q = a.defined,
            n = a.destroyObjectProperties,
            h = a.each,
            x =
                a.format,
            r = a.objectEach,
            u = a.pick,
            A = a.Series;
        a.StackItem = function(a, c, l, b, g) {
            var f = a.chart.inverted;
            this.axis = a;
            this.isNegative = l;
            this.options = c;
            this.x = b;
            this.total = null;
            this.points = {};
            this.stack = g;
            this.rightCliff = this.leftCliff = 0;
            this.alignOptions = {
                align: c.align || (f ? l ? "left" : "right" : "center"),
                verticalAlign: c.verticalAlign || (f ? "middle" : l ? "bottom" : "top"),
                y: u(c.y, f ? 4 : l ? 14 : -6),
                x: u(c.x, f ? l ? -6 : 6 : 0)
            };
            this.textAlign = c.textAlign || (f ? l ? "right" : "left" : "center")
        };
        a.StackItem.prototype = {
            destroy: function() {
                n(this,
                    this.axis)
            },
            render: function(a) {
                var c = this.axis.chart,
                    f = this.options,
                    b = f.format,
                    b = b ? x(b, this, c.time) : f.formatter.call(this);
                this.label ? this.label.attr({
                    text: b,
                    visibility: "hidden"
                }) : this.label = c.renderer.text(b, null, null, f.useHTML).css(f.style).attr({
                    align: this.textAlign,
                    rotation: f.rotation,
                    visibility: "hidden"
                }).add(a)
            },
            setOffset: function(a, c) {
                var f = this.axis,
                    b = f.chart,
                    g = f.translate(f.usePercentage ? 100 : this.total, 0, 0, 0, 1),
                    f = f.translate(0),
                    f = Math.abs(g - f);
                a = b.xAxis[0].translate(this.x) + a;
                g = this.getStackBox(b,
                    this, a, g, c, f);
                if (c = this.label) c.align(this.alignOptions, null, g), g = c.alignAttr, c[!1 === this.options.crop || b.isInsidePlot(g.x, g.y) ? "show" : "hide"](!0)
            },
            getStackBox: function(a, c, l, b, g, p) {
                var f = c.axis.reversed,
                    e = a.inverted;
                a = a.plotHeight;
                c = c.isNegative && !f || !c.isNegative && f;
                return {
                    x: e ? c ? b : b - p : l,
                    y: e ? a - l - g : c ? a - b - p : a - b,
                    width: e ? p : g,
                    height: e ? g : p
                }
            }
        };
        G.prototype.getStacks = function() {
            var a = this;
            h(a.yAxis, function(a) {
                a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks)
            });
            h(a.series, function(c) {
                !c.options.stacking || !0 !== c.visible && !1 !== a.options.chart.ignoreHiddenSeries || (c.stackKey = c.type + u(c.options.stack, ""))
            })
        };
        C.prototype.buildStacks = function() {
            var a = this.series,
                c = u(this.options.reversedStacks, !0),
                l = a.length,
                b;
            if (!this.isXAxis) {
                this.usePercentage = !1;
                for (b = l; b--;) a[c ? b : l - b - 1].setStackedPoints();
                for (b = 0; b < l; b++) a[b].modifyStacks()
            }
        };
        C.prototype.renderStackTotals = function() {
            var a = this.chart,
                c = a.renderer,
                l = this.stacks,
                b = this.stackTotalGroup;
            b || (this.stackTotalGroup = b = c.g("stack-labels").attr({
                visibility: "visible",
                zIndex: 6
            }).add());
            b.translate(a.plotLeft, a.plotTop);
            r(l, function(a) {
                r(a, function(a) {
                    a.render(b)
                })
            })
        };
        C.prototype.resetStacks = function() {
            var a = this,
                c = a.stacks;
            a.isXAxis || r(c, function(c) {
                r(c, function(b, g) {
                    b.touched < a.stacksTouched ? (b.destroy(), delete c[g]) : (b.total = null, b.cumulative = null)
                })
            })
        };
        C.prototype.cleanStacks = function() {
            var a;
            this.isXAxis || (this.oldStacks && (a = this.stacks = this.oldStacks), r(a, function(a) {
                r(a, function(a) {
                    a.cumulative = a.total
                })
            }))
        };
        A.prototype.setStackedPoints = function() {
            if (this.options.stacking &&
                (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var f = this.processedXData,
                    c = this.processedYData,
                    l = [],
                    b = c.length,
                    g = this.options,
                    p = g.threshold,
                    h = u(g.startFromThreshold && p, 0),
                    e = g.stack,
                    g = g.stacking,
                    w = this.stackKey,
                    n = "-" + w,
                    m = this.negStacks,
                    z = this.yAxis,
                    t = z.stacks,
                    H = z.oldStacks,
                    r, K, d, y, F, k, B;
                z.stacksTouched += 1;
                for (F = 0; F < b; F++) k = f[F], B = c[F], r = this.getStackIndicator(r, k, this.index), y = r.key, d = (K = m && B < (h ? 0 : p)) ? n : w, t[d] || (t[d] = {}), t[d][k] || (H[d] && H[d][k] ? (t[d][k] = H[d][k], t[d][k].total =
                    null) : t[d][k] = new a.StackItem(z, z.options.stackLabels, K, k, e)), d = t[d][k], null !== B ? (d.points[y] = d.points[this.index] = [u(d.cumulative, h)], q(d.cumulative) || (d.base = y), d.touched = z.stacksTouched, 0 < r.index && !1 === this.singleStacks && (d.points[y][0] = d.points[this.index + "," + k + ",0"][0])) : d.points[y] = d.points[this.index] = null, "percent" === g ? (K = K ? w : n, m && t[K] && t[K][k] ? (K = t[K][k], d.total = K.total = Math.max(K.total, d.total) + Math.abs(B) || 0) : d.total = D(d.total + (Math.abs(B) || 0))) : d.total = D(d.total + (B || 0)), d.cumulative = u(d.cumulative,
                    h) + (B || 0), null !== B && (d.points[y].push(d.cumulative), l[F] = d.cumulative);
                "percent" === g && (z.usePercentage = !0);
                this.stackedYData = l;
                z.oldStacks = {}
            }
        };
        A.prototype.modifyStacks = function() {
            var a = this,
                c = a.stackKey,
                l = a.yAxis.stacks,
                b = a.processedXData,
                g, p = a.options.stacking;
            a[p + "Stacker"] && h([c, "-" + c], function(c) {
                for (var e = b.length, f, h; e--;)
                    if (f = b[e], g = a.getStackIndicator(g, f, a.index, c), h = (f = l[c] && l[c][f]) && f.points[g.key]) a[p + "Stacker"](h, f, e)
            })
        };
        A.prototype.percentStacker = function(a, c, l) {
            c = c.total ? 100 / c.total :
                0;
            a[0] = D(a[0] * c);
            a[1] = D(a[1] * c);
            this.stackedYData[l] = a[1]
        };
        A.prototype.getStackIndicator = function(a, c, l, b) {
            !q(a) || a.x !== c || b && a.key !== b ? a = {
                x: c,
                index: 0,
                key: b
            } : a.index++;
            a.key = [l, c, a.index].join();
            return a
        }
    })(L);
    (function(a) {
        var C = a.addEvent,
            G = a.animate,
            D = a.Axis,
            q = a.createElement,
            n = a.css,
            h = a.defined,
            x = a.each,
            r = a.erase,
            u = a.extend,
            A = a.fireEvent,
            f = a.inArray,
            c = a.isNumber,
            l = a.isObject,
            b = a.isArray,
            g = a.merge,
            p = a.objectEach,
            v = a.pick,
            e = a.Point,
            w = a.Series,
            E = a.seriesTypes,
            m = a.setAnimation,
            z = a.splat;
        u(a.Chart.prototype, {
            addSeries: function(a, b, c) {
                var e, d = this;
                a && (b = v(b, !0), A(d, "addSeries", {
                    options: a
                }, function() {
                    e = d.initSeries(a);
                    d.isDirtyLegend = !0;
                    d.linkSeries();
                    b && d.redraw(c)
                }));
                return e
            },
            addAxis: function(a, b, c, e) {
                var d = b ? "xAxis" : "yAxis",
                    m = this.options;
                a = g(a, {
                    index: this[d].length,
                    isX: b
                });
                b = new D(this, a);
                m[d] = z(m[d] || {});
                m[d].push(a);
                v(c, !0) && this.redraw(e);
                return b
            },
            showLoading: function(a) {
                var b = this,
                    c = b.options,
                    e = b.loadingDiv,
                    d = c.loading,
                    g = function() {
                        e && n(e, {
                            left: b.plotLeft + "px",
                            top: b.plotTop + "px",
                            width: b.plotWidth + "px",
                            height: b.plotHeight + "px"
                        })
                    };
                e || (b.loadingDiv = e = q("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, b.container), b.loadingSpan = q("span", {
                    className: "highcharts-loading-inner"
                }, null, e), C(b, "redraw", g));
                e.className = "highcharts-loading";
                b.loadingSpan.innerHTML = a || c.lang.loading;
                n(e, u(d.style, {
                    zIndex: 10
                }));
                n(b.loadingSpan, d.labelStyle);
                b.loadingShown || (n(e, {
                    opacity: 0,
                    display: ""
                }), G(e, {
                    opacity: d.style.opacity || .5
                }, {
                    duration: d.showDuration || 0
                }));
                b.loadingShown = !0;
                g()
            },
            hideLoading: function() {
                var a =
                    this.options,
                    b = this.loadingDiv;
                b && (b.className = "highcharts-loading highcharts-loading-hidden", G(b, {
                    opacity: 0
                }, {
                    duration: a.loading.hideDuration || 100,
                    complete: function() {
                        n(b, {
                            display: "none"
                        })
                    }
                }));
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
            update: function(a, b, e) {
                var m = this,
                    d = {
                        credits: "addCredits",
                        title: "setTitle",
                        subtitle: "setSubtitle"
                    }, t = a.chart,
                    l, k, n = [];
                if (t) {
                    g(!0, m.options.chart, t);
                    "className" in t && m.setClassName(t.className);
                    if ("inverted" in t || "polar" in t) m.propFromSeries(), l = !0;
                    "alignTicks" in t && (l = !0);
                    p(t, function(a, b) {
                        -1 !== f("chart." + b, m.propsRequireUpdateSeries) && (k = !0); - 1 !== f(b, m.propsRequireDirtyBox) &&
                            (m.isDirtyBox = !0)
                    });
                    "style" in t && m.renderer.setStyle(t.style)
                }
                a.colors && (this.options.colors = a.colors);
                a.plotOptions && g(!0, this.options.plotOptions, a.plotOptions);
                p(a, function(a, b) {
                    if (m[b] && "function" === typeof m[b].update) m[b].update(a, !1);
                    else if ("function" === typeof m[d[b]]) m[d[b]](a);
                    "chart" !== b && -1 !== f(b, m.propsRequireUpdateSeries) && (k = !0)
                });
                x("xAxis yAxis zAxis series colorAxis pane".split(" "), function(b) {
                    a[b] && (x(z(a[b]), function(a, d) {
                        (d = h(a.id) && m.get(a.id) || m[b][d]) && d.coll === b && (d.update(a, !1), e && (d.touched = !0));
                        if (!d && e)
                            if ("series" === b) m.addSeries(a, !1).touched = !0;
                            else if ("xAxis" === b || "yAxis" === b) m.addAxis(a, "xAxis" === b, !1).touched = !0
                    }), e && x(m[b], function(a) {
                        a.touched ? delete a.touched : n.push(a)
                    }))
                });
                x(n, function(a) {
                    a.remove(!1)
                });
                l && x(m.axes, function(a) {
                    a.update({}, !1)
                });
                k && x(m.series, function(a) {
                    a.update({}, !1)
                });
                a.loading && g(!0, m.options.loading, a.loading);
                l = t && t.width;
                t = t && t.height;
                c(l) && l !== m.chartWidth || c(t) && t !== m.chartHeight ? m.setSize(l, t) : v(b, !0) && m.redraw()
            },
            setSubtitle: function(a) {
                this.setTitle(void 0,
                    a)
            }
        });
        u(e.prototype, {
            update: function(a, b, c, e) {
                function d() {
                    g.applyOptions(a);
                    null === g.y && k && (g.graphic = k.destroy());
                    l(a, !0) && (k && k.element && a && a.marker && void 0 !== a.marker.symbol && (g.graphic = k.destroy()), a && a.dataLabels && g.dataLabel && (g.dataLabel = g.dataLabel.destroy()), g.connector && (g.connector = g.connector.destroy()));
                    f = g.index;
                    m.updateParallelArrays(g, f);
                    p.data[f] = l(p.data[f], !0) || l(a, !0) ? g.options : a;
                    m.isDirty = m.isDirtyData = !0;
                    !m.fixedBox && m.hasCartesianSeries && (t.isDirtyBox = !0);
                    "point" === p.legendType &&
                        (t.isDirtyLegend = !0);
                    b && t.redraw(c)
                }
                var g = this,
                    m = g.series,
                    k = g.graphic,
                    f, t = m.chart,
                    p = m.options;
                b = v(b, !0);
                !1 === e ? d() : g.firePointEvent("update", {
                    options: a
                }, d)
            },
            remove: function(a, b) {
                this.series.removePoint(f(this, this.series.data), a, b)
            }
        });
        u(w.prototype, {
            addPoint: function(a, b, c, e) {
                var d = this.options,
                    g = this.data,
                    m = this.chart,
                    k = this.xAxis,
                    k = k && k.hasNames && k.names,
                    f = d.data,
                    t, p, l = this.xData,
                    z, h;
                b = v(b, !0);
                t = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(t, [a]);
                h = t.x;
                z = l.length;
                if (this.requireSorting &&
                    h < l[z - 1])
                    for (p = !0; z && l[z - 1] > h;) z--;
                this.updateParallelArrays(t, "splice", z, 0, 0);
                this.updateParallelArrays(t, z);
                k && t.name && (k[h] = t.name);
                f.splice(z, 0, a);
                p && (this.data.splice(z, 0, null), this.processData());
                "point" === d.legendType && this.generatePoints();
                c && (g[0] && g[0].remove ? g[0].remove(!1) : (g.shift(), this.updateParallelArrays(t, "shift"), f.shift()));
                this.isDirtyData = this.isDirty = !0;
                b && m.redraw(e)
            },
            removePoint: function(a, b, c) {
                var e = this,
                    d = e.data,
                    g = d[a],
                    f = e.points,
                    k = e.chart,
                    t = function() {
                        f && f.length === d.length &&
                            f.splice(a, 1);
                        d.splice(a, 1);
                        e.options.data.splice(a, 1);
                        e.updateParallelArrays(g || {
                            series: e
                        }, "splice", a, 1);
                        g && g.destroy();
                        e.isDirty = !0;
                        e.isDirtyData = !0;
                        b && k.redraw()
                    };
                m(c, k);
                b = v(b, !0);
                g ? g.firePointEvent("remove", null, t) : t()
            },
            remove: function(a, b, c) {
                function e() {
                    d.destroy();
                    g.isDirtyLegend = g.isDirtyBox = !0;
                    g.linkSeries();
                    v(a, !0) && g.redraw(b)
                }
                var d = this,
                    g = d.chart;
                !1 !== c ? A(d, "remove", null, e) : e()
            },
            update: function(a, b) {
                var c = this,
                    e = c.chart,
                    d = c.userOptions,
                    m = c.oldType || c.type,
                    f = a.type || d.type || e.options.chart.type,
                    k = E[m].prototype,
                    t, p = ["group", "markerGroup", "dataLabelsGroup"],
                    z = ["navigatorSeries", "baseSeries"],
                    l = c.finishedAnimating && {
                        animation: !1
                    };
                if (Object.keys && "data" === Object.keys(a).toString()) return this.setData(a.data, b);
                z = p.concat(z);
                x(z, function(a) {
                    z[a] = c[a];
                    delete c[a]
                });
                a = g(d, l, {
                    index: c.index,
                    pointStart: c.xData[0]
                }, {
                    data: c.options.data
                }, a);
                c.remove(!1, null, !1);
                for (t in k) c[t] = void 0;
                u(c, E[f || m].prototype);
                x(z, function(a) {
                    c[a] = z[a]
                });
                c.init(e, a);
                a.zIndex !== d.zIndex && x(p, function(b) {
                    c[b] && c[b].attr({
                        zIndex: a.zIndex
                    })
                });
                c.oldType = m;
                e.linkSeries();
                v(b, !0) && e.redraw(!1)
            }
        });
        u(D.prototype, {
            update: function(a, b) {
                var c = this.chart;
                a = c.options[this.coll][this.options.index] = g(this.userOptions, a);
                this.destroy(!0);
                this.init(c, u(a, {
                    events: void 0
                }));
                c.isDirtyBox = !0;
                v(b, !0) && c.redraw()
            },
            remove: function(a) {
                for (var c = this.chart, e = this.coll, g = this.series, d = g.length; d--;) g[d] && g[d].remove(!1);
                r(c.axes, this);
                r(c[e], this);
                b(c.options[e]) ? c.options[e].splice(this.options.index, 1) : delete c.options[e];
                x(c[e], function(a, b) {
                    a.options.index =
                        b
                });
                this.destroy();
                c.isDirtyBox = !0;
                v(a, !0) && c.redraw()
            },
            setTitle: function(a, b) {
                this.update({
                    title: a
                }, b)
            },
            setCategories: function(a, b) {
                this.update({
                    categories: a
                }, b)
            }
        })
    })(L);
    (function(a) {
        var C = a.color,
            G = a.each,
            D = a.map,
            q = a.pick,
            n = a.Series,
            h = a.seriesType;
        h("area", "line", {
            softThreshold: !1,
            threshold: 0
        }, {
            singleStacks: !1,
            getStackPoints: function(h) {
                var n = [],
                    u = [],
                    x = this.xAxis,
                    f = this.yAxis,
                    c = f.stacks[this.stackKey],
                    l = {}, b = this.index,
                    g = f.series,
                    p = g.length,
                    v, e = q(f.options.reversedStacks, !0) ? 1 : -1,
                    w;
                h = h || this.points;
                if (this.options.stacking) {
                    for (w = 0; w < h.length; w++) h[w].leftNull = h[w].rightNull = null, l[h[w].x] = h[w];
                    a.objectEach(c, function(a, b) {
                        null !== a.total && u.push(b)
                    });
                    u.sort(function(a, b) {
                        return a - b
                    });
                    v = D(g, function() {
                        return this.visible
                    });
                    G(u, function(a, g) {
                        var m = 0,
                            t, h;
                        if (l[a] && !l[a].isNull) n.push(l[a]), G([-1, 1], function(m) {
                            var f = 1 === m ? "rightNull" : "leftNull",
                                d = 0,
                                z = c[u[g + m]];
                            if (z)
                                for (w = b; 0 <= w && w < p;) t = z.points[w], t || (w === b ? l[a][f] = !0 : v[w] && (h = c[a].points[w]) && (d -= h[1] - h[0])), w += e;
                            l[a][1 === m ? "rightCliff" : "leftCliff"] =
                                d
                        });
                        else {
                            for (w = b; 0 <= w && w < p;) {
                                if (t = c[a].points[w]) {
                                    m = t[1];
                                    break
                                }
                                w += e
                            }
                            m = f.translate(m, 0, 1, 0, 1);
                            n.push({
                                isNull: !0,
                                plotX: x.translate(a, 0, 0, 0, 1),
                                x: a,
                                plotY: m,
                                yBottom: m
                            })
                        }
                    })
                }
                return n
            },
            getGraphPath: function(a) {
                var h = n.prototype.getGraphPath,
                    u = this.options,
                    x = u.stacking,
                    f = this.yAxis,
                    c, l, b = [],
                    g = [],
                    p = this.index,
                    v, e = f.stacks[this.stackKey],
                    w = u.threshold,
                    E = f.getThreshold(u.threshold),
                    m, u = u.connectNulls || "percent" === x,
                    z = function(c, m, z) {
                        var t = a[c];
                        c = x && e[t.x].points[p];
                        var d = t[z + "Null"] || 0;
                        z = t[z + "Cliff"] || 0;
                        var l,
                            h, t = !0;
                        z || d ? (l = (d ? c[0] : c[1]) + z, h = c[0] + z, t = !! d) : !x && a[m] && a[m].isNull && (l = h = w);
                        void 0 !== l && (g.push({
                            plotX: v,
                            plotY: null === l ? E : f.getThreshold(l),
                            isNull: t,
                            isCliff: !0
                        }), b.push({
                            plotX: v,
                            plotY: null === h ? E : f.getThreshold(h),
                            doCurve: !1
                        }))
                    };
                a = a || this.points;
                x && (a = this.getStackPoints(a));
                for (c = 0; c < a.length; c++)
                    if (l = a[c].isNull, v = q(a[c].rectPlotX, a[c].plotX), m = q(a[c].yBottom, E), !l || u) u || z(c, c - 1, "left"), l && !x && u || (g.push(a[c]), b.push({
                        x: c,
                        plotX: v,
                        plotY: m
                    })), u || z(c, c + 1, "right");
                c = h.call(this, g, !0, !0);
                b.reversed = !0;
                l = h.call(this, b, !0, !0);
                l.length && (l[0] = "L");
                l = c.concat(l);
                h = h.call(this, g, !1, u);
                l.xMap = c.xMap;
                this.areaPath = l;
                return h
            },
            drawGraph: function() {
                this.areaPath = [];
                n.prototype.drawGraph.apply(this);
                var a = this,
                    h = this.areaPath,
                    u = this.options,
                    A = [
                        ["area", "highcharts-area", this.color, u.fillColor]
                    ];
                G(this.zones, function(f, c) {
                    A.push(["zone-area-" + c, "highcharts-area highcharts-zone-area-" + c + " " + f.className, f.color || a.color, f.fillColor || u.fillColor])
                });
                G(A, function(f) {
                    var c = f[0],
                        l = a[c];
                    l ? (l.endX = a.preventGraphAnimation ?
                        null : h.xMap, l.animate({
                            d: h
                        })) : (l = a[c] = a.chart.renderer.path(h).addClass(f[1]).attr({
                        fill: q(f[3], C(f[2]).setOpacity(q(u.fillOpacity, .75)).get()),
                        zIndex: 0
                    }).add(a.group), l.isArea = !0);
                    l.startX = h.xMap;
                    l.shiftUnit = u.step ? 2 : 1
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(L);
    (function(a) {
        var C = a.pick;
        a = a.seriesType;
        a("spline", "line", {}, {
            getPointSpline: function(a, D, q) {
                var n = D.plotX,
                    h = D.plotY,
                    x = a[q - 1];
                q = a[q + 1];
                var r, u, A, f;
                if (x && !x.isNull && !1 !== x.doCurve && !D.isCliff && q && !q.isNull && !1 !== q.doCurve && !D.isCliff) {
                    a = x.plotY;
                    A = q.plotX;
                    q = q.plotY;
                    var c = 0;
                    r = (1.5 * n + x.plotX) / 2.5;
                    u = (1.5 * h + a) / 2.5;
                    A = (1.5 * n + A) / 2.5;
                    f = (1.5 * h + q) / 2.5;
                    A !== r && (c = (f - u) * (A - n) / (A - r) + h - f);
                    u += c;
                    f += c;
                    u > a && u > h ? (u = Math.max(a, h), f = 2 * h - u) : u < a && u < h && (u = Math.min(a, h), f = 2 * h - u);
                    f > q && f > h ? (f = Math.max(q, h), u = 2 * h - f) : f < q && f < h && (f = Math.min(q, h), u = 2 * h - f);
                    D.rightContX = A;
                    D.rightContY = f
                }
                D = ["C", C(x.rightContX, x.plotX), C(x.rightContY, x.plotY), C(r, n), C(u, h), n, h];
                x.rightContX = x.rightContY = null;
                return D
            }
        })
    })(L);
    (function(a) {
        var C = a.seriesTypes.area.prototype,
            G = a.seriesType;
        G("areaspline", "spline", a.defaultPlotOptions.area, {
            getStackPoints: C.getStackPoints,
            getGraphPath: C.getGraphPath,
            drawGraph: C.drawGraph,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(L);
    (function(a) {
        var C = a.animObject,
            G = a.color,
            D = a.each,
            q = a.extend,
            n = a.isNumber,
            h = a.merge,
            x = a.pick,
            r = a.Series,
            u = a.seriesType,
            A = a.svg;
        u("column", "line", {
            borderRadius: 0,
            crisp: !0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {
                    halo: !1,
                    brightness: .1
                },
                select: {
                    color: "#cccccc",
                    borderColor: "#000000"
                }
            },
            dataLabels: {
                align: null,
                verticalAlign: null,
                y: null
            },
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {
                distance: 6
            },
            threshold: 0,
            borderColor: "#ffffff"
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function() {
                r.prototype.init.apply(this, arguments);
                var a = this,
                    c = a.chart;
                c.hasRendered && D(c.series, function(c) {
                    c.type === a.type && (c.isDirty = !0)
                })
            },
            getColumnMetrics: function() {
                var a = this,
                    c = a.options,
                    l = a.xAxis,
                    b = a.yAxis,
                    g = l.reversed,
                    p, h = {}, e = 0;
                !1 === c.grouping ? e = 1 : D(a.chart.series, function(c) {
                    var g = c.options,
                        m = c.yAxis,
                        f;
                    c.type !== a.type || !c.visible && a.chart.options.chart.ignoreHiddenSeries || b.len !== m.len || b.pos !== m.pos || (g.stacking ? (p = c.stackKey, void 0 === h[p] && (h[p] = e++), f = h[p]) : !1 !== g.grouping && (f = e++), c.columnIndex = f)
                });
                var n = Math.min(Math.abs(l.transA) * (l.ordinalSlope || c.pointRange || l.closestPointRange || l.tickInterval || 1), l.len),
                    E = n * c.groupPadding,
                    m = (n - 2 * E) / (e || 1),
                    c = Math.min(c.maxPointWidth || l.len, x(c.pointWidth,
                        m * (1 - 2 * c.pointPadding)));
                a.columnMetrics = {
                    width: c,
                    offset: (m - c) / 2 + (E + ((a.columnIndex || 0) + (g ? 1 : 0)) * m - n / 2) * (g ? -1 : 1)
                };
                return a.columnMetrics
            },
            crispCol: function(a, c, l, b) {
                var g = this.chart,
                    f = this.borderWidth,
                    h = -(f % 2 ? .5 : 0),
                    f = f % 2 ? .5 : 1;
                g.inverted && g.renderer.isVML && (f += 1);
                this.options.crisp && (l = Math.round(a + l) + h, a = Math.round(a) + h, l -= a);
                b = Math.round(c + b) + f;
                h = .5 >= Math.abs(c) && .5 < b;
                c = Math.round(c) + f;
                b -= c;
                h && b && (--c, b += 1);
                return {
                    x: a,
                    y: c,
                    width: l,
                    height: b
                }
            },
            translate: function() {
                var a = this,
                    c = a.chart,
                    l = a.options,
                    b =
                        a.dense = 2 > a.closestPointRange * a.xAxis.transA,
                    b = a.borderWidth = x(l.borderWidth, b ? 0 : 1),
                    g = a.yAxis,
                    p = l.threshold,
                    h = a.translatedThreshold = g.getThreshold(p),
                    e = x(l.minPointLength, 5),
                    n = a.getColumnMetrics(),
                    E = n.width,
                    m = a.barW = Math.max(E, 1 + 2 * b),
                    z = a.pointXOffset = n.offset;
                c.inverted && (h -= .5);
                l.pointPadding && (m = Math.ceil(m));
                r.prototype.translate.apply(a);
                D(a.points, function(b) {
                    var f = x(b.yBottom, h),
                        t = 999 + Math.abs(f),
                        t = Math.min(Math.max(-t, b.plotY), g.len + t),
                        l = b.plotX + z,
                        d = m,
                        y = Math.min(t, f),
                        v, k = Math.max(t, f) - y;
                    e &&
                        Math.abs(k) < e && (k = e, v = !g.reversed && !b.negative || g.reversed && b.negative, b.y === p && a.dataMax <= p && g.min < p && (v = !v), y = Math.abs(y - h) > e ? f - e : h - (v ? e : 0));
                    b.barX = l;
                    b.pointWidth = E;
                    b.tooltipPos = c.inverted ? [g.len + g.pos - c.plotLeft - t, a.xAxis.len - l - d / 2, k] : [l + d / 2, t + g.pos - c.plotTop, k];
                    b.shapeType = "rect";
                    b.shapeArgs = a.crispCol.apply(a, b.isNull ? [l, h, d, 0] : [l, y, d, k])
                })
            },
            getSymbol: a.noop,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawGraph: function() {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            pointAttribs: function(a, c) {
                var f = this.options,
                    b, g = this.pointAttrToOptions || {};
                b = g.stroke || "borderColor";
                var p = g["stroke-width"] || "borderWidth",
                    v = a && a.color || this.color,
                    e = a && a[b] || f[b] || this.color || v,
                    n = a && a[p] || f[p] || this[p] || 0,
                    g = f.dashStyle;
                a && this.zones.length && (v = a.getZone(), v = a.options.color || v && v.color || this.color);
                c && (a = h(f.states[c], a.options.states && a.options.states[c] || {}), c = a.brightness, v = a.color || void 0 !== c && G(v).brighten(a.brightness).get() || v, e = a[b] || e, n = a[p] || n, g = a.dashStyle || g);
                b = {
                    fill: v,
                    stroke: e,
                    "stroke-width": n
                };
                g && (b.dashstyle = g);
                return b
            },
            drawPoints: function() {
                var a = this,
                    c = this.chart,
                    l = a.options,
                    b = c.renderer,
                    g = l.animationLimit || 250,
                    p;
                D(a.points, function(f) {
                    var e = f.graphic;
                    if (n(f.plotY) && null !== f.y) {
                        p = f.shapeArgs;
                        if (e) e[c.pointCount < g ? "animate" : "attr"](h(p));
                        else f.graphic = e = b[f.shapeType](p).add(f.group || a.group);
                        l.borderRadius && e.attr({
                            r: l.borderRadius
                        });
                        e.attr(a.pointAttribs(f, f.selected && "select")).shadow(l.shadow, null, l.stacking && !l.borderRadius);
                        e.addClass(f.getClassName(), !0)
                    } else e && (f.graphic = e.destroy())
                })
            },
            animate: function(a) {
                var c = this,
                    f = this.yAxis,
                    b = c.options,
                    g = this.chart.inverted,
                    p = {}, h = g ? "translateX" : "translateY",
                    e;
                A && (a ? (p.scaleY = .001, a = Math.min(f.pos + f.len, Math.max(f.pos, f.toPixels(b.threshold))), g ? p.translateX = a - f.len : p.translateY = a, c.group.attr(p)) : (e = c.group.attr(h), c.group.animate({
                    scaleY: 1
                }, q(C(c.options.animation), {
                    step: function(a, b) {
                        p[h] = e + b.pos * (f.pos - e);
                        c.group.attr(p)
                    }
                })), c.animate = null))
            },
            remove: function() {
                var a = this,
                    c = a.chart;
                c.hasRendered && D(c.series,
                    function(c) {
                        c.type === a.type && (c.isDirty = !0)
                    });
                r.prototype.remove.apply(a, arguments)
            }
        })
    })(L);
    (function(a) {
        a = a.seriesType;
        a("bar", "column", null, {
            inverted: !0
        })
    })(L);
    (function(a) {
        var C = a.Series;
        a = a.seriesType;
        a("scatter", "line", {
            lineWidth: 0,
            findNearestPointBy: "xy",
            marker: {
                enabled: !0
            },
            tooltip: {
                headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e",
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            drawGraph: function() {
                this.options.lineWidth && C.prototype.drawGraph.call(this)
            }
        })
    })(L);
    (function(a) {
        var C = a.deg2rad,
            G = a.isNumber,
            D = a.pick,
            q = a.relativeLength;
        a.CenteredSeriesMixin = {
            getCenter: function() {
                var a = this.options,
                    h = this.chart,
                    x = 2 * (a.slicedOffset || 0),
                    r = h.plotWidth - 2 * x,
                    h = h.plotHeight - 2 * x,
                    u = a.center,
                    u = [D(u[0], "50%"), D(u[1], "50%"), a.size || "100%", a.innerSize || 0],
                    A = Math.min(r,
                        h),
                    f, c;
                for (f = 0; 4 > f; ++f) c = u[f], a = 2 > f || 2 === f && /%$/.test(c), u[f] = q(c, [r, h, A, u[2]][f]) + (a ? x : 0);
                u[3] > u[2] && (u[3] = u[2]);
                return u
            },
            getStartAndEndRadians: function(a, h) {
                a = G(a) ? a : 0;
                h = G(h) && h > a && 360 > h - a ? h : a + 360;
                return {
                    start: C * (a + -90),
                    end: C * (h + -90)
                }
            }
        }
    })(L);
    (function(a) {
        var C = a.addEvent,
            G = a.CenteredSeriesMixin,
            D = a.defined,
            q = a.each,
            n = a.extend,
            h = G.getStartAndEndRadians,
            x = a.inArray,
            r = a.noop,
            u = a.pick,
            A = a.Point,
            f = a.Series,
            c = a.seriesType,
            l = a.setAnimation;
        c("pie", "line", {
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                distance: 30,
                enabled: !0,
                formatter: function() {
                    return this.point.isNull ? void 0 : this.point.name
                },
                x: 0
            },
            ignoreHiddenPoint: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {
                followPointer: !0
            },
            borderColor: "#ffffff",
            borderWidth: 1,
            states: {
                hover: {
                    brightness: .1
                }
            }
        }, {
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            axisTypes: [],
            pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
            animate: function(a) {
                var b = this,
                    c = b.points,
                    f = b.startAngleRad;
                a || (q(c, function(a) {
                    var c = a.graphic,
                        e = a.shapeArgs;
                    c && (c.attr({
                        r: a.startR || b.center[3] / 2,
                        start: f,
                        end: f
                    }), c.animate({
                        r: e.r,
                        start: e.start,
                        end: e.end
                    }, b.options.animation))
                }), b.animate = null)
            },
            updateTotals: function() {
                var a, c = 0,
                    f = this.points,
                    h = f.length,
                    e, l = this.options.ignoreHiddenPoint;
                for (a = 0; a < h; a++) e = f[a], c += l && !e.visible ? 0 : e.isNull ? 0 : e.y;
                this.total = c;
                for (a = 0; a < h; a++) e = f[a], e.percentage = 0 < c && (e.visible || !l) ? e.y / c * 100 : 0, e.total = c
            },
            generatePoints: function() {
                f.prototype.generatePoints.call(this);
                this.updateTotals()
            },
            translate: function(a) {
                this.generatePoints();
                var b = 0,
                    c = this.options,
                    f = c.slicedOffset,
                    e = f + (c.borderWidth || 0),
                    l, n, m, z = h(c.startAngle, c.endAngle),
                    t = this.startAngleRad = z.start,
                    z = (this.endAngleRad = z.end) - t,
                    r = this.points,
                    q, x = c.dataLabels.distance,
                    c = c.ignoreHiddenPoint,
                    d, y = r.length,
                    F;
                a || (this.center = a = this.getCenter());
                this.getX = function(b, d, c) {
                    m = Math.asin(Math.min((b - a[1]) / (a[2] / 2 + c.labelDistance), 1));
                    return a[0] + (d ? -1 : 1) * Math.cos(m) * (a[2] / 2 + c.labelDistance)
                };
                for (d = 0; d < y; d++) {
                    F = r[d];
                    F.labelDistance = u(F.options.dataLabels && F.options.dataLabels.distance, x);
                    this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, F.labelDistance);
                    l = t + b * z;
                    if (!c || F.visible) b += F.percentage / 100;
                    n = t + b * z;
                    F.shapeType = "arc";
                    F.shapeArgs = {
                        x: a[0],
                        y: a[1],
                        r: a[2] / 2,
                        innerR: a[3] / 2,
                        start: Math.round(1E3 * l) / 1E3,
                        end: Math.round(1E3 * n) / 1E3
                    };
                    m = (n + l) / 2;
                    m > 1.5 * Math.PI ? m -= 2 * Math.PI : m < -Math.PI / 2 && (m += 2 * Math.PI);
                    F.slicedTranslation = {
                        translateX: Math.round(Math.cos(m) * f),
                        translateY: Math.round(Math.sin(m) * f)
                    };
                    n = Math.cos(m) * a[2] /
                        2;
                    q = Math.sin(m) * a[2] / 2;
                    F.tooltipPos = [a[0] + .7 * n, a[1] + .7 * q];
                    F.half = m < -Math.PI / 2 || m > Math.PI / 2 ? 1 : 0;
                    F.angle = m;
                    l = Math.min(e, F.labelDistance / 5);
                    F.labelPos = [a[0] + n + Math.cos(m) * F.labelDistance, a[1] + q + Math.sin(m) * F.labelDistance, a[0] + n + Math.cos(m) * l, a[1] + q + Math.sin(m) * l, a[0] + n, a[1] + q, 0 > F.labelDistance ? "center" : F.half ? "right" : "left", m]
                }
            },
            drawGraph: null,
            drawPoints: function() {
                var a = this,
                    c = a.chart.renderer,
                    f, l, e, h, E = a.options.shadow;
                E && !a.shadowGroup && (a.shadowGroup = c.g("shadow").add(a.group));
                q(a.points, function(b) {
                    l =
                        b.graphic;
                    if (b.isNull) l && (b.graphic = l.destroy());
                    else {
                        h = b.shapeArgs;
                        f = b.getTranslate();
                        var g = b.shadowGroup;
                        E && !g && (g = b.shadowGroup = c.g("shadow").add(a.shadowGroup));
                        g && g.attr(f);
                        e = a.pointAttribs(b, b.selected && "select");
                        l ? l.setRadialReference(a.center).attr(e).animate(n(h, f)) : (b.graphic = l = c[b.shapeType](h).setRadialReference(a.center).attr(f).add(a.group), b.visible || l.attr({
                            visibility: "hidden"
                        }), l.attr(e).attr({
                            "stroke-linejoin": "round"
                        }).shadow(E, g));
                        l.addClass(b.getClassName())
                    }
                })
            },
            searchPoint: r,
            sortByAngle: function(a, c) {
                a.sort(function(a, b) {
                    return void 0 !== a.angle && (b.angle - a.angle) * c
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            getCenter: G.getCenter,
            getSymbol: r
        }, {
            init: function() {
                A.prototype.init.apply(this, arguments);
                var a = this,
                    c;
                a.name = u(a.name, "Slice");
                c = function(b) {
                    a.slice("select" === b.type)
                };
                C(a, "select", c);
                C(a, "unselect", c);
                return a
            },
            isValid: function() {
                return a.isNumber(this.y, !0) && 0 <= this.y
            },
            setVisible: function(a, c) {
                var b = this,
                    g = b.series,
                    e = g.chart,
                    f = g.options.ignoreHiddenPoint;
                c = u(c, f);
                a !== b.visible && (b.visible = b.options.visible = a = void 0 === a ? !b.visible : a, g.options.data[x(b, g.data)] = b.options, q(["graphic", "dataLabel", "connector", "shadowGroup"], function(c) {
                    if (b[c]) b[c][a ? "show" : "hide"](!0)
                }), b.legendItem && e.legend.colorizeItem(b, a), a || "hover" !== b.state || b.setState(""), f && (g.isDirty = !0), c && e.redraw())
            },
            slice: function(a, c, f) {
                var b = this.series;
                l(f, b.chart);
                u(c, !0);
                this.sliced = this.options.sliced = D(a) ? a : !this.sliced;
                b.options.data[x(this, b.data)] = this.options;
                this.graphic.animate(this.getTranslate());
                this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
            },
            getTranslate: function() {
                return this.sliced ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }
            },
            haloPath: function(a) {
                var b = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(b.x, b.y, b.r + a, b.r + a, {
                    innerR: this.shapeArgs.r - 1,
                    start: b.start,
                    end: b.end
                })
            }
        })
    })(L);
    (function(a) {
        var C = a.addEvent,
            G = a.arrayMax,
            D = a.defined,
            q = a.each,
            n = a.extend,
            h = a.format,
            x = a.map,
            r = a.merge,
            u = a.noop,
            A = a.pick,
            f = a.relativeLength,
            c =
                a.Series,
            l = a.seriesTypes,
            b = a.stableSort;
        a.distribute = function(a, c) {
            function g(a, b) {
                return a.target - b.target
            }
            var e, f = !0,
                p = a,
                m = [],
                l;
            l = 0;
            for (e = a.length; e--;) l += a[e].size;
            if (l > c) {
                b(a, function(a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (l = e = 0; l <= c;) l += a[e].size, e++;
                m = a.splice(e - 1, a.length)
            }
            b(a, g);
            for (a = x(a, function(a) {
                return {
                    size: a.size,
                    targets: [a.target],
                    align: A(a.align, .5)
                }
            }); f;) {
                for (e = a.length; e--;) f = a[e], l = (Math.min.apply(0, f.targets) + Math.max.apply(0, f.targets)) / 2, f.pos = Math.min(Math.max(0, l - f.size *
                    f.align), c - f.size);
                e = a.length;
                for (f = !1; e--;) 0 < e && a[e - 1].pos + a[e - 1].size > a[e].pos && (a[e - 1].size += a[e].size, a[e - 1].targets = a[e - 1].targets.concat(a[e].targets), a[e - 1].align = .5, a[e - 1].pos + a[e - 1].size > c && (a[e - 1].pos = c - a[e - 1].size), a.splice(e, 1), f = !0)
            }
            e = 0;
            q(a, function(a) {
                var b = 0;
                q(a.targets, function() {
                    p[e].pos = a.pos + b;
                    b += p[e].size;
                    e++
                })
            });
            p.push.apply(p, m);
            b(p, g)
        };
        c.prototype.drawDataLabels = function() {
            function b(a, b) {
                var d = b.filter;
                return d ? (b = d.operator, a = a[d.property], d = d.value, "\x3e" === b && a > d || "\x3c" ===
                    b && a < d || "\x3e\x3d" === b && a >= d || "\x3c\x3d" === b && a <= d || "\x3d\x3d" === b && a == d || "\x3d\x3d\x3d" === b && a === d ? !0 : !1) : !0
            }
            var c = this,
                f = c.chart,
                e = c.options,
                l = e.dataLabels,
                n = c.points,
                m, z, t = c.hasRendered || 0,
                H, u, x = A(l.defer, !! e.animation),
                d = f.renderer;
            if (l.enabled || c._hasPointLabels) c.dlProcessOptions && c.dlProcessOptions(l), u = c.plotGroup("dataLabelsGroup", "data-labels", x && !t ? "hidden" : "visible", l.zIndex || 6), x && (u.attr({
                opacity: +t
            }), t || C(c, "afterAnimate", function() {
                c.visible && u.show(!0);
                u[e.animation ? "animate" : "attr"]({
                    opacity: 1
                }, {
                    duration: 200
                })
            })), z = l, q(n, function(g) {
                var t, k = g.dataLabel,
                    p, y, n = g.connector,
                    v = !k,
                    w;
                m = g.dlOptions || g.options && g.options.dataLabels;
                (t = A(m && m.enabled, z.enabled) && !g.isNull) && (t = !0 === b(g, m || l));
                t && (l = r(z, m), p = g.getLabelConfig(), w = l[g.formatPrefix + "Format"] || l.format, H = D(w) ? h(w, p, f.time) : (l[g.formatPrefix + "Formatter"] || l.formatter).call(p, l), w = l.style, p = l.rotation, w.color = A(l.color, w.color, c.color, "#000000"), "contrast" === w.color && (g.contrastColor = d.getContrast(g.color || c.color), w.color = l.inside || 0 > A(g.labelDistance,
                    l.distance) || e.stacking ? g.contrastColor : "#000000"), e.cursor && (w.cursor = e.cursor), y = {
                    fill: l.backgroundColor,
                    stroke: l.borderColor,
                    "stroke-width": l.borderWidth,
                    r: l.borderRadius || 0,
                    rotation: p,
                    padding: l.padding,
                    zIndex: 1
                }, a.objectEach(y, function(a, b) {
                    void 0 === a && delete y[b]
                }));
                !k || t && D(H) ? t && D(H) && (k ? y.text = H : (k = g.dataLabel = p ? d.text(H, 0, -9999).addClass("highcharts-data-label") : d.label(H, 0, -9999, l.shape, null, null, l.useHTML, null, "data-label"), k.addClass(" highcharts-data-label-color-" + g.colorIndex + " " + (l.className ||
                    "") + (l.useHTML ? "highcharts-tracker" : ""))), k.attr(y), k.css(w).shadow(l.shadow), k.added || k.add(u), c.alignDataLabel(g, k, l, null, v)) : (g.dataLabel = k = k.destroy(), n && (g.connector = n.destroy()))
            })
        };
        c.prototype.alignDataLabel = function(a, b, c, e, f) {
            var g = this.chart,
                m = g.inverted,
                l = A(a.dlBox && a.dlBox.centerX, a.plotX, -9999),
                t = A(a.plotY, -9999),
                h = b.getBBox(),
                p, v = c.rotation,
                d = c.align,
                y = this.visible && (a.series.forceDL || g.isInsidePlot(l, Math.round(t), m) || e && g.isInsidePlot(l, m ? e.x + 1 : e.y + e.height - 1, m)),
                w = "justify" === A(c.overflow,
                    "justify");
            if (y && (p = c.style.fontSize, p = g.renderer.fontMetrics(p, b).b, e = n({
                    x: m ? this.yAxis.len - t : l,
                    y: Math.round(m ? this.xAxis.len - l : t),
                    width: 0,
                    height: 0
                }, e), n(c, {
                    width: h.width,
                    height: h.height
                }), v ? (w = !1, l = g.renderer.rotCorr(p, v), l = {
                    x: e.x + c.x + e.width / 2 + l.x,
                    y: e.y + c.y + {
                        top: 0,
                        middle: .5,
                        bottom: 1
                    }[c.verticalAlign] * e.height
                }, b[f ? "attr" : "animate"](l).attr({
                    align: d
                }), t = (v + 720) % 360, t = 180 < t && 360 > t, "left" === d ? l.y -= t ? h.height : 0 : "center" === d ? (l.x -= h.width / 2, l.y -= h.height / 2) : "right" === d && (l.x -= h.width, l.y -= t ? 0 : h.height)) :
                (b.align(c, null, e), l = b.alignAttr), w ? a.isLabelJustified = this.justifyDataLabel(b, c, l, h, e, f) : A(c.crop, !0) && (y = g.isInsidePlot(l.x, l.y) && g.isInsidePlot(l.x + h.width, l.y + h.height)), c.shape && !v)) b[f ? "attr" : "animate"]({
                anchorX: m ? g.plotWidth - a.plotY : a.plotX,
                anchorY: m ? g.plotHeight - a.plotX : a.plotY
            });
            y || (b.attr({
                y: -9999
            }), b.placed = !1)
        };
        c.prototype.justifyDataLabel = function(a, b, c, e, f, l) {
            var g = this.chart,
                h = b.align,
                t = b.verticalAlign,
                p, n, v = a.box ? 0 : a.padding || 0;
            p = c.x + v;
            0 > p && ("right" === h ? b.align = "left" : b.x = -p, n = !0);
            p = c.x + e.width - v;
            p > g.plotWidth && ("left" === h ? b.align = "right" : b.x = g.plotWidth - p, n = !0);
            p = c.y + v;
            0 > p && ("bottom" === t ? b.verticalAlign = "top" : b.y = -p, n = !0);
            p = c.y + e.height - v;
            p > g.plotHeight && ("top" === t ? b.verticalAlign = "bottom" : b.y = g.plotHeight - p, n = !0);
            n && (a.placed = !l, a.align(b, null, f));
            return n
        };
        l.pie && (l.pie.prototype.drawDataLabels = function() {
            var b = this,
                f = b.data,
                l, e = b.chart,
                h = b.options.dataLabels,
                n = A(h.connectorPadding, 10),
                m = A(h.connectorWidth, 1),
                z = e.plotWidth,
                t = e.plotHeight,
                r, u = b.center,
                x = u[2] / 2,
                d = u[1],
                y, F,
                k, B, O = [
                    [],
                    []
                ],
                N, M, C, Q, J = [0, 0, 0, 0];
            b.visible && (h.enabled || b._hasPointLabels) && (q(f, function(a) {
                a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({
                    width: "auto"
                }).css({
                    width: "auto",
                    textOverflow: "clip"
                }), a.dataLabel.shortened = !1)
            }), c.prototype.drawDataLabels.apply(b), q(f, function(a) {
                a.dataLabel && a.visible && (O[a.half].push(a), a.dataLabel._pos = null)
            }), q(O, function(c, g) {
                var m, f, p = c.length,
                    v = [],
                    w;
                if (p)
                    for (b.sortByAngle(c, g - .5), 0 < b.maxLabelDistance && (m = Math.max(0, d - x - b.maxLabelDistance), f = Math.min(d +
                        x + b.maxLabelDistance, e.plotHeight), q(c, function(a) {
                        0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, d - x - a.labelDistance), a.bottom = Math.min(d + x + a.labelDistance, e.plotHeight), w = a.dataLabel.getBBox().height || 21, a.positionsIndex = v.push({
                            target: a.labelPos[1] - a.top + w / 2,
                            size: w,
                            rank: a.y
                        }) - 1)
                    }), a.distribute(v, f + w - m)), Q = 0; Q < p; Q++) l = c[Q], f = l.positionsIndex, k = l.labelPos, y = l.dataLabel, C = !1 === l.visible ? "hidden" : "inherit", M = m = k[1], v && D(v[f]) && (void 0 === v[f].pos ? C = "hidden" : (B = v[f].size, M = l.top + v[f].pos)), delete l.positionIndex,
                N = h.justify ? u[0] + (g ? -1 : 1) * (x + l.labelDistance) : b.getX(M < l.top + 2 || M > l.bottom - 2 ? m : M, g, l), y._attr = {
                    visibility: C,
                    align: k[6]
                }, y._pos = {
                    x: N + h.x + ({
                        left: n,
                        right: -n
                    }[k[6]] || 0),
                    y: M + h.y - 10
                }, k.x = N, k.y = M, A(h.crop, !0) && (F = y.getBBox().width, m = null, N - F < n ? (m = Math.round(F - N + n), J[3] = Math.max(m, J[3])) : N + F > z - n && (m = Math.round(N + F - z + n), J[1] = Math.max(m, J[1])), 0 > M - B / 2 ? J[0] = Math.max(Math.round(-M + B / 2), J[0]) : M + B / 2 > t && (J[2] = Math.max(Math.round(M + B / 2 - t), J[2])), y.sideOverflow = m)
            }), 0 === G(J) || this.verifyDataLabelOverflow(J)) && (this.placeDataLabels(),
                m && q(this.points, function(a) {
                    var d;
                    r = a.connector;
                    if ((y = a.dataLabel) && y._pos && a.visible && 0 < a.labelDistance) {
                        C = y._attr.visibility;
                        if (d = !r) a.connector = r = e.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + a.colorIndex).add(b.dataLabelsGroup), r.attr({
                            "stroke-width": m,
                            stroke: h.connectorColor || a.color || "#666666"
                        });
                        r[d ? "attr" : "animate"]({
                            d: b.connectorPath(a.labelPos)
                        });
                        r.attr("visibility", C)
                    } else r && (a.connector = r.destroy())
                }))
        }, l.pie.prototype.connectorPath = function(a) {
            var b =
                a.x,
                c = a.y;
            return A(this.options.dataLabels.softConnector, !0) ? ["M", b + ("left" === a[6] ? 5 : -5), c, "C", b, c, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" === a[6] ? 5 : -5), c, "L", a[2], a[3], "L", a[4], a[5]]
        }, l.pie.prototype.placeDataLabels = function() {
            q(this.points, function(a) {
                var b = a.dataLabel;
                b && a.visible && ((a = b._pos) ? (b.sideOverflow && (b._attr.width = b.getBBox().width - b.sideOverflow, b.css({
                        width: b._attr.width + "px",
                        textOverflow: "ellipsis"
                    }), b.shortened = !0), b.attr(b._attr), b[b.moved ? "animate" : "attr"](a),
                    b.moved = !0) : b && b.attr({
                    y: -9999
                }))
            }, this)
        }, l.pie.prototype.alignDataLabel = u, l.pie.prototype.verifyDataLabelOverflow = function(a) {
            var b = this.center,
                c = this.options,
                e = c.center,
                g = c.minSize || 80,
                l, m = null !== c.size;
            m || (null !== e[0] ? l = Math.max(b[2] - Math.max(a[1], a[3]), g) : (l = Math.max(b[2] - a[1] - a[3], g), b[0] += (a[3] - a[1]) / 2), null !== e[1] ? l = Math.max(Math.min(l, b[2] - Math.max(a[0], a[2])), g) : (l = Math.max(Math.min(l, b[2] - a[0] - a[2]), g), b[1] += (a[0] - a[2]) / 2), l < b[2] ? (b[2] = l, b[3] = Math.min(f(c.innerSize || 0, l), l), this.translate(b),
                this.drawDataLabels && this.drawDataLabels()) : m = !0);
            return m
        });
        l.column && (l.column.prototype.alignDataLabel = function(a, b, f, e, l) {
            var g = this.chart.inverted,
                m = a.series,
                h = a.dlBox || a.shapeArgs,
                t = A(a.below, a.plotY > A(this.translatedThreshold, m.yAxis.len)),
                p = A(f.inside, !! this.options.stacking);
            h && (e = r(h), 0 > e.y && (e.height += e.y, e.y = 0), h = e.y + e.height - m.yAxis.len, 0 < h && (e.height -= h), g && (e = {
                x: m.yAxis.len - e.y - e.height,
                y: m.xAxis.len - e.x - e.width,
                width: e.height,
                height: e.width
            }), p || (g ? (e.x += t ? 0 : e.width, e.width = 0) : (e.y +=
                t ? e.height : 0, e.height = 0)));
            f.align = A(f.align, !g || p ? "center" : t ? "right" : "left");
            f.verticalAlign = A(f.verticalAlign, g || p ? "middle" : t ? "top" : "bottom");
            c.prototype.alignDataLabel.call(this, a, b, f, e, l);
            a.isLabelJustified && a.contrastColor && a.dataLabel.css({
                color: a.contrastColor
            })
        })
    })(L);
    (function(a) {
        var C = a.Chart,
            G = a.each,
            D = a.objectEach,
            q = a.pick;
        a = a.addEvent;
        a(C.prototype, "render", function() {
            var a = [];
            G(this.labelCollectors || [], function(h) {
                a = a.concat(h())
            });
            G(this.yAxis || [], function(h) {
                h.options.stackLabels && !h.options.stackLabels.allowOverlap && D(h.stacks, function(h) {
                    D(h, function(h) {
                        a.push(h.label)
                    })
                })
            });
            G(this.series || [], function(h) {
                var n = h.options.dataLabels,
                    r = h.dataLabelCollections || ["dataLabel"];
                (n.enabled || h._hasPointLabels) && !n.allowOverlap && h.visible && G(r, function(n) {
                        G(h.points, function(h) {
                            h[n] && (h[n].labelrank = q(h.labelrank, h.shapeArgs && h.shapeArgs.height), a.push(h[n]))
                        })
                    })
            });
            this.hideOverlappingLabels(a)
        });
        C.prototype.hideOverlappingLabels = function(a) {
            var h = a.length,
                n, r, q, A, f, c, l, b, g, p = function(a,
                    b, c, g, m, f, l, h) {
                    return !(m > a + c || m + l < a || f > b + g || f + h < b)
                };
            for (r = 0; r < h; r++)
                if (n = a[r]) n.oldOpacity = n.opacity, n.newOpacity = 1, n.width || (q = n.getBBox(), n.width = q.width, n.height = q.height);
            a.sort(function(a, b) {
                return (b.labelrank || 0) - (a.labelrank || 0)
            });
            for (r = 0; r < h; r++)
                for (q = a[r], n = r + 1; n < h; ++n)
                    if (A = a[n], q && A && q !== A && q.placed && A.placed && 0 !== q.newOpacity && 0 !== A.newOpacity && (f = q.alignAttr, c = A.alignAttr, l = q.parentGroup, b = A.parentGroup, g = 2 * (q.box ? 0 : q.padding || 0), f = p(f.x + l.translateX, f.y + l.translateY, q.width - g, q.height -
                        g, c.x + b.translateX, c.y + b.translateY, A.width - g, A.height - g)))(q.labelrank < A.labelrank ? q : A).newOpacity = 0;
            G(a, function(a) {
                var b, c;
                a && (c = a.newOpacity, a.oldOpacity !== c && a.placed && (c ? a.show(!0) : b = function() {
                    a.hide()
                }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)), a.isOld = !0)
            })
        }
    })(L);
    (function(a) {
        var C = a.addEvent,
            G = a.Chart,
            D = a.createElement,
            q = a.css,
            n = a.defaultOptions,
            h = a.defaultPlotOptions,
            x = a.each,
            r = a.extend,
            u = a.fireEvent,
            A = a.hasTouch,
            f = a.inArray,
            c = a.isObject,
            l = a.Legend,
            b = a.merge,
            g = a.pick,
            p = a.Point,
            v = a.Series,
            e = a.seriesTypes,
            w = a.svg,
            E;
        E = a.TrackerMixin = {
            drawTrackerPoint: function() {
                var a = this,
                    b = a.chart.pointer,
                    c = function(a) {
                        var c = b.getPointFromEvent(a);
                        void 0 !== c && (b.isDirectTouch = !0, c.onMouseOver(a))
                    };
                x(a.points, function(a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a)
                });
                a._hasTracking || (x(a.trackerGroups, function(e) {
                    if (a[e]) {
                        a[e].addClass("highcharts-tracker").on("mouseover", c).on("mouseout", function(a) {
                            b.onTrackerMouseOut(a)
                        });
                        if (A) a[e].on("touchstart", c);
                        a.options.cursor && a[e].css(q).css({
                            cursor: a.options.cursor
                        })
                    }
                }), a._hasTracking = !0)
            },
            drawTrackerGraph: function() {
                var a = this,
                    b = a.options,
                    c = b.trackByArea,
                    e = [].concat(c ? a.areaPath : a.graphPath),
                    g = e.length,
                    f = a.chart,
                    d = f.pointer,
                    l = f.renderer,
                    h = f.options.tooltip.snap,
                    k = a.tracker,
                    p, n = function() {
                        if (f.hoverSeries !== a) a.onMouseOver()
                    }, v = "rgba(192,192,192," + (w ? .0001 : .002) + ")";
                if (g && !c)
                    for (p = g + 1; p--;) "M" === e[p] && e.splice(p + 1, 0, e[p + 1] - h, e[p + 2], "L"), (p && "M" === e[p] || p === g) && e.splice(p,
                        0, "L", e[p - 2] + h, e[p - 1]);
                k ? k.attr({
                    d: e
                }) : a.graph && (a.tracker = l.path(e).attr({
                    "stroke-linejoin": "round",
                    visibility: a.visible ? "visible" : "hidden",
                    stroke: v,
                    fill: c ? v : "none",
                    "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * h),
                    zIndex: 2
                }).add(a.group), x([a.tracker, a.markerGroup], function(a) {
                    a.addClass("highcharts-tracker").on("mouseover", n).on("mouseout", function(a) {
                        d.onTrackerMouseOut(a)
                    });
                    b.cursor && a.css({
                        cursor: b.cursor
                    });
                    if (A) a.on("touchstart", n)
                }))
            }
        };
        e.column && (e.column.prototype.drawTracker = E.drawTrackerPoint);
        e.pie && (e.pie.prototype.drawTracker = E.drawTrackerPoint);
        e.scatter && (e.scatter.prototype.drawTracker = E.drawTrackerPoint);
        r(l.prototype, {
            setItemEvents: function(a, c, e) {
                var g = this,
                    f = g.chart.renderer.boxWrapper,
                    m = "highcharts-legend-" + (a instanceof p ? "point" : "series") + "-active";
                (e ? c : a.legendGroup).on("mouseover", function() {
                        a.setState("hover");
                        f.addClass(m);
                        c.css(g.options.itemHoverStyle)
                    }).on("mouseout", function() {
                        c.css(b(a.visible ? g.itemStyle : g.itemHiddenStyle));
                        f.removeClass(m);
                        a.setState()
                    }).on("click",
                        function(b) {
                            var d = function() {
                                a.setVisible && a.setVisible()
                            };
                            f.removeClass(m);
                            b = {
                                browserEvent: b
                            };
                            a.firePointEvent ? a.firePointEvent("legendItemClick", b, d) : u(a, "legendItemClick", b, d)
                        })
            },
            createCheckboxForItem: function(a) {
                a.checkbox = D("input", {
                    type: "checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                C(a.checkbox, "click", function(b) {
                    u(a.series || a, "checkboxClick", {
                        checked: b.target.checked,
                        item: a
                    }, function() {
                        a.select()
                    })
                })
            }
        });
        n.legend.itemStyle.cursor =
            "pointer";
        r(G.prototype, {
            showResetZoom: function() {
                var a = this,
                    b = n.lang,
                    c = a.options.chart.resetZoomButton,
                    e = c.theme,
                    g = e.states,
                    f = "chart" === c.relativeTo ? null : "plotBox";
                this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function() {
                    a.zoomOut()
                }, e, g && g.hover).attr({
                    align: c.position.align,
                    title: b.resetZoomTitle
                }).addClass("highcharts-reset-zoom").add().align(c.position, !1, f)
            },
            zoomOut: function() {
                var a = this;
                u(a, "selection", {
                    resetSelection: !0
                }, function() {
                    a.zoom()
                })
            },
            zoom: function(a) {
                var b, e = this.pointer,
                    f = !1,
                    m;
                !a || a.resetSelection ? (x(this.axes, function(a) {
                    b = a.zoom()
                }), e.initiated = !1) : x(a.xAxis.concat(a.yAxis), function(a) {
                    var d = a.axis;
                    e[d.isXAxis ? "zoomX" : "zoomY"] && (b = d.zoom(a.min, a.max), d.displayBtn && (f = !0))
                });
                m = this.resetZoomButton;
                f && !m ? this.showResetZoom() : !f && c(m) && (this.resetZoomButton = m.destroy());
                b && this.redraw(g(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            },
            pan: function(a, b) {
                var c = this,
                    e = c.hoverPoints,
                    g;
                e && x(e, function(a) {
                    a.setState()
                });
                x("xy" === b ? [1, 0] : [1], function(b) {
                    b =
                        c[b ? "xAxis" : "yAxis"][0];
                    var d = b.horiz,
                        e = a[d ? "chartX" : "chartY"],
                        d = d ? "mouseDownX" : "mouseDownY",
                        f = c[d],
                        k = (b.pointRange || 0) / 2,
                        m = b.getExtremes(),
                        l = b.toValue(f - e, !0) + k,
                        h = b.toValue(f + b.len - e, !0) - k,
                        t = h < l,
                        f = t ? h : l,
                        l = t ? l : h,
                        h = Math.min(m.dataMin, k ? m.min : b.toValue(b.toPixels(m.min) - b.minPixelPadding)),
                        k = Math.max(m.dataMax, k ? m.max : b.toValue(b.toPixels(m.max) + b.minPixelPadding)),
                        t = h - f;
                    0 < t && (l += t, f = h);
                    t = l - k;
                    0 < t && (l = k, f -= t);
                    b.series.length && f !== m.min && l !== m.max && (b.setExtremes(f, l, !1, !1, {
                        trigger: "pan"
                    }), g = !0);
                    c[d] =
                        e
                });
                g && c.redraw(!1);
                q(c.container, {
                    cursor: "move"
                })
            }
        });
        r(p.prototype, {
            select: function(a, b) {
                var c = this,
                    e = c.series,
                    m = e.chart;
                a = g(a, !c.selected);
                c.firePointEvent(a ? "select" : "unselect", {
                    accumulate: b
                }, function() {
                    c.selected = c.options.selected = a;
                    e.options.data[f(c, e.data)] = c.options;
                    c.setState(a && "select");
                    b || x(m.getSelectedPoints(), function(a) {
                        a.selected && a !== c && (a.selected = a.options.selected = !1, e.options.data[f(a, e.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                    })
                })
            },
            onMouseOver: function(a) {
                var b =
                    this.series.chart,
                    c = b.pointer;
                a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted);
                c.runPointActions(a, this)
            },
            onMouseOut: function() {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                x(a.hoverPoints || [], function(a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint = null
            },
            importEvents: function() {
                if (!this.hasImportedEvents) {
                    var c = this,
                        e = b(c.series.options.point, c.options).events;
                    c.events = e;
                    a.objectEach(e, function(a, b) {
                        C(c, b, a)
                    });
                    this.hasImportedEvents = !0
                }
            },
            setState: function(a, b) {
                var c = Math.floor(this.plotX),
                    e = this.plotY,
                    f = this.series,
                    m = f.options.states[a || "normal"] || {}, d = h[f.type].marker && f.options.marker,
                    l = d && !1 === d.enabled,
                    p = d && d.states && d.states[a || "normal"] || {}, k = !1 === p.enabled,
                    n = f.stateMarkerGraphic,
                    z = this.marker || {}, v = f.chart,
                    w = f.halo,
                    q, E = d && f.markerAttribs;
                a = a || "";
                if (!(a === this.state && !b || this.selected && "select" !== a || !1 === m.enabled || a && (k || l && !1 === p.enabled) || a && z.states && z.states[a] && !1 === z.states[a].enabled)) {
                    E && (q = f.markerAttribs(this, a));
                    if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" +
                        this.state), a && this.graphic.addClass("highcharts-point-" + a), this.graphic.animate(f.pointAttribs(this, a), g(v.options.chart.animation, m.animation)), q && this.graphic.animate(q, g(v.options.chart.animation, p.animation, d.animation)), n && n.hide();
                    else {
                        if (a && p) {
                            d = z.symbol || f.symbol;
                            n && n.currentSymbol !== d && (n = n.destroy());
                            if (n) n[b ? "animate" : "attr"]({
                                x: q.x,
                                y: q.y
                            });
                            else d && (f.stateMarkerGraphic = n = v.renderer.symbol(d, q.x, q.y, q.width, q.height).add(f.markerGroup), n.currentSymbol = d);
                            n && n.attr(f.pointAttribs(this,
                                a))
                        }
                        n && (n[a && v.isInsidePlot(c, e, v.inverted) ? "show" : "hide"](), n.element.point = this)
                    }(c = m.halo) && c.size ? (w || (f.halo = w = v.renderer.path().add((this.graphic || n).parentGroup)), w.show()[b ? "animate" : "attr"]({
                        d: this.haloPath(c.size)
                    }), w.attr({
                        "class": "highcharts-halo highcharts-color-" + g(this.colorIndex, f.colorIndex)
                    }), w.point = this, w.attr(r({
                        fill: this.color || f.color,
                        "fill-opacity": c.opacity,
                        zIndex: -1
                    }, c.attributes))) : w && w.point && w.point.haloPath && w.animate({
                        d: w.point.haloPath(0)
                    }, null, w.hide);
                    this.state = a
                }
            },
            haloPath: function(a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        r(v.prototype, {
            onMouseOver: function() {
                var a = this.chart,
                    b = a.hoverSeries;
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver && u(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            },
            onMouseOut: function() {
                var a = this.options,
                    b = this.chart,
                    c = b.tooltip,
                    e = b.hoverPoint;
                b.hoverSeries = null;
                if (e) e.onMouseOut();
                this && a.events.mouseOut && u(this, "mouseOut");
                !c || this.stickyTracking ||
                    c.shared && !this.noSharedTooltip || c.hide();
                this.setState()
            },
            setState: function(a) {
                var b = this,
                    c = b.options,
                    e = b.graph,
                    f = c.states,
                    m = c.lineWidth,
                    c = 0;
                a = a || "";
                if (b.state !== a && (x([b.group, b.markerGroup, b.dataLabelsGroup], function(d) {
                    d && (b.state && d.removeClass("highcharts-series-" + b.state), a && d.addClass("highcharts-series-" + a))
                }), b.state = a, !f[a] || !1 !== f[a].enabled) && (a && (m = f[a].lineWidth || m + (f[a].lineWidthPlus || 0)), e && !e.dashstyle))
                    for (m = {
                        "stroke-width": m
                    }, e.animate(m, g(f[a || "normal"] && f[a || "normal"].animation,
                        b.chart.options.chart.animation)); b["zone-graph-" + c];) b["zone-graph-" + c].attr(m), c += 1
            },
            setVisible: function(a, b) {
                var c = this,
                    e = c.chart,
                    g = c.legendItem,
                    f, d = e.options.chart.ignoreHiddenSeries,
                    m = c.visible;
                f = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !m : a) ? "show" : "hide";
                x(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function(a) {
                    if (c[a]) c[a][f]()
                });
                if (e.hoverSeries === c || (e.hoverPoint && e.hoverPoint.series) === c) c.onMouseOut();
                g && e.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking &&
                    x(e.series, function(a) {
                        a.options.stacking && a.visible && (a.isDirty = !0)
                    });
                x(c.linkedSeries, function(b) {
                    b.setVisible(a, !1)
                });
                d && (e.isDirtyBox = !0);
                !1 !== b && e.redraw();
                u(c, f)
            },
            show: function() {
                this.setVisible(!0)
            },
            hide: function() {
                this.setVisible(!1)
            },
            select: function(a) {
                this.selected = a = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                u(this, a ? "select" : "unselect")
            },
            drawTracker: E.drawTrackerGraph
        })
    })(L);
    (function(a) {
        var C = a.Chart,
            G = a.each,
            D = a.inArray,
            q = a.isArray,
            n = a.isObject,
            h = a.pick,
            x = a.splat;
        C.prototype.setResponsive = function(h) {
            var n = this.options.responsive,
                r = [],
                f = this.currentResponsive;
            n && n.rules && G(n.rules, function(c) {
                void 0 === c._id && (c._id = a.uniqueKey());
                this.matchResponsiveRule(c, r, h)
            }, this);
            var c = a.merge.apply(0, a.map(r, function(c) {
                return a.find(n.rules, function(a) {
                    return a._id === c
                }).chartOptions
            })),
                r = r.toString() || void 0;
            r !== (f && f.ruleIds) && (f && this.update(f.undoOptions, h), r ? (this.currentResponsive = {
                    ruleIds: r,
                    mergedOptions: c,
                    undoOptions: this.currentOptions(c)
                }, this.update(c, h)) :
                this.currentResponsive = void 0)
        };
        C.prototype.matchResponsiveRule = function(a, n) {
            var r = a.condition;
            (r.callback || function() {
                return this.chartWidth <= h(r.maxWidth, Number.MAX_VALUE) && this.chartHeight <= h(r.maxHeight, Number.MAX_VALUE) && this.chartWidth >= h(r.minWidth, 0) && this.chartHeight >= h(r.minHeight, 0)
            }).call(this) && n.push(a._id)
        };
        C.prototype.currentOptions = function(h) {
            function r(f, c, l, b) {
                var g;
                a.objectEach(f, function(a, f) {
                    if (!b && -1 < D(f, ["series", "xAxis", "yAxis"]))
                        for (a = x(a), l[f] = [], g = 0; g < a.length; g++) c[f][g] &&
                            (l[f][g] = {}, r(a[g], c[f][g], l[f][g], b + 1));
                    else n(a) ? (l[f] = q(a) ? [] : {}, r(a, c[f] || {}, l[f], b + 1)) : l[f] = c[f] || null
                })
            }
            var A = {};
            r(h, this.options, A, 0);
            return A
        }
    })(L);
    (function(a) {
        var C = a.addEvent,
            G = a.Axis,
            D = a.Chart,
            q = a.css,
            n = a.defined,
            h = a.each,
            x = a.extend,
            r = a.noop,
            u = a.pick,
            A = a.timeUnits,
            f = a.wrap;
        f(a.Series.prototype, "init", function(a) {
            var c;
            a.apply(this, Array.prototype.slice.call(arguments, 1));
            (c = this.xAxis) && c.options.ordinal && C(this, "updatedData", function() {
                delete c.ordinalIndex
            })
        });
        f(G.prototype, "getTimeTicks",
            function(a, f, b, g, h, v, e, w) {
                var c = 0,
                    m, l, t = {}, p, r, q, d = [],
                    y = -Number.MAX_VALUE,
                    F = this.options.tickPixelInterval,
                    k = this.chart.time;
                if (!this.options.ordinal && !this.options.breaks || !v || 3 > v.length || void 0 === b) return a.call(this, f, b, g, h);
                r = v.length;
                for (m = 0; m < r; m++) {
                    q = m && v[m - 1] > g;
                    v[m] < b && (c = m);
                    if (m === r - 1 || v[m + 1] - v[m] > 5 * e || q) {
                        if (v[m] > y) {
                            for (l = a.call(this, f, v[c], v[m], h); l.length && l[0] <= y;) l.shift();
                            l.length && (y = l[l.length - 1]);
                            d = d.concat(l)
                        }
                        c = m + 1
                    }
                    if (q) break
                }
                a = l.info;
                if (w && a.unitRange <= A.hour) {
                    m = d.length - 1;
                    for (c =
                        1; c < m; c++) k.dateFormat("%d", d[c]) !== k.dateFormat("%d", d[c - 1]) && (t[d[c]] = "day", p = !0);
                    p && (t[d[0]] = "day");
                    a.higherRanks = t
                }
                d.info = a;
                if (w && n(F)) {
                    w = k = d.length;
                    m = [];
                    var B;
                    for (p = []; w--;) c = this.translate(d[w]), B && (p[w] = B - c), m[w] = B = c;
                    p.sort();
                    p = p[Math.floor(p.length / 2)];
                    p < .6 * F && (p = null);
                    w = d[k - 1] > g ? k - 1 : k;
                    for (B = void 0; w--;) c = m[w], g = Math.abs(B - c), B && g < .8 * F && (null === p || g < .8 * p) ? (t[d[w]] && !t[d[w + 1]] ? (g = w + 1, B = c) : g = w, d.splice(g, 1)) : B = c
                }
                return d
            });
        x(G.prototype, {
            beforeSetTickPositions: function() {
                var a, f = [],
                    b = !1,
                    g, p =
                        this.getExtremes(),
                    v = p.min,
                    e = p.max,
                    w, r = this.isXAxis && !! this.options.breaks,
                    p = this.options.ordinal,
                    m = Number.MAX_VALUE,
                    z = this.chart.options.chart.ignoreHiddenSeries;
                g = "highcharts-navigator-xaxis" === this.options.className;
                !this.options.overscroll || this.max !== this.dataMax || this.chart.mouseIsDown && !g || this.eventArgs && (!this.eventArgs || "navigator" === this.eventArgs.trigger) || (this.max += this.options.overscroll, !g && n(this.userMin) && (this.min += this.options.overscroll));
                if (p || r) {
                    h(this.series, function(b, c) {
                        if (!(z && !1 === b.visible || !1 === b.takeOrdinalPosition && !r) && (f = f.concat(b.processedXData), a = f.length, f.sort(function(a, b) {
                            return a - b
                        }), m = Math.min(m, u(b.closestPointRange, m)), a))
                            for (c = a - 1; c--;) f[c] === f[c + 1] && f.splice(c, 1)
                    });
                    a = f.length;
                    if (2 < a) {
                        g = f[1] - f[0];
                        for (w = a - 1; w-- && !b;) f[w + 1] - f[w] !== g && (b = !0);
                        !this.options.keepOrdinalPadding && (f[0] - v > g || e - f[f.length - 1] > g) && (b = !0)
                    } else this.options.overscroll && (2 === a ? m = f[1] - f[0] : 1 === a ? (m = this.options.overscroll, f = [f[0], f[0] + m]) : m = this.overscrollPointsRange);
                    b ? (this.options.overscroll &&
                        (this.overscrollPointsRange = m, f = f.concat(this.getOverscrollPositions())), this.ordinalPositions = f, g = this.ordinal2lin(Math.max(v, f[0]), !0), w = Math.max(this.ordinal2lin(Math.min(e, f[f.length - 1]), !0), 1), this.ordinalSlope = e = (e - v) / (w - g), this.ordinalOffset = v - g * e) : (this.overscrollPointsRange = u(this.closestPointRange, this.overscrollPointsRange), this.ordinalPositions = this.ordinalSlope = this.ordinalOffset = void 0)
                }
                this.isOrdinal = p && b;
                this.groupIntervalFactor = null
            },
            val2lin: function(a, f) {
                var b = this.ordinalPositions;
                if (b) {
                    var c = b.length,
                        l, h;
                    for (l = c; l--;)
                        if (b[l] === a) {
                            h = l;
                            break
                        }
                    for (l = c - 1; l--;)
                        if (a > b[l] || 0 === l) {
                            a = (a - b[l]) / (b[l + 1] - b[l]);
                            h = l + a;
                            break
                        }
                    f = f ? h : this.ordinalSlope * (h || 0) + this.ordinalOffset
                } else f = a;
                return f
            },
            lin2val: function(a, f) {
                var b = this.ordinalPositions;
                if (b) {
                    var c = this.ordinalSlope,
                        l = this.ordinalOffset,
                        h = b.length - 1,
                        e;
                    if (f) 0 > a ? a = b[0] : a > h ? a = b[h] : (h = Math.floor(a), e = a - h);
                    else
                        for (; h--;)
                            if (f = c * h + l, a >= f) {
                                c = c * (h + 1) + l;
                                e = (a - f) / (c - f);
                                break
                            } return void 0 !== e && void 0 !== b[h] ? b[h] + (e ? e * (b[h + 1] - b[h]) : 0) : a
                }
                return a
            },
            getExtendedPositions: function() {
                var a = this,
                    f = a.chart,
                    b = a.series[0].currentDataGrouping,
                    g = a.ordinalIndex,
                    p = b ? b.count + b.unitName : "raw",
                    n = a.options.overscroll,
                    e = a.getExtremes(),
                    w, q;
                g || (g = a.ordinalIndex = {});
                g[p] || (w = {
                    series: [],
                    chart: f,
                    getExtremes: function() {
                        return {
                            min: e.dataMin,
                            max: e.dataMax + n
                        }
                    },
                    options: {
                        ordinal: !0
                    },
                    val2lin: G.prototype.val2lin,
                    ordinal2lin: G.prototype.ordinal2lin
                }, h(a.series, function(c) {
                    q = {
                        xAxis: w,
                        xData: c.xData.slice(),
                        chart: f,
                        destroyGroupedData: r
                    };
                    q.xData = q.xData.concat(a.getOverscrollPositions());
                    q.options = {
                        dataGrouping: b ? {
                            enabled: !0,
                            forced: !0,
                            approximation: "open",
                            units: [
                                [b.unitName, [b.count]]
                            ]
                        } : {
                            enabled: !1
                        }
                    };
                    c.processData.apply(q);
                    w.series.push(q)
                }), a.beforeSetTickPositions.apply(w), g[p] = w.ordinalPositions);
                return g[p]
            },
            getOverscrollPositions: function() {
                var c = this.options.overscroll,
                    f = this.overscrollPointsRange,
                    b = [],
                    g = this.dataMax;
                if (a.defined(f))
                    for (b.push(g); g <= this.dataMax + c;) g += f, b.push(g);
                return b
            },
            getGroupIntervalFactor: function(a, f, b) {
                var c;
                b = b.processedXData;
                var l = b.length,
                    h = [];
                c =
                    this.groupIntervalFactor;
                if (!c) {
                    for (c = 0; c < l - 1; c++) h[c] = b[c + 1] - b[c];
                    h.sort(function(a, b) {
                        return a - b
                    });
                    h = h[Math.floor(l / 2)];
                    a = Math.max(a, b[0]);
                    f = Math.min(f, b[l - 1]);
                    this.groupIntervalFactor = c = l * h / (f - a)
                }
                return c
            },
            postProcessTickInterval: function(a) {
                var c = this.ordinalSlope;
                return c ? this.options.breaks ? this.closestPointRange || a : a / (c / this.closestPointRange) : a
            }
        });
        G.prototype.ordinal2lin = G.prototype.val2lin;
        f(D.prototype, "pan", function(a, f) {
            var b = this.xAxis[0],
                c = b.options.overscroll,
                l = f.chartX,
                n = !1;
            if (b.options.ordinal &&
                b.series.length) {
                var e = this.mouseDownX,
                    r = b.getExtremes(),
                    E = r.dataMax,
                    m = r.min,
                    z = r.max,
                    t = this.hoverPoints,
                    u = b.closestPointRange || b.overscrollPointsRange,
                    e = (e - l) / (b.translationSlope * (b.ordinalSlope || u)),
                    x = {
                        ordinalPositions: b.getExtendedPositions()
                    }, u = b.lin2val,
                    A = b.val2lin,
                    d;
                x.ordinalPositions ? 1 < Math.abs(e) && (t && h(t, function(a) {
                    a.setState()
                }), 0 > e ? (t = x, d = b.ordinalPositions ? b : x) : (t = b.ordinalPositions ? b : x, d = x), x = d.ordinalPositions, E > x[x.length - 1] && x.push(E), this.fixedRange = z - m, e = b.toFixedRange(null, null,
                    u.apply(t, [A.apply(t, [m, !0]) + e, !0]), u.apply(d, [A.apply(d, [z, !0]) + e, !0])), e.min >= Math.min(r.dataMin, m) && e.max <= Math.max(E, z) + c && b.setExtremes(e.min, e.max, !0, !1, {
                    trigger: "pan"
                }), this.mouseDownX = l, q(this.container, {
                    cursor: "move"
                })) : n = !0
            } else n = !0;
            n && (c && (b.max = b.dataMax + c), a.apply(this, Array.prototype.slice.call(arguments, 1)))
        })
    })(L);
    (function(a) {
        function C() {
            return Array.prototype.slice.call(arguments, 1)
        }

        function G(a) {
            a.apply(this);
            this.drawBreaks(this.xAxis, ["x"]);
            this.drawBreaks(this.yAxis, D(this.pointArrayMap, ["y"]))
        }
        var D = a.pick,
            q = a.wrap,
            n = a.each,
            h = a.extend,
            x = a.isArray,
            r = a.fireEvent,
            u = a.Axis,
            A = a.Series;
        h(u.prototype, {
            isInBreak: function(a, c) {
                var f = a.repeat || Infinity,
                    b = a.from,
                    g = a.to - a.from;
                c = c >= b ? (c - b) % f : f - (b - c) % f;
                return a.inclusive ? c <= g : c < g && 0 !== c
            },
            isInAnyBreak: function(a, c) {
                var f = this.options.breaks,
                    b = f && f.length,
                    g, h, n;
                if (b) {
                    for (; b--;) this.isInBreak(f[b], a) && (g = !0, h || (h = D(f[b].showPoints, this.isXAxis ? !1 : !0)));
                    n = g && c ? g && !h : g
                }
                return n
            }
        });
        q(u.prototype, "setTickPositions", function(a) {
            a.apply(this, Array.prototype.slice.call(arguments,
                1));
            if (this.options.breaks) {
                var c = this.tickPositions,
                    f = this.tickPositions.info,
                    b = [],
                    g;
                for (g = 0; g < c.length; g++) this.isInAnyBreak(c[g]) || b.push(c[g]);
                this.tickPositions = b;
                this.tickPositions.info = f
            }
        });
        q(u.prototype, "init", function(a, c, h) {
            var b = this;
            h.breaks && h.breaks.length && (h.ordinal = !1);
            a.call(this, c, h);
            a = this.options.breaks;
            b.isBroken = x(a) && !! a.length;
            b.isBroken && (b.val2lin = function(a) {
                var c = a,
                    g, e;
                for (e = 0; e < b.breakArray.length; e++)
                    if (g = b.breakArray[e], g.to <= a) c -= g.len;
                    else if (g.from >= a) break;
                else if (b.isInBreak(g,
                    a)) {
                    c -= a - g.from;
                    break
                }
                return c
            }, b.lin2val = function(a) {
                var c, g;
                for (g = 0; g < b.breakArray.length && !(c = b.breakArray[g], c.from >= a); g++) c.to < a ? a += c.len : b.isInBreak(c, a) && (a += c.len);
                return a
            }, b.setExtremes = function(a, b, c, e, f) {
                for (; this.isInAnyBreak(a);) a -= this.closestPointRange;
                for (; this.isInAnyBreak(b);) b -= this.closestPointRange;
                u.prototype.setExtremes.call(this, a, b, c, e, f)
            }, b.setAxisTranslation = function(a) {
                u.prototype.setAxisTranslation.call(this, a);
                a = b.options.breaks;
                var c = [],
                    g = [],
                    e = 0,
                    f, h, m = b.userMin || b.min,
                    l = b.userMax || b.max,
                    t = D(b.pointRangePadding, 0),
                    q, x;
                n(a, function(a) {
                    h = a.repeat || Infinity;
                    b.isInBreak(a, m) && (m += a.to % h - m % h);
                    b.isInBreak(a, l) && (l -= l % h - a.from % h)
                });
                n(a, function(a) {
                    q = a.from;
                    for (h = a.repeat || Infinity; q - h > m;) q -= h;
                    for (; q < m;) q += h;
                    for (x = q; x < l; x += h) c.push({
                        value: x,
                        move: "in"
                    }), c.push({
                        value: x + (a.to - a.from),
                        move: "out",
                        size: a.breakSize
                    })
                });
                c.sort(function(a, b) {
                    return a.value === b.value ? ("in" === a.move ? 0 : 1) - ("in" === b.move ? 0 : 1) : a.value - b.value
                });
                f = 0;
                q = m;
                n(c, function(a) {
                    f += "in" === a.move ? 1 : -1;
                    1 === f && "in" ===
                        a.move && (q = a.value);
                    0 === f && (g.push({
                        from: q,
                        to: a.value,
                        len: a.value - q - (a.size || 0)
                    }), e += a.value - q - (a.size || 0))
                });
                b.breakArray = g;
                b.unitLength = l - m - e + t;
                r(b, "afterBreaks");
                b.options.staticScale ? b.transA = b.options.staticScale : b.unitLength && (b.transA *= (l - b.min + t) / b.unitLength);
                t && (b.minPixelPadding = b.transA * b.minPointOffset);
                b.min = m;
                b.max = l
            })
        });
        q(A.prototype, "generatePoints", function(a) {
            a.apply(this, C(arguments));
            var c = this.xAxis,
                f = this.yAxis,
                b = this.points,
                g, h = b.length,
                n = this.options.connectNulls,
                e;
            if (c &&
                f && (c.options.breaks || f.options.breaks))
                for (; h--;) g = b[h], e = null === g.y && !1 === n, e || !c.isInAnyBreak(g.x, !0) && !f.isInAnyBreak(g.y, !0) || (b.splice(h, 1), this.data[h] && this.data[h].destroyElements())
        });
        a.Series.prototype.drawBreaks = function(a, c) {
            var f = this,
                b = f.points,
                g, h, q, e;
            a && n(c, function(c) {
                g = a.breakArray || [];
                h = a.isXAxis ? a.min : D(f.options.threshold, a.min);
                n(b, function(b) {
                    e = D(b["stack" + c.toUpperCase()], b[c]);
                    n(g, function(c) {
                        q = !1;
                        if (h < c.from && e > c.to || h > c.from && e < c.from) q = "pointBreak";
                        else if (h < c.from && e >
                            c.from && e < c.to || h > c.from && e > c.to && e < c.from) q = "pointInBreak";
                        q && r(a, q, {
                            point: b,
                            brk: c
                        })
                    })
                })
            })
        };
        a.Series.prototype.gappedPath = function() {
            var f = this.currentDataGrouping,
                c = f && f.totalRange,
                f = this.options.gapSize,
                h = this.points.slice(),
                b = h.length - 1,
                g = this.yAxis;
            if (f && 0 < b)
                for ("value" !== this.options.gapUnit && (f *= this.closestPointRange), c && c > f && (f = c); b--;) h[b + 1].x - h[b].x > f && (c = (h[b].x + h[b + 1].x) / 2, h.splice(b + 1, 0, {
                    isNull: !0,
                    x: c
                }), this.options.stacking && (c = g.stacks[this.stackKey][c] = new a.StackItem(g, g.options.stackLabels, !1, c, this.stack), c.total = 0));
            return this.getGraphPath(h)
        };
        q(a.seriesTypes.column.prototype, "drawPoints", G);
        q(a.Series.prototype, "drawPoints", G)
    })(L);
    (function(a) {
        var C = a.arrayMax,
            G = a.arrayMin,
            D = a.Axis,
            q = a.defaultPlotOptions,
            n = a.defined,
            h = a.each,
            x = a.extend,
            r = a.format,
            u = a.isNumber,
            A = a.merge,
            f = a.pick,
            c = a.Point,
            l = a.Tooltip,
            b = a.wrap,
            g = a.Series.prototype,
            p = g.processData,
            v = g.generatePoints,
            e = {
                approximation: "average",
                groupPixelWidth: 5,
                dateTimeLabelFormats: {
                    millisecond: ["%A, %b %e, %H:%M:%S.%L", "%A, %b %e, %H:%M:%S.%L",
                        "-%H:%M:%S.%L"
                    ],
                    second: ["%b %e", "%b %e, %H:%M:%S", "-%H:%M:%S"],
                    minute: ["%b %e, %H:%M", "%b %e, %H:%M", "-%H:%M"],
                    hour: ["%b %e, %H:%M", "%b %e, %H:%M", "-%H:%M"],
                    day: ["%Y, %b %e, %A", "%b %e %A", "%Y, %b %e, -%A"],
                    week: ["%Y, %b %e, %A", "%b %e %A", "%Y, %b %e, -%A"],
                    month: ["%Y %B", "%B", "%Y -%B"],
                    year: ["%Y", "%Y", "-%Y"]
                }
            }, w = {
                line: {},
                spline: {},
                area: {},
                areaspline: {},
                column: {
                    approximation: "sum",
                    groupPixelWidth: 10
                },
                arearange: {
                    approximation: "range"
                },
                areasplinerange: {
                    approximation: "range"
                },
                columnrange: {
                    approximation: "range",
                    groupPixelWidth: 10
                },
                candlestick: {
                    approximation: "ohlc",
                    groupPixelWidth: 10
                },
                ohlc: {
                    approximation: "ohlc",
                    groupPixelWidth: 5
                }
            }, E = a.defaultDataGroupingUnits = [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1]],
                ["week", [1]],
                ["month", [1, 3, 6]],
                ["year", null]
            ],
            m = a.approximations = {
                sum: function(a) {
                    var b = a.length,
                        c;
                    if (!b && a.hasNulls) c = null;
                    else if (b)
                        for (c = 0; b--;) c += a[b];
                    return c
                },
                average: function(a) {
                    var b =
                        a.length;
                    a = m.sum(a);
                    u(a) && b && (a /= b);
                    return a
                },
                averages: function() {
                    var a = [];
                    h(arguments, function(b) {
                        a.push(m.average(b))
                    });
                    return void 0 === a[0] ? void 0 : a
                },
                open: function(a) {
                    return a.length ? a[0] : a.hasNulls ? null : void 0
                },
                high: function(a) {
                    return a.length ? C(a) : a.hasNulls ? null : void 0
                },
                low: function(a) {
                    return a.length ? G(a) : a.hasNulls ? null : void 0
                },
                close: function(a) {
                    return a.length ? a[a.length - 1] : a.hasNulls ? null : void 0
                },
                ohlc: function(a, b, c, e) {
                    a = m.open(a);
                    b = m.high(b);
                    c = m.low(c);
                    e = m.close(e);
                    if (u(a) || u(b) || u(c) ||
                        u(e)) return [a, b, c, e]
                },
                range: function(a, b) {
                    a = m.low(a);
                    b = m.high(b);
                    if (u(a) || u(b)) return [a, b];
                    if (null === a && null === b) return null
                }
            };
        g.groupData = function(a, b, c, g) {
            var f = this.data,
                d = this.options.data,
                l = [],
                t = [],
                k = [],
                n = a.length,
                p, z, q = !! b,
                r = [];
            g = "function" === typeof g ? g : m[g] || w[this.type] && m[w[this.type].approximation] || m[e.approximation];
            var v = this.pointArrayMap,
                E = v && v.length,
                x = 0;
            z = 0;
            var A, H;
            E ? h(v, function() {
                r.push([])
            }) : r.push([]);
            A = E || 1;
            for (H = 0; H <= n && !(a[H] >= c[0]); H++);
            for (H; H <= n; H++) {
                for (; void 0 !== c[x + 1] &&
                    a[H] >= c[x + 1] || H === n;) {
                    p = c[x];
                    this.dataGroupInfo = {
                        start: z,
                        length: r[0].length
                    };
                    z = g.apply(this, r);
                    void 0 !== z && (l.push(p), t.push(z), k.push(this.dataGroupInfo));
                    z = H;
                    for (p = 0; p < A; p++) r[p].length = 0, r[p].hasNulls = !1;
                    x += 1;
                    if (H === n) break
                }
                if (H === n) break;
                if (v) {
                    p = this.cropStart + H;
                    var I = f && f[p] || this.pointClass.prototype.applyOptions.apply({
                        series: this
                    }, [d[p]]),
                        C;
                    for (p = 0; p < E; p++) C = I[v[p]], u(C) ? r[p].push(C) : null === C && (r[p].hasNulls = !0)
                } else p = q ? b[H] : null, u(p) ? r[0].push(p) : null === p && (r[0].hasNulls = !0)
            }
            return [l, t,
                k]
        };
        g.processData = function() {
            var a = this.chart,
                b = this.options.dataGrouping,
                c = !1 !== this.allowDG && b && f(b.enabled, a.options.isStock),
                e = this.visible || !a.options.chart.ignoreHiddenSeries,
                h, d = this.currentDataGrouping,
                m;
            this.forceCrop = c;
            this.groupPixelWidth = null;
            this.hasProcessed = !0;
            if (!1 !== p.apply(this, arguments) && c) {
                this.destroyGroupedData();
                var l = this.processedXData,
                    k = this.processedYData,
                    r = a.plotSizeX,
                    a = this.xAxis,
                    q = a.options.ordinal,
                    w = this.groupPixelWidth = a.getGroupPixelWidth && a.getGroupPixelWidth();
                if (w) {
                    this.isDirty = h = !0;
                    this.points = null;
                    c = a.getExtremes();
                    m = c.min;
                    c = c.max;
                    q = q && a.getGroupIntervalFactor(m, c, this) || 1;
                    w = w * (c - m) / r * q;
                    r = a.getTimeTicks(a.normalizeTimeTickInterval(w, b.units || E), Math.min(m, l[0]), Math.max(c, l[l.length - 1]), a.options.startOfWeek, l, this.closestPointRange);
                    l = g.groupData.apply(this, [l, k, r, b.approximation]);
                    k = l[0];
                    q = l[1];
                    if (b.smoothed && k.length) {
                        b = k.length - 1;
                        for (k[b] = Math.min(k[b], c); b-- && 0 < b;) k[b] += w / 2;
                        k[0] = Math.max(k[0], m)
                    }
                    m = r.info;
                    this.closestPointRange = r.info.totalRange;
                    this.groupMap = l[2];
                    n(k[0]) && k[0] < a.dataMin && e && (a.min === a.dataMin && (a.min = k[0]), a.dataMin = k[0]);
                    this.processedXData = k;
                    this.processedYData = q
                } else this.groupMap = null;
                this.hasGroupedData = h;
                this.currentDataGrouping = m;
                this.preventGraphAnimation = (d && d.totalRange) !== (m && m.totalRange)
            }
        };
        g.destroyGroupedData = function() {
            var a = this.groupedData;
            h(a || [], function(b, c) {
                b && (a[c] = b.destroy ? b.destroy() : null)
            });
            this.groupedData = null
        };
        g.generatePoints = function() {
            v.apply(this);
            this.destroyGroupedData();
            this.groupedData =
                this.hasGroupedData ? this.points : null
        };
        b(c.prototype, "update", function(b) {
            this.dataGroup ? a.error(24) : b.apply(this, [].slice.call(arguments, 1))
        });
        b(l.prototype, "tooltipFooterHeaderFormatter", function(a, b, c) {
            var e = this.chart.time,
                g = b.series,
                d = g.tooltipOptions,
                f = g.options.dataGrouping,
                m = d.xDateFormat,
                k, h = g.xAxis;
            return h && "datetime" === h.options.type && f && u(b.key) ? (a = g.currentDataGrouping, f = f.dateTimeLabelFormats, a ? (h = f[a.unitName], 1 === a.count ? m = h[0] : (m = h[1], k = h[2])) : !m && f && (m = this.getXDateFormat(b, d, h)),
                m = e.dateFormat(m, b.key), k && (m += e.dateFormat(k, b.key + a.totalRange - 1)), r(d[(c ? "footer" : "header") + "Format"], {
                    point: x(b.point, {
                        key: m
                    }),
                    series: g
                }, e)) : a.call(this, b, c)
        });
        b(g, "destroy", function(a) {
            this.destroyGroupedData();
            a.call(this)
        });
        b(g, "setOptions", function(a, b) {
            a = a.call(this, b);
            var c = this.type,
                g = this.chart.options.plotOptions,
                f = q[c].dataGrouping;
            w[c] && (f || (f = A(e, w[c])), a.dataGrouping = A(f, g.series && g.series.dataGrouping, g[c].dataGrouping, b.dataGrouping));
            this.chart.options.isStock && (this.requireSorting = !0);
            return a
        });
        b(D.prototype, "setScale", function(a) {
            a.call(this);
            h(this.series, function(a) {
                a.hasProcessed = !1
            })
        });
        D.prototype.getGroupPixelWidth = function() {
            var a = this.series,
                b = a.length,
                c, e = 0,
                g = !1,
                d;
            for (c = b; c--;)(d = a[c].options.dataGrouping) && (e = Math.max(e, d.groupPixelWidth));
            for (c = b; c--;)(d = a[c].options.dataGrouping) && a[c].hasProcessed && (b = (a[c].processedXData || a[c].data).length, a[c].groupPixelWidth || b > this.chart.plotSizeX / e || b && d.forced) && (g = !0);
            return g ? e : 0
        };
        D.prototype.setDataGrouping = function(a,
            b) {
            var c;
            b = f(b, !0);
            a || (a = {
                forced: !1,
                units: null
            });
            if (this instanceof D)
                for (c = this.series.length; c--;) this.series[c].update({
                    dataGrouping: a
                }, !1);
            else h(this.chart.options.series, function(b) {
                b.dataGrouping = a
            }, !1);
            b && this.chart.redraw()
        }
    })(L);
    (function(a) {
        var C = a.each,
            G = a.Point,
            D = a.seriesType,
            q = a.seriesTypes;
        D("ohlc", "column", {
            lineWidth: 1,
            tooltip: {
                pointFormat: '\x3cspan style\x3d"color:{point.color}"/span\x3e \x3c/b\x3e\x3cbr/\x3e시가: \x3cb\x3e{point.open}\x3cbr/\x3e고가: \x3cb\x3e{point.high}\x3cbr/\x3e저가: \x3cb\x3e{point.low}\x3cbr/\x3e종가: \x3cb\x3e{point.close}\x3cbr/\x3e'
            },

            threshold: null,
            states: {
                hover: {
                    lineWidth: 3
                }
            },
            stickyTracking: !0
        }, {
            directTouch: !1,
            pointArrayMap: ["open", "high", "low", "close"],
            toYData: function(a) {
                return [a.open, a.high, a.low, a.close]
            },
            pointValKey: "close",
            pointAttrToOptions: {
                stroke: "color",
                "stroke-width": "lineWidth"
            },
            pointAttribs: function(a, h) {
                h = q.column.prototype.pointAttribs.call(this, a, h);
                var n = this.options;
                delete h.fill;
                !a.options.color && n.upColor && a.open < a.close && (h.stroke = n.upColor);
                return h
            },
            translate: function() {
                var a = this,
                    h = a.yAxis,
                    x = !! a.modifyValue,
                    r = ["plotOpen", "plotHigh", "plotLow", "plotClose", "yBottom"];
                q.column.prototype.translate.apply(a);
                C(a.points, function(n) {
                    C([n.open, n.high, n.low, n.close, n.low], function(q, f) {
                        null !== q && (x && (q = a.modifyValue(q)), n[r[f]] = h.toPixels(q, !0))
                    });
                    n.tooltipPos[1] = n.plotHigh + h.pos - a.chart.plotTop
                })
            },
            drawPoints: function() {
                var a = this,
                    h = a.chart;
                C(a.points, function(n) {
                    var r, q, x, f, c = n.graphic,
                        l, b = !c;
                    void 0 !== n.plotY && (c || (n.graphic = c = h.renderer.path().add(a.group)), c.attr(a.pointAttribs(n, n.selected && "select")), q = c.strokeWidth() %
                        2 / 2, l = Math.round(n.plotX) - q, x = Math.round(n.shapeArgs.width / 2), f = ["M", l, Math.round(n.yBottom), "L", l, Math.round(n.plotHigh)], null !== n.open && (r = Math.round(n.plotOpen) + q, f.push("M", l, r, "L", l - x, r)), null !== n.close && (r = Math.round(n.plotClose) + q, f.push("M", l, r, "L", l + x, r)), c[b ? "attr" : "animate"]({
                            d: f
                        }).addClass(n.getClassName(), !0))
                })
            },
            animate: null
        }, {
            getClassName: function() {
                return G.prototype.getClassName.call(this) + (this.open < this.close ? " highcharts-point-up" : " highcharts-point-down")
            }
        })
    })(L);
    (function(a) {
        var C =
            a.defaultPlotOptions,
            G = a.each,
            D = a.merge,
            q = a.seriesType,
            n = a.seriesTypes;
        q("candlestick", "ohlc", D(C.column, {
            states: {
                hover: {
                    lineWidth: 2
                }
            },
            tooltip: C.ohlc.tooltip,
            threshold: null,
            lineColor: "#000000",
            lineWidth: 1,
            upColor: "#ffffff",
            stickyTracking: !0
        }), {
            pointAttribs: function(a, q) {
                var h = n.column.prototype.pointAttribs.call(this, a, q),
                    u = this.options,
                    x = a.open < a.close,
                    f = u.lineColor || this.color;
                h["stroke-width"] = u.lineWidth;
                h.fill = a.options.color || (x ? u.upColor || this.color : this.color);
                h.stroke = a.lineColor || (x ? u.upLineColor ||
                    f : f);
                q && (a = u.states[q], h.fill = a.color || h.fill, h.stroke = a.lineColor || h.stroke, h["stroke-width"] = a.lineWidth || h["stroke-width"]);
                return h
            },
            drawPoints: function() {
                var a = this,
                    n = a.chart;
                G(a.points, function(h) {
                    var q = h.graphic,
                        r, f, c, l, b, g, p, v = !q;
                    void 0 !== h.plotY && (q || (h.graphic = q = n.renderer.path().add(a.group)), q.attr(a.pointAttribs(h, h.selected && "select")).shadow(a.options.shadow), b = q.strokeWidth() % 2 / 2, g = Math.round(h.plotX) - b, r = h.plotOpen, f = h.plotClose, c = Math.min(r, f), r = Math.max(r, f), p = Math.round(h.shapeArgs.width /
                        2), f = Math.round(c) !== Math.round(h.plotHigh), l = r !== h.yBottom, c = Math.round(c) + b, r = Math.round(r) + b, b = [], b.push("M", g - p, r, "L", g - p, c, "L", g + p, c, "L", g + p, r, "Z", "M", g, c, "L", g, f ? Math.round(h.plotHigh) : c, "M", g, r, "L", g, l ? Math.round(h.yBottom) : r), q[v ? "attr" : "animate"]({
                        d: b
                    }).addClass(h.getClassName(), !0))
                })
            }
        })
    })(L);
    da = function(a) {
        var C = a.each,
            G = a.seriesTypes,
            D = a.stableSort;
        return {
            getPlotBox: function() {
                return a.Series.prototype.getPlotBox.call(this.options.onSeries && this.chart.get(this.options.onSeries) || this)
            },
            translate: function() {
                G.column.prototype.translate.apply(this);
                var a = this.options,
                    n = this.chart,
                    h = this.points,
                    x = h.length - 1,
                    r, u, A = a.onSeries;
                r = A && n.get(A);
                var a = a.onKey || "y",
                    A = r && r.options.step,
                    f = r && r.points,
                    c = f && f.length,
                    l = this.xAxis,
                    b = this.yAxis,
                    g = 0,
                    p, v, e, w;
                if (r && r.visible && c)
                    for (g = (r.pointXOffset || 0) + (r.barW || 0) / 2, r = r.currentDataGrouping, v = f[c - 1].x + (r ? r.totalRange : 0), D(h, function(a, b) {
                        return a.x - b.x
                    }), a = "plot" + a[0].toUpperCase() + a.substr(1); c-- && h[x] && !(p = f[c], r = h[x], r.y = p.y, p.x <= r.x && void 0 !== p[a] &&
                        (r.x <= v && (r.plotY = p[a], p.x < r.x && !A && (e = f[c + 1]) && void 0 !== e[a] && (w = (r.x - p.x) / (e.x - p.x), r.plotY += w * (e[a] - p[a]), r.y += w * (e.y - p.y))), x--, c++, 0 > x)););
                C(h, function(a, c) {
                    var e;
                    a.plotX += g;
                    void 0 === a.plotY && (0 <= a.plotX && a.plotX <= l.len ? a.plotY = n.chartHeight - l.bottom - (l.opposite ? l.height : 0) + l.offset - b.top : a.shapeArgs = {});
                    (u = h[c - 1]) && u.plotX === a.plotX && (void 0 === u.stackIndex && (u.stackIndex = 0), e = u.stackIndex + 1);
                    a.stackIndex = e
                })
            }
        }
    }(L);
    (function(a, C) {
        function G(a) {
            f[a + "pin"] = function(c, b, g, h, n) {
                var e = n && n.anchorX;
                n = n && n.anchorY;
                "circle" === a && h > g && (c -= Math.round((h - g) / 2), g = h);
                c = f[a](c, b, g, h);
                e && n && (c.push("M", "circle" === a ? c[1] - c[4] : c[1] + c[4] / 2, b > n ? b : b + h, "L", e, n), c = c.concat(f.circle(e - 1, n - 1, 2, 2)));
                return c
            }
        }
        var D = a.addEvent,
            q = a.each,
            n = a.merge,
            h = a.noop,
            x = a.Renderer,
            r = a.seriesType,
            u = a.TrackerMixin,
            A = a.VMLRenderer,
            f = a.SVGRenderer.prototype.symbols;
        r("flags", "column", {
            pointRange: 0,
            allowOverlapX: !1,
            shape: "flag",
            stackDistance: 12,
            textAlign: "center",
            tooltip: {
                pointFormat: "{point.text}\x3cbr/\x3e"
            },
            threshold: null,
            y: -30,
            fillColor: "#ffffff",
            lineWidth: 1,
            states: {
                hover: {
                    lineColor: "#000000",
                    fillColor: "#ccd6eb"
                }
            },
            style: {
                fontSize: "11px",
                fontWeight: "bold"
            }
        }, {
            sorted: !1,
            noSharedTooltip: !0,
            allowDG: !1,
            takeOrdinalPosition: !1,
            trackerGroups: ["markerGroup"],
            forceCrop: !0,
            init: a.Series.prototype.init,
            pointAttribs: function(a, f) {
                var b = this.options,
                    c = a && a.color || this.color,
                    h = b.lineColor,
                    l = a && a.lineWidth;
                a = a && a.fillColor || b.fillColor;
                f && (a = b.states[f].fillColor, h = b.states[f].lineColor, l = b.states[f].lineWidth);
                return {
                    fill: a || c,
                    stroke: h || c,
                    "stroke-width": l || b.lineWidth || 0
                }
            },
            translate: C.translate,
            getPlotBox: C.getPlotBox,
            drawPoints: function() {
                var c = this.points,
                    f = this.chart,
                    b = f.renderer,
                    g, h, r = this.options,
                    e = r.y,
                    w, u, m, z, t, x, A = this.yAxis,
                    C = {}, d = [];
                for (u = c.length; u--;) m = c[u], x = m.plotX > this.xAxis.len, g = m.plotX, z = m.stackIndex, w = m.options.shape || r.shape, h = m.plotY, void 0 !== h && (h = m.plotY + e - (void 0 !== z && z * r.stackDistance)), m.anchorX = z ? void 0 : m.plotX, t = z ? void 0 : m.plotY, z = m.graphic, void 0 !== h && 0 <= g && !x ? (z || (z = m.graphic = b.label("", null, null, w, null,
                    null, r.useHTML).attr(this.pointAttribs(m)).css(n(r.style, m.style)).attr({
                    align: "flag" === w ? "left" : "center",
                    width: r.width,
                    height: r.height,
                    "text-align": r.textAlign
                }).addClass("highcharts-point").add(this.markerGroup), m.graphic.div && (m.graphic.div.point = m), z.shadow(r.shadow), z.isNew = !0), 0 < g && (g -= z.strokeWidth() % 2), w = {
                    y: h,
                    anchorY: t
                }, r.allowOverlapX && (w.x = g, w.anchorX = m.anchorX), z.attr({
                    text: m.options.title || r.title || "A"
                })[z.isNew ? "attr" : "animate"](w), r.allowOverlapX || (C[m.plotX] ? C[m.plotX].size = Math.max(C[m.plotX].size,
                    z.width) : C[m.plotX] = {
                    align: 0,
                    size: z.width,
                    target: g,
                    anchorX: g
                }), m.tooltipPos = f.inverted ? [A.len + A.pos - f.plotLeft - h, this.xAxis.len - g] : [g, h + A.pos - f.plotTop]) : z && (m.graphic = z.destroy());
                r.allowOverlapX || (a.objectEach(C, function(a) {
                    a.plotX = a.anchorX;
                    d.push(a)
                }), a.distribute(d, this.xAxis.len), q(c, function(a) {
                    var b = a.graphic && C[a.plotX];
                    b && (a.graphic[a.graphic.isNew ? "attr" : "animate"]({
                        x: b.pos,
                        anchorX: a.anchorX
                    }), a.graphic.isNew = !1)
                }));
                r.useHTML && a.wrap(this.markerGroup, "on", function(b) {
                    return a.SVGElement.prototype.on.apply(b.apply(this, [].slice.call(arguments, 1)), [].slice.call(arguments, 1))
                })
            },
            drawTracker: function() {
                var a = this.points;
                u.drawTrackerPoint.apply(this);
                q(a, function(c) {
                    var b = c.graphic;
                    b && D(b.element, "mouseover", function() {
                        0 < c.stackIndex && !c.raised && (c._y = b.y, b.attr({
                            y: c._y - 8
                        }), c.raised = !0);
                        q(a, function(a) {
                            a !== c && a.raised && a.graphic && (a.graphic.attr({
                                y: a._y
                            }), a.raised = !1)
                        })
                    })
                })
            },
            animate: h,
            buildKDTree: h,
            setClip: h
        });
        f.flag = function(a, h, b, g, n) {
            var c = n && n.anchorX || a;
            n = n && n.anchorY || h;
            return f.circle(c - 1, n - 1, 2, 2).concat(["M",
                c, n, "L", a, h + g, a, h, a + b, h, a + b, h + g, a, h + g, "Z"
            ])
        };
        G("circle");
        G("square");
        x === A && q(["flag", "circlepin", "squarepin"], function(a) {
            A.prototype.symbols[a] = f[a]
        })
    })(L, da);
    (function(a) {
        function C(a, b, c) {
            this.init(a, b, c)
        }
        var G = a.addEvent,
            D = a.Axis,
            q = a.correctFloat,
            n = a.defaultOptions,
            h = a.defined,
            x = a.destroyObjectProperties,
            r = a.each,
            u = a.fireEvent,
            A = a.hasTouch,
            f = a.isTouchDevice,
            c = a.merge,
            l = a.pick,
            b = a.removeEvent,
            g = a.wrap,
            p, v = {
                height: f ? 20 : 14,
                barBorderRadius: 0,
                buttonBorderRadius: 0,
                liveRedraw: a.svg && !f,
                margin: 10,
                minWidth: 6,
                step: .2,
                zIndex: 3,
                barBackgroundColor: "#cccccc",
                barBorderWidth: 1,
                barBorderColor: "#cccccc",
                buttonArrowColor: "#333333",
                buttonBackgroundColor: "#e6e6e6",
                buttonBorderColor: "#cccccc",
                buttonBorderWidth: 1,
                rifleColor: "#333333",
                trackBackgroundColor: "#f2f2f2",
                trackBorderColor: "#f2f2f2",
                trackBorderWidth: 1
            };
        n.scrollbar = c(!0, v, n.scrollbar);
        a.swapXY = p = function(a, b) {
            var c = a.length,
                e;
            if (b)
                for (b = 0; b < c; b += 3) e = a[b + 1], a[b + 1] = a[b + 2], a[b + 2] = e;
            return a
        };
        C.prototype = {
            init: function(a, b, f) {
                this.scrollbarButtons = [];
                this.renderer =
                    a;
                this.userOptions = b;
                this.options = c(v, b);
                this.chart = f;
                this.size = l(this.options.size, this.options.height);
                b.enabled && (this.render(), this.initEvents(), this.addEvents())
            },
            render: function() {
                var a = this.renderer,
                    b = this.options,
                    c = this.size,
                    f;
                this.group = f = a.g("scrollbar").attr({
                    zIndex: b.zIndex,
                    translateY: -99999
                }).add();
                this.track = a.rect().addClass("highcharts-scrollbar-track").attr({
                    x: 0,
                    r: b.trackBorderRadius || 0,
                    height: c,
                    width: c
                }).add(f);
                this.track.attr({
                    fill: b.trackBackgroundColor,
                    stroke: b.trackBorderColor,
                    "stroke-width": b.trackBorderWidth
                });
                this.trackBorderWidth = this.track.strokeWidth();
                this.track.attr({
                    y: -this.trackBorderWidth % 2 / 2
                });
                this.scrollbarGroup = a.g().add(f);
                this.scrollbar = a.rect().addClass("highcharts-scrollbar-thumb").attr({
                    height: c,
                    width: c,
                    r: b.barBorderRadius || 0
                }).add(this.scrollbarGroup);
                this.scrollbarRifles = a.path(p(["M", -3, c / 4, "L", -3, 2 * c / 3, "M", 0, c / 4, "L", 0, 2 * c / 3, "M", 3, c / 4, "L", 3, 2 * c / 3], b.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup);
                this.scrollbar.attr({
                    fill: b.barBackgroundColor,
                    stroke: b.barBorderColor,
                    "stroke-width": b.barBorderWidth
                });
                this.scrollbarRifles.attr({
                    stroke: b.rifleColor,
                    "stroke-width": 1
                });
                this.scrollbarStrokeWidth = this.scrollbar.strokeWidth();
                this.scrollbarGroup.translate(-this.scrollbarStrokeWidth % 2 / 2, -this.scrollbarStrokeWidth % 2 / 2);
                this.drawScrollbarButton(0);
                this.drawScrollbarButton(1)
            },
            position: function(a, b, c, f) {
                var e = this.options.vertical,
                    g = 0,
                    h = this.rendered ? "animate" : "attr";
                this.x = a;
                this.y = b + this.trackBorderWidth;
                this.width = c;
                this.xOffset = this.height = f;
                this.yOffset = g;
                e ? (this.width = this.yOffset = c = g = this.size, this.xOffset = b = 0, this.barWidth = f - 2 * c, this.x = a += this.options.margin) : (this.height = this.xOffset = f = b = this.size, this.barWidth = c - 2 * f, this.y += this.options.margin);
                this.group[h]({
                    translateX: a,
                    translateY: this.y
                });
                this.track[h]({
                    width: c,
                    height: f
                });
                this.scrollbarButtons[1][h]({
                    translateX: e ? 0 : c - b,
                    translateY: e ? f - g : 0
                })
            },
            drawScrollbarButton: function(a) {
                var b = this.renderer,
                    c = this.scrollbarButtons,
                    e = this.options,
                    f = this.size,
                    g;
                g = b.g().add(this.group);
                c.push(g);
                g = b.rect().addClass("highcharts-scrollbar-button").add(g);
                g.attr({
                    stroke: e.buttonBorderColor,
                    "stroke-width": e.buttonBorderWidth,
                    fill: e.buttonBackgroundColor
                });
                g.attr(g.crisp({
                    x: -.5,
                    y: -.5,
                    width: f + 1,
                    height: f + 1,
                    r: e.buttonBorderRadius
                }, g.strokeWidth()));
                g = b.path(p(["M", f / 2 + (a ? -1 : 1), f / 2 - 3, "L", f / 2 + (a ? -1 : 1), f / 2 + 3, "L", f / 2 + (a ? 2 : -2), f / 2], e.vertical)).addClass("highcharts-scrollbar-arrow").add(c[a]);
                g.attr({
                    fill: e.buttonArrowColor
                })
            },
            setRange: function(a, b) {
                var c = this.options,
                    e = c.vertical,
                    f = c.minWidth,
                    g = this.barWidth,
                    l, n, p = this.rendered && !this.hasDragged ? "animate" : "attr";
                h(g) && (a = Math.max(a, 0), l = Math.ceil(g * a), this.calculatedWidth = n = q(g * Math.min(b, 1) - l), n < f && (l = (g - f + n) * a, n = f), f = Math.floor(l + this.xOffset + this.yOffset), g = n / 2 - .5, this.from = a, this.to = b, e ? (this.scrollbarGroup[p]({
                    translateY: f
                }), this.scrollbar[p]({
                    height: n
                }), this.scrollbarRifles[p]({
                    translateY: g
                }), this.scrollbarTop = f, this.scrollbarLeft = 0) : (this.scrollbarGroup[p]({
                        translateX: f
                    }), this.scrollbar[p]({
                        width: n
                    }), this.scrollbarRifles[p]({
                        translateX: g
                    }), this.scrollbarLeft =
                    f, this.scrollbarTop = 0), 12 >= n ? this.scrollbarRifles.hide() : this.scrollbarRifles.show(!0), !1 === c.showFull && (0 >= a && 1 <= b ? this.group.hide() : this.group.show()), this.rendered = !0)
            },
            initEvents: function() {
                var a = this;
                a.mouseMoveHandler = function(b) {
                    var c = a.chart.pointer.normalize(b),
                        e = a.options.vertical ? "chartY" : "chartX",
                        f = a.initPositions;
                    !a.grabbedCenter || b.touches && 0 === b.touches[0][e] || (c = a.cursorToScrollbarPosition(c)[e], e = a[e], e = c - e, a.hasDragged = !0, a.updatePosition(f[0] + e, f[1] + e), a.hasDragged && u(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMType: b.type,
                        DOMEvent: b
                    }))
                };
                a.mouseUpHandler = function(b) {
                    a.hasDragged && u(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMType: b.type,
                        DOMEvent: b
                    });
                    a.grabbedCenter = a.hasDragged = a.chartX = a.chartY = null
                };
                a.mouseDownHandler = function(b) {
                    b = a.chart.pointer.normalize(b);
                    b = a.cursorToScrollbarPosition(b);
                    a.chartX = b.chartX;
                    a.chartY = b.chartY;
                    a.initPositions = [a.from, a.to];
                    a.grabbedCenter = !0
                };
                a.buttonToMinClick = function(b) {
                    var c = q(a.to - a.from) * a.options.step;
                    a.updatePosition(q(a.from -
                        c), q(a.to - c));
                    u(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMEvent: b
                    })
                };
                a.buttonToMaxClick = function(b) {
                    var c = (a.to - a.from) * a.options.step;
                    a.updatePosition(a.from + c, a.to + c);
                    u(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMEvent: b
                    })
                };
                a.trackClick = function(b) {
                    var c = a.chart.pointer.normalize(b),
                        e = a.to - a.from,
                        f = a.y + a.scrollbarTop,
                        g = a.x + a.scrollbarLeft;
                    a.options.vertical && c.chartY > f || !a.options.vertical && c.chartX > g ? a.updatePosition(a.from + e, a.to + e) : a.updatePosition(a.from - e, a.to - e);
                    u(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMEvent: b
                    })
                }
            },
            cursorToScrollbarPosition: function(a) {
                var b = this.options,
                    b = b.minWidth > this.calculatedWidth ? b.minWidth : 0;
                return {
                    chartX: (a.chartX - this.x - this.xOffset) / (this.barWidth - b),
                    chartY: (a.chartY - this.y - this.yOffset) / (this.barWidth - b)
                }
            },
            updatePosition: function(a, b) {
                1 < b && (a = q(1 - q(b - a)), b = 1);
                0 > a && (b = q(b - a), a = 0);
                this.from = a;
                this.to = b
            },
            update: function(a) {
                this.destroy();
                this.init(this.chart.renderer, c(!0, this.options, a), this.chart)
            },
            addEvents: function() {
                var a =
                    this.options.inverted ? [1, 0] : [0, 1],
                    b = this.scrollbarButtons,
                    c = this.scrollbarGroup.element,
                    f = this.mouseDownHandler,
                    g = this.mouseMoveHandler,
                    h = this.mouseUpHandler,
                    a = [
                        [b[a[0]].element, "click", this.buttonToMinClick],
                        [b[a[1]].element, "click", this.buttonToMaxClick],
                        [this.track.element, "click", this.trackClick],
                        [c, "mousedown", f],
                        [c.ownerDocument, "mousemove", g],
                        [c.ownerDocument, "mouseup", h]
                    ];
                A && a.push([c, "touchstart", f], [c.ownerDocument, "touchmove", g], [c.ownerDocument, "touchend", h]);
                r(a, function(a) {
                    G.apply(null,
                        a)
                });
                this._events = a
            },
            removeEvents: function() {
                r(this._events, function(a) {
                    b.apply(null, a)
                });
                this._events.length = 0
            },
            destroy: function() {
                var a = this.chart.scroller;
                this.removeEvents();
                r(["track", "scrollbarRifles", "scrollbar", "scrollbarGroup", "group"], function(a) {
                    this[a] && this[a].destroy && (this[a] = this[a].destroy())
                }, this);
                a && this === a.scrollbar && (a.scrollbar = null, x(a.scrollbarButtons))
            }
        };
        g(D.prototype, "init", function(a) {
            var b = this;
            a.apply(b, Array.prototype.slice.call(arguments, 1));
            b.options.scrollbar && b.options.scrollbar.enabled &&
                (b.options.scrollbar.vertical = !b.horiz, b.options.startOnTick = b.options.endOnTick = !1, b.scrollbar = new C(b.chart.renderer, b.options.scrollbar, b.chart), G(b.scrollbar, "changed", function(a) {
                var c = Math.min(l(b.options.min, b.min), b.min, b.dataMin),
                    e = Math.max(l(b.options.max, b.max), b.max, b.dataMax) - c,
                    f;
                b.horiz && !b.reversed || !b.horiz && b.reversed ? (f = c + e * this.to, c += e * this.from) : (f = c + e * (1 - this.from), c += e * (1 - this.to));
                b.setExtremes(c, f, !0, !1, a)
            }))
        });
        g(D.prototype, "render", function(a) {
            var b = Math.min(l(this.options.min,
                this.min), this.min, l(this.dataMin, this.min)),
                c = Math.max(l(this.options.max, this.max), this.max, l(this.dataMax, this.max)),
                e = this.scrollbar,
                f = this.titleOffset || 0;
            a.apply(this, Array.prototype.slice.call(arguments, 1));
            if (e) {
                this.horiz ? (e.position(this.left, this.top + this.height + 2 + this.chart.scrollbarsOffsets[1] + (this.opposite ? 0 : f + this.axisTitleMargin + this.offset), this.width, this.height), f = 1) : (e.position(this.left + this.width + 2 + this.chart.scrollbarsOffsets[0] + (this.opposite ? f + this.axisTitleMargin + this.offset :
                    0), this.top, this.width, this.height), f = 0);
                if (!this.opposite && !this.horiz || this.opposite && this.horiz) this.chart.scrollbarsOffsets[f] += this.scrollbar.size + this.scrollbar.options.margin;
                isNaN(b) || isNaN(c) || !h(this.min) || !h(this.max) ? e.setRange(0, 0) : (f = (this.min - b) / (c - b), b = (this.max - b) / (c - b), this.horiz && !this.reversed || !this.horiz && this.reversed ? e.setRange(f, b) : e.setRange(1 - b, 1 - f))
            }
        });
        g(D.prototype, "getOffset", function(a) {
            var b = this.horiz ? 2 : 1,
                c = this.scrollbar;
            a.apply(this, Array.prototype.slice.call(arguments,
                1));
            c && (this.chart.scrollbarsOffsets = [0, 0], this.chart.axisOffset[b] += c.size + c.options.margin)
        });
        g(D.prototype, "destroy", function(a) {
            this.scrollbar && (this.scrollbar = this.scrollbar.destroy());
            a.apply(this, Array.prototype.slice.call(arguments, 1))
        });
        a.Scrollbar = C
    })(L);
    (function(a) {
        function C(a) {
            this.init(a)
        }
        var G = a.addEvent,
            D = a.Axis,
            q = a.Chart,
            n = a.color,
            h = a.defaultOptions,
            x = a.defined,
            r = a.destroyObjectProperties,
            u = a.each,
            A = a.erase,
            f = a.error,
            c = a.extend,
            l = a.grep,
            b = a.hasTouch,
            g = a.isArray,
            p = a.isNumber,
            v = a.isObject,
            e = a.merge,
            w = a.pick,
            E = a.removeEvent,
            m = a.Scrollbar,
            z = a.Series,
            t = a.seriesTypes,
            H = a.wrap,
            I = [].concat(a.defaultDataGroupingUnits),
            K = function(a) {
                var b = l(arguments, p);
                if (b.length) return Math[a].apply(0, b)
            };
        I[4] = ["day", [1, 2, 3, 4]];
        I[5] = ["week", [1, 2, 3]];
        t = void 0 === t.areaspline ? "line" : "areaspline";
        c(h, {
            navigator: {
                height: 40,
                margin: 25,
                maskInside: !0,
                handles: {
                    width: 7,
                    height: 30,
                    symbols: ["navigator-handle", "navigator-handle"],
                    enabled: !0,
                    lineWidth: 1,
                    backgroundColor: "#f2f2f2",
                    borderColor: "#999999"
                },
                maskFill: n("#6685c2").setOpacity(.3).get(),
                outlineColor: "#cccccc",
                outlineWidth: 1,
                series: {
                    type: t,
                    fillOpacity: .05,
                    lineWidth: 1,
                    compare: null,
                    dataGrouping: {
                        approximation: "average",
                        enabled: !0,
                        groupPixelWidth: 2,
                        smoothed: !0,
                        units: I
                    },
                    dataLabels: {
                        enabled: !1,
                        zIndex: 2
                    },
                    id: "highcharts-navigator-series",
                    className: "highcharts-navigator-series",
                    lineColor: null,
                    marker: {
                        enabled: !1
                    },
                    pointRange: 0,
                    threshold: null
                },
                xAxis: {
                    overscroll: 0,
                    className: "highcharts-navigator-xaxis",
                    tickLength: 0,
                    lineWidth: 0,
                    gridLineColor: "#e6e6e6",
                    gridLineWidth: 1,
                    tickPixelInterval: 200,
                    labels: {
                        align: "left",
                        style: {
                            color: "#999999"
                        },
                        x: 3,
                        y: -4
                    },
                    crosshair: !1
                },
                yAxis: {
                    className: "highcharts-navigator-yaxis",
                    gridLineWidth: 0,
                    startOnTick: !1,
                    endOnTick: !1,
                    minPadding: .1,
                    maxPadding: .1,
                    labels: {
                        enabled: !1
                    },
                    crosshair: !1,
                    title: {
                        text: null
                    },
                    tickLength: 0,
                    tickWidth: 0
                }
            }
        });
        a.Renderer.prototype.symbols["navigator-handle"] = function(a, b, c, e, f) {
            a = f.width / 2;
            b = Math.round(a / 3) + .5;
            f = f.height;
            return ["M", -a - 1, .5, "L", a, .5, "L", a, f + .5, "L", -a - 1, f + .5, "L", -a - 1, .5, "M", -b, 4, "L", -b, f - 3, "M", b - 1, 4, "L", b - 1, f - 3]
        };
        C.prototype = {
            drawHandle: function(a,
                b, c, e) {
                var d = this.navigatorOptions.handles.height;
                this.handles[b][e](c ? {
                    translateX: Math.round(this.left + this.height / 2),
                    translateY: Math.round(this.top + parseInt(a, 10) + .5 - d)
                } : {
                    translateX: Math.round(this.left + parseInt(a, 10)),
                    translateY: Math.round(this.top + this.height / 2 - d / 2 - 1)
                })
            },
            drawOutline: function(a, b, c, e) {
                var d = this.navigatorOptions.maskInside,
                    f = this.outline.strokeWidth(),
                    g = f / 2,
                    f = f % 2 / 2,
                    k = this.outlineHeight,
                    h = this.scrollbarHeight,
                    m = this.size,
                    l = this.left - h,
                    n = this.top;
                c ? (l -= g, c = n + b + f, b = n + a + f, a = ["M", l +
                    k, n - h - f, "L", l + k, c, "L", l, c, "L", l, b, "L", l + k, b, "L", l + k, n + m + h
                ].concat(d ? ["M", l + k, c - g, "L", l + k, b + g] : [])) : (a += l + h - f, b += l + h - f, n += g, a = ["M", l, n, "L", a, n, "L", a, n + k, "L", b, n + k, "L", b, n, "L", l + m + 2 * h, n].concat(d ? ["M", a - g, n, "L", b + g, n] : []));
                this.outline[e]({
                    d: a
                })
            },
            drawMasks: function(a, b, c, e) {
                var d = this.left,
                    f = this.top,
                    g = this.height,
                    k, h, m, l;
                c ? (m = [d, d, d], l = [f, f + a, f + b], h = [g, g, g], k = [a, b - a, this.size - b]) : (m = [d, d + a, d + b], l = [f, f, f], h = [a, b - a, this.size - b], k = [g, g, g]);
                u(this.shades, function(a, b) {
                    a[e]({
                        x: m[b],
                        y: l[b],
                        width: h[b],
                        height: k[b]
                    })
                })
            },
            renderElements: function() {
                var a = this,
                    b = a.navigatorOptions,
                    c = b.maskInside,
                    e = a.chart,
                    f = e.inverted,
                    g = e.renderer,
                    h;
                a.navigatorGroup = h = g.g("navigator").attr({
                    zIndex: 8,
                    visibility: "hidden"
                }).add();
                var m = {
                    cursor: f ? "ns-resize" : "ew-resize"
                };
                u([!c, c, !c], function(c, d) {
                    a.shades[d] = g.rect().addClass("highcharts-navigator-mask" + (1 === d ? "-inside" : "-outside")).attr({
                        fill: c ? b.maskFill : "rgba(0,0,0,0)"
                    }).css(1 === d && m).add(h)
                });
                a.outline = g.path().addClass("highcharts-navigator-outline").attr({
                    "stroke-width": b.outlineWidth,
                    stroke: b.outlineColor
                }).add(h);
                b.handles.enabled && u([0, 1], function(c) {
                    b.handles.inverted = e.inverted;
                    a.handles[c] = g.symbol(b.handles.symbols[c], -b.handles.width / 2 - 1, 0, b.handles.width, b.handles.height, b.handles);
                    a.handles[c].attr({
                        zIndex: 7 - c
                    }).addClass("highcharts-navigator-handle highcharts-navigator-handle-" + ["left", "right"][c]).add(h);
                    var d = b.handles;
                    a.handles[c].attr({
                        fill: d.backgroundColor,
                        stroke: d.borderColor,
                        "stroke-width": d.lineWidth
                    }).css(m)
                })
            },
            update: function(a) {
                u(this.series || [], function(a) {
                    a.baseSeries &&
                        delete a.baseSeries.navigatorSeries
                });
                this.destroy();
                e(!0, this.chart.options.navigator, this.options, a);
                this.init(this.chart)
            },
            render: function(b, c, e, f) {
                var d = this.chart,
                    g, k, h = this.scrollbarHeight,
                    m, l = this.xAxis;
                g = l.fake ? d.xAxis[0] : l;
                var n = this.navigatorEnabled,
                    t, y = this.rendered;
                k = d.inverted;
                var r, q = d.xAxis[0].minRange,
                    z = d.xAxis[0].options.maxRange;
                if (!this.hasDragged || x(e)) {
                    if (!p(b) || !p(c))
                        if (y) e = 0, f = w(l.width, g.width);
                        else return;
                    this.left = w(l.left, d.plotLeft + h + (k ? d.plotWidth : 0));
                    this.size = t = m = w(l.len, (k ? d.plotHeight : d.plotWidth) - 2 * h);
                    d = k ? h : m + 2 * h;
                    e = w(e, l.toPixels(b, !0));
                    f = w(f, l.toPixels(c, !0));
                    p(e) && Infinity !== Math.abs(e) || (e = 0, f = d);
                    b = l.toValue(e, !0);
                    c = l.toValue(f, !0);
                    r = Math.abs(a.correctFloat(c - b));
                    r < q ? this.grabbedLeft ? e = l.toPixels(c - q, !0) : this.grabbedRight && (f = l.toPixels(b + q, !0)) : x(z) && r > z && (this.grabbedLeft ? e = l.toPixels(c - z, !0) : this.grabbedRight && (f = l.toPixels(b + z, !0)));
                    this.zoomedMax = Math.min(Math.max(e, f, 0), t);
                    this.zoomedMin = Math.min(Math.max(this.fixedWidth ? this.zoomedMax - this.fixedWidth :
                        Math.min(e, f), 0), t);
                    this.range = this.zoomedMax - this.zoomedMin;
                    t = Math.round(this.zoomedMax);
                    e = Math.round(this.zoomedMin);
                    n && (this.navigatorGroup.attr({
                        visibility: "visible"
                    }), y = y && !this.hasDragged ? "animate" : "attr", this.drawMasks(e, t, k, y), this.drawOutline(e, t, k, y), this.navigatorOptions.handles.enabled && (this.drawHandle(e, 0, k, y), this.drawHandle(t, 1, k, y)));
                    this.scrollbar && (k ? (k = this.top - h, g = this.left - h + (n || !g.opposite ? 0 : (g.titleOffset || 0) + g.axisTitleMargin), h = m + 2 * h) : (k = this.top + (n ? this.height : -h), g = this.left -
                        h), this.scrollbar.position(g, k, d, h), this.scrollbar.setRange(this.zoomedMin / m, this.zoomedMax / m));
                    this.rendered = !0
                }
            },
            addMouseEvents: function() {
                var a = this,
                    c = a.chart,
                    e = c.container,
                    f = [],
                    g, h;
                a.mouseMoveHandler = g = function(b) {
                    a.onMouseMove(b)
                };
                a.mouseUpHandler = h = function(b) {
                    a.onMouseUp(b)
                };
                f = a.getPartsEvents("mousedown");
                f.push(G(e, "mousemove", g), G(e.ownerDocument, "mouseup", h));
                b && (f.push(G(e, "touchmove", g), G(e.ownerDocument, "touchend", h)), f.concat(a.getPartsEvents("touchstart")));
                a.eventsToUnbind = f;
                a.series &&
                    a.series[0] && f.push(G(a.series[0].xAxis, "foundExtremes", function() {
                        c.navigator.modifyNavigatorAxisExtremes()
                    }))
            },
            getPartsEvents: function(a) {
                var b = this,
                    c = [];
                u(["shades", "handles"], function(d) {
                    u(b[d], function(e, f) {
                        c.push(G(e.element, a, function(a) {
                            b[d + "Mousedown"](a, f)
                        }))
                    })
                });
                return c
            },
            shadesMousedown: function(a, b) {
                a = this.chart.pointer.normalize(a);
                var c = this.chart,
                    d = this.xAxis,
                    e = this.zoomedMin,
                    f = this.left,
                    g = this.size,
                    h = this.range,
                    m = a.chartX,
                    l, n;
                c.inverted && (m = a.chartY, f = this.top);
                1 === b ? (this.grabbedCenter =
                    m, this.fixedWidth = h, this.dragOffset = m - e) : (a = m - f - h / 2, 0 === b ? a = Math.max(0, a) : 2 === b && a + h >= g && (a = g - h, d.reversed ? (a -= h, n = this.getUnionExtremes().dataMin) : l = this.getUnionExtremes().dataMax), a !== e && (this.fixedWidth = h, b = d.toFixedRange(a, a + h, n, l), x(b.min) && c.xAxis[0].setExtremes(Math.min(b.min, b.max), Math.max(b.min, b.max), !0, null, {
                    trigger: "navigator"
                })))
            },
            handlesMousedown: function(a, b) {
                this.chart.pointer.normalize(a);
                a = this.chart;
                var c = a.xAxis[0],
                    d = a.inverted && !c.reversed || !a.inverted && c.reversed;
                0 === b ? (this.grabbedLeft = !0, this.otherHandlePos = this.zoomedMax, this.fixedExtreme = d ? c.min : c.max) : (this.grabbedRight = !0, this.otherHandlePos = this.zoomedMin, this.fixedExtreme = d ? c.max : c.min);
                a.fixedRange = null
            },
            onMouseMove: function(a) {
                var b = this,
                    c = b.chart,
                    d = b.left,
                    e = b.navigatorSize,
                    f = b.range,
                    g = b.dragOffset,
                    h = c.inverted;
                a.touches && 0 === a.touches[0].pageX || (a = c.pointer.normalize(a), c = a.chartX, h && (d = b.top, c = a.chartY), b.grabbedLeft ? (b.hasDragged = !0, b.render(0, 0, c - d, b.otherHandlePos)) : b.grabbedRight ? (b.hasDragged = !0, b.render(0, 0, b.otherHandlePos,
                    c - d)) : b.grabbedCenter && (b.hasDragged = !0, c < g ? c = g : c > e + g - f && (c = e + g - f), b.render(0, 0, c - g, c - g + f)), b.hasDragged && b.scrollbar && b.scrollbar.options.liveRedraw && (a.DOMType = a.type, setTimeout(function() {
                    b.onMouseUp(a)
                }, 0)))
            },
            onMouseUp: function(a) {
                var b = this.chart,
                    c = this.xAxis,
                    d = c && c.reversed,
                    e = this.scrollbar,
                    f, g, h = a.DOMEvent || a;
                (!this.hasDragged || e && e.hasDragged) && "scrollbar" !== a.trigger || (e = this.getUnionExtremes(), this.zoomedMin === this.otherHandlePos ? f = this.fixedExtreme : this.zoomedMax === this.otherHandlePos &&
                        (g = this.fixedExtreme), this.zoomedMax === this.size && (g = d ? e.dataMin : e.dataMax), 0 === this.zoomedMin && (f = d ? e.dataMax : e.dataMin), c = c.toFixedRange(this.zoomedMin, this.zoomedMax, f, g), x(c.min) && b.xAxis[0].setExtremes(Math.min(c.min, c.max), Math.max(c.min, c.max), !0, this.hasDragged ? !1 : null, {
                            trigger: "navigator",
                            triggerOp: "navigator-drag",
                            DOMEvent: h
                        }));
                "mousemove" !== a.DOMType && (this.grabbedLeft = this.grabbedRight = this.grabbedCenter = this.fixedWidth = this.fixedExtreme = this.otherHandlePos = this.hasDragged = this.dragOffset =
                    null)
            },
            removeEvents: function() {
                this.eventsToUnbind && (u(this.eventsToUnbind, function(a) {
                    a()
                }), this.eventsToUnbind = void 0);
                this.removeBaseSeriesEvents()
            },
            removeBaseSeriesEvents: function() {
                var a = this.baseSeries || [];
                this.navigatorEnabled && a[0] && (!1 !== this.navigatorOptions.adaptToUpdatedData && u(a, function(a) {
                    E(a, "updatedData", this.updatedDataHandler)
                }, this), a[0].xAxis && E(a[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes))
            },
            init: function(a) {
                var b = a.options,
                    c = b.navigator,
                    d = c.enabled,
                    f = b.scrollbar,
                    g =
                        f.enabled,
                    b = d ? c.height : 0,
                    h = g ? f.height : 0;
                this.handles = [];
                this.shades = [];
                this.chart = a;
                this.setBaseSeries();
                this.height = b;
                this.scrollbarHeight = h;
                this.scrollbarEnabled = g;
                this.navigatorEnabled = d;
                this.navigatorOptions = c;
                this.scrollbarOptions = f;
                this.outlineHeight = b + h;
                this.opposite = w(c.opposite, !d && a.inverted);
                var l = this,
                    f = l.baseSeries,
                    g = a.xAxis.length,
                    n = a.yAxis.length,
                    p = f && f[0] && f[0].xAxis || a.xAxis[0];
                a.extraMargin = {
                    type: l.opposite ? "plotTop" : "marginBottom",
                    value: (d || !a.inverted ? l.outlineHeight : 0) + c.margin
                };
                a.inverted && (a.extraMargin.type = l.opposite ? "marginRight" : "plotLeft");
                a.isDirtyBox = !0;
                l.navigatorEnabled ? (l.xAxis = new D(a, e({
                    breaks: p.options.breaks,
                    ordinal: p.options.ordinal
                }, c.xAxis, {
                    id: "navigator-x-axis",
                    yAxis: "navigator-y-axis",
                    isX: !0,
                    type: "datetime",
                    index: g,
                    offset: 0,
                    keepOrdinalPadding: !0,
                    startOnTick: !1,
                    endOnTick: !1,
                    minPadding: 0,
                    maxPadding: 0,
                    zoomEnabled: !1
                }, a.inverted ? {
                    offsets: [h, 0, -h, 0],
                    width: b
                } : {
                    offsets: [0, -h, 0, h],
                    height: b
                })), l.yAxis = new D(a, e(c.yAxis, {
                    id: "navigator-y-axis",
                    alignTicks: !1,
                    offset: 0,
                    index: n,
                    zoomEnabled: !1
                }, a.inverted ? {
                    width: b
                } : {
                    height: b
                })), f || c.series.data ? l.updateNavigatorSeries() : 0 === a.series.length && H(a, "redraw", function(b, c) {
                    0 < a.series.length && !l.series && (l.setBaseSeries(), a.redraw = b);
                    b.call(a, c)
                }), l.renderElements(), l.addMouseEvents()) : l.xAxis = {
                    translate: function(b, c) {
                        var d = a.xAxis[0],
                            e = d.getExtremes(),
                            f = d.len - 2 * h,
                            g = K("min", d.options.min, e.dataMin),
                            d = K("max", d.options.max, e.dataMax) - g;
                        return c ? b * d / f + g : f * (b - g) / d
                    },
                    toPixels: function(a) {
                        return this.translate(a)
                    },
                    toValue: function(a) {
                        return this.translate(a, !0)
                    },
                    toFixedRange: D.prototype.toFixedRange,
                    fake: !0
                };
                a.options.scrollbar.enabled && (a.scrollbar = l.scrollbar = new m(a.renderer, e(a.options.scrollbar, {
                    margin: l.navigatorEnabled ? 0 : 10,
                    vertical: a.inverted
                }), a), G(l.scrollbar, "changed", function(b) {
                    var c = l.size,
                        d = c * this.to,
                        c = c * this.from;
                    l.hasDragged = l.scrollbar.hasDragged;
                    l.render(0, 0, c, d);
                    (a.options.scrollbar.liveRedraw || "mousemove" !== b.DOMType && "touchmove" !== b.DOMType) && setTimeout(function() {
                        l.onMouseUp(b)
                    })
                }));
                l.addBaseSeriesEvents();
                l.addChartEvents()
            },
            getUnionExtremes: function(a) {
                var b = this.chart.xAxis[0],
                    c = this.xAxis,
                    d = c.options,
                    e = b.options,
                    f;
                a && null === b.dataMin || (f = {
                    dataMin: w(d && d.min, K("min", e.min, b.dataMin, c.dataMin, c.min)),
                    dataMax: w(d && d.max, K("max", e.max, b.dataMax, c.dataMax, c.max))
                });
                return f
            },
            setBaseSeries: function(a, b) {
                var c = this.chart,
                    d = this.baseSeries = [];
                a = a || c.options && c.options.navigator.baseSeries || 0;
                u(c.series || [], function(b, c) {
                    b.options.isInternal || !b.options.showInNavigator && (c !== a && b.options.id !== a || !1 === b.options.showInNavigator) ||
                        d.push(b)
                });
                this.xAxis && !this.xAxis.fake && this.updateNavigatorSeries(b)
            },
            updateNavigatorSeries: function(b) {
                var d = this,
                    f = d.chart,
                    k = d.baseSeries,
                    l, m, n = d.navigatorOptions.series,
                    p, t = {
                        enableMouseTracking: !1,
                        index: null,
                        linkedTo: null,
                        group: "nav",
                        padXAxis: !1,
                        xAxis: "navigator-x-axis",
                        yAxis: "navigator-y-axis",
                        showInLegend: !1,
                        stacking: !1,
                        isInternal: !0,
                        visible: !0
                    }, r = d.series = a.grep(d.series || [], function(b) {
                        var c = b.baseSeries;
                        return 0 > a.inArray(c, k) ? (c && (E(c, "updatedData", d.updatedDataHandler), delete c.navigatorSeries),
                            b.destroy(), !1) : !0
                    });
                k && k.length && u(k, function(a) {
                    var q = a.navigatorSeries,
                        y = c({
                            color: a.color
                        }, g(n) ? h.navigator.series : n);
                    q && !1 === d.navigatorOptions.adaptToUpdatedData || (t.name = "Navigator " + k.length, l = a.options || {}, p = l.navigatorOptions || {}, m = e(l, t, y, p), y = p.data || y.data, d.hasNavigatorData = d.hasNavigatorData || !! y, m.data = y || l.data && l.data.slice(0), q && q.options ? q.update(m, b) : (a.navigatorSeries = f.initSeries(m), a.navigatorSeries.baseSeries = a, r.push(a.navigatorSeries)))
                });
                if (n.data && (!k || !k.length) || g(n)) d.hasNavigatorData = !1, n = a.splat(n), u(n, function(a, b) {
                    t.name = "Navigator " + (r.length + 1);
                    m = e(h.navigator.series, {
                        color: f.series[b] && !f.series[b].options.isInternal && f.series[b].color || f.options.colors[b] || f.options.colors[0]
                    }, t, a);
                    m.data = a.data;
                    m.data && (d.hasNavigatorData = !0, r.push(f.initSeries(m)))
                });
                this.addBaseSeriesEvents()
            },
            addBaseSeriesEvents: function() {
                var a = this,
                    b = a.baseSeries || [];
                b[0] && b[0].xAxis && G(b[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes);
                u(b, function(b) {
                    G(b, "show", function() {
                        this.navigatorSeries &&
                            this.navigatorSeries.setVisible(!0, !1)
                    });
                    G(b, "hide", function() {
                        this.navigatorSeries && this.navigatorSeries.setVisible(!1, !1)
                    });
                    !1 !== this.navigatorOptions.adaptToUpdatedData && b.xAxis && G(b, "updatedData", this.updatedDataHandler);
                    G(b, "remove", function() {
                        this.navigatorSeries && (A(a.series, this.navigatorSeries), this.navigatorSeries.remove(!1), delete this.navigatorSeries)
                    })
                }, this)
            },
            modifyNavigatorAxisExtremes: function() {
                var a = this.xAxis,
                    b;
                a.getExtremes && (!(b = this.getUnionExtremes(!0)) || b.dataMin === a.min &&
                    b.dataMax === a.max || (a.min = b.dataMin, a.max = b.dataMax))
            },
            modifyBaseAxisExtremes: function() {
                var a = this.chart.navigator,
                    b = this.getExtremes(),
                    c = b.dataMin,
                    e = b.dataMax,
                    b = b.max - b.min,
                    f = a.stickToMin,
                    g = a.stickToMax,
                    h = this.options.overscroll,
                    m, l, n = a.series && a.series[0],
                    t = !! this.setExtremes;
                this.eventArgs && "rangeSelectorButton" === this.eventArgs.trigger || (f && (l = c, m = l + b), g && (m = e + h, f || (l = Math.max(m - b, n && n.xData ? n.xData[0] : -Number.MAX_VALUE))), t && (f || g) && p(l) && (this.min = this.userMin = l, this.max = this.userMax = m));
                a.stickToMin =
                    a.stickToMax = null
            },
            updatedDataHandler: function() {
                var a = this.chart.navigator,
                    b = this.navigatorSeries;
                a.stickToMax = a.xAxis.reversed ? 0 === Math.round(a.zoomedMin) : Math.round(a.zoomedMax) >= Math.round(a.size);
                a.stickToMin = p(this.xAxis.min) && this.xAxis.min <= this.xData[0] && (!this.chart.fixedRange || !a.stickToMax);
                b && !a.hasNavigatorData && (b.options.pointStart = this.xData[0], b.setData(this.options.data, !1, null, !1))
            },
            addChartEvents: function() {
                G(this.chart, "redraw", function() {
                    var a = this.navigator,
                        b = a && (a.baseSeries &&
                            a.baseSeries[0] && a.baseSeries[0].xAxis || a.scrollbar && this.xAxis[0]);
                    b && a.render(b.min, b.max)
                })
            },
            destroy: function() {
                this.removeEvents();
                this.xAxis && (A(this.chart.xAxis, this.xAxis), A(this.chart.axes, this.xAxis));
                this.yAxis && (A(this.chart.yAxis, this.yAxis), A(this.chart.axes, this.yAxis));
                u(this.series || [], function(a) {
                    a.destroy && a.destroy()
                });
                u("series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" "), function(a) {
                    this[a] && this[a].destroy &&
                        this[a].destroy();
                    this[a] = null
                }, this);
                u([this.handles], function(a) {
                    r(a)
                }, this)
            }
        };
        a.Navigator = C;
        H(D.prototype, "zoom", function(a, b, c) {
            var d = this.chart,
                e = d.options,
                f = e.chart.zoomType,
                g = e.navigator,
                e = e.rangeSelector,
                h;
            this.isXAxis && (g && g.enabled || e && e.enabled) && ("x" === f ? d.resetZoomButton = "blocked" : "y" === f ? h = !1 : "xy" === f && this.options.range && (d = this.previousZoom, x(b) ? this.previousZoom = [this.min, this.max] : d && (b = d[0], c = d[1], delete this.previousZoom)));
            return void 0 !== h ? h : a.call(this, b, c)
        });
        H(q.prototype,
            "init", function(a, b, c) {
                G(this, "beforeRender", function() {
                    var a = this.options;
                    if (a.navigator.enabled || a.scrollbar.enabled) this.scroller = this.navigator = new C(this)
                });
                a.call(this, b, c)
            });
        H(q.prototype, "setChartSize", function(a) {
            var b = this.legend,
                c = this.navigator,
                d, e, f, g;
            a.apply(this, [].slice.call(arguments, 1));
            c && (e = b && b.options, f = c.xAxis, g = c.yAxis, d = c.scrollbarHeight, this.inverted ? (c.left = c.opposite ? this.chartWidth - d - c.height : this.spacing[3] + d, c.top = this.plotTop + d) : (c.left = this.plotLeft + d, c.top = c.navigatorOptions.top ||
                this.chartHeight - c.height - d - this.spacing[2] - (this.rangeSelector && this.extraBottomMargin ? this.rangeSelector.getHeight() : 0) - (e && "bottom" === e.verticalAlign && e.enabled && !e.floating ? b.legendHeight + w(e.margin, 10) : 0)), f && g && (this.inverted ? f.options.left = g.options.left = c.left : f.options.top = g.options.top = c.top, f.setAxisSize(), g.setAxisSize()))
        });
        H(z.prototype, "addPoint", function(a, b, c, e, g) {
            var d = this.options.turboThreshold;
            d && this.xData.length > d && v(b, !0) && this.chart.navigator && f(20, !0);
            a.call(this, b, c, e, g)
        });
        H(q.prototype, "addSeries", function(a, b, c, e) {
            a = a.call(this, b, !1, e);
            this.navigator && this.navigator.setBaseSeries(null, !1);
            w(c, !0) && this.redraw();
            return a
        });
        H(z.prototype, "update", function(a, b, c) {
            a.call(this, b, !1);
            this.chart.navigator && !this.options.isInternal && this.chart.navigator.setBaseSeries(null, !1);
            w(c, !0) && this.chart.redraw()
        });
        q.prototype.callbacks.push(function(a) {
            var b = a.navigator;
            b && (a = a.xAxis[0].getExtremes(), b.render(a.min, a.max))
        })
    })(L);
    (function(a) {
        function C(a) {
            this.init(a)
        }
        var G = a.addEvent,
            D = a.Axis,
            q = a.Chart,
            n = a.css,
            h = a.createElement,
            x = a.defaultOptions,
            r = a.defined,
            u = a.destroyObjectProperties,
            A = a.discardElement,
            f = a.each,
            c = a.extend,
            l = a.fireEvent,
            b = a.isNumber,
            g = a.merge,
            p = a.pick,
            v = a.pInt,
            e = a.splat,
            w = a.wrap;
        c(x, {
            rangeSelector: {
                verticalAlign: "top",
                buttonTheme: {
                    "stroke-width": 0,
                    width: 28,
                    height: 18,
                    padding: 2,
                    zIndex: 7
                },
                floating: !1,
                x: 0,
                y: 0,
                height: void 0,
                inputPosition: {
                    align: "right",
                    x: 0,
                    y: 0
                },
                buttonPosition: {
                    align: "left",
                    x: 0,
                    y: 0
                },
                labelStyle: {
                    color: "#666666"
                }
            }
        });
        x.lang = g(x.lang, {
            rangeSelectorZoom: "Zoom",
            rangeSelectorFrom: "From",
            rangeSelectorTo: "To"
        });
        C.prototype = {
            clickButton: function(a, c) {
                var g = this,
                    h = g.chart,
                    l = g.buttonOptions[a],
                    m = h.xAxis[0],
                    n = h.scroller && h.scroller.getUnionExtremes() || m || {}, d = n.dataMin,
                    q = n.dataMax,
                    r, k = m && Math.round(Math.min(m.max, p(q, m.max))),
                    v = l.type,
                    u, n = l._range,
                    x, w, A, E = l.dataGrouping;
                if (null !== d && null !== q) {
                    h.fixedRange = n;
                    E && (this.forcedDataGrouping = !0, D.prototype.setDataGrouping.call(m || {
                        chart: this.chart
                    }, E, !1));
                    if ("month" === v || "year" === v) m ? (v = {
                        range: l,
                        max: k,
                        chart: h,
                        dataMin: d,
                        dataMax: q
                    }, r = m.minFromRange.call(v), b(v.newMax) && (k = v.newMax)) : n = l;
                    else if (n) r = Math.max(k - n, d), k = Math.min(r + n, q);
                    else if ("ytd" === v)
                        if (m) void 0 === q && (d = Number.MAX_VALUE, q = Number.MIN_VALUE, f(h.series, function(a) {
                            a = a.xData;
                            d = Math.min(a[0], d);
                            q = Math.max(a[a.length - 1], q)
                        }), c = !1), k = g.getYTDExtremes(q, d, h.time.useUTC), r = x = k.min, k = k.max;
                        else {
                            G(h, "beforeRender", function() {
                                g.clickButton(a)
                            });
                            return
                        } else "all" === v && m && (r = d, k = q);
                    r += l._offsetMin;
                    k += l._offsetMax;
                    g.setSelected(a);
                    m ? m.setExtremes(r, k, p(c, 1), null, {
                        trigger: "rangeSelectorButton",
                        rangeSelectorButton: l
                    }) : (u = e(h.options.xAxis)[0], A = u.range, u.range = n, w = u.min, u.min = x, G(h, "load", function() {
                        u.range = A;
                        u.min = w
                    }))
                }
            },
            setSelected: function(a) {
                this.selected = this.options.selected = a
            },
            defaultButtons: [{
                type: "minute",
                count: 30,
                text: "30분"
            }, {
                type: "hour",
                count: 1,
                text: "1시간"
            }, {
                type: "month",
                count: 6,
                text: "6달"
            }, {
                type: "year",
                count: 1,
                text: "1년"
            }],
            init: function(a) {
                var b = this,
                    c = a.options.rangeSelector,
                    e = c.buttons || [].concat(b.defaultButtons),
                    g = c.selected,
                    h = function() {
                        var a = b.minInput,
                            c = b.maxInput;
                        a && a.blur && l(a, "blur");
                        c && c.blur && l(c, "blur")
                    };
                b.chart = a;
                b.options = c;
                b.buttons = [];
                a.extraTopMargin = c.height;
                b.buttonOptions = e;
                this.unMouseDown = G(a.container, "mousedown", h);
                this.unResize = G(a, "resize", h);
                f(e, b.computeButtonRange);
                void 0 !== g && e[g] && this.clickButton(g, !1);
                G(a, "load", function() {
                    a.xAxis && a.xAxis[0] && G(a.xAxis[0], "setExtremes", function(c) {
                        this.max - this.min !== a.fixedRange && "rangeSelectorButton" !== c.trigger && "updatedData" !== c.trigger &&
                            b.forcedDataGrouping && this.setDataGrouping(!1, !1)
                    })
                })
            },
            updateButtonStates: function() {
                var a = this.chart,
                    c = a.xAxis[0],
                    e = Math.round(c.max - c.min),
                    g = !c.hasVisibleSeries,
                    h = a.scroller && a.scroller.getUnionExtremes() || c,
                    l = h.dataMin,
                    n = h.dataMax,
                    a = this.getYTDExtremes(n, l, a.time.useUTC),
                    d = a.min,
                    p = a.max,
                    q = this.selected,
                    k = b(q),
                    r = this.options.allButtonsEnabled,
                    v = this.buttons;
                f(this.buttonOptions, function(a, b) {
                    var f = a._range,
                        h = a.type,
                        m = a.count || 1,
                        t = v[b],
                        z = 0;
                    a = a._offsetMax - a._offsetMin;
                    b = b === q;
                    var y = f > n - l,
                        u = f < c.minRange,
                        x = !1,
                        w = !1,
                        f = f === e;
                    ("month" === h || "year" === h) && e + 36E5 >= 864E5 * {
                            month: 28,
                            year: 365
                    }[h] * m - a && e - 36E5 <= 864E5 * {
                        month: 31,
                        year: 366
                    }[h] * m + a ? f = !0 : "ytd" === h ? (f = p - d + a === e, x = !b) : "all" === h && (f = c.max - c.min >= n - l, w = !b && k && f);
                    h = !r && (y || u || w || g);
                    m = b && f || f && !k && !x;
                    h ? z = 3 : m && (k = !0, z = 2);
                    t.state !== z && t.setState(z)
                })
            },
            computeButtonRange: function(a) {
                var b = a.type,
                    c = a.count || 1,
                    e = {
                        millisecond: 1,
                        second: 1E3,
                        minute: 6E4,
                        hour: 36E5,
                        day: 864E5,
                        week: 6048E5
                    };
                if (e[b]) a._range = e[b] * c;
                else if ("month" === b || "year" === b) a._range = 864E5 * {
                    month: 30,
                    year: 365
                }[b] * c;
                a._offsetMin = p(a.offsetMin, 0);
                a._offsetMax = p(a.offsetMax, 0);
                a._range += a._offsetMax - a._offsetMin
            },
            setInputValue: function(a, b) {
                var c = this.chart.options.rangeSelector,
                    e = this.chart.time,
                    f = this[a + "Input"];
                r(b) && (f.previousValue = f.HCTime, f.HCTime = b);
                f.value = e.dateFormat(c.inputEditDateFormat || "%Y-%m-%d", f.HCTime);
                this[a + "DateBox"].attr({
                    text: e.dateFormat(c.inputDateFormat || "%Y년 %b %e", f.HCTime)
                })
            },
            showInput: function(a) {
                var b = this.inputGroup,
                    c = this[a + "DateBox"];
                n(this[a + "Input"], {
                    left: b.translateX + c.x + "px",
                    top: b.translateY + "px",
                    width: c.width - 2 + "px",
                    height: c.height - 2 + "px",
                    border: "2px solid silver"
                })
            },
            hideInput: function(a) {
                n(this[a + "Input"], {
                    border: 0,
                    width: "1px",
                    height: "1px"
                });
                this.setInputValue(a)
            },
            drawInput: function(a) {
                function e() {
                    var a = u.value,
                        c = (r.inputDateParser || Date.parse)(a),
                        d = l.xAxis[0],
                        e = l.scroller && l.scroller.xAxis ? l.scroller.xAxis : d,
                        g = e.dataMin,
                        e = e.dataMax;
                    c !== u.previousValue && (u.previousValue = c, b(c) || (c = a.split("-"), c = Date.UTC(v(c[0]), v(c[1]) - 1, v(c[2]))), b(c) && (l.time.useUTC || (c +=
                        6E4 * (new Date).getTimezoneOffset()), y ? c > f.maxInput.HCTime ? c = void 0 : c < g && (c = g) : c < f.minInput.HCTime ? c = void 0 : c > e && (c = e), void 0 !== c && d.setExtremes(y ? c : d.min, y ? d.max : c, void 0, void 0, {
                        trigger: "rangeSelectorInput"
                    })))
                }
                var f = this,
                    l = f.chart,
                    p = l.renderer.style || {}, q = l.renderer,
                    r = l.options.rangeSelector,
                    d = f.div,
                    y = "min" === a,
                    u, k, w = this.inputGroup;
                this[a + "Label"] = k = q.label(x.lang[y ? "rangeSelectorFrom" : "rangeSelectorTo"], this.inputGroup.offset).addClass("highcharts-range-label").attr({
                    padding: 2
                }).add(w);
                w.offset +=
                    k.width + 5;
                this[a + "DateBox"] = q = q.label("", w.offset).addClass("highcharts-range-input").attr({
                    padding: 2,
                    width: r.inputBoxWidth || 90,
                    height: r.inputBoxHeight || 17,
                    stroke: r.inputBoxBorderColor || "#cccccc",
                    "stroke-width": 1,
                    "text-align": "center"
                }).on("click", function() {
                    f.showInput(a);
                    f[a + "Input"].focus()
                }).add(w);
                w.offset += q.width + (y ? 10 : 0);
                this[a + "Input"] = u = h("input", {
                    name: a,
                    className: "highcharts-range-selector",
                    type: "text"
                }, {
                    top: l.plotTop + "px"
                }, d);
                k.css(g(p, r.labelStyle));
                q.css(g({
                    color: "#333333"
                }, p, r.inputStyle));
                n(u, c({
                    position: "absolute",
                    border: 0,
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    textAlign: "center",
                    fontSize: p.fontSize,
                    fontFamily: p.fontFamily,
                    top: "-9999em"
                }, r.inputStyle));
                u.onfocus = function() {
                    f.showInput(a)
                };
                u.onblur = function() {
                    f.hideInput(a)
                };
                u.onchange = e;
                u.onkeypress = function(a) {
                    13 === a.keyCode && e()
                }
            },
            getPosition: function() {
                var a = this.chart,
                    b = a.options.rangeSelector,
                    a = "top" === b.verticalAlign ? a.plotTop - a.axisOffset[0] : 0;
                return {
                    buttonTop: a + b.buttonPosition.y,
                    inputTop: a + b.inputPosition.y - 10
                }
            },
            getYTDExtremes: function(a,
                b, c) {
                var e = this.chart.time,
                    f = new e.Date(a),
                    g = e.get("FullYear", f);
                c = c ? e.Date.UTC(g, 0, 1) : +new e.Date(g, 0, 1);
                b = Math.max(b || 0, c);
                f = f.getTime();
                return {
                    max: Math.min(a || f, f),
                    min: b
                }
            },
            render: function(a, b) {
                var c = this,
                    e = c.chart,
                    g = e.renderer,
                    l = e.container,
                    m = e.options,
                    d = m.exporting && !1 !== m.exporting.enabled && m.navigation && m.navigation.buttonOptions,
                    n = x.lang,
                    q = c.div,
                    k = m.rangeSelector,
                    m = k.floating,
                    r = c.buttons,
                    q = c.inputGroup,
                    v = k.buttonTheme,
                    u = k.buttonPosition,
                    w = k.inputPosition,
                    A = k.inputEnabled,
                    E = v && v.states,
                    C = e.plotLeft,
                    G, D = c.buttonGroup,
                    L;
                L = c.rendered;
                var W = c.options.verticalAlign,
                    Z = e.legend,
                    aa = Z && Z.options,
                    ba = u.y,
                    X = w.y,
                    ca = L || !1,
                    U = 0,
                    R = 0,
                    S;
                if (!1 !== k.enabled) {
                    L || (c.group = L = g.g("range-selector-group").attr({
                        zIndex: 7
                    }).add(), c.buttonGroup = D = g.g("range-selector-buttons").add(L), c.zoomText = g.text(n.rangeSelectorZoom, p(C + u.x, C), 15).css(k.labelStyle).add(D), G = p(C + u.x, C) + c.zoomText.getBBox().width + 5, f(c.buttonOptions, function(a, b) {
                        r[b] = g.button(a.text, G, 0, function() {
                            var d = a.events && a.events.click,
                                e;
                            d && (e = d.call(a));
                            !1 !==
                                e && c.clickButton(b);
                            c.isActive = !0
                        }, v, E && E.hover, E && E.select, E && E.disabled).attr({
                            "text-align": "center"
                        }).add(D);
                        G += r[b].width + p(k.buttonSpacing, 5)
                    }), !1 !== A && (c.div = q = h("div", null, {
                        position: "relative",
                        height: 0,
                        zIndex: 1
                    }), l.parentNode.insertBefore(q, l), c.inputGroup = q = g.g("input-group").add(L), q.offset = 0, c.drawInput("min"), c.drawInput("max")));
                    C = e.plotLeft - e.spacing[3];
                    c.updateButtonStates();
                    d && this.titleCollision(e) && "top" === W && "right" === u.align && u.y + D.getBBox().height - 12 < (d.y || 0) + d.height && (U = -40);
                    "left" === u.align ? S = u.x - e.spacing[3] : "right" === u.align && (S = u.x + U - e.spacing[1]);
                    D.align({
                        y: u.y,
                        width: D.getBBox().width,
                        align: u.align,
                        x: S
                    }, !0, e.spacingBox);
                    c.group.placed = ca;
                    c.buttonGroup.placed = ca;
                    !1 !== A && (U = d && this.titleCollision(e) && "top" === W && "right" === w.align && w.y - q.getBBox().height - 12 < (d.y || 0) + d.height + e.spacing[0] ? -40 : 0, "left" === w.align ? S = C : "right" === w.align && (S = -Math.max(e.axisOffset[1], -U)), q.align({
                            y: w.y,
                            width: q.getBBox().width,
                            align: w.align,
                            x: w.x + S - 2
                        }, !0, e.spacingBox), l = q.alignAttr.translateX +
                        q.alignOptions.x - U + q.getBBox().x + 2, d = q.alignOptions.width, n = D.alignAttr.translateX + D.getBBox().x, S = D.getBBox().width + 20, (w.align === u.align || n + S > l && l + d > n && ba < X + q.getBBox().height) && q.attr({
                            translateX: q.alignAttr.translateX + (e.axisOffset[1] >= -U ? 0 : -U),
                            translateY: q.alignAttr.translateY + D.getBBox().height + 10
                        }), c.setInputValue("min", a), c.setInputValue("max", b), c.inputGroup.placed = ca);
                    c.group.align({
                        verticalAlign: W
                    }, !0, e.spacingBox);
                    a = c.group.getBBox().height + 20;
                    b = c.group.alignAttr.translateY;
                    "bottom" ===
                        W && (Z = aa && "bottom" === aa.verticalAlign && aa.enabled && !aa.floating ? Z.legendHeight + p(aa.margin, 10) : 0, a = a + Z - 20, R = b - a - (m ? 0 : k.y) - 10);
                    if ("top" === W) m && (R = 0), e.titleOffset && (R = e.titleOffset + e.options.title.margin), R += e.margin[0] - e.spacing[0] || 0;
                    else if ("middle" === W)
                        if (X === ba) R = 0 > X ? b + void 0 : b;
                        else if (X || ba) R = 0 > X || 0 > ba ? R - Math.min(X, ba) : b - a + NaN;
                    c.group.translate(k.x, k.y + Math.floor(R));
                    !1 !== A && (c.minInput.style.marginTop = c.group.translateY + "px", c.maxInput.style.marginTop = c.group.translateY + "px");
                    c.rendered = !0
                }
            },
            getHeight: function() {
                var a = this.options,
                    b = this.group,
                    c = a.y,
                    e = a.buttonPosition.y,
                    a = a.inputPosition.y,
                    b = b ? b.getBBox(!0).height + 13 + c : 0,
                    c = Math.min(a, e);
                if (0 > a && 0 > e || 0 < a && 0 < e) b += Math.abs(c);
                return b
            },
            titleCollision: function(a) {
                return !(a.options.title.text || a.options.subtitle.text)
            },
            update: function(a) {
                var b = this.chart;
                g(!0, b.options.rangeSelector, a);
                this.destroy();
                this.init(b);
                b.rangeSelector.render()
            },
            destroy: function() {
                var b = this,
                    c = b.minInput,
                    e = b.maxInput;
                b.unMouseDown();
                b.unResize();
                u(b.buttons);
                c &&
                    (c.onfocus = c.onblur = c.onchange = null);
                e && (e.onfocus = e.onblur = e.onchange = null);
                a.objectEach(b, function(a, c) {
                    a && "chart" !== c && (a.destroy ? a.destroy() : a.nodeType && A(this[c]));
                    a !== C.prototype[c] && (b[c] = null)
                }, this)
            }
        };
        D.prototype.toFixedRange = function(a, c, e, f) {
            var g = this.chart && this.chart.fixedRange;
            a = p(e, this.translate(a, !0, !this.horiz));
            c = p(f, this.translate(c, !0, !this.horiz));
            e = g && (c - a) / g;.7 < e && 1.3 > e && (f ? a = c - g : c = a + g);
            b(a) && b(c) || (a = c = void 0);
            return {
                min: a,
                max: c
            }
        };
        D.prototype.minFromRange = function() {
            var a =
                this.range,
                c = {
                    month: "Month",
                    year: "FullYear"
                }[a.type],
                e, f = this.max,
                g, h, l = function(a, b) {
                    var d = new Date(a),
                        e = d["get" + c]();
                    d["set" + c](e + b);
                    e === d["get" + c]() && d.setDate(0);
                    return d.getTime() - a
                };
            b(a) ? (e = f - a, h = a) : (e = f + l(f, -a.count), this.chart && (this.chart.fixedRange = f - e));
            g = p(this.dataMin, Number.MIN_VALUE);
            b(e) || (e = g);
            e <= g && (e = g, void 0 === h && (h = l(e, a.count)), this.newMax = Math.min(e + h, this.dataMax));
            b(f) || (e = void 0);
            return e
        };
        w(q.prototype, "init", function(a, b, c) {
            G(this, "init", function() {
                this.options.rangeSelector.enabled &&
                    (this.rangeSelector = new C(this))
            });
            a.call(this, b, c)
        });
        w(q.prototype, "render", function(a, b, c) {
            var e = this.axes,
                g = this.rangeSelector;
            g && (f(e, function(a) {
                a.updateNames();
                a.setScale()
            }), this.getAxisMargins(), g.render(), e = g.options.verticalAlign, g.options.floating || ("bottom" === e ? this.extraBottomMargin = !0 : "middle" !== e && (this.extraTopMargin = !0)));
            a.call(this, b, c)
        });
        w(q.prototype, "update", function(b, c, e, f) {
            var g = this.rangeSelector,
                h;
            this.extraTopMargin = this.extraBottomMargin = !1;
            g && (g.render(), h = c.rangeSelector &&
                c.rangeSelector.verticalAlign || g.options && g.options.verticalAlign, g.options.floating || ("bottom" === h ? this.extraBottomMargin = !0 : "middle" !== h && (this.extraTopMargin = !0)));
            b.call(this, a.merge(!0, c, {
                chart: {
                    marginBottom: p(c.chart && c.chart.marginBottom, this.margin.bottom),
                    spacingBottom: p(c.chart && c.chart.spacingBottom, this.spacing.bottom)
                }
            }), e, f)
        });
        w(q.prototype, "redraw", function(a, b, c) {
            var e = this.rangeSelector;
            e && !e.options.floating && (e.render(), e = e.options.verticalAlign, "bottom" === e ? this.extraBottomMargin = !0 : "middle" !== e && (this.extraTopMargin = !0));
            a.call(this, b, c)
        });
        q.prototype.adjustPlotArea = function() {
            var a = this.rangeSelector;
            this.rangeSelector && (a = a.getHeight(), this.extraTopMargin && (this.plotTop += a), this.extraBottomMargin && (this.marginBottom += a))
        };
        q.prototype.callbacks.push(function(a) {
            function c() {
                e = a.xAxis[0].getExtremes();
                b(e.min) && f.render(e.min, e.max)
            }
            var e, f = a.rangeSelector,
                g, h;
            f && (h = G(a.xAxis[0], "afterSetExtremes", function(a) {
                f.render(a.min, a.max)
            }), g = G(a, "redraw", c), c());
            G(a, "destroy", function() {
                f &&
                    (g(), h())
            })
        });
        a.RangeSelector = C
    })(L);
    (function(a) {
        var C = a.arrayMax,
            G = a.arrayMin,
            D = a.Axis,
            q = a.Chart,
            n = a.defined,
            h = a.each,
            x = a.extend,
            r = a.format,
            u = a.grep,
            A = a.inArray,
            f = a.isNumber,
            c = a.isString,
            l = a.map,
            b = a.merge,
            g = a.pick,
            p = a.Point,
            v = a.Renderer,
            e = a.Series,
            w = a.splat,
            E = a.SVGRenderer,
            m = a.VMLRenderer,
            z = a.wrap,
            t = e.prototype,
            H = t.init,
            I = t.processData,
            K = p.prototype.tooltipFormatter;
        a.StockChart = a.stockChart = function(d, e, f) {
            var k = c(d) || d.nodeName,
                h = arguments[k ? 1 : 0],
                m = h.series,
                n = a.getOptions(),
                p, r = g(h.navigator &&
                    h.navigator.enabled, n.navigator.enabled, !0),
                t = r ? {
                    startOnTick: !1,
                    endOnTick: !1
                } : null,
                v = {
                    marker: {
                        enabled: !1,
                        radius: 2
                    }
                }, u = {
                    shadow: !1,
                    borderWidth: 0
                };
            h.xAxis = l(w(h.xAxis || {}), function(a, c) {
                return b({
                    minPadding: 0,
                    maxPadding: 0,
                    overscroll: 0,
                    ordinal: !0,
                    title: {
                        text: null
                    },
                    labels: {
                        overflow: "justify"
                    },
                    showLastLabel: !0
                }, n.xAxis, n.xAxis && n.xAxis[c], a, {
                    type: "datetime",
                    categories: null
                }, t)
            });
            h.yAxis = l(w(h.yAxis || {}), function(a, c) {
                p = g(a.opposite, !0);
                return b({
                    labels: {
                        y: -2
                    },
                    opposite: p,
                    showLastLabel: !(!a.categories && "category" !==
                        a.type),
                    title: {
                        text: null
                    }
                }, n.yAxis, n.yAxis && n.yAxis[c], a)
            });
            h.series = null;
            h = b({
                chart: {
                    panning: !0,
                    pinchType: "x"
                },
                navigator: {
                    enabled: r
                },
                scrollbar: {
                    enabled: g(n.scrollbar.enabled, !0)
                },
                rangeSelector: {
                    enabled: g(n.rangeSelector.enabled, !0)
                },
                title: {
                    text: null
                },
                tooltip: {
                    split: g(n.tooltip.split, !0),
                    crosshairs: !0
                },
                legend: {
                    enabled: !1
                },
                plotOptions: {
                    line: v,
                    spline: v,
                    area: v,
                    areaspline: v,
                    arearange: v,
                    areasplinerange: v,
                    column: u,
                    columnrange: u,
                    candlestick: u,
                    ohlc: u
                }
            }, h, {
                isStock: !0
            });
            h.series = m;
            return k ? new q(d, h, f) : new q(h,
                e)
        };
        z(D.prototype, "autoLabelAlign", function(a) {
            var b = this.chart,
                c = this.options,
                b = b._labelPanes = b._labelPanes || {}, d = this.options.labels;
            return this.chart.options.isStock && "yAxis" === this.coll && (c = c.top + "," + c.height, !b[c] && d.enabled) ? (15 === d.x && (d.x = 0), void 0 === d.align && (d.align = "right"), b[c] = this, "right") : a.apply(this, [].slice.call(arguments, 1))
        });
        z(D.prototype, "destroy", function(a) {
            var b = this.chart,
                c = this.options && this.options.top + "," + this.options.height;
            c && b._labelPanes && b._labelPanes[c] === this &&
                delete b._labelPanes[c];
            return a.apply(this, Array.prototype.slice.call(arguments, 1))
        });
        z(D.prototype, "getPlotLinePath", function(b, e, m, k, p, q) {
            var d = this,
                r = this.isLinked && !this.series ? this.linkedParent.series : this.series,
                t = d.chart,
                v = t.renderer,
                u = d.left,
                y = d.top,
                w, x, z, B, C = [],
                F = [],
                D, E;
            if ("xAxis" !== d.coll && "yAxis" !== d.coll) return b.apply(this, [].slice.call(arguments, 1));
            F = function(a) {
                var b = "xAxis" === a ? "yAxis" : "xAxis";
                a = d.options[b];
                return f(a) ? [t[b][a]] : c(a) ? [t.get(a)] : l(r, function(a) {
                    return a[b]
                })
            }(d.coll);
            h(d.isXAxis ? t.yAxis : t.xAxis, function(a) {
                if (n(a.options.id) ? -1 === a.options.id.indexOf("navigator") : 1) {
                    var b = a.isXAxis ? "yAxis" : "xAxis",
                        b = n(a.options[b]) ? t[b][a.options[b]] : t[b][0];
                    d === b && F.push(a)
                }
            });
            D = F.length ? [] : [d.isXAxis ? t.yAxis[0] : t.xAxis[0]];
            h(F, function(b) {
                -1 !== A(b, D) || a.find(D, function(a) {
                    return a.pos === b.pos && a.len && b.len
                }) || D.push(b)
            });
            E = g(q, d.translate(e, null, null, k));
            f(E) && (d.horiz ? h(D, function(a) {
                var b;
                x = a.pos;
                B = x + a.len;
                w = z = Math.round(E + d.transB);
                if (w < u || w > u + d.width) p ? w = z = Math.min(Math.max(u,
                    w), u + d.width) : b = !0;
                b || C.push("M", w, x, "L", z, B)
            }) : h(D, function(a) {
                var b;
                w = a.pos;
                z = w + a.len;
                x = B = Math.round(y + d.height - E);
                if (x < y || x > y + d.height) p ? x = B = Math.min(Math.max(y, x), d.top + d.height) : b = !0;
                b || C.push("M", w, x, "L", z, B)
            }));
            return 0 < C.length ? v.crispPolyLine(C, m || 1) : null
        });
        E.prototype.crispPolyLine = function(a, b) {
            var c;
            for (c = 0; c < a.length; c += 6) a[c + 1] === a[c + 4] && (a[c + 1] = a[c + 4] = Math.round(a[c + 1]) - b % 2 / 2), a[c + 2] === a[c + 5] && (a[c + 2] = a[c + 5] = Math.round(a[c + 2]) + b % 2 / 2);
            return a
        };
        v === m && (m.prototype.crispPolyLine = E.prototype.crispPolyLine);
        z(D.prototype, "hideCrosshair", function(a, b) {
            a.call(this, b);
            this.crossLabel && (this.crossLabel = this.crossLabel.hide())
        });
        z(D.prototype, "drawCrosshair", function(a, b, c) {
            var d, e;
            a.call(this, b, c);
            if (n(this.crosshair.label) && this.crosshair.label.enabled && this.cross) {
                a = this.chart;
                var f = this.options.crosshair.label,
                    h = this.horiz;
                d = this.opposite;
                e = this.left;
                var l = this.top,
                    m = this.crossLabel,
                    p, q = f.format,
                    t = "",
                    v = "inside" === this.options.tickPosition,
                    u = !1 !== this.crosshair.snap,
                    w = 0;
                b || (b = this.cross && this.cross.e);
                p = h ? "center" : d ? "right" === this.labelAlign ? "right" : "left" : "left" === this.labelAlign ? "left" : "center";
                m || (m = this.crossLabel = a.renderer.label(null, null, null, f.shape || "callout").addClass("highcharts-crosshair-label" + (this.series[0] && " highcharts-color-" + this.series[0].colorIndex)).attr({
                    align: f.align || p,
                    padding: g(f.padding, 8),
                    r: g(f.borderRadius, 3),
                    zIndex: 2
                }).add(this.labelGroup), m.attr({
                    fill: f.backgroundColor || this.series[0] && this.series[0].color || "#666666",
                    stroke: f.borderColor || "",
                    "stroke-width": f.borderWidth || 0
                }).css(x({
                    color: "#ffffff",
                    fontWeight: "normal",
                    fontSize: "11px",
                    textAlign: "center"
                }, f.style)));
                h ? (p = u ? c.plotX + e : b.chartX, l += d ? 0 : this.height) : (p = d ? this.width + e : 0, l = u ? c.plotY + l : b.chartY);
                q || f.formatter || (this.isDatetimeAxis && (t = "%Y %b %d"), q = "{value" + (t ? ":" + t : "") + "}");
                b = u ? c[this.isXAxis ? "x" : "y"] : this.toValue(h ? b.chartX : b.chartY);
                m.attr({
                    text: q ? r(q, {
                        value: b
                    }, a.time) : f.formatter.call(this, b),
                    x: p,
                    y: l,
                    visibility: b < this.min || b > this.max ? "hidden" : "visible"
                });
                b = m.getBBox();
                if (h) {
                    if (v && !d || !v && d) l = m.y - b.height
                } else l =
                    m.y - b.height / 2;
                h ? (d = e - b.x, e = e + this.width - b.x) : (d = "left" === this.labelAlign ? e : 0, e = "right" === this.labelAlign ? e + this.width : a.chartWidth);
                m.translateX < d && (w = d - m.translateX);
                m.translateX + b.width >= e && (w = -(m.translateX + b.width - e));
                m.attr({
                    x: p + w,
                    y: l,
                    anchorX: h ? p : this.opposite ? 0 : a.chartWidth,
                    anchorY: h ? this.opposite ? a.chartHeight : 0 : l + b.height / 2
                })
            }
        });
        t.init = function() {
            H.apply(this, arguments);
            this.setCompare(this.options.compare)
        };
        t.setCompare = function(a) {
            this.modifyValue = "value" === a || "percent" === a ? function(b,
                c) {
                var d = this.compareValue;
                if (void 0 !== b && void 0 !== d) return b = "value" === a ? b - d : b / d * 100 - (100 === this.options.compareBase ? 0 : 100), c && (c.change = b), b
            } : null;
            this.userOptions.compare = a;
            this.chart.hasRendered && (this.isDirty = !0)
        };
        t.processData = function() {
            var a, b = -1,
                c, e, g = !0 === this.options.compareStart ? 0 : 1,
                h, l;
            I.apply(this, arguments);
            if (this.xAxis && this.processedYData)
                for (c = this.processedXData, e = this.processedYData, h = e.length, this.pointArrayMap && (b = A("close", this.pointArrayMap), -1 === b && (b = A(this.pointValKey ||
                    "y", this.pointArrayMap))), a = 0; a < h - g; a++)
                    if (l = e[a] && -1 < b ? e[a][b] : e[a], f(l) && c[a + g] >= this.xAxis.min && 0 !== l) {
                        this.compareValue = l;
                        break
                    }
        };
        z(t, "getExtremes", function(a) {
            var b;
            a.apply(this, [].slice.call(arguments, 1));
            this.modifyValue && (b = [this.modifyValue(this.dataMin), this.modifyValue(this.dataMax)], this.dataMin = G(b), this.dataMax = C(b))
        });
        D.prototype.setCompare = function(a, b) {
            this.isXAxis || (h(this.series, function(b) {
                b.setCompare(a)
            }), g(b, !0) && this.chart.redraw())
        };
        p.prototype.tooltipFormatter = function(b) {
            b =
                b.replace("{point.change}", (0 < this.change ? "+" : "") + a.numberFormat(this.change, g(this.series.tooltipOptions.changeDecimals, 2)));
            return K.apply(this, [b])
        };
        z(e.prototype, "render", function(a) {
            this.chart.is3d && this.chart.is3d() || this.chart.polar || !this.xAxis || this.xAxis.isRadial || (!this.clipBox && this.animate ? (this.clipBox = b(this.chart.clipBox), this.clipBox.width = this.xAxis.len, this.clipBox.height = this.yAxis.len) : this.chart[this.sharedClipKey] ? this.chart[this.sharedClipKey].attr({
                    width: this.xAxis.len,
                    height: this.yAxis.len
                }) :
                this.clipBox && (this.clipBox.width = this.xAxis.len, this.clipBox.height = this.yAxis.len));
            a.call(this)
        });
        z(q.prototype, "getSelectedPoints", function(a) {
            var b = a.call(this);
            h(this.series, function(a) {
                a.hasGroupedData && (b = b.concat(u(a.points || [], function(a) {
                    return a.selected
                })))
            });
            return b
        });
        z(q.prototype, "update", function(a, c) {
            "scrollbar" in c && this.navigator && (b(!0, this.options.scrollbar, c.scrollbar), this.navigator.update({}, !1), delete c.scrollbar);
            return a.apply(this, Array.prototype.slice.call(arguments,
                1))
        })
    })(L);
    return L
});
