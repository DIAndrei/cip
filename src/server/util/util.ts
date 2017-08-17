export class Util {
    constructor() { }

    randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    makeDummyWord() {
        let text: string = '';
        const ALPHABET: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let i = 0; i < 5; i++) {
            text += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
        }
        return text;
    }

}