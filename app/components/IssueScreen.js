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