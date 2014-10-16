/**
 * Configuration for application Modules and Dependencies
 * By: John Turingan
 * @return {}
 */
(function () {

    var modules = {
        chatmodule : {
            name : 'chatmodule'
            , dependencies : ['ngRoute', 'chatmodule.ChatModel', 'SwayChat.DataRepository', 'SwayChat.SocketService']
            , defaultroute : '/chatmodule'
        }
    }

    ns('Config').Modules = modules;

}());

