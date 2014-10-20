/**
 * SocketService - for realtime backend API
 *
 *  Should Implement following method:
 *  - setToken(token)
 *  - connect(url)
 *  Secret : Frjn43RcE9DXfEAjCQN6uHE0DPT5GvsjsKHAmYnP
 */
(function (_) {

    var FireBaseService = EventDispatcher.extend({

        _name : "SocketService"
        , _q : null
        , _firebase : null
        , _angularFire : null
        , _dataRepo : null
        , _firebaseUrl : null
        , _token : null

        /* Firebase references */
        , _fbRef : null
        , _afbRef : null
        , _clientRef : null
        , _operatorRef : null
        , _sessionRef : null

        , init : function ($q, $firebase, FirebaseDep, DataRepository) {
            this._q = $q;
            this._firebase = FirebaseDep;
            this._angularFire = $firebase;
            this._dataRepo = DataRepository;
            this._firebaseUrl = ns('Config.Application').firebase.url;
            this._fbRef = new this._firebase(this._firebaseUrl);
            this.initFirebaseReference();
        }

        , initFirebaseReference : function () {

            this._clientRef = this._fbRef.child('visitors');
            this._operatorRef = this._fbRef.child('operators');
            this._sessionRef = this._fbRef.child('sessions');

        }

        , connect : function (token, cb) {
            this._token = token;
            var self = this;
            var callback = function (err, success) {
                if (_.isUndefined(err)) {
                    cb(err, success);
                    return;
                }

                cb(err, success);
            }

            this._fbRef.authWithCustomToken(token, callback);
        }

        , register : function (event, cb) {
            this.addEventListener(event, cb);
            return this;
        }

    });

    angular.module('SwayChat.SocketService',['ng', 'firebase','VendorService','SwayChat.DataRepository'])
           .service('SocketService', ['$q', '$firebase', 'FirebaseDep', 'DataRepository', FireBaseService]);

}(_));
