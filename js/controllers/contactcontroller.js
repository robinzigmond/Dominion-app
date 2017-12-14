angular.module("RouteControllerContact", [])
	.controller("ContactController", function($scope) {
		// set default values for input fields (they start blank unsurprisingly):
		$scope.name = "";
		$scope.email="";
		$scope.feedback="";
		// make sure that error messages are not displayed until the user actually submits an invalid form:
		$scope.nameMissing = false; 
		$scope.invalidEmail = false;
		$scope.noFeedback = false;

		// function called when form is submitted: 
		$scope.submitForm = function() {
			/* use Angular's native form valudation to check if each individual input is OK.
			(These are used to display specific error messages via ng-show directives in the template.) */
			$scope.nameMissing = !($scope.contactForm.name.$valid);
			$scope.invalidEmail = !($scope.contactForm.email.$valid);
			$scope.noFeedback = !($scope.contactForm.feedback.$valid);	
			if ($scope.contactForm.$valid) {
				// if form is valid, display simple confirmation message, and clear form:
				alert("Thank you for your comments!");
				$scope.name = "";
				$scope.email="";
				$scope.feedback="";
				$scope.contactForm.$setPristine(); // needed to avoid the form fields turning red immediately after submission
			}		
		}
	});