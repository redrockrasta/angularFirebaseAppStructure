/**
 * Configuration for application Modules and Dependencies
 * By: John Turingan
 * @return {}
 */
(function () {

    var modules = {
        chatmodule : {
            name : 'chatmodule'
            , dependencies : ['ngRoute', 'SwayChat.SocketService']
            , defaultroute : '/chatmodule'
        }
    }

    inamespace('Codeninja.SwayChat.Config').Modules = modules;

}());

