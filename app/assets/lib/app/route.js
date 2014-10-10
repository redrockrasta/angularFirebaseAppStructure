
(function (route) {

    //DECLARE ROUTES
    //route('path', 'controller@module', 'template')
    route("/chatmodule", "ChatController@chatmodule", "assets/template/views/chatmodule/chatController.html");

})(_Router);
