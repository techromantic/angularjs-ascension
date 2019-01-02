var app = angular.module('ascensionApp');


app.service('ScheduleService', function() {
	
	var scheduleItem = {};

	    return {
        show: function () {
             return scheduleItem; 
             // console.log(scheduleItem);                  
        },
        save: function (sItem) {
			scheduleItem = sItem;
			// console.log(scheduleItem);
        }
    }
});
