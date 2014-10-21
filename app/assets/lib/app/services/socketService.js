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

        /**
         * init initialize dependencies
         * @param {object} $q             angular Q
         * @param {object} $firebase      Angular Fire
         * @param {object} FirebaseDep    Firebase
         * @param {object} DataRepository Data Repository
         *
         * @return {object}                this
         */
        , init : function ($firebase, FirebaseDep, DataRepository) {
            this._firebase = FirebaseDep;
            this._angularFire = $firebase;
            this._dataRepo = DataRepository;
            this._firebaseUrl = ns('Config.Application').firebase.url;
            this._fbRef = new this._firebase(this._firebaseUrl);
            this.initFirebaseReference();

            return this;
        }

        /**
         * initFirebaseReference Initialize firebase References
         */
        , initFirebaseReference : function () {

            this._clientRef = this._fbRef.child('visitors');
            this._operatorRef = this._fbRef.child('operators');
            this._sessionRef = this._fbRef.child('sessions');

        }

        /**
         * auth Authenticate firebase connection for security
         * @param string   token token
         * @param Function cb    Callback Function
         */
        , auth : function (token, cb) {
            this._token = token;
            var self = this;
            var callback = function (err, success) {

                if (!_.isEmpty(err)) {
                    cb(err);
                    return;
                }

                self.initFirebaseListeners();
                cb(success);
            }

            this._fbRef.authWithCustomToken(token, callback);
        }

        /**
         * initFirebaseListeners Initialize firebase listeners
         */
        , initFirebaseListeners : function () {

            // Listen for new Visitor Client Connection
            this._clientRef.on('child_added', this._onNewClient, this);

            // Listen for new Operator Client Connection
            this._operatorRef.on('child_added', this._onNewOperator, this);

            // Listen for new Session
            this._sessionRef.on('child_added', this._onNewSession, this);
        }

        /**
         * register Register event Listener
         * @param string   event Event name
         * @param Function cb    callback function
         * @return {object}      this
         */
        , register : function (event, cb) {
            this.addEventListener(event, cb);
            return this;
        }

        /**
         * _onNewClient handles new client snapshot from firebase
         * @param  {object} snapshot firebase snapshot
         */
        , _onNewClient : function (snapshot) {
            // mold data and insert to repo
            var _snapshot = snapshot.val();
            var client = {
                "uid" : snapshot.name()
                , "domain":_snapshot.domain
                , "email":_snapshot.email
                , "init_message":_snapshot.init_message
                , "ip_address":_snapshot.ip_address
                , "name":_snapshot.name
                , "status":_snapshot.status
                , "user_type":_snapshot.user_type
            }

            this._dataRepo.addClient(client);
            this.dispatchEvent('onNewClient', snapshot);
        }

        /**
         * _onNewOperator handles new operator snapshot from firebase
         * @param  {object} snapshot firebase snapshot
         */
        , _onNewOperator : function (snapshot) {
            // mold data and insert to repo

            this.dispatchEvent('onNewOperator', snapshot);
        }

        /**
         * _onNewSession handles new session snapshot from firebase
         * @param  {object} snapshot firebase snapshot
         */
        , _onNewSession : function (snapshot) {
            // mold data and insert to repo

            this.dispatchEvent('onNewSession', snapshot);
        }

    });

    angular.module('SwayChat.SocketService',['ng', 'firebase','VendorService','SwayChat.DataRepository'])
           .service('SocketService', ['$firebase', 'FirebaseDep', 'DataRepository', FireBaseService]);

}(_));
