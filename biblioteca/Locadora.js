class Locadora {
  constructor() {
    this.filmes = [];
  }

  adicionarFilme(filme) {
    this.filmes.push(filme);
  }

  listarFilmes() {
    console.log("🎬 Lista de Filmes:");
    if (this.filmes.length === 0) {
      console.log("Nenhum filme cadastrado.");
    } else {
      this.filmes.forEach((filme) =>
        console.log(
          `- ${filme.titulo} | Diretor: ${filme.diretor} | ${
            filme.emprestado ? "❌ Emprestado" : "✅ Disponível"
          }`
        )
      );
    }
  }

  buscarFilme(tituloNormalizado) {
    return this.filmes.find(
      (filme) => this.normalizar(filme.titulo) === tituloNormalizado
    );
  }

  normalizar(texto) {
    return texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }
}

module.exports = Locadora;
