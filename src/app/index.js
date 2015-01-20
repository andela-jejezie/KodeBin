
angular.module('kodeBin', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ngMaterial', 'firebase', 'checklist-model'])
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('setting', {
        url: '/setting',
        templateUrl: 'app/main/setting/setting.html',
        controller: 'SettingCtrl'
      });
    $urlRouterProvider.otherwise('/');
  });
