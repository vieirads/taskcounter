var taskcounter = angular.module('taskcounter', []);
taskcounter.controller("TodoListController", function($scope, $interval, $window) {
    $scope.todoList = [
        {status: 'Queued', task: 'Create this app', time: '00:00:03', done: false},
        {status: 'Queued', task: 'Make it work properly', time: '00:00:03', done: false},
        {status: 'Queued', task: "Make the design of the app using CSS", time: "00:00:03", done: false},
        {status: 'Queued', task: 'Make the coundown of the current task', time: '00:00:03', done: false},
        {status: 'Queued', task: "Make the 'Start' button works", time: '00:00:03', done: false},
        {status: 'Queued', task: "Make the 'Pause' button works", time: '00:00:03', done: false},
        {status: 'Done', task: 'Put time in hours:minutes:seconds', time: '01:40:00', done: true},
        {status: 'Done', task: "Make the 'Done' button works", time: '01:25:00', done: true},
        {status: 'Done', task: "Make the 'Skip' button works", time: '00:30:00', done: true},
        {status: 'Done', task: "Make the 'Delete' button works", time: '01:40:00', done: true},
        {status: 'Done', task: "Group the tasks by 'Queued' and 'Done'", time: "01:00:00", done: true}
    ];

    Array.prototype.insert = function(item, index) {
        this.splice(index, 0, item);
    };
    
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

        let queuedCounter = 0;
        for (todo of $scope.todoList) {
            queuedCounter += todo.status === 'Queued' ? 1 : 0;
        }

        $scope.todoList.insert({
            status: 'Queued',
            task: $scope.todo.task,
            time: setTime,
            done: false,
            btnSkip: 'Skip'
        }, queuedCounter);


        $scope.todo.task = $scope.todo.time = '';
        $scope.hour = $scope.minute = '';
    };   

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
        
        let queuedCounter = 0;
        for (todo of $scope.todoList) {
            queuedCounter += todo.status === 'Queued' || todo.status === 'Skipped' ? 1 : 0;
        }

        // $scope.todoList.insert($scope.todoList.splice(index, 1)[0], queuedCounter);
        $scope.todoList.push($scope.todoList.splice(index, 1)[0]);
    }


    $scope.skipTask = function(index) {
        if ($scope.todoList[index].btnSkip === 'Skip') {
            $scope.todoList[index].done = true;
            $scope.todoList[index].status = 'Skipped';
            $scope.todoList[index].btnSkip = 'Retake';
            
            let queuedCounter = 0;
            for (todo of $scope.todoList) {
                queuedCounter += todo.status === 'Done' ? 1 : 0;
            }
            queuedCounter = $scope.todoList.length - queuedCounter - 1;

            $scope.todoList.insert($scope.todoList.splice(index, 1)[0], queuedCounter);

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

    let ellapsedTime = function() {
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

    $scope.ellapsedTaskTime = ellapsedTime();

    let finalTime = function() {
        let currentDate = new Date();    
        let totalsetTime = $scope.totalTime();   

        let finalTasksTime = new Date();

        finalTasksTime.setHours(currentDate.getHours() + totalsetTime.getHours());
        finalTasksTime.setMinutes(currentDate.getMinutes() + totalsetTime.getMinutes());
        finalTasksTime.setSeconds(currentDate.getSeconds() + totalsetTime.getSeconds());
       
        return finalTasksTime;
    }

    $scope.finalTasksTime = finalTime();

    for (todo of $scope.todoList) {
        let inProgressTaskTime = todo.time.split(':').map((x) => +x);
        todo.decreasingTime = new Date();
        todo.decreasingTime.setHours(inProgressTaskTime[0]);
        todo.decreasingTime.setMinutes(inProgressTaskTime[1]);
        todo.decreasingTime.setSeconds(inProgressTaskTime[2]);
    }

    
    
    let runTime = function () {
        let currentFinalSeconds = $scope.finalTasksTime.getSeconds();
        let ellapsingSeconds    = $scope.ellapsedTaskTime.getSeconds();
        let currentTaskSeconds  = $scope.todoList[0].decreasingTime.getSeconds();

        if ($scope.todoList[0].status !== 'In progress') {
            currentFinalSeconds++;
        } else if ($scope.todoList[0].status === 'In progress') {
            ellapsingSeconds++;
            currentTaskSeconds--;
        }

        $scope.finalTasksTime.setSeconds(currentFinalSeconds);
        $scope.ellapsedTaskTime.setSeconds(ellapsingSeconds);
        $scope.todoList[0].decreasingTime.setSeconds(currentTaskSeconds);

        let currentTaskHours   = $scope.todoList[0].decreasingTime.getHours();
        let currentTaskMinutes = $scope.todoList[0].decreasingTime.getMinutes();

        if (currentTaskHours == 0 && currentTaskMinutes == 0 && currentTaskSeconds == 0 && $scope.todoList[0].status === 'In progress') {
            $scope.todoList[0].done = true;
            $scope.todoList[0].status = 'Done';
            $scope.todoList[0].btnSkip = '-';
            $scope.todoList.push($scope.todoList.splice(0, 1)[0]);
            if ($scope.todoList[0].status === 'Queued') {
                $scope.todoList[0].status = 'In progress';
            }
        }

        let tasksQueued = 0;
        for (todo in $scope.todoList) {
            tasksQueued += todo.done ? 0 : 1;
        }
    }

    // $scope.alertFinished = function() {
    //     $window.alert("Finished!");
    // }

    $scope.startTasks = function() {
        $scope.todoList[0].status = 'In progress';
    }

    if ($scope.todoList[0].status !== 'In progress') {
        $interval(runTime, 1000);
    }
});