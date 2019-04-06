(function () {
    'use strict';
    angular
        .module('recruitApp')
        .controller('createController', createController);
        createController.$inject = ['$location', 'AuthenticationService', '$scope', '$state'];
    function createController($location, AuthenticationService, $scope, $state) 
    {
        $scope.data_ ={
            "success": true,
            "message": [
                {
                    "colId": "col1",
                    "name": "name",
                    "type": "text",
                    "option": "",
                    "$$hashKey": "object:6"
                },
                {
                    "colId": "col2",
                    "$$hashKey": "object:9",
                    "name": "age",
                    "type": "number"
                },
                {
                    "colId": "col3",
                    "$$hashKey": "object:12",
                    "name": "Gender",
                    "type": "select",
                    "option": "male,female"
                }
            ],
            "id": "bbd9f880-57cc-11e9-bf4a-534412521c07"
        }
        for(var i=0;i<$scope.data_.message.length;i++)
        {
            if($scope.data_.message[i].type == "select")
            {
                $scope.data_.message[i].option = $scope.data_.message[i].option.split(',');
            }
        }
        console.log("mydata");
        $scope.selected="";
        console.log($scope.data_);
        $scope.myvar = "voiceInput";
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
            responsiveVoice.speak('This is the text you want to speak');
            console.log($scope.columns);
            console.log(timestamp);
            console.log("Controller:");
            console.log(finaldata);
            AuthenticationService.formCreation(finaldata, function (response) {
                if (response.success) {
                    $scope.successMsg = response.data.message;
                    $scope.formurl = response.data.url;
                    alert($scope.successMsg);
                    alert($scope.formurl);
                    $state.go('home');
                    //location.href=url;
                    timestamp = 0;
                } else {
                    //FlashService.Error(response.message);s
                    $scope.errorMsg = response.data.message;
                    alert($scope.errorMsg);
                }
            });
        };
        
        
    }
  
  })();