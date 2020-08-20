var taskcounter = angular.module('taskcounter', []);
taskcounter.controller("TodoListController", function($scope, $interval) {
    $scope.todoList = [
        {status: 'Queued', task: 'Create this app', time: '01:20:00', done: false},
        {status: 'Queued', task: 'Make it work properly', time: '01:30:00', done: false},
        {status: 'Queued', task: 'Make the coundown of the current task', time: '01:00:00', done: false},
        {status: 'Queued', task: "Make the 'Start' button works", time: '01:00:00', done: false},
        {status: 'Queued', task: "Make the 'Pause' button works", time: '01:00:00', done: false},
        {status: 'Queued', task: "Group the tasks by 'Queued' and 'Done'", time: "01:00:00", done: false},
        {status: 'Queued', task: "Make the design of the app using CSS", time: "02:00:00", done: false},
        {status: 'Done', task: 'Put time in hours:minutes:seconds', time: '01:40:00', done: true},
        {status: 'Done', task: "Make the 'Done' button works", time: '01:25:00', done: true},
        {status: 'Done', task: "Make the 'Skip' button works", time: '00:30:00', done: true},
        {status: 'Done', task: "Make the 'Delete' button works", time: '01:40:00', done: true},
    ];

    for (todo of $scope.todoList) {
        todo.btnSkip = todo.done ? '-' : 'Skip';
    }

    $scope.hours   = [...Array(24).keys()];
    $scope.minutes = [...Array(12).keys()].map((x) => x*5);

    $scope.addTask = function() {

        let setTime = new Date();
        setTime.setHours($scope.hour);
        setTime.setMinutes($scope.minute);
        setTime.setSeconds(0);

        $scope.todoList.push({
            status: 'Queued',
            task: $scope.todo.task,
            time: setTime,
            done: false
        });

        $scope.todo.task = $scope.todo.time = '';
        $scope.hour = $scope.minute = '';
    };

    
    $scope.startTasks = function() {
        $scope.todoList[0].status = 'In progress';
        // has to stop the final time clock
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


    $scope.doneTask = function(index) {
        $scope.todoList[index].done = true;
        $scope.todoList[index].status = 'Done';
        $scope.todoList[index].btnSkip = '-';
        // $scope.todoList.push(todoList.splice(index, 1));
    }


    $scope.skipTask = function(index) {
        if ($scope.todoList[index].btnSkip === 'Skip') {
            $scope.todoList[index].done = true;
            $scope.todoList[index].status = 'Skipped';
            $scope.todoList[index].btnSkip = 'Retake';
        } else {
            $scope.todoList[index].done = false;
            $scope.todoList[index].status = 'Queued';
            $scope.todoList[index].btnSkip = 'Skip';
        }
    }

    $scope.delTask = function(index) {
        $scope.todoList.splice(index, 1);
    }

    $scope.totalTime = function() {
        let totalHours   = 0;
        let totalMinutes = 0;
        let totalSeconds = 0;
        for (todo of $scope.todoList) {
            if (todo.status !== 'Skipped') {
                if (typeof todo.time === "string") {
                    let todoTime = todo.time.split(':').map((x) => +x);
                    totalHours   += todoTime[0];
                    totalMinutes += todoTime[1];
                    totalSeconds += todoTime[2];
                } else {
                    totalHours += todo.time.getHours();
                    totalMinutes += todo.time.getMinutes();
                }
            }
        }
        
        let timeCount = new Date();
        timeCount.setHours(totalHours);
        timeCount.setMinutes(totalMinutes);
        timeCount.setSeconds(totalSeconds);

        return timeCount;
    }

    $scope.completedTasks = function() {
        let count = 0;
        for (todo of $scope.todoList) {
            if (todo.done && todo.status !== 'Skipped') {
                count++;
            }
            // count += todo.done ? 1 : 0;
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

        return timeCount;
    };

    
    $scope.finalTime = function() {
        let currentDate = new Date();    
        let totalsetTime = $scope.totalTime();   

        let finalTasksTime = new Date();

        finalTasksTime.setHours(currentDate.getHours() + totalsetTime.getHours());
        finalTasksTime.setMinutes(currentDate.getMinutes() + totalsetTime.getMinutes());
        finalTasksTime.setSeconds(currentDate.getSeconds() + totalsetTime.getSeconds());
       
        return finalTasksTime;
    }

    // testing countdown
    $scope.counter = 0;

    var increaseCounter = function () {
        if ($scope.todoList[0].status === 'In progress') {
            $scope.counter = $scope.counter - 1;
        }
    }

    $interval(increaseCounter, 1000);   
    
});