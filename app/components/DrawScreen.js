var Raffle;
(function (Raffle) {
    function DrawScreen() {
        return {
            templateUrl: "app/components/templates/DrawScreen.html",
            controller: DrawScreenController
        };
    }
    Raffle.DrawScreen = DrawScreen;
    var State;
    (function (State) {
        State[State["Ready"] = 0] = "Ready";
        State[State["Spinning"] = 1] = "Spinning";
        State[State["Stopped"] = 2] = "Stopped";
    })(State || (State = {}));
    var DrawScreenController = (function () {
        function DrawScreenController(raffleService) {
            this.raffleService = raffleService;
            this.$inject = ["raffleService"];
            this.state = State.Ready;
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
                return this.state === State.Stopped;
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
        Object.defineProperty(DrawScreenController.prototype, "hasValidBucket", {
            get: function () {
                return this.raffleService.allowSpin;
            },
            enumerable: true,
            configurable: true
        });
        DrawScreenController.prototype.numberMousedown = function () {
            if (this.isReady && this.hasValidBucket) {
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
                _this.state = State.Stopped;
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