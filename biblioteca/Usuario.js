class Usuario {
  constructor(nome) {
    this.nome = nome;
    this.itensEmprestados = [];
  }

  pegarItem(item) {
    if (this.itensEmprestados.length >= 3) {
      console.log(`⚠️ Usuário ${this.nome} já possui 3 itens emprestados.`);
      return;
    }

    if (!item.emprestado) {
      item.emprestar();
      this.itensEmprestados.push(item);
    } else {
      console.log(`❌ O item "${item.titulo}" já está emprestado.`);
    }
  }

  devolverItem(item) {
    const index = this.itensEmprestados.indexOf(item);
    if (index !== -1) {
      item.devolver();
      this.itensEmprestados.splice(index, 1);
    } else {
      console.log(`❌ ${this.nome} não possui o item "${item.titulo}".`);
    }
  }

  listarItens() {
    console.log(`📋 Itens emprestados para ${this.nome}:`);
    if (this.itensEmprestados.length === 0) {
      console.log("Nenhum item emprestado.");
    } else {
      this.itensEmprestados.forEach((item) =>
        console.log(`- ${item.titulo} (${item.constructor.name})`)
      );
    }
  }
}

module.exports = Usuario;
