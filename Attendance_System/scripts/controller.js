var myApp = angular.module('myApp',[]);

	myApp.controller('DashboardCtrl', function($scope, $http, $location) {
    
  	$scope.loading = false;
    //THIS FUNCTION IS TO MARK ATTENDANCE
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


    //-------------------------------
    //THIS FUNCTION IS TO VIEW ATTENDANCE
    $scope.viewAttendance = function(){
      $scope.viewingAtt = true;
      var url = "https://script.google.com/macros/s/AKfycbzcvdl840bsB3nneQmL2AYApFlccl9N-KOQacIllXVlyOuHaUo/exec?studentid="+$scope.studentid;
      $http.get(url)
      .then(function(response){
        console.log(response);

        $scope.data = response.data;

        if(response.data == -1){
          alert("Invalid ! This student has not attended any classes")
        }
        //$scope.viewingAtt = false;
        //$scope.results = false; //to get back to menu
        $scope.student_id = null; //clear the student id box


        //----USE A FOR LOOOP HERE--------------------------------------------

        $scope.AttDetails = [];
        
        for(var i=0; i<$scope.data.student_attendance.length; i++){
          $scope.AttDetails.push($scope.data.student_attendance[i]);
        }

        //-------------------------------------------------------------------

      });
    }

    //----------------------------------

    //THIS FUNCTION IS TO GET THE STUDENT DETAILS WITH STUDENT ID
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
          if($scope.data.payments.length == 0){ //if array is empty
            //set everything to false again 
            $scope.registration = false;
            $scope.payment1 = false;
            $scope.payment2 = false;
            $scope.payment3 = false;
            $scope.payment4 = false;
            $scope.payment5 = false;
            $scope.payment6 = false;
          }else{
            //for registration we check if its filled AND if payment_type is set to registration
          if($scope.data.payments[0].payment_type == "registration"){
            $scope.registration = true;
          }else{
            $scope.registration = false;
          }

          //First monthly payment
          if($scope.data.payments[1]){
            $scope.payment1 = true;
          }else{
            $scope.payment1 = false;
          }
          //Second monthly payment
          if($scope.data.payments[2]){
            $scope.payment2 = true;
          }else{
            $scope.payment2 = false;
          }
          //Third monthly payment
          if($scope.data.payments[3]){
            $scope.payment3 = true;
          }else{
            $scope.payment3 = false;
          }
          //Fourth monthly payment
          if($scope.data.payments[4]){
            $scope.payment4 = true;
          }else{
            $scope.payment4 = false;
          }
          //Fifth monthly payment
          if($scope.data.payments[5]){
            $scope.payment5 = true;
          }else{
            $scope.payment5 = false;
          }
          //Sixth monthly payment
          if($scope.data.payments[6]){
            $scope.payment6 = true;
          }else{
            $scope.payment6 = false;
          }
        }//end of if empty array 


         /* if($scope.data.payments[2].payment_type =="monthly"){
            $scope.payment1 = true;

          }else{
            $scope.payment1 = true;
          }*/

          //if doesnt work delete payment details








  				//alert("data is valid"+$scope.data.students[0].StudentName);
  				//console.log($scope.data);
  				//----------------------------------------
  			}



  		});
  	}
  });
