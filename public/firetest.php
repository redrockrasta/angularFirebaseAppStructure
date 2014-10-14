<!doctype html>
<html lang="en" ng-app="fireTest">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, minimal-ui" />
    <title>POC</title>
    <link rel="shortcut icon" href="#">

    <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/foundation/5.4.5/css/foundation.min.css">
    <link rel="stylesheet" href="style.css">

</head>
<body class="chat-admin">
  <nav>
    <div class="row">
      <a href="{#" class="logo"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Swaychat"></a>
    </div>
  </nav>
    <div class="container">

        <!--Sidebar-->
        <div class="show-for-large-up">
          <aside class="sidebar">
            <div class="subheader">
              <h6>Site Name<span>www.sitename.com</span></h6>
            </div>
            <ul class="scrollable">
              <li><a href="#">Dashboard</a></li>
              <li class="active"><a href="#">Chat</a></li>
              <li><a href="#">Visitors</a></li>
              <li><a href="#">Transcripts</a></li>
              <li class="divider"></li>
              <li><a href="#">Agents</a></li>
              <li><a href="#">Departments</a></li>
            </ul>
          </aside>
        </div>
        <!--Sidebar End-->

        <!--Main Content-->
        <div class="content">
            <div class="row collapse" ng-controller="ctrl">
                <ul id='example-messages' class='example-chat-messages'>
                  <li ng-repeat='msg in messages'>
                    <strong class='example-chat-username'>{{msg.name}}</strong>
                    {{msg.email}}
                  </li>
                </ul>
            </div>
        </div>
        <script type="text/javascript" src="jquery.min.js"></script>
        <script type="text/javascript" src="foundation.min.js"></script>
        <script type="text/javascript" src="/assets/js/vendors.js"></script>
        <script type="text/javascript">

        var app = angular.module('fireTest',['firebase']);

        app.service('Mservice', function ($firebase){
          window.fbRef = new Firebase('https://swaychat-beta.firebaseio.com');
          window.aFire = $firebase;
          var methods = {}
          methods.connect = function (cb) {

            fbRef.authWithCustomToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0MTU3NjI0MTYsInYiOjAsImlhdCI6MTQxMzE3MDQxNiwiZCI6eyJ1aWQiOiIxYTBkZDg0ZS0wMjY5LTQyZDgtYmRmNC02ZDRjNDI4NmQxazcifX0.EIcw8IUmAKN50FisECYCCHpSndph-1_wzK-Tp4VStIA', cb)

          };

          methods.message = function ($scope) {
            $scope.messages = $firebase(fbRef).$asArray();
          }


          methods.newConnection = function (cb) {
            //fbRef.
          }

          return methods;
        });

        app.controller('ctrl', function ($scope, Mservice){
          $scope.messages = []

          //Mservice.message($scope)

          Mservice.connect(function(err, res) {
            //Mservice.message($scope)
            console.log(res)
          });
        });

        </script>
</body>
</html>
