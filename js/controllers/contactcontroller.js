angular.module("RouteControllerContact", [])
	.controller("ContactController", function($scope) {
		$scope.submitForm = function() {
			if ($scope.contactForm.$valid) {
				alert("Thank you for your feedback!");
				$scope.name = "";
				$scope.email="";
				$scope.feedback="";
			}
			else {
				alert("Invalid input - please try again.")
			}
		}
	});