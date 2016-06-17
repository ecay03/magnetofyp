


var rchApp=angular.module('rchApp',['ngRoute']);
	
	rchApp.config(function($routeProvider){
		$routeProvider

		.when('/',{
			templateUrl:'../RCH-module/pages/home.html',
			controller:'mainController'
		})

		.when('/mother-department',{
			templateUrl:'../RCH-module/pages/mother.html',
			controller:'motherController'
		})

		.when('/child-department',{
			templateUrl:'../RCH-module/pages/child.html',
			controller:'childController'
		})

		.when('/family-planning-department',{
			templateUrl:'../RCH-module/pages/family-planning.html',
			controller:'familyPlanningController'
		})

		.when('/programs',{
			templateUrl:'../RCH-module/pages/programs.html',
			controller:'programsController'
		})

		.when('/registration',{
			templateUrl:'../RCH-module/pages/registration.html',
			controller:'registrationController'
		})

		.when('/enrollment',{
			templateUrl:'../RCH-module/pages/program-enrollment.html',
			controller:'enrollmentController'
		})

		.when('/all-clients',{
			templateUrl:'../RCH-module/pages/all-clients.html',
			controller:'allClientsController'
		})

		.when('/profile',{
			templateUrl:'../RCH-module/pages/client-profile.html',
			controller:'profileController'
		})

		.when('/mother-data-entry',{
			templateUrl:'../RCH-module/pages/mother-data-entry.html',
			controller:'motherPageController'
		})

		.when('/fp-data-entry',{
			templateUrl:'../RCH-module/pages/fp-data-entry.html',
			controller:'FPPageController'
		})

		.when('/ch-data-entry',{
			templateUrl:'../RCH-module/pages/ch-data-entry.html',
			controller:'CHPageController'
		})


	});

	rchApp.controller('mainController',function($scope){

	});

	rchApp.controller('motherController',function($scope,$http){
		$scope.register=function(){
		$http({
			method: "POST",
			url:"http://localhost:8080/dhis21/api/enrollments",
			data: {"trackedEntityInstance":$scope.clientID,"orgUnit":"Ek4yxoacghZ","program":"eijsQsnbfk7","enrollmentDate":$scope.regDate,"incidentDate": $scope.regDate}
		}).then (function mySuccess(response){
			window.location="http://localhost:8080/dhis21/api/apps/RCH-module/index.html#/mother-data-entry"; 
		}, function myError(response){
			$scope.message=response.statusText;
		})
		}	
	});

	rchApp.controller('childController',function($scope){
		$scope.message="controller needed here";
	});	

	rchApp.controller('familyPlanningController',function($scope){
		$scope.message="controller needed here";
	});

	rchApp.controller('programsController',function($http,$scope){
		$http({
			method: "GET",
			url:"http://localhost:8080/dhis21/api/programs.json" 
		}) .then (function mySuccess(response){
			$scope.programs=response.data.programs;
			$scope.troubleshoot=response.data;
		}, function myError(response){
			$scope.message=response.statusText;
		})
	});

	rchApp.controller('registrationController',function($http,$scope){
		$scope.register=function(){
		$http({
			method: "POST",
			url:"http://localhost:8080/dhis21/api/trackedEntityInstances",
			data: {"trackedEntity": "tVfvFoIuFMj","orgUnit": "Ek4yxoacghZ","attributes": [{"attribute": "GPfn5bWplU2","value": $scope.firstName},{"attribute": "JfxVlU21hPU","value":$scope.lastName},{"attribute": "Woe6gpRqvc4","value":$scope.age}]}
		}).then (function mySuccess(response){
			$scope.message=response.statusText;
		}, function myError(response){
			$scope.message=response.statusText;
		})
		}	
	});

	rchApp.controller('allClientsController',function($http,$scope){
		$http({
			method: "GET",
			url:"http://localhost:8080/dhis21/api/trackedEntityInstances.json?ou=Ek4yxoacghZ" 
		}) .then (function mySuccess(response){	
			$scope.teis=response.data.trackedEntityInstances;
			angular.forEach($scope.teis,function(tei,index){
				$scope.attributes=tei.attributes;
				angular.forEach($scope.attributes,function(attribute,index){
					$scope.attribute=attribute.attribute;
					$scope.value=attribute.value;
						if ($scope.attribute=="GPfn5bWplU2"){
							$scope.firstName=$scope.value;
						} else if ($scope.attribute=="JfxVlU21hPU"){
							$scope.lastName=$scope.value;
						} 
						else if ($scope.attribute=="Woe6gpRqvc4"){
							$scope.age=$scope.value;
						} 
				})
			})

		}, function myError(response){
			$scope.message=response.statusText;
		})
	});

	rchApp.controller('motherPageController',function($scope,$http){
		$scope.formStageOne=function(){
		$scope.passedclientID="U2jaHvHY9xr";
		$http({
			method: "POST",
			url:"http://localhost:8080/dhis21/api/events",
			data: {
					"program": "RUCmnObXnux",
					"programStage":"aZRq0BgyVkx",
					"orgUnit": "Ek4yxoacghZ",
					"eventDate": $scope.eventDate,
					"status": "COMPLETED",
					"storedBy": "admin",
					"trackedEntityInstance":$scope.passedclientID,
					"dataValues": [
					{ "dataElement": "fPEC5O5ycFz", "value": $scope.MO1 },
					{ "dataElement": "TyLdBcC4hLs", "value": $scope.MO2 },
					{ "dataElement": "KHIP12bL1Se", "value": $scope.MO3 },
					{ "dataElement": "MDeTcKCAVyM", "value": $scope.MO4 },
					{ "dataElement": "wFGpJ2W2VLe", "value": $scope.MO5 },
					{ "dataElement": "xzZvAOzdpcr", "value": $scope.MO6 },
					{ "dataElement": "TsMhZoXh2e0", "value": $scope.MO7 },
					{ "dataElement": "dTMDZf6IPRa", "value": $scope.MO8 },
					]
				}
		}).then (function mySuccess(response){
			$scope.messageOne=response.statusText; 
		}, function myError(response){
			$scope.messageOne=response.statusText;
		})
		}

		$scope.formStageOneSwitcher=function(){
			var currentForm=document.getElementById('mother-stage-1');
			var nextForm=document.getElementById('mother-stage-2');
			var nextButton=document.getElementById('go-to-stage-2');
				if (nextForm.style.display=='none'){
					nextForm.style.display='block';
					currentForm.style.display='none';
				}
		}	

		$scope.formStageTwo=function(){
				$scope.passedclientID="U2jaHvHY9xr";
				$http({
				method: "POST",
				url:"http://localhost:8080/dhis21/api/events",
				data: {
					"program": "RUCmnObXnux",
					"programStage":"aZRq0BgyVkx",
					"orgUnit": "Ek4yxoacghZ",
					"eventDate": $scope.eventDate,
					"status": "COMPLETED",
					"storedBy": "admin",
					"trackedEntityInstance":$scope.passedclientID,
					"dataValues": [
					{ "dataElement": "uJnXEOytGrs", "value": $scope.MO9 },
					{ "dataElement": "nySY4SttncU", "value": $scope.MO10 },
					{ "dataElement": "tH1qDRPWgvV", "value": $scope.MO11 },
					{ "dataElement": "cVLeeaESukv", "value": $scope.MO12 },
					{ "dataElement": "gV2GxeNQyOD", "value": $scope.MO13 },
					{ "dataElement": "XwgetwU9GIX", "value": $scope.MO14 },
					{ "dataElement": "ZLrrlXzWtj3", "value": $scope.MO15 },
					{ "dataElement": "aaKfMJmqrzQ", "value": $scope.MO16 },
					]
				}
		}).then (function mySuccess(response){
			$scope.messageTwo=response.statusText; 
		}, function myError(response){
			$scope.messageTwo=response.statusText;
		})
		}

		$scope.formStageTwoSwitcher=function(){
			var currentForm=document.getElementById('mother-stage-2');
			var nextForm=document.getElementById('mother-stage-3');
			var nextButton=document.getElementById('go-to-stage-3');
				if (nextForm.style.display=='none'){
					nextForm.style.display='block';
					currentForm.style.display='none';
				}
		}

		$scope.formStageThree=function(){
				$scope.passedclientID="U2jaHvHY9xr";
				$http({
				method: "POST",
				url:"http://localhost:8080/dhis21/api/events",
				data: {
					"program": "RUCmnObXnux",
					"programStage":"aZRq0BgyVkx",
					"orgUnit": "Ek4yxoacghZ",
					"eventDate": $scope.eventDate,
					"status": "COMPLETED",
					"storedBy": "admin",
					"trackedEntityInstance":$scope.passedclientID,
					"dataValues": [
					{ "dataElement": "SvKgiMYj1ZK", "value": $scope.MO17 },
					{ "dataElement": "D21f1zuYzfS", "value": $scope.MO18 },
					{ "dataElement": "BZn8BqKKMOW", "value": $scope.MO19 },
					{ "dataElement": "pqQg9t2sjPO", "value": $scope.MO20 },
					{ "dataElement": "cB5RGuq1ttk", "value": $scope.MO21 },
					{ "dataElement": "DuwiSEmYc4H", "value": $scope.MO22 },
					]
				}
		}).then (function mySuccess(response){
			$scope.messageThree=response.statusText; 
		}, function myError(response){
			$scope.messageThree=response.statusText;
		})
		}	

		$scope.formStageThreeSwitcher=function(){
			var currentForm=document.getElementById('mother-stage-3');
			var nextForm=document.getElementById('mother-stage-4');
			var nextButton=document.getElementById('go-to-stage-4');
				if (nextForm.style.display=='none'){
					nextForm.style.display='block';
					currentForm.style.display='none';
				}
		}

		$scope.formStageFour=function(){
				$scope.passedclientID="U2jaHvHY9xr";
				$http({
				method: "POST",
				url:"http://localhost:8080/dhis21/api/events",
				data: {
					"program": "RUCmnObXnux",
					"programStage":"aZRq0BgyVkx",
					"orgUnit": "Ek4yxoacghZ",
					"eventDate": $scope.eventDate,
					"status": "COMPLETED",
					"storedBy": "admin",
					"trackedEntityInstance":$scope.passedclientID,
					"dataValues": [
					{ "dataElement": "u0gdM1ALHgq", "value": $scope.MO23 },
					{ "dataElement": "UIGweNVCoxM", "value": $scope.MO24 },
					{ "dataElement": "MU6xTwQu5zE", "value": $scope.MO25 },
					{ "dataElement": "v7409Ua01Jb", "value": $scope.MO26 },
					{ "dataElement": "ewHnNMcN8ub", "value": $scope.MO27 },
					{ "dataElement": "xLk7cmeb4gV", "value": $scope.MO28 },
					{ "dataElement": "g30hUCZpvUX", "value": $scope.MO29 },
					{ "dataElement": "Tw0uO0wyj91", "value": $scope.MO30 },
                    { "dataElement": "xaUFCos8vve", "value": $scope.MO31 },
					{ "dataElement": "VSvSYlkwcca", "value": $scope.MO32 },
					{ "dataElement": "h7vNaU76ATX", "value": $scope.MO33 },
					{ "dataElement": "EBFX6jVMix7", "value": $scope.MO34 },
					]
				}
		}).then (function mySuccess(response){
			$scope.messageFour=response.statusText; 
		}, function myError(response){
			$scope.messageFour=response.statusText;
		})
		}	

		$scope.formStageFourSwitcher=function(){
			var currentForm=document.getElementById('mother-stage-4');
			var nextForm=document.getElementById('mother-stage-5');
			var nextButton=document.getElementById('go-to-stage-5');
				if (nextForm.style.display=='none'){
					nextForm.style.display='block';
					currentForm.style.display='none';
				}
		}	

		$scope.formStageFive=function(){
				$scope.passedclientID="U2jaHvHY9xr";
				$http({
				method: "POST",
				url:"http://localhost:8080/dhis21/api/events",
				data: {
					"program": "RUCmnObXnux",
					"programStage":"aZRq0BgyVkx",
					"orgUnit": "Ek4yxoacghZ",
					"eventDate": $scope.eventDate,
					"status": "COMPLETED",
					"storedBy": "admin",
					"trackedEntityInstance":$scope.passedclientID,
					"dataValues": [
					{ "dataElement": "lfuPTOmcOYn", "value": $scope.MO35 },
					{ "dataElement": "PthUTnUFQmW", "value": $scope.MO36 },
					{ "dataElement": "kK59MThgIh3", "value": $scope.MO37 },
					{ "dataElement": "iJk2c2b9zgZ", "value": $scope.MO38 },
					{ "dataElement": "ewHnNMcN8ub", "value": $scope.MO39 },
					{ "dataElement": "QrI7DG370OS", "value": $scope.MO40 },
					{ "dataElement": "VSvSYlkwcca", "value": $scope.MO41 },
					{ "dataElement": "o3X4sDL4jvw", "value": $scope.MO42 },
                    { "dataElement": "oVtAtOn1hk8", "value": $scope.MO43 },
					]
				}
		}).then (function mySuccess(response){
			$scope.messageFive=response.statusText; 
		}, function myError(response){
			$scope.messageFive=response.statusText;
		})
		}	


		$scope.formStageFiveSwitcher=function(){
			var currentForm=document.getElementById('mother-stage-5');
			var nextForm=document.getElementById('mother-stage-6');
			var nextButton=document.getElementById('go-to-stage-6');
				if (nextForm.style.display=='none'){
					nextForm.style.display='block';
					currentForm.style.display='none';
				}
		}	

        $scope.formStageSix=function(){
				$scope.passedclientID="U2jaHvHY9xr";
				$http({
				method: "POST",
				url:"http://localhost:8080/dhis21/api/events",
				data: {
					"program": "RUCmnObXnux",
					"programStage":"aZRq0BgyVkx",
					"orgUnit": "Ek4yxoacghZ",
					"eventDate": $scope.eventDate,
					"status": "COMPLETED",
					"storedBy": "admin",
					"trackedEntityInstance":$scope.passedclientID,
					"dataValues": [
					{ "dataElement": "KqyajUH0L7D", "value": $scope.MO44 },
					{ "dataElement": "xLk7cmeb4gV", "value": $scope.MO45 },
					{ "dataElement": "g30hUCZpvUX", "value": $scope.MO46 },
					{ "dataElement": "hVkLoup1L4M", "value": $scope.MO47 },
					{ "dataElement": "lmtQnBMybLo", "value": $scope.MO48 },
					{ "dataElement": "iicvT1ti33C", "value": $scope.MO49 }, 
					
					]
				}
		}).then (function mySuccess(response){
			$scope.messageSix=response.statusText; 
		}, function myError(response){
			$scope.messageSix=response.statusText;
		})
		}	


		$scope.formStageSixSwitcher=function(){
			var currentForm=document.getElementById('mother-stage-6');
			var nextForm=document.getElementById('mother-stage-7');
			var nextButton=document.getElementById('go-to-stage-7');
				if (nextForm.style.display=='none'){
					nextForm.style.display='block';
					currentForm.style.display='none';
				}
		}	

        $scope.formStageSeven=function(){
				$scope.passedclientID="U2jaHvHY9xr";
				$http({
				method: "POST",
				url:"http://localhost:8080/dhis21/api/events",
				data: {
					"program": "RUCmnObXnux",
					"programStage":"aZRq0BgyVkx",
					"orgUnit": "Ek4yxoacghZ",
					"eventDate": $scope.eventDate,
					"status": "COMPLETED",
					"storedBy": "admin",
					"trackedEntityInstance":$scope.passedclientID,
					"dataValues": [
                    { "dataElement": "QSedstMuLan", "value": $scope.MO50 },
					{ "dataElement": "EdOUxzJyQIw", "value": $scope.MO51 },
					{ "dataElement": "Mhc2u4EooVG", "value": $scope.MO52 },
					{ "dataElement": "bCnzaZo4ogf", "value": $scope.MO53 },
					{ "dataElement": "lfuPTOmcOYn", "value": $scope.MO54 },
					{ "dataElement": "NTiPB0HVdCt", "value": $scope.MO55 }, 
					]
				}
		}).then (function mySuccess(response){
			$scope.messageSeven=response.statusText; 
		}, function myError(response){
			$scope.messageSeven=response.statusText;
		})
		}	


		$scope.formStageSevenSwitcher=function(){
			var currentForm=document.getElementById('mother-stage-7');
			var nextForm=document.getElementById('mother-stage-8');
			var nextButton=document.getElementById('go-to-stage-8');
				if (nextForm.style.display=='none'){
					nextForm.style.display='block';
					currentForm.style.display='none';
				}
		}	

         $scope.formStageEight=function(){
				$scope.passedclientID="U2jaHvHY9xr";
				$http({
				method: "POST",
				url:"http://localhost:8080/dhis21/api/events",
				data: {
					"program": "RUCmnObXnux",
					"programStage":"aZRq0BgyVkx",
					"orgUnit": "Ek4yxoacghZ",
					"eventDate": $scope.eventDate,
					"status": "COMPLETED",
					"storedBy": "admin",
					"trackedEntityInstance":$scope.passedclientID,
					"dataValues": [
                    { "dataElement": "FRMfeVHTAP4", "value": $scope.MO56 },
					{ "dataElement": "U4GNaQe7Nw5", "value": $scope.MO57 },
					{ "dataElement": "sO3JHiXEhNf", "value": $scope.MO58 },
					{ "dataElement": "lQAPy8YGu5x", "value": $scope.MO59 },
					{ "dataElement": "pR3jK3pFhEF", "value": $scope.MO60 },
					{ "dataElement": "QWIIkdhB0zW", "value": $scope.MO61 }, 
					{ "dataElement": "lR78BoJRPeO", "value": $scope.MO62 }, 
					]
				}
		}).then (function mySuccess(response){
			$scope.messageEight=response.statusText; 
		}, function myError(response){
			$scope.messageEight=response.statusText;
		})
		}	

	});

