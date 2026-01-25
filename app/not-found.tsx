import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center py-20 bg-cream">
      <div className="text-center px-4">
        <p className="text-accent text-xs uppercase tracking-[0.3em] mb-4">Error 404</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
          Page Not Found
        </h1>
        <p className="text-text-light mb-8 max-w-md mx-auto leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist—but Tennessee&apos;s history does.
          Head back to explore where it all began.
        </p>
        <Link
          href="/"
          className="btn-primary inline-block bg-primary text-white font-semibold px-8 py-3 rounded-sm hover:bg-primary/90 transition-colors uppercase tracking-wider text-sm"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
