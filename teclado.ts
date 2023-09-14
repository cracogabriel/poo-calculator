import Botao from "./botao";

class Teclado {
  private botoes: Botao[];

  constructor() {
    this.botoes = [];
  }

  adicionarBotao(botao: Botao) {
    this.botoes.push(botao);
  }

  pressionarBotao(valor: string): string {
    for (const botao of this.botoes) {
      if (botao.obterValor() === valor) {
        return botao.obterValor();
      }
    }
    throw new Error("Botão não encontrado");
  }
}

export { Teclado };
