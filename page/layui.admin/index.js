var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
        .when('/page1', {
            templateUrl: './page1.html',
            controller: 'page1Ctrl'
        })
        .when('/page2', {
            templateUrl: './page2.html',
            controller: 'page2Ctrl'
        })
        .otherwise({
            redirectTo: '/page1'
        });
});
app.controller('page1Ctrl', function($http, $rootScope) {
    $rootScope.currentPage = 1;
    console.log('page1...');
});
app.controller('page2Ctrl', function($http, $rootScope) {
    $rootScope.currentPage = 2;
    console.log('page2...');
});