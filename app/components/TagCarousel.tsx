import { carouselItems } from "../../content/carousel";
import { Container } from "./Container";
import { Tag } from "./Tag";

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
        <div className="tag-carousel__viewport rounded-3xl border border-black/10 bg-white/70 px-4 py-3 shadow-sm shadow-black/5 dark:border-white/15 dark:bg-black/60 dark:shadow-none">
          <div className="tag-carousel__track">
            <ul className="tag-carousel__list">
              {carouselItems.map((item) => (
                <li key={item.label}>
                  <Tag>{item.label}</Tag>
                </li>
              ))}
            </ul>
            <ul className="tag-carousel__list" aria-hidden="true">
              {carouselItems.map((item) => (
                <li key={`${item.label}-duplicate`}>
                  <Tag>{item.label}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
