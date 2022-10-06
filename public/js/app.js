/*
* Angular App
* By: Tatwerat Team (Abdo Hamoud)
* www.tatwerat.com
* www.abdo-host.com
*/

angular.module('AH_App', []).controller('appController', function ($scope) {
    $scope.random_key = new Date().getTime();
})
