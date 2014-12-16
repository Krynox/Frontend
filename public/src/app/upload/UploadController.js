/**
 * Created by James on 15/12/2014.
 */
/**
 * Created by James on 23/11/2014.
 */
(function () {
    "use strict";
    var UploadController = function ($scope, $http) {
        $scope.showUpload=function(){
            $("#UploadBox").animate({
                height:200
            },1000);
            $("#UploadArea").css({"display":"block","opacity":"0"});
            $("#UploadArea").animate({
                opacity:1
            },1000);
        }
    }
    var app = angular.module("app");
    app.controller("UploadController", ["$scope", "$http", UploadController]);
})();