var Raffle;
(function (Raffle) {
    var RaffleService = (function () {
        function RaffleService($interval, $timeout, $q, $window) {
            this.$interval = $interval;
            this.$timeout = $timeout;
            this.$q = $q;
            this.$window = $window;
            this.$inject = ["$interval", "$timeout", "$q", "$window"];
            this.spinInterval = 100;
            this.storageKeys = {
                maxValue: "maxValue",
                bucket: "bucket",
                discardBucket: "discardBucket"
            };
            this.getPersistedData();
        }
        Object.defineProperty(RaffleService.prototype, "takeTicket", {
            get: function () {
                return this.maxValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RaffleService.prototype, "drawnTicket", {
            get: function () {
                if (this.hasOneTicket) {
                    return this.bucket[0];
                }
                return this.currentIndexWithinRange() ? this.bucket[this.currentIndex] : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RaffleService.prototype, "hasOneTicket", {
            get: function () {
                return this.bucket.length === 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RaffleService.prototype, "hasTickets", {
            get: function () {
                return this.bucket.length > 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RaffleService.prototype, "hasNoTickets", {
            get: function () {
                return this.bucket.length <= 0;
            },
            enumerable: true,
            configurable: true
        });
        RaffleService.prototype.reset = function () {
            this.maxValue = 1;
            this.bucket = [];
            this.discardBucket = [];
            this.currentIndex = -1;
            this.persistData();
        };
        RaffleService.prototype.take = function () {
            this.bucket.push(this.maxValue++);
            this.persistData();
        };
        RaffleService.prototype.spinActive = function () {
            var _this = this;
            this.spinToken = this.$interval(function () {
                _this.incrementCurrentIndex();
            }, this.spinInterval);
        };
        RaffleService.prototype.spinDeactive = function () {
            var _this = this;
            var def = this.$q.defer();
            this.$interval.cancel(this.spinToken);
            this.spinToken = undefined;
            var interval = this.spinInterval;
            var timer = function (running) {
                interval += running++;
                if (interval < 400) {
                    _this.$timeout(function () {
                        _this.incrementCurrentIndex();
                        timer(running);
                    }, interval);
                }
                else {
                    _this.$timeout(function () {
                        def.resolve();
                    }, interval);
                }
            };
            timer(0);
            return def.promise;
        };
        RaffleService.prototype.discard = function () {
            if (this.currentIndexWithinRange()) {
                this.discardBucket.push(this.drawnTicket);
                this.bucket.splice(this.currentIndex, 1);
                this.currentIndex = -1;
                this.persistData();
            }
        };
        RaffleService.prototype.getDiscardedTickets = function () {
            return !this.discardBucket ? [] : angular.copy(this.discardBucket).reverse();
        };
        RaffleService.prototype.printDebug = function () {
            console.info("bucket: ", this.bucket);
            console.info("discard: ", this.discardBucket);
        };
        RaffleService.prototype.incrementCurrentIndex = function () {
            this.currentIndex = Math.floor(Math.random() * this.bucket.length);
        };
        RaffleService.prototype.currentIndexWithinRange = function () {
            return this.currentIndex >= 0 && this.currentIndex < this.bucket.length;
        };
        RaffleService.prototype.getPersistedData = function () {
            var maxValue = this.getStoredValue(this.storageKeys.maxValue);
            this.maxValue = maxValue ? parseInt(maxValue) : 1;
            var bucket = this.getStoredValue(this.storageKeys.bucket);
            this.bucket = bucket ? this.transmogrifyBucket(bucket) : [];
            var discardBucket = this.getStoredValue(this.storageKeys.discardBucket);
            this.discardBucket = discardBucket ? this.transmogrifyBucket(discardBucket) : [];
        };
        RaffleService.prototype.transmogrifyBucket = function (bucket) {
            return bucket.split(",").map(function (n) {
                return parseInt(n);
            });
        };
        RaffleService.prototype.getStoredValue = function (key) {
            return this.$window.localStorage.getItem(key);
        };
        RaffleService.prototype.persistData = function () {
            this.$window.localStorage.setItem(this.storageKeys.maxValue, this.maxValue.toString());
            this.$window.localStorage.setItem(this.storageKeys.bucket, this.bucket.toString());
            this.$window.localStorage.setItem(this.storageKeys.discardBucket, this.discardBucket.toString());
        };
        return RaffleService;
    }());
    Raffle.RaffleService = RaffleService;
})(Raffle || (Raffle = {}));
//# sourceMappingURL=RaffleService.js.map
var Raffle;
(function (Raffle) {
    function NumberDisplay() {
        return {
            templateUrl: "app/components/templates/NumberDisplay.html?v=2",
            controller: NumberDisplayController,
            bindings: {
                value: "@"
            }
        };
    }
    Raffle.NumberDisplay = NumberDisplay;
    var NumberDisplayController = (function () {
        function NumberDisplayController($element, $timeout) {
            this.$element = $element;
            this.$timeout = $timeout;
            this.$inject = ["$element", "$timeout"];
        }
        Object.defineProperty(NumberDisplayController.prototype, "value", {
            get: function () {
                return this.myValue || 0;
            },
            set: function (value) {
                this.changeDisplayValue(value);
            },
            enumerable: true,
            configurable: true
        });
        NumberDisplayController.prototype.changeDisplayValue = function (value) {
            if (this.$timeout) {
                this.changeOpacity(value, 1, true);
            }
        };
        NumberDisplayController.prototype.changeOpacity = function (value, opacity, hide) {
            var _this = this;
            var opacityInterval = 0.1;
            if (opacity < 0) {
                this.myValue = value;
                hide = false;
                opacity = opacityInterval;
            }
            if (opacity > 1.0)
                return;
            this.$element.find(".display-value").attr("style", "opacity: " + opacity);
            var interval = hide ? -opacityInterval : opacityInterval;
            this.$timeout(function () {
                _this.changeOpacity(value, opacity + interval, hide);
            }, 10);
        };
        return NumberDisplayController;
    }());
    Raffle.NumberDisplayController = NumberDisplayController;
})(Raffle || (Raffle = {}));
//# sourceMappingURL=NumberDisplay.js.map
var Raffle;
(function (Raffle) {
    function IssueScreen() {
        return {
            templateUrl: "app/components/templates/IssueScreen.html",
            controller: IssueScreenController
        };
    }
    Raffle.IssueScreen = IssueScreen;
    var IssueScreenController = (function () {
        function IssueScreenController(raffleService) {
            this.raffleService = raffleService;
            this.$inject = ["raffleService"];
        }
        Object.defineProperty(IssueScreenController.prototype, "value", {
            get: function () {
                return this.raffleService.takeTicket;
            },
            enumerable: true,
            configurable: true
        });
        IssueScreenController.prototype.take = function () {
            this.raffleService.take();
        };
        return IssueScreenController;
    }());
    Raffle.IssueScreenController = IssueScreenController;
})(Raffle || (Raffle = {}));
//# sourceMappingURL=IssueScreen.js.map
var Raffle;
(function (Raffle) {
    function DrawScreen() {
        return {
            templateUrl: "app/components/templates/DrawScreen.html?v=1",
            controller: DrawScreenController
        };
    }
    Raffle.DrawScreen = DrawScreen;
    var State;
    (function (State) {
        State[State["Ready"] = 0] = "Ready";
        State[State["Spinning"] = 1] = "Spinning";
        State[State["Discard"] = 2] = "Discard";
    })(State || (State = {}));
    var DrawScreenController = (function () {
        function DrawScreenController($scope, $element, raffleService) {
            var _this = this;
            this.$scope = $scope;
            this.$element = $element;
            this.raffleService = raffleService;
            this.$inject = ["$scope", "$element", "raffleService"];
            this.state = State.Ready;
            this.$element.bind("touchstart", function (e) {
                e.preventDefault();
                e.stopPropagation();
                _this.$scope.$apply(function () {
                    _this.numberMousedown();
                });
            });
            this.$element.bind("touchend", function (e) {
                e.preventDefault();
                e.stopPropagation();
                _this.$scope.$apply(function () {
                    _this.numberMouseup();
                });
            });
        }
        Object.defineProperty(DrawScreenController.prototype, "value", {
            get: function () {
                return this.raffleService.drawnTicket;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawScreenController.prototype, "isSpinning", {
            get: function () {
                return this.state === State.Spinning;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawScreenController.prototype, "isDiscard", {
            get: function () {
                return this.state === State.Discard;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawScreenController.prototype, "isReady", {
            get: function () {
                return this.state === State.Ready;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawScreenController.prototype, "hasTickets", {
            get: function () {
                return this.raffleService.hasTickets;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawScreenController.prototype, "hasOneTicket", {
            get: function () {
                return this.raffleService.hasOneTicket;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawScreenController.prototype, "hasNoTickets", {
            get: function () {
                return this.raffleService.hasNoTickets;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawScreenController.prototype, "isDisplayDisabled", {
            get: function () {
                return this.isSpinning || this.hasOneTicket || this.hasNoTickets;
            },
            enumerable: true,
            configurable: true
        });
        DrawScreenController.prototype.numberMousedown = function () {
            if (this.isReady && this.hasTickets) {
                this.state = State.Spinning;
                this.spinActive();
            }
        };
        DrawScreenController.prototype.numberMouseup = function () {
            if (this.isSpinning) {
                this.spinDeactive();
            }
            else if (this.isDiscard) {
                this.discard();
            }
        };
        DrawScreenController.prototype.spinActive = function () {
            this.raffleService.spinActive();
        };
        DrawScreenController.prototype.spinDeactive = function () {
            var _this = this;
            this.raffleService.spinDeactive().then(function () {
                _this.state = State.Discard;
            });
        };
        DrawScreenController.prototype.discard = function () {
            this.raffleService.discard();
            this.state = State.Ready;
        };
        return DrawScreenController;
    }());
    Raffle.DrawScreenController = DrawScreenController;
})(Raffle || (Raffle = {}));
//# sourceMappingURL=DrawScreen.js.map
var Raffle;
(function (Raffle) {
    function ResetScreen() {
        return {
            templateUrl: "app/components/templates/ResetScreen.html?v=2",
            controller: ResetScreenController
        };
    }
    Raffle.ResetScreen = ResetScreen;
    var ResetScreenController = (function () {
        function ResetScreenController(raffleService) {
            this.raffleService = raffleService;
            this.$inject = ["raffleService"];
        }
        ResetScreenController.prototype.reset = function () {
            this.raffleService.reset();
        };
        return ResetScreenController;
    }());
    Raffle.ResetScreenController = ResetScreenController;
})(Raffle || (Raffle = {}));
//# sourceMappingURL=ResetScreen.js.map
var Raffle;
(function (Raffle) {
    function HistoryScreen() {
        return {
            templateUrl: "app/components/templates/HistoryScreen.html",
            controller: HistoryScreenController
        };
    }
    Raffle.HistoryScreen = HistoryScreen;
    var HistoryScreenController = (function () {
        function HistoryScreenController(raffleService) {
            this.raffleService = raffleService;
            this.$inject = ["raffleService"];
        }
        Object.defineProperty(HistoryScreenController.prototype, "discardedTickets", {
            get: function () {
                return this.raffleService.getDiscardedTickets();
            },
            enumerable: true,
            configurable: true
        });
        return HistoryScreenController;
    }());
    Raffle.HistoryScreenController = HistoryScreenController;
})(Raffle || (Raffle = {}));
//# sourceMappingURL=HistoryScreen.js.map
var Raffle;
(function (Raffle) {
    function MainApp() {
        return {
            templateUrl: "app/components/templates/MainApp.html?v=2",
            controller: MainAppController
        };
    }
    Raffle.MainApp = MainApp;
    var MainAppController = (function () {
        function MainAppController($rootScope, $location) {
            var _this = this;
            this.$rootScope = $rootScope;
            this.$location = $location;
            this.currentTab = "";
            $rootScope.$on("$locationChangeSuccess", function () {
                _this.currentTab = _this.$location.path();
            });
        }
        MainAppController.prototype.pathsMatch = function (tab) {
            return this.currentTab === "/" + (tab || "");
        };
        MainAppController.prototype.getCopyrightYear = function () {
            return new Date().getFullYear().toString();
        };
        MainAppController.$inject = ["$rootScope", "$location"];
        return MainAppController;
    }());
    Raffle.MainAppController = MainAppController;
})(Raffle || (Raffle = {}));
//# sourceMappingURL=MainApp.js.map
var Raffle;
(function (Raffle) {
    var PageModule = angular.module("PageModule", []);
    PageModule.service("raffleService", Raffle.RaffleService);
    PageModule.component("numberDisplay", Raffle.NumberDisplay());
    PageModule.component("issueScreen", Raffle.IssueScreen());
    PageModule.component("drawScreen", Raffle.DrawScreen());
    PageModule.component("resetScreen", Raffle.ResetScreen());
    PageModule.component("historyScreen", Raffle.HistoryScreen());
})(Raffle || (Raffle = {}));
//# sourceMappingURL=PageModule.js.map
var Raffle;
(function (Raffle) {
    angular.module("AppModule", ["ngRoute", "PageModule"])
        .component("mainApp", Raffle.MainApp())
        .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/Take", {
            template: "<issue-screen></issue-screen>"
        })
            .when("/Draw", {
            template: "<draw-screen></draw-screen>"
        })
            .when("/Reset", {
            template: "<reset-screen></reset-screen>"
        })
            .when("/History", {
            template: "<history-screen></history-screen>"
        })
            .when("/", {
            template: "<issue-screen></issue-screen>"
        });
    });
})(Raffle || (Raffle = {}));
//# sourceMappingURL=AppModule.js.map