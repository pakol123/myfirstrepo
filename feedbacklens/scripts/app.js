! function() {
    "use strict";
    angular.module("app", [
        "ngRoute", 
        "ngAnimate", 
        "ngAria",
        "ui.bootstrap",
        "ngTagsInput",
        "textAngular", 
        "angular-loading-bar",
        "duScroll",
        "satellizer",
        "ui.router",
        "ngecharts",
        "app.nav",
        "app.page",
        "app.i18n",
        "app.ui",
        "app.ui.form",
        "app.signin",
        "app.domainInfo",
        "app.users",
        "app.feedbacks",
        "app.plugin",
        ])
}(),

function() {
    "use strict";
    angular.module("app.nav", [])
}(),

function() {
    "use strict";
    angular.module("app.page", [])
}(),

function() {
    "use strict";
    angular.module("app.ui", [])
}(),

function() {
    "use strict";
    angular.module("app.ui.form", [])
}(),

function() {
    "use strict";
    angular.module("app.signin", [])
}(),

function() {
    "use strict";
    angular.module("app.domainInfo", [])
}(),

function() {
    "use strict";
    angular.module("app.users", [])
}(),

function() {
    "use strict";
    angular.module("app.feedbacks", [])
}(),

function() {
    "use strict";
    angular.module("app.plugin", [])
}(),


function() {
    "use strict";

    function a(a, b, c, d, z, y, x, w) {
        var e = new Date,
            f = e.getFullYear();

        b.themeColors = ['label-danger','label-warning', 'label-info', 'label-primary', 'label-success'];
        b.btnColors = ['btn-danger','btn-warning', 'btn-info', 'btn-primary', 'btn-success'];
        a.main = {
            brand: "Feedbacklens",
            name: "Lisa",
            year: f
        }, a.pageTransitionOpts = [{
            name: "Fade up",
            "class": "animate-fade-up"
        }, {
            name: "Scale up",
            "class": "ainmate-scale-up"
        }, {
            name: "Slide in from right",
            "class": "ainmate-slide-in-right"
        }, {
            name: "Flip Y",
            "class": "animate-flip-y"
        }], a.admin = {
            layout: "wide",
            menu: "vertical",
            fixedHeader: !0,
            fixedSidebar: !0,
            pageTransition: a.pageTransitionOpts[0],
            skin: "11"
        }, a.$watch("admin", function(c, d) {
            "horizontal" === c.menu && "vertical" === d.menu && b.$broadcast("nav:reset"), c.fixedHeader === !1 && c.fixedSidebar === !0 && (d.fixedHeader === !1 && d.fixedSidebar === !1 && (a.admin.fixedHeader = !0, a.admin.fixedSidebar = !0), d.fixedHeader === !0 && d.fixedSidebar === !0 && (a.admin.fixedHeader = !1, a.admin.fixedSidebar = !1)), c.fixedSidebar === !0 && (a.admin.fixedHeader = !0), c.fixedHeader === !1 && (a.admin.fixedSidebar = !1)
        }, !0), a.color = {
            primary: "#5B90BF",
            success: "#A3BE8C",
            info: "#7FABD2",
            infoAlt: "#B48EAD",
            warning: "#EBCB8B",
            danger: "#BF616A",
            gray: "#DCDCDC"
        }, b.$on("$routeChangeSuccess", function(a, b, c) {
            d.scrollTo(0, 0)
        })

        var sessionUserObjStr = sessionStorage.getItem('currentUser');
        var sessionAuthenticated = sessionStorage.getItem('authenticated');

        var noOfDomains = sessionStorage.getItem('noOfDomains');
        var sessionUserObj = angular.fromJson(sessionUserObjStr);
        if(sessionUserObj) {
            b.currentUser = sessionUserObj;
            b.authenticated = sessionAuthenticated;
            b.noOfDomains = noOfDomains;
        } else {
            y.path("/");
        }

        b.logout = function() {
          z.logout().then(function() {
            sessionStorage.removeItem('currentUser');
            sessionStorage.removeItem('authenticated');
            b.authenticated = false;
            b.currentUser = null;
            y.path("/");
          });
        }

        // Common method to get all domains by orgId
        b.getAllDomains = function(orgId) {
            return x.get('public/api/domain/getAllDomains/'+orgId);
        }

        // Common method to get all subcategories by domainId
        b.getSubCatsByDomainId = function(domainId) {
            return x.get('public/api/plugin/'+domainId);
        }

        a.lastFeedbacks = [];

        a.getFeedbacks = function() {
            var requestObj = {'domainId' : 9, 'notification': '0'};
            x.get('public/api/feedback/getFeedback',{params:requestObj}).success(function(data) {
                   a.lastFeedbacks=data.feedbacks;
                   //console.log(data);
                }).error(function(error){
            });
        }

        a.getFeedbacks();
        // Display Tost

        b.notify = function(type, msg) {
                switch (type) {
                    case 'info':
                        return w.log(msg);
                    case 'success':
                        return w.logSuccess(msg);
                    case 'warning':
                        return w.logWarning(msg);
                    case 'error':
                        return w.logError(msg);
                }
        };
    }
    angular.module("app").controller("AppCtrl", ["$scope","$rootScope","$route","$document","$auth","$location","$http","logger", a])
}(),
function() {
    "use strict";
    angular.module("app").config(["$routeProvider", "$authProvider", "$httpProvider", "$provide", "$stateProvider", "$urlRouterProvider", function(a,d,e,f,g,h) {
        var b, c;
        var currDate = new Date();
        b = [
                 "dashboard", 
                 "form/elements", 
                 "form/flDomainAdd", 
                 "page/404", 
                 "page/500", 
                 "page/blank", 
                 "page/forgot-password", 
                 "page/invoice", 
                 "page/lock-screen", 
                 "page/profile", 
                 "page/signin", 
                 "page/signup",
                 "page/flUsers",
                 "page/flFeedbacks",
                 "page/flPlugin"
             ], 
        c = function(b) {
            var c, d;
            return d = "/" + b, c = {
                templateUrl: "app/" + b + ".html?" + currDate.getTime()
            }, a.when(d, c), a
        }, b.forEach(function(a) {
            return c(a)
        }), a.when("/", {
            redirectTo: "/page/signin"
        }).when("/dashboard", {
            templateUrl: "app/dashboard/dashboard.html"
        }).when("/404", {
            templateUrl: "app/page/404.html"
        }).otherwise({
            redirectTo: "/404"
        });

        // This service is used to logout from current section if $http service returns any of token validation failure message
        function redirectWhenLoggedOut($q, $injector, $location) {
            return {

              responseError: function(rejection) {
                var $state = $injector.get('$state');
                var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];
                
                angular.forEach(rejectionReasons, function(value, key) {
                  if(rejection.data.error === value) {
                      localStorage.removeItem('user');
                      $location.path('/');
                  }
                });

                return $q.reject(rejection);
              }
            }
      }

      f.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);

      // Setting $http intercept - redirectWhenLoggedOut
      e.interceptors.push('redirectWhenLoggedOut');

      d.loginUrl = 'myfirstrepo/feedbacklens/public/api/login';

    }])
}(),

