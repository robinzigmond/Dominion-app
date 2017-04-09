/* the following service is used to simplify the code concerning extracting data from the various JSON files. It returns an object
whose methods are the different $http promises required */

angular.module("Data", [])
	.factory("GetData", function($http) {
		var allData = {
			cards: function() {return $http.get("js/data/cards.json");},
			icons: function() {return $http.get("js/data/icons.json");},
			glossary: function() {return $http.get("js/data/glossary.json");},
			sets: function() {return $http.get("js/data/sets.json");},
			types: function() {return $http.get("js/data/types.json");}
		};

		return allData;
	});