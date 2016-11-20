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