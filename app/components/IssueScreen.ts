module Raffle {
    export function IssueScreen(): ng.IComponentOptions {
        return {
            templateUrl: "app/components/templates/IssueScreen.html",
            controller: IssueScreenController
        };
    }

    export class IssueScreenController {
        private $inject: string[] = ["raffleService"];

        private get value(): number {
            return this.raffleService.maxValue;
        }
        
        constructor(private raffleService: IRaffleService) {
            
        }

        private take(): void {
            this.raffleService.take();
        }
    }
}