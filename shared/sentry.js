/*! @sentry/browser 5.17.0 (79b89734) | https://github.com/getsentry/sentry-javascript */
var Sentry = (function (t) {
  var n = function (t, r) {
    return (n =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (t, n) {
          t.__proto__ = n;
        }) ||
      function (t, n) {
        for (var r in n) n.hasOwnProperty(r) && (t[r] = n[r]);
      })(t, r);
  };
  function r(t, r) {
    function e() {
      this.constructor = t;
    }
    n(t, r),
      (t.prototype =
        null === r ? Object.create(r) : ((e.prototype = r.prototype), new e()));
  }
  var e = function () {
    return (e =
      Object.assign ||
      function (t) {
        for (var n, r = 1, e = arguments.length; r < e; r++)
          for (var i in (n = arguments[r]))
            Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
        return t;
      }).apply(this, arguments);
  };
  function i(t) {
    var n = "function" == typeof Symbol && t[Symbol.iterator],
      r = 0;
    return n
      ? n.call(t)
      : {
          next: function () {
            return (
              t && r >= t.length && (t = void 0),
              { value: t && t[r++], done: !t }
            );
          },
        };
  }
  function o(t, n) {
    var r = "function" == typeof Symbol && t[Symbol.iterator];
    if (!r) return t;
    var e,
      i,
      o = r.call(t),
      u = [];
    try {
      for (; (void 0 === n || n-- > 0) && !(e = o.next()).done; )
        u.push(e.value);
    } catch (t) {
      i = { error: t };
    } finally {
      try {
        e && !e.done && (r = o.return) && r.call(o);
      } finally {
        if (i) throw i.error;
      }
    }
    return u;
  }
  function u() {
    for (var t = [], n = 0; n < arguments.length; n++)
      t = t.concat(o(arguments[n]));
    return t;
  }
  var c, a, s;
  !(function (t) {
    (t[(t.None = 0)] = "None"),
      (t[(t.Error = 1)] = "Error"),
      (t[(t.Debug = 2)] = "Debug"),
      (t[(t.Verbose = 3)] = "Verbose");
  })(c || (c = {})),
    ((a = t.Severity || (t.Severity = {})).Fatal = "fatal"),
    (a.Error = "error"),
    (a.Warning = "warning"),
    (a.Log = "log"),
    (a.Info = "info"),
    (a.Debug = "debug"),
    (a.Critical = "critical"),
    (function (t) {
      t.fromString = function (n) {
        switch (n) {
          case "debug":
            return t.Debug;
          case "info":
            return t.Info;
          case "warn":
          case "warning":
            return t.Warning;
          case "error":
            return t.Error;
          case "fatal":
            return t.Fatal;
          case "critical":
            return t.Critical;
          case "log":
          default:
            return t.Log;
        }
      };
    })(t.Severity || (t.Severity = {})),
    ((s = t.Status || (t.Status = {})).Unknown = "unknown"),
    (s.Skipped = "skipped"),
    (s.Success = "success"),
    (s.RateLimit = "rate_limit"),
    (s.Invalid = "invalid"),
    (s.Failed = "failed"),
    (function (t) {
      t.fromHttpCode = function (n) {
        return n >= 200 && n < 300
          ? t.Success
          : 429 === n
          ? t.RateLimit
          : n >= 400 && n < 500
          ? t.Invalid
          : n >= 500
          ? t.Failed
          : t.Unknown;
      };
    })(t.Status || (t.Status = {}));
  var f =
    Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array
      ? function (t, n) {
          return (t.__proto__ = n), t;
        }
      : function (t, n) {
          for (var r in n) t.hasOwnProperty(r) || (t[r] = n[r]);
          return t;
        });
  var h = (function (t) {
    function n(n) {
      var r = this.constructor,
        e = t.call(this, n) || this;
      return (
        (e.message = n),
        (e.name = r.prototype.constructor.name),
        f(e, r.prototype),
        e
      );
    }
    return r(n, t), n;
  })(Error);
  function v(t) {
    switch (Object.prototype.toString.call(t)) {
      case "[object Error]":
      case "[object Exception]":
      case "[object DOMException]":
        return !0;
      default:
        return E(t, Error);
    }
  }
  function l(t) {
    return "[object ErrorEvent]" === Object.prototype.toString.call(t);
  }
  function d(t) {
    return "[object DOMError]" === Object.prototype.toString.call(t);
  }
  function p(t) {
    return "[object String]" === Object.prototype.toString.call(t);
  }
  function y(t) {
    return null === t || ("object" != typeof t && "function" != typeof t);
  }
  function m(t) {
    return "[object Object]" === Object.prototype.toString.call(t);
  }
  function b(t) {
    return "undefined" != typeof Event && E(t, Event);
  }
  function w(t) {
    return "undefined" != typeof Element && E(t, Element);
  }
  function g(t) {
    return Boolean(t && t.then && "function" == typeof t.then);
  }
  function E(t, n) {
    try {
      return t instanceof n;
    } catch (t) {
      return !1;
    }
  }
  function x(t, n) {
    return (
      void 0 === n && (n = 0),
      "string" != typeof t || 0 === n
        ? t
        : t.length <= n
        ? t
        : t.substr(0, n) + "..."
    );
  }
  function j(t, n) {
    if (!Array.isArray(t)) return "";
    for (var r = [], e = 0; e < t.length; e++) {
      var i = t[e];
      try {
        r.push(String(i));
      } catch (t) {
        r.push("[value cannot be serialized]");
      }
    }
    return r.join(n);
  }
  function k(t, n) {
    return (
      !!p(t) &&
      ((r = n),
      "[object RegExp]" === Object.prototype.toString.call(r)
        ? n.test(t)
        : "string" == typeof n && -1 !== t.indexOf(n))
    );
    var r;
  }
  function S() {
    return (
      "[object process]" ===
      Object.prototype.toString.call(
        "undefined" != typeof process ? process : 0
      )
    );
  }
  var T = {};
  function O() {
    return S()
      ? global
      : "undefined" != typeof window
      ? window
      : "undefined" != typeof self
      ? self
      : T;
  }
  function _() {
    var t = O(),
      n = t.crypto || t.msCrypto;
    if (void 0 !== n && n.getRandomValues) {
      var r = new Uint16Array(8);
      n.getRandomValues(r),
        (r[3] = (4095 & r[3]) | 16384),
        (r[4] = (16383 & r[4]) | 32768);
      var e = function (t) {
        for (var n = t.toString(16); n.length < 4; ) n = "0" + n;
        return n;
      };
      return (
        e(r[0]) +
        e(r[1]) +
        e(r[2]) +
        e(r[3]) +
        e(r[4]) +
        e(r[5]) +
        e(r[6]) +
        e(r[7])
      );
    }
    return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (t) {
      var n = (16 * Math.random()) | 0;
      return ("x" === t ? n : (3 & n) | 8).toString(16);
    });
  }
  function D(t) {
    if (!t) return {};
    var n = t.match(
      /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/
    );
    if (!n) return {};
    var r = n[6] || "",
      e = n[8] || "";
    return { host: n[4], path: n[5], protocol: n[2], relative: n[5] + r + e };
  }
  function R(t) {
    if (t.message) return t.message;
    if (t.exception && t.exception.values && t.exception.values[0]) {
      var n = t.exception.values[0];
      return n.type && n.value
        ? n.type + ": " + n.value
        : n.type || n.value || t.event_id || "<unknown>";
    }
    return t.event_id || "<unknown>";
  }
  function I(t) {
    var n = O();
    if (!("console" in n)) return t();
    var r = n.console,
      e = {};
    ["debug", "info", "warn", "error", "log", "assert"].forEach(function (t) {
      t in n.console &&
        r[t].__sentry_original__ &&
        ((e[t] = r[t]), (r[t] = r[t].__sentry_original__));
    });
    var i = t();
    return (
      Object.keys(e).forEach(function (t) {
        r[t] = e[t];
      }),
      i
    );
  }
  function N(t, n, r) {
    (t.exception = t.exception || {}),
      (t.exception.values = t.exception.values || []),
      (t.exception.values[0] = t.exception.values[0] || {}),
      (t.exception.values[0].value = t.exception.values[0].value || n || ""),
      (t.exception.values[0].type = t.exception.values[0].type || r || "Error");
  }
  function C(t, n) {
    void 0 === n && (n = {});
    try {
      (t.exception.values[0].mechanism = t.exception.values[0].mechanism || {}),
        Object.keys(n).forEach(function (r) {
          t.exception.values[0].mechanism[r] = n[r];
        });
    } catch (t) {}
  }
  function M(t) {
    try {
      for (
        var n = t, r = [], e = 0, i = 0, o = " > ".length, u = void 0;
        n &&
        e++ < 5 &&
        !(
          "html" === (u = A(n)) ||
          (e > 1 && i + r.length * o + u.length >= 80)
        );

      )
        r.push(u), (i += u.length), (n = n.parentNode);
      return r.reverse().join(" > ");
    } catch (t) {
      return "<unknown>";
    }
  }
  function A(t) {
    var n,
      r,
      e,
      i,
      o,
      u = t,
      c = [];
    if (!u || !u.tagName) return "";
    if (
      (c.push(u.tagName.toLowerCase()),
      u.id && c.push("#" + u.id),
      (n = u.className) && p(n))
    )
      for (r = n.split(/\s+/), o = 0; o < r.length; o++) c.push("." + r[o]);
    var a = ["type", "name", "title", "alt"];
    for (o = 0; o < a.length; o++)
      (e = a[o]), (i = u.getAttribute(e)) && c.push("[" + e + '="' + i + '"]');
    return c.join("");
  }
  var q = Date.now(),
    U = 0,
    L = {
      now: function () {
        var t = Date.now() - q;
        return t < U && (t = U), (U = t), t;
      },
      timeOrigin: q,
    },
    H = (function () {
      if (S())
        try {
          return ((t = module), (n = "perf_hooks"), t.require(n)).performance;
        } catch (t) {
          return L;
        }
      var t, n;
      return (
        O().performance &&
          void 0 === performance.timeOrigin &&
          (performance.timeOrigin =
            (performance.timing && performance.timing.navigationStart) || q),
        O().performance || L
      );
    })();
  function F() {
    return (H.timeOrigin + H.now()) / 1e3;
  }
  var P = 6e4;
  function X(t, n) {
    if (!n) return P;
    var r = parseInt("" + n, 10);
    if (!isNaN(r)) return 1e3 * r;
    var e = Date.parse("" + n);
    return isNaN(e) ? P : e - t;
  }
  var W = "<anonymous>";
  function $(t) {
    try {
      return (t && "function" == typeof t && t.name) || W;
    } catch (t) {
      return W;
    }
  }
  var B = O(),
    G = "Sentry Logger ",
    J = (function () {
      function t() {
        this.t = !1;
      }
      return (
        (t.prototype.disable = function () {
          this.t = !1;
        }),
        (t.prototype.enable = function () {
          this.t = !0;
        }),
        (t.prototype.log = function () {
          for (var t = [], n = 0; n < arguments.length; n++)
            t[n] = arguments[n];
          this.t &&
            I(function () {
              B.console.log(G + "[Log]: " + t.join(" "));
            });
        }),
        (t.prototype.warn = function () {
          for (var t = [], n = 0; n < arguments.length; n++)
            t[n] = arguments[n];
          this.t &&
            I(function () {
              B.console.warn(G + "[Warn]: " + t.join(" "));
            });
        }),
        (t.prototype.error = function () {
          for (var t = [], n = 0; n < arguments.length; n++)
            t[n] = arguments[n];
          this.t &&
            I(function () {
              B.console.error(G + "[Error]: " + t.join(" "));
            });
        }),
        t
      );
    })();
  B.__SENTRY__ = B.__SENTRY__ || {};
  var z,
    V = B.__SENTRY__.logger || (B.__SENTRY__.logger = new J()),
    K = (function () {
      function t() {
        (this.i = "function" == typeof WeakSet),
          (this.o = this.i ? new WeakSet() : []);
      }
      return (
        (t.prototype.memoize = function (t) {
          if (this.i) return !!this.o.has(t) || (this.o.add(t), !1);
          for (var n = 0; n < this.o.length; n++) {
            if (this.o[n] === t) return !0;
          }
          return this.o.push(t), !1;
        }),
        (t.prototype.unmemoize = function (t) {
          if (this.i) this.o.delete(t);
          else
            for (var n = 0; n < this.o.length; n++)
              if (this.o[n] === t) {
                this.o.splice(n, 1);
                break;
              }
        }),
        t
      );
    })();
  function Q(t, n, r) {
    if (n in t) {
      var e = t[n],
        i = r(e);
      if ("function" == typeof i)
        try {
          (i.prototype = i.prototype || {}),
            Object.defineProperties(i, {
              __sentry_original__: { enumerable: !1, value: e },
            });
        } catch (t) {}
      t[n] = i;
    }
  }
  function Y(t) {
    if (v(t)) {
      var n = t,
        r = { message: n.message, name: n.name, stack: n.stack };
      for (var e in n)
        Object.prototype.hasOwnProperty.call(n, e) && (r[e] = n[e]);
      return r;
    }
    if (b(t)) {
      var i = t,
        o = {};
      o.type = i.type;
      try {
        o.target = w(i.target)
          ? M(i.target)
          : Object.prototype.toString.call(i.target);
      } catch (t) {
        o.target = "<unknown>";
      }
      try {
        o.currentTarget = w(i.currentTarget)
          ? M(i.currentTarget)
          : Object.prototype.toString.call(i.currentTarget);
      } catch (t) {
        o.currentTarget = "<unknown>";
      }
      for (var e in ("undefined" != typeof CustomEvent &&
        E(t, CustomEvent) &&
        (o.detail = i.detail),
      i))
        Object.prototype.hasOwnProperty.call(i, e) && (o[e] = i);
      return o;
    }
    return t;
  }
  function Z(t) {
    return (function (t) {
      return ~-encodeURI(t).split(/%..|./).length;
    })(JSON.stringify(t));
  }
  function tt(t, n, r) {
    void 0 === n && (n = 3), void 0 === r && (r = 102400);
    var e = et(t, n);
    return Z(e) > r ? tt(t, n - 1, r) : e;
  }
  function nt(t, n) {
    return "domain" === n && t && "object" == typeof t && t.u
      ? "[Domain]"
      : "domainEmitter" === n
      ? "[DomainEmitter]"
      : "undefined" != typeof global && t === global
      ? "[Global]"
      : "undefined" != typeof window && t === window
      ? "[Window]"
      : "undefined" != typeof document && t === document
      ? "[Document]"
      : m((r = t)) &&
        "nativeEvent" in r &&
        "preventDefault" in r &&
        "stopPropagation" in r
      ? "[SyntheticEvent]"
      : "number" == typeof t && t != t
      ? "[NaN]"
      : void 0 === t
      ? "[undefined]"
      : "function" == typeof t
      ? "[Function: " + $(t) + "]"
      : t;
    var r;
  }
  function rt(t, n, r, e) {
    if ((void 0 === r && (r = 1 / 0), void 0 === e && (e = new K()), 0 === r))
      return (function (t) {
        var n = Object.prototype.toString.call(t);
        if ("string" == typeof t) return t;
        if ("[object Object]" === n) return "[Object]";
        if ("[object Array]" === n) return "[Array]";
        var r = nt(t);
        return y(r) ? r : n;
      })(n);
    if (null != n && "function" == typeof n.toJSON) return n.toJSON();
    var i = nt(n, t);
    if (y(i)) return i;
    var o = Y(n),
      u = Array.isArray(n) ? [] : {};
    if (e.memoize(n)) return "[Circular ~]";
    for (var c in o)
      Object.prototype.hasOwnProperty.call(o, c) &&
        (u[c] = rt(c, o[c], r - 1, e));
    return e.unmemoize(n), u;
  }
  function et(t, n) {
    try {
      return JSON.parse(
        JSON.stringify(t, function (t, r) {
          return rt(t, r, n);
        })
      );
    } catch (t) {
      return "**non-serializable**";
    }
  }
  function it(t, n) {
    void 0 === n && (n = 40);
    var r = Object.keys(Y(t));
    if ((r.sort(), !r.length)) return "[object has no keys]";
    if (r[0].length >= n) return x(r[0], n);
    for (var e = r.length; e > 0; e--) {
      var i = r.slice(0, e).join(", ");
      if (!(i.length > n)) return e === r.length ? i : x(i, n);
    }
    return "";
  }
  !(function (t) {
    (t.PENDING = "PENDING"),
      (t.RESOLVED = "RESOLVED"),
      (t.REJECTED = "REJECTED");
  })(z || (z = {}));
  var ot = (function () {
      function t(t) {
        var n = this;
        (this.s = z.PENDING),
          (this.h = []),
          (this.v = function (t) {
            n.l(z.RESOLVED, t);
          }),
          (this.p = function (t) {
            n.l(z.REJECTED, t);
          }),
          (this.l = function (t, r) {
            n.s === z.PENDING &&
              (g(r) ? r.then(n.v, n.p) : ((n.s = t), (n.m = r), n.g()));
          }),
          (this.j = function (t) {
            (n.h = n.h.concat(t)), n.g();
          }),
          (this.g = function () {
            if (n.s !== z.PENDING) {
              var t = n.h.slice();
              (n.h = []),
                t.forEach(function (t) {
                  t.done ||
                    (n.s === z.RESOLVED && t.onfulfilled && t.onfulfilled(n.m),
                    n.s === z.REJECTED && t.onrejected && t.onrejected(n.m),
                    (t.done = !0));
                });
            }
          });
        try {
          t(this.v, this.p);
        } catch (t) {
          this.p(t);
        }
      }
      return (
        (t.prototype.toString = function () {
          return "[object SyncPromise]";
        }),
        (t.resolve = function (n) {
          return new t(function (t) {
            t(n);
          });
        }),
        (t.reject = function (n) {
          return new t(function (t, r) {
            r(n);
          });
        }),
        (t.all = function (n) {
          return new t(function (r, e) {
            if (Array.isArray(n))
              if (0 !== n.length) {
                var i = n.length,
                  o = [];
                n.forEach(function (n, u) {
                  t.resolve(n)
                    .then(function (t) {
                      (o[u] = t), 0 === (i -= 1) && r(o);
                    })
                    .then(null, e);
                });
              } else r([]);
            else e(new TypeError("Promise.all requires an array as input."));
          });
        }),
        (t.prototype.then = function (n, r) {
          var e = this;
          return new t(function (t, i) {
            e.j({
              done: !1,
              onfulfilled: function (r) {
                if (n)
                  try {
                    return void t(n(r));
                  } catch (t) {
                    return void i(t);
                  }
                else t(r);
              },
              onrejected: function (n) {
                if (r)
                  try {
                    return void t(r(n));
                  } catch (t) {
                    return void i(t);
                  }
                else i(n);
              },
            });
          });
        }),
        (t.prototype.catch = function (t) {
          return this.then(function (t) {
            return t;
          }, t);
        }),
        (t.prototype.finally = function (n) {
          var r = this;
          return new t(function (t, e) {
            var i, o;
            return r
              .then(
                function (t) {
                  (o = !1), (i = t), n && n();
                },
                function (t) {
                  (o = !0), (i = t), n && n();
                }
              )
              .then(function () {
                o ? e(i) : t(i);
              });
          });
        }),
        t
      );
    })(),
    ut = (function () {
      function t(t) {
        (this.k = t), (this.S = []);
      }
      return (
        (t.prototype.isReady = function () {
          return void 0 === this.k || this.length() < this.k;
        }),
        (t.prototype.add = function (t) {
          var n = this;
          return this.isReady()
            ? (-1 === this.S.indexOf(t) && this.S.push(t),
              t
                .then(function () {
                  return n.remove(t);
                })
                .then(null, function () {
                  return n.remove(t).then(null, function () {});
                }),
              t)
            : ot.reject(
                new h("Not adding Promise due to buffer limit reached.")
              );
        }),
        (t.prototype.remove = function (t) {
          return this.S.splice(this.S.indexOf(t), 1)[0];
        }),
        (t.prototype.length = function () {
          return this.S.length;
        }),
        (t.prototype.drain = function (t) {
          var n = this;
          return new ot(function (r) {
            var e = setTimeout(function () {
              t && t > 0 && r(!1);
            }, t);
            ot.all(n.S)
              .then(function () {
                clearTimeout(e), r(!0);
              })
              .then(null, function () {
                r(!0);
              });
          });
        }),
        t
      );
    })();
  function ct() {
    if (!("fetch" in O())) return !1;
    try {
      return new Headers(), new Request(""), new Response(), !0;
    } catch (t) {
      return !1;
    }
  }
  function at(t) {
    return (
      t && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())
    );
  }
  function st() {
    if (!ct()) return !1;
    try {
      return new Request("_", { referrerPolicy: "origin" }), !0;
    } catch (t) {
      return !1;
    }
  }
  var ft,
    ht = O(),
    vt = {},
    lt = {};
  function dt(t) {
    if (!lt[t])
      switch (((lt[t] = !0), t)) {
        case "console":
          !(function () {
            if (!("console" in ht)) return;
            ["debug", "info", "warn", "error", "log", "assert"].forEach(
              function (t) {
                t in ht.console &&
                  Q(ht.console, t, function (n) {
                    return function () {
                      for (var r = [], e = 0; e < arguments.length; e++)
                        r[e] = arguments[e];
                      yt("console", { args: r, level: t }),
                        n && Function.prototype.apply.call(n, ht.console, r);
                    };
                  });
              }
            );
          })();
          break;
        case "dom":
          !(function () {
            if (!("document" in ht)) return;
            ht.document.addEventListener(
              "click",
              jt("click", yt.bind(null, "dom")),
              !1
            ),
              ht.document.addEventListener(
                "keypress",
                kt(yt.bind(null, "dom")),
                !1
              ),
              ["EventTarget", "Node"].forEach(function (t) {
                var n = ht[t] && ht[t].prototype;
                n &&
                  n.hasOwnProperty &&
                  n.hasOwnProperty("addEventListener") &&
                  (Q(n, "addEventListener", function (t) {
                    return function (n, r, e) {
                      return (
                        r && r.handleEvent
                          ? ("click" === n &&
                              Q(r, "handleEvent", function (t) {
                                return function (n) {
                                  return (
                                    jt("click", yt.bind(null, "dom"))(n),
                                    t.call(this, n)
                                  );
                                };
                              }),
                            "keypress" === n &&
                              Q(r, "handleEvent", function (t) {
                                return function (n) {
                                  return (
                                    kt(yt.bind(null, "dom"))(n), t.call(this, n)
                                  );
                                };
                              }))
                          : ("click" === n &&
                              jt("click", yt.bind(null, "dom"), !0)(this),
                            "keypress" === n && kt(yt.bind(null, "dom"))(this)),
                        t.call(this, n, r, e)
                      );
                    };
                  }),
                  Q(n, "removeEventListener", function (t) {
                    return function (n, r, e) {
                      var i = r;
                      try {
                        i = i && (i.__sentry_wrapped__ || i);
                      } catch (t) {}
                      return t.call(this, n, i, e);
                    };
                  }));
              });
          })();
          break;
        case "xhr":
          !(function () {
            if (!("XMLHttpRequest" in ht)) return;
            var t = XMLHttpRequest.prototype;
            Q(t, "open", function (t) {
              return function () {
                for (var n = [], r = 0; r < arguments.length; r++)
                  n[r] = arguments[r];
                var e = this,
                  i = n[1];
                (e.__sentry_xhr__ = {
                  method: p(n[0]) ? n[0].toUpperCase() : n[0],
                  url: n[1],
                }),
                  p(i) &&
                    "POST" === e.__sentry_xhr__.method &&
                    i.match(/sentry_key/) &&
                    (e.__sentry_own_request__ = !0);
                var o = function () {
                  if (4 === e.readyState) {
                    try {
                      e.__sentry_xhr__ &&
                        (e.__sentry_xhr__.status_code = e.status);
                    } catch (t) {}
                    yt("xhr", {
                      args: n,
                      endTimestamp: Date.now(),
                      startTimestamp: Date.now(),
                      xhr: e,
                    });
                  }
                };
                return (
                  "onreadystatechange" in e &&
                  "function" == typeof e.onreadystatechange
                    ? Q(e, "onreadystatechange", function (t) {
                        return function () {
                          for (var n = [], r = 0; r < arguments.length; r++)
                            n[r] = arguments[r];
                          return o(), t.apply(e, n);
                        };
                      })
                    : e.addEventListener("readystatechange", o),
                  t.apply(e, n)
                );
              };
            }),
              Q(t, "send", function (t) {
                return function () {
                  for (var n = [], r = 0; r < arguments.length; r++)
                    n[r] = arguments[r];
                  return (
                    yt("xhr", {
                      args: n,
                      startTimestamp: Date.now(),
                      xhr: this,
                    }),
                    t.apply(this, n)
                  );
                };
              });
          })();
          break;
        case "fetch":
          !(function () {
            if (
              !(function () {
                if (!ct()) return !1;
                var t = O();
                if (at(t.fetch)) return !0;
                var n = !1,
                  r = t.document;
                if (r && "function" == typeof r.createElement)
                  try {
                    var e = r.createElement("iframe");
                    (e.hidden = !0),
                      r.head.appendChild(e),
                      e.contentWindow &&
                        e.contentWindow.fetch &&
                        (n = at(e.contentWindow.fetch)),
                      r.head.removeChild(e);
                  } catch (t) {
                    V.warn(
                      "Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",
                      t
                    );
                  }
                return n;
              })()
            )
              return;
            Q(ht, "fetch", function (t) {
              return function () {
                for (var n = [], r = 0; r < arguments.length; r++)
                  n[r] = arguments[r];
                var i = {
                  args: n,
                  fetchData: { method: mt(n), url: bt(n) },
                  startTimestamp: Date.now(),
                };
                return (
                  yt("fetch", e({}, i)),
                  t.apply(ht, n).then(
                    function (t) {
                      return (
                        yt(
                          "fetch",
                          e({}, i, { endTimestamp: Date.now(), response: t })
                        ),
                        t
                      );
                    },
                    function (t) {
                      throw (
                        (yt(
                          "fetch",
                          e({}, i, { endTimestamp: Date.now(), error: t })
                        ),
                        t)
                      );
                    }
                  )
                );
              };
            });
          })();
          break;
        case "history":
          !(function () {
            if (
              ((t = O()),
              (n = t.chrome),
              (r = n && n.app && n.app.runtime),
              (e =
                "history" in t &&
                !!t.history.pushState &&
                !!t.history.replaceState),
              r || !e)
            )
              return;
            var t, n, r, e;
            var i = ht.onpopstate;
            function o(t) {
              return function () {
                for (var n = [], r = 0; r < arguments.length; r++)
                  n[r] = arguments[r];
                var e = n.length > 2 ? n[2] : void 0;
                if (e) {
                  var i = ft,
                    o = String(e);
                  (ft = o), yt("history", { from: i, to: o });
                }
                return t.apply(this, n);
              };
            }
            (ht.onpopstate = function () {
              for (var t = [], n = 0; n < arguments.length; n++)
                t[n] = arguments[n];
              var r = ht.location.href,
                e = ft;
              if (((ft = r), yt("history", { from: e, to: r }), i))
                return i.apply(this, t);
            }),
              Q(ht.history, "pushState", o),
              Q(ht.history, "replaceState", o);
          })();
          break;
        case "error":
          (St = ht.onerror),
            (ht.onerror = function (t, n, r, e, i) {
              return (
                yt("error", { column: e, error: i, line: r, msg: t, url: n }),
                !!St && St.apply(this, arguments)
              );
            });
          break;
        case "unhandledrejection":
          (Tt = ht.onunhandledrejection),
            (ht.onunhandledrejection = function (t) {
              return (
                yt("unhandledrejection", t), !Tt || Tt.apply(this, arguments)
              );
            });
          break;
        default:
          V.warn("unknown instrumentation type:", t);
      }
  }
  function pt(t) {
    t &&
      "string" == typeof t.type &&
      "function" == typeof t.callback &&
      ((vt[t.type] = vt[t.type] || []),
      vt[t.type].push(t.callback),
      dt(t.type));
  }
  function yt(t, n) {
    var r, e;
    if (t && vt[t])
      try {
        for (var o = i(vt[t] || []), u = o.next(); !u.done; u = o.next()) {
          var c = u.value;
          try {
            c(n);
          } catch (n) {
            V.error(
              "Error while triggering instrumentation handler.\nType: " +
                t +
                "\nName: " +
                $(c) +
                "\nError: " +
                n
            );
          }
        }
      } catch (t) {
        r = { error: t };
      } finally {
        try {
          u && !u.done && (e = o.return) && e.call(o);
        } finally {
          if (r) throw r.error;
        }
      }
  }
  function mt(t) {
    return (
      void 0 === t && (t = []),
      "Request" in ht && E(t[0], Request) && t[0].method
        ? String(t[0].method).toUpperCase()
        : t[1] && t[1].method
        ? String(t[1].method).toUpperCase()
        : "GET"
    );
  }
  function bt(t) {
    return (
      void 0 === t && (t = []),
      "string" == typeof t[0]
        ? t[0]
        : "Request" in ht && E(t[0], Request)
        ? t[0].url
        : String(t[0])
    );
  }
  var wt,
    gt,
    Et = 1e3,
    xt = 0;
  function jt(t, n, r) {
    return (
      void 0 === r && (r = !1),
      function (e) {
        (wt = void 0),
          e &&
            gt !== e &&
            ((gt = e),
            xt && clearTimeout(xt),
            r
              ? (xt = setTimeout(function () {
                  n({ event: e, name: t });
                }))
              : n({ event: e, name: t }));
      }
    );
  }
  function kt(t) {
    return function (n) {
      var r;
      try {
        r = n.target;
      } catch (t) {
        return;
      }
      var e = r && r.tagName;
      e &&
        ("INPUT" === e || "TEXTAREA" === e || r.isContentEditable) &&
        (wt || jt("input", t)(n),
        clearTimeout(wt),
        (wt = setTimeout(function () {
          wt = void 0;
        }, Et)));
    };
  }
  var St = null;
  var Tt = null;
  var Ot = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w\.-]+)(?::(\d+))?\/(.+)/,
    _t = (function () {
      function t(t) {
        "string" == typeof t ? this.T(t) : this.O(t), this._();
      }
      return (
        (t.prototype.toString = function (t) {
          void 0 === t && (t = !1);
          var n = this,
            r = n.host,
            e = n.path,
            i = n.pass,
            o = n.port,
            u = n.projectId;
          return (
            n.protocol +
            "://" +
            n.user +
            (t && i ? ":" + i : "") +
            "@" +
            r +
            (o ? ":" + o : "") +
            "/" +
            (e ? e + "/" : e) +
            u
          );
        }),
        (t.prototype.T = function (t) {
          var n = Ot.exec(t);
          if (!n) throw new h("Invalid Dsn");
          var r = o(n.slice(1), 6),
            e = r[0],
            i = r[1],
            u = r[2],
            c = void 0 === u ? "" : u,
            a = r[3],
            s = r[4],
            f = void 0 === s ? "" : s,
            v = "",
            l = r[5],
            d = l.split("/");
          if (
            (d.length > 1 && ((v = d.slice(0, -1).join("/")), (l = d.pop())), l)
          ) {
            var p = l.match(/^\d+/);
            p && (l = p[0]);
          }
          this.O({
            host: a,
            pass: c,
            path: v,
            projectId: l,
            port: f,
            protocol: e,
            user: i,
          });
        }),
        (t.prototype.O = function (t) {
          (this.protocol = t.protocol),
            (this.user = t.user),
            (this.pass = t.pass || ""),
            (this.host = t.host),
            (this.port = t.port || ""),
            (this.path = t.path || ""),
            (this.projectId = t.projectId);
        }),
        (t.prototype._ = function () {
          var t = this;
          if (
            (["protocol", "user", "host", "projectId"].forEach(function (n) {
              if (!t[n]) throw new h("Invalid Dsn: " + n + " missing");
            }),
            !this.projectId.match(/^\d+$/))
          )
            throw new h("Invalid Dsn: Invalid projectId " + this.projectId);
          if ("http" !== this.protocol && "https" !== this.protocol)
            throw new h("Invalid Dsn: Invalid protocol " + this.protocol);
          if (this.port && isNaN(parseInt(this.port, 10)))
            throw new h("Invalid Dsn: Invalid port " + this.port);
        }),
        t
      );
    })(),
    Dt = (function () {
      function t() {
        (this.D = !1),
          (this.R = []),
          (this.I = []),
          (this.N = []),
          (this.C = {}),
          (this.M = {}),
          (this.A = {}),
          (this.q = {});
      }
      return (
        (t.prototype.addScopeListener = function (t) {
          this.R.push(t);
        }),
        (t.prototype.addEventProcessor = function (t) {
          return this.I.push(t), this;
        }),
        (t.prototype.U = function () {
          var t = this;
          this.D ||
            ((this.D = !0),
            setTimeout(function () {
              t.R.forEach(function (n) {
                n(t);
              }),
                (t.D = !1);
            }));
        }),
        (t.prototype.L = function (t, n, r, i) {
          var o = this;
          return (
            void 0 === i && (i = 0),
            new ot(function (u, c) {
              var a = t[i];
              if (null === n || "function" != typeof a) u(n);
              else {
                var s = a(e({}, n), r);
                g(s)
                  ? s
                      .then(function (n) {
                        return o.L(t, n, r, i + 1).then(u);
                      })
                      .then(null, c)
                  : o
                      .L(t, s, r, i + 1)
                      .then(u)
                      .then(null, c);
              }
            })
          );
        }),
        (t.prototype.setUser = function (t) {
          return (this.C = t || {}), this.U(), this;
        }),
        (t.prototype.setTags = function (t) {
          return (this.M = e({}, this.M, t)), this.U(), this;
        }),
        (t.prototype.setTag = function (t, n) {
          var r;
          return (
            (this.M = e({}, this.M, (((r = {})[t] = n), r))), this.U(), this
          );
        }),
        (t.prototype.setExtras = function (t) {
          return (this.A = e({}, this.A, t)), this.U(), this;
        }),
        (t.prototype.setExtra = function (t, n) {
          var r;
          return (
            (this.A = e({}, this.A, (((r = {})[t] = n), r))), this.U(), this
          );
        }),
        (t.prototype.setFingerprint = function (t) {
          return (this.H = t), this.U(), this;
        }),
        (t.prototype.setLevel = function (t) {
          return (this.F = t), this.U(), this;
        }),
        (t.prototype.setTransaction = function (t) {
          return (this.P = t), this.U(), this;
        }),
        (t.prototype.setContext = function (t, n) {
          var r;
          return (
            (this.q = e({}, this.q, (((r = {})[t] = n), r))), this.U(), this
          );
        }),
        (t.prototype.setSpan = function (t) {
          return (this.X = t), this.U(), this;
        }),
        (t.prototype.getSpan = function () {
          return this.X;
        }),
        (t.clone = function (n) {
          var r = new t();
          return (
            n &&
              ((r.N = u(n.N)),
              (r.M = e({}, n.M)),
              (r.A = e({}, n.A)),
              (r.q = e({}, n.q)),
              (r.C = n.C),
              (r.F = n.F),
              (r.X = n.X),
              (r.P = n.P),
              (r.H = n.H),
              (r.I = u(n.I))),
            r
          );
        }),
        (t.prototype.update = function (n) {
          if (!n) return this;
          if ("function" == typeof n) {
            var r = n(this);
            return r instanceof t ? r : this;
          }
          return (
            n instanceof t
              ? ((this.M = e({}, this.M, n.M)),
                (this.A = e({}, this.A, n.A)),
                (this.q = e({}, this.q, n.q)),
                n.C && (this.C = n.C),
                n.F && (this.F = n.F),
                n.H && (this.H = n.H))
              : m(n) &&
                ((n = n),
                (this.M = e({}, this.M, n.tags)),
                (this.A = e({}, this.A, n.extra)),
                (this.q = e({}, this.q, n.contexts)),
                n.user && (this.C = n.user),
                n.level && (this.F = n.level),
                n.fingerprint && (this.H = n.fingerprint)),
            this
          );
        }),
        (t.prototype.clear = function () {
          return (
            (this.N = []),
            (this.M = {}),
            (this.A = {}),
            (this.C = {}),
            (this.q = {}),
            (this.F = void 0),
            (this.P = void 0),
            (this.H = void 0),
            (this.X = void 0),
            this.U(),
            this
          );
        }),
        (t.prototype.addBreadcrumb = function (t, n) {
          var r = e({ timestamp: F() }, t);
          return (
            (this.N =
              void 0 !== n && n >= 0
                ? u(this.N, [r]).slice(-n)
                : u(this.N, [r])),
            this.U(),
            this
          );
        }),
        (t.prototype.clearBreadcrumbs = function () {
          return (this.N = []), this.U(), this;
        }),
        (t.prototype.W = function (t) {
          (t.fingerprint = t.fingerprint
            ? Array.isArray(t.fingerprint)
              ? t.fingerprint
              : [t.fingerprint]
            : []),
            this.H && (t.fingerprint = t.fingerprint.concat(this.H)),
            t.fingerprint && !t.fingerprint.length && delete t.fingerprint;
        }),
        (t.prototype.applyToEvent = function (t, n) {
          return (
            this.A &&
              Object.keys(this.A).length &&
              (t.extra = e({}, this.A, t.extra)),
            this.M &&
              Object.keys(this.M).length &&
              (t.tags = e({}, this.M, t.tags)),
            this.C &&
              Object.keys(this.C).length &&
              (t.user = e({}, this.C, t.user)),
            this.q &&
              Object.keys(this.q).length &&
              (t.contexts = e({}, this.q, t.contexts)),
            this.F && (t.level = this.F),
            this.P && (t.transaction = this.P),
            this.X &&
              (t.contexts = e({ trace: this.X.getTraceContext() }, t.contexts)),
            this.W(t),
            (t.breadcrumbs = u(t.breadcrumbs || [], this.N)),
            (t.breadcrumbs = t.breadcrumbs.length > 0 ? t.breadcrumbs : void 0),
            this.L(u(Rt(), this.I), t, n)
          );
        }),
        t
      );
    })();
  function Rt() {
    var t = O();
    return (
      (t.__SENTRY__ = t.__SENTRY__ || {}),
      (t.__SENTRY__.globalEventProcessors =
        t.__SENTRY__.globalEventProcessors || []),
      t.__SENTRY__.globalEventProcessors
    );
  }
  function It(t) {
    Rt().push(t);
  }
  var Nt = 3,
    Ct = (function () {
      function t(t, n, r) {
        void 0 === n && (n = new Dt()),
          void 0 === r && (r = Nt),
          (this.$ = r),
          (this.B = []),
          this.B.push({ client: t, scope: n });
      }
      return (
        (t.prototype.G = function (t) {
          for (var n, r = [], e = 1; e < arguments.length; e++)
            r[e - 1] = arguments[e];
          var i = this.getStackTop();
          i &&
            i.client &&
            i.client[t] &&
            (n = i.client)[t].apply(n, u(r, [i.scope]));
        }),
        (t.prototype.isOlderThan = function (t) {
          return this.$ < t;
        }),
        (t.prototype.bindClient = function (t) {
          (this.getStackTop().client = t),
            t && t.setupIntegrations && t.setupIntegrations();
        }),
        (t.prototype.pushScope = function () {
          var t = this.getStack(),
            n = t.length > 0 ? t[t.length - 1].scope : void 0,
            r = Dt.clone(n);
          return (
            this.getStack().push({ client: this.getClient(), scope: r }), r
          );
        }),
        (t.prototype.popScope = function () {
          return void 0 !== this.getStack().pop();
        }),
        (t.prototype.withScope = function (t) {
          var n = this.pushScope();
          try {
            t(n);
          } finally {
            this.popScope();
          }
        }),
        (t.prototype.getClient = function () {
          return this.getStackTop().client;
        }),
        (t.prototype.getScope = function () {
          return this.getStackTop().scope;
        }),
        (t.prototype.getStack = function () {
          return this.B;
        }),
        (t.prototype.getStackTop = function () {
          return this.B[this.B.length - 1];
        }),
        (t.prototype.captureException = function (t, n) {
          var r = (this.J = _()),
            i = n;
          if (!n) {
            var o = void 0;
            try {
              throw new Error("Sentry syntheticException");
            } catch (t) {
              o = t;
            }
            i = { originalException: t, syntheticException: o };
          }
          return this.G("captureException", t, e({}, i, { event_id: r })), r;
        }),
        (t.prototype.captureMessage = function (t, n, r) {
          var i = (this.J = _()),
            o = r;
          if (!r) {
            var u = void 0;
            try {
              throw new Error(t);
            } catch (t) {
              u = t;
            }
            o = { originalException: t, syntheticException: u };
          }
          return this.G("captureMessage", t, n, e({}, o, { event_id: i })), i;
        }),
        (t.prototype.captureEvent = function (t, n) {
          var r = (this.J = _());
          return this.G("captureEvent", t, e({}, n, { event_id: r })), r;
        }),
        (t.prototype.lastEventId = function () {
          return this.J;
        }),
        (t.prototype.addBreadcrumb = function (t, n) {
          var r = this.getStackTop();
          if (r.scope && r.client) {
            var i = (r.client.getOptions && r.client.getOptions()) || {},
              o = i.beforeBreadcrumb,
              u = void 0 === o ? null : o,
              c = i.maxBreadcrumbs,
              a = void 0 === c ? 100 : c;
            if (!(a <= 0)) {
              var s = F(),
                f = e({ timestamp: s }, t),
                h = u
                  ? I(function () {
                      return u(f, n);
                    })
                  : f;
              null !== h && r.scope.addBreadcrumb(h, Math.min(a, 100));
            }
          }
        }),
        (t.prototype.setUser = function (t) {
          var n = this.getStackTop();
          n.scope && n.scope.setUser(t);
        }),
        (t.prototype.setTags = function (t) {
          var n = this.getStackTop();
          n.scope && n.scope.setTags(t);
        }),
        (t.prototype.setExtras = function (t) {
          var n = this.getStackTop();
          n.scope && n.scope.setExtras(t);
        }),
        (t.prototype.setTag = function (t, n) {
          var r = this.getStackTop();
          r.scope && r.scope.setTag(t, n);
        }),
        (t.prototype.setExtra = function (t, n) {
          var r = this.getStackTop();
          r.scope && r.scope.setExtra(t, n);
        }),
        (t.prototype.setContext = function (t, n) {
          var r = this.getStackTop();
          r.scope && r.scope.setContext(t, n);
        }),
        (t.prototype.configureScope = function (t) {
          var n = this.getStackTop();
          n.scope && n.client && t(n.scope);
        }),
        (t.prototype.run = function (t) {
          var n = At(this);
          try {
            t(this);
          } finally {
            At(n);
          }
        }),
        (t.prototype.getIntegration = function (t) {
          var n = this.getClient();
          if (!n) return null;
          try {
            return n.getIntegration(t);
          } catch (n) {
            return (
              V.warn(
                "Cannot retrieve integration " + t.id + " from the current Hub"
              ),
              null
            );
          }
        }),
        (t.prototype.startSpan = function (t) {
          return this.V("startSpan", t);
        }),
        (t.prototype.startTransaction = function (t) {
          return this.V("startTransaction", t);
        }),
        (t.prototype.traceHeaders = function () {
          return this.V("traceHeaders");
        }),
        (t.prototype.V = function (t) {
          for (var n = [], r = 1; r < arguments.length; r++)
            n[r - 1] = arguments[r];
          var e = Mt().__SENTRY__;
          if (e && e.extensions && "function" == typeof e.extensions[t])
            return e.extensions[t].apply(this, n);
          V.warn(
            "Extension method " + t + " couldn't be found, doing nothing."
          );
        }),
        t
      );
    })();
  function Mt() {
    var t = O();
    return (t.__SENTRY__ = t.__SENTRY__ || { extensions: {}, hub: void 0 }), t;
  }
  function At(t) {
    var n = Mt(),
      r = Lt(n);
    return Ht(n, t), r;
  }
  function qt() {
    var t = Mt();
    return (
      (Ut(t) && !Lt(t).isOlderThan(Nt)) || Ht(t, new Ct()),
      S()
        ? (function (t) {
            try {
              var n = Mt(),
                r = n.__SENTRY__;
              if (!r || !r.extensions || !r.extensions.domain) return Lt(t);
              var e = r.extensions.domain,
                i = e.active;
              if (!i) return Lt(t);
              if (!Ut(i) || Lt(i).isOlderThan(Nt)) {
                var o = Lt(t).getStackTop();
                Ht(i, new Ct(o.client, Dt.clone(o.scope)));
              }
              return Lt(i);
            } catch (n) {
              return Lt(t);
            }
          })(t)
        : Lt(t)
    );
  }
  function Ut(t) {
    return !!(t && t.__SENTRY__ && t.__SENTRY__.hub);
  }
  function Lt(t) {
    return t && t.__SENTRY__ && t.__SENTRY__.hub
      ? t.__SENTRY__.hub
      : ((t.__SENTRY__ = t.__SENTRY__ || {}),
        (t.__SENTRY__.hub = new Ct()),
        t.__SENTRY__.hub);
  }
  function Ht(t, n) {
    return (
      !!t && ((t.__SENTRY__ = t.__SENTRY__ || {}), (t.__SENTRY__.hub = n), !0)
    );
  }
  function Ft(t) {
    for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
    var e = qt();
    if (e && e[t]) return e[t].apply(e, u(n));
    throw new Error(
      "No hub defined or " +
        t +
        " was not found on the hub, please open a bug report."
    );
  }
  function captureException(t, n) {
    var r;
    try {
      throw new Error("Sentry syntheticException");
    } catch (t) {
      r = t;
    }
    return Ft("captureException", t, {
      captureContext: n,
      originalException: t,
      syntheticException: r,
    });
  }
  function Pt(t) {
    Ft("withScope", t);
  }
  var Xt = (function () {
      function t(t) {
        (this.dsn = t), (this.K = new _t(t));
      }
      return (
        (t.prototype.getDsn = function () {
          return this.K;
        }),
        (t.prototype.getBaseApiEndpoint = function () {
          var t = this.K,
            n = t.protocol ? t.protocol + ":" : "",
            r = t.port ? ":" + t.port : "";
          return n + "//" + t.host + r + (t.path ? "/" + t.path : "") + "/api/";
        }),
        (t.prototype.getStoreEndpoint = function () {
          return this.Y("store");
        }),
        (t.prototype.Z = function () {
          return this.Y("envelope");
        }),
        (t.prototype.Y = function (t) {
          return (
            "" + this.getBaseApiEndpoint() + this.K.projectId + "/" + t + "/"
          );
        }),
        (t.prototype.getStoreEndpointWithUrlEncodedAuth = function () {
          return this.getStoreEndpoint() + "?" + this.tt();
        }),
        (t.prototype.getEnvelopeEndpointWithUrlEncodedAuth = function () {
          return this.Z() + "?" + this.tt();
        }),
        (t.prototype.tt = function () {
          var t,
            n = { sentry_key: this.K.user, sentry_version: "7" };
          return (
            (t = n),
            Object.keys(t)
              .map(function (n) {
                return encodeURIComponent(n) + "=" + encodeURIComponent(t[n]);
              })
              .join("&")
          );
        }),
        (t.prototype.getStoreEndpointPath = function () {
          var t = this.K;
          return (
            (t.path ? "/" + t.path : "") + "/api/" + t.projectId + "/store/"
          );
        }),
        (t.prototype.getRequestHeaders = function (t, n) {
          var r = this.K,
            e = ["Sentry sentry_version=7"];
          return (
            e.push("sentry_client=" + t + "/" + n),
            e.push("sentry_key=" + r.user),
            r.pass && e.push("sentry_secret=" + r.pass),
            {
              "Content-Type": "application/json",
              "X-Sentry-Auth": e.join(", "),
            }
          );
        }),
        (t.prototype.getReportDialogEndpoint = function (t) {
          void 0 === t && (t = {});
          var n = this.K,
            r = this.getBaseApiEndpoint() + "embed/error-page/",
            e = [];
          for (var i in (e.push("dsn=" + n.toString()), t))
            if ("user" === i) {
              if (!t.user) continue;
              t.user.name && e.push("name=" + encodeURIComponent(t.user.name)),
                t.user.email &&
                  e.push("email=" + encodeURIComponent(t.user.email));
            } else
              e.push(encodeURIComponent(i) + "=" + encodeURIComponent(t[i]));
          return e.length ? r + "?" + e.join("&") : r;
        }),
        t
      );
    })(),
    Wt = [];
  function $t(t) {
    var n = {};
    return (
      (function (t) {
        var n = (t.defaultIntegrations && u(t.defaultIntegrations)) || [],
          r = t.integrations,
          e = [];
        if (Array.isArray(r)) {
          var i = r.map(function (t) {
              return t.name;
            }),
            o = [];
          n.forEach(function (t) {
            -1 === i.indexOf(t.name) &&
              -1 === o.indexOf(t.name) &&
              (e.push(t), o.push(t.name));
          }),
            r.forEach(function (t) {
              -1 === o.indexOf(t.name) && (e.push(t), o.push(t.name));
            });
        } else
          "function" == typeof r
            ? ((e = r(n)), (e = Array.isArray(e) ? e : [e]))
            : (e = u(n));
        var c = e.map(function (t) {
          return t.name;
        });
        return (
          -1 !== c.indexOf("Debug") &&
            e.push.apply(e, u(e.splice(c.indexOf("Debug"), 1))),
          e
        );
      })(t).forEach(function (t) {
        (n[t.name] = t),
          (function (t) {
            -1 === Wt.indexOf(t.name) &&
              (t.setupOnce(It, qt),
              Wt.push(t.name),
              V.log("Integration installed: " + t.name));
          })(t);
      }),
      n
    );
  }
  var Bt,
    Gt = (function () {
      function t(t, n) {
        (this.nt = {}),
          (this.rt = !1),
          (this.et = new t(n)),
          (this.it = n),
          n.dsn && (this.ot = new _t(n.dsn));
      }
      return (
        (t.prototype.captureException = function (t, n, r) {
          var e = this,
            i = n && n.event_id;
          return (
            (this.rt = !0),
            this.ut()
              .eventFromException(t, n)
              .then(function (t) {
                i = e.captureEvent(t, n, r);
              }),
            i
          );
        }),
        (t.prototype.captureMessage = function (t, n, r, e) {
          var i = this,
            o = r && r.event_id;
          return (
            (this.rt = !0),
            (y(t)
              ? this.ut().eventFromMessage("" + t, n, r)
              : this.ut().eventFromException(t, r)
            ).then(function (t) {
              o = i.captureEvent(t, r, e);
            }),
            o
          );
        }),
        (t.prototype.captureEvent = function (t, n, r) {
          var e = this,
            i = n && n.event_id;
          return (
            (this.rt = !0),
            this.ct(t, n, r)
              .then(function (t) {
                (i = t && t.event_id), (e.rt = !1);
              })
              .then(null, function (t) {
                V.error(t), (e.rt = !1);
              }),
            i
          );
        }),
        (t.prototype.getDsn = function () {
          return this.ot;
        }),
        (t.prototype.getOptions = function () {
          return this.it;
        }),
        (t.prototype.flush = function (t) {
          var n = this;
          return this.at(t).then(function (r) {
            return (
              clearInterval(r.interval),
              n
                .ut()
                .getTransport()
                .close(t)
                .then(function (t) {
                  return r.ready && t;
                })
            );
          });
        }),
        (t.prototype.close = function (t) {
          var n = this;
          return this.flush(t).then(function (t) {
            return (n.getOptions().enabled = !1), t;
          });
        }),
        (t.prototype.setupIntegrations = function () {
          this.st() && (this.nt = $t(this.it));
        }),
        (t.prototype.getIntegration = function (t) {
          try {
            return this.nt[t.id] || null;
          } catch (n) {
            return (
              V.warn(
                "Cannot retrieve integration " +
                  t.id +
                  " from the current Client"
              ),
              null
            );
          }
        }),
        (t.prototype.at = function (t) {
          var n = this;
          return new ot(function (r) {
            var e = 0,
              i = 0;
            clearInterval(i),
              (i = setInterval(function () {
                n.rt
                  ? ((e += 1), t && e >= t && r({ interval: i, ready: !1 }))
                  : r({ interval: i, ready: !0 });
              }, 1));
          });
        }),
        (t.prototype.ut = function () {
          return this.et;
        }),
        (t.prototype.st = function () {
          return !1 !== this.getOptions().enabled && void 0 !== this.ot;
        }),
        (t.prototype.ft = function (t, n, r) {
          var i = this,
            o = this.getOptions().normalizeDepth,
            u = void 0 === o ? 3 : o,
            c = e({}, t, {
              event_id: t.event_id || (r && r.event_id ? r.event_id : _()),
              timestamp: t.timestamp || F(),
            });
          this.ht(c), this.vt(c);
          var a = n;
          r && r.captureContext && (a = Dt.clone(a).update(r.captureContext));
          var s = ot.resolve(c);
          return (
            a && (s = a.applyToEvent(c, r)),
            s.then(function (t) {
              return "number" == typeof u && u > 0 ? i.lt(t, u) : t;
            })
          );
        }),
        (t.prototype.lt = function (t, n) {
          if (!t) return null;
          var r = e(
            {},
            t,
            t.breadcrumbs && {
              breadcrumbs: t.breadcrumbs.map(function (t) {
                return e({}, t, t.data && { data: et(t.data, n) });
              }),
            },
            t.user && { user: et(t.user, n) },
            t.contexts && { contexts: et(t.contexts, n) },
            t.extra && { extra: et(t.extra, n) }
          );
          return (
            t.contexts &&
              t.contexts.trace &&
              (r.contexts.trace = t.contexts.trace),
            r
          );
        }),
        (t.prototype.ht = function (t) {
          var n = this.getOptions(),
            r = n.environment,
            e = n.release,
            i = n.dist,
            o = n.maxValueLength,
            u = void 0 === o ? 250 : o;
          void 0 === t.environment && void 0 !== r && (t.environment = r),
            void 0 === t.release && void 0 !== e && (t.release = e),
            void 0 === t.dist && void 0 !== i && (t.dist = i),
            t.message && (t.message = x(t.message, u));
          var c = t.exception && t.exception.values && t.exception.values[0];
          c && c.value && (c.value = x(c.value, u));
          var a = t.request;
          a && a.url && (a.url = x(a.url, u));
        }),
        (t.prototype.vt = function (t) {
          var n = t.sdk,
            r = Object.keys(this.nt);
          n && r.length > 0 && (n.integrations = r);
        }),
        (t.prototype.dt = function (t) {
          this.ut().sendEvent(t);
        }),
        (t.prototype.ct = function (t, n, r) {
          var e = this,
            i = this.getOptions(),
            o = i.beforeSend,
            u = i.sampleRate;
          if (!this.st())
            return ot.reject("SDK not enabled, will not send event.");
          var c = "transaction" === t.type;
          return !c && "number" == typeof u && Math.random() > u
            ? ot.reject("This event has been sampled, will not send event.")
            : new ot(function (i, u) {
                e.ft(t, r, n)
                  .then(function (t) {
                    if (null !== t) {
                      var r = t;
                      if ((n && n.data && !0 === n.data.__sentry__) || !o || c)
                        return e.dt(r), void i(r);
                      var a = o(t, n);
                      if (void 0 === a)
                        V.error(
                          "`beforeSend` method has to return `null` or a valid event."
                        );
                      else if (g(a)) e.pt(a, i, u);
                      else {
                        if (null === (r = a))
                          return (
                            V.log(
                              "`beforeSend` returned `null`, will not send event."
                            ),
                            void i(null)
                          );
                        e.dt(r), i(r);
                      }
                    } else u("An event processor returned null, will not send event.");
                  })
                  .then(null, function (t) {
                    e.captureException(t, {
                      data: { __sentry__: !0 },
                      originalException: t,
                    }),
                      u(
                        "Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: " +
                          t
                      );
                  });
              });
        }),
        (t.prototype.pt = function (t, n, r) {
          var e = this;
          t.then(function (t) {
            null !== t
              ? (e.dt(t), n(t))
              : r("`beforeSend` returned `null`, will not send event.");
          }).then(null, function (t) {
            r("beforeSend rejected with " + t);
          });
        }),
        t
      );
    })(),
    Jt = (function () {
      function n() {}
      return (
        (n.prototype.sendEvent = function (n) {
          return ot.resolve({
            reason:
              "NoopTransport: Event has been skipped because no Dsn is configured.",
            status: t.Status.Skipped,
          });
        }),
        (n.prototype.close = function (t) {
          return ot.resolve(!0);
        }),
        n
      );
    })(),
    zt = (function () {
      function t(t) {
        (this.it = t),
          this.it.dsn ||
            V.warn("No DSN provided, backend will not do anything."),
          (this.yt = this.bt());
      }
      return (
        (t.prototype.bt = function () {
          return new Jt();
        }),
        (t.prototype.eventFromException = function (t, n) {
          throw new h("Backend has to implement `eventFromException` method");
        }),
        (t.prototype.eventFromMessage = function (t, n, r) {
          throw new h("Backend has to implement `eventFromMessage` method");
        }),
        (t.prototype.sendEvent = function (t) {
          this.yt.sendEvent(t).then(null, function (t) {
            V.error("Error while sending event: " + t);
          });
        }),
        (t.prototype.getTransport = function () {
          return this.yt;
        }),
        t
      );
    })();
  function Vt(t, n) {
    var r = "transaction" === t.type,
      e = {
        body: JSON.stringify(t),
        url: r
          ? n.getEnvelopeEndpointWithUrlEncodedAuth()
          : n.getStoreEndpointWithUrlEncodedAuth(),
      };
    if (r) {
      var i =
        JSON.stringify({
          event_id: t.event_id,
          sent_at: new Date(1e3 * F()).toISOString(),
        }) +
        "\n" +
        JSON.stringify({ type: t.type }) +
        "\n" +
        e.body;
      e.body = i;
    }
    return e;
  }
  var Kt = (function () {
      function t() {
        this.name = t.id;
      }
      return (
        (t.prototype.setupOnce = function () {
          (Bt = Function.prototype.toString),
            (Function.prototype.toString = function () {
              for (var t = [], n = 0; n < arguments.length; n++)
                t[n] = arguments[n];
              var r = this.__sentry_original__ || this;
              return Bt.apply(r, t);
            });
        }),
        (t.id = "FunctionToString"),
        t
      );
    })(),
    Qt = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/],
    Yt = (function () {
      function t(n) {
        void 0 === n && (n = {}), (this.it = n), (this.name = t.id);
      }
      return (
        (t.prototype.setupOnce = function () {
          It(function (n) {
            var r = qt();
            if (!r) return n;
            var e = r.getIntegration(t);
            if (e) {
              var i = r.getClient(),
                o = i ? i.getOptions() : {},
                u = e.wt(o);
              if (e.gt(n, u)) return null;
            }
            return n;
          });
        }),
        (t.prototype.gt = function (t, n) {
          return this.Et(t, n)
            ? (V.warn(
                "Event dropped due to being internal Sentry Error.\nEvent: " +
                  R(t)
              ),
              !0)
            : this.xt(t, n)
            ? (V.warn(
                "Event dropped due to being matched by `ignoreErrors` option.\nEvent: " +
                  R(t)
              ),
              !0)
            : this.jt(t, n)
            ? (V.warn(
                "Event dropped due to being matched by `blacklistUrls` option.\nEvent: " +
                  R(t) +
                  ".\nUrl: " +
                  this.kt(t)
              ),
              !0)
            : !this.St(t, n) &&
              (V.warn(
                "Event dropped due to not being matched by `whitelistUrls` option.\nEvent: " +
                  R(t) +
                  ".\nUrl: " +
                  this.kt(t)
              ),
              !0);
        }),
        (t.prototype.Et = function (t, n) {
          if ((void 0 === n && (n = {}), !n.ignoreInternal)) return !1;
          try {
            return (
              (t &&
                t.exception &&
                t.exception.values &&
                t.exception.values[0] &&
                "SentryError" === t.exception.values[0].type) ||
              !1
            );
          } catch (t) {
            return !1;
          }
        }),
        (t.prototype.xt = function (t, n) {
          return (
            void 0 === n && (n = {}),
            !(!n.ignoreErrors || !n.ignoreErrors.length) &&
              this.Tt(t).some(function (t) {
                return n.ignoreErrors.some(function (n) {
                  return k(t, n);
                });
              })
          );
        }),
        (t.prototype.jt = function (t, n) {
          if (
            (void 0 === n && (n = {}),
            !n.blacklistUrls || !n.blacklistUrls.length)
          )
            return !1;
          var r = this.kt(t);
          return (
            !!r &&
            n.blacklistUrls.some(function (t) {
              return k(r, t);
            })
          );
        }),
        (t.prototype.St = function (t, n) {
          if (
            (void 0 === n && (n = {}),
            !n.whitelistUrls || !n.whitelistUrls.length)
          )
            return !0;
          var r = this.kt(t);
          return (
            !r ||
            n.whitelistUrls.some(function (t) {
              return k(r, t);
            })
          );
        }),
        (t.prototype.wt = function (t) {
          return (
            void 0 === t && (t = {}),
            {
              blacklistUrls: u(
                this.it.blacklistUrls || [],
                t.blacklistUrls || []
              ),
              ignoreErrors: u(
                this.it.ignoreErrors || [],
                t.ignoreErrors || [],
                Qt
              ),
              ignoreInternal:
                void 0 === this.it.ignoreInternal || this.it.ignoreInternal,
              whitelistUrls: u(
                this.it.whitelistUrls || [],
                t.whitelistUrls || []
              ),
            }
          );
        }),
        (t.prototype.Tt = function (t) {
          if (t.message) return [t.message];
          if (t.exception)
            try {
              var n = (t.exception.values && t.exception.values[0]) || {},
                r = n.type,
                e = void 0 === r ? "" : r,
                i = n.value,
                o = void 0 === i ? "" : i;
              return ["" + o, e + ": " + o];
            } catch (n) {
              return V.error("Cannot extract message for event " + R(t)), [];
            }
          return [];
        }),
        (t.prototype.kt = function (t) {
          try {
            if (t.stacktrace) {
              var n = t.stacktrace.frames;
              return (n && n[n.length - 1].filename) || null;
            }
            if (t.exception) {
              var r =
                t.exception.values &&
                t.exception.values[0].stacktrace &&
                t.exception.values[0].stacktrace.frames;
              return (r && r[r.length - 1].filename) || null;
            }
            return null;
          } catch (n) {
            return V.error("Cannot extract url for event " + R(t)), null;
          }
        }),
        (t.id = "InboundFilters"),
        t
      );
    })(),
    Zt = Object.freeze({ FunctionToString: Kt, InboundFilters: Yt }),
    tn = "?",
    nn = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
    rn = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i,
    en = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
    on = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
    un = /\((\S*)(?::(\d+))(?::(\d+))\)/;
  function cn(t) {
    var n = null,
      r = t && t.framesToPop;
    try {
      if (
        (n = (function (t) {
          if (!t || !t.stacktrace) return null;
          for (
            var n,
              r = t.stacktrace,
              e = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i,
              i = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i,
              o = r.split("\n"),
              u = [],
              c = 0;
            c < o.length;
            c += 2
          ) {
            var a = null;
            (n = e.exec(o[c]))
              ? (a = {
                  url: n[2],
                  func: n[3],
                  args: [],
                  line: +n[1],
                  column: null,
                })
              : (n = i.exec(o[c])) &&
                (a = {
                  url: n[6],
                  func: n[3] || n[4],
                  args: n[5] ? n[5].split(",") : [],
                  line: +n[1],
                  column: +n[2],
                }),
              a && (!a.func && a.line && (a.func = tn), u.push(a));
          }
          if (!u.length) return null;
          return { message: sn(t), name: t.name, stack: u };
        })(t))
      )
        return an(n, r);
    } catch (t) {}
    try {
      if (
        (n = (function (t) {
          if (!t || !t.stack) return null;
          for (
            var n, r, e, i = [], o = t.stack.split("\n"), u = 0;
            u < o.length;
            ++u
          ) {
            if ((r = nn.exec(o[u]))) {
              var c = r[2] && 0 === r[2].indexOf("native");
              r[2] &&
                0 === r[2].indexOf("eval") &&
                (n = un.exec(r[2])) &&
                ((r[2] = n[1]), (r[3] = n[2]), (r[4] = n[3])),
                (e = {
                  url:
                    r[2] && 0 === r[2].indexOf("address at ")
                      ? r[2].substr("address at ".length)
                      : r[2],
                  func: r[1] || tn,
                  args: c ? [r[2]] : [],
                  line: r[3] ? +r[3] : null,
                  column: r[4] ? +r[4] : null,
                });
            } else if ((r = en.exec(o[u])))
              e = {
                url: r[2],
                func: r[1] || tn,
                args: [],
                line: +r[3],
                column: r[4] ? +r[4] : null,
              };
            else {
              if (!(r = rn.exec(o[u]))) continue;
              r[3] && r[3].indexOf(" > eval") > -1 && (n = on.exec(r[3]))
                ? ((r[1] = r[1] || "eval"),
                  (r[3] = n[1]),
                  (r[4] = n[2]),
                  (r[5] = ""))
                : 0 !== u ||
                  r[5] ||
                  void 0 === t.columnNumber ||
                  (i[0].column = t.columnNumber + 1),
                (e = {
                  url: r[3],
                  func: r[1] || tn,
                  args: r[2] ? r[2].split(",") : [],
                  line: r[4] ? +r[4] : null,
                  column: r[5] ? +r[5] : null,
                });
            }
            !e.func && e.line && (e.func = tn), i.push(e);
          }
          if (!i.length) return null;
          return { message: sn(t), name: t.name, stack: i };
        })(t))
      )
        return an(n, r);
    } catch (t) {}
    return { message: sn(t), name: t && t.name, stack: [], failed: !0 };
  }
  function an(t, n) {
    try {
      return e({}, t, { stack: t.stack.slice(n) });
    } catch (n) {
      return t;
    }
  }
  function sn(t) {
    var n = t && t.message;
    return n
      ? n.error && "string" == typeof n.error.message
        ? n.error.message
        : n
      : "No error message";
  }
  var fn = 50;
  function hn(t) {
    var n = ln(t.stack),
      r = { type: t.name, value: t.message };
    return (
      n && n.length && (r.stacktrace = { frames: n }),
      void 0 === r.type &&
        "" === r.value &&
        (r.value = "Unrecoverable error caught"),
      r
    );
  }
  function vn(t) {
    return { exception: { values: [hn(t)] } };
  }
  function ln(t) {
    if (!t || !t.length) return [];
    var n = t,
      r = n[0].func || "",
      e = n[n.length - 1].func || "";
    return (
      (-1 === r.indexOf("captureMessage") &&
        -1 === r.indexOf("captureException")) ||
        (n = n.slice(1)),
      -1 !== e.indexOf("sentryWrapped") && (n = n.slice(0, -1)),
      n
        .slice(0, fn)
        .map(function (t) {
          return {
            colno: null === t.column ? void 0 : t.column,
            filename: t.url || n[0].url,
            function: t.func || "?",
            in_app: !0,
            lineno: null === t.line ? void 0 : t.line,
          };
        })
        .reverse()
    );
  }
  function dn(t, n, r) {
    var e, i;
    if ((void 0 === r && (r = {}), l(t) && t.error))
      return (e = vn(cn((t = t.error))));
    if (
      d(t) ||
      ((i = t), "[object DOMException]" === Object.prototype.toString.call(i))
    ) {
      var o = t,
        u = o.name || (d(o) ? "DOMError" : "DOMException"),
        c = o.message ? u + ": " + o.message : u;
      return N((e = pn(c, n, r)), c), e;
    }
    return v(t)
      ? (e = vn(cn(t)))
      : m(t) || b(t)
      ? (C(
          (e = (function (t, n, r) {
            var e = {
              exception: {
                values: [
                  {
                    type: b(t)
                      ? t.constructor.name
                      : r
                      ? "UnhandledRejection"
                      : "Error",
                    value:
                      "Non-Error " +
                      (r ? "promise rejection" : "exception") +
                      " captured with keys: " +
                      it(t),
                  },
                ],
              },
              extra: { __serialized__: tt(t) },
            };
            if (n) {
              var i = ln(cn(n).stack);
              e.stacktrace = { frames: i };
            }
            return e;
          })(t, n, r.rejection)),
          { synthetic: !0 }
        ),
        e)
      : (N((e = pn(t, n, r)), "" + t, void 0), C(e, { synthetic: !0 }), e);
  }
  function pn(t, n, r) {
    void 0 === r && (r = {});
    var e = { message: t };
    if (r.attachStacktrace && n) {
      var i = ln(cn(n).stack);
      e.stacktrace = { frames: i };
    }
    return e;
  }
  var yn = (function () {
      function t(t) {
        (this.options = t),
          (this.S = new ut(30)),
          (this.Ot = new Xt(this.options.dsn)),
          (this.url = this.Ot.getStoreEndpointWithUrlEncodedAuth());
      }
      return (
        (t.prototype.sendEvent = function (t) {
          throw new h("Transport Class has to implement `sendEvent` method");
        }),
        (t.prototype.close = function (t) {
          return this.S.drain(t);
        }),
        t
      );
    })(),
    mn = O(),
    bn = (function (n) {
      function e() {
        var t = (null !== n && n.apply(this, arguments)) || this;
        return (t._t = new Date(Date.now())), t;
      }
      return (
        r(e, n),
        (e.prototype.sendEvent = function (n) {
          var r = this;
          if (new Date(Date.now()) < this._t)
            return Promise.reject({
              event: n,
              reason:
                "Transport locked till " +
                this._t +
                " due to too many requests.",
              status: 429,
            });
          var e = Vt(n, this.Ot),
            i = {
              body: e.body,
              method: "POST",
              referrerPolicy: st() ? "origin" : "",
            };
          return (
            void 0 !== this.options.fetchParameters &&
              Object.assign(i, this.options.fetchParameters),
            void 0 !== this.options.headers &&
              (i.headers = this.options.headers),
            this.S.add(
              new ot(function (n, o) {
                mn.fetch(e.url, i)
                  .then(function (e) {
                    var i = t.Status.fromHttpCode(e.status);
                    if (i !== t.Status.Success) {
                      if (i === t.Status.RateLimit) {
                        var u = Date.now();
                        (r._t = new Date(
                          u + X(u, e.headers.get("Retry-After"))
                        )),
                          V.warn(
                            "Too many requests, backing off till: " + r._t
                          );
                      }
                      o(e);
                    } else n({ status: i });
                  })
                  .catch(o);
              })
            )
          );
        }),
        e
      );
    })(yn),
    wn = (function (n) {
      function e() {
        var t = (null !== n && n.apply(this, arguments)) || this;
        return (t._t = new Date(Date.now())), t;
      }
      return (
        r(e, n),
        (e.prototype.sendEvent = function (n) {
          var r = this;
          if (new Date(Date.now()) < this._t)
            return Promise.reject({
              event: n,
              reason:
                "Transport locked till " +
                this._t +
                " due to too many requests.",
              status: 429,
            });
          var e = Vt(n, this.Ot);
          return this.S.add(
            new ot(function (n, i) {
              var o = new XMLHttpRequest();
              for (var u in ((o.onreadystatechange = function () {
                if (4 === o.readyState) {
                  var e = t.Status.fromHttpCode(o.status);
                  if (e !== t.Status.Success) {
                    if (e === t.Status.RateLimit) {
                      var u = Date.now();
                      (r._t = new Date(
                        u + X(u, o.getResponseHeader("Retry-After"))
                      )),
                        V.warn("Too many requests, backing off till: " + r._t);
                    }
                    i(o);
                  } else n({ status: e });
                }
              }),
              o.open("POST", e.url),
              r.options.headers))
                r.options.headers.hasOwnProperty(u) &&
                  o.setRequestHeader(u, r.options.headers[u]);
              o.send(e.body);
            })
          );
        }),
        e
      );
    })(yn),
    gn = Object.freeze({
      BaseTransport: yn,
      FetchTransport: bn,
      XHRTransport: wn,
    }),
    En = (function (n) {
      function i() {
        return (null !== n && n.apply(this, arguments)) || this;
      }
      return (
        r(i, n),
        (i.prototype.bt = function () {
          if (!this.it.dsn) return n.prototype.bt.call(this);
          var t = e({}, this.it.transportOptions, { dsn: this.it.dsn });
          return this.it.transport
            ? new this.it.transport(t)
            : ct()
            ? new bn(t)
            : new wn(t);
        }),
        (i.prototype.eventFromException = function (n, r) {
          var e = dn(n, (r && r.syntheticException) || void 0, {
            attachStacktrace: this.it.attachStacktrace,
          });
          return (
            C(e, { handled: !0, type: "generic" }),
            (e.level = t.Severity.Error),
            r && r.event_id && (e.event_id = r.event_id),
            ot.resolve(e)
          );
        }),
        (i.prototype.eventFromMessage = function (n, r, e) {
          void 0 === r && (r = t.Severity.Info);
          var i = pn(n, (e && e.syntheticException) || void 0, {
            attachStacktrace: this.it.attachStacktrace,
          });
          return (
            (i.level = r),
            e && e.event_id && (i.event_id = e.event_id),
            ot.resolve(i)
          );
        }),
        i
      );
    })(zt),
    xn = 0;
  function jn() {
    return xn > 0;
  }
  function kn(t, n, r) {
    if ((void 0 === n && (n = {}), "function" != typeof t)) return t;
    try {
      if (t.__sentry__) return t;
      if (t.__sentry_wrapped__) return t.__sentry_wrapped__;
    } catch (n) {
      return t;
    }
    var sentryWrapped = function () {
      var i = Array.prototype.slice.call(arguments);
      try {
        r && "function" == typeof r && r.apply(this, arguments);
        var o = i.map(function (t) {
          return kn(t, n);
        });
        return t.handleEvent ? t.handleEvent.apply(this, o) : t.apply(this, o);
      } catch (t) {
        throw (
          ((xn += 1),
          setTimeout(function () {
            xn -= 1;
          }),
          Pt(function (r) {
            r.addEventProcessor(function (t) {
              var r = e({}, t);
              return (
                n.mechanism && (N(r, void 0, void 0), C(r, n.mechanism)),
                (r.extra = e({}, r.extra, { arguments: i })),
                r
              );
            }),
              captureException(t);
          }),
          t)
        );
      }
    };
    try {
      for (var i in t)
        Object.prototype.hasOwnProperty.call(t, i) && (sentryWrapped[i] = t[i]);
    } catch (t) {}
    (t.prototype = t.prototype || {}),
      (sentryWrapped.prototype = t.prototype),
      Object.defineProperty(t, "__sentry_wrapped__", {
        enumerable: !1,
        value: sentryWrapped,
      }),
      Object.defineProperties(sentryWrapped, {
        __sentry__: { enumerable: !1, value: !0 },
        __sentry_original__: { enumerable: !1, value: t },
      });
    try {
      Object.getOwnPropertyDescriptor(sentryWrapped, "name").configurable &&
        Object.defineProperty(sentryWrapped, "name", {
          get: function () {
            return t.name;
          },
        });
    } catch (t) {}
    return sentryWrapped;
  }
  var Sn = (function () {
      function n(t) {
        (this.name = n.id),
          (this.Dt = !1),
          (this.Rt = !1),
          (this.it = e({ onerror: !0, onunhandledrejection: !0 }, t));
      }
      return (
        (n.prototype.setupOnce = function () {
          (Error.stackTraceLimit = 50),
            this.it.onerror &&
              (V.log("Global Handler attached: onerror"), this.It()),
            this.it.onunhandledrejection &&
              (V.log("Global Handler attached: onunhandledrejection"),
              this.Nt());
        }),
        (n.prototype.It = function () {
          var t = this;
          this.Dt ||
            (pt({
              callback: function (r) {
                var e = r.error,
                  i = qt(),
                  o = i.getIntegration(n),
                  u = e && !0 === e.__sentry_own_request__;
                if (o && !jn() && !u) {
                  var c = i.getClient(),
                    a = y(e)
                      ? t.Ct(r.msg, r.url, r.line, r.column)
                      : t.Mt(
                          dn(e, void 0, {
                            attachStacktrace:
                              c && c.getOptions().attachStacktrace,
                            rejection: !1,
                          }),
                          r.url,
                          r.line,
                          r.column
                        );
                  C(a, { handled: !1, type: "onerror" }),
                    i.captureEvent(a, { originalException: e });
                }
              },
              type: "error",
            }),
            (this.Dt = !0));
        }),
        (n.prototype.Nt = function () {
          var r = this;
          this.Rt ||
            (pt({
              callback: function (e) {
                var i = e;
                try {
                  "reason" in e
                    ? (i = e.reason)
                    : "detail" in e &&
                      "reason" in e.detail &&
                      (i = e.detail.reason);
                } catch (t) {}
                var o = qt(),
                  u = o.getIntegration(n),
                  c = i && !0 === i.__sentry_own_request__;
                if (!u || jn() || c) return !0;
                var a = o.getClient(),
                  s = y(i)
                    ? r.At(i)
                    : dn(i, void 0, {
                        attachStacktrace: a && a.getOptions().attachStacktrace,
                        rejection: !0,
                      });
                (s.level = t.Severity.Error),
                  C(s, { handled: !1, type: "onunhandledrejection" }),
                  o.captureEvent(s, { originalException: i });
              },
              type: "unhandledrejection",
            }),
            (this.Rt = !0));
        }),
        (n.prototype.Ct = function (t, n, r, e) {
          var i,
            o = l(t) ? t.message : t;
          if (p(o)) {
            var u = o.match(
              /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i
            );
            u && ((i = u[1]), (o = u[2]));
          }
          var c = { exception: { values: [{ type: i || "Error", value: o }] } };
          return this.Mt(c, n, r, e);
        }),
        (n.prototype.At = function (t) {
          return {
            exception: {
              values: [
                {
                  type: "UnhandledRejection",
                  value:
                    "Non-Error promise rejection captured with value: " + t,
                },
              ],
            },
          };
        }),
        (n.prototype.Mt = function (t, n, r, e) {
          (t.exception = t.exception || {}),
            (t.exception.values = t.exception.values || []),
            (t.exception.values[0] = t.exception.values[0] || {}),
            (t.exception.values[0].stacktrace =
              t.exception.values[0].stacktrace || {}),
            (t.exception.values[0].stacktrace.frames =
              t.exception.values[0].stacktrace.frames || []);
          var i = isNaN(parseInt(e, 10)) ? void 0 : e,
            o = isNaN(parseInt(r, 10)) ? void 0 : r,
            u =
              p(n) && n.length > 0
                ? n
                : (function () {
                    try {
                      return document.location.href;
                    } catch (t) {
                      return "";
                    }
                  })();
          return (
            0 === t.exception.values[0].stacktrace.frames.length &&
              t.exception.values[0].stacktrace.frames.push({
                colno: i,
                filename: u,
                function: "?",
                in_app: !0,
                lineno: o,
              }),
            t
          );
        }),
        (n.id = "GlobalHandlers"),
        n
      );
    })(),
    Tn = [
      "EventTarget",
      "Window",
      "Node",
      "ApplicationCache",
      "AudioTrackList",
      "ChannelMergerNode",
      "CryptoOperation",
      "EventSource",
      "FileReader",
      "HTMLUnknownElement",
      "IDBDatabase",
      "IDBRequest",
      "IDBTransaction",
      "KeyOperation",
      "MediaController",
      "MessagePort",
      "ModalWindow",
      "Notification",
      "SVGElementInstance",
      "Screen",
      "TextTrack",
      "TextTrackCue",
      "TextTrackList",
      "WebSocket",
      "WebSocketWorker",
      "Worker",
      "XMLHttpRequest",
      "XMLHttpRequestEventTarget",
      "XMLHttpRequestUpload",
    ],
    On = (function () {
      function t(n) {
        (this.name = t.id),
          (this.it = e(
            {
              XMLHttpRequest: !0,
              eventTarget: !0,
              requestAnimationFrame: !0,
              setInterval: !0,
              setTimeout: !0,
            },
            n
          ));
      }
      return (
        (t.prototype.qt = function (t) {
          return function () {
            for (var n = [], r = 0; r < arguments.length; r++)
              n[r] = arguments[r];
            var e = n[0];
            return (
              (n[0] = kn(e, {
                mechanism: {
                  data: { function: $(t) },
                  handled: !0,
                  type: "instrument",
                },
              })),
              t.apply(this, n)
            );
          };
        }),
        (t.prototype.Ut = function (t) {
          return function (n) {
            return t.call(
              this,
              kn(n, {
                mechanism: {
                  data: { function: "requestAnimationFrame", handler: $(t) },
                  handled: !0,
                  type: "instrument",
                },
              })
            );
          };
        }),
        (t.prototype.Lt = function (t) {
          var n = O(),
            r = n[t] && n[t].prototype;
          r &&
            r.hasOwnProperty &&
            r.hasOwnProperty("addEventListener") &&
            (Q(r, "addEventListener", function (n) {
              return function (r, e, i) {
                try {
                  "function" == typeof e.handleEvent &&
                    (e.handleEvent = kn(e.handleEvent.bind(e), {
                      mechanism: {
                        data: {
                          function: "handleEvent",
                          handler: $(e),
                          target: t,
                        },
                        handled: !0,
                        type: "instrument",
                      },
                    }));
                } catch (t) {}
                return n.call(
                  this,
                  r,
                  kn(e, {
                    mechanism: {
                      data: {
                        function: "addEventListener",
                        handler: $(e),
                        target: t,
                      },
                      handled: !0,
                      type: "instrument",
                    },
                  }),
                  i
                );
              };
            }),
            Q(r, "removeEventListener", function (t) {
              return function (n, r, e) {
                var i = r;
                try {
                  i = i && (i.__sentry_wrapped__ || i);
                } catch (t) {}
                return t.call(this, n, i, e);
              };
            }));
        }),
        (t.prototype.Ht = function (t) {
          return function () {
            for (var n = [], r = 0; r < arguments.length; r++)
              n[r] = arguments[r];
            var e = this;
            return (
              ["onload", "onerror", "onprogress", "onreadystatechange"].forEach(
                function (t) {
                  t in e &&
                    "function" == typeof e[t] &&
                    Q(e, t, function (n) {
                      var r = {
                        mechanism: {
                          data: { function: t, handler: $(n) },
                          handled: !0,
                          type: "instrument",
                        },
                      };
                      return (
                        n.__sentry_original__ &&
                          (r.mechanism.data.handler = $(n.__sentry_original__)),
                        kn(n, r)
                      );
                    });
                }
              ),
              t.apply(this, n)
            );
          };
        }),
        (t.prototype.setupOnce = function () {
          var t = O();
          (this.it.setTimeout && Q(t, "setTimeout", this.qt.bind(this)),
          this.it.setInterval && Q(t, "setInterval", this.qt.bind(this)),
          this.it.requestAnimationFrame &&
            Q(t, "requestAnimationFrame", this.Ut.bind(this)),
          this.it.XMLHttpRequest &&
            "XMLHttpRequest" in t &&
            Q(XMLHttpRequest.prototype, "send", this.Ht.bind(this)),
          this.it.eventTarget) &&
            (Array.isArray(this.it.eventTarget)
              ? this.it.eventTarget
              : Tn
            ).forEach(this.Lt.bind(this));
        }),
        (t.id = "TryCatch"),
        t
      );
    })(),
    _n = (function () {
      function n(t) {
        (this.name = n.id),
          (this.it = e(
            {
              console: !0,
              dom: !0,
              fetch: !0,
              history: !0,
              sentry: !0,
              xhr: !0,
            },
            t
          ));
      }
      return (
        (n.prototype.addSentryBreadcrumb = function (t) {
          this.it.sentry &&
            qt().addBreadcrumb(
              {
                category:
                  "sentry." +
                  ("transaction" === t.type ? "transaction" : "event"),
                event_id: t.event_id,
                level: t.level,
                message: R(t),
              },
              { event: t }
            );
        }),
        (n.prototype.Ft = function (n) {
          var r = {
            category: "console",
            data: { arguments: n.args, logger: "console" },
            level: t.Severity.fromString(n.level),
            message: j(n.args, " "),
          };
          if ("assert" === n.level) {
            if (!1 !== n.args[0]) return;
            (r.message =
              "Assertion failed: " +
              (j(n.args.slice(1), " ") || "console.assert")),
              (r.data.arguments = n.args.slice(1));
          }
          qt().addBreadcrumb(r, { input: n.args, level: n.level });
        }),
        (n.prototype.Pt = function (t) {
          var n;
          try {
            n = t.event.target ? M(t.event.target) : M(t.event);
          } catch (t) {
            n = "<unknown>";
          }
          0 !== n.length &&
            qt().addBreadcrumb(
              { category: "ui." + t.name, message: n },
              { event: t.event, name: t.name }
            );
        }),
        (n.prototype.Xt = function (t) {
          if (t.endTimestamp) {
            if (t.xhr.__sentry_own_request__) return;
            qt().addBreadcrumb(
              { category: "xhr", data: t.xhr.__sentry_xhr__, type: "http" },
              { xhr: t.xhr }
            );
          } else;
        }),
        (n.prototype.Wt = function (n) {
          n.endTimestamp &&
            ((n.fetchData.url.match(/sentry_key/) &&
              "POST" === n.fetchData.method) ||
              (n.error
                ? qt().addBreadcrumb(
                    {
                      category: "fetch",
                      data: n.fetchData,
                      level: t.Severity.Error,
                      type: "http",
                    },
                    { data: n.error, input: n.args }
                  )
                : qt().addBreadcrumb(
                    {
                      category: "fetch",
                      data: e({}, n.fetchData, {
                        status_code: n.response.status,
                      }),
                      type: "http",
                    },
                    { input: n.args, response: n.response }
                  )));
        }),
        (n.prototype.$t = function (t) {
          var n = O(),
            r = t.from,
            e = t.to,
            i = D(n.location.href),
            o = D(r),
            u = D(e);
          o.path || (o = i),
            i.protocol === u.protocol && i.host === u.host && (e = u.relative),
            i.protocol === o.protocol && i.host === o.host && (r = o.relative),
            qt().addBreadcrumb({
              category: "navigation",
              data: { from: r, to: e },
            });
        }),
        (n.prototype.setupOnce = function () {
          var t = this;
          this.it.console &&
            pt({
              callback: function () {
                for (var n = [], r = 0; r < arguments.length; r++)
                  n[r] = arguments[r];
                t.Ft.apply(t, u(n));
              },
              type: "console",
            }),
            this.it.dom &&
              pt({
                callback: function () {
                  for (var n = [], r = 0; r < arguments.length; r++)
                    n[r] = arguments[r];
                  t.Pt.apply(t, u(n));
                },
                type: "dom",
              }),
            this.it.xhr &&
              pt({
                callback: function () {
                  for (var n = [], r = 0; r < arguments.length; r++)
                    n[r] = arguments[r];
                  t.Xt.apply(t, u(n));
                },
                type: "xhr",
              }),
            this.it.fetch &&
              pt({
                callback: function () {
                  for (var n = [], r = 0; r < arguments.length; r++)
                    n[r] = arguments[r];
                  t.Wt.apply(t, u(n));
                },
                type: "fetch",
              }),
            this.it.history &&
              pt({
                callback: function () {
                  for (var n = [], r = 0; r < arguments.length; r++)
                    n[r] = arguments[r];
                  t.$t.apply(t, u(n));
                },
                type: "history",
              });
        }),
        (n.id = "Breadcrumbs"),
        n
      );
    })(),
    Dn = "cause",
    Rn = 5,
    In = (function () {
      function t(n) {
        void 0 === n && (n = {}),
          (this.name = t.id),
          (this.Bt = n.key || Dn),
          (this.k = n.limit || Rn);
      }
      return (
        (t.prototype.setupOnce = function () {
          It(function (n, r) {
            var e = qt().getIntegration(t);
            return e ? e.Gt(n, r) : n;
          });
        }),
        (t.prototype.Gt = function (t, n) {
          if (
            !(
              t.exception &&
              t.exception.values &&
              n &&
              E(n.originalException, Error)
            )
          )
            return t;
          var r = this.Jt(n.originalException, this.Bt);
          return (t.exception.values = u(r, t.exception.values)), t;
        }),
        (t.prototype.Jt = function (t, n, r) {
          if (
            (void 0 === r && (r = []),
            !E(t[n], Error) || r.length + 1 >= this.k)
          )
            return r;
          var e = hn(cn(t[n]));
          return this.Jt(t[n], n, u([e], r));
        }),
        (t.id = "LinkedErrors"),
        t
      );
    })(),
    Nn = O(),
    Cn = (function () {
      function t() {
        this.name = t.id;
      }
      return (
        (t.prototype.setupOnce = function () {
          It(function (n) {
            if (qt().getIntegration(t)) {
              if (!Nn.navigator || !Nn.location) return n;
              var r = n.request || {};
              return (
                (r.url = r.url || Nn.location.href),
                (r.headers = r.headers || {}),
                (r.headers["User-Agent"] = Nn.navigator.userAgent),
                e({}, n, { request: r })
              );
            }
            return n;
          });
        }),
        (t.id = "UserAgent"),
        t
      );
    })(),
    Mn = Object.freeze({
      GlobalHandlers: Sn,
      TryCatch: On,
      Breadcrumbs: _n,
      LinkedErrors: In,
      UserAgent: Cn,
    }),
    An = "sentry.javascript.browser",
    qn = (function (t) {
      function n(n) {
        return void 0 === n && (n = {}), t.call(this, En, n) || this;
      }
      return (
        r(n, t),
        (n.prototype.ft = function (n, r, i) {
          return (
            (n.platform = n.platform || "javascript"),
            (n.sdk = e({}, n.sdk, {
              name: An,
              packages: u((n.sdk && n.sdk.packages) || [], [
                { name: "npm:@sentry/browser", version: "5.17.0" },
              ]),
              version: "5.17.0",
            })),
            t.prototype.ft.call(this, n, r, i)
          );
        }),
        (n.prototype.dt = function (n) {
          var r = this.getIntegration(_n);
          r && r.addSentryBreadcrumb(n), t.prototype.dt.call(this, n);
        }),
        (n.prototype.showReportDialog = function (t) {
          void 0 === t && (t = {});
          var n = O().document;
          if (n)
            if (this.st()) {
              var r = t.dsn || this.getDsn();
              if (t.eventId)
                if (r) {
                  var e = n.createElement("script");
                  (e.async = !0),
                    (e.src = new Xt(r).getReportDialogEndpoint(t)),
                    t.onLoad && (e.onload = t.onLoad),
                    (n.head || n.body).appendChild(e);
                } else V.error("Missing `Dsn` option in showReportDialog call");
              else V.error("Missing `eventId` option in showReportDialog call");
            } else
              V.error(
                "Trying to call showReportDialog with Sentry Client is disabled"
              );
        }),
        n
      );
    })(Gt),
    Un = [new Yt(), new Kt(), new On(), new _n(), new Sn(), new In(), new Cn()];
  var Ln = {},
    Hn = O();
  Hn.Sentry && Hn.Sentry.Integrations && (Ln = Hn.Sentry.Integrations);
  var Fn = e({}, Ln, Zt, Mn);
  return (
    (t.BrowserClient = qn),
    (t.Hub = Ct),
    (t.Integrations = Fn),
    (t.SDK_NAME = An),
    (t.SDK_VERSION = "5.17.0"),
    (t.Scope = Dt),
    (t.Transports = gn),
    (t.addBreadcrumb = function (t) {
      Ft("addBreadcrumb", t);
    }),
    (t.addGlobalEventProcessor = It),
    (t.captureEvent = function (t) {
      return Ft("captureEvent", t);
    }),
    (t.captureException = captureException),
    (t.captureMessage = function (t, n) {
      var r;
      try {
        throw new Error(t);
      } catch (t) {
        r = t;
      }
      return Ft(
        "captureMessage",
        t,
        "string" == typeof n ? n : void 0,
        e(
          { originalException: t, syntheticException: r },
          "string" != typeof n ? { captureContext: n } : void 0
        )
      );
    }),
    (t.close = function (t) {
      var n = qt().getClient();
      return n ? n.close(t) : ot.reject(!1);
    }),
    (t.configureScope = function (t) {
      Ft("configureScope", t);
    }),
    (t.defaultIntegrations = Un),
    (t.flush = function (t) {
      var n = qt().getClient();
      return n ? n.flush(t) : ot.reject(!1);
    }),
    (t.forceLoad = function () {}),
    (t.getCurrentHub = qt),
    (t.getHubFromCarrier = Lt),
    (t.init = function (t) {
      if (
        (void 0 === t && (t = {}),
        void 0 === t.defaultIntegrations && (t.defaultIntegrations = Un),
        void 0 === t.release)
      ) {
        var n = O();
        n.SENTRY_RELEASE &&
          n.SENTRY_RELEASE.id &&
          (t.release = n.SENTRY_RELEASE.id);
      }
      !(function (t, n) {
        !0 === n.debug && V.enable();
        var r = qt(),
          e = new t(n);
        r.bindClient(e);
      })(qn, t);
    }),
    (t.lastEventId = function () {
      return qt().lastEventId();
    }),
    (t.onLoad = function (t) {
      t();
    }),
    (t.setContext = function (t, n) {
      Ft("setContext", t, n);
    }),
    (t.setExtra = function (t, n) {
      Ft("setExtra", t, n);
    }),
    (t.setExtras = function (t) {
      Ft("setExtras", t);
    }),
    (t.setTag = function (t, n) {
      Ft("setTag", t, n);
    }),
    (t.setTags = function (t) {
      Ft("setTags", t);
    }),
    (t.setUser = function (t) {
      Ft("setUser", t);
    }),
    (t.showReportDialog = function (t) {
      void 0 === t && (t = {}), t.eventId || (t.eventId = qt().lastEventId());
      var n = qt().getClient();
      n && n.showReportDialog(t);
    }),
    (t.startTransaction = function (t) {
      return Ft("startTransaction", e({}, t));
    }),
    (t.withScope = Pt),
    (t.wrap = function (t) {
      return kn(t)();
    }),
    t
  );
})({});
//# sourceMappingURL=bundle.min.js.map
