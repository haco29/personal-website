import Image from "next/image";

import { socialProof } from "../../content/social-proof";
import { Container } from "./Container";
import { Section } from "./Section";

const marqueeItems = (socialProof as Array<{ name: string; logoSrc?: string }>).map((item) => ({
  name: item.name,
  logoSrc: item.logoSrc,
  key: item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
}));

function MarqueeChip({ name, logoSrc }: { name: string; logoSrc?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm shadow-black/5 dark:border-white/15 dark:bg-black dark:text-zinc-200 dark:shadow-none">
      {logoSrc ? (
        <Image
          src={logoSrc}
          alt=""
          width={22}
          height={22}
          aria-hidden="true"
          className="h-5 w-5 object-contain"
        />
      ) : null}
      <span>{name}</span>
    </div>
  );
}

export function BottomMarquee() {
  return (
    <Container>
      <Section title="Community & Impact">
        <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white px-6 py-6 dark:border-white/15 dark:bg-black">
          <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap motion-reduce:animate-none">
            <ul className="flex items-center gap-6">
              {marqueeItems.map((item) => (
                <li key={item.key}>
                  <MarqueeChip name={item.name} logoSrc={item.logoSrc} />
                </li>
              ))}
            </ul>
            <ul className="flex items-center gap-6" aria-hidden="true">
              {marqueeItems.map((item) => (
                <li key={`${item.key}-duplicate`}>
                  <MarqueeChip name={item.name} logoSrc={item.logoSrc} />
                </li>
              ))}
            </ul>
          </div>
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-black dark:via-black/80"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-black dark:via-black/80"
            aria-hidden="true"
          />
        </div>
      </Section>
    </Container>
  );
}
