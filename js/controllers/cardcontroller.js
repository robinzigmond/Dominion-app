angular.module("RouteControllerCard", [])
	.controller("CardController", function($scope, $http, $routeParams){
		var cardId = $routeParams.id;

		$http.get("js/data/cards.json")
			.then(function(results) {
				$scope.cardList = results.data;
				// grab information about selected card and store in thisCard object
				for (card in $scope.cardList) {
					if ($scope.cardList[card].name == cardId) {
						$scope.thisCard = $scope.cardList[card];
						break;
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
				if ($scope.thisCard.set == "DarkAges") {
					$scope.thisCard.set = "Dark Ages";
				}

				// pluralise "Type(s)" correctly depending on number of types card has:
				if ($scope.thisCard.types.length>1) $scope.typeOrTypes = "Types";
				else $scope.typeOrTypes = "Type";
				
				
				// to display the card's cost with the appropriate icons - define an array of objects, one for each icon needed.
				// each object has 2 properties: "path" giving the image location, and "text" giving a description in words
				// (in case the image doesn't load):
				$scope.costIcons = [];

				// coin icon needed if either coin cost is >0 or total cost is zero (copper, curse etc.)
				if ($scope.thisCard.costInCoins>0 || ($scope.thisCard.costInPotions==0 && $scope.thisCard.costInDebt==0)) {
					// if statement to catch a "starred" coin cost symbol (eg. Peddler, Prizes):
					if ($scope.thisCard.starredCost) {
						$scope.costIcons.push({path: "images/"+$scope.thisCard.costInCoins+"starcoins.png", 
							text: $scope.thisCard.costInCoins+" coins (starred)"});
					}
					else {
						$scope.costIcons.push({path: "images/"+$scope.thisCard.costInCoins+"coins.png", 
							text: $scope.thisCard.costInCoins+" coins"});
					}
				}
				//potion and debt icons only needed if that component of the cost is >0. No more than 1 potion is ever in the cost.
				if ($scope.thisCard.costInPotions>0) {
					$scope.costIcons.push({path: "images/potion.png", text: "potion"});
				}
				if ($scope.thisCard.costInDebt>0) {
					$scope.costIcons.push({path: "images/"+$scope.thisCard.costInDebt+"debt.png", text: $scope.thisCard.costInDebt+"debt"});
				}

				// replace relevant text on cards and in card explanations with the corresponding icons
				$http.get("js/data/icons.json")
					.then (function(results) {
						$scope.iconGlossary = results.data;
						for (icon in $scope.iconGlossary) {
							$scope.thisCard.textAboveLine = $scope.thisCard.textAboveLine.split(
							$scope.iconGlossary[icon].text).join($scope.iconGlossary[icon].html);
							$scope.thisCard.textBelowLine = $scope.thisCard.textBelowLine.split(
							$scope.iconGlossary[icon].text).join($scope.iconGlossary[icon].html);
							$scope.thisCard.discussion = $scope.thisCard.discussion.split(
							$scope.iconGlossary[icon].text).join($scope.iconGlossary[icon].html);
						}
					});

				// make each card name into a link
								
				for (card in $scope.cardList) {
					var name = $scope.cardList[card].name;
					// don't want links for references to the same card (looks too busy and adds nothing):
					if (name == $scope.thisCard.name) continue;
										
					// there is an issue with apostrophes in card names (eg. King's Court) which breaks the links
					// these need an alternative string to escape them inside the HTML
					var linkName = name.replace("'", "&#39");

					// ugly string construction to get correct HTML for link:
					var linkHTML = "<a href='/cards/" + linkName + "' alt='" + name + "'>" + name + "</a>";

					// only replace first reference to a card with link within the same section, to avoid visual clutter
					// (so use .replace instead of .split then .join)
					$scope.thisCard.textAboveLine = $scope.thisCard.textAboveLine.replace(name, linkHTML);
					$scope.thisCard.textBelowLine = $scope.thisCard.textBelowLine.replace(name, linkHTML);
					$scope.thisCard.discussion = $scope.thisCard.discussion.replace(name, linkHTML);
				}
				// the above code doesn't work quite correctly - sometimes it gives a link to a card whose name is contained in another's name
				// (eg. Gold when Fool's Gold is mentioned - see the Mine strategy discussion), when it is the "outer" card that should be
				// linked instead. I have tried to fix this issue, but it seems more subtle than I thought, and will take a fair bit of code.
				// I intend to come back to it when I have inputted all cards, then run a function to figure out all cards and the names
				// contained within them. Then I will use this data to "fix" all issues of this type.
				
				// attempt to implement "tooltips" (actually popovers, due to wanting mobile-friendly), but not working at the moment:
				$http.get("js/data/glossary.json")
					.then (function(results) {
						$scope.tooltipGlossary = results.data;
						for (entry in $scope.tooltipGlossary) {
							var tooltipHTML = "<span data-container='body' data-toggle='popover' data-content='"
							 + $scope.tooltipGlossary[entry].definition + "'>" + $scope.tooltipGlossary[entry].term + "</span>";
							$scope.thisCard.textAboveLine = $scope.thisCard.textAboveLine
							.replace($scope.tooltipGlossary[entry].term, tooltipHTML);
							$scope.thisCard.textBelowLine = $scope.thisCard.textBelowLine
							.replace($scope.tooltipGlossary[entry].term, tooltipHTML);
							$scope.thisCard.discussion = $scope.thisCard.discussion
							.replace($scope.tooltipGlossary[entry].term, tooltipHTML);
						}
						console.log($scope.thisCard.textAboveLine);
					});

			});
				
	});