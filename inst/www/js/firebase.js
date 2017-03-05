function toggleSignIn(email, password){
    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
      Shiny.onInputChange("firebase_user", null);
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
        var newUser = firebase.auth().currentUser.toJSON();
        Shiny.onInputChange("firebase_user", newUser);
        Shiny.onInputChange("firebase_alert", "Sign In successful");
      }).catch(function(error) {
        var auth_error = JSON.stringify(error);
        Shiny.onInputChange("auth_error", auth_error);
        console.log(error);
	});
	}
}

function sendEmailVerification() {
	firebase.auth().currentUser.sendEmailVerification().then(function() {
        	Shiny.onInputChange("firebase_alert", "Email Verification Sent!");
      });
}

function handleSignUp(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
    sendEmailVerification();
    var newUser = firebase.auth().currentUser.toJSON();
		Shiny.onInputChange("firebase_user", newUser);
  }).catch(function(error) {
    var auth_error = JSON.stringify(error);
		Shiny.onInputChange("auth_error", auth_error);
		console.log(error);
  });
}

function sendPasswordReset(email) {
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        Shiny.onInputChange("firebase_alert", "Password Reset Email Sent!");
      }).catch(function(error) {
		var auth_error = JSON.stringify(error);
		Shiny.onInputChange("auth_error", auth_error);
		console.log(error);
      });
}

function updateEmail(newEmail){
	var user = firebase.auth().currentUser;
	user.updateEmail(newEmail).then(function() {
	  user.reload();
		var updatedUser = user.toJSON();
		Shiny.onInputChange("firebase_user", updatedUser);
		Shiny.onInputChange("firebase_alert", "Email updated!");
		}, function(error) {
			var auth_error = JSON.stringify(error);
			Shiny.onInputChange("auth_error", auth_error);
			console.log(error);
		});
}

function updatePassword(newPassword, oldPassword){
	var user = firebase.auth().currentUser;
	var userCred = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);
	user.reauthenticate(userCred).then(function() {
	  user.updatePassword(newPassword).then(function() {
	    Shiny.onInputChange("firebase_alert", "Password updated!");
	  }, function(error) {
	    var auth_error = JSON.stringify(error);
			Shiny.onInputChange("auth_error", auth_error);
			console.log(error);
	  });

	}, function(error){
	  var auth_error = JSON.stringify(error);
	  Shiny.onInputChange("auth_error", auth_error);
	  console.log(error);
	});
}

function initApp() {
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    var fb_user = user.toJSON();
	    Shiny.onInputChange("firebase_user", fb_user);
	  } else {
	    Shiny.onInputChange("firebase_user", null);
	  }
});
}

window.onLoad = function() {
	initApp();
};
