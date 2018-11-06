angular.module("RouteControllerSearch", [])
	.controller("SearchController", function($scope, CardSearchValues, GetData) {
		
		// individual sections of search form should start hidden, for ease of initial viewing
		$scope.setsShown = false;
		$scope.nameShown = false;
		$scope.costShown = false;
		$scope.typesShown = false;
		$scope.textShown = false;

		// get card database and give the scope access to it
		GetData.cards()
			.then(function(results) {
				$scope.cardList = results.data;
				// first run through the entire card database in order to do a few different tasks on each card:
				for (card in $scope.cardList) {
					/* create a "cost" property for ordering purposes, which orders by coin cost, followed by potion cost, 
					then Debt cost. This is by no means a "canonical" order, but seems as good as anything as an arbitrary choice */
					$scope.cardList[card].cost = 100*$scope.cardList[card].costInCoins + 10*$scope.cardList[card].costInPotions 
					+ $scope.cardList[card].costInDebt;
					/* for cards without a cost (Landmarks, Boons etc.), the above results in NaN, with unpredictable effects on
					the order. So we will set the "cost" to be 100000 in these cases, to ensure they come after the cards with
					actual costs */
					if ($scope.cardList[card].cost !== $scope.cardList[card].cost) { // safest way to test for NaN
						$scope.cardList[card].cost = 100000;
					}
				
					/* strip out square brackets and curly braces from card texts. (I have used these characters in order to 
					signal replacement by links or popovers on the card page - but we don't want these characters to obstruct 
					search strings. For example, a user might easily want to search for cards giving "+2 Actions" - it must not
					fail to return any cards because the database actually says "+2 {Action}s", for reasons which have nothing to
					do with the search page!).
				    Similarly for the < character used to mark certain icons, and the * character used to replace spaces in
				    popover triggers.) Note that *s are not removed, but replaced by a space, because they are there in place of
				    a space in the first place. */
					$scope.cardList[card].textAboveLine = $scope.cardList[card].textAboveLine.split("[").join("")
															.split("]").join("").split("{").join("").split("}").join("")
															.split("<").join("").split("*").join(" ");
					$scope.cardList[card].textBelowLine = $scope.cardList[card].textBelowLine.split("[").join("")
															.split("]").join("").split("{").join("").split("}").join("")
															.split("<").join("").split("*").join(" ");

					// find the correct orientation for the card (used to give it the right CSS class for image sizing):
					var landscapeTypes = ["Event", "Landmark", "Boon", "Hex", "State", "Artifact", "Project"];
					if (landscapeTypes.indexOf($scope.cardList[card].types[0])>-1) {
						$scope.cardList[card].orientation = "landscape";
					}
					else {
						$scope.cardList[card].orientation = "portrait";
					}

				}
			});



		/* get search values from service - ensuring that they are remembered when the user navigates back to the search page,
		most likely after checking an individual card page */
		$scope.searchParams = CardSearchValues;

		/* define arrays of various pieces of information. This makes other parts of the code shorter, and allows for easier 
		updating if	new expansions are ever realsed with new types etc. */
		/* costs go up to the maximum that currently exists (the Dominate event in Empires costs 14 coins, previously the maximum
		was 11 for Colony) */
		$scope.possibleCoinCosts = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
		$scope.possiblePotionCosts = [0,1];
		$scope.possibleDebtCosts = [0,1,2,3,4,5,6,7,8];
		$scope.allTypes = ["Action", "Treasure", "Victory", "Curse", "Attack", "Reaction", "Duration", "Prize", "Shelter", "Ruins", "Looter",
		"Knight", "Reserve", "Traveller", "Gathering", "Castle", "Night", "Heirloom", "Fate", "Doom", "Spirit", "Zombie", "Event", "Landmark",
		"Boon", "Hex", "State", "Artifact", "Project"];
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
						  {dirtyName: "Nocturne", niceName: "Nocturne"},
						  {dirtyName: "Renaissance", niceName: "Renaissance"},
						  {dirtyName: "Promos", niceName: "Promos"}];

		// reset name search text when the appropriate button is clicked
		$scope.clearNameSearch = function () {
			$scope.searchParams.nameSearchText = "";
		}

		/* This function, also triggered by a button, sets maximum cost equal to minimum, to allow users to easily search 
		for cards of a specific cost */
		$scope.fixedCost = function() {
			$scope.searchParams.maxCoinCost = $scope.searchParams.minCoinCost;
			$scope.searchParams.maxPotionCost = $scope.searchParams.minPotionCost;
			$scope.searchParams.maxDebtCost = $scope.searchParams.minDebtCost;
		}

		// there is a "reset to Default button" for costs as well
		$scope.resetCosts = function() {
			$scope.searchParams.minCoinCost = "0";
			$scope.searchParams.minPotionCost = "0";
			$scope.searchParams.minDebtCost = "0";
			$scope.searchParams.maxCoinCost = "14";
			$scope.searchParams.maxPotionCost = "1";
			$scope.searchParams.maxDebtCost = "8";
		}

		// define behaviour for the "clear all types" button
		$scope.clearTypes = function() {
			for (type in $scope.allTypes) {
				$scope.searchParams["is"+$scope.allTypes[type]+"Type"] = false;
			}
		}

		/* define behaviour for "select/deselect all sets" button. This initially says "select all sets", but toggles between
		"select" and "deselect" on each click. The button itself does whatever it currently says it does!
		I could have instead used 2 separate buttons, one for select all and one for deselect all - but I feel it is better to
		save the space, since it will be rare to want to "select all" when many sets are already selected, and vice versa */
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
			// we should also make sure the "anywhere on card" checkbox is ticked, as this is the most natural setting:
			$scope.searchParams.allTextSearch = true;
		}

		/* now we move onto the functions used for the search function itself. There is one for each section of the search form -
		they take as input the object representing an individual card, and return true or false according to whether they meet
		the search criteria set by the user */

		/* returns true when card name contains relevant search text. This search should of course be non-case-sensitive,
		so everything is converted to upper case: */
		$scope.nameSearch = function(card) {
			return (card.name.toUpperCase().indexOf($scope.searchParams.nameSearchText.toUpperCase()) != -1);
		};

		/* Returns only cards with cost in the indicated range.
		Note that all 3 components of cost have to be between the maximum and minimum, because this is how cost comparisons work 
		in Dominion (costs of eg. 3 coins and of 2 coins and 1 potion are incomparable) */
		$scope.costSearch = function(card) {
			/* First we deal with Landmarks/Boons/Hexes/States. They fit awkwardly here, as they have no cost, being conditions 
			that potentially can effect all	players in the game. Best solution is to return them if, and only if, the cost search
			parameters are at their default settings: */
			var noCostTypes = ["Landmark", "Boon", "Hex", "State", "Artifact"]
			if (noCostTypes.indexOf(card.types[0])>-1) {
				if (($scope.searchParams.minCoinCost==0)&&($scope.searchParams.minPotionCost==0)
					&&($scope.searchParams.minDebtCost==0)&&($scope.searchParams.maxCoinCost==14)
					&&($scope.searchParams.maxPotionCost==1)&&($scope.searchParams.maxDebtCost==8)) {
					return true;
				}
				else return false;
			}
			else {
				return (card.costInCoins>=$scope.searchParams.minCoinCost && card.costInPotions>=$scope.searchParams.minPotionCost 
				&& card.costInDebt>=$scope.searchParams.minDebtCost	&& card.costInCoins<=$scope.searchParams.maxCoinCost 
				&& card.costInPotions<=$scope.searchParams.maxPotionCost && card.costInDebt<=$scope.searchParams.maxDebtCost);
			}
		};

		
		/* The "types" search only matches cards with ALL selected types (one might want to search for eg. all Action-Attack cards, 
		but there is not much use in wanting to see all Action cards AND all Attack cards) */
		$scope.typesSearch = function(card) {
			// first make array of the exact types to be included in search
			var desiredTypes = [];
			for (type in $scope.allTypes) {
				if ($scope.searchParams["is"+$scope.allTypes[type]+"Type"]) {
					desiredTypes.push($scope.allTypes[type]);
				}
			}
			//remove cards without all desired types
			for (type in desiredTypes) {
				if (card.types.indexOf(desiredTypes[type])==-1) {
					return false;
				}
			}
			return true;
		}
		
		/* this search should match all cards in ANY of the selected sets. This is to enable users to search just those cards 
		from the sets that they own, or are interested in */
		$scope.setFilter = function(card) {
			// assign card to be in Base set if it is in either first or second edition
			$scope.searchParams.inBase = ($scope.searchParams.inBaseFirstEd || $scope.searchParams.inBaseSecondEd);
		
			//same for Intrigue
			$scope.searchParams.inIntrigue = ($scope.searchParams.inIntrigueFirstEd || $scope.searchParams.inIntrigueSecondEd);

			return $scope.searchParams["in"+card.set];		
		} 

		/* the following 2 search functions implement the following:
		1) searches for specifically "above the line" or "below the line" text, if the checkbox is unticked
		2) 2 separate searches for text anywhere on the card, if the checkbox is ticked. 
		This allows users to search either one part of the card text, or the card as a whole */

		$scope.textAboveSearch = function(card) {
			// if checkbox is ticked, search whole card text for content of this first input box. 
			if ($scope.searchParams.allTextSearch) {
				return (((card.textAboveLine.toUpperCase().indexOf($scope.searchParams.aboveLineSearchText.toUpperCase()) != -1) || 
					(card.textBelowLine.toUpperCase().indexOf($scope.searchParams.aboveLineSearchText.toUpperCase()) != -1)));
			}
			// otherwise just search above the line
			else {
				return (card.textAboveLine.toUpperCase().indexOf($scope.searchParams.aboveLineSearchText.toUpperCase()) != -1);
			}
		};

		$scope.textBelowSearch = function(card) {
			// almost identical to above: if checkbox ticked, search both sections of card text, now for the second input box:
			if ($scope.searchParams.allTextSearch) {
				return (((card.textAboveLine.toUpperCase().indexOf($scope.searchParams.belowLineSearchText.toUpperCase()) != -1) ||
					(card.textBelowLine.toUpperCase().indexOf($scope.searchParams.belowLineSearchText.toUpperCase()) != -1)));
			}
			// if box unchecked, just search for text below the line
			else {
				return (card.textBelowLine.toUpperCase().indexOf($scope.searchParams.belowLineSearchText.toUpperCase()) != -1);
			}
		};

		// behaviour of "reset all search fields" button:
		$scope.clearAll = function() {
			$scope.clearNameSearch();
			// make sure all sets checkboxes are reticked
			$scope.toggleSets();
			if ($scope.searchParams.setsButtonText=="select") {
				$scope.toggleSets();
			}
			
			// Reset all other values, as their individual buttons do:
			$scope.resetCosts();
			$scope.clearTypes();
			$scope.clearNameSearch();
			$scope.clearTextSearch();
		}

		// function to actually run the search and display results:
		$scope.runSearch = function() {
			$scope.searchParams.searchResults = [];
			for (card in $scope.cardList) {
				if ($scope.nameSearch($scope.cardList[card]) && $scope.costSearch($scope.cardList[card]) 
					&& $scope.typesSearch($scope.cardList[card]) && $scope.setFilter($scope.cardList[card])
				 	&& $scope.textAboveSearch($scope.cardList[card]) && $scope.textBelowSearch($scope.cardList[card])) {
					$scope.searchParams.searchResults.push($scope.cardList[card]);
				}
			}
		}

	});