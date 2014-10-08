/**
 * Base controller for all controllers.
 * Use this as a template for all future controllers
 *
 * Use of Class.js
 *
 * @author tommy[followed by the usual sign]julo.ca
 */
var BaseController = Class.extend({

    $scope:null,


    /**
     * Initialize Notes Controller
     * @param $scope, current controller scope
     */
    init:function(scope){
        this.$scope = scope;
        this.defineListeners();
    },

    /**
     * Initialize listeners needs to be overrided by the subclass.
     * Don't forget to call _super() to activate
     */
    defineListeners:function(){
        this.$scope.$on('$destroy',this.destroy.bind(this));
    },

    /**
     * Triggered when controller is about
     * to be destroyed, clear all remaining values.
     */
    destroy:function(event){
        //OVERRIDE
    }
})


BaseController.$inject = ['$scope'];
