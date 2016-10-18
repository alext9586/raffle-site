var Raffle;
(function (Raffle) {
    var RaffleService = (function () {
        function RaffleService($interval, $timeout, $q) {
            this.$interval = $interval;
            this.$timeout = $timeout;
            this.$q = $q;
            this.$inject = ["$interval", "$timeout", "$q"];
            this.spinInterval = 20;
            this.reset();
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
                if (this.hasOneTicket) {
                    return this.bucket[0];
                }
                return this.currentIndexWithinRange() ? this.bucket[this.currentIndex] : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RaffleService.prototype, "hasOneTicket", {
            get: function () {
                return this.bucket.length === 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RaffleService.prototype, "allowSpin", {
            get: function () {
                return this.bucket.length > 1;
            },
            enumerable: true,
            configurable: true
        });
        RaffleService.prototype.reset = function () {
            this.maxValue = 1;
            this.bucket = [];
            this.discardBucket = [];
            this.currentIndex = -1;
        };
        RaffleService.prototype.take = function () {
            this.bucket.push(this.maxValue++);
        };
        RaffleService.prototype.spinActive = function () {
            var _this = this;
            this.spinToken = this.$interval(function () {
                _this.incrementCurrentIndex();
            }, this.spinInterval);
        };
        RaffleService.prototype.spinDeactive = function () {
            var _this = this;
            var def = this.$q.defer();
            this.$interval.cancel(this.spinToken);
            this.spinToken = undefined;
            var interval = this.spinInterval;
            var timer = function (running) {
                interval += running++;
                if (interval < 380) {
                    _this.$timeout(function () {
                        _this.incrementCurrentIndex();
                        timer(running);
                    }, interval);
                }
                else {
                    def.resolve();
                }
            };
            timer(0);
            return def.promise;
        };
        RaffleService.prototype.discard = function () {
            if (this.currentIndexWithinRange()) {
                this.discardBucket.push(this.drawnTicket);
                this.bucket.splice(this.currentIndex, 1);
                this.currentIndex = -1;
            }
        };
        RaffleService.prototype.printDebug = function () {
            console.info("bucket: ", this.bucket);
            console.info("discard: ", this.discardBucket);
        };
        RaffleService.prototype.incrementCurrentIndex = function () {
            this.currentIndex = Math.floor(Math.random() * this.bucket.length);
        };
        RaffleService.prototype.currentIndexWithinRange = function () {
            return this.currentIndex >= 0 && this.currentIndex < this.bucket.length;
        };
        return RaffleService;
    }());
    Raffle.RaffleService = RaffleService;
})(Raffle || (Raffle = {}));
//# sourceMappingURL=RaffleService.js.map