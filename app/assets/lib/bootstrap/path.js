/**
* Simple namespace util
* to wrap classes in namespace.
* @type {*}
* @return Object
*/
(function(_){

    var _ns = 'Codeninja.SwayChat';

    //register namespace to window
    window.Codeninja || (window.Codeninja = {});
    window.Codeninja.SwayChat || (window.Codeninja.SwayChat = {});
    window.ns = function(namespaces){

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

    ns().Route = Route;

    var Router = function (path, controller, template) {
        try {

            var ctrl = controller.split('@');
            if (_.isEmpty(Route[ctrl[1]])) {
                Route[ctrl[1]] = []
            }

            Route[ctrl[1]].push({
                    path : path,
                    templateUrl : template,
                    controller : _ns + '.Controller.' + ctrl[0]
                });

        } catch (err) {
            throw "Route Exception: Unable to find Route";
        }
    }


    window._Router = ns().Router = Router

})(_);
