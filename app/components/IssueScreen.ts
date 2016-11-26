module Raffle {
    export function IssueScreen(): ng.IComponentOptions {
        return {
            templateUrl: "templates/IssueScreen.html",
            controller: IssueScreenController
        };
    }

    export class IssueScreenController {
        private $inject: string[] = ["raffleService"];

        private get value(): number {
            return this.raffleService.takeTicket;
        }
        
        constructor(private raffleService: IRaffleService) {
            
        }

        private take(): void {
            this.raffleService.take();
        }
    }
}