rchApp.controller('FPPageController',function($scope,$http){
		$scope.formStageOne=function(){
		$scope.passedclientID="U2jaHvHY9xr";
		$http({
			method: "POST",
			url:"http://localhost:8080/dhis21/api/events",
			data: {
					"program": "ZOt87wyy7vo",
					"programStage":"BI2PR7082E8",
					"orgUnit": "Ek4yxoacghZ",
					"eventDate": $scope.eventDate,
					"status": "COMPLETED",
					"storedBy": "admin",
					"trackedEntityInstance":$scope.passedclientID,
					"dataValues": [
					{ "dataElement": "yHADuwMLbDt", "value": $scope.FP1 },
					{ "dataElement": "Udw1HG3yHj0", "value": $scope.FP2 },
					{ "dataElement": "TY1awu0PpuF", "value": $scope.FP3 },
					{ "dataElement": "N6CvKkj6y2b", "value": $scope.FP4 },
					{ "dataElement": "gsXG03uFuG6", "value": $scope.FP5 },
					{ "dataElement": "vNFKG6D65u4", "value": $scope.FP6 },
					]
				}
		}).then (function mySuccess(response){
			$scope.messageOne=response.statusText; 
		}, function myError(response){
			$scope.messageOne=response.statusText;
		})
		}

		$scope.formStageOneSwitcher=function(){
			var currentForm=document.getElementById('fp-stage-1');
			var nextForm=document.getElementById('fp-stage-2');
			var nextButton=document.getElementById('go-to-stage-2');
				if (nextForm.style.display=='none'){
					nextForm.style.display='block';
					currentForm.style.display='none';
				}
		}	

		$scope.formStageTwo=function(){
				$scope.passedclientID="U2jaHvHY9xr";
				$http({
				method: "POST",
				url:"http://localhost:8080/dhis21/api/events",
				data: {
					"program": "ZOt87wyy7vo",
					"programStage":"RC1EmrifQv0",
					"orgUnit": "Ek4yxoacghZ",
					"eventDate": $scope.eventDate,
					"status": "COMPLETED",
					"storedBy": "admin",
					"trackedEntityInstance":$scope.passedclientID,
					"dataValues": [
					{ "dataElement": "Z2G9ZS7ddAE", "value": $scope.FP7 },
					{ "dataElement": "IlpZzWfjER5", "value": $scope.FP8 },
					{ "dataElement": "hULZObwU8IY", "value": $scope.FP9 },
					{ "dataElement": "niFQJsi45BK", "value": $scope.FP10 },
					]
				}
		}).then (function mySuccess(response){
			$scope.messageTwo=response.statusText; 
		}, function myError(response){
			$scope.messageTwo=response.statusText;
		})
		}

		$scope.formStageTwoSwitcher=function(){
			var currentForm=document.getElementById('fp-stage-2');
			var nextForm=document.getElementById('fp-stage-3');
			var nextButton=document.getElementById('go-to-stage-3');
				if (nextForm.style.display=='none'){
					nextForm.style.display='block';
					currentForm.style.display='none';
				}
		}

		$scope.formStageThree=function(){
				$scope.passedclientID="U2jaHvHY9xr";
				$http({
				method: "POST",
				url:"http://localhost:8080/dhis21/api/events",
				data: {
					"program": "ZOt87wyy7vo",
					"programStage":"FPYgQFRESA5",
					"orgUnit": "Ek4yxoacghZ",
					"eventDate": $scope.eventDate,
					"status": "COMPLETED",
					"storedBy": "admin",
					"trackedEntityInstance":$scope.passedclientID,
					"dataValues": [
					{ "dataElement": "wYJ1TfJ3RPk", "value": $scope.FP11 },
					{ "dataElement": "OWizWXeNavH", "value": $scope.FP12 },
					{ "dataElement": "YFJsQgagCrl", "value": $scope.FP13 },
					{ "dataElement": "P2chLxEFQCs", "value": $scope.FP14 },
					{ "dataElement": "VReD7eHA3rg", "value": $scope.FP15 },
					{ "dataElement": "PDb5gRWxxy7", "value": $scope.FP16 },
					{ "dataElement": "ZWzY1cJytla", "value": $scope.FP17 },
					]
				}
		}).then (function mySuccess(response){
			$scope.messageThree=response.statusText; 
		}, function myError(response){
			$scope.messageThree=response.statusText;
		})
		}	

		$scope.formStageThreeSwitcher=function(){
			var currentForm=document.getElementById('fp-stage-3');
			var nextForm=document.getElementById('fp-stage-4');
			var nextButton=document.getElementById('go-to-stage-4');
				if (nextForm.style.display=='none'){
					nextForm.style.display='block';
					currentForm.style.display='none';
				}
		}

		$scope.formStageFour=function(){
				$scope.passedclientID="U2jaHvHY9xr";
				$http({
				method: "POST",
				url:"http://localhost:8080/dhis21/api/events",
				data: {
					"program": "ZOt87wyy7vo",
					"programStage":"BcIbEyC39qE",
					"orgUnit": "Ek4yxoacghZ",
					"eventDate": $scope.eventDate,
					"status": "COMPLETED",
					"storedBy": "admin",
					"trackedEntityInstance":$scope.passedclientID,
					"dataValues": [
					{ "dataElement": "jCD6c24ytcd", "value": $scope.FP18 },
					{ "dataElement": "IMGCrxbT1lz", "value": $scope.FP19 },
					{ "dataElement": "TR54KAqhU0B", "value": $scope.FP20 },
					{ "dataElement": "xmRgZ4zKwiz", "value": $scope.FP21 },
					{ "dataElement": "WHzao3RV6KT", "value": $scope.FP22 },
					{ "dataElement": "VvMl4VeeVWy", "value": $scope.FP23 },
					]
				}
		}).then (function mySuccess(response){
			$scope.messageFour=response.statusText; 
		}, function myError(response){
			$scope.messageFour=response.statusText;
		})
		}	

		$scope.formStageFourSwitcher=function(){
			var currentForm=document.getElementById('fp-stage-4');
			var nextForm=document.getElementById('fp-stage-5');
			var nextButton=document.getElementById('go-to-stage-5');
				if (nextForm.style.display=='none'){
					nextForm.style.display='block';
					currentForm.style.display='none';
				}
		}	

        $scope.formStageFive=function(){
				$scope.passedclientID="U2jaHvHY9xr";
				$http({
				method: "POST",
				url:"http://localhost:8080/dhis21/api/events",
				data: {
					"program": "ZOt87wyy7vo",
					"programStage":"F4e2zr4QbRk",
					"orgUnit": "Ek4yxoacghZ",
					"eventDate": $scope.eventDate,
					"status": "COMPLETED",
					"storedBy": "admin",
					"trackedEntityInstance":$scope.passedclientID,
					"dataValues": [
                    { "dataElement": "wRvjuQfY15r", "value": $scope.FP24 },
					{ "dataElement": "E2GJ2W5XBBy", "value": $scope.FP25 },
					{ "dataElement": "ZwE36dW3Uwm", "value": $scope.FP26 },
					{ "dataElement": "kSDfzxpVeRL", "value": $scope.FP27 },
					{ "dataElement": "gPsKut2ZGm0", "value": $scope.FP28 },
					{ "dataElement": "Nc4CweDHJ0A", "value": $scope.FP29 }, 
					]
				}
		}).then (function mySuccess(response){
			$scope.messageEight=response.statusText; 
		}, function myError(response){
			$scope.messageEight=response.statusText;
		})
		}	

	});


