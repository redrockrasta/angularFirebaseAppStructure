
(function (_) {

    angular.element(document).ready(function() {

        'use strict';
        var module = 'chatmodule';
        var namespace = 'Codeninja.SwayChat';

        //@todo module must be dynamic
        var moduleConfig = inamespace(namespace + '.Config.Modules')[module];


        angular.module(moduleConfig.name, moduleConfig.dependencies)
            .config(['$routeProvider', function($routeProvider) {


                /* Load Routes */
                var routes =  inamespace('Codeninja.SwayChat.Route')[module];

                _.each(routes, function (route) {
                    $routeProvider.when(route.path, {templateUrl : route.templateUrl, controller : route.controller});
                });

                $routeProvider.otherwise({redirectTo: moduleConfig.defaultroute});
                window.routeProvider = $routeProvider;
                window.startHash = window.location.hash.substring(1);
            }])

        //@todo - module should be dynamic
        angular.bootstrap(document, [module]);

    });

}(_));

