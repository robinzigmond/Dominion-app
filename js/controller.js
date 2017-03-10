angular.module("RouteControllers", [])
	.controller("HomeController", function($scope) {
		
	})

	.controller("SearchController", function($scope, $http) {
		$http.get("js/cards.json")
			.then(function(results) {
				$scope.cardList = results.data;
			});

		$scope.nameSearchText = "";
		$scope.aboveLineSearchText = "";
		$scope.belowLineSearchText = "";

		$scope.minCoinCost = "0";
		$scope.minPotionCost = "0";
		$scope.minDebtCost = "0";
		$scope.maxCoinCost = "11";
		$scope.maxPotionCost = "0";
		$scope.maxDebtCost = "0";

		$scope.isAllTypes = false;
		$scope.allSets = false;

		if ($scope.isAllTypes) {  // this doesn't appear to work!
			$scope.isActionType = true;
			$scope.isTreasureType = true;
			$scope.isVictoryType = true;
			$scope.isCurseType = true;
			$scope.isAttackType = true;
			$scope.isDurationType = true;
			$scope.isReactionType = true;
			$scope.isPrizeType = true;
			$scope.isShelterType = true;
			$scope.isRuinsType = true;
			$scope.isLooterType = true;
			$scope.isKnightType = true;
			$scope.isReserveType = true;
			$scope.isTravellerType = true;
			$scope.isGatheringType = true;
			$scope.isCastleType = true;
			$scope.isEventType = true;
			$scope.isLandmarkType = true;
		}

		if ($scope.allSets) { // also doesn't work
			$scope.inBasic = true;
			$scope.inBaseFirstEd = true;
			$scope.inBaseSecondEd = true;
			$scope.inIntrigueFirstEd = true;
			$scope.inIntrigueSecondEd = true;
			$scope.inSeaside = true;
			$scope.inAlchemy = true;
			$scope.inProsperity = true;
			$scope.inCornucopia = true;
			$scope.inHinterlands = true;
			$scope.inDarkAges = true;
			$scope.inGuilds = true;
			$scope.inAdventures = true;
			$scope.inEmpires = true;
			$scope.inPromos = true;
		}

		

		$scope.nameSearch = function(card) {
			return (card.name.toUpperCase().indexOf($scope.nameSearchText.toUpperCase()) != -1);
		};

		$scope.costSearch = function(card) {
			return (card.costInCoins>=$scope.minCoinCost && card.costInPotions>=$scope.minPotionCost && card.costInDebt>=$scope.minDebtCost
				&& card.costInCoins<=$scope.maxCoinCost && card.costInPotions<=$scope.maxPotionCost && card.costInDebt<=$scope.maxDebtCost);
		};

		// this code doesn't work - checkbox has no effect. Have moved on for now!
		if ($scope.fixedCost) {
			$scope.maxCoinCost = $scope.minCoinCost;
			$scope.maxPotionCost = $scope.minPotionCost;
			$scope.maxDebtCost = $scope.minDebtCost;
		}

		$scope.typesSearch = function(card) {
			// this search only matches cards with ALL selected types
			// first make array of the exact types to be included in search
			var typesList = ["Action", "Treasure", "Victory", "Curse", "Attack", "Duration", "Reaction", "Prize", "Shelter", "Ruins",
			"Looter", "Knight", "Reserve", "Traveller", "Gathering", "Castle", "Event", "Landmark"];
			var onlyWantedTypes = [];
			for (type in typesList) {
				if ($scope["is"+typesList[type]+"Type"]) onlyWantedTypes.push(typesList[type]);
			}
			//remove all cards without all desired types
			for (type in onlyWantedTypes) {
				if (card.types.indexOf(onlyWantedTypes[type])==-1) return false;
			}
			return true;
		}

		$scope.setFilter = function(card) { // problems
			//this search should match all cards in ANY of the selected sets.
			// set card to be in "base" set if it is in either first or second edition.
			// not sure why this logic only works when moved inside the filter function!
			$scope.inBase = false;
			if ($scope.inBaseFirstEd || $scope.inBaseSecondEd) {
				$scope.inBase = true;
			}
		
			//same for Intrigue
			$scope.inIntrigue = false;
			if ($scope.inIntrigueFirstEd || $scope.inIntrigueSecondEd) {
				$scope.inIntrigue = true;
			}
				
			return $scope["in"+card.set];		
		} 

		/* the following 2 functions implement the following:
		1) searches for specifically "above the line" or "below the line" text, if the checkbox is unticked
		2) 2 separate searches for text anywhere on the card, if the cbeckbox is ticked. 
		This allows users to search either one part of the card text, or the card as a whole */

		$scope.textAboveSearch = function(card) {
			/* if checkbox is ticked, search whole card text for content of first or second input box. 
			Card gets returned if matches are found for both. */
			if ($scope.allTextSearch) {
				return (((card.textAboveLine.toUpperCase().indexOf($scope.aboveLineSearchText.toUpperCase()) != -1) || 
					(card.textBelowLine.toUpperCase().indexOf($scope.aboveLineSearchText.toUpperCase()) != -1)) && 
					((card.textAboveLine.toUpperCase().indexOf($scope.belowLineSearchText.toUpperCase()) != -1) ||
					(card.textBelowLine.toUpperCase().indexOf($scope.belowLineSearchText.toUpperCase()) != -1)));
			}
			// otherwise just search for text of first input box, above the line
			else {
				return (card.textAboveLine.toUpperCase().indexOf($scope.aboveLineSearchText.toUpperCase()) != -1);
			}
		};

		$scope.textBelowSearch = function(card) {
			/* first part is identical to function above. This gives the ability to search for both of two separate text strings. */
			if ($scope.allTextSearch) {
				return (((card.textAboveLine.toUpperCase().indexOf($scope.aboveLineSearchText.toUpperCase()) != -1) || 
					(card.textBelowLine.toUpperCase().indexOf($scope.aboveLineSearchText.toUpperCase()) != -1)) && 
					((card.textAboveLine.toUpperCase().indexOf($scope.belowLineSearchText.toUpperCase()) != -1) ||
					(card.textBelowLine.toUpperCase().indexOf($scope.belowLineSearchText.toUpperCase()) != -1)));
			}
			// if box unchecked, just search for text of second input box, below the line
			else {
				return (card.textBelowLine.toUpperCase().indexOf($scope.belowLineSearchText.toUpperCase()) != -1);
			}
		};
	});