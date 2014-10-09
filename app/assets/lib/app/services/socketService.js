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

        , setToken : function (token) {
            this._token = token;
        }

        , connect : function (url) {

            var self = this;

            if (_.isEmpty(this._fbRef)) {
                this._fbRef = new this._firebase(url);
            }

            var authCallback = function (error, results) {
                if (!_.isEmpty(error)) {
                    self.dispatchEvent(self.events.error);
                    return;
                }

                self.dispatchEvent(self.events.connected);
            }

            this._fbRef.auth(this._token, authCallback);
        }

    });

    var SocketServiceProvider = Class.extend({


        instance : new FireBaseService(),

        /**
         * Initialize and configure ActivtyModel
         * @return FireBaseService
        */
        $get:['$firebase', function($firebase){
            var injector = angular.injector(['VendorService']);
            this.instance._firebase = injector.get('FirebaseDep');
            this.instance._angularFire = $firebase;
            return this.instance;
        }]
    })

    angular.module('SwayChat.SocketService',['firebase','VendorService'])
           .provider('SocketService',SocketServiceProvider);

}(_));
