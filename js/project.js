let app = angular.module('template', ['chart.js']);

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
        $scope.companies=[];
        forceListOption();
	} //the function

    $scope.hidePages = function(){
        $("#home").hide();
        $("#search_compByName").hide();
        $("#search_compByCity").hide();
        $("#searchResults").hide();
        $("#3ds").hide();
        $("#stats").hide();
    }

	$scope.show_search = function (searchBy) {
		console.log("show search div");
        $scope.hidePages();
        if (searchBy == 'name'){
            console.log("show search name");
            $("#search_compByName").show();
        }
        else {
            $scope.filterBySearchByName = 'None';
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
		$("#search_comp").hide();
		consol.log("Aviv");
		//document.getElementById("open_caseOrIntell").innerHTML="<a href='#add_case_modal' id='open_caseOrIntell1' data-toggle='modal' data-target='#add_case_modal' ng-click='add_case_check_user_login();'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span>&nbsp; Add Case</a>"

		//$("#open_caseOrIntell").text("Add Case");
		//$("#open_caseOrIntell").target("#add_case_modal");
		//$("#open_caseOrIntell").href("#add_case_modal")
		//$("#topRow").empty();
		//$("#topRow").prepend("<embed src='http://SERVERNAME:8000/en-US/app/cymng/TopRowTimeline?earliest=0&latest=' seamless frameborder='no' scrolling='no' width='470px' height='103px' style='margin-top:10px' target='_top'></embed>"); 
	};

    $scope.show_stats = function () {

        $("#home").hide();
        $("#search_comp").hide();
        $("#stats").show();
		$("#3ds").hide();

    };
	$scope.show_graph = function () {

		$("#home").hide();
		$("#search_comp").hide();
		$("#stats").hide();
		$("#3ds").show();
		$scope.graph();


	};
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
		

	}; //the funtion
	
    $scope.azure = function()
    {
        $http({
            method: 'POST',
            url: 'php/azure.php',
            params: {

            }
        }).then(function (data) {
            console.log(data.data);
            console.log("vfv");

        });

    };



	$scope.show_splunk = function () {

		console.log("show_splunk");
		console.log(document.getElementById("splunk").style.display);
		if(document.getElementById("splunk").style.display==="none")
		{

			document.getElementById("splunk").style.display="block";
		}		
		else
		{
			document.getElementById("splunk").style.display="none";
		}
	};

	$scope.graph = function(){
		const gData = {nodes: [{id: 64, group: 1}, {id: 192, group: 1}, {id: 2, group: 2}, {id: 419, group: 1}, {id: 260, group: 1}, {id: 165, group: 1}, {id: 39, group: 1}, {id: 200, group: 1}, {id: 103, group: 1}, {id: 265, group: 1}, {id: 11, group: 1}, {id: 432, group: 1}, {id: 336, group: 1}, {id: 308, group: 1}, {id: 21, group: 1}, {id: 278, group: 1}, {id: 407, group: 1}, {id: 412, group: 1}, {id: 125, group: 1}, {id: 31, group:1}],
			links: [{source: 64, target: 2}, {source: 192, target: 39}, {source: 192, target: 2}, {source: 2, target: 31}, {source: 2, target: 165}, {source: 2, target: 260}, {source: 2, target: 39}, {source: 2, target: 125}, {source: 2, target: 200}, {source: 2, target: 419}, {source: 2, target: 308}, {source: 2, target: 432}, {source: 2, target: 407}, {source: 2, target: 11}, {source: 2, target: 21}, {source: 2, target: 412}, {source: 2, target: 103}, {source: 2, target: 265}, {source: 2, target: 336}, {source: 2, target: 278}, {source: 260, target: 165}, {source: 260, target: 31}, {source: 260, target: 11}, {source: 260, target: 103}, {source: 260, target: 278}, {source: 200, target: 125}, {source: 103, target: 278}, {source: 265, target: 407}, {source: 265, target: 11}, {source: 265, target: 278}, {source: 11, target: 407}, {source: 11, target: 278}, {source: 308, target: 412}, {source: 21, target: 407}, {source: 21, target: 278}, {source: 278, target: 407}, {source: 125, target: 31}]}

		const Graph = ForceGraph3D()
		(document.getElementById('3d-graph'))
			//.jsonUrl('js/graph1.json')
			.nodeAutoColorBy('group')
			//.linkAutoColorBy(d => gData.nodes[d.source].group)
			.linkOpacity(0.5)
			.nodeLabel('id')
			.graphData(gData);



	}; //the function



	$scope.get_companies = function ()
	{
		console.log("get_companies");
		console.log("Coral");
        console.log("Coral2");

        $http({
            method: 'POST',
            url: 'php/get_companies_info.php',
            params: {

            }
        }).then(function (data) {
			if (data !== "0"){
                console.log(data);
				$scope.companies=(data.data);


                let letters = '0123456789ABCDEF';
                let color = '#';
                let colors=[];
                let data_comp=[];
                let label=[];
                for (let j=0;j<$scope.companies.length;j++)
                {
                    color = '#';
                    for (let i = 0; i < 6; i++ ) {
                        color += letters[Math.floor(Math.random() * 16)];
                    }
                    colors.push(color);
                    data_comp.push($scope.companies[j]['y']);
                    label.push($scope.companies[j]['name']);
                }

                console.log(colors);



                var ctx = document.getElementById("myPieChart").getContext("2d");





                var myPieChart = new Chart(ctx,{
                    type: 'pie',
                    data : {
                        datasets: [{
                            data: data_comp,
                            backgroundColor: colors
                        }],

                        // These labels appear in the legend and in the tooltips when hovering different arcs
                        labels: label,

                    },
                    options: {cutoutPercentage:0,legend:{display:true}},

                });

                document.getElementById("myPieChart").innerHTML=myPieChart;

				console.log($scope.companies);
			}
			else {
				console.log('get companies failed');
			}
		}); //success
	}

	$scope.filterBy = function(filter){
	    console.log("TEST");
	    console.log("FILTER", filter);
	    $scope.filterBySearchByName = filter;
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
        let newIframe = "<iframe src='https://www.google.com/maps?&q=";
        if( $scope.selectedStreetValue ){
            newIframe = newIframe + $scope.selectedStreetValue;
        }
        if( $scope.selectedCityValue ){
            if ($scope.selectedStreetValue){
                newIframe = newIframe + ',';
            }
            newIframe = newIframe + $scope.selectedCityValue;
        }
        if( $scope.selectedStateValue ){
            if ($scope.selectedStreetValue || $scope.selectedCityValue){
                newIframe = newIframe + ',';
            }
            newIframe = newIframe + $scope.selectedStateValue;
        }
        if( $scope.selectedCountryValue ){
            if ($scope.selectedStreetValue || $scope.selectedCityValue || $scope.selectedStateValue){
                newIframe = newIframe + ',';
            }
            newIframe = newIframe + $scope.selectedCountryValue;
        }

        newIframe = newIframe + "&output=embed' width='100%' height='320' frameborder='0' style='border:0' allowfullscreen></iframe>";
        document.getElementById("googleMap").innerHTML = newIframe;


        /*if ( $scope.selectedStateValue ){
            const toFillIn = "<iframe src='https://www.google.com/maps?&q=" + $scope.selectedStateValue + ',' + $scope.selectedCountryValue + "&output=embed' width='100%' height='320' frameborder='0' style='border:0' allowfullscreen></iframe>";
            document.getElementById("googleMap").innerHTML = toFillIn;
        }
        else {
            const toFillIn = "<iframe src='https://www.google.com/maps?&q=" + $scope.selectedCountryValue + "&output=embed' width='100%' height='320' frameborder='0' style='border:0' allowfullscreen></iframe>";
            document.getElementById("googleMap").innerHTML = toFillIn;
        }*/
        $("#loadingMap").hide();
        console.log("FINISH LOAD")
        $("#googleMap").show();
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
        const resultsElement = document.getElementById("searchResults");

        $("#foundResults").hide();
        $("#noResults").hide();
        $("#searchResults").show();
        $("#loadingResults").show();

        resultsElement.scrollIntoView({ behavior: 'smooth'});

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
                filterBy : $scope.filterBySearchByName,
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
                $("#askToSelectResult").show();
                $("#selectedResult").hide();
            }
            else {
                $("#loadingResults").hide();
                $("#noResults").show();
                console.log("NO RESULTS");
            }
            resultsElement.scrollIntoView({ behavior: 'smooth'});
        });
    }

    $scope.showMoreAboutResult = function (name) {
        $("#askToSelectResult").hide();
        $("#selectedResult").show();
        //document.getElementById("selectedResult").innerText = name;

    }

});	 //app.controller

	
