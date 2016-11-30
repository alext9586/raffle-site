module Raffle {
    export function HistoryScreen(): ng.IComponentOptions {
        return {
            templateUrl: "templates/HistoryScreen.html",
            controller: HistoryScreenController
        };
    }

    export class HistoryScreenController {
        private $inject: string[] = ["raffleService"];

        private get discardedTickets(): string {
            return this.raffleService.getDiscardedTickets().join(", ");
        }

        constructor(private raffleService: IRaffleService) {
            
        }
    }
}