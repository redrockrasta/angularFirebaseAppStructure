/**
 * SocketService - for realtime backend API
 *
 *  Should Implement following method:
 *  - setToken(token)
 *  - connect(url)
 *
 */
(function (_) {

    var FireBaseService = EventDispatcher.extend({

        events : {
            connected : 'onConnect'
            , error : 'onError'
            , receivedMessage : 'onReceivedMessage'
            , sendMessage : 'onSendMessage'

        }
        , _firebase : null
        , _fbRef : null
        , _token : null

        , init : function () {
            console.log(this._firebase);
        }

        , setToken : function (token) {
            this._token = token;
        }

        , connectByToken : function (token, url, cb) {
            this.setToken = token;
            this.connect(url, cb)
        }

        , connect : function (url, cb) {
            if (_.isEmpty(this._token)) {
                throw "Error: Token is required";
                return false;
            }

            var self = this;

            if (_.isEmpty(this._fbRef)) {
                this._fbRef = new this._firebase(url);
            }

            this._fbRef.auth(this._token, cb);
        }

    });

    var SocketServiceProvider = Class.extend({


        instance : new FireBaseService(),

        /**
         * Initialize and configure ActivtyModel
         * @return FireBaseService
        */
        $get:['$firebase','$q', function($firebase, $q){
            var injector = angular.injector(['VendorService']);
            this.instance._firebase = injector.get('FirebaseDep');
            this.instance._angularFire = $firebase;
            this.instance._q = $q;
            return this.instance;
        }]
    })

    angular.module('SwayChat.SocketService',['firebase','VendorService'])
           .provider('SocketService',SocketServiceProvider);

}(_));
