var Raffle;
(function (Raffle) {
    var RaffleService = (function () {
        function RaffleService($interval, $timeout, $q, $window) {
            this.$interval = $interval;
            this.$timeout = $timeout;
            this.$q = $q;
            this.$window = $window;
            this.$inject = ["$interval", "$timeout", "$q", "$window"];
            this.spinInterval = 100;
            this.storageKeys = {
                maxValue: "maxValue",
                bucket: "bucket",
                discardBucket: "discardBucket"
            };
            this.getPersistedData();
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
            this.persistData();
        };
        RaffleService.prototype.take = function () {
            this.bucket.push(this.maxValue++);
            this.persistData();
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
                if (interval < 400) {
                    _this.$timeout(function () {
                        _this.incrementCurrentIndex();
                        timer(running);
                    }, interval);
                }
                else {
                    _this.$timeout(function () {
                        def.resolve();
                    }, interval);
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
                this.persistData();
            }
        };
        RaffleService.prototype.getDiscardedTickets = function () {
            return !this.discardBucket ? [] : angular.copy(this.discardBucket).reverse();
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
        RaffleService.prototype.getPersistedData = function () {
            var maxValue = this.getStoredValue(this.storageKeys.maxValue);
            this.maxValue = maxValue ? parseInt(maxValue) : 0;
            var bucket = this.getStoredValue(this.storageKeys.bucket);
            this.bucket = bucket ? this.transmogrifyBucket(bucket) : [];
            var discardBucket = this.getStoredValue(this.storageKeys.discardBucket);
            this.discardBucket = discardBucket ? this.transmogrifyBucket(discardBucket) : [];
        };
        RaffleService.prototype.transmogrifyBucket = function (bucket) {
            return bucket.split(",").map(function (n) {
                return parseInt(n);
            });
        };
        RaffleService.prototype.getStoredValue = function (key) {
            return this.$window.localStorage.getItem(key);
        };
        RaffleService.prototype.persistData = function () {
            this.$window.localStorage.setItem(this.storageKeys.maxValue, this.maxValue.toString());
            this.$window.localStorage.setItem(this.storageKeys.bucket, this.bucket.toString());
            this.$window.localStorage.setItem(this.storageKeys.discardBucket, this.discardBucket.toString());
        };
        return RaffleService;
    }());
    Raffle.RaffleService = RaffleService;
})(Raffle || (Raffle = {}));
//# sourceMappingURL=RaffleService.js.map