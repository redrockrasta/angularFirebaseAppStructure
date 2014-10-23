
/**
 * Chat controller for basic keynote like presentation.
 * Used in Angular.js Advanced Design Patterns and Best Practices
 *
 * Use of Class.js
 *
 * @author tommy.rochette[followed by the usual sign]universalmind.com
 */

(function () {

    var ChatController = BaseController.extend({

        _chatModel: null
        , _client : []
        , _user : {
                    "uid" : "1a0dd84e-0269-42d8-bdf4-6d4c4286d1k7"
                    , "created_at": 1412928557628
                    , "email": "johnpaolo@gmail.com"
                    , "ip_address": "192.168.1.1"
                    , "name": "Operator Marinas"
                    , "updated_at": 1412928557628
                    , "user_type": "operator"
        }

        /**
         * Initialize Chat Controller
         * @param $scope, current controller scope
         */
        , init: function ($scope, $params, $location, $socketService, $chatModel)
        {
            this._super($scope);
            this._chatModel = $chatModel;
            this.$scope.name = "John Turingan";
            this._client = this._chatModel.getClients();
            this.$scope.clientList = this._client;

            //@todo - User must be dynamic. For demo purpose only
            //$dataRepository.setUser(this._user);

            /*$socketService.register('onNewClient', function (snapshot){console.log(snapshot.val())})
            $socketService.auth("Frjn43RcE9DXfEAjCQN6uHE0DPT5GvsjsKHAmYnP", function (ret) {})*/
        }

        /**
         * @override
         */
        , defineScope:function(){
            console.log("defineScope")
            this.$scope.add = this._add.bind(this)
        }

        , _add : function () {

            this.$scope.clientList.push({
                "uid" : "1a0dd84e-0269-42d8-bdf4-6d4c4286d1k7"
                , "created_at": 1412928557628
                , "email": "johnpaolo@gmail.com"
                , "ip_address": "192.168.1.1"
                , "name": "Operator Marinas"
                , "updated_at": 1412928557628
                , "user_type": "operator"
            })
        }

    });

    ns('Controller').ChatController = ChatController;
    ns('Controller').ChatController.$inject = ['$scope', '$routeParams', '$location','SocketService', 'ChatModel'];

}());


