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
    let resultado = 0;
    let operador = "+";
    let numero = "";

    for (let i = 0; i < expressao.length; i++) {
      const char = expressao.charAt(i);

      if (/[0-9]/.test(char)) {
        numero += char;
      } else if (/[+\-*/]/.test(char)) {
        operador = char;
      } else if (char === " ") {
        continue;
      } else {
        throw new Error("Caractere inválido na expressão");
      }

      if (/[+\-*/]/.test(char) || i === expressao.length - 1) {
        const valor = parseInt(numero);
        if (isNaN(valor)) {
          throw new Error("Número inválido na expressão");
        }

        if (operador === "+") {
          resultado += valor;
        } else if (operador === "-") {
          resultado -= valor;
        } else if (operador === "*") {
          resultado *= valor;
        } else if (operador === "/") {
          resultado /= valor;
        }

        operador = "+";
        numero = "";
      }
    }

    return resultado;
  }
}

export { Cpu };
