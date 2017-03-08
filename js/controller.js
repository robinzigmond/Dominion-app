angular.module("RouteControllers", [])
	.controller("HomeController", function($scope) {
		
	})

	.controller("SearchController", function($scope, $http, cardSearchFilter) {
		$scope.searchResults = [];

		$http.get("js/cards.json")
			.then(function(results) {
				$scope.cardList = results.data;
				console.log($scope.cardList);
			

			for (card in $scope.cardList) {
				if (cardSearchFilter(card) == true) {
					$scope.searchResults.push($scope.cardList[card]);
				}
			}

			console.log($scope.searchResults)});
	});