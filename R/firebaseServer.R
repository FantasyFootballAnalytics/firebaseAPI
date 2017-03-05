#' @export
firebaseServer <- function(input, output){
  observers <- system.file("Rscripts", "observers.R", package = "firebaseAPI")
  source(observers, local = TRUE)
}
