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
        "app.nav",
        "app.page",
        "app.i18n",
        "app.ui",
        "app.signin",
        "app.domainInfo",
        "app.users"
        ])
}(),
function() {
    "use strict";
    angular.module("app.signin", [])
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
    angular.module("app.domainInfo", [])
}(),

function() {
    "use strict";
    angular.module("app.users", [])
}(),

function() {
    "use strict";

    function a(a, b, c, d) {
        var e = new Date,
            f = e.getFullYear();
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
    }
    angular.module("app").controller("AppCtrl", ["$scope", "$rootScope", "$route", "$document", a])
}(),
function() {
    "use strict";
    angular.module("app").config(["$routeProvider", "$authProvider", function(a,d) {
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
                 "page/flUsers"
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

        d.loginUrl = 'feedbacklens/public/api/login';

    }])
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

    function a(a) {
        function b() {
            var a = Math.round(100 * Math.random());
            return a * (a % 2 == 0 ? 1 : -1)
        }
        a.currDate = new Date();
        function c() {
            for (var a = [], c = 100; c--;) a.push([b(), b(), Math.abs(b())]);
            return a
        }
        a.pie1 = {}, a.pie1.options = {
            animation: !0,
            title: {
                text: "Traffic Source",
                x: "left"
            },
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            calculable: !0,
            series: [{
                name: "Vist source",
                type: "pie",
                radius: "55%",
                center: ["50%", "60%"],
                data: [{
                    value: 335,
                    name: "Direct",
                    itemStyle: {
                        normal: {
                            color: a.color.success,
                            label: {
                                show: !0,
                                textStyle: {
                                    color: a.color.success
                                }
                            },
                            labelLine: {
                                show: !0,
                                lineStyle: {
                                    color: a.color.success
                                }
                            }
                        }
                    }
                }, {
                    value: 310,
                    name: "Email",
                    itemStyle: {
                        normal: {
                            color: a.color.infoAlt,
                            label: {
                                show: !0,
                                textStyle: {
                                    color: a.color.infoAlt
                                }
                            },
                            labelLine: {
                                show: !0,
                                lineStyle: {
                                    color: a.color.infoAlt
                                }
                            }
                        }
                    }
                }, {
                    value: 135,
                    name: "Video Ads",
                    itemStyle: {
                        normal: {
                            color: a.color.warning,
                            label: {
                                show: !0,
                                textStyle: {
                                    color: a.color.warning
                                }
                            },
                            labelLine: {
                                show: !0,
                                lineStyle: {
                                    color: a.color.warning
                                }
                            }
                        }
                    }
                }, {
                    value: 1548,
                    name: "Search",
                    itemStyle: {
                        normal: {
                            color: a.color.info,
                            label: {
                                show: !0,
                                textStyle: {
                                    color: a.color.info
                                }
                            },
                            labelLine: {
                                show: !0,
                                lineStyle: {
                                    color: a.color.info
                                }
                            }
                        }
                    }
                }]
            }]
        }, a.scatter2 = {}, a.scatter2.options = {
            tooltip: {
                trigger: "axis",
                showDelay: 0,
                axisPointer: {
                    show: !0,
                    type: "cross",
                    lineStyle: {
                        type: "dashed",
                        width: 1
                    }
                }
            },
            legend: {
                data: ["scatter1", "scatter2"]
            },
            xAxis: [{
                type: "value",
                splitNumber: 4,
                scale: !0
            }],
            yAxis: [{
                type: "value",
                splitNumber: 4,
                scale: !0
            }],
            series: [{
                name: "scatter1",
                type: "scatter",
                symbolSize: function(a) {
                    return Math.round(a[2] / 5)
                },
                itemStyle: {
                    normal: {
                        color: "rgba(107,188,215,.5)"
                    }
                },
                data: c()
            }, {
                name: "scatter2",
                type: "scatter",
                symbolSize: function(a) {
                    return Math.round(a[2] / 5)
                },
                itemStyle: {
                    normal: {
                        color: "rgba(129,202,128,.5)"
                    }
                },
                data: c()
            }]
        }
    }
    angular.module("app").controller("DashboardCtrl", ["$scope", a])
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
                       
                        // Stringify the returned data to prepare it
                        // to go into local storage
                        var user = JSON.stringify(response.data.user);

                        // Set the stringified user data into local storage
                        localStorage.setItem('user', user);

                        // The user's authenticated state gets flipped to
                        // true so we can now show parts of the UI that rely
                        // on the user being logged in
                        d.authenticated = true;

                        // Putting the user's data on $rootScope allows
                        // us to access it anywhere across the app
                        d.currentUser = response.data.user;

                        // Everything worked out so we can now redirect to
                        // the users state to view the data
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
                 pluginAlignment: "",
                 pluginColor: ""
            };

            original = angular.copy(a.domain);

            a.domain.pluginAlignment = "Center";
            a.domain.pluginColor = "White";
            /*a.domain.orgId= b.currentUser.ORG_ID;
            a.domain.createdBy= b.currentUser.USER_ID;*/
            a.domain.orgId= 28;
            a.domain.createdBy= 14;

            a.canSubmit = function() {
                return a.addDomainForm.$valid && !angular.equals(a.domain, original);
            };

            a.submitDomainInfoForm = function() {
               
                c.post('public/api/domain/create', a.domain).success(
                    function(data){
                        a.notify('success', "Successfully Added domain");
                    }).error(function(error){
                         alert(JSON.stringify(error));
                        a.notify('error', "Failed to add domain");
                    });
            }

            a.notify = function(type, msg) {
                switch (type) {
                    case 'info':
                        return d.log(msg);
                    case 'success':
                        return d.logSuccess(msg);
                    case 'warning':
                        return d.logWarning(msg);
                    case 'error':
                        return d.logError(msg);
                }
            };

        }

        angular.module("app.domainInfo").controller("domainInfoController", ["$scope", "$rootScope", "$http", "logger", a])
}();

// End domain controller

