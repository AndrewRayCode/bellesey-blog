var phonecatApp = angular.module( 'app', [ 'firebase' ] );

phonecatApp.controller('app-ctrl', function( $scope, $firebase ) {

    var fireRef = new Firebase('https://bellesey-blog.firebaseio.com');

    fireRef.on('child_added', function(snapshot) {
        console.log( 'I guess we go tshit', snapshot.val() );
    });

    $scope.addPerson = function() {

        // AngularFire $add method
        $scope.posts.$add($scope.newPerson);

        //or add a new person manually
        fireRef.update({name: 'Alex', age: 35});
    
        $scope.newPerson = '';
    };

    // Bind the todos to the firebase provider.
    $scope.posts = $firebase( fireRef );

    //$scope.posts.$add({
        //title: 'This is a test post!',
        //body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat vestibulum magna quis scelerisque. Praesent ut accumsan lectus, sit amet convallis nunc. Vestibulum aliquam nec justo a porta. Integer nec fermentum neque. Nullam sit amet turpis vel ante scelerisque condimentum in ut sapien. Fusce adipiscing leo elit, a venenatis sem tempor sed. Fusce sagittis augue ac tristique egestas. Phasellus dictum tincidunt urna id sagittis. Suspendisse rutrum arcu vel mollis lacinia. Ut in augue lectus. Integer gravida et odio a pulvinar. Cras est leo, pretium a auctor at, euismod ornare risus. Phasellus quis condimentum mauris, sit amet gravida nisi.'
    //});

});
