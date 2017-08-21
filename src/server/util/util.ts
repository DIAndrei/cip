export class Util {
    constructor() { }

    randomDate(start: Date, days: number): Date {
        return new Date(start.getTime() + (days * 24 * 60 * 60 * 1000));
    }

    randomNumber(max: number, min: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
