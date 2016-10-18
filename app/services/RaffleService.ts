module Raffle {
    export interface IRaffleService {
        takeTicket: number;
        drawnTicket: number;

        take(): void;
        remove(): void;
    }

    export class RaffleService implements IRaffleService {
        private maxValue: number;
        private bucket: number[];
        private currentIndex: number;

        public get takeTicket(): number {
            return this.maxValue;
        } 

        public get drawnTicket(): number {
            return this.currentIndexWithinRange() ? this.bucket[this.currentIndex] : 0;
        }

		constructor() {
            this.maxValue = 1;
            this.bucket = [];
            this.currentIndex = -1;
		}

        public take(): void {
            this.bucket.push(this.maxValue++);
        }

        public remove(): void {
            if (this.currentIndexWithinRange()) {
                this.bucket.splice(this.currentIndex, 1);
                this.currentIndex = -1;
            }
        }

        private currentIndexWithinRange(): boolean {
            return this.currentIndex >= 0 && this.currentIndex < this.bucket.length;
        }
    }
}