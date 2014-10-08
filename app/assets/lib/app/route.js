
(function () {

    var namespace = 'Codeninja.SwayChat';
    var route = {};

    /* Route for chatModule*/
    route.chatmodule = [
        {
            "path":"/chatmodule",
            "templateUrl":"assets/template/app/views/chatmodule/chatController.html",
            "controller": namespace + ".Controller.ChatController"
        }
    ]

    inamespace('Codeninja.SwayChat').Route = route;

}());
