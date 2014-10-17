describe('SocketService Provider', function () {

    var SocketService;

    //SETUP

    beforeEach(function () {
        module('firebase');
        module('VendorService');
        module('SwayChat.SocketService');

        inject(function ($injector){
            SocketService = $injector.get('SocketService');
        })
    });

    it ('Should be capable of setting token', function () {
        SocketService.setToken("token");
        expect(SocketService._token).toBe("token")
    });

    describe ('Connect Method', function () {

      it ('should throw error on invalid URL', function () {
        var spy = spyOn(SocketService, '_firebase').and.callThrough();
        expect(function() { SocketService.connect("") }).toThrowError();

      });

      it ('should instantiate firebase on valid URL', function () {
        var spy = spyOn(SocketService, '_firebase').and.returnValue(ns('Tests.Mock').Firebase);

        SocketService.connect("https://url.firebaseio.com/");
        expect(spy).toHaveBeenCalledWith("https://url.firebaseio.com/");
      });

      it ('should authenticate connection', function () {
        var spy = spyOn(SocketService, '_firebase').and.returnValue(ns('Tests.Mock').Firebase);
        spyAuth = spyOn(spy(), 'auth').and.returnValue(true);

        SocketService.connect("https://url.firebaseio.com/");
        expect(spyAuth).toHaveBeenCalled();
      });

      it ('should receive response from firebase', function () {
        var callback = jasmine.createSpy();
        var spy = spyOn(SocketService, '_firebase').and.returnValue(ns('Tests.Mock').Firebase);
        spyAuth = spyOn(spy(), 'auth').and.returnValue(true);

        SocketService.connect("https://url.firebaseio.com/");
        expect(spyAuth).toHaveBeenCalled();
      });

    });
});
