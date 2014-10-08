describe("ChatController", function () {
    var $rootScope,
        $scope,
        controller;

    beforeEach(function () {
        angular.mock.module('chatmodule');
        inject(function ($location, $rootScope, $controller) {
                    $location = $location;
                    $scope = $rootScope.$new();
                    controller = $controller('Codeninja.SwayChat.Controller.ChatController', {'$scope': $scope});
                });
    });

    describe('Initialization', function() {
        it("should instantiate controller", function () {
            expect($scope.name).toEqual("ChatController");
        });
    });
});
