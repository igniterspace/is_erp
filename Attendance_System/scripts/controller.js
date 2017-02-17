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

      if(!student_id){  //check if student_id is blank , null or whitespaces
        //if it is empty, call this custom error message function
       // $("#dialog-confirm").dialog('open');
        $scope.errorDialog("Empty Student Id", "Student Id field cannot be empty.");
      }else{

    		$scope.studentid = student_id;

    		$scope.results = false;

    		$scope.loading = true;

    		var url = "https://script.google.com/macros/s/AKfycbxlIbgY8FNxTUHOJ4isajDPFGRBGwXS9Aovvf8urw9-SUakqBSn/exec?studentid="+student_id;

    		$http.get(url)
    		.then(function(response){
    			console.log(response);

    			$scope.data = response.data;

    			if($scope.data == "STUDENT DOES NOT EXIST"){
    				alert("Student Id does not exist or is invalid. Please correct it and try again!!");
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
              if(($scope.data.payments[0].payment_type).toLowerCase() == "registration"){
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
    			}



    		});

      }
  	}


    //THIS FUNCTION IS TO OPEN THE VERIFY FORM WHEN A PAYMENT IS CLICKED
    $scope.openForm = function(payment_type){

      //clear the textboxes
      $scope.amount = null;
      $scope.username = null;
      $scope.password = null;
      
      //if payment type is 0 its registration else it is monthly payment
      //This if statement is to display the payment type in the form and to set it to payment_type variable
      if(payment_type == 0){
        $scope.payment_type = "registration";
      }else
      if(payment_type == 1)
      {
        $scope.payment_type = "monthly1"
      }else
      if(payment_type == 2)
      {
        $scope.payment_type = "monthly2"
      }else
      if(payment_type == 3)
      {
        $scope.payment_type = "monthly3"
      }else
      if(payment_type == 4)
      {
        $scope.payment_type = "monthly4"
      }else
      if(payment_type == 5)
      {
        $scope.payment_type = "monthly5"
      }else
      if(payment_type == 6)
      {
        $scope.payment_type = "monthly6"
      }
      else{
        $scope.payment_type = "additional"
      }



      document.getElementById('formDiv').style.display = "block";
    }

    //THIS FUNCTION IS TO CLOSRE THE VERIFY FORM
    $scope.closeForm = function(){
      
      document.getElementById('formDiv').style.display = "none";
    }

    //THIS FORM IS TO CHECK THE DETAILS IN THE VERIFY FORM AND THEN ADD THE DETAILS TO PAYMENT GOOGLE SHEETS
    $scope.verifyPayment = function(username, password){
      //first hardcode the username and password, later use the google sheet
      var uname = "igniter";
      var pass = "1";

      //After form is submitted, check if login details are correct
      if((username == uname) && (password == pass)){
        //enter the details to the transaction database (payment_logs table)

        //-----------------------------------------
      var url = "https://script.google.com/macros/s/AKfycbzcvdl840bsB3nneQmL2AYApFlccl9N-KOQacIllXVlyOuHaUo/exec?studentid="+$scope.studentid+"&payment_type="+$scope.payment_type+"&amount="+$scope.amount+"&batch="+$scope.batch;
              $http.get(url)
              .then(function(response){
                if(response.data == -1){
                  alert("Invalid ! This is not the date of a class")
                }
                
              });

        //-----------------------------------------


        alert('Login successful. Payment has been entered');
        $scope.closeForm();
        //


      if($scope.payment_type == "registration"){
        $scope.registration = true;
      }else
      if($scope.payment_type == "monthly1")
      {
        $scope.payment1 = true;
      }else
      if($scope.payment_type == "monthly2")
      {
        $scope.payment2 = true;
      }else
      if($scope.payment_type == "monthly3")
      {
        $scope.payment3 = true;
      }else
      if($scope.payment_type == "monthly4")
      {
        $scope.payment4 = true;
      }else
      if($scope.payment_type == "monthly5")
      {
        $scope.payment5 = true;
      }else
      if($scope.payment_type == "monthly6")
      {
        $scope.payment6 = true;
      }
      
        
      }else{
        //calling closeForm function is not working so implement it here
        alert('Wrong details. Please enter your user details correctly and try again.');
        $scope.closeForm();
      }

    }

    //THIS FORM IS TO DISPLAY ERROR MESSAGE WHEN FIELD IS EMPTY

    $scope.errorDialog = function(errorTitle, errorMessage){

      console.log(errorTitle);
      $scope.errorTitle = errorTitle;//title doesnt seem to work, make function with return errorTitle? (printErrorTitle)
      

      $scope.errorMessage = errorMessage;


      $("#dialog-confirm").dialog('open');
      

          //can make this into a function with error title and error message

    }




  });
