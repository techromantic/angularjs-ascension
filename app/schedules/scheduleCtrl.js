(function(){

	var app = angular.module('ascensionApp');
	app.controller("ScheduleCtrl", ["$scope", "$rootScope", 'ScheduleService', "$localStorage", "$interval", 
		function($scope, $rootScope, ScheduleService, $localStorage, $interval) {
		
		$scope.$localStorage = $localStorage.$default({
			schedules: [],
			first: true,
			check: false
		});

		$scope.$root.first = $localStorage.first;


		$scope.add = function(schedule) { 
			schedule.completed = false;
			schedule.streak = 0;
			$localStorage.schedules.push(schedule);	
			$localStorage.first = false;
			// delete $scope.schedule; 
			// store.remove('array');
			// store.set('item', angular.copy(schedule));
			// store.push('array', angular.copy(schedule));
			// store.remove('item');
		};

		$scope.done = function(schedule){
			schedule.completed = true; 
			schedule.streak +=1;
			promise = $interval( function(){ $scope.updateDash(); }, 1000);
		};

		$scope.reset_completion = function(index) {
		    $localStorage.schedules[index] = true;
		};

		$scope.change_schedule = function(){

			for(i = 0; i <= $localStorage.schedules.length; i++ ){
				$scope.reset_completion(i);
				console.log("All schedule items have been reset.");
			}
		};

		$scope.check_time = function(){

			var now = moment().date();
			console.log("Checking if a day has passed.");
			if(now !== $localStorage.last_day){
				$scope.change_schedule();
				$localStorage.check = false;
				console.log("A day did pass!");
			}
		}

		$scope.reset = function(){
			$localStorage.$reset();
		};

		angular.element(document).ready(function () {

	    $scope.schedules = $localStorage.schedules; 
	    $scope.first = $localStorage.first;
	    promise = $interval( function(){ $scope.updateDash(); }, 1000);
	    
	    if($localStorage.check == false){
	    	$localStorage.last_day = moment().date();
	    	$localStorage.check = true;
	    }
	    $interval( function(){ $scope.check_time(); }, 60000);
	    // console.log($scope.schedules);
		});


		$scope.days = ["Every Day", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
		$scope.types = ["Health", "Business", "Education", "Personal", "Daily Living", "Logistics"];
		$scope.times = ["4:00 AM","5:00 AM","6:00 AM","7:00 AM", "8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM",
		"3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM","8:00 PM","9:00 PM","10:00 PM","11:00 PM","12:00 AM",
		"1:00 AM","2:00 AM","3:00 AM"];
		


		$scope.orderTime = function(schedule) {
			var time = schedule.iStart; 
			var twofour = schedule.iStart.split(" ");

			if(time.indexOf("AM") > 0){


				if(time.indexOf("12") >= 0){
					num = parseInt(twofour[0].replace(":", "."));
					num2 = num + 12; 
					return num2;
				}

				return parseInt(twofour[0].replace(":", "."));
			}

			if(time.indexOf("PM") > 0){

				if(time.indexOf("12") >= 0){
					num = parseInt(twofour[0].replace(":", "."));
					return num;
				}

				num = parseInt(twofour[0].replace(":", "."));
					num2 = num + 12; 
					return num2;
			}
			
		};

		// $scope.todaySchedule = function(schedule){
		// 	today = moment().format("dddd");
		// 	if((schedule.iDay == today) || (schedule.iDay == "Every Day")){
		// 		return true;
		// 	}
		// };

		$scope.select = function select(scheduleItem){
			$interval.cancel(promise);
			if(!scheduleItem.notes){
						scheduleItem.notes = "Your notes are saved here!";
			}
			ScheduleService.save(scheduleItem);
			$rootScope.$broadcast('scheduleItemSelected', scheduleItem);
		};



		$scope.scheduleTimer = function(schedule){
			var day = moment().format("dddd");
			var starttime = moment(schedule.iStart, "hh:mm A");
			var endtime = moment(schedule.iEnd, "hh:mm A");
			if(!schedule.completed && (schedule.iDay == day || schedule.iDay == "Every Day")){
				
				if(moment().isBefore(starttime, 'hour')){
					return true;
				}
				if(moment().isBefore(endtime, 'hour')){
					
					return true;
				}
			}
		};



		$scope.updateDash = function(){
			if(!$scope.first){
				var left = $scope.schedules_left; 
			// console.log(schedules_left[2]);
			$scope.select(left[0]);

			}
		
		};

		
		

			
			
	}]);


	
}());