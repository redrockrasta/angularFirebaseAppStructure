describe('Data Repository Service', function () {

    var dataRepositoryService, userData, clientData, messageData, sessionData;


    //SETUP

    beforeEach(function () {
        module('ng');
        module('SwayChat.DataRepository');

        inject(function ($injector){
            dataRepositoryService = $injector.get('$window');
            dataRepositoryService = $injector.get('DataRepository');

        });

        userData = ns('Tests.Mock.DataRepository').userData;
        clientData = ns('Tests.Mock.DataRepository').clientData;
        messageData = ns('Tests.Mock.DataRepository').messageData;
        sessionData = ns('Tests.Mock.DataRepository').sessionData;

    });

    it('Should get or set user data', function () {

        var user = dataRepositoryService.setUser(userData);
        expect(dataRepositoryService.getUser()).toBe(userData);

    });

    it('Should throw an exception on null client data', function () {
        var spy = spyOn(dataRepositoryService, 'addClient').and.callThrough();
        expect(function() { dataRepositoryService.addClient() }).toThrow("Error: Invalid client data");
    });

    it('Should set client data', function () {
        var client = dataRepositoryService.addClient(clientData)
        expect(dataRepositoryService.clientData.length).toBeGreaterThan(0);
    });

    it('Should get all client data', function () {
        dataRepositoryService.addClient(clientData)
        var clients = dataRepositoryService.getClients()
        expect(clients.length).toBeGreaterThan(0);
    });

    it('Should get client by Id', function () {
        dataRepositoryService.addClient(clientData)
        expect(dataRepositoryService.getClientById("1a0dd84e-0269-42d8-bdf4-6d4c4286d137")).toBe(clientData);
    });

    it('Should set session data', function () {
        var sessions = dataRepositoryService.setSession(sessionData);
        expect(dataRepositoryService.sessionData.length).toBeGreaterThan(0);
    });

    it('Should throw an exception on null session data', function () {
        var spy = spyOn(dataRepositoryService, 'setSession').and.callThrough();
        expect(function() { dataRepositoryService.setSession() }).toThrow("Error: Invalid session data");
    });

    it('Should get session by Id', function () {
        var sessions = dataRepositoryService.setSession(sessionData);
        expect(dataRepositoryService.getSessionById("-JYsqUE008C-1Jaz06ja")).toBe(sessionData);
    });

    it('Should get all session data', function(){
        dataRepositoryService.setSession(sessionData);
        var sessions = dataRepositoryService.getSessions();
        expect(sessions.length).toBeGreaterThan(0);
        expect(sessions[0].id).toEqual("-JYsqUE008C-1Jaz06ja");
    });

    it('Should throw an exception on empty message data', function () {
        var spy = spyOn(dataRepositoryService, 'addMessage').and.callThrough();
        expect(function() { dataRepositoryService.addMessage() }).toThrowError();
    });

    it('Should throw an exception on empty message data', function () {
        var spy = spyOn(dataRepositoryService, 'addMessage').and.callThrough();
        expect(function() { dataRepositoryService.addMessage({a : 2}) }).toThrow("Error: Invalid message data");
    });

    it('Should add message', function () {
        var m = {
            id : "-JYsqUE008C-1Jaz06ja"
            , data: {
                id : "-test"
                , created_at: 1413296389980
                , from: "1a0dd84e-0269-42d8-bdf4-6d4c4286d137"
                , message: "hello↵"
                , name: "John Turingan"
                , updated_at: 1413296389980
            }
        };

        dataRepositoryService.addMessage(m);
        dataRepositoryService.addMessage(messageData);
        expect(dataRepositoryService.messageData[0].data.length).toBeGreaterThan(1);
    });

    it('Should not add message if already exist', function () {
        dataRepositoryService.addMessage(messageData);
        dataRepositoryService.addMessage(messageData);
        expect(dataRepositoryService.messageData[0].data.length).toBeGreaterThan(0);
    });

    it('Should get all message data', function(){
        dataRepositoryService.addMessage(messageData);
        var message = dataRepositoryService.getMessages();
        expect(message.length).toBeGreaterThan(0);
        expect(message[0].id).toEqual("-JYsqUE008C-1Jaz06ja");
    });

    it('Should return false if nothing found', function(){
        dataRepositoryService.addMessage(messageData);
        var message = dataRepositoryService.getMessagesBySessionId("-JYsqUE008C-1Jaz06jas");
        expect(message).toBe(false);
    });

    it('Should get all messages by id', function(){
        dataRepositoryService.addMessage(messageData);
        var message = dataRepositoryService.getMessagesBySessionId("-JYsqUE008C-1Jaz06ja");
        expect(message.length).toBeGreaterThan(0);
    });
});
