import React from "react";
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Keep mocks minimal and only at framework boundaries.
// We want tests to exercise real component behavior (RTL style), not Next internals.

vi.mock("next/image", () => {
  function NextImage({
    alt,
    // next/image accepts `src` as string | StaticImport; in tests we only need it to render.
    src,
    // next/image props that don't map 1:1 to <img> attrs
    priority,
    ...rest
  }: React.ComponentProps<"img"> & { src: unknown; priority?: boolean }) {
    const resolvedSrc =
      typeof src === "string" ? src : ((src as { src?: string } | null | undefined)?.src ?? "");

    void priority;
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} src={resolvedSrc} {...rest} />;
  }

  return { default: NextImage };
});

vi.mock("next/link", () => {
  function NextLink({
    href,
    children,
    ...rest
  }: React.PropsWithChildren<{ href: string }> &
    Omit<React.ComponentPropsWithoutRef<"a">, "href">) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  return { default: NextLink };
});

// Mock scrollIntoView for jsdom (used by Chat component)
Element.prototype.scrollIntoView = vi.fn();
