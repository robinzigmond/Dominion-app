angular.module("RouteControllerSearch", [])
	.controller("SearchController", function($scope, $http, CardSearchValues) {
		// get card database and give the scope access to it
		$http.get("js/data/cards.json")
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

		// define arrays of various pieces of information. This makes other parts of the code shorter, and allows for easier updating if
		// new expansions are ever realsed with new types etc.
		$scope.possibleCoinCosts = [0,1,2,3,4,5,6,7,8,9,10,11];
		$scope.possiblePotionCosts = [0,1];
		$scope.possibleDebtCosts = [0,1,2,3,4,5,6,7,8];
		$scope.allTypes = ["Action", "Treasure", "Victory", "Curse", "Attack", "Duration", "Reaction", "Prize", "Shelter", "Ruins", "Looter",
		"Knight", "Reserve", "Traveller", "Gathering", "Castle", "Event", "Landmark"];
		// for sets, include "dirty name" for easier Javascript computations, and "nice name" for more user-friendly display text
		$scope.allSets = [{dirtyName: "Basic", niceName: "Basic cards"},
						  {dirtyName: "BaseFirstEd", niceName: "Base (1st edition)"},
						  {dirtyName: "BaseSecondEd", niceName: "Base (2nd edition)"},
						  {dirtyName: "IntrigueFirstEd", niceName: "Intrigue (1st edition)"},
						  {dirtyName: "IntrigueSecondEd", niceName: "Intrigue (2nd edition)"},
						  {dirtyName: "Seaside", niceName: "Seaside"},
						  {dirtyName: "Alchemy", niceName: "Alchemy"},
						  {dirtyName: "Prosperity", niceName: "Prosperity"},
						  {dirtyName: "Cornucopia", niceName: "Cornucopia"},
						  {dirtyName: "Hinterlands", niceName: "Hinterlands"},
						  {dirtyName: "DarkAges", niceName: "Dark Ages"},
						  {dirtyName: "Guilds", niceName: "Guilds"},
						  {dirtyName: "Adventures", niceName: "Adventures"},
						  {dirtyName: "Empires", niceName: "Empires"},
						  {dirtyName: "Promos", niceName: "Promos"}];

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

		$scope.resetCosts = function() {
			$scope.searchParams.minCoinCost = "0";
			$scope.searchParams.minPotionCost = "0";
			$scope.searchParams.minDebtCost = "0";
			$scope.searchParams.maxCoinCost = "11";
			$scope.searchParams.maxPotionCost = "1";
			$scope.searchParams.maxDebtCost = "8";
		}

		// define behaviour for the "clear all types" button
		$scope.clearTypes = function() {
			for (type in $scope.allTypes) {
				$scope.searchParams["is"+$scope.allTypes[type]+"Type"] = false;
			}
		}

		// define behaviour for "select/deselect all sets" button
		$scope.toggleSets = function() {
			for (set in $scope.allSets) {
				$scope.searchParams["in"+$scope.allSets[set].dirtyName] = $scope.searchParams.selectOrDeselectSets;
			}
			$scope.searchParams.setsButtonText = ($scope.searchParams.selectOrDeselectSets ? "deselect" : "select");
			$scope.searchParams.selectOrDeselectSets = !$scope.searchParams.selectOrDeselectSets;
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
			return (card.costInCoins>=$scope.searchParams.minCoinCost && card.costInPotions>=$scope.searchParams.minPotionCost 
				&& card.costInDebt>=$scope.searchParams.minDebtCost	&& card.costInCoins<=$scope.searchParams.maxCoinCost 
				&& card.costInPotions<=$scope.searchParams.maxPotionCost && card.costInDebt<=$scope.searchParams.maxDebtCost);
		};

		
		/* this search only matches cards with ALL selected types (one might want to search for eg. all Action-Attack cards, 
		but there is not much use in wanting to see all Action cards AND all Attack cards) */
		$scope.typesSearch = function(card) {
			// first make array of the exact types to be included in search
			var desiredTypes = [];
			for (type in $scope.allTypes) {
				if ($scope.searchParams["is"+$scope.allTypes[type]+"Type"]) desiredTypes.push($scope.allTypes[type]);
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
			$scope.searchParams.inBase = ($scope.searchParams.inBaseFirstEd || $scope.searchParams.inBaseSecondEd);
		
			//same for Intrigue
			$scope.searchParams.inIntrigue = ($scope.searchParams.inIntrigueFirstEd || $scope.searchParams.inIntrigueSecondEd);

			return $scope.searchParams["in"+card.set];		
		} 

		/* the following 2 functions implement the following:
		1) searches for specifically "above the line" or "below the line" text, if the checkbox is unticked
		2) 2 separate searches for text anywhere on the card, if the checkbox is ticked. 
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

		// "reset all search data" button:
		$scope.clearAll = function() {
			$scope.clearNameSearch();
			$scope.toggleSets();
			if (!$scope.searchParams.selectOrDeselectSets) $scope.toggleSets();
			$scope.resetCosts();
			$scope.clearTypes();
			$scope.clearNameSearch();
			$scope.clearTextSearch();
		}

	});