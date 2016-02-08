(function () {
    'use strict';

    angular.module('um')
        .controller('newsController', newsController);

    newsController.$inject = ['newsService'];

    function newsController(newsService) {
        var vm = this;
        vm.news = [];
        vm.init = init;


        function init() {
            newsService.getNews()
                .then(function (data) {
                    vm.news = data;
                })
        }
    }

})();