function Drag (options) {
    options = this.config(options);

    var childArr = Array.prototype.slice.call(options.child);

    options.parent.style.position = 'relative';

    childArr.map(function (items, index, array) {
        items.style.position = 'absolute';
        if (items.parentNode !== options.parent) {
            throw "Error: child"+ index +"is not children of parent";
        }
    });

    this.parent = options.parent;
    this.child = options.child;
    this.restrictX = options.restrictX;
    this.restrictY = options.restrictY;

    this.target = null;
    this.downX = 0;
    this.downY = 0;
    this.tgLeft = 0;
    this.tgTop = 0;
    
    this.init();
}

Drag.prototype = {

    constructor: Drag,

    default: {
        parent: document.getElementsByClassName('parent')[0],
        child: document.getElementsByClassName('target'),
        // restrictX: [document.getElementsByClassName('parent').offsetLeft, document.getElementsByClassName('parent').offsetWidth],
        // restrictY: [document.getElementsByClassName('parent').offsetTop, document.getElementsByClassName('parent').offsetHeight]
    },

    config: function (obj) {
        return this.merge(this.default, obj);
    },

    merge: function (obj1, obj2) {
        var obj = {};
        for (attr in obj1) {
            obj[attr] = obj1[attr];
        }
        for (attr in obj2) {
            obj[attr] = obj2[attr];
        }
        return obj;

    },

    init: function () {
        var me = this;

        this.parent.addEventListener('mousedown', function (e) {

            me.mousedownHandle(e, me);

        }, false);

        this.parent.addEventListener('mousemove', function (e) {

            me.mousemoveHandle(e, me);

        }, false);

        this.parent.addEventListener('mouseup', function (e) {

            me.mouseupHandle(e, me);

        }, false);

    },

    mousedownHandle: function (e, me) {
        console.log(e.target.className == me.child[0].className);
        if (e.target.className == me.child[0].className) {
            e.target.drag = true;
            me.target = e.target;
            me.tgTop = e.target.offsetTop;
            me.tgLeft = e.target.offsetLeft;
            me.downX = e.clientX;
            me.downY = e.clientY;
        } else {
            return;
        }

    },

    mousemoveHandle: function (e, me) {
        if (me.target && me.target.drag) {

            var nowtop,
                nowleft;

            if (this.restrictX || this.restrictY) {
                nowLeft = ( e.clientX - (me.downX - me.tgLeft) ) <= this.restrictX[1] ? ( e.clientX - (me.downX - me.tgLeft) ) : this.restrictX[1];
                nowtop = ( e.clientY - (me.downY - me.tgTop) ) <= this.restrictY[1] ? ( e.clientY - (me.downY - me.tgTop) ) : this.restrictY[1];                
                me.target.style.left =  nowleft + 'px';
                me.target.style.top =  nowtop + 'px';
            } else {
                me.target.style.left =  ( e.clientX - (me.downX - me.tgLeft) ) + 'px';
                me.target.style.top =  ( e.clientY - (me.downY - me.tgTop) ) + 'px';
            }

        } else {
            return;
        }

    },

    mouseupHandle: function (e, me) {
            e.target.drag = false;

    }
};