const fs = require("fs");
const readline = require("readline");

const Livro = require("./Livro");
const Filme = require("./Filme");
const Usuario = require("./Usuario");
const Biblioteca = require("./Biblioteca");
const Locadora = require("./Locadora");

// ================== Helpers ==================
function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function carregarDados(arquivo) {
  if (!fs.existsSync(arquivo)) return [];
  return JSON.parse(fs.readFileSync(arquivo, "utf8"));
}

function salvarDados(arquivo, dados) {
  fs.writeFileSync(arquivo, JSON.stringify(dados, null, 2));
}

// ================== Inicialização ==================
const biblioteca = new Biblioteca();
const locadora = new Locadora();
const usuarios = [];

carregarDados("livros.json").forEach(
  (l) => biblioteca.adicionarLivro(new Livro(l.titulo, l.autor))
);
carregarDados("filmes.json").forEach(
  (f) => locadora.adicionarFilme(new Filme(f.titulo, f.diretor))
);
carregarDados("usuarios.json").forEach((u) => usuarios.push(new Usuario(u.nome)));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function menu() {
  console.log(`
==== MENU ====
1 - Adicionar Livro
2 - Adicionar Filme
3 - Cadastrar Usuário
4 - Listar Livros
5 - Listar Filmes
6 - Emprestar Item
7 - Devolver Item
8 - Listar Itens de Usuário
9 - Listar Usuários
0 - Sair
`);

  rl.question("Escolha uma opção: ", (opcao) => {
    switch (opcao) {
      case "1": adicionarLivro(); break;
      case "2": adicionarFilme(); break;
      case "3": cadastrarUsuario(); break;
      case "4": biblioteca.listarLivros(); return menu();
      case "5": locadora.listarFilmes(); return menu();
      case "6": emprestarItem(); break;
      case "7": devolverItem(); break;
      case "8": listarItensUsuario(); break;
      case "9": listarUsuarios(); break;
      case "0":
        salvarDados("livros.json", biblioteca.livros);
        salvarDados("filmes.json", locadora.filmes);
        salvarDados("usuarios.json", usuarios.map(u => ({nome: u.nome})));
        console.log("👋 Programa encerrado.");
        rl.close();
        break;
      default:
        console.log("❌ Opção inválida.");
        menu();
    }
  });
}



function adicionarLivro() {
  rl.question("Título do livro (0 para voltar ao menu): ", (titulo) => {
    if (titulo === "0") return menu();
    rl.question("Autor do livro (0 para voltar ao menu): ", (autor) => {
      if (autor === "0") return menu();
      const livro = new Livro(titulo, autor);
      biblioteca.adicionarLivro(livro);
      salvarDados("livros.json", [...biblioteca.livros]);
      console.log(`📚 Livro "${titulo}" adicionado.`);
      menu();
    });
  });
}

function adicionarFilme() {
  rl.question("Título do filme (0 para voltar ao menu): ", (titulo) => {
    if (titulo === "0") return menu();
    rl.question("Diretor do filme (0 para voltar ao menu): ", (diretor) => {
      if (diretor === "0") return menu();
      const filme = new Filme(titulo, diretor);
      locadora.adicionarFilme(filme);
      salvarDados("filmes.json", [...locadora.filmes]);
      console.log(`🎬 Filme "${titulo}" adicionado.`);
      menu();
    });
  });
}

function cadastrarUsuario() {
  rl.question("Nome do usuário (0 para voltar ao menu): ", (nome) => {
    if (nome === "0") return menu();
    const usuario = new Usuario(nome);
    usuarios.push(usuario);
    salvarDados("usuarios.json", usuarios.map(u => ({nome: u.nome})));
    console.log(`👤 Usuário ${nome} cadastrado.`);
    menu();
  });
}

function listarUsuarios() {
  console.log("\n📋 Lista de Usuários:");
  if (usuarios.length === 0) console.log("Nenhum usuário cadastrado.");
  else usuarios.forEach((u, i) => console.log(`${i + 1}. ${u.nome}`));
  menu();
}

function emprestarItem() {
  rl.question("Nome do usuário (0 para voltar ao menu): ", (nome) => {
    if (nome === "0") return menu();
    const usuario = usuarios.find(u => normalizar(u.nome) === normalizar(nome));
    if (!usuario) { console.log("❌ Usuário não encontrado."); return menu(); }

    function escolherTipo() {
      rl.question("Digite L para Livro / F para Filmes ou ( 0 para voltar ao menu): ", (tipo) => {
        if (tipo === "0") return menu();
        if (tipo.toUpperCase() === "L") {
          rl.question("Título do livro: ", (titulo) => {
            const livro = biblioteca.buscarLivro(normalizar(titulo));
            if (livro) usuario.pegarItem(livro);
            else console.log("❌ Livro não encontrado.");
            menu();
          });
        } else if (tipo.toUpperCase() === "F") {
          rl.question("Título do filme: ", (titulo) => {
            const filme = locadora.buscarFilme(normalizar(titulo));
            if (filme) usuario.pegarItem(filme);
            else console.log("❌ Filme não encontrado.");
            menu();
          });
        } else {
          console.log("❌ Digite apenas L ou F.");
          escolherTipo();
        }
      });
    }
    escolherTipo();
  });
}

function devolverItem() {
  rl.question("Nome do usuário (0 para voltar ao menu): ", (nome) => {
    if (nome === "0") return menu();
    const usuario = usuarios.find(u => normalizar(u.nome) === normalizar(nome));
    if (!usuario) { console.log("❌ Usuário não encontrado."); return menu(); }

    function escolherTipo() {
      rl.question("Digite L para Livro / F para Filme ou (0 para voltar ao menu): ", (tipo) => {
        if (tipo === "0") return menu();
        if (tipo.toUpperCase() === "L") {
          rl.question("Título do livro: ", (titulo) => {
            const livro = biblioteca.buscarLivro(normalizar(titulo));
            if (livro) usuario.devolverItem(livro);
            else console.log("❌ Livro não encontrado.");
            menu();
          });
        } else if (tipo.toUpperCase() === "F") {
          rl.question("Título do filme: ", (titulo) => {
            const filme = locadora.buscarFilme(normalizar(titulo));
            if (filme) usuario.devolverItem(filme);
            else console.log("❌ Filme não encontrado.");
            menu();
          });
        } else {
          console.log("❌ Digite apenas L ou F.");
          escolherTipo();
        }
      });
    }
    escolherTipo();
  });
}

function listarItensUsuario() {
  rl.question("Nome do usuário (0 para voltar ao menu): ", (nome) => {
    if (nome === "0") return menu();
    const usuario = usuarios.find(u => normalizar(u.nome) === normalizar(nome));
    if (usuario) usuario.listarItens();
    else console.log("❌ Usuário não encontrado.");
    menu();
  });
}


menu();
