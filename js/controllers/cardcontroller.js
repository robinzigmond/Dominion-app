/* This controller requires an awful lot of code, even though there is little or no user interaction on the card pages.
This is because this single template codes for 386 different cards (and potentially more if new cards are ever released and I
add them to the database), and each card needs to have its information formatted correctly with the proper icons, links and
popovers. In addition, various additional string manipulations have been done to "prettify" the output on screen - doing simple
replacements of text strings by html resulted in "ugly"-looking output. These manipulations are explained when we reach the code to
fix them */

angular.module("RouteControllerCard", [])
	.controller("CardController", function($scope, $routeParams, GetData){
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

				// add placeholder text for cards with no strategy discussion yet:
				if ($scope.thisCard.discussion=="") {
					$scope.thisCard.discussion = "No further information about {{thisCard.name}} has been provided.";
				}

				// find correct orientation for card image (for giving the correct width in mobile devices)
				// Events and Landmarks are in landscape orientation, while all other cards are portrait:
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
				if ($scope.thisCard.types.length>1) {
					$scope.typeOrTypes = "Types";
				}
				else {
					$scope.typeOrTypes = "Type";
				}
				
				
				/* to display the card's cost with the appropriate icons - define an array of objects, one for each icon needed.
				each object has 2 properties: "path" giving the image location, and "text" giving a description in words
				(in case the image doesn't load): */
				$scope.costIcons = [];

				// coin icon needed if either coin cost is >0 or total cost is zero (copper, curse etc.)
				if ($scope.thisCard.costInCoins>0 || ($scope.thisCard.costInPotions==0 && $scope.thisCard.costInDebt==0)) {
					// if statement to catch a "starred" coin cost symbol (eg. Peddler, Prizes):
					if ($scope.thisCard.starredCost) {
						$scope.costIcons.push({path: "images/"+$scope.thisCard.costInCoins+"starcoins.png", 
							text: $scope.thisCard.costInCoins+" coins (starred) "});
					}
					// same with plus symbol on overpay cards:
					else if ($scope.thisCard.overpay) {
						$scope.costIcons.push({path: "images/"+$scope.thisCard.costInCoins+"+coins.png",
							text: $scope.thisCard.costInCoins+" (plus) coins "});
					}
					else {
						$scope.costIcons.push({path: "images/"+$scope.thisCard.costInCoins+"coins.png", 
							text: $scope.thisCard.costInCoins+" coins "}); // space to separate from next component if alt is needed
					}
				}
				//potion and debt icons only needed if that component of the cost is >0. No more than 1 potion is ever in the cost.
				if ($scope.thisCard.costInPotions>0) {
					$scope.costIcons.push({path: "images/potion.png", text: "potion"});
				}
				if ($scope.thisCard.costInDebt>0) {
					$scope.costIcons.push({path: "images/"+$scope.thisCard.costInDebt+"debt.png", 
						text: $scope.thisCard.costInDebt+" debt"});
				}

				//landmarks have no cost at all. Will just write "none" in that case:
				if ($scope.thisCard.types.indexOf("Landmark")>-1) {
					$scope.costIcons.push({text: "none"});
				}

				/* replace relevant text on cards and in card explanations with the corresponding icons (coin, potion, debt and VP
				icons): */
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
					

				// make each card name into a link:
				for (card in cardList) {
					var name = cardList[card].name;
															
					/* there is an issue with apostrophes in card names (eg. King's Court) which breaks the links. 
					The apostrophes need to be escaped them inside the HTML: */
					var linkName = name.replace("'", "&#39");

					// construct Javascript string which gives the correct HTML for the link:
					var linkHTML = "<a href='cards/" + linkName + "' alt='" + name + "'>" + name + "</a>";
					/* also defined a "pluralised" version - this is to avoid "ugly" links with pluralised card names which leave
					the final "s" out of the link */
					var pluralisedLinkHTML = "<a href='cards/" + linkName + "' alt='" + name + "'>" + name + "s" + "</a>";

					/* We only replace first reference to a card in each text with a link, to avoid visual clutter.	That
					means we can use .replace instead of .split().join()).

					I use square brackets around the name in the card database, to ensure the link only appears when I want it to!
					Before making this change there were big problemw with eg. Villa inside Village inside Native Village.

					Note that the "pluralised" version comes first in each case, otherwise the "ugly" version of the link
					is created first and not altered. */
					$scope.thisCard.textAboveLine = $scope.thisCard.textAboveLine.replace("["+name+"]"+"s", pluralisedLinkHTML);
					$scope.thisCard.textAboveLine = $scope.thisCard.textAboveLine.replace("["+name+"]", linkHTML);
					
					$scope.thisCard.textBelowLine = $scope.thisCard.textBelowLine.replace("["+name+"]"+"s", pluralisedLinkHTML);
					$scope.thisCard.textBelowLine = $scope.thisCard.textBelowLine.replace("["+name+"]", linkHTML);

					$scope.thisCard.discussion = $scope.thisCard.discussion.replace("["+name+"]"+"s", pluralisedLinkHTML);
					$scope.thisCard.discussion = $scope.thisCard.discussion.replace("["+name+"]", linkHTML);

				}

				// display popovers giving information about the set the card is from:
				GetData.sets()
					.then (function(results) {
						var setInfo = results.data;
						var specificSetInfo = setInfo[$scope.thisCard.set];
						/* escape apostrophes again (as it happens none of the texts contain more than one apostrophe, so it is OK
						to use .replace - but the following is the safest way to account for future changes: */
						specificSetInfo = specificSetInfo.split("'").join("&#39");
						/* construct HTML string containing uib-popover directive.  The "outsideClick" trigger is used so that the
						popover closes when the user clicks outside of it (although this does not work properly in Safari).
						Setting popover-append-to-body to true means that the popovers do not attempt to be the same width as the
						span element they are attached to - without this then in some cases the popover is so tall and narrow that
						it is nearly unreadable and extends off the viewport. Note finally that the default placement is
						"bottom-left" because that means that if any "overflow" from the page is generated then it at least extend
						off the right and/or bottom of the screen, which can in the worst case be read by scrolling. */
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
							// escape apostrophes again:
							specificTypeInfo = specificTypeInfo.split("'").join("&#39");
							// see comments above for the choice of attributes for this popover directive:
							var popoverHTML = "<span class='glossary-item' uib-popover='" + specificTypeInfo 
								+ "' popover-title='" + currentType + 
								"'popover-placement='auto bottom-left' popover-trigger='\"outsideClick\"' popover-animation='true' popover-append-to-body='true'>"
								+ currentType + "</span>";
							typesHtml.push(popoverHTML);
						}
						/* finally put array elements together as an html string. Multiple spaces are used in the joining string
						in order to give adequate spacing on the page:*/
						$scope.thisCard.typePopovers = typesHtml.join(",  ");
					});


				/* finally, display popovers taken from the "glossary" of common terms, on both parts of the card text and in my
				own "discussion" about the card */
				GetData.glossary()
					.then (function(results) {
						var glossary = results.data;
						for (entry in glossary) {
							// as usual escape any apostrophes in the text to be inserted into html
							glossary[entry].definition = glossary[entry].definition.split("'").join("&#39");
							/* for a cleaner visual impression, the popover trigger should be the entire word, rather than just 
							the bracketed term (eg. highlight "trashing" to trigger the glossary definition of "trash").
							The following code makes that happen, rather than blindly substituting parts of words
							The following function does this for each of the 3 relevant texts: */
							insertGlossaryPopovers = function(text, term, definition) {
								// first need to split the relevant texts into individual words:
								var words = text.split(" ");
								// then check if any contain the relevant glossary item, contained in the {} markup
								for (word in words) {
									if (words[word].indexOf("{"+term+"}")>-1) {
										var highlightedWord = words[word];
										/* remove the string "non-" from the start, if it is not part of the term itself (so eg. 
								   		"non-Victory" only highlights the word "Victory). Also remove a quote mark before 
								   		the term, which is used in some "discussion" strings: */
										if (highlightedWord.slice(0,5)=="non-{") {
											highlightedWord = highlightedWord.replace("non-{", "{");
										}
										if (highlightedWord.charAt(0)=="\"") {
											highlightedWord = highlightedWord.slice(1);
										}
										/* there is one slight problem with picking out "words" as the characters between spaces
										- any trailing full stops, commas or closing brackets get included in the popover trigger, 
										which does not look right at all. In order to fix this, the following lines strip out any 
										closing "unwanted" characters from the end of the string: */ 
										var unwantedCharactersEnd = [".", ",", ")", "\""];
										var length = highlightedWord.length;
										var lastCharacter = highlightedWord.charAt(length-1);
										/* loop to remove the last character if it is "unwanted", then repeat the process until the
										last character is acceptable: */
										while (unwantedCharactersEnd.indexOf(lastCharacter)>-1) {
											highlightedWord = highlightedWord.slice(0,length-1);
											length = highlightedWord.length;
											lastCharacter = highlightedWord.charAt(length-1);
										}

										// same for the start of the string:
										var unwantedCharactersStart = ["(", "\"", "+"];
										var firstCharacter = highlightedWord.charAt(0);
										while (unwantedCharactersStart.indexOf(firstCharacter)>-1) {
											highlightedWord = highlightedWord.slice(1);
											firstCharacter = highlightedWord.charAt(0);
										}

										/* in a few places I refer to an "action-based" or "money-based" strategy - it looks bad
										to have the whole word hyphenated word highlighted! */
										var length = highlightedWord.length;
										if (highlightedWord.slice(length-6)=="-based") {
											highlightedWord = highlightedWord.replace("-based", "");
										}
										// same with "action-heavy":
										if (highlightedWord.slice(length-6)=="-heavy") {
											highlightedWord = highlightedWord.replace("-heavy", "");
										}

										break; /* by design each glossary popover appears at most once in each text, so no need to
										waste time by continuing the loop */
									}
								}
								
								/* strip out the curly braces, as well as any asterisks used in place of spaces,
								in order to display the "pure" text to the user: */
								if (highlightedWord!=undefined) {
									var pureHighlightedWord = highlightedWord.split("{").join("").split("}").join("")
									.split("*").join(" ");
								}
								// remove asterisks from term used as popover title:
								term = term.split("*").join(" ");
								// Now we can use this entire word as the item to be replaced.
								// Definite html string for the popover, see the comments above for choice of attributes:
								var popoverHTML = "<span class='glossary-item' uib-popover='" + definition + "' popover-title='" 
								+ term 
								+ "' popover-placement='auto bottom-left' popover-trigger='\"outsideClick\"' popover-animation='true' popover-append-to-body='true'>"
								+ pureHighlightedWord + "</span>";
								// finally replace text with relevant html:
								return text.replace(highlightedWord, popoverHTML);
							}
							
							// finally apply the above function to each of the 3 relevant strings:
							$scope.thisCard.textAboveLine =
							insertGlossaryPopovers($scope.thisCard.textAboveLine, glossary[entry].term, glossary[entry].definition);
							$scope.thisCard.textBelowLine =
							insertGlossaryPopovers($scope.thisCard.textBelowLine, glossary[entry].term, glossary[entry].definition);
							$scope.thisCard.discussion =
							insertGlossaryPopovers($scope.thisCard.discussion, glossary[entry].term, glossary[entry].definition);
						}
					});
				});
			});
	});