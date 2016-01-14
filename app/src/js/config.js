(function () {
    'use strict';
    angular.module('um')
        .config(['$routeProvider', config]);

    

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'firstPage.html',
                controller: 'newsController'

            })
            .when('/KongsbergStorband', {
                templateUrl: 'KongsbergStorband.html',
                controller: 'ksController'
            })
            .when('/Kontakt', {
                templateUrl: 'Contact.html'
            })
            .when('/Om', {
                templateUrl: 'About.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

})();