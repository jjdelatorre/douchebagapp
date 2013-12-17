angular.module('douchejarApp', ['ngRoute', 'douchejarServices', 'ui.bootstrap'])
 
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      controller:'ListCtrl',
      templateUrl:'list.html'
    })
    .when('/list/:userId', {
      controller:'detailViewCtrl',
      templateUrl:'detail.html'
    })
    .when('/new/user/', {
      controller:'CreateUserCtrl',
      templateUrl:'detail.html'
    })
    .otherwise({
      redirectTo:'/'
    });
})

.controller('ListCtrl', ['$rootScope', '$scope', '$filter', 'UserResource', function($rootScope, $scope, $filter, UserResource) {
    $scope.usernames = [];

    var points = 0;
    $scope.users = UserResource.query(function() {
        angular.forEach($scope.users, function(value, key){
          this.push(value.username);
          points += parseInt(value.points);
        }, $scope.usernames);

        $rootScope.total_points = points;

    });
    
    $scope.addDouche = function() {
        if($scope.new_douche_form.$error.required) {
            alert('All fields required');
            return;
        }

        var found = $filter('filter')($scope.users, {username: $scope.new_douche.username});
        if (found.length == 1) {
            var selected_user = found[0];
            var douche_user = new UserResource({
                                                user_id: selected_user.id, 
                                                the_thing: $scope.new_douche.the_thing, 
                                                douche_type: $scope.new_douche.type
                                            }); 
            douche_user.$save({}, 
                function success() {
                    selected_user.last_thing = douche_user.last_thing;
                    selected_user.points = douche_user.points;

                    $('#new_douche').modal('hide');
                    $scope.new_douche.the_thing = null;
                    $scope.new_douche.username = null;
                    
                    $rootScope.total_points += parseInt(1 * douchejar_multiplier);
                }, function err(error) {
                    alert('Invalid data provided / Server Error. StatusCode :: ' + error.status);
                });
        } else {
            alert('Invalid username !');
        }    

    };
}]) 
.controller('CreateCtrl', function($scope, $location, $timeout) {

}) 
.controller('detailViewCtrl',
  function($scope, $location, $routeParams) {
 
});

/*SERVICES*/
var douchejarServices = angular.module('douchejarServices', ['ngResource']);
 
douchejarServices.factory('UserResource', ['$resource',
  function($resource){
    return $resource('http://api.douchebag.dev/douchejar/', {}, {
      query: {method:'GET', params:{}, isArray:true},

    });
}]);

/*GLOBAL SETTINGS*/
var douchejar_multiplier = 1;