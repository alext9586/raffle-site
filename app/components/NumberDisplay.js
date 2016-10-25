var Raffle;
(function (Raffle) {
    function NumberDisplay() {
        return {
            templateUrl: "app/components/templates/NumberDisplay.html?v=1",
            controller: NumberDisplayController,
            bindings: {
                value: "@"
            }
        };
    }
    Raffle.NumberDisplay = NumberDisplay;
    var NumberDisplayController = (function () {
        function NumberDisplayController($timeout) {
            this.$timeout = $timeout;
            this.$inject = ["$timeout"];
            this.visible = false;
        }
        Object.defineProperty(NumberDisplayController.prototype, "value", {
            get: function () {
                return this.myValue || 0;
            },
            set: function (value) {
                this.visible = false;
                this.changeDisplayValue(value);
            },
            enumerable: true,
            configurable: true
        });
        NumberDisplayController.prototype.changeDisplayValue = function (value) {
            var _this = this;
            if (this.$timeout) {
                this.$timeout(function () {
                    _this.myValue = value;
                    _this.visible = true;
                }, 110);
            }
        };
        return NumberDisplayController;
    }());
    Raffle.NumberDisplayController = NumberDisplayController;
})(Raffle || (Raffle = {}));
//# sourceMappingURL=NumberDisplay.js.map