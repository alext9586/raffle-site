module Raffle {
    export function DrawScreen(): ng.IComponentOptions {
        return {
            templateUrl: "app/components/templates/DrawScreen.html",
            controller: DrawScreenController
        };
    }

    export class DrawScreenController {
        public $inject: string[] = ["raffleService"];

        private isSpinning: boolean = false;
        private isSpinDown: boolean = false;

        private get value(): number {
            return this.raffleService.drawnTicket;
        }

        private get allowSpin(): boolean {
            return this.raffleService.allowSpin && !this.isSpinDown;
        }

        private get allowDiscard(): boolean {
            return this.value <= 0
                ? false
                : !this.isSpinning;
        }
        
        constructor(private raffleService: IRaffleService) {
            
        }

        private spinActive(): void {
            this.isSpinning = true;
            this.raffleService.spinActive();
        }

        private spinDeactive(): void {
            this.isSpinDown = true;
            this.raffleService.spinDeactive().then(() => {
                this.isSpinDown = false;
                this.isSpinning = false;
            });
        }

        private discard(): void {
            this.raffleService.discard();
        }
    }
}