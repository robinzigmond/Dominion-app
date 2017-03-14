angular.module("RouteControllers", [])
	.controller("HomeController", function($scope) {
		
	})

	.controller("SearchController", function($scope, $http, store) {
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

		// get search parameters from local storage, if any data is saved - otherwise set default search values

		// THIS FUNCTIONALITY IS NOT WORKING AT THE MOMENT!
		// It appears that, when returning to the search page, the store values are being overwritten by the newly-reset $scope properties, 
		// before those $scope properties can be set equal to the store values. I have tried re-arranging the order of the code to avoid this,
		// but so far with no success.

		// order cards by name initially
		$scope.orderProp = store.orderProp || "name";

		// text searches have to be empty string to always find every card (in case the user is searching by other criteria)
		$scope.nameSearchText = store.nameSearchText || "";
		$scope.aboveLineSearchText = store.aboveLineSearchText || "";
		$scope.belowLineSearchText = store. belowLineSearchText || "";

		$scope.minCoinCost = store.minCoinCost || "0";
		$scope.minPotionCost = store.minPotionCost || "0";
		$scope.minDebtCost = store.minDebtCost || "0";
		$scope.maxCoinCost = store.maxCoinCost || "11";
		$scope.maxPotionCost = store.maxPotionCost || "1";
		$scope.maxDebtCost = store.maxDebtCost || "8";

		$scope.isActionType = store.isActionType;
		$scope.isTreasureType = store.isTreasureType;
		$scope.isVictoryType = store.isVictoryType;
		$scope.isCurseType = store.isCurseType;
		$scope.isAttackType = store.isAttackType;
		$scope.isDurationType = store.isDurationType;
		$scope.isReactionType = store.isReactionType;
		$scope.isPrizeType = store.isPrizeType;
		$scope.isShelterType = store.isShelterType;
		$scope.isRuinsType = store.isRuinsType;
		$scope.isLooterType = store.isLooterType;
		$scope.isKnightType = store.isKnightType;
		$scope.isReserveType = store.isReserveType;
		$scope.isTravellerType = store.isTravellerType;
		$scope.isGatheringype = store.isGatheringType;
		$scope.isCastleType = store.isCastleType;
		$scope.isEventType = store.isEventType;
		$scope.isLandmarkType = store.isLandmarkType;

		$scope.inBasic = store.inBasic;
		$scope.inBase = store.inBase;
		$scope.inBaseFirstEd = store.inBaseFirstEd;
		$scope.inBaseSecondEd = store.inBaseSecondEd;
		$scope.inIntrigue = store.inIntrigue;
		$scope.inIntrigueFirstEd = store.inIntrigueFirstEd;
		$scope.inIntrigueSecondEd = store.inIntrigueSecondEd;
		$scope.inSeaside = store.inSeaside;
		$scope.inAlchemy = store.inAlchemy;
		$scope.inProsperity = store.inProsperity;
		$scope.inCornucopia = store.inCornucopia;
		$scope.inHinterlands = store.inHinterlands;
		$scope.inDarkAges = store.inDarkAges;
		$scope.inGuilds = store.inGuilds;
		$scope.inAdventures = store.inAdventures;
		$scope.inEmpires = store.inEmpires;

		// need to make sure store values are constantly kept up-to-date with the corresponding $scope properties.
		// should be able to do this by putting the updates inside the search functions, as these should automatically rerun whenever the
		// relevant data is changed:

		// reset name search text when button is clicked
		$scope.clearNameSearch = function () {
			$scope.nameSearchText = "";
		}

		// sets max cost equal to minimum, to allow to easily search for cards of a fixed cost
		$scope.fixedCost = function() {
			$scope.maxCoinCost = $scope.minCoinCost;
			$scope.maxPotionCost = $scope.minPotionCost;
			$scope.maxDebtCost = $scope.minDebtCost;
		}

		// define behaviour for the "clear all types" button
		$scope.clearTypes = function() {
			$scope.isActionType = false;
			$scope.isTreasureType = false;
			$scope.isVictoryType = false;
			$scope.isCurseType = false;
			$scope.isAttackType = false;
			$scope.isDurationType = false;
			$scope.isReactionType = false;
			$scope.isPrizeType = false;
			$scope.isShelterType = false;
			$scope.isRuinsType = false;
			$scope.isLooterType = false;
			$scope.isKnightType = false;
			$scope.isReserveType = false;
			$scope.isTravellerType = false;
			$scope.isGatheringType = false;
			$scope.isCastleType = false;
			$scope.isEventType = false;
			$scope.isLandmarkType = false;
		}

		// define behaviour for "select/deselect all sets" button
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

		// reset card search texts when button is clicked
		$scope.clearTextSearch = function () {
			$scope.aboveLineSearchText = "";
			$scope.belowLineSearchText = "";
		}

		// returns true when card name contains relevant search text:
		$scope.nameSearch = function(card) {
			store.set("nameSearchText", $scope.nameSearchText);
			return (card.name.toUpperCase().indexOf($scope.nameSearchText.toUpperCase()) != -1);
		};

		// searches for cards with cost in the indicated range
		// note that all 3 components of cost have to be between the maximum and minimum, because this is how cost comparisons work in Dominion
		// (costs of eg. 3 coins and of 2 coins and 1 potion are incomparable)
		$scope.costSearch = function(card) {
			store.set("minCoinCost", $scope.minCoinCost);
			store.set("minPotionCost", $scope.minPotionCost);
			store.set("minDebtCost", $scope.minDebtCost);
			store.set("maxCoinCost", $scope.maxCoinCost);
			store.set("maxPotionCost", $scope.maxPotionCost);
			store.set("maxDebtCost", $scope.maxDebtCost);

			return (card.costInCoins>=$scope.minCoinCost && card.costInPotions>=$scope.minPotionCost && card.costInDebt>=$scope.minDebtCost
				&& card.costInCoins<=$scope.maxCoinCost && card.costInPotions<=$scope.maxPotionCost && card.costInDebt<=$scope.maxDebtCost);
		};

		
		/* this search only matches cards with ALL selected types (one might want to search for eg. all Action-Attack cards, 
		but there is not much use in wanting to see all Action cards AND all Attack cards) */
		$scope.typesSearch = function(card) {
			store.set("isActionType", $scope.isActionType);
			store.set("isTreasureType", $scope.isTreasureType);
			store.set("isVictoryType", $scope.isVictoryType);
			store.set("isCurseType", $scope.isCurseType);
			store.set("isAttackType", $scope.isAttackType);
			store.set("isDurationType", $scope.isDurationType);
			store.set("isReactionType", $scope.isReactionType);
			store.set("isPrizeType", $scope.isPrizeType);
			store.set("isShelterType", $scope.isShelterType);
			store.set("isRuinsType", $scope.isRuinsType);
			store.set("isLooterType", $scope.isLooterType);
			store.set("isKnightType", $scope.isKnightType);
			store.set("isReserveType", $scope.isReserveType);
			store.set("isTravellerType", $scope.isTravellerType);
			store.set("isGatheringType", $scope.isGatheringType);
			store.set("isCastleType", $scope.isCastleType);
			store.set("isEventType", $scope.isEventType);
			store.set("isLandmarkType", $scope.isLandmarkType);
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

			store.set("inBasic", $scope.inBasic);
			store.set("inBase", $scope.inBase);
			store.set("inBaseFirstEd", $scope.inBaseFirstEd);
			store.set("inBaseSecondEd", $scope.inBaseSecondEd);
			store.set("inIntrigue", $scope.inIntrigue);
			store.set("inIntrigueFirstEd", $scope.inIntrigueFirstEd);
			store.set("inIntrigueSecondEd", $scope.inIntrigueSecondEd);
			store.set("inSeaside", $scope.inSeaside);
			store.set("inAlchemy", $scope.inAlchemy);
			store.set("inProsperity", $scope.inProsperity);
			store.set("inCornucopia", $scope.inCornucopia);
			store.set("inHinterlands", $scope.inHinterlands);
			store.set("inDarkAges", $scope.inDarkAges);
			store.set("inGuilds", $scope.inGuilds);
			store.set("inAdventures", $scope.inAdventures);
			store.set("inEmpires", $scope.inEmpires);
				
			return $scope["in"+card.set];		
		} 

		/* the following 2 functions implement the following:
		1) searches for specifically "above the line" or "below the line" text, if the checkbox is unticked
		2) 2 separate searches for text anywhere on the card, if the cbeckbox is ticked. 
		This allows users to search either one part of the card text, or the card as a whole */

		$scope.textAboveSearch = function(card) {

			store.set("aboveLineSearchText", $scope.aboveLineSearchText);
			store.set("belowLineSearchText", $scope.belowLineSearchText);

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

			store.set("aboveLineSearchText", $scope.aboveLineSearchText);
			store.set("belowLineSearchText", $scope.belowLineSearchText);

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
				// commented out in case I need to reuse later!
				/* $scope.costString = "";
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
					$scope.costString+=($scope.thisCard.costInPotions+" potion,");
					// no need for any logic to add "s" here, as 1 is maximum potion cost of any card
				}
				// comma separator again:
				if ($scope.thisCard.costInPotions>0 && $scope.thisCard.costInDebt>0) {
					$scope.costString+=",";
				}
				if ($scope.thisCard.costInDebt>0) {
					$scope.costString+=($scope.thisCard.costInDebt+" debt");
					/* debt is its own plural (it wouldn't make sense to say "2 debts" - "2 debt tokens" is strictly correct, but "2 debt"
					makes perfect sense) */
				/* }
				// if string is still emtpy (no cost of any kind: eg. copper or curse), explicitly make the cost string "0 coins"
				if ($scope.costString == "") {
					$scope.costString = "0 coins";
				} */

				// now try to define image attributes using a similar logic. Need up to 3 separate icons, each with alt text:
				// best to store all these in 2 separate arrays:
				$scope.costIconsImagePaths = [];
				$scope.costIconsAltText = [];
				// coin icon needed if either coin cost is >0 or total cost is zero (copper, curse etc.)
				if ($scope.thisCard.costInCoins>0 || ($scope.thisCard.costinPotions==0 && $scope.thisCard.costinDebt==0)) {
					$scope.costIconsImagePaths.push("/../images/"+$scope.thisCard.costInCoins+"coins.png");
					$scope.costIconsAltText.push($scope.thisCard.costInCoins+" coins");
				}
				//potion and debt icons only needed if that component of the cost is >0. No more than 1 potion is ever in the cost.
				if ($scope.thisCard.costInPotions>0) {
					$scope.costIconsImagePaths.push("/../images/potion.png");
					$scope.costIconsAltText.push("potion");
				}
				if ($scope.thisCard.costInDebt>0) {
					$scope.costIconsImagePaths.push("/../images/"+$scope.thisCard.costInDebt+"debt.png");
					$scope.costIconsAltText.push($scope.thisCard.costInDebt+"debt");
				}
				console.log($scope.costIconsImagePaths);
				console.log($scope.costIconsAltText);
			});
	});