
(function (route) {

    //DECLARE ROUTES
    //route('path', 'controller@module', 'template')
    route("/chatmodule/:activeChatId?", "ChatController@chatmodule", "/assets/template/views/chatmodule/chatController.html");

})(_Router);
