angular.module("SearchFilter", [])
.filter("cardSearch", function() {
	return function(card) {

	return true; // card will match search if it passes all tests
	}
});

// not a pure function, because need to assign search inputs as parameters. Will probably have to alter as I write the filter.