angular.module("RouteControllerCard", [])
	.controller("CardController", function($scope, $routeParams, $sce, GetData){
		var cardId = $routeParams.id;

		GetData.cards()
			.then(function(results) {
				var cardList = results.data;
				// grab information about selected card and store in thisCard object
				for (card in cardList) {
					if (cardList[card].name == cardId) {
						$scope.thisCard = cardList[card];
						break;
					}
				}

				// find correct orientation for card image (for giving the correct width in mobile devices):
				if ($scope.thisCard.types.indexOf("Event")>-1 || $scope.thisCard.types.indexOf("Landmark")>-1) {
					$scope.thisCard.orientation = "landscape";
				}
				else {
					$scope.thisCard.orientation = "portrait";
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
				if ($scope.thisCard.set == "Promos") {
					$scope.thisCard.set = "Promo";
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
					// same with plus symbol on overpay cards:
					else if ($scope.thisCard.overpay) {
						$scope.costIcons.push({path: "images/"+$scope.thisCard.costInCoins+"+coins.png",
							text: $scope.thisCard.costInCoins+" (plus) coins"});
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

				//landmarks have no cost at all. Will just write "none" in that case:
				if ($scope.thisCard.types.indexOf("Landmark")>-1) {
					$scope.costIcons.push({text: "none"});
				}

				// replace relevant text on cards and in card explanations with the corresponding icons
				GetData.icons()
					.then (function(results) {
						var iconGlossary = results.data;
						for (icon in iconGlossary) {
							$scope.thisCard.textAboveLine = $scope.thisCard.textAboveLine.split(
							iconGlossary[icon].text).join(iconGlossary[icon].html);
							$scope.thisCard.textBelowLine = $scope.thisCard.textBelowLine.split(
							iconGlossary[icon].text).join(iconGlossary[icon].html);
							$scope.thisCard.discussion = $scope.thisCard.discussion.split(
							iconGlossary[icon].text).join(iconGlossary[icon].html);
						}
					

					// make each card name into a link
								
					for (card in cardList) {
						var name = cardList[card].name;
															
						// there is an issue with apostrophes in card names (eg. King's Court) which breaks the links
						// these need an alternative string to escape them inside the HTML
						var linkName = name.replace("'", "&#39");

						// ugly string construction to get correct HTML for link:
						var linkHTML = "<a href='/cards/" + linkName + "' alt='" + name + "'>" + name + "</a>";

						// only replace first reference to a card with link within the same section, to avoid visual clutter
						// (so use .replace instead of .split then .join)
						// also using square-brackets around the name, to ensure the link only appears when I want it to!
						// (problems previously with eg. Villa inside Village inside Native Village...)
						$scope.thisCard.textAboveLine = $scope.thisCard.textAboveLine.replace("["+name+"]", linkHTML);
						$scope.thisCard.textBelowLine = $scope.thisCard.textBelowLine.replace("["+name+"]", linkHTML);
						$scope.thisCard.discussion = $scope.thisCard.discussion.replace("["+name+"]", linkHTML);
					}

				// display popovers giving information about the set:
				GetData.sets()
					.then (function(results) {
						var setInfo = results.data;
						var specificSetInfo = setInfo[$scope.thisCard.set];
						specificSetInfo = specificSetInfo.replace("'", "&#39");
						var popoverHTML = "<span class='glossary-item' uib-popover='" + specificSetInfo 
								+ "' popover-title='" + $scope.thisCard.set + 
								"'popover-placement='auto bottom-left' popover-trigger='\"outsideClick\"' popover-animation='true' popover-append-to-body='true'>"
								+ $scope.thisCard.set + "</span>";
						$scope.thisCard.set = popoverHTML;
					});
				
				// display popovers for card types:
				GetData.types()
					.then(function(results) {
						var typeInfo = results.data;
						// make array whose entries are the popover html for each type that the card has:
						var typesHtml = [];
						for (type in $scope.thisCard.types) {
							var currentType = $scope.thisCard.types[type];
							var specificTypeInfo = typeInfo[currentType];
							specificTypeInfo = specificTypeInfo.split("'").join("&#39");
							var popoverHTML = "<span class='glossary-item' uib-popover='" + specificTypeInfo 
								+ "' popover-title='" + currentType + 
								"'popover-placement='auto bottom-left' popover-trigger='\"outsideClick\"' popover-animation='true' popover-append-to-body='true'>"
								+ currentType + "</span>";
							typesHtml.push(popoverHTML);
						}
						// finally put array elements together as an html string:
						$scope.thisCard.typePopovers = typesHtml.join(",  "); //multiple spaces to give better visual impression
					});


				GetData.glossary()
					.then (function(results) {
						var glossary = results.data;
						for (entry in glossary) {
							glossary[entry].definition = glossary[entry].definition.split("'").join("&#39");
							var popoverHTML = "<span class='glossary-item' uib-popover='" + glossary[entry].definition 
							+ "' popover-title='" + glossary[entry].term + 
							"' popover-placement='auto bottom-left' popover-trigger='\"outsideClick\"' popover-animation='true' popover-append-to-body='true'>"
							+ glossary[entry].term + "</span>";
							// use {} notation to mark glossary items in discussion text, where there is risk of collision of
							// several terms. BUT don't do this in actual card text - otherwise will interfere negatively with
							// the search function. (A user might want to search "+2 actions", and not miss all such cards because
							// the datafile actually lists the text as "+2 {actions}s").
							$scope.thisCard.textAboveLine = $scope.thisCard.textAboveLine
							.replace(glossary[entry].term, popoverHTML);
							$scope.thisCard.textBelowLine = $scope.thisCard.textBelowLine
							.replace(glossary[entry].term, popoverHTML);
							$scope.thisCard.discussion = $scope.thisCard.discussion
							.replace("{"+glossary[entry].term+"}", popoverHTML);
						}
					});
				});
			});
				
	});