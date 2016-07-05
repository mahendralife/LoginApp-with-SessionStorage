'use strict';

app.provider("auth", function () {
  var pages;
  return {
    authPages: function (value) {
       pages=value

    },
    $get: function () {
      return {
        	pages
      };
    }
  };
});

//login services
app.factory('authenticate',['$http', '$rootScope', '$timeout','$window','$location','$templateCache','auth',
	function($http, $rootScope, $timeout,$window,$location,$templateCache,auth){
		var services={}
		services.login=function(data,url,callback){
			 $timeout(function(){
			 	//using http request here
			 	$http({
					method:"POST",
					url:url,
					data:data,
					cache: $templateCache
				}).then(function(response){
					callback(response.data)
				});
        }, 1000);


		};
		//store data on cookies and session storage
		services.setAuthenticatedUser=function(user){
		//session bases on user permission
			if(user.remember==true){
				localStorage['@user']=JSON.stringify(user);
					}
			else
			{
				sessionStorage['@user']=JSON.stringify(user);

				}
		};
		services.users=function(){

			if(sessionStorage['@user']){

					return JSON.parse(sessionStorage['@user'])
			}
		 if(localStorage['@user']){
					return JSON.parse(localStorage['@user'])
			}
			if(!localStorage['user'] && !sessionStorage['@user'])
			{
				return false;
			}
		};
		services.validateSession=function(){
			if(services.users())
			{
				return true;
			}
			else
			{
				return false;
			}
		};

		//clear session data and cookies
		services.removeAuthenticatedUser=function()
		{
			if(sessionStorage['user']){
					sessionStorage.removeItem('user');
					return true;
			}
			else if(localStorage['user']){
					localStorage.removeItem('user')
					return true;
			}
			else
			{
				return false;
			}
		}

		//set page authentication
		services.pageAuth=function(current,redirect){
			var page=auth.pages;
			if(services.validateSession())
			{
				if(page.indexOf(current)>=0){
				return true;
				}
				else {
					return false;
				}
			}
			else {
				return false;
			}

		};
		return services;
}]);
