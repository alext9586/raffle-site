module Raffle {
    var PageModule = angular.module("PageModule", []);

    PageModule.service("raffleService", RaffleService);
    PageModule.component("issueScreen", IssueScreen());
}