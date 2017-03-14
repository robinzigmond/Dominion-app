angular.module("RouteControllers", [])
	.controller("HomeController", function($scope) {
		
	})

	.controller("SearchController", function($scope, $http, CardSearchValues) {
		// get card database and give the scope access to it
		$http.get("js/cards.json")
			.then(function(results) {
				$scope.cardList = results.data;
				// create a "cost" property for ordering purposes, which orders by coin cost, followed by potion cost, then Debt cost.
				// this is by no means a "canonical" order, but seems as good as anything as an arbitrary choice
				for (card in $scope.cardList) {
					$scope.cardList[card].cost = 100*$scope.cardList[card].costInCoins + 10*$scope.cardList[card].costInPotions 
					+ $scope.cardList[card].costInDebt;
				}
			});

		// get values from service
		$scope.searchParams = CardSearchValues;

		// reset name search text when button is clicked
		$scope.clearNameSearch = function () {
			$scope.searchParams.nameSearchText = "";
		}

		// sets max cost equal to minimum, to allow to easily search for cards of a fixed cost
		$scope.fixedCost = function() {
			$scope.searchParams.maxCoinCost = $scope.searchParams.minCoinCost;
			$scope.searchParams.maxPotionCost = $scope.searchParams.minPotionCost;
			$scope.searchParams.maxDebtCost = $scope.searchParams.minDebtCost;
		}

		// define behaviour for the "clear all types" button
		$scope.clearTypes = function() {
			$scope.searchParams.isActionType = false;
			$scope.searchParams.isTreasureType = false;
			$scope.searchParams.isVictoryType = false;
			$scope.searchParams.isCurseType = false;
			$scope.searchParams.isAttackType = false;
			$scope.searchParams.isDurationType = false;
			$scope.searchParams.isReactionType = false;
			$scope.searchParams.isPrizeType = false;
			$scope.searchParams.isShelterType = false;
			$scope.searchParams.isRuinsType = false;
			$scope.searchParams.isLooterType = false;
			$scope.searchParams.isKnightType = false;
			$scope.searchParams.isReserveType = false;
			$scope.searchParams.isTravellerType = false;
			$scope.searchParams.isGatheringType = false;
			$scope.searchParams.isCastleType = false;
			$scope.searchParams.isEventType = false;
			$scope.searchParams.isLandmarkType = false;
		}

		// define behaviour for "select/deselect all sets" button
		var selectOrDeselectSets = true;
		$scope.setsButtonText = "select";
		
		$scope.toggleSets = function() {
			$scope.searchParams.inBasic = selectOrDeselectSets;
			$scope.searchParams.inBaseFirstEd = selectOrDeselectSets;
			$scope.searchParams.inBaseSecondEd = selectOrDeselectSets;
			$scope.searchParams.inIntrigueFirstEd = selectOrDeselectSets;
			$scope.searchParams.inIntrigueSecondEd = selectOrDeselectSets;
			$scope.searchParams.inSeaside = selectOrDeselectSets;
			$scope.searchParams.inAlchemy = selectOrDeselectSets;
			$scope.searchParams.inProsperity = selectOrDeselectSets;
			$scope.searchParams.inCornucopia = selectOrDeselectSets;
			$scope.searchParams.inHinterlands = selectOrDeselectSets;
			$scope.searchParams.inDarkAges = selectOrDeselectSets;
			$scope.searchParams.inGuilds = selectOrDeselectSets;
			$scope.searchParams.inAdventures = selectOrDeselectSets;
			$scope.searchParams.inEmpires = selectOrDeselectSets;
			$scope.searchParams.inPromos = selectOrDeselectSets;
			if (selectOrDeselectSets) {
				$scope.setsButtonText = "deselect";
			}
			else {
				$scope.setsButtonText = "select";
			}
			selectOrDeselectSets = !selectOrDeselectSets;
		}

		// reset card search texts when button is clicked
		$scope.clearTextSearch = function () {
			$scope.searchParams.aboveLineSearchText = "";
			$scope.searchParams.belowLineSearchText = "";
		}

		// returns true when card name contains relevant search text:
		$scope.nameSearch = function(card) {
			return (card.name.toUpperCase().indexOf($scope.searchParams.nameSearchText.toUpperCase()) != -1);
		};

		// searches for cards with cost in the indicated range
		// note that all 3 components of cost have to be between the maximum and minimum, because this is how cost comparisons work in Dominion
		// (costs of eg. 3 coins and of 2 coins and 1 potion are incomparable)
		$scope.costSearch = function(card) {
			return (card.costInCoins>=$scope.searchParams.minCoinCost && card.costInPotions>=$scope.searchParams.minPotionCost && card.costInDebt>=$scope.searchParams.minDebtCost
				&& card.costInCoins<=$scope.searchParams.maxCoinCost && card.costInPotions<=$scope.searchParams.maxPotionCost && card.costInDebt<=$scope.searchParams.maxDebtCost);
		};

		
		/* this search only matches cards with ALL selected types (one might want to search for eg. all Action-Attack cards, 
		but there is not much use in wanting to see all Action cards AND all Attack cards) */
		$scope.typesSearch = function(card) {
			// first make array of the exact types to be included in search
			var typesList = ["Action", "Treasure", "Victory", "Curse", "Attack", "Duration", "Reaction", "Prize", "Shelter", "Ruins",
			"Looter", "Knight", "Reserve", "Traveller", "Gathering", "Castle", "Event", "Landmark"];
			var desiredTypes = [];
			for (type in typesList) {
				if ($scope.searchParams["is"+typesList[type]+"Type"]) desiredTypes.push(typesList[type]);
			}
			//remove all cards without all desired types
			for (type in desiredTypes) {
				if (card.types.indexOf(desiredTypes[type])==-1) return false;
			}
			return true;
		}
		
		/* this search should match all cards in ANY of the selected sets. This is to enable users to search just those cards from the sets
		that they own, or are interested in */
		$scope.setFilter = function(card) {
			// set card to be in Base set if it is in either first or second edition
			$scope.searchParams.inBase = false;
			if ($scope.searchParams.inBaseFirstEd || $scope.searchParams.inBaseSecondEd) {
				$scope.searchParams.inBase = true;
			}
		
			//same for Intrigue
			$scope.searchParams.inIntrigue = false;
			if ($scope.searchParams.inIntrigueFirstEd || $scope.searchParams.inIntrigueSecondEd) {
				$scope.searchParams.inIntrigue = true;
			}

			return $scope.searchParams["in"+card.set];		
		} 

		/* the following 2 functions implement the following:
		1) searches for specifically "above the line" or "below the line" text, if the checkbox is unticked
		2) 2 separate searches for text anywhere on the card, if the cbeckbox is ticked. 
		This allows users to search either one part of the card text, or the card as a whole */

		$scope.textAboveSearch = function(card) {

			/* if checkbox is ticked, search whole card text for content of first or second input box. 
			Card gets returned if matches are found for both. */

			if ($scope.searchParams.allTextSearch) {
				return (((card.textAboveLine.toUpperCase().indexOf($scope.searchParams.aboveLineSearchText.toUpperCase()) != -1) || 
					(card.textBelowLine.toUpperCase().indexOf($scope.searchParams.aboveLineSearchText.toUpperCase()) != -1)) && 
					((card.textAboveLine.toUpperCase().indexOf($scope.searchParams.belowLineSearchText.toUpperCase()) != -1) ||
					(card.textBelowLine.toUpperCase().indexOf($scope.searchParams.belowLineSearchText.toUpperCase()) != -1)));
			}
			// otherwise just search for text of first input box, above the line
			else {
				return (card.textAboveLine.toUpperCase().indexOf($scope.searchParams.aboveLineSearchText.toUpperCase()) != -1);
			}
		};

		$scope.textBelowSearch = function(card) {

			/* first part is identical to function above. This gives the ability to search for both of two separate text strings. */
			if ($scope.searchParams.allTextSearch) {
				return (((card.textAboveLine.toUpperCase().indexOf($scope.searchParams.aboveLineSearchText.toUpperCase()) != -1) || 
					(card.textBelowLine.toUpperCase().indexOf($scope.searchParams.aboveLineSearchText.toUpperCase()) != -1)) && 
					((card.textAboveLine.toUpperCase().indexOf($scope.searchParams.belowLineSearchText.toUpperCase()) != -1) ||
					(card.textBelowLine.toUpperCase().indexOf($scope.searchParams.belowLineSearchText.toUpperCase()) != -1)));
			}
			// if box unchecked, just search for text of second input box, below the line
			else {
				return (card.textBelowLine.toUpperCase().indexOf($scope.searchParams.belowLineSearchText.toUpperCase()) != -1);
			}
		};
	})
	
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