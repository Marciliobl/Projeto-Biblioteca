const readline = require("readline");
const Livro = require("./Livro");
const Filme = require("./Filme");
const Usuario = require("./Usuario");
const Biblioteca = require("./Biblioteca");
const Locadora = require("./Locadora");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const biblioteca = new Biblioteca();
const locadora = new Locadora();
const usuarios = [];


function normalizeString(str) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

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
0 - Sair
`);
    rl.question("Escolha uma opção: ", opcao => {
        switch (opcao) {
            case "1":
                rl.question("Título do livro: ", titulo => {
                    rl.question("Autor: ", autor => {
                        biblioteca.adicionarLivro(new Livro(titulo, autor));
                        menu();
                    });
                });
                break;

            case "2":
                rl.question("Título do filme: ", titulo => {
                    rl.question("Diretor: ", diretor => {
                        locadora.adicionarFilme(new Filme(titulo, diretor));
                        menu();
                    });
                });
                break;

            case "3":
                rl.question("Nome do usuário: ", nome => {
                    usuarios.push(new Usuario(nome));
                    console.log(`👤 Usuário ${nome} cadastrado.`);
                    menu();
                });
                break;

            case "4":
                biblioteca.listarLivros();
                menu();
                break;

            case "5":
                locadora.listarFilmes();
                menu();
                break;

            case "6": // Emprestar
                rl.question("Nome do usuário: ", nome => {
                    const usuario = usuarios.find(u => normalizeString(u.nome) === normalizeString(nome));
                    if (!usuario) {
                        console.log("Usuário não encontrado.");
                        return menu();
                    }
                    rl.question("Digite L para Livro ou F para Filme: ", tipo => {
                        if (tipo.toUpperCase() === "L") {
                            rl.question("Título do livro: ", titulo => {
                                const livro = biblioteca.livros.find(
                                    l => normalizeString(l.titulo) === normalizeString(titulo)
                                );
                                if (livro) usuario.pegarItem(livro);
                                else console.log("Livro não encontrado.");
                                menu();
                            });
                        } else {
                            rl.question("Título do filme: ", titulo => {
                                const filme = locadora.filmes.find(
                                    f => normalizeString(f.titulo) === normalizeString(titulo)
                                );
                                if (filme) usuario.pegarItem(filme);
                                else console.log("Filme não encontrado.");
                                menu();
                            });
                        }
                    });
                });
                break;

            case "7": // Devolver
                rl.question("Nome do usuário: ", nome => {
                    const usuario = usuarios.find(u => normalizeString(u.nome) === normalizeString(nome));
                    if (!usuario) {
                        console.log("Usuário não encontrado.");
                        return menu();
                    }
                    rl.question("Digite L para Livro ou F para Filme: ", tipo => {
                        if (tipo.toUpperCase() === "L") {
                            rl.question("Título do livro: ", titulo => {
                                const livro = biblioteca.livros.find(
                                    l => normalizeString(l.titulo) === normalizeString(titulo)
                                );
                                if (livro) usuario.devolverItem(livro);
                                else console.log("Livro não encontrado.");
                                menu();
                            });
                        } else {
                            rl.question("Título do filme: ", titulo => {
                                const filme = locadora.filmes.find(
                                    f => normalizeString(f.titulo) === normalizeString(titulo)
                                );
                                if (filme) usuario.devolverItem(filme);
                                else console.log("Filme não encontrado.");
                                menu();
                            });
                        }
                    });
                });
                break;

            case "8":
                rl.question("Nome do usuário: ", nome => {
                    const usuario = usuarios.find(u => normalizeString(u.nome) === normalizeString(nome));
                    if (usuario) usuario.listarItens();
                    else console.log("Usuário não encontrado.");
                    menu();
                });
                break;

            case "0":
                console.log("👋 Saindo...");
                rl.close();
                break;

            default:
                console.log("❌ Opção inválida.");
                menu();
        }
    });
}

menu();
