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
			var randomIndex5 = Math.floor(numberOfCards*Math.random());
			$scope.randomCard5 = $scope.cardList[randomIndex4];

			for (i=1; i<6; i++) {
				if ($scope["randomCard"+i].types.indexOf("Event")>-1 || $scope["randomCard"+i].types.indexOf("Landmark")>-1) {
					$scope["randomCard"+i].orientation = "landscape";
				}
				else {
					$scope["randomCard"+i].orientation = "portrait";
				}
			}
		});
	});