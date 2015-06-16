// Declare the main module
var myApp = angular.module('myApp', [
    'ui.router',
    'ngResource'
]);

// Initialize the main module
myApp.run(['$rootScope', '$state', function ($rootScope, $state) {

    'use strict';

    // Expose $state to scope for convenience
    $rootScope.$state = $state;

}]);

// Configure the main module
myApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

    'use strict';

    // Enable CORS
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $urlRouterProvider.otherwise('/state1');

    $stateProvider
        .state('state1', {
            url: '/state1',
            templateUrl: 'page1.html',
            controller: 'Page1Ctrl'
        })
        .state('state2', {
            url: '/state2',
            templateUrl: 'page2.html',
            controller: 'Page2Ctrl',
            resolve: {
                gistsData: function (basicService) {

                    var dat= basicService.exciteText()

                    console.log(dat);

                    return dat;
                }
            }
        });

}]);

myApp.controller('Page1Ctrl', ['$scope', function ($scope) {

    $scope.message = '';

}]);

myApp.controller('Page2Ctrl', ['$scope', 'gistsData', function ($scope, gistsData) {

    $scope.gists = gistsData;

}]);


myApp.factory('basicService', function(){
    return {
        exciteText: function() {
            return [{name:'john'},{name:'jake'}];
        }
    };
});


/**
 * Example resource 1
 */
myApp.factory('Gists', ['$resource', function ($resource) {

    'use strict';

    // Github REST API
    return ['fdsfs',
    'fds'];
    //return $resource('https://api.github.com/gists');
}]);