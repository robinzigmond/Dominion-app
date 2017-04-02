angular.module("RouteControllerContact", [])
	.controller("ContactController", function($scope) {
		$scope.name = "";
		$scope.email="";
		$scope.feedback="";
		$scope.nameMissing = false; 
		$scope.invalidEmail = false;
		$scope.noFeedback = false;
		$scope.submitForm = function() {
			console.log($scope.contactForm.name);
			console.log($scope.contactForm.email);
			$scope.nameMissing = !($scope.contactForm.name.$valid);
			$scope.invalidEmail = !($scope.contactForm.email.$valid);
			$scope.noFeedback = !($scope.contactForm.feedback.$valid);	
			if ($scope.contactForm.$valid) {
				alert("Thank you for your comments!");
				$scope.name = "";
				$scope.email="";
				$scope.feedback="";
			}		
		}
	});