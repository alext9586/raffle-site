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
        public $inject: string[] = ["$interval", "$timeout", "$q"];

        private maxValue: number;
        private bucket: number[];
        private discardBucket: number[];
        private currentIndex: number;

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
            private $q: ng.IQService) {
            this.reset();
		}

        public reset(): void {
            this.maxValue = 1;
            this.bucket = [];
            this.discardBucket = [];
            this.currentIndex = -1;
        }

        public take(): void {
            this.bucket.push(this.maxValue++);
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
    }
}