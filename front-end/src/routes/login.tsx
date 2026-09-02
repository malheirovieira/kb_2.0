import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar | Base de Conhecimento" },
      {
        name: "description",
        content: "Acesse a Base de Conhecimento da Engebag.",
      },
    ],
  }),
  component: Login,
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(420px,560px)]">
        <section
          className="login-orange-gradient relative hidden overflow-hidden px-10 py-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between xl:px-16"
          style={{ background: "var(--gradient-header)" }}
        >
          <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border border-white/15" />
          <div className="absolute -bottom-40 -left-24 h-105 w-105 rounded-full border border-white/10" />

          <Link to="/" className="relative flex w-fit items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
              <BookOpen className="h-6 w-6" strokeWidth={1.8} />
            </span>
            <span className="text-lg font-bold tracking-tight">Base de Conhecimento</span>
          </Link>

          <div className="relative max-w-xl pb-10">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
              Engebag · Tecnologia da Informação
            </p>
            <h1 className="max-w-lg text-4xl font-bold leading-tight xl:text-5xl">
              Tudo o que sua equipe precisa, em um só lugar.
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-white/80">
              Consulte procedimentos, documentos e orientações da empresa com rapidez e segurança.
            </p>
          </div>

          <p className="relative text-xs text-white/60">Acesso restrito a colaboradores</p>
        </section>

        <section className="flex min-h-screen flex-col px-6 py-8 sm:px-10 lg:h-screen lg:min-h-0 lg:overflow-hidden lg:px-16 xl:px-24">
          <div className="flex items-center justify-between lg:justify-end">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-bold text-primary lg:hidden"
            >
              <BookOpen className="h-5 w-5" strokeWidth={1.8} />
              Base de Conhecimento
            </Link>
          </div>

          <div
            className={`mx-auto flex w-full max-w-md flex-1 items-center ${
              isRegistering ? "py-5 lg:py-3" : "py-12"
            }`}
          >
            <div className="w-full">
              <div
                key={isRegistering ? "register" : "login"}
                className={isRegistering ? "login-panel-enter-right" : "login-panel-enter-left"}
              >
                <div className={isRegistering ? "mb-5" : "mb-9"}>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground">
                    {isRegistering ? "Crie sua conta" : "Bem-vindo de volta"}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {isRegistering
                      ? "Cadastre seus dados para acessar a central."
                      : "Entre com suas credenciais para acessar a central."}
                  </p>
                </div>

                <form
                  className={isRegistering ? "space-y-4" : "space-y-5"}
                  onSubmit={(event) => event.preventDefault()}
                >
                  {isRegistering && (
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-semibold text-foreground">
                        Nome completo
                      </label>
                      <div className="relative">
                        <UserRound
                          className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                          strokeWidth={1.8}
                        />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Digite seu nome completo"
                          className={`${isRegistering ? "h-11" : "h-12"} rounded-lg bg-card pl-11 text-sm shadow-(--shadow-card)`}
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-foreground">
                      E-mail corporativo
                    </label>
                    <div className="relative">
                      <Mail
                        className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                        strokeWidth={1.8}
                      />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="seu.nome@engebag.com.br"
                        className={`${isRegistering ? "h-11" : "h-12"} rounded-lg bg-card pl-11 text-sm shadow-(--shadow-card)`}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-sm font-semibold text-foreground">
                        Senha
                      </label>
                      {!isRegistering && (
                        <button
                          type="button"
                          className="text-xs font-semibold text-primary transition-colors hover:text-primary-strong"
                        >
                          Esqueci minha senha
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <LockKeyhole
                        className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                        strokeWidth={1.8}
                      />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete={isRegistering ? "new-password" : "current-password"}
                        placeholder="Digite sua senha"
                        className={`${isRegistering ? "h-11" : "h-12"} rounded-lg bg-card px-11 pr-12 text-sm shadow-(--shadow-card)`}
                        required
                      />
                      <button
                        type="button"
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        onClick={() => setShowPassword((visible) => !visible)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" strokeWidth={1.8} />
                        ) : (
                          <Eye className="h-5 w-5" strokeWidth={1.8} />
                        )}
                      </button>
                    </div>
                  </div>

                  {isRegistering && (
                    <div className="space-y-2">
                      <label
                        htmlFor="password-confirmation"
                        className="text-sm font-semibold text-foreground"
                      >
                        Confirmar senha
                      </label>
                      <div className="relative">
                        <LockKeyhole
                          className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                          strokeWidth={1.8}
                        />
                        <Input
                          id="password-confirmation"
                          name="password-confirmation"
                          type="password"
                          autoComplete="new-password"
                          placeholder="Confirme a sua senha"
                          className={`${isRegistering ? "h-11" : "h-12"} rounded-lg bg-card pl-11 text-sm shadow-(--shadow-card)`}
                          required
                        />
                      </div>
                    </div>
                  )}

                  {!isRegistering && (
                    <label className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <input
                        type="checkbox"
                        name="remember"
                        className="h-4 w-4 rounded border-input accent-primary"
                      />
                      Lembrar deste dispositivo
                    </label>
                  )}

                  <Button
                    type="submit"
                    className={`${isRegistering ? "h-11" : "h-12"} w-full rounded-lg text-sm font-semibold`}
                  >
                    {isRegistering ? "Cadastrar" : "Entrar na central"}
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </Button>
                </form>

                <div className={isRegistering ? "mt-5" : "mt-7"}>
                  <span className="text-sm text-muted-foreground">
                    {isRegistering ? "Já possui uma conta?" : "Ainda não possui acesso?"}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegistering((registering) => !registering);
                      setShowPassword(false);
                    }}
                    className="ml-2 text-sm font-semibold text-primary transition-colors hover:text-primary-strong"
                  >
                    {isRegistering ? "Voltar para entrar" : "Cadastrar"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p className="mx-auto w-full max-w-md text-center text-xs text-muted-foreground">
            © 2026 Desenvolvido por{" "}
            <a
              href="https://github.com/malheirovieira"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-foreground transition-colors"
            >
              Gabriel Malheiro
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
