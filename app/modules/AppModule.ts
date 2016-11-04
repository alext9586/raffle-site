module Raffle {
    angular.module("AppModule", ["ngRoute", "PageModule"])
        .component("mainApp", MainApp())
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
                .when("/", {
                    template: "<issue-screen></issue-screen>"
                });
        });
}