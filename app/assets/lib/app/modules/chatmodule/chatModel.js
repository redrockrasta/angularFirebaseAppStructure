/**
 * SocketService - for realtime backend API
 *
 *  Should Implement following method:
 *  - setToken(token)
 *  - connect(url)
 *
 */
(function (_) {

    var ChatModel = Class.extend({

        _dataRepo : null
        , _user : {
                    "uid" : "1a0dd84e-0269-42d8-bdf4-6d4c4286d1k7"
                    , "created_at": 1412928557628
                    , "email": "johnpaolo@gmail.com"
                    , "ip_address": "192.168.1.1"
                    , "name": "Operator Marinas"
                    , "updated_at": 1412928557628
                    , "user_type": "client"
        }

        , init : function ($location, $route, DataRepository) {
            this._dataRepo = DataRepository;
        }

        , getClients : function () {
            var client = [];
            client.push(this._user);
            return client;
            //return this._dataRepo.getClients();
        }

    });

    angular.module('chatmodule.ChatModel',[])
           .service('ChatModel', ['$location','$route', 'DataRepository', ChatModel]);

}(_));
