var Raffle;
(function (Raffle) {
    var RaffleService = (function () {
        function RaffleService() {
            this.localMaxValue = 1;
            this.localBucket = [];
            this.localCurrentIndex = -1;
        }
        Object.defineProperty(RaffleService.prototype, "maxValue", {
            get: function () {
                return this.localMaxValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RaffleService.prototype, "bucket", {
            get: function () {
                return this.localBucket;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RaffleService.prototype, "currentIndex", {
            get: function () {
                return this.localCurrentIndex;
            },
            enumerable: true,
            configurable: true
        });
        RaffleService.prototype.take = function () {
            this.localBucket.push(this.localMaxValue++);
        };
        RaffleService.prototype.remove = function () {
            if (this.currentIndex >= 0 && this.currentIndex < this.localBucket.length) {
                this.localBucket.splice(this.currentIndex, 1);
                this.localCurrentIndex = -1;
            }
        };
        return RaffleService;
    }());
    Raffle.RaffleService = RaffleService;
})(Raffle || (Raffle = {}));
//# sourceMappingURL=RaffleService.js.map