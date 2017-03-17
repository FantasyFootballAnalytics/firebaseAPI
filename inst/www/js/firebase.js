// Handle sign in and log out
function toggleSignIn(email, password){
  var noparam = (email === undefined && password === undefined);
  if (firebase.auth().currentUser && noparam) {
      firebase.auth().signOut();
      Shiny.onInputChange("signInError", null);
      Shiny.onInputChange("firebase_user", null);
      Shiny.onInputChange("firebase_alert", "Signed out");
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
        var newUser = firebase.auth().currentUser;
        Shiny.onInputChange("signInError", false);
        Shiny.onInputChange("firebase_user", newUser.toJSON());
        if(newUser.emailVerified){
          Shiny.onInputChange("firebase_alert", "Sign In successful");

        } else {
          Shiny.onInputChange("firebase_alert", "Please verify email to sign in");
        }
      }).catch(function(error) {
        var auth_error = JSON.stringify(error);
        Shiny.onInputChange("signInError", auth_error);
        console.log(error);
	});
	}
}

// Send Email verification
function sendEmailVerification() {
	firebase.auth().currentUser.sendEmailVerification().then(function() {
	  Shiny.onInputChange("verifyEmailError", false);
	  Shiny.onInputChange("firebase_alert", "Email Verification Sent!");
	});
}

// Handle registrations
function handleSignUp(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
    sendEmailVerification();
    var newUser = firebase.auth().currentUser.toJSON();
    Shiny.onInputChange("signUpError", false);
    Shiny.onInputChange("firebase_alert", "Please verify email to sign in");
		Shiny.onInputChange("firebase_user", newUser);
  }).catch(function(error) {
    var auth_error = JSON.stringify(error);
		Shiny.onInputChange("signUpError", auth_error);
		console.log(error);
  });
}

function sendPasswordReset(email) {
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        Shiny.onInputChange("firebase_alert", "Password Reset Email Sent!");
        Shiny.onInputChange("resetError", false);
      }).catch(function(error) {
		var auth_error = JSON.stringify(error);
		Shiny.onInputChange("resetError", auth_error);
		console.log(error);
      });
}

function updateEmail(newEmail){
	var user = firebase.auth().currentUser;
	user.updateEmail(newEmail).then(function() {
	  sendEmailVerification();
	  user.reload();
	  Shiny.onInputChange("updateEmailError", false);
		Shiny.onInputChange("firebase_user", null);
		Shiny.onInputChange("firebase_alert", "Email updated!");
		}, function(error) {
			var auth_error = JSON.stringify(error);
			Shiny.onInputChange("updateEmailError", auth_error);
			console.log(error);
		});
}

function updatePassword(newPassword, oldPassword){
	var user = firebase.auth().currentUser;
	var userCred = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);
	user.reauthenticate(userCred).then(function() {
	  user.updatePassword(newPassword).then(function() {
	    Shiny.onInputChange("firebase_alert", "Password updated!");
	    Shiny.onInputChange("reauthError", false);
	    Shiny.onInputChange("updatePWError", false);
	  }, function(error) {
	    var auth_error = JSON.stringify(error);
			Shiny.onInputChange("updatePWError", auth_error);
			console.log(error);
	  });

	}, function(error){
	  var auth_error = JSON.stringify(error);
	  Shiny.onInputChange("reauthError", auth_error);
	  console.log(error);
	});
}

function deleteUser() {
  var confDelete = confirm("Your account will be deleted. This action cannot be undone!");
  if(confDelete){
    var user = firebase.auth().currentUser;
    user.delete();
    Shiny.onInputChange("firebase_user", null);
    Shiny.onInputChange("firebase_alert", "Account Deleted");
    Shiny.onInputChange("deleteError", false);

  }
}

function getCurrentUser(){
  var user = firebase.auth().currentUser;
  if(user)
    Shiny.onInputChange("firebase_user", user.toJSON());
  else
    Shiny.onInputChange("firebase_user", null);
}
//function initApp() {
//	firebase.auth().onAuthStateChanged(function(user) {
//	  if (user) {
//	    var fb_user = user.toJSON();
//	    Shiny.onInputChange("firebase_user", fb_user);
//	  } else {
//	    Shiny.onInputChange("firebase_user", null);
//	  }
//	});
//}

//window.onload = function() {
//	initApp();
//};




