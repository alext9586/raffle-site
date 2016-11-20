module Raffle {
    export function MainApp(): ng.IComponentOptions {
        return {
            templateUrl: "app/components/templates/MainApp.html?v=2",
            controller: MainAppController
        };
    }

    export class MainAppController {
        public static $inject: string[] = ["$rootScope", "$location"];

        private currentTab: string = "";

        constructor(private $rootScope: ng.IRootScopeService, private $location: ng.ILocationService) {
            $rootScope.$on("$locationChangeSuccess", () => {
                this.currentTab = this.$location.path();
            });
        }

        private pathsMatch(tab: string): boolean {
            return this.currentTab === `/${tab || ""}`;
        }

        private getCopyrightYear(): string {
            return new Date().getFullYear().toString();
        }
    }
}