angular.module("DominionApp", ["ngRoute", "ngSanitize", "ui.bootstrap", "ngAnimate", "NavCollapseController","RouteControllerHome", "RouteControllerSearch", "RouteControllerCard", "RouteControllerContact", "SearchValues", "Data", "DirectiveInBindHtml"]);

angular.module("DominionApp").config(function($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(true); //Enable href routing without hashes

	$routeProvider.when("/", {
		templateUrl: "templates/home.html",
		controller: "HomeController"
	})
	.when("/search", {
		templateUrl: "templates/search.html",
		controller: "SearchController"
	})
	.when("/links", {
		templateUrl: "templates/links.html",
	})
	.when("/contact", {
		templateUrl: "templates/contact.html",
		controller: "ContactController"
	})
	.when("/cards/:id", {
		templateUrl: "templates/cardpage.html",
		controller: "CardController"
	});
});