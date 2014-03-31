/* global phonecatApp:true */
phonecatApp.controller('admin', function( $scope, $firebase, $firebaseSimpleLogin ) {

    var fireRef = new Firebase('https://bellesey-blog.firebaseio.com');

    $scope.auth = $firebaseSimpleLogin( fireRef );

    console.log($scope.auth);

    $scope.login = function() {
        $scope.auth.$login('github');
    };

    $scope.tags = [{
        id: 1,
        name: 'Belle'
    }, {
        id: 2,
        name: 'Zues'
    }, {
        id: 3,
        name: 'Poop'
    }];

    $scope.create = function( post ) {
        
        var required = [ 'title', 'body', 'tags' ];

        if( _.intersection( _.keys( post ), required ).length !== required.length ) {
            alert('Please enter all values!');
            return;
        }

        _.extend( post, {
            creationdate: new Date()
        });
        $scope.posts.$add( post );
    };

    $scope.remove = function( post ) {
        post.deleted = true;
        $scope.posts.$save( post.$id );
    };

    $scope.posts = $firebase( fireRef );

});

phonecatApp.directive('sselectize', function( $timeout ) {
    return {
        restrict: 'A',
        require: '?ngModel',
        // responsible for registering DOM listeners as well as updating the DOM
        link: function( $scope, element, attrs, ngModel ) {
            $timeout(function() {
                $(element).selectize($scope.$eval(attrs.selectize)).on('change', function(event) {
                    console.log('hey', element.value);
                    //$scope.$apply(applyChange);
                    ngModel.$setViewValue(element.value);
                });
            });
        }
    };
});
