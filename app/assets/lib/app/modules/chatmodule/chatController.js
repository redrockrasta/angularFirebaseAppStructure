
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
        _name : null,
        _user : {
                    "uid" : "1a0dd84e-0269-42d8-bdf4-6d4c4286d1k7"
                    , "created_at": 1412928557628
                    , "email": "johnpaolo@gmail.com"
                    , "ip_address": "192.168.1.1"
                    , "name": "Operator Marinas"
                    , "updated_at": 1412928557628
                    , "user_type": "operator"
        },

        /**
         * Initialize Chat Controller
         * @param $scope, current controller scope
         */
        init: function ($scope, $socketService, $chatModel, $dataRepository)
        {
            this._super($scope);
            //@todo - User must be dynamic. For demo purpose only
            $dataRepository.setUser(this._user);
        },

        /**
         * @override
         */
        defineScope:function(){
            //Define binding of controller methods
            //this.$scope.methodName = this.methodName.bind(this);
        },

    });

    ns('Controller').ChatController = ChatController;
    ns('Controller').ChatController.$inject = ['$scope', 'SocketService', 'ChatModel', 'DataRepository'];

}());


