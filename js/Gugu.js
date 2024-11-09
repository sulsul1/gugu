class Gugu {
    constructor() {
        this.gugudan = Array(10).fill(1).map((v, i) =>
            Array(9).fill(1).map((z, j) => [(i), (j + 1), i * (j + 1), 0])
        );
        this.guguBox = document.createElement('div');

    }

    randomSort(dans = [], isDanRandom = false, isAllRandom = false) {
        const result = [];

        dans.forEach((dan) => {
            let gugu;
            if (isDanRandom) {
                gugu = this.gugudan[dan].sort(() => Math.random() - 0.5);
            } else {
                gugu = this.gugudan[dan];
            }
            result.push(...gugu);
        });

        if (isAllRandom) {
            result.sort(() => Math.random() - 0.5);
        }
        return result;
    }
}

// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
// const gugu = new Gugu();
// let quiz 
//  rl.question('구구단을 입력하세요 (예: 2,3,4): ', (answer) => {
//     const dans = answer.split(',').map(Number);  // Convert input to numbers
//     quiz = gugu.randomSort(dans, false, true);
//     rl.close();
// });



