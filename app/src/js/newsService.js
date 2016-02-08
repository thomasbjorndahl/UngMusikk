(function () {
    'use strict';

    angular.module('um')
        .service('newsService', newsService);

    newsService.$inject = ['$http', 'commonService'];

    function newsService($http, commonService) {
        return {
            getNews: getNews
        }

        function getNews() {
            return $http.get('data/news.json')
                .then(commonService.success, commonService.failure);
        }
    }


})();