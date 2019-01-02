var app = angular.module('ascensionApp');


app.service('AssignmentService', function(){

	var today;
	var week;

	return{
		show: function(){
			return today, week;

		},
		save: function(t,w){
			today = t;
			week = w;

		}
	}
});