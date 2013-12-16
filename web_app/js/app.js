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

.controller('ListCtrl', ['$scope', '$filter', 'User', function($scope, $filter, User) {
    $scope.usernames = [];

    $scope.users = User.query(function() {
        angular.forEach($scope.users, function(value, key){
          this.push(value.username);
        }, $scope.usernames);
    });
    
    $scope.addDouche = function() {
        //find Users by username, if not exist flash a msg. If exist call API to update and .get the item and update the points and last_thing
      var found = $filter('filter')($scope.users, {username: $scope.new_douche.username});
      if (found.length == 1) {

          found[0].points = parseInt(found[0].points) + 10;
          found[0].last_thing = $scope.new_douche.the_thing;

          /*var douche_user = new User({userid, type, the thig}) 
          douche_user.$save();*/

        console.log(found);
      } else {
        //Flash alert
      }    

    };
}]) 
.controller('CreateCtrl', function($scope, $location, $timeout) {

  //$scope.asda.get
  /*$scope.save = function() {
    Projects.add($scope.project, function() {
      $timeout(function() { $location.path('/'); });
    });
  };*/
}) 
.controller('detailViewCtrl',
  function($scope, $location, $routeParams) {
 
    /*var projectUrl = fbURL + $routeParams.projectId;
    var bindToProject = angularFire(projectUrl, $scope, 'remote', {});
 
    bindToProject.then(function() {
 
      $scope.project = angular.copy($scope.remote);
      $scope.project.$id = $routeParams.projectId;
 
      $scope.isClean = function() {
        return angular.equals($scope.remote, $scope.project);
      }
 
      $scope.destroy = function() {
        $scope.remote = null;
        $location.path('/');
      };
 
      $scope.save = function() {
        $scope.remote = angular.copy($scope.project);
        $location.path('/');
      };*/
    //});
});

/*SERVICES*/
var douchejarServices = angular.module('douchejarServices', ['ngResource']);
 
douchejarServices.factory('User', ['$resource',
  function($resource){
    return $resource('http://api.douchebag.dev/douchejar/', {}, {
      query: {method:'GET', params:{}, isArray:true},

    });
}]);