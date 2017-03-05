#' @import R6 shiny shinyjs jsonlite
#' @export
firebase_app <- R6::R6Class(
  "firebase_app",
  public = list(
    apiKey = NULL,
    authDomain = NULL,
    databaseURL = NULL,
    storageBucket = NULL,
    messagingSenderId = NULL,

    initialize = function(
      apiKey = NULL,
      authDomain = NULL,
      databaseURL = NULL,
      storageBucket = NULL,
      messagingSenderId = NULL){
      self$apiKey <- apiKey
      self$authDomain <- authDomain
      self$databaseURL <- databaseURL
      self$storageBucket <- storageBucket
      self$messagingSenderId <- messagingSenderId
    },

    appInit = function(){
      configList <- list(
        apiKey = self$apiKey,
        authDomain = self$authDomain,
        databaseURL = self$databaseURL,
        storageBucket = self$storageBucket,
        messagingSenderId = self$messagingSenderId
      )
      appConfig <- jsonlite::toJSON(configList, auto_unbox = TRUE)
      shinyjs::runjs(paste0("var config = JSON.parse('", appConfig, "');  firebase.initializeApp(config);"))
    }

  )
)

#' @export
initializeApp <- function(apiKey, authDomain, databaseURL, storageBucket,
                          messagingSenderId){
  app <- firebase_app$new(apiKey, authDomain, databaseURL, storageBucket,
                          messagingSenderId)
  app$appInit()
}
