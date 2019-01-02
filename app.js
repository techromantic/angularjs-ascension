
	var app = angular.module('ascensionApp', ['ui.router', 'ngStorage']);


	app.config(function($stateProvider, $urlRouterProvider, $locationProvider){


		$urlRouterProvider.otherwise('home');

		

		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl : 'views/dashboard.html'
		
		})
		.state('assignments', {
			url: '/assignments',
			templateUrl : 'views/assignments.html'
		})
		.state('schedule',{
			url: '/schedule',
			templateUrl : 'views/schedule.html'
		});

		$locationProvider.html5Mode(true);	

	
	});


