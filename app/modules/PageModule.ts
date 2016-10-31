module Raffle {
    var PageModule = angular.module("PageModule", []);

    PageModule.service("raffleService", RaffleService);

    PageModule.component("numberDisplay", NumberDisplay());
    PageModule.component("issueScreen", IssueScreen());
    PageModule.component("drawScreen", DrawScreen());
    PageModule.component("resetScreen", ResetScreen());
}