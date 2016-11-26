module Raffle {
    export function HistoryScreen(): ng.IComponentOptions {
        return {
            templateUrl: "templates/HistoryScreen.html",
            controller: HistoryScreenController
        };
    }

    export class HistoryScreenController {
        private $inject: string[] = ["raffleService"];

        private get discardedTickets(): number[] {
            return this.raffleService.getDiscardedTickets();
        }

        constructor(private raffleService: IRaffleService) {
            
        }
    }
}