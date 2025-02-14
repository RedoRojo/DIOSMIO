export class Timeline {
    constructor(
        public numPassedTests: number,
        public numTotalTests: number,
        public timestamp: Date
    ) {}

    isSuccessful(): boolean {
        return this.numPassedTests === this.numTotalTests;
    }

    getColor(): string {
        return this.isSuccessful() ? "green" : "red";
    }
}
