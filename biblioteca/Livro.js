class Livro {
    constructor(titulo, autor) {
        this.titulo = titulo;
        this.autor = autor;
        this.emprestado = false;
    }

    emprestar() {
        if (!this.emprestado) {
            this.emprestado = true;
            console.log(`📚 O livro "${this.titulo}" foi emprestado.`);
        } else {
            console.log(`⚠️ O livro "${this.titulo}" já está emprestado.`);
        }
    }

    devolver() {
        if (this.emprestado) {
            this.emprestado = false;
            console.log(`✅ O livro "${this.titulo}" foi devolvido.`);
        } else {
            console.log(`⚠️ O livro "${this.titulo}" não estava emprestado.`);
        }
    }
}

module.exports = Livro;
