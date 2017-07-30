<!doctype html>
<!--[if lt IE 8]>         <html class="no-js lt-ie8"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Web Application</title>
        <meta name="description" content="Responsive Admin Web App">
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">

        <link href="http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,400,600,300,700" rel="stylesheet" type="text/css">
        <!-- Needs images, font... therefore can not be part of main.css -->
        <link rel="stylesheet" href="fonts/themify-icons/themify-icons.min.css">
        <link rel="stylesheet" href="bower_components/font-awesome/css/font-awesome.min.css">
        <!-- end Needs images -->

            <!-- <link rel="stylesheet" href="styles/angular/angular-material.min.css"> -->
            <link rel="stylesheet" href="styles/main.css">
            <link rel="stylesheet" href="plugin/flPlugin.css">
            <link rel="stylesheet" href="styles/jqcloud.min.css">
            <link rel="stylesheet" href="styles/spectrum.css">

            <style>
                .custSelect {
                    margin-left: 0px;
                }
            </style>

    </head>
    <body data-ng-app="app" id="app" class="app" data-custom-page data-off-canvas-nav data-ng-controller="AppCtrl" data-ng-class=" {'layout-boxed': admin.layout === 'boxed'} ">
        <!--[if lt IE 9]>
            <div class="lt-ie9-bg">
                <p class="browsehappy">You are using an <strong>outdated</strong> browser.</p>
                <p>Please <a href="http://browsehappy.com/">upgrade your browser</
                a> to improve your experience.</p>
            </div>
        <![endif]-->

        <section data-ng-include=" 'app/layout/header.html?v=3' " id="header" class="header-container" data-ng-class="{ 'header-fixed': admin.fixedHeader,
                                  'bg-white': ['11','12','13','14','15','16','21'].indexOf(admin.skin) >= 0,
                                  'bg-dark': admin.skin === '31',
                                  'bg-primary': ['22','32'].indexOf(admin.skin) >= 0,
                                  'bg-success': ['23','33'].indexOf(admin.skin) >= 0,
                                  'bg-info-alt': ['24','34'].indexOf(admin.skin) >= 0,
                                  'bg-warning': ['25','35'].indexOf(admin.skin) >= 0,
                                  'bg-danger': ['26','36'].indexOf(admin.skin) >= 0
                 }"></section>

        <div class="main-container">
            <aside data-ng-include=" 'app/layout/sidebar.html' " id="nav-container" class="nav-container" data-ng-class="{ 'nav-fixed': admin.fixedSidebar,
                                    'nav-horizontal': admin.menu === 'horizontal',
                                    'nav-vertical': admin.menu === 'vertical',
                                    'bg-white': ['31','32','33','34','35','36'].indexOf(admin.skin) >= 0,
                                    'bg-dark': ['31','32','33','34','35','36'].indexOf(admin.skin) < 0
                   }">
            </aside>

            <div id="content" class="content-container">
                <section data-ng-view class="view-container {{admin.pageTransition.class}}"></section>
            </div>
        </div>


        <script src="scripts/vendor.js"></script>

        <script src="scripts/ui.js"></script>

        <script>document.write("<script src='scripts/app.js?v=" + Date.now() + "'><\/script>");</script>
        
        <script src="scripts/satellizer.js"></script>

        <script src="scripts/angular-ui-router.min.js"></script> 
        <!-- <script src="scripts/angular-material.min.js"></script> -->

        <script src="plugin/preview/flPluginMain.js"></script>
        <script src="scripts/jqcloud.min.js"></script>
        <script src="scripts/angular-jqcloud.js"></script>
        <script src="scripts/spectrum.js"></script>
    </body>
</html>
