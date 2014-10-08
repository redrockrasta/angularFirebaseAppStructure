describe('SocketProvider', function () {

    var SocketService;

    beforeEach(function () {
        module('firebase');
        module('SwayChat.SocketService');
    });

    beforeEach(inject(function (_SocketService_) {
      SocketService = _SocketService_;
    }));


    it('tests the providers internal function', function () {
        expect(SocketService.test()).toEqual("x");
    });
});
