angular.module("CostDisplayDirective", []).directive(costDisplay, function() {
	return {
		restrict: "E",
		templateUrl: "templates/directives/costdisplay.html"
	};
});