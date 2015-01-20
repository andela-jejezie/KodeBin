angular.module('kodeBin')
  .controller('SettingCtrl',function ($scope, $rootScope, filterFilter, $timeout, $http, $firebase, $http) {
    $scope.date = new Date();
    var expertiseArea;
    var rootRef = new Firebase('https://codebin.firebaseio.com/');
    var expertiseRef = rootRef.child('expertise');
    var details = [];


    $scope.getExpertise = function(){
      expertiseRef.on('value', function(snap){
        console.log(snap.val(), 'got here');
        $timeout(function() {
          $scope.expertise = snap.val();
        _.each(snap.val(), function(data){
          console.log(data);

          details.push(data);
        });
        $scope.alldetails = details;
        console.log($scope.alldetails);
        }, 100);
      });
        $scope.user = {
          alldetails: ['HTML']
        };

        $scope.checkAll = function(){
          $scope.user.alldetails = angular.copy($scope.alldetails);
        };

        $scope.uncheckAll = function(){
          $scope.user.alldetails = [];
        };


    };

});