

observe({
  if(is.null(input$firebase_user)){
    updateUser()
  } else {
    user_fields <- intersect(names(firebase_user$public_fields),
                             names(input$firebase_user))
    fb_user <- input$firebase_user[user_fields]
    do.call("updateUser", as.list(fb_user))
  }
})


observe({
 if(is.null(input$auth_error))
   return()
  error <- jsonlite::fromJSON(input$auth_error)
  error_msg <- error$message
  shiny::showNotification(error_msg, type = "error")
})

observe({
  if(is.null(input$firebase_alert))
    return()
  alert_msg <- input$firebase_alert
  shiny::showNotification(alert_msg, type = "message")
})
