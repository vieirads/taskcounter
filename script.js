function TodoListController($scope) {
    $scope.todoList = [
        {status: 'Queued', task: 'Create this app', time: 1, done: false},
        {status: 'Queued', task: 'Make it work properly', time: 1, done: false},
        {status: 'Queued', task: 'Put time in hours:minutes:seconds', time: 2, done: false},
        {status: 'Queued', task: 'Make the coundown of the current task', time: 3, done: false},
        {status: 'Queued', task: "Make the 'Start' button works", time: 2, done: false},
        {status: 'Queued', task: "Make the 'Pause' button works", time: 2, done: false},
        {status: 'Done', task: "Make the 'Done' button works", time: 2, done: true},
        {status: 'Done', task: "Make the 'Skip' button works", time: 2, done: true},
        {status: 'Done', task: "Make the 'Delete' button works", time: 2, done: true},
    ];

    $scope.addTask = function() {
        $scope.todoList.push({
            task: $scope.todo.task,
            time: $scope.todo.time,
            done: false
        });
        $scope.todo.task = $scope.todo.time = '';
    };

    $scope.startTasks = function() {
        $scope.todoList[0].status = 'In progress';
        // add countown
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
        let count = 0;
        for (todo of $scope.todoList) {
            count += todo.time;
        }
        return count;
    }

    $scope.completedTasks = function() {
        let count = 0;
        for (todo of $scope.todoList) {
            count += todo.done ? 1 : 0;
        };
        return count;
    };

    $scope.ellapsedTime = function() {
        let count = 0;
        for (todo of $scope.todoList) {
            if (todo.done) {
                count += todo.time;
            }
        };
        return count;
    };

    
}