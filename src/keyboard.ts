import { Button } from "./button";

export class Keyboard {
  private buttons: Record<string, Button> = {};

  addButton(key: string, value: string) {
    this.buttons[key] = new Button(value);
  }

  getButton(key: string) {
    return this.buttons[key];
  }
}
