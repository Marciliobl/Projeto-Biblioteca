class Biblioteca {
  constructor() {
    this.livros = [];
  }

  adicionarLivro(livro) {
    this.livros.push(livro);
  }

  listarLivros() {
    console.log("📚 Lista de Livros:");
    if (this.livros.length === 0) {
      console.log("Nenhum livro cadastrado.");
    } else {
      this.livros.forEach((livro) =>
        console.log(
          `- ${livro.titulo} | Autor: ${livro.autor} | ${
            livro.emprestado ? "❌ Emprestado" : "✅ Disponível"
          }`
        )
      );
    }
  }

  buscarLivro(tituloNormalizado) {
    return this.livros.find(
      (livro) => this.normalizar(livro.titulo) === tituloNormalizado
    );
  }

  normalizar(texto) {
    return texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }
}

module.exports = Biblioteca;
