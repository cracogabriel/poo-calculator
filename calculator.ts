import { Keyboard } from "./keyboard";
import { Screen } from "./screen";
import { Cpu } from "./cpu";
import Button from "./button";

class Calculator {
  private keyboard: Keyboard;
  private screen: Screen;
  private cpu: Cpu;
  private expression: string = "";

  constructor() {
    this.keyboard = new Keyboard();
    this.screen = new Screen();
    this.cpu = new Cpu();
    this.configureButtons();
  }

  private configureButtons() {
    this.keyboard.addButton(new Button("0"));
    this.keyboard.addButton(new Button("1"));
    this.keyboard.addButton(new Button("2"));
    this.keyboard.addButton(new Button("3"));
    this.keyboard.addButton(new Button("4"));
    this.keyboard.addButton(new Button("5"));
    this.keyboard.addButton(new Button("6"));
    this.keyboard.addButton(new Button("7"));
    this.keyboard.addButton(new Button("8"));
    this.keyboard.addButton(new Button("9"));
    this.keyboard.addButton(new Button("+"));
    this.keyboard.addButton(new Button("-"));
    this.keyboard.addButton(new Button("*"));
    this.keyboard.addButton(new Button("/"));
    this.keyboard.addButton(new Button("="));
    this.keyboard.addButton(new Button("C"));
  }

  performCalculation() {
    try {
      const result = this.cpu.calculateExpression(this.expression);
      this.screen.displayResult(result.toString());
      this.expression = result.toString();
    } catch (error) {
      this.screen.displayResult("Error");
    }
  }

  pressButton(value: string) {
    if (value === "=") {
      this.performCalculation();
    } else if (value === "C") {
      this.expression = "";
      this.screen.clearScreen();
    } else {
      this.expression += this.keyboard.pressButton(value);
    }
  }
}

export { Calculator };
