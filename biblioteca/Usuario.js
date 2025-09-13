class Usuario {
    constructor(nome) {
        this.nome = nome;
        this.itensEmprestados = [];
    }

    pegarItem(item) {
        if (this.itensEmprestados.includes(item)) {
            console.log(`⚠️ ${this.nome} já pegou "${item.titulo}".`);
            return;
        }

        if (this.itensEmprestados.length >= 3) {
            console.log(`❌ ${this.nome} já atingiu o limite de 3 itens.`);
            return;
        }

        if (!item.emprestado) {
            item.emprestar();
            this.itensEmprestados.push(item);
        } else {
            console.log(`⚠️ "${item.titulo}" não está disponível.`);
        }
    }

    devolverItem(item) {
        const index = this.itensEmprestados.indexOf(item);
        if (index !== -1) {
            item.devolver();
            this.itensEmprestados.splice(index, 1);
        } else {
            console.log(`⚠️ ${this.nome} não possui "${item.titulo}".`);
        }
    }

    listarItens() {
        console.log(`📦 Itens emprestados por ${this.nome}:`);
        if (this.itensEmprestados.length === 0) {
            console.log("Nenhum item emprestado.");
        } else {
            this.itensEmprestados.forEach(i => {
                console.log(`- ${i.titulo}`);
            });
        }
    }
}

module.exports = Usuario;
