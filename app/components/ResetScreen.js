var Raffle;
(function (Raffle) {
    function ResetScreen() {
        return {
            templateUrl: "app/components/templates/ResetScreen.html?v=1",
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