var myApp = angular.module('myApp',[]);

	myApp.controller('DashboardCtrl', function($scope, $http, $location) {

  	$scope.loading = false;

  	$scope.markAttendance = function(){
     // $route.reload();
     // window.location.reload(); go to starting page after attendance is marked
  		$scope.markingAtt = true;
  		//if this url works, then try to put both in one script
  		//alert("Student id is : "+$scope.studentid);
  		var url = "https://script.google.com/macros/s/AKfycbxlIbgY8FNxTUHOJ4isajDPFGRBGwXS9Aovvf8urw9-SUakqBSn/exec?studentid="+$scope.studentid+"&batch="+$scope.batch+"&markattendance=true";
  		$http.get(url)
  		.then(function(response){
  			if(response.data == -1){
  				alert("Invalid ! This is not the date of a class")
  			}
  			$scope.markingAtt = false;
        $scope.results=false;//to get back to menu
        $scope.student_id=null;//clear the student id box
  		});
  	}

  	$scope.getStudentByID = function(student_id){
  		$scope.studentid = student_id;

  		$scope.results = false;

  		$scope.loading = true;

  		var url = "https://script.google.com/macros/s/AKfycbxlIbgY8FNxTUHOJ4isajDPFGRBGwXS9Aovvf8urw9-SUakqBSn/exec?studentid="+student_id;

  		$http.get(url)
  		.then(function(response){
  			console.log(response);

  			$scope.data = response.data;

  			if($scope.data.length == 0){
  				alert("Student Id not valid");
  				$scope.loading = false;
  			}else{



          $scope.loading=false;
          $scope.results=true;
          
          $scope.reg_no = $scope.data.students[0].reg_no;
          $scope.name = $scope.data.students[0].kids_name;
          $scope.age = $scope.data.students[0].age;
          $scope.age_group = $scope.data.students[0].age_group;
          $scope.batch = $scope.data.students[0].batch;
          $scope.parents_name = $scope.data.students[0].parents_name;
          $scope.email = $scope.data.students[0].email;
          $scope.phone = $scope.data.students[0].phone;
          $scope.qr_code = $scope.data.students[0].qr_code;


          //--Check if payments are done here
          if($scope.data.payments[2].payment_type =="monthly"){
            $scope.payment1 = true;

          }else{
            $scope.payment1 = true;
          }

          //if doesnt work delete payment details








  				//alert("data is valid"+$scope.data.students[0].StudentName);
  				//console.log($scope.data);
  				//----------------------------------------
  			}
  		});
  	}
  });
