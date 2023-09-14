import { Teclado } from "./teclado";
import { Tela } from "./tela";
import { Cpu } from "./cpu";
import Botao from "./botao";

class Calculadora {
  private teclado: Teclado;
  private tela: Tela;
  private cpu: Cpu;
  private expressao: string = "";

  constructor() {
    this.teclado = new Teclado();
    this.tela = new Tela();
    this.cpu = new Cpu();
    this.configurarBotoes();
  }

  private configurarBotoes() {
    // Adicione os botões à calculadora
    this.teclado.adicionarBotao(new Botao("0"));
    this.teclado.adicionarBotao(new Botao("1"));
    this.teclado.adicionarBotao(new Botao("2"));
    this.teclado.adicionarBotao(new Botao("3"));
    this.teclado.adicionarBotao(new Botao("4"));
    this.teclado.adicionarBotao(new Botao("5"));
    this.teclado.adicionarBotao(new Botao("6"));
    this.teclado.adicionarBotao(new Botao("7"));
    this.teclado.adicionarBotao(new Botao("8"));
    this.teclado.adicionarBotao(new Botao("9"));
    this.teclado.adicionarBotao(new Botao("+"));
    this.teclado.adicionarBotao(new Botao("-"));
    this.teclado.adicionarBotao(new Botao("*"));
    this.teclado.adicionarBotao(new Botao("/"));
    this.teclado.adicionarBotao(new Botao("="));
    this.teclado.adicionarBotao(new Botao("C"));
  }

  realizarCalculo() {
    try {
      const resultado = this.cpu.calcularExpressao(this.expressao);
      this.tela.exibirResultado(resultado.toString());
      this.expressao = resultado.toString();
    } catch (error) {
      this.tela.exibirResultado("Erro");
    }
  }

  pressionarBotao(valor: string) {
    if (valor === "=") {
      this.realizarCalculo();
    } else if (valor === "C") {
      this.expressao = "";
      this.tela.limparTela();
    } else {
      this.expressao += this.teclado.pressionarBotao(valor);
    }
  }
}

export { Calculadora };
