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