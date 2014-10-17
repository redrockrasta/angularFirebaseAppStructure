
(function(){

    ns('Tests.Mock').DataRepository = {
        userData : {
            "uid" : "1a0dd84e-0269-42d8-bdf4-6d4c4286d1k7"
            , "created_at": 1412928557628
            , "email": "johnpaolo@gmail.com"
            , "ip_address": "192.168.1.1"
            , "name": "Operator Marinas"
            , "updated_at": 1412928557628
            , "user_type": "operator"
        },

        clientData : {
            "uid" : "1a0dd84e-0269-42d8-bdf4-6d4c4286d137"
            , "domain":"http://facebook.com"
            , "email":"johnturingan@gmail.com"
            , "init_message":"hey"
            , "ip_address":"192.168.1.1"
            , "name":"John Turingan"
            , "status":"open"
            , "user_type":"visitor"
        },

        messageData : {
            id : "-JYsqUE008C-1Jaz06ja"
            , data: {
                id : "-JZBx8IZU_g3A3kJyQfd"
                , created_at: 1413296389980
                , from: "1a0dd84e-0269-42d8-bdf4-6d4c4286d137"
                , message: "hello↵"
                , name: "John Turingan"
                , updated_at: 1413296389980
            }

        },

        sessionData : {
            id : "-JYsqUE008C-1Jaz06ja"
            , data : {
                created_at: 1412924306578
                , users: {
                    operator: "1a0dd84e-0269-42d8-bdf4-6d4c4286d1k7"
                    , visitor: "1a0dd84e-0269-42d8-bdf4-6d4c4286d137"
                }
                , created_at: 1412924306578
            }
        }

    }

})();
