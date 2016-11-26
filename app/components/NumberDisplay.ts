module Raffle {
    export function NumberDisplay(): ng.IComponentOptions {
        return {
            templateUrl: "templates/NumberDisplay.html",
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
            var opacityInterval = 0.1;

            if(opacity < 0) {
                this.myValue = value;
                hide = false;
                opacity = opacityInterval;
            }

            if(opacity > 1.0)
                return;
            
            this.$element.find(".display-value").attr("style", `opacity: ${opacity}`);

            var interval = hide ? -opacityInterval : opacityInterval;
            this.$timeout(() => {
                this.changeOpacity(value, opacity + interval, hide);
            }, 10);
        }
    }
}