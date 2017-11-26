// http.post('192.168.0.5:8080/login', {params: {name: 'ABCXYZ'}})
// .success(
//     function(success){
//         console.log(success)
//     })
// .error(
//     function(error){
//         console.log(error)
//     }
// );

var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {
    console.log("mkay");
    $http.post('192.168.0.5:8080/login', {params: {name: 'ABCXYZ'}})
    .success(
        function(success){
            console.log(success)
        })
    .error(
        function(error){
            console.log(error)
        }
    );
});