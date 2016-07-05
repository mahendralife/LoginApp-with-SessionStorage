'use strict';

//login controller
app.controller('loginController',['$scope','$rootScope','$location','$log','authenticate','$timeout',
	function($scope,$rootScope,$location,$log,authenticate,$timeout)
{
	var loginUrl="webservices/login/index.php";
	$log.info('login Controller is ready for work..');
	// reset login status
    $scope.data={};

	$scope.login=function(form,data){
			if(form.$valid)
			{
				$scope.isLoading=true;
				authenticate.login(data,loginUrl, function(response){
					if(response.valid==true)
					{
							authenticate.setAuthenticatedUser(response);
							$rootScope.activeUser = authenticate.validateSession();

							$location.path('/');
							$scope.isLoading=false;
					}
					else if(response.valid==false)
					{

						//rest form and clear data
						$scope.data={}
						form.$setPristine();

						$scope.msg="Invalid Username or password! "
						$scope.isLoading=false;
						$timeout(function() {$scope.msg=false;}, 9000);
					}

			})
			}
			else
			{
				angular.forEach(form.$error.required, function(field){
					field.$dirty=true;
				})
			}

	}

	}]);

//define home controller
app.controller('homeController', function($scope,$log,authenticate,$location){
	$log.info("Home controller is reday for use");

	$scope.username=authenticate.users();



});
app.controller('services', function($scope,$log,authenticate,$location){
	$log.info("services controller is reday for use");




});

app.controller('contacts', function($scope,$log,authenticate,$location){
	$log.info("contacts controller is reday for use");



})
app.controller('docs', function($scope,$log,authenticate,$location){
	$log.info("contacts controller is reday for use");



})
