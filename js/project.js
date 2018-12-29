let app = angular.module('template', ['chart.js','angular-d3-word-cloud']);

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

app.controller('ng-cases', function ($scope, $http,$compile, $interval, fileUpload, $window, $element) {


	$scope.init_case = function () {
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

        $scope.distinctConnections = [];
        $scope.getDistinctConnections();

        $scope.resultsOfSearch = [];
        console.log("hello");
        $scope.companies=[];
        $scope.selectedCompany="";
        $scope.allUsers=[];
        $scope.get_user_session();
        $scope.arrayOfCompIDs = [];
        $scope.testArray = [];
        $scope.selectedIdValue = '';
        $scope.selectedCompDetails = '';
        $scope.selectedNewInfo = '';
        $scope.selectedUploadedFile = '';
        $scope.getCompIDs();
        $scope.admin_checkbox={};
	}; //the function

    $scope.get_user_session = function(){
        $http({
            method: 'POST',
            url: 'php/get_user_session.php',
            params: {

            }
        }).then(function (data) {
            console.log(data.data);

            //let ind=(data.data).indexOf("@");
            let user=(data.data)['user'];
            let full_name=(data.data)['full_name'];
            document.getElementById("loggin_user").innerHTML="Hello " + full_name;
            console.log("is admin" + (data.data)['isAdmin']);
            let isAdmin=(data.data)['isAdmin'];
            console.log("is?" + isAdmin);
            if (isAdmin===1)
            {
                console.log("vvfvfvfvf");
                document.getElementById("nav_update").innerHTML="<a class=\"nav-link\" href=\"#\" ng-click=\"\">\n" +
                    "                <span class=\"glyphicon glyphicon glyphicon-option-vertical\" aria-hidden=\"true\">\n" +
                    "                </span>\n" +
                    "            Update\n" +
                    "            </a>";


                angular.element(document.getElementById("navbar_admin")).append($compile("<a class=\"dropdown-item\"  href=\"#\" ng-click=\"nav_bar_admin();\" data-toggle=\"modal\" data-target=\"#admin_modal\">Admin</a>\n" +
                    "\t\t\t\t\t\t\t<a class=\"dropdown-item\" href=\"#\">\n" +
                    "\t\t\t\t\t\t\t\t<form action=\"/aviv/php/logout.php\">\n" +
                    "\t\t\t\t\t\t\t\t\t<button style=\"padding: 0;bottom: 0;\" type=\"submit\"  class=\"btn btn-link\">logout</button>\n" +
                    "\t\t\t\t\t\t\t\t</form> \n" +
                    "\t\t\t\t\t\t\t</a>")($scope));



            }
            else {
                angular.element(document.getElementById("navbar_admin")).append($compile(
                    "\t\t\t\t\t\t\t<a class=\"dropdown-item\" href=\"#\">\n" +
                    "\t\t\t\t\t\t\t\t<form action=\"/aviv/php/logout.php\">\n" +
                    "\t\t\t\t\t\t\t\t\t<button style=\"padding: 0;bottom: 0;\" type=\"submit\"  class=\"btn btn-link\">logout</button>\n" +
                    "\t\t\t\t\t\t\t\t</form> \n" +
                    "\t\t\t\t\t\t\t</a>")($scope));

            }



        });



    };

    $scope.hidePages = function(){
        $("#home").hide();
        $("#search_compByName").hide();
        $("#search_compByCity").hide();
        $("#searchResults").hide();
        $("#3ds").hide();
        $("#stats").hide();
        $("#loginForm").hide();
        $("#new_file").hide();
        $("#update_comp").hide();
        $("#delete_comp").hide();
        $("#new_comp").hide();
        $("#couldnt_add_new_comp").hide();
        $("#added_comp_successfully").hide();
        $("#deleted_comp_successfully").hide();
        $("#couldnt_delete_comp").hide();
        $("#updated_comp_successfully").hide();
        $("#couldnt_update_comp").hide();
        $("#id_already_exists_insert").hide();
        $("#id_doesnt_exists_delete").hide();
        $("#id_doesnt_exists_update").hide();
        $("#no_id_typed").hide();
        $("#added_file_successfully").hide();
        $("#couldnt_add_new_file").hide();
    };

    $scope.show_insert_new_comp = function () {
        console.log("SHOE INSERT NEW COMP");
        $scope.hidePages();
        $("#new_comp").show();
    };

    $scope.show_update_comp = function () {
        $scope.hidePages();
        $("#update_comp").show();
    };

    $scope.show_delete_comp = function () {
        $scope.hidePages();
        $("#delete_comp").show();
    };

    $scope.show_insert_new_file = function () {
        $("#new_file").show();
        $("#home").hide();
        $("#search_comp").hide();
        $("#delete_comp").hide();
        $("#update_comp").hide();
        $("#new_comp").hide();
        $("#couldnt_add_new_comp").hide();
        $("#added_comp_successfully").hide();
        $("#deleted_comp_successfully").hide();
        $("#couldnt_delete_comp").hide();
        $("#updated_comp_successfully").hide();
        $("#couldnt_update_comp").hide();
        $("#id_already_exists_insert").hide();
        $("#id_doesnt_exists_delete").hide();
        $("#id_doesnt_exists_update").hide();
        $("#no_id_typed").hide();
        $("#added_file_successfully").hide();
        $("#couldnt_add_new_file").hide();
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
	};

	$scope.show_home = function () {
		//show_cases_div - show cases div
		
		////console.log("show_cases_div - show cases div");
        $scope.hidePages();
		$("#home").show();

		//document.getElementById("open_caseOrIntell").innerHTML="<a href='#add_case_modal' id='open_caseOrIntell1' data-toggle='modal' data-target='#add_case_modal' ng-click='add_case_check_user_login();'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span>&nbsp; Add Case</a>"

		//$("#open_caseOrIntell").text("Add Case");
		//$("#open_caseOrIntell").target("#add_case_modal");
		//$("#open_caseOrIntell").href("#add_case_modal")
		//$("#topRow").empty();
		//$("#topRow").prepend("<embed src='http://SERVERNAME:8000/en-US/app/cymng/TopRowTimeline?earliest=0&latest=' seamless frameborder='no' scrolling='no' width='470px' height='103px' style='margin-top:10px' target='_top'></embed>"); 
	};

    $scope.show_stats = function () {
        $scope.hidePages();
        $("#stats").show();
        document.getElementById("ConnectionDoughnutChart").innerHTML = "" ;
        document.getElementById("IndustryDoughnutChart").innerHTML = "" ;
        document.getElementById("ProductsDoughnutChart").innerHTML = "" ;
        document.getElementById("stackedBar").innerHTML = "";
        $scope.showDoughnut();
        $scope.showBarChart();
        //$scope.showBarOfBiggestCompanyBySubsidiary();
        //$scope.showWordCloud();
    };

    $scope.nav_bar_admin = function () {
        console.log("nav bar");
        $http({
            method: 'POST',
            url: 'php/get_all_users.php',
            params: {

            }
        }).then(function (data) {
            $scope.allUsers=data.data;




        });




    };

    $scope.admin_save_changes = function () {
        var obi = $scope.allUsers;
        console.log(obi);

        $http({
            method: 'POST',
            url: 'php/set_user_admin.php',
            data: $.param({
                users: obi,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (data) {
            console.log(data.data);




        });




    };

	$scope.show_graph = function () {
        $scope.hidePages();
		$("#3ds").show();
		$scope.graph();


	};

    $scope.nav_bar_log_out = function () {
        var request = $http({
            method: "POST",
            url:"php/logout.php",
            data: $.param({

            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }); //request
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

    $scope.insertNewComp = function()
    {
        $scope.getCompIDs();
        console.log(document.getElementById("compID").value);
        console.log($scope.arrayOfCompIDs);
        $scope.clearAlerts();
        /*$http({
            method: 'POST',
            url: 'php/insertNewComp.php',
            params: {
                companyID: document.getElementById("compID").value,
                companyName: document.getElementById("compName").value,
                street: document.getElementById("compStreet").value,
                country: document.getElementById("compCountry").value,
                state: document.getElementById("compState").value
            }
        }).then(function (data) {
            console.log(data.data);
            console.log("hi");
            $scope.getCompIDs();
            console.log($scope.arrayOfCompIDs);
        });*/
        if (document.getElementById("compID").value in $scope.arrayOfCompIDs || $scope.arrayOfCompIDs[$scope.arrayOfCompIDs.length-1] == document.getElementById("compID").value) {
            $("#id_already_exists_insert").show();
            $("#couldnt_add_new_comp").hide();
            $("#added_comp_successfully").hide();
            $("#deleted_comp_successfully").hide();
            $("#couldnt_delete_comp").hide();
            $("#updated_comp_successfully").hide();
            $("#couldnt_update_comp").hide();
            $("#id_doesnt_exists_delete").hide();
            $("#id_doesnt_exists_update").hide();
            $("#no_id_typed").hide();
            $("#added_file_successfully").hide();
            $("#couldnt_add_new_file").hide();
        }
        else if (document.getElementById("compID").value == null || document.getElementById("compID").value == 0){
            $("#no_id_typed").show();
            $("#id_already_exists_insert").hide();
            $("#couldnt_add_new_comp").hide();
            $("#added_comp_successfully").hide();
            $("#deleted_comp_successfully").hide();
            $("#couldnt_delete_comp").hide();
            $("#updated_comp_successfully").hide();
            $("#couldnt_update_comp").hide();
            $("#id_doesnt_exists_delete").hide();
            $("#id_doesnt_exists_update").hide();
            $("#added_file_successfully").hide();
            $("#couldnt_add_new_file").hide();
        }
        else {
            $http({
                method: 'POST',
                url: 'php/insertNewComp.php',
                params: {
                    companyID: document.getElementById("compID").value,
                    companyName: document.getElementById("compName").value,
                    street: document.getElementById("compStreet").value,
                    country: document.getElementById("compCountry").value,
                    state: document.getElementById("compState").value
                }
            }).then(function (data) {
                console.log(data.data);
                if (data.data == 'true') {
                    $("#added_comp_successfully").show();
                    $("#couldnt_add_new_comp").hide();
                    $("#deleted_comp_successfully").hide();
                    $("#couldnt_delete_comp").hide();
                    $("#updated_comp_successfully").hide();
                    $("#couldnt_update_comp").hide();
                    $("#id_already_exists_insert").hide();
                    $("#id_doesnt_exists_delete").hide();
                    $("#id_doesnt_exists_update").hide();
                    $("#no_id_typed").hide();
                    $("#added_file_successfully").hide();
                    $("#couldnt_add_new_file").hide();
                }
                else if (data.data == 'false') {
                    $("#couldnt_add_new_comp").show();
                    $("#added_comp_successfully").hide();
                    $("#deleted_comp_successfully").hide();
                    $("#couldnt_delete_comp").hide();
                    $("#updated_comp_successfully").hide();
                    $("#couldnt_update_comp").hide();
                    $("#id_already_exists_insert").hide();
                    $("#id_doesnt_exists_delete").hide();
                    $("#id_doesnt_exists_update").hide();
                    $("#no_id_typed").hide();
                    $("#added_file_successfully").hide();
                    $("#couldnt_add_new_file").hide();
                }
                $scope.getCompIDs();
            });
        }

    };

    $scope.clearInsert = function()
    {
        document.getElementById('compID').value = '',
        document.getElementById('compName').value = '',
        document.getElementById('compStreet').value = '',
        document.getElementById('compCountry').value = '',
        document.getElementById('compState').value = ''
        $("#id_already_exists_insert").hide();
        $("#couldnt_add_new_comp").hide();
        $("#added_comp_successfully").hide();
        $("#deleted_comp_successfully").hide();
        $("#couldnt_delete_comp").hide();
        $("#updated_comp_successfully").hide();
        $("#couldnt_update_comp").hide();
        $("#id_doesnt_exists_delete").hide();
        $("#id_doesnt_exists_update").hide();
        $("#no_id_typed").hide();
    };

    $scope.clearUpdate = function()
    {
        document.getElementById('newInfo').value = ''
        $("#id_already_exists_insert").hide();
        $("#couldnt_add_new_comp").hide();
        $("#added_comp_successfully").hide();
        $("#deleted_comp_successfully").hide();
        $("#couldnt_delete_comp").hide();
        $("#updated_comp_successfully").hide();
        $("#couldnt_update_comp").hide();
        $("#id_doesnt_exists_delete").hide();
        $("#id_doesnt_exists_update").hide();
        $("#no_id_typed").hide();
    };

    $scope.getCompIDs = function()
    {
        $http({
            method: 'POST',
            url: 'php/getCompIDs.php',
            params: {

            }
        }).then(function (data) {
            console.log(data.data);
            let compIDs = [];
			for (const item in data.data) {
				compIDs.push(data.data[item]['ID'])
			}
			console.log(compIDs);
			$scope.arrayOfCompIDs = compIDs;
			console.log($scope.arrayOfCompIDs);
        });

    };

    $scope.deleteComp = function()
    {
        $scope.clearAlerts();
        $scope.getCompIDs();
        console.log($scope.selectedIdValue);
        if ($scope.selectedIdValue in $scope.arrayOfCompIDs /*|| $scope.arrayOfCompIDs[$scope.arrayOfCompIDs.length-1] == $scope.selectedIdValue*/) {
            $http({
                method: 'POST',
                url: 'php/deleteComp.php',
                params: {
                    selectedID : $scope.selectedIdValue
                }

            }).then(function (data) {
                console.log(data.data);
                if (data.data == 'true') {
                    $("#deleted_comp_successfully").show();
                    $("#couldnt_add_new_comp").hide();
                    $("#added_comp_successfully").hide();
                    $("#couldnt_delete_comp").hide();
                    $("#updated_comp_successfully").hide();
                    $("#couldnt_update_comp").hide();
                    $("#id_already_exists_insert").hide();
                    $("#id_doesnt_exists_delete").hide();
                    $("#id_doesnt_exists_update").hide();
                    $("#no_id_typed").hide();
                    $("#added_file_successfully").hide();
                    $("#couldnt_add_new_file").hide();
                }
                else if (data.data == 'false') {
                    $("#couldnt_delete_comp").show();
                    $("#couldnt_add_new_comp").hide();
                    $("#added_comp_successfully").hide();
                    $("#deleted_comp_successfully").hide();
                    $("#updated_comp_successfully").hide();
                    $("#couldnt_update_comp").hide();
                    $("#id_already_exists_insert").hide();
                    $("#id_doesnt_exists_delete").hide();
                    $("#id_doesnt_exists_update").hide();
                    $("#no_id_typed").hide();
                    $("#added_file_successfully").hide();
                    $("#couldnt_add_new_file").hide();
                }
                $scope.getCompIDs();
            });
        }
        else {
            $("#id_doesnt_exists_delete").show();
            $("#couldnt_add_new_comp").hide();
            $("#added_comp_successfully").hide();
            $("#deleted_comp_successfully").hide();
            $("#couldnt_delete_comp").hide();
            $("#updated_comp_successfully").hide();
            $("#couldnt_update_comp").hide();
            $("#id_already_exists_insert").hide();
            $("#id_doesnt_exists_update").hide();
            $("#no_id_typed").hide();
            $("#added_file_successfully").hide();
            $("#couldnt_add_new_file").hide();
        }

        $scope.getCompIDs();
    };

    $scope.changeID = function()
    {
        $scope.getCompIDs();
        document.getElementById('selectedID').value = '';
        $("#id_already_exists_insert").hide();
        $("#couldnt_add_new_comp").hide();
        $("#added_comp_successfully").hide();
        $("#deleted_comp_successfully").hide();
        $("#couldnt_delete_comp").hide();
        $("#updated_comp_successfully").hide();
        $("#couldnt_update_comp").hide();
        $("#id_doesnt_exists_delete").hide();
        $("#id_doesnt_exists_update").hide();
        $("#no_id_typed").hide();
    };

    $scope.clearAlerts = function()
    {
        $("#id_already_exists_insert").hide();
        $("#couldnt_add_new_comp").hide();
        $("#added_comp_successfully").hide();
        $("#deleted_comp_successfully").hide();
        $("#couldnt_delete_comp").hide();
        $("#updated_comp_successfully").hide();
        $("#couldnt_update_comp").hide();
        $("#id_doesnt_exists_delete").hide();
        $("#id_doesnt_exists_update").hide();
        $("#no_id_typed").hide();
    };

    $scope.updateComp = function()
    {
        $scope.clearAlerts();
        $scope.getCompIDs();
        if ($scope.selectedIdValue in $scope.arrayOfCompIDs || $scope.arrayOfCompIDs[$scope.arrayOfCompIDs.length-1] == $scope.selectedIdValue) {
            $http({
                method: 'POST',
                url: 'php/updateComp.php',
                params: {
                    selectedID : $scope.selectedIdValue,
                    compDetails : $scope.selectedCompDetails,
                    newInfo : $scope.selectedNewInfo
                }
            }).then(function (data) {
                console.log(data.data);
                if (data.data == 'true') {
                    $("#updated_comp_successfully").show();
                    $("#couldnt_add_new_comp").hide();
                    $("#added_comp_successfully").hide();
                    $("#deleted_comp_successfully").hide();
                    $("#couldnt_delete_comp").hide();
                    $("#couldnt_update_comp").hide();
                    $("#id_already_exists_insert").hide();
                    $("#id_doesnt_exists_delete").hide();
                    $("#id_doesnt_exists_update").hide();
                    $("#no_id_typed").hide();
                    $("#added_file_successfully").hide();
                    $("#couldnt_add_new_file").hide();
                }
                else if (data.data == 'false') {
                    $("#couldnt_update_comp").show();
                    $("#couldnt_add_new_comp").hide();
                    $("#added_comp_successfully").hide();
                    $("#deleted_comp_successfully").hide();
                    $("#couldnt_delete_comp").hide();
                    $("#updated_comp_successfully").hide();
                    $("#id_already_exists_insert").hide();
                    $("#id_doesnt_exists_delete").hide();
                    $("#id_doesnt_exists_update").hide();
                    $("#no_id_typed").hide();
                    $("#added_file_successfully").hide();
                    $("#couldnt_add_new_file").hide();
                }
                $scope.getCompIDs();
            });
        }
        else {
            $("#id_doesnt_exists_update").show();
            $("#couldnt_add_new_comp").hide();
            $("#added_comp_successfully").hide();
            $("#deleted_comp_successfully").hide();
            $("#couldnt_delete_comp").hide();
            $("#updated_comp_successfully").hide();
            $("#couldnt_update_comp").hide();
            $("#id_already_exists_insert").hide();
            $("#id_doesnt_exists_delete").hide();
            $("#no_id_typed").hide();
            $("#added_file_successfully").hide();
            $("#couldnt_add_new_file").hide();
        }
        $scope.getCompIDs();
    };

    $scope.uploadFile = function()
    {
        $scope.clearAlerts();
        console.log("hi");
        if (document.getElementById("replaceData").checked == true) {
            console.log("replace");
        }
        else if (document.getElementById("dontReplaceData").checked == true) {
            console.log("don't replace");
        }
        $http({
            method: 'POST',
            url: 'php/uploadFile.php',
            params: {
                selectedFile: document.getElementById("uploadedFile").value
            }
        }).then(function (data) {
            console.log(data.data);
            console.log("bye");
            let test = [];
            for (const item in data.data) {
                test.push(data.data[item]['name'])
            }
            $scope.testArray = test;
            console.log($scope.testArray);
            if (data.data == 'true') {
                console.log("yes");
                $("#added_file_successfully").show();
                $("#couldnt_add_new_comp").hide();
                $("#added_comp_successfully").hide();
                $("#deleted_comp_successfully").hide();
                $("#couldnt_delete_comp").hide();
                $("#couldnt_update_comp").hide();
                $("#id_already_exists_insert").hide();
                $("#id_doesnt_exists_delete").hide();
                $("#id_doesnt_exists_update").hide();
                $("#no_id_typed").hide();
                $("#updated_comp_successfully").hide();
                $("#couldnt_add_new_file").hide();
            }
            else if (data.data == 'false') {
                console.log("no");
                $("#couldnt_add_new_file").show();
                $("#couldnt_update_comp").hide();
                $("#couldnt_add_new_comp").hide();
                $("#added_comp_successfully").hide();
                $("#deleted_comp_successfully").hide();
                $("#couldnt_delete_comp").hide();
                $("#updated_comp_successfully").hide();
                $("#id_already_exists_insert").hide();
                $("#id_doesnt_exists_delete").hide();
                $("#id_doesnt_exists_update").hide();
                $("#no_id_typed").hide();
                $("#added_file_successfully").hide();
            }
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
		//const gData = {nodes: [{id: 64, group: 1}, {id: 192, group: 1}, {id: 2, group: 2}, {id: 419, group: 1}, {id: 260, group: 1}, {id: 165, group: 1}, {id: 39, group: 1}, {id: 200, group: 1}, {id: 103, group: 1}, {id: 265, group: 1}, {id: 11, group: 1}, {id: 432, group: 1}, {id: 336, group: 1}, {id: 308, group: 1}, {id: 21, group: 1}, {id: 278, group: 1}, {id: 407, group: 1}, {id: 412, group: 1}, {id: 125, group: 1}, {id: 31, group:1}],
		//	links: [{source: 64, target: 2}, {source: 192, target: 39}, {source: 192, target: 2}, {source: 2, target: 31}, {source: 2, target: 165}, {source: 2, target: 260}, {source: 2, target: 39}, {source: 2, target: 125}, {source: 2, target: 200}, {source: 2, target: 419}, {source: 2, target: 308}, {source: 2, target: 432}, {source: 2, target: 407}, {source: 2, target: 11}, {source: 2, target: 21}, {source: 2, target: 412}, {source: 2, target: 103}, {source: 2, target: 265}, {source: 2, target: 336}, {source: 2, target: 278}, {source: 260, target: 165}, {source: 260, target: 31}, {source: 260, target: 11}, {source: 260, target: 103}, {source: 260, target: 278}, {source: 200, target: 125}, {source: 103, target: 278}, {source: 265, target: 407}, {source: 265, target: 11}, {source: 265, target: 278}, {source: 11, target: 407}, {source: 11, target: 278}, {source: 308, target: 412}, {source: 21, target: 407}, {source: 21, target: 278}, {source: 278, target: 407}, {source: 125, target: 31}]};
        //const newData={ nodes: [{id: 'M&T BANK CORPORATION'}, {id: 'M&T BANK CORP'}, {id: 'JPMORGAN CHASE & CO.'}, {id: 'JPMORGAN CHASE & CO'}, {id: 'HUNTINGTON BANCSHARES INCORPORATED'}, {id: 'HUNTINGTON BANCSHARES INC'}, {id: 'BANK OF AMERICA CORPORATION'}, {id: 'BANK OF AMERICA CORP'}, {id: 'BB&T CORPORATION'}, {id: 'BB&T CORP'}, {id: 'STATE STREET CORPORATION'}, {id: 'STATE STREET CORP'}, {id: 'U.S. BANCORP'}, {id: 'US_BANCORP'}, {id: 'NORTHERN TRUST CORPORATION'}, {id: 'NORTHERN TRUST CORP'}, {id: 'COMERICA INCORPORATED'}, {id: 'COMERICA INC'}, {id: 'GENERAL ELECTRIC COMPANY'}, {id: 'GENERAL ELECTRIC CO'}, {id: 'AMERICAN EXPRESS COMPANY'}, {id: 'AMERICAN EXPRESS CO'}, {id: 'ALLY FINANCIAL INC.'}, {id: 'Ally Financial Inc'}, {id: 'CITIGROUP INC.'}, {id: 'CITIGROUP INC'}, {id: 'CAPITAL ONE FINANCIAL CORPORATION'}, {id: 'CAPITAL ONE FINANCIAL CORP'}, {id: 'BANK OF NEW YORK MELLON CORPORATION, THE'}, {id: 'Bank of New York Mellon Corp'}, {id: 'SCHWAB HOLDINGS, INC.'}, {id: 'SCHWAB_CHARLES_CORP '}, {id: 'SCHWAB RETIREMENT PLAN SERVICES, INC.'}, {id: 'SCHWAB RETIREMENT TECHNOLOGIES, INC.'}, {id: 'PERFORMANCE TECHNOLOGIES, INC.'}, {id: 'CHARLES SCHWAB BANK'}, {id: 'SCHWAB CAPITAL TRUST I'}, {id: 'CHARLES SCHWAB FOUNDATION'}, {id: 'CHARLES SCHWAB TRUST COMPANY'}, {id: 'VBC CAPITAL I'}, {id: 'ZIONS BANCORPORATION'}, {id: 'ZIONS FINANCIAL CORP.'}, {id: 'ZIONS CAPITAL TRUST B'}, {id: 'J.P. MORGAN CHASE COMMUNITY DEVELOPMENT CORPORATION'}, {id: 'J.P. MORGAN SERVICES INC.'}, {id: 'J.P. MORGAN FUTURES INC.'}, {id: 'J.P. MORGAN INVESTMENT MANAGEMENT INC.'}, {id: 'JPMORGAN SECURITIES HOLDINGS LLC'}, {id: 'CLINTSTONE PROPERTIES INC.'}, {id: 'CHASE LINCOLN FIRST COMMERCIAL CORPORATION'}, {id: 'CMRCC, INC.'}, {id: 'CHASE MANHATTAN REALTY LEASING CORPORATION'}, {id: 'J.P. MORGAN CHASE NATIONAL CORPORATE SERVICES, INC.'}, {id: 'CCC HOLDING INC.'}, {id: 'BANC ONE BUILDING MANAGEMENT CORPORATION'}, {id: 'BANC ONE FINANCIAL LLC'}, {id: 'BANC ONE KENTUCKY INSURANCE COMPANY'}, {id: 'J.P. MORGAN INTERNATIONAL HOLDINGS LLC'}, {id: 'CHATHAM VENTURES, INC.'}, {id: 'JPMP CAPITAL CORP.'}, {id: 'BANC ONE NEIGHBORHOOD DEVELOPMENT CORPORATION'}, {id: 'OFFSHORE EQUITIES, INC.'}, {id: 'NBD COMMUNITY DEVELOPMENT CORPORATION'}, {id: 'CHASE INVESTMENT SERVICES CORP.'}, {id: 'CHEMICAL INVESTMENTS, INC.'}, {id: 'J.P. MORGAN CAPITAL FINANCING LIMITED'}, {id: 'J.P. MORGAN PRIVATE INVESTMENTS INC.'}, {id: 'JPMP CAPITAL, LLC'}, {id: 'J.P. MORGAN GT CORPORATION'}, {id: 'J.P. MORGAN FUNDING CORP.'}, {id: 'MORSERV, INC.'}, {id: 'J.P. MORGAN VENTURES ENERGY CORPORATION'}, {id: 'BOI LEASING CORPORATION'}, {id: 'HATHERLEY INSURANCE LTD.'}, {id: 'BANC ONE DEFERRED BENEFITS CORPORATION'}, {id: 'JPMORGAN DISTRIBUTION SERVICES, INC.'}, {id: 'HAMBRECHT & QUIST CALIFORNIA'}, {id: 'J.P. MORGAN SERVICES ASIA HOLDINGS LIMITED'}, {id: 'ROBERT FLEMING HOLDINGS LIMITED'}, {id: 'JPMORGAN ASSET MANAGEMENT HOLDINGS INC.'}, {id: 'J.P. MORGAN CORPORATE SERVICES LIMITED'}, {id: 'PARK ASSURANCE COMPANY'}, {id: 'HOMESALES, INC.'}, {id: 'JPMORGAN SPECIAL SITUATIONS ASIA CORPORATION'}, {id: 'SPECIAL SITUATIONS INVESTING INC.'}, {id: 'BANC ONE CAPITAL HOLDINGS LLC'}, {id: 'J.P. MORGAN INSURANCE HOLDINGS, L.L.C.'}, {id: 'JPM INTERNATIONAL CONSUMER HOLDING INC.'}, {id: 'CHASE CAPITAL HOLDING CORPORATION'}, {id: 'JPMREP HOLDING CORPORATION'}, {id: 'JPMORGAN CHASE HOME MORTGAGE OF THE SOUTHEAST LLC'}, {id: 'J.P. MORGAN SERVICES ASIA HOLDINGS, INC.'}, {id: 'JPMORGAN CHASE BANK, DEARBORN'}, {id: 'JPMORGAN CHASE BANK, NATIONAL ASSOCIATION'}, {id: 'KEYCORP FINANCE INC.'}, {id: 'KEYCORP'}, {id: 'KEYCORP INSURANCE COMPANY, LTD.'}, {id: 'KEYCORP INSTITUTIONAL CAPITAL A'}, {id: 'KEYCORP INSTITUTIONAL CAPITAL B'}, {id: 'KEYCORP CAPITAL I'}, {id: 'KEYCORP CAPITAL II'}, {id: 'KEYCORP CAPITAL III'}, {id: 'KEYCORP CAPITAL V'}, {id: 'KEYCORP CAPITAL VI'}, {id: 'KEYCORP CAPITAL VII'}, {id: 'KEYCORP CAPITAL VIII'}, {id: 'KEYCORP CAPITAL IX'}, {id: 'KEYCORP CAPITAL X'}, {id: 'KEYCORP INSURANCE COMPANY, LLC'}, {id: 'KEYCORP OFFSHORE INVESTMENTS COMPANY, LTD.'}, {id: 'HUNTINGTON BANCSHARES FINANCIAL CORPORATION'}, {id: 'HUNTINGTON PREFERRED CAPITAL, INC.'}, {id: 'HUNTINGTON CAPITAL I'}, {id: 'HUNTINGTON CAPITAL II'}, {id: 'HUNTINGTON CAPITAL III'}, {id: 'HUNTINGTON CAPITAL IV'}, {id: 'HBI TITLE SERVICES, INC'}, {id: 'BFOH CAPITAL TRUST I'}, {id: 'SKY FINANCIAL CAPITAL TRUST I'}, {id: 'SYNORAN LLC'}, {id: 'HUNTINGTON INSURANCE, INC.'}, {id: 'PROSPECT TRUST I'}, {id: 'SKY FINANCIAL CAPITAL TRUST II'}, {id: 'SKY FINANCIAL CAPITAL TRUST III'}, {id: 'HUNTINGTON WEALTH PLANNING ADVISORS, INC.'}, {id: 'HUNTINGTON FINANCE LLC'}, {id: 'RIGGS CAPITAL'}, {id: 'PNC FINANCIAL SERVICES GROUP INC'}, {id: 'PNC CAPITAL TRUST C'}, {id: 'YARDVILLE CAPITAL TRUST II'}, {id: 'YARDVILLE CAPITAL TRUST III'}, {id: 'JAMES MONROE STATUTORY TRUST I'}, {id: 'STERLING FINANCIAL STATUTORY TRUST II'}, {id: 'JAMES MONROE STATUTORY TRUST II'}, {id: 'YARDVILLE CAPITAL TRUST V'}, {id: 'PNC CAPITAL TRUST D'}, {id: 'YARDVILLE CAPITAL TRUST VI'}, {id: 'STERLING FINANCIAL STATUTORY TRUST III'}, {id: 'STERLING FINANCIAL STATUTORY TRUST IV'}, {id: 'JAMES MONROE STATUTORY TRUST III'}, {id: 'FIDELITY CAPITAL TRUST II'}, {id: 'FIDELITY CAPITAL TRUST III'}, {id: 'STERLING FINANCIAL STATUTORY TRUST V'}, {id: 'MAF BANCORP CAPITAL TRUST I'}, {id: 'MAF BANCORP CAPITAL TRUST II'}, {id: 'NATIONAL CITY CAPITAL TRUST II'}, {id: 'NATIONAL CITY CAPITAL TRUST III'}, {id: 'NATIONAL CITY CAPITAL TRUST IV'}, {id: 'PNC CAPITAL TRUST E'}, {id: 'NATIONAL CITY CREDIT CORPORATION'}, {id: 'FIFTH THIRD FINANCIAL CORPORATION'}, {id: 'FIFTH THIRD BANCORP'}, {id: 'FIFTH THIRD CAPITAL TRUST IV'}, {id: 'FIFTH THIRD CAPITAL TRUST V'}, {id: 'FIFTH THIRD CAPITAL TRUST VI'}, {id: 'FIFTH THIRD CAPITAL TRUST VII'}, {id: 'BANK OF AMERICA MERRILL LYNCH INTERNATIONAL LIMITED'}, {id: 'RBI CAPITAL TRUST I'}, {id: 'MAINSTREET CAPITAL TRUST I'}, {id: 'PREMIER CAPITAL TRUST I'}, {id: 'FCNB CAPITAL TRUST'}, {id: 'BOSTON SERVICE COMPANY, INC.'}, {id: 'BB&T ASSET MANAGEMENT LLC'}, {id: 'MAIN STREET BANKS STATUTORY TRUST I'}, {id: 'MAIN STREET BANKS STATUTORY TRUST II'}, {id: 'BB&T CHARITABLE FOUNDATION'}, {id: 'FIRST CITIZENS BANCORP (TN) STATUTORY TRUST I'}, {id: 'NPB CAPITAL TRUST III'}, {id: 'NPB CAPITAL TRUST V'}, {id: 'FIRST CITIZENS BANCORP (TN) STATUTORY TRUST II'}, {id: 'BB&T CAPITAL TRUST I'}, {id: 'CMTY CAPITAL STATUTORY TRUST III'}, {id: 'CMTY CAPITAL STATUTORY TRUST IV'}, {id: 'BB&T SECURITIES, LLC'}, {id: 'BB&T CAPITAL PARTNERS FUND OF FUNDS I, LLC'}, {id: 'COASTAL FINANCIAL CAPITAL TRUST I'}, {id: 'AMCO HOLDING COMPANY'}, {id: 'NPB CAPITAL TRUST VI'}, {id: 'STATE STREET GLOBAL EXCHANGE (US) LLC'}, {id: 'STATE STREET CAPITAL TRUST I'}, {id: 'ADVANCED AUCTIONS LLC'}, {id: 'STATE STREET GLOBAL MARKETS (JAPAN)'}, {id: 'STATE STREET CORPORATION, INTERNATIONAL MANAGEMENT GROUP (IMG) LLC'}, {id: 'MANAGED PENSION FUNDS'}, {id: 'STATE STREET CAPITAL TRUST IV'}, {id: 'U.S. BANCORP INSURANCE SERVICES, LLC'}, {id: 'U.S. BANCORP INVESTMENTS, INC.'}, {id: 'U.S. BANK TRUST COMPANY, NATIONAL ASSOCIATION'}, {id: 'U.S. BANK NATIONAL ASSOCIATION ND'}, {id: 'VAIL BANKS STATUTORY TRUST I'}, {id: 'VAIL BANKS STATUTORY TRUST II'}, {id: 'U.S. BANCORP COMMUNITY INVESTMENT CORPORATION'}, {id: 'USB CAPITAL IX'}, {id: 'USB CAPITAL X'}, {id: 'USB CAPITAL XI'}, {id: 'USB CAPITAL XII'}, {id: 'USB CAPITAL XIII'}, {id: 'FIXED INCOME CLIENT SOLUTIONS LLC'}, {id: 'U.S. BANK NATIONAL ASSOCIATION'}, {id: 'FNL INSURANCE COMPANY, LTD'}, {id: 'WELLS FARGO & COMPANY'}, {id: 'WELLS FARGO WEALTH BROKERAGE INSURANCE AGENCY, LLC'}, {id: 'TRYON MANAGEMENT, INC.'}, {id: 'CENTRAL FIDELITY PROPERTIES, INC.'}, {id: 'WELLS FARGO PROPERTIES, INC.'}, {id: 'NORWEST VENTURE CAPITAL MANAGEMENT, INC.'}, {id: 'WELLS FARGO ASIA LIMITED'}, {id: 'PEREGRINE CAPITAL MANAGEMENT, INC.'}, {id: 'WELLS FARGO INSURANCE, INC.'}, {id: 'WACHOVIA PRIVATE CAPITAL, INC.'}, {id: 'CORESTATES HOLDINGS, INC.'}, {id: 'WACHOVIA DEVELOPMENT CORPORATION'}, {id: 'FIRST UNION COMMUNITY DEVELOPMENT CORPORATION'}, {id: 'WELLS FARGO CAPITAL FINANCE, INC.'}, {id: 'SUPERIOR GUARANTY INSURANCE COMPANY'}, {id: 'WELLS FARGO REGIONAL COMMUNITY DEVELOPMENT CORPORATION'}, {id: 'TRSTE, INC.'}, {id: 'HOME SERVICES TITLE REINSURANCE COMPANY'}, {id: 'WELLS FARGO INSURANCE SERVICES USA, INC.'}, {id: 'CHESTNUT ASSET MANAGEMENT, INC.'}, {id: 'RESIDENTIAL HOME MORTGAGE INVESTMENT, L.L.C.'}, {id: 'WACHOVIA INVESTORS, INC.'}, {id: 'WACHOVIA CAPITAL INVESTMENTS, INC.'}, {id: 'NORWEST EQUITY CAPITAL, L.L.C.'}, {id: 'WELLS FARGO ENERGY CAPITAL, INC.'}, {id: 'TRSTE II, INC.'}, {id: 'FIRST UNION CAPITAL I'}, {id: 'FIRST UNION CAPITAL II'}, {id: 'WACHOVIA CAPITAL TRUST I'}, {id: 'WACHOVIA CAPITAL TRUST II'}, {id: 'CENTRAL FIDELITY CAPITAL TRUST I'}, {id: 'WACHOVIA COMMUNITY DEVELOPMENT CORPORATION'}, {id: 'WACHOVIA CAPITAL TRUST V'}, {id: 'SAGUARO ASSET MANAGEMENT, INC.'}, {id: 'PRIMROSE ASSET MANAGEMENT, INC.'}, {id: 'GOLDENROD ASSET MANAGEMENT, INC.'}, {id: 'WELLS FARGO INTERNATIONAL INC.'}, {id: 'EVEREN CAPITAL CORPORATION'}, {id: 'WACHOVIA PREFERRED FUNDING HOLDING CORP.'}, {id: 'WFC HOLDINGS CORPORATION'}, {id: 'FIRST INTERNATIONAL ADVISORS, LLC'}, {id: 'FPFC MANAGEMENT LLC'}, {id: 'WELLS FARGO TRADE CAPITAL SERVICES, INC.'}, {id: 'NORWEST LIMITED LP, LLLP'}, {id: 'WELLS FARGO EXCHANGE SERVICES, INC.'}, {id: 'TIBERIUS VENTURES, L.L.C.'}, {id: 'AUGUSTUS VENTURES, L.L.C.'}, {id: 'BRYAN, PENDLETON, SWATS & MCALLISTER, LLC'}, {id: 'WELLS FARGO INVESTMENT GROUP, INC.'}, {id: 'FUNC HOLDINGS, INC.'}, {id: 'ACO BROKERAGE HOLDINGS CORPORATION'}, {id: 'FIRST COMMUNITY CAPITAL TRUST I'}, {id: 'STRUCTURED CREDIT PARTNERS, LLC'}, {id: 'WELLS FARGO CAPITAL IV'}, {id: 'WF DEFERRED COMPENSATION HOLDINGS, INC.'}, {id: 'WELLS FARGO CAPITAL V'}, {id: 'WELLS FARGO GAMING CAPITAL, LLC'}, {id: 'UNION HAMILTON REINSURANCE, LTD.'}, {id: 'WELLS FARGO COMMUNITY DEVELOPMENT CORPORATION'}, {id: 'WELLS FARGO CAPITAL VI'}, {id: 'SYNTHETIC FIXED-INCOME SECURITIES, INC.'}, {id: 'WACHOVIA PREFERRED FUNDING CORP.'}, {id: 'WELLS FARGO CAPITAL VII'}, {id: 'UNITED BANCORPORATION OF WYOMING CAPITAL TRUST I'}, {id: 'WELLS FARGO CAPITAL VIII'}, {id: 'CENTURY CAPITAL TRUST'}, {id: 'FIRST COMMUNITY CAPITAL TRUST III'}, {id: 'WELLS FARGO CAPITAL IX'}, {id: 'STRUCTURED ASSET INVESTORS, LLC'}, {id: 'BLUEPOINT HOLDINGS LIMITED'}, {id: 'PLACER STATUTORY TRUST III'}, {id: 'UNITED BANCORPORATION OF WYOMING CAPITAL TRUST II'}, {id: 'MACRO*WORLD RESEARCH CORPORATION'}, {id: 'WACHOVIA CAPITAL TRUST III'}, {id: 'EVERGREEN ALTERNATIVE CAPITAL, INC.'}, {id: 'WELLS FARGO CAPITAL X'}, {id: 'UNITED BANCORPORATION OF WYOMING CAPITAL TRUST III'}, {id: 'PLACER STATUTORY TRUST IV'}, {id: 'DANUBE HOLDINGS III C.V.'}, {id: 'WACHOVIA CAPITAL TRUST IV'}, {id: 'WACHOVIA CAPITAL INVESTORS, INC.'}, {id: 'WACHOVIA CAPITAL TRUST IX'}, {id: 'A.G. EDWARDS HEDGING SERVICES, INC.'}, {id: 'A.G. EDWARDS CAPITAL, INC.'}, {id: 'AGE CAPITAL HOLDING, INC.'}, {id: 'WDS HOLDINGS, INC.'}, {id: 'WACHOVIA CAPITAL TRUST X'}, {id: 'WELLS FARGO CAPITAL XI'}, {id: 'WELLS FARGO CAPITAL XII'}, {id: '2007 VENTO II, LLC'}, {id: 'FCB/SC CAPITAL TRUST II'}, {id: 'DFG HOLDINGS, LLC'}, {id: 'WELLS FARGO RELATIVE VALUE PORTFOLIO'}, {id: 'OVERLAND RELATIVE VALUE FUND LLC'}, {id: 'OVERLAND ADVISORS, LLC'}, {id: 'WELLS FARGO SOPORTE GLOBAL LIMITADA'}, {id: 'WELLS FARGO BANK, NATIONAL ASSOCIATION'}, {id: 'CAPITOL FINANCE GROUP, INC.'}, {id: 'RIDGEWORTH CAPITAL MANAGEMENT, INC.'}, {id: 'SUNTRUST BANKS INC'}, {id: 'NATIONAL COMMERCE CAPITAL TRUST I'}, {id: 'SUNTRUST CAPITAL I'}, {id: 'SUNTRUST CAPITAL III'}, {id: 'SUNTRUST DELAWARE TRUST COMPANY'}, {id: 'SUNTRUST CAPITAL IV'}, {id: 'SUNTRUST CAPITAL V'}, {id: 'GB&T BANCSHARES STATUTORY TRUST I'}, {id: 'SOUTHERN HERITAGE STATUTORY TRUST I'}, {id: 'NATIONAL COMMERCE CAPITAL TRUST II'}, {id: 'SUNTRUST PREFERRED CAPITAL I'}, {id: 'SUNTRUST INSTITUTIONAL INVESTMENT ADVISORS LLC'}, {id: 'SUNTRUST NLIP, INC.'}, {id: 'NTC CAPITAL I'}, {id: 'NTC CAPITAL II'}, {id: 'NORTHERN TRUST OF COLORADO CORPORATION'}, {id: 'NORTHERN TRUST GLOBAL INVESTMENTS JAPAN, K.K.'}, {id: 'NORTHERN TRUST EUROPEAN HOLDINGS LIMITED'}, {id: '50 SOUTH CAPITAL ADVISORS, LLC'}, {id: 'COMERICA CAPITAL TRUST I'}, {id: 'COMERICA CAPITAL TRUST II'}, {id: 'AMERICAN EXPRESS SERVICES EUROPE LIMITED'}, {id: 'AMERICAN EXPRESS FOUNDATION'}, {id: 'ALLY SECURITIES LLC'}, {id: 'BASIC CREDIT HOLDING COMPANY, L.L.C.'}, {id: 'ALLY INVESTMENT MANAGEMENT LLC'}, {id: 'ALLY US LLC'}, {id: 'GMACI HOLDINGS LLC'}, {id: 'VARIABLE ASSET RECEIVABLES LLC'}, {id: 'GAMMA AUTO RECEIVABLES LLC'}, {id: 'WHOLESALE AUTO RECEIVABLES LLC'}, {id: 'RESMOR CAPITAL CORPORATION'}, {id: 'CENTRAL ORIGINATING LEASE LLC'}, {id: 'RFC INVESTMENTS LIMITED'}, {id: 'AN CAPITAL CORPORATION'}, {id: 'MORGAN STANLEY & CO. LLC'}, {id: 'MORGAN STANLEY'}, {id: 'MORGAN STANLEY PRIVATE BANK, NATIONAL ASSOCIATION'}, {id: 'MORGAN STANLEY SENIOR FUNDING, INC.'}, {id: 'MORGAN STANLEY EMERGING MARKETS INC.'}, {id: 'MORGAN STANLEY TRUST NATIONAL ASSOCIATION'}, {id: 'MORGAN STANLEY SPECIAL SITUATIONS GROUP INC.'}, {id: 'MORGAN STANLEY ASSET FUNDING INC.'}, {id: 'MORGAN STANLEY INVESTMENT MANAGEMENT INC.'}, {id: 'MORGAN STANLEY COLLATERALIZED FINANCING LLC'}, {id: 'MORGAN STANLEY CAPITAL MANAGEMENT, LLC'}, {id: 'MORGAN STANLEY CREDIT PRODUCTS LTD.'}, {id: 'MORGAN STANLEY DESHKA LLC'}, {id: 'MORGAN STANLEY EUROPA LLC'}, {id: 'MORGAN STANLEY ASTI INVESTMENTS LLC'}, {id: 'MORGAN STANLEY BISCAY LLC'}, {id: 'MORGAN STANLEY PORTFOLIO MANAGEMENT LLC'}, {id: 'MORGAN STANLEY DURHAM INVESTMENTS LIMITED'}, {id: 'MORGAN STANLEY DURANGO LLC'}, {id: 'MORGAN STANLEY ELAN LLC'}, {id: 'MORGAN STANLEY GASTORO INVESTMENTS LIMITED'}, {id: 'MORGAN STANLEY DOVER INVESTMENTS LIMITED'}, {id: 'MORGAN STANLEY AMANU LLC'}, {id: 'MORGAN STANLEY GLOBAL FUNDING TRUST'}, {id: 'MS DAINFERN LLC'}, {id: 'MORGAN STANLEY BARBERA ONE LIMITED'}, {id: 'MORGAN STANLEY GRENACHE THREE LIMITED'}, {id: 'MORGAN STANLEY UK CAPITAL LIMITED'}, {id: 'MORGAN STANLEY OVERSEAS FINANCE LTD.'}, {id: 'MORGAN STANLEY PRINCIPAL FUNDING, INC.'}, {id: 'MORGAN STANLEY SECAP FUNDING, LLC'}, {id: 'MORGAN STANLEY INTERNATIONAL INCORPORATED'}, {id: 'MORGAN STANLEY CAPITAL GROUP INC.'}, {id: 'MORGAN STANLEY CAPITAL SERVICES LLC'}, {id: 'MS REVEL EFS LLC'}, {id: 'SHUKSAN LLC'}, {id: 'MS MELVILLE LLC'}, {id: 'SHAVANO COOPERATIEVE U.A.'}, {id: 'MORGAN STANLEY LOWMAN LIMITED'}, {id: 'MORGAN STANLEY GRENACHE TWO LIMITED'}, {id: 'BONAIRE COOPERATIEVE U.A.'}, {id: 'MORGAN STANLEY (JERSEY) LIMITED'}, {id: 'MORGAN STANLEY HEDGING CO. LTD.'}, {id: 'MORGAN STANLEY GRENACHE ONE LIMITED'}, {id: 'MORGAN STANLEY HOXNE'}, {id: 'MORGAN STANLEY CUMBRIA INVESTMENTS'}, {id: 'MORGAN STANLEY SYRAH ONE LIMITED'}, {id: 'MORGAN STANLEY REALTY INCORPORATED'}, {id: 'MORGAN STANLEY SHOREDITCH LIMITED'}, {id: 'MS ROSEBANK LLC'}, {id: 'MSDW OFFSHORE EQUITY SERVICES INC.'}, {id: 'MS 10020, INC.'}, {id: 'MS LION LLC'}, {id: 'MS PEGAU LLC'}, {id: 'MORGAN STANLEY WIND LLC'}, {id: 'MSRESS III, INC.'}, {id: 'SYCAMORE II, INC.'}, {id: 'MORGAN STANLEY INTERNATIONAL HOLDINGS INC.'}, {id: 'MAKATEA JV INC.'}, {id: 'MORGAN STANLEY DERIVATIVE PRODUCTS INC.'}, {id: 'MORGAN STANLEY SECURITIES INC.'}, {id: 'MORGAN STANLEY TINDUR LLC'}, {id: 'MORGAN STANLEY OCK'}, {id: 'SAENREDAM COOPERATIEVE U.A.'}, {id: 'MORGAN STANLEY MORTGAGE CAPITAL HOLDINGS LLC'}, {id: 'MORGAN STANLEY CAPITAL REIT INC.'}, {id: 'MORGAN STANLEY PREFERRED STRATEGIES INC.'}, {id: 'MS HOLDINGS INCORPORATED'}, {id: 'MSPEA HOLDINGS, INC.'}, {id: 'MSREF V, INC.'}, {id: 'MS LOW INCOME HOUSING CORPORATION'}, {id: 'STRATEGIC INVESTMENTS I, INC.'}, {id: 'COURNOT HOLDINGS INC.'}, {id: 'MSDW INTERNATIONAL EMPLOYEE SERVICES LLC'}, {id: 'MORGAN STANLEY INVESTMENT ADVISORS INC.'}, {id: 'MORGAN STANLEY FIXED INCOME VENTURES INC.'}, {id: 'MSREF IV, INC.'}, {id: 'MSDW PE/VC HOLDINGS, INC.'}, {id: 'MSDW CPIV HOLDINGS, INC.'}, {id: 'MORGAN STANLEY MUNICIPAL FUNDING INC.'}, {id: 'MSAM HOLDINGS II, INC.'}, {id: 'MORGAN STANLEY REAL ESTATE F FUNDING, INC.'}, {id: 'MORGAN STANLEY COMMERCIAL FINANCIAL SERVICES LLC'}, {id: 'FV-I, INC.'}, {id: 'MS LOW INCOME HOUSING II CORPORATION'}, {id: 'CAUCA LLC'}, {id: 'BELMONDO LLC'}, {id: 'MSIT HOLDINGS, INC.'}, {id: 'MSDW REAL ESTATE SPECIAL SITUATIONS II, INC.'}, {id: 'MORGAN STANLEY EQUITY SERVICES INC.'}, {id: 'MORGAN STANLEY AI GP LLC'}, {id: 'MORGAN STANLEY STRATEGIES LLC'}, {id: 'MORGAN STANLEY DARICA FUNDING, LLC'}, {id: 'MORGAN STANLEY DEAN WITTER EQUITY FUNDING, INC.'}, {id: 'MORGAN STANLEY STINGRAY LLC'}, {id: 'BAYVIEW HOLDING LTD.'}, {id: 'MORGAN STANLEY SHANKLIN LIMITED'}, {id: 'FUEGOS LLC'}, {id: 'MORGAN STANLEY RENEWABLES INC.'}, {id: 'MORGAN STANLEY ALTABRIDGE LTD.'}, {id: 'MORGAN STANLEY SMITH BARNEY HOLDINGS LLC'}, {id: 'MORGAN STANLEY FINANCE LLC'}, {id: 'MORGAN STANLEY CAPITAL TRUST VIII'}, {id: 'MORGAN STANLEY CAPITAL TRUST VII'}, {id: 'MORGAN STANLEY CAPITAL TRUST VI'}, {id: 'MORGAN STANLEY CAPITAL TRUST - C'}, {id: 'MORGAN STANLEY CAPITAL TRUST - B'}, {id: 'MORGAN STANLEY CAPITAL TRUST - A'}, {id: 'MORGAN STANLEY CAPITAL TRUST V'}, {id: 'MORGAN STANLEY CAPITAL TRUST IV'}, {id: 'MORGAN STANLEY CAPITAL TRUST III'}, {id: 'MSUH HOLDINGS I, INC.'}, {id: 'MORGAN STANLEY ABS CAPITAL I INC.'}, {id: 'MORGAN STANLEY ATLAS, INC.'}, {id: 'VENTURA HOLDINGS, INC.'}, {id: 'MORGAN STANLEY DISTRIBUTORS INC.'}, {id: 'MSDW VP IV HOLDINGS, INC.'}, {id: 'MSVP 2002, INC.'}, {id: 'MORGAN STANLEY CAPITAL I INC.'}, {id: 'MSDW CAPITAL PARTNERS IV, INC.'}, {id: 'MORGAN STANLEY VENTURE CAPITAL III, INC.'}, {id: 'MORGAN STANLEY PRIVATE EQUITY ASIA, INC.'}, {id: 'MORGAN STANLEY GLOBAL EMERGING MARKETS, INC.'}, {id: 'MORGAN STANLEY LEVERAGED EQUITY FUND II, INC.'}, {id: 'MORGAN STANLEY DEAN WITTER INTERNATIONAL INCORPORATED'}, {id: 'MORGAN STANLEY CAPITAL PARTNERS III, INC.'}, {id: 'MSREF V FUNDING, INC.'}, {id: 'MSDW VENTURE PARTNERS IV, INC.'}, {id: 'MSDW EFS HOLDINGS INC.'}, {id: 'MORGAN STANLEY COMMERCIAL MORTGAGE CAPITAL, INC.'}, {id: 'MSCP III HOLDINGS, INC.'}, {id: 'MORGAN STANLEY REAL ESTATE ADVISOR, INC.'}, {id: 'MORGAN STANLEY OVERSEAS SERVICES (JERSEY) LIMITED'}, {id: 'MS VENTURE CAPITAL HOLDING INC.'}, {id: 'PETTINGELL LLC'}, {id: 'MORGAN STANLEY REAL ESTATE INVESTMENT MANAGEMENT II, INC.'}, {id: 'MORGAN STANLEY DEVON INVESTMENTS LIMITED'}, {id: 'MORGAN STANLEY REAL ESTATE INVESTMENT MANAGEMENT INC.'}, {id: 'JAPAN CORE FUNDING, INC.'}, {id: 'MR VENTURES INC.'}, {id: 'PG INVESTORS II, INC.'}, {id: 'MORGAN STANLEY LEVERAGED EQUITY HOLDINGS INC.'}, {id: 'MSREF REAL ESTATE ADVISOR, INC.'}, {id: 'MSRE MEZZANINE, INC.'}, {id: 'MORGAN STANLEY REAL ESTATE FUNDING II, INC.'}, {id: 'MUSUM II LLC'}, {id: 'MORGAN STANLEY PRINCIPAL STRATEGIES, INC.'}, {id: 'MORGAN STANLEY FUND SERVICES INC.'}, {id: 'MS LOW INCOME HOUSING III CORPORATION'}, {id: 'MSDW EMERGING EQUITY, INC.'}, {id: 'MSREF III, INC.'}, {id: 'MSREF II, INC.'}, {id: 'MSDW STRATEGIC VENTURES INC.'}, {id: 'MORGAN STANLEY DOMESTIC LEASING INC.'}, {id: 'MSDW OIP INVESTORS, INC.'}, {id: 'MS HAWK I LLC'}, {id: 'MORGAN STANLEY SECURITIZATION FUNDING, INC.'}, {id: 'MORGAN STANLEY REINSURANCE ALPHA LTD.'}, {id: 'MORGAN STANLEY LIFE HOLDING INCORPORATED'}, {id: 'MORGAN STANLEY SERVICES CANADA HOLDING CORP.'}, {id: 'MORGAN STANLEY CONTENT CORPORATION'}, {id: 'EARLY ADOPTER FUND MANAGER INC.'}, {id: 'MORGAN STANLEY MAYAK LIMITED'}, {id: 'CORPORATE EQUIPMENT SUPPLIES, INC.'}, {id: 'MORGAN STANLEY GALWAY LLC'}, {id: 'MORGAN STANLEY BOSCASTLE HOLDING LIMITED'}, {id: 'PG HOLDINGS, INC.'}, {id: 'MORGAN STANLEY MALBEC LLC'}, {id: 'MORGAN STANLEY WHITE HORSE UK'}, {id: 'MORGAN STANLEY CAPITAL REIT IV INC.'}, {id: 'MS STRUCTURED ASSET CORP.'}, {id: 'MSEOF, INC.'}, {id: 'MSVP 2002 HOLDINGS, INC.'}, {id: 'MORGAN STANLEY GLOBAL STRATEGIES MANAGEMENT HOLDINGS, INC.'}, {id: 'MORGAN STANLEY BARENTS LLC'}, {id: 'TOOELE POWER, INC.'}, {id: 'WIWILI V LLC'}, {id: 'MORGAN STANLEY CAPITAL PRODUCTS LLC'}, {id: 'MORGAN STANLEY SECURED FINANCING LLC'}, {id: 'MSREI HOLDING, INC.'}, {id: 'MORGAN STANLEY NLE, LLC'}, {id: 'MORGAN STANLEY REINSURANCE LTD.'}, {id: 'MORGAN STANLEY STRUCTURED PRODUCTS (CAYMAN) LIMITED'}, {id: 'JOLTER INVESTMENTS INC.'}, {id: 'MS TECHNOLOGY HOLDINGS, INC.'}, {id: 'MORGAN STANLEY RISK SERVICES LLC'}, {id: 'MORGAN STANLEY SERVICES INC.'}, {id: 'MORGAN STANLEY COMMUNITY INVESTMENTS LLC'}, {id: 'CAPITAL ONE, NATIONAL ASSOCIATION'}, {id: 'NORTH FORK CAPITAL TRUST I'}, {id: 'NORTH FORK CAPITAL TRUST II'}, {id: 'CAPITAL ONE SECURITIES, INC.'}, {id: 'ING BANK, FSB'}, {id: 'RELIANCE CAPITAL TRUST I'}, {id: 'CAPITAL ONE SERVICES (CANADA) INC.'}, {id: 'COASTAL CAPITAL TRUST I'}, {id: 'COASTAL CAPITAL TRUST II'}, {id: 'CAPITAL ONE CAPITAL II'}, {id: 'CAPITAL ONE CAPITAL III'}, {id: 'CAPITAL ONE CAPITAL IV'}, {id: 'CAPITAL ONE CAPITAL V'}, {id: 'CAPITAL ONE CAPITAL VI'}, {id: 'CAPITAL ONE DIRECT SECURITIES, INC.'}, {id: 'GOLDMAN, SACHS & CO.'}, {id: 'GOLDMAN SACHS GROUP INC'}, {id: 'GOLDMAN SACHS BANK USA'}, {id: 'GOLDMAN, SACHS & CO. WERTPAPIER GMBH'}, {id: 'MTGLQ INVESTORS, L.P.'}, {id: 'GOLDMAN SACHS HEDGE FUND STRATEGIES LLC'}, {id: 'COMMONWEALTH ANNUITY AND LIFE INSURANCE COMPANY'}, {id: 'GOLDMAN SACHS CAPITAL II'}, {id: 'GS FINANCE CORP.'}, {id: 'OOO GOLDMAN SACHS BANK'}, {id: 'SPECIAL SITUATIONS INVESTING GROUP, INC.'}, {id: 'GS MORTGAGE SECURITIES CORP.'}, {id: 'GOLDMAN SACHS CAPITAL I'}, {id: 'EQUILEND HOLDINGS LLC'}, {id: 'BROAD STREET PRINCIPAL INVESTMENTS, L.L.C.'}, {id: 'DAESUNG INDUSTRIAL GASES CO., LTD.'}, {id: 'GSAM HOLDINGS LLC'}, {id: 'MELLON CAPITAL I'}, {id: 'MELLON CAPITAL II'}, {id: 'BNY CAPITAL I'}, {id: 'BNY INSTITUTIONAL CAPITAL TRUST A'}, {id: 'MIPA, LLC'}, {id: 'BNY MELLON DISTRIBUTORS HOLDINGS INC.'}, {id: 'BNY CAPITAL IV'}, {id: 'MCDI (HOLDINGS) LLC'}, {id: 'MELLON HOLDINGS LLC'}, {id: 'MAM (MA) HOLDING TRUST'}, {id: 'BNY CAPITAL V'}, {id: 'PERSHING GROUP LLC'}, {id: 'MELLON CAPITAL III'}, {id: 'MELLON CAPITAL IV'}, {id: 'BNY MELLON CLEARING, LLC'}, {id: 'BNY MELLON CSD'}, {id: 'BANK OF NEW CASTLE'}, {id: 'Discover Financial Services'}, {id: 'DISCOVER BANK'}, {id: 'DISCOVER FINANCIAL SERVICES (CANADA), INC.'}, {id: 'DFS SERVICES LLC'}, {id: 'DISCOVER FINANCIAL SERVICES (HONG KONG) LIMITED'}, {id: 'DISCOVER FINANCIAL SERVICES INSURANCE AGENCY, INC.'}, {id: 'CHARLES SCHWAB CORPORATION. THE'}, {id: 'GREAT WESTERN FINANCIAL CORPORATION'}, {id: 'GENERAL ELECTRIC CAPITAL CORPORATION'}, {id: 'HK RAV V PARTNERSHIP. THE'}, {id: 'YARDVILLE BRANCH'}, {id: 'BBANDT CORPORATION'}, {id: 'CUSTODIAL TRUST COMPANY'}, {id: 'JPMORGAN CHASE AND CO.'}, {id: 'NORTH AKARD STREET BRANCH'}, {id: 'WAUKEGAN OFFICE'}, {id: 'BRACEBRIDGE CORPORATION'}, {id: 'BANKBOSTON CAPITAL TRUST I'}, {id: 'ARCTURUS TRUSTEE LIMITED'}, {id: 'AVON 56 LIMITED'}, {id: 'FANDM TRUST COMPANY'}, {id: 'F AND H REALTY CORPORATION'}, {id: 'JPM CAPITAL TRUST I'}, {id: 'FREEDOM FINANCIAL LIFE INSURANCE COMPANY'}, {id: 'GALESBURG BRANCH'}, {id: 'BRINKLEY PLAZA BRANCH'}, {id: 'IBI AND ASSOCIATES'}, {id: 'GE CAPITAL DE MEXICO. S. DE R. L. DE C. V.'}, {id: 'BAY STATE CORPORATION LIMITED'}, {id: 'CREDIT AND ASSET REPACKAGING VEHICLE CORPORATION'}, {id: 'CITIBANK USA. NATIONAL ASSOCIATION'}, {id: 'MASON-DIXON CAPITAL TRUST'}, {id: 'NEW CENTURY FINANCIAL CORPORATION'}, {id: 'DALTON MAIN BRANCH'}, {id: 'CONESTOGA MANAGEMENT COMPANY'}, {id: 'CHIBA BANK. LTD.. THE'}, {id: 'GLOBAL ATLANTIC FINANCIAL GROUP LIMITED'}, {id: 'WILMINGTON TRUST CORPORATION'}, {id: 'CHASE MORTGAGE FINANCE CORPORATION'}, {id: 'WHITEHALL STREET GLOBAL REAL ESTATE LIMITED PARTNERSHIP 2001'}, {id: 'BRISTOL EXIT 7 BRANCH'}, {id: 'STERLING ASSURANCE COMPANY'}, {id: 'KENNEDY PLAZA'}, {id: 'CAPITAL ONE. NATIONAL ASSOCIATION'}, {id: 'SUMMIT COMMERCIAL LEASING CORPORATION'}, {id: '60 WALL STREET BRANCH'}, {id: 'BANC ONE ARIZONA INVESTMENT CORPORATION'}, {id: 'BNY MELLON COMMUNITY DEVELOPMENT CORPORATION'}, {id: 'MFI HOLDING CORPORATION'}, {id: 'FIRST SECURITY LEASING COMPANY'}, {id: '601 WEST 5TH STREET OFFICE'}, {id: 'LINCOLN FIRST REAL ESTATE CREDIT CORPORATION'}, {id: 'NEW YORK EQUITY FUND 1993 LIMITED PARTNERSHIP'}, {id: 'RICHMOND RIVERFRONT BRANCH'}, {id: 'CNB CAPITAL TRUST I'}, {id: 'SEATTLE BRANCH'}, {id: 'KATY BRANCH'}, {id: 'NATIONAL EQUITY FUND 2000'}, {id: 'VANCOUVER MAIN OFFICE'}, {id: 'SUMMIT CAPITAL TRUST I'}, {id: 'MBC FINANCIAL CORPORATION'}, {id: 'CAPITAL ONE BANK (USA). NATIONAL ASSOCIATION'}, {id: 'ONYX ACCEPTANCE CORPORATION'}, {id: 'COASTAL PLANNERS HOLDING CORPORATION'}, {id: 'COMMUNITY HISTORIC CREDIT FUND V LIMITED PARTNERSHIP'}, {id: 'PNC FINANCIAL SERVICES GROUP. INC.. THE'}, {id: 'BROAD STREET DOWNTOWN'}, {id: 'ADAM CAPITAL TRUST I'}, {id: 'SPARTANBURG MAIN BRANCH'}, {id: 'B OF A ISSUANCE B.V.'}, {id: 'RECEIVABLES-ONLINE CORPORATION'}, {id: 'FIRST SECURITY CORPORATION'}, {id: 'CHASE INTERNATIONAL CAPITAL FINANCE LIMITED'}, {id: 'BANK OF TOKYO-MITSUBISHI UFJ. LTD.. THE'}, {id: 'DREYFUS CORPORATION. THE'}, {id: 'LOUISVILLE MAIN OFFICE'}, {id: 'GENERAL ELECTRIC CREDIT CORPORATION OF TENNESSEE'}, {id: 'SKY BANK'}, {id: 'SECURITY-FIRST COMPANY'}, {id: 'HYATT HOTELS CORPORATION'}, {id: 'NEW YORK EQUITY FUND 1994 LIMITED PARTNERSHIP'}, {id: 'BOSTON BRANCH'}, {id: 'BANKAMERICA CORPORATION'}, {id: 'CHASE CAPITAL VII'}, {id: 'WEST SUBSIDIARY CORPORATION'}, {id: 'BAC CAPITAL TRUST XI'}, {id: 'MAM (DE) TRUST'}, {id: 'BLC BANK NATIONAL ASSOCIATION'}, {id: 'GENERAL ELECTRIC CREDIT AND LEASING CORPORATION'}, {id: 'REAL ESTATE COLLATERAL MANAGEMENT COMPANY'}, {id: 'BELMONT FINANCIAL NETWORK'}, {id: 'RIVERTON STATE BANK HOLDING COMPANY'}, {id: 'MUSTANG FINANCIAL CORPORATION'}, {id: 'GE CAPITAL TRADE SERVICES. LIMITED'}, {id: 'PINEDALE BRANCH'}, {id: 'ALCYONE CORPORATION'}, {id: 'MCKNIGHT BRANCH'}, {id: 'GE CAPITAL ASSIGNMENT CORPORATION'}, {id: 'EQUITY ASSET INVESTMENT TRUST'}, {id: 'GE CAPITAL COMMERCIAL MORTGAGE CORPORATION'}, {id: 'NOBILITY HILL REALTY TRUST'}, {id: 'NORTHERN TRUST COMPANY OF DELAWARE. THE'}, {id: 'ISM'}, {id: 'ONE PERCENT HOLDING CORPORATION'}, {id: 'BA CONTINUUM MANAGEMENT LIMITED'}, {id: 'CHESTERTOWN BRANCH'}, {id: 'HAMBRECHT AND QUIST GROUP'}, {id: 'ARIEL CAPITAL REINSURANCE COMPANY. LIMITED'}, {id: 'STATE STREET SOUTHERN AFRICA PROPRIETARY LIMITED'}, {id: 'FARMINGTON NM BRANCH'}, {id: 'SALT LAKE CITY BRANCH'}, {id: 'MICHIGAN FINANCIAL CORPORATION'}, {id: 'FALCON AUTO DEALERSHIP LOAN TRUST 2001-1'}, {id: 'MILLSBORO BRANCH'}, {id: 'HELLER LDA.'}, {id: 'PIONEER CREDIT CORPORATION'}, {id: 'SENIOR HOUSING CRIME PREVENTION FOUNDATION INVESTMENT CORPORATION'}, {id: 'SPRINGFIELD GA BRANCH'}],
        //    links: [{label: 'Affiliate', source: 'M&T BANK CORPORATION', target: 'M&T BANK CORP'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO.', target: 'JPMORGAN CHASE & CO'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'J.P. MORGAN CHASE COMMUNITY DEVELOPMENT CORPORATION'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'J.P. MORGAN SERVICES INC.'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'J.P. MORGAN FUTURES INC.'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'J.P. MORGAN INVESTMENT MANAGEMENT INC.'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'JPMORGAN SECURITIES HOLDINGS LLC'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'CLINTSTONE PROPERTIES INC.'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'CHASE LINCOLN FIRST COMMERCIAL CORPORATION'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'CMRCC, INC.'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'CHASE MANHATTAN REALTY LEASING CORPORATION'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'J.P. MORGAN CHASE NATIONAL CORPORATE SERVICES, INC.'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'CCC HOLDING INC.'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'BANC ONE BUILDING MANAGEMENT CORPORATION'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'BANC ONE FINANCIAL LLC'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'BANC ONE KENTUCKY INSURANCE COMPANY'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'J.P. MORGAN INTERNATIONAL HOLDINGS LLC'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'CHATHAM VENTURES, INC.'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'JPMP CAPITAL CORP.'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'BANC ONE NEIGHBORHOOD DEVELOPMENT CORPORATION'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'OFFSHORE EQUITIES, INC.'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'NBD COMMUNITY DEVELOPMENT CORPORATION'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'CHASE INVESTMENT SERVICES CORP.'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'CHEMICAL INVESTMENTS, INC.'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'J.P. MORGAN CAPITAL FINANCING LIMITED'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'J.P. MORGAN PRIVATE INVESTMENTS INC.'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'JPMP CAPITAL, LLC'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'J.P. MORGAN GT CORPORATION'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'J.P. MORGAN FUNDING CORP.'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'MORSERV, INC.'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'J.P. MORGAN VENTURES ENERGY CORPORATION'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'BOI LEASING CORPORATION'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'HATHERLEY INSURANCE LTD.'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'BANC ONE DEFERRED BENEFITS CORPORATION'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'JPMORGAN DISTRIBUTION SERVICES, INC.'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'HAMBRECHT & QUIST CALIFORNIA'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'J.P. MORGAN SERVICES ASIA HOLDINGS LIMITED'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'ROBERT FLEMING HOLDINGS LIMITED'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'JPMORGAN ASSET MANAGEMENT HOLDINGS INC.'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'J.P. MORGAN CORPORATE SERVICES LIMITED'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'PARK ASSURANCE COMPANY'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'HOMESALES, INC.'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'JPMORGAN SPECIAL SITUATIONS ASIA CORPORATION'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'SPECIAL SITUATIONS INVESTING INC.'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'BANC ONE CAPITAL HOLDINGS LLC'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'J.P. MORGAN INSURANCE HOLDINGS, L.L.C.'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'JPM INTERNATIONAL CONSUMER HOLDING INC.'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'CHASE CAPITAL HOLDING CORPORATION'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'JPMREP HOLDING CORPORATION'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'JPMORGAN CHASE HOME MORTGAGE OF THE SOUTHEAST LLC'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'J.P. MORGAN SERVICES ASIA HOLDINGS, INC.'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'JPMORGAN CHASE BANK, DEARBORN'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'JPMORGAN CHASE BANK, NATIONAL ASSOCIATION'}, {label: 'Affiliate', source: 'JPMORGAN CHASE & CO', target: 'AN CAPITAL CORPORATION'}, {label: 'Affiliate', source: 'HUNTINGTON BANCSHARES INCORPORATED', target: 'HUNTINGTON BANCSHARES INC'}, {label: 'competition', source: 'HUNTINGTON BANCSHARES INCORPORATED', target: 'MBC FINANCIAL CORPORATION'}, {label: 'Affiliate', source: 'HUNTINGTON BANCSHARES INC', target: 'HUNTINGTON BANCSHARES FINANCIAL CORPORATION'}, {label: 'Affiliate', source: 'HUNTINGTON BANCSHARES INC', target: 'HUNTINGTON PREFERRED CAPITAL, INC.'}, {label: 'Affiliate', source: 'HUNTINGTON BANCSHARES INC', target: 'HUNTINGTON CAPITAL I'}, {label: 'Affiliate', source: 'HUNTINGTON BANCSHARES INC', target: 'HUNTINGTON CAPITAL II'}, {label: 'Affiliate', source: 'HUNTINGTON BANCSHARES INC', target: 'HUNTINGTON CAPITAL III'}, {label: 'Affiliate', source: 'HUNTINGTON BANCSHARES INC', target: 'HUNTINGTON CAPITAL IV'}, {label: 'Affiliate', source: 'HUNTINGTON BANCSHARES INC', target: 'HBI TITLE SERVICES, INC'}, {label: 'Affiliate', source: 'HUNTINGTON BANCSHARES INC', target: 'BFOH CAPITAL TRUST I'}, {label: 'Affiliate', source: 'HUNTINGTON BANCSHARES INC', target: 'SKY FINANCIAL CAPITAL TRUST I'}, {label: 'Affiliate', source: 'HUNTINGTON BANCSHARES INC', target: 'SYNORAN LLC'}, {label: 'Affiliate', source: 'HUNTINGTON BANCSHARES INC', target: 'HUNTINGTON INSURANCE, INC.'}, {label: 'Affiliate', source: 'HUNTINGTON BANCSHARES INC', target: 'PROSPECT TRUST I'}, {label: 'Affiliate', source: 'HUNTINGTON BANCSHARES INC', target: 'SKY FINANCIAL CAPITAL TRUST II'}, {label: 'Affiliate', source: 'HUNTINGTON BANCSHARES INC', target: 'SKY FINANCIAL CAPITAL TRUST III'}, {label: 'Affiliate', source: 'HUNTINGTON BANCSHARES INC', target: 'HUNTINGTON WEALTH PLANNING ADVISORS, INC.'}, {label: 'Affiliate', source: 'HUNTINGTON BANCSHARES INC', target: 'HUNTINGTON FINANCE LLC'}, {label: 'Affiliate', source: 'BANK OF AMERICA CORPORATION', target: 'BANK OF AMERICA CORP'}, {label: 'Affiliate', source: 'BANK OF AMERICA CORP', target: 'BANK OF AMERICA MERRILL LYNCH INTERNATIONAL LIMITED'}, {label: 'Affiliate', source: 'BB&T CORPORATION', target: 'BB&T CORP'}, {label: 'Affiliate', source: 'BB&T CORP', target: 'RBI CAPITAL TRUST I'}, {label: 'Affiliate', source: 'BB&T CORP', target: 'MAINSTREET CAPITAL TRUST I'}, {label: 'Affiliate', source: 'BB&T CORP', target: 'PREMIER CAPITAL TRUST I'}, {label: 'Affiliate', source: 'BB&T CORP', target: 'FCNB CAPITAL TRUST'}, {label: 'Affiliate', source: 'BB&T CORP', target: 'BOSTON SERVICE COMPANY, INC.'}, {label: 'Affiliate', source: 'BB&T CORP', target: 'BB&T ASSET MANAGEMENT LLC'}, {label: 'Affiliate', source: 'BB&T CORP', target: 'MAIN STREET BANKS STATUTORY TRUST I'}, {label: 'Affiliate', source: 'BB&T CORP', target: 'MAIN STREET BANKS STATUTORY TRUST II'}, {label: 'Affiliate', source: 'BB&T CORP', target: 'BB&T CHARITABLE FOUNDATION'}, {label: 'Affiliate', source: 'BB&T CORP', target: 'FIRST CITIZENS BANCORP (TN) STATUTORY TRUST I'}, {label: 'Affiliate', source: 'BB&T CORP', target: 'NPB CAPITAL TRUST III'}, {label: 'Affiliate', source: 'BB&T CORP', target: 'NPB CAPITAL TRUST V'}, {label: 'Affiliate', source: 'BB&T CORP', target: 'FIRST CITIZENS BANCORP (TN) STATUTORY TRUST II'}, {label: 'Affiliate', source: 'BB&T CORP', target: 'BB&T CAPITAL TRUST I'}, {label: 'Affiliate', source: 'BB&T CORP', target: 'CMTY CAPITAL STATUTORY TRUST III'}, {label: 'Affiliate', source: 'BB&T CORP', target: 'CMTY CAPITAL STATUTORY TRUST IV'}, {label: 'Affiliate', source: 'BB&T CORP', target: 'BB&T SECURITIES, LLC'}, {label: 'Affiliate', source: 'BB&T CORP', target: 'BB&T CAPITAL PARTNERS FUND OF FUNDS I, LLC'}, {label: 'Affiliate', source: 'BB&T CORP', target: 'COASTAL FINANCIAL CAPITAL TRUST I'}, {label: 'Affiliate', source: 'BB&T CORP', target: 'AMCO HOLDING COMPANY'}, {label: 'Affiliate', source: 'BB&T CORP', target: 'NPB CAPITAL TRUST VI'}, {label: 'Affiliate', source: 'STATE STREET CORPORATION', target: 'STATE STREET CORP'}, {label: 'Affiliate', source: 'STATE STREET CORP', target: 'STATE STREET GLOBAL EXCHANGE (US) LLC'}, {label: 'Affiliate', source: 'STATE STREET CORP', target: 'STATE STREET CAPITAL TRUST I'}, {label: 'Affiliate', source: 'STATE STREET CORP', target: 'ADVANCED AUCTIONS LLC'}, {label: 'Affiliate', source: 'STATE STREET CORP', target: 'STATE STREET GLOBAL MARKETS (JAPAN)'}, {label: 'Affiliate', source: 'STATE STREET CORP', target: 'STATE STREET CORPORATION, INTERNATIONAL MANAGEMENT GROUP (IMG) LLC'}, {label: 'Affiliate', source: 'STATE STREET CORP', target: 'MANAGED PENSION FUNDS'}, {label: 'Affiliate', source: 'STATE STREET CORP', target: 'STATE STREET CAPITAL TRUST IV'}, {label: 'Affiliate', source: 'U.S. BANCORP', target: 'US_BANCORP'}, {label: 'Affiliate', source: 'US_BANCORP', target: 'U.S. BANCORP INSURANCE SERVICES, LLC'}, {label: 'Affiliate', source: 'US_BANCORP', target: 'U.S. BANCORP INVESTMENTS, INC.'}, {label: 'Affiliate', source: 'US_BANCORP', target: 'U.S. BANK TRUST COMPANY, NATIONAL ASSOCIATION'}, {label: 'Affiliate', source: 'US_BANCORP', target: 'U.S. BANK NATIONAL ASSOCIATION ND'}, {label: 'Affiliate', source: 'US_BANCORP', target: 'VAIL BANKS STATUTORY TRUST I'}, {label: 'Affiliate', source: 'US_BANCORP', target: 'VAIL BANKS STATUTORY TRUST II'}, {label: 'Affiliate', source: 'US_BANCORP', target: 'U.S. BANCORP COMMUNITY INVESTMENT CORPORATION'}, {label: 'Affiliate', source: 'US_BANCORP', target: 'USB CAPITAL IX'}, {label: 'Affiliate', source: 'US_BANCORP', target: 'USB CAPITAL X'}, {label: 'Affiliate', source: 'US_BANCORP', target: 'USB CAPITAL XI'}, {label: 'Affiliate', source: 'US_BANCORP', target: 'USB CAPITAL XII'}, {label: 'Affiliate', source: 'US_BANCORP', target: 'USB CAPITAL XIII'}, {label: 'Affiliate', source: 'US_BANCORP', target: 'FIXED INCOME CLIENT SOLUTIONS LLC'}, {label: 'Affiliate', source: 'US_BANCORP', target: 'U.S. BANK NATIONAL ASSOCIATION'}, {label: 'Affiliate', source: 'NORTHERN TRUST CORPORATION', target: 'NORTHERN TRUST CORP'}, {label: 'Affiliate', source: 'NORTHERN TRUST CORP', target: 'NTC CAPITAL I'}, {label: 'Affiliate', source: 'NORTHERN TRUST CORP', target: 'NTC CAPITAL II'}, {label: 'Affiliate', source: 'NORTHERN TRUST CORP', target: 'NORTHERN TRUST OF COLORADO CORPORATION'}, {label: 'Affiliate', source: 'NORTHERN TRUST CORP', target: 'NORTHERN TRUST GLOBAL INVESTMENTS JAPAN, K.K.'}, {label: 'Affiliate', source: 'NORTHERN TRUST CORP', target: 'NORTHERN TRUST EUROPEAN HOLDINGS LIMITED'}, {label: 'Affiliate', source: 'NORTHERN TRUST CORP', target: '50 SOUTH CAPITAL ADVISORS, LLC'}, {label: 'Affiliate', source: 'NORTHERN TRUST CORP', target: 'EQUILEND HOLDINGS LLC'}, {label: 'Affiliate', source: 'COMERICA INCORPORATED', target: 'COMERICA INC'}, {label: 'Affiliate', source: 'COMERICA INC', target: 'COMERICA CAPITAL TRUST I'}, {label: 'Affiliate', source: 'COMERICA INC', target: 'COMERICA CAPITAL TRUST II'}, {label: 'Affiliate', source: 'GENERAL ELECTRIC COMPANY', target: 'GENERAL ELECTRIC CO'}, {label: 'Affiliate', source: 'AMERICAN EXPRESS COMPANY', target: 'AMERICAN EXPRESS CO'}, {label: 'Affiliate', source: 'AMERICAN EXPRESS CO', target: 'AMERICAN EXPRESS SERVICES EUROPE LIMITED'}, {label: 'Affiliate', source: 'AMERICAN EXPRESS CO', target: 'AMERICAN EXPRESS FOUNDATION'}, {label: 'Affiliate', source: 'ALLY FINANCIAL INC.', target: 'Ally Financial Inc'}, {label: 'Affiliate', source: 'Ally Financial Inc', target: 'ALLY SECURITIES LLC'}, {label: 'Affiliate', source: 'Ally Financial Inc', target: 'BASIC CREDIT HOLDING COMPANY, L.L.C.'}, {label: 'Affiliate', source: 'Ally Financial Inc', target: 'ALLY INVESTMENT MANAGEMENT LLC'}, {label: 'Affiliate', source: 'Ally Financial Inc', target: 'ALLY US LLC'}, {label: 'Affiliate', source: 'Ally Financial Inc', target: 'GMACI HOLDINGS LLC'}, {label: 'Affiliate', source: 'Ally Financial Inc', target: 'VARIABLE ASSET RECEIVABLES LLC'}, {label: 'Affiliate', source: 'Ally Financial Inc', target: 'GAMMA AUTO RECEIVABLES LLC'}, {label: 'Affiliate', source: 'Ally Financial Inc', target: 'WHOLESALE AUTO RECEIVABLES LLC'}, {label: 'Affiliate', source: 'Ally Financial Inc', target: 'RESMOR CAPITAL CORPORATION'}, {label: 'Affiliate', source: 'Ally Financial Inc', target: 'CENTRAL ORIGINATING LEASE LLC'}, {label: 'Affiliate', source: 'Ally Financial Inc', target: 'RFC INVESTMENTS LIMITED'}, {label: 'Affiliate', source: 'CITIGROUP INC.', target: 'CITIGROUP INC'}, {label: 'Affiliate', source: 'CAPITAL ONE FINANCIAL CORPORATION', target: 'CAPITAL ONE FINANCIAL CORP'}, {label: 'competition', source: 'CAPITAL ONE FINANCIAL CORPORATION', target: 'GENERAL ELECTRIC CREDIT CORPORATION OF TENNESSEE'}, {label: 'competition', source: 'CAPITAL ONE FINANCIAL CORPORATION', target: 'FALCON AUTO DEALERSHIP LOAN TRUST 2001-1'}, {label: 'competition', source: 'CAPITAL ONE FINANCIAL CORPORATION', target: 'CHASE CAPITAL VII'}, {label: 'competition', source: 'CAPITAL ONE FINANCIAL CORPORATION', target: 'GENERAL ELECTRIC CAPITAL CORPORATION'}, {label: 'competition', source: 'CAPITAL ONE FINANCIAL CORPORATION', target: 'HK RAV V PARTNERSHIP. THE'}, {label: 'competition', source: 'CAPITAL ONE FINANCIAL CORPORATION', target: 'MFI HOLDING CORPORATION'}, {label: 'Affiliate', source: 'CAPITAL ONE FINANCIAL CORP', target: 'CAPITAL ONE, NATIONAL ASSOCIATION'}, {label: 'Affiliate', source: 'CAPITAL ONE FINANCIAL CORP', target: 'NORTH FORK CAPITAL TRUST I'}, {label: 'Affiliate', source: 'CAPITAL ONE FINANCIAL CORP', target: 'NORTH FORK CAPITAL TRUST II'}, {label: 'Affiliate', source: 'CAPITAL ONE FINANCIAL CORP', target: 'CAPITAL ONE SECURITIES, INC.'}, {label: 'Affiliate', source: 'CAPITAL ONE FINANCIAL CORP', target: 'ING BANK, FSB'}, {label: 'Affiliate', source: 'CAPITAL ONE FINANCIAL CORP', target: 'RELIANCE CAPITAL TRUST I'}, {label: 'Affiliate', source: 'CAPITAL ONE FINANCIAL CORP', target: 'CAPITAL ONE SERVICES (CANADA) INC.'}, {label: 'Affiliate', source: 'CAPITAL ONE FINANCIAL CORP', target: 'COASTAL CAPITAL TRUST I'}, {label: 'Affiliate', source: 'CAPITAL ONE FINANCIAL CORP', target: 'COASTAL CAPITAL TRUST II'}, {label: 'Affiliate', source: 'CAPITAL ONE FINANCIAL CORP', target: 'CAPITAL ONE CAPITAL II'}, {label: 'Affiliate', source: 'CAPITAL ONE FINANCIAL CORP', target: 'CAPITAL ONE CAPITAL III'}, {label: 'Affiliate', source: 'CAPITAL ONE FINANCIAL CORP', target: 'CAPITAL ONE CAPITAL IV'}, {label: 'Affiliate', source: 'CAPITAL ONE FINANCIAL CORP', target: 'CAPITAL ONE CAPITAL V'}, {label: 'Affiliate', source: 'CAPITAL ONE FINANCIAL CORP', target: 'CAPITAL ONE CAPITAL VI'}, {label: 'Affiliate', source: 'CAPITAL ONE FINANCIAL CORP', target: 'CAPITAL ONE DIRECT SECURITIES, INC.'}, {label: 'Affiliate', source: 'BANK OF NEW YORK MELLON CORPORATION, THE', target: 'Bank of New York Mellon Corp'}, {label: 'Affiliate', source: 'Bank of New York Mellon Corp', target: 'MELLON CAPITAL I'}, {label: 'Affiliate', source: 'Bank of New York Mellon Corp', target: 'MELLON CAPITAL II'}, {label: 'Affiliate', source: 'Bank of New York Mellon Corp', target: 'BNY CAPITAL I'}, {label: 'Affiliate', source: 'Bank of New York Mellon Corp', target: 'BNY INSTITUTIONAL CAPITAL TRUST A'}, {label: 'Affiliate', source: 'Bank of New York Mellon Corp', target: 'MIPA, LLC'}, {label: 'Affiliate', source: 'Bank of New York Mellon Corp', target: 'BNY MELLON DISTRIBUTORS HOLDINGS INC.'}, {label: 'Affiliate', source: 'Bank of New York Mellon Corp', target: 'BNY CAPITAL IV'}, {label: 'Affiliate', source: 'Bank of New York Mellon Corp', target: 'MCDI (HOLDINGS) LLC'}, {label: 'Affiliate', source: 'Bank of New York Mellon Corp', target: 'MELLON HOLDINGS LLC'}, {label: 'Affiliate', source: 'Bank of New York Mellon Corp', target: 'MAM (MA) HOLDING TRUST'}, {label: 'Affiliate', source: 'Bank of New York Mellon Corp', target: 'BNY CAPITAL V'}, {label: 'Affiliate', source: 'Bank of New York Mellon Corp', target: 'PERSHING GROUP LLC'}, {label: 'Affiliate', source: 'Bank of New York Mellon Corp', target: 'MELLON CAPITAL III'}, {label: 'Affiliate', source: 'Bank of New York Mellon Corp', target: 'MELLON CAPITAL IV'}, {label: 'Affiliate', source: 'Bank of New York Mellon Corp', target: 'BNY MELLON CLEARING, LLC'}, {label: 'Affiliate', source: 'Bank of New York Mellon Corp', target: 'BNY MELLON CSD'}, {label: 'Affiliate', source: 'SCHWAB HOLDINGS, INC.', target: 'SCHWAB_CHARLES_CORP '}, {label: 'Affiliate', source: 'SCHWAB_CHARLES_CORP ', target: 'SCHWAB RETIREMENT PLAN SERVICES, INC.'}, {label: 'Affiliate', source: 'SCHWAB_CHARLES_CORP ', target: 'SCHWAB RETIREMENT TECHNOLOGIES, INC.'}, {label: 'Affiliate', source: 'SCHWAB_CHARLES_CORP ', target: 'PERFORMANCE TECHNOLOGIES, INC.'}, {label: 'Affiliate', source: 'SCHWAB_CHARLES_CORP ', target: 'CHARLES SCHWAB BANK'}, {label: 'Affiliate', source: 'SCHWAB_CHARLES_CORP ', target: 'SCHWAB CAPITAL TRUST I'}, {label: 'Affiliate', source: 'SCHWAB_CHARLES_CORP ', target: 'CHARLES SCHWAB FOUNDATION'}, {label: 'Affiliate', source: 'SCHWAB_CHARLES_CORP ', target: 'CHARLES SCHWAB TRUST COMPANY'}, {label: 'Affiliate', source: 'VBC CAPITAL I', target: 'ZIONS BANCORPORATION'}, {label: 'Affiliate', source: 'ZIONS BANCORPORATION', target: 'ZIONS FINANCIAL CORP.'}, {label: 'Affiliate', source: 'ZIONS BANCORPORATION', target: 'ZIONS CAPITAL TRUST B'}, {label: 'competition', source: 'J.P. MORGAN CHASE COMMUNITY DEVELOPMENT CORPORATION', target: 'SECURITY-FIRST COMPANY'}, {label: 'competition', source: 'J.P. MORGAN CHASE COMMUNITY DEVELOPMENT CORPORATION', target: 'GENERAL ELECTRIC CREDIT AND LEASING CORPORATION'}, {label: 'competition', source: 'J.P. MORGAN CHASE COMMUNITY DEVELOPMENT CORPORATION', target: 'HYATT HOTELS CORPORATION'}, {label: 'competition', source: 'BOI LEASING CORPORATION', target: 'NEW YORK EQUITY FUND 1994 LIMITED PARTNERSHIP'}, {label: 'competition', source: 'PARK ASSURANCE COMPANY', target: 'STERLING ASSURANCE COMPANY'}, {label: 'competition', source: 'CHASE CAPITAL HOLDING CORPORATION', target: 'ONE PERCENT HOLDING CORPORATION'}, {label: 'competition', source: 'CHASE CAPITAL HOLDING CORPORATION', target: 'MORGAN STANLEY'}, {label: 'competition', source: 'CHASE CAPITAL HOLDING CORPORATION', target: 'KATY BRANCH'}, {label: 'competition', source: 'CHASE CAPITAL HOLDING CORPORATION', target: 'PIONEER CREDIT CORPORATION'}, {label: 'competition', source: 'CHASE CAPITAL HOLDING CORPORATION', target: 'MFI HOLDING CORPORATION'}, {label: 'competition', source: 'CHASE CAPITAL HOLDING CORPORATION', target: 'MILLSBORO BRANCH'}, {label: 'competition', source: 'CHASE CAPITAL HOLDING CORPORATION', target: 'PINEDALE BRANCH'}, {label: 'Affiliate', source: 'KEYCORP FINANCE INC.', target: 'KEYCORP'}, {label: 'Affiliate', source: 'KEYCORP', target: 'KEYCORP INSURANCE COMPANY, LTD.'}, {label: 'Affiliate', source: 'KEYCORP', target: 'KEYCORP INSTITUTIONAL CAPITAL A'}, {label: 'Affiliate', source: 'KEYCORP', target: 'KEYCORP INSTITUTIONAL CAPITAL B'}, {label: 'Affiliate', source: 'KEYCORP', target: 'KEYCORP CAPITAL I'}, {label: 'Affiliate', source: 'KEYCORP', target: 'KEYCORP CAPITAL II'}, {label: 'Affiliate', source: 'KEYCORP', target: 'KEYCORP CAPITAL III'}, {label: 'Affiliate', source: 'KEYCORP', target: 'KEYCORP CAPITAL V'}, {label: 'Affiliate', source: 'KEYCORP', target: 'KEYCORP CAPITAL VI'}, {label: 'Affiliate', source: 'KEYCORP', target: 'KEYCORP CAPITAL VII'}, {label: 'Affiliate', source: 'KEYCORP', target: 'KEYCORP CAPITAL VIII'}, {label: 'Affiliate', source: 'KEYCORP', target: 'KEYCORP CAPITAL IX'}, {label: 'Affiliate', source: 'KEYCORP', target: 'KEYCORP CAPITAL X'}, {label: 'Affiliate', source: 'KEYCORP', target: 'KEYCORP INSURANCE COMPANY, LLC'}, {label: 'Affiliate', source: 'KEYCORP', target: 'KEYCORP OFFSHORE INVESTMENTS COMPANY, LTD.'}, {label: 'competition', source: 'KEYCORP', target: 'BLC BANK NATIONAL ASSOCIATION'}, {label: 'Affiliate', source: 'RIGGS CAPITAL', target: 'PNC FINANCIAL SERVICES GROUP INC'}, {label: 'Affiliate', source: 'PNC FINANCIAL SERVICES GROUP INC', target: 'PNC CAPITAL TRUST C'}, {label: 'Affiliate', source: 'PNC FINANCIAL SERVICES GROUP INC', target: 'YARDVILLE CAPITAL TRUST II'}, {label: 'Affiliate', source: 'PNC FINANCIAL SERVICES GROUP INC', target: 'YARDVILLE CAPITAL TRUST III'}, {label: 'Affiliate', source: 'PNC FINANCIAL SERVICES GROUP INC', target: 'JAMES MONROE STATUTORY TRUST I'}, {label: 'Affiliate', source: 'PNC FINANCIAL SERVICES GROUP INC', target: 'STERLING FINANCIAL STATUTORY TRUST II'}, {label: 'Affiliate', source: 'PNC FINANCIAL SERVICES GROUP INC', target: 'JAMES MONROE STATUTORY TRUST II'}, {label: 'Affiliate', source: 'PNC FINANCIAL SERVICES GROUP INC', target: 'YARDVILLE CAPITAL TRUST V'}, {label: 'Affiliate', source: 'PNC FINANCIAL SERVICES GROUP INC', target: 'PNC CAPITAL TRUST D'}, {label: 'Affiliate', source: 'PNC FINANCIAL SERVICES GROUP INC', target: 'YARDVILLE CAPITAL TRUST VI'}, {label: 'Affiliate', source: 'PNC FINANCIAL SERVICES GROUP INC', target: 'STERLING FINANCIAL STATUTORY TRUST III'}, {label: 'Affiliate', source: 'PNC FINANCIAL SERVICES GROUP INC', target: 'STERLING FINANCIAL STATUTORY TRUST IV'}, {label: 'Affiliate', source: 'PNC FINANCIAL SERVICES GROUP INC', target: 'JAMES MONROE STATUTORY TRUST III'}, {label: 'Affiliate', source: 'PNC FINANCIAL SERVICES GROUP INC', target: 'FIDELITY CAPITAL TRUST II'}, {label: 'Affiliate', source: 'PNC FINANCIAL SERVICES GROUP INC', target: 'FIDELITY CAPITAL TRUST III'}, {label: 'Affiliate', source: 'PNC FINANCIAL SERVICES GROUP INC', target: 'STERLING FINANCIAL STATUTORY TRUST V'}, {label: 'Affiliate', source: 'PNC FINANCIAL SERVICES GROUP INC', target: 'MAF BANCORP CAPITAL TRUST I'}, {label: 'Affiliate', source: 'PNC FINANCIAL SERVICES GROUP INC', target: 'MAF BANCORP CAPITAL TRUST II'}, {label: 'Affiliate', source: 'PNC FINANCIAL SERVICES GROUP INC', target: 'NATIONAL CITY CAPITAL TRUST II'}, {label: 'Affiliate', source: 'PNC FINANCIAL SERVICES GROUP INC', target: 'NATIONAL CITY CAPITAL TRUST III'}, {label: 'Affiliate', source: 'PNC FINANCIAL SERVICES GROUP INC', target: 'NATIONAL CITY CAPITAL TRUST IV'}, {label: 'Affiliate', source: 'PNC FINANCIAL SERVICES GROUP INC', target: 'PNC CAPITAL TRUST E'}, {label: 'Affiliate', source: 'PNC FINANCIAL SERVICES GROUP INC', target: 'NATIONAL CITY CREDIT CORPORATION'}, {label: 'competition', source: 'STERLING FINANCIAL STATUTORY TRUST V', target: 'BA CONTINUUM MANAGEMENT LIMITED'}, {label: 'competition', source: 'STERLING FINANCIAL STATUTORY TRUST V', target: 'SALT LAKE CITY BRANCH'}, {label: 'competition', source: 'STERLING FINANCIAL STATUTORY TRUST V', target: 'BAY STATE CORPORATION LIMITED'}, {label: 'competition', source: 'STERLING FINANCIAL STATUTORY TRUST V', target: 'SKY BANK'}, {label: 'competition', source: 'STERLING FINANCIAL STATUTORY TRUST V', target: 'BRINKLEY PLAZA BRANCH'}, {label: 'competition', source: 'STERLING FINANCIAL STATUTORY TRUST V', target: 'MICHIGAN FINANCIAL CORPORATION'}, {label: 'competition', source: 'STERLING FINANCIAL STATUTORY TRUST V', target: 'CHESTERTOWN BRANCH'}, {label: 'competition', source: 'STERLING FINANCIAL STATUTORY TRUST V', target: 'KATY BRANCH'}, {label: 'competition', source: 'STERLING FINANCIAL STATUTORY TRUST V', target: 'BROAD STREET DOWNTOWN'}, {label: 'competition', source: 'STERLING FINANCIAL STATUTORY TRUST V', target: 'ONYX ACCEPTANCE CORPORATION'}, {label: 'competition', source: 'STERLING FINANCIAL STATUTORY TRUST V', target: 'BNY MELLON COMMUNITY DEVELOPMENT CORPORATION'}, {label: 'competition', source: 'STERLING FINANCIAL STATUTORY TRUST V', target: 'PINEDALE BRANCH'}, {label: 'Affiliate', source: 'FIFTH THIRD FINANCIAL CORPORATION', target: 'FIFTH THIRD BANCORP'}, {label: 'competition', source: 'FIFTH THIRD FINANCIAL CORPORATION', target: 'CNB CAPITAL TRUST I'}, {label: 'competition', source: 'FIFTH THIRD FINANCIAL CORPORATION', target: 'PNC FINANCIAL SERVICES GROUP. INC.. THE'}, {label: 'competition', source: 'FIFTH THIRD FINANCIAL CORPORATION', target: 'SUMMIT CAPITAL TRUST I'}, {label: 'Affiliate', source: 'FIFTH THIRD BANCORP', target: 'FIFTH THIRD CAPITAL TRUST IV'}, {label: 'Affiliate', source: 'FIFTH THIRD BANCORP', target: 'FIFTH THIRD CAPITAL TRUST V'}, {label: 'Affiliate', source: 'FIFTH THIRD BANCORP', target: 'FIFTH THIRD CAPITAL TRUST VI'}, {label: 'Affiliate', source: 'FIFTH THIRD BANCORP', target: 'FIFTH THIRD CAPITAL TRUST VII'}, {label: 'competition', source: 'FIFTH THIRD CAPITAL TRUST V', target: 'CNB CAPITAL TRUST I'}, {label: 'competition', source: 'RBI CAPITAL TRUST I', target: 'WILMINGTON TRUST CORPORATION'}, {label: 'Affiliate', source: 'FNL INSURANCE COMPANY, LTD', target: 'WELLS FARGO & COMPANY'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WELLS FARGO WEALTH BROKERAGE INSURANCE AGENCY, LLC'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'TRYON MANAGEMENT, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'CENTRAL FIDELITY PROPERTIES, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WELLS FARGO PROPERTIES, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'NORWEST VENTURE CAPITAL MANAGEMENT, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WELLS FARGO ASIA LIMITED'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'PEREGRINE CAPITAL MANAGEMENT, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WELLS FARGO INSURANCE, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WACHOVIA PRIVATE CAPITAL, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'CORESTATES HOLDINGS, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WACHOVIA DEVELOPMENT CORPORATION'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'FIRST UNION COMMUNITY DEVELOPMENT CORPORATION'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WELLS FARGO CAPITAL FINANCE, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'SUPERIOR GUARANTY INSURANCE COMPANY'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WELLS FARGO REGIONAL COMMUNITY DEVELOPMENT CORPORATION'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'TRSTE, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'HOME SERVICES TITLE REINSURANCE COMPANY'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WELLS FARGO INSURANCE SERVICES USA, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'CHESTNUT ASSET MANAGEMENT, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'RESIDENTIAL HOME MORTGAGE INVESTMENT, L.L.C.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WACHOVIA INVESTORS, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WACHOVIA CAPITAL INVESTMENTS, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'NORWEST EQUITY CAPITAL, L.L.C.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WELLS FARGO ENERGY CAPITAL, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'TRSTE II, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'FIRST UNION CAPITAL I'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'FIRST UNION CAPITAL II'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WACHOVIA CAPITAL TRUST I'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WACHOVIA CAPITAL TRUST II'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'CENTRAL FIDELITY CAPITAL TRUST I'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WACHOVIA COMMUNITY DEVELOPMENT CORPORATION'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WACHOVIA CAPITAL TRUST V'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'SAGUARO ASSET MANAGEMENT, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'PRIMROSE ASSET MANAGEMENT, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'GOLDENROD ASSET MANAGEMENT, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WELLS FARGO INTERNATIONAL INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'EVEREN CAPITAL CORPORATION'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WACHOVIA PREFERRED FUNDING HOLDING CORP.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WFC HOLDINGS CORPORATION'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'FIRST INTERNATIONAL ADVISORS, LLC'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'FPFC MANAGEMENT LLC'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WELLS FARGO TRADE CAPITAL SERVICES, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'NORWEST LIMITED LP, LLLP'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WELLS FARGO EXCHANGE SERVICES, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'TIBERIUS VENTURES, L.L.C.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'AUGUSTUS VENTURES, L.L.C.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'BRYAN, PENDLETON, SWATS & MCALLISTER, LLC'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WELLS FARGO INVESTMENT GROUP, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'FUNC HOLDINGS, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'ACO BROKERAGE HOLDINGS CORPORATION'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'FIRST COMMUNITY CAPITAL TRUST I'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'STRUCTURED CREDIT PARTNERS, LLC'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WELLS FARGO CAPITAL IV'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WF DEFERRED COMPENSATION HOLDINGS, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WELLS FARGO CAPITAL V'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WELLS FARGO GAMING CAPITAL, LLC'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'UNION HAMILTON REINSURANCE, LTD.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WELLS FARGO COMMUNITY DEVELOPMENT CORPORATION'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WELLS FARGO CAPITAL VI'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'SYNTHETIC FIXED-INCOME SECURITIES, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WACHOVIA PREFERRED FUNDING CORP.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WELLS FARGO CAPITAL VII'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'UNITED BANCORPORATION OF WYOMING CAPITAL TRUST I'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WELLS FARGO CAPITAL VIII'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'CENTURY CAPITAL TRUST'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'FIRST COMMUNITY CAPITAL TRUST III'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WELLS FARGO CAPITAL IX'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'STRUCTURED ASSET INVESTORS, LLC'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'BLUEPOINT HOLDINGS LIMITED'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'PLACER STATUTORY TRUST III'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'UNITED BANCORPORATION OF WYOMING CAPITAL TRUST II'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'MACRO*WORLD RESEARCH CORPORATION'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WACHOVIA CAPITAL TRUST III'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'EVERGREEN ALTERNATIVE CAPITAL, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WELLS FARGO CAPITAL X'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'UNITED BANCORPORATION OF WYOMING CAPITAL TRUST III'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'PLACER STATUTORY TRUST IV'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'DANUBE HOLDINGS III C.V.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WACHOVIA CAPITAL TRUST IV'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WACHOVIA CAPITAL INVESTORS, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WACHOVIA CAPITAL TRUST IX'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'A.G. EDWARDS HEDGING SERVICES, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'A.G. EDWARDS CAPITAL, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'AGE CAPITAL HOLDING, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WDS HOLDINGS, INC.'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WACHOVIA CAPITAL TRUST X'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WELLS FARGO CAPITAL XI'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WELLS FARGO CAPITAL XII'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: '2007 VENTO II, LLC'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'FCB/SC CAPITAL TRUST II'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'DFG HOLDINGS, LLC'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WELLS FARGO RELATIVE VALUE PORTFOLIO'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'OVERLAND RELATIVE VALUE FUND LLC'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'OVERLAND ADVISORS, LLC'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WELLS FARGO SOPORTE GLOBAL LIMITADA'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'WELLS FARGO BANK, NATIONAL ASSOCIATION'}, {label: 'Affiliate', source: 'WELLS FARGO & COMPANY', target: 'CAPITOL FINANCE GROUP, INC.'}, {label: 'Affiliate', source: 'RIDGEWORTH CAPITAL MANAGEMENT, INC.', target: 'SUNTRUST BANKS INC'}, {label: 'Affiliate', source: 'SUNTRUST BANKS INC', target: 'NATIONAL COMMERCE CAPITAL TRUST I'}, {label: 'Affiliate', source: 'SUNTRUST BANKS INC', target: 'SUNTRUST CAPITAL I'}, {label: 'Affiliate', source: 'SUNTRUST BANKS INC', target: 'SUNTRUST CAPITAL III'}, {label: 'Affiliate', source: 'SUNTRUST BANKS INC', target: 'SUNTRUST DELAWARE TRUST COMPANY'}, {label: 'Affiliate', source: 'SUNTRUST BANKS INC', target: 'SUNTRUST CAPITAL IV'}, {label: 'Affiliate', source: 'SUNTRUST BANKS INC', target: 'SUNTRUST CAPITAL V'}, {label: 'Affiliate', source: 'SUNTRUST BANKS INC', target: 'GB&T BANCSHARES STATUTORY TRUST I'}, {label: 'Affiliate', source: 'SUNTRUST BANKS INC', target: 'SOUTHERN HERITAGE STATUTORY TRUST I'}, {label: 'Affiliate', source: 'SUNTRUST BANKS INC', target: 'NATIONAL COMMERCE CAPITAL TRUST II'}, {label: 'Affiliate', source: 'SUNTRUST BANKS INC', target: 'SUNTRUST PREFERRED CAPITAL I'}, {label: 'Affiliate', source: 'SUNTRUST BANKS INC', target: 'SUNTRUST INSTITUTIONAL INVESTMENT ADVISORS LLC'}, {label: 'Affiliate', source: 'SUNTRUST BANKS INC', target: 'SUNTRUST NLIP, INC.'}, {label: 'competition', source: 'SOUTHERN HERITAGE STATUTORY TRUST I', target: 'AVON 56 LIMITED'}, {label: 'competition', source: 'SOUTHERN HERITAGE STATUTORY TRUST I', target: 'MILLSBORO BRANCH'}, {label: 'competition', source: 'AN CAPITAL CORPORATION', target: 'FREEDOM FINANCIAL LIFE INSURANCE COMPANY'}, {label: 'Affiliate', source: 'MORGAN STANLEY & CO. LLC', target: 'MORGAN STANLEY'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY PRIVATE BANK, NATIONAL ASSOCIATION'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY SENIOR FUNDING, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY EMERGING MARKETS INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY TRUST NATIONAL ASSOCIATION'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY SPECIAL SITUATIONS GROUP INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY ASSET FUNDING INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY INVESTMENT MANAGEMENT INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY COLLATERALIZED FINANCING LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY CAPITAL MANAGEMENT, LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY CREDIT PRODUCTS LTD.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY DESHKA LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY EUROPA LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY ASTI INVESTMENTS LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY BISCAY LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY PORTFOLIO MANAGEMENT LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY DURHAM INVESTMENTS LIMITED'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY DURANGO LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY ELAN LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY GASTORO INVESTMENTS LIMITED'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY DOVER INVESTMENTS LIMITED'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY AMANU LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY GLOBAL FUNDING TRUST'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MS DAINFERN LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY BARBERA ONE LIMITED'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY GRENACHE THREE LIMITED'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY UK CAPITAL LIMITED'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY OVERSEAS FINANCE LTD.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY PRINCIPAL FUNDING, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY SECAP FUNDING, LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY INTERNATIONAL INCORPORATED'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY CAPITAL GROUP INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY CAPITAL SERVICES LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MS REVEL EFS LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'SHUKSAN LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MS MELVILLE LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'SHAVANO COOPERATIEVE U.A.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY LOWMAN LIMITED'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY GRENACHE TWO LIMITED'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'BONAIRE COOPERATIEVE U.A.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY (JERSEY) LIMITED'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY HEDGING CO. LTD.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY GRENACHE ONE LIMITED'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY HOXNE'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY CUMBRIA INVESTMENTS'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY SYRAH ONE LIMITED'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY REALTY INCORPORATED'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY SHOREDITCH LIMITED'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MS ROSEBANK LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSDW OFFSHORE EQUITY SERVICES INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MS 10020, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MS LION LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MS PEGAU LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY WIND LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSRESS III, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'SYCAMORE II, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY INTERNATIONAL HOLDINGS INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MAKATEA JV INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY DERIVATIVE PRODUCTS INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY SECURITIES INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY TINDUR LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY OCK'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'SAENREDAM COOPERATIEVE U.A.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY MORTGAGE CAPITAL HOLDINGS LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY CAPITAL REIT INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY PREFERRED STRATEGIES INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MS HOLDINGS INCORPORATED'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSPEA HOLDINGS, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSREF V, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MS LOW INCOME HOUSING CORPORATION'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'STRATEGIC INVESTMENTS I, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'COURNOT HOLDINGS INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSDW INTERNATIONAL EMPLOYEE SERVICES LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY INVESTMENT ADVISORS INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY FIXED INCOME VENTURES INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSREF IV, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSDW PE/VC HOLDINGS, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSDW CPIV HOLDINGS, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY MUNICIPAL FUNDING INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSAM HOLDINGS II, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY REAL ESTATE F FUNDING, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY COMMERCIAL FINANCIAL SERVICES LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'FV-I, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MS LOW INCOME HOUSING II CORPORATION'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'CAUCA LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'BELMONDO LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSIT HOLDINGS, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSDW REAL ESTATE SPECIAL SITUATIONS II, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY EQUITY SERVICES INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY AI GP LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY STRATEGIES LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY DARICA FUNDING, LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY DEAN WITTER EQUITY FUNDING, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY STINGRAY LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'BAYVIEW HOLDING LTD.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY SHANKLIN LIMITED'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'FUEGOS LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY RENEWABLES INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY ALTABRIDGE LTD.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY SMITH BARNEY HOLDINGS LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY FINANCE LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY CAPITAL TRUST VIII'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY CAPITAL TRUST VII'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY CAPITAL TRUST VI'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY CAPITAL TRUST - C'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY CAPITAL TRUST - B'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY CAPITAL TRUST - A'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY CAPITAL TRUST V'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY CAPITAL TRUST IV'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY CAPITAL TRUST III'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSUH HOLDINGS I, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY ABS CAPITAL I INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY ATLAS, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'VENTURA HOLDINGS, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY DISTRIBUTORS INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSDW VP IV HOLDINGS, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSVP 2002, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY CAPITAL I INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSDW CAPITAL PARTNERS IV, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY VENTURE CAPITAL III, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY PRIVATE EQUITY ASIA, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY GLOBAL EMERGING MARKETS, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY LEVERAGED EQUITY FUND II, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY DEAN WITTER INTERNATIONAL INCORPORATED'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY CAPITAL PARTNERS III, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSREF V FUNDING, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSDW VENTURE PARTNERS IV, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSDW EFS HOLDINGS INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY COMMERCIAL MORTGAGE CAPITAL, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSCP III HOLDINGS, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY REAL ESTATE ADVISOR, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY OVERSEAS SERVICES (JERSEY) LIMITED'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MS VENTURE CAPITAL HOLDING INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'PETTINGELL LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY REAL ESTATE INVESTMENT MANAGEMENT II, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY DEVON INVESTMENTS LIMITED'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY REAL ESTATE INVESTMENT MANAGEMENT INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'JAPAN CORE FUNDING, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MR VENTURES INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'PG INVESTORS II, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY LEVERAGED EQUITY HOLDINGS INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSREF REAL ESTATE ADVISOR, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSRE MEZZANINE, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY REAL ESTATE FUNDING II, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MUSUM II LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY PRINCIPAL STRATEGIES, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY FUND SERVICES INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MS LOW INCOME HOUSING III CORPORATION'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSDW EMERGING EQUITY, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSREF III, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSREF II, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSDW STRATEGIC VENTURES INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY DOMESTIC LEASING INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSDW OIP INVESTORS, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MS HAWK I LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY SECURITIZATION FUNDING, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY REINSURANCE ALPHA LTD.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY LIFE HOLDING INCORPORATED'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY SERVICES CANADA HOLDING CORP.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY CONTENT CORPORATION'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'EARLY ADOPTER FUND MANAGER INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY MAYAK LIMITED'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'CORPORATE EQUIPMENT SUPPLIES, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY GALWAY LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY BOSCASTLE HOLDING LIMITED'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'PG HOLDINGS, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY MALBEC LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY WHITE HORSE UK'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY CAPITAL REIT IV INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MS STRUCTURED ASSET CORP.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSEOF, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSVP 2002 HOLDINGS, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY GLOBAL STRATEGIES MANAGEMENT HOLDINGS, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY BARENTS LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'TOOELE POWER, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'WIWILI V LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY CAPITAL PRODUCTS LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY SECURED FINANCING LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MSREI HOLDING, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY NLE, LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY REINSURANCE LTD.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY STRUCTURED PRODUCTS (CAYMAN) LIMITED'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'JOLTER INVESTMENTS INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MS TECHNOLOGY HOLDINGS, INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY RISK SERVICES LLC'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY SERVICES INC.'}, {label: 'Affiliate', source: 'MORGAN STANLEY', target: 'MORGAN STANLEY COMMUNITY INVESTMENTS LLC'}, {label: 'competition', source: 'MORGAN STANLEY', target: 'BANKBOSTON CAPITAL TRUST I'}, {label: 'competition', source: 'MORGAN STANLEY', target: 'BRACEBRIDGE CORPORATION'}, {label: 'competition', source: 'MORGAN STANLEY', target: 'KATY BRANCH'}, {label: 'competition', source: 'MORGAN STANLEY', target: 'CHARLES SCHWAB CORPORATION. THE'}, {label: 'competition', source: 'MORGAN STANLEY', target: 'PINEDALE BRANCH'}, {label: 'competition', source: 'COASTAL CAPITAL TRUST I', target: 'FIRST SECURITY LEASING COMPANY'}, {label: 'competition', source: 'COASTAL CAPITAL TRUST I', target: 'BAY STATE CORPORATION LIMITED'}, {label: 'competition', source: 'COASTAL CAPITAL TRUST I', target: 'BRACEBRIDGE CORPORATION'}, {label: 'competition', source: 'COASTAL CAPITAL TRUST I', target: 'CAPITAL ONE. NATIONAL ASSOCIATION'}, {label: 'Affiliate', source: 'GOLDMAN, SACHS & CO.', target: 'GOLDMAN SACHS GROUP INC'}, {label: 'Affiliate', source: 'GOLDMAN SACHS GROUP INC', target: 'GOLDMAN SACHS BANK USA'}, {label: 'Affiliate', source: 'GOLDMAN SACHS GROUP INC', target: 'GOLDMAN, SACHS & CO. WERTPAPIER GMBH'}, {label: 'Affiliate', source: 'GOLDMAN SACHS GROUP INC', target: 'MTGLQ INVESTORS, L.P.'}, {label: 'Affiliate', source: 'GOLDMAN SACHS GROUP INC', target: 'GOLDMAN SACHS HEDGE FUND STRATEGIES LLC'}, {label: 'Affiliate', source: 'GOLDMAN SACHS GROUP INC', target: 'COMMONWEALTH ANNUITY AND LIFE INSURANCE COMPANY'}, {label: 'Affiliate', source: 'GOLDMAN SACHS GROUP INC', target: 'GOLDMAN SACHS CAPITAL II'}, {label: 'Affiliate', source: 'GOLDMAN SACHS GROUP INC', target: 'GS FINANCE CORP.'}, {label: 'Affiliate', source: 'GOLDMAN SACHS GROUP INC', target: 'OOO GOLDMAN SACHS BANK'}, {label: 'Affiliate', source: 'GOLDMAN SACHS GROUP INC', target: 'SPECIAL SITUATIONS INVESTING GROUP, INC.'}, {label: 'Affiliate', source: 'GOLDMAN SACHS GROUP INC', target: 'GS MORTGAGE SECURITIES CORP.'}, {label: 'Affiliate', source: 'GOLDMAN SACHS GROUP INC', target: 'GOLDMAN SACHS CAPITAL I'}, {label: 'Affiliate', source: 'GOLDMAN SACHS GROUP INC', target: 'BROAD STREET PRINCIPAL INVESTMENTS, L.L.C.'}, {label: 'Affiliate', source: 'GOLDMAN SACHS GROUP INC', target: 'DAESUNG INDUSTRIAL GASES CO., LTD.'}, {label: 'Affiliate', source: 'GOLDMAN SACHS GROUP INC', target: 'GSAM HOLDINGS LLC'}, {label: 'competition', source: 'MELLON CAPITAL I', target: 'MAM (DE) TRUST'}, {label: 'competition', source: 'MELLON CAPITAL I', target: 'NORTHERN TRUST COMPANY OF DELAWARE. THE'}, {label: 'competition', source: 'MELLON CAPITAL I', target: 'COASTAL PLANNERS HOLDING CORPORATION'}, {label: 'competition', source: 'MELLON CAPITAL I', target: 'BROAD STREET DOWNTOWN'}, {label: 'competition', source: 'MELLON CAPITAL I', target: 'RIVERTON STATE BANK HOLDING COMPANY'}, {label: 'competition', source: 'MELLON CAPITAL I', target: 'PINEDALE BRANCH'}, {label: 'Affiliate', source: 'BANK OF NEW CASTLE', target: 'Discover Financial Services'}, {label: 'Affiliate', source: 'Discover Financial Services', target: 'DISCOVER BANK'}, {label: 'Affiliate', source: 'Discover Financial Services', target: 'DISCOVER FINANCIAL SERVICES (CANADA), INC.'}, {label: 'Affiliate', source: 'Discover Financial Services', target: 'DFS SERVICES LLC'}, {label: 'Affiliate', source: 'Discover Financial Services', target: 'DISCOVER FINANCIAL SERVICES (HONG KONG) LIMITED'}, {label: 'Affiliate', source: 'Discover Financial Services', target: 'DISCOVER FINANCIAL SERVICES INSURANCE AGENCY, INC.'}, {label: 'competition', source: 'CHARLES SCHWAB CORPORATION. THE', target: 'GREAT WESTERN FINANCIAL CORPORATION'}, {label: 'competition', source: 'CHARLES SCHWAB CORPORATION. THE', target: 'FIRST SECURITY LEASING COMPANY'}, {label: 'competition', source: 'CHARLES SCHWAB CORPORATION. THE', target: 'HAMBRECHT AND QUIST GROUP'}, {label: 'competition', source: 'CHARLES SCHWAB CORPORATION. THE', target: 'IBI AND ASSOCIATES'}, {label: 'competition', source: 'CHARLES SCHWAB CORPORATION. THE', target: 'CHIBA BANK. LTD.. THE'}, {label: 'competition', source: 'CHARLES SCHWAB CORPORATION. THE', target: 'BBANDT CORPORATION'}, {label: 'competition', source: 'CHARLES SCHWAB CORPORATION. THE', target: 'SKY BANK'}, {label: 'competition', source: 'CHARLES SCHWAB CORPORATION. THE', target: 'MUSTANG FINANCIAL CORPORATION'}, {label: 'competition', source: 'CHARLES SCHWAB CORPORATION. THE', target: 'PINEDALE BRANCH'}, {label: 'competition', source: 'GREAT WESTERN FINANCIAL CORPORATION', target: 'IBI AND ASSOCIATES'}, {label: 'competition', source: 'GREAT WESTERN FINANCIAL CORPORATION', target: 'SUMMIT COMMERCIAL LEASING CORPORATION'}, {label: 'competition', source: 'GREAT WESTERN FINANCIAL CORPORATION', target: 'BAY STATE CORPORATION LIMITED'}, {label: 'competition', source: 'GREAT WESTERN FINANCIAL CORPORATION', target: 'SEATTLE BRANCH'}, {label: 'competition', source: 'GREAT WESTERN FINANCIAL CORPORATION', target: 'FIRST SECURITY LEASING COMPANY'}, {label: 'competition', source: 'GENERAL ELECTRIC CAPITAL CORPORATION', target: 'HK RAV V PARTNERSHIP. THE'}, {label: 'competition', source: 'GENERAL ELECTRIC CAPITAL CORPORATION', target: 'GENERAL ELECTRIC CREDIT CORPORATION OF TENNESSEE'}, {label: 'competition', source: 'GENERAL ELECTRIC CAPITAL CORPORATION', target: 'MUSTANG FINANCIAL CORPORATION'}, {label: 'competition', source: 'HK RAV V PARTNERSHIP. THE', target: 'GENERAL ELECTRIC CREDIT CORPORATION OF TENNESSEE'}, {label: 'competition', source: 'HK RAV V PARTNERSHIP. THE', target: 'BNY MELLON COMMUNITY DEVELOPMENT CORPORATION'}, {label: 'competition', source: 'HK RAV V PARTNERSHIP. THE', target: 'BBANDT CORPORATION'}, {label: 'competition', source: 'HK RAV V PARTNERSHIP. THE', target: 'SKY BANK'}, {label: 'competition', source: 'HK RAV V PARTNERSHIP. THE', target: 'FREEDOM FINANCIAL LIFE INSURANCE COMPANY'}, {label: 'competition', source: 'HK RAV V PARTNERSHIP. THE', target: 'PINEDALE BRANCH'}, {label: 'competition', source: 'YARDVILLE BRANCH', target: 'BBANDT CORPORATION'}, {label: 'competition', source: 'YARDVILLE BRANCH', target: 'LOUISVILLE MAIN OFFICE'}, {label: 'competition', source: 'YARDVILLE BRANCH', target: 'CHESTERTOWN BRANCH'}, {label: 'competition', source: 'YARDVILLE BRANCH', target: 'PINEDALE BRANCH'}, {label: 'competition', source: 'YARDVILLE BRANCH', target: 'DALTON MAIN BRANCH'}, {label: 'competition', source: 'YARDVILLE BRANCH', target: 'BRINKLEY PLAZA BRANCH'}, {label: 'competition', source: 'BBANDT CORPORATION', target: 'RICHMOND RIVERFRONT BRANCH'}, {label: 'competition', source: 'BBANDT CORPORATION', target: 'HYATT HOTELS CORPORATION'}, {label: 'competition', source: 'BBANDT CORPORATION', target: 'FIRST SECURITY LEASING COMPANY'}, {label: 'competition', source: 'BBANDT CORPORATION', target: 'RIVERTON STATE BANK HOLDING COMPANY'}, {label: 'competition', source: 'BBANDT CORPORATION', target: 'MUSTANG FINANCIAL CORPORATION'}, {label: 'competition', source: 'BBANDT CORPORATION', target: 'PINEDALE BRANCH'}, {label: 'competition', source: 'CUSTODIAL TRUST COMPANY', target: 'JPMORGAN CHASE AND CO.'}, {label: 'competition', source: 'CUSTODIAL TRUST COMPANY', target: 'CNB CAPITAL TRUST I'}, {label: 'competition', source: 'JPMORGAN CHASE AND CO.', target: 'PNC FINANCIAL SERVICES GROUP. INC.. THE'}, {label: 'competition', source: 'NORTH AKARD STREET BRANCH', target: 'WAUKEGAN OFFICE'}, {label: 'competition', source: 'NORTH AKARD STREET BRANCH', target: 'AVON 56 LIMITED'}, {label: 'competition', source: 'BRACEBRIDGE CORPORATION', target: 'BANKBOSTON CAPITAL TRUST I'}, {label: 'competition', source: 'BRACEBRIDGE CORPORATION', target: 'AVON 56 LIMITED'}, {label: 'competition', source: 'BRACEBRIDGE CORPORATION', target: '60 WALL STREET BRANCH'}, {label: 'competition', source: 'BRACEBRIDGE CORPORATION', target: 'BAY STATE CORPORATION LIMITED'}, {label: 'competition', source: 'BRACEBRIDGE CORPORATION', target: 'PINEDALE BRANCH'}, {label: 'competition', source: 'BANKBOSTON CAPITAL TRUST I', target: 'IBI AND ASSOCIATES'}, {label: 'competition', source: 'BANKBOSTON CAPITAL TRUST I', target: 'AVON 56 LIMITED'}, {label: 'competition', source: 'BANKBOSTON CAPITAL TRUST I', target: '60 WALL STREET BRANCH'}, {label: 'competition', source: 'BANKBOSTON CAPITAL TRUST I', target: 'BAY STATE CORPORATION LIMITED'}, {label: 'competition', source: 'BANKBOSTON CAPITAL TRUST I', target: 'PINEDALE BRANCH'}, {label: 'competition', source: 'ARCTURUS TRUSTEE LIMITED', target: 'AVON 56 LIMITED'}, {label: 'competition', source: 'AVON 56 LIMITED', target: 'GENERAL ELECTRIC CREDIT AND LEASING CORPORATION'}, {label: 'competition', source: 'AVON 56 LIMITED', target: 'GE CAPITAL TRADE SERVICES. LIMITED'}, {label: 'competition', source: 'AVON 56 LIMITED', target: 'MILLSBORO BRANCH'}, {label: 'competition', source: 'AVON 56 LIMITED', target: 'HELLER LDA.'}, {label: 'competition', source: 'FANDM TRUST COMPANY', target: 'F AND H REALTY CORPORATION'}, {label: 'competition', source: 'JPM CAPITAL TRUST I', target: 'FREEDOM FINANCIAL LIFE INSURANCE COMPANY'}, {label: 'competition', source: 'JPM CAPITAL TRUST I', target: 'GENERAL ELECTRIC CREDIT CORPORATION OF TENNESSEE'}, {label: 'competition', source: 'JPM CAPITAL TRUST I', target: 'ONE PERCENT HOLDING CORPORATION'}, {label: 'competition', source: 'FREEDOM FINANCIAL LIFE INSURANCE COMPANY', target: 'GENERAL ELECTRIC CREDIT CORPORATION OF TENNESSEE'}, {label: 'competition', source: 'FREEDOM FINANCIAL LIFE INSURANCE COMPANY', target: 'CHASE CAPITAL VII'}, {label: 'competition', source: 'FREEDOM FINANCIAL LIFE INSURANCE COMPANY', target: 'BNY MELLON COMMUNITY DEVELOPMENT CORPORATION'}, {label: 'competition', source: 'FREEDOM FINANCIAL LIFE INSURANCE COMPANY', target: 'MFI HOLDING CORPORATION'}, {label: 'competition', source: 'GALESBURG BRANCH', target: 'BRINKLEY PLAZA BRANCH'}, {label: 'competition', source: 'GALESBURG BRANCH', target: 'WEST SUBSIDIARY CORPORATION'}, {label: 'competition', source: 'GALESBURG BRANCH', target: 'DALTON MAIN BRANCH'}, {label: 'competition', source: 'GALESBURG BRANCH', target: 'BAY STATE CORPORATION LIMITED'}, {label: 'competition', source: 'GALESBURG BRANCH', target: 'FIRST SECURITY CORPORATION'}, {label: 'competition', source: 'GALESBURG BRANCH', target: 'COASTAL PLANNERS HOLDING CORPORATION'}, {label: 'competition', source: 'GALESBURG BRANCH', target: 'NORTHERN TRUST COMPANY OF DELAWARE. THE'}, {label: 'competition', source: 'GALESBURG BRANCH', target: 'MICHIGAN FINANCIAL CORPORATION'}, {label: 'competition', source: 'GALESBURG BRANCH', target: 'NEW CENTURY FINANCIAL CORPORATION'}, {label: 'competition', source: 'BRINKLEY PLAZA BRANCH', target: 'RICHMOND RIVERFRONT BRANCH'}, {label: 'competition', source: 'BRINKLEY PLAZA BRANCH', target: 'BAY STATE CORPORATION LIMITED'}, {label: 'competition', source: 'BRINKLEY PLAZA BRANCH', target: 'CAPITAL ONE. NATIONAL ASSOCIATION'}, {label: 'competition', source: 'BRINKLEY PLAZA BRANCH', target: 'MICHIGAN FINANCIAL CORPORATION'}, {label: 'competition', source: 'BRINKLEY PLAZA BRANCH', target: 'ONYX ACCEPTANCE CORPORATION'}, {label: 'competition', source: 'BRINKLEY PLAZA BRANCH', target: 'MAM (DE) TRUST'}, {label: 'competition', source: 'BRINKLEY PLAZA BRANCH', target: 'BROAD STREET DOWNTOWN'}, {label: 'competition', source: 'IBI AND ASSOCIATES', target: 'CONESTOGA MANAGEMENT COMPANY'}, {label: 'competition', source: 'IBI AND ASSOCIATES', target: 'SEATTLE BRANCH'}, {label: 'competition', source: 'IBI AND ASSOCIATES', target: 'NEW CENTURY FINANCIAL CORPORATION'}, {label: 'competition', source: 'IBI AND ASSOCIATES', target: 'CNB CAPITAL TRUST I'}, {label: 'competition', source: 'IBI AND ASSOCIATES', target: 'LINCOLN FIRST REAL ESTATE CREDIT CORPORATION'}, {label: 'competition', source: 'GE CAPITAL DE MEXICO. S. DE R. L. DE C. V.', target: 'BAY STATE CORPORATION LIMITED'}, {label: 'competition', source: 'GE CAPITAL DE MEXICO. S. DE R. L. DE C. V.', target: 'DALTON MAIN BRANCH'}, {label: 'competition', source: 'BAY STATE CORPORATION LIMITED', target: 'SUMMIT COMMERCIAL LEASING CORPORATION'}, {label: 'competition', source: 'BAY STATE CORPORATION LIMITED', target: '601 WEST 5TH STREET OFFICE'}, {label: 'competition', source: 'BAY STATE CORPORATION LIMITED', target: 'RIVERTON STATE BANK HOLDING COMPANY'}, {label: 'competition', source: 'BAY STATE CORPORATION LIMITED', target: 'BLC BANK NATIONAL ASSOCIATION'}, {label: 'competition', source: 'BAY STATE CORPORATION LIMITED', target: 'CNB CAPITAL TRUST I'}, {label: 'competition', source: 'BAY STATE CORPORATION LIMITED', target: 'BROAD STREET DOWNTOWN'}, {label: 'competition', source: 'BAY STATE CORPORATION LIMITED', target: 'MICHIGAN FINANCIAL CORPORATION'}, {label: 'competition', source: 'BAY STATE CORPORATION LIMITED', target: 'SKY BANK'}, {label: 'competition', source: 'BAY STATE CORPORATION LIMITED', target: 'PINEDALE BRANCH'}, {label: 'competition', source: 'CREDIT AND ASSET REPACKAGING VEHICLE CORPORATION', target: 'CITIBANK USA. NATIONAL ASSOCIATION'}, {label: 'competition', source: 'CREDIT AND ASSET REPACKAGING VEHICLE CORPORATION', target: 'CHASE MORTGAGE FINANCE CORPORATION'}, {label: 'competition', source: 'CREDIT AND ASSET REPACKAGING VEHICLE CORPORATION', target: 'WHITEHALL STREET GLOBAL REAL ESTATE LIMITED PARTNERSHIP 2001'}, {label: 'competition', source: 'CREDIT AND ASSET REPACKAGING VEHICLE CORPORATION', target: 'ALCYONE CORPORATION'}, {label: 'competition', source: 'CITIBANK USA. NATIONAL ASSOCIATION', target: 'ALCYONE CORPORATION'}, {label: 'competition', source: 'CITIBANK USA. NATIONAL ASSOCIATION', target: 'REAL ESTATE COLLATERAL MANAGEMENT COMPANY'}, {label: 'competition', source: 'CITIBANK USA. NATIONAL ASSOCIATION', target: 'STATE STREET SOUTHERN AFRICA PROPRIETARY LIMITED'}, {label: 'competition', source: 'CITIBANK USA. NATIONAL ASSOCIATION', target: 'CONESTOGA MANAGEMENT COMPANY'}, {label: 'competition', source: 'MASON-DIXON CAPITAL TRUST', target: 'NEW CENTURY FINANCIAL CORPORATION'}, {label: 'competition', source: 'MASON-DIXON CAPITAL TRUST', target: 'DALTON MAIN BRANCH'}, {label: 'competition', source: 'MASON-DIXON CAPITAL TRUST', target: 'STERLING ASSURANCE COMPANY'}, {label: 'competition', source: 'MASON-DIXON CAPITAL TRUST', target: 'NORTHERN TRUST COMPANY OF DELAWARE. THE'}, {label: 'competition', source: 'MASON-DIXON CAPITAL TRUST', target: 'HAMBRECHT AND QUIST GROUP'}, {label: 'competition', source: 'NEW CENTURY FINANCIAL CORPORATION', target: 'WEST SUBSIDIARY CORPORATION'}, {label: 'competition', source: 'NEW CENTURY FINANCIAL CORPORATION', target: 'COASTAL PLANNERS HOLDING CORPORATION'}, {label: 'competition', source: 'NEW CENTURY FINANCIAL CORPORATION', target: 'PINEDALE BRANCH'}, {label: 'competition', source: 'NEW CENTURY FINANCIAL CORPORATION', target: 'BROAD STREET DOWNTOWN'}, {label: 'competition', source: 'DALTON MAIN BRANCH', target: 'RICHMOND RIVERFRONT BRANCH'}, {label: 'competition', source: 'DALTON MAIN BRANCH', target: 'HAMBRECHT AND QUIST GROUP'}, {label: 'competition', source: 'DALTON MAIN BRANCH', target: 'SPRINGFIELD GA BRANCH'}, {label: 'competition', source: 'CONESTOGA MANAGEMENT COMPANY', target: 'LINCOLN FIRST REAL ESTATE CREDIT CORPORATION'}, {label: 'competition', source: 'CHIBA BANK. LTD.. THE', target: 'GLOBAL ATLANTIC FINANCIAL GROUP LIMITED'}, {label: 'competition', source: 'CHIBA BANK. LTD.. THE', target: 'KATY BRANCH'}, {label: 'competition', source: 'CHIBA BANK. LTD.. THE', target: 'ADAM CAPITAL TRUST I'}, {label: 'competition', source: 'GLOBAL ATLANTIC FINANCIAL GROUP LIMITED', target: 'KATY BRANCH'}, {label: 'competition', source: 'GLOBAL ATLANTIC FINANCIAL GROUP LIMITED', target: 'ADAM CAPITAL TRUST I'}, {label: 'competition', source: 'CHASE MORTGAGE FINANCE CORPORATION', target: 'WHITEHALL STREET GLOBAL REAL ESTATE LIMITED PARTNERSHIP 2001'}, {label: 'competition', source: 'CHASE MORTGAGE FINANCE CORPORATION', target: 'BRISTOL EXIT 7 BRANCH'}, {label: 'competition', source: 'CHASE MORTGAGE FINANCE CORPORATION', target: 'NATIONAL EQUITY FUND 2000'}, {label: 'competition', source: 'CHASE MORTGAGE FINANCE CORPORATION', target: 'STATE STREET SOUTHERN AFRICA PROPRIETARY LIMITED'}, {label: 'competition', source: 'BRISTOL EXIT 7 BRANCH', target: 'MCKNIGHT BRANCH'}, {label: 'competition', source: 'BRISTOL EXIT 7 BRANCH', target: 'FARMINGTON NM BRANCH'}, {label: 'competition', source: 'STERLING ASSURANCE COMPANY', target: 'KENNEDY PLAZA'}, {label: 'competition', source: 'STERLING ASSURANCE COMPANY', target: 'PNC FINANCIAL SERVICES GROUP. INC.. THE'}, {label: 'competition', source: 'STERLING ASSURANCE COMPANY', target: 'SUMMIT COMMERCIAL LEASING CORPORATION'}, {label: 'competition', source: 'STERLING ASSURANCE COMPANY', target: '60 WALL STREET BRANCH'}, {label: 'competition', source: 'STERLING ASSURANCE COMPANY', target: 'CHASE INTERNATIONAL CAPITAL FINANCE LIMITED'}, {label: 'competition', source: 'STERLING ASSURANCE COMPANY', target: 'NOBILITY HILL REALTY TRUST'}, {label: 'competition', source: 'KENNEDY PLAZA', target: 'SUMMIT CAPITAL TRUST I'}, {label: 'competition', source: 'KENNEDY PLAZA', target: 'BAC CAPITAL TRUST XI'}, {label: 'competition', source: 'KENNEDY PLAZA', target: 'CHASE CAPITAL VII'}, {label: 'competition', source: 'KENNEDY PLAZA', target: 'COASTAL PLANNERS HOLDING CORPORATION'}, {label: 'competition', source: 'CAPITAL ONE. NATIONAL ASSOCIATION', target: 'SUMMIT COMMERCIAL LEASING CORPORATION'}, {label: 'competition', source: 'CAPITAL ONE. NATIONAL ASSOCIATION', target: 'RIVERTON STATE BANK HOLDING COMPANY'}, {label: 'competition', source: 'CAPITAL ONE. NATIONAL ASSOCIATION', target: 'BROAD STREET DOWNTOWN'}, {label: 'competition', source: 'CAPITAL ONE. NATIONAL ASSOCIATION', target: 'MAM (DE) TRUST'}, {label: 'competition', source: 'CAPITAL ONE. NATIONAL ASSOCIATION', target: 'KATY BRANCH'}, {label: 'competition', source: 'CAPITAL ONE. NATIONAL ASSOCIATION', target: 'ONYX ACCEPTANCE CORPORATION'}, {label: 'competition', source: 'CAPITAL ONE. NATIONAL ASSOCIATION', target: 'HAMBRECHT AND QUIST GROUP'}, {label: 'competition', source: 'CAPITAL ONE. NATIONAL ASSOCIATION', target: 'DREYFUS CORPORATION. THE'}, {label: 'competition', source: 'CAPITAL ONE. NATIONAL ASSOCIATION', target: 'PINEDALE BRANCH'}, {label: 'competition', source: '60 WALL STREET BRANCH', target: 'BANC ONE ARIZONA INVESTMENT CORPORATION'}, {label: 'competition', source: '60 WALL STREET BRANCH', target: 'CHASE INTERNATIONAL CAPITAL FINANCE LIMITED'}, {label: 'competition', source: 'BANC ONE ARIZONA INVESTMENT CORPORATION', target: 'BANK OF TOKYO-MITSUBISHI UFJ. LTD.. THE'}, {label: 'competition', source: 'BANC ONE ARIZONA INVESTMENT CORPORATION', target: 'ONYX ACCEPTANCE CORPORATION'}, {label: 'competition', source: 'BANC ONE ARIZONA INVESTMENT CORPORATION', target: 'ONE PERCENT HOLDING CORPORATION'}, {label: 'competition', source: 'BNY MELLON COMMUNITY DEVELOPMENT CORPORATION', target: 'MFI HOLDING CORPORATION'}, {label: 'competition', source: 'BNY MELLON COMMUNITY DEVELOPMENT CORPORATION', target: 'MILLSBORO BRANCH'}, {label: 'competition', source: 'MFI HOLDING CORPORATION', target: 'SENIOR HOUSING CRIME PREVENTION FOUNDATION INVESTMENT CORPORATION'}, {label: 'competition', source: 'FIRST SECURITY LEASING COMPANY', target: 'VANCOUVER MAIN OFFICE'}, {label: 'competition', source: 'FIRST SECURITY LEASING COMPANY', target: 'SKY BANK'}, {label: 'competition', source: 'FIRST SECURITY LEASING COMPANY', target: 'PINEDALE BRANCH'}, {label: 'competition', source: '601 WEST 5TH STREET OFFICE', target: 'VANCOUVER MAIN OFFICE'}, {label: 'competition', source: '601 WEST 5TH STREET OFFICE', target: 'KATY BRANCH'}, {label: 'competition', source: 'LINCOLN FIRST REAL ESTATE CREDIT CORPORATION', target: 'NEW YORK EQUITY FUND 1993 LIMITED PARTNERSHIP'}, {label: 'competition', source: 'LINCOLN FIRST REAL ESTATE CREDIT CORPORATION', target: 'BROAD STREET DOWNTOWN'}, {label: 'competition', source: 'LINCOLN FIRST REAL ESTATE CREDIT CORPORATION', target: 'ARIEL CAPITAL REINSURANCE COMPANY. LIMITED'}, {label: 'competition', source: 'LINCOLN FIRST REAL ESTATE CREDIT CORPORATION', target: 'ISM'}, {label: 'competition', source: 'NEW YORK EQUITY FUND 1993 LIMITED PARTNERSHIP', target: 'NORTHERN TRUST COMPANY OF DELAWARE. THE'}, {label: 'competition', source: 'RICHMOND RIVERFRONT BRANCH', target: 'HYATT HOTELS CORPORATION'}, {label: 'competition', source: 'CNB CAPITAL TRUST I', target: 'PINEDALE BRANCH'}, {label: 'competition', source: 'CNB CAPITAL TRUST I', target: 'RIVERTON STATE BANK HOLDING COMPANY'}, {label: 'competition', source: 'CNB CAPITAL TRUST I', target: 'SKY BANK'}, {label: 'competition', source: 'SEATTLE BRANCH', target: 'VANCOUVER MAIN OFFICE'}, {label: 'competition', source: 'SEATTLE BRANCH', target: 'WEST SUBSIDIARY CORPORATION'}, {label: 'competition', source: 'SEATTLE BRANCH', target: 'PINEDALE BRANCH'}, {label: 'competition', source: 'KATY BRANCH', target: 'BAC CAPITAL TRUST XI'}, {label: 'competition', source: 'KATY BRANCH', target: 'CHESTERTOWN BRANCH'}, {label: 'competition', source: 'KATY BRANCH', target: 'ONYX ACCEPTANCE CORPORATION'}, {label: 'competition', source: 'KATY BRANCH', target: 'PINEDALE BRANCH'}, {label: 'competition', source: 'NATIONAL EQUITY FUND 2000', target: 'REAL ESTATE COLLATERAL MANAGEMENT COMPANY'}, {label: 'competition', source: 'NATIONAL EQUITY FUND 2000', target: 'MCKNIGHT BRANCH'}, {label: 'competition', source: 'NATIONAL EQUITY FUND 2000', target: 'ARIEL CAPITAL REINSURANCE COMPANY. LIMITED'}, {label: 'competition', source: 'VANCOUVER MAIN OFFICE', target: 'FIRST SECURITY CORPORATION'}, {label: 'competition', source: 'VANCOUVER MAIN OFFICE', target: 'MICHIGAN FINANCIAL CORPORATION'}, {label: 'competition', source: 'MBC FINANCIAL CORPORATION', target: 'COASTAL PLANNERS HOLDING CORPORATION'}, {label: 'competition', source: 'CAPITAL ONE BANK (USA). NATIONAL ASSOCIATION', target: 'ONYX ACCEPTANCE CORPORATION'}, {label: 'competition', source: 'ONYX ACCEPTANCE CORPORATION', target: 'BANK OF TOKYO-MITSUBISHI UFJ. LTD.. THE'}, {label: 'competition', source: 'ONYX ACCEPTANCE CORPORATION', target: 'BROAD STREET DOWNTOWN'}, {label: 'competition', source: 'ONYX ACCEPTANCE CORPORATION', target: 'MICHIGAN FINANCIAL CORPORATION'}, {label: 'competition', source: 'ONYX ACCEPTANCE CORPORATION', target: 'SKY BANK'}, {label: 'competition', source: 'COASTAL PLANNERS HOLDING CORPORATION', target: 'COMMUNITY HISTORIC CREDIT FUND V LIMITED PARTNERSHIP'}, {label: 'competition', source: 'COASTAL PLANNERS HOLDING CORPORATION', target: 'DREYFUS CORPORATION. THE'}, {label: 'competition', source: 'PNC FINANCIAL SERVICES GROUP. INC.. THE', target: 'PINEDALE BRANCH'}, {label: 'competition', source: 'BROAD STREET DOWNTOWN', target: 'MAM (DE) TRUST'}, {label: 'competition', source: 'BROAD STREET DOWNTOWN', target: 'BOSTON BRANCH'}, {label: 'competition', source: 'ADAM CAPITAL TRUST I', target: 'SPARTANBURG MAIN BRANCH'}, {label: 'competition', source: 'ADAM CAPITAL TRUST I', target: 'BOSTON BRANCH'}, {label: 'competition', source: 'SPARTANBURG MAIN BRANCH', target: 'SKY BANK'}, {label: 'competition', source: 'B OF A ISSUANCE B.V.', target: 'RECEIVABLES-ONLINE CORPORATION'}, {label: 'competition', source: 'FIRST SECURITY CORPORATION', target: 'CHASE INTERNATIONAL CAPITAL FINANCE LIMITED'}, {label: 'competition', source: 'FIRST SECURITY CORPORATION', target: 'MUSTANG FINANCIAL CORPORATION'}, {label: 'competition', source: 'FIRST SECURITY CORPORATION', target: 'CHASE CAPITAL VII'}, {label: 'competition', source: 'CHASE INTERNATIONAL CAPITAL FINANCE LIMITED', target: 'SALT LAKE CITY BRANCH'}, {label: 'competition', source: 'CHASE INTERNATIONAL CAPITAL FINANCE LIMITED', target: 'HYATT HOTELS CORPORATION'}, {label: 'competition', source: 'BANK OF TOKYO-MITSUBISHI UFJ. LTD.. THE', target: 'DREYFUS CORPORATION. THE'}, {label: 'competition', source: 'GENERAL ELECTRIC CREDIT CORPORATION OF TENNESSEE', target: 'GE CAPITAL TRADE SERVICES. LIMITED'}, {label: 'competition', source: 'SKY BANK', target: 'RIVERTON STATE BANK HOLDING COMPANY'}, {label: 'competition', source: 'SKY BANK', target: 'BANKAMERICA CORPORATION'}, {label: 'competition', source: 'SKY BANK', target: 'CHASE CAPITAL VII'}, {label: 'competition', source: 'SKY BANK', target: 'PINEDALE BRANCH'}, {label: 'competition', source: 'SECURITY-FIRST COMPANY', target: 'HYATT HOTELS CORPORATION'}, {label: 'competition', source: 'SECURITY-FIRST COMPANY', target: 'GENERAL ELECTRIC CREDIT AND LEASING CORPORATION'}, {label: 'competition', source: 'HYATT HOTELS CORPORATION', target: 'GENERAL ELECTRIC CREDIT AND LEASING CORPORATION'}, {label: 'competition', source: 'BANKAMERICA CORPORATION', target: 'CHASE CAPITAL VII'}, {label: 'competition', source: 'BANKAMERICA CORPORATION', target: 'PINEDALE BRANCH'}, {label: 'competition', source: 'CHASE CAPITAL VII', target: 'WEST SUBSIDIARY CORPORATION'}, {label: 'competition', source: 'CHASE CAPITAL VII', target: 'MILLSBORO BRANCH'}, {label: 'competition', source: 'WEST SUBSIDIARY CORPORATION', target: 'PINEDALE BRANCH'}, {label: 'competition', source: 'MAM (DE) TRUST', target: 'NORTHERN TRUST COMPANY OF DELAWARE. THE'}, {label: 'competition', source: 'BLC BANK NATIONAL ASSOCIATION', target: 'PINEDALE BRANCH'}, {label: 'competition', source: 'BLC BANK NATIONAL ASSOCIATION', target: 'RIVERTON STATE BANK HOLDING COMPANY'}, {label: 'competition', source: 'REAL ESTATE COLLATERAL MANAGEMENT COMPANY', target: 'BELMONT FINANCIAL NETWORK'}, {label: 'competition', source: 'BELMONT FINANCIAL NETWORK', target: 'MCKNIGHT BRANCH'}, {label: 'competition', source: 'MUSTANG FINANCIAL CORPORATION', target: 'PINEDALE BRANCH'}, {label: 'competition', source: 'PINEDALE BRANCH', target: 'CHESTERTOWN BRANCH'}, {label: 'competition', source: 'ALCYONE CORPORATION', target: 'MCKNIGHT BRANCH'}, {label: 'competition', source: 'ALCYONE CORPORATION', target: 'ISM'}, {label: 'competition', source: 'ALCYONE CORPORATION', target: 'GE CAPITAL COMMERCIAL MORTGAGE CORPORATION'}, {label: 'competition', source: 'ALCYONE CORPORATION', target: 'STATE STREET SOUTHERN AFRICA PROPRIETARY LIMITED'}, {label: 'competition', source: 'ALCYONE CORPORATION', target: 'FARMINGTON NM BRANCH'}, {label: 'competition', source: 'MCKNIGHT BRANCH', target: 'GE CAPITAL COMMERCIAL MORTGAGE CORPORATION'}, {label: 'competition', source: 'MCKNIGHT BRANCH', target: 'STATE STREET SOUTHERN AFRICA PROPRIETARY LIMITED'}, {label: 'competition', source: 'MCKNIGHT BRANCH', target: 'FARMINGTON NM BRANCH'}, {label: 'competition', source: 'GE CAPITAL ASSIGNMENT CORPORATION', target: 'EQUITY ASSET INVESTMENT TRUST'}, {label: 'competition', source: 'GE CAPITAL COMMERCIAL MORTGAGE CORPORATION', target: 'FARMINGTON NM BRANCH'}, {label: 'competition', source: 'ISM', target: 'ARIEL CAPITAL REINSURANCE COMPANY. LIMITED'}, {label: 'competition', source: 'STATE STREET SOUTHERN AFRICA PROPRIETARY LIMITED', target: 'FARMINGTON NM BRANCH'}]}


        /*const Graph = ForceGraph3D()
		(document.getElementById('3d-graph'))
			.jsonUrl('js/full_graph.json')
			.nodeAutoColorBy('group')
			//.linkAutoColorBy(d => gData.nodes[d.source].group)
			.linkOpacity(0.5)
			.nodeLabel('id')
            .onNodeClick(node =>  $scope.graph_on_click(node))
			//.graphData(newData)
            .linkColor(link => $scope.graph_node_color(link))
            .height(800)
            .width(800);*/

		console.log("graph");

	}; //the function

    $scope.graph_link_color =function(link)
    {
        if (link['label']=='Affiliate')
        {
            return 'green';
        }
        return "red";
    };
    $scope.graph_node_color =function(node)
    {

        return "#3ba4bc";
    };



    $scope.graph_on_click = function (node)
    {
        $("#comp_info").css("display","block");
        document.getElementById("graph_comp_name").innerText=node['id'];




    };

    $scope.get_python = function () {
        console.log("try python");
        $http({
            method: 'POST',
            url: 'php/get_python.php',
            params: {
                company:  $scope.selectedCompany
            }
        }).then(function (data) {

            console.log(data.data);

            /*var graph_data=data.data;
            graph_data=graph_data.replace("\'nodes\'","\"nodes\"");
            graph_data=graph_data.replace(/'directed': False, 'multigraph': False, 'graph': {},/g,"");
            graph_data=graph_data.replace(/'id'/g,"\"id\"");
            graph_data=graph_data.replace(/'links'/g,"\"links\"");
            graph_data=graph_data.replace(/'label'/g,"\"label\"");
            graph_data=graph_data.replace(/'source'/g,"\"source\"");
            graph_data=graph_data.replace(/'target'/g,"\"target\"");
            graph_data=graph_data.replace(/'/g,"\"");
            //console.log("\n"+graph_data);
            const graph_data_json=JSON.parse(graph_data);*/
            const Graph = ForceGraph3D()
            (document.getElementById('3d-graph'))
                //.jsonUrl(data.data)
                .graphData(data.data)
                .backgroundColor('#e5e5e5')
                .nodeAutoColorBy('group')
                //.linkAutoColorBy(d => gData.nodes[d.source].group)
                .linkOpacity(0.5)
                //.nodeLabel('id')
                .onNodeClick(node =>  $scope.graph_on_click(node))
                .nodeColor(node=> $scope.graph_node_color(node))

                .linkColor(link => $scope.graph_link_color(link))
                .height(300)
                .width(600)
                .showNavInfo(0)

                .nodeLabel(d => `<span style="color: #403d3e">${d.id}</span>`);


        });


    };

	$scope.showDoughnut = function ()
	{
		console.log("showDoughnut");

        $http({
            method: 'POST',
            url: 'php/getNumOfConnections.php',
            params: {

            }
        }).then(function (data) {
			if (data.data.length !== 0){
                console.log(data);
				$scope.connections=(data.data);

                let letters = '0123456789ABCDEF';
                let color = '#';
                let colors=[];
                let connectionsCount=[];
                let label=[];
                for (let j=0;j<$scope.connections.length;j++)
                {
                    color = '#';
                    for (let i = 0; i < 6; i++ ) {
                        color += letters[Math.floor(Math.random() * 16)];
                    }
                    colors.push(color);
                    connectionsCount.push($scope.connections[j]['count']);
                    label.push($scope.connections[j]['relation']);
                }
                console.log(colors);


                var ctx = document.getElementById("ConnectionDoughnutChart").getContext("2d");
                if ($scope.ConnectionDoughnutChart){
                    $scope.ConnectionDoughnutChart.destroy();
                }

                var ctx2 = document.getElementById("IndustryDoughnutChart").getContext("2d");
                if ($scope.IndustryDoughnutChart){
                    $scope.IndustryDoughnutChart.destroy();
                }

                var ctx3 = document.getElementById("ProductsDoughnutChart").getContext("2d");
                if ($scope.ProductsDoughnutChart){
                    $scope.ProductsDoughnutChart.destroy();
                }

                $scope.ConnectionDoughnutChart  = new Chart(ctx,{
                    type: 'doughnut',
                    data : {
                        datasets: [{
                            data: connectionsCount,
                            backgroundColor: colors
                        }],
                        labels: label,

                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Connections Type Chart'
                        },
                        cutoutPercentage:50,
                        legend:{display:true}},
                });

                $scope.IndustryDoughnutChart  = new Chart(ctx2,{
                    type: 'doughnut',
                    data : {
                        datasets: [{
                            data: connectionsCount,
                            backgroundColor: colors
                        }],
                        labels: label,

                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Industry Chart'
                        },
                        cutoutPercentage:50,
                        legend:{display:true}},
                });

                $scope.ProductsDoughnutChart  = new Chart(ctx3,{
                    type: 'doughnut',
                    data : {
                        datasets: [{
                            data: connectionsCount,
                            backgroundColor: colors
                        }],
                        labels: label,

                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Products Chart'
                        },
                        cutoutPercentage:50,
                        legend:{display:true}},
                });

                document.getElementById("ConnectionDoughnutChart").innerHTML=$scope.ConnectionDoughnutChart ;
                document.getElementById("IndustryDoughnutChart").innerHTML=$scope.IndustryDoughnutChart ;
                document.getElementById("ProductsDoughnutChart").innerHTML=$scope.ProductsDoughnutChart ;

            }
			else {
				console.log('get companies failed');
			}
		});
	};

    $scope.getDistinctConnections = function (){
        $http({
            method: 'POST',
            url: 'php/getDistinctConnections.php',
            params: {

            }
        }).then(function (data) {
            let connections = {};
            for (const item in data.data){
                connections[data.data[item]['relation']] = {'name': data.data[item]['relation'], 'isChecked' : 1};
                //connections.push(data.data[item]['relation']);
            }
            $scope.distinctConnections = connections;
            console.log("getdistinctConnections");
            console.log($scope.distinctConnections);
        });

    };

	$scope.showBarChart = function () {
	    console.log("showBarChart");
        document.getElementById("stackedBar").innerHTML = "";

        $http({
            method: 'POST',
            url: 'php/getBiggestCompanies.php',
            data: $.param({
                distinctConnections : $scope.distinctConnections
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (data) {
            console.log("GET TOP 5");
            console.log(data.data);

            if (data.data.length !== 0) {

                let xLabels = [];

                let dataForY = {};
                for(let item in $scope.distinctConnections){
                    dataForY[item] = new Array(5).fill(0);
                }

                for (let i = 1 ; i <= 5; i++){
                    for (let item in data.data){
                        if((data.data)[item]['id'] === i){
                            const name = (data.data)[item]['name'];
                            const id = (data.data)[item]['id'];
                            if (xLabels.indexOf(name) === -1 ){
                                xLabels.push(name);
                            }
                            const relationType = (data.data)[item]['relation'];
                            dataForY[relationType][id-1] = (data.data)[item]['count'];
                        }
                    }
                }

                console.log("dataForY");
                console.log(dataForY);

                let letters = '0123456789ABCDEF';
                let color = '#';
                let colors=[];
                for (let j=0; j < Object.keys($scope.distinctConnections).length ; j++)
                {
                    color = '#';
                    for (let i = 0; i < 6; i++ ) {
                        color += letters[Math.floor(Math.random() * 16)];
                    }
                    colors.push(color);
                }

                console.log("colors");
                console.log(colors);


                let dataSets = [];
                let j = 0;
                for(let item in $scope.distinctConnections){
                    const relation = item;
                    const itemForDataSets = {label: relation,
                        data: dataForY[relation], backgroundColor: colors[j]};
                    dataSets.push(itemForDataSets);
                    j++;
                }

                const ctx = document.getElementById("stackedBar").getContext("2d");
                if ($scope.stackedBar){
                    $scope.stackedBar.destroy();
                }

                $scope.stackedBar = new Chart(ctx, {
                    type: 'horizontalBar',
                    data: {
                        labels: xLabels,
                        datasets: dataSets
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                stacked: true,
                                ticks: {
                                    fontColor: "white",
                                    fontSize: 10,
                                    stepSize: 1,
                                    beginAtZero: true,
                                    autoSkip: false
                                }
                            }],
                            yAxes: [{
                                stacked: true,
                                ticks: {
                                    fontColor: "white",
                                    fontSize: 10,
                                }
                            }]
                        }
                    }
                });

                document.getElementById("stackedBar").innerHTML = $scope.stackedBar;

            } else {
                console.log('get companies of showBarChart failed');
            }
        });
    };

    $scope.showBarOfBiggestCompanyBySubsidiary= function () {
        $http({
            method: 'POST',
            url: 'php/getBiggestCompaniesBySubsidiary.php',
            params: {}
        }).then(function (data) {
            console.log("GET showBarOfBiggestCompany");
            console.log(data.data);
        });
    };

	$scope.filterBy = function(filter){
	    $scope.filterBySearchByName = filter;
        document.getElementById("dropdownMenuLink").innerHTML = "Filter By: " + filter;
    };

    $scope.get_countries = function()
    {
        $http({
            method: 'POST',
            url: 'php/getCountries.php',
            params: {

            }
        }).then(function (data) {
        	let countries = [];
        	for (const item in data.data){
        		countries.push(data.data[item]['country']);
			}
            $scope.arrayOfCountries = countries;
        });

    };

    $scope.getIframeSrc = function ()
    {
        $("#googleMap").hide();
        $("#loadingMap").show();
        console.log("LOAD");
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

        $("#loadingMap").hide();
        console.log("FINISH LOAD");
        $("#googleMap").show();
    };

    $scope.getStatesByCountry = function (callback)
    {
        console.log("GET states");
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
            console.log("LEN", $scope.arrayOfStates.length);
            callback($scope.arrayOfStates.length);
        });
    };

    $scope.getCities = function (callback)
    {
        console.log("GET cities");
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
    };

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
                    console.log("SHOW CITY");
                    document.getElementById("cityOptions").style.display="block";
                }
                else {
                    console.log("HIDE CITY");
                    document.getElementById("cityOptions").style.display="none";
                }
            });
        }
    };

    $scope.getStreetByData = function (callback)
    {
        console.log("GET streets");
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
    };

    $scope.changeStreet = function ()
    {
        $scope.selectedStreetValue="";
        $scope.arrayOfStreets = [];

        $scope.getStreetByData(function(len) {
            if (len > 0){
                console.log("SHOW STREET");
                document.getElementById("streetOptions").style.display="block";
            }
            else {
                console.log("HIDE STREET");
                document.getElementById("streetOptions").style.display="none";
            }
        });
    };

    $scope.updateDataCountryChange = function (){
        $scope.selectedStateValue="";
        $scope.selectedCityValue="";
        $scope.selectedStreetValue="";

        $scope.arrayOfStates = [];
        $scope.arrayOfCities = [];
        $scope.arrayOfStreets = [];

        $scope.getStatesByCountry(function(len) {
            if (len > 0){
                console.log("SHOW STATE");
                document.getElementById("stateOptions").style.display="block";
            }
            else {
                console.log("HIDE STATE");
                document.getElementById("stateOptions").style.display="none";
                console.log("STATES IS EMPTY");
                $scope.changeCity('False');
            }
        });
    };

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
                console.log($scope.resultsOfSearch);
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
            resultsElement.scrollIntoView({ behavior: 'smooth', block:'nearest'});
        });
    };

    $scope.showMoreAboutResult = function (name) {
        $("#askToSelectResult").hide();
        $("#selectedResult").show();
        $scope.selectedCompany=name;
        console.log( $scope.selectedCompany);
        //document.getElementById("selectedResult").innerText = name;

    };

    $scope.createNewStockGraph = function (name) {
	    console.log("CREATE STOCK GRAPH");
        document.getElementById("fillHrefForStock").innerHTML = '<a href="https://www.tradingview.com/symbols/NYSE-ALLY/" rel="noopener" target="_blank"><span class="blue-text">AAPL chart</span></a>';
        new TradingView.widget(
            {
                "width" : "500px",
                "height": "450px",
                "interval": "D",
                "timezone": "Etc/UTC",
                "theme": "Light",
                "style": "1",
                "locale": "en",
                "toolbar_bg": "#f1f3f6",
                "enable_publishing": false,
                "allow_symbol_change": true,
                "container_id": "tradingview_a5966"
            }
        );

    };

});	 //app.controller



/*$csv = array();

if (($file = fopen('test.csv', 'r')) === false)
{
throw new Exception('There was an error loading the CSV file.');
}
else
{
while (($line = fgetcsv($file, 1000)) !== false)
{
    $csv[] = $line;
}

fclose($handle);
}*/