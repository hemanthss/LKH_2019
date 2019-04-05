(function () {
    'use strict';

    angular
        .module('recruitApp')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$state', 'AuthenticationService', '$scope', 'angularFileUpload'];
    function ProfileController($state, AuthenticationService, $scope, FileUploader) {
        $scope.uploader = new FileUploader
    }

})();