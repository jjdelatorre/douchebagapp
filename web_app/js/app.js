angular.module('douchejarApp', ['ngRoute', 'douchejarServices'])
 
.config(function($routeProvider, $httpProvider) {
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
 
.controller('ListCtrl', ['$scope', 'User', function($scope, User) {
    $scope.users = User.query();
}]) 
.controller('CreateCtrl', function($scope, $location, $timeout) {

  //$scope.asda.get
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

//@TODO :: angular.module('YourApp', []).config(function($httpProvider) { $httpProvider.defaults.useXDomain = true; delete $httpProvider.defaults.headers.common['X-Requested-With'];}) 
//try wiht a $httpRequest..no Restful

/*SERVICES*/
var douchejarServices = angular.module('douchejarServices', ['ngResource']);
 
douchejarServices.factory('User', ['$resource',
  function($resource){
    return $resource('http://api.douchebag.dev/douchejar/', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
}]);