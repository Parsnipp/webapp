//angular modules
const webapp = angular.module('webapp', ['ngRoute'])
var picture = false
var profileJSON = {
    "emailAddresses": [
        {
            "email": "captain.kirk@starship.enterprise",
            "isPrimary": true
        },
        {
            "email": "james.kirk@starship.enterprise",
            "isPrimary": false
        }
    ],
    "forename": "James",
    "photo": {
        "fileId": "f2a4df4",
        "mimeType": "image/png"
    },
    "surname": "Kirk",
    "title": "Captain of the Starship Enterprise"
}
//routing table
webapp.config( ['$routeProvider', function($routeProvider) {
  $routeProvider
  	.when('/home', {
  		templateUrl: 'templates/profile.html',
  		controller: 'profileController'
  	})
    .when('/home2', {
      templateUrl: 'templates/profile-image.html',
      controller: 'profileImageController'
    })
    .when('/email', {
      templateUrl: 'templates/emailLogins.html',
      controller: 'emailController'
    })
  	.otherwise ({ //if desired page is not found
  		redirectTo: '/home'
  	})
 }])

webapp.controller('profileController', function($scope, $location) {
  $scope.initials = profileJSON.forename[0] + profileJSON.surname[0]
  $scope.forename = profileJSON.forename
  $scope.surname = profileJSON.surname
  $scope.position = profileJSON.title

  $scope.profileForename = profileJSON.forename
  $scope.profileSurname = profileJSON.surname
  $scope.profilePosition = profileJSON.title

  $scope.submit = function() {
    profileJSON.forename = $scope.profileForename
    profileJSON.surname = $scope.profileSurname
    profileJSON.position = $scope.profilePosition
    $scope.initials = profileJSON.forename[0] + profileJSON.surname[0]
    $scope.forename = profileJSON.forename
    $scope.surname = profileJSON.surname
    $scope.position = profileJSON.title
  }

  $scope.addImage = function() {
    $location.path('/home2')
  }
})

webapp.controller('profileImageController', function($scope, $location) {
  $scope.initials = profileJSON.forename[0] + profileJSON.surname[0]
  $scope.forename = profileJSON.forename
  $scope.surname = profileJSON.surname
  $scope.position = profileJSON.title

  $scope.profileForename = profileJSON.forename
  $scope.profileSurname = profileJSON.surname
  $scope.profilePosition = profileJSON.title

  $scope.submit = function() {
    profileJSON.forename = $scope.profileForename
    profileJSON.surname = $scope.profileSurname
    profileJSON.position = $scope.profilePosition
    $scope.initials = profileJSON.forename[0] + profileJSON.surname[0]
    $scope.forename = profileJSON.forename
    $scope.surname = profileJSON.surname
    $scope.position = profileJSON.title
  }

  $scope.removeImage = function() {
    $location.path('/home')
  }
})

webapp.controller('emailController', function($scope) {
  $scope.initials = profileJSON.forename[0] + profileJSON.surname[0]
  $scope.forename = profileJSON.forename
  $scope.surname = profileJSON.surname
  $scope.position = profileJSON.title

  $scope.emails = profileJSON.emailAddresses

  $scope.addEmail = function() {
    var atpos = $scope.newEmail.indexOf('@')
    var dotpos = $scope.newEmail.lastIndexOf('.')
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=$scope.newEmail.length) {
      alert('Please enter a valid email address.')
    } else {
      profileJSON['emailAddresses'].push({"email": $scope.newEmail, "isPrimary": false})
      $scope.emails = profileJSON.emailAddresses
      $scope.newEmail = null
    }
  }

  $scope.remove = function(emailRm) {
    console.log("email: " + emailRm.email)
    for (var i = 0; i < profileJSON.emailAddresses.length; i++) {
      if (profileJSON.emailAddresses[i].email === emailRm.email){
        profileJSON.emailAddresses.splice(i, 1)
        $scope.emails = profileJSON.emailAddresses
        break
      }
    }
  }
})