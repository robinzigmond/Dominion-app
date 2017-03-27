angular.module("RouteControllerHome", [])
	.controller("HomeController", function($scope, GetData) {
		GetData.cards().then(function(results) {
			$scope.cardList = results.data;
			var numberOfCards = $scope.cardList.length;
			var randomIndex1 = Math.floor(numberOfCards*Math.random());
			$scope.randomCard1 = $scope.cardList[randomIndex1];
			var randomIndex2 = Math.floor(numberOfCards*Math.random());
			$scope.randomCard2 = $scope.cardList[randomIndex2];
			var randomIndex3 = Math.floor(numberOfCards*Math.random());
			$scope.randomCard3 = $scope.cardList[randomIndex3];
			var randomIndex4 = Math.floor(numberOfCards*Math.random());
			$scope.randomCard4 = $scope.cardList[randomIndex4];
		});
	});