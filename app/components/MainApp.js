var Raffle;
(function (Raffle) {
    function MainApp() {
        return {
            templateUrl: "app/components/templates/MainApp.html?v=1",
            controller: MainAppController
        };
    }
    Raffle.MainApp = MainApp;
    var MainAppController = (function () {
        function MainAppController($rootScope, $location) {
            var _this = this;
            this.$rootScope = $rootScope;
            this.$location = $location;
            this.currentTab = "";
            $rootScope.$on("$locationChangeSuccess", function () {
                _this.currentTab = _this.$location.path();
            });
        }
        MainAppController.prototype.pathsMatch = function (tab) {
            return this.currentTab === "/" + (tab || "");
        };
        MainAppController.prototype.getCopyrightYear = function () {
            return new Date().getFullYear().toString();
        };
        MainAppController.$inject = ["$rootScope", "$location"];
        return MainAppController;
    }());
    Raffle.MainAppController = MainAppController;
})(Raffle || (Raffle = {}));
//# sourceMappingURL=MainApp.js.map