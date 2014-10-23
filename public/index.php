<!doctype html>
<html lang="en">
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
      <a href="{#" class="logo"></a>
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
            <div class="row collapse">
                <div ng-view></div>
            </div>
        </div>
        <script type="text/javascript" src="jquery.min.js"></script>
        <script type="text/javascript" src="foundation.min.js"></script>
        <script type="text/javascript" src="/assets/js/vendors.js"></script>
        <script type="text/javascript" src="/assets/js/appstarter.js"></script>
        <script type="text/javascript" src="/assets/js/app.chatmodule.js"></script>
</body>
</html>
