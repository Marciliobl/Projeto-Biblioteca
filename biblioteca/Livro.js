class Livro {
  constructor(titulo, autor) {
    this.titulo = titulo;
    this.autor = autor;
    this.emprestado = false;
  }

  emprestar() {
    if (!this.emprestado) {
      this.emprestado = true;
      console.log(`📚 Livro "${this.titulo}" emprestado.`);
    } else {
      console.log(`❌ O livro "${this.titulo}" já está emprestado.`);
    }
  }

  devolver() {
    if (this.emprestado) {
      this.emprestado = false;
      console.log(`✅ Livro "${this.titulo}" devolvido.`);
    } else {
      console.log(`❌ O livro "${this.titulo}" não estava emprestado.`);
    }
  }
}

module.exports = Livro;
