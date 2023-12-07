import { Calculator } from "./src/calculator";
import * as readline from "readline";

console.clear();
console.log(
  "\n\nCalculadora rodando!\n*Digite apenas uma tecla de cada vez! \n\n"
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function startCalculator() {
  rl.question("[LOG] Digite uma tecla (SAIR [S] - LIMPAR [C]): ", (answer) => {
    try {
      console.clear();

      if (answer.toUpperCase() === "S" || !answer.trim()) {
        console.log("Calculadora encerrada.");
        rl.close();
        return;
      }

      console.log(`\n[LOG] Tecla pressionada: ${answer}\n`);
      console.log("----------------\n");
      calculator.pressButton(answer.toUpperCase());
      console.log("\n----------------");

      startCalculator();
    } catch (error) {
      rl.close();
      return;
    }
  });
}

const calculator = new Calculator();
startCalculator();
