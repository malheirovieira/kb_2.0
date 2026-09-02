# Base de Conhecimento — Engebag

Front-end pronto (visual + interações) da Base de Conhecimento, gerado originalmente no
[Lovable](https://lovable.dev) e ajustado para rodar localmente no VS Code.

## Como rodar no VS Code

Pré-requisitos: [Node.js](https://nodejs.org) 20 ou superior (o projeto foi testado com Node 22).

1. Abra a pasta do projeto no VS Code (`File > Open Folder...`).
2. Abra um terminal integrado (`Terminal > New Terminal`) e instale as dependências:

   ```sh
   npm install
   ```

3. Rode o servidor de desenvolvimento:

   ```sh
   npm run dev
   ```

4. Abra o endereço que aparecer no terminal (algo como `http://localhost:3000`) no navegador.

Qualquer alteração salva em arquivos dentro de `src/` atualiza a página automaticamente (hot reload).

### Outros comandos úteis

```sh
npm run build     # gera a versão de produção em .output/
npm run preview   # roda localmente a versão de produção já buildada
npm run lint      # checa problemas de código
npm run format    # formata o código com Prettier
```

## O que já está funcionando no front-end

- Abrir/fechar o menu lateral (botão de seta ao lado da busca).
- Expandir categorias e subcategorias no menu lateral.
- Abrir um artigo em aba (empilhando várias abas) e fechar cada aba pelo `X`.
- Busca com `Ctrl + K` (ou `Cmd + K` no Mac): foca automaticamente o campo de busca de
  qualquer lugar da tela, e digitar filtra os artigos existentes em tempo real, com um
  dropdown de resultados clicáveis.
- Cards de categorias na home, com contagem de artigos.

## Próximo passo: o back-end

Hoje todo o conteúdo (categorias, subcategorias e artigos) é uma lista fixa dentro de
`src/routes/index.tsx` (constantes `menu` e `categories`), e o texto de cada artigo é um
placeholder genérico. Para ligar isso a dados reais, os pontos de entrada são:

- `menu` / `categories` em `src/routes/index.tsx`: hoje mockados, no futuro devem vir de uma
  API/banco de dados.
- O corpo do artigo (dentro do bloco `<article>`): hoje é um texto fixo, deve virar o
  conteúdo real vindo do back-end.
- O contador "X artigos" de cada categoria: hoje é um número fixo, deve refletir a contagem
  real.

O projeto já usa `@tanstack/react-query`, então a forma mais natural de conectar dados reais
é criando hooks de busca (`useQuery`) que substituem essas constantes.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
