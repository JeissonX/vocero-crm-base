import { DEFAULT_BRANDING } from "@/lib/branding";
import { getBranding } from "@/server/branding";
import { BrandLogo } from "@/components/brand-mark";

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const branding = await getBranding().catch(() => DEFAULT_BRANDING);
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-subtle p-4">
      <div className="brand-grid absolute inset-0" aria-hidden />
      <div className="brand-glow brand-glow-a" aria-hidden />
      <div className="brand-glow brand-glow-b" aria-hidden />

      <div className="relative w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <BrandLogo branding={branding} size="lg" />
          <div>
            <h1 className="text-[22px] font-bold tracking-tight text-foreground">
              {branding.name}
            </h1>
            <p className="mt-1 text-xs font-medium text-text-3">
              Plataforma Comercial Omnicanal con IA
            </p>
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
