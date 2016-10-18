module Raffle {
    export interface IRaffleService {
        maxValue: number;
        bucket: number[];
        currentIndex: number;

        take(): void;
        remove(): void;
    }

    export class RaffleService implements IRaffleService {
        private localMaxValue: number;
        private localBucket: number[];
        private localCurrentIndex: number;

        public get maxValue(): number {
            return this.localMaxValue;
        }

        public get bucket(): number[] {
            return this.localBucket;
        }

        public get currentIndex(): number {
            return this.localCurrentIndex;
        }

		constructor() {
            this.localMaxValue = 1;
            this.localBucket = [];
            this.localCurrentIndex = -1;
		}

        public take(): void {
            this.localBucket.push(this.localMaxValue++);
        }

        public remove(): void {
            if (this.currentIndex >= 0 && this.currentIndex < this.localBucket.length) {
                this.localBucket.splice(this.currentIndex, 1);
                this.localCurrentIndex = -1;
            }
        }
    }
}