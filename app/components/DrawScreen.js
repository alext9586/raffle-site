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
        }
        Object.defineProperty(DrawScreenController.prototype, "value", {
            get: function () {
                return this.raffleService.drawnTicket;
            },
            enumerable: true,
            configurable: true
        });
        DrawScreenController.prototype.spin = function () {
            console.log("spin");
        };
        DrawScreenController.prototype.draw = function () {
            console.log("draw");
        };
        return DrawScreenController;
    }());
    Raffle.DrawScreenController = DrawScreenController;
})(Raffle || (Raffle = {}));
//# sourceMappingURL=DrawScreen.js.map