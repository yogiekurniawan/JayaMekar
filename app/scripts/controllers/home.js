'use strict';

angular.module('jayaMekarApp')
.controller('HomeCtrl', function($scope, layananData, indexeddb ) {

	layananData.getJabatan().then(function(data){
		$scope.model = data;
	});


    $scope.data = {}
    $scope.showFrom = function(message) {
        return message.hasOwnProperty('from')
    }
    $scope.showCreatedBy= function(message) {
        return message.hasOwnProperty('createdBy')
    }
    $scope.showTo= function(message) {
        return message.hasOwnProperty('to')
    }
    $scope.data.messages = [
        {
        "type": "phone",
        "date": "25/12/2012",
        "time": "11.34",
        "createdBy": {
            "name": "Jenny Forster1",
            "avatarFileName": "jenny-forster.jpg"
        },
        "from": {
            "name": "Jenny Forster1",
            "avatarFileName": "jenny-forster.jpg"
        },
        "to": {
            "name": "Daniel Craig1",
            "avatarFileName": "daniel-craig.jpg"
        },
        "title": "This is the title of a phone call"},
    {
        "type": "email",
        "date": "25/12/2012",
        "time": "11.34",
        "createdBy": {
            "name": "Jenny Forster2",
            "avatarFileName": "jenny-forster.jpg"
        },
        "from": {
            "name": "Daniel Craig2",
            "avatarFileName": "daniel-craig.jpg"
        },
        "to": {
            "name": "Jenny Forster2",
            "avatarFileName": "jenny-forster.jpg"
        },
        "title": "This is the title of an email"},
    {
        "type": "meeting",
        "date": "25/12/2012",
        "time": "11.34",
        "createdBy": {
            "name": "Jenny Forster3",
            "avatarFileName": "jenny-forster.jpg"
        },
        "title": "This is the title of a meeting"},
    {
        "type": "note",
        "date": "25/12/2012",
        "time": "11.34",
        "createdBy": {
            "name": "Jenny Forster4",
            "avatarFileName": "jenny-forster.jpg"
        },
        "title": "This is the title of a note"}
    ]

})


    .directive('myNgIf', function() {
        return {
            link: function(scope, element, attrs) {
                if(scope.$eval(attrs.myNgIf)) {
                // remove '<div ng-if...></div>'
                element.replaceWith(element.children())
            } else {
                element.replaceWith(' ')
            }
        }
    }
})