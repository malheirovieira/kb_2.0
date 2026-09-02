import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  BookOpen,
  HelpCircle,
  UserCircle2,
  ChevronDown,
  ChevronRight,
  Building2,
  Settings,
  FileText,
  Code2,
  Share2,
  Database,
  MessageCircle,
  User,
  Settings2,
  LogOut,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import heroImage from "@/assets/hero-kb.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Base de Conhecimento | Engebag TI" },
      {
        name: "description",
        content:
          "Central de conhecimento da Engebag: artigos, procedimentos e documentos de TI organizados por categoria.",
      },
      { property: "og:title", content: "Base de Conhecimento | Engebag TI" },
      {
        property: "og:description",
        content:
          "Pesquise artigos, procedimentos e documentos da Central de Conhecimento da empresa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Sub = { label: string; articles: string[] };
type Cat = { label: string; icon: typeof Building2; subs: Sub[] };

const menu: Cat[] = [
  {
    label: "Administrativo",
    icon: Building2,
    subs: [
      { label: "Comercial", articles: ["Política de descontos", "Emissão de propostas"] },
      { label: "Compras", articles: ["Solicitação de compras", "Homologação de fornecedores"] },
      { label: "Financeiro", articles: ["Reembolso de despesas", "Fluxo de pagamentos"] },
      {
        label: "Recursos Humanos",
        articles: ["Admissão de colaboradores", "Solicitação de férias"],
      },
      {
        label: "Tecnologia da Informação",
        articles: ["Solicitação de acessos", "Política de senhas"],
      },
    ],
  },
  {
    label: "Operacional",
    icon: Settings,
    subs: [
      { label: "Expedição", articles: ["Conferência de cargas", "Emissão de romaneio"] },
      { label: "Produção", articles: ["Apontamento de produção", "Setup de máquinas"] },
      { label: "Qualidade", articles: ["Inspeção de recebimento", "Registro de não conformidade"] },
    ],
  },
  {
    label: "Procedimentos",
    icon: FileText,
    subs: [
      {
        label: "Suporte Técnico",
        articles: [
          "Guia de Abertura de Chamados - Suporte Técnico",
          "Padrão para Solicitação e Parametrização de Acessos (Novos Colaboradores e Movimentações Internas)",
          "Quando se deve Acionar o Suporte de TI?",
        ],
      },
      { label: "POPs", articles: ["Modelo de POP", "Revisão de procedimentos"] },
    ],
  },
  {
    label: "Programas",
    icon: Code2,
    subs: [
      {
        label: "Spark",
        articles: ['O Spark "Não Quer Abrir" ou Não Aparece na Tela', "Configuração de conta"],
      },
      { label: "Office 365", articles: ["Instalação do pacote", "Recuperar arquivo no OneDrive"] },
      { label: "TOTVS", articles: ["Primeiro acesso", "Erros comuns de login"] },
    ],
  },
  {
    label: "Rede",
    icon: Share2,
    subs: [
      { label: "Servidores", articles: ["Mapeamento de pastas", "Política de backup"] },
      { label: "Impressoras", articles: ["Instalar impressora de rede", "Erros de digitalização"] },
      { label: "Acessos e VPN", articles: ["Configurar VPN", "Solicitar acesso remoto"] },
    ],
  },
  {
    label: "RM",
    icon: Database,
    subs: [
      { label: "Cadastros", articles: ["Cadastro de clientes", "Cadastro de produtos"] },
      { label: "Relatórios", articles: ["Gerar relatório gerencial", "Exportar para Excel"] },
    ],
  },
];

const categories = [
  {
    title: "Administrativo",
    description: "Documentos e informações da área administrativa.",
    articles: 124,
    icon: Building2,
    tint: "bg-tint-orange",
    ink: "text-ink-orange",
  },
  {
    title: "Operacional",
    description: "Processos e rotinas das atividades operacionais.",
    articles: 256,
    icon: Settings,
    tint: "bg-tint-green",
    ink: "text-ink-green",
  },
  {
    title: "Procedimentos",
    description: "Procedimentos e instruções passo a passo.",
    articles: 189,
    icon: FileText,
    tint: "bg-tint-violet",
    ink: "text-ink-violet",
  },
  {
    title: "Programas",
    description: "Documentação de sistemas e programas utilizados.",
    articles: 98,
    icon: Code2,
    tint: "bg-tint-blue",
    ink: "text-ink-blue",
  },
  {
    title: "Rede",
    description: "Informações sobre rede, servidores e acessos.",
    articles: 76,
    icon: Share2,
    tint: "bg-tint-cyan",
    ink: "text-ink-cyan",
  },
  {
    title: "RM",
    description: "Documentação e processos do sistema RM.",
    articles: 62,
    icon: Database,
    tint: "bg-tint-amber",
    ink: "text-ink-amber",
  },
];

type OpenArticle = { id: string; title: string; cat: string; sub: string };

type SearchHit = { cat: string; sub: string; title: string };

function Index() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openCat, setOpenCat] = useState<string | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [articles, setArticles] = useState<OpenArticle[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Índice plano de todos os artigos, para a busca funcionar de verdade.
  const searchIndex = useMemo<SearchHit[]>(
    () =>
      menu.flatMap((cat) =>
        cat.subs.flatMap((sub) =>
          sub.articles.map((title) => ({ cat: cat.label, sub: sub.label, title })),
        ),
      ),
    [],
  );

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchIndex
      .filter(
        (hit) =>
          hit.title.toLowerCase().includes(q) ||
          hit.cat.toLowerCase().includes(q) ||
          hit.sub.toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [query, searchIndex]);

  // Atalho global Ctrl+K / Cmd+K: foca a busca de qualquer lugar da página.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
      if (e.key === "Escape" && document.activeElement === searchInputRef.current) {
        searchInputRef.current?.blur();
        setQuery("");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const openArticle = (cat: string, sub: string, title: string) => {
    const id = `${cat}/${sub}/${title}`;
    setArticles((prev) =>
      prev.some((a) => a.id === id) ? prev : [...prev, { id, title, cat, sub }],
    );
    setActiveId(id);
    setQuery("");
    searchInputRef.current?.blur();
  };

  const closeArticle = (id: string) => {
    setArticles((prev) => {
      const next = prev.filter((a) => a.id !== id);
      setActiveId((cur) => (cur === id ? (next[next.length - 1]?.id ?? null) : cur));
      return next;
    });
  };

  const active = articles.find((a) => a.id === activeId) ?? null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header
        className="flex h-[72px] items-center justify-between px-6"
        style={{ background: "var(--gradient-header)" }}
      >
        <div className="flex items-center gap-3 text-primary-foreground">
          <BookOpen className="h-7 w-7" strokeWidth={1.8} />
          <span className="text-xl font-bold tracking-tight">Base de Conhecimento</span>
        </div>
        <nav className="flex items-center gap-7 text-primary-foreground">
          <button className="flex items-center gap-2 text-sm font-medium opacity-95 transition-opacity hover:opacity-100">
            <HelpCircle className="h-5 w-5" strokeWidth={1.8} />
            <span className="hidden sm:inline">Ajuda</span>
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-md text-sm font-medium outline-none transition-opacity hover:opacity-90 data-[state=open]:opacity-90">
              <UserCircle2 className="h-6 w-6" strokeWidth={1.8} />
              <span className="hidden sm:inline">Olá, Gabriel</span>
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="h-4 w-4" />
                Meu perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings2 className="h-4 w-4" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="h-4 w-4" />
                Ajuda e suporte
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <LogOut className="h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </header>

      <div className="flex min-h-[calc(100vh-72px)]">
        <aside
          className={`shrink-0 overflow-hidden border-r border-border bg-sidebar transition-[width,opacity] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
            sidebarOpen ? "w-[280px] pt-6 opacity-100" : "w-0 border-r-0 opacity-0"
          }`}
        >
          <ul className="w-[280px] px-3">
            {menu.map(({ label, icon: Icon, subs }) => {
              const isOpen = openCat === label;
              const dimmed = openCat !== null && !isOpen;
              return (
                <li
                  key={label}
                  className={`mb-1 overflow-hidden rounded-md transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? "bg-sidebar-accent ring-1 ring-primary/40" : ""
                  } ${dimmed ? "opacity-45" : "opacity-100"}`}
                >
                  <button
                    onClick={() => {
                      setOpenCat(isOpen ? null : label);
                      setOpenSub(null);
                    }}
                    aria-expanded={isOpen}
                    className={`flex w-full items-center gap-3 border-l-[3px] px-4 py-3 text-left text-[13px] font-semibold uppercase tracking-wide transition-colors duration-300 ${
                      isOpen
                        ? "border-primary text-primary"
                        : "border-transparent text-sidebar-foreground hover:bg-sidebar-accent/60"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 ${isOpen ? "text-primary" : "text-muted-foreground"}`}
                      strokeWidth={1.8}
                    />
                    <span className="flex-1">{label}</span>
                    <ChevronRight
                      className={`h-4 w-4 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen ? "rotate-90 text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <ul className="overflow-hidden">
                      {subs.map((sub) => {
                        const subOpen = openSub === `${label}/${sub.label}`;
                        return (
                          <li key={sub.label}>
                            <button
                              onClick={() => setOpenSub(subOpen ? null : `${label}/${sub.label}`)}
                              aria-expanded={subOpen}
                              className={`flex w-full items-center gap-2 border-t border-border/60 px-5 py-2.5 text-left text-[12px] font-semibold uppercase tracking-wide transition-colors duration-300 ${
                                subOpen
                                  ? "bg-tint-orange text-primary"
                                  : "text-sidebar-foreground hover:bg-sidebar-accent/60"
                              }`}
                            >
                              <span className="flex-1">{sub.label}</span>
                              <ChevronRight
                                className={`h-3.5 w-3.5 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
                                  subOpen ? "rotate-90 text-primary" : "text-muted-foreground"
                                }`}
                              />
                            </button>
                            <div
                              className={`grid transition-[grid-template-rows,opacity] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
                                subOpen
                                  ? "grid-rows-[1fr] opacity-100"
                                  : "grid-rows-[0fr] opacity-0"
                              }`}
                            >
                              <ul className="overflow-hidden">
                                {sub.articles.map((article) => {
                                  const isOpenArticle =
                                    activeId === `${label}/${sub.label}/${article}`;
                                  return (
                                    <li key={article}>
                                      <button
                                        onClick={() => openArticle(label, sub.label, article)}
                                        className={`block w-full px-6 py-2 text-left text-[11.5px] leading-snug transition-colors duration-200 hover:text-primary ${
                                          isOpenArticle
                                            ? "font-semibold text-primary"
                                            : "text-sidebar-foreground"
                                        }`}
                                      >
                                        {article}
                                      </button>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </aside>

        <main className="min-w-0 flex-1 px-6 py-6 transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] lg:px-8">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen((v) => !v)}
                aria-label={sidebarOpen ? "Fechar menu lateral" : "Abrir menu lateral"}
                aria-expanded={sidebarOpen}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-foreground shadow-[var(--shadow-card)] transition-colors hover:bg-secondary"
              >
                {sidebarOpen ? (
                  <ArrowLeft className="h-5 w-5" strokeWidth={1.8} />
                ) : (
                  <ArrowRight className="h-5 w-5" strokeWidth={1.8} />
                )}
              </button>
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
                  placeholder="Busque a sua pergunta ou palavra chave aqui..."
                  className="h-12 w-full rounded-xl border border-border bg-card pl-12 pr-24 text-sm text-foreground shadow-[var(--shadow-card)] outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/25"
                />
                {!query && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-border bg-secondary px-2 py-1 text-xs font-medium text-muted-foreground">
                    Ctrl + K
                  </span>
                )}

                {searchFocused && query.trim() && (
                  <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card-hover)]">
                    {searchResults.length > 0 ? (
                      <ul className="max-h-80 overflow-y-auto py-2">
                        {searchResults.map((hit) => (
                          <li key={`${hit.cat}/${hit.sub}/${hit.title}`}>
                            <button
                              onClick={() => openArticle(hit.cat, hit.sub, hit.title)}
                              className="flex w-full items-start gap-3 px-4 py-2.5 text-left transition-colors hover:bg-secondary"
                            >
                              <FileText
                                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                                strokeWidth={1.8}
                              />
                              <span className="min-w-0">
                                <span className="block truncate text-sm font-medium text-foreground">
                                  {hit.title}
                                </span>
                                <span className="block truncate text-xs text-muted-foreground">
                                  {hit.cat} · {hit.sub}
                                </span>
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="px-4 py-4 text-sm text-muted-foreground">
                        Nenhum artigo encontrado para "{query}".
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {active ? (
              <div
                key="reader"
                className="mt-6 [animation-duration:600ms] [animation-timing-function:cubic-bezier(0.22,1,0.36,1)] animate-fade-in"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 flex-1 items-end gap-1 overflow-x-auto">
                    {articles.map((a) => {
                      const isActive = a.id === active.id;
                      return (
                        <div
                          key={a.id}
                          onClick={() => setActiveId(a.id)}
                          className={`group flex max-w-[260px] shrink-0 cursor-pointer items-center gap-2 rounded-t-lg border border-b-0 px-4 py-2.5 text-[12.5px] transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
                            isActive
                              ? "border-border bg-card font-semibold text-primary shadow-[var(--shadow-card)]"
                              : "border-transparent bg-secondary text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <FileText className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} />
                          <span className="truncate">{a.title}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              closeArticle(a.id);
                            }}
                            aria-label={`Fechar ${a.title}`}
                            className="shrink-0 rounded p-0.5 text-muted-foreground transition-colors duration-300 hover:bg-border hover:text-destructive"
                          >
                            <X className="h-3.5 w-3.5" strokeWidth={2} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <span className="shrink-0 rounded-full bg-tint-orange px-3 py-1 text-xs font-semibold text-primary">
                    {articles.length} {articles.length === 1 ? "artigo aberto" : "artigos abertos"}
                  </span>
                </div>

                <section className="overflow-hidden rounded-xl rounded-tl-none border border-border bg-card shadow-[var(--shadow-card)]">
                  <div className="flex items-start justify-between gap-4 border-b border-border px-8 py-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {active.cat} · {active.sub}
                      </p>
                      <h1 className="mt-2 text-2xl font-bold text-primary">{active.title}</h1>
                    </div>
                    <button
                      onClick={() => closeArticle(active.id)}
                      aria-label="Fechar artigo"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors duration-300 hover:bg-secondary hover:text-destructive"
                    >
                      <X className="h-4 w-4" strokeWidth={2} />
                    </button>
                  </div>
                  <article
                    key={active.id}
                    className="space-y-4 px-8 py-8 text-[15px] leading-7 text-foreground/80 [animation-duration:500ms] animate-fade-in"
                  >
                    <p>
                      Este artigo faz parte da categoria <strong>{active.cat}</strong>, subcategoria{" "}
                      <strong>{active.sub}</strong>.
                    </p>
                    <p>
                      Conteúdo do procedimento ainda não cadastrado. Assim que o texto oficial for
                      publicado pela equipe de TI, ele aparecerá aqui com o passo a passo completo,
                      imagens e links relacionados.
                    </p>
                    <p>
                      Utilize o menu lateral para abrir outros artigos — eles ficam empilhados em
                      abas acima e podem ser fechados no ícone de X.
                    </p>
                  </article>
                </section>
              </div>
            ) : (
              <div
                key="home"
                className="[animation-duration:600ms] [animation-timing-function:cubic-bezier(0.22,1,0.36,1)] animate-fade-in"
              >
                <section className="mt-6 overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
                  <div className="flex flex-col items-center gap-6 px-10 py-10 md:flex-row md:justify-between">
                    <div className="max-w-xl">
                      <h1 className="text-3xl font-bold text-primary md:text-[34px]">
                        Base de Conhecimento
                      </h1>
                      <p className="mt-4 text-[15px] leading-7 text-foreground/80">
                        Bem-vindo à Central de Conhecimento da empresa.
                        <br />
                        Utilize a barra de pesquisa ou navegue pelo menu lateral
                        <br />
                        para encontrar artigos, procedimentos e documentos.
                      </p>
                    </div>
                    <img
                      src={heroImage}
                      alt="Ilustração de uma central de conhecimento com busca em um notebook, livros e uma planta"
                      className="w-[430px] max-w-full"
                    />
                  </div>
                </section>

                <h2 className="mt-8 text-lg font-bold text-foreground">Explorar categorias</h2>

                <div className="mt-4 grid grid-cols-1 gap-6 pb-8 sm:grid-cols-2 lg:grid-cols-3">
                  {categories.map(
                    ({ title, description, articles: count, icon: Icon, tint, ink }) => (
                      <button
                        key={title}
                        className="group rounded-xl border border-border bg-card p-6 text-left shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
                      >
                        <div className="flex gap-4">
                          <span
                            className={`flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full ${tint}`}
                          >
                            <Icon className={`h-8 w-8 ${ink}`} strokeWidth={1.6} />
                          </span>
                          <div>
                            <h3 className="text-base font-bold text-foreground">{title}</h3>
                            <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                              {description}
                            </p>
                          </div>
                        </div>
                        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                          <span className="flex items-center gap-2 text-sm text-muted-foreground">
                            <FileText className={`h-4 w-4 ${ink}`} strokeWidth={1.8} />
                            {count} artigos
                          </span>
                          <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <footer className="border-t border-border bg-card py-6 text-center text-sm text-muted-foreground">
        © 2026 Desenvolvido por{" "}
        <a
          href="https://github.com/malheirovieira"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:text-foreground transition-colors"
        >
          Gabriel Malheiro
        </a>
      </footer>

      <a
        href="https://wa.me/"
        className="fixed bottom-6 left-6 flex items-center gap-2.5 rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105"
      >
        <MessageCircle className="h-5 w-5" strokeWidth={2} />
        WhatsApp Suporte
      </a>
    </div>
  );
}
