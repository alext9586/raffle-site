var Raffle;
(function (Raffle) {
    var RaffleService = (function () {
        function RaffleService() {
            this.maxValue = 1;
            this.bucket = [];
            this.currentIndex = -1;
        }
        Object.defineProperty(RaffleService.prototype, "takeTicket", {
            get: function () {
                return this.maxValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RaffleService.prototype, "drawnTicket", {
            get: function () {
                return this.currentIndexWithinRange() ? this.bucket[this.currentIndex] : 0;
            },
            enumerable: true,
            configurable: true
        });
        RaffleService.prototype.take = function () {
            this.bucket.push(this.maxValue++);
        };
        RaffleService.prototype.remove = function () {
            if (this.currentIndexWithinRange()) {
                this.bucket.splice(this.currentIndex, 1);
                this.currentIndex = -1;
            }
        };
        RaffleService.prototype.currentIndexWithinRange = function () {
            return this.currentIndex >= 0 && this.currentIndex < this.bucket.length;
        };
        return RaffleService;
    }());
    Raffle.RaffleService = RaffleService;
})(Raffle || (Raffle = {}));
//# sourceMappingURL=RaffleService.js.map