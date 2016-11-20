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