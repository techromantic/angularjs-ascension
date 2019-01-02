(function(){

var app = angular.module('ascensionApp');

app.controller("AssignmentsCtrl", ["$scope", "$localStorage", "AssignmentService", "$rootScope",
	function($scope, $localStorage, AssignmentService, $rootScope){

		$scope.$localStorage = $localStorage.$default({
			assignments: [],
			first: true,
			today: 0,
			week: 0
		});


	$scope.add = function(assignment) { 

		assignment.completed = false;
		$localStorage.assignments.push(angular.copy(assignment));	
		$localStorage.first = false;
		delete $scope.assignment; 
	};

	$scope.done = function(assignment){
		assignment.completed = true; 
	};

	// $scope.$on('$stateChangeSuccess', function () {
	//   	$scope.assignments = $localStorage.data; 
	// });

	// $scope.$on('assignmentsRequested', function(event, mass) { 


	// 	AssignmentService.save($scope.assignments_day.length, $scope.assignments_week.length);
	// 	$rootScope.$broadcast('assignmentsReady');
	// });


	angular.element(document).ready(function () {

    $scope.assignments = $localStorage.assignments;
    $scope.first = $localStorage.first; 
 //    $rootScope.today = assignments_day.length; 
	// $rootScope.week = assignments_week.length; 
	$rootScope.today = $localStorage.today; 
	$rootScope.week = $localStorage.week; 
	// if(int assignments_day != 'undefined'){
	// 	$localStorage.today = assignments_day.length; 
	// $localStorage.week = assignments_week.length;} 

	console.log($rootScope.today);
	console.log($rootScope.week);
	
	});

	$scope.types = ["Health", "Business", "Education", "Personal", "Daily Living", "Logistics"];




	$scope.due = function($scope) {
		if($scope.duetime){
			var due = $scope.date + ' ' + $scope.duetime;
			var adate = moment(due, "MM-DD-YYYY HH:mm A").toNow(true);
			
			return adate;
		}
		else{
			var adate = moment($scope.date, "MM-DD-YYYY").toNow(true);
			return adate; 
		}
		
	};

	$scope.todaysAssignments = function(assignment){

		if(assignment.completed == false){
			var today = moment().format("MM-DD-YYYY");
				var a_date = moment(assignment.date).format("MM-DD-YYYY");
		
				return moment(today).isSame(a_date, 'day');
			}



	};

	$scope.weeksAssignments = function(assignment){

		if(assignment.completed == false){
		if(!$scope.todaysAssignments(assignment)){

		var week = moment().add(7, 'days').format("MM-DD-YYYY");
		var a_date = moment(assignment.date).format("MM-DD-YYYY");

		return moment(a_date).isBefore(week);
		}}
	};


	$scope.futureAssignments = function(assignment){

		if(!$scope.todaysAssignments(assignment) && !$scope.weeksAssignments(assignment) &&
			assignment.completed == false){

		var week = moment().add(14, 'days').format("MM-DD-YYYY");
		var a_date = moment(assignment.date).format("MM-DD-YYYY");
		 

		return true;
		}
	};


	

}]);

}());