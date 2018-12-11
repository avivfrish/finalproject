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
		$("#home").show();
        $("#search_comp").hide();
        $scope.companies=[];
		document.getElementById("loggin_user").innerHTML="Hello Avi";
		console.log("hello");
	} //the funtion
	


	$scope.show_search = function () {
		//show_cases_div - show cases div
		
		console.log("show search div");
		$("#home").hide();
		$("#search_comp").show();
        $("#stats").hide();
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
        $("#stats").hide();

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
	}

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

	


});	 //app.controller

	
