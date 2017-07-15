<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <style>
        @import url('https://fonts.googleapis.com/css?family=Montserrat|Tahoma');
        </style>
    </head>
    
    <body style="background-color: #b3ccff;font-family: Montserrat,Tahoma,arial, helvetica, sans-serif;">
        <img src="GitHub.png" >
        <div style="margin:5px;background-color:white">
            <div style="padding:40px">
            <h3>Hi {{$org->ORG_NAME }},</h3>
            <p>Your 30-day free trial starts today. Here is some important information about your new account. 
                Please save this email for later use.</p><br/>
            <p><b>Login Details</b></p>
            <p>Email: {{$user->EMAIL}}</p><p>Password: You can reset <a href='#'>here</a> </p>
            <p>Over the next 30 days we will be sending you a few emails to 
                highlight features and give you a few tips and tricks to get the most of your trial with feedbacklens.
            </p>
            <br/>
            <p>
                Your experience is very important to us, if you have any feedback, suggestion or question, click here.
            </p>           
            <p>
                <b>Pratik K,</b><br/>
                Customer Support Team,<br/>
                support@feedbacklens.com
            </p>
          
            </div>

        </div>
    </body>
</html>
