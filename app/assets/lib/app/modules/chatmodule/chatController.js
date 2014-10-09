
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

        /**
         * Initialize Chat Controller
         * @param $scope, current controller scope
         */
        init: function ($scope, $SocketService)
        {
            this._super($scope)
            this._name = "test";
            $scope.name = "ChatController";
        }

    });
    inamespace('Controller').ChatController = ChatController;
    inamespace('Controller').ChatController.$inject = ['$scope', 'SocketService', 'ChatModel'];

}());


