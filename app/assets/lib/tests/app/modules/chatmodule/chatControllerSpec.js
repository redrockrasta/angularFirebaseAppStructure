describe("ChatController", function () {
    var ctrl, scope, service;
    beforeEach(function () {
        angular.mock.module('SwayChat.SocketService')
        angular.mock.module('chatmodule')
    });

    beforeEach(inject(function($controller, $rootScope, SocketService) {

      $scope = $rootScope.$new();
      service = SocketService;
      //Create the controller with the new scope
      ctrl = $controller('Codeninja.SwayChat.Controller.ChatController', {$scope: $scope, $SocketService: service});
    }));

    describe('Initialization', function() {
        it("should instantiate controller", function () {
            //expect($scope.name).toEqual("ChatController");
        });
    });
});
