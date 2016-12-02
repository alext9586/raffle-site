module Raffle {
    export function MainApp(): ng.IComponentOptions {
        return {
            templateUrl: "templates/MainApp.html",
            controller: MainAppController
        };
    }

    export class MainAppController {
        public static $inject: string[] = ["$rootScope", "$location", "raffleService"];

        private currentTab: string = "";

        private get drawInProgress(): boolean {
            return this.raffleService.drawInProgress;
        }

        constructor(private $rootScope: ng.IRootScopeService, private $location: ng.ILocationService, private raffleService: IRaffleService) {
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