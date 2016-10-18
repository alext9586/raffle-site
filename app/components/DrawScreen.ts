module Raffle {
    export function DrawScreen(): ng.IComponentOptions {
        return {
            templateUrl: "app/components/templates/DrawScreen.html",
            controller: DrawScreenController
        };
    }

    export class DrawScreenController {
        private $inject: string[] = ["raffleService"];

        private get value(): number {
            return this.raffleService.drawnTicket;
        }
        
        constructor(private raffleService: IRaffleService) {
            
        }

        private spin(): void {
            console.log("spin");
        }

        private draw(): void {
            console.log("draw");
        }
    }
}