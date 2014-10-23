 /**
 * Configuration for application Modules and Dependencies
 * By: John Turingan
 * @return {}
 */
(function () {

    var modules = {
        chatmodule : {
            name : 'chatmodule'
            , dependencies : ['ngRoute', 'chatmodule.ChatModel', 'SwayChat.DataRepository', 'SwayChat.SocketService', 'SwayChat.Directives']
            , defaultroute : '/chatmodule/active'
        }
    }

    ns('Config').Modules = modules;

}());

