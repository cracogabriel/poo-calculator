import { CPU } from "./cpu";
import { Display } from "./display";
import { Keyboard } from "./keyboard";

class Calculator {
  private keyboard: Keyboard;
  private cpu: CPU;
  private display: Display;
  private currentInput: string;

  constructor() {
    this.keyboard = new Keyboard();
    this.cpu = new CPU();
    this.display = new Display();
    this.currentInput = "";

    // Adicione os botões à calculadora
    this.keyboard.addButton("0", "0");
    this.keyboard.addButton("1", "1");
    this.keyboard.addButton("2", "2");
    this.keyboard.addButton("3", "3");
    this.keyboard.addButton("4", "4");
    this.keyboard.addButton("5", "5");
    this.keyboard.addButton("6", "6");
    this.keyboard.addButton("7", "7");
    this.keyboard.addButton("8", "8");
    this.keyboard.addButton("9", "9");
    this.keyboard.addButton("+", "+");
    this.keyboard.addButton("-", "-");
    this.keyboard.addButton("*", "*");
    this.keyboard.addButton("/", "/");
    this.keyboard.addButton("=", "=");
    this.keyboard.addButton(".", ".");
    this.keyboard.addButton("start", "start");
  }

  getKeyboard() {
    return this.keyboard;
  }

  pressButton(key: string) {
    const buttonValue = this.keyboard.getButton(key).press();

    if (buttonValue === "=") {
      try {
        const result = this.cpu.calculateExpression(this.currentInput);
        this.display.set(result.toString());
        this.currentInput = result.toString();
      } catch (error) {
        this.display.set("Erro");
        this.currentInput = "";
      }
    } else {
      this.currentInput += buttonValue;
    }
  }
}

export { Calculator };
