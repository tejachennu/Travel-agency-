import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-brand-950 pt-28 pb-20 text-white">
      <div className="absolute -top-32 -left-32 -z-10 size-[34rem] animate-aurora rounded-full bg-brand-600/40 blur-[120px]" />
      <div className="absolute -right-32 -bottom-40 -z-10 size-[30rem] animate-aurora rounded-full bg-teal-500/25 blur-[120px]" />
      <div className="dot-grid absolute inset-0 -z-10 opacity-60" />
      <div className="container-page text-center">
        <Compass className="mx-auto size-14 animate-[spin_12s_linear_infinite] text-teal-300" />
        <p className="mt-6 font-script text-3xl text-teal-200">Looks like you&apos;ve wandered off the map</p>
        <h1 className="mt-2 font-display text-7xl font-medium tracking-tight sm:text-9xl">404</h1>
        <p className="mx-auto mt-4 max-w-md text-white/70">
          The page you&apos;re looking for doesn&apos;t exist — but plenty of beautiful places do.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-light">
            <ArrowLeft className="size-4" /> Back home
          </Link>
          <Link href="/destinations" className="btn btn-ghost-light">
            Explore destinations
          </Link>
        </div>
      </div>
    </section>
  );
}
