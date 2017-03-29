// service used to store search data when the user leaves the page

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

			minCoinCost: "0",
			minPotionCost: "0",
			minDebtCost: "0",
			maxCoinCost: "14",
			maxPotionCost: "1",
			maxDebtCost: "8",

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

			inBasic: false,
			inBase: false,
			inBaseFirstEd: false,
			inBaseSecondEd: true, // show base set (2nd edition) cards when user goes to search page for first time
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

			// determine correct behaviour for "select/deselect all" button in "sets" field:
			selectOrDeselectSets: true,
			setsButtonText: "select"
		
		};
		
		return CardSearchValues;
});