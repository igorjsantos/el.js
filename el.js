'use strict';

var $el = (function (document, window, $el) {
    var forEach = 'forEach',
        node = Node.prototype,
        nodeList = NodeList.prototype,
        dummy = document.createElement('i');

    // Node Events
    node.on = function (event, fn) {
        if (typeof this.addEventListener === 'undefined') {
            this.addEventListener = function (e, fn, useCapture) {
                e = 'on' + e;
                return this.attachEvent(e, fn);
            };
        }
        this.addEventListener(event, fn, false);
        return this;
    };

    node.off = function (event, fn) {
        if (typeof this.removeEventListener === 'undefined') {
            this.removeEventListener = function (e, fn, useCapture) {
                e = 'on' + e;
                return this.detachEvent(e, fn);
            };
        }
        this.removeEventListener(event, fn, false);
        return this;
    };

    node.hasClass = function (c) {
        var e = Array.prototype.slice.call(this.classList);
        c = c.split(' ');
        for (var i = 0; i < c.length; i++)
            if (!this.classList.contains(c[i]))
                return false;
        return true;
    };

    node.addClass = function (c) {
        c = c.split(' ');
        for (var i = 0; i < c.length; i++)
            if (!this.hasClass(c[i]))
                this.classList.add(c[i]);
        return this;
    };

    node.removeClass = function (c) {
        var e = this.className.split(' ');
        c = c.split(' ');
        for (var i = 0; i < c.length; i++)
            if (this.hasClass(c[i]))
                this.classList.remove(c[i]);
        return this;
    };

    node.toggleClass = function (c) {
        c = c.split(' ');
        for (var i = 0; i < c.length; i++)
            this.classList.toggle(c[i]);
        return this;
    };


    // NodeList Events
    nodeList[forEach] = Array.prototype[forEach];

    nodeList.on = function (event, fn) {
        this[forEach](function (el) {
            el.on(event, fn);
        });
        return this;
    };

    nodeList.off = function (event, fn) {
        this[forEach](function (el) {
            el.off(event, fn);
        });
        return this;
    };

    nodeList.hasClass = function (c, all) {
        if (all === undefined) all = true;
        for (var i = this.length - 1; i >= 0; --i) {
            var hc = this[i].hasClass(c);
            if (all && !hc) return false;
            if (!all && hc) return true;
        }
        return true;
    };

    nodeList.addClass = function (c) {
        for (var i = 0; i < this.length; ++i)
            this[i].addClass(c);
    };

    nodeList.removeClass = function (c) {
        for (var i = 0; i < this.length; ++i)
            this[i].removeClass(c);
    };

    nodeList.toggleClass = function (c) {
        for (var i = 0; i < this.length; ++i)
            this[i].toggleClass(c);
    };

    // NodeList Events
    $el = function (selector) {
        var result = document.querySelectorAll(selector || ' '),
            length = result.length;
        return result.length == 1 ? result[0] : result;
    };

    $el.on = node.on.bind(Element);
    $el.off = node.off.bind(Element);
    $el.hasClass = node.hasClass.bind(Element);
    $el.addClass = node.addClass.bind(Element);
    $el.removeClass = node.removeClass.bind(Element);
    $el.toggleClass = node.toggleClass.bind(Element);

    return $el;
})(document, this);