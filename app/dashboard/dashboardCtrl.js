	var app = angular.module('ascensionApp');

	app.controller("DashboardCtrl", ["$scope", "$timeout", 'ScheduleService', 'AssignmentService', '$rootScope', 
		function($scope, $timeout, ScheduleService, AssignmentService, $rootScope) {

		$scope.tick = 1000;
		clock = function(){
			$scope.curr_date = moment().format("dddd, MMMM Do");
			$scope.curr_time = moment().format("h:mm:ss A");
			$timeout(clock, $scope.tick);
		}
		$timeout(clock, $scope.tick);

		$scope.item = {};
		$scope.$on('scheduleItemSelected', function(event, mass) { 

			$scope.item = ScheduleService.show();

			// console.log($scope.item); 
		});

		$scope.$on('assignmentsReady', function(event, mass) { 

			
			console.log("yo");
		});


	
		$scope.first = $scope.$root.first;

		

		angular.element(document).ready(function () {
			$scope.arr = AssignmentService.show();
			$scope.today = $rootScope.today;
			$scope.week = $rootScope.week; 
			console.log($rootScope.today);
	console.log($rootScope.week);

		});


	}]);

	
