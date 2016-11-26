module Raffle {
    export function DrawScreen(): ng.IComponentOptions {
        return {
            templateUrl: "templates/DrawScreen.html",
            controller: DrawScreenController
        };
    }

    enum State {
        Ready,
        Spinning,
        Discard
    }

    export class DrawScreenController {
        public $inject: string[] = ["$scope", "$element", "raffleService"];
        private state: State;

        private get value(): number {
            return this.raffleService.drawnTicket;
        }

        private get isSpinning(): boolean {
            return this.state === State.Spinning;
        }

        private get isDiscard(): boolean {
            return this.state === State.Discard;
        }

        private get isReady(): boolean {
            return this.state === State.Ready;
        }

        private get hasTickets(): boolean {
            return this.raffleService.hasTickets;
        }

        private get hasOneTicket(): boolean {
            return this.raffleService.hasOneTicket;
        }

        private get hasNoTickets(): boolean {
            return this.raffleService.hasNoTickets;
        }

        private get isDisplayDisabled(): boolean {
            return this.isSpinning || this.hasOneTicket || this.hasNoTickets;
        }

        constructor(private $scope: ng.IScope, private $element: ng.IAugmentedJQuery, private raffleService: IRaffleService) {
            this.state = State.Ready;

            this.$element.bind("touchstart", (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                this.$scope.$apply(() => {
                    this.numberMousedown();
                });
            });

            this.$element.bind("touchend", (e) => {
                e.preventDefault();
                e.stopPropagation();

                this.$scope.$apply(() => {
                    this.numberMouseup();
                });
            });
        }

        private numberMousedown(): void {
            if(this.isReady && this.hasTickets) {
                this.state = State.Spinning;
                this.spinActive();
            }
        }

        private numberMouseup(): void {
            if(this.isSpinning) {
                this.spinDeactive();
            } else if (this.isDiscard) {
                this.discard();
            }
        }

        private spinActive(): void {
            this.raffleService.spinActive();
        }

        private spinDeactive(): void {
            this.raffleService.spinDeactive().then(() => {
                this.state = State.Discard;
            });
        }

        private discard(): void {
            this.raffleService.discard();
            this.state = State.Ready;
        }
    }
}