rchApp.controller('CHPageController',function($scope,$http){
		$scope.formStageOne=function(){
		$scope.passedclientID="U2jaHvHY9xr";
		$http({
			method: "POST",
			url:"http://localhost:8080/dhis21/api/events",
			data: {
					"program": "Voic7h3Fuv5",
					"programStage":"vzbb1cnBXC7",
					"orgUnit": "Ek4yxoacghZ",
					"eventDate": $scope.eventDate,
					"status": "COMPLETED",
					"storedBy": "admin",
					"trackedEntityInstance":$scope.passedclientID,
					"dataValues": [
					{ "dataElement": "FKGMCtPoeUX", "value": $scope.CH1 },
					{ "dataElement": "kQpWP9fXUkk", "value": $scope.CH2 },
					{ "dataElement": "z8B4u9hl8Qq", "value": $scope.CH3 },
					{ "dataElement": "a95DR60LWOY", "value": $scope.CH4 },
					{ "dataElement": "i0iy2f1JuKD", "value": $scope.CH5 },
					{ "dataElement": "K5TdEPNtXyw", "value": $scope.CH6 },
					]
				}
		}).then (function mySuccess(response){
			$scope.messageOne=response.statusText; 
		}, function myError(response){
			$scope.messageOne=response.statusText;
		})
		}

		$scope.formStageOneSwitcher=function(){
			var currentForm=document.getElementById('ch-stage-1');
			var nextForm=document.getElementById('ch-stage-2');
			var nextButton=document.getElementById('go-to-stage-2');
				if (nextForm.style.display=='none'){
					nextForm.style.display='block';
					currentForm.style.display='none';
				}
		}	

		$scope.formStageTwo=function(){
				$scope.passedclientID="U2jaHvHY9xr";
				$http({
				method: "POST",
				url:"http://localhost:8080/dhis21/api/events",
				data: {
					"program": "Voic7h3Fuv5",
					"programStage":"VGdaOjt4D0s",
					"orgUnit": "Ek4yxoacghZ",
					"eventDate": $scope.eventDate,
					"status": "COMPLETED",
					"storedBy": "admin",
					"trackedEntityInstance":$scope.passedclientID,
					"dataValues": [
					{ "dataElement": "WPVbfeMhSDV", "value": $scope.CH7 },
					{ "dataElement": "V5Rdi0ysP9L", "value": $scope.CH8 },
					]
				}
		}).then (function mySuccess(response){
			$scope.messageTwo=response.statusText; 
		}, function myError(response){
			$scope.messageTwo=response.statusText;
		})
		}

		$scope.formStageTwoSwitcher=function(){
			var currentForm=document.getElementById('ch-stage-2');
			var nextForm=document.getElementById('ch-stage-3');
			var nextButton=document.getElementById('go-to-stage-3');
				if (nextForm.style.display=='none'){
					nextForm.style.display='block';
					currentForm.style.display='none';
				}
		}

		$scope.formStageThree=function(){
				$scope.passedclientID="U2jaHvHY9xr";
				$http({
				method: "POST",
				url:"http://localhost:8080/dhis21/api/events",
				data: {
					"program": "Voic7h3Fuv5",
					"programStage":"Z5IeHfhbTuo",
					"orgUnit": "Ek4yxoacghZ",
					"eventDate": $scope.eventDate,
					"status": "COMPLETED",
					"storedBy": "admin",
					"trackedEntityInstance":$scope.passedclientID,
					"dataValues": [
					{ "dataElement": "CSXWdj95oP1", "value": $scope.CH9 },
					{ "dataElement": "Pjn7jBwWLrH", "value": $scope.CH10 },
					{ "dataElement": "PJL7OJQ9Y1t", "value": $scope.CH11 },
					{ "dataElement": "wuOILRRFNPk", "value": $scope.CH12 },
					{ "dataElement": "JOGwnaBqQml", "value": $scope.CH13 },
					{ "dataElement": "Fhfvp8qFfNH", "value": $scope.CH14 },
					{ "dataElement": "SNtEwmJlD1a", "value": $scope.CH15 },
					{ "dataElement": "KfFh9IoHGsj", "value": $scope.CH16 },
					{ "dataElement": "GhXJ29p10mP", "value": $scope.CH17 },
					{ "dataElement": "tribllTaiEG", "value": $scope.CH18 },
					]
				}
		}).then (function mySuccess(response){
			$scope.messageThree=response.statusText; 
		}, function myError(response){
			$scope.messageThree=response.statusText;
		})
		}	

	});