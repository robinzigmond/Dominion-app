// This service is used to store search data when the user leaves the page

angular.module("SearchValues", [])
	.factory("CardSearchValues", function() {
		CardSearchValues = {
			
			// set initial values, to be later changed by user

			// order cards by name initially
			orderProp: "name",
			
			// text searches have to be empty string to always find every card (in case the user is searching by other criteria)
			nameSearchText: "",
			aboveLineSearchText: "",
			belowLineSearchText: "",
			allTextSearch: true,

			// cost search defaults, the most inclusive ones possible:
			minCoinCost: "0",
			minPotionCost: "0",
			minDebtCost: "0",
			maxCoinCost: "14",
			maxPotionCost: "1",
			maxDebtCost: "8",

			// we do not want to filter by type initially
			isActionType: false,
			isTreasureType: false,
			isVictoryType: false,
			isCurseType: false,
			isAttackType: false,
			isDurationType: false,
			isReactionType: false,
			isPrizeType: false,
			isShelterType: false,
			isRuinsType: false,
			isLooterType: false,
			isKnightType: false,
			isReserveType: false,
			isTravellerType: false,
			isGatheringype: false,
			isCastleType: false,
			isEventType: false,
			isLandmarkType: false,

			// leave most sets blank - except one (Base 2nd Edition, as the most natural starting point now)
			inBasic: false,
			inBase: false,
			inBaseFirstEd: false,
			inBaseSecondEd: true, /* note that this is set to true (if all are set to false then there are no cards displayed when
			first using the search page, which could be a little confusing)*/
			inIntrigue: false,
			inIntrigueFirstEd: false,
			inIntrigueSecondEd: false,
			inSeaside: false,
			inAlchemy: false,
			inProsperity: false,
			inCornucopia: false,
			inHinterlands: false,
			inDarkAges: false,
			inGuilds: false,
			inAdventures: false,
			inEmpires: false,

			/* determine correct behaviour for "select/deselect all" button in the"sets" field. It should show the word "select" */
			selectOrDeselectSets: true, /* this value ensures that the button selects all sets, rather than deselects them, when
			clicked. See the Search Controller for details. */
			setsButtonText: "select"
		};
	
		return CardSearchValues;
	});