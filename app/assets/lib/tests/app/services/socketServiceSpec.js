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
            var cb = function (err) {
                e = err;
            }

            socketService.auth('token', cb);
            expect(e.code).toBe("INVALID_TOKEN");
        });

        it('Should receive object on successful firebase authentication', function() {
            spyOn(socketService._fbRef, 'authWithCustomToken').and.callFake(function(e, cb) {
                cb(undefined, {token: "token"});
            });

            spyOn(socketService,'initFirebaseListeners');


            var e = {};
            var cb = function (success) {
                e = success;
            }

            socketService.auth('token', cb);
            expect(e.token).toBe("token");
            expect(socketService.initFirebaseListeners).toHaveBeenCalled();

        });

        it('Should initialize firebase listeners', function () {
            spyOn(socketService._clientRef,'on');
            spyOn(socketService._operatorRef,'on');
            spyOn(socketService._sessionRef,'on');

            socketService.initFirebaseListeners();
            expect(socketService._clientRef.on).toHaveBeenCalled();
            expect(socketService._operatorRef.on).toHaveBeenCalled();
            expect(socketService._sessionRef.on).toHaveBeenCalled();
        });
    });

    describe('On firebase child_added event', function () {
        var snapshot = {
                    name : function (){return "uid"},
                    val : function () {
                        return {
                            id : "clientId"
                        }
                    }
                };

        it('Should invoke _onNewClient method on new _clientRef child_added', function () {

            spyOn(socketService._clientRef,'on').and.callFake(function (s, cb) {
                cb(snapshot)
            });
            spyOn(socketService, '_onNewClient');
            socketService._clientRef.on('onNewClient', socketService._onNewClient, this);
            expect(socketService._onNewClient).toHaveBeenCalledWith(snapshot);
        });

        it('Should invoke dispatchEvent method to publish new Client', function () {
            spyOn(socketService, 'dispatchEvent');
            socketService._onNewClient(snapshot);

            expect(socketService.dispatchEvent).toHaveBeenCalledWith("onNewClient", snapshot);
        });

        it('Should invoke _onNewOperator method on new _operatorRef child_added', function () {

            spyOn(socketService._operatorRef,'on').and.callFake(function (s, cb) {
                cb(snapshot)
            });
            spyOn(socketService, '_onNewOperator');
            socketService._operatorRef.on('onNewClient', socketService._onNewOperator, this);
            expect(socketService._onNewOperator).toHaveBeenCalledWith(snapshot);
        });

        it('Should invoke dispatchEvent method to publish new Client', function () {
            spyOn(socketService, 'dispatchEvent');
            socketService._onNewOperator(snapshot);

            expect(socketService.dispatchEvent).toHaveBeenCalledWith("onNewOperator", snapshot);
        });

        it('Should invoke _onNewSession method on new _sessionRef child_added', function () {

            spyOn(socketService._sessionRef,'on').and.callFake(function (s, cb) {
                cb(snapshot)
            });
            spyOn(socketService, '_onNewSession');
            socketService._sessionRef.on('onNewSession', socketService._onNewSession, this);
            expect(socketService._onNewSession).toHaveBeenCalledWith(snapshot);
        });

        it('Should invoke dispatchEvent method to publish new Client', function () {
            spyOn(socketService, 'dispatchEvent');
            socketService._onNewSession(snapshot);

            expect(socketService.dispatchEvent).toHaveBeenCalledWith("onNewSession", snapshot);
        });
    });


});
