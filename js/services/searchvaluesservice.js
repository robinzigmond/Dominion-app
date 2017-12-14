// This service is used to store search data when the user leaves the page

angular.module("SearchValues", [])
	.factory("CardSearchValues", function() {
		CardSearchValues = {
			// set initial values, to be later changed by user

			/* search results should start displaying no cards (I have actually moved to preferring all cards to
			be displayed initially - but this is trickier to arrange within a service) */:
			searchResults: [],

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
			isNightType: false,
			isHeirloomType: false,
			isFateType: false,
			isDoomType: false,
			isSpiritType: false,
			isZombieType: false,
			isBoonType: false,
			isHexType: false,
			isStateType: false,

			// leave most sets blank - except one (Base 2nd Edition, as the most natural starting point now)
			inBasic: true,
			inBase: true,
			inBaseFirstEd: true,
			inBaseSecondEd: true, 
			inIntrigue: true,
			inIntrigueFirstEd: true,
			inIntrigueSecondEd: true,
			inSeaside: true,
			inAlchemy: true,
			inProsperity: true,
			inCornucopia: true,
			inHinterlands: true,
			inDarkAges: true,
			inGuilds: true,
			inAdventures: true,
			inEmpires: true,
			inNocturne: true,
			inPromos: true,

			/* determine correct behaviour for "select/deselect all" button in the"sets" field. It should show the word "select" */
			selectOrDeselectSets: false, /* this value ensures that the button deselects all sets, rather than selects them, when
			clicked. See the Search Controller for details. */
			setsButtonText: "deselect"
		};
		return CardSearchValues;
	});