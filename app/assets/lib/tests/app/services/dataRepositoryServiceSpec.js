describe('Data Repository Service', function () {

    var dataRepositoryService, userData, clientData;


    //SETUP

    beforeEach(function () {
        module('ng');
        module('SwayChat.DataRepository');

        inject(function ($injector){
            dataRepositoryService = $injector.get('$window');
            dataRepositoryService = $injector.get('DataRepository');

        });

        userData = ns('SwayChat.Tests.Mock.DataRepository').userData;
        clientData = ns('SwayChat.Tests.Mock.DataRepository').clientData;
    });

    it('Should get or set user data', function () {

        var user = dataRepositoryService.setUser(userData);
        expect(dataRepositoryService.getUser()).toBe(userData);

    });

    it('Should set client data', function () {
        var client = dataRepositoryService.addClient(clientData)
        expect(dataRepositoryService.getClientById("1a0dd84e-0269-42d8-bdf4-6d4c4286d137")).toBe(clientData);
    });

});
