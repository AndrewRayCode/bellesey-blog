var phonecatApp = angular.module( 'app', [ 'firebase', 'ngSanitize' ] );

phonecatApp.controller('app-ctrl', function( $scope, $firebase, $sanitize ) {
    $scope.has = function() {
        console.log('arguments',arguments);
        return false;
    };

    var fireRef = new Firebase('https://dumps-and-poops.firebaseio.com/');

    //fireRef.on('child_added', function(snapshot) {
        //console.log( 'I guess we go tshit', snapshot.val() );
    //});

    $scope.addPerson = function() {

        // AngularFire $add method
        $scope.posts.$add($scope.newPerson);

        //or add a new person manually
        fireRef.update({name: 'Alex', age: 35});
    
        $scope.newPerson = '';
    };

    // Bind the todos to the firebase provider.
    $scope.posts = $firebase( fireRef );

});

phonecatApp.directive('prettydate', function( $timeout, $filter ) {
    return {
        link: function( $scope, element, attrs ) {
            $timeout( function() {
                var date = new Date( attrs.prettydate ),
                    diff = ( new Date().getTime() - date.getTime() ) / 1000,
                    dayDiff = Math.floor(diff / 86400);

                // figure out if we should add s to "n thing(s) ago"
                var s = function( val, wrd, one ) {
                    return (val === 1 && one) ||
                        (val + ' ' + wrd + (val === 1 ? '' : 's') + ' ago');
                };

                if ( isNaN(dayDiff) || dayDiff < 0 ) {
                    return;
                }

                var output = dayDiff === 0 && (
                    diff < 60 && 'just now' ||
                    diff < 3600 && s(Math.floor( diff / 60 ), 'minute') ||
                    diff < 86400 && s(Math.floor( diff / 3600 ), 'hour')
                ) || (
                    dayDiff < 7 && s(dayDiff, 'day', 'yesterday') ||
                    dayDiff < 31 && s(Math.ceil( dayDiff / 7 ), 'week') ||
                    dayDiff < 360 && s(Math.floor( dayDiff / 30 ), 'month') ||
                    s(Math.floor( dayDiff / 360 ), 'year')
                );

                element.text( output );
                element.attr( 'title', $filter('date')( date, 'MMMM d, yyyy' ) );
            });
        }
    };
});

phonecatApp.filter('joinBy', function() {
    return function( input, delimiter ) {
        return _.pluck( input, 'name' ).join( delimiter || ', ' );
    };
});

phonecatApp.filter('fireBy', function() {
    return function( items, key, reverse ) {
        var mult = reverse ? -1 : 1;
        items.sort(function( a, b ) {
            return new Date( a[ key ] ) > new Date( b[ key ] ) ? mult : -mult;
        });

        return items;
    };

});

phonecatApp.filter('filterByKey', function() {
    return function( input, key ) {
        return _.filter( input, function( item ) {
            return !!item[ key ];
        });
    };
});

phonecatApp.run(function() {
    if( $('body').fancybox ) {
        $('[fancybox]').fancybox();
    }

    $('.loading').hide();
});
