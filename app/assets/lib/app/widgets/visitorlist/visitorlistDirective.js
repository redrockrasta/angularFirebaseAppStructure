
(function (_) {

    /**
     * VisitorList Angular JS Directive
     * @param {[type]} $window document window
     */
    var VisitorList = function ($window) {

        /**
         * controller controller method to handle directive logic
         * @param  {object} $scope   directive scope
         * @param  {[type]} $element directive element
         */
        var controller = ['$scope', '$element', function ($scope, $element)
        {

        }];

        /**
         * linker link method to handle directive dom
         * @param  {object} $scope  scope
         * @param  {object} element element itself
         * @param  {object} attrs   attribute
         */
        var linker = function (scope, element, attrs)
        {
            //scope.clientList = scope.$parent.clientList;
            element.css('min-height', $window.innerHeight)
        }


        /**
         * _visitorList Directive Object
         * @type {Object}
         */
        var _visitorList = {
            restrict : "EA"
            , replace : true
            , scope : {
                clientList : "="
            }
            , controller : controller
            , templateUrl : "/assets/template/widgets/visitorlist/visitorList.html"
            , link: linker
        };

        return _visitorList;
    }

    angular.module('SwayChat.Directives',['ng' ,'SwayChat.SocketService'])
           .directive('visitorList', ['$window', VisitorList])
})(_);
