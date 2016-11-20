var Raffle;
(function (Raffle) {
    angular.module("AppModule", ["ngRoute", "PageModule"])
        .component("mainApp", Raffle.MainApp())
        .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/Take", {
            template: "<issue-screen></issue-screen>"
        })
            .when("/Draw", {
            template: "<draw-screen></draw-screen>"
        })
            .when("/Reset", {
            template: "<reset-screen></reset-screen>"
        })
            .when("/History", {
            template: "<history-screen></history-screen>"
        })
            .when("/", {
            template: "<issue-screen></issue-screen>"
        });
    });
})(Raffle || (Raffle = {}));
//# sourceMappingURL=AppModule.js.map