import { Keyboard } from "./keyboard";
import { Screen } from "./screen";
import { Cpu } from "./cpu";
import Button from "./button";
import { ControlEnum, NumbersEnum, OperatorsEnum } from "../utils/Enums";

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
    this.keyboard.addButton(new Button(NumbersEnum.ZERO));
    this.keyboard.addButton(new Button(NumbersEnum.ONE));
    this.keyboard.addButton(new Button(NumbersEnum.TWO));
    this.keyboard.addButton(new Button(NumbersEnum.THREE));
    this.keyboard.addButton(new Button(NumbersEnum.FOUR));
    this.keyboard.addButton(new Button(NumbersEnum.FIVE));
    this.keyboard.addButton(new Button(NumbersEnum.SIX));
    this.keyboard.addButton(new Button(NumbersEnum.SEVEN));
    this.keyboard.addButton(new Button(NumbersEnum.EIGHT));
    this.keyboard.addButton(new Button(NumbersEnum.NINE));

    this.keyboard.addButton(new Button(OperatorsEnum.SUM));
    this.keyboard.addButton(new Button(OperatorsEnum.SUBTRACTION));
    this.keyboard.addButton(new Button(OperatorsEnum.TIMES));
    this.keyboard.addButton(new Button(OperatorsEnum.DIVISION));

    this.keyboard.addButton(new Button(ControlEnum.EQUAL));
    this.keyboard.addButton(new Button(ControlEnum.CLEAR));
    this.keyboard.addButton(new Button(ControlEnum.DECIMAL));
  }

  private performCalculation() {
    try {
      const result = this.cpu.calculateExpression(this.expression);
      this.screen.show(result.toString());
      this.expression = result.toString();
    } catch (error) {
      throw error;
    }
  }

  pressButton(value: string) {
    try {
      if (value === ControlEnum.EQUAL) {
        this.performCalculation();
      } else if (value === ControlEnum.CLEAR) {
        this.expression = "";
        this.screen.clearScreen();
      } else if (value === ControlEnum.DECIMAL) {
        this.expression += ".";
        this.screen.show(this.expression);
      } else {
        this.expression += this.keyboard.pressButton(value);
        this.screen.show(this.expression);
      }
    } catch (error) {
      if (typeof error === "string") this.screen.show(error);
      this.expression = "";
    }
  }
}

export { Calculator };
