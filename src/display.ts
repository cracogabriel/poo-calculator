export class Display {
  private value: string = "";

  add(input: string) {
    this.value += input;
  }

  set(value: string) {
    this.value = value;
  }

  show() {
    console.log(this.value);
  }
}
