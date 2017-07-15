<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <div style="padding:80px;">
        <div>
            <img src="best_logo_of_2016_1.jpg" style="display:block;margin:auto;height: 200px;width: 350px;">
        </div>
        <div>
            <h3>Welcome,{{$org->ORG_NAME}},</h3>
            <p>
                Thanks for registering with feedbacklens.Youare just one step away from using our application.Click the link given 
                below to activate your account.<br/>
                <br/>
                <a href="localhost/myfirstrepo/feedbacklens/public/activate/user/{{md5($user->USER_ID)}}">localhost/myfirstrepo/feedbacklens/public/activate/user/{{md5($user->USER_ID)}}</a><br/>
                <br/>
                
         Thanks and regards,<br/>
         Feedbacklens support team
         
            </p>
        </div></div>
    </body>
    
</html>