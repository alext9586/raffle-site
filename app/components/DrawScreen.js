var Raffle;
(function (Raffle) {
    function DrawScreen() {
        return {
            templateUrl: "app/components/templates/DrawScreen.html",
            controller: DrawScreenController
        };
    }
    Raffle.DrawScreen = DrawScreen;
    var DrawScreenController = (function () {
        function DrawScreenController(raffleService) {
            this.raffleService = raffleService;
            this.$inject = ["raffleService"];
            this.isSpinning = false;
            this.isSpinDown = false;
        }
        Object.defineProperty(DrawScreenController.prototype, "value", {
            get: function () {
                return this.raffleService.drawnTicket;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawScreenController.prototype, "allowSpin", {
            get: function () {
                return this.raffleService.allowSpin && !this.isSpinDown;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawScreenController.prototype, "allowDiscard", {
            get: function () {
                return this.value <= 0
                    ? false
                    : !this.isSpinning;
            },
            enumerable: true,
            configurable: true
        });
        DrawScreenController.prototype.spinActive = function () {
            this.isSpinning = true;
            this.raffleService.spinActive();
        };
        DrawScreenController.prototype.spinDeactive = function () {
            var _this = this;
            this.isSpinDown = true;
            this.raffleService.spinDeactive().then(function () {
                _this.isSpinDown = false;
                _this.isSpinning = false;
            });
        };
        DrawScreenController.prototype.discard = function () {
            this.raffleService.discard();
        };
        return DrawScreenController;
    }());
    Raffle.DrawScreenController = DrawScreenController;
})(Raffle || (Raffle = {}));
//# sourceMappingURL=DrawScreen.js.map