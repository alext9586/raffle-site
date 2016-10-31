module Raffle {
    export function ResetScreen(): ng.IComponentOptions {
        return {
            templateUrl: "app/components/templates/ResetScreen.html",
            controller: ResetScreenController
        };
    }

    export class ResetScreenController {
        private $inject: string[] = ["raffleService"];
        
        constructor(private raffleService: IRaffleService) {
            
        }

        private reset(): void {
            this.raffleService.reset();
        }
    }
}