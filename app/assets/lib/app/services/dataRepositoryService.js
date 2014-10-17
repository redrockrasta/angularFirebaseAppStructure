'use strict';

/**
 * Service : DataRepository
 * Class : DataRepositoryService
 * Stores and retrieves data globally in memory
 *
 * Method:
 *     setUser(user)
 *     getUser()
 *     addClient(client)
 *     getClients()
 *     getClientById(id)
 *     setSession(session)
 *     getSessions()
 */

(function (_) {

    var DataRepositoryService = function ($window) {
        this.window = $window;
        this.userData = ns('DataRepository').userData;
        this.clientData = ns('DataRepository').clientData;
        this.messageData = ns('DataRepository').messageData;
        this.sessionData = ns('DataRepository').sessionData;
    };

    DataRepositoryService.prototype = {

        /**
         * setUser
         * @param object user user object
         *
         * @return this
         */
        setUser : function (user) {
            this.userData = user;
            return this;
        }

        /**
         * getUser retrieve User data
         * @return {object} user data object
         */
        , getUser : function () {
            return this.userData;
        }

        /**
         * addClient add client data to repo
         * @param {object} this
         */
        , addClient : function (client) {

            if (_.isEmpty(client)) throw "Error: Invalid client data";

            this.clientData = _.isUndefined(this.clientData) ? [] : this.clientData;

            var self = this;
            var _add = function (c) {
                var d = _.findWhere(self.clientData, { uid : c.uid});
                if ( _.isEmpty(d)) {
                    self.clientData.push(c);
                    return;
                }

                d = c;
            }

            if (_.isArray(client)) {

                _.each (client, function (c) {
                    _add(c);
                });

                return this;
            }

            _add(client);
            return this;
        }

        /**
         * getClients retrieve all clients
         * @return {array} array object of client
         */
        , getClients : function () {
            return _.isUndefined(this.clientData) ? [] : this.clientData;
        }

        /**
         * getClientById retrieve client using id as parameter
         * @param  {string} id client id
         * @return {object}    client object
         */
        , getClientById : function (id) {
            var client = _.findWhere(this.clientData, { uid : id});
            return (_.isEmpty(client)) ? false : client;
        }

        /**
         * setSession store session data in repo
         * @param {object} session session data
         */
        , setSession : function (session) {

            if (_.isEmpty(session)) throw "Error: Invalid session data";

            this.sessionData = _.isUndefined(this.sessionData) ? [] : this.sessionData;

            var d = _.findWhere(this.sessionData, { id : session.id});
            if ( _.isEmpty(d)) {
                this.sessionData.push(session);
            }
            return this;
        }

        /**
         * getSessions retrieve all sessions
         * @return [array] array of session object
         */
        , getSessions : function () {
            return _.isUndefined(this.sessionData) ? [] : this.sessionData;
        }

        /**
         * getClientById retrieve client using id as parameter
         * @param  {string} id client id
         * @return {object}    client object
         */
        , getSessionById : function (id) {
            var session = _.findWhere(this.sessionData, { id : id});
            return (_.isEmpty(session)) ? false : session;
        }

        /**
         * addMessage add message to the respected message data
         * @param {object} message message object
         */
        , addMessage : function (message) {

            if (_.isUndefined(message.id) || _.isUndefined(message.data)) throw "Error: Invalid message data";

            var id = message.id;
            var data = message.data;

            this.messageData = _.isUndefined(this.messageData) ? [] : this.messageData;

            var m = _.findWhere(this.messageData, { id : id});

            if (_.isEmpty(m)) {
                var dataArr = [];
                dataArr.push(data);
                this.messageData.push({ id : id, data : dataArr });
                return this;
            }

            var m2 = _.findWhere(m.data, {id : data.id});

            if (!_.isUndefined(m2)) return;

            m.data.push(data);

            return this;
        }

        /**
         * getMessages get all message session in messageData
         * @return [array] array object
         */
        , getMessages : function () {
            return _.isUndefined(this.messageData) ? [] : this.messageData;
        }

        /**
         * getMessagesBySessionId get message by session id
         * @param  string sessionId session Id
         *
         * @return [array]           array of object
         */
        , getMessagesBySessionId : function (sessionId) {
            var m = _.findWhere(this.messageData, { id : sessionId});
            if (_.isUndefined(m)) return false;

            return m.data;
        }

    };

    angular.module('SwayChat.DataRepository',['ng'])
           .service('DataRepository', ['$window', DataRepositoryService]);

})(_);
