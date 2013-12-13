angular.module('douchejarApp', ['ngRoute', 'douchejarServices'])
 
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'ListCtrl',
      templateUrl:'list.html'
    })
    .when('/list/:userId', {
      controller:'EditCtrl',
      templateUrl:'detail.html'
    })
    .when('/new/user/', {
      controller:'CreateCtrl',
      templateUrl:'detail.html'
    })
    .otherwise({
      redirectTo:'/'
    });
})
 
.controller('ListCtrl', function($scope, User) {
  /*$scope.users = [
      {'name': 'Nexus S',
       'last_douche': 'Fast just got faster with Nexus S.',
       'points': 5},
      {'name': 'Motorola XOOM™ with Wi-Fi',
       'last_douche': 'The Next, Next Generation tablet.',
       'points': 10},
      {'name': 'MOTOROLA XOOM™',
       'last_douche': 'The Next, Next Generation tablet.',
      'points': 2}
    ];*/

    $scope.users = User.query();
}) 
.controller('CreateCtrl', function($scope, $location, $timeout) {
  /*$scope.save = function() {
    Projects.add($scope.project, function() {
      $timeout(function() { $location.path('/'); });
    });
  };*/
}) 
.controller('EditCtrl',
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
      query: {method:'GET', params:{}, isArray:true}
    });
}]);