angular.module("RouteControllers", [])
	.controller("HomeController", function($scope) {
		
	})

	.controller("SearchController", function($scope, $http) {
		// get card database and give the scope access tp it
		$http.get("js/cards.json")
			.then(function(results) {
				$scope.cardList = results.data;
			});

		// set initial search values
		// text searches have to be empty string to always find every card (in case the user is searching by other criteria)
		$scope.nameSearchText = "";
		$scope.aboveLineSearchText = "";
		$scope.belowLineSearchText = "";

		$scope.minCoinCost = "0";
		$scope.minPotionCost = "0";
		$scope.minDebtCost = "0";
		$scope.maxCoinCost = "11";
		$scope.maxPotionCost = "0";
		$scope.maxDebtCost = "0";

		// sets max cost equal to minimum, to allow to easily search for cards of a fixed cost
		$scope.fixedCost = function() {
			$scope.maxCoinCost = $scope.minCoinCost;
			$scope.maxPotionCost = $scope.minPotionCost;
			$scope.maxDebtCost = $scope.minDebtCost;
		}

		// define behaviour for the "select/deselect all sets" button
		var selectOrDeselectTypes = true;
		$scope.typeButtonText = "select";

		$scope.toggleTypes = function() {
			$scope.isActionType = selectOrDeselectTypes;
			$scope.isTreasureType = selectOrDeselectTypes;
			$scope.isVictoryType = selectOrDeselectTypes;
			$scope.isCurseType = selectOrDeselectTypes;
			$scope.isAttackType = selectOrDeselectTypes;
			$scope.isDurationType = selectOrDeselectTypes;
			$scope.isReactionType = selectOrDeselectTypes;
			$scope.isPrizeType = selectOrDeselectTypes;
			$scope.isShelterType = selectOrDeselectTypes;
			$scope.isRuinsType = selectOrDeselectTypes;
			$scope.isLooterType = selectOrDeselectTypes;
			$scope.isKnightType = selectOrDeselectTypes;
			$scope.isReserveType = selectOrDeselectTypes;
			$scope.isTravellerType = selectOrDeselectTypes;
			$scope.isGatheringType = selectOrDeselectTypes;
			$scope.isCastleType = selectOrDeselectTypes;
			$scope.isEventType = selectOrDeselectTypes;
			$scope.isLandmarkType = selectOrDeselectTypes;
			if (selectOrDeselectTypes) {
				$scope.typeButtonText = "deselect";
			}
			else {
				$scope.typeButtonText = "select";
			}
			selectOrDeselectTypes = !selectOrDeselectTypes;
		}

		// same for "select/deselect all sets" button
		var selectOrDeselectSets = true;
		$scope.setsButtonText = "select";
		
		$scope.toggleSets = function() {
			$scope.inBasic = selectOrDeselectSets;
			$scope.inBaseFirstEd = selectOrDeselectSets;
			$scope.inBaseSecondEd = selectOrDeselectSets;
			$scope.inIntrigueFirstEd = selectOrDeselectSets;
			$scope.inIntrigueSecondEd = selectOrDeselectSets;
			$scope.inSeaside = selectOrDeselectSets;
			$scope.inAlchemy = selectOrDeselectSets;
			$scope.inProsperity = selectOrDeselectSets;
			$scope.inCornucopia = selectOrDeselectSets;
			$scope.inHinterlands = selectOrDeselectSets;
			$scope.inDarkAges = selectOrDeselectSets;
			$scope.inGuilds = selectOrDeselectSets;
			$scope.inAdventures = selectOrDeselectSets;
			$scope.inEmpires = selectOrDeselectSets;
			$scope.inPromos = selectOrDeselectSets;
			if (selectOrDeselectSets) {
				$scope.setsButtonText = "deselect";
			}
			else {
				$scope.setsButtonText = "select";
			}
			selectOrDeselectSets = !selectOrDeselectSets;
		}

		// returns true when card name contains relevant search text:
		$scope.nameSearch = function(card) {
			return (card.name.toUpperCase().indexOf($scope.nameSearchText.toUpperCase()) != -1);
		};

		// searches for cards with cost in the indicated range
		// note that all 3 components of cost have to be between the maximum and minimum, because this is how cost comparisons work in Dominion
		// (costs of eg. 3 coins and of 2 coins and 1 potion are incomparable)
		$scope.costSearch = function(card) {
			return (card.costInCoins>=$scope.minCoinCost && card.costInPotions>=$scope.minPotionCost && card.costInDebt>=$scope.minDebtCost
				&& card.costInCoins<=$scope.maxCoinCost && card.costInPotions<=$scope.maxPotionCost && card.costInDebt<=$scope.maxDebtCost);
		};

		
		/* this search only matches cards with ALL selected types (one might want to search for eg. all Action-Attack cards, 
		but there is not much use in wanting to see all Action cards AND all Attack cards) */
		$scope.typesSearch = function(card) {
			// first make array of the exact types to be included in search
			var typesList = ["Action", "Treasure", "Victory", "Curse", "Attack", "Duration", "Reaction", "Prize", "Shelter", "Ruins",
			"Looter", "Knight", "Reserve", "Traveller", "Gathering", "Castle", "Event", "Landmark"];
			var desiredTypes = [];
			for (type in typesList) {
				if ($scope["is"+typesList[type]+"Type"]) desiredTypes.push(typesList[type]);
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
				
				// format nice string for the total cost, leaving out any cost components which have zero value:
				// (may be wasted effort because I would like to show the cost with appropriate icons in the finished version!)
				$scope.costString = "";
				if ($scope.thisCard.costInCoins>0) {
					$scope.costString+=($scope.thisCard.costInCoins+" coin");
				}
				// pluralise the word "coin" if necessary:
				if ($scope.thisCard.costInCoins>1) {
					$scope.costString+="s";
				}
				// don't forget comma separator if anything will follow in the string!
				if ($scope.thisCard.costInCoins>0 && ($scope.thisCard.costInPotions>0 || $scope.thisCard.costInDebt>0)) {
					$scope.costString+=",";
				}
				if ($scope.thisCard.costInPotions>0) {
					$scope.costString+=($scope.thisCard.costInPotions+"potion ,");
					// no need for any logic to add "s" here, as 1 is maximum potion cost of any card
				}
				// comma separator again:
				if ($scope.thisCard.costInPotions>0 && $scope.thisCard.costInDebt>0) {
					$scope.costString+=",";
				}
				if ($scope.thisCard.costInDebt>0) {
					$scope.costString+=($scope.thisCard.costInDebt+"debt");
					/* debt is its own plural (it wouldn't make sense to say "2 debts" - "2 debt tokens" is strictly correct, but "2 debt"
					makes perfect sense) */
				}
				// if string is still emtpy (no cost of any kind: copper or curse), explicitly make the cost string "0 coins"
				if ($scope.costString == "") {
					$scope.costString = "0 coins";
				}
			});
	});