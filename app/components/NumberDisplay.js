var Raffle;
(function (Raffle) {
    function NumberDisplay() {
        return {
            templateUrl: "app/components/templates/NumberDisplay.html?v=2",
            controller: NumberDisplayController,
            bindings: {
                value: "@"
            }
        };
    }
    Raffle.NumberDisplay = NumberDisplay;
    var NumberDisplayController = (function () {
        function NumberDisplayController($element, $timeout) {
            this.$element = $element;
            this.$timeout = $timeout;
            this.$inject = ["$element", "$timeout"];
        }
        Object.defineProperty(NumberDisplayController.prototype, "value", {
            get: function () {
                return this.myValue || 0;
            },
            set: function (value) {
                this.changeDisplayValue(value);
            },
            enumerable: true,
            configurable: true
        });
        NumberDisplayController.prototype.changeDisplayValue = function (value) {
            if (this.$timeout) {
                this.changeOpacity(value, 1, true);
            }
        };
        NumberDisplayController.prototype.changeOpacity = function (value, opacity, hide) {
            var _this = this;
            var opacityInterval = 0.1;
            if (opacity < 0) {
                this.myValue = value;
                hide = false;
                opacity = opacityInterval;
            }
            if (opacity > 1.0)
                return;
            this.$element.find(".display-value").attr("style", "opacity: " + opacity);
            var interval = hide ? -opacityInterval : opacityInterval;
            this.$timeout(function () {
                _this.changeOpacity(value, opacity + interval, hide);
            }, 10);
        };
        return NumberDisplayController;
    }());
    Raffle.NumberDisplayController = NumberDisplayController;
})(Raffle || (Raffle = {}));
//# sourceMappingURL=NumberDisplay.js.map