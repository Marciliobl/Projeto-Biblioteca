class Locadora {
    constructor() {
        this.filmes = [];
    }

    adicionarFilme(filme) {
        this.filmes.push(filme);
        console.log(`🎬 Filme "${filme.titulo}" adicionado à locadora.`);
    }

    listarFilmes() {
        console.log("🎥 Lista de filmes na locadora:");
        if (this.filmes.length === 0) {
            console.log("Nenhum filme cadastrado.");
        } else {
            this.filmes.forEach(f => {
                console.log(`- ${f.titulo} (${f.emprestado ? "Emprestado" : "Disponível"})`);
            });
        }
    }

    buscarFilme(titulo) {
        return this.filmes.find(f => f.titulo.toLowerCase() === titulo.toLowerCase());
    }
}

module.exports = Locadora;
