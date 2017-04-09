// simple controller for navbar collapse in ui-bootstrap, largely taken from documentation at https://angular-ui.github.io/bootstrap/

angular.module("NavCollapseController", [])
	.controller("SimpleNavController", function($scope) {
		// navbar starts collapsed, of course.
		$scope.isCollapsed = true;
		/* no further code necessary, as the toggling of $scope.isCollapsed due to the appropriate clicks is simple enough to be
		handled by ng-click values specified within the html */
	});