angular.module("DominionApp", ["ngRoute", "RouteControllers", "CostDisplayDirective"]);

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
		controller: "LinksController"
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