import a, { A, B } from "./moudle.js";
console.log(A);
B();
a();
import('./moudle.js').then((m) => {
    console.log(m)
})