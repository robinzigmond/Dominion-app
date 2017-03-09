angular.module("RouteControllers", [])
	.controller("HomeController", function($scope) {
		
	})

	.controller("SearchController", function($scope, $http) {
		$http.get("js/cards.json")
			.then(function(results) {
				$scope.cardList = results.data;
			});

		$scope.nameSearchText = "";

		$scope.minCoinCost = "0";
		$scope.minPotionCost = "0";
		$scope.minDebtCost = "0";
		$scope.maxCoinCost = "11";
		$scope.maxPotionCost = "1";
		$scope.maxDebtCost = "8";
		

		$scope.nameSearch = function(card) {
			return (card.name.toUpperCase().indexOf($scope.nameSearchText.toUpperCase()) != -1);
		};

		$scope.costSearch = function(card) {
			return (card.costInCoins>=$scope.minCoinCost && card.costInPotions>=$scope.minPotionCost && card.costInDebt>=$scope.minDebtCost
				&& card.costInCoins<=$scope.maxCoinCost && card.costInPotions<=$scope.maxPotionCost && card.costInDebt<=$scope.maxDebtCost);
		};

		// can't get "max=min" cost checkbox to work. Should implement instead with a button and ng-click directive?
	});