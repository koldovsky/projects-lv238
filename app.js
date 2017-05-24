var app = angular.module('GroupApp', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', '$mdSidenav', 'studentService', function ($scope, $mdSidenav, studentService) {
    var allStudents = [];


    $scope.subgroups = [1, 2];
    $scope.selectedsubgroups = [1, 2];
    $scope.isChosenOnly = false;
    //$scope.toggle = function (item, list) {
    //  var idx = list.indexOf(item);
    //  if (idx >-1) {
    //    list.splice(idx, 1);
    //  } else {
    //    list.push(item);
    //  }
    //};
    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };
    $scope.toggleChosen = function (item) {
        $scope.isChosenOnly = !$scope.isChosenOnly;
    };
    //$scope.filterBySubgroup = function (student) {
    //  return $scope.exists(student.subgroup, $scope.selectedsubgroups);
    //};

    $scope.filterByChosen = function (student) {
        if ($scope.isChosenOnly) {
            if (student.isChosenProject) {
                console.log(student);
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    };

    $scope.filterByData = function (student) {
        if (!student.websiteUrl || !student.codeSourceUrl) {
            return false;
        }
        return true;
    }

    $scope.selected = null;
    $scope.students = allStudents;
    $scope.selectStudent = selectStudent;
    $scope.toggleSidenav = toggleSidenav;

    loadStudents();

    function loadStudents() {
        studentService.loadAll()
            .then(function (students) {
                allStudents = students;
                $scope.students = [].concat(students);
                $scope.selected = $scope.students[0];
            })
    }

    function toggleSidenav(name) {
        $mdSidenav(name).toggle();
    }

    function selectStudent(student) {
        $scope.selected = angular.isNumber(student) ? $scope.students[student] : student;
        $scope.toggleSidenav('left');
    }

}]);

app.service('studentService', ['$q', function ($q) {

    //! http://www.convertcsv.com/csv-to-json.htm
    // http://www.csvjson.com/csv2json
    var students = [
        {
            "name": "Fominova Anna",
            "websiteUrl": "https://annafominova.github.io/my-project/",
            "codeSourceUrl": "https://github.com/annafominova/my-project",
            "cvUrl": "https://www.linkedin.com/in/anna-fominova-438812a5/",
            "photo": "images/students/fominova.jpg"
        },
        {
            "name": "Babyak Bohdan",
            "websiteUrl": "http://test.sam-wash.com",
            "codeSourceUrl": "https://github.com/Bombik007/SW",
            "cvUrl": "https://1drv.ms/w/s!AjlWOjubSXuZySOcBWaFh1bHHJYd",
            "photo": "images/students/babyak.jpg"
        },
        {
            "name": "Mandzii Khrystyna",
            "websiteUrl": "https://kmandziy.github.io/constructions-design/",
            "codeSourceUrl": "https://github.com/kmandziy/constructions-design/blob/gh-pages/index.html",
            "cvUrl": "",
            "photo": "images/students/mandzii.jpg"
        },
        {
            "name": "Tsymbala Mykhailo",
            "websiteUrl": "https://mishatsymbala.github.io/final-project/",
            "codeSourceUrl": "https://github.com/MishaTsymbala/final-project",
            "cvUrl": "",
            "photo": "images/students/tsymbala.jpg"
        },
        {
            "name": "Morkvych Nazar",
            "websiteUrl": "https://nazarmorkvich.github.io/final-project/",
            "codeSourceUrl": "https://github.com/nazarmorkvich/final-project",
            "cvUrl": "",
            "photo": "images/students/morkvych.jpg"
        },
        {
            "name": "Kovaliuk Oleh",
            "websiteUrl": "https://okovaliukcv-picazzo.c9users.io/index.html",
            "codeSourceUrl": "https://github.com/Picazz/cv",
            "cvUrl": "",
            "photo": "images/students/kovaliuk.jpg"
        },
        {
            "name": "Vasylyshyn Oleg",
            "websiteUrl": "https://olegvasylyshyn.github.io/the-weather-forecast/",
            "codeSourceUrl": "https://github.com/OlegVasylyshyn/the-weather-forecast",
            "cvUrl": "https://www.linkedin.com/in/oleg-vasylyshyn-370472104/",
            "photo": "images/students/vasylyshyn.jpg"
        },
        {
            "name": "Demkovych Oleksiy",
            "websiteUrl": "https://cominback.github.io/iceland/",
            "codeSourceUrl": "https://github.com/cominback/iceland",
            "cvUrl": "",
            "photo": "images/students/no-photo.gif"
        },
        {
            "name": "Bronevytskyy Stanislav",
            "websiteUrl": "https://stasbron.github.io/belgium/",
            "codeSourceUrl": "https://github.com/stasbron/belgium",
            "cvUrl": "",
            "photo": "images/students/bronevytskyy.jpg"
        },
        {
            "name": "Martynova Viktoriia",
            "websiteUrl": "https://victoria29.github.io/sova-webpage/",
            "codeSourceUrl": "https://github.com/victoria29/sova-webpage",
            "cvUrl": "",
            "photo": "images/students/martynova.jpg"
        },
        {
            "name": "Babii Vladyslav",
            "websiteUrl": "https://babeyco13.github.io/final-project/",
            "codeSourceUrl": "https://github.com/babeyco13/final-project",
            "cvUrl": "",
            "photo": "images/students/babii.jpg"
        },
        {
            "name": "Babenko Yuliia",
            "websiteUrl": "https://julliya.github.io/lesson4_homework/",
            "codeSourceUrl": "https://github.com/Julliya/lesson4_homework",
            "cvUrl": "https://www.linkedin.com/in/juli-babenko-b7ab1a93/",
            "photo": "images/students/babenko.jpg"
        },
        {
            "name": "Svirhun Zinovii",
            "websiteUrl": "https://svirgun.github.io/trance-and-progressive/",
            "codeSourceUrl": "https://github.com/Svirgun/trance-and-progressive",
            "cvUrl": "",
            "photo": "images/students/svirhun.jpg"
        }
    ];

    // Promise-based API
    return {
        loadAll: function () {
            // Simulate async nature of real remote calls
            return $q.when(students);
        }
    };
}]);
