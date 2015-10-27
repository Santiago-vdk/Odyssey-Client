var app = angular.module('odyssey',[]);


app.controller('Hello', function($scope, $http) {
  $http.get('http://localhost:9080/OdysseyCloud/api/v1/users/1').
        success(function(data) {
            $scope.greeting = data;
        });
});