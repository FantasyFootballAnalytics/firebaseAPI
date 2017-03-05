#' @import R6 shiny shinyjs jsonlite
#' @export
firebase_user <- R6::R6Class(
  "firebase_user",
  public = list(
    displayName = NULL,
    email = NULL,
    emailVerified = NULL,
    isAnonymous = NULL,
    photoURL = NULL,
    providerData = NULL,
    providerId = NULL,
    refreshToken = NULL,
    uid = NULL,

    initialize = function(
      displayName = NULL,
      email = NULL,
      emailVerified = NULL,
      isAnonymous = NULL,
      photoURL = NULL,
      providerData = NULL,
      providerId = NULL,
      refreshToken = NULL,
      uid = NULL){
      self$displayName <- displayName
      self$email <- email
      self$emailVerified <- emailVerified
      self$isAnonymous <- isAnonymous
      self$photoURL <- photoURL
      self$providerData <- providerData
      self$providerId <- providerId
      self$refreshToken <- refreshToken
      invisible(self)
    },

    register = function(email, password){
      shinyjs::runjs(paste0("handleSignUp('", email, "', '", password, "');"))
    },

    signIn = function(password){
      shinyjs::runjs(paste0("toggleSignIn('", self$email, "', '", password, "');"))
    },
    signOut = function(){
      shinyjs::runjs("toggleSignIn(null, null);")
    },
    verifyEmail = function(){
      shinyjs::runjs("sendEmailVerification();")
    },
    resetPassword =  function(){
      shinyjs::runjs(paste0("sendPasswordReset('", self$email, "');"))
    },
    updateEmail = function(newEmail){
      shinyjs::runjs(paste0("updateEmail('", newEmail, "');"))
    },
    updatePassword = function(newPassword, oldPassword){
      shinyjs::runjs(paste0("updatePassword('", newPassword, "', '", oldPassword, "');"))
    }
  )
)

firebaseUser <- firebase_user$new()


updateUser <- function(displayName = NULL, email = NULL, emailVerified = NULL,
                       isAnonymous = NULL, photoURL = NULL, providerData = NULL,
                       providerId = NULL, refreshToken = NULL, uid = NULL){
    firebaseUser$displayName <- displayName
    firebaseUser$email <- email
    firebaseUser$emailVerified <- emailVerified
    firebaseUser$isAnonymous <- isAnonymous
    firebaseUser$photoURL <- photoURL
    firebaseUser$providerData <- providerData
    firebaseUser$providerId <- providerId
    firebaseUser$refreshToken <- refreshToken
    firebase_user$uid <- uid
}

#' @export
registerUser <- function(email, password){
  firebaseUser$register(email, password)
}

#' @export
userLogin <- function(email, password){
  firebaseUser$email <- email
  firebaseUser$signIn(password)
}

#' @export
userLogout <- function(){
  firebaseUser$signOut()
}

#' @export
getUser <- function(){
  return(firebaseUser)
}

#' @export
updatePassword <- function(oldPassword, newPassword){
  firebaseUser$updatePassword(newPassword, oldPassword)
}
