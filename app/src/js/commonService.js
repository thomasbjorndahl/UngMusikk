(function () {
    'use strict';

    angular.module('um')
        .service('commonService', commonService);

    function commonService() {
        return {
            success: success,
            failure: failure
        }

        function success(response) {
            return response.data;
        }

        function failure(response) {
            return response;
        }
    }
})();