'use strict';
(function () {

    angular.module('VendorService',['ng'])
           .factory('FirebaseDep', [
                '$window',
                function ($window) {
                    return $window.Firebase;
                }
            ]);

})();
