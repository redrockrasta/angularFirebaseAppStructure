/**
* Simple namespace util
* to wrap classes in namespace.
* @type {*}
* @return Object
*/
(function(_){

    var ns = 'Codeninja.SwayChat';

    //register namespace to window
    window.Codeninja || (window.Codeninja = {});
    window.Codeninja.SwayChat || (window.Codeninja.SwayChat = {});
    window.inamespace = function(namespaces){

        var names = (_.isEmpty(namespaces)) ? [] : namespaces.split('.');


        var namespace  = window.Codeninja.SwayChat;
        var name  = null;
        var i     = null;

        for(i in names){
         name = names[i];

         if(namespace[name]===undefined){
            namespace[name] = {};
         }

         namespace = namespace[name];
        }

     return namespace;

    }


    var Route = {};

    inamespace().Route = Route;

    var Router = function (path, controller, template) {
        try {

            var ctrl = controller.split('@');
            if (_.isEmpty(Route[ctrl[1]])) {
                Route[ctrl[1]] = []
            }

            Route[ctrl[1]].push({
                    path : path,
                    templateUrl : template,
                    controller : ns + '.Controller.' + ctrl[0]
                });

        } catch (err) {
            throw "Route Exception: Unable to find Route";
        }
    }


    window._Router = inamespace().Router = Router

})(_);
