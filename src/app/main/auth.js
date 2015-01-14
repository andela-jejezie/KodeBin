angular.module('kodeBin')
  .directive('header', function() {
    return {
      restrict: 'E',
      controller: ['$rootScope', '$scope', '$firebase', '$cookies',
       function($rootScope, $scope, $firebase, $cookies) {
        var rootRef = new Firebase('https://codebin.firebaseio.com/');
        var usersRef = rootRef.child('users');
        var welcomeRef = rootRef.child('welcome');

        // Start with no user logged in
        $rootScope.currentUser = null;

        // Upon successful login, set the user object
        // happens automatically when rememberMe is enabled
        rootRef.onAuth(function(authData) {
          if(authData) {

            // todo: this is a brute force redirect after login
            //       How can we do it within routing framework?
            // if(window.location.pathname === "/") {
            //   window.location.pathname = "/journal";
            // }

            console.log("auth: user is logged in");
            var user = buildAhhLifeUserObjectFromGoogle(authData);

            // site presence
            user.active = true;
            // user.tz = moment().format("Z");

            var userRef = usersRef.child(user.uid);
            userRef.on('value', function(snap){
              if(snap.val()) {
                userRef.child('active').set(true);
              }
              else {
                user.created = Firebase.ServerValue.TIMESTAMP;
                userRef.set(user);
                welcomeRef.child(user.uid).set(user);
              }
              // set user to inactive on disconnect
              userRef.child('active').onDisconnect().set(false);
            });

            $rootScope.currentUser = user;
            console.log($rootScope.currentUser);
          }
          else {
            // user is logged out
            console.log("auth: user is logged out");
            $rootScope.currentUser = null;
          }
        });

        $scope.login = function() {
          options = { remember: true, scope: "email" };
          rootRef.authWithOAuthRedirect("google", function(err, authData) {
            if(err) {
              console.log('error logging in', err);
            } else {
              console.log('login successful');
            }
          }, options);
        };

        $scope.logout = function() {
          rootRef.unauth();
          window.location.pathname = "/";
        };
      }]
    };
  });

function buildAhhLifeUserObjectFromGoogle(authData) {
  return {
    uid: authData.uid,
    name: authData.google.displayName,
    email: authData.google.email,
    accessToken: authData.google.accessToken,
    firstName: authData.google.cachedUserProfile.given_name,
    lastName: authData.google.cachedUserProfile.family_name,
    picture: authData.google.cachedUserProfile.picture
  };
}
