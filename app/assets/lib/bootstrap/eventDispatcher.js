/**
* Event dispatcher class,
* add ability to dispatch event
* on native classes.
*
* Use of Class.js
*
* @author John Turingan
*/

(function () {

var EventDispatcher = Class.extend({
    _listeners:{},

    /**
    * Add a listener on the object
    * @param type : Event type
    * @param listener : Listener callback
    */
    addEventListener:function(type, listener){
        this._listeners[type] = this._listeners[type] || [];
        this._listeners[type].push(listener);
    },


    /**
       * Remove a listener on the object
       * @param type : Event type
       * @param listener : Listener callback
       */
    removeEventListener:function(type, listener){
      if(this._listeners[type]){
        var index = this._listeners[type].indexOf(listener);

        if(index!==-1){
            this._listeners[type].splice(index,1);
        }
      }
    },

    // Retrieve the list of event handlers for a given type.
    _getListeners: function(type) {
        if (this._listeners.hasOwnProperty(type)) {
            return this._listeners[type];
        }
            return [];
    },


    /**
    * Dispatch an event to all registered listener
    * @param Mutiple params available, first must be string
    */
    dispatchEvent:function(type){
        var listeners;

        var args = [],
        listeners = this._getListeners(type);

        Array.prototype.push.apply(args, arguments);
        args = args.slice(1);

        for (var i = 0; i < listeners.length; i += 1) {
            listeners[i].apply(null, args);
        }
    }
})

    window.EventDispatcher = EventDispatcher;

}());



