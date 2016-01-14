(function () {
    'use strict';

    angular.module('um')
        .controller('headController', headController);

    headController.$inject = [];

    function headController() {
        var vm = this;
        vm.pageTitle = 'Ung Musikk';
    }

})();