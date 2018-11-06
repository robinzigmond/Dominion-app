angular.module("RouteControllerHome", [])
	.controller("HomeController", function($scope, GetData) {
		GetData.cards().then(function(results) {
			$scope.cardList = results.data;
			var numberOfCards = $scope.cardList.length;

			/* pick 5 random cards to display on homepage, as an example of the variety of different cards available. Note that
			only 4 are displayed on desktop/tablet views, and 3 on phones, but the easiest way to handle the differing layout on
			each screen size was to define 5 cards. The appropriate ones are hidden using CSS classes. */
			var randomIndex1 = Math.floor(numberOfCards*Math.random());
			$scope.randomCard1 = $scope.cardList[randomIndex1];
			var randomIndex2 = Math.floor(numberOfCards*Math.random());
			$scope.randomCard2 = $scope.cardList[randomIndex2];
			var randomIndex3 = Math.floor(numberOfCards*Math.random());
			$scope.randomCard3 = $scope.cardList[randomIndex3];
			var randomIndex4 = Math.floor(numberOfCards*Math.random());
			$scope.randomCard4 = $scope.cardList[randomIndex4];

			/* find the orientation of each card image (landscape for Events and Landmarks, otherwise portrait).
			(Now altered by the release of Nocturne, which has Boon, Hex and State cards, all landscape.)
			This is done in order to determine the width required for the image */
			var landscapeTypes = ["Event", "Landmark", "Boon", "Hex", "State", "Artifact", "Project"];
			for (i=1; i<5; i++) {
				if (landscapeTypes.indexOf($scope["randomCard"+i].types[0])>-1) {
					$scope["randomCard"+i].orientation = "landscape";
				}
				else {
					$scope["randomCard"+i].orientation = "portrait";
				}
			}
		});
	});