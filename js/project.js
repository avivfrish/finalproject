var app = angular.module('template', []);

app.directive('fileModel', ['$parse', function ($parse) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function(){
				scope.$apply(function(){
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
}]);

		// We can write our own fileUpload service to reuse it in the controller
		app.service('fileUpload', ['$http', function ($http) {
			this.uploadFileToUrl = function(file, uploadUrl, name){
				var fd = new FormData();
				fd.append('file', file);
				fd.append('name', name);
				$http.post(uploadUrl, fd, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined,'Process-Data': false}
				})
				.success(function(data){
					console.log(data);

					console.log("Success");
				})
				.error(function(){
					console.log("Success");
				});
			}
		}]);
//		 myApp.controller('myCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){

app.controller('ng-cases', function ($scope, $http, $interval, fileUpload) {

	$scope.init_case = function (item) {
		//$("#nav").show();
        $scope.hidePages();
		$("#home").show();
        document.getElementById("loggin_user").innerHTML="Hello Avi";

        $scope.selectedCountryValue="";
        $scope.selectedStateValue="";
        $scope.selectedCityValue="";
        $scope.selectedStreetValue="";

        $scope.arrayOfCountries = [];
        //autocomplete(document.getElementById("myInput"), $scope.arrayOfCountries22);
        $scope.get_countries();
        $scope.arrayOfStates = [];
        $scope.arrayOfCities = [];
        $scope.arrayOfStreets = [];

        $scope.resultsOfSearch = [];
        console.log("hello");
	} //the function
	
    $scope.hidePages = function(){
        $("#home").hide();
        $("#search_compByName").hide();
        $("#search_compByCity").hide();
        $("#searchResults").hide();
    }

	$scope.show_search = function (searchBy) {
		console.log("show search div");
        $scope.hidePages();
        if (searchBy == 'name'){
            console.log("show search name");
            $("#search_compByName").show();
        }
        else {
            console.log("show search city");
            $("#search_compByCity").show();
            $("#stateOptions").hide();
            $("#cityOptions").hide();
            $("#streetOptions").hide();
            $("#loadingMap").hide();
        }

		//document.getElementById("open_caseOrIntell").innerHTML="<a href='#add_case_modal' id='open_caseOrIntell1' data-toggle='modal' data-target='#add_case_modal' ng-click='add_case_check_user_login();'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span>&nbsp; Add Case</a>"

		//$("#open_caseOrIntell").text("Add Case");
		//$("#open_caseOrIntell").target("#add_case_modal");
		//$("#open_caseOrIntell").href("#add_case_modal")
		//$("#topRow").empty();
		//$("#topRow").prepend("<embed src='http://SERVERNAME:8000/en-US/app/cymng/TopRowTimeline?earliest=0&latest=' seamless frameborder='no' scrolling='no' width='470px' height='103px' style='margin-top:10px' target='_top'></embed>"); 
	}

	$scope.show_home = function () {
		//show_cases_div - show cases div
		
		////console.log("show_cases_div - show cases div");
        $scope.hidePages();
		$("#home").show();
        console.log("Aviv");
		//document.getElementById("open_caseOrIntell").innerHTML="<a href='#add_case_modal' id='open_caseOrIntell1' data-toggle='modal' data-target='#add_case_modal' ng-click='add_case_check_user_login();'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span>&nbsp; Add Case</a>"

		//$("#open_caseOrIntell").text("Add Case");
		//$("#open_caseOrIntell").target("#add_case_modal");
		//$("#open_caseOrIntell").href("#add_case_modal")
		//$("#topRow").empty();
		//$("#topRow").prepend("<embed src='http://SERVERNAME:8000/en-US/app/cymng/TopRowTimeline?earliest=0&latest=' seamless frameborder='no' scrolling='no' width='470px' height='103px' style='margin-top:10px' target='_top'></embed>"); 
	}

	$scope.show_group = function (item) {
		console.log("obi");
		$("#groups").css("display","block");
		var request = $http({
			method: "POST",
			url:"php/init_case.php",
			data: $.param({
				id:item,
			}),
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}); //request
		request.success(function (data) {
			if (data != "0"){
				console.log('init_cases - success');
				$scope.cases=(data);
				console.log(data);
			}
			else {
				console.log('init_case - failed');
			}
		}); //success
		

	} //the funtion
	
    $scope.azure = function()
    {
        $http({
            method: 'POST',
            url: 'php/azure.php',
            params: {

            }
        }).then(function (data) {
            console.log(data.data);

        });

    }

	$scope.show_splunk = function () {

		console.log("show_splunk");
		console.log(document.getElementById("splunk").style.display);
		if(document.getElementById("splunk").style.display=='none')
		{

			document.getElementById("splunk").style.display="block";
		}		
		else
		{
			document.getElementById("splunk").style.display="none";
		}
	}

	$scope.get_companies = function ()
	{
		console.log("get_companies");
		console.log("Coral");
        console.log("Coral2");

        var rgequest = $http({
			method: "POST",
			url:"php/caspio.php",
			data: $.param({
				
			}),
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}); //request
		request.success(function (data) {
			if (data != "0"){
				
				$scope.companies=(data);
				console.log(data);
			}
			else {
				console.log('get companies failed');
			}
		}); //success
	}

	$scope.filterBy = function(filter){
	    console.log("FILTER", filter);
        document.getElementById("dropdownMenuLink").innerHTML = "Filter By: " + filter;
    }

    $scope.get_countries = function()
    {
        $http({
            method: 'POST',
            url: 'php/getCountries.php',
            params: {

            }
        }).then(function (data) {
        	console.log("GET COUNTRIES")
            console.log(data.data);
        	let countries = [];
        	for (const item in data.data){
        		countries.push(data.data[item]['country']);
			}
            $scope.arrayOfCountries = countries;
        });

    }

    $scope.getIframeSrc = function ()
    {
        $("#googleMap").hide();
        $("#loadingMap").show();
        console.log("LOAD")
        //document.getElementById("googleMap").innerHTML = '<div class="loader"></div>';
        //console.log("finishLOAD")
        if ( $scope.selectedStateValue ){
            const toFillIn = "<iframe src='https://www.google.com/maps?&q=" + $scope.selectedStateValue + ',' + $scope.selectedCountryValue + "&output=embed' width='100%' height='320' frameborder='0' style='border:0' allowfullscreen></iframe>";
            document.getElementById("googleMap").innerHTML = toFillIn;
        }
        else {
            const toFillIn = "<iframe src='https://www.google.com/maps?&q=" + $scope.selectedCountryValue + "&output=embed' width='100%' height='320' frameborder='0' style='border:0' allowfullscreen></iframe>";
            document.getElementById("googleMap").innerHTML = toFillIn;
        }
        $("#loadingMap").hide();
        $("#googleMap").show();
        console.log("FINISH LOAD")
        console.log($scope.selectedCountryValue);
    }

    $scope.getStatesByCountry = function (callback)
    {
        console.log("GET states")
        $http({
            method: 'POST',
            url: 'php/getStatesByCountry.php',
            params: {
                selectedCountry : $scope.selectedCountryValue
            }
        }).then(function (data) {
            console.log("GET states 2");
            console.log(data.data);
            let statesByCountry = [];
            for (const item in data.data){
                statesByCountry.push(data.data[item]['state']);
            }
            $scope.arrayOfStates = statesByCountry;
            console.log("LEN", $scope.arrayOfStates.length)
            callback($scope.arrayOfStates.length);
        });
    }

    $scope.getCities = function (callback)
    {
        console.log("GET cities")
        $http({
            method: 'POST',
            url: 'php/getCity.php',
            params: {
                selectedCountry : $scope.selectedCountryValue,
                selectedState : $scope.selectedStateValue
            }
        }).then(function (data) {
            console.log(data.data);
            let cities = [];
            for (const item in data.data){
                cities.push(data.data[item]['city']);
            }
            $scope.arrayOfCities = cities;
            console.log("LEN", $scope.arrayOfCities.length);
            callback($scope.arrayOfCities.length);
        });
    }

    $scope.changeCity = function (fromState)
    {
        $scope.selectedCityValue="";
        $scope.arrayOfCities = [];

        if(fromState === 'True' && $scope.selectedStateValue === ''){
            document.getElementById("cityOptions").style.display="none";
        }
        else {
            $scope.getCities(function(len) {
                if (len > 0){
                    console.log("SHOW CITY")
                    document.getElementById("cityOptions").style.display="block";
                }
                else {
                    console.log("HIDE CITY")
                    document.getElementById("cityOptions").style.display="none";
                }
            });
        }
    }

    $scope.getStreetByData = function (callback)
    {
        console.log("GET streets")
        $http({
            method: 'POST',
            url: 'php/getStreetByData.php',
            params: {
                selectedCountry : $scope.selectedCountryValue,
                selectedState : $scope.selectedStateValue,
                selectedCity : $scope.selectedCityValue
            }
        }).then(function (data) {
            console.log(data.data);
            let streets = [];
            for (const item in data.data){
                streets.push(data.data[item]['street']);
            }
            $scope.arrayOfStreets = streets;
            console.log("LEN", $scope.arrayOfStreets.length);
            callback($scope.arrayOfStreets.length);
        });
    }

    $scope.changeStreet = function ()
    {
        $scope.selectedStreetValue="";
        $scope.arrayOfStreets = [];

        $scope.getStreetByData(function(len) {
            if (len > 0){
                console.log("SHOW STREET")
                document.getElementById("streetOptions").style.display="block";
            }
            else {
                console.log("HIDE STREET")
                document.getElementById("streetOptions").style.display="none";
            }
        });
    }


    $scope.updateDataCountryChange = function (){
        $scope.selectedStateValue="";
        $scope.selectedCityValue="";
        $scope.selectedStreetValue="";

        $scope.arrayOfStates = [];
        $scope.arrayOfCities = [];
        $scope.arrayOfStreets = [];

        $scope.getStatesByCountry(function(len) {
            if (len > 0){
                console.log("SHOW STATE")
                document.getElementById("stateOptions").style.display="block";
            }
            else {
                console.log("HIDE STATE")
                document.getElementById("stateOptions").style.display="none";
                console.log("STATES IS EMPTY");
                $scope.changeCity('False');
            }
        });
    }

    $scope.searchForResults = function (searchBy)
    {
        $("#foundResults").hide();
        $("#noResults").hide();
        $("#searchResults").show();
        $("#loadingResults").show();

        let name, cik, id;
        if (searchBy == 'Name'){
            console.log("Search results for Name");
            name = document.getElementById("nameSearched").value;
            cik = document.getElementById("cikSearched").value;
            id = document.getElementById("idSearched").value;
        }

        $http({
            method: 'POST',
            url: 'php/getAddress.php',
            params: {
                searchBy : searchBy,
                name : name,
                cik : cik,
                id : id,
                country : $scope.selectedCountryValue,
                state : $scope.selectedStateValue,
                city : $scope.selectedCityValue,
                street : $scope.selectedStreetValue
            }
        }).then(function (data) {
            if(data.data.length > 0){
                console.log("GET Address");
                console.log(data.data);
                $scope.resultsOfSearch = data.data;
                console.log($scope.resultsOfSearch)
                $("#loadingResults").hide();
                $("#foundResults").show();
            }
            else {
                $("#loadingResults").hide();
                $("#noResults").show();
                console.log("NO RESULTS");
            }

        });
    }

    function autocomplete(inp, arr) {
        /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
        var currentFocus;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);
            /*for each item in the array...*/
            for (i = 0; i < arr.length; i++) {
                /*check if the item starts with the same letters as the text field value:*/
                if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    /*create a DIV element for each matching element:*/
                    b = document.createElement("DIV");
                    /*make the matching letters bold:*/
                    b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i].substr(val.length);
                    /*insert a input field that will hold the current array item's value:*/
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                    /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function(e) {
                        /*insert the value for the autocomplete text field:*/
                        inp.value = this.getElementsByTagName("input")[0].value;
                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode === 40) {
                /*If the arrow DOWN key is pressed,
                increase the currentFocus variable:*/
                currentFocus++;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode === 38) { //up
                /*If the arrow UP key is pressed,
                decrease the currentFocus variable:*/
                currentFocus--;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode === 13) {
                /*If the ENTER key is pressed, prevent the form from being submitted,*/
                e.preventDefault();
                if (currentFocus > -1) {
                    /*and simulate a click on the "active" item:*/
                    if (x) x[currentFocus].click();
                }
            }
        });
        function addActive(x) {
            /*a function to classify an item as "active":*/
            if (!x) return false;
            /*start by removing the "active" class on all items:*/
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            /*add class "autocomplete-active":*/
            x[currentFocus].classList.add("autocomplete-active");
        }
        function removeActive(x) {
            /*a function to remove the "active" class from all autocomplete items:*/
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
        }
        function closeAllLists(elmnt) {
            /*close all autocomplete lists in the document,
            except the one passed as an argument:*/
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }
        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
    }

});	 //app.controller

	
