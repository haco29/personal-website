import Image from "next/image";

import { carouselItems, type CarouselItem } from "../../content/carousel";
import { Container } from "./Container";

function CarouselCard({ item }: { item: CarouselItem }) {
  return (
    <article className="flex h-full w-[260px] flex-col justify-between gap-4 rounded-3xl border border-black/10 bg-white/80 px-4 py-4 shadow-sm shadow-black/5 backdrop-blur dark:border-white/15 dark:bg-black/70 dark:shadow-none">
      <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">{item.post}</p>
      <div className="flex items-center gap-3">
        <Image
          src={item.avatar}
          alt={item.name}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full border border-black/10 object-cover dark:border-white/15"
        />
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.name}</p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">{item.title}</p>
        </div>
      </div>
    </article>
  );
}

export function TagCarousel() {
  return (
    <section
      aria-label="Topics carousel"
      className="border-y border-black/5 py-6 dark:border-white/10"
    >
      <Container>
        <p className="mb-3 text-xs font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
          Community posts
        </p>
        <div className="tag-carousel__viewport rounded-3xl border border-black/10 bg-white/70 px-4 py-4 shadow-sm shadow-black/5 dark:border-white/15 dark:bg-black/60 dark:shadow-none">
          <div className="tag-carousel__track">
            <ul className="tag-carousel__list">
              {carouselItems.map((item) => (
                <li key={item.name} className="shrink-0">
                  <CarouselCard item={item} />
                </li>
              ))}
            </ul>
            <ul className="tag-carousel__list" aria-hidden="true">
              {carouselItems.map((item, index) => (
                <li key={`${item.name}-${index}-duplicate`} className="shrink-0">
                  <CarouselCard item={item} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
