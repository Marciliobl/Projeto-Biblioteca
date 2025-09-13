class Biblioteca {
    constructor() {
        this.livros = [];
    }

    adicionarLivro(livro) {
        this.livros.push(livro);
        console.log(`📚 Livro "${livro.titulo}" adicionado à biblioteca.`);
    }

    listarLivros() {
        console.log("📖 Lista de livros na biblioteca:");
        if (this.livros.length === 0) {
            console.log("Nenhum livro cadastrado.");
        } else {
            this.livros.forEach(l => {
                console.log(`- ${l.titulo} (${l.emprestado ? "Emprestado" : "Disponível"})`);
            });
        }
    }

    buscarLivro(titulo) {
        return this.livros.find(l => l.titulo.toLowerCase() === titulo.toLowerCase());
    }
}

module.exports = Biblioteca;
