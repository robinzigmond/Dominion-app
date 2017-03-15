angular.module("RouteControllerCard", [])
	.controller("CardController", function($scope, $http, $routeParams){
		var cardId = $routeParams.id;

		$http.get("js/cards.json")
			.then(function(results) {
				$scope.cardList = results.data;
				// grab information about selected card and store in thisCard object
				for (card in $scope.cardList) {
					if ($scope.cardList[card].name == cardId) {
						$scope.thisCard = $scope.cardList[card];
					}
				}
				// reformat "set" string to be more easily understood by humans:
				if ($scope.thisCard.set == "BaseFirstEd") {
					$scope.thisCard.set = "Base (1st Edition)";
				}
				if ($scope.thisCard.set == "BaseSecondEd") {
					$scope.thisCard.set = "Base (2nd Edition)";
				}
				if ($scope.thisCard.set == "IntrigueFirstEd") {
					$scope.thisCard.set = "Intrigue (1st Edition)";
				}
				if ($scope.thisCard.set == "IntrigueSecondEd") {
					$scope.thisCard.set = "Intrigue (2nd Edition)";
				}
				
				
				// to display the card's cost with the appropriate icons - definte an array of objects, one for each icon needed.
				// eah object has 2 properties: "path" giving the image location, and "text" giving a description in words
				// (in case the image doesn't load):
				$scope.costIcons = [];

				// coin icon needed if either coin cost is >0 or total cost is zero (copper, curse etc.)
				if ($scope.thisCard.costInCoins>0 || ($scope.thisCard.costInPotions==0 && $scope.thisCard.costInDebt==0)) {
					$scope.costIcons.push({path: "images/"+$scope.thisCard.costInCoins+"coins.png", text: $scope.thisCard.costInCoins+" coins"});
				}
				//potion and debt icons only needed if that component of the cost is >0. No more than 1 potion is ever in the cost.
				if ($scope.thisCard.costInPotions>0) {
					$scope.costIcons.push({path: "images/potion.png", text: "potion"});
				}
				if ($scope.thisCard.costInDebt>0) {
					$scope.costIcons.push({path: "images/"+$scope.thisCard.costInDebt+"debt.png", text: $scope.thisCard.costInDebt+"debt"});
				}
			});
	});