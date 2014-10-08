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

        , test : function () {
            return "x";
        }

        , connect : function (url) {
            var self = this;

            if (_.isEmpty(this._fbRef)) {
                this._fbRef = new Firebase(url);
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
         * @return UserModel
        */
        $get:['$firebase', function($firebase){
            this.instance._firebase = $firebase;
            return this.instance;
        }]
    })

    angular.module('SwayChat.SocketService',['firebase'])
           .provider('SocketService',SocketServiceProvider);

}(_));
