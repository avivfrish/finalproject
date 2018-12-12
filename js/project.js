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

	$scope.show_insert_new_comp = function () {
        $("#new_comp").show();
        $("#home").hide();
        $("#search_comp").hide();
        $("#new_file").hide();
        $("#update_comp").hide();
        $("#delete_comp").hide();
        $("#couldnt_add_new_comp").hide();
        $("#added_comp_successfully").hide();
        $("#deleted_comp_successfully").hide();
        $("#couldnt_delete_comp").hide();
        $("#updated_comp_successfully").hide();
        $("#couldnt_update_comp").hide();
	}

    $scope.show_update_comp = function () {
        $("#update_comp").show();
        $("#home").hide();
        $("#search_comp").hide();
        $("#new_file").hide();
        $("#new_comp").hide();
        $("#delete_comp").hide();
        $("#couldnt_add_new_comp").hide();
        $("#added_comp_successfully").hide();
        $("#deleted_comp_successfully").hide();
        $("#couldnt_delete_comp").hide();
        $("#updated_comp_successfully").hide();
        $("#couldnt_update_comp").hide();
    }

    $scope.show_delete_comp = function () {
        $("#delete_comp").show();
        $("#home").hide();
        $("#search_comp").hide();
        $("#new_file").hide();
        $("#update_comp").hide();
        $("#new_comp").hide();
        $("#couldnt_add_new_comp").hide();
        $("#added_comp_successfully").hide();
        $("#deleted_comp_successfully").hide();
        $("#couldnt_delete_comp").hide();
        $("#updated_comp_successfully").hide();
        $("#couldnt_update_comp").hide();
    }

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
    }

	$scope.init_case = function (item) {
		//$("#nav").show();
		$("#home").show();
        $("#search_comp").hide();
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
		document.getElementById("loggin_user").innerHTML="Hello Avi";
		$scope.arrayOfCompIDs = [];
		$scope.selectedIdValue = '';
        $scope.selectedCompDetails = '';
        $scope.selectedNewInfo = '';
		$scope.getCompIDs();
		console.log("hello");
	} //the funtion
	


	$scope.show_search = function () {
		//show_cases_div - show cases div
		
		console.log("show search div");
		$("#home").hide();
		$("#search_comp").show();
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
		
		$("#home").show();
		$("#search_comp").hide();
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

    $scope.insertNewComp = function()
    {
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
            }
            else if (data.data == 'false') {
                $("#couldnt_add_new_comp").show();
                $("#added_comp_successfully").hide();
            }

        });

    }

    $scope.clearInsert = function()
    {
        document.getElementById('compID').value = '',
        document.getElementById('compName').value = '',
        document.getElementById('compStreet').value = '',
        document.getElementById('compCountry').value = '',
        document.getElementById('compState').value = ''
        /*$http({
            method: 'POST',
            url: 'php/azure.php',
            params: {

            }
        }).then(function (data) {
            console.log(data.data);

        });*/

    }

    $scope.clearUpdate = function()
    {
            document.getElementById('newInfo').value = ''
        /*$http({
            method: 'POST',
            url: 'php/azure.php',
            params: {

            }
        }).then(function (data) {
            console.log(data.data);

        });*/

    }

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
			$scope.arrayOfCompIDs = compIDs;
        });

    }

    $scope.deleteComp = function()
    {
        /*if ($scope.selectedIdValue in $scope.arrayOfCompIDs) {
            console.log($scope.selectedIdValue);
            console.log("id exists");
            console.log($scope.arrayOfCompIDs);
        }
        else {
            console.log($scope.selectedIdValue)
            console.log("id doesn't exist");
            console.log($scope.arrayOfCompIDs);
        }*/
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
                $("#couldnt_delete_comp").hide();
            }
            else if (data.data == 'false') {
                $("#couldnt_delete_comp").show();
                $("#deleted_comp_successfully").hide();
            }
        });

    }


    $scope.changeID = function()
    {
        $scope.getCompIDs();
        document.getElementById('selectedID').value = '';

        /*$http({
            method: 'POST',
            url: 'php/azure.php',
            params: {

            }
        }).then(function (data) {
            console.log(data.data);

        });*/

    }

    $scope.updateComp = function()
    {
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
                console.log("yes");
                $("#updated_comp_successfully").show();
                $("#couldnt_update_comp").hide();
            }
            else if (data.data == 'false') {
                console.log("no");
                $("#couldnt_update_comp").show();
                $("#updated_comp_successfully").hide();
            }
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
		var request = $http({
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

	


});	 //app.controller

	
