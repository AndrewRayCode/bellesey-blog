/* global phonecatApp:true */
phonecatApp.controller('admin', function( $scope, $firebase, $firebaseSimpleLogin ) {

    var fireRef = new Firebase('https://bellesey-blog.firebaseio.com');

    $scope.auth = $firebaseSimpleLogin( fireRef );

    $scope.login = function() {
        $scope.auth.$login('github');
    };

    $scope.tags = [{
        name: 'Belle'
    }, {
        name: 'Zeus'
    }, {
        name: 'Poop',
    }, {
        name: 'Andy'
    }];

    $scope.create = function( post ) {
        
        console.log( 'we received ', post );

        var required = [ 'title', 'body', 'tags' ];

        if( _.intersection( _.keys( post ), required ).length !== required.length ) {
            alert('Please enter all values!');
            return;
        }

        _.extend( post, {
            creationdate: new Date(),
            modificationdate: new Date()
        });
        $scope.posts.$add( post );
    };

    $scope.remove = function( post ) {
        post.deleted = true;
        $scope.posts.$save( post.$id );
    };

    $scope.destroy = function( post ) {
        $scope.posts.$remove( post.$id );
    };

    $scope.posts = $firebase( fireRef );

});

phonecatApp.directive('sselectize', function( $timeout ) {
    return {
        restrict: 'A',
        require: '?ngModel',
        // responsible for registering DOM listeners as well as updating the DOM
        link: function( $scope, element, attrs, controller ) {
            $timeout(function() {

                console.log('attrs:',$scope.$eval(attrs.selectize));
                $(element).selectize($scope.$eval(attrs.selectize)).on('change', function( event ) {

                    console.log('meow', $scope.tags.filter(function( tag ) {
                            console.log('comparing ',element.val(), tag.id , element.val().indexOf( tag.id ));
                            return element.val().indexOf( tag.id ) > -1;
                        })
                    );

                    //controller.$setViewValue( $scope.tags.filter(function( tag ) {
                        //return element.val().indexOf( tag.id ) > -1;
                    //}));

                });

            });
        }
    };
});

phonecatApp.directive('wysihtml5', function( $timeout ) {
    return {
        restrict: 'A',
        require: '?ngModel',
        // responsible for registering DOM listeners as well as updating the DOM
        link: function( $scope, element, attrs, controller ) {
            var editor = new wysihtml5.Editor( element.attr('id'), {
                parserRules: wysihtml5ParserRules
            });

            editor.on( 'change', function() {
                controller.$setViewValue( editor.getValue() );
            });
        }
    };
});
