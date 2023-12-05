import Button from "./button";

class Keyboard {
  private buttons: Button[];

  constructor() {
    this.buttons = [];
  }

  addButton(button: Button) {
    this.buttons.push(button);
  }

  pressButton(value: string) {
    for (const button of this.buttons) {
      if (button.getValue() === value) {
        return button.getValue();
      }
    }
    throw new Error("Button not founded");
  }
}

export { Keyboard };
