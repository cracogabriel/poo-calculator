class Cpu {
  calcularExpressao(expressao: string): number {
    try {
      const resultado = this.analisarExpressao(expressao);
      return resultado;
    } catch (error: any) {
      throw new Error("Erro ao calcular a expressão: " + error.message);
    }
  }

  private analisarExpressao(expressao: string): number {
    const operadoresPrioritarios = ["*", "/"];
    const operadoresSecundarios = ["+", "-"];

    const numeros: number[] = [];
    const operadores: string[] = [];
    let numeroAtual = "";

    for (let i = 0; i < expressao.length; i++) {
      const char = expressao.charAt(i);

      if (/[0-9.]/.test(char)) {
        numeroAtual += char;
      } else if (/[+\-*/]/.test(char)) {
        if (numeroAtual !== "") {
          numeros.push(parseFloat(numeroAtual));
          numeroAtual = "";
        }

        if (operadoresPrioritarios.includes(char)) {
          while (
            operadores.length > 0 &&
            operadoresPrioritarios.includes(operadores[operadores.length - 1])
          ) {
            const operador = operadores.pop()!;
            const b = numeros.pop()!;
            const a = numeros.pop()!;
            const resultadoOperacao = this.executarOperacao(a, b, operador);
            numeros.push(resultadoOperacao);
          }
        } else if (operadoresSecundarios.includes(char)) {
          while (operadores.length > 0) {
            const operador = operadores.pop()!;
            const b = numeros.pop()!;
            const a = numeros.pop()!;
            const resultadoOperacao = this.executarOperacao(a, b, operador);
            numeros.push(resultadoOperacao);
          }
        }

        operadores.push(char);
      } else if (char === " ") {
        continue;
      } else {
        throw new Error("Caractere inválido na expressão");
      }
    }

    if (numeroAtual !== "") {
      numeros.push(parseFloat(numeroAtual));
    }

    while (operadores.length > 0) {
      const operador = operadores.pop()!;
      const b = numeros.pop()!;
      const a = numeros.pop()!;
      const resultadoOperacao = this.executarOperacao(a, b, operador);
      numeros.push(resultadoOperacao);
    }

    return numeros[0];
  }

  private executarOperacao(a: number, b: number, operador: string): number {
    switch (operador) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        if (b === 0) {
          throw new Error("Divisão por zero");
        }
        return a / b;
      default:
        throw new Error("Operador inválido: " + operador);
    }
  }
}

export { Cpu };
