/**
 * Configuration for application Modules and Dependencies
 * By: John Turingan
 * @return {}
 */
(function () {

    var modules = {
        chatmodule : {
            name : 'chatmodule'
            , dependencies : ['ngRoute', 'SwayChat.SocketService','SwayChat.ChatModel']
            , defaultroute : '/chatmodule'
        }
    }

    inamespace('Config').Modules = modules;

}());

