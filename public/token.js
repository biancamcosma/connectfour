export default class Token {
    constructor() {

        this.size = 100;

    }

    put(context, x, y) {
        //context.fillRect(400, 400, 30, 30);
        context.beginPath();
        context.arc(x, y, size, 0, MATH.PI * 2);
        context.stroke();
    }
}