# Portal de Conhecimento Engebag

Front-end do portal interno da Engebag, construído com React, TypeScript, TanStack Start e Tailwind CSS.

## Pré-requisitos

- Node.js 20 ou superior. O projeto foi validado com Node.js 22.
- npm 10 ou superior, incluído nas versões atuais do Node.js.

## Depois de baixar o projeto

Abra um terminal na pasta raiz do projeto e execute:

```sh
cd front-end
npm install
npm run dev
```

Depois, abra o endereço mostrado no terminal, normalmente `http://localhost:3000`.

O Vite atualiza a aplicação automaticamente quando arquivos dentro de `src/` são alterados.

## Fluxo atual

O dashboard inicial está temporariamente desativado. A aplicação utiliza este fluxo:

```text
/login -> /base-conhecimento
```

- `/login`: tela de login e cadastro visual. A autenticação ainda não está conectada ao backend.
- `/base-conhecimento`: módulo com busca, categorias, subcategorias, artigos e suporte via WhatsApp.
- `/`: redireciona para `/login` enquanto o dashboard estiver em stand-by.

## Comandos úteis

Execute os comandos a partir de `front-end/`:

```sh
npm run dev       # inicia o servidor de desenvolvimento
npm run build     # gera a versão de produção em .output/
npm run preview   # executa a versão de produção localmente
npm run lint      # verifica problemas de código
npm run format    # formata os arquivos com Prettier
```

## Estrutura principal

```text
front-end/
├── src/
│   ├── components/              # componentes reutilizáveis
│   ├── routes/
│   │   ├── login.tsx             # login e cadastro visual
│   │   ├── base-conhecimento.tsx # módulo da Base de Conhecimento
│   │   └── index.tsx             # dashboard em stand-by
│   ├── styles.css                # tokens visuais e estilos globais
│   └── routeTree.gen.ts          # gerado automaticamente pelo TanStack Router
├── package.json                  # dependências e scripts do front-end
└── package-lock.json
```

## Dependências do projeto

Este é um projeto Node.js, portanto não utiliza `requirements.txt`. As dependências ficam declaradas em:

- `front-end/package.json` e `front-end/package-lock.json`;
- `back-end/package.json` e `back-end/package-lock.json`.

O backend ainda está em preparação e não deve ser iniciado como parte do fluxo atual. Quando a API for implementada, sua documentação de execução será adicionada aqui.

## Próximos passos

- Implementar a API de autenticação;
- Conectar login e cadastro ao PostgreSQL;
- Proteger o módulo da Base de Conhecimento com sessão autenticada;
- Substituir dados mockados por dados da API;
- Reativar o dashboard quando os módulos adicionais estiverem disponíveis.

## Tecnologias

- React 19
- TypeScript
- TanStack Start e TanStack Router
- Tailwind CSS 4
- Vite
- Lucide React
