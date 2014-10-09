/**
 * SocketService - for realtime backend API
 *
 *  Should Implement following method:
 *  - setToken(token)
 *  - connect(url)
 *
 */
(function (_) {

    var ChatModel = EventDispatcher.extend({


    });

    var ChatModelProvider = Class.extend({


        instance : new ChatModel(),

        /**
         * Initialize and configure ActivtyModel
         * @return FireBaseService
        */
        $get:['$location','$route', function($location, $route){

            return this.instance;
        }]
    })

    angular.module('SwayChat.ChatModel',[])
           .provider('ChatModel',ChatModelProvider);

}(_));
