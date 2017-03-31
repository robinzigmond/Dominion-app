// simple controller for navbar collapse in ui-bootstrap, largely taken from documentation at https://angular-ui.github.io/bootstrap/

angular.module("NavCollapseController", [])
	.controller("SimpleNavController", function($scope) {
		$scope.isCollapsed = true;
	});