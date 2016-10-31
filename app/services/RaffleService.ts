module Raffle {
    export interface IRaffleService {
        takeTicket: number;
        drawnTicket: number;
        hasOneTicket: boolean;
        allowSpin: boolean;

        reset(): void;
        take(): void;
        spinActive(): void;
        spinDeactive(): ng.IPromise<void>;
        discard(): void;

        printDebug(): void;
    }

    export class RaffleService implements IRaffleService {
        public $inject: string[] = ["$interval", "$timeout", "$q", "$window"];

        private maxValue: number;
        private bucket: number[];
        private discardBucket: number[];
        private currentIndex: number;

        private storageKeys = {
            maxValue: "maxValue",
            bucket: "bucket",
            discardBucket: "discardBucket",
            currentIndex: "currentIndex"
        };

        private spinToken: ng.IPromise<any>;
        readonly spinInterval: number = 200;

        public get takeTicket(): number {
            return this.maxValue;
        } 

        public get drawnTicket(): number {
            if(this.hasOneTicket) {
                return this.bucket[0];
            }
            
            return this.currentIndexWithinRange() ? this.bucket[this.currentIndex] : 0;
        }

        public get hasOneTicket(): boolean {
            return this.bucket.length === 1;
        }

        public get allowSpin(): boolean {
            return this.bucket.length > 1;
        }

		constructor(private $interval: ng.IIntervalService,
            private $timeout: ng.ITimeoutService,
            private $q: ng.IQService,
            private $window: ng.IWindowService) {
            this.getPersistedData();
		}

        public reset(): void {
            this.maxValue = 1;
            this.bucket = [];
            this.discardBucket = [];
            this.currentIndex = -1;
            this.persistData();
        }

        public take(): void {
            this.bucket.push(this.maxValue++);
            this.persistData();
        }

        public spinActive(): void {
            this.spinToken = this.$interval(()=>{
                this.incrementCurrentIndex();
            }, this.spinInterval);
        }

        public spinDeactive(): ng.IPromise<void> {
            var def = this.$q.defer<void>();

            this.$interval.cancel(this.spinToken);
            this.spinToken = undefined;
            
            var interval = this.spinInterval;
            var timer = (running) => {
                interval += running++;

                if (interval < 380) {
                    this.$timeout(() => {
                        this.incrementCurrentIndex();
                        timer(running);
                    }, interval);
                } else {
                    def.resolve();
                }
            };

            timer(0);
            return def.promise;
        }

        public discard(): void {
            if (this.currentIndexWithinRange()) {
                this.discardBucket.push(this.drawnTicket);
                this.bucket.splice(this.currentIndex, 1);
                this.currentIndex = -1;
                this.persistData();
            }
        }

        public printDebug(): void {
            console.info("bucket: ", this.bucket);
            console.info("discard: ", this.discardBucket);
        }

        private incrementCurrentIndex(): void {
            this.currentIndex = Math.floor(Math.random() * this.bucket.length);
        }

        private currentIndexWithinRange(): boolean {
            return this.currentIndex >= 0 && this.currentIndex < this.bucket.length;
        }

        private getPersistedData(): void {
            var maxValue = this.getStoredValue(this.storageKeys.maxValue);
            this.maxValue = maxValue ? parseInt(maxValue) : 0;

            var bucket = this.getStoredValue(this.storageKeys.bucket);
            this.bucket = bucket ? this.transmogrifyBucket(bucket) : [];

            var discardBucket = this.getStoredValue(this.storageKeys.discardBucket);
            this.discardBucket = discardBucket ? this.transmogrifyBucket(discardBucket) : [];

            var currentIndex = this.getStoredValue(this.storageKeys.currentIndex);
            this.currentIndex = currentIndex ? parseInt(currentIndex) : -1;
        }

        private transmogrifyBucket(bucket: string): number[] {
            return bucket.split(",").map(n => {
                return parseInt(n);
            });
        }

        private getStoredValue(key: string): string {
            return this.$window.localStorage.getItem(key);
        }

        private persistData(): void {
            this.$window.localStorage.setItem(this.storageKeys.maxValue, this.maxValue.toString());
            this.$window.localStorage.setItem(this.storageKeys.bucket, this.bucket.toString());
            this.$window.localStorage.setItem(this.storageKeys.discardBucket, this.discardBucket.toString());
            this.$window.localStorage.setItem(this.storageKeys.currentIndex, this.currentIndex.toString());
        }
    }
}