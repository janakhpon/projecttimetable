// !IMPORTANT: REPLACE WITH YOUR OWN CONFIG OBJECT BELOW


// Initialize Firebase
var config = {
    apiKey: "AIzaSyD3mqI_bl7IS3fzZRSh27FcMTAq2r1pxB8",
    authDomain: "projecttimetable-4b679.firebaseapp.com",
    databaseURL: "https://projecttimetable-4b679.firebaseio.com",
    projectId: "projecttimetable-4b679",
    storageBucket: "projecttimetable-4b679.appspot.com",
    messagingSenderId: "400521989572"

};



firebase.initializeApp(config);

// Firebase Database Reference and the child
const dbRef = firebase.database().ref();
const usersRef = dbRef.child('users');


readUserData();



function readUserData() {
	var userDataRef = firebase.database().ref("users").orderByKey();
	var table = document.querySelector('#showtable tbody');
	userDataRef.once("value").then(function (snapshot) {

		snapshot.forEach(function (childSnapshot) {

			
			var key = childSnapshot.key;
			var childData = childSnapshot.val();
			var name_val = childSnapshot.val().Name;
			var role_val = childSnapshot.val().Role;
			var done_val = childSnapshot.val().Done;
			var arrival_val = childSnapshot.val().Arrival;
			var leave_val = childSnapshot.val().Leave;
			var date_val = childSnapshot.val().Date;


			$("#showtable").append("<tr><td>"+name_val+"</td><td>"
				+role_val+"</td><td>"+done_val+"</td><td>"+arrival_val+
				"</td><td>"+leave_val+"</td><td>"+date_val+"</td></tr>");





		});

		
	});





}



function userClicked(e) {


	var userID = e.target.getAttribute("user-key");

	const userRef = dbRef.child('users/' + userID);
	const userDetailUI = document.getElementById("user-detail");

	userRef.on("value", snap => {

		userDetailUI.innerHTML = ""

		snap.forEach(childSnap => {
			var $p = document.createElement("p");
			$p.innerHTML = childSnap.key + " - " + childSnap.val();
			userDetailUI.append($p);
		})

	});


}





// --------------------------
// ADD
// --------------------------

const addUserBtnUI = document.getElementById("add-user-btn");
addUserBtnUI.addEventListener("click", addUserBtnClicked)



function addUserBtnClicked() {

	const usersRef = dbRef.child('users');

	const addUserInputsUI = document.getElementsByClassName("form-control");

	// this object will hold the new user information
	let newUser = {};

	// loop through View to get the data for the model 
	for (let i = 0, len = addUserInputsUI.length; i < len; i++) {

		let key = addUserInputsUI[i].getAttribute('data-key');
		let value = addUserInputsUI[i].value;
		newUser[key] = value;
	}

	usersRef.push(newUser)


	console.log(myPro)



}


// --------------------------
// DELETE
// --------------------------
function deleteButtonClicked(e) {

	e.stopPropagation();

	var userID = e.target.getAttribute("userid");

	const userRef = dbRef.child('users/' + userID);

	userRef.remove();

}


// --------------------------
// EDIT
// --------------------------
function editButtonClicked(e) {

	document.getElementById('edit-user-module').style.display = "block";

	//set user id to the hidden input field
	document.querySelector(".edit-userid").value = e.target.getAttribute("userid");

	const userRef = dbRef.child('users/' + e.target.getAttribute("userid"));

	// set data to the user field
	const editUserInputsUI = document.querySelectorAll(".edit-user-input");


	userRef.on("value", snap => {

		for (var i = 0, len = editUserInputsUI.length; i < len; i++) {

			var key = editUserInputsUI[i].getAttribute("data-key");
			editUserInputsUI[i].value = snap.val()[key];
		}

	});




	const saveBtn = document.querySelector("#edit-user-btn");
	saveBtn.addEventListener("click", saveUserBtnClicked)
}


function saveUserBtnClicked(e) {

	const userID = document.querySelector(".edit-userid").value;
	const userRef = dbRef.child('users/' + userID);

	var editedUserObject = {}

	const editUserInputsUI = document.querySelectorAll(".edit-user-input");

	editUserInputsUI.forEach(function (textField) {
		let key = textField.getAttribute("data-key");
		let value = textField.value;
		editedUserObject[textField.getAttribute("data-key")] = textField.value
	});



	userRef.update(editedUserObject);

	document.getElementById('edit-user-module').style.display = "none";


}