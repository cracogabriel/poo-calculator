import { OperatorsEnum } from "./utils/Enums";

class Cpu {
  calculateExpression(expression: string): number {
    try {
      const result = this.parseExpression(expression);
      return result;
    } catch (error: any) {
      throw new Error("Error calculating the expression: " + error.message);
    }
  }

  private parseExpression(expression: string): number {
    const priorityOperators: Array<string> = [
      OperatorsEnum.TIMES,
      OperatorsEnum.DIVISION,
    ];
    const secondaryOperators: Array<string> = [
      OperatorsEnum.SUM,
      OperatorsEnum.SUBTRACTION,
    ];

    const numbers: number[] = [];
    const operators: string[] = [];
    let currentNumber = "";

    for (let i = 0; i < expression.length; i++) {
      const char = expression.charAt(i);

      if (/[0-9.]/.test(char)) {
        currentNumber += char;
      } else if (/[+\-*/]/.test(char)) {
        if (currentNumber !== "") {
          numbers.push(parseFloat(currentNumber));
          currentNumber = "";
        }

        if (priorityOperators.includes(char)) {
          while (
            operators.length > 0 &&
            priorityOperators.includes(operators[operators.length - 1])
          ) {
            const operator = operators.pop()!;
            const b = numbers.pop()!;
            const a = numbers.pop()!;
            const operationResult = this.performOperation(a, b, operator);
            numbers.push(operationResult);
          }
        } else if (secondaryOperators.includes(char)) {
          while (operators.length > 0) {
            const operator = operators.pop()!;
            const b = numbers.pop()!;
            const a = numbers.pop()!;
            const operationResult = this.performOperation(a, b, operator);
            numbers.push(operationResult);
          }
        }

        operators.push(char);
      } else if (char === " ") {
        continue;
      } else {
        throw new Error("Invalid character in expression");
      }
    }

    if (currentNumber !== "") {
      numbers.push(parseFloat(currentNumber));
    }

    while (operators.length > 0) {
      const operator = operators.pop()!;
      const b = numbers.pop()!;
      const a = numbers.pop()!;
      const operationResult = this.performOperation(a, b, operator);
      numbers.push(operationResult);
    }

    return numbers[0];
  }

  private performOperation(a: number, b: number, operator: string): number {
    switch (operator) {
      case OperatorsEnum.SUM:
        return a + b;
      case OperatorsEnum.SUBTRACTION:
        return a - b;
      case OperatorsEnum.TIMES:
        return a * b;
      case OperatorsEnum.DIVISION:
        if (b === 0) {
          throw new Error("Division by zero");
        }
        return a / b;
      default:
        throw new Error("Invalid operator: " + operator);
    }
  }
}

export { Cpu };
