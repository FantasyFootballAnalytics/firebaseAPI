firebase_cdn <- htmltools::htmlDependency("firebase", "3.7.0",
                                          src=c(href="https://www.gstatic.com/firebasejs/3.7.0"),
                                          script = "firebase.js")

#' @export
useFirebase <- function(){
  shiny::addResourcePath("js", system.file("www/js", package = "firebaseAPI"))
  utils_js <- file.path("js", "firebase.js")
  shiny::singleton(
    shiny::tags$head(
      firebase_cdn,
      shiny::tags$script(src = utils_js)
    )
  )
}
