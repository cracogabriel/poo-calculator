class Cpu {
  calcularExpressao(expressao: string): number {
    try {
      const resultado = eval(expressao);
      if (isNaN(resultado)) {
        throw new Error("Expressão inválida");
      }
      return resultado;
    } catch (error: any) {
      throw new Error("Erro ao calcular a expressão: " + error.message);
    }
  }
}

export { Cpu };