function() {

    function a(a, b) {

      a.$on('$stateChangeStart', function(event, toState) {

        var user = JSON.parse(sessionStorage.getItem('user'));            

            /*if(user) {
                  a.authenticated = true;
                  a.currentUser = user;

                  if(toState.name === "auth") {
                    event.preventDefault();
                    b.path('/');
                  }
            }*/ 
            alert(sessionStorage.getItem('user'));

            if(!user) {
                a.authenticated = false;
                a.currentUser = null;
            }
        });
    }
    angular.module('app').run(["$rootScope", "$location", a])
}(),

function() {
    function a(a) {
        a.useStaticFilesLoader({
            prefix: "i18n/",
            suffix: ".json"
        }), a.preferredLanguage("en"), a.useSanitizeValueStrategy(null)
    }

    function b(a, b) {
        a.lang = "English", a.setLang = function(c) {
            switch (c) {
                case "English":
                    b.use("en");
                    break;
                case "Español":
                    b.use("es");
                    break;
                case "中文":
                    b.use("zh");
                    break;
                case "日本語":
                    b.use("ja");
                    break;
                case "Portugal":
                    b.use("pt");
                    break;
                case "Русский язык":
                    b.use("ru")
            }
            return a.lang = c
        }, a.getFlag = function() {
            var b;
            switch (b = a.lang) {
                case "English":
                    return "flags-american";
                case "Español":
                    return "flags-spain";
                case "中文":
                    return "flags-china";
                case "Portugal":
                    return "flags-portugal";
                case "日本語":
                    return "flags-japan";
                case "Русский язык":
                    return "flags-russia"
            }
        }
    }
    angular.module("app.i18n", ["pascalprecht.translate"]).config(["$translateProvider", a]).controller("LangCtrl", ["$scope", "$translate", b])
}(),
function() {
    "use strict";

    function a(a,z) {
        function b() {
            var a = Math.round(100 * Math.random());
            return a * (a % 2 == 0 ? 1 : -1)
        }
        a.currDate = new Date();
        function c() {
            for (var a = [], c = 100; c--;) a.push([b(), b(), Math.abs(b())]);
            return a
        }

        a.chartColors = [a.color.success, a.color.primary, a.color.danger, a.color.warning, a.color.info];
        a.categoryWiseCount = {};
        a.pieChartDataArray = [];
        a.getCategoryWiseCount = function() {
            z.get('public/api/report/category/'+9).success(function(data) {
                   a.categoryWiseCount=data.CategoryCount;
                   
                   //console.log(data);
                   angular.forEach(a.categoryWiseCount, function(cat, key) {
                        var columnColor = a.chartColors[key % 5];
                        var pieChartData = {};
                        if(cat.cat_count > 0) {
                            pieChartData = {
                                value: cat.cat_count,
                                type:'pie',
                                name: cat.CAT_ID,
                                itemStyle: {
                                    normal: {
                                        color: columnColor,
                                        label: {
                                            show: !0,
                                            textStyle: {
                                                color: columnColor
                                            }
                                        },
                                        labelLine: {
                                            show: !0,
                                            lineStyle: {
                                                color: columnColor
                                            }
                                        }
                                    }
                                }
                            }
                            
                              a.pieChartDataArray.push(pieChartData);
                        }
                    });
                   //alert(JSON.stringify(a.pieChartDataArray));
                   a.setPieChart();
                }).error(function(error){
            });
        }

        a.getCategoryWiseCount();

        a.setPieChart = function() {

            /*Pie*/
            a.pie1 = {}, a.pie1.options = {
                animation: !0,
                title: {
                    text: "Status",
                    x: "left"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                calculable: !0,
                series: [{
                    name: "Feedbacks",
                    type: "pie",
                    radius: "55%",
                    center: ["50%", "60%"],
                    data: a.pieChartDataArray
                }]
            } /*End pie*/

        }
    }
    angular.module("app").controller("DashboardCtrl", ["$scope", "$http", a])
}(),

function() {
    "use strict";

    function a(a) {
        function b(b, c, d) {
            var e;
            e = $("#app"), c.on("click", function(b) {
                return e.hasClass("nav-collapsed-min") ? e.removeClass("nav-collapsed-min") : (e.addClass("nav-collapsed-min"), a.$broadcast("nav:reset")), b.preventDefault()
            })
        }
        var c = {
            restrict: "A",
            link: b
        };
        return c
    }

    function b() {
        function a(a, b, c) {
            var d, e, f, g, h, i, j, k, l, m, n;
            m = 250, j = $(window), g = b.find("ul").parent("li"), g.append('<i class="ti-angle-down icon-has-ul-h"></i><i class="ti-angle-right icon-has-ul"></i>'), d = g.children("a"), h = b.children("li").not(g), e = h.children("a"), f = $("#app"), i = $("#nav-container"), d.on("click", function(a) {
                var b, c;
                return f.hasClass("nav-collapsed-min") || i.hasClass("nav-horizontal") && j.width() >= 768 ? !1 : (c = $(this), b = c.parent("li"), g.not(b).removeClass("open").find("ul").slideUp(m), b.toggleClass("open").find("ul").stop().slideToggle(m), void a.preventDefault())
            }), e.on("click", function(a) {
                g.removeClass("open").find("ul").slideUp(m)
            }), a.$on("nav:reset", function(a) {
                g.removeClass("open").find("ul").slideUp(m)
            }), k = void 0, l = j.width(), n = function() {
                var a;
                a = j.width(), 768 > a && f.removeClass("nav-collapsed-min"), 768 > l && a >= 768 && i.hasClass("nav-horizontal") && g.removeClass("open").find("ul").slideUp(m), l = a
            }, j.resize(function() {
                var a;
                clearTimeout(a), a = setTimeout(n, 300)
            })
        }
        var b = {
            restrict: "A",
            link: a
        };
        return b
    }

    function c() {
        function a(a, b, c, d) {
            var e, f, g;
            f = b.find("a"), g = function() {
                return d.path()
            }, e = function(a, b) {
                return b = "#" + b, angular.forEach(a, function(a) {
                    var c, d, e;
                    return d = angular.element(a), c = d.parent("li"), e = d.attr("href"), c.hasClass("active") && c.removeClass("active"), 0 === b.indexOf(e) ? c.addClass("active") : void 0
                })
            }, e(f, d.path()), a.$watch(g, function(a, b) {
                return a !== b ? e(f, d.path()) : void 0
            })
        }
        var b = {
            restrict: "A",
            controller: ["$scope", "$element", "$attrs", "$location", a]
        };
        return b
    }

    function d() {
        function a(a, b, c) {
            b.on("click", function() {
                return $("#app").toggleClass("on-canvas")
            })
        }
        var b = {
            restrict: "A",
            link: a
        };
        return b
    }
    angular.module("app.nav").directive("toggleNavCollapsedMin", ["$rootScope", a]).directive("collapseNav", b).directive("highlightActive", c).directive("toggleOffCanvas", d)
}(),

function() {
    "use strict";

    function a(a, b) {
        var c, d, e;
        a.printInvoice = function() {
            c = document.getElementById("invoice").innerHTML, d = document.body.innerHTML, e = window.open(), e.document.open(), e.document.write('<html><head><link rel="stylesheet" type="text/css" href="styles/main.css" /></head><body onload="window.print()">' + c + "</html>"), e.document.close()
        }
    }

    function b(a, b, c) {
        a.login = function() {
            c.url("/")
        }, a.signup = function() {
            c.url("/")
        }, a.reset = function() {
            c.url("/")
        }, a.unlock = function() {
            c.url("/")
        }
    }
    angular.module("app.page").controller("invoiceCtrl", ["$scope", "$window", a]).controller("authCtrl", ["$scope", "$window", "$location", b])
}(),

function() {
    "use strict";

    function a() {
        function a(a, b, c) {
            var d, e;
            e = function() {
                return c.path()
            }, d = function(a) {
                switch (b.removeClass("body-wide body-err body-lock body-auth"), a) {
                    case "/404":
                    case "/page/404":
                    case "/page/500":
                        return b.addClass("body-wide body-err");
                    case "/page/signin":
                    case "/page/signup":
                    case "/page/forgot-password":
                        return b.addClass("body-wide body-auth");
                    case "/page/lock-screen":
                        return b.addClass("body-wide body-lock")
                }
            }, d(c.path()), a.$watch(e, function(a, b) {
                return a !== b ? d(c.path()) : void 0
            })
        }
        var b = {
            restrict: "A",
            controller: ["$scope", "$element", "$location", a]
        };
        return b
    }
    angular.module("app.page").directive("customPage", a)
}(),

function() {
    "use strict";

    function a(a, b) {
        a.start = function() {
            b.start()
        }, a.inc = function() {
            b.inc()
        }, a.set = function() {
            b.set(.3)
        }, a.complete = function() {
            b.complete()
        }
    }

    function b(a, b) {
        a.notify = function(a) {
            switch (a) {
                case "info":
                    return b.log("Heads up! This alert needs your attention, but it's not super important.");
                case "success":
                    return b.logSuccess("Well done! You successfully read this important alert message.");
                case "warning":
                    return b.logWarning("Warning! Best check yo self, you're not looking too good.");
                case "error":
                    return b.logError("Oh snap! Change a few things up and try submitting again.")
            }
        }
    }

    function c(a) {
        a.alerts = [{
            type: "success",
            msg: "Well done! You successfully read this important alert message."
        }, {
            type: "info",
            msg: "Heads up! This alert needs your attention, but it is not super important."
        }, {
            type: "warning",
            msg: "Warning! Best check yo self, you're not looking too good."
        }, {
            type: "danger",
            msg: "Oh snap! Change a few things up and try submitting again."
        }], a.addAlert = function() {
            var b, c;
            switch (b = Math.ceil(4 * Math.random()), c = void 0, b) {
                case 0:
                    c = "info";
                    break;
                case 1:
                    c = "success";
                    break;
                case 2:
                    c = "info";
                    break;
                case 3:
                    c = "warning";
                    break;
                case 4:
                    c = "danger"
            }
            return a.alerts.push({
                type: c,
                msg: "Another alert!"
            })
        }, a.closeAlert = function(b) {
            return a.alerts.splice(b, 1)
        }
    }

    function d(a) {
        a.max = 200, a.random = function() {
            var b, c;
            c = Math.floor(100 * Math.random() + 10), b = void 0, b = 25 > c ? "success" : 50 > c ? "info" : 75 > c ? "warning" : "danger", a.showWarning = "danger" === b || "warning" === b, a.dynamic = c, a.type = b
        }, a.random()
    }

    function e(a) {
        a.oneAtATime = !0, a.groups = [{
            title: "Dynamic Group Header - 1",
            content: "Dynamic Group Body - 1"
        }, {
            title: "Dynamic Group Header - 2",
            content: "Dynamic Group Body - 2"
        }, {
            title: "Dynamic Group Header - 3",
            content: "Dynamic Group Body - 3"
        }], a.items = ["Item 1", "Item 2", "Item 3"], a.status = {
            isFirstOpen: !0,
            isFirstOpen1: !0
        }, a.addItem = function() {
            var b;
            b = a.items.length + 1, a.items.push("Item " + b)
        }
    }

    function f(a) {
        a.isCollapsed = !1
    }

    function g(a, b, c) {
        a.items = ["item1", "item2", "item3"], a.animationsEnabled = !0, a.open = function(d) {
            var e = b.open({
                animation: a.animationsEnabled,
                templateUrl: "myModalContent.html",
                controller: "ModalInstanceCtrl",
                size: d,
                resolve: {
                    items: function() {
                        return a.items
                    }
                }
            });
            e.result.then(function(b) {
                a.selected = b
            }, function() {
                c.info("Modal dismissed at: " + new Date)
            })
        }, a.toggleAnimation = function() {
            a.animationsEnabled = !a.animationsEnabled
        }
    }

    function h(a, b, c) {
        a.items = c, a.selected = {
            item: a.items[0]
        }, a.ok = function() {
            b.close(a.selected.item)
        }, a.cancel = function() {
            b.dismiss("cancel")
        }
    }

    function i(a) {
        a.totalItems = 64, a.currentPage = 4, a.setPage = function(b) {
            a.currentPage = b
        }, a.maxSize = 5, a.bigTotalItems = 175, a.bigCurrentPage = 1
    }

    function j(a) {
        a.tabs = [{
            title: "Dynamic Title 1",
            content: "Dynamic content 1.  Consectetur adipisicing elit. Nihil, quidem, officiis, et ex laudantium sed cupiditate voluptatum libero nobis sit illum voluptates beatae ab. Ad, repellendus non sequi et at."
        }, {
            title: "Disabled",
            content: "Dynamic content 2.  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, quidem, officiis, et ex laudantium sed cupiditate voluptatum libero nobis sit illum voluptates beatae ab. Ad, repellendus non sequi et at.",
            disabled: !0
        }], a.navType = "pills"
    }

    function k(a, b, c) {
        var d, e;
        for (e = [], d = 0; 8 > d;) e[d] = new google.maps.Marker({
            title: "Marker: " + d
        }), d++;
        a.GenerateMapMarkers = function() {
            var b, c, f, g, h;
            for (b = new Date, a.date = b.toLocaleString(), h = Math.floor(4 * Math.random()) + 4, d = 0; h > d;) c = 43.66 + Math.random() / 100, f = -79.4103 + Math.random() / 100, g = new google.maps.LatLng(c, f), e[d].setPosition(g), e[d].setMap(a.map), d++
        }, c(a.GenerateMapMarkers, 2e3)
    }
    angular.module("app.ui").controller("LoaderCtrl", ["$scope", "cfpLoadingBar", a]).controller("NotifyCtrl", ["$scope", "logger", b]).controller("AlertDemoCtrl", ["$scope", c]).controller("ProgressDemoCtrl", ["$scope", d]).controller("AccordionDemoCtrl", ["$scope", e]).controller("CollapseDemoCtrl", ["$scope", f]).controller("ModalDemoCtrl", ["$scope", "$uibModal", "$log", g]).controller("ModalInstanceCtrl", ["$scope", "$uibModalInstance", "items", h]).controller("PaginationDemoCtrl", ["$scope", i]).controller("TabsDemoCtrl", ["$scope", j]).controller("MapDemoCtrl", ["$scope", "$http", "$interval", k])
}(),
function() {
    "use strict";

    function a() {
        function a(a, b) {
            var c, d;
            d = function() {
                var a, e, f, g, h, i;
                return i = new Date, a = i.getHours(), e = i.getMinutes(), f = i.getSeconds(), e = c(e), f = c(f), h = a + ":" + e + ":" + f, b.html(h), g = setTimeout(d, 500)
            }, c = function(a) {
                return 10 > a && (a = "0" + a), a
            }, d()
        }
        var b = {
            restrict: "A",
            link: a
        };
        return b
    }

    function b() {
        return {
            restrict: "A",
            compile: function(a, b) {
                return a.on("click", function(a) {
                    return a.stopPropagation()
                })
            }
        }
    }

    function c() {
        return {
            restrict: "A",
            link: function(a, b, c) {
                return b.slimScroll({
                    height: c.scrollHeight || "100%"
                })
            }
        }
    }

    function d() {
        return {
            restrict: "A",
            link: function(a, b, c) {
                return Holder.run({
                    images: b[0]
                })
            }
        }
    }
    angular.module("app.ui").directive("uiTime", a).directive("uiNotCloseOnClick", b).directive("slimScroll", c).directive("imgHolder", d)
}(),
function() {
    "use strict";

    function a() {
        var a;
        return toastr.options = {
            closeButton: !0,
            positionClass: "toast-bottom-right",
            timeOut: "3000"
        }, a = function(a, b) {
            return toastr[b](a)
        }, {
            log: function(b) {
                a(b, "info")
            },
            logWarning: function(b) {
                a(b, "warning")
            },
            logSuccess: function(b) {
                a(b, "success")
            },
            logError: function(b) {
                a(b, "error")
            }
        }
    }
    angular.module("app.ui").factory("logger", a)
}(),

function() {
    "use strict";

    function a() {
        return {
            restrict: "A",
            link: function(a, b) {
                b.slider()
            }
        }
    }

    function b() {
        return {
            restrict: "A",
            link: function(a, b) {
                b.bootstrapFileInput()
            }
        }
    }

   
    angular.module("app.ui.form").directive("uiRangeSlider", a).directive("uiFileUpload", b)
}(),
// Additional JS
// new controller for login
function() {
    "use strict";
    function a(a,b,c,d,e) {
            
            var original;
            a.user = {
                email: "",
                password: ""
            };

            original = angular.copy(a.user);

            a.canSubmit = function() {
                return a.signinForm.$valid && !angular.equals(a.user, original);
            };

            a.submitLoginForm = function() {
                var credentials = {
                        email: a.user.email,
                        password: a.user.password
                    };

                    // Use Satellizer's $auth service to login
                    b.login(credentials)
                    .then(function() {
                        // If login is successful, redirect to the users state
                        //c.path('/dashboard');
                        return e.get('public/api/getuserdata');
                        
                    }, function(error) {

                        a.loginError = true;
                        a.loginErrorText = error.data.error;

                      // Because we returned the $http.get request in the $auth.login
                      // promise, we can chain the next promise to the end here
                    }).then(function(response) {
                       
                        sessionStorage.setItem('currentUser', JSON.stringify(response.data.user));
                        sessionStorage.authenticated = true;
                        sessionStorage.setItem('noOfDomains', response.data.no_of_domains);

                        //console.log(JSON.stringify(response.data.no_of_domains));
                        d.currentUser = response.data.user;
                        d.noOfDomains = response.data.no_of_domains;
                        d.authenticated = true;
                        if(response.data.no_of_domains > 0)
                            c.path('/dashboard');
                        else
                            c.path('/form/flDomainAdd');
                  });;
            }

        }

        angular.module("app.signin").controller("loginCntrl", ["$scope","$auth","$location","$rootScope", "$http", a])
}(),
// end login controller

// Domain Controller

function() {
    "use strict";
    function a(a,b,c,d) {
            
            var original;
            a.domain = {
                 domainName: "",
                 domainSector: "",
            };

            original = angular.copy(a.domain);

            a.domain.orgId= b.currentUser.ORG_ID;
            a.domain.createdBy= b.currentUser.USER_ID;

            b.getAllDomains(b.currentUser.ORG_ID).success(function(data){
                a.domains = data.domains;
                if(a.domains.length > 0)
                    a.isAddDomainFormCollapsed = true;
                else
                    a.isAddDomainFormCollapsed = false;
            });

            a.canSubmit = function() {
                return a.addDomainForm.$valid && !angular.equals(a.domain, original);
            };

            a.submitDomainInfoForm = function() {               
                c.post('public/api/domain/create', a.domain).success(
                    function(data){
                        b.notify('success', "Successfully Added domain");
                        a.domains = b.getAllDomains(b.currentUser.ORG_ID);
                    }).error(function(error){
                         
                        b.notify('error', "Failed to add domain");
                    });
            }
        }

        angular.module("app.domainInfo").controller("domainInfoController", ["$scope", "$rootScope", "$http", "logger", a])
}(),

// End domain controller

function() {
    "use strict";
    function a(a,b,c,d,e) {
            
            a.original;
            a.user = {
                 fname: "",
                 lname: "",
                 email: "",
                 phone: "",
                 address: ""
            };

            a.users = [];
            a.original = angular.copy(a.user);

            a.user.orgId = b.currentUser.ORG_ID;
            a.user.createdBy = b.currentUser.USER_ID;
            
            a.roles = [];

            a.profileBackTheme = ['bg-danger', 'bg-success', 'bg-info', 'bg-warning'];

            a.isAddUserFormCollapsed = true;

            // create service of get roles
            c.get('public/api/fetchRole').success(
                function(data){
                    a.roles = data;
                    a.user.role = (a.roles[0].ROLE_ID).toString();
                }).error(function(error){
                        
                });


                // change following URL parameter passing method
            a.getAllUsers = function() {
                
                c.get('public/api/allUsers?ORG_ID='+b.currentUser.ORG_ID).success(
                function(data){
                    a.users = data.users;
                }).error(function(error){
                        
                });
            }

            a.getAllUsers();

            a.canSubmit = function() {
                return a.addUserForm.$valid && !angular.equals(a.user, a.original);
            };

            a.submitUserInfoForm = function() {
                c.post('public/api/adduser', a.user).success(
                    function(data){
                        b.notify('success', "Successfully added user");
                        a.user = a.original;
                        a.user.role = (a.roles[0].ROLE_ID).toString();
                        a.getAllUsers();
                    }).error(function(error){
                        b.notify('error', "Failed to add user");
                    });
            }
        }

        angular.module("app.users").controller("userController", ["$scope", "$rootScope", "$http", "logger", "$compile", a])
}(),

// Plugin controller

function() {
    "use strict";

    function a(a,b,c,d,e,f,h) {
        var original;
        a.domains = [];
        a.plugin = {};
        a.isAddCatFormCollapsed = true;
        a.categories = [];
        a.subCategories = [];
        a.subCatUpdate = {};

        b.getAllDomains(b.currentUser.ORG_ID).success(function(data){
            a.domains = data.domains;
            a.domainId = data.domains.length != 1 ? '' : data.domains[0].DOMAIN_ID;
        }).error(function(error){

        });

        a.getSubCategories = function(domainId) {
            b.getSubCatsByDomainId(domainId).success(function(data){

                a.subCategories = data.subcat;
                console.log(a.subCategories);
                a.categories = data.cat;
                a.plugin.pluginId = data.properties.PLUGIN_ID;
                a.plugin.ALIGNMENT = data.properties.ALIGNMENT;
                a.plugin.PLUGIN_COLOR = data.properties.PLUGIN_COLOR;
                a.plugin.ISACTIVE = data.properties.ISACTIVE;
                a.isActive = a.showFullPreview = a.plugin.ISACTIVE == 1 ? true : false;
                original = angular.copy(a.plugin);

                a.loadPlugin();
            });
        }

       /* var htmlcontent = $('#prePluginSection');
        htmlcontent.load('plugin/preview/pluginTemplate.html')
        e(htmlcontent.contents())(a);*/

         a.canSubmitPlProperties = function() {
            return a.updatePlPrpertiesDomainForm.$valid && !angular.equals(a.plugin, original);
        };


        a.onSelectDomain = function () {
            if(a.domainId != '') {
                a.getSubCategories(a.domainId);
            }
        }

        a.submitPlPropertyForm = function() {
            //a.plugin.createdBy = b.currentUser.USER_ID;
            
            var changeReq = {'isactive':a.plugin.ISACTIVE, 'alignment':a.plugin.ALIGNMENT, 'plugin_color':a.plugin.PLUGIN_COLOR, 'domainId': a.domainId, 'modified_by' : b.currentUser.USER_ID};
            c.post('public/api/domain/pluginupdate', changeReq).success(function(data) {
                b.notify('success', "Successfully updated plugin");
                a.getSubCategories(a.domainId);
            }).error(function(error){
                b.notify('error', "Failed to update plugin");
            });
        }
        
        a.subCat = {};

        a.canSubmitPlAddCategory = function() {
            return a.addCategoryForm.$valid;
        };

        a.submitPlCategoryForm = function() {
            a.subCat.createdBy = b.currentUser.USER_ID;
            a.subCat.domainId = a.domainId;
            
            c.post('public/api/domain/addsubcat', a.subCat).success(function(data) {
                b.notify('success', "Successfully updated plugin");
                a.subCat.subcatName = '';
                a.getSubCategories(a.domainId);
            }).error(function(error){
                b.notify('error', "Failed to update plugin");
            });
        }

        a.loadPlugin = function() {
            $("#idFlPluginModal").remove();
            if(a.domainName != '')
                getPluginProperties($("#domainNamesList option:selected").html());
        }

        a.openPluginPreview = function() {
            flResetInputs();
            $('#idFlPluginModal').show();
        }

        a.changeSubCatStatus = function(subCatId, isActive) {
            //a.subCatUpdate.modifiedBy = b.currentUser.USER_ID;
            a.subCatUpdate.doaminId = a.domainId;
            a.subCatUpdate.subcatId = subCatId;
            a.subCatUpdate.isactive = isActive ? 1 : 0;
            a.subCatUpdate.pluginId = a.plugin.pluginId;
                //alert(JSON.stringify(a.subCatUpdate));
            c.post('public/api/plugin/updateSubCat',a.subCatUpdate).success(function(data) {
                b.notify('success', "Successfully " + (isActive ? "enabled":"disabled") + " sub category");
                a.getSubCategories(a.domainId);
            }).error(function(error){
                b.notify('error', "Failed to " + (isActive ? "enable":"disable") + " sub category");
            });
        }

        a.showSubCatToggleConfirm = function(subCatId, isActive) {
            //alert($('#idSubCatToggle' + isActive).prop('checked'));

            var toggleSubCatElement = $('#idSubCatToggle' + isActive);
            var toggleSubCat = toggleSubCatElement.prop('checked');
            var e = h.open({
                animation: true,
                template: '<div class="modal-body">'+(toggleSubCat ? "Enable":"Disable")+' this category for your plugin?</div><div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button><button class="btn btn-warning" ng-click="cancel()">Cancel</button></div>',
                controller: "ModalInstanceCtrl",
                size: 'sm'
            });
            e.result.then(function() {
                a.changeSubCatStatus(subCatId, toggleSubCat);
            }, function() {
                toggleSubCatElement.prop('checked', !toggleSubCat);
            });
        }

    } // End of plugin controller function

     function b(a, b) {
        a.ok = function() {
            b.close()
        }, a.cancel = function() {
            b.dismiss("cancel")
        }
    }

    angular.module('app.plugin').controller("pluginController", ["$scope", "$rootScope", "$http", "logger", "$compile", "$templateCache", "$uibModal", a]).controller("ModalInstanceCtrl", ["$scope", "$uibModalInstance", b])
}(),

// End plugin controller

function() {
    "use strict";
    function a(a,b,e,d) {

        a.feedbacks = [];
        a.domains = [];
        a.subCategories = [];
        a.plugin = {};
        a.categories = [];
        a.domain = {};

        a.domainId = '', a.catId = '', a.subCatId = '', a.startDate = '', a.endDate = '', a.rating = '';
        
        /*Date Picker properties*/
        a.format = "dd-MMMM-yyyy";
        a.popup1 = {opened: !1}, a.popup2 = {opened: !1};
        a.openStartDateCal = function() {a.popup1.opened = !0};
        a.openEndDateCal = function() {a.popup2.opened = !0};
        a.dateOptions = {
            formatYear: "yy",
            startingDay: 1
        };
        a.toDay = new Date();
        

        /* Service calls*/
        b.getAllDomains(b.currentUser.ORG_ID).success(function(data){
            a.domains = data.domains;
            a.domainId = data.domains.length != 1 ? '' : data.domains[0].DOMAIN_ID;
        }).error(function(error){

        });

        
        a.getSubCategories = function() {
            b.getSubCatsByDomainId(a.domainId).success(function(data){
                a.subCategories = data.subcat;
                a.categories = data.cat;
                a.plugin = data.properties;
            });
        }

        a.onSelectDomain = function () {
            if(a.domainId != '') {
                angular.forEach(a.domains, function(domain) {
                  if(domain.DOMAIN_ID == a.domainId)
                    a.domain = domain;
                });
                
                a.minFromStartDate = a.domain ? new Date(a.domain.START_DATE): a.toDay;
                a.maxDate = a.endDate = a.toDay;
                a.startDate = a.minFromStartDate;
                a.getSubCategories();
                a.getFeedbacks();

                a.catId = '';
                a.subCatId = '';
                a.rating = '';
            }
            
        }

        a.getFeedbacks = function() {
            var requestObj = {'domainId' : a.domainId, 'notification': '0'};
            
            
            e.get('public/api/feedback/getFeedback',{params:requestObj}).success(function(data) {
                   a.feedbacks=data.feedbacks;
                   //console.log(data);
                }).error(function(error){
                    
            });
        }

        a.applyFilterTogetFeedbacks = function() {
            var reqObj = {rating: a.rating, cat_id: a.catId, subcat_id: a.subCatId, fromDate: a.startDate, toDate: a.endDate};
            e.get('public/api/feedback/filter/' + a.domainId, {params:reqObj}).success(function(data) {
                console.log(data);
                   a.feedbacks=data.filteredFeedbacks;
                }).error(function(error){
                    
            });
        }

    }

    angular.module('app.feedbacks').controller("feedbackController", ["$scope", "$rootScope", "$http", "logger",a])
}();



