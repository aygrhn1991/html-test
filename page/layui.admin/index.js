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
        .when('/page3', {
            templateUrl: './page3.html',
            controller: 'page3Ctrl'
        })
        .when('/page4', {
            templateUrl: './page4.html',
            controller: 'page4Ctrl'
        })
        .otherwise({
            redirectTo: '/page1'
        });
});
app.run(function($rootScope, $location, $timeout) {
    $timeout(function() {
        $rootScope.menu = [
            { id: 1, name: '栏目一', select: false, pages: [{ id: 1, name: 'page1', select: false, path: '#/page1' }, { id: 2, name: 'page2', select: false, path: '#/page2' }] },
            { id: 2, name: '栏目二', select: false, pages: [{ id: 3, name: 'page3', select: false, path: '#/page3' }, { id: 4, name: 'page4', select: false, path: '#/page4' }] },
            { id: 3, name: '栏目三', select: false, pages: [{ id: 3, name: 'page3', select: false, path: '#/page3' }, { id: 4, name: 'page4', select: false, path: '#/page4' }] },
            { id: 4, name: '栏目四', select: false, pages: [{ id: 3, name: 'page3', select: false, path: '#/page3' }, { id: 4, name: 'page4', select: false, path: '#/page4' }] },
            { id: 5, name: '栏目五', select: false, pages: [{ id: 3, name: 'page3', select: false, path: '#/page3' }, { id: 4, name: 'page4', select: false, path: '#/page4' }] },
            { id: 6, name: '栏目六', select: false, pages: [{ id: 3, name: 'page3', select: false, path: '#/page3' }, { id: 4, name: 'page4', select: false, path: '#/page4' }] },
        ];
        layui.use('element', function() {
            var element = layui.element;
        });
        $rootScope.matchMenu();
    }, 10);
    $rootScope.$on('$routeChangeSuccess', function(evt, current, previous) {
        if ($rootScope.menu != null) {
            $rootScope.matchMenu();
        }
    });
    $rootScope.matchMenu = function() {
        $rootScope.menu.forEach(function(e) {
            e.select = false;
            e.pages.forEach(function(f) {
                f.select = false;
                if (f.path == '#' + $location.path()) {
                    f.select = true;
                    e.select = true;
                }
            });
        });
    };
    $rootScope.menuClick = function(e) {
        $rootScope.menu.forEach(function(f) {
            f.select = false;
        });
        e.select = true;
    };
});
app.controller('page1Ctrl', function($scope, $http, $rootScope) {
    $scope.openModal = function() {
        layer.open({
            type: 1,
            content: $('#modal'),
            shade: 0
        });
    };
    $scope.model = {
        name: null
    };
    $scope.save = function() {
        console.log($scope.model);
        console.log($scope.model.name);
    };
});
app.controller('page2Ctrl', function($http, $rootScope) {});
app.controller('page3Ctrl', function($http, $rootScope) {});
app.controller('page4Ctrl', function($http, $rootScope) {});