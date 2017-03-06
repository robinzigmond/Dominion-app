// cost in Potions and Debt included to allow for easier handling of expansion cards (Alchemy, Empires) when they are added

var cardList = 

[
	{name: "Copper",
	 costInCoins: 0,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Treasure"],
	 set: "basic",
	 textAboveLine: "<coin1>.",
	 imagePath: "/../images/card_images/Copper.jpg"
	},

	{name: "Silver",
	 costInCoins: 3,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Treasure"],
	 set: "basic",
	 textAboveLine: "<coin2>.",
	 imagePath: "/../images/card_images/Silver.jpg"
	},

	{name: "Gold",
	 costInCoins: 6,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Treasure"],
	 set: "basic",
	 textAboveLine: "<coin3>.",
	 imagePath: "/../images/card_images/Gold.jpg"
	},

	{name: "Estate",
	 costInCoins: 2,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Victory"],
	 set: "basic",
	 textAboveLine: "1<VP>.",
	 imagePath: "/../images/card_images/Estate.jpg"
	},

	{name: "Duchy",
	 costInCoins: 5,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Victory"],
	 set: "basic",
	 textAboveLine: "3<VP>.",
	 imagePath: "/../images/card_images/Duchy.jpg"
	},

	{name: "Province",
	 costInCoins: 8,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Victory"],
	 set: "basic",
	 textAboveLine: "6<VP>.",
	 imagePath: "/../images/card_images/Province.jpg"
	},

	{name: "Curse",
	 costInCoins: 0,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Curse"],
	 set: "basic",
	 textAboveLine: "-1<VP>.",
	 imagePath: "/../images/card_images/Curse.jpg"
	},

	{name: "Cellar",
	 costInCoins: 2,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action"],
	 set: "base (both)",
	 textAboveLine: "+1 Action. Discard any number of cards, then draw that many.",
	 imagePath: "/../images/card_images/Cellar.jpg"
	},

	{name: "Chapel",
	 costInCoins: 2,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action"],
	 set: "base (both)",
	 textAboveLine: "Trash up to 4 cards from your hand.",
	 imagePath: "/../images/card_images/Chapel.jpg"
	},

	{name: "Moat",
	 costInCoins: 2,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action", "Reaction"],
	 set: "base (both)",
	 textAboveLine: "+2 Cards.",
	 textBelowLine: "When another player plays an Attack card, you may first reveal this from your hand, to be unaffected by it.",
	 imagePath: "/../images/card_images/Moat.jpg"
	},

	{name: "Harbinger",
	 costInCoins: 3,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action"],
	 set: "base (2nd)",
	 textAboveLine: "+1 Cards +1 Acion. Look through your discard pile. You may put a card from it onto your deck.",
	 imagePath: "/../images/card_images/Harbinger.jpg"
	},

	{name: "Merchant",
	 costInCoins: 3,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action"],
	 set: "base (2nd)",
	 textAboveLine: "+1 Cards +1 Acion. The first time you play a Silver this turn, +<coin1>.",
	 imagePath: "/../images/card_images/Merchant.jpg"
	},

	{name: "Vassal",
	 costInCoins: 3,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action"],
	 set: "base (2nd)",
	 textAboveLine: "+<coin2>. Discard the top card of your deck. If it's an Action card, you may play it.",
	 imagePath: "/../images/card_images/Vassal.jpg"
	},

	{name: "Village",
	 costInCoins: 3,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action"],
	 set: "base (both)",
	 textAboveLine: "+1 Card +2 Actions",
	 imagePath: "/../images/card_images/Village.jpg"
	},

	{name: "Workshop",
	 costInCoins: 3,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action"],
	 set: "base (both)",
	 textAboveLine: "Gain a card osting up to <coin4>.",
	 imagePath: "/../images/card_images/Workshop.jpg"
	},

	{name: "Bureaucrat",
	 costInCoins: 4,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action", "Attack"],
	 set: "base (both)",
	 textAboveLine: "Gain a Silver onto your deck. Each other player reveals a Victory card from their hand and puts it onto their deck (or reveals a hand with no Victory cards).",
	 imagePath: "/../images/card_images/Bureaucrat.jpg"
	},

	{name: "Gardens",
	 costInCoins: 4,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Victory"],
	 set: "base (both)",
	 textAboveLine: "Worth 1<VP> per 10 cards you have (round down).",
	 imagePath: "/../images/card_images/Gardens.jpg"
	},

	{name: "Militia",
	 costInCoins: 4,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action", "Attack"],
	 set: "base (both)",
	 textAboveLine: "+<coin2>. Each other player discards down to 3 cards in hand.",
	 imagePath: "/../images/card_images/Militia.jpg"
	},

	{name: "Moneylender",
	 costInCoins: 4,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action"],
	 set: "base (both)",
	 textAboveLine: "You may trash a Copper from your hand for +<coin3>.",
	 imagePath: "/../images/card_images/Moneylender.jpg"
	},

	{name: "Poacher",
	 costInCoins: 4,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action"],
	 set: "base (2nd)",
	 textAboveLine: "+1 Card +1 Action +<coin1>. Discard a card per empty Supply pile.",
	 imagePath: "/../images/card_images/Poacher.jpg"
	},

	{name: "Remodel",
	 costInCoins: 4,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action"],
	 set: "base (both)",
	 textAboveLine: "Trash a card from your hand. Gain a card costing up to <coin2> more than it.",
	 imagePath: "/../images/card_images/Remodel.jpg"
	},

	{name: "Smithy",
	 costInCoins: 4,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action"],
	 set: "base (both)",
	 textAboveLine: "+3 Cards.",
	 imagePath: "/../images/card_images/Smithy.jpg"
	},

	{name: "Throne Room",
	 costInCoins: 4,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action"],
	 set: "base (both)",
	 textAboveLine: "You may play an Action card from your hand twice.",
	 imagePath: "/../images/card_images/Throne_Room.jpg"
	},

	{name: "Bandit",
	 costInCoins: 5,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action", "Attack"],
	 set: "base (2nd)",
	 textAboveLine: "Gain a Gold. Each other player reveals the top 2 cards of their deck, trashes a revealed Treasure other than Copper, and discards the rest.",
	 imagePath: "/../images/card_images/Bandit.jpg"
	},

	{name: "Council Room",
	 costInCoins: 5,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action"],
	 set: "base (both)",
	 textAboveLine: "+4 Cards +1 Buy. Each other player draws a card.",
	 imagePath: "/../images/card_images/Council_Room.jpg"
	},

	{name: "Festival",
	 costInCoins: 5,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action"],
	 set: "base (both)",
	 textAboveLine: "+2 Actions +1 Buy +<coin2>.",
	 imagePath: "/../images/card_images/Festival.jpg"
	},

	{name: "Laboratory",
	 costInCoins: 5,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action"],
	 set: "base (both)",
	 textAboveLine: "+2 Cards +1 Action.",
	 imagePath: "/../images/card_images/Laboratory.jpg"
	},

	{name: "Library",
	 costInCoins: 5,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action"],
	 set: "base (both)",
	 textAboveLine: "Draw until you have 7 cards in hand, skipping any Action cards you choose to; set those aside, discarding them afterwards.",
	 imagePath: "/../images/card_images/Library.jpg"
	},

	{name: "Market",
	 costInCoins: 5,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action"],
	 set: "base (both)",
	 textAboveLine: "+1 Card +1 Action +1 Buy +<coin1>.",
	 imagePath: "/../images/card_images/Market.jpg"
	},

	{name: "Mine",
	 costInCoins: 5,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action"],
	 set: "base (both)",
	 textAboveLine: "You may trash a Treasure from your hand. Gain a Treasure to your hand costing up to <coin3> more than in.",
	 imagePath: "/../images/card_images/Mine.jpg"
	},

	{name: "Sentry",
	 costInCoins: 5,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action"],
	 set: "base (2nd)",
	 textAboveLine: "+1 Card +1 Action. Look at the top 2 cards of your deck. Trash and/or discard any number of them. Put the rest back on top in any order.",
	 imagePath: "/../images/card_images/Council_Room.jpg"
	},

	{name: "Witch",
	 costInCoins: 5,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action", "Attack"],
	 set: "base (both)",
	 textAboveLine: "+2 Cards. Each other player gains a Curse.",
	 imagePath: "/../images/card_images/Witch.jpg"
	},

	{name: "Artisan",
	 costInCoins: 6,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action"],
	 set: "base (2nd)",
	 textAboveLine: "Gain a card to your hand costing up to <coin5>. Put a card from your hand onto your deck.",
	 imagePath: "/../images/card_images/Artisan.jpg"
	},

	{name: "Chancellor",
	 costInCoins: 3,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action"],
	 set: "base (1st)",
	 textAboveLine: "+<coin2>. You may immediately put your deck into your discard pile.",
	 imagePath: "/../images/card_images/Chancellor.jpg"
	},

	{name: "Woodcutter",
	 costInCoins: 3,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action"],
	 set: "base (1st)",
	 textAboveLine: "+1 Buy +<coin2>.",
	 imagePath: "/../images/card_images/Woodcutter.jpg"
	},

	{name: "Feast",
	 costInCoins: 4,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action"],
	 set: "base (1st)",
	 textAboveLine: "Trash this card. Gain a card costing up to <coin5>.",
	 imagePath: "/../images/card_images/Feast.jpg"
	},

	{name: "Spy",
	 costInCoins: 4,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action", "Attack"],
	 set: "base (1st)",
	 textAboveLine: "+1 Card +1 Action. Each player (including you) reveals the top card of his deck and either discards it or puts it back, your choice.",
	 imagePath: "/../images/card_images/Spy.jpg"
	},

	{name: "Thief",
	 costInCoins: 4,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action", "Attack"],
	 set: "base (1st)",
	 textAboveLine: "Each other player reveals the top 2 cards of his deck. If they revealed any Treasure cards, they trash one of them that you choose. You may gain any or all of these trashed cards. They discard the other revealed cards.",
	 imagePath: "/../images/card_images/Thief.jpg"
	},

	{name: "Adventurer",
	 costInCoins: 6,
	 costInPotions: 0,
	 costInDebt: 0,
	 types: ["Action"],
	 set: "base (1st)",
	 textAboveLine: "Reveal cards from your deck until you reveal 2 Treasure cards. Put those Treasure cards into your hand and discard the other revealed cards.",
	 imagePath: "/../images/card_images/Adventurer.jpg"
	}
];