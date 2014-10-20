describe('SocketService', function () {
    var socketService, q, firebase, angularFire, dataRepo ;

    beforeEach(function () {
        angular.mock.module('SwayChat.SocketService');
        angular.mock.module('SwayChat.DataRepository');
        angular.mock.module('VendorService');
        angular.mock.module('ng');
        angular.mock.module('firebase');

        inject(function ($injector){
            q = $injector.get('$q');
            socketService = $injector.get('SocketService');
            firebase = $injector.get('FirebaseDep');
            angularFire = q = $injector.get('$firebase');
            dataRepo = $injector.get('DataRepository');
        });
    });

    it("should initialize service", function () {
        expect(socketService._name).toBe("SocketService");
        expect(dataRepo).not.toBe(null);
        expect(q).not.toBe(null);
        expect(angularFire).not.toBe(null);
    });

    it('Should initialize firebase References', function () {
        expect(socketService._clientRef).not.toBe(null);
        expect(socketService._operatorRef).not.toBe(null);
        expect(socketService._sessionRef).not.toBe(null);
    });




    describe('Connect Callback', function () {
        it('Should receive "INVALID_TOKEN" code error on firebase error', function () {

            spyOn(socketService._fbRef, 'authWithCustomToken').and.callFake(function(e, cb) {
                cb({code: "INVALID_TOKEN"}, true);
            });

            var e = {};
            var cb = function (err, success) {
                e = err;
            }

            socketService.connect('token', cb);
            expect(e.code).toBe("INVALID_TOKEN");
        });

        it('Should receive undefined error object on successful firebase authentication', function() {
            spyOn(socketService._fbRef, 'authWithCustomToken').and.callFake(function(e, cb) {
                cb(undefined, true);
            });

            var e = {};
            var cb = function (err, success) {
                e = err;
            }

            socketService.connect('token', cb);
            expect(e).toBe(undefined);
        });
    });




});
