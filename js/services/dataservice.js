angular.module("Data", [])
	.factory("GetData", function($http) {
		var allData = {
			cards: function() {return $http.get("js/data/cards.json");},
			icons: function() {return $http.get("js/data/icons.json");},
			glossary: function() {return $http.get("js/data/glossary.json");}
		};

		return allData;
	});