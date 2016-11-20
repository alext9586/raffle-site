module Raffle {
    export function NumberDisplay(): ng.IComponentOptions {
        return {
            templateUrl: "app/components/templates/NumberDisplay.html?v=2",
            controller: NumberDisplayController,
            bindings: {
                value: "@"
            }
        };
    }

    export class NumberDisplayController {
        public $inject: string[] = ["$element", "$timeout"];
        private myValue: number;

        public get value(): number {
            return this.myValue || 0;
        }

        public set value(value: number) {
            this.changeDisplayValue(value);
        }
        
        constructor(private $element: ng.IAugmentedJQuery, private $timeout: ng.ITimeoutService) {
            
        }

        private changeDisplayValue(value: number): void {
            if(this.$timeout) {
                this.changeOpacity(value, 1, true);
            }
        }

        private changeOpacity(value: number, opacity: number, hide?: boolean): void {
            if(opacity < 0) {
                this.myValue = value;
                hide = false;
            }

            if(opacity > 1.0)
                return;
            
            this.$element.find(".display-value").attr("style", `opacity: ${opacity}`);

            var multiplier = hide ? -0.1 : 0.1;
            this.$timeout(() => {
                this.changeOpacity(value, opacity + multiplier, hide);
            }, 10);
        }
    }
}