import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BookOpen,
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Database,
  MessageCircle,
  Settings2,
  Sun,
  User,
  UserCircle2,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WhatsappSupport } from "@/components/whatsapp-support";

export const Route = createFileRoute("/")({
  // Dashboard temporariamente desativado: o fluxo atual começa pelo login.
  beforeLoad: () => {
    throw redirect({ to: "/login" });
  },
  head: () => ({
    meta: [
      { title: "Portal do Colaborador | Engebag TI" },
      {
        name: "description",
        content: "Acesso aos sistemas e recursos internos da Engebag.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date());
    updateTime();
    const intervalId = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const formattedDate = currentTime
    ? new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      }).format(currentTime)
    : "--/--";
  const formattedMonth = currentTime
    ? new Intl.DateTimeFormat("pt-BR", {
        month: "long",
        year: "numeric",
      }).format(currentTime)
    : "carregando calendário";
  const formattedTime = currentTime
    ? new Intl.DateTimeFormat("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(currentTime)
    : "--:--";
  const greeting = currentTime
    ? currentTime.getHours() >= 5 && currentTime.getHours() < 12
      ? "Bom dia"
      : currentTime.getHours() < 18
        ? "Boa tarde"
        : "Boa noite"
    : "Bom dia";

  const modules = [
    {
      title: "Base de Conhecimento",
      description: "Encontre procedimentos, documentos e respostas para suas dúvidas.",
      icon: BookOpen,
      tint: "bg-tint-orange",
      ink: "text-ink-orange",
      available: true,
    },
    {
      title: "Plataforma de suporte",
      description: "Abra e acompanhe solicitações para a equipe de tecnologia.",
      icon: MessageCircle,
      tint: "bg-tint-blue",
      ink: "text-ink-blue",
      available: false,
    },
    {
      title: "Sistemas internos",
      description: "Acesse as ferramentas e sistemas utilizados pela empresa.",
      icon: Database,
      tint: "bg-tint-green",
      ink: "text-ink-green",
      available: false,
    },
    {
      title: "Avisos",
      description: "Confira comunicados e informações importantes da empresa.",
      icon: Bell,
      tint: "bg-tint-violet",
      ink: "text-ink-violet",
      available: false,
    },
  ];

  return (
    <div className="module-page-enter flex min-h-screen flex-col bg-background text-foreground">
      <header
        className="flex h-18 items-center justify-between px-6 lg:px-10"
        style={{ background: "var(--gradient-header)" }}
      >
        <div className="flex items-center gap-3 text-primary-foreground">
          <Sun className="h-7 w-7" strokeWidth={1.8} />
          <span className="text-xl font-bold tracking-tight">Portal do Colaborador</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-md text-sm font-medium text-primary-foreground outline-none transition-opacity hover:opacity-90">
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
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <LogOut className="h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <main className="w-full flex-1 px-6 py-8 lg:px-10 lg:py-12">
        <div className="mx-auto max-w-310">
          <section className="relative overflow-hidden rounded-xl border border-border bg-card shadow-(--shadow-card)">
            <div className="relative z-10 max-w-xl px-7 py-9 md:px-10 md:py-12">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Engebag · Tecnologia da Informação
              </p>
              <h1 className="mt-4 text-3xl font-bold leading-tight text-foreground md:text-4xl">
                {greeting}, Gabriel.
              </h1>
              <p className="mt-4 max-w-md text-[15px] leading-7 text-muted-foreground">
                Acesse rapidamente os sistemas e recursos que fazem parte da sua rotina.
              </p>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] bg-tint-orange/60 md:block" />
            <div className="absolute inset-y-0 right-0 hidden w-[42%] items-center justify-center md:flex">
              <div className="relative flex w-48 flex-col items-center text-center text-primary">
                <CalendarDays className="mb-3 h-7 w-7" strokeWidth={1.5} />
                <time dateTime={currentTime?.toISOString()}>
                  <span className="block font-serif text-6xl font-semibold leading-none tracking-tight">
                    {formattedDate}
                  </span>
                  <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.18em] text-ink-orange">
                    {formattedMonth}
                  </span>
                  <span className="mt-4 block font-serif text-3xl font-semibold tracking-wide text-foreground">
                    {formattedTime}
                  </span>
                </time>
              </div>
            </div>
          </section>

          <div className="mt-10 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-foreground">Seus sistemas</h2>
              <p className="mt-1 text-sm text-muted-foreground">Tudo em um só lugar.</p>
            </div>
            <span className="hidden text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:block">
              Acesso interno
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map(({ title, description, icon: Icon, tint, ink, available }) => {
              const content = (
                <>
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${tint}`}>
                    <Icon className={`h-6 w-6 ${ink}`} strokeWidth={1.7} />
                  </span>
                  <span className="mt-5 text-base font-bold text-foreground">{title}</span>
                  <span className="mt-2 text-sm leading-6 text-muted-foreground">
                    {description}
                  </span>
                  <span className="mt-auto flex items-center gap-1 pt-5 text-xs font-semibold text-primary">
                    {available ? "Acessar módulo" : "Em breve"}
                    {available && (
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    )}
                  </span>
                </>
              );
              const className =
                "group flex min-h-56 flex-col rounded-xl border border-border bg-card p-5 text-left shadow-(--shadow-card) transition-all hover:-translate-y-0.5 hover:shadow-(--shadow-card-hover)";

              return available ? (
                <Link
                  key={title}
                  to="/base-conhecimento"
                  aria-label="Abrir Base de Conhecimento"
                  className={`${className} cursor-pointer`}
                >
                  {content}
                </Link>
              ) : (
                <button
                  key={title}
                  type="button"
                  disabled
                  className={`${className} cursor-default opacity-65 hover:translate-y-0 hover:shadow-(--shadow-card)`}
                >
                  {content}
                </button>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-card py-6 text-center text-sm text-muted-foreground">
        © 2026 Desenvolvido por Gabriel Malheiro
      </footer>

      <WhatsappSupport />
    </div>
  );
}
