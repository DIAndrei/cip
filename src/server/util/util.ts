export class Util {
    constructor() { }

    randomDate(start: Date, days: number) {
        return new Date(start.getTime() + (days * 24 * 60 * 60 * 1000));
    }

    randomNumber(max: number, min: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    makeWord(type: string = null) {
        switch (type) {
            case 'installs':
                return 'installs';
            case 'uninstalls':
                return 'uninstalls';
            case 'upgrades':
                return 'upgrades';
            default:
                return 'test';
        }
    }
}
