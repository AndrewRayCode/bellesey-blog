/* global phonecatApp:true */
phonecatApp.controller('Controller', function( $scope, $firebase ) {

    $scope.master = {};

    $scope.update = function(user) {
        $scope.master = angular.copy(user);
    };

    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };

});
