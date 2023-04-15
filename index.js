$('#admin-giveaway-text').on('input', function (e) {
  $('#example-giveaway-text').html(
    $(this)
      .val()
      .replace(
        '$link',
        '<a class="secondary-text" href="' +
          $('#admin-giveaway-link').val() +
          '" style="padding: 0;line-height: 0;height: 0;display: inline;color: #fff;">' +
          $('#admin-giveaway-link').val() +
          '</a>'
      )
  );
});

$('#admin-giveaway-link').on('input', function (e) {
  $('#example-giveaway-text').html(
    $('#admin-giveaway-text')
      .val()
      .replace(
        '$link',
        '<a class="secondary-text" href="' +
          $(this).val() +
          '" style="padding: 0;line-height: 0;height: 0;display: inline;color: #fff;">' +
          $(this).val() +
          '</a>'
      )
  );
});

$('#admin-save-setting').click(function () {
  $('.admin-setting').each(function () {
    originalValue = $(this).data('value');
    newValue = $(this).find('input.admin-setting-text').val();
    if (originalValue != newValue) {
      socket.emit('saveSetting', $(this).attr('id'), newValue);
      $(this).data('value', newValue);
    }
  });
});

$('#admin-save-setting2').click(function () {
  $('.admin-setting2').each(function () {
    originalValue = $(this).data('value');
    newValue = $(this).find('input.admin-setting2-text').val();
    if (originalValue != newValue) {
      socket.emit('saveSetting', $(this).attr('id'), newValue);
      $(this).data('value', newValue);
    }
  });
});

var perms = { '': {} };
$('.admin-update-permission').click(function () {
  var rank = $(this).attr('id');
  perms = {
    access: {},
  };
  $('input[data-id="' + rank + '"]').each(function () {
    var rank2 = $(this).attr('id');
    var perm = rank2.split('_')[1];
    perms[perm] = $(this).is(':checked').toString();
  });
  $('.admin-access-page').each(function () {
    if ($(this).attr('id').indexOf(rank) >= 0) {
      perms['access'][$(this).attr('id').split('-')[1]] = $(
        'input#' + $(this).attr('id').replace('-', '_')
      )
        .is(':checked')
        .toString();
    }
  });
  socket.emit('updatePerm', rank, perms);
});

$('#admin-create-rank').click(function () {
  socket.emit('createRank', $('#admin-new-rank').val());
});
$(document).ready(function () {
  socket.on('attemptingDeposit', function (item) {
    $('#' + item + ' .deposit-item-button').html(
      '<div class="progress" style="background-color: #303030;margin-top: 15px;"><div class="indeterminate secondary" style="background-color: #FFF;"></div></div>'
    );
  });
  socket.on('tradeSent', function (item, offerid) {
    $('#' + item + ' .deposit-item-button').html('Acceppt Here');
    $('#' + item + ' .deposit-item-button').attr('href', offerid);
    $('#' + item + ' .progress').remove();
  });
  socket.on('tradeError', function (item, offerid) {
    $('#' + item + ' .deposit-item-button').html('Deposit');
  });
});

$('.deposit-item-button').click(function () {
  var itemid = $(this).parent().attr('id');
  if ($('#' + itemid + ' .deposit-item-button').attr('href') == null) {
    socket.emit('deposit', itemid);
  }
});
var deposit_items = [];
var deposit_value = 0;

var withdraw_items = [];
var withdraw_value = 0;

$('.modal-trigger').leanModal();
$('.dropdown-button').dropdown('open');
$('.deposit-container .item-container')
  .sort(sort_li)
  .appendTo('.deposit-container');
$('.withdraw-container .item-container')
  .sort(sort_li)
  .appendTo('.withdraw-container');

$('.deposit-container').on('click', '.item-container', function () {
  var className = $(this).attr('class');
  if (className.indexOf('selected') >= 0) {
    $(this).removeClass('selected');
    deposit_items.splice(
      deposit_items.indexOf($(this).children().data('itemid')),
      1
    );
    deposit_value -= $(this).children().data('value');
  } else {
    $(this).addClass('selected');
    deposit_items.push($(this).children().data('itemid'));
    deposit_value += $(this).children().data('value');
  }
  $('.btn-deposit .amount').html(deposit_items.length);
  $('.btn-deposit .value').html(parseFloat(deposit_value).toFixed(2));
});
$('.withdraw-container').on('click', '.item-container', function () {
  var className = $(this).attr('class');
  if (className.indexOf('selected') >= 0) {
    $(this).removeClass('selected');
    withdraw_items.splice(
      withdraw_items.indexOf($(this).children().data('itemid')),
      1
    );
    withdraw_value -= $(this).children().data('value');
  } else {
    $(this).addClass('selected');
    withdraw_items.push($(this).children().data('itemid'));
    withdraw_value += $(this).children().data('value');
  }
  $('.btn-withdraw .amount').html(withdraw_items.length);
  $('.btn-withdraw .value').html(parseFloat(withdraw_value).toFixed(2));
});

//Night/Light Mode
$('#night-mode-toggle').click(function () {
  var mode = $('body').attr('class');
  if (mode == 'light') {
    document.cookie = 'setting=dark';
    $('body').attr('class', 'dark');
    $('#night-mode-toggle .material-icons').html('brightness_3');
  } else {
    document.cookie = 'setting=light';
    $('body').attr('class', 'light');
    $('#night-mode-toggle .material-icons').html('brightness_5');
  }
});

// sort function callback
function sort_li(a, b) {
  return $(b).children().data('value') > $(a).children().data('value') ? 1 : -1;
}
/*!
 * Materialize v0.97.0 (http://materializecss.com)
 * Copyright 2014-2015 Materialize
 * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)
 */
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend(jQuery.easing, {
  def: 'easeOutQuad',
  swing: function (x, t, b, c, d) {
    //alert(jQuery.easing.default);
    return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
  },
  easeInQuad: function (x, t, b, c, d) {
    return c * (t /= d) * t + b;
  },
  easeOutQuad: function (x, t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  },
  easeInOutQuad: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
    return (-c / 2) * (--t * (t - 2) - 1) + b;
  },
  easeInCubic: function (x, t, b, c, d) {
    return c * (t /= d) * t * t + b;
  },
  easeOutCubic: function (x, t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
  easeInOutCubic: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
    return (c / 2) * ((t -= 2) * t * t + 2) + b;
  },
  easeInQuart: function (x, t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
  },
  easeOutQuart: function (x, t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  },
  easeInOutQuart: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b;
    return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
  },
  easeInQuint: function (x, t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  },
  easeOutQuint: function (x, t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  easeInOutQuint: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t * t + b;
    return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
  },
  easeInSine: function (x, t, b, c, d) {
    return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
  },
  easeOutSine: function (x, t, b, c, d) {
    return c * Math.sin((t / d) * (Math.PI / 2)) + b;
  },
  easeInOutSine: function (x, t, b, c, d) {
    return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
  },
  easeInExpo: function (x, t, b, c, d) {
    return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
  },
  easeOutExpo: function (x, t, b, c, d) {
    return t == d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
  },
  easeInOutExpo: function (x, t, b, c, d) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
    return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  easeInCirc: function (x, t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
  },
  easeOutCirc: function (x, t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
  },
  easeInOutCirc: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
    return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
  },
  easeInElastic: function (x, t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d) == 1) return b + c;
    if (!p) p = d * 0.3;
    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    } else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
    return (
      -(
        a *
        Math.pow(2, 10 * (t -= 1)) *
        Math.sin(((t * d - s) * (2 * Math.PI)) / p)
      ) + b
    );
  },
  easeOutElastic: function (x, t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d) == 1) return b + c;
    if (!p) p = d * 0.3;
    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    } else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
    return (
      a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
      c +
      b
    );
  },
  easeInOutElastic: function (x, t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d / 2) == 2) return b + c;
    if (!p) p = d * (0.3 * 1.5);
    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    } else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
    if (t < 1)
      return (
        -0.5 *
          (a *
            Math.pow(2, 10 * (t -= 1)) *
            Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
        b
      );
    return (
      a *
        Math.pow(2, -10 * (t -= 1)) *
        Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
        0.5 +
      c +
      b
    );
  },
  easeInBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  },
  easeOutBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  },
  easeInOutBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    if ((t /= d / 2) < 1)
      return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
    return (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
  },
  easeInBounce: function (x, t, b, c, d) {
    return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
  },
  easeOutBounce: function (x, t, b, c, d) {
    if ((t /= d) < 1 / 2.75) {
      return c * (7.5625 * t * t) + b;
    } else if (t < 2 / 2.75) {
      return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
    } else if (t < 2.5 / 2.75) {
      return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
    } else {
      return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
    }
  },
  easeInOutBounce: function (x, t, b, c, d) {
    if (t < d / 2)
      return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * 0.5 + b;
    return (
      jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
    );
  },
}); // Custom Easing

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */ jQuery.extend(jQuery.easing, {
  easeInOutMaterial: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
    return (c / 4) * ((t -= 2) * t * t + 2) + b;
  },
});

/*! VelocityJS.org (1.2.2). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */
/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */
!(function (e) {
  function t(e) {
    var t = e.length,
      r = $.type(e);
    return 'function' === r || $.isWindow(e)
      ? !1
      : 1 === e.nodeType && t
      ? !0
      : 'array' === r ||
        0 === t ||
        ('number' == typeof t && t > 0 && t - 1 in e);
  }
  if (!e.jQuery) {
    var $ = function (e, t) {
      return new $.fn.init(e, t);
    };
    ($.isWindow = function (e) {
      return null != e && e == e.window;
    }),
      ($.type = function (e) {
        return null == e
          ? e + ''
          : 'object' == typeof e || 'function' == typeof e
          ? a[o.call(e)] || 'object'
          : typeof e;
      }),
      ($.isArray =
        Array.isArray ||
        function (e) {
          return 'array' === $.type(e);
        }),
      ($.isPlainObject = function (e) {
        var t;
        if (!e || 'object' !== $.type(e) || e.nodeType || $.isWindow(e))
          return !1;
        try {
          if (
            e.constructor &&
            !n.call(e, 'constructor') &&
            !n.call(e.constructor.prototype, 'isPrototypeOf')
          )
            return !1;
        } catch (r) {
          return !1;
        }
        for (t in e);
        return void 0 === t || n.call(e, t);
      }),
      ($.each = function (e, r, a) {
        var n,
          o = 0,
          i = e.length,
          s = t(e);
        if (a) {
          if (s) for (; i > o && ((n = r.apply(e[o], a)), n !== !1); o++);
          else for (o in e) if (((n = r.apply(e[o], a)), n === !1)) break;
        } else if (s)
          for (; i > o && ((n = r.call(e[o], o, e[o])), n !== !1); o++);
        else for (o in e) if (((n = r.call(e[o], o, e[o])), n === !1)) break;
        return e;
      }),
      ($.data = function (e, t, a) {
        if (void 0 === a) {
          var n = e[$.expando],
            o = n && r[n];
          if (void 0 === t) return o;
          if (o && t in o) return o[t];
        } else if (void 0 !== t) {
          var n = e[$.expando] || (e[$.expando] = ++$.uuid);
          return (r[n] = r[n] || {}), (r[n][t] = a), a;
        }
      }),
      ($.removeData = function (e, t) {
        var a = e[$.expando],
          n = a && r[a];
        n &&
          $.each(t, function (e, t) {
            delete n[t];
          });
      }),
      ($.extend = function () {
        var e,
          t,
          r,
          a,
          n,
          o,
          i = arguments[0] || {},
          s = 1,
          l = arguments.length,
          u = !1;
        for (
          'boolean' == typeof i && ((u = i), (i = arguments[s] || {}), s++),
            'object' != typeof i && 'function' !== $.type(i) && (i = {}),
            s === l && ((i = this), s--);
          l > s;
          s++
        )
          if (null != (n = arguments[s]))
            for (a in n)
              (e = i[a]),
                (r = n[a]),
                i !== r &&
                  (u && r && ($.isPlainObject(r) || (t = $.isArray(r)))
                    ? (t
                        ? ((t = !1), (o = e && $.isArray(e) ? e : []))
                        : (o = e && $.isPlainObject(e) ? e : {}),
                      (i[a] = $.extend(u, o, r)))
                    : void 0 !== r && (i[a] = r));
        return i;
      }),
      ($.queue = function (e, r, a) {
        function n(e, r) {
          var a = r || [];
          return (
            null != e &&
              (t(Object(e))
                ? !(function (e, t) {
                    for (var r = +t.length, a = 0, n = e.length; r > a; )
                      e[n++] = t[a++];
                    if (r !== r) for (; void 0 !== t[a]; ) e[n++] = t[a++];
                    return (e.length = n), e;
                  })(a, 'string' == typeof e ? [e] : e)
                : [].push.call(a, e)),
            a
          );
        }
        if (e) {
          r = (r || 'fx') + 'queue';
          var o = $.data(e, r);
          return a
            ? (!o || $.isArray(a) ? (o = $.data(e, r, n(a))) : o.push(a), o)
            : o || [];
        }
      }),
      ($.dequeue = function (e, t) {
        $.each(e.nodeType ? [e] : e, function (e, r) {
          t = t || 'fx';
          var a = $.queue(r, t),
            n = a.shift();
          'inprogress' === n && (n = a.shift()),
            n &&
              ('fx' === t && a.unshift('inprogress'),
              n.call(r, function () {
                $.dequeue(r, t);
              }));
        });
      }),
      ($.fn = $.prototype =
        {
          init: function (e) {
            if (e.nodeType) return (this[0] = e), this;
            throw new Error('Not a DOM node.');
          },
          offset: function () {
            var t = this[0].getBoundingClientRect
              ? this[0].getBoundingClientRect()
              : { top: 0, left: 0 };
            return {
              top:
                t.top +
                (e.pageYOffset || document.scrollTop || 0) -
                (document.clientTop || 0),
              left:
                t.left +
                (e.pageXOffset || document.scrollLeft || 0) -
                (document.clientLeft || 0),
            };
          },
          position: function () {
            function e() {
              for (
                var e = this.offsetParent || document;
                e &&
                'html' === !e.nodeType.toLowerCase &&
                'static' === e.style.position;

              )
                e = e.offsetParent;
              return e || document;
            }
            var t = this[0],
              e = e.apply(t),
              r = this.offset(),
              a = /^(?:body|html)$/i.test(e.nodeName)
                ? { top: 0, left: 0 }
                : $(e).offset();
            return (
              (r.top -= parseFloat(t.style.marginTop) || 0),
              (r.left -= parseFloat(t.style.marginLeft) || 0),
              e.style &&
                ((a.top += parseFloat(e.style.borderTopWidth) || 0),
                (a.left += parseFloat(e.style.borderLeftWidth) || 0)),
              { top: r.top - a.top, left: r.left - a.left }
            );
          },
        });
    var r = {};
    ($.expando = 'velocity' + new Date().getTime()), ($.uuid = 0);
    for (
      var a = {},
        n = a.hasOwnProperty,
        o = a.toString,
        i =
          'Boolean Number String Function Array Date RegExp Object Error'.split(
            ' '
          ),
        s = 0;
      s < i.length;
      s++
    )
      a['[object ' + i[s] + ']'] = i[s].toLowerCase();
    ($.fn.init.prototype = $.fn), (e.Velocity = { Utilities: $ });
  }
})(window),
  (function (e) {
    'object' == typeof module && 'object' == typeof module.exports
      ? (module.exports = e())
      : 'function' == typeof define && define.amd
      ? define(e)
      : e();
  })(function () {
    return (function (e, t, r, a) {
      function n(e) {
        for (var t = -1, r = e ? e.length : 0, a = []; ++t < r; ) {
          var n = e[t];
          n && a.push(n);
        }
        return a;
      }
      function o(e) {
        return (
          g.isWrapped(e) ? (e = [].slice.call(e)) : g.isNode(e) && (e = [e]), e
        );
      }
      function i(e) {
        var t = $.data(e, 'velocity');
        return null === t ? a : t;
      }
      function s(e) {
        return function (t) {
          return Math.round(t * e) * (1 / e);
        };
      }
      function l(e, r, a, n) {
        function o(e, t) {
          return 1 - 3 * t + 3 * e;
        }
        function i(e, t) {
          return 3 * t - 6 * e;
        }
        function s(e) {
          return 3 * e;
        }
        function l(e, t, r) {
          return ((o(t, r) * e + i(t, r)) * e + s(t)) * e;
        }
        function u(e, t, r) {
          return 3 * o(t, r) * e * e + 2 * i(t, r) * e + s(t);
        }
        function c(t, r) {
          for (var n = 0; m > n; ++n) {
            var o = u(r, e, a);
            if (0 === o) return r;
            var i = l(r, e, a) - t;
            r -= i / o;
          }
          return r;
        }
        function p() {
          for (var t = 0; b > t; ++t) w[t] = l(t * x, e, a);
        }
        function f(t, r, n) {
          var o,
            i,
            s = 0;
          do
            (i = r + (n - r) / 2),
              (o = l(i, e, a) - t),
              o > 0 ? (n = i) : (r = i);
          while (Math.abs(o) > h && ++s < v);
          return i;
        }
        function d(t) {
          for (var r = 0, n = 1, o = b - 1; n != o && w[n] <= t; ++n) r += x;
          --n;
          var i = (t - w[n]) / (w[n + 1] - w[n]),
            s = r + i * x,
            l = u(s, e, a);
          return l >= y ? c(t, s) : 0 == l ? s : f(t, r, r + x);
        }
        function g() {
          (V = !0), (e != r || a != n) && p();
        }
        var m = 4,
          y = 0.001,
          h = 1e-7,
          v = 10,
          b = 11,
          x = 1 / (b - 1),
          S = 'Float32Array' in t;
        if (4 !== arguments.length) return !1;
        for (var P = 0; 4 > P; ++P)
          if (
            'number' != typeof arguments[P] ||
            isNaN(arguments[P]) ||
            !isFinite(arguments[P])
          )
            return !1;
        (e = Math.min(e, 1)),
          (a = Math.min(a, 1)),
          (e = Math.max(e, 0)),
          (a = Math.max(a, 0));
        var w = S ? new Float32Array(b) : new Array(b),
          V = !1,
          C = function (t) {
            return (
              V || g(),
              e === r && a === n ? t : 0 === t ? 0 : 1 === t ? 1 : l(d(t), r, n)
            );
          };
        C.getControlPoints = function () {
          return [
            { x: e, y: r },
            { x: a, y: n },
          ];
        };
        var T = 'generateBezier(' + [e, r, a, n] + ')';
        return (
          (C.toString = function () {
            return T;
          }),
          C
        );
      }
      function u(e, t) {
        var r = e;
        return (
          g.isString(e)
            ? v.Easings[e] || (r = !1)
            : (r =
                g.isArray(e) && 1 === e.length
                  ? s.apply(null, e)
                  : g.isArray(e) && 2 === e.length
                  ? b.apply(null, e.concat([t]))
                  : g.isArray(e) && 4 === e.length
                  ? l.apply(null, e)
                  : !1),
          r === !1 &&
            (r = v.Easings[v.defaults.easing] ? v.defaults.easing : h),
          r
        );
      }
      function c(e) {
        if (e) {
          var t = new Date().getTime(),
            r = v.State.calls.length;
          r > 1e4 && (v.State.calls = n(v.State.calls));
          for (var o = 0; r > o; o++)
            if (v.State.calls[o]) {
              var s = v.State.calls[o],
                l = s[0],
                u = s[2],
                f = s[3],
                d = !!f,
                m = null;
              f || (f = v.State.calls[o][3] = t - 16);
              for (
                var y = Math.min((t - f) / u.duration, 1), h = 0, b = l.length;
                b > h;
                h++
              ) {
                var S = l[h],
                  w = S.element;
                if (i(w)) {
                  var V = !1;
                  if (
                    u.display !== a &&
                    null !== u.display &&
                    'none' !== u.display
                  ) {
                    if ('flex' === u.display) {
                      var C = [
                        '-webkit-box',
                        '-moz-box',
                        '-ms-flexbox',
                        '-webkit-flex',
                      ];
                      $.each(C, function (e, t) {
                        x.setPropertyValue(w, 'display', t);
                      });
                    }
                    x.setPropertyValue(w, 'display', u.display);
                  }
                  u.visibility !== a &&
                    'hidden' !== u.visibility &&
                    x.setPropertyValue(w, 'visibility', u.visibility);
                  for (var T in S)
                    if ('element' !== T) {
                      var k = S[T],
                        A,
                        F = g.isString(k.easing)
                          ? v.Easings[k.easing]
                          : k.easing;
                      if (1 === y) A = k.endValue;
                      else {
                        var E = k.endValue - k.startValue;
                        if (
                          ((A = k.startValue + E * F(y, u, E)),
                          !d && A === k.currentValue)
                        )
                          continue;
                      }
                      if (((k.currentValue = A), 'tween' === T)) m = A;
                      else {
                        if (x.Hooks.registered[T]) {
                          var j = x.Hooks.getRoot(T),
                            H = i(w).rootPropertyValueCache[j];
                          H && (k.rootPropertyValue = H);
                        }
                        var N = x.setPropertyValue(
                          w,
                          T,
                          k.currentValue +
                            (0 === parseFloat(A) ? '' : k.unitType),
                          k.rootPropertyValue,
                          k.scrollData
                        );
                        x.Hooks.registered[T] &&
                          (i(w).rootPropertyValueCache[j] = x.Normalizations
                            .registered[j]
                            ? x.Normalizations.registered[j](
                                'extract',
                                null,
                                N[1]
                              )
                            : N[1]),
                          'transform' === N[0] && (V = !0);
                      }
                    }
                  u.mobileHA &&
                    i(w).transformCache.translate3d === a &&
                    ((i(w).transformCache.translate3d = '(0px, 0px, 0px)'),
                    (V = !0)),
                    V && x.flushTransformCache(w);
                }
              }
              u.display !== a &&
                'none' !== u.display &&
                (v.State.calls[o][2].display = !1),
                u.visibility !== a &&
                  'hidden' !== u.visibility &&
                  (v.State.calls[o][2].visibility = !1),
                u.progress &&
                  u.progress.call(
                    s[1],
                    s[1],
                    y,
                    Math.max(0, f + u.duration - t),
                    f,
                    m
                  ),
                1 === y && p(o);
            }
        }
        v.State.isTicking && P(c);
      }
      function p(e, t) {
        if (!v.State.calls[e]) return !1;
        for (
          var r = v.State.calls[e][0],
            n = v.State.calls[e][1],
            o = v.State.calls[e][2],
            s = v.State.calls[e][4],
            l = !1,
            u = 0,
            c = r.length;
          c > u;
          u++
        ) {
          var p = r[u].element;
          if (
            (t ||
              o.loop ||
              ('none' === o.display &&
                x.setPropertyValue(p, 'display', o.display),
              'hidden' === o.visibility &&
                x.setPropertyValue(p, 'visibility', o.visibility)),
            o.loop !== !0 &&
              ($.queue(p)[1] === a ||
                !/\.velocityQueueEntryFlag/i.test($.queue(p)[1])) &&
              i(p))
          ) {
            (i(p).isAnimating = !1), (i(p).rootPropertyValueCache = {});
            var f = !1;
            $.each(x.Lists.transforms3D, function (e, t) {
              var r = /^scale/.test(t) ? 1 : 0,
                n = i(p).transformCache[t];
              i(p).transformCache[t] !== a &&
                new RegExp('^\\(' + r + '[^.]').test(n) &&
                ((f = !0), delete i(p).transformCache[t]);
            }),
              o.mobileHA && ((f = !0), delete i(p).transformCache.translate3d),
              f && x.flushTransformCache(p),
              x.Values.removeClass(p, 'velocity-animating');
          }
          if (!t && o.complete && !o.loop && u === c - 1)
            try {
              o.complete.call(n, n);
            } catch (d) {
              setTimeout(function () {
                throw d;
              }, 1);
            }
          s && o.loop !== !0 && s(n),
            i(p) &&
              o.loop === !0 &&
              !t &&
              ($.each(i(p).tweensContainer, function (e, t) {
                /^rotate/.test(e) &&
                  360 === parseFloat(t.endValue) &&
                  ((t.endValue = 0), (t.startValue = 360)),
                  /^backgroundPosition/.test(e) &&
                    100 === parseFloat(t.endValue) &&
                    '%' === t.unitType &&
                    ((t.endValue = 0), (t.startValue = 100));
              }),
              v(p, 'reverse', { loop: !0, delay: o.delay })),
            o.queue !== !1 && $.dequeue(p, o.queue);
        }
        v.State.calls[e] = !1;
        for (var g = 0, m = v.State.calls.length; m > g; g++)
          if (v.State.calls[g] !== !1) {
            l = !0;
            break;
          }
        l === !1 &&
          ((v.State.isTicking = !1),
          delete v.State.calls,
          (v.State.calls = []));
      }
      var f = (function () {
          if (r.documentMode) return r.documentMode;
          for (var e = 7; e > 4; e--) {
            var t = r.createElement('div');
            if (
              ((t.innerHTML =
                '<!--[if IE ' + e + ']><span></span><![endif]-->'),
              t.getElementsByTagName('span').length)
            )
              return (t = null), e;
          }
          return a;
        })(),
        d = (function () {
          var e = 0;
          return (
            t.webkitRequestAnimationFrame ||
            t.mozRequestAnimationFrame ||
            function (t) {
              var r = new Date().getTime(),
                a;
              return (
                (a = Math.max(0, 16 - (r - e))),
                (e = r + a),
                setTimeout(function () {
                  t(r + a);
                }, a)
              );
            }
          );
        })(),
        g = {
          isString: function (e) {
            return 'string' == typeof e;
          },
          isArray:
            Array.isArray ||
            function (e) {
              return '[object Array]' === Object.prototype.toString.call(e);
            },
          isFunction: function (e) {
            return '[object Function]' === Object.prototype.toString.call(e);
          },
          isNode: function (e) {
            return e && e.nodeType;
          },
          isNodeList: function (e) {
            return (
              'object' == typeof e &&
              /^\[object (HTMLCollection|NodeList|Object)\]$/.test(
                Object.prototype.toString.call(e)
              ) &&
              e.length !== a &&
              (0 === e.length || ('object' == typeof e[0] && e[0].nodeType > 0))
            );
          },
          isWrapped: function (e) {
            return e && (e.jquery || (t.Zepto && t.Zepto.zepto.isZ(e)));
          },
          isSVG: function (e) {
            return t.SVGElement && e instanceof t.SVGElement;
          },
          isEmptyObject: function (e) {
            for (var t in e) return !1;
            return !0;
          },
        },
        $,
        m = !1;
      if (
        (e.fn && e.fn.jquery ? (($ = e), (m = !0)) : ($ = t.Velocity.Utilities),
        8 >= f && !m)
      )
        throw new Error(
          'Velocity: IE8 and below require jQuery to be loaded before Velocity.'
        );
      if (7 >= f) return void (jQuery.fn.velocity = jQuery.fn.animate);
      var y = 400,
        h = 'swing',
        v = {
          State: {
            isMobile:
              /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
              ),
            isAndroid: /Android/i.test(navigator.userAgent),
            isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
            isChrome: t.chrome,
            isFirefox: /Firefox/i.test(navigator.userAgent),
            prefixElement: r.createElement('div'),
            prefixMatches: {},
            scrollAnchor: null,
            scrollPropertyLeft: null,
            scrollPropertyTop: null,
            isTicking: !1,
            calls: [],
          },
          CSS: {},
          Utilities: $,
          Redirects: {},
          Easings: {},
          Promise: t.Promise,
          defaults: {
            queue: '',
            duration: y,
            easing: h,
            begin: a,
            complete: a,
            progress: a,
            display: a,
            visibility: a,
            loop: !1,
            delay: !1,
            mobileHA: !0,
            _cacheValues: !0,
          },
          init: function (e) {
            $.data(e, 'velocity', {
              isSVG: g.isSVG(e),
              isAnimating: !1,
              computedStyle: null,
              tweensContainer: null,
              rootPropertyValueCache: {},
              transformCache: {},
            });
          },
          hook: null,
          mock: !1,
          version: { major: 1, minor: 2, patch: 2 },
          debug: !1,
        };
      t.pageYOffset !== a
        ? ((v.State.scrollAnchor = t),
          (v.State.scrollPropertyLeft = 'pageXOffset'),
          (v.State.scrollPropertyTop = 'pageYOffset'))
        : ((v.State.scrollAnchor =
            r.documentElement || r.body.parentNode || r.body),
          (v.State.scrollPropertyLeft = 'scrollLeft'),
          (v.State.scrollPropertyTop = 'scrollTop'));
      var b = (function () {
        function e(e) {
          return -e.tension * e.x - e.friction * e.v;
        }
        function t(t, r, a) {
          var n = {
            x: t.x + a.dx * r,
            v: t.v + a.dv * r,
            tension: t.tension,
            friction: t.friction,
          };
          return { dx: n.v, dv: e(n) };
        }
        function r(r, a) {
          var n = { dx: r.v, dv: e(r) },
            o = t(r, 0.5 * a, n),
            i = t(r, 0.5 * a, o),
            s = t(r, a, i),
            l = (1 / 6) * (n.dx + 2 * (o.dx + i.dx) + s.dx),
            u = (1 / 6) * (n.dv + 2 * (o.dv + i.dv) + s.dv);
          return (r.x = r.x + l * a), (r.v = r.v + u * a), r;
        }
        return function a(e, t, n) {
          var o = { x: -1, v: 0, tension: null, friction: null },
            i = [0],
            s = 0,
            l = 1e-4,
            u = 0.016,
            c,
            p,
            f;
          for (
            e = parseFloat(e) || 500,
              t = parseFloat(t) || 20,
              n = n || null,
              o.tension = e,
              o.friction = t,
              c = null !== n,
              c ? ((s = a(e, t)), (p = (s / n) * u)) : (p = u);
            ;

          )
            if (
              ((f = r(f || o, p)),
              i.push(1 + f.x),
              (s += 16),
              !(Math.abs(f.x) > l && Math.abs(f.v) > l))
            )
              break;
          return c
            ? function (e) {
                return i[(e * (i.length - 1)) | 0];
              }
            : s;
        };
      })();
      (v.Easings = {
        linear: function (e) {
          return e;
        },
        swing: function (e) {
          return 0.5 - Math.cos(e * Math.PI) / 2;
        },
        spring: function (e) {
          return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e);
        },
      }),
        $.each(
          [
            ['ease', [0.25, 0.1, 0.25, 1]],
            ['ease-in', [0.42, 0, 1, 1]],
            ['ease-out', [0, 0, 0.58, 1]],
            ['ease-in-out', [0.42, 0, 0.58, 1]],
            ['easeInSine', [0.47, 0, 0.745, 0.715]],
            ['easeOutSine', [0.39, 0.575, 0.565, 1]],
            ['easeInOutSine', [0.445, 0.05, 0.55, 0.95]],
            ['easeInQuad', [0.55, 0.085, 0.68, 0.53]],
            ['easeOutQuad', [0.25, 0.46, 0.45, 0.94]],
            ['easeInOutQuad', [0.455, 0.03, 0.515, 0.955]],
            ['easeInCubic', [0.55, 0.055, 0.675, 0.19]],
            ['easeOutCubic', [0.215, 0.61, 0.355, 1]],
            ['easeInOutCubic', [0.645, 0.045, 0.355, 1]],
            ['easeInQuart', [0.895, 0.03, 0.685, 0.22]],
            ['easeOutQuart', [0.165, 0.84, 0.44, 1]],
            ['easeInOutQuart', [0.77, 0, 0.175, 1]],
            ['easeInQuint', [0.755, 0.05, 0.855, 0.06]],
            ['easeOutQuint', [0.23, 1, 0.32, 1]],
            ['easeInOutQuint', [0.86, 0, 0.07, 1]],
            ['easeInExpo', [0.95, 0.05, 0.795, 0.035]],
            ['easeOutExpo', [0.19, 1, 0.22, 1]],
            ['easeInOutExpo', [1, 0, 0, 1]],
            ['easeInCirc', [0.6, 0.04, 0.98, 0.335]],
            ['easeOutCirc', [0.075, 0.82, 0.165, 1]],
            ['easeInOutCirc', [0.785, 0.135, 0.15, 0.86]],
          ],
          function (e, t) {
            v.Easings[t[0]] = l.apply(null, t[1]);
          }
        );
      var x = (v.CSS = {
        RegEx: {
          isHex: /^#([A-f\d]{3}){1,2}$/i,
          valueUnwrap: /^[A-z]+\((.*)\)$/i,
          wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
          valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi,
        },
        Lists: {
          colors: [
            'fill',
            'stroke',
            'stopColor',
            'color',
            'backgroundColor',
            'borderColor',
            'borderTopColor',
            'borderRightColor',
            'borderBottomColor',
            'borderLeftColor',
            'outlineColor',
          ],
          transformsBase: [
            'translateX',
            'translateY',
            'scale',
            'scaleX',
            'scaleY',
            'skewX',
            'skewY',
            'rotateZ',
          ],
          transforms3D: [
            'transformPerspective',
            'translateZ',
            'scaleZ',
            'rotateX',
            'rotateY',
          ],
        },
        Hooks: {
          templates: {
            textShadow: ['Color X Y Blur', 'black 0px 0px 0px'],
            boxShadow: ['Color X Y Blur Spread', 'black 0px 0px 0px 0px'],
            clip: ['Top Right Bottom Left', '0px 0px 0px 0px'],
            backgroundPosition: ['X Y', '0% 0%'],
            transformOrigin: ['X Y Z', '50% 50% 0px'],
            perspectiveOrigin: ['X Y', '50% 50%'],
          },
          registered: {},
          register: function () {
            for (var e = 0; e < x.Lists.colors.length; e++) {
              var t =
                'color' === x.Lists.colors[e] ? '0 0 0 1' : '255 255 255 1';
              x.Hooks.templates[x.Lists.colors[e]] = [
                'Red Green Blue Alpha',
                t,
              ];
            }
            var r, a, n;
            if (f)
              for (r in x.Hooks.templates) {
                (a = x.Hooks.templates[r]), (n = a[0].split(' '));
                var o = a[1].match(x.RegEx.valueSplit);
                'Color' === n[0] &&
                  (n.push(n.shift()),
                  o.push(o.shift()),
                  (x.Hooks.templates[r] = [n.join(' '), o.join(' ')]));
              }
            for (r in x.Hooks.templates) {
              (a = x.Hooks.templates[r]), (n = a[0].split(' '));
              for (var e in n) {
                var i = r + n[e],
                  s = e;
                x.Hooks.registered[i] = [r, s];
              }
            }
          },
          getRoot: function (e) {
            var t = x.Hooks.registered[e];
            return t ? t[0] : e;
          },
          cleanRootPropertyValue: function (e, t) {
            return (
              x.RegEx.valueUnwrap.test(t) &&
                (t = t.match(x.RegEx.valueUnwrap)[1]),
              x.Values.isCSSNullValue(t) && (t = x.Hooks.templates[e][1]),
              t
            );
          },
          extractValue: function (e, t) {
            var r = x.Hooks.registered[e];
            if (r) {
              var a = r[0],
                n = r[1];
              return (
                (t = x.Hooks.cleanRootPropertyValue(a, t)),
                t.toString().match(x.RegEx.valueSplit)[n]
              );
            }
            return t;
          },
          injectValue: function (e, t, r) {
            var a = x.Hooks.registered[e];
            if (a) {
              var n = a[0],
                o = a[1],
                i,
                s;
              return (
                (r = x.Hooks.cleanRootPropertyValue(n, r)),
                (i = r.toString().match(x.RegEx.valueSplit)),
                (i[o] = t),
                (s = i.join(' '))
              );
            }
            return r;
          },
        },
        Normalizations: {
          registered: {
            clip: function (e, t, r) {
              switch (e) {
                case 'name':
                  return 'clip';
                case 'extract':
                  var a;
                  return (
                    x.RegEx.wrappedValueAlreadyExtracted.test(r)
                      ? (a = r)
                      : ((a = r.toString().match(x.RegEx.valueUnwrap)),
                        (a = a ? a[1].replace(/,(\s+)?/g, ' ') : r)),
                    a
                  );
                case 'inject':
                  return 'rect(' + r + ')';
              }
            },
            blur: function (e, t, r) {
              switch (e) {
                case 'name':
                  return v.State.isFirefox ? 'filter' : '-webkit-filter';
                case 'extract':
                  var a = parseFloat(r);
                  if (!a && 0 !== a) {
                    var n = r.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                    a = n ? n[1] : 0;
                  }
                  return a;
                case 'inject':
                  return parseFloat(r) ? 'blur(' + r + ')' : 'none';
              }
            },
            opacity: function (e, t, r) {
              if (8 >= f)
                switch (e) {
                  case 'name':
                    return 'filter';
                  case 'extract':
                    var a = r.toString().match(/alpha\(opacity=(.*)\)/i);
                    return (r = a ? a[1] / 100 : 1);
                  case 'inject':
                    return (
                      (t.style.zoom = 1),
                      parseFloat(r) >= 1
                        ? ''
                        : 'alpha(opacity=' +
                          parseInt(100 * parseFloat(r), 10) +
                          ')'
                    );
                }
              else
                switch (e) {
                  case 'name':
                    return 'opacity';
                  case 'extract':
                    return r;
                  case 'inject':
                    return r;
                }
            },
          },
          register: function () {
            9 >= f ||
              v.State.isGingerbread ||
              (x.Lists.transformsBase = x.Lists.transformsBase.concat(
                x.Lists.transforms3D
              ));
            for (var e = 0; e < x.Lists.transformsBase.length; e++)
              !(function () {
                var t = x.Lists.transformsBase[e];
                x.Normalizations.registered[t] = function (e, r, n) {
                  switch (e) {
                    case 'name':
                      return 'transform';
                    case 'extract':
                      return i(r) === a || i(r).transformCache[t] === a
                        ? /^scale/i.test(t)
                          ? 1
                          : 0
                        : i(r).transformCache[t].replace(/[()]/g, '');
                    case 'inject':
                      var o = !1;
                      switch (t.substr(0, t.length - 1)) {
                        case 'translate':
                          o = !/(%|px|em|rem|vw|vh|\d)$/i.test(n);
                          break;
                        case 'scal':
                        case 'scale':
                          v.State.isAndroid &&
                            i(r).transformCache[t] === a &&
                            1 > n &&
                            (n = 1),
                            (o = !/(\d)$/i.test(n));
                          break;
                        case 'skew':
                          o = !/(deg|\d)$/i.test(n);
                          break;
                        case 'rotate':
                          o = !/(deg|\d)$/i.test(n);
                      }
                      return (
                        o || (i(r).transformCache[t] = '(' + n + ')'),
                        i(r).transformCache[t]
                      );
                  }
                };
              })();
            for (var e = 0; e < x.Lists.colors.length; e++)
              !(function () {
                var t = x.Lists.colors[e];
                x.Normalizations.registered[t] = function (e, r, n) {
                  switch (e) {
                    case 'name':
                      return t;
                    case 'extract':
                      var o;
                      if (x.RegEx.wrappedValueAlreadyExtracted.test(n)) o = n;
                      else {
                        var i,
                          s = {
                            black: 'rgb(0, 0, 0)',
                            blue: 'rgb(0, 0, 255)',
                            gray: 'rgb(128, 128, 128)',
                            green: 'rgb(0, 128, 0)',
                            red: 'rgb(255, 0, 0)',
                            white: 'rgb(255, 255, 255)',
                          };
                        /^[A-z]+$/i.test(n)
                          ? (i = s[n] !== a ? s[n] : s.black)
                          : x.RegEx.isHex.test(n)
                          ? (i = 'rgb(' + x.Values.hexToRgb(n).join(' ') + ')')
                          : /^rgba?\(/i.test(n) || (i = s.black),
                          (o = (i || n)
                            .toString()
                            .match(x.RegEx.valueUnwrap)[1]
                            .replace(/,(\s+)?/g, ' '));
                      }
                      return (
                        8 >= f || 3 !== o.split(' ').length || (o += ' 1'), o
                      );
                    case 'inject':
                      return (
                        8 >= f
                          ? 4 === n.split(' ').length &&
                            (n = n.split(/\s+/).slice(0, 3).join(' '))
                          : 3 === n.split(' ').length && (n += ' 1'),
                        (8 >= f ? 'rgb' : 'rgba') +
                          '(' +
                          n.replace(/\s+/g, ',').replace(/\.(\d)+(?=,)/g, '') +
                          ')'
                      );
                  }
                };
              })();
          },
        },
        Names: {
          camelCase: function (e) {
            return e.replace(/-(\w)/g, function (e, t) {
              return t.toUpperCase();
            });
          },
          SVGAttribute: function (e) {
            var t = 'width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2';
            return (
              (f || (v.State.isAndroid && !v.State.isChrome)) &&
                (t += '|transform'),
              new RegExp('^(' + t + ')$', 'i').test(e)
            );
          },
          prefixCheck: function (e) {
            if (v.State.prefixMatches[e]) return [v.State.prefixMatches[e], !0];
            for (
              var t = ['', 'Webkit', 'Moz', 'ms', 'O'], r = 0, a = t.length;
              a > r;
              r++
            ) {
              var n;
              if (
                ((n =
                  0 === r
                    ? e
                    : t[r] +
                      e.replace(/^\w/, function (e) {
                        return e.toUpperCase();
                      })),
                g.isString(v.State.prefixElement.style[n]))
              )
                return (v.State.prefixMatches[e] = n), [n, !0];
            }
            return [e, !1];
          },
        },
        Values: {
          hexToRgb: function (e) {
            var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
              r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
              a;
            return (
              (e = e.replace(t, function (e, t, r, a) {
                return t + t + r + r + a + a;
              })),
              (a = r.exec(e)),
              a
                ? [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)]
                : [0, 0, 0]
            );
          },
          isCSSNullValue: function (e) {
            return (
              0 == e ||
              /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)
            );
          },
          getUnitType: function (e) {
            return /^(rotate|skew)/i.test(e)
              ? 'deg'
              : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(
                  e
                )
              ? ''
              : 'px';
          },
          getDisplayType: function (e) {
            var t = e && e.tagName.toString().toLowerCase();
            return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(
              t
            )
              ? 'inline'
              : /^(li)$/i.test(t)
              ? 'list-item'
              : /^(tr)$/i.test(t)
              ? 'table-row'
              : /^(table)$/i.test(t)
              ? 'table'
              : /^(tbody)$/i.test(t)
              ? 'table-row-group'
              : 'block';
          },
          addClass: function (e, t) {
            e.classList
              ? e.classList.add(t)
              : (e.className += (e.className.length ? ' ' : '') + t);
          },
          removeClass: function (e, t) {
            e.classList
              ? e.classList.remove(t)
              : (e.className = e.className
                  .toString()
                  .replace(
                    new RegExp(
                      '(^|\\s)' + t.split(' ').join('|') + '(\\s|$)',
                      'gi'
                    ),
                    ' '
                  ));
          },
        },
        getPropertyValue: function (e, r, n, o) {
          function s(e, r) {
            function n() {
              u && x.setPropertyValue(e, 'display', 'none');
            }
            var l = 0;
            if (8 >= f) l = $.css(e, r);
            else {
              var u = !1;
              if (
                (/^(width|height)$/.test(r) &&
                  0 === x.getPropertyValue(e, 'display') &&
                  ((u = !0),
                  x.setPropertyValue(e, 'display', x.Values.getDisplayType(e))),
                !o)
              ) {
                if (
                  'height' === r &&
                  'border-box' !==
                    x.getPropertyValue(e, 'boxSizing').toString().toLowerCase()
                ) {
                  var c =
                    e.offsetHeight -
                    (parseFloat(x.getPropertyValue(e, 'borderTopWidth')) || 0) -
                    (parseFloat(x.getPropertyValue(e, 'borderBottomWidth')) ||
                      0) -
                    (parseFloat(x.getPropertyValue(e, 'paddingTop')) || 0) -
                    (parseFloat(x.getPropertyValue(e, 'paddingBottom')) || 0);
                  return n(), c;
                }
                if (
                  'width' === r &&
                  'border-box' !==
                    x.getPropertyValue(e, 'boxSizing').toString().toLowerCase()
                ) {
                  var p =
                    e.offsetWidth -
                    (parseFloat(x.getPropertyValue(e, 'borderLeftWidth')) ||
                      0) -
                    (parseFloat(x.getPropertyValue(e, 'borderRightWidth')) ||
                      0) -
                    (parseFloat(x.getPropertyValue(e, 'paddingLeft')) || 0) -
                    (parseFloat(x.getPropertyValue(e, 'paddingRight')) || 0);
                  return n(), p;
                }
              }
              var d;
              (d =
                i(e) === a
                  ? t.getComputedStyle(e, null)
                  : i(e).computedStyle
                  ? i(e).computedStyle
                  : (i(e).computedStyle = t.getComputedStyle(e, null))),
                'borderColor' === r && (r = 'borderTopColor'),
                (l = 9 === f && 'filter' === r ? d.getPropertyValue(r) : d[r]),
                ('' === l || null === l) && (l = e.style[r]),
                n();
            }
            if ('auto' === l && /^(top|right|bottom|left)$/i.test(r)) {
              var g = s(e, 'position');
              ('fixed' === g || ('absolute' === g && /top|left/i.test(r))) &&
                (l = $(e).position()[r] + 'px');
            }
            return l;
          }
          var l;
          if (x.Hooks.registered[r]) {
            var u = r,
              c = x.Hooks.getRoot(u);
            n === a && (n = x.getPropertyValue(e, x.Names.prefixCheck(c)[0])),
              x.Normalizations.registered[c] &&
                (n = x.Normalizations.registered[c]('extract', e, n)),
              (l = x.Hooks.extractValue(u, n));
          } else if (x.Normalizations.registered[r]) {
            var p, d;
            (p = x.Normalizations.registered[r]('name', e)),
              'transform' !== p &&
                ((d = s(e, x.Names.prefixCheck(p)[0])),
                x.Values.isCSSNullValue(d) &&
                  x.Hooks.templates[r] &&
                  (d = x.Hooks.templates[r][1])),
              (l = x.Normalizations.registered[r]('extract', e, d));
          }
          if (!/^[\d-]/.test(l))
            if (i(e) && i(e).isSVG && x.Names.SVGAttribute(r))
              if (/^(height|width)$/i.test(r))
                try {
                  l = e.getBBox()[r];
                } catch (g) {
                  l = 0;
                }
              else l = e.getAttribute(r);
            else l = s(e, x.Names.prefixCheck(r)[0]);
          return (
            x.Values.isCSSNullValue(l) && (l = 0),
            v.debug >= 2 && console.log('Get ' + r + ': ' + l),
            l
          );
        },
        setPropertyValue: function (e, r, a, n, o) {
          var s = r;
          if ('scroll' === r)
            o.container
              ? (o.container['scroll' + o.direction] = a)
              : 'Left' === o.direction
              ? t.scrollTo(a, o.alternateValue)
              : t.scrollTo(o.alternateValue, a);
          else if (
            x.Normalizations.registered[r] &&
            'transform' === x.Normalizations.registered[r]('name', e)
          )
            x.Normalizations.registered[r]('inject', e, a),
              (s = 'transform'),
              (a = i(e).transformCache[r]);
          else {
            if (x.Hooks.registered[r]) {
              var l = r,
                u = x.Hooks.getRoot(r);
              (n = n || x.getPropertyValue(e, u)),
                (a = x.Hooks.injectValue(l, a, n)),
                (r = u);
            }
            if (
              (x.Normalizations.registered[r] &&
                ((a = x.Normalizations.registered[r]('inject', e, a)),
                (r = x.Normalizations.registered[r]('name', e))),
              (s = x.Names.prefixCheck(r)[0]),
              8 >= f)
            )
              try {
                e.style[s] = a;
              } catch (c) {
                v.debug &&
                  console.log(
                    'Browser does not support [' + a + '] for [' + s + ']'
                  );
              }
            else
              i(e) && i(e).isSVG && x.Names.SVGAttribute(r)
                ? e.setAttribute(r, a)
                : (e.style[s] = a);
            v.debug >= 2 && console.log('Set ' + r + ' (' + s + '): ' + a);
          }
          return [s, a];
        },
        flushTransformCache: function (e) {
          function t(t) {
            return parseFloat(x.getPropertyValue(e, t));
          }
          var r = '';
          if ((f || (v.State.isAndroid && !v.State.isChrome)) && i(e).isSVG) {
            var a = {
              translate: [t('translateX'), t('translateY')],
              skewX: [t('skewX')],
              skewY: [t('skewY')],
              scale:
                1 !== t('scale')
                  ? [t('scale'), t('scale')]
                  : [t('scaleX'), t('scaleY')],
              rotate: [t('rotateZ'), 0, 0],
            };
            $.each(i(e).transformCache, function (e) {
              /^translate/i.test(e)
                ? (e = 'translate')
                : /^scale/i.test(e)
                ? (e = 'scale')
                : /^rotate/i.test(e) && (e = 'rotate'),
                a[e] && ((r += e + '(' + a[e].join(' ') + ') '), delete a[e]);
            });
          } else {
            var n, o;
            $.each(i(e).transformCache, function (t) {
              return (
                (n = i(e).transformCache[t]),
                'transformPerspective' === t
                  ? ((o = n), !0)
                  : (9 === f && 'rotateZ' === t && (t = 'rotate'),
                    void (r += t + n + ' '))
              );
            }),
              o && (r = 'perspective' + o + ' ' + r);
          }
          x.setPropertyValue(e, 'transform', r);
        },
      });
      x.Hooks.register(),
        x.Normalizations.register(),
        (v.hook = function (e, t, r) {
          var n = a;
          return (
            (e = o(e)),
            $.each(e, function (e, o) {
              if ((i(o) === a && v.init(o), r === a))
                n === a && (n = v.CSS.getPropertyValue(o, t));
              else {
                var s = v.CSS.setPropertyValue(o, t, r);
                'transform' === s[0] && v.CSS.flushTransformCache(o), (n = s);
              }
            }),
            n
          );
        });
      var S = function () {
        function e() {
          return l ? T.promise || null : f;
        }
        function n() {
          function e(e) {
            function p(e, t) {
              var r = a,
                i = a,
                s = a;
              return (
                g.isArray(e)
                  ? ((r = e[0]),
                    (!g.isArray(e[1]) && /^[\d-]/.test(e[1])) ||
                    g.isFunction(e[1]) ||
                    x.RegEx.isHex.test(e[1])
                      ? (s = e[1])
                      : ((g.isString(e[1]) && !x.RegEx.isHex.test(e[1])) ||
                          g.isArray(e[1])) &&
                        ((i = t ? e[1] : u(e[1], o.duration)),
                        e[2] !== a && (s = e[2])))
                  : (r = e),
                t || (i = i || o.easing),
                g.isFunction(r) && (r = r.call(n, w, P)),
                g.isFunction(s) && (s = s.call(n, w, P)),
                [r || 0, i, s]
              );
            }
            function f(e, t) {
              var r, a;
              return (
                (a = (t || '0')
                  .toString()
                  .toLowerCase()
                  .replace(/[%A-z]+$/, function (e) {
                    return (r = e), '';
                  })),
                r || (r = x.Values.getUnitType(e)),
                [a, r]
              );
            }
            function d() {
              var e = {
                  myParent: n.parentNode || r.body,
                  position: x.getPropertyValue(n, 'position'),
                  fontSize: x.getPropertyValue(n, 'fontSize'),
                },
                a =
                  e.position === N.lastPosition && e.myParent === N.lastParent,
                o = e.fontSize === N.lastFontSize;
              (N.lastParent = e.myParent),
                (N.lastPosition = e.position),
                (N.lastFontSize = e.fontSize);
              var s = 100,
                l = {};
              if (o && a)
                (l.emToPx = N.lastEmToPx),
                  (l.percentToPxWidth = N.lastPercentToPxWidth),
                  (l.percentToPxHeight = N.lastPercentToPxHeight);
              else {
                var u = i(n).isSVG
                  ? r.createElementNS('http://www.w3.org/2000/svg', 'rect')
                  : r.createElement('div');
                v.init(u),
                  e.myParent.appendChild(u),
                  $.each(
                    ['overflow', 'overflowX', 'overflowY'],
                    function (e, t) {
                      v.CSS.setPropertyValue(u, t, 'hidden');
                    }
                  ),
                  v.CSS.setPropertyValue(u, 'position', e.position),
                  v.CSS.setPropertyValue(u, 'fontSize', e.fontSize),
                  v.CSS.setPropertyValue(u, 'boxSizing', 'content-box'),
                  $.each(
                    [
                      'minWidth',
                      'maxWidth',
                      'width',
                      'minHeight',
                      'maxHeight',
                      'height',
                    ],
                    function (e, t) {
                      v.CSS.setPropertyValue(u, t, s + '%');
                    }
                  ),
                  v.CSS.setPropertyValue(u, 'paddingLeft', s + 'em'),
                  (l.percentToPxWidth = N.lastPercentToPxWidth =
                    (parseFloat(x.getPropertyValue(u, 'width', null, !0)) ||
                      1) / s),
                  (l.percentToPxHeight = N.lastPercentToPxHeight =
                    (parseFloat(x.getPropertyValue(u, 'height', null, !0)) ||
                      1) / s),
                  (l.emToPx = N.lastEmToPx =
                    (parseFloat(x.getPropertyValue(u, 'paddingLeft')) || 1) /
                    s),
                  e.myParent.removeChild(u);
              }
              return (
                null === N.remToPx &&
                  (N.remToPx =
                    parseFloat(x.getPropertyValue(r.body, 'fontSize')) || 16),
                null === N.vwToPx &&
                  ((N.vwToPx = parseFloat(t.innerWidth) / 100),
                  (N.vhToPx = parseFloat(t.innerHeight) / 100)),
                (l.remToPx = N.remToPx),
                (l.vwToPx = N.vwToPx),
                (l.vhToPx = N.vhToPx),
                v.debug >= 1 &&
                  console.log('Unit ratios: ' + JSON.stringify(l), n),
                l
              );
            }
            if (o.begin && 0 === w)
              try {
                o.begin.call(m, m);
              } catch (y) {
                setTimeout(function () {
                  throw y;
                }, 1);
              }
            if ('scroll' === k) {
              var S = /^x$/i.test(o.axis) ? 'Left' : 'Top',
                V = parseFloat(o.offset) || 0,
                C,
                A,
                F;
              o.container
                ? g.isWrapped(o.container) || g.isNode(o.container)
                  ? ((o.container = o.container[0] || o.container),
                    (C = o.container['scroll' + S]),
                    (F = C + $(n).position()[S.toLowerCase()] + V))
                  : (o.container = null)
                : ((C = v.State.scrollAnchor[v.State['scrollProperty' + S]]),
                  (A =
                    v.State.scrollAnchor[
                      v.State[
                        'scrollProperty' + ('Left' === S ? 'Top' : 'Left')
                      ]
                    ]),
                  (F = $(n).offset()[S.toLowerCase()] + V)),
                (s = {
                  scroll: {
                    rootPropertyValue: !1,
                    startValue: C,
                    currentValue: C,
                    endValue: F,
                    unitType: '',
                    easing: o.easing,
                    scrollData: {
                      container: o.container,
                      direction: S,
                      alternateValue: A,
                    },
                  },
                  element: n,
                }),
                v.debug &&
                  console.log('tweensContainer (scroll): ', s.scroll, n);
            } else if ('reverse' === k) {
              if (!i(n).tweensContainer) return void $.dequeue(n, o.queue);
              'none' === i(n).opts.display && (i(n).opts.display = 'auto'),
                'hidden' === i(n).opts.visibility &&
                  (i(n).opts.visibility = 'visible'),
                (i(n).opts.loop = !1),
                (i(n).opts.begin = null),
                (i(n).opts.complete = null),
                b.easing || delete o.easing,
                b.duration || delete o.duration,
                (o = $.extend({}, i(n).opts, o));
              var E = $.extend(!0, {}, i(n).tweensContainer);
              for (var j in E)
                if ('element' !== j) {
                  var H = E[j].startValue;
                  (E[j].startValue = E[j].currentValue = E[j].endValue),
                    (E[j].endValue = H),
                    g.isEmptyObject(b) || (E[j].easing = o.easing),
                    v.debug &&
                      console.log(
                        'reverse tweensContainer (' +
                          j +
                          '): ' +
                          JSON.stringify(E[j]),
                        n
                      );
                }
              s = E;
            } else if ('start' === k) {
              var E;
              i(n).tweensContainer &&
                i(n).isAnimating === !0 &&
                (E = i(n).tweensContainer),
                $.each(h, function (e, t) {
                  if (RegExp('^' + x.Lists.colors.join('$|^') + '$').test(e)) {
                    var r = p(t, !0),
                      n = r[0],
                      o = r[1],
                      i = r[2];
                    if (x.RegEx.isHex.test(n)) {
                      for (
                        var s = ['Red', 'Green', 'Blue'],
                          l = x.Values.hexToRgb(n),
                          u = i ? x.Values.hexToRgb(i) : a,
                          c = 0;
                        c < s.length;
                        c++
                      ) {
                        var f = [l[c]];
                        o && f.push(o),
                          u !== a && f.push(u[c]),
                          (h[e + s[c]] = f);
                      }
                      delete h[e];
                    }
                  }
                });
              for (var R in h) {
                var O = p(h[R]),
                  z = O[0],
                  q = O[1],
                  M = O[2];
                R = x.Names.camelCase(R);
                var I = x.Hooks.getRoot(R),
                  B = !1;
                if (
                  i(n).isSVG ||
                  'tween' === I ||
                  x.Names.prefixCheck(I)[1] !== !1 ||
                  x.Normalizations.registered[I] !== a
                ) {
                  ((o.display !== a &&
                    null !== o.display &&
                    'none' !== o.display) ||
                    (o.visibility !== a && 'hidden' !== o.visibility)) &&
                    /opacity|filter/.test(R) &&
                    !M &&
                    0 !== z &&
                    (M = 0),
                    o._cacheValues && E && E[R]
                      ? (M === a && (M = E[R].endValue + E[R].unitType),
                        (B = i(n).rootPropertyValueCache[I]))
                      : x.Hooks.registered[R]
                      ? M === a
                        ? ((B = x.getPropertyValue(n, I)),
                          (M = x.getPropertyValue(n, R, B)))
                        : (B = x.Hooks.templates[I][1])
                      : M === a && (M = x.getPropertyValue(n, R));
                  var W,
                    G,
                    D,
                    X = !1;
                  if (
                    ((W = f(R, M)),
                    (M = W[0]),
                    (D = W[1]),
                    (W = f(R, z)),
                    (z = W[0].replace(/^([+-\/*])=/, function (e, t) {
                      return (X = t), '';
                    })),
                    (G = W[1]),
                    (M = parseFloat(M) || 0),
                    (z = parseFloat(z) || 0),
                    '%' === G &&
                      (/^(fontSize|lineHeight)$/.test(R)
                        ? ((z /= 100), (G = 'em'))
                        : /^scale/.test(R)
                        ? ((z /= 100), (G = ''))
                        : /(Red|Green|Blue)$/i.test(R) &&
                          ((z = (z / 100) * 255), (G = ''))),
                    /[\/*]/.test(X))
                  )
                    G = D;
                  else if (D !== G && 0 !== M)
                    if (0 === z) G = D;
                    else {
                      l = l || d();
                      var Y =
                        /margin|padding|left|right|width|text|word|letter/i.test(
                          R
                        ) ||
                        /X$/.test(R) ||
                        'x' === R
                          ? 'x'
                          : 'y';
                      switch (D) {
                        case '%':
                          M *=
                            'x' === Y
                              ? l.percentToPxWidth
                              : l.percentToPxHeight;
                          break;
                        case 'px':
                          break;
                        default:
                          M *= l[D + 'ToPx'];
                      }
                      switch (G) {
                        case '%':
                          M *=
                            1 /
                            ('x' === Y
                              ? l.percentToPxWidth
                              : l.percentToPxHeight);
                          break;
                        case 'px':
                          break;
                        default:
                          M *= 1 / l[G + 'ToPx'];
                      }
                    }
                  switch (X) {
                    case '+':
                      z = M + z;
                      break;
                    case '-':
                      z = M - z;
                      break;
                    case '*':
                      z = M * z;
                      break;
                    case '/':
                      z = M / z;
                  }
                  (s[R] = {
                    rootPropertyValue: B,
                    startValue: M,
                    currentValue: M,
                    endValue: z,
                    unitType: G,
                    easing: q,
                  }),
                    v.debug &&
                      console.log(
                        'tweensContainer (' + R + '): ' + JSON.stringify(s[R]),
                        n
                      );
                } else
                  v.debug &&
                    console.log(
                      'Skipping [' + I + '] due to a lack of browser support.'
                    );
              }
              s.element = n;
            }
            s.element &&
              (x.Values.addClass(n, 'velocity-animating'),
              L.push(s),
              '' === o.queue && ((i(n).tweensContainer = s), (i(n).opts = o)),
              (i(n).isAnimating = !0),
              w === P - 1
                ? (v.State.calls.push([L, m, o, null, T.resolver]),
                  v.State.isTicking === !1 && ((v.State.isTicking = !0), c()))
                : w++);
          }
          var n = this,
            o = $.extend({}, v.defaults, b),
            s = {},
            l;
          switch (
            (i(n) === a && v.init(n),
            parseFloat(o.delay) &&
              o.queue !== !1 &&
              $.queue(n, o.queue, function (e) {
                (v.velocityQueueEntryFlag = !0),
                  (i(n).delayTimer = {
                    setTimeout: setTimeout(e, parseFloat(o.delay)),
                    next: e,
                  });
              }),
            o.duration.toString().toLowerCase())
          ) {
            case 'fast':
              o.duration = 200;
              break;
            case 'normal':
              o.duration = y;
              break;
            case 'slow':
              o.duration = 600;
              break;
            default:
              o.duration = parseFloat(o.duration) || 1;
          }
          v.mock !== !1 &&
            (v.mock === !0
              ? (o.duration = o.delay = 1)
              : ((o.duration *= parseFloat(v.mock) || 1),
                (o.delay *= parseFloat(v.mock) || 1))),
            (o.easing = u(o.easing, o.duration)),
            o.begin && !g.isFunction(o.begin) && (o.begin = null),
            o.progress && !g.isFunction(o.progress) && (o.progress = null),
            o.complete && !g.isFunction(o.complete) && (o.complete = null),
            o.display !== a &&
              null !== o.display &&
              ((o.display = o.display.toString().toLowerCase()),
              'auto' === o.display &&
                (o.display = v.CSS.Values.getDisplayType(n))),
            o.visibility !== a &&
              null !== o.visibility &&
              (o.visibility = o.visibility.toString().toLowerCase()),
            (o.mobileHA =
              o.mobileHA && v.State.isMobile && !v.State.isGingerbread),
            o.queue === !1
              ? o.delay
                ? setTimeout(e, o.delay)
                : e()
              : $.queue(n, o.queue, function (t, r) {
                  return r === !0
                    ? (T.promise && T.resolver(m), !0)
                    : ((v.velocityQueueEntryFlag = !0), void e(t));
                }),
            ('' !== o.queue && 'fx' !== o.queue) ||
              'inprogress' === $.queue(n)[0] ||
              $.dequeue(n);
        }
        var s =
            arguments[0] &&
            (arguments[0].p ||
              ($.isPlainObject(arguments[0].properties) &&
                !arguments[0].properties.names) ||
              g.isString(arguments[0].properties)),
          l,
          f,
          d,
          m,
          h,
          b;
        if (
          (g.isWrapped(this)
            ? ((l = !1), (d = 0), (m = this), (f = this))
            : ((l = !0),
              (d = 1),
              (m = s ? arguments[0].elements || arguments[0].e : arguments[0])),
          (m = o(m)))
        ) {
          s
            ? ((h = arguments[0].properties || arguments[0].p),
              (b = arguments[0].options || arguments[0].o))
            : ((h = arguments[d]), (b = arguments[d + 1]));
          var P = m.length,
            w = 0;
          if (!/^(stop|finish)$/i.test(h) && !$.isPlainObject(b)) {
            var V = d + 1;
            b = {};
            for (var C = V; C < arguments.length; C++)
              g.isArray(arguments[C]) ||
              (!/^(fast|normal|slow)$/i.test(arguments[C]) &&
                !/^\d/.test(arguments[C]))
                ? g.isString(arguments[C]) || g.isArray(arguments[C])
                  ? (b.easing = arguments[C])
                  : g.isFunction(arguments[C]) && (b.complete = arguments[C])
                : (b.duration = arguments[C]);
          }
          var T = { promise: null, resolver: null, rejecter: null };
          l &&
            v.Promise &&
            (T.promise = new v.Promise(function (e, t) {
              (T.resolver = e), (T.rejecter = t);
            }));
          var k;
          switch (h) {
            case 'scroll':
              k = 'scroll';
              break;
            case 'reverse':
              k = 'reverse';
              break;
            case 'finish':
            case 'stop':
              $.each(m, function (e, t) {
                i(t) &&
                  i(t).delayTimer &&
                  (clearTimeout(i(t).delayTimer.setTimeout),
                  i(t).delayTimer.next && i(t).delayTimer.next(),
                  delete i(t).delayTimer);
              });
              var A = [];
              return (
                $.each(v.State.calls, function (e, t) {
                  t &&
                    $.each(t[1], function (r, n) {
                      var o = b === a ? '' : b;
                      return o === !0 ||
                        t[2].queue === o ||
                        (b === a && t[2].queue === !1)
                        ? void $.each(m, function (r, a) {
                            a === n &&
                              ((b === !0 || g.isString(b)) &&
                                ($.each(
                                  $.queue(a, g.isString(b) ? b : ''),
                                  function (e, t) {
                                    g.isFunction(t) && t(null, !0);
                                  }
                                ),
                                $.queue(a, g.isString(b) ? b : '', [])),
                              'stop' === h
                                ? (i(a) &&
                                    i(a).tweensContainer &&
                                    o !== !1 &&
                                    $.each(
                                      i(a).tweensContainer,
                                      function (e, t) {
                                        t.endValue = t.currentValue;
                                      }
                                    ),
                                  A.push(e))
                                : 'finish' === h && (t[2].duration = 1));
                          })
                        : !0;
                    });
                }),
                'stop' === h &&
                  ($.each(A, function (e, t) {
                    p(t, !0);
                  }),
                  T.promise && T.resolver(m)),
                e()
              );
            default:
              if (!$.isPlainObject(h) || g.isEmptyObject(h)) {
                if (g.isString(h) && v.Redirects[h]) {
                  var F = $.extend({}, b),
                    E = F.duration,
                    j = F.delay || 0;
                  return (
                    F.backwards === !0 && (m = $.extend(!0, [], m).reverse()),
                    $.each(m, function (e, t) {
                      parseFloat(F.stagger)
                        ? (F.delay = j + parseFloat(F.stagger) * e)
                        : g.isFunction(F.stagger) &&
                          (F.delay = j + F.stagger.call(t, e, P)),
                        F.drag &&
                          ((F.duration =
                            parseFloat(E) ||
                            (/^(callout|transition)/.test(h) ? 1e3 : y)),
                          (F.duration = Math.max(
                            F.duration *
                              (F.backwards ? 1 - e / P : (e + 1) / P),
                            0.75 * F.duration,
                            200
                          ))),
                        v.Redirects[h].call(
                          t,
                          t,
                          F || {},
                          e,
                          P,
                          m,
                          T.promise ? T : a
                        );
                    }),
                    e()
                  );
                }
                var H =
                  'Velocity: First argument (' +
                  h +
                  ') was not a property map, a known action, or a registered redirect. Aborting.';
                return (
                  T.promise ? T.rejecter(new Error(H)) : console.log(H), e()
                );
              }
              k = 'start';
          }
          var N = {
              lastParent: null,
              lastPosition: null,
              lastFontSize: null,
              lastPercentToPxWidth: null,
              lastPercentToPxHeight: null,
              lastEmToPx: null,
              remToPx: null,
              vwToPx: null,
              vhToPx: null,
            },
            L = [];
          $.each(m, function (e, t) {
            g.isNode(t) && n.call(t);
          });
          var F = $.extend({}, v.defaults, b),
            R;
          if (((F.loop = parseInt(F.loop)), (R = 2 * F.loop - 1), F.loop))
            for (var O = 0; R > O; O++) {
              var z = { delay: F.delay, progress: F.progress };
              O === R - 1 &&
                ((z.display = F.display),
                (z.visibility = F.visibility),
                (z.complete = F.complete)),
                S(m, 'reverse', z);
            }
          return e();
        }
      };
      (v = $.extend(S, v)), (v.animate = S);
      var P = t.requestAnimationFrame || d;
      return (
        v.State.isMobile ||
          r.hidden === a ||
          r.addEventListener('visibilitychange', function () {
            r.hidden
              ? ((P = function (e) {
                  return setTimeout(function () {
                    e(!0);
                  }, 16);
                }),
                c())
              : (P = t.requestAnimationFrame || d);
          }),
        (e.Velocity = v),
        e !== t && ((e.fn.velocity = S), (e.fn.velocity.defaults = v.defaults)),
        $.each(['Down', 'Up'], function (e, t) {
          v.Redirects['slide' + t] = function (e, r, n, o, i, s) {
            var l = $.extend({}, r),
              u = l.begin,
              c = l.complete,
              p = {
                height: '',
                marginTop: '',
                marginBottom: '',
                paddingTop: '',
                paddingBottom: '',
              },
              f = {};
            l.display === a &&
              (l.display =
                'Down' === t
                  ? 'inline' === v.CSS.Values.getDisplayType(e)
                    ? 'inline-block'
                    : 'block'
                  : 'none'),
              (l.begin = function () {
                u && u.call(i, i);
                for (var r in p) {
                  f[r] = e.style[r];
                  var a = v.CSS.getPropertyValue(e, r);
                  p[r] = 'Down' === t ? [a, 0] : [0, a];
                }
                (f.overflow = e.style.overflow), (e.style.overflow = 'hidden');
              }),
              (l.complete = function () {
                for (var t in f) e.style[t] = f[t];
                c && c.call(i, i), s && s.resolver(i);
              }),
              v(e, p, l);
          };
        }),
        $.each(['In', 'Out'], function (e, t) {
          v.Redirects['fade' + t] = function (e, r, n, o, i, s) {
            var l = $.extend({}, r),
              u = { opacity: 'In' === t ? 1 : 0 },
              c = l.complete;
            (l.complete =
              n !== o - 1
                ? (l.begin = null)
                : function () {
                    c && c.call(i, i), s && s.resolver(i);
                  }),
              l.display === a && (l.display = 'In' === t ? 'auto' : 'none'),
              v(this, u, l);
          };
        }),
        v
      );
    })(window.jQuery || window.Zepto || window, window, document);
  });
!(function (a, b, c, d) {
  'use strict';
  function k(a, b, c) {
    return setTimeout(q(a, c), b);
  }
  function l(a, b, c) {
    return Array.isArray(a) ? (m(a, c[b], c), !0) : !1;
  }
  function m(a, b, c) {
    var e;
    if (a)
      if (a.forEach) a.forEach(b, c);
      else if (a.length !== d)
        for (e = 0; e < a.length; ) b.call(c, a[e], e, a), e++;
      else for (e in a) a.hasOwnProperty(e) && b.call(c, a[e], e, a);
  }
  function n(a, b, c) {
    for (var e = Object.keys(b), f = 0; f < e.length; )
      (!c || (c && a[e[f]] === d)) && (a[e[f]] = b[e[f]]), f++;
    return a;
  }
  function o(a, b) {
    return n(a, b, !0);
  }
  function p(a, b, c) {
    var e,
      d = b.prototype;
    (e = a.prototype = Object.create(d)),
      (e.constructor = a),
      (e._super = d),
      c && n(e, c);
  }
  function q(a, b) {
    return function () {
      return a.apply(b, arguments);
    };
  }
  function r(a, b) {
    return typeof a == g ? a.apply(b ? b[0] || d : d, b) : a;
  }
  function s(a, b) {
    return a === d ? b : a;
  }
  function t(a, b, c) {
    m(x(b), function (b) {
      a.addEventListener(b, c, !1);
    });
  }
  function u(a, b, c) {
    m(x(b), function (b) {
      a.removeEventListener(b, c, !1);
    });
  }
  function v(a, b) {
    for (; a; ) {
      if (a == b) return !0;
      a = a.parentNode;
    }
    return !1;
  }
  function w(a, b) {
    return a.indexOf(b) > -1;
  }
  function x(a) {
    return a.trim().split(/\s+/g);
  }
  function y(a, b, c) {
    if (a.indexOf && !c) return a.indexOf(b);
    for (var d = 0; d < a.length; ) {
      if ((c && a[d][c] == b) || (!c && a[d] === b)) return d;
      d++;
    }
    return -1;
  }
  function z(a) {
    return Array.prototype.slice.call(a, 0);
  }
  function A(a, b, c) {
    for (var d = [], e = [], f = 0; f < a.length; ) {
      var g = b ? a[f][b] : a[f];
      y(e, g) < 0 && d.push(a[f]), (e[f] = g), f++;
    }
    return (
      c &&
        (d = b
          ? d.sort(function (a, c) {
              return a[b] > c[b];
            })
          : d.sort()),
      d
    );
  }
  function B(a, b) {
    for (var c, f, g = b[0].toUpperCase() + b.slice(1), h = 0; h < e.length; ) {
      if (((c = e[h]), (f = c ? c + g : b), f in a)) return f;
      h++;
    }
    return d;
  }
  function D() {
    return C++;
  }
  function E(a) {
    var b = a.ownerDocument;
    return b.defaultView || b.parentWindow;
  }
  function ab(a, b) {
    var c = this;
    (this.manager = a),
      (this.callback = b),
      (this.element = a.element),
      (this.target = a.options.inputTarget),
      (this.domHandler = function (b) {
        r(a.options.enable, [a]) && c.handler(b);
      }),
      this.init();
  }
  function bb(a) {
    var b,
      c = a.options.inputClass;
    return (b = c ? c : H ? wb : I ? Eb : G ? Gb : rb), new b(a, cb);
  }
  function cb(a, b, c) {
    var d = c.pointers.length,
      e = c.changedPointers.length,
      f = b & O && 0 === d - e,
      g = b & (Q | R) && 0 === d - e;
    (c.isFirst = !!f),
      (c.isFinal = !!g),
      f && (a.session = {}),
      (c.eventType = b),
      db(a, c),
      a.emit('hammer.input', c),
      a.recognize(c),
      (a.session.prevInput = c);
  }
  function db(a, b) {
    var c = a.session,
      d = b.pointers,
      e = d.length;
    c.firstInput || (c.firstInput = gb(b)),
      e > 1 && !c.firstMultiple
        ? (c.firstMultiple = gb(b))
        : 1 === e && (c.firstMultiple = !1);
    var f = c.firstInput,
      g = c.firstMultiple,
      h = g ? g.center : f.center,
      i = (b.center = hb(d));
    (b.timeStamp = j()),
      (b.deltaTime = b.timeStamp - f.timeStamp),
      (b.angle = lb(h, i)),
      (b.distance = kb(h, i)),
      eb(c, b),
      (b.offsetDirection = jb(b.deltaX, b.deltaY)),
      (b.scale = g ? nb(g.pointers, d) : 1),
      (b.rotation = g ? mb(g.pointers, d) : 0),
      fb(c, b);
    var k = a.element;
    v(b.srcEvent.target, k) && (k = b.srcEvent.target), (b.target = k);
  }
  function eb(a, b) {
    var c = b.center,
      d = a.offsetDelta || {},
      e = a.prevDelta || {},
      f = a.prevInput || {};
    (b.eventType === O || f.eventType === Q) &&
      ((e = a.prevDelta = { x: f.deltaX || 0, y: f.deltaY || 0 }),
      (d = a.offsetDelta = { x: c.x, y: c.y })),
      (b.deltaX = e.x + (c.x - d.x)),
      (b.deltaY = e.y + (c.y - d.y));
  }
  function fb(a, b) {
    var f,
      g,
      h,
      j,
      c = a.lastInterval || b,
      e = b.timeStamp - c.timeStamp;
    if (b.eventType != R && (e > N || c.velocity === d)) {
      var k = c.deltaX - b.deltaX,
        l = c.deltaY - b.deltaY,
        m = ib(e, k, l);
      (g = m.x),
        (h = m.y),
        (f = i(m.x) > i(m.y) ? m.x : m.y),
        (j = jb(k, l)),
        (a.lastInterval = b);
    } else
      (f = c.velocity), (g = c.velocityX), (h = c.velocityY), (j = c.direction);
    (b.velocity = f), (b.velocityX = g), (b.velocityY = h), (b.direction = j);
  }
  function gb(a) {
    for (var b = [], c = 0; c < a.pointers.length; )
      (b[c] = {
        clientX: h(a.pointers[c].clientX),
        clientY: h(a.pointers[c].clientY),
      }),
        c++;
    return {
      timeStamp: j(),
      pointers: b,
      center: hb(b),
      deltaX: a.deltaX,
      deltaY: a.deltaY,
    };
  }
  function hb(a) {
    var b = a.length;
    if (1 === b) return { x: h(a[0].clientX), y: h(a[0].clientY) };
    for (var c = 0, d = 0, e = 0; b > e; )
      (c += a[e].clientX), (d += a[e].clientY), e++;
    return { x: h(c / b), y: h(d / b) };
  }
  function ib(a, b, c) {
    return { x: b / a || 0, y: c / a || 0 };
  }
  function jb(a, b) {
    return a === b ? S : i(a) >= i(b) ? (a > 0 ? T : U) : b > 0 ? V : W;
  }
  function kb(a, b, c) {
    c || (c = $);
    var d = b[c[0]] - a[c[0]],
      e = b[c[1]] - a[c[1]];
    return Math.sqrt(d * d + e * e);
  }
  function lb(a, b, c) {
    c || (c = $);
    var d = b[c[0]] - a[c[0]],
      e = b[c[1]] - a[c[1]];
    return (180 * Math.atan2(e, d)) / Math.PI;
  }
  function mb(a, b) {
    return lb(b[1], b[0], _) - lb(a[1], a[0], _);
  }
  function nb(a, b) {
    return kb(b[0], b[1], _) / kb(a[0], a[1], _);
  }
  function rb() {
    (this.evEl = pb),
      (this.evWin = qb),
      (this.allow = !0),
      (this.pressed = !1),
      ab.apply(this, arguments);
  }
  function wb() {
    (this.evEl = ub),
      (this.evWin = vb),
      ab.apply(this, arguments),
      (this.store = this.manager.session.pointerEvents = []);
  }
  function Ab() {
    (this.evTarget = yb),
      (this.evWin = zb),
      (this.started = !1),
      ab.apply(this, arguments);
  }
  function Bb(a, b) {
    var c = z(a.touches),
      d = z(a.changedTouches);
    return b & (Q | R) && (c = A(c.concat(d), 'identifier', !0)), [c, d];
  }
  function Eb() {
    (this.evTarget = Db), (this.targetIds = {}), ab.apply(this, arguments);
  }
  function Fb(a, b) {
    var c = z(a.touches),
      d = this.targetIds;
    if (b & (O | P) && 1 === c.length) return (d[c[0].identifier] = !0), [c, c];
    var e,
      f,
      g = z(a.changedTouches),
      h = [],
      i = this.target;
    if (
      ((f = c.filter(function (a) {
        return v(a.target, i);
      })),
      b === O)
    )
      for (e = 0; e < f.length; ) (d[f[e].identifier] = !0), e++;
    for (e = 0; e < g.length; )
      d[g[e].identifier] && h.push(g[e]),
        b & (Q | R) && delete d[g[e].identifier],
        e++;
    return h.length ? [A(f.concat(h), 'identifier', !0), h] : void 0;
  }
  function Gb() {
    ab.apply(this, arguments);
    var a = q(this.handler, this);
    (this.touch = new Eb(this.manager, a)),
      (this.mouse = new rb(this.manager, a));
  }
  function Pb(a, b) {
    (this.manager = a), this.set(b);
  }
  function Qb(a) {
    if (w(a, Mb)) return Mb;
    var b = w(a, Nb),
      c = w(a, Ob);
    return b && c ? Nb + ' ' + Ob : b || c ? (b ? Nb : Ob) : w(a, Lb) ? Lb : Kb;
  }
  function Yb(a) {
    (this.id = D()),
      (this.manager = null),
      (this.options = o(a || {}, this.defaults)),
      (this.options.enable = s(this.options.enable, !0)),
      (this.state = Rb),
      (this.simultaneous = {}),
      (this.requireFail = []);
  }
  function Zb(a) {
    return a & Wb
      ? 'cancel'
      : a & Ub
      ? 'end'
      : a & Tb
      ? 'move'
      : a & Sb
      ? 'start'
      : '';
  }
  function $b(a) {
    return a == W
      ? 'down'
      : a == V
      ? 'up'
      : a == T
      ? 'left'
      : a == U
      ? 'right'
      : '';
  }
  function _b(a, b) {
    var c = b.manager;
    return c ? c.get(a) : a;
  }
  function ac() {
    Yb.apply(this, arguments);
  }
  function bc() {
    ac.apply(this, arguments), (this.pX = null), (this.pY = null);
  }
  function cc() {
    ac.apply(this, arguments);
  }
  function dc() {
    Yb.apply(this, arguments), (this._timer = null), (this._input = null);
  }
  function ec() {
    ac.apply(this, arguments);
  }
  function fc() {
    ac.apply(this, arguments);
  }
  function gc() {
    Yb.apply(this, arguments),
      (this.pTime = !1),
      (this.pCenter = !1),
      (this._timer = null),
      (this._input = null),
      (this.count = 0);
  }
  function hc(a, b) {
    return (
      (b = b || {}),
      (b.recognizers = s(b.recognizers, hc.defaults.preset)),
      new kc(a, b)
    );
  }
  function kc(a, b) {
    (b = b || {}),
      (this.options = o(b, hc.defaults)),
      (this.options.inputTarget = this.options.inputTarget || a),
      (this.handlers = {}),
      (this.session = {}),
      (this.recognizers = []),
      (this.element = a),
      (this.input = bb(this)),
      (this.touchAction = new Pb(this, this.options.touchAction)),
      lc(this, !0),
      m(
        b.recognizers,
        function (a) {
          var b = this.add(new a[0](a[1]));
          a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3]);
        },
        this
      );
  }
  function lc(a, b) {
    var c = a.element;
    m(a.options.cssProps, function (a, d) {
      c.style[B(c.style, d)] = b ? a : '';
    });
  }
  function mc(a, c) {
    var d = b.createEvent('Event');
    d.initEvent(a, !0, !0), (d.gesture = c), c.target.dispatchEvent(d);
  }
  var e = ['', 'webkit', 'moz', 'MS', 'ms', 'o'],
    f = b.createElement('div'),
    g = 'function',
    h = Math.round,
    i = Math.abs,
    j = Date.now,
    C = 1,
    F = /mobile|tablet|ip(ad|hone|od)|android/i,
    G = 'ontouchstart' in a,
    H = B(a, 'PointerEvent') !== d,
    I = G && F.test(navigator.userAgent),
    J = 'touch',
    K = 'pen',
    L = 'mouse',
    M = 'kinect',
    N = 25,
    O = 1,
    P = 2,
    Q = 4,
    R = 8,
    S = 1,
    T = 2,
    U = 4,
    V = 8,
    W = 16,
    X = T | U,
    Y = V | W,
    Z = X | Y,
    $ = ['x', 'y'],
    _ = ['clientX', 'clientY'];
  ab.prototype = {
    handler: function () {},
    init: function () {
      this.evEl && t(this.element, this.evEl, this.domHandler),
        this.evTarget && t(this.target, this.evTarget, this.domHandler),
        this.evWin && t(E(this.element), this.evWin, this.domHandler);
    },
    destroy: function () {
      this.evEl && u(this.element, this.evEl, this.domHandler),
        this.evTarget && u(this.target, this.evTarget, this.domHandler),
        this.evWin && u(E(this.element), this.evWin, this.domHandler);
    },
  };
  var ob = { mousedown: O, mousemove: P, mouseup: Q },
    pb = 'mousedown',
    qb = 'mousemove mouseup';
  p(rb, ab, {
    handler: function (a) {
      var b = ob[a.type];
      b & O && 0 === a.button && (this.pressed = !0),
        b & P && 1 !== a.which && (b = Q),
        this.pressed &&
          this.allow &&
          (b & Q && (this.pressed = !1),
          this.callback(this.manager, b, {
            pointers: [a],
            changedPointers: [a],
            pointerType: L,
            srcEvent: a,
          }));
    },
  });
  var sb = {
      pointerdown: O,
      pointermove: P,
      pointerup: Q,
      pointercancel: R,
      pointerout: R,
    },
    tb = { 2: J, 3: K, 4: L, 5: M },
    ub = 'pointerdown',
    vb = 'pointermove pointerup pointercancel';
  a.MSPointerEvent &&
    ((ub = 'MSPointerDown'),
    (vb = 'MSPointerMove MSPointerUp MSPointerCancel')),
    p(wb, ab, {
      handler: function (a) {
        var b = this.store,
          c = !1,
          d = a.type.toLowerCase().replace('ms', ''),
          e = sb[d],
          f = tb[a.pointerType] || a.pointerType,
          g = f == J,
          h = y(b, a.pointerId, 'pointerId');
        e & O && (0 === a.button || g)
          ? 0 > h && (b.push(a), (h = b.length - 1))
          : e & (Q | R) && (c = !0),
          0 > h ||
            ((b[h] = a),
            this.callback(this.manager, e, {
              pointers: b,
              changedPointers: [a],
              pointerType: f,
              srcEvent: a,
            }),
            c && b.splice(h, 1));
      },
    });
  var xb = { touchstart: O, touchmove: P, touchend: Q, touchcancel: R },
    yb = 'touchstart',
    zb = 'touchstart touchmove touchend touchcancel';
  p(Ab, ab, {
    handler: function (a) {
      var b = xb[a.type];
      if ((b === O && (this.started = !0), this.started)) {
        var c = Bb.call(this, a, b);
        b & (Q | R) && 0 === c[0].length - c[1].length && (this.started = !1),
          this.callback(this.manager, b, {
            pointers: c[0],
            changedPointers: c[1],
            pointerType: J,
            srcEvent: a,
          });
      }
    },
  });
  var Cb = { touchstart: O, touchmove: P, touchend: Q, touchcancel: R },
    Db = 'touchstart touchmove touchend touchcancel';
  p(Eb, ab, {
    handler: function (a) {
      var b = Cb[a.type],
        c = Fb.call(this, a, b);
      c &&
        this.callback(this.manager, b, {
          pointers: c[0],
          changedPointers: c[1],
          pointerType: J,
          srcEvent: a,
        });
    },
  }),
    p(Gb, ab, {
      handler: function (a, b, c) {
        var d = c.pointerType == J,
          e = c.pointerType == L;
        if (d) this.mouse.allow = !1;
        else if (e && !this.mouse.allow) return;
        b & (Q | R) && (this.mouse.allow = !0), this.callback(a, b, c);
      },
      destroy: function () {
        this.touch.destroy(), this.mouse.destroy();
      },
    });
  var Hb = B(f.style, 'touchAction'),
    Ib = Hb !== d,
    Jb = 'compute',
    Kb = 'auto',
    Lb = 'manipulation',
    Mb = 'none',
    Nb = 'pan-x',
    Ob = 'pan-y';
  Pb.prototype = {
    set: function (a) {
      a == Jb && (a = this.compute()),
        Ib && (this.manager.element.style[Hb] = a),
        (this.actions = a.toLowerCase().trim());
    },
    update: function () {
      this.set(this.manager.options.touchAction);
    },
    compute: function () {
      var a = [];
      return (
        m(this.manager.recognizers, function (b) {
          r(b.options.enable, [b]) && (a = a.concat(b.getTouchAction()));
        }),
        Qb(a.join(' '))
      );
    },
    preventDefaults: function (a) {
      if (!Ib) {
        var b = a.srcEvent,
          c = a.offsetDirection;
        if (this.manager.session.prevented) return b.preventDefault(), void 0;
        var d = this.actions,
          e = w(d, Mb),
          f = w(d, Ob),
          g = w(d, Nb);
        return e || (f && c & X) || (g && c & Y) ? this.preventSrc(b) : void 0;
      }
    },
    preventSrc: function (a) {
      (this.manager.session.prevented = !0), a.preventDefault();
    },
  };
  var Rb = 1,
    Sb = 2,
    Tb = 4,
    Ub = 8,
    Vb = Ub,
    Wb = 16,
    Xb = 32;
  (Yb.prototype = {
    defaults: {},
    set: function (a) {
      return (
        n(this.options, a),
        this.manager && this.manager.touchAction.update(),
        this
      );
    },
    recognizeWith: function (a) {
      if (l(a, 'recognizeWith', this)) return this;
      var b = this.simultaneous;
      return (
        (a = _b(a, this)),
        b[a.id] || ((b[a.id] = a), a.recognizeWith(this)),
        this
      );
    },
    dropRecognizeWith: function (a) {
      return l(a, 'dropRecognizeWith', this)
        ? this
        : ((a = _b(a, this)), delete this.simultaneous[a.id], this);
    },
    requireFailure: function (a) {
      if (l(a, 'requireFailure', this)) return this;
      var b = this.requireFail;
      return (
        (a = _b(a, this)),
        -1 === y(b, a) && (b.push(a), a.requireFailure(this)),
        this
      );
    },
    dropRequireFailure: function (a) {
      if (l(a, 'dropRequireFailure', this)) return this;
      a = _b(a, this);
      var b = y(this.requireFail, a);
      return b > -1 && this.requireFail.splice(b, 1), this;
    },
    hasRequireFailures: function () {
      return this.requireFail.length > 0;
    },
    canRecognizeWith: function (a) {
      return !!this.simultaneous[a.id];
    },
    emit: function (a) {
      function d(d) {
        b.manager.emit(b.options.event + (d ? Zb(c) : ''), a);
      }
      var b = this,
        c = this.state;
      Ub > c && d(!0), d(), c >= Ub && d(!0);
    },
    tryEmit: function (a) {
      return this.canEmit() ? this.emit(a) : ((this.state = Xb), void 0);
    },
    canEmit: function () {
      for (var a = 0; a < this.requireFail.length; ) {
        if (!(this.requireFail[a].state & (Xb | Rb))) return !1;
        a++;
      }
      return !0;
    },
    recognize: function (a) {
      var b = n({}, a);
      return r(this.options.enable, [this, b])
        ? (this.state & (Vb | Wb | Xb) && (this.state = Rb),
          (this.state = this.process(b)),
          this.state & (Sb | Tb | Ub | Wb) && this.tryEmit(b),
          void 0)
        : (this.reset(), (this.state = Xb), void 0);
    },
    process: function () {},
    getTouchAction: function () {},
    reset: function () {},
  }),
    p(ac, Yb, {
      defaults: { pointers: 1 },
      attrTest: function (a) {
        var b = this.options.pointers;
        return 0 === b || a.pointers.length === b;
      },
      process: function (a) {
        var b = this.state,
          c = a.eventType,
          d = b & (Sb | Tb),
          e = this.attrTest(a);
        return d && (c & R || !e)
          ? b | Wb
          : d || e
          ? c & Q
            ? b | Ub
            : b & Sb
            ? b | Tb
            : Sb
          : Xb;
      },
    }),
    p(bc, ac, {
      defaults: { event: 'pan', threshold: 10, pointers: 1, direction: Z },
      getTouchAction: function () {
        var a = this.options.direction,
          b = [];
        return a & X && b.push(Ob), a & Y && b.push(Nb), b;
      },
      directionTest: function (a) {
        var b = this.options,
          c = !0,
          d = a.distance,
          e = a.direction,
          f = a.deltaX,
          g = a.deltaY;
        return (
          e & b.direction ||
            (b.direction & X
              ? ((e = 0 === f ? S : 0 > f ? T : U),
                (c = f != this.pX),
                (d = Math.abs(a.deltaX)))
              : ((e = 0 === g ? S : 0 > g ? V : W),
                (c = g != this.pY),
                (d = Math.abs(a.deltaY)))),
          (a.direction = e),
          c && d > b.threshold && e & b.direction
        );
      },
      attrTest: function (a) {
        return (
          ac.prototype.attrTest.call(this, a) &&
          (this.state & Sb || (!(this.state & Sb) && this.directionTest(a)))
        );
      },
      emit: function (a) {
        (this.pX = a.deltaX), (this.pY = a.deltaY);
        var b = $b(a.direction);
        b && this.manager.emit(this.options.event + b, a),
          this._super.emit.call(this, a);
      },
    }),
    p(cc, ac, {
      defaults: { event: 'pinch', threshold: 0, pointers: 2 },
      getTouchAction: function () {
        return [Mb];
      },
      attrTest: function (a) {
        return (
          this._super.attrTest.call(this, a) &&
          (Math.abs(a.scale - 1) > this.options.threshold || this.state & Sb)
        );
      },
      emit: function (a) {
        if ((this._super.emit.call(this, a), 1 !== a.scale)) {
          var b = a.scale < 1 ? 'in' : 'out';
          this.manager.emit(this.options.event + b, a);
        }
      },
    }),
    p(dc, Yb, {
      defaults: { event: 'press', pointers: 1, time: 500, threshold: 5 },
      getTouchAction: function () {
        return [Kb];
      },
      process: function (a) {
        var b = this.options,
          c = a.pointers.length === b.pointers,
          d = a.distance < b.threshold,
          e = a.deltaTime > b.time;
        if (((this._input = a), !d || !c || (a.eventType & (Q | R) && !e)))
          this.reset();
        else if (a.eventType & O)
          this.reset(),
            (this._timer = k(
              function () {
                (this.state = Vb), this.tryEmit();
              },
              b.time,
              this
            ));
        else if (a.eventType & Q) return Vb;
        return Xb;
      },
      reset: function () {
        clearTimeout(this._timer);
      },
      emit: function (a) {
        this.state === Vb &&
          (a && a.eventType & Q
            ? this.manager.emit(this.options.event + 'up', a)
            : ((this._input.timeStamp = j()),
              this.manager.emit(this.options.event, this._input)));
      },
    }),
    p(ec, ac, {
      defaults: { event: 'rotate', threshold: 0, pointers: 2 },
      getTouchAction: function () {
        return [Mb];
      },
      attrTest: function (a) {
        return (
          this._super.attrTest.call(this, a) &&
          (Math.abs(a.rotation) > this.options.threshold || this.state & Sb)
        );
      },
    }),
    p(fc, ac, {
      defaults: {
        event: 'swipe',
        threshold: 10,
        velocity: 0.65,
        direction: X | Y,
        pointers: 1,
      },
      getTouchAction: function () {
        return bc.prototype.getTouchAction.call(this);
      },
      attrTest: function (a) {
        var c,
          b = this.options.direction;
        return (
          b & (X | Y)
            ? (c = a.velocity)
            : b & X
            ? (c = a.velocityX)
            : b & Y && (c = a.velocityY),
          this._super.attrTest.call(this, a) &&
            b & a.direction &&
            a.distance > this.options.threshold &&
            i(c) > this.options.velocity &&
            a.eventType & Q
        );
      },
      emit: function (a) {
        var b = $b(a.direction);
        b && this.manager.emit(this.options.event + b, a),
          this.manager.emit(this.options.event, a);
      },
    }),
    p(gc, Yb, {
      defaults: {
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300,
        time: 250,
        threshold: 2,
        posThreshold: 10,
      },
      getTouchAction: function () {
        return [Lb];
      },
      process: function (a) {
        var b = this.options,
          c = a.pointers.length === b.pointers,
          d = a.distance < b.threshold,
          e = a.deltaTime < b.time;
        if ((this.reset(), a.eventType & O && 0 === this.count))
          return this.failTimeout();
        if (d && e && c) {
          if (a.eventType != Q) return this.failTimeout();
          var f = this.pTime ? a.timeStamp - this.pTime < b.interval : !0,
            g = !this.pCenter || kb(this.pCenter, a.center) < b.posThreshold;
          (this.pTime = a.timeStamp),
            (this.pCenter = a.center),
            g && f ? (this.count += 1) : (this.count = 1),
            (this._input = a);
          var h = this.count % b.taps;
          if (0 === h)
            return this.hasRequireFailures()
              ? ((this._timer = k(
                  function () {
                    (this.state = Vb), this.tryEmit();
                  },
                  b.interval,
                  this
                )),
                Sb)
              : Vb;
        }
        return Xb;
      },
      failTimeout: function () {
        return (
          (this._timer = k(
            function () {
              this.state = Xb;
            },
            this.options.interval,
            this
          )),
          Xb
        );
      },
      reset: function () {
        clearTimeout(this._timer);
      },
      emit: function () {
        this.state == Vb &&
          ((this._input.tapCount = this.count),
          this.manager.emit(this.options.event, this._input));
      },
    }),
    (hc.VERSION = '2.0.4'),
    (hc.defaults = {
      domEvents: !1,
      touchAction: Jb,
      enable: !0,
      inputTarget: null,
      inputClass: null,
      preset: [
        [ec, { enable: !1 }],
        [cc, { enable: !1 }, ['rotate']],
        [fc, { direction: X }],
        [bc, { direction: X }, ['swipe']],
        [gc],
        [gc, { event: 'doubletap', taps: 2 }, ['tap']],
        [dc],
      ],
      cssProps: {
        userSelect: 'default',
        touchSelect: 'none',
        touchCallout: 'none',
        contentZooming: 'none',
        userDrag: 'none',
        tapHighlightColor: 'rgba(0,0,0,0)',
      },
    });
  var ic = 1,
    jc = 2;
  (kc.prototype = {
    set: function (a) {
      return (
        n(this.options, a),
        a.touchAction && this.touchAction.update(),
        a.inputTarget &&
          (this.input.destroy(),
          (this.input.target = a.inputTarget),
          this.input.init()),
        this
      );
    },
    stop: function (a) {
      this.session.stopped = a ? jc : ic;
    },
    recognize: function (a) {
      var b = this.session;
      if (!b.stopped) {
        this.touchAction.preventDefaults(a);
        var c,
          d = this.recognizers,
          e = b.curRecognizer;
        (!e || (e && e.state & Vb)) && (e = b.curRecognizer = null);
        for (var f = 0; f < d.length; )
          (c = d[f]),
            b.stopped === jc || (e && c != e && !c.canRecognizeWith(e))
              ? c.reset()
              : c.recognize(a),
            !e && c.state & (Sb | Tb | Ub) && (e = b.curRecognizer = c),
            f++;
      }
    },
    get: function (a) {
      if (a instanceof Yb) return a;
      for (var b = this.recognizers, c = 0; c < b.length; c++)
        if (b[c].options.event == a) return b[c];
      return null;
    },
    add: function (a) {
      if (l(a, 'add', this)) return this;
      var b = this.get(a.options.event);
      return (
        b && this.remove(b),
        this.recognizers.push(a),
        (a.manager = this),
        this.touchAction.update(),
        a
      );
    },
    remove: function (a) {
      if (l(a, 'remove', this)) return this;
      var b = this.recognizers;
      return (
        (a = this.get(a)), b.splice(y(b, a), 1), this.touchAction.update(), this
      );
    },
    on: function (a, b) {
      var c = this.handlers;
      return (
        m(x(a), function (a) {
          (c[a] = c[a] || []), c[a].push(b);
        }),
        this
      );
    },
    off: function (a, b) {
      var c = this.handlers;
      return (
        m(x(a), function (a) {
          b ? c[a].splice(y(c[a], b), 1) : delete c[a];
        }),
        this
      );
    },
    emit: function (a, b) {
      this.options.domEvents && mc(a, b);
      var c = this.handlers[a] && this.handlers[a].slice();
      if (c && c.length) {
        (b.type = a),
          (b.preventDefault = function () {
            b.srcEvent.preventDefault();
          });
        for (var d = 0; d < c.length; ) c[d](b), d++;
      }
    },
    destroy: function () {
      this.element && lc(this, !1),
        (this.handlers = {}),
        (this.session = {}),
        this.input.destroy(),
        (this.element = null);
    },
  }),
    n(hc, {
      INPUT_START: O,
      INPUT_MOVE: P,
      INPUT_END: Q,
      INPUT_CANCEL: R,
      STATE_POSSIBLE: Rb,
      STATE_BEGAN: Sb,
      STATE_CHANGED: Tb,
      STATE_ENDED: Ub,
      STATE_RECOGNIZED: Vb,
      STATE_CANCELLED: Wb,
      STATE_FAILED: Xb,
      DIRECTION_NONE: S,
      DIRECTION_LEFT: T,
      DIRECTION_RIGHT: U,
      DIRECTION_UP: V,
      DIRECTION_DOWN: W,
      DIRECTION_HORIZONTAL: X,
      DIRECTION_VERTICAL: Y,
      DIRECTION_ALL: Z,
      Manager: kc,
      Input: ab,
      TouchAction: Pb,
      TouchInput: Eb,
      MouseInput: rb,
      PointerEventInput: wb,
      TouchMouseInput: Gb,
      SingleTouchInput: Ab,
      Recognizer: Yb,
      AttrRecognizer: ac,
      Tap: gc,
      Pan: bc,
      Swipe: fc,
      Pinch: cc,
      Rotate: ec,
      Press: dc,
      on: t,
      off: u,
      each: m,
      merge: o,
      extend: n,
      inherit: p,
      bindFn: q,
      prefixed: B,
    }),
    typeof define == g && define.amd
      ? define(function () {
          return hc;
        })
      : 'undefined' != typeof module && module.exports
      ? (module.exports = hc)
      : (a[c] = hc);
})(window, document, 'Hammer');
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery', 'hammerjs'], factory);
  } else if (typeof exports === 'object') {
    factory(require('jquery'), require('hammerjs'));
  } else {
    factory(jQuery, Hammer);
  }
})(function ($, Hammer) {
  function hammerify(el, options) {
    var $el = $(el);
    if (!$el.data('hammer')) {
      $el.data('hammer', new Hammer($el[0], options));
    }
  }

  $.fn.hammer = function (options) {
    return this.each(function () {
      hammerify(this, options);
    });
  };

  // extend the emit method to also trigger jQuery events
  Hammer.Manager.prototype.emit = (function (originalEmit) {
    return function (type, data) {
      originalEmit.call(this, type, data);
      $(this.element).trigger({
        type: type,
        gesture: data,
      });
    };
  })(Hammer.Manager.prototype.emit);
});
Materialize = {};

// Unique ID
Materialize.guid = (function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return function () {
    return (
      s4() +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      s4() +
      s4()
    );
  };
})();

Materialize.elementOrParentIsFixed = function (element) {
  var $element = $(element);
  var $checkElements = $element.add($element.parents());
  var isFixed = false;
  $checkElements.each(function () {
    if ($(this).css('position') === 'fixed') {
      isFixed = true;
      return false;
    }
  });
  return isFixed;
};

// Velocity has conflicts when loaded with jQuery, this will check for it
var Vel;
if ($) {
  Vel = $.Velocity;
} else {
  Vel = Velocity;
}
(function ($) {
  $.fn.collapsible = function (options) {
    var defaults = {
      accordion: undefined,
    };

    options = $.extend(defaults, options);

    return this.each(function () {
      var $this = $(this);

      var $panel_headers = $(this).find('> li > .collapsible-header');

      var collapsible_type = $this.data('collapsible');

      // Turn off any existing event handlers
      $this.off('click.collapse', '.collapsible-header');
      $panel_headers.off('click.collapse');

      /****************
       Helper Functions
       ****************/

      // Accordion Open
      function accordionOpen(object) {
        $panel_headers = $this.find('> li > .collapsible-header');
        if (object.hasClass('active')) {
          object.parent().addClass('active');
        } else {
          object.parent().removeClass('active');
        }
        if (object.parent().hasClass('active')) {
          object
            .siblings('.collapsible-body')
            .stop(true, false)
            .slideDown({
              duration: 350,
              easing: 'easeOutQuart',
              queue: false,
              complete: function () {
                $(this).css('height', '');
              },
            });
        } else {
          object
            .siblings('.collapsible-body')
            .stop(true, false)
            .slideUp({
              duration: 350,
              easing: 'easeOutQuart',
              queue: false,
              complete: function () {
                $(this).css('height', '');
              },
            });
        }

        $panel_headers
          .not(object)
          .removeClass('active')
          .parent()
          .removeClass('active');
        $panel_headers
          .not(object)
          .parent()
          .children('.collapsible-body')
          .stop(true, false)
          .slideUp({
            duration: 350,
            easing: 'easeOutQuart',
            queue: false,
            complete: function () {
              $(this).css('height', '');
            },
          });
      }

      // Expandable Open
      function expandableOpen(object) {
        if (object.hasClass('active')) {
          object.parent().addClass('active');
        } else {
          object.parent().removeClass('active');
        }
        if (object.parent().hasClass('active')) {
          object
            .siblings('.collapsible-body')
            .stop(true, false)
            .slideDown({
              duration: 350,
              easing: 'easeOutQuart',
              queue: false,
              complete: function () {
                $(this).css('height', '');
              },
            });
        } else {
          object
            .siblings('.collapsible-body')
            .stop(true, false)
            .slideUp({
              duration: 350,
              easing: 'easeOutQuart',
              queue: false,
              complete: function () {
                $(this).css('height', '');
              },
            });
        }
      }

      /**
       * Check if object is children of panel header
       * @param  {Object}  object Jquery object
       * @return {Boolean} true if it is children
       */
      function isChildrenOfPanelHeader(object) {
        var panelHeader = getPanelHeader(object);

        return panelHeader.length > 0;
      }

      /**
       * Get panel header from a children element
       * @param  {Object} object Jquery object
       * @return {Object} panel header object
       */
      function getPanelHeader(object) {
        return object.closest('li > .collapsible-header');
      }

      /*****  End Helper Functions  *****/

      if (
        options.accordion ||
        collapsible_type === 'accordion' ||
        collapsible_type === undefined
      ) {
        // Handle Accordion
        // Add click handler to only direct collapsible header children
        $panel_headers = $this.find('> li > .collapsible-header');
        $panel_headers.on('click.collapse', function (e) {
          var element = $(e.target);

          if (isChildrenOfPanelHeader(element)) {
            element = getPanelHeader(element);
          }

          element.toggleClass('active');
          accordionOpen(element);
        });
        // Open first active
        accordionOpen($panel_headers.filter('.active').first());
      } else {
        // Handle Expandables
        $panel_headers.each(function () {
          // Add click handler to only direct collapsible header children
          $(this).on('click.collapse', function (e) {
            var element = $(e.target);
            if (isChildrenOfPanelHeader(element)) {
              element = getPanelHeader(element);
            }
            element.toggleClass('active');
            expandableOpen(element);
          });
          // Open any bodies that have the active class
          if ($(this).hasClass('active')) {
            expandableOpen($(this));
          }
        });
      }
    });
  };

  $(document).ready(function () {
    $('.collapsible').collapsible();
  });
})(jQuery);
(function ($) {
  // Add posibility to scroll to selected option
  // usefull for select for example
  $.fn.scrollTo = function (elem) {
    $(this).scrollTop(
      $(this).scrollTop() - $(this).offset().top + $(elem).offset().top
    );
    return this;
  };

  $.fn.dropdown = function (option) {
    var defaults = {
      inDuration: 300,
      outDuration: 225,
      constrain_width: true, // Constrains width of dropdown to the activator
      hover: false,
      gutter: 0, // Spacing from edge
      belowOrigin: false,
    };

    this.each(function () {
      var origin = $(this);
      var options = $.extend({}, defaults, option);

      // Dropdown menu
      var activates = $('#' + origin.attr('data-activates'));

      function updateOptions() {
        if (origin.data('induration') !== undefined)
          options.inDuration = origin.data('inDuration');
        if (origin.data('outduration') !== undefined)
          options.outDuration = origin.data('outDuration');
        if (origin.data('constrainwidth') !== undefined)
          options.constrain_width = origin.data('constrainwidth');
        if (origin.data('hover') !== undefined)
          options.hover = origin.data('hover');
        if (origin.data('gutter') !== undefined)
          options.gutter = origin.data('gutter');
        if (origin.data('beloworigin') !== undefined)
          options.belowOrigin = origin.data('beloworigin');
      }

      updateOptions();

      // Attach dropdown to its activator
      origin.after(activates);

      /*
      Helper function to position and resize dropdown.
      Used in hover and click handler.
    */
      function placeDropdown() {
        // Check html data attributes
        updateOptions();

        // Set Dropdown state
        activates.addClass('active');

        // Constrain width
        if (options.constrain_width === true) {
          activates.css('width', origin.outerWidth());
        }
        var offset = 0;
        if (options.belowOrigin === true) {
          offset = origin.height();
        }

        // Handle edge alignment
        var offsetLeft = origin.offset().left;
        var width_difference = 0;
        var gutter_spacing = options.gutter;

        if (offsetLeft + activates.innerWidth() > $(window).width()) {
          width_difference = origin.innerWidth() - activates.innerWidth();
          gutter_spacing = gutter_spacing * -1;
        }

        // Position dropdown
        activates.css({
          position: 'absolute',
          top: origin.position().top + offset,
          left: origin.position().left + width_difference + gutter_spacing,
        });

        // Show dropdown
        activates
          .stop(true, true)
          .css('opacity', 0)
          .slideDown({
            queue: false,
            duration: options.inDuration,
            easing: 'easeOutCubic',
            complete: function () {
              $(this).css('height', '');
            },
          })
          .animate(
            { opacity: 1 },
            {
              queue: false,
              duration: options.inDuration,
              easing: 'easeOutSine',
            }
          );
      }

      function hideDropdown() {
        activates.fadeOut(options.outDuration);
        activates.removeClass('active');
      }

      // Hover
      if (options.hover) {
        var open = false;
        origin.unbind('click.' + origin.attr('id'));
        // Hover handler to show dropdown
        origin.on('mouseenter', function (e) {
          // Mouse over
          if (open === false) {
            placeDropdown();
            open = true;
          }
        });
        origin.on('mouseleave', function (e) {
          // If hover on origin then to something other than dropdown content, then close
          var toEl = e.toElement || e.relatedTarget; // added browser compatibility for target element
          if (!$(toEl).closest('.dropdown-content').is(activates)) {
            activates.stop(true, true);
            hideDropdown();
            open = false;
          }
        });

        activates.on('mouseleave', function (e) {
          // Mouse out
          var toEl = e.toElement || e.relatedTarget;
          if (!$(toEl).closest('.dropdown-button').is(origin)) {
            activates.stop(true, true);
            hideDropdown();
            open = false;
          }
        });

        // Click
      } else {
        // Click handler to show dropdown
        origin.unbind('click.' + origin.attr('id'));
        origin.bind('click.' + origin.attr('id'), function (e) {
          if (
            origin[0] == e.currentTarget &&
            $(e.target).closest('.dropdown-content').length === 0
          ) {
            e.preventDefault(); // Prevents button click from moving window
            placeDropdown();
          }
          // If origin is clicked and menu is open, close menu
          else {
            if (origin.hasClass('active')) {
              hideDropdown();
              $(document).unbind('click.' + activates.attr('id'));
            }
          }
          // If menu open, add click close handler to document
          if (activates.hasClass('active')) {
            $(document).bind('click.' + activates.attr('id'), function (e) {
              if (
                !activates.is(e.target) &&
                !origin.is(e.target) &&
                !origin.find(e.target).length > 0
              ) {
                hideDropdown();
                $(document).unbind('click.' + activates.attr('id'));
              }
            });
          }
        });
      } // End else

      // Listen to open and close event - useful for select component
      origin.on('open', placeDropdown);
      origin.on('close', hideDropdown);
    });
  }; // End dropdown plugin

  $(document).ready(function () {
    $('.dropdown-button').dropdown();
  });
})(jQuery);
(function ($) {
  var _stack = 0,
    _lastID = 0,
    _generateID = function () {
      _lastID++;
      return 'materialize-lean-overlay-' + _lastID;
    };

  $.fn.extend({
    openModal: function (options) {
      $('body').css('overflow', 'hidden');

      var defaults = {
          opacity: 0.5,
          in_duration: 350,
          out_duration: 250,
          ready: undefined,
          complete: undefined,
          dismissible: true,
          starting_top: '4%',
        },
        overlayID = _generateID(),
        $modal = $(this),
        $overlay = $('<div class="lean-overlay"></div>'),
        lStack = ++_stack;

      // Store a reference of the overlay
      $overlay.attr('id', overlayID).css('z-index', 1000 + lStack * 2);
      $modal
        .data('overlay-id', overlayID)
        .css('z-index', 1000 + lStack * 2 + 1);

      $('body').append($overlay);

      // Override defaults
      options = $.extend(defaults, options);

      if (options.dismissible) {
        $overlay.click(function () {
          $modal.closeModal(options);
        });
        // Return on ESC
        $(document).on('keyup.leanModal' + overlayID, function (e) {
          if (e.keyCode === 27) {
            // ESC key
            $modal.closeModal(options);
          }
        });
      }

      $modal.find('.modal-close').on('click.close', function (e) {
        $modal.closeModal(options);
      });

      $overlay.css({ display: 'block', opacity: 0 });

      $modal.css({
        display: 'block',
        opacity: 0,
      });

      $overlay.velocity(
        { opacity: options.opacity },
        { duration: options.in_duration, queue: false, ease: 'easeOutCubic' }
      );
      $modal.data('associated-overlay', $overlay[0]);

      // Define Bottom Sheet animation
      if ($modal.hasClass('bottom-sheet')) {
        $modal.velocity(
          { bottom: '0', opacity: 1 },
          {
            duration: options.in_duration,
            queue: false,
            ease: 'easeOutCubic',
            // Handle modal ready callback
            complete: function () {
              if (typeof options.ready === 'function') {
                options.ready();
              }
            },
          }
        );
      } else {
        $.Velocity.hook($modal, 'scaleX', 0.7);
        $modal.css({ top: options.starting_top });
        $modal.velocity(
          { top: '10%', opacity: 1, scaleX: '1' },
          {
            duration: options.in_duration,
            queue: false,
            ease: 'easeOutCubic',
            // Handle modal ready callback
            complete: function () {
              if (typeof options.ready === 'function') {
                options.ready();
              }
            },
          }
        );
      }
    },
  });

  $.fn.extend({
    closeModal: function (options) {
      var defaults = {
          out_duration: 250,
          complete: undefined,
        },
        $modal = $(this),
        overlayID = $modal.data('overlay-id'),
        $overlay = $('#' + overlayID);

      options = $.extend(defaults, options);

      // Disable scrolling
      $('body').css('overflow', '');

      $modal.find('.modal-close').off('click.close');
      $(document).off('keyup.leanModal' + overlayID);

      $overlay.velocity(
        { opacity: 0 },
        { duration: options.out_duration, queue: false, ease: 'easeOutQuart' }
      );

      // Define Bottom Sheet animation
      if ($modal.hasClass('bottom-sheet')) {
        $modal.velocity(
          { bottom: '-100%', opacity: 0 },
          {
            duration: options.out_duration,
            queue: false,
            ease: 'easeOutCubic',
            // Handle modal ready callback
            complete: function () {
              $overlay.css({ display: 'none' });

              // Call complete callback
              if (typeof options.complete === 'function') {
                options.complete();
              }
              $overlay.remove();
              _stack--;
            },
          }
        );
      } else {
        $modal.velocity(
          { top: options.starting_top, opacity: 0, scaleX: 0.7 },
          {
            duration: options.out_duration,
            complete: function () {
              $(this).css('display', 'none');
              // Call complete callback
              if (typeof options.complete === 'function') {
                options.complete();
              }
              $overlay.remove();
              _stack--;
            },
          }
        );
      }
    },
  });

  $.fn.extend({
    leanModal: function (option) {
      return this.each(function () {
        var defaults = {
            starting_top: '4%',
          },
          // Override defaults
          options = $.extend(defaults, option);

        // Close Handlers
        $(this).click(function (e) {
          options.starting_top =
            ($(this).offset().top - $(window).scrollTop()) / 1.15;
          var modal_id = $(this).attr('href') || '#' + $(this).data('target');
          $(modal_id).openModal(options);
          e.preventDefault();
        }); // done set on click
      }); // done return
    },
  });
})(jQuery);
(function ($) {
  $.fn.materialbox = function () {
    return this.each(function () {
      if ($(this).hasClass('initialized')) {
        return;
      }

      $(this).addClass('initialized');

      var overlayActive = false;
      var doneAnimating = true;
      var inDuration = 275;
      var outDuration = 200;
      var origin = $(this);
      var placeholder = $('<div></div>').addClass('material-placeholder');
      var originalWidth = 0;
      var originalHeight = 0;
      origin.wrap(placeholder);

      origin.on('click', function () {
        var placeholder = origin.parent('.material-placeholder');
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var originalWidth = origin.width();
        var originalHeight = origin.height();

        // If already modal, return to original
        if (doneAnimating === false) {
          returnToOriginal();
          return false;
        } else if (overlayActive && doneAnimating === true) {
          returnToOriginal();
          return false;
        }

        // Set states
        doneAnimating = false;
        origin.addClass('active');
        overlayActive = true;

        // Set positioning for placeholder

        placeholder.css({
          width: placeholder[0].getBoundingClientRect().width,
          height: placeholder[0].getBoundingClientRect().height,
          position: 'relative',
          top: 0,
          left: 0,
        });

        // Set css on origin
        origin
          .css({ position: 'absolute', 'z-index': 1000 })
          .data('width', originalWidth)
          .data('height', originalHeight);

        // Add overlay
        var overlay = $('<div id="materialbox-overlay"></div>')
          .css({
            opacity: 0,
          })
          .click(function () {
            if (doneAnimating === true) returnToOriginal();
          });
        // Animate Overlay
        $('body').append(overlay);
        overlay.velocity(
          { opacity: 1 },
          { duration: inDuration, queue: false, easing: 'easeOutQuad' }
        );

        // Add and animate caption if it exists
        if (origin.data('caption') !== '') {
          var $photo_caption = $('<div class="materialbox-caption"></div>');
          $photo_caption.text(origin.data('caption'));
          $('body').append($photo_caption);
          $photo_caption.css({ display: 'inline' });
          $photo_caption.velocity(
            { opacity: 1 },
            { duration: inDuration, queue: false, easing: 'easeOutQuad' }
          );
        }

        // Resize Image
        var ratio = 0;
        var widthPercent = originalWidth / windowWidth;
        var heightPercent = originalHeight / windowHeight;
        var newWidth = 0;
        var newHeight = 0;

        if (widthPercent > heightPercent) {
          ratio = originalHeight / originalWidth;
          newWidth = windowWidth * 0.9;
          newHeight = windowWidth * 0.9 * ratio;
        } else {
          ratio = originalWidth / originalHeight;
          newWidth = windowHeight * 0.9 * ratio;
          newHeight = windowHeight * 0.9;
        }

        // Animate image + set z-index
        if (origin.hasClass('responsive-img')) {
          origin.velocity(
            { 'max-width': newWidth, width: originalWidth },
            {
              duration: 0,
              queue: false,
              complete: function () {
                origin.css({ left: 0, top: 0 }).velocity(
                  {
                    height: newHeight,
                    width: newWidth,
                    left:
                      $(document).scrollLeft() +
                      windowWidth / 2 -
                      origin.parent('.material-placeholder').offset().left -
                      newWidth / 2,
                    top:
                      $(document).scrollTop() +
                      windowHeight / 2 -
                      origin.parent('.material-placeholder').offset().top -
                      newHeight / 2,
                  },
                  {
                    duration: inDuration,
                    queue: false,
                    easing: 'easeOutQuad',
                    complete: function () {
                      doneAnimating = true;
                    },
                  }
                );
              }, // End Complete
            }
          ); // End Velocity
        } else {
          origin
            .css('left', 0)
            .css('top', 0)
            .velocity(
              {
                height: newHeight,
                width: newWidth,
                left:
                  $(document).scrollLeft() +
                  windowWidth / 2 -
                  origin.parent('.material-placeholder').offset().left -
                  newWidth / 2,
                top:
                  $(document).scrollTop() +
                  windowHeight / 2 -
                  origin.parent('.material-placeholder').offset().top -
                  newHeight / 2,
              },
              {
                duration: inDuration,
                queue: false,
                easing: 'easeOutQuad',
                complete: function () {
                  doneAnimating = true;
                },
              }
            ); // End Velocity
        }
      }); // End origin on click

      // Return on scroll
      $(window).scroll(function () {
        if (overlayActive) {
          returnToOriginal();
        }
      });

      // Return on ESC
      $(document).keyup(function (e) {
        if (e.keyCode === 27 && doneAnimating === true) {
          // ESC key
          if (overlayActive) {
            returnToOriginal();
          }
        }
      });

      // This function returns the modaled image to the original spot
      function returnToOriginal() {
        doneAnimating = false;

        var placeholder = origin.parent('.material-placeholder');
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var originalWidth = origin.data('width');
        var originalHeight = origin.data('height');

        origin.velocity('stop', true);
        $('#materialbox-overlay').velocity('stop', true);
        $('.materialbox-caption').velocity('stop', true);

        $('#materialbox-overlay').velocity(
          { opacity: 0 },
          {
            duration: outDuration, // Delay prevents animation overlapping
            queue: false,
            easing: 'easeOutQuad',
            complete: function () {
              // Remove Overlay
              overlayActive = false;
              $(this).remove();
            },
          }
        );

        // Resize Image
        origin.velocity(
          {
            width: originalWidth,
            height: originalHeight,
            left: 0,
            top: 0,
          },
          {
            duration: outDuration,
            queue: false,
            easing: 'easeOutQuad',
          }
        );

        // Remove Caption + reset css settings on image
        $('.materialbox-caption').velocity(
          { opacity: 0 },
          {
            duration: outDuration, // Delay prevents animation overlapping
            queue: false,
            easing: 'easeOutQuad',
            complete: function () {
              placeholder.css({
                height: '',
                width: '',
                position: '',
                top: '',
                left: '',
              });

              origin.css({
                height: '',
                top: '',
                left: '',
                width: '',
                'max-width': '',
                position: '',
                'z-index': '',
              });

              // Remove class
              origin.removeClass('active');
              doneAnimating = true;
              $(this).remove();
            },
          }
        );
      }
    });
  };

  $(document).ready(function () {
    $('.materialboxed').materialbox();
  });
})(jQuery);
(function ($) {
  $.fn.parallax = function () {
    var window_width = $(window).width();
    // Parallax Scripts
    return this.each(function (i) {
      var $this = $(this);
      $this.addClass('parallax');

      function updateParallax(initial) {
        var container_height;
        if (window_width < 601) {
          container_height =
            $this.height() > 0
              ? $this.height()
              : $this.children('img').height();
        } else {
          container_height = $this.height() > 0 ? $this.height() : 500;
        }
        var $img = $this.children('img').first();
        var img_height = $img.height();
        var parallax_dist = img_height - container_height;
        var bottom = $this.offset().top + container_height;
        var top = $this.offset().top;
        var scrollTop = $(window).scrollTop();
        var windowHeight = window.innerHeight;
        var windowBottom = scrollTop + windowHeight;
        var percentScrolled =
          (windowBottom - top) / (container_height + windowHeight);
        var parallax = Math.round(parallax_dist * percentScrolled);

        if (initial) {
          $img.css('display', 'block');
        }
        if (bottom > scrollTop && top < scrollTop + windowHeight) {
          $img.css('transform', 'translate3D(-50%,' + parallax + 'px, 0)');
        }
      }

      // Wait for image load
      $this
        .children('img')
        .one('load', function () {
          updateParallax(true);
        })
        .each(function () {
          if (this.complete) $(this).load();
        });

      $(window).scroll(function () {
        window_width = $(window).width();
        updateParallax(false);
      });

      $(window).resize(function () {
        window_width = $(window).width();
        updateParallax(false);
      });
    });
  };
})(jQuery);
(function ($) {
  var methods = {
    init: function () {
      return this.each(function () {
        // For each set of tabs, we want to keep track of
        // which tab is active and its associated content
        var $this = $(this),
          window_width = $(window).width();

        $this.width('100%');
        // Set Tab Width for each tab
        var $num_tabs = $(this).children('li').length;
        $this.children('li').each(function () {
          $(this).width(100 / $num_tabs + '%');
        });
        var $active,
          $content,
          $links = $this.find('li.tab a'),
          $tabs_width = $this.width(),
          $tab_width = $this.find('li').first().outerWidth(),
          $index = 0;

        // If the location.hash matches one of the links, use that as the active tab.
        $active = $($links.filter('[href="' + location.hash + '"]'));

        // If no match is found, use the first link or any with class 'active' as the initial active tab.
        if ($active.length === 0) {
          $active = $(this).find('li.tab a.active').first();
        }
        if ($active.length === 0) {
          $active = $(this).find('li.tab a').first();
        }

        $active.addClass('active');
        $index = $links.index($active);
        if ($index < 0) {
          $index = 0;
        }

        $content = $($active[0].hash);

        // append indicator then set indicator width to tab width
        $this.append('<div class="indicator"></div>');
        var $indicator = $this.find('.indicator');
        if ($this.is(':visible')) {
          $indicator.css({ right: $tabs_width - ($index + 1) * $tab_width });
          $indicator.css({ left: $index * $tab_width });
        }
        $(window).resize(function () {
          $tabs_width = $this.width();
          $tab_width = $this.find('li').first().outerWidth();
          if ($index < 0) {
            $index = 0;
          }
          if ($tab_width !== 0 && $tabs_width !== 0) {
            $indicator.css({ right: $tabs_width - ($index + 1) * $tab_width });
            $indicator.css({ left: $index * $tab_width });
          }
        });

        // Hide the remaining content
        $links.not($active).each(function () {
          $(this.hash).hide();
        });

        // Bind the click event handler
        $this.on('click', 'a', function (e) {
          if ($(this).parent().hasClass('disabled')) {
            e.preventDefault();
            return;
          }

          $tabs_width = $this.width();
          $tab_width = $this.find('li').first().outerWidth();

          // Make the old tab inactive.
          $active.removeClass('active');
          $content.hide();

          // Update the variables with the new link and content
          $active = $(this);
          $content = $(this.hash);
          $links = $this.find('li.tab a');

          // Make the tab active.
          $active.addClass('active');
          var $prev_index = $index;
          $index = $links.index($(this));
          if ($index < 0) {
            $index = 0;
          }
          // Change url to current tab
          // window.location.hash = $active.attr('href');

          $content.show();

          // Update indicator
          if ($index - $prev_index >= 0) {
            $indicator.velocity(
              { right: $tabs_width - ($index + 1) * $tab_width },
              { duration: 300, queue: false, easing: 'easeOutQuad' }
            );
            $indicator.velocity(
              { left: $index * $tab_width },
              { duration: 300, queue: false, easing: 'easeOutQuad', delay: 90 }
            );
          } else {
            $indicator.velocity(
              { left: $index * $tab_width },
              { duration: 300, queue: false, easing: 'easeOutQuad' }
            );
            $indicator.velocity(
              { right: $tabs_width - ($index + 1) * $tab_width },
              { duration: 300, queue: false, easing: 'easeOutQuad', delay: 90 }
            );
          }

          // Prevent the anchor's default click action
          e.preventDefault();
        });
      });
    },
    select_tab: function (id) {
      this.find('a[href="#' + id + '"]').trigger('click');
    },
  };

  $.fn.tabs = function (methodOrOptions) {
    if (methods[methodOrOptions]) {
      return methods[methodOrOptions].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
      // Default to "init"
      return methods.init.apply(this, arguments);
    } else {
      $.error(
        'Method ' + methodOrOptions + ' does not exist on jQuery.tooltip'
      );
    }
  };

  $(document).ready(function () {
    $('ul.tabs').tabs();
  });
})(jQuery);
(function ($) {
  $.fn.tooltip = function (options) {
    var timeout = null,
      counter = null,
      started = false,
      counterInterval = null,
      margin = 5;

    // Defaults
    var defaults = {
      delay: 350,
    };
    options = $.extend(defaults, options);

    //Remove previously created html
    $('.material-tooltip').remove();

    return this.each(function () {
      var origin = $(this);

      // Create Text span
      var tooltip_text = $('<span></span>').text(origin.attr('data-tooltip'));

      // Create tooltip
      var newTooltip = $('<div></div>');
      newTooltip.addClass('material-tooltip').append(tooltip_text);
      newTooltip.appendTo($('body'));

      var backdrop = $('<div></div>').addClass('backdrop');
      backdrop.appendTo(newTooltip);
      backdrop.css({ top: 0, left: 0 });

      //Destroy previously binded events
      $(this).off('mouseenter mouseleave');
      // Mouse In
      $(this).on({
        mouseenter: function (e) {
          var tooltip_delay = origin.data('delay');
          tooltip_delay =
            tooltip_delay === undefined || tooltip_delay === ''
              ? options.delay
              : tooltip_delay;
          counter = 0;
          counterInterval = setInterval(function () {
            counter += 10;
            if (counter >= tooltip_delay && started === false) {
              started = true;
              newTooltip.css({ display: 'block', left: '0px', top: '0px' });

              // Set Tooltip text
              newTooltip.children('span').text(origin.attr('data-tooltip'));

              // Tooltip positioning
              var originWidth = origin.outerWidth();
              var originHeight = origin.outerHeight();
              var tooltipPosition = origin.attr('data-position');
              var tooltipHeight = newTooltip.outerHeight();
              var tooltipWidth = newTooltip.outerWidth();
              var tooltipVerticalMovement = '0px';
              var tooltipHorizontalMovement = '0px';
              var scale_factor = 8;

              if (tooltipPosition === 'top') {
                // Top Position
                newTooltip.css({
                  top: origin.offset().top - tooltipHeight - margin,
                  left:
                    origin.offset().left + originWidth / 2 - tooltipWidth / 2,
                });
                tooltipVerticalMovement = '-10px';
                backdrop.css({
                  borderRadius: '14px 14px 0 0',
                  transformOrigin: '50% 90%',
                  marginTop: tooltipHeight,
                  marginLeft: tooltipWidth / 2 - backdrop.width() / 2,
                });
              }
              // Left Position
              else if (tooltipPosition === 'left') {
                newTooltip.css({
                  top:
                    origin.offset().top + originHeight / 2 - tooltipHeight / 2,
                  left: origin.offset().left - tooltipWidth - margin,
                });
                tooltipHorizontalMovement = '-10px';
                backdrop.css({
                  width: '14px',
                  height: '14px',
                  borderRadius: '14px 0 0 14px',
                  transformOrigin: '95% 50%',
                  marginTop: tooltipHeight / 2,
                  marginLeft: tooltipWidth,
                });
              }
              // Right Position
              else if (tooltipPosition === 'right') {
                newTooltip.css({
                  top:
                    origin.offset().top + originHeight / 2 - tooltipHeight / 2,
                  left: origin.offset().left + originWidth + margin,
                });
                tooltipHorizontalMovement = '+10px';
                backdrop.css({
                  width: '14px',
                  height: '14px',
                  borderRadius: '0 14px 14px 0',
                  transformOrigin: '5% 50%',
                  marginTop: tooltipHeight / 2,
                  marginLeft: '0px',
                });
              } else {
                // Bottom Position
                newTooltip.css({
                  top: origin.offset().top + origin.outerHeight() + margin,
                  left:
                    origin.offset().left + originWidth / 2 - tooltipWidth / 2,
                });
                tooltipVerticalMovement = '+10px';
                backdrop.css({
                  marginLeft: tooltipWidth / 2 - backdrop.width() / 2,
                });
              }

              // Calculate Scale to fill
              scale_factor = tooltipWidth / 8;
              if (scale_factor < 8) {
                scale_factor = 8;
              }
              if (tooltipPosition === 'right' || tooltipPosition === 'left') {
                scale_factor = tooltipWidth / 10;
                if (scale_factor < 6) scale_factor = 6;
              }

              newTooltip.velocity(
                {
                  opacity: 1,
                  marginTop: tooltipVerticalMovement,
                  marginLeft: tooltipHorizontalMovement,
                },
                { duration: 350, queue: false }
              );
              backdrop
                .css({ display: 'block' })
                .velocity(
                  { opacity: 1 },
                  { duration: 55, delay: 0, queue: false }
                )
                .velocity(
                  { scale: scale_factor },
                  {
                    duration: 300,
                    delay: 0,
                    queue: false,
                    easing: 'easeInOutQuad',
                  }
                );
            }
          }, 10); // End Interval

          // Mouse Out
        },
        mouseleave: function () {
          // Reset State
          clearInterval(counterInterval);
          counter = 0;

          // Animate back
          newTooltip.velocity(
            {
              opacity: 0,
              marginTop: 0,
              marginLeft: 0,
            },
            { duration: 225, queue: false, delay: 275 }
          );
          backdrop.velocity(
            { opacity: 0, scale: 1 },
            {
              duration: 225,
              delay: 275,
              queue: false,
              complete: function () {
                backdrop.css('display', 'none');
                newTooltip.css('display', 'none');
                started = false;
              },
            }
          );
        },
      });
    });
  };

  $(document).ready(function () {
    $('.tooltipped').tooltip();
  });
})(jQuery);
/*!
 * Waves v0.6.4
 * http://fian.my.id/Waves
 *
 * Copyright 2014 Alfiana E. Sibuea and other contributors
 * Released under the MIT license
 * https://github.com/fians/Waves/blob/master/LICENSE
 */
(function (window) {
  'use strict';

  var Waves = Waves || {};
  var $$ = document.querySelectorAll.bind(document);

  // Find exact position of element
  function isWindow(obj) {
    return obj !== null && obj === obj.window;
  }

  function getWindow(elem) {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }

  function offset(elem) {
    var docElem,
      win,
      box = { top: 0, left: 0 },
      doc = elem && elem.ownerDocument;

    docElem = doc.documentElement;

    if (typeof elem.getBoundingClientRect !== typeof undefined) {
      box = elem.getBoundingClientRect();
    }
    win = getWindow(doc);
    return {
      top: box.top + win.pageYOffset - docElem.clientTop,
      left: box.left + win.pageXOffset - docElem.clientLeft,
    };
  }

  function convertStyle(obj) {
    var style = '';

    for (var a in obj) {
      if (obj.hasOwnProperty(a)) {
        style += a + ':' + obj[a] + ';';
      }
    }

    return style;
  }

  var Effect = {
    // Effect delay
    duration: 750,

    show: function (e, element) {
      // Disable right click
      if (e.button === 2) {
        return false;
      }

      var el = element || this;

      // Create ripple
      var ripple = document.createElement('div');
      ripple.className = 'waves-ripple';
      el.appendChild(ripple);

      // Get click coordinate and element witdh
      var pos = offset(el);
      var relativeY = e.pageY - pos.top;
      var relativeX = e.pageX - pos.left;
      var scale = 'scale(' + (el.clientWidth / 100) * 10 + ')';

      // Support for touch devices
      if ('touches' in e) {
        relativeY = e.touches[0].pageY - pos.top;
        relativeX = e.touches[0].pageX - pos.left;
      }

      // Attach data to element
      ripple.setAttribute('data-hold', Date.now());
      ripple.setAttribute('data-scale', scale);
      ripple.setAttribute('data-x', relativeX);
      ripple.setAttribute('data-y', relativeY);

      // Set ripple position
      var rippleStyle = {
        top: relativeY + 'px',
        left: relativeX + 'px',
      };

      ripple.className = ripple.className + ' waves-notransition';
      ripple.setAttribute('style', convertStyle(rippleStyle));
      ripple.className = ripple.className.replace('waves-notransition', '');

      // Scale the ripple
      rippleStyle['-webkit-transform'] = scale;
      rippleStyle['-moz-transform'] = scale;
      rippleStyle['-ms-transform'] = scale;
      rippleStyle['-o-transform'] = scale;
      rippleStyle.transform = scale;
      rippleStyle.opacity = '1';

      rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
      rippleStyle['-moz-transition-duration'] = Effect.duration + 'ms';
      rippleStyle['-o-transition-duration'] = Effect.duration + 'ms';
      rippleStyle['transition-duration'] = Effect.duration + 'ms';

      rippleStyle['-webkit-transition-timing-function'] =
        'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
      rippleStyle['-moz-transition-timing-function'] =
        'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
      rippleStyle['-o-transition-timing-function'] =
        'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
      rippleStyle['transition-timing-function'] =
        'cubic-bezier(0.250, 0.460, 0.450, 0.940)';

      ripple.setAttribute('style', convertStyle(rippleStyle));
    },

    hide: function (e) {
      TouchHandler.touchup(e);

      var el = this;
      var width = el.clientWidth * 1.4;

      // Get first ripple
      var ripple = null;
      var ripples = el.getElementsByClassName('waves-ripple');
      if (ripples.length > 0) {
        ripple = ripples[ripples.length - 1];
      } else {
        return false;
      }

      var relativeX = ripple.getAttribute('data-x');
      var relativeY = ripple.getAttribute('data-y');
      var scale = ripple.getAttribute('data-scale');

      // Get delay beetween mousedown and mouse leave
      var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
      var delay = 350 - diff;

      if (delay < 0) {
        delay = 0;
      }

      // Fade out ripple after delay
      setTimeout(function () {
        var style = {
          top: relativeY + 'px',
          left: relativeX + 'px',
          opacity: '0',

          // Duration
          '-webkit-transition-duration': Effect.duration + 'ms',
          '-moz-transition-duration': Effect.duration + 'ms',
          '-o-transition-duration': Effect.duration + 'ms',
          'transition-duration': Effect.duration + 'ms',
          '-webkit-transform': scale,
          '-moz-transform': scale,
          '-ms-transform': scale,
          '-o-transform': scale,
          transform: scale,
        };

        ripple.setAttribute('style', convertStyle(style));

        setTimeout(function () {
          try {
            el.removeChild(ripple);
          } catch (e) {
            return false;
          }
        }, Effect.duration);
      }, delay);
    },

    // Little hack to make <input> can perform waves effect
    wrapInput: function (elements) {
      for (var a = 0; a < elements.length; a++) {
        var el = elements[a];

        if (el.tagName.toLowerCase() === 'input') {
          var parent = el.parentNode;

          // If input already have parent just pass through
          if (
            parent.tagName.toLowerCase() === 'i' &&
            parent.className.indexOf('waves-effect') !== -1
          ) {
            continue;
          }

          // Put element class and style to the specified parent
          var wrapper = document.createElement('i');
          wrapper.className = el.className + ' waves-input-wrapper';

          var elementStyle = el.getAttribute('style');

          if (!elementStyle) {
            elementStyle = '';
          }

          wrapper.setAttribute('style', elementStyle);

          el.className = 'waves-button-input';
          el.removeAttribute('style');

          // Put element as child
          parent.replaceChild(wrapper, el);
          wrapper.appendChild(el);
        }
      }
    },
  };

  /**
   * Disable mousedown event for 500ms during and after touch
   */
  var TouchHandler = {
    /* uses an integer rather than bool so there's no issues with
     * needing to clear timeouts if another touch event occurred
     * within the 500ms. Cannot mouseup between touchstart and
     * touchend, nor in the 500ms after touchend. */
    touches: 0,
    allowEvent: function (e) {
      var allow = true;

      if (e.type === 'touchstart') {
        TouchHandler.touches += 1; //push
      } else if (e.type === 'touchend' || e.type === 'touchcancel') {
        setTimeout(function () {
          if (TouchHandler.touches > 0) {
            TouchHandler.touches -= 1; //pop after 500ms
          }
        }, 500);
      } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
        allow = false;
      }

      return allow;
    },
    touchup: function (e) {
      TouchHandler.allowEvent(e);
    },
  };

  /**
   * Delegated click handler for .waves-effect element.
   * returns null when .waves-effect element not in "click tree"
   */
  function getWavesEffectElement(e) {
    if (TouchHandler.allowEvent(e) === false) {
      return null;
    }

    var element = null;
    var target = e.target || e.srcElement;

    while (target.parentElement !== null) {
      if (
        !(target instanceof SVGElement) &&
        target.className.indexOf('waves-effect') !== -1
      ) {
        element = target;
        break;
      } else if (target.classList.contains('waves-effect')) {
        element = target;
        break;
      }
      target = target.parentElement;
    }

    return element;
  }

  /**
   * Bubble the click and show effect if .waves-effect elem was found
   */
  function showEffect(e) {
    var element = getWavesEffectElement(e);

    if (element !== null) {
      Effect.show(e, element);

      if ('ontouchstart' in window) {
        element.addEventListener('touchend', Effect.hide, false);
        element.addEventListener('touchcancel', Effect.hide, false);
      }

      element.addEventListener('mouseup', Effect.hide, false);
      element.addEventListener('mouseleave', Effect.hide, false);
    }
  }

  Waves.displayEffect = function (options) {
    options = options || {};

    if ('duration' in options) {
      Effect.duration = options.duration;
    }

    //Wrap input inside <i> tag
    Effect.wrapInput($$('.waves-effect'));

    if ('ontouchstart' in window) {
      document.body.addEventListener('touchstart', showEffect, false);
    }

    document.body.addEventListener('mousedown', showEffect, false);
  };

  /**
   * Attach Waves to an input element (or any element which doesn't
   * bubble mouseup/mousedown events).
   *   Intended to be used with dynamically loaded forms/inputs, or
   * where the user doesn't want a delegated click handler.
   */
  Waves.attach = function (element) {
    //FUTURE: automatically add waves classes and allow users
    // to specify them with an options param? Eg. light/classic/button
    if (element.tagName.toLowerCase() === 'input') {
      Effect.wrapInput([element]);
      element = element.parentElement;
    }

    if ('ontouchstart' in window) {
      element.addEventListener('touchstart', showEffect, false);
    }

    element.addEventListener('mousedown', showEffect, false);
  };

  window.Waves = Waves;

  document.addEventListener(
    'DOMContentLoaded',
    function () {
      Waves.displayEffect();
    },
    false
  );
})(window);
Materialize.toast = function (
  message,
  displayLength,
  className,
  completeCallback
) {
  className = className || '';

  var container = document.getElementById('toast-container');

  // Create toast container if it does not exist
  if (container === null) {
    // create notification container
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  // Select and append toast
  var newToast = createToast(message);

  // only append toast if message is not undefined
  if (message) {
    container.appendChild(newToast);
  }

  newToast.style.top = '35px';
  newToast.style.opacity = 0;

  // Animate toast in
  Vel(
    newToast,
    { top: '0px', opacity: 1 },
    { duration: 300, easing: 'easeOutCubic', queue: false }
  );

  // Allows timer to be pause while being panned
  var timeLeft = displayLength;
  var counterInterval = setInterval(function () {
    if (newToast.parentNode === null) window.clearInterval(counterInterval);

    // If toast is not being dragged, decrease its time remaining
    if (!newToast.classList.contains('panning')) {
      timeLeft -= 20;
    }

    if (timeLeft <= 0) {
      // Animate toast out
      Vel(
        newToast,
        { opacity: 0, marginTop: '-40px' },
        {
          duration: 375,
          easing: 'easeOutExpo',
          queue: false,
          complete: function () {
            // Call the optional callback
            if (typeof completeCallback === 'function') completeCallback();
            // Remove toast after it times out
            this[0].parentNode.removeChild(this[0]);
          },
        }
      );
      window.clearInterval(counterInterval);
    }
  }, 20);

  function createToast(html) {
    // Create toast
    var toast = document.createElement('div');
    toast.classList.add('toast');
    if (className) {
      var classes = className.split(' ');

      for (var i = 0, count = classes.length; i < count; i++) {
        toast.classList.add(classes[i]);
      }
    }
    toast.innerHTML = html;

    // Bind hammer
    var hammerHandler = new Hammer(toast, { prevent_default: false });
    hammerHandler.on('pan', function (e) {
      var deltaX = e.deltaX;
      var activationDistance = 80;

      // Change toast state
      if (!toast.classList.contains('panning')) {
        toast.classList.add('panning');
      }

      var opacityPercent = 1 - Math.abs(deltaX / activationDistance);
      if (opacityPercent < 0) opacityPercent = 0;

      Vel(
        toast,
        { left: deltaX, opacity: opacityPercent },
        { duration: 50, queue: false, easing: 'easeOutQuad' }
      );
    });

    hammerHandler.on('panend', function (e) {
      var deltaX = e.deltaX;
      var activationDistance = 80;

      // If toast dragged past activation point
      if (Math.abs(deltaX) > activationDistance) {
        Vel(
          toast,
          { marginTop: '-40px' },
          {
            duration: 375,
            easing: 'easeOutExpo',
            queue: false,
            complete: function () {
              if (typeof completeCallback === 'function') {
                completeCallback();
              }
              toast.parentNode.removeChild(toast);
            },
          }
        );
      } else {
        toast.classList.remove('panning');
        // Put toast back into original position
        Vel(
          toast,
          { left: 0, opacity: 1 },
          { duration: 300, easing: 'easeOutExpo', queue: false }
        );
      }
    });

    return toast;
  }
};
(function ($) {
  var methods = {
    init: function (options) {
      var defaults = {
        menuWidth: 240,
        edge: 'left',
        closeOnClick: false,
      };
      options = $.extend(defaults, options);

      $(this).each(function () {
        var $this = $(this);
        var menu_id = $('#' + $this.attr('data-activates'));

        // Set to width
        if (options.menuWidth != 240) {
          menu_id.css('width', options.menuWidth);
        }

        // Add Touch Area
        $('body').append($('<div class="drag-target"></div>'));

        if (options.edge == 'left') {
          menu_id.css('left', -1 * (options.menuWidth + 10));
          $('.drag-target').css({ left: 0 }); // Add Touch Area
        } else {
          menu_id
            .addClass('right-aligned') // Change text-alignment to right
            .css('right', -1 * (options.menuWidth + 10))
            .css('left', '');
          $('.drag-target').css({ right: 0 }); // Add Touch Area
        }

        // If fixed sidenav, bring menu out
        if (menu_id.hasClass('fixed')) {
          if (window.innerWidth > 992) {
            // Close menu if window is resized bigger than 992 and user has fixed sidenav
            if ($('#sidenav-overlay').css('opacity') !== 0 && menuOut) {
              removeMenu(true);
            } else {
              menu_id.removeAttr('style');
              menu_id.css('width', options.menuWidth);
            }
          } else if (menuOut === false) {
            if (options.edge === 'left')
              menu_id.css('left', -1 * (options.menuWidth + 10));
            else menu_id.css('right', -1 * (options.menuWidth + 10));
          }
        }

        // Window resize to reset on large screens fixed
        if (menu_id.hasClass('fixed')) {
          $(window).resize(function () {
            if (window.innerWidth > 992) {
              // Close menu if window is resized bigger than 992 and user has fixed sidenav
              if ($('#sidenav-overlay').css('opacity') !== 0 && menuOut) {
                removeMenu(true);
              } else {
                menu_id.removeAttr('style');
                menu_id.css('width', options.menuWidth);
              }
            } else if (menuOut === false) {
              if (options.edge === 'left')
                menu_id.css('left', -1 * (options.menuWidth + 10));
              else menu_id.css('right', -1 * (options.menuWidth + 10));
            }
          });
        }

        // if closeOnClick, then add close event for all a tags in side sideNav
        if (options.closeOnClick === true) {
          menu_id.on(
            'click.itemclick',
            'a:not(.collapsible-header)',
            function () {
              removeMenu();
            }
          );
        }

        function removeMenu(restoreNav) {
          panning = false;
          menuOut = false;

          // Reenable scrolling
          $('body').css('overflow', '');

          $('#sidenav-overlay').velocity(
            { opacity: 0 },
            {
              duration: 200,
              queue: false,
              easing: 'easeOutQuad',
              complete: function () {
                $(this).remove();
              },
            }
          );
          if (options.edge === 'left') {
            // Reset phantom div
            $('.drag-target').css({ width: '', right: '', left: '0' });
            menu_id.velocity(
              { left: -1 * (options.menuWidth + 10) },
              {
                duration: 200,
                queue: false,
                easing: 'easeOutCubic',
                complete: function () {
                  if (restoreNav === true) {
                    // Restore Fixed sidenav
                    menu_id.removeAttr('style');
                    menu_id.css('width', options.menuWidth);
                  }
                  menu_id.trigger('close');
                },
              }
            );
          } else {
            // Reset phantom div
            $('.drag-target').css({ width: '', right: '0', left: '' });
            menu_id.velocity(
              { right: -1 * (options.menuWidth + 10) },
              {
                duration: 200,
                queue: false,
                easing: 'easeOutCubic',
                complete: function () {
                  if (restoreNav === true) {
                    // Restore Fixed sidenav
                    menu_id.removeAttr('style');
                    menu_id.css('width', options.menuWidth);
                  }
                  menu_id.trigger('close');
                },
              }
            );
          }
        }

        // Touch Event
        var panning = false;
        var menuOut = false;

        $('.drag-target').on('click', function () {
          if (options.closeOnClick === true) {
            removeMenu();
          }
        });

        $('.drag-target')
          .hammer({
            prevent_default: false,
          })
          .bind('pan', function (e) {
            if (e.gesture.pointerType == 'touch') {
              var direction = e.gesture.direction;
              var x = e.gesture.center.x;
              var y = e.gesture.center.y;
              var velocityX = e.gesture.velocityX;

              // Disable Scrolling
              $('body').css('overflow', 'hidden');

              // If overlay does not exist, create one and if it is clicked, close menu
              if ($('#sidenav-overlay').length === 0) {
                var overlay = $('<div id="sidenav-overlay"></div>');
                overlay.css('opacity', 0).click(function () {
                  removeMenu();
                });
                $('body').append(overlay);
              }

              // Keep within boundaries
              if (options.edge === 'left') {
                if (x > options.menuWidth) {
                  x = options.menuWidth;
                } else if (x < 0) {
                  x = 0;
                }
              }

              if (options.edge === 'left') {
                // Left Direction
                if (x < options.menuWidth / 2) {
                  menuOut = false;
                }
                // Right Direction
                else if (x >= options.menuWidth / 2) {
                  menuOut = true;
                }

                menu_id.css('left', x - options.menuWidth);
              } else {
                // Left Direction
                if (x < window.innerWidth - options.menuWidth / 2) {
                  menuOut = true;
                }
                // Right Direction
                else if (x >= window.innerWidth - options.menuWidth / 2) {
                  menuOut = false;
                }
                var rightPos = -1 * (x - options.menuWidth / 2);
                if (rightPos > 0) {
                  rightPos = 0;
                }

                menu_id.css('right', rightPos);
              }

              // Percentage overlay
              var overlayPerc;
              if (options.edge === 'left') {
                overlayPerc = x / options.menuWidth;
                $('#sidenav-overlay').velocity(
                  { opacity: overlayPerc },
                  { duration: 50, queue: false, easing: 'easeOutQuad' }
                );
              } else {
                overlayPerc = Math.abs(
                  (x - window.innerWidth) / options.menuWidth
                );
                $('#sidenav-overlay').velocity(
                  { opacity: overlayPerc },
                  { duration: 50, queue: false, easing: 'easeOutQuad' }
                );
              }
            }
          })
          .bind('panend', function (e) {
            if (e.gesture.pointerType == 'touch') {
              var velocityX = e.gesture.velocityX;
              panning = false;
              if (options.edge === 'left') {
                // If velocityX <= 0.3 then the user is flinging the menu closed so ignore menuOut
                if ((menuOut && velocityX <= 0.3) || velocityX < -0.5) {
                  menu_id.velocity(
                    { left: 0 },
                    { duration: 300, queue: false, easing: 'easeOutQuad' }
                  );
                  $('#sidenav-overlay').velocity(
                    { opacity: 1 },
                    { duration: 50, queue: false, easing: 'easeOutQuad' }
                  );
                  $('.drag-target').css({ width: '50%', right: 0, left: '' });
                } else if (!menuOut || velocityX > 0.3) {
                  // Enable Scrolling
                  $('body').css('overflow', '');
                  // Slide menu closed
                  menu_id.velocity(
                    { left: -1 * (options.menuWidth + 10) },
                    { duration: 200, queue: false, easing: 'easeOutQuad' }
                  );
                  $('#sidenav-overlay').velocity(
                    { opacity: 0 },
                    {
                      duration: 200,
                      queue: false,
                      easing: 'easeOutQuad',
                      complete: function () {
                        $(this).remove();
                      },
                    }
                  );
                  $('.drag-target').css({ width: '10px', right: '', left: 0 });
                }
              } else {
                if ((menuOut && velocityX >= -0.3) || velocityX > 0.5) {
                  menu_id.velocity(
                    { right: 0 },
                    { duration: 300, queue: false, easing: 'easeOutQuad' }
                  );
                  $('#sidenav-overlay').velocity(
                    { opacity: 1 },
                    { duration: 50, queue: false, easing: 'easeOutQuad' }
                  );
                  $('.drag-target').css({ width: '50%', right: '', left: 0 });
                } else if (!menuOut || velocityX < -0.3) {
                  // Enable Scrolling
                  $('body').css('overflow', '');
                  // Slide menu closed
                  menu_id.velocity(
                    { right: -1 * (options.menuWidth + 10) },
                    { duration: 200, queue: false, easing: 'easeOutQuad' }
                  );
                  $('#sidenav-overlay').velocity(
                    { opacity: 0 },
                    {
                      duration: 200,
                      queue: false,
                      easing: 'easeOutQuad',
                      complete: function () {
                        $(this).remove();
                      },
                    }
                  );
                  $('.drag-target').css({ width: '10px', right: 0, left: '' });
                }
              }
            }
          });

        $this.click(function () {
          if (menuOut === true) {
            menuOut = false;
            panning = false;
            removeMenu();
          } else {
            // Disable Scrolling
            $('body').css('overflow', 'hidden');

            if (options.edge === 'left') {
              $('.drag-target').css({ width: '50%', right: 0, left: '' });
              menu_id.velocity(
                { left: 0 },
                { duration: 300, queue: false, easing: 'easeOutQuad' }
              );
            } else {
              $('.drag-target').css({ width: '50%', right: '', left: 0 });
              menu_id.velocity(
                { right: 0 },
                { duration: 300, queue: false, easing: 'easeOutQuad' }
              );
              menu_id.css('left', '');
            }

            var overlay = $('<div id="sidenav-overlay"></div>');
            overlay.css('opacity', 0).click(function () {
              menuOut = false;
              panning = false;
              removeMenu();
              overlay.velocity(
                { opacity: 0 },
                {
                  duration: 300,
                  queue: false,
                  easing: 'easeOutQuad',
                  complete: function () {
                    $(this).remove();
                  },
                }
              );
            });
            $('body').append(overlay);
            overlay.velocity(
              { opacity: 1 },
              {
                duration: 300,
                queue: false,
                easing: 'easeOutQuad',
                complete: function () {
                  menuOut = true;
                  panning = false;
                  menu_id.trigger('open');
                },
              }
            );
          }

          return false;
        });
      });
    },
    show: function () {
      this.trigger('click');
    },
    hide: function () {
      $('#sidenav-overlay').trigger('click');
    },
  };

  $.fn.sideNav = function (methodOrOptions) {
    if (methods[methodOrOptions]) {
      return methods[methodOrOptions].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
      // Default to "init"
      return methods.init.apply(this, arguments);
    } else {
      $.error(
        'Method ' + methodOrOptions + ' does not exist on jQuery.sideNav'
      );
    }
  }; // Plugin end
})(jQuery);
/**
 * Extend jquery with a scrollspy plugin.
 * This watches the window scroll and fires events when elements are scrolled into viewport.
 *
 * throttle() and getTime() taken from Underscore.js
 * https://github.com/jashkenas/underscore
 *
 * @author Copyright 2013 John Smart
 * @license https://raw.github.com/thesmart/jquery-scrollspy/master/LICENSE
 * @see https://github.com/thesmart
 * @version 0.1.2
 */
(function ($) {
  var jWindow = $(window);
  var elements = [];
  var elementsInView = [];
  var isSpying = false;
  var ticks = 0;
  var unique_id = 1;
  var offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  /**
   * Find elements that are within the boundary
   * @param {number} top
   * @param {number} right
   * @param {number} bottom
   * @param {number} left
   * @return {jQuery}		A collection of elements
   */
  function findElements(top, right, bottom, left) {
    var hits = $();
    $.each(elements, function (i, element) {
      if (element.height() > 0) {
        var elTop = element.offset().top,
          elLeft = element.offset().left,
          elRight = elLeft + element.width(),
          elBottom = elTop + element.height();

        var isIntersect = !(
          elLeft > right ||
          elRight < left ||
          elTop > bottom ||
          elBottom < top
        );

        if (isIntersect) {
          hits.push(element);
        }
      }
    });

    return hits;
  }

  /**
   * Called when the user scrolls the window
   */
  function onScroll() {
    // unique tick id
    ++ticks;

    // viewport rectangle
    var top = jWindow.scrollTop(),
      left = jWindow.scrollLeft(),
      right = left + jWindow.width(),
      bottom = top + jWindow.height();

    // determine which elements are in view
    //        + 60 accounts for fixed nav
    var intersections = findElements(
      top + offset.top + 200,
      right + offset.right,
      bottom + offset.bottom,
      left + offset.left
    );
    $.each(intersections, function (i, element) {
      var lastTick = element.data('scrollSpy:ticks');
      if (typeof lastTick != 'number') {
        // entered into view
        element.triggerHandler('scrollSpy:enter');
      }

      // update tick id
      element.data('scrollSpy:ticks', ticks);
    });

    // determine which elements are no longer in view
    $.each(elementsInView, function (i, element) {
      var lastTick = element.data('scrollSpy:ticks');
      if (typeof lastTick == 'number' && lastTick !== ticks) {
        // exited from view
        element.triggerHandler('scrollSpy:exit');
        element.data('scrollSpy:ticks', null);
      }
    });

    // remember elements in view for next tick
    elementsInView = intersections;
  }

  /**
   * Called when window is resized
   */
  function onWinSize() {
    jWindow.trigger('scrollSpy:winSize');
  }

  /**
   * Get time in ms
   * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
   * @type {function}
   * @return {number}
   */
  var getTime =
    Date.now ||
    function () {
      return new Date().getTime();
    };

  /**
   * Returns a function, that, when invoked, will only be triggered at most once
   * during a given window of time. Normally, the throttled function will run
   * as much as it can, without ever going more than once per `wait` duration;
   * but if you'd like to disable the execution on the leading edge, pass
   * `{leading: false}`. To disable execution on the trailing edge, ditto.
   * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
   * @param {function} func
   * @param {number} wait
   * @param {Object=} options
   * @returns {Function}
   */
  function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function () {
      previous = options.leading === false ? 0 : getTime();
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    };
    return function () {
      var now = getTime();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  }

  /**
	 * Enables ScrollSpy using a selector
	 * @param {jQuery|string} selector  The elements collection, or a selector
	 * @param {Object=} options	Optional.
        throttle : number -> scrollspy throttling. Default: 100 ms
        offsetTop : number -> offset from top. Default: 0
        offsetRight : number -> offset from right. Default: 0
        offsetBottom : number -> offset from bottom. Default: 0
        offsetLeft : number -> offset from left. Default: 0
	 * @returns {jQuery}
	 */
  $.scrollSpy = function (selector, options) {
    var visible = [];
    selector = $(selector);
    selector.each(function (i, element) {
      elements.push($(element));
      $(element).data('scrollSpy:id', i);
      // Smooth scroll to section
      $('a[href=#' + $(element).attr('id') + ']').click(function (e) {
        e.preventDefault();
        var offset = $(this.hash).offset().top + 1;

        //          offset - 200 allows elements near bottom of page to scroll

        $('html, body').animate(
          { scrollTop: offset - 200 },
          { duration: 400, queue: false, easing: 'easeOutCubic' }
        );
      });
    });
    options = options || {
      throttle: 100,
    };

    offset.top = options.offsetTop || 0;
    offset.right = options.offsetRight || 0;
    offset.bottom = options.offsetBottom || 0;
    offset.left = options.offsetLeft || 0;

    var throttledScroll = throttle(onScroll, options.throttle || 100);
    var readyScroll = function () {
      $(document).ready(throttledScroll);
    };

    if (!isSpying) {
      jWindow.on('scroll', readyScroll);
      jWindow.on('resize', readyScroll);
      isSpying = true;
    }

    // perform a scan once, after current execution context, and after dom is ready
    setTimeout(readyScroll, 0);

    selector.on('scrollSpy:enter', function () {
      visible = $.grep(visible, function (value) {
        return value.height() != 0;
      });

      var $this = $(this);

      if (visible[0]) {
        $('a[href=#' + visible[0].attr('id') + ']').removeClass('active');
        if ($this.data('scrollSpy:id') < visible[0].data('scrollSpy:id')) {
          visible.unshift($(this));
        } else {
          visible.push($(this));
        }
      } else {
        visible.push($(this));
      }

      $('a[href=#' + visible[0].attr('id') + ']').addClass('active');
    });
    selector.on('scrollSpy:exit', function () {
      visible = $.grep(visible, function (value) {
        return value.height() != 0;
      });

      if (visible[0]) {
        $('a[href=#' + visible[0].attr('id') + ']').removeClass('active');
        var $this = $(this);
        visible = $.grep(visible, function (value) {
          return value.attr('id') != $this.attr('id');
        });
        if (visible[0]) {
          // Check if empty
          $('a[href=#' + visible[0].attr('id') + ']').addClass('active');
        }
      }
    });

    return selector;
  };

  /**
   * Listen for window resize events
   * @param {Object=} options						Optional. Set { throttle: number } to change throttling. Default: 100 ms
   * @returns {jQuery}		$(window)
   */
  $.winSizeSpy = function (options) {
    $.winSizeSpy = function () {
      return jWindow;
    }; // lock from multiple calls
    options = options || {
      throttle: 100,
    };
    return jWindow.on('resize', throttle(onWinSize, options.throttle || 100));
  };

  /**
	 * Enables ScrollSpy on a collection of elements
	 * e.g. $('.scrollSpy').scrollSpy()
	 * @param {Object=} options	Optional.
											throttle : number -> scrollspy throttling. Default: 100 ms
											offsetTop : number -> offset from top. Default: 0
											offsetRight : number -> offset from right. Default: 0
											offsetBottom : number -> offset from bottom. Default: 0
											offsetLeft : number -> offset from left. Default: 0
	 * @returns {jQuery}
	 */
  $.fn.scrollSpy = function (options) {
    return $.scrollSpy($(this), options);
  };
})(jQuery);
(function ($) {
  $(document).ready(function () {
    // Function to update labels of text fields
    Materialize.updateTextFields = function () {
      var input_selector =
        'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
      $(input_selector).each(function (index, element) {
        if (
          $(element).val().length > 0 ||
          $(this).attr('placeholder') !== undefined ||
          $(element)[0].validity.badInput === true
        ) {
          $(this).siblings('label, i').addClass('active');
        } else {
          $(this).siblings('label, i').removeClass('active');
        }
      });
    };

    // Text based inputs
    var input_selector =
      'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';

    // Handle HTML5 autofocus
    $('input[autofocus]').siblings('label, i').addClass('active');

    // Add active if form auto complete
    $(document).on('change', input_selector, function () {
      if (
        $(this).val().length !== 0 ||
        $(this).attr('placeholder') !== undefined
      ) {
        $(this).siblings('label, i').addClass('active');
      }
      validate_field($(this));
    });

    // Add active if input element has been pre-populated on document ready
    $(document).ready(function () {
      Materialize.updateTextFields();
    });

    // HTML DOM FORM RESET handling
    $(document).on('reset', function (e) {
      var formReset = $(e.target);
      if (formReset.is('form')) {
        formReset
          .find(input_selector)
          .removeClass('valid')
          .removeClass('invalid');
        formReset.find(input_selector).each(function () {
          if ($(this).attr('value') === '') {
            $(this).siblings('label, i').removeClass('active');
          }
        });

        // Reset select
        formReset.find('select.initialized').each(function () {
          var reset_text = formReset.find('option[selected]').text();
          formReset.siblings('input.select-dropdown').val(reset_text);
        });
      }
    });

    // Add active when element has focus
    $(document).on('focus', input_selector, function () {
      $(this).siblings('label, i').addClass('active');
    });

    $(document).on('blur', input_selector, function () {
      var $inputElement = $(this);
      if (
        $inputElement.val().length === 0 &&
        $inputElement[0].validity.badInput !== true &&
        $inputElement.attr('placeholder') === undefined
      ) {
        $inputElement.siblings('label, i').removeClass('active');
      }
      validate_field($inputElement);
    });

    validate_field = function (object) {
      var hasLength = object.attr('length') !== undefined;
      var lenAttr = parseInt(object.attr('length'));
      var len = object.val().length;

      if (object.val().length === 0 && object[0].validity.badInput === false) {
        if (object.hasClass('validate')) {
          object.removeClass('valid');
          object.removeClass('invalid');
        }
      } else {
        if (object.hasClass('validate')) {
          // Check for character counter attributes
          if (
            (object.is(':valid') && hasLength && len < lenAttr) ||
            (object.is(':valid') && !hasLength)
          ) {
            object.removeClass('invalid');
            object.addClass('valid');
          } else {
            object.removeClass('valid');
            object.addClass('invalid');
          }
        }
      }
    };

    // Textarea Auto Resize
    var hiddenDiv = $('.hiddendiv').first();
    if (!hiddenDiv.length) {
      hiddenDiv = $('<div class="hiddendiv common"></div>');
      $('body').append(hiddenDiv);
    }
    var text_area_selector = '.materialize-textarea';

    function textareaAutoResize($textarea) {
      // Set font properties of hiddenDiv

      var fontFamily = $textarea.css('font-family');
      var fontSize = $textarea.css('font-size');

      if (fontSize) {
        hiddenDiv.css('font-size', fontSize);
      }
      if (fontFamily) {
        hiddenDiv.css('font-family', fontFamily);
      }

      if ($textarea.attr('wrap') === 'off') {
        hiddenDiv.css('overflow-wrap', 'normal').css('white-space', 'pre');
      }

      hiddenDiv.text($textarea.val() + '\n');
      var content = hiddenDiv.html().replace(/\n/g, '<br>');
      hiddenDiv.html(content);

      // When textarea is hidden, width goes crazy.
      // Approximate with half of window size

      if ($textarea.is(':visible')) {
        hiddenDiv.css('width', $textarea.width());
      } else {
        hiddenDiv.css('width', $(window).width() / 2);
      }

      $textarea.css('height', hiddenDiv.height());
    }

    $(text_area_selector).each(function () {
      var $textarea = $(this);
      if ($textarea.val().length) {
        textareaAutoResize($textarea);
      }
    });

    $('body').on('keyup keydown autoresize', text_area_selector, function () {
      textareaAutoResize($(this));
    });

    // File Input Path
    $('.file-field').each(function () {
      var path_input = $(this).find('input.file-path');
      $(this)
        .find('input[type="file"]')
        .change(function () {
          path_input.val($(this)[0].files[0].name);
          path_input.trigger('change');
        });
    });

    /****************
     *  Range Input  *
     ****************/

    var range_type = 'input[type=range]';
    var range_mousedown = false;
    var left;

    $(range_type).each(function () {
      var thumb = $('<span class="thumb"><span class="value"></span></span>');
      $(this).after(thumb);
    });

    var range_wrapper = '.range-field';
    $(document).on('change', range_type, function (e) {
      var thumb = $(this).siblings('.thumb');
      thumb.find('.value').html($(this).val());
    });

    $(document).on('mousedown touchstart', range_type, function (e) {
      var thumb = $(this).siblings('.thumb');

      // If thumb indicator does not exist yet, create it
      if (thumb.length <= 0) {
        thumb = $('<span class="thumb"><span class="value"></span></span>');
        $(this).append(thumb);
      }

      // Set indicator value
      thumb.find('.value').html($(this).val());

      range_mousedown = true;
      $(this).addClass('active');

      if (!thumb.hasClass('active')) {
        thumb.velocity(
          { height: '30px', width: '30px', top: '-20px', marginLeft: '-15px' },
          { duration: 300, easing: 'easeOutExpo' }
        );
      }

      if (e.pageX === undefined || e.pageX === null) {
        //mobile
        left = e.originalEvent.touches[0].pageX - $(this).offset().left;
      } else {
        // desktop
        left = e.pageX - $(this).offset().left;
      }
      var width = $(this).outerWidth();

      if (left < 0) {
        left = 0;
      } else if (left > width) {
        left = width;
      }
      thumb.addClass('active').css('left', left);
      thumb.find('.value').html($(this).val());
    });

    $(document).on('mouseup touchend', range_wrapper, function () {
      range_mousedown = false;
      $(this).removeClass('active');
    });

    $(document).on('mousemove touchmove', range_wrapper, function (e) {
      var thumb = $(this).children('.thumb');
      var left;
      if (range_mousedown) {
        if (!thumb.hasClass('active')) {
          thumb.velocity(
            {
              height: '30px',
              width: '30px',
              top: '-20px',
              marginLeft: '-15px',
            },
            { duration: 300, easing: 'easeOutExpo' }
          );
        }
        if (e.pageX === undefined || e.pageX === null) {
          //mobile
          left = e.originalEvent.touches[0].pageX - $(this).offset().left;
        } else {
          // desktop
          left = e.pageX - $(this).offset().left;
        }
        var width = $(this).outerWidth();

        if (left < 0) {
          left = 0;
        } else if (left > width) {
          left = width;
        }
        thumb.addClass('active').css('left', left);
      }
    });

    $(document).on('mouseout touchleave', range_wrapper, function () {
      if (!range_mousedown) {
        var thumb = $(this).children('.thumb');

        if (thumb.hasClass('active')) {
          thumb.velocity(
            { height: '0', width: '0', top: '10px', marginLeft: '-6px' },
            { duration: 100 }
          );
        }
        thumb.removeClass('active');
      }
    });
  }); // End of $(document).ready

  // Select Plugin
  $.fn.material_select = function (callback) {
    $(this).each(function () {
      $select = $(this);

      if ($select.hasClass('browser-default')) {
        return; // Continue to next (return false breaks out of entire loop)
      }

      // Tear down structure if Select needs to be rebuilt
      var lastID = $select.data('select-id');
      if (lastID) {
        $select.parent().find('i').remove();
        $select.parent().find('input').remove();

        $select.unwrap();
        $('ul#select-options-' + lastID).remove();
      }

      // If destroying the select, remove the selelct-id and reset it to it's uninitialized state.
      if (callback === 'destroy') {
        $select.data('select-id', null).removeClass('initialized');
        return;
      }

      var uniqueID = Materialize.guid();
      $select.data('select-id', uniqueID);
      var wrapper = $('<div class="select-wrapper"></div>');
      wrapper.addClass($select.attr('class'));
      var options = $(
        '<ul id="select-options-' +
          uniqueID +
          '" class="dropdown-content select-dropdown"></ul>'
      );
      var selectOptions = $select.children('option');

      var label;
      if ($select.find('option:selected') !== undefined) {
        label = $select.find('option:selected');
      } else {
        label = options.first();
      }

      // Create Dropdown structure
      selectOptions.each(function () {
        // Add disabled attr if disabled
        options.append(
          $(
            '<li class="' +
              ($(this).is(':disabled') ? 'disabled' : '') +
              '"><span>' +
              $(this).html() +
              '</span></li>'
          )
        );
      });

      options.find('li').each(function (i) {
        var $curr_select = $select;
        $(this).click(function () {
          // Check if option element is disabled
          if (!$(this).hasClass('disabled')) {
            $curr_select.find('option').eq(i).prop('selected', true);
            // Trigger onchange() event
            $curr_select.trigger('change');
            $curr_select.siblings('input.select-dropdown').val($(this).text());
            if (typeof callback !== 'undefined') callback();
          }
        });
      });

      // Wrap Elements
      $select.wrap(wrapper);
      // Add Select Display Element
      var dropdownIcon = $('<span class="caret">&#9660;</span>');
      if ($select.is(':disabled')) dropdownIcon.addClass('disabled');

      var $newSelect = $(
        '<input type="text" class="select-dropdown" readonly="true" ' +
          ($select.is(':disabled') ? 'disabled' : '') +
          ' data-activates="select-options-' +
          uniqueID +
          '" value="' +
          label.html() +
          '"/>'
      );
      $select.before($newSelect);
      $newSelect.before(dropdownIcon);

      $('body').append(options);
      // Check if section element is disabled
      if (!$select.is(':disabled')) {
        $newSelect.dropdown({ hover: false });
      }

      // Copy tabindex
      if ($select.attr('tabindex')) {
        $($newSelect[0]).attr('tabindex', $select.attr('tabindex'));
      }

      $select.addClass('initialized');

      $newSelect.on('focus', function () {
        $(this).trigger('open');
        label = $(this).val();
        selectedOption = options.find('li').filter(function () {
          return $(this).text().toLowerCase() === label.toLowerCase();
        })[0];
        activateOption(options, selectedOption);
      });

      $newSelect.on('blur', function () {
        $(this).trigger('close');
      });

      // Make option as selected and scroll to selected position
      activateOption = function (collection, newOption) {
        collection.find('li.active').removeClass('active');
        $(newOption).addClass('active');
        collection.scrollTo(newOption);
      };

      // Allow user to search by typing
      // this array is cleared after 1 second
      filterQuery = [];

      onKeyDown = function (event) {
        // TAB - switch to another input
        if (event.which == 9) {
          $newSelect.trigger('close');
          return;
        }

        // ARROW DOWN WHEN SELECT IS CLOSED - open select options
        if (event.which == 40 && !options.is(':visible')) {
          $newSelect.trigger('open');
          return;
        }

        // ENTER WHEN SELECT IS CLOSED - submit form
        if (event.which == 13 && !options.is(':visible')) {
          return;
        }

        event.preventDefault();

        // CASE WHEN USER TYPE LETTERS
        letter = String.fromCharCode(event.which).toLowerCase();
        var nonLetters = [9, 13, 27, 38, 40];
        if (letter && nonLetters.indexOf(event.which) === -1) {
          filterQuery.push(letter);

          string = filterQuery.join('');

          newOption = options.find('li').filter(function () {
            return $(this).text().toLowerCase().indexOf(string) === 0;
          })[0];

          if (newOption) {
            activateOption(options, newOption);
          }
        }

        // ENTER - select option and close when select options are opened
        if (event.which == 13) {
          activeOption = options.find('li.active:not(.disabled)')[0];
          if (activeOption) {
            $(activeOption).trigger('click');
            $newSelect.trigger('close');
          }
        }

        // ARROW DOWN - move to next not disabled option
        if (event.which == 40) {
          newOption = options.find('li.active').next('li:not(.disabled)')[0];
          if (newOption) {
            activateOption(options, newOption);
          }
        }

        // ESC - close options
        if (event.which == 27) {
          $newSelect.trigger('close');
        }

        // ARROW UP - move to previous not disabled option
        if (event.which == 38) {
          newOption = options.find('li.active').prev('li:not(.disabled)')[0];
          if (newOption) {
            activateOption(options, newOption);
          }
        }

        // Automaticaly clean filter query so user can search again by starting letters
        setTimeout(function () {
          filterQuery = [];
        }, 1000);
      };

      $newSelect.on('keydown', onKeyDown);
    });
  };
})(jQuery);
(function ($) {
  var methods = {
    init: function (options) {
      var defaults = {
        indicators: true,
        height: 400,
        transition: 500,
        interval: 6000,
      };
      options = $.extend(defaults, options);

      return this.each(function () {
        // For each slider, we want to keep track of
        // which slide is active and its associated content
        var $this = $(this);
        var $slider = $this.find('ul.slides').first();
        var $slides = $slider.find('li');
        var $active_index = $slider.find('.active').index();
        var $active;
        if ($active_index != -1) {
          $active = $slides.eq($active_index);
        }

        // Transitions the caption depending on alignment
        function captionTransition(caption, duration) {
          if (caption.hasClass('center-align')) {
            caption.velocity(
              { opacity: 0, translateY: -100 },
              { duration: duration, queue: false }
            );
          } else if (caption.hasClass('right-align')) {
            caption.velocity(
              { opacity: 0, translateX: 100 },
              { duration: duration, queue: false }
            );
          } else if (caption.hasClass('left-align')) {
            caption.velocity(
              { opacity: 0, translateX: -100 },
              { duration: duration, queue: false }
            );
          }
        }

        // This function will transition the slide to any index of the next slide
        function moveToSlide(index) {
          if (index >= $slides.length) index = 0;
          else if (index < 0) index = $slides.length - 1;

          $active_index = $slider.find('.active').index();

          // Only do if index changes
          if ($active_index != index) {
            $active = $slides.eq($active_index);
            $caption = $active.find('.caption');

            $active.removeClass('active');
            $active.velocity(
              { opacity: 0 },
              {
                duration: options.transition,
                queue: false,
                easing: 'easeOutQuad',
                complete: function () {
                  $slides
                    .not('.active')
                    .velocity(
                      { opacity: 0, translateX: 0, translateY: 0 },
                      { duration: 0, queue: false }
                    );
                },
              }
            );
            captionTransition($caption, options.transition);

            // Update indicators
            if (options.indicators) {
              $indicators.eq($active_index).removeClass('active');
            }

            $slides
              .eq(index)
              .velocity(
                { opacity: 1 },
                {
                  duration: options.transition,
                  queue: false,
                  easing: 'easeOutQuad',
                }
              );
            $slides
              .eq(index)
              .find('.caption')
              .velocity(
                { opacity: 1, translateX: 0, translateY: 0 },
                {
                  duration: options.transition,
                  delay: options.transition,
                  queue: false,
                  easing: 'easeOutQuad',
                }
              );
            $slides.eq(index).addClass('active');

            // Update indicators
            if (options.indicators) {
              $indicators.eq(index).addClass('active');
            }
          }
        }

        // Set height of slider
        // If fullscreen, do nothing
        if (!$this.hasClass('fullscreen')) {
          if (options.indicators) {
            // Add height if indicators are present
            $this.height(options.height + 40);
          } else {
            $this.height(options.height);
          }
          $slider.height(options.height);
        }

        // Set initial positions of captions
        $slides.find('.caption').each(function () {
          captionTransition($(this), 0);
        });

        // Move img src into background-image
        $slides.find('img').each(function () {
          $(this).css('background-image', 'url(' + $(this).attr('src') + ')');
          $(this).attr(
            'src',
            'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
          );
        });

        // dynamically add indicators
        if (options.indicators) {
          var $indicators = $('<ul class="indicators"></ul>');
          $slides.each(function (index) {
            var $indicator = $('<li class="indicator-item"></li>');

            // Handle clicks on indicators
            $indicator.click(function () {
              var $parent = $slider.parent();
              var curr_index = $parent.find($(this)).index();
              moveToSlide(curr_index);

              // reset interval
              clearInterval($interval);
              $interval = setInterval(function () {
                $active_index = $slider.find('.active').index();
                if ($slides.length == $active_index + 1) $active_index = 0;
                // loop to start
                else $active_index += 1;

                moveToSlide($active_index);
              }, options.transition + options.interval);
            });
            $indicators.append($indicator);
          });
          $this.append($indicators);
          $indicators = $this.find('ul.indicators').find('li.indicator-item');
        }

        if ($active) {
          $active.show();
        } else {
          $slides
            .first()
            .addClass('active')
            .velocity(
              { opacity: 1 },
              {
                duration: options.transition,
                queue: false,
                easing: 'easeOutQuad',
              }
            );

          $active_index = 0;
          $active = $slides.eq($active_index);

          // Update indicators
          if (options.indicators) {
            $indicators.eq($active_index).addClass('active');
          }
        }

        // Adjust height to current slide
        $active.find('img').each(function () {
          $active
            .find('.caption')
            .velocity(
              { opacity: 1, translateX: 0, translateY: 0 },
              {
                duration: options.transition,
                queue: false,
                easing: 'easeOutQuad',
              }
            );
        });

        // auto scroll
        $interval = setInterval(function () {
          $active_index = $slider.find('.active').index();
          moveToSlide($active_index + 1);
        }, options.transition + options.interval);

        // HammerJS, Swipe navigation

        // Touch Event
        var panning = false;
        var swipeLeft = false;
        var swipeRight = false;

        $this
          .hammer({
            prevent_default: false,
          })
          .bind('pan', function (e) {
            if (e.gesture.pointerType === 'touch') {
              // reset interval
              clearInterval($interval);

              var direction = e.gesture.direction;
              var x = e.gesture.deltaX;
              var velocityX = e.gesture.velocityX;

              $curr_slide = $slider.find('.active');
              $curr_slide.velocity(
                { translateX: x },
                { duration: 50, queue: false, easing: 'easeOutQuad' }
              );

              // Swipe Left
              if (
                direction === 4 &&
                (x > $this.innerWidth() / 2 || velocityX < -0.65)
              ) {
                swipeRight = true;
              }
              // Swipe Right
              else if (
                direction === 2 &&
                (x < (-1 * $this.innerWidth()) / 2 || velocityX > 0.65)
              ) {
                swipeLeft = true;
              }

              // Make Slide Behind active slide visible
              var next_slide;
              if (swipeLeft) {
                next_slide = $curr_slide.next();
                if (next_slide.length === 0) {
                  next_slide = $slides.first();
                }
                next_slide.velocity(
                  { opacity: 1 },
                  { duration: 300, queue: false, easing: 'easeOutQuad' }
                );
              }
              if (swipeRight) {
                next_slide = $curr_slide.prev();
                if (next_slide.length === 0) {
                  next_slide = $slides.last();
                }
                next_slide.velocity(
                  { opacity: 1 },
                  { duration: 300, queue: false, easing: 'easeOutQuad' }
                );
              }
            }
          })
          .bind('panend', function (e) {
            if (e.gesture.pointerType === 'touch') {
              $curr_slide = $slider.find('.active');
              panning = false;
              curr_index = $slider.find('.active').index();

              if (!swipeRight && !swipeLeft) {
                // Return to original spot
                $curr_slide.velocity(
                  { translateX: 0 },
                  { duration: 300, queue: false, easing: 'easeOutQuad' }
                );
              } else if (swipeLeft) {
                moveToSlide(curr_index + 1);
                $curr_slide.velocity(
                  { translateX: -1 * $this.innerWidth() },
                  {
                    duration: 300,
                    queue: false,
                    easing: 'easeOutQuad',
                    complete: function () {
                      $curr_slide.velocity(
                        { opacity: 0, translateX: 0 },
                        { duration: 0, queue: false }
                      );
                    },
                  }
                );
              } else if (swipeRight) {
                moveToSlide(curr_index - 1);
                $curr_slide.velocity(
                  { translateX: $this.innerWidth() },
                  {
                    duration: 300,
                    queue: false,
                    easing: 'easeOutQuad',
                    complete: function () {
                      $curr_slide.velocity(
                        { opacity: 0, translateX: 0 },
                        { duration: 0, queue: false }
                      );
                    },
                  }
                );
              }
              swipeLeft = false;
              swipeRight = false;

              // Restart interval
              clearInterval($interval);
              $interval = setInterval(function () {
                $active_index = $slider.find('.active').index();
                if ($slides.length == $active_index + 1) $active_index = 0;
                // loop to start
                else $active_index += 1;

                moveToSlide($active_index);
              }, options.transition + options.interval);
            }
          });

        $this.on('sliderPause', function () {
          clearInterval($interval);
        });

        $this.on('sliderStart', function () {
          clearInterval($interval);
          $interval = setInterval(function () {
            $active_index = $slider.find('.active').index();
            if ($slides.length == $active_index + 1) $active_index = 0;
            // loop to start
            else $active_index += 1;

            moveToSlide($active_index);
          }, options.transition + options.interval);
        });
      });
    },
    pause: function () {
      $(this).trigger('sliderPause');
    },
    start: function () {
      $(this).trigger('sliderStart');
    },
  };

  $.fn.slider = function (methodOrOptions) {
    if (methods[methodOrOptions]) {
      return methods[methodOrOptions].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
      // Default to "init"
      return methods.init.apply(this, arguments);
    } else {
      $.error(
        'Method ' + methodOrOptions + ' does not exist on jQuery.tooltip'
      );
    }
  }; // Plugin end
})(jQuery);
(function ($) {
  $(document).ready(function () {
    $(document).on('click.card', '.card', function (e) {
      if ($(this).find('.card-reveal').length) {
        if (
          $(e.target).is($('.card-reveal .card-title')) ||
          $(e.target).is($('.card-reveal .card-title i'))
        ) {
          // Make Reveal animate down and display none
          $(this)
            .find('.card-reveal')
            .velocity(
              { translateY: 0 },
              {
                duration: 225,
                queue: false,
                easing: 'easeInOutQuad',
                complete: function () {
                  $(this).css({ display: 'none' });
                },
              }
            );
        } else if (
          $(e.target).is($('.card .activator')) ||
          $(e.target).is($('.card .activator i'))
        ) {
          $(this)
            .find('.card-reveal')
            .css({ display: 'block' })
            .velocity('stop', false)
            .velocity(
              { translateY: '-100%' },
              { duration: 300, queue: false, easing: 'easeInOutQuad' }
            );
        }
      }
    });
  });
})(jQuery);
(function ($) {
  $(document).ready(function () {
    $.fn.pushpin = function (options) {
      var defaults = {
        top: 0,
        bottom: Infinity,
        offset: 0,
      };
      options = $.extend(defaults, options);

      $index = 0;
      return this.each(function () {
        var $uniqueId = Materialize.guid(),
          $this = $(this),
          $original_offset = $(this).offset().top;

        function removePinClasses(object) {
          object.removeClass('pin-top');
          object.removeClass('pinned');
          object.removeClass('pin-bottom');
        }

        function updateElements(objects, scrolled) {
          objects.each(function () {
            // Add position fixed (because its between top and bottom)
            if (
              options.top <= scrolled &&
              options.bottom >= scrolled &&
              !$(this).hasClass('pinned')
            ) {
              removePinClasses($(this));
              $(this).css('top', options.offset);
              $(this).addClass('pinned');
            }

            // Add pin-top (when scrolled position is above top)
            if (scrolled < options.top && !$(this).hasClass('pin-top')) {
              removePinClasses($(this));
              $(this).css('top', 0);
              $(this).addClass('pin-top');
            }

            // Add pin-bottom (when scrolled position is below bottom)
            if (scrolled > options.bottom && !$(this).hasClass('pin-bottom')) {
              removePinClasses($(this));
              $(this).addClass('pin-bottom');
              $(this).css('top', options.bottom - $original_offset);
            }
          });
        }

        updateElements($this, $(window).scrollTop());
        $(window).on('scroll.' + $uniqueId, function () {
          var $scrolled = $(window).scrollTop() + options.offset;
          updateElements($this, $scrolled);
        });
      });
    };
  });
})(jQuery);
(function ($) {
  $(document).ready(function () {
    // jQuery reverse
    $.fn.reverse = [].reverse;

    $(document).on(
      'mouseenter.fixedActionBtn',
      '.fixed-action-btn',
      function (e) {
        var $this = $(this);
        openFABMenu($this);
      }
    );

    $(document).on(
      'mouseleave.fixedActionBtn',
      '.fixed-action-btn',
      function (e) {
        var $this = $(this);
        closeFABMenu($this);
      }
    );
  });

  $.fn.extend({
    openFAB: function () {
      var $this = $(this);
      openFABMenu($this);
    },
    closeFAB: function () {
      closeFABMenu($this);
    },
  });

  var openFABMenu = function (btn) {
    $this = btn;
    if ($this.hasClass('active') === false) {
      $this.addClass('active');
      $this
        .find('ul .btn-floating')
        .velocity(
          { scaleY: '.4', scaleX: '.4', translateY: '40px' },
          { duration: 0 }
        );

      var time = 0;
      $this
        .find('ul .btn-floating')
        .reverse()
        .each(function () {
          $(this).velocity(
            { opacity: '1', scaleX: '1', scaleY: '1', translateY: '0' },
            { duration: 80, delay: time }
          );
          time += 40;
        });
    }
  };

  var closeFABMenu = function (btn) {
    $this = btn;
    $this.removeClass('active');
    var time = 0;
    $this.find('ul .btn-floating').velocity('stop', true);
    $this
      .find('ul .btn-floating')
      .velocity(
        { opacity: '0', scaleX: '.4', scaleY: '.4', translateY: '40px' },
        { duration: 80 }
      );
  };
})(jQuery);
(function ($) {
  // Image transition function
  Materialize.fadeInImage = function (selector) {
    var element = $(selector);
    element.css({ opacity: 0 });
    $(element).velocity(
      { opacity: 1 },
      {
        duration: 650,
        queue: false,
        easing: 'easeOutSine',
      }
    );
    $(element).velocity(
      { opacity: 1 },
      {
        duration: 1300,
        queue: false,
        easing: 'swing',
        step: function (now, fx) {
          fx.start = 100;
          var grayscale_setting = now / 100;
          var brightness_setting = 150 - (100 - now) / 1.75;

          if (brightness_setting < 100) {
            brightness_setting = 100;
          }
          if (now >= 0) {
            $(this).css({
              '-webkit-filter':
                'grayscale(' +
                grayscale_setting +
                ')' +
                'brightness(' +
                brightness_setting +
                '%)',
              filter:
                'grayscale(' +
                grayscale_setting +
                ')' +
                'brightness(' +
                brightness_setting +
                '%)',
            });
          }
        },
      }
    );
  };

  // Horizontal staggered list
  Materialize.showStaggeredList = function (selector) {
    var time = 0;
    $(selector).find('li').velocity({ translateX: '-100px' }, { duration: 0 });

    $(selector)
      .find('li')
      .each(function () {
        $(this).velocity(
          { opacity: '1', translateX: '0' },
          { duration: 800, delay: time, easing: [60, 10] }
        );
        time += 120;
      });
  };

  $(document).ready(function () {
    // Hardcoded .staggered-list scrollFire
    // var staggeredListOptions = [];
    // $('ul.staggered-list').each(function (i) {

    //   var label = 'scrollFire-' + i;
    //   $(this).addClass(label);
    //   staggeredListOptions.push(
    //     {selector: 'ul.staggered-list.' + label,
    //      offset: 200,
    //      callback: 'showStaggeredList("ul.staggered-list.' + label + '")'});
    // });
    // scrollFire(staggeredListOptions);

    // HammerJS, Swipe navigation

    // Touch Event
    var swipeLeft = false;
    var swipeRight = false;

    // Dismissible Collections
    $('.dismissable').each(function () {
      $(this)
        .hammer({
          prevent_default: false,
        })
        .bind('pan', function (e) {
          if (e.gesture.pointerType === 'touch') {
            var $this = $(this);
            var direction = e.gesture.direction;
            var x = e.gesture.deltaX;
            var velocityX = e.gesture.velocityX;

            $this.velocity(
              { translateX: x },
              { duration: 50, queue: false, easing: 'easeOutQuad' }
            );

            // Swipe Left
            if (
              direction === 4 &&
              (x > $this.innerWidth() / 2 || velocityX < -0.75)
            ) {
              swipeLeft = true;
            }

            // Swipe Right
            if (
              direction === 2 &&
              (x < (-1 * $this.innerWidth()) / 2 || velocityX > 0.75)
            ) {
              swipeRight = true;
            }
          }
        })
        .bind('panend', function (e) {
          // Reset if collection is moved back into original position
          if (Math.abs(e.gesture.deltaX) < $(this).innerWidth() / 2) {
            swipeRight = false;
            swipeLeft = false;
          }

          if (e.gesture.pointerType === 'touch') {
            var $this = $(this);
            if (swipeLeft || swipeRight) {
              var fullWidth;
              if (swipeLeft) {
                fullWidth = $this.innerWidth();
              } else {
                fullWidth = -1 * $this.innerWidth();
              }

              $this.velocity(
                { translateX: fullWidth },
                {
                  duration: 100,
                  queue: false,
                  easing: 'easeOutQuad',
                  complete: function () {
                    $this.css('border', 'none');
                    $this.velocity(
                      { height: 0, padding: 0 },
                      {
                        duration: 200,
                        queue: false,
                        easing: 'easeOutQuad',
                        complete: function () {
                          $this.remove();
                        },
                      }
                    );
                  },
                }
              );
            } else {
              $this.velocity(
                { translateX: 0 },
                { duration: 100, queue: false, easing: 'easeOutQuad' }
              );
            }
            swipeLeft = false;
            swipeRight = false;
          }
        });
    });

    // time = 0
    // // Vertical Staggered list
    // $('ul.staggered-list.vertical li').velocity(
    //     { translateY: "100px"},
    //     { duration: 0 });

    // $('ul.staggered-list.vertical li').each(function() {
    //   $(this).velocity(
    //     { opacity: "1", translateY: "0"},
    //     { duration: 800, delay: time, easing: [60, 25] });
    //   time += 120;
    // });

    // // Fade in and Scale
    // $('.fade-in.scale').velocity(
    //     { scaleX: .4, scaleY: .4, translateX: -600},
    //     { duration: 0});
    // $('.fade-in').each(function() {
    //   $(this).velocity(
    //     { opacity: "1", scaleX: 1, scaleY: 1, translateX: 0},
    //     { duration: 800, easing: [60, 10] });
    // });
  });
})(jQuery);
(function ($) {
  // Input: Array of JSON objects {selector, offset, callback}

  Materialize.scrollFire = function (options) {
    var didScroll = false;

    window.addEventListener('scroll', function () {
      didScroll = true;
    });

    // Rate limit to 100ms
    setInterval(function () {
      if (didScroll) {
        didScroll = false;

        var windowScroll = window.pageYOffset + window.innerHeight;

        for (var i = 0; i < options.length; i++) {
          // Get options from each line
          var value = options[i];
          var selector = value.selector,
            offset = value.offset,
            callback = value.callback;

          var currentElement = document.querySelector(selector);
          if (currentElement !== null) {
            var elementOffset =
              currentElement.getBoundingClientRect().top +
              document.body.scrollTop;

            if (windowScroll > elementOffset + offset) {
              if (value.done !== true) {
                var callbackFunc = new Function(callback);
                callbackFunc();
                value.done = true;
              }
            }
          }
        }
      }
    }, 100);
  };
})(jQuery);
/*!
 * pickadate.js v3.5.0, 2014/04/13
 * By Amsul, http://amsul.ca
 * Hosted on http://amsul.github.io/pickadate.js
 * Licensed under MIT
 */

(function (factory) {
  // AMD.
  if (typeof define == 'function' && define.amd)
    define('picker', ['jquery'], factory);
  // Node.js/browserify.
  else if (typeof exports == 'object')
    module.exports = factory(require('jquery'));
  // Browser globals.
  else this.Picker = factory(jQuery);
})(function ($) {
  var $window = $(window);
  var $document = $(document);
  var $html = $(document.documentElement);

  /**
   * The picker constructor that creates a blank picker.
   */
  function PickerConstructor(ELEMENT, NAME, COMPONENT, OPTIONS) {
    // If there’s no element, return the picker constructor.
    if (!ELEMENT) return PickerConstructor;

    var IS_DEFAULT_THEME = false,
      // The state of the picker.
      STATE = {
        id: ELEMENT.id || 'P' + Math.abs(~~(Math.random() * new Date())),
      },
      // Merge the defaults and options passed.
      SETTINGS = COMPONENT
        ? $.extend(true, {}, COMPONENT.defaults, OPTIONS)
        : OPTIONS || {},
      // Merge the default classes with the settings classes.
      CLASSES = $.extend({}, PickerConstructor.klasses(), SETTINGS.klass),
      // The element node wrapper into a jQuery object.
      $ELEMENT = $(ELEMENT),
      // Pseudo picker constructor.
      PickerInstance = function () {
        return this.start();
      },
      // The picker prototype.
      P = (PickerInstance.prototype = {
        constructor: PickerInstance,

        $node: $ELEMENT,

        /**
         * Initialize everything
         */
        start: function () {
          // If it’s already started, do nothing.
          if (STATE && STATE.start) return P;

          // Update the picker states.
          STATE.methods = {};
          STATE.start = true;
          STATE.open = false;
          STATE.type = ELEMENT.type;

          // Confirm focus state, convert into text input to remove UA stylings,
          // and set as readonly to prevent keyboard popup.
          ELEMENT.autofocus = ELEMENT == getActiveElement();
          ELEMENT.readOnly = !SETTINGS.editable;
          ELEMENT.id = ELEMENT.id || STATE.id;
          if (ELEMENT.type != 'text') {
            ELEMENT.type = 'text';
          }

          // Create a new picker component with the settings.
          P.component = new COMPONENT(P, SETTINGS);

          // Create the picker root with a holder and then prepare it.
          P.$root = $(
            PickerConstructor._.node(
              'div',
              createWrappedComponent(),
              CLASSES.picker,
              'id="' + ELEMENT.id + '_root" tabindex="0"'
            )
          );
          prepareElementRoot();

          // If there’s a format for the hidden input element, create the element.
          if (SETTINGS.formatSubmit) {
            prepareElementHidden();
          }

          // Prepare the input element.
          prepareElement();

          // Insert the root as specified in the settings.
          if (SETTINGS.container) $(SETTINGS.container).append(P.$root);
          else $ELEMENT.after(P.$root);

          // Bind the default component and settings events.
          P.on({
            start: P.component.onStart,
            render: P.component.onRender,
            stop: P.component.onStop,
            open: P.component.onOpen,
            close: P.component.onClose,
            set: P.component.onSet,
          }).on({
            start: SETTINGS.onStart,
            render: SETTINGS.onRender,
            stop: SETTINGS.onStop,
            open: SETTINGS.onOpen,
            close: SETTINGS.onClose,
            set: SETTINGS.onSet,
          });

          // Once we’re all set, check the theme in use.
          IS_DEFAULT_THEME = isUsingDefaultTheme(P.$root.children()[0]);

          // If the element has autofocus, open the picker.
          if (ELEMENT.autofocus) {
            P.open();
          }

          // Trigger queued the “start” and “render” events.
          return P.trigger('start').trigger('render');
        }, //start

        /**
         * Render a new picker
         */
        render: function (entireComponent) {
          // Insert a new component holder in the root or box.
          if (entireComponent) P.$root.html(createWrappedComponent());
          else
            P.$root.find('.' + CLASSES.box).html(P.component.nodes(STATE.open));

          // Trigger the queued “render” events.
          return P.trigger('render');
        }, //render

        /**
         * Destroy everything
         */
        stop: function () {
          // If it’s already stopped, do nothing.
          if (!STATE.start) return P;

          // Then close the picker.
          P.close();

          // Remove the hidden field.
          if (P._hidden) {
            P._hidden.parentNode.removeChild(P._hidden);
          }

          // Remove the root.
          P.$root.remove();

          // Remove the input class, remove the stored data, and unbind
          // the events (after a tick for IE - see `P.close`).
          $ELEMENT.removeClass(CLASSES.input).removeData(NAME);
          setTimeout(function () {
            $ELEMENT.off('.' + STATE.id);
          }, 0);

          // Restore the element state
          ELEMENT.type = STATE.type;
          ELEMENT.readOnly = false;

          // Trigger the queued “stop” events.
          P.trigger('stop');

          // Reset the picker states.
          STATE.methods = {};
          STATE.start = false;

          return P;
        }, //stop

        /**
         * Open up the picker
         */
        open: function (dontGiveFocus) {
          // If it’s already open, do nothing.
          if (STATE.open) return P;

          // Add the “active” class.
          $ELEMENT.addClass(CLASSES.active);
          aria(ELEMENT, 'expanded', true);

          // * A Firefox bug, when `html` has `overflow:hidden`, results in
          //   killing transitions :(. So add the “opened” state on the next tick.
          //   Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=625289
          setTimeout(function () {
            // Add the “opened” class to the picker root.
            P.$root.addClass(CLASSES.opened);
            aria(P.$root[0], 'hidden', false);
          }, 0);

          // If we have to give focus, bind the element and doc events.
          if (dontGiveFocus !== false) {
            // Set it as open.
            STATE.open = true;

            // Prevent the page from scrolling.
            if (IS_DEFAULT_THEME) {
              $html
                .css('overflow', 'hidden')
                .css('padding-right', '+=' + getScrollbarWidth());
            }

            // Pass focus to the root element’s jQuery object.
            // * Workaround for iOS8 to bring the picker’s root into view.
            P.$root[0].focus();

            // Bind the document events.
            $document
              .on(
                'click.' + STATE.id + ' focusin.' + STATE.id,
                function (event) {
                  var target = event.target;

                  // If the target of the event is not the element, close the picker picker.
                  // * Don’t worry about clicks or focusins on the root because those don’t bubble up.
                  //   Also, for Firefox, a click on an `option` element bubbles up directly
                  //   to the doc. So make sure the target wasn't the doc.
                  // * In Firefox stopPropagation() doesn’t prevent right-click events from bubbling,
                  //   which causes the picker to unexpectedly close when right-clicking it. So make
                  //   sure the event wasn’t a right-click.
                  if (
                    target != ELEMENT &&
                    target != document &&
                    event.which != 3
                  ) {
                    // If the target was the holder that covers the screen,
                    // keep the element focused to maintain tabindex.
                    P.close(target === P.$root.children()[0]);
                  }
                }
              )
              .on('keydown.' + STATE.id, function (event) {
                var // Get the keycode.
                  keycode = event.keyCode,
                  // Translate that to a selection change.
                  keycodeToMove = P.component.key[keycode],
                  // Grab the target.
                  target = event.target;

                // On escape, close the picker and give focus.
                if (keycode == 27) {
                  P.close(true);
                }

                // Check if there is a key movement or “enter” keypress on the element.
                else if (
                  target == P.$root[0] &&
                  (keycodeToMove || keycode == 13)
                ) {
                  // Prevent the default action to stop page movement.
                  event.preventDefault();

                  // Trigger the key movement action.
                  if (keycodeToMove) {
                    PickerConstructor._.trigger(P.component.key.go, P, [
                      PickerConstructor._.trigger(keycodeToMove),
                    ]);
                  }

                  // On “enter”, if the highlighted item isn’t disabled, set the value and close.
                  else if (
                    !P.$root
                      .find('.' + CLASSES.highlighted)
                      .hasClass(CLASSES.disabled)
                  ) {
                    P.set('select', P.component.item.highlight).close();
                  }
                }

                // If the target is within the root and “enter” is pressed,
                // prevent the default action and trigger a click on the target instead.
                else if ($.contains(P.$root[0], target) && keycode == 13) {
                  event.preventDefault();
                  target.click();
                }
              });
          }

          // Trigger the queued “open” events.
          return P.trigger('open');
        }, //open

        /**
         * Close the picker
         */
        close: function (giveFocus) {
          // If we need to give focus, do it before changing states.
          if (giveFocus) {
            // ....ah yes! It would’ve been incomplete without a crazy workaround for IE :|
            // The focus is triggered *after* the close has completed - causing it
            // to open again. So unbind and rebind the event at the next tick.
            P.$root.off('focus.toOpen')[0].focus();
            setTimeout(function () {
              P.$root.on('focus.toOpen', handleFocusToOpenEvent);
            }, 0);
          }

          // Remove the “active” class.
          $ELEMENT.removeClass(CLASSES.active);
          aria(ELEMENT, 'expanded', false);

          // * A Firefox bug, when `html` has `overflow:hidden`, results in
          //   killing transitions :(. So remove the “opened” state on the next tick.
          //   Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=625289
          setTimeout(function () {
            // Remove the “opened” and “focused” class from the picker root.
            P.$root.removeClass(CLASSES.opened + ' ' + CLASSES.focused);
            aria(P.$root[0], 'hidden', true);
          }, 0);

          // If it’s already closed, do nothing more.
          if (!STATE.open) return P;

          // Set it as closed.
          STATE.open = false;

          // Allow the page to scroll.
          if (IS_DEFAULT_THEME) {
            $html
              .css('overflow', '')
              .css('padding-right', '-=' + getScrollbarWidth());
          }

          // Unbind the document events.
          $document.off('.' + STATE.id);

          // Trigger the queued “close” events.
          return P.trigger('close');
        }, //close

        /**
         * Clear the values
         */
        clear: function (options) {
          return P.set('clear', null, options);
        }, //clear

        /**
         * Set something
         */
        set: function (thing, value, options) {
          var thingItem,
            thingValue,
            thingIsObject = $.isPlainObject(thing),
            thingObject = thingIsObject ? thing : {};

          // Make sure we have usable options.
          options =
            thingIsObject && $.isPlainObject(value) ? value : options || {};

          if (thing) {
            // If the thing isn’t an object, make it one.
            if (!thingIsObject) {
              thingObject[thing] = value;
            }

            // Go through the things of items to set.
            for (thingItem in thingObject) {
              // Grab the value of the thing.
              thingValue = thingObject[thingItem];

              // First, if the item exists and there’s a value, set it.
              if (thingItem in P.component.item) {
                if (thingValue === undefined) thingValue = null;
                P.component.set(thingItem, thingValue, options);
              }

              // Then, check to update the element value and broadcast a change.
              if (thingItem == 'select' || thingItem == 'clear') {
                $ELEMENT
                  .val(
                    thingItem == 'clear'
                      ? ''
                      : P.get(thingItem, SETTINGS.format)
                  )
                  .trigger('change');
              }
            }

            // Render a new picker.
            P.render();
          }

          // When the method isn’t muted, trigger queued “set” events and pass the `thingObject`.
          return options.muted ? P : P.trigger('set', thingObject);
        }, //set

        /**
         * Get something
         */
        get: function (thing, format) {
          // Make sure there’s something to get.
          thing = thing || 'value';

          // If a picker state exists, return that.
          if (STATE[thing] != null) {
            return STATE[thing];
          }

          // Return the submission value, if that.
          if (thing == 'valueSubmit') {
            if (P._hidden) {
              return P._hidden.value;
            }
            thing = 'value';
          }

          // Return the value, if that.
          if (thing == 'value') {
            return ELEMENT.value;
          }

          // Check if a component item exists, return that.
          if (thing in P.component.item) {
            if (typeof format == 'string') {
              var thingValue = P.component.get(thing);
              return thingValue
                ? PickerConstructor._.trigger(
                    P.component.formats.toString,
                    P.component,
                    [format, thingValue]
                  )
                : '';
            }
            return P.component.get(thing);
          }
        }, //get

        /**
         * Bind events on the things.
         */
        on: function (thing, method, internal) {
          var thingName,
            thingMethod,
            thingIsObject = $.isPlainObject(thing),
            thingObject = thingIsObject ? thing : {};

          if (thing) {
            // If the thing isn’t an object, make it one.
            if (!thingIsObject) {
              thingObject[thing] = method;
            }

            // Go through the things to bind to.
            for (thingName in thingObject) {
              // Grab the method of the thing.
              thingMethod = thingObject[thingName];

              // If it was an internal binding, prefix it.
              if (internal) {
                thingName = '_' + thingName;
              }

              // Make sure the thing methods collection exists.
              STATE.methods[thingName] = STATE.methods[thingName] || [];

              // Add the method to the relative method collection.
              STATE.methods[thingName].push(thingMethod);
            }
          }

          return P;
        }, //on

        /**
         * Unbind events on the things.
         */
        off: function () {
          var i,
            thingName,
            names = arguments;
          for (i = 0, namesCount = names.length; i < namesCount; i += 1) {
            thingName = names[i];
            if (thingName in STATE.methods) {
              delete STATE.methods[thingName];
            }
          }
          return P;
        },

        /**
         * Fire off method events.
         */
        trigger: function (name, data) {
          var _trigger = function (name) {
            var methodList = STATE.methods[name];
            if (methodList) {
              methodList.map(function (method) {
                PickerConstructor._.trigger(method, P, [data]);
              });
            }
          };
          _trigger('_' + name);
          _trigger(name);
          return P;
        }, //trigger
      }); //PickerInstance.prototype

    /**
     * Wrap the picker holder components together.
     */
    function createWrappedComponent() {
      // Create a picker wrapper holder
      return PickerConstructor._.node(
        'div',

        // Create a picker wrapper node
        PickerConstructor._.node(
          'div',

          // Create a picker frame
          PickerConstructor._.node(
            'div',

            // Create a picker box node
            PickerConstructor._.node(
              'div',

              // Create the components nodes.
              P.component.nodes(STATE.open),

              // The picker box class
              CLASSES.box
            ),

            // Picker wrap class
            CLASSES.wrap
          ),

          // Picker frame class
          CLASSES.frame
        ),

        // Picker holder class
        CLASSES.holder
      ); //endreturn
    } //createWrappedComponent

    /**
     * Prepare the input element with all bindings.
     */
    function prepareElement() {
      $ELEMENT
        // Store the picker data by component name.
        .data(NAME, P)
        // Add the “input” class name.
        .addClass(CLASSES.input)
        // Remove the tabindex.
        .attr('tabindex', -1)
        // If there’s a `data-value`, update the value of the element.
        .val(
          $ELEMENT.data('value')
            ? P.get('select', SETTINGS.format)
            : ELEMENT.value
        );

      // Only bind keydown events if the element isn’t editable.
      if (!SETTINGS.editable) {
        $ELEMENT
          // On focus/click, focus onto the root to open it up.
          .on('focus.' + STATE.id + ' click.' + STATE.id, function (event) {
            event.preventDefault();
            P.$root[0].focus();
          })
          // Handle keyboard event based on the picker being opened or not.
          .on('keydown.' + STATE.id, handleKeydownEvent);
      }

      // Update the aria attributes.
      aria(ELEMENT, {
        haspopup: true,
        expanded: false,
        readonly: false,
        owns: ELEMENT.id + '_root',
      });
    }

    /**
     * Prepare the root picker element with all bindings.
     */
    function prepareElementRoot() {
      P.$root
        .on({
          // For iOS8.
          keydown: handleKeydownEvent,

          // When something within the root is focused, stop from bubbling
          // to the doc and remove the “focused” state from the root.
          focusin: function (event) {
            P.$root.removeClass(CLASSES.focused);
            event.stopPropagation();
          },

          // When something within the root holder is clicked, stop it
          // from bubbling to the doc.
          'mousedown click': function (event) {
            var target = event.target;

            // Make sure the target isn’t the root holder so it can bubble up.
            if (target != P.$root.children()[0]) {
              event.stopPropagation();

              // * For mousedown events, cancel the default action in order to
              //   prevent cases where focus is shifted onto external elements
              //   when using things like jQuery mobile or MagnificPopup (ref: #249 & #120).
              //   Also, for Firefox, don’t prevent action on the `option` element.
              if (
                event.type == 'mousedown' &&
                !$(target).is('input, select, textarea, button, option')
              ) {
                event.preventDefault();

                // Re-focus onto the root so that users can click away
                // from elements focused within the picker.
                P.$root[0].focus();
              }
            }
          },
        })
        // Add/remove the “target” class on focus and blur.
        .on({
          focus: function () {
            $ELEMENT.addClass(CLASSES.target);
          },
          blur: function () {
            $ELEMENT.removeClass(CLASSES.target);
          },
        })
        // Open the picker and adjust the root “focused” state
        .on('focus.toOpen', handleFocusToOpenEvent)
        // If there’s a click on an actionable element, carry out the actions.
        .on(
          'click',
          '[data-pick], [data-nav], [data-clear], [data-close]',
          function () {
            var $target = $(this),
              targetData = $target.data(),
              targetDisabled =
                $target.hasClass(CLASSES.navDisabled) ||
                $target.hasClass(CLASSES.disabled),
              // * For IE, non-focusable elements can be active elements as well
              //   (http://stackoverflow.com/a/2684561).
              activeElement = getActiveElement();
            activeElement =
              activeElement && (activeElement.type || activeElement.href);

            // If it’s disabled or nothing inside is actively focused, re-focus the element.
            if (
              targetDisabled ||
              (activeElement && !$.contains(P.$root[0], activeElement))
            ) {
              P.$root[0].focus();
            }

            // If something is superficially changed, update the `highlight` based on the `nav`.
            if (!targetDisabled && targetData.nav) {
              P.set('highlight', P.component.item.highlight, {
                nav: targetData.nav,
              });
            }

            // If something is picked, set `select` then close with focus.
            else if (!targetDisabled && 'pick' in targetData) {
              P.set('select', targetData.pick);
            }

            // If a “clear” button is pressed, empty the values and close with focus.
            else if (targetData.clear) {
              P.clear().close(true);
            } else if (targetData.close) {
              P.close(true);
            }
          }
        ); //P.$root

      aria(P.$root[0], 'hidden', true);
    }

    /**
     * Prepare the hidden input element along with all bindings.
     */
    function prepareElementHidden() {
      var name;

      if (SETTINGS.hiddenName === true) {
        name = ELEMENT.name;
        ELEMENT.name = '';
      } else {
        name = [
          typeof SETTINGS.hiddenPrefix == 'string' ? SETTINGS.hiddenPrefix : '',
          typeof SETTINGS.hiddenSuffix == 'string'
            ? SETTINGS.hiddenSuffix
            : '_submit',
        ];
        name = name[0] + ELEMENT.name + name[1];
      }

      P._hidden = $(
        '<input ' +
          'type=hidden ' +
          // Create the name using the original input’s with a prefix and suffix.
          'name="' +
          name +
          '"' +
          // If the element has a value, set the hidden value as well.
          ($ELEMENT.data('value') || ELEMENT.value
            ? ' value="' + P.get('select', SETTINGS.formatSubmit) + '"'
            : '') +
          '>'
      )[0];

      $ELEMENT
        // If the value changes, update the hidden input with the correct format.
        .on('change.' + STATE.id, function () {
          P._hidden.value = ELEMENT.value
            ? P.get('select', SETTINGS.formatSubmit)
            : '';
        });

      // Insert the hidden input as specified in the settings.
      if (SETTINGS.container) $(SETTINGS.container).append(P._hidden);
      else $ELEMENT.after(P._hidden);
    }

    // For iOS8.
    function handleKeydownEvent(event) {
      var keycode = event.keyCode,
        // Check if one of the delete keys was pressed.
        isKeycodeDelete = /^(8|46)$/.test(keycode);

      // For some reason IE clears the input value on “escape”.
      if (keycode == 27) {
        P.close();
        return false;
      }

      // Check if `space` or `delete` was pressed or the picker is closed with a key movement.
      if (
        keycode == 32 ||
        isKeycodeDelete ||
        (!STATE.open && P.component.key[keycode])
      ) {
        // Prevent it from moving the page and bubbling to doc.
        event.preventDefault();
        event.stopPropagation();

        // If `delete` was pressed, clear the values and close the picker.
        // Otherwise open the picker.
        if (isKeycodeDelete) {
          P.clear().close();
        } else {
          P.open();
        }
      }
    }

    // Separated for IE
    function handleFocusToOpenEvent(event) {
      // Stop the event from propagating to the doc.
      event.stopPropagation();

      // If it’s a focus event, add the “focused” class to the root.
      if (event.type == 'focus') {
        P.$root.addClass(CLASSES.focused);
      }

      // And then finally open the picker.
      P.open();
    }

    // Return a new picker instance.
    return new PickerInstance();
  } //PickerConstructor

  /**
   * The default classes and prefix to use for the HTML classes.
   */
  PickerConstructor.klasses = function (prefix) {
    prefix = prefix || 'picker';
    return {
      picker: prefix,
      opened: prefix + '--opened',
      focused: prefix + '--focused',

      input: prefix + '__input',
      active: prefix + '__input--active',
      target: prefix + '__input--target',

      holder: prefix + '__holder',

      frame: prefix + '__frame',
      wrap: prefix + '__wrap',

      box: prefix + '__box',
    };
  }; //PickerConstructor.klasses

  /**
   * Check if the default theme is being used.
   */
  function isUsingDefaultTheme(element) {
    var theme,
      prop = 'position';

    // For IE.
    if (element.currentStyle) {
      theme = element.currentStyle[prop];
    }

    // For normal browsers.
    else if (window.getComputedStyle) {
      theme = getComputedStyle(element)[prop];
    }

    return theme == 'fixed';
  }

  /**
   * Get the width of the browser’s scrollbar.
   * Taken from: https://github.com/VodkaBears/Remodal/blob/master/src/jquery.remodal.js
   */
  function getScrollbarWidth() {
    if ($html.height() <= $window.height()) {
      return 0;
    }

    var $outer = $('<div style="visibility:hidden;width:100px" />').appendTo(
      'body'
    );

    // Get the width without scrollbars.
    var widthWithoutScroll = $outer[0].offsetWidth;

    // Force adding scrollbars.
    $outer.css('overflow', 'scroll');

    // Add the inner div.
    var $inner = $('<div style="width:100%" />').appendTo($outer);

    // Get the width with scrollbars.
    var widthWithScroll = $inner[0].offsetWidth;

    // Remove the divs.
    $outer.remove();

    // Return the difference between the widths.
    return widthWithoutScroll - widthWithScroll;
  }

  /**
   * PickerConstructor helper methods.
   */
  PickerConstructor._ = {
    /**
     * Create a group of nodes. Expects:
     * `
        {
            min:    {Integer},
            max:    {Integer},
            i:      {Integer},
            node:   {String},
            item:   {Function}
        }
     * `
     */
    group: function (groupObject) {
      var // Scope for the looped object
        loopObjectScope,
        // Create the nodes list
        nodesList = '',
        // The counter starts from the `min`
        counter = PickerConstructor._.trigger(groupObject.min, groupObject);

      // Loop from the `min` to `max`, incrementing by `i`
      for (
        ;
        counter <=
        PickerConstructor._.trigger(groupObject.max, groupObject, [counter]);
        counter += groupObject.i
      ) {
        // Trigger the `item` function within scope of the object
        loopObjectScope = PickerConstructor._.trigger(
          groupObject.item,
          groupObject,
          [counter]
        );

        // Splice the subgroup and create nodes out of the sub nodes
        nodesList += PickerConstructor._.node(
          groupObject.node,
          loopObjectScope[0], // the node
          loopObjectScope[1], // the classes
          loopObjectScope[2] // the attributes
        );
      }

      // Return the list of nodes
      return nodesList;
    }, //group

    /**
     * Create a dom node string
     */
    node: function (wrapper, item, klass, attribute) {
      // If the item is false-y, just return an empty string
      if (!item) return '';

      // If the item is an array, do a join
      item = $.isArray(item) ? item.join('') : item;

      // Check for the class
      klass = klass ? ' class="' + klass + '"' : '';

      // Check for any attributes
      attribute = attribute ? ' ' + attribute : '';

      // Return the wrapped item
      return (
        '<' + wrapper + klass + attribute + '>' + item + '</' + wrapper + '>'
      );
    }, //node

    /**
     * Lead numbers below 10 with a zero.
     */
    lead: function (number) {
      return (number < 10 ? '0' : '') + number;
    },

    /**
     * Trigger a function otherwise return the value.
     */
    trigger: function (callback, scope, args) {
      return typeof callback == 'function'
        ? callback.apply(scope, args || [])
        : callback;
    },

    /**
     * If the second character is a digit, length is 2 otherwise 1.
     */
    digits: function (string) {
      return /\d/.test(string[1]) ? 2 : 1;
    },

    /**
     * Tell if something is a date object.
     */
    isDate: function (value) {
      return (
        {}.toString.call(value).indexOf('Date') > -1 &&
        this.isInteger(value.getDate())
      );
    },

    /**
     * Tell if something is an integer.
     */
    isInteger: function (value) {
      return {}.toString.call(value).indexOf('Number') > -1 && value % 1 === 0;
    },

    /**
     * Create ARIA attribute strings.
     */
    ariaAttr: ariaAttr,
  }; //PickerConstructor._

  /**
   * Extend the picker with a component and defaults.
   */
  PickerConstructor.extend = function (name, Component) {
    // Extend jQuery.
    $.fn[name] = function (options, action) {
      // Grab the component data.
      var componentData = this.data(name);

      // If the picker is requested, return the data object.
      if (options == 'picker') {
        return componentData;
      }

      // If the component data exists and `options` is a string, carry out the action.
      if (componentData && typeof options == 'string') {
        return PickerConstructor._.trigger(
          componentData[options],
          componentData,
          [action]
        );
      }

      // Otherwise go through each matched element and if the component
      // doesn’t exist, create a new picker using `this` element
      // and merging the defaults and options with a deep copy.
      return this.each(function () {
        var $this = $(this);
        if (!$this.data(name)) {
          new PickerConstructor(this, name, Component, options);
        }
      });
    };

    // Set the defaults.
    $.fn[name].defaults = Component.defaults;
  }; //PickerConstructor.extend

  function aria(element, attribute, value) {
    if ($.isPlainObject(attribute)) {
      for (var key in attribute) {
        ariaSet(element, key, attribute[key]);
      }
    } else {
      ariaSet(element, attribute, value);
    }
  }
  function ariaSet(element, attribute, value) {
    element.setAttribute(
      (attribute == 'role' ? '' : 'aria-') + attribute,
      value
    );
  }
  function ariaAttr(attribute, data) {
    if (!$.isPlainObject(attribute)) {
      attribute = { attribute: data };
    }
    data = '';
    for (var key in attribute) {
      var attr = (key == 'role' ? '' : 'aria-') + key,
        attrVal = attribute[key];
      data += attrVal == null ? '' : attr + '="' + attribute[key] + '"';
    }
    return data;
  }

  // IE8 bug throws an error for activeElements within iframes.
  function getActiveElement() {
    try {
      return document.activeElement;
    } catch (err) {}
  }

  // Expose the picker constructor.
  return PickerConstructor;
});
/*!
 * Date picker for pickadate.js v3.5.0
 * http://amsul.github.io/pickadate.js/date.htm
 */

(function (factory) {
  // AMD.
  if (typeof define == 'function' && define.amd)
    define(['picker', 'jquery'], factory);
  // Node.js/browserify.
  else if (typeof exports == 'object')
    module.exports = factory(require('./picker.js'), require('jquery'));
  // Browser globals.
  else factory(Picker, jQuery);
})(function (Picker, $) {
  /**
   * Globals and constants
   */
  var DAYS_IN_WEEK = 7,
    WEEKS_IN_CALENDAR = 6,
    _ = Picker._;

  /**
   * The date picker constructor
   */
  function DatePicker(picker, settings) {
    var calendar = this,
      element = picker.$node[0],
      elementValue = element.value,
      elementDataValue = picker.$node.data('value'),
      valueString = elementDataValue || elementValue,
      formatString = elementDataValue ? settings.formatSubmit : settings.format,
      isRTL = function () {
        return element.currentStyle
          ? // For IE.
            element.currentStyle.direction == 'rtl'
          : // For normal browsers.
            getComputedStyle(picker.$root[0]).direction == 'rtl';
      };

    calendar.settings = settings;
    calendar.$node = picker.$node;

    // The queue of methods that will be used to build item objects.
    calendar.queue = {
      min: 'measure create',
      max: 'measure create',
      now: 'now create',
      select: 'parse create validate',
      highlight: 'parse navigate create validate',
      view: 'parse create validate viewset',
      disable: 'deactivate',
      enable: 'activate',
    };

    // The component's item object.
    calendar.item = {};

    calendar.item.clear = null;
    calendar.item.disable = (settings.disable || []).slice(0);
    calendar.item.enable = -(function (collectionDisabled) {
      return collectionDisabled[0] === true ? collectionDisabled.shift() : -1;
    })(calendar.item.disable);

    calendar.set('min', settings.min).set('max', settings.max).set('now');

    // When there’s a value, set the `select`, which in turn
    // also sets the `highlight` and `view`.
    if (valueString) {
      calendar.set('select', valueString, { format: formatString });
    }

    // If there’s no value, default to highlighting “today”.
    else {
      calendar.set('select', null).set('highlight', calendar.item.now);
    }

    // The keycode to movement mapping.
    calendar.key = {
      40: 7, // Down
      38: -7, // Up
      39: function () {
        return isRTL() ? -1 : 1;
      }, // Right
      37: function () {
        return isRTL() ? 1 : -1;
      }, // Left
      go: function (timeChange) {
        var highlightedObject = calendar.item.highlight,
          targetDate = new Date(
            highlightedObject.year,
            highlightedObject.month,
            highlightedObject.date + timeChange
          );
        calendar.set('highlight', targetDate, { interval: timeChange });
        this.render();
      },
    };

    // Bind some picker events.
    picker
      .on(
        'render',
        function () {
          picker.$root
            .find('.' + settings.klass.selectMonth)
            .on('change', function () {
              var value = this.value;
              if (value) {
                picker.set('highlight', [
                  picker.get('view').year,
                  value,
                  picker.get('highlight').date,
                ]);
                picker.$root
                  .find('.' + settings.klass.selectMonth)
                  .trigger('focus');
              }
            });
          picker.$root
            .find('.' + settings.klass.selectYear)
            .on('change', function () {
              var value = this.value;
              if (value) {
                picker.set('highlight', [
                  value,
                  picker.get('view').month,
                  picker.get('highlight').date,
                ]);
                picker.$root
                  .find('.' + settings.klass.selectYear)
                  .trigger('focus');
              }
            });
        },
        1
      )
      .on(
        'open',
        function () {
          var includeToday = '';
          if (calendar.disabled(calendar.get('now'))) {
            includeToday = ':not(.' + settings.klass.buttonToday + ')';
          }
          picker.$root
            .find('button' + includeToday + ', select')
            .attr('disabled', false);
        },
        1
      )
      .on(
        'close',
        function () {
          picker.$root.find('button, select').attr('disabled', true);
        },
        1
      );
  } //DatePicker

  /**
   * Set a datepicker item object.
   */
  DatePicker.prototype.set = function (type, value, options) {
    var calendar = this,
      calendarItem = calendar.item;

    // If the value is `null` just set it immediately.
    if (value === null) {
      if (type == 'clear') type = 'select';
      calendarItem[type] = value;
      return calendar;
    }

    // Otherwise go through the queue of methods, and invoke the functions.
    // Update this as the time unit, and set the final value as this item.
    // * In the case of `enable`, keep the queue but set `disable` instead.
    //   And in the case of `flip`, keep the queue but set `enable` instead.
    calendarItem[
      type == 'enable' ? 'disable' : type == 'flip' ? 'enable' : type
    ] = calendar.queue[type]
      .split(' ')
      .map(function (method) {
        value = calendar[method](type, value, options);
        return value;
      })
      .pop();

    // Check if we need to cascade through more updates.
    if (type == 'select') {
      calendar.set('highlight', calendarItem.select, options);
    } else if (type == 'highlight') {
      calendar.set('view', calendarItem.highlight, options);
    } else if (type.match(/^(flip|min|max|disable|enable)$/)) {
      if (calendarItem.select && calendar.disabled(calendarItem.select)) {
        calendar.set('select', calendarItem.select, options);
      }
      if (calendarItem.highlight && calendar.disabled(calendarItem.highlight)) {
        calendar.set('highlight', calendarItem.highlight, options);
      }
    }

    return calendar;
  }; //DatePicker.prototype.set

  /**
   * Get a datepicker item object.
   */
  DatePicker.prototype.get = function (type) {
    return this.item[type];
  }; //DatePicker.prototype.get

  /**
   * Create a picker date object.
   */
  DatePicker.prototype.create = function (type, value, options) {
    var isInfiniteValue,
      calendar = this;

    // If there’s no value, use the type as the value.
    value = value === undefined ? type : value;

    // If it’s infinity, update the value.
    if (value == -Infinity || value == Infinity) {
      isInfiniteValue = value;
    }

    // If it’s an object, use the native date object.
    else if ($.isPlainObject(value) && _.isInteger(value.pick)) {
      value = value.obj;
    }

    // If it’s an array, convert it into a date and make sure
    // that it’s a valid date – otherwise default to today.
    else if ($.isArray(value)) {
      value = new Date(value[0], value[1], value[2]);
      value = _.isDate(value) ? value : calendar.create().obj;
    }

    // If it’s a number or date object, make a normalized date.
    else if (_.isInteger(value) || _.isDate(value)) {
      value = calendar.normalize(new Date(value), options);
    } /*if ( value === true )*/

    // If it’s a literal true or any other case, set it to now.
    else {
      value = calendar.now(type, value, options);
    }

    // Return the compiled object.
    return {
      year: isInfiniteValue || value.getFullYear(),
      month: isInfiniteValue || value.getMonth(),
      date: isInfiniteValue || value.getDate(),
      day: isInfiniteValue || value.getDay(),
      obj: isInfiniteValue || value,
      pick: isInfiniteValue || value.getTime(),
    };
  }; //DatePicker.prototype.create

  /**
   * Create a range limit object using an array, date object,
   * literal “true”, or integer relative to another time.
   */
  DatePicker.prototype.createRange = function (from, to) {
    var calendar = this,
      createDate = function (date) {
        if (date === true || $.isArray(date) || _.isDate(date)) {
          return calendar.create(date);
        }
        return date;
      };

    // Create objects if possible.
    if (!_.isInteger(from)) {
      from = createDate(from);
    }
    if (!_.isInteger(to)) {
      to = createDate(to);
    }

    // Create relative dates.
    if (_.isInteger(from) && $.isPlainObject(to)) {
      from = [to.year, to.month, to.date + from];
    } else if (_.isInteger(to) && $.isPlainObject(from)) {
      to = [from.year, from.month, from.date + to];
    }

    return {
      from: createDate(from),
      to: createDate(to),
    };
  }; //DatePicker.prototype.createRange

  /**
   * Check if a date unit falls within a date range object.
   */
  DatePicker.prototype.withinRange = function (range, dateUnit) {
    range = this.createRange(range.from, range.to);
    return dateUnit.pick >= range.from.pick && dateUnit.pick <= range.to.pick;
  };

  /**
   * Check if two date range objects overlap.
   */
  DatePicker.prototype.overlapRanges = function (one, two) {
    var calendar = this;

    // Convert the ranges into comparable dates.
    one = calendar.createRange(one.from, one.to);
    two = calendar.createRange(two.from, two.to);

    return (
      calendar.withinRange(one, two.from) ||
      calendar.withinRange(one, two.to) ||
      calendar.withinRange(two, one.from) ||
      calendar.withinRange(two, one.to)
    );
  };

  /**
   * Get the date today.
   */
  DatePicker.prototype.now = function (type, value, options) {
    value = new Date();
    if (options && options.rel) {
      value.setDate(value.getDate() + options.rel);
    }
    return this.normalize(value, options);
  };

  /**
   * Navigate to next/prev month.
   */
  DatePicker.prototype.navigate = function (type, value, options) {
    var targetDateObject,
      targetYear,
      targetMonth,
      targetDate,
      isTargetArray = $.isArray(value),
      isTargetObject = $.isPlainObject(value),
      viewsetObject = this.item.view; /*,
        safety = 100*/

    if (isTargetArray || isTargetObject) {
      if (isTargetObject) {
        targetYear = value.year;
        targetMonth = value.month;
        targetDate = value.date;
      } else {
        targetYear = +value[0];
        targetMonth = +value[1];
        targetDate = +value[2];
      }

      // If we’re navigating months but the view is in a different
      // month, navigate to the view’s year and month.
      if (
        options &&
        options.nav &&
        viewsetObject &&
        viewsetObject.month !== targetMonth
      ) {
        targetYear = viewsetObject.year;
        targetMonth = viewsetObject.month;
      }

      // Figure out the expected target year and month.
      targetDateObject = new Date(
        targetYear,
        targetMonth + (options && options.nav ? options.nav : 0),
        1
      );
      targetYear = targetDateObject.getFullYear();
      targetMonth = targetDateObject.getMonth();

      // If the month we’re going to doesn’t have enough days,
      // keep decreasing the date until we reach the month’s last date.
      while (
        /*safety &&*/ new Date(
          targetYear,
          targetMonth,
          targetDate
        ).getMonth() !== targetMonth
      ) {
        targetDate -= 1;
        /*safety -= 1
            if ( !safety ) {
                throw 'Fell into an infinite loop while navigating to ' + new Date( targetYear, targetMonth, targetDate ) + '.'
            }*/
      }

      value = [targetYear, targetMonth, targetDate];
    }

    return value;
  }; //DatePicker.prototype.navigate

  /**
   * Normalize a date by setting the hours to midnight.
   */
  DatePicker.prototype.normalize = function (value /*, options*/) {
    value.setHours(0, 0, 0, 0);
    return value;
  };

  /**
   * Measure the range of dates.
   */
  DatePicker.prototype.measure = function (type, value /*, options*/) {
    var calendar = this;

    // If it’s anything false-y, remove the limits.
    if (!value) {
      value = type == 'min' ? -Infinity : Infinity;
    }

    // If it’s a string, parse it.
    else if (typeof value == 'string') {
      value = calendar.parse(type, value);
    }

    // If it's an integer, get a date relative to today.
    else if (_.isInteger(value)) {
      value = calendar.now(type, value, { rel: value });
    }

    return value;
  }; ///DatePicker.prototype.measure

  /**
   * Create a viewset object based on navigation.
   */
  DatePicker.prototype.viewset = function (type, dateObject /*, options*/) {
    return this.create([dateObject.year, dateObject.month, 1]);
  };

  /**
   * Validate a date as enabled and shift if needed.
   */
  DatePicker.prototype.validate = function (type, dateObject, options) {
    var calendar = this,
      // Keep a reference to the original date.
      originalDateObject = dateObject,
      // Make sure we have an interval.
      interval = options && options.interval ? options.interval : 1,
      // Check if the calendar enabled dates are inverted.
      isFlippedBase = calendar.item.enable === -1,
      // Check if we have any enabled dates after/before now.
      hasEnabledBeforeTarget,
      hasEnabledAfterTarget,
      // The min & max limits.
      minLimitObject = calendar.item.min,
      maxLimitObject = calendar.item.max,
      // Check if we’ve reached the limit during shifting.
      reachedMin,
      reachedMax,
      // Check if the calendar is inverted and at least one weekday is enabled.
      hasEnabledWeekdays =
        isFlippedBase &&
        calendar.item.disable.filter(function (value) {
          // If there’s a date, check where it is relative to the target.
          if ($.isArray(value)) {
            var dateTime = calendar.create(value).pick;
            if (dateTime < dateObject.pick) hasEnabledBeforeTarget = true;
            else if (dateTime > dateObject.pick) hasEnabledAfterTarget = true;
          }

          // Return only integers for enabled weekdays.
          return _.isInteger(value);
        }).length; /*,

        safety = 100*/

    // Cases to validate for:
    // [1] Not inverted and date disabled.
    // [2] Inverted and some dates enabled.
    // [3] Not inverted and out of range.
    //
    // Cases to **not** validate for:
    // • Navigating months.
    // • Not inverted and date enabled.
    // • Inverted and all dates disabled.
    // • ..and anything else.
    if (!options || !options.nav)
      if (
        /* 1 */ (!isFlippedBase && calendar.disabled(dateObject)) ||
        /* 2 */ (isFlippedBase &&
          calendar.disabled(dateObject) &&
          (hasEnabledWeekdays ||
            hasEnabledBeforeTarget ||
            hasEnabledAfterTarget)) ||
        /* 3 */ (!isFlippedBase &&
          (dateObject.pick <= minLimitObject.pick ||
            dateObject.pick >= maxLimitObject.pick))
      ) {
        // When inverted, flip the direction if there aren’t any enabled weekdays
        // and there are no enabled dates in the direction of the interval.
        if (
          isFlippedBase &&
          !hasEnabledWeekdays &&
          ((!hasEnabledAfterTarget && interval > 0) ||
            (!hasEnabledBeforeTarget && interval < 0))
        ) {
          interval *= -1;
        }

        // Keep looping until we reach an enabled date.
        while (/*safety &&*/ calendar.disabled(dateObject)) {
          /*safety -= 1
            if ( !safety ) {
                throw 'Fell into an infinite loop while validating ' + dateObject.obj + '.'
            }*/

          // If we’ve looped into the next/prev month with a large interval, return to the original date and flatten the interval.
          if (
            Math.abs(interval) > 1 &&
            (dateObject.month < originalDateObject.month ||
              dateObject.month > originalDateObject.month)
          ) {
            dateObject = originalDateObject;
            interval = interval > 0 ? 1 : -1;
          }

          // If we’ve reached the min/max limit, reverse the direction, flatten the interval and set it to the limit.
          if (dateObject.pick <= minLimitObject.pick) {
            reachedMin = true;
            interval = 1;
            dateObject = calendar.create([
              minLimitObject.year,
              minLimitObject.month,
              minLimitObject.date +
                (dateObject.pick === minLimitObject.pick ? 0 : -1),
            ]);
          } else if (dateObject.pick >= maxLimitObject.pick) {
            reachedMax = true;
            interval = -1;
            dateObject = calendar.create([
              maxLimitObject.year,
              maxLimitObject.month,
              maxLimitObject.date +
                (dateObject.pick === maxLimitObject.pick ? 0 : 1),
            ]);
          }

          // If we’ve reached both limits, just break out of the loop.
          if (reachedMin && reachedMax) {
            break;
          }

          // Finally, create the shifted date using the interval and keep looping.
          dateObject = calendar.create([
            dateObject.year,
            dateObject.month,
            dateObject.date + interval,
          ]);
        }
      } //endif

    // Return the date object settled on.
    return dateObject;
  }; //DatePicker.prototype.validate

  /**
   * Check if a date is disabled.
   */
  DatePicker.prototype.disabled = function (dateToVerify) {
    var calendar = this,
      // Filter through the disabled dates to check if this is one.
      isDisabledMatch = calendar.item.disable.filter(function (dateToDisable) {
        // If the date is a number, match the weekday with 0index and `firstDay` check.
        if (_.isInteger(dateToDisable)) {
          return (
            dateToVerify.day ===
            (calendar.settings.firstDay ? dateToDisable : dateToDisable - 1) % 7
          );
        }

        // If it’s an array or a native JS date, create and match the exact date.
        if ($.isArray(dateToDisable) || _.isDate(dateToDisable)) {
          return dateToVerify.pick === calendar.create(dateToDisable).pick;
        }

        // If it’s an object, match a date within the “from” and “to” range.
        if ($.isPlainObject(dateToDisable)) {
          return calendar.withinRange(dateToDisable, dateToVerify);
        }
      });

    // If this date matches a disabled date, confirm it’s not inverted.
    isDisabledMatch =
      isDisabledMatch.length &&
      !isDisabledMatch.filter(function (dateToDisable) {
        return (
          ($.isArray(dateToDisable) && dateToDisable[3] == 'inverted') ||
          ($.isPlainObject(dateToDisable) && dateToDisable.inverted)
        );
      }).length;

    // Check the calendar “enabled” flag and respectively flip the
    // disabled state. Then also check if it’s beyond the min/max limits.
    return calendar.item.enable === -1
      ? !isDisabledMatch
      : isDisabledMatch ||
          dateToVerify.pick < calendar.item.min.pick ||
          dateToVerify.pick > calendar.item.max.pick;
  }; //DatePicker.prototype.disabled

  /**
   * Parse a string into a usable type.
   */
  DatePicker.prototype.parse = function (type, value, options) {
    var calendar = this,
      parsingObject = {};

    // If it’s already parsed, we’re good.
    if (!value || typeof value != 'string') {
      return value;
    }

    // We need a `.format` to parse the value with.
    if (!(options && options.format)) {
      options = options || {};
      options.format = calendar.settings.format;
    }

    // Convert the format into an array and then map through it.
    calendar.formats.toArray(options.format).map(function (label) {
      var // Grab the formatting label.
        formattingLabel = calendar.formats[label],
        // The format length is from the formatting label function or the
        // label length without the escaping exclamation (!) mark.
        formatLength = formattingLabel
          ? _.trigger(formattingLabel, calendar, [value, parsingObject])
          : label.replace(/^!/, '').length;

      // If there's a format label, split the value up to the format length.
      // Then add it to the parsing object with appropriate label.
      if (formattingLabel) {
        parsingObject[label] = value.substr(0, formatLength);
      }

      // Update the value as the substring from format length to end.
      value = value.substr(formatLength);
    });

    // Compensate for month 0index.
    return [
      parsingObject.yyyy || parsingObject.yy,
      +(parsingObject.mm || parsingObject.m) - 1,
      parsingObject.dd || parsingObject.d,
    ];
  }; //DatePicker.prototype.parse

  /**
   * Various formats to display the object in.
   */
  DatePicker.prototype.formats = (function () {
    // Return the length of the first word in a collection.
    function getWordLengthFromCollection(string, collection, dateObject) {
      // Grab the first word from the string.
      var word = string.match(/\w+/)[0];

      // If there's no month index, add it to the date object
      if (!dateObject.mm && !dateObject.m) {
        dateObject.m = collection.indexOf(word) + 1;
      }

      // Return the length of the word.
      return word.length;
    }

    // Get the length of the first word in a string.
    function getFirstWordLength(string) {
      return string.match(/\w+/)[0].length;
    }

    return {
      d: function (string, dateObject) {
        // If there's string, then get the digits length.
        // Otherwise return the selected date.
        return string ? _.digits(string) : dateObject.date;
      },
      dd: function (string, dateObject) {
        // If there's a string, then the length is always 2.
        // Otherwise return the selected date with a leading zero.
        return string ? 2 : _.lead(dateObject.date);
      },
      ddd: function (string, dateObject) {
        // If there's a string, then get the length of the first word.
        // Otherwise return the short selected weekday.
        return string
          ? getFirstWordLength(string)
          : this.settings.weekdaysShort[dateObject.day];
      },
      dddd: function (string, dateObject) {
        // If there's a string, then get the length of the first word.
        // Otherwise return the full selected weekday.
        return string
          ? getFirstWordLength(string)
          : this.settings.weekdaysFull[dateObject.day];
      },
      m: function (string, dateObject) {
        // If there's a string, then get the length of the digits
        // Otherwise return the selected month with 0index compensation.
        return string ? _.digits(string) : dateObject.month + 1;
      },
      mm: function (string, dateObject) {
        // If there's a string, then the length is always 2.
        // Otherwise return the selected month with 0index and leading zero.
        return string ? 2 : _.lead(dateObject.month + 1);
      },
      mmm: function (string, dateObject) {
        var collection = this.settings.monthsShort;

        // If there's a string, get length of the relevant month from the short
        // months collection. Otherwise return the selected month from that collection.
        return string
          ? getWordLengthFromCollection(string, collection, dateObject)
          : collection[dateObject.month];
      },
      mmmm: function (string, dateObject) {
        var collection = this.settings.monthsFull;

        // If there's a string, get length of the relevant month from the full
        // months collection. Otherwise return the selected month from that collection.
        return string
          ? getWordLengthFromCollection(string, collection, dateObject)
          : collection[dateObject.month];
      },
      yy: function (string, dateObject) {
        // If there's a string, then the length is always 2.
        // Otherwise return the selected year by slicing out the first 2 digits.
        return string ? 2 : ('' + dateObject.year).slice(2);
      },
      yyyy: function (string, dateObject) {
        // If there's a string, then the length is always 4.
        // Otherwise return the selected year.
        return string ? 4 : dateObject.year;
      },

      // Create an array by splitting the formatting string passed.
      toArray: function (formatString) {
        return formatString.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g);
      },

      // Format an object into a string using the formatting options.
      toString: function (formatString, itemObject) {
        var calendar = this;
        return calendar.formats
          .toArray(formatString)
          .map(function (label) {
            return (
              _.trigger(calendar.formats[label], calendar, [0, itemObject]) ||
              label.replace(/^!/, '')
            );
          })
          .join('');
      },
    };
  })(); //DatePicker.prototype.formats

  /**
   * Check if two date units are the exact.
   */
  DatePicker.prototype.isDateExact = function (one, two) {
    var calendar = this;

    // When we’re working with weekdays, do a direct comparison.
    if (
      (_.isInteger(one) && _.isInteger(two)) ||
      (typeof one == 'boolean' && typeof two == 'boolean')
    ) {
      return one === two;
    }

    // When we’re working with date representations, compare the “pick” value.
    if (
      (_.isDate(one) || $.isArray(one)) &&
      (_.isDate(two) || $.isArray(two))
    ) {
      return calendar.create(one).pick === calendar.create(two).pick;
    }

    // When we’re working with range objects, compare the “from” and “to”.
    if ($.isPlainObject(one) && $.isPlainObject(two)) {
      return (
        calendar.isDateExact(one.from, two.from) &&
        calendar.isDateExact(one.to, two.to)
      );
    }

    return false;
  };

  /**
   * Check if two date units overlap.
   */
  DatePicker.prototype.isDateOverlap = function (one, two) {
    var calendar = this,
      firstDay = calendar.settings.firstDay ? 1 : 0;

    // When we’re working with a weekday index, compare the days.
    if (_.isInteger(one) && (_.isDate(two) || $.isArray(two))) {
      one = (one % 7) + firstDay;
      return one === calendar.create(two).day + 1;
    }
    if (_.isInteger(two) && (_.isDate(one) || $.isArray(one))) {
      two = (two % 7) + firstDay;
      return two === calendar.create(one).day + 1;
    }

    // When we’re working with range objects, check if the ranges overlap.
    if ($.isPlainObject(one) && $.isPlainObject(two)) {
      return calendar.overlapRanges(one, two);
    }

    return false;
  };

  /**
   * Flip the “enabled” state.
   */
  DatePicker.prototype.flipEnable = function (val) {
    var itemObject = this.item;
    itemObject.enable = val || (itemObject.enable == -1 ? 1 : -1);
  };

  /**
   * Mark a collection of dates as “disabled”.
   */
  DatePicker.prototype.deactivate = function (type, datesToDisable) {
    var calendar = this,
      disabledItems = calendar.item.disable.slice(0);

    // If we’re flipping, that’s all we need to do.
    if (datesToDisable == 'flip') {
      calendar.flipEnable();
    } else if (datesToDisable === false) {
      calendar.flipEnable(1);
      disabledItems = [];
    } else if (datesToDisable === true) {
      calendar.flipEnable(-1);
      disabledItems = [];
    }

    // Otherwise go through the dates to disable.
    else {
      datesToDisable.map(function (unitToDisable) {
        var matchFound;

        // When we have disabled items, check for matches.
        // If something is matched, immediately break out.
        for (var index = 0; index < disabledItems.length; index += 1) {
          if (calendar.isDateExact(unitToDisable, disabledItems[index])) {
            matchFound = true;
            break;
          }
        }

        // If nothing was found, add the validated unit to the collection.
        if (!matchFound) {
          if (
            _.isInteger(unitToDisable) ||
            _.isDate(unitToDisable) ||
            $.isArray(unitToDisable) ||
            ($.isPlainObject(unitToDisable) &&
              unitToDisable.from &&
              unitToDisable.to)
          ) {
            disabledItems.push(unitToDisable);
          }
        }
      });
    }

    // Return the updated collection.
    return disabledItems;
  }; //DatePicker.prototype.deactivate

  /**
   * Mark a collection of dates as “enabled”.
   */
  DatePicker.prototype.activate = function (type, datesToEnable) {
    var calendar = this,
      disabledItems = calendar.item.disable,
      disabledItemsCount = disabledItems.length;

    // If we’re flipping, that’s all we need to do.
    if (datesToEnable == 'flip') {
      calendar.flipEnable();
    } else if (datesToEnable === true) {
      calendar.flipEnable(1);
      disabledItems = [];
    } else if (datesToEnable === false) {
      calendar.flipEnable(-1);
      disabledItems = [];
    }

    // Otherwise go through the disabled dates.
    else {
      datesToEnable.map(function (unitToEnable) {
        var matchFound, disabledUnit, index, isExactRange;

        // Go through the disabled items and try to find a match.
        for (index = 0; index < disabledItemsCount; index += 1) {
          disabledUnit = disabledItems[index];

          // When an exact match is found, remove it from the collection.
          if (calendar.isDateExact(disabledUnit, unitToEnable)) {
            matchFound = disabledItems[index] = null;
            isExactRange = true;
            break;
          }

          // When an overlapped match is found, add the “inverted” state to it.
          else if (calendar.isDateOverlap(disabledUnit, unitToEnable)) {
            if ($.isPlainObject(unitToEnable)) {
              unitToEnable.inverted = true;
              matchFound = unitToEnable;
            } else if ($.isArray(unitToEnable)) {
              matchFound = unitToEnable;
              if (!matchFound[3]) matchFound.push('inverted');
            } else if (_.isDate(unitToEnable)) {
              matchFound = [
                unitToEnable.getFullYear(),
                unitToEnable.getMonth(),
                unitToEnable.getDate(),
                'inverted',
              ];
            }
            break;
          }
        }

        // If a match was found, remove a previous duplicate entry.
        if (matchFound)
          for (index = 0; index < disabledItemsCount; index += 1) {
            if (calendar.isDateExact(disabledItems[index], unitToEnable)) {
              disabledItems[index] = null;
              break;
            }
          }

        // In the event that we’re dealing with an exact range of dates,
        // make sure there are no “inverted” dates because of it.
        if (isExactRange)
          for (index = 0; index < disabledItemsCount; index += 1) {
            if (calendar.isDateOverlap(disabledItems[index], unitToEnable)) {
              disabledItems[index] = null;
              break;
            }
          }

        // If something is still matched, add it into the collection.
        if (matchFound) {
          disabledItems.push(matchFound);
        }
      });
    }

    // Return the updated collection.
    return disabledItems.filter(function (val) {
      return val != null;
    });
  }; //DatePicker.prototype.activate

  /**
   * Create a string for the nodes in the picker.
   */
  DatePicker.prototype.nodes = function (isOpen) {
    var calendar = this,
      settings = calendar.settings,
      calendarItem = calendar.item,
      nowObject = calendarItem.now,
      selectedObject = calendarItem.select,
      highlightedObject = calendarItem.highlight,
      viewsetObject = calendarItem.view,
      disabledCollection = calendarItem.disable,
      minLimitObject = calendarItem.min,
      maxLimitObject = calendarItem.max,
      // Create the calendar table head using a copy of weekday labels collection.
      // * We do a copy so we don't mutate the original array.
      tableHead = (function (collection, fullCollection) {
        // If the first day should be Monday, move Sunday to the end.
        if (settings.firstDay) {
          collection.push(collection.shift());
          fullCollection.push(fullCollection.shift());
        }

        // Create and return the table head group.
        return _.node(
          'thead',
          _.node(
            'tr',
            _.group({
              min: 0,
              max: DAYS_IN_WEEK - 1,
              i: 1,
              node: 'th',
              item: function (counter) {
                return [
                  collection[counter],
                  settings.klass.weekdays,
                  'scope=col title="' + fullCollection[counter] + '"',
                ];
              },
            })
          )
        ); //endreturn

        // Materialize modified
      })(
        (settings.showWeekdaysFull
          ? settings.weekdaysFull
          : settings.weekdaysLetter
        ).slice(0),
        settings.weekdaysFull.slice(0)
      ), //tableHead
      // Create the nav for next/prev month.
      createMonthNav = function (next) {
        // Otherwise, return the created month tag.
        return _.node(
          'div',
          ' ',
          settings.klass['nav' + (next ? 'Next' : 'Prev')] +
            // If the focused month is outside the range, disabled the button.
            ((next &&
              viewsetObject.year >= maxLimitObject.year &&
              viewsetObject.month >= maxLimitObject.month) ||
            (!next &&
              viewsetObject.year <= minLimitObject.year &&
              viewsetObject.month <= minLimitObject.month)
              ? ' ' + settings.klass.navDisabled
              : ''),
          'data-nav=' +
            (next || -1) +
            ' ' +
            _.ariaAttr({
              role: 'button',
              controls: calendar.$node[0].id + '_table',
            }) +
            ' ' +
            'title="' +
            (next ? settings.labelMonthNext : settings.labelMonthPrev) +
            '"'
        ); //endreturn
      }, //createMonthNav
      // Create the month label.
      //Materialize modified
      createMonthLabel = function (override) {
        var monthsCollection = settings.showMonthsShort
          ? settings.monthsShort
          : settings.monthsFull;

        // Materialize modified
        if (override == 'short_months') {
          monthsCollection = settings.monthsShort;
        }

        // If there are months to select, add a dropdown menu.
        if (settings.selectMonths && override == undefined) {
          return _.node(
            'select',
            _.group({
              min: 0,
              max: 11,
              i: 1,
              node: 'option',
              item: function (loopedMonth) {
                return [
                  // The looped month and no classes.
                  monthsCollection[loopedMonth],
                  0,

                  // Set the value and selected index.
                  'value=' +
                    loopedMonth +
                    (viewsetObject.month == loopedMonth ? ' selected' : '') +
                    ((viewsetObject.year == minLimitObject.year &&
                      loopedMonth < minLimitObject.month) ||
                    (viewsetObject.year == maxLimitObject.year &&
                      loopedMonth > maxLimitObject.month)
                      ? ' disabled'
                      : ''),
                ];
              },
            }),
            settings.klass.selectMonth + ' browser-default',
            (isOpen ? '' : 'disabled') +
              ' ' +
              _.ariaAttr({ controls: calendar.$node[0].id + '_table' }) +
              ' ' +
              'title="' +
              settings.labelMonthSelect +
              '"'
          );
        }

        // Materialize modified
        if (override == 'short_months')
          if (selectedObject != null)
            return _.node('div', monthsCollection[selectedObject.month]);
          else return _.node('div', monthsCollection[viewsetObject.month]);

        // If there's a need for a month selector
        return _.node(
          'div',
          monthsCollection[viewsetObject.month],
          settings.klass.month
        );
      }, //createMonthLabel
      // Create the year label.
      // Materialize modified
      createYearLabel = function (override) {
        var focusedYear = viewsetObject.year,
          // If years selector is set to a literal "true", set it to 5. Otherwise
          // divide in half to get half before and half after focused year.
          numberYears =
            settings.selectYears === true ? 5 : ~~(settings.selectYears / 2);

        // If there are years to select, add a dropdown menu.
        if (numberYears) {
          var minYear = minLimitObject.year,
            maxYear = maxLimitObject.year,
            lowestYear = focusedYear - numberYears,
            highestYear = focusedYear + numberYears;

          // If the min year is greater than the lowest year, increase the highest year
          // by the difference and set the lowest year to the min year.
          if (minYear > lowestYear) {
            highestYear += minYear - lowestYear;
            lowestYear = minYear;
          }

          // If the max year is less than the highest year, decrease the lowest year
          // by the lower of the two: available and needed years. Then set the
          // highest year to the max year.
          if (maxYear < highestYear) {
            var availableYears = lowestYear - minYear,
              neededYears = highestYear - maxYear;

            lowestYear -=
              availableYears > neededYears ? neededYears : availableYears;
            highestYear = maxYear;
          }

          if (settings.selectYears && override == undefined) {
            return _.node(
              'select',
              _.group({
                min: lowestYear,
                max: highestYear,
                i: 1,
                node: 'option',
                item: function (loopedYear) {
                  return [
                    // The looped year and no classes.
                    loopedYear,
                    0,

                    // Set the value and selected index.
                    'value=' +
                      loopedYear +
                      (focusedYear == loopedYear ? ' selected' : ''),
                  ];
                },
              }),
              settings.klass.selectYear + ' browser-default',
              (isOpen ? '' : 'disabled') +
                ' ' +
                _.ariaAttr({ controls: calendar.$node[0].id + '_table' }) +
                ' ' +
                'title="' +
                settings.labelYearSelect +
                '"'
            );
          }
        }

        // Materialize modified
        if (override == 'raw') return _.node('div', focusedYear);

        // Otherwise just return the year focused
        return _.node('div', focusedYear, settings.klass.year);
      }; //createYearLabel

    // Materialize modified
    createDayLabel = function () {
      if (selectedObject != null) return _.node('div', selectedObject.date);
      else return _.node('div', nowObject.date);
    };
    createWeekdayLabel = function () {
      var display_day;

      if (selectedObject != null) display_day = selectedObject.day;
      else display_day = nowObject.day;
      var weekday = settings.weekdaysFull[display_day];
      return weekday;
    };

    // Create and return the entire calendar.
    return (
      _.node(
        // Date presentation View
        'div',
        _.node('div', createWeekdayLabel(), 'picker__weekday-display') +
          _.node(
            // Div for short Month
            'div',
            createMonthLabel('short_months'),
            settings.klass.month_display
          ) +
          _.node(
            // Div for Day
            'div',
            createDayLabel(),
            settings.klass.day_display
          ) +
          _.node(
            // Div for Year
            'div',
            createYearLabel('raw'),
            settings.klass.year_display
          ),
        settings.klass.date_display
      ) +
      // Calendar container
      _.node(
        'div',
        _.node(
          'div',
          (settings.selectYears
            ? createMonthLabel() + createYearLabel()
            : createMonthLabel() + createYearLabel()) +
            createMonthNav() +
            createMonthNav(1),
          settings.klass.header
        ) +
          _.node(
            'table',
            tableHead +
              _.node(
                'tbody',
                _.group({
                  min: 0,
                  max: WEEKS_IN_CALENDAR - 1,
                  i: 1,
                  node: 'tr',
                  item: function (rowCounter) {
                    // If Monday is the first day and the month starts on Sunday, shift the date back a week.
                    var shiftDateBy =
                      settings.firstDay &&
                      calendar.create([
                        viewsetObject.year,
                        viewsetObject.month,
                        1,
                      ]).day === 0
                        ? -7
                        : 0;

                    return [
                      _.group({
                        min:
                          DAYS_IN_WEEK * rowCounter -
                          viewsetObject.day +
                          shiftDateBy +
                          1, // Add 1 for weekday 0index
                        max: function () {
                          return this.min + DAYS_IN_WEEK - 1;
                        },
                        i: 1,
                        node: 'td',
                        item: function (targetDate) {
                          // Convert the time date from a relative date to a target date.
                          targetDate = calendar.create([
                            viewsetObject.year,
                            viewsetObject.month,
                            targetDate + (settings.firstDay ? 1 : 0),
                          ]);

                          var isSelected =
                              selectedObject &&
                              selectedObject.pick == targetDate.pick,
                            isHighlighted =
                              highlightedObject &&
                              highlightedObject.pick == targetDate.pick,
                            isDisabled =
                              (disabledCollection &&
                                calendar.disabled(targetDate)) ||
                              targetDate.pick < minLimitObject.pick ||
                              targetDate.pick > maxLimitObject.pick,
                            formattedDate = _.trigger(
                              calendar.formats.toString,
                              calendar,
                              [settings.format, targetDate]
                            );

                          return [
                            _.node(
                              'div',
                              targetDate.date,
                              (function (klasses) {
                                // Add the `infocus` or `outfocus` classes based on month in view.
                                klasses.push(
                                  viewsetObject.month == targetDate.month
                                    ? settings.klass.infocus
                                    : settings.klass.outfocus
                                );

                                // Add the `today` class if needed.
                                if (nowObject.pick == targetDate.pick) {
                                  klasses.push(settings.klass.now);
                                }

                                // Add the `selected` class if something's selected and the time matches.
                                if (isSelected) {
                                  klasses.push(settings.klass.selected);
                                }

                                // Add the `highlighted` class if something's highlighted and the time matches.
                                if (isHighlighted) {
                                  klasses.push(settings.klass.highlighted);
                                }

                                // Add the `disabled` class if something's disabled and the object matches.
                                if (isDisabled) {
                                  klasses.push(settings.klass.disabled);
                                }

                                return klasses.join(' ');
                              })([settings.klass.day]),
                              'data-pick=' +
                                targetDate.pick +
                                ' ' +
                                _.ariaAttr({
                                  role: 'gridcell',
                                  label: formattedDate,
                                  selected:
                                    isSelected &&
                                    calendar.$node.val() === formattedDate
                                      ? true
                                      : null,
                                  activedescendant: isHighlighted ? true : null,
                                  disabled: isDisabled ? true : null,
                                })
                            ),
                            '',
                            _.ariaAttr({ role: 'presentation' }),
                          ]; //endreturn
                        },
                      }),
                    ]; //endreturn
                  },
                })
              ),
            settings.klass.table,
            'id="' +
              calendar.$node[0].id +
              '_table' +
              '" ' +
              _.ariaAttr({
                role: 'grid',
                controls: calendar.$node[0].id,
                readonly: true,
              })
          ),
        settings.klass.calendar_container
      ) + // end calendar
      // * For Firefox forms to submit, make sure to set the buttons’ `type` attributes as “button”.
      _.node(
        'div',
        _.node(
          'button',
          settings.today,
          'btn-flat picker__today',
          'type=button data-pick=' +
            nowObject.pick +
            (isOpen && !calendar.disabled(nowObject) ? '' : ' disabled') +
            ' ' +
            _.ariaAttr({ controls: calendar.$node[0].id })
        ) +
          _.node(
            'button',
            settings.clear,
            'btn-flat picker__clear',
            'type=button data-clear=1' +
              (isOpen ? '' : ' disabled') +
              ' ' +
              _.ariaAttr({ controls: calendar.$node[0].id })
          ) +
          _.node(
            'button',
            settings.close,
            'btn-flat picker__close',
            'type=button data-close=true ' +
              (isOpen ? '' : ' disabled') +
              ' ' +
              _.ariaAttr({ controls: calendar.$node[0].id })
          ),
        settings.klass.footer
      )
    ); //endreturn
  }; //DatePicker.prototype.nodes

  /**
   * The date picker defaults.
   */
  DatePicker.defaults = (function (prefix) {
    return {
      // The title label to use for the month nav buttons
      labelMonthNext: 'Next month',
      labelMonthPrev: 'Previous month',

      // The title label to use for the dropdown selectors
      labelMonthSelect: 'Select a month',
      labelYearSelect: 'Select a year',

      // Months and weekdays
      monthsFull: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      monthsShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      weekdaysFull: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

      // Materialize modified
      weekdaysLetter: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

      // Today and clear
      today: 'Today',
      clear: 'Clear',
      close: 'Close',

      // The format to show on the `input` element
      format: 'd mmmm, yyyy',

      // Classes
      klass: {
        table: prefix + 'table',

        header: prefix + 'header',

        // Materialize Added klasses
        date_display: prefix + 'date-display',
        day_display: prefix + 'day-display',
        month_display: prefix + 'month-display',
        year_display: prefix + 'year-display',
        calendar_container: prefix + 'calendar-container',
        // end

        navPrev: prefix + 'nav--prev',
        navNext: prefix + 'nav--next',
        navDisabled: prefix + 'nav--disabled',

        month: prefix + 'month',
        year: prefix + 'year',

        selectMonth: prefix + 'select--month',
        selectYear: prefix + 'select--year',

        weekdays: prefix + 'weekday',

        day: prefix + 'day',
        disabled: prefix + 'day--disabled',
        selected: prefix + 'day--selected',
        highlighted: prefix + 'day--highlighted',
        now: prefix + 'day--today',
        infocus: prefix + 'day--infocus',
        outfocus: prefix + 'day--outfocus',

        footer: prefix + 'footer',

        buttonClear: prefix + 'button--clear',
        buttonToday: prefix + 'button--today',
        buttonClose: prefix + 'button--close',
      },
    };
  })(Picker.klasses().picker + '__');

  /**
   * Extend the picker to add the date picker.
   */
  Picker.extend('pickadate', DatePicker);
});

(function ($) {
  $.fn.characterCounter = function () {
    return this.each(function () {
      var itHasLengthAttribute = $(this).attr('length') !== undefined;

      if (itHasLengthAttribute) {
        $(this).on('input', updateCounter);
        $(this).on('focus', updateCounter);
        $(this).on('blur', removeCounterElement);

        addCounterElement($(this));
      }
    });
  };

  function updateCounter() {
    var maxLength = +$(this).attr('length'),
      actualLength = +$(this).val().length,
      isValidLength = actualLength <= maxLength;

    $(this)
      .parent()
      .find('span[class="character-counter"]')
      .html(actualLength + '/' + maxLength);

    addInputStyle(isValidLength, $(this));
  }

  function addCounterElement($input) {
    var $counterElement = $('<span/>')
      .addClass('character-counter')
      .css('float', 'right')
      .css('font-size', '12px')
      .css('height', 1);

    $input.parent().append($counterElement);
  }

  function removeCounterElement() {
    $(this).parent().find('span[class="character-counter"]').html('');
  }

  function addInputStyle(isValidLength, $input) {
    var inputHasInvalidClass = $input.hasClass('invalid');
    if (isValidLength && inputHasInvalidClass) {
      $input.removeClass('invalid');
    } else if (!isValidLength && !inputHasInvalidClass) {
      $input.removeClass('valid');
      $input.addClass('invalid');
    }
  }

  $(document).ready(function () {
    $('input, textarea').characterCounter();
  });
})(jQuery);
$('#searchUserMod').on('input', function (e) {
  var searchFor = $(this).val();
  $('.person').each(function (index) {
    var name = $(this).attr('data-title').toLowerCase();
    if (name.indexOf(searchFor.toLowerCase()) >= 0) {
      $(this).css('display', 'inline-block');
    } else {
      $(this).css('display', 'none');
    }
  });
});

$('#permissionApply').click(function () {
  socket.emit(
    'mute',
    $('meta[name="targetSteamID"]').attr('content'),
    $('input#mute').is(':checked')
  );
});
$('#saveSelRank').click(function () {
  socket.emit(
    'selectRank',
    $('meta[name="targetSteamID"]').attr('content'),
    $('#mod-rank-select').find(':selected').text()
  );
});
//! moment.js
//! version : 2.10.3
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!(function (a, b) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = b())
    : 'function' == typeof define && define.amd
    ? define(b)
    : (a.moment = b());
})(this, function () {
  'use strict';
  function a() {
    return Dc.apply(null, arguments);
  }
  function b(a) {
    Dc = a;
  }
  function c(a) {
    return '[object Array]' === Object.prototype.toString.call(a);
  }
  function d(a) {
    return (
      a instanceof Date || '[object Date]' === Object.prototype.toString.call(a)
    );
  }
  function e(a, b) {
    var c,
      d = [];
    for (c = 0; c < a.length; ++c) d.push(b(a[c], c));
    return d;
  }
  function f(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }
  function g(a, b) {
    for (var c in b) f(b, c) && (a[c] = b[c]);
    return (
      f(b, 'toString') && (a.toString = b.toString),
      f(b, 'valueOf') && (a.valueOf = b.valueOf),
      a
    );
  }
  function h(a, b, c, d) {
    return za(a, b, c, d, !0).utc();
  }
  function i() {
    return {
      empty: !1,
      unusedTokens: [],
      unusedInput: [],
      overflow: -2,
      charsLeftOver: 0,
      nullInput: !1,
      invalidMonth: null,
      invalidFormat: !1,
      userInvalidated: !1,
      iso: !1,
    };
  }
  function j(a) {
    return null == a._pf && (a._pf = i()), a._pf;
  }
  function k(a) {
    if (null == a._isValid) {
      var b = j(a);
      (a._isValid =
        !isNaN(a._d.getTime()) &&
        b.overflow < 0 &&
        !b.empty &&
        !b.invalidMonth &&
        !b.nullInput &&
        !b.invalidFormat &&
        !b.userInvalidated),
        a._strict &&
          (a._isValid =
            a._isValid &&
            0 === b.charsLeftOver &&
            0 === b.unusedTokens.length &&
            void 0 === b.bigHour);
    }
    return a._isValid;
  }
  function l(a) {
    var b = h(0 / 0);
    return null != a ? g(j(b), a) : (j(b).userInvalidated = !0), b;
  }
  function m(a, b) {
    var c, d, e;
    if (
      ('undefined' != typeof b._isAMomentObject &&
        (a._isAMomentObject = b._isAMomentObject),
      'undefined' != typeof b._i && (a._i = b._i),
      'undefined' != typeof b._f && (a._f = b._f),
      'undefined' != typeof b._l && (a._l = b._l),
      'undefined' != typeof b._strict && (a._strict = b._strict),
      'undefined' != typeof b._tzm && (a._tzm = b._tzm),
      'undefined' != typeof b._isUTC && (a._isUTC = b._isUTC),
      'undefined' != typeof b._offset && (a._offset = b._offset),
      'undefined' != typeof b._pf && (a._pf = j(b)),
      'undefined' != typeof b._locale && (a._locale = b._locale),
      Fc.length > 0)
    )
      for (c in Fc)
        (d = Fc[c]), (e = b[d]), 'undefined' != typeof e && (a[d] = e);
    return a;
  }
  function n(b) {
    m(this, b),
      (this._d = new Date(+b._d)),
      Gc === !1 && ((Gc = !0), a.updateOffset(this), (Gc = !1));
  }
  function o(a) {
    return a instanceof n || (null != a && null != a._isAMomentObject);
  }
  function p(a) {
    var b = +a,
      c = 0;
    return (
      0 !== b && isFinite(b) && (c = b >= 0 ? Math.floor(b) : Math.ceil(b)), c
    );
  }
  function q(a, b, c) {
    var d,
      e = Math.min(a.length, b.length),
      f = Math.abs(a.length - b.length),
      g = 0;
    for (d = 0; e > d; d++)
      ((c && a[d] !== b[d]) || (!c && p(a[d]) !== p(b[d]))) && g++;
    return g + f;
  }
  function r() {}
  function s(a) {
    return a ? a.toLowerCase().replace('_', '-') : a;
  }
  function t(a) {
    for (var b, c, d, e, f = 0; f < a.length; ) {
      for (
        e = s(a[f]).split('-'),
          b = e.length,
          c = s(a[f + 1]),
          c = c ? c.split('-') : null;
        b > 0;

      ) {
        if ((d = u(e.slice(0, b).join('-')))) return d;
        if (c && c.length >= b && q(e, c, !0) >= b - 1) break;
        b--;
      }
      f++;
    }
    return null;
  }
  function u(a) {
    var b = null;
    if (!Hc[a] && 'undefined' != typeof module && module && module.exports)
      try {
        (b = Ec._abbr), require('./locale/' + a), v(b);
      } catch (c) {}
    return Hc[a];
  }
  function v(a, b) {
    var c;
    return (
      a && ((c = 'undefined' == typeof b ? x(a) : w(a, b)), c && (Ec = c)),
      Ec._abbr
    );
  }
  function w(a, b) {
    return null !== b
      ? ((b.abbr = a), Hc[a] || (Hc[a] = new r()), Hc[a].set(b), v(a), Hc[a])
      : (delete Hc[a], null);
  }
  function x(a) {
    var b;
    if ((a && a._locale && a._locale._abbr && (a = a._locale._abbr), !a))
      return Ec;
    if (!c(a)) {
      if ((b = u(a))) return b;
      a = [a];
    }
    return t(a);
  }
  function y(a, b) {
    var c = a.toLowerCase();
    Ic[c] = Ic[c + 's'] = Ic[b] = a;
  }
  function z(a) {
    return 'string' == typeof a ? Ic[a] || Ic[a.toLowerCase()] : void 0;
  }
  function A(a) {
    var b,
      c,
      d = {};
    for (c in a) f(a, c) && ((b = z(c)), b && (d[b] = a[c]));
    return d;
  }
  function B(b, c) {
    return function (d) {
      return null != d
        ? (D(this, b, d), a.updateOffset(this, c), this)
        : C(this, b);
    };
  }
  function C(a, b) {
    return a._d['get' + (a._isUTC ? 'UTC' : '') + b]();
  }
  function D(a, b, c) {
    return a._d['set' + (a._isUTC ? 'UTC' : '') + b](c);
  }
  function E(a, b) {
    var c;
    if ('object' == typeof a) for (c in a) this.set(c, a[c]);
    else if (((a = z(a)), 'function' == typeof this[a])) return this[a](b);
    return this;
  }
  function F(a, b, c) {
    for (var d = '' + Math.abs(a), e = a >= 0; d.length < b; ) d = '0' + d;
    return (e ? (c ? '+' : '') : '-') + d;
  }
  function G(a, b, c, d) {
    var e = d;
    'string' == typeof d &&
      (e = function () {
        return this[d]();
      }),
      a && (Mc[a] = e),
      b &&
        (Mc[b[0]] = function () {
          return F(e.apply(this, arguments), b[1], b[2]);
        }),
      c &&
        (Mc[c] = function () {
          return this.localeData().ordinal(e.apply(this, arguments), a);
        });
  }
  function H(a) {
    return a.match(/\[[\s\S]/)
      ? a.replace(/^\[|\]$/g, '')
      : a.replace(/\\/g, '');
  }
  function I(a) {
    var b,
      c,
      d = a.match(Jc);
    for (b = 0, c = d.length; c > b; b++)
      Mc[d[b]] ? (d[b] = Mc[d[b]]) : (d[b] = H(d[b]));
    return function (e) {
      var f = '';
      for (b = 0; c > b; b++)
        f += d[b] instanceof Function ? d[b].call(e, a) : d[b];
      return f;
    };
  }
  function J(a, b) {
    return a.isValid()
      ? ((b = K(b, a.localeData())), Lc[b] || (Lc[b] = I(b)), Lc[b](a))
      : a.localeData().invalidDate();
  }
  function K(a, b) {
    function c(a) {
      return b.longDateFormat(a) || a;
    }
    var d = 5;
    for (Kc.lastIndex = 0; d >= 0 && Kc.test(a); )
      (a = a.replace(Kc, c)), (Kc.lastIndex = 0), (d -= 1);
    return a;
  }
  function L(a, b, c) {
    _c[a] =
      'function' == typeof b
        ? b
        : function (a) {
            return a && c ? c : b;
          };
  }
  function M(a, b) {
    return f(_c, a) ? _c[a](b._strict, b._locale) : new RegExp(N(a));
  }
  function N(a) {
    return a
      .replace('\\', '')
      .replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (a, b, c, d, e) {
        return b || c || d || e;
      })
      .replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }
  function O(a, b) {
    var c,
      d = b;
    for (
      'string' == typeof a && (a = [a]),
        'number' == typeof b &&
          (d = function (a, c) {
            c[b] = p(a);
          }),
        c = 0;
      c < a.length;
      c++
    )
      ad[a[c]] = d;
  }
  function P(a, b) {
    O(a, function (a, c, d, e) {
      (d._w = d._w || {}), b(a, d._w, d, e);
    });
  }
  function Q(a, b, c) {
    null != b && f(ad, a) && ad[a](b, c._a, c, a);
  }
  function R(a, b) {
    return new Date(Date.UTC(a, b + 1, 0)).getUTCDate();
  }
  function S(a) {
    return this._months[a.month()];
  }
  function T(a) {
    return this._monthsShort[a.month()];
  }
  function U(a, b, c) {
    var d, e, f;
    for (
      this._monthsParse ||
        ((this._monthsParse = []),
        (this._longMonthsParse = []),
        (this._shortMonthsParse = [])),
        d = 0;
      12 > d;
      d++
    ) {
      if (
        ((e = h([2e3, d])),
        c &&
          !this._longMonthsParse[d] &&
          ((this._longMonthsParse[d] = new RegExp(
            '^' + this.months(e, '').replace('.', '') + '$',
            'i'
          )),
          (this._shortMonthsParse[d] = new RegExp(
            '^' + this.monthsShort(e, '').replace('.', '') + '$',
            'i'
          ))),
        c ||
          this._monthsParse[d] ||
          ((f = '^' + this.months(e, '') + '|^' + this.monthsShort(e, '')),
          (this._monthsParse[d] = new RegExp(f.replace('.', ''), 'i'))),
        c && 'MMMM' === b && this._longMonthsParse[d].test(a))
      )
        return d;
      if (c && 'MMM' === b && this._shortMonthsParse[d].test(a)) return d;
      if (!c && this._monthsParse[d].test(a)) return d;
    }
  }
  function V(a, b) {
    var c;
    return 'string' == typeof b &&
      ((b = a.localeData().monthsParse(b)), 'number' != typeof b)
      ? a
      : ((c = Math.min(a.date(), R(a.year(), b))),
        a._d['set' + (a._isUTC ? 'UTC' : '') + 'Month'](b, c),
        a);
  }
  function W(b) {
    return null != b
      ? (V(this, b), a.updateOffset(this, !0), this)
      : C(this, 'Month');
  }
  function X() {
    return R(this.year(), this.month());
  }
  function Y(a) {
    var b,
      c = a._a;
    return (
      c &&
        -2 === j(a).overflow &&
        ((b =
          c[cd] < 0 || c[cd] > 11
            ? cd
            : c[dd] < 1 || c[dd] > R(c[bd], c[cd])
            ? dd
            : c[ed] < 0 ||
              c[ed] > 24 ||
              (24 === c[ed] && (0 !== c[fd] || 0 !== c[gd] || 0 !== c[hd]))
            ? ed
            : c[fd] < 0 || c[fd] > 59
            ? fd
            : c[gd] < 0 || c[gd] > 59
            ? gd
            : c[hd] < 0 || c[hd] > 999
            ? hd
            : -1),
        j(a)._overflowDayOfYear && (bd > b || b > dd) && (b = dd),
        (j(a).overflow = b)),
      a
    );
  }
  function Z(b) {
    a.suppressDeprecationWarnings === !1 &&
      'undefined' != typeof console &&
      console.warn &&
      console.warn('Deprecation warning: ' + b);
  }
  function $(a, b) {
    var c = !0,
      d = a + '\n' + new Error().stack;
    return g(function () {
      return c && (Z(d), (c = !1)), b.apply(this, arguments);
    }, b);
  }
  function _(a, b) {
    kd[a] || (Z(b), (kd[a] = !0));
  }
  function aa(a) {
    var b,
      c,
      d = a._i,
      e = ld.exec(d);
    if (e) {
      for (j(a).iso = !0, b = 0, c = md.length; c > b; b++)
        if (md[b][1].exec(d)) {
          a._f = md[b][0] + (e[6] || ' ');
          break;
        }
      for (b = 0, c = nd.length; c > b; b++)
        if (nd[b][1].exec(d)) {
          a._f += nd[b][0];
          break;
        }
      d.match(Yc) && (a._f += 'Z'), ta(a);
    } else a._isValid = !1;
  }
  function ba(b) {
    var c = od.exec(b._i);
    return null !== c
      ? void (b._d = new Date(+c[1]))
      : (aa(b),
        void (
          b._isValid === !1 && (delete b._isValid, a.createFromInputFallback(b))
        ));
  }
  function ca(a, b, c, d, e, f, g) {
    var h = new Date(a, b, c, d, e, f, g);
    return 1970 > a && h.setFullYear(a), h;
  }
  function da(a) {
    var b = new Date(Date.UTC.apply(null, arguments));
    return 1970 > a && b.setUTCFullYear(a), b;
  }
  function ea(a) {
    return fa(a) ? 366 : 365;
  }
  function fa(a) {
    return (a % 4 === 0 && a % 100 !== 0) || a % 400 === 0;
  }
  function ga() {
    return fa(this.year());
  }
  function ha(a, b, c) {
    var d,
      e = c - b,
      f = c - a.day();
    return (
      f > e && (f -= 7),
      e - 7 > f && (f += 7),
      (d = Aa(a).add(f, 'd')),
      { week: Math.ceil(d.dayOfYear() / 7), year: d.year() }
    );
  }
  function ia(a) {
    return ha(a, this._week.dow, this._week.doy).week;
  }
  function ja() {
    return this._week.dow;
  }
  function ka() {
    return this._week.doy;
  }
  function la(a) {
    var b = this.localeData().week(this);
    return null == a ? b : this.add(7 * (a - b), 'd');
  }
  function ma(a) {
    var b = ha(this, 1, 4).week;
    return null == a ? b : this.add(7 * (a - b), 'd');
  }
  function na(a, b, c, d, e) {
    var f,
      g,
      h = da(a, 0, 1).getUTCDay();
    return (
      (h = 0 === h ? 7 : h),
      (c = null != c ? c : e),
      (f = e - h + (h > d ? 7 : 0) - (e > h ? 7 : 0)),
      (g = 7 * (b - 1) + (c - e) + f + 1),
      { year: g > 0 ? a : a - 1, dayOfYear: g > 0 ? g : ea(a - 1) + g }
    );
  }
  function oa(a) {
    var b =
      Math.round(
        (this.clone().startOf('day') - this.clone().startOf('year')) / 864e5
      ) + 1;
    return null == a ? b : this.add(a - b, 'd');
  }
  function pa(a, b, c) {
    return null != a ? a : null != b ? b : c;
  }
  function qa(a) {
    var b = new Date();
    return a._useUTC
      ? [b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate()]
      : [b.getFullYear(), b.getMonth(), b.getDate()];
  }
  function ra(a) {
    var b,
      c,
      d,
      e,
      f = [];
    if (!a._d) {
      for (
        d = qa(a),
          a._w && null == a._a[dd] && null == a._a[cd] && sa(a),
          a._dayOfYear &&
            ((e = pa(a._a[bd], d[bd])),
            a._dayOfYear > ea(e) && (j(a)._overflowDayOfYear = !0),
            (c = da(e, 0, a._dayOfYear)),
            (a._a[cd] = c.getUTCMonth()),
            (a._a[dd] = c.getUTCDate())),
          b = 0;
        3 > b && null == a._a[b];
        ++b
      )
        a._a[b] = f[b] = d[b];
      for (; 7 > b; b++)
        a._a[b] = f[b] = null == a._a[b] ? (2 === b ? 1 : 0) : a._a[b];
      24 === a._a[ed] &&
        0 === a._a[fd] &&
        0 === a._a[gd] &&
        0 === a._a[hd] &&
        ((a._nextDay = !0), (a._a[ed] = 0)),
        (a._d = (a._useUTC ? da : ca).apply(null, f)),
        null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm),
        a._nextDay && (a._a[ed] = 24);
    }
  }
  function sa(a) {
    var b, c, d, e, f, g, h;
    (b = a._w),
      null != b.GG || null != b.W || null != b.E
        ? ((f = 1),
          (g = 4),
          (c = pa(b.GG, a._a[bd], ha(Aa(), 1, 4).year)),
          (d = pa(b.W, 1)),
          (e = pa(b.E, 1)))
        : ((f = a._locale._week.dow),
          (g = a._locale._week.doy),
          (c = pa(b.gg, a._a[bd], ha(Aa(), f, g).year)),
          (d = pa(b.w, 1)),
          null != b.d
            ? ((e = b.d), f > e && ++d)
            : (e = null != b.e ? b.e + f : f)),
      (h = na(c, d, e, g, f)),
      (a._a[bd] = h.year),
      (a._dayOfYear = h.dayOfYear);
  }
  function ta(b) {
    if (b._f === a.ISO_8601) return void aa(b);
    (b._a = []), (j(b).empty = !0);
    var c,
      d,
      e,
      f,
      g,
      h = '' + b._i,
      i = h.length,
      k = 0;
    for (e = K(b._f, b._locale).match(Jc) || [], c = 0; c < e.length; c++)
      (f = e[c]),
        (d = (h.match(M(f, b)) || [])[0]),
        d &&
          ((g = h.substr(0, h.indexOf(d))),
          g.length > 0 && j(b).unusedInput.push(g),
          (h = h.slice(h.indexOf(d) + d.length)),
          (k += d.length)),
        Mc[f]
          ? (d ? (j(b).empty = !1) : j(b).unusedTokens.push(f), Q(f, d, b))
          : b._strict && !d && j(b).unusedTokens.push(f);
    (j(b).charsLeftOver = i - k),
      h.length > 0 && j(b).unusedInput.push(h),
      j(b).bigHour === !0 &&
        b._a[ed] <= 12 &&
        b._a[ed] > 0 &&
        (j(b).bigHour = void 0),
      (b._a[ed] = ua(b._locale, b._a[ed], b._meridiem)),
      ra(b),
      Y(b);
  }
  function ua(a, b, c) {
    var d;
    return null == c
      ? b
      : null != a.meridiemHour
      ? a.meridiemHour(b, c)
      : null != a.isPM
      ? ((d = a.isPM(c)), d && 12 > b && (b += 12), d || 12 !== b || (b = 0), b)
      : b;
  }
  function va(a) {
    var b, c, d, e, f;
    if (0 === a._f.length)
      return (j(a).invalidFormat = !0), void (a._d = new Date(0 / 0));
    for (e = 0; e < a._f.length; e++)
      (f = 0),
        (b = m({}, a)),
        null != a._useUTC && (b._useUTC = a._useUTC),
        (b._f = a._f[e]),
        ta(b),
        k(b) &&
          ((f += j(b).charsLeftOver),
          (f += 10 * j(b).unusedTokens.length),
          (j(b).score = f),
          (null == d || d > f) && ((d = f), (c = b)));
    g(a, c || b);
  }
  function wa(a) {
    if (!a._d) {
      var b = A(a._i);
      (a._a = [
        b.year,
        b.month,
        b.day || b.date,
        b.hour,
        b.minute,
        b.second,
        b.millisecond,
      ]),
        ra(a);
    }
  }
  function xa(a) {
    var b,
      e = a._i,
      f = a._f;
    return (
      (a._locale = a._locale || x(a._l)),
      null === e || (void 0 === f && '' === e)
        ? l({ nullInput: !0 })
        : ('string' == typeof e && (a._i = e = a._locale.preparse(e)),
          o(e)
            ? new n(Y(e))
            : (c(f) ? va(a) : f ? ta(a) : d(e) ? (a._d = e) : ya(a),
              (b = new n(Y(a))),
              b._nextDay && (b.add(1, 'd'), (b._nextDay = void 0)),
              b))
    );
  }
  function ya(b) {
    var f = b._i;
    void 0 === f
      ? (b._d = new Date())
      : d(f)
      ? (b._d = new Date(+f))
      : 'string' == typeof f
      ? ba(b)
      : c(f)
      ? ((b._a = e(f.slice(0), function (a) {
          return parseInt(a, 10);
        })),
        ra(b))
      : 'object' == typeof f
      ? wa(b)
      : 'number' == typeof f
      ? (b._d = new Date(f))
      : a.createFromInputFallback(b);
  }
  function za(a, b, c, d, e) {
    var f = {};
    return (
      'boolean' == typeof c && ((d = c), (c = void 0)),
      (f._isAMomentObject = !0),
      (f._useUTC = f._isUTC = e),
      (f._l = c),
      (f._i = a),
      (f._f = b),
      (f._strict = d),
      xa(f)
    );
  }
  function Aa(a, b, c, d) {
    return za(a, b, c, d, !1);
  }
  function Ba(a, b) {
    var d, e;
    if ((1 === b.length && c(b[0]) && (b = b[0]), !b.length)) return Aa();
    for (d = b[0], e = 1; e < b.length; ++e) b[e][a](d) && (d = b[e]);
    return d;
  }
  function Ca() {
    var a = [].slice.call(arguments, 0);
    return Ba('isBefore', a);
  }
  function Da() {
    var a = [].slice.call(arguments, 0);
    return Ba('isAfter', a);
  }
  function Ea(a) {
    var b = A(a),
      c = b.year || 0,
      d = b.quarter || 0,
      e = b.month || 0,
      f = b.week || 0,
      g = b.day || 0,
      h = b.hour || 0,
      i = b.minute || 0,
      j = b.second || 0,
      k = b.millisecond || 0;
    (this._milliseconds = +k + 1e3 * j + 6e4 * i + 36e5 * h),
      (this._days = +g + 7 * f),
      (this._months = +e + 3 * d + 12 * c),
      (this._data = {}),
      (this._locale = x()),
      this._bubble();
  }
  function Fa(a) {
    return a instanceof Ea;
  }
  function Ga(a, b) {
    G(a, 0, 0, function () {
      var a = this.utcOffset(),
        c = '+';
      return (
        0 > a && ((a = -a), (c = '-')),
        c + F(~~(a / 60), 2) + b + F(~~a % 60, 2)
      );
    });
  }
  function Ha(a) {
    var b = (a || '').match(Yc) || [],
      c = b[b.length - 1] || [],
      d = (c + '').match(td) || ['-', 0, 0],
      e = +(60 * d[1]) + p(d[2]);
    return '+' === d[0] ? e : -e;
  }
  function Ia(b, c) {
    var e, f;
    return c._isUTC
      ? ((e = c.clone()),
        (f = (o(b) || d(b) ? +b : +Aa(b)) - +e),
        e._d.setTime(+e._d + f),
        a.updateOffset(e, !1),
        e)
      : Aa(b).local();
    return c._isUTC ? Aa(b).zone(c._offset || 0) : Aa(b).local();
  }
  function Ja(a) {
    return 15 * -Math.round(a._d.getTimezoneOffset() / 15);
  }
  function Ka(b, c) {
    var d,
      e = this._offset || 0;
    return null != b
      ? ('string' == typeof b && (b = Ha(b)),
        Math.abs(b) < 16 && (b = 60 * b),
        !this._isUTC && c && (d = Ja(this)),
        (this._offset = b),
        (this._isUTC = !0),
        null != d && this.add(d, 'm'),
        e !== b &&
          (!c || this._changeInProgress
            ? $a(this, Va(b - e, 'm'), 1, !1)
            : this._changeInProgress ||
              ((this._changeInProgress = !0),
              a.updateOffset(this, !0),
              (this._changeInProgress = null))),
        this)
      : this._isUTC
      ? e
      : Ja(this);
  }
  function La(a, b) {
    return null != a
      ? ('string' != typeof a && (a = -a), this.utcOffset(a, b), this)
      : -this.utcOffset();
  }
  function Ma(a) {
    return this.utcOffset(0, a);
  }
  function Na(a) {
    return (
      this._isUTC &&
        (this.utcOffset(0, a),
        (this._isUTC = !1),
        a && this.subtract(Ja(this), 'm')),
      this
    );
  }
  function Oa() {
    return (
      this._tzm
        ? this.utcOffset(this._tzm)
        : 'string' == typeof this._i && this.utcOffset(Ha(this._i)),
      this
    );
  }
  function Pa(a) {
    return (a = a ? Aa(a).utcOffset() : 0), (this.utcOffset() - a) % 60 === 0;
  }
  function Qa() {
    return (
      this.utcOffset() > this.clone().month(0).utcOffset() ||
      this.utcOffset() > this.clone().month(5).utcOffset()
    );
  }
  function Ra() {
    if (this._a) {
      var a = this._isUTC ? h(this._a) : Aa(this._a);
      return this.isValid() && q(this._a, a.toArray()) > 0;
    }
    return !1;
  }
  function Sa() {
    return !this._isUTC;
  }
  function Ta() {
    return this._isUTC;
  }
  function Ua() {
    return this._isUTC && 0 === this._offset;
  }
  function Va(a, b) {
    var c,
      d,
      e,
      g = a,
      h = null;
    return (
      Fa(a)
        ? (g = { ms: a._milliseconds, d: a._days, M: a._months })
        : 'number' == typeof a
        ? ((g = {}), b ? (g[b] = a) : (g.milliseconds = a))
        : (h = ud.exec(a))
        ? ((c = '-' === h[1] ? -1 : 1),
          (g = {
            y: 0,
            d: p(h[dd]) * c,
            h: p(h[ed]) * c,
            m: p(h[fd]) * c,
            s: p(h[gd]) * c,
            ms: p(h[hd]) * c,
          }))
        : (h = vd.exec(a))
        ? ((c = '-' === h[1] ? -1 : 1),
          (g = {
            y: Wa(h[2], c),
            M: Wa(h[3], c),
            d: Wa(h[4], c),
            h: Wa(h[5], c),
            m: Wa(h[6], c),
            s: Wa(h[7], c),
            w: Wa(h[8], c),
          }))
        : null == g
        ? (g = {})
        : 'object' == typeof g &&
          ('from' in g || 'to' in g) &&
          ((e = Ya(Aa(g.from), Aa(g.to))),
          (g = {}),
          (g.ms = e.milliseconds),
          (g.M = e.months)),
      (d = new Ea(g)),
      Fa(a) && f(a, '_locale') && (d._locale = a._locale),
      d
    );
  }
  function Wa(a, b) {
    var c = a && parseFloat(a.replace(',', '.'));
    return (isNaN(c) ? 0 : c) * b;
  }
  function Xa(a, b) {
    var c = { milliseconds: 0, months: 0 };
    return (
      (c.months = b.month() - a.month() + 12 * (b.year() - a.year())),
      a.clone().add(c.months, 'M').isAfter(b) && --c.months,
      (c.milliseconds = +b - +a.clone().add(c.months, 'M')),
      c
    );
  }
  function Ya(a, b) {
    var c;
    return (
      (b = Ia(b, a)),
      a.isBefore(b)
        ? (c = Xa(a, b))
        : ((c = Xa(b, a)),
          (c.milliseconds = -c.milliseconds),
          (c.months = -c.months)),
      c
    );
  }
  function Za(a, b) {
    return function (c, d) {
      var e, f;
      return (
        null === d ||
          isNaN(+d) ||
          (_(
            b,
            'moment().' +
              b +
              '(period, number) is deprecated. Please use moment().' +
              b +
              '(number, period).'
          ),
          (f = c),
          (c = d),
          (d = f)),
        (c = 'string' == typeof c ? +c : c),
        (e = Va(c, d)),
        $a(this, e, a),
        this
      );
    };
  }
  function $a(b, c, d, e) {
    var f = c._milliseconds,
      g = c._days,
      h = c._months;
    (e = null == e ? !0 : e),
      f && b._d.setTime(+b._d + f * d),
      g && D(b, 'Date', C(b, 'Date') + g * d),
      h && V(b, C(b, 'Month') + h * d),
      e && a.updateOffset(b, g || h);
  }
  function _a(a) {
    var b = a || Aa(),
      c = Ia(b, this).startOf('day'),
      d = this.diff(c, 'days', !0),
      e =
        -6 > d
          ? 'sameElse'
          : -1 > d
          ? 'lastWeek'
          : 0 > d
          ? 'lastDay'
          : 1 > d
          ? 'sameDay'
          : 2 > d
          ? 'nextDay'
          : 7 > d
          ? 'nextWeek'
          : 'sameElse';
    return this.format(this.localeData().calendar(e, this, Aa(b)));
  }
  function ab() {
    return new n(this);
  }
  function bb(a, b) {
    var c;
    return (
      (b = z('undefined' != typeof b ? b : 'millisecond')),
      'millisecond' === b
        ? ((a = o(a) ? a : Aa(a)), +this > +a)
        : ((c = o(a) ? +a : +Aa(a)), c < +this.clone().startOf(b))
    );
  }
  function cb(a, b) {
    var c;
    return (
      (b = z('undefined' != typeof b ? b : 'millisecond')),
      'millisecond' === b
        ? ((a = o(a) ? a : Aa(a)), +a > +this)
        : ((c = o(a) ? +a : +Aa(a)), +this.clone().endOf(b) < c)
    );
  }
  function db(a, b, c) {
    return this.isAfter(a, c) && this.isBefore(b, c);
  }
  function eb(a, b) {
    var c;
    return (
      (b = z(b || 'millisecond')),
      'millisecond' === b
        ? ((a = o(a) ? a : Aa(a)), +this === +a)
        : ((c = +Aa(a)),
          +this.clone().startOf(b) <= c && c <= +this.clone().endOf(b))
    );
  }
  function fb(a) {
    return 0 > a ? Math.ceil(a) : Math.floor(a);
  }
  function gb(a, b, c) {
    var d,
      e,
      f = Ia(a, this),
      g = 6e4 * (f.utcOffset() - this.utcOffset());
    return (
      (b = z(b)),
      'year' === b || 'month' === b || 'quarter' === b
        ? ((e = hb(this, f)),
          'quarter' === b ? (e /= 3) : 'year' === b && (e /= 12))
        : ((d = this - f),
          (e =
            'second' === b
              ? d / 1e3
              : 'minute' === b
              ? d / 6e4
              : 'hour' === b
              ? d / 36e5
              : 'day' === b
              ? (d - g) / 864e5
              : 'week' === b
              ? (d - g) / 6048e5
              : d)),
      c ? e : fb(e)
    );
  }
  function hb(a, b) {
    var c,
      d,
      e = 12 * (b.year() - a.year()) + (b.month() - a.month()),
      f = a.clone().add(e, 'months');
    return (
      0 > b - f
        ? ((c = a.clone().add(e - 1, 'months')), (d = (b - f) / (f - c)))
        : ((c = a.clone().add(e + 1, 'months')), (d = (b - f) / (c - f))),
      -(e + d)
    );
  }
  function ib() {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
  }
  function jb() {
    var a = this.clone().utc();
    return 0 < a.year() && a.year() <= 9999
      ? 'function' == typeof Date.prototype.toISOString
        ? this.toDate().toISOString()
        : J(a, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]')
      : J(a, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
  }
  function kb(b) {
    var c = J(this, b || a.defaultFormat);
    return this.localeData().postformat(c);
  }
  function lb(a, b) {
    return this.isValid()
      ? Va({ to: this, from: a }).locale(this.locale()).humanize(!b)
      : this.localeData().invalidDate();
  }
  function mb(a) {
    return this.from(Aa(), a);
  }
  function nb(a, b) {
    return this.isValid()
      ? Va({ from: this, to: a }).locale(this.locale()).humanize(!b)
      : this.localeData().invalidDate();
  }
  function ob(a) {
    return this.to(Aa(), a);
  }
  function pb(a) {
    var b;
    return void 0 === a
      ? this._locale._abbr
      : ((b = x(a)), null != b && (this._locale = b), this);
  }
  function qb() {
    return this._locale;
  }
  function rb(a) {
    switch ((a = z(a))) {
      case 'year':
        this.month(0);
      case 'quarter':
      case 'month':
        this.date(1);
      case 'week':
      case 'isoWeek':
      case 'day':
        this.hours(0);
      case 'hour':
        this.minutes(0);
      case 'minute':
        this.seconds(0);
      case 'second':
        this.milliseconds(0);
    }
    return (
      'week' === a && this.weekday(0),
      'isoWeek' === a && this.isoWeekday(1),
      'quarter' === a && this.month(3 * Math.floor(this.month() / 3)),
      this
    );
  }
  function sb(a) {
    return (
      (a = z(a)),
      void 0 === a || 'millisecond' === a
        ? this
        : this.startOf(a)
            .add(1, 'isoWeek' === a ? 'week' : a)
            .subtract(1, 'ms')
    );
  }
  function tb() {
    return +this._d - 6e4 * (this._offset || 0);
  }
  function ub() {
    return Math.floor(+this / 1e3);
  }
  function vb() {
    return this._offset ? new Date(+this) : this._d;
  }
  function wb() {
    var a = this;
    return [
      a.year(),
      a.month(),
      a.date(),
      a.hour(),
      a.minute(),
      a.second(),
      a.millisecond(),
    ];
  }
  function xb() {
    return k(this);
  }
  function yb() {
    return g({}, j(this));
  }
  function zb() {
    return j(this).overflow;
  }
  function Ab(a, b) {
    G(0, [a, a.length], 0, b);
  }
  function Bb(a, b, c) {
    return ha(Aa([a, 11, 31 + b - c]), b, c).week;
  }
  function Cb(a) {
    var b = ha(
      this,
      this.localeData()._week.dow,
      this.localeData()._week.doy
    ).year;
    return null == a ? b : this.add(a - b, 'y');
  }
  function Db(a) {
    var b = ha(this, 1, 4).year;
    return null == a ? b : this.add(a - b, 'y');
  }
  function Eb() {
    return Bb(this.year(), 1, 4);
  }
  function Fb() {
    var a = this.localeData()._week;
    return Bb(this.year(), a.dow, a.doy);
  }
  function Gb(a) {
    return null == a
      ? Math.ceil((this.month() + 1) / 3)
      : this.month(3 * (a - 1) + (this.month() % 3));
  }
  function Hb(a, b) {
    if ('string' == typeof a)
      if (isNaN(a)) {
        if (((a = b.weekdaysParse(a)), 'number' != typeof a)) return null;
      } else a = parseInt(a, 10);
    return a;
  }
  function Ib(a) {
    return this._weekdays[a.day()];
  }
  function Jb(a) {
    return this._weekdaysShort[a.day()];
  }
  function Kb(a) {
    return this._weekdaysMin[a.day()];
  }
  function Lb(a) {
    var b, c, d;
    for (this._weekdaysParse || (this._weekdaysParse = []), b = 0; 7 > b; b++)
      if (
        (this._weekdaysParse[b] ||
          ((c = Aa([2e3, 1]).day(b)),
          (d =
            '^' +
            this.weekdays(c, '') +
            '|^' +
            this.weekdaysShort(c, '') +
            '|^' +
            this.weekdaysMin(c, '')),
          (this._weekdaysParse[b] = new RegExp(d.replace('.', ''), 'i'))),
        this._weekdaysParse[b].test(a))
      )
        return b;
  }
  function Mb(a) {
    var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    return null != a
      ? ((a = Hb(a, this.localeData())), this.add(a - b, 'd'))
      : b;
  }
  function Nb(a) {
    var b = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return null == a ? b : this.add(a - b, 'd');
  }
  function Ob(a) {
    return null == a ? this.day() || 7 : this.day(this.day() % 7 ? a : a - 7);
  }
  function Pb(a, b) {
    G(a, 0, 0, function () {
      return this.localeData().meridiem(this.hours(), this.minutes(), b);
    });
  }
  function Qb(a, b) {
    return b._meridiemParse;
  }
  function Rb(a) {
    return 'p' === (a + '').toLowerCase().charAt(0);
  }
  function Sb(a, b, c) {
    return a > 11 ? (c ? 'pm' : 'PM') : c ? 'am' : 'AM';
  }
  function Tb(a) {
    G(0, [a, 3], 0, 'millisecond');
  }
  function Ub() {
    return this._isUTC ? 'UTC' : '';
  }
  function Vb() {
    return this._isUTC ? 'Coordinated Universal Time' : '';
  }
  function Wb(a) {
    return Aa(1e3 * a);
  }
  function Xb() {
    return Aa.apply(null, arguments).parseZone();
  }
  function Yb(a, b, c) {
    var d = this._calendar[a];
    return 'function' == typeof d ? d.call(b, c) : d;
  }
  function Zb(a) {
    var b = this._longDateFormat[a];
    return (
      !b &&
        this._longDateFormat[a.toUpperCase()] &&
        ((b = this._longDateFormat[a.toUpperCase()].replace(
          /MMMM|MM|DD|dddd/g,
          function (a) {
            return a.slice(1);
          }
        )),
        (this._longDateFormat[a] = b)),
      b
    );
  }
  function $b() {
    return this._invalidDate;
  }
  function _b(a) {
    return this._ordinal.replace('%d', a);
  }
  function ac(a) {
    return a;
  }
  function bc(a, b, c, d) {
    var e = this._relativeTime[c];
    return 'function' == typeof e ? e(a, b, c, d) : e.replace(/%d/i, a);
  }
  function cc(a, b) {
    var c = this._relativeTime[a > 0 ? 'future' : 'past'];
    return 'function' == typeof c ? c(b) : c.replace(/%s/i, b);
  }
  function dc(a) {
    var b, c;
    for (c in a)
      (b = a[c]), 'function' == typeof b ? (this[c] = b) : (this['_' + c] = b);
    this._ordinalParseLenient = new RegExp(
      this._ordinalParse.source + '|' + /\d{1,2}/.source
    );
  }
  function ec(a, b, c, d) {
    var e = x(),
      f = h().set(d, b);
    return e[c](f, a);
  }
  function fc(a, b, c, d, e) {
    if (
      ('number' == typeof a && ((b = a), (a = void 0)),
      (a = a || ''),
      null != b)
    )
      return ec(a, b, c, e);
    var f,
      g = [];
    for (f = 0; d > f; f++) g[f] = ec(a, f, c, e);
    return g;
  }
  function gc(a, b) {
    return fc(a, b, 'months', 12, 'month');
  }
  function hc(a, b) {
    return fc(a, b, 'monthsShort', 12, 'month');
  }
  function ic(a, b) {
    return fc(a, b, 'weekdays', 7, 'day');
  }
  function jc(a, b) {
    return fc(a, b, 'weekdaysShort', 7, 'day');
  }
  function kc(a, b) {
    return fc(a, b, 'weekdaysMin', 7, 'day');
  }
  function lc() {
    var a = this._data;
    return (
      (this._milliseconds = Rd(this._milliseconds)),
      (this._days = Rd(this._days)),
      (this._months = Rd(this._months)),
      (a.milliseconds = Rd(a.milliseconds)),
      (a.seconds = Rd(a.seconds)),
      (a.minutes = Rd(a.minutes)),
      (a.hours = Rd(a.hours)),
      (a.months = Rd(a.months)),
      (a.years = Rd(a.years)),
      this
    );
  }
  function mc(a, b, c, d) {
    var e = Va(b, c);
    return (
      (a._milliseconds += d * e._milliseconds),
      (a._days += d * e._days),
      (a._months += d * e._months),
      a._bubble()
    );
  }
  function nc(a, b) {
    return mc(this, a, b, 1);
  }
  function oc(a, b) {
    return mc(this, a, b, -1);
  }
  function pc() {
    var a,
      b,
      c,
      d = this._milliseconds,
      e = this._days,
      f = this._months,
      g = this._data,
      h = 0;
    return (
      (g.milliseconds = d % 1e3),
      (a = fb(d / 1e3)),
      (g.seconds = a % 60),
      (b = fb(a / 60)),
      (g.minutes = b % 60),
      (c = fb(b / 60)),
      (g.hours = c % 24),
      (e += fb(c / 24)),
      (h = fb(qc(e))),
      (e -= fb(rc(h))),
      (f += fb(e / 30)),
      (e %= 30),
      (h += fb(f / 12)),
      (f %= 12),
      (g.days = e),
      (g.months = f),
      (g.years = h),
      this
    );
  }
  function qc(a) {
    return (400 * a) / 146097;
  }
  function rc(a) {
    return (146097 * a) / 400;
  }
  function sc(a) {
    var b,
      c,
      d = this._milliseconds;
    if (((a = z(a)), 'month' === a || 'year' === a))
      return (
        (b = this._days + d / 864e5),
        (c = this._months + 12 * qc(b)),
        'month' === a ? c : c / 12
      );
    switch (((b = this._days + Math.round(rc(this._months / 12))), a)) {
      case 'week':
        return b / 7 + d / 6048e5;
      case 'day':
        return b + d / 864e5;
      case 'hour':
        return 24 * b + d / 36e5;
      case 'minute':
        return 1440 * b + d / 6e4;
      case 'second':
        return 86400 * b + d / 1e3;
      case 'millisecond':
        return Math.floor(864e5 * b) + d;
      default:
        throw new Error('Unknown unit ' + a);
    }
  }
  function tc() {
    return (
      this._milliseconds +
      864e5 * this._days +
      (this._months % 12) * 2592e6 +
      31536e6 * p(this._months / 12)
    );
  }
  function uc(a) {
    return function () {
      return this.as(a);
    };
  }
  function vc(a) {
    return (a = z(a)), this[a + 's']();
  }
  function wc(a) {
    return function () {
      return this._data[a];
    };
  }
  function xc() {
    return fb(this.days() / 7);
  }
  function yc(a, b, c, d, e) {
    return e.relativeTime(b || 1, !!c, a, d);
  }
  function zc(a, b, c) {
    var d = Va(a).abs(),
      e = fe(d.as('s')),
      f = fe(d.as('m')),
      g = fe(d.as('h')),
      h = fe(d.as('d')),
      i = fe(d.as('M')),
      j = fe(d.as('y')),
      k = (e < ge.s && ['s', e]) ||
        (1 === f && ['m']) ||
        (f < ge.m && ['mm', f]) ||
        (1 === g && ['h']) ||
        (g < ge.h && ['hh', g]) ||
        (1 === h && ['d']) ||
        (h < ge.d && ['dd', h]) ||
        (1 === i && ['M']) ||
        (i < ge.M && ['MM', i]) ||
        (1 === j && ['y']) || ['yy', j];
    return (k[2] = b), (k[3] = +a > 0), (k[4] = c), yc.apply(null, k);
  }
  function Ac(a, b) {
    return void 0 === ge[a] ? !1 : void 0 === b ? ge[a] : ((ge[a] = b), !0);
  }
  function Bc(a) {
    var b = this.localeData(),
      c = zc(this, !a, b);
    return a && (c = b.pastFuture(+this, c)), b.postformat(c);
  }
  function Cc() {
    var a = he(this.years()),
      b = he(this.months()),
      c = he(this.days()),
      d = he(this.hours()),
      e = he(this.minutes()),
      f = he(this.seconds() + this.milliseconds() / 1e3),
      g = this.asSeconds();
    return g
      ? (0 > g ? '-' : '') +
          'P' +
          (a ? a + 'Y' : '') +
          (b ? b + 'M' : '') +
          (c ? c + 'D' : '') +
          (d || e || f ? 'T' : '') +
          (d ? d + 'H' : '') +
          (e ? e + 'M' : '') +
          (f ? f + 'S' : '')
      : 'P0D';
  }
  var Dc,
    Ec,
    Fc = (a.momentProperties = []),
    Gc = !1,
    Hc = {},
    Ic = {},
    Jc =
      /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,
    Kc = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
    Lc = {},
    Mc = {},
    Nc = /\d/,
    Oc = /\d\d/,
    Pc = /\d{3}/,
    Qc = /\d{4}/,
    Rc = /[+-]?\d{6}/,
    Sc = /\d\d?/,
    Tc = /\d{1,3}/,
    Uc = /\d{1,4}/,
    Vc = /[+-]?\d{1,6}/,
    Wc = /\d+/,
    Xc = /[+-]?\d+/,
    Yc = /Z|[+-]\d\d:?\d\d/gi,
    Zc = /[+-]?\d+(\.\d{1,3})?/,
    $c =
      /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
    _c = {},
    ad = {},
    bd = 0,
    cd = 1,
    dd = 2,
    ed = 3,
    fd = 4,
    gd = 5,
    hd = 6;
  G('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
  }),
    G('MMM', 0, 0, function (a) {
      return this.localeData().monthsShort(this, a);
    }),
    G('MMMM', 0, 0, function (a) {
      return this.localeData().months(this, a);
    }),
    y('month', 'M'),
    L('M', Sc),
    L('MM', Sc, Oc),
    L('MMM', $c),
    L('MMMM', $c),
    O(['M', 'MM'], function (a, b) {
      b[cd] = p(a) - 1;
    }),
    O(['MMM', 'MMMM'], function (a, b, c, d) {
      var e = c._locale.monthsParse(a, d, c._strict);
      null != e ? (b[cd] = e) : (j(c).invalidMonth = a);
    });
  var id =
      'January_February_March_April_May_June_July_August_September_October_November_December'.split(
        '_'
      ),
    jd = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    kd = {};
  a.suppressDeprecationWarnings = !1;
  var ld =
      /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
    md = [
      ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
      ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
      ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
      ['GGGG-[W]WW', /\d{4}-W\d{2}/],
      ['YYYY-DDD', /\d{4}-\d{3}/],
    ],
    nd = [
      ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
      ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
      ['HH:mm', /(T| )\d\d:\d\d/],
      ['HH', /(T| )\d\d/],
    ],
    od = /^\/?Date\((\-?\d+)/i;
  (a.createFromInputFallback = $(
    'moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.',
    function (a) {
      a._d = new Date(a._i + (a._useUTC ? ' UTC' : ''));
    }
  )),
    G(0, ['YY', 2], 0, function () {
      return this.year() % 100;
    }),
    G(0, ['YYYY', 4], 0, 'year'),
    G(0, ['YYYYY', 5], 0, 'year'),
    G(0, ['YYYYYY', 6, !0], 0, 'year'),
    y('year', 'y'),
    L('Y', Xc),
    L('YY', Sc, Oc),
    L('YYYY', Uc, Qc),
    L('YYYYY', Vc, Rc),
    L('YYYYYY', Vc, Rc),
    O(['YYYY', 'YYYYY', 'YYYYYY'], bd),
    O('YY', function (b, c) {
      c[bd] = a.parseTwoDigitYear(b);
    }),
    (a.parseTwoDigitYear = function (a) {
      return p(a) + (p(a) > 68 ? 1900 : 2e3);
    });
  var pd = B('FullYear', !1);
  G('w', ['ww', 2], 'wo', 'week'),
    G('W', ['WW', 2], 'Wo', 'isoWeek'),
    y('week', 'w'),
    y('isoWeek', 'W'),
    L('w', Sc),
    L('ww', Sc, Oc),
    L('W', Sc),
    L('WW', Sc, Oc),
    P(['w', 'ww', 'W', 'WW'], function (a, b, c, d) {
      b[d.substr(0, 1)] = p(a);
    });
  var qd = { dow: 0, doy: 6 };
  G('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear'),
    y('dayOfYear', 'DDD'),
    L('DDD', Tc),
    L('DDDD', Pc),
    O(['DDD', 'DDDD'], function (a, b, c) {
      c._dayOfYear = p(a);
    }),
    (a.ISO_8601 = function () {});
  var rd = $(
      'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
      function () {
        var a = Aa.apply(null, arguments);
        return this > a ? this : a;
      }
    ),
    sd = $(
      'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
      function () {
        var a = Aa.apply(null, arguments);
        return a > this ? this : a;
      }
    );
  Ga('Z', ':'),
    Ga('ZZ', ''),
    L('Z', Yc),
    L('ZZ', Yc),
    O(['Z', 'ZZ'], function (a, b, c) {
      (c._useUTC = !0), (c._tzm = Ha(a));
    });
  var td = /([\+\-]|\d\d)/gi;
  a.updateOffset = function () {};
  var ud = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,
    vd =
      /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
  Va.fn = Ea.prototype;
  var wd = Za(1, 'add'),
    xd = Za(-1, 'subtract');
  a.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
  var yd = $(
    'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
    function (a) {
      return void 0 === a ? this.localeData() : this.locale(a);
    }
  );
  G(0, ['gg', 2], 0, function () {
    return this.weekYear() % 100;
  }),
    G(0, ['GG', 2], 0, function () {
      return this.isoWeekYear() % 100;
    }),
    Ab('gggg', 'weekYear'),
    Ab('ggggg', 'weekYear'),
    Ab('GGGG', 'isoWeekYear'),
    Ab('GGGGG', 'isoWeekYear'),
    y('weekYear', 'gg'),
    y('isoWeekYear', 'GG'),
    L('G', Xc),
    L('g', Xc),
    L('GG', Sc, Oc),
    L('gg', Sc, Oc),
    L('GGGG', Uc, Qc),
    L('gggg', Uc, Qc),
    L('GGGGG', Vc, Rc),
    L('ggggg', Vc, Rc),
    P(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (a, b, c, d) {
      b[d.substr(0, 2)] = p(a);
    }),
    P(['gg', 'GG'], function (b, c, d, e) {
      c[e] = a.parseTwoDigitYear(b);
    }),
    G('Q', 0, 0, 'quarter'),
    y('quarter', 'Q'),
    L('Q', Nc),
    O('Q', function (a, b) {
      b[cd] = 3 * (p(a) - 1);
    }),
    G('D', ['DD', 2], 'Do', 'date'),
    y('date', 'D'),
    L('D', Sc),
    L('DD', Sc, Oc),
    L('Do', function (a, b) {
      return a ? b._ordinalParse : b._ordinalParseLenient;
    }),
    O(['D', 'DD'], dd),
    O('Do', function (a, b) {
      b[dd] = p(a.match(Sc)[0], 10);
    });
  var zd = B('Date', !0);
  G('d', 0, 'do', 'day'),
    G('dd', 0, 0, function (a) {
      return this.localeData().weekdaysMin(this, a);
    }),
    G('ddd', 0, 0, function (a) {
      return this.localeData().weekdaysShort(this, a);
    }),
    G('dddd', 0, 0, function (a) {
      return this.localeData().weekdays(this, a);
    }),
    G('e', 0, 0, 'weekday'),
    G('E', 0, 0, 'isoWeekday'),
    y('day', 'd'),
    y('weekday', 'e'),
    y('isoWeekday', 'E'),
    L('d', Sc),
    L('e', Sc),
    L('E', Sc),
    L('dd', $c),
    L('ddd', $c),
    L('dddd', $c),
    P(['dd', 'ddd', 'dddd'], function (a, b, c) {
      var d = c._locale.weekdaysParse(a);
      null != d ? (b.d = d) : (j(c).invalidWeekday = a);
    }),
    P(['d', 'e', 'E'], function (a, b, c, d) {
      b[d] = p(a);
    });
  var Ad = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
      '_'
    ),
    Bd = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    Cd = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
  G('H', ['HH', 2], 0, 'hour'),
    G('h', ['hh', 2], 0, function () {
      return this.hours() % 12 || 12;
    }),
    Pb('a', !0),
    Pb('A', !1),
    y('hour', 'h'),
    L('a', Qb),
    L('A', Qb),
    L('H', Sc),
    L('h', Sc),
    L('HH', Sc, Oc),
    L('hh', Sc, Oc),
    O(['H', 'HH'], ed),
    O(['a', 'A'], function (a, b, c) {
      (c._isPm = c._locale.isPM(a)), (c._meridiem = a);
    }),
    O(['h', 'hh'], function (a, b, c) {
      (b[ed] = p(a)), (j(c).bigHour = !0);
    });
  var Dd = /[ap]\.?m?\.?/i,
    Ed = B('Hours', !0);
  G('m', ['mm', 2], 0, 'minute'),
    y('minute', 'm'),
    L('m', Sc),
    L('mm', Sc, Oc),
    O(['m', 'mm'], fd);
  var Fd = B('Minutes', !1);
  G('s', ['ss', 2], 0, 'second'),
    y('second', 's'),
    L('s', Sc),
    L('ss', Sc, Oc),
    O(['s', 'ss'], gd);
  var Gd = B('Seconds', !1);
  G('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
  }),
    G(0, ['SS', 2], 0, function () {
      return ~~(this.millisecond() / 10);
    }),
    Tb('SSS'),
    Tb('SSSS'),
    y('millisecond', 'ms'),
    L('S', Tc, Nc),
    L('SS', Tc, Oc),
    L('SSS', Tc, Pc),
    L('SSSS', Wc),
    O(['S', 'SS', 'SSS', 'SSSS'], function (a, b) {
      b[hd] = p(1e3 * ('0.' + a));
    });
  var Hd = B('Milliseconds', !1);
  G('z', 0, 0, 'zoneAbbr'), G('zz', 0, 0, 'zoneName');
  var Id = n.prototype;
  (Id.add = wd),
    (Id.calendar = _a),
    (Id.clone = ab),
    (Id.diff = gb),
    (Id.endOf = sb),
    (Id.format = kb),
    (Id.from = lb),
    (Id.fromNow = mb),
    (Id.to = nb),
    (Id.toNow = ob),
    (Id.get = E),
    (Id.invalidAt = zb),
    (Id.isAfter = bb),
    (Id.isBefore = cb),
    (Id.isBetween = db),
    (Id.isSame = eb),
    (Id.isValid = xb),
    (Id.lang = yd),
    (Id.locale = pb),
    (Id.localeData = qb),
    (Id.max = sd),
    (Id.min = rd),
    (Id.parsingFlags = yb),
    (Id.set = E),
    (Id.startOf = rb),
    (Id.subtract = xd),
    (Id.toArray = wb),
    (Id.toDate = vb),
    (Id.toISOString = jb),
    (Id.toJSON = jb),
    (Id.toString = ib),
    (Id.unix = ub),
    (Id.valueOf = tb),
    (Id.year = pd),
    (Id.isLeapYear = ga),
    (Id.weekYear = Cb),
    (Id.isoWeekYear = Db),
    (Id.quarter = Id.quarters = Gb),
    (Id.month = W),
    (Id.daysInMonth = X),
    (Id.week = Id.weeks = la),
    (Id.isoWeek = Id.isoWeeks = ma),
    (Id.weeksInYear = Fb),
    (Id.isoWeeksInYear = Eb),
    (Id.date = zd),
    (Id.day = Id.days = Mb),
    (Id.weekday = Nb),
    (Id.isoWeekday = Ob),
    (Id.dayOfYear = oa),
    (Id.hour = Id.hours = Ed),
    (Id.minute = Id.minutes = Fd),
    (Id.second = Id.seconds = Gd),
    (Id.millisecond = Id.milliseconds = Hd),
    (Id.utcOffset = Ka),
    (Id.utc = Ma),
    (Id.local = Na),
    (Id.parseZone = Oa),
    (Id.hasAlignedHourOffset = Pa),
    (Id.isDST = Qa),
    (Id.isDSTShifted = Ra),
    (Id.isLocal = Sa),
    (Id.isUtcOffset = Ta),
    (Id.isUtc = Ua),
    (Id.isUTC = Ua),
    (Id.zoneAbbr = Ub),
    (Id.zoneName = Vb),
    (Id.dates = $('dates accessor is deprecated. Use date instead.', zd)),
    (Id.months = $('months accessor is deprecated. Use month instead', W)),
    (Id.years = $('years accessor is deprecated. Use year instead', pd)),
    (Id.zone = $(
      'moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779',
      La
    ));
  var Jd = Id,
    Kd = {
      sameDay: '[Today at] LT',
      nextDay: '[Tomorrow at] LT',
      nextWeek: 'dddd [at] LT',
      lastDay: '[Yesterday at] LT',
      lastWeek: '[Last] dddd [at] LT',
      sameElse: 'L',
    },
    Ld = {
      LTS: 'h:mm:ss A',
      LT: 'h:mm A',
      L: 'MM/DD/YYYY',
      LL: 'MMMM D, YYYY',
      LLL: 'MMMM D, YYYY LT',
      LLLL: 'dddd, MMMM D, YYYY LT',
    },
    Md = 'Invalid date',
    Nd = '%d',
    Od = /\d{1,2}/,
    Pd = {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years',
    },
    Qd = r.prototype;
  (Qd._calendar = Kd),
    (Qd.calendar = Yb),
    (Qd._longDateFormat = Ld),
    (Qd.longDateFormat = Zb),
    (Qd._invalidDate = Md),
    (Qd.invalidDate = $b),
    (Qd._ordinal = Nd),
    (Qd.ordinal = _b),
    (Qd._ordinalParse = Od),
    (Qd.preparse = ac),
    (Qd.postformat = ac),
    (Qd._relativeTime = Pd),
    (Qd.relativeTime = bc),
    (Qd.pastFuture = cc),
    (Qd.set = dc),
    (Qd.months = S),
    (Qd._months = id),
    (Qd.monthsShort = T),
    (Qd._monthsShort = jd),
    (Qd.monthsParse = U),
    (Qd.week = ia),
    (Qd._week = qd),
    (Qd.firstDayOfYear = ka),
    (Qd.firstDayOfWeek = ja),
    (Qd.weekdays = Ib),
    (Qd._weekdays = Ad),
    (Qd.weekdaysMin = Kb),
    (Qd._weekdaysMin = Cd),
    (Qd.weekdaysShort = Jb),
    (Qd._weekdaysShort = Bd),
    (Qd.weekdaysParse = Lb),
    (Qd.isPM = Rb),
    (Qd._meridiemParse = Dd),
    (Qd.meridiem = Sb),
    v('en', {
      ordinalParse: /\d{1,2}(th|st|nd|rd)/,
      ordinal: function (a) {
        var b = a % 10,
          c =
            1 === p((a % 100) / 10)
              ? 'th'
              : 1 === b
              ? 'st'
              : 2 === b
              ? 'nd'
              : 3 === b
              ? 'rd'
              : 'th';
        return a + c;
      },
    }),
    (a.lang = $('moment.lang is deprecated. Use moment.locale instead.', v)),
    (a.langData = $(
      'moment.langData is deprecated. Use moment.localeData instead.',
      x
    ));
  var Rd = Math.abs,
    Sd = uc('ms'),
    Td = uc('s'),
    Ud = uc('m'),
    Vd = uc('h'),
    Wd = uc('d'),
    Xd = uc('w'),
    Yd = uc('M'),
    Zd = uc('y'),
    $d = wc('milliseconds'),
    _d = wc('seconds'),
    ae = wc('minutes'),
    be = wc('hours'),
    ce = wc('days'),
    de = wc('months'),
    ee = wc('years'),
    fe = Math.round,
    ge = { s: 45, m: 45, h: 22, d: 26, M: 11 },
    he = Math.abs,
    ie = Ea.prototype;
  (ie.abs = lc),
    (ie.add = nc),
    (ie.subtract = oc),
    (ie.as = sc),
    (ie.asMilliseconds = Sd),
    (ie.asSeconds = Td),
    (ie.asMinutes = Ud),
    (ie.asHours = Vd),
    (ie.asDays = Wd),
    (ie.asWeeks = Xd),
    (ie.asMonths = Yd),
    (ie.asYears = Zd),
    (ie.valueOf = tc),
    (ie._bubble = pc),
    (ie.get = vc),
    (ie.milliseconds = $d),
    (ie.seconds = _d),
    (ie.minutes = ae),
    (ie.hours = be),
    (ie.days = ce),
    (ie.weeks = xc),
    (ie.months = de),
    (ie.years = ee),
    (ie.humanize = Bc),
    (ie.toISOString = Cc),
    (ie.toString = Cc),
    (ie.toJSON = Cc),
    (ie.locale = pb),
    (ie.localeData = qb),
    (ie.toIsoString = $(
      'toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)',
      Cc
    )),
    (ie.lang = yd),
    G('X', 0, 0, 'unix'),
    G('x', 0, 0, 'valueOf'),
    L('x', Xc),
    L('X', Zc),
    O('X', function (a, b, c) {
      c._d = new Date(1e3 * parseFloat(a, 10));
    }),
    O('x', function (a, b, c) {
      c._d = new Date(p(a));
    }),
    (a.version = '2.10.3'),
    b(Aa),
    (a.fn = Jd),
    (a.min = Ca),
    (a.max = Da),
    (a.utc = h),
    (a.unix = Wb),
    (a.months = gc),
    (a.isDate = d),
    (a.locale = v),
    (a.invalid = l),
    (a.duration = Va),
    (a.isMoment = o),
    (a.weekdays = ic),
    (a.parseZone = Xb),
    (a.localeData = x),
    (a.isDuration = Fa),
    (a.monthsShort = hc),
    (a.weekdaysMin = kc),
    (a.defineLocale = w),
    (a.weekdaysShort = jc),
    (a.normalizeUnits = z),
    (a.relativeTimeThreshold = Ac);
  var je = a;
  return je;
});
var socket = null;
var identifier = null;
var steamid = null;
//NOTIF EXAMPLE
//Materialize.toast("The socket server is currently offline! Please try again later.", 5000, "rounded");

$(document).ready(function () {
  resize();
  identifier = $('meta[name="identifier"]').attr('content');
  steamid = $('meta[name="steamid"]').attr('content');
  //Socket IO
  if (!socket) {
    if (!identifier) {
      console.log('User not logged in.');
      $('.timer').css('width', '100%');
    } else {
      socket = io('http://FILLIN:8000');
      socket.on('connect', function (msg) {
        console.log('Connected!');
        socket.emit('authenticate', identifier);
        $.each($('.row #bet'), function (index, value) {
          $(this).remove();
        });
      });
      //REMOVE THIS LATER MAYBE
      setInterval(function () {
        if ($('.timer').attr('id') == null) {
          socket.emit('getTime');
        }
      }, 600);
    }
  } else {
    console.log('Connection already exists.');
  }
  //Rolling Roulette
  var currentNum = 0;
  function roll(num) {
    var numWidth = 1050 / 15;

    var layout = [1, 14, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8];

    function getMoves() {
      let to = layout.indexOf(num);
      let at = layout.indexOf(currentNum);

      if (to > at) {
        return to - at;
      } else {
        return layout.length - at + to;
      }
    }

    var currentPos = parseInt(
      $('#case').css('background-position').split(' ')[0].slice(0, -2)
    );
    currentPos ? null : (currentPos = 0);
    $('#case').animate(
      {
        'background-position': currentPos - 2100 - getMoves() * numWidth,
      },
      3000
    );
    $('#case').attr('class', currentPos - 2100 - getMoves() * numWidth);
    currentNum = num;
    setTimeout(function () {
      if ($('#past .ball').length >= 10) {
        $('#past .ball').first().remove();
      }
      if (num == 0) {
        $('.ball')
          .last()
          .after("<div class='ball ball-0'>" + num + '</div>');
      } else if (num <= 7) {
        $('.ball')
          .last()
          .after("<div class='ball ball-1'>" + num + '</div>');
      } else {
        $('.ball')
          .last()
          .after("<div class='ball ball-8'>" + num + '</div>');
      }
      $.each($('.row #bet'), function (index, value) {
        $(this).remove();
      });
    }, 3300);
  }
  //Move roulette wheel on resize to fit perfect
  $(window).resize(function () {
    resize();
  });
  // Socket requests
  socket.on('roll', function (rolledNumber) {
    roll(rolledNumber);
    $('.timer').attr('id', '');
  });
  socket.on('timer', function (timer) {
    $('.timer').attr('id', 'from' + timer);
  });
  socket.on('users', function (num) {
    $('.users-online').html(num);
  });
  socket.on('currentBets', function (currentBets) {
    for (i = 0; i < currentBets.length; i++) {
      $('.' + currentBets[i].colour + 'bet').append(
        '<div class="row" id="bet"><div class="name" style="float: left;">' +
          currentBets[i].name +
          '</div><div class="bet" style="float: right;">' +
          currentBets[i].amount +
          '</div></div>'
      );
    }
  });
  socket.on('bet', function (bet) {
    $('.' + bet.colour + 'bet').append(
      '<div class="row" id="bet"><div class="name" style="float: left;">' +
        bet.name +
        '</div><div class="bet" style="float: right;">' +
        bet.amount +
        '</div></div>'
    );
  });
  socket.on('message', function (msg) {
    if (msg.steamid == steamid) {
      $('#nav-chat .discussion.wrapper').append(
        '<li data-steamid="' +
          msg.steamid +
          '" class="self" style=""><div class="avatar"><a href="http://steamcommunity.com/profiles/' +
          msg.steamid +
          '" target="_blank"><img src="' +
          msg.avatar +
          '" class="circle"></a></div><div class="messages"><p>' +
          msg.message +
          '</p><time datetime="' +
          new Date().toString() +
          '" class="grey-text">' +
          moment().format('h:mm A') +
          '</time></div></li>'
      );
    } else {
      $('#nav-chat .discussion.wrapper').append(
        '<li data-steamid="' +
          msg.steamid +
          '" class="other" style=""><div class="avatar"><a href="http://steamcommunity.com/profiles/' +
          msg.steamid +
          '" target="_blank"><img src="' +
          msg.avatar +
          '" class="circle"></a></div><div class="messages"><h1>' +
          msg.username +
          '</h1><p>' +
          msg.message +
          '</p><time datetime="' +
          new Date().toString() +
          '" class="grey-text">' +
          moment().format('h:mm A') +
          '</time></div></li>'
      );
    }
    document.getElementById('navChat').scrollTop =
      document.getElementById('navChat').scrollHeight;
  });
  socket.on('notify', function (info) {
    Materialize.toast(info.message, info.time, 'rounded');
    if (info.type == 'balance') {
      $('#balance').html(info.data);
    } else if (info.type == 'affiliateAvailablebalance') {
      $('#balance').html(info.data);
      $('#affiliate-available-earnings-label').html('$0.00');
    }
  });
  //Placing Bet
  $('#betButtons .btn').click(function () {
    var betAmount = $('#betAmount').val();
    socket.emit('placeBet', $(this).attr('id'), betAmount);
  });
  //Chat
  $('#user-message').keydown(function (e) {
    if (e.which == 13) {
      e.preventDefault();
      socket.emit('chatMessage', $('#user-message').val());
      $('#user-message').val('');
      return false;
    }
  });
  //Creating Support Ticket
  $('#user-submit-ticket').click(function () {
    socket.emit(
      'createTicket',
      grecaptcha.getResponse(),
      $('#ticketSubject').val(),
      $('#ticketDescription').val()
    );
  });
  //Remove Support Ticket
  $('.user-close-ticket').click(function () {
    socket.emit('closeTicket', $(this).attr('id'));
  });
  //Responding to Ticket (requires permission)
  $('.admin-respond-ticket').click(function () {
    var ticketID = $(this).parent().closest('div').attr('id');
    var ticketResponse = $('#' + ticketID + ' .admin-ticket-response').val();
    socket.emit('respondTicket', ticketID, ticketResponse);
  });
  //Updating Trade Link
  $('#modal-account #saveSettings').click(function () {
    socket.emit('tradeUpdate', $('#account-tradeofferurl').val());
  });
  //Redeeming Refferal Code
  $('#refferal-code-redeem').click(function () {
    socket.emit('redeemCode', $('#refferal-code-text').val());
  });
  //Creating Refferal Code
  $('#refferal-code-create').click(function () {
    socket.emit('createCode', $('#create-refferal-code-text').val());
  });
  //Claiming available affiliate earnings
  $('#refferal-code-claim').click(function () {
    socket.emit('claimEarnings');
  });
});

var screenWidth = window.innerWidth;

function resize() {
  if (parseInt($('#case').attr('class')) < 0) {
    for (i = 0; i <= 1; i++) {
      if (i == 0) {
        if (screenWidth > window.innerWidth) {
          for (z = 0; z <= 1; z++) {
            if (z == 0) {
              if (
                parseFloat(
                  $('#case')
                    .css('background-position')
                    .split(' ')[0]
                    .replace('px', '')
                ) > parseFloat($('#case').attr('class'))
              ) {
                console.log(parseFloat($('#case').attr('data-id')));
                $('#case').css(
                  'background-position',
                  parseInt($('#case').attr('class')) + 'px'
                );
                z = 2;
                return;
              }
            }
            if (z == 1) {
              $('#case').css(
                'background-position',
                parseInt($('#case').attr('class')) +
                  ($('#case').width() / 70 / 2) * 70 -
                  525 +
                  'px'
              );
              $('#case').attr(
                'data-id',
                ($('#case').width() / 70 / 2) * 70 - 525
              );
            }
          }
        } else {
          for (x = 0; x <= 1; x++) {
            if (x == 0) {
              var a = parseFloat(
                $('#case')
                  .css('background-position')
                  .split(' ')[0]
                  .replace('px', '')
              );
              var b = parseFloat($('#case').attr('data-id'));
              var c = ($('#case').width() / 70 / 2) * 70 - 525;
              d = b - c;
              e = a - d;
              $('#case').css('background-position', e + 'px');
              // it should be a - d position perfect
            }
            if (x == 1) {
              $('#case').attr(
                'data-id',
                ($('#case').width() / 70 / 2) * 70 - 525
              );
            }
          }
        }
      }
      if (i == 1) {
        screenWidth = window.innerWidth;
      }
    }
  } else {
    $('#case').css(
      'background-position',
      parseInt($('#case').attr('class')) +
        ($('#case').width() / 70 / 2) * 70 -
        525 +
        'px'
    );
    $('#case').attr('data-id', ($('#case').width() / 70 / 2) * 70 - 525);
  }
}
$(document).ready(function () {
  socket.on('attemptingWithdraw', function (item) {
    $('#' + item + ' .withdraw-item-button').html(
      '<div class="progress" style="background-color: #303030;margin-top: 15px;"><div class="indeterminate secondary" style="background-color: #FFF;"></div></div>'
    );
  });
  socket.on('tradeSent', function (item, offerid) {
    $('#' + item + ' .withdraw-item-button').html('Acceppt Here');
    $('#' + item + ' .withdraw-item-button').attr('href', offerid);
    $('#' + item + ' .progress').remove();
  });
  socket.on('tradeError', function (item, offerid) {
    $('#' + item + ' .withdraw-item-button').html('Withdraw');
  });
});

$('.withdraw-item-button').click(function () {
  var itemid = $(this).parent().attr('id');
  if ($('#' + itemid + ' .withdraw-item-button').attr('href') == null) {
    console.log($('#' + itemid + ' .withdraw-item-button').html());
    socket.emit('withdraw', itemid);
  }
});
