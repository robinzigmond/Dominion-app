/* Custom directive to display html with directives functioning correctly - they do not inside ng-bind-html!
Needed in this app to display uib-popovers.
Code taken from the answer by Joel in the following stackoverflow thread:
http://stackoverflow.com/questions/17417607/angular-ng-bind-html-and-directive-within-it/31880192#31880192 
Other than my setting of the name for the angular.module, 100% of the code below, including the comments, are from him. */

angular.module("DirectiveInBindHtml", [])
	.directive('bindHtmlCompile', function ($compile) {
  		return {
    		restrict: 'A',
    		link: function (scope, element, attrs) {
      			scope.$watch(function () {
        		return scope.$eval(attrs.bindHtmlCompile);
      		}, function (value) {
        		// Incase value is a TrustedValueHolderType, sometimes it
        		// needs to be explicitly called into a string in order to
        		// get the HTML string.
        		element.html(value && value.toString());
        		// If scope is provided use it, otherwise use parent scope
        		var compileScope = scope;
        		if (attrs.bindHtmlScope) {
          		compileScope = scope.$eval(attrs.bindHtmlScope);
        		}
        		$compile(element.contents())(compileScope);
    	  	});
	    	}
	  	};
	});