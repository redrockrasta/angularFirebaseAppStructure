/**
* Simple namespace util
* to wrap classes in namespace.
* @type {*}
* @return Object
*/
(function(){
  window.inamespace = function(namespaces){

     var names = namespaces.split('.');
     var namespace  = window;
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
})();
