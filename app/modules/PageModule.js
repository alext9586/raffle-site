var Raffle;
(function (Raffle) {
    var PageModule = angular.module("PageModule", []);
    PageModule.service("raffleService", Raffle.RaffleService);
    PageModule.component("issueScreen", Raffle.IssueScreen());
})(Raffle || (Raffle = {}));
//# sourceMappingURL=PageModule.js.map