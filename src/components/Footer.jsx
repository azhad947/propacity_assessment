import { footer } from "../data/content";

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-ink px-6 pb-8 pt-20 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 border-b border-hairline pb-14 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl tracking-[0.14em] text-parchment">MUREC</p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-parchment-dim">
              {footer.heading}
            </p>
            <div className="mt-8 flex gap-5">
              {footer.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="eyebrow link-underline text-parchment-dim hover:text-brass-bright"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow mb-5 text-moss">{footer.addressLabel}</p>
            <p className="max-w-[220px] text-sm leading-relaxed text-parchment-dim">
              {footer.address}
            </p>
          </div>

          <div>
            <p className="eyebrow mb-5 text-moss">Contact</p>
            <a href={`mailto:${footer.email}`} className="link-underline block text-sm text-parchment-dim">
              {footer.email}
            </a>
            <a href={`tel:${footer.phone}`} className="link-underline mt-3 block text-sm text-parchment-dim">
              {footer.phone}
            </a>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-4xl text-center text-xs leading-relaxed text-parchment-dim/70">
          {footer.disclaimer}
        </p>

        <div className="mt-8 flex flex-col items-center gap-2 text-xs text-parchment-dim/70 sm:flex-row sm:justify-between">
          <span>{footer.copyright}</span>
          <span>{footer.poweredBy}</span>
        </div>
      </div>
    </footer>
  );
}
