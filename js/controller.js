angular.module("RouteControllers", [])
	.controller("HomeController", function($scope) {
		
	})

	.controller("SearchController", function($scope, $http) {
		$http.get("js/cards.json")
			.then(function(results) {
				$scope.cardList = results.data;
			});

		$scope.nameSearch = function(card) {
			return (card.name.toUpperCase().indexOf($scope.nameSearchText.toUpperCase()) != -1);
		}

	});