
var app = angular.module('app', []);
app.controller('appController', ['$scope', '$http', function($scope, $http) {
    $scope.tasks = [];
    $scope.title = '';

    $scope.isShow = false;
    $scope.header = '';
    $scope.content = '';
    $scope.time = '';

    $scope.task = {};

    // 载入网页获取任务列表
    $http.get('/getlist').success(function(res) {
        $scope.tasks = res;
    });

    // 新建任务
    $scope.submit = function() {
        if ($scope.title === '') {
            return;
        }

        var task = {
            pid : (new Date()).getTime(),
            title : $scope.title,
            check : false,
            content : '',
            time : ''
        };

        $http.post('/addtask', task).success(function(res){
            console.log(res);
            $scope.tasks.push(task);
            $scope.title = '';
        })
    };

    // 删除任务
    $scope.delete = function(i, p) {
        $http.post('/deletetask', {pid : p}).success(function(res){
            console.log(res);
            //$scope.tasks.splice($scope.tasks.length - i - 1, 1);
            $scope.tasks.splice(-i - 1, 1)
        })
    };

    // 改变任务状态
    $scope.change = function(e, val) {
        $http.post('/changecheck', {pid : val.pid, check : e.target.checked}).success(function(res){
            console.log(res);
            val.check = e.target.checked;
        })
    };

    // 显示任务详情
    $scope.show = function(val) {
        $scope.isShow = true;
        $scope.header = val.title;
        $scope.content = val.content;
        $scope.time = val.time;
        
        $scope.task = val;
    };

    // 更新任务详情
    $scope.update = function() {
        $http.post('/updatetask', {pid : $scope.task.pid, content : $scope.content, time : $scope.time}).success(function(res){
            console.log(res);
            $scope.task.content = $scope.content;
            $scope.task.time = $scope.time;
            $scope.isShow = false;

            $scope.content = '';
            $scope.time = '';
        })
    }
}]);


$(function() {

    $( "#tabs" ).tabs();

    /* 详情蒙版窗口时间模块 */
    $.datetimepicker.setLocale('ch');   
    $('.date_time').datetimepicker();   

    /* 吸顶效果 */
    var topDis = $('.search').offset().top;
    $(window).scroll(function() {
        if ($(this).scrollTop() >= topDis) {
            $('.search').addClass('ceiling');
        } else {
            $('.search').removeClass('ceiling');
        }
    });

    /* 返回顶部 */
    $(window).scroll(function() {
        if ($(this).scrollTop() >= topDis) {
            $('.back').stop().show();
        } else {
            $('.back').stop().hide();
        }
    });
    
    $('.back').click(function() {
        $('body').stop().animate({scrollTop : 0});
    });
});