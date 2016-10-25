module Raffle {
    export function NumberDisplay(): ng.IComponentOptions {
        return {
            templateUrl: "app/components/templates/NumberDisplay.html?v=1",
            controller: NumberDisplayController,
            bindings: {
                value: "@"
            }
        };
    }

    export class NumberDisplayController {
        public $inject: string[] = ["$timeout"];
        private myValue: number;
        private visible: boolean;

        public get value(): number {
            return this.myValue || 0;
        }

        public set value(value: number) {
            this.visible = false;
            this.changeDisplayValue(value);
        }
        
        constructor(private $timeout: ng.ITimeoutService) {
            this.visible = false;
        }

        private changeDisplayValue(value: number): void {
            if(this.$timeout) {
                this.$timeout(() => {
                    this.myValue = value;
                    this.visible = true;
                }, 110);
            }
        }
    }
}