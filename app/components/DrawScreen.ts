module Raffle {
    export function DrawScreen(): ng.IComponentOptions {
        return {
            templateUrl: "app/components/templates/DrawScreen.html",
            controller: DrawScreenController
        };
    }

    enum State {
        Ready,
        Spinning,
        Stopped
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
            return this.state === State.Stopped;
        }

        private get isReady(): boolean {
            return this.state === State.Ready;
        }

        private get hasValidBucket(): boolean {
            return this.raffleService.allowSpin;
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
            if(this.isReady && this.hasValidBucket) {
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
                this.state = State.Stopped;
            });
        }

        private discard(): void {
            this.raffleService.discard();
            this.state = State.Ready;
        }
    }
}