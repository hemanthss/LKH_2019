(function () {
    'use strict';
    angular
        .module('recruitApp')
        .controller('createController', createController);
        createController.$inject = ['$location', 'AuthenticationService', '$scope', '$state'];
    function createController($location, AuthenticationService, $scope, $state) 
    {
        $scope.isSelect=false;
        var finaldata={};
        var timestamp="";
        $scope.dataType = ['text', 'Number', 'Select', 'Date'];
        $scope.columns = [{"colId": "col1", "name":"", "type":"", "option":""}];
        $scope.addNewColumn = function() {
        var newItemNo = $scope.columns.length+1;
        $scope.columns.push({"colId":"col"+newItemNo});
        };
        $scope.removeColumn = function(index) {
        // remove the row specified in index
        $scope.columns.splice( index, 1);
        // if no rows left in the array create a blank array
        if ( $scope.columns.length() === 0 || $scope.columns.length() == null){
            alert('no rec');
            $scope.columns.push = [{"colId":"col1"}];
        }
        // if($scope.columns.type == "select")
        // {
        //     $scope.isSelect = true;
        // }      
        };   
        $scope.createForm = createFormUser;
        // console.log($scope.formdata.toString());
        timestamp = new Date().getTime();
        finaldata.formdata = $scope.columns;
        finaldata.formid = timestamp;

        function createFormUser() 
        {
            console.log($scope.columns);
            console.log(timestamp);
            console.log("Controller:");
            console.log(finaldata);
            AuthenticationService.formCreation(finaldata, function (response) {
                if (response.success) {
                    $scope.successMsg = response.data.message;
                    $state.go('create');
                    alert(successMsg);
                } else {
                    //FlashService.Error(response.message);s
                    $scope.errorMsg = response.data.message;
                    alert($scope.errorMsg);
                }
            });
        };
        
        
    }
  
  })();