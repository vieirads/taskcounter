var taskcounter = angular.module('taskcounter', []);
taskcounter.controller("TodoListController", function($scope, $interval) {
// function TodoListController($scope) {
    $scope.todoList = [
        {status: 'Queued', task: 'Create this app', time: '1:20:00', done: false},
        {status: 'Queued', task: 'Make it work properly', time: '1:30:00', done: false},
        {status: 'Queued', task: 'Make the coundown of the current task', time: '1:00:00', done: false},
        {status: 'Queued', task: "Make the 'Start' button works", time: '1:00:00', done: false},
        {status: 'Queued', task: "Make the 'Pause' button works", time: '1:00:00', done: false},
        {status: 'Done', task: 'Put time in hours:minutes:seconds', time: '1:40:00', done: true},
        {status: 'Done', task: "Make the 'Done' button works", time: '1:25:00', done: true},
        {status: 'Done', task: "Make the 'Skip' button works", time: '0:30:00', done: true},
        {status: 'Done', task: "Make the 'Delete' button works", time: '1:40:00', done: true},
    ];

    $scope.addTask = function() {
        $scope.todoList.push({
            status: 'Queued',
            task: $scope.todo.task,
            time: $scope.todo.time,
            done: false
        });
        $scope.todo.task = $scope.todo.time = '';
    };

    $scope.startTasks = function() {
        $scope.todoList[0].status = 'In progress';
    }  
    

    $scope.pauseResume = 'Pause';
    $scope.pauseTasks = function() {
        if ($scope.pauseResume === 'Pause') {
            $scope.todoList[0].status = 'Paused';
            $scope.pauseResume = 'Resume';
        } else {
            $scope.todoList[0].status = 'In progress';
            $scope.pauseResume = 'Pause';
        }
        // add pauseResume countdown
    }

    let currentDate = new Date();
    $scope.finalTime = function() {
        let hours   = currentDate.getHours();
        let minutes = currentDate.getMinutes();
        let seconds = currentDate.getSeconds();

        if (hours < 10) {
            hours = `0${hours}`;
        }
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`
        }

        return `${hours}:${minutes}:${seconds}`;
    }

    $scope.doneTask = function(index) {
        $scope.todoList[index].done = true;
        $scope.todoList[index].status = 'Done';
        // $scope.todoList.push(todoList.splice(index, 1));
    }

    $scope.skipTask = function(index) {
        $scope.todoList[index].done = true;
        $scope.todoList[index].time = 0;
        $scope.todoList[index].status = 'Skipped';
    }

    $scope.delTask = function(index) {
        $scope.todoList.splice(index, 1);
    }

    $scope.totalTime = function() {
        let totalHours   = 0;
        let totalMinutes = 0;
        let totalSeconds = 0;
        for (todo of $scope.todoList) {
            let todoTime = todo.time.split(':').map((x) => +x);
            totalHours   += todoTime[0];
            totalMinutes += todoTime[1];
            totalSeconds += todoTime[2];
        }
        
        let timeCount = new Date();
        timeCount.setHours(totalHours);
        timeCount.setMinutes(totalMinutes);
        timeCount.setSeconds(totalSeconds);

        let displayHours   = timeCount.getHours();
        let displayMinutes = timeCount.getMinutes();
        let displaySeconds = timeCount.getSeconds();

        if (displayHours < 10) {
            displayHours = `0${displayHours}`;
        }

        if (displayMinutes < 10) {
            displayMinutes = `0${displayMinutes}`;
        }

        if (displaySeconds < 10) {
            displaySeconds = `0${displaySeconds}`;
        }


        return `${displayHours}:${displayMinutes}:${displaySeconds}`;
    }

    $scope.completedTasks = function() {
        let count = 0;
        for (todo of $scope.todoList) {
            count += todo.done ? 1 : 0;
        };
        return count;
    };

    $scope.ellapsedTime = function() {
        let ellapsedHours   = 0;
        let ellapsedMinutes = 0;
        let ellapsedSeconds = 0;
        for (todo of $scope.todoList) {
            if (todo.done) {
                let todoTime = todo.time.split(':').map((x) => +x);
                ellapsedHours   += todoTime[0];
                ellapsedMinutes += todoTime[1];
                ellapsedSeconds += todoTime[2];
            }
        };
        
        let timeCount = new Date();
        timeCount.setHours(ellapsedHours);
        timeCount.setMinutes(ellapsedMinutes);
        timeCount.setSeconds(ellapsedSeconds);

        let displayHours   = timeCount.getHours();
        let displayMinutes = timeCount.getMinutes();
        let displaySeconds = timeCount.getSeconds();

        if (displayHours < 10) {
            displayHours = `0${displayHours}`;
        }

        if (displayMinutes < 10) {
            displayMinutes = `0${displayMinutes}`;
        }

        if (displaySeconds < 10) {
            displaySeconds = `0${displaySeconds}`;
        }

        return `${displayHours}:${displayMinutes}:${displaySeconds}`;
    };

    // testing countdown
    $scope.counter = 0;

    var increaseCounter = function () {
        if ($scope.todoList[0].status === 'In progress') {
            $scope.counter = $scope.counter - 1;
        }
    }

    $interval(increaseCounter, 1000);   
    
});