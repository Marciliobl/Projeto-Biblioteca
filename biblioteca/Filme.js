class Filme {
  constructor(titulo, diretor) {
    this.titulo = titulo;
    this.diretor = diretor;
    this.emprestado = false;
  }

  emprestar() {
    if (!this.emprestado) {
      this.emprestado = true;
      console.log(`🎬 Filme "${this.titulo}" emprestado.`);
    } else {
      console.log(`❌ O filme "${this.titulo}" já está emprestado.`);
    }
  }

  devolver() {
    if (this.emprestado) {
      this.emprestado = false;
      console.log(`✅ Filme "${this.titulo}" devolvido.`);
    } else {
      console.log(`❌ O filme "${this.titulo}" não estava emprestado.`);
    }
  }
}

module.exports = Filme;
