// @ts-nocheck
import { Star, ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@default/ui/lib/cn";
import { Button } from "@default/ui/primitives/button";
import { NavigationMenuLink } from "@default/ui/primitives/navigation-menu";
import type {
  MegaMenu,
  MegaMenuColumn,
  MegaMenuFooter,
  MegaMenuSide,
} from "./navbar-12-data";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-3",
            i < Math.round(rating)
              ? "fill-orange-400 text-orange-400"
              : "fill-muted text-muted stroke-orange-400",
          )}
        />
      ))}
    </div>
  );
}

function ColumnLinks({ column }: { column: MegaMenuColumn }) {
  return (
    <ul className="flex flex-col gap-2">
      {column.links.map((item) => (
        <li key={item.name}>
          <NavigationMenuLink
            render={
              <a
                href={item.href}
                className="p-0! text-sm text-muted-foreground hover:text-foreground hover:bg-transparent!"
              >
                {item.name}
              </a>
            }
          />
        </li>
      ))}
    </ul>
  );
}

function MegaColumn({ column }: { column: MegaMenuColumn }) {
  const Icon = column.icon;
  return (
    <div className="flex flex-col gap-3">
      {Icon && (
        <div className="flex items-center justify-center size-10 rounded-lg bg-muted text-foreground">
          <Icon className="size-4.5" />
        </div>
      )}
      {column.thumb && (
        <img
          src={column.thumb}
          width={40}
          height={40}
          alt={column.title}
          className="size-10 rounded-lg object-cover border border-border"
        />
      )}
      <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
        {column.title}
      </p>
      <ColumnLinks column={column} />
    </div>
  );
}

function MegaSide({ side }: { side: MegaMenuSide }) {
  if (side.type === "promo") {
    const Icon = side.icon;
    return (
      <div className="flex flex-col justify-between gap-4 h-full rounded-lg bg-muted p-4">
        <div className="flex items-center justify-center size-11 rounded-lg bg-background text-foreground">
          <Icon className="size-5" />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-foreground whitespace-pre-line">
            {side.label}
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-1 text-xs font-medium text-foreground underline underline-offset-4 w-fit"
          >
            {side.cta}
            <ArrowUpRight className="size-3" />
          </a>
        </div>
      </div>
    );
  }

  if (side.type === "products") {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
          {side.title}
        </p>
        <ul className="flex flex-col gap-3">
          {side.products.map((product) => (
            <li key={product.name}>
              <a href="#" className="flex items-center gap-3 group">
                {product.image && (
                  <img
                    src={product.image}
                    width={44}
                    height={44}
                    alt={product.name}
                    className="size-11 rounded-md object-cover shrink-0 border border-border"
                  />
                )}
                <div className="flex flex-col gap-1 min-w-0">
                  <p className="text-sm text-foreground group-hover:underline line-clamp-1">
                    {product.name}
                  </p>
                  {typeof product.rating === "number" && (
                    <Stars rating={product.rating} />
                  )}
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-foreground">
                      ${product.price}
                    </span>
                    {product.oldPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        ${product.oldPrice}
                      </span>
                    )}
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (side.type === "editorial") {
    return (
      <div className="relative rounded-lg overflow-hidden h-full min-h-56">
        <img
          src={side.image}
          alt={side.heading.replace("\n", " ")}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/0 to-black/0" />
        <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3">
          <p className="text-white font-semibold leading-tight whitespace-pre-line">
            {side.heading}
          </p>
          <Button
            size="sm"
            className="w-fit h-auto py-2 px-4 rounded-lg bg-white text-black hover:bg-white/90 cursor-pointer"
          >
            {side.cta}
          </Button>
        </div>
      </div>
    );
  }

  if (side.type === "photo") {
    return (
      <div className="relative rounded-lg overflow-hidden h-full min-h-56">
        <img
          src={side.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    );
  }

  const product = side.product;
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg bg-muted p-4 h-full">
      <div className="flex items-center justify-center size-14 mx-auto rounded-lg bg-background text-muted-foreground">
        <Sparkles className="size-6" />
      </div>
      <div className="flex flex-col gap-1 text-center">
        <p className="text-xs text-muted-foreground">Featured</p>
        <p className="text-sm font-medium text-foreground">{product.name}</p>
        {typeof product.rating === "number" && (
          <div className="flex items-center justify-center">
            <Stars rating={product.rating} />
          </div>
        )}
        <span className="text-sm font-semibold text-foreground">
          ${product.price}
        </span>
      </div>
    </div>
  );
}

function MegaFooter({ footer }: { footer: MegaMenuFooter }) {
  if (footer.type === "brands") {
    return (
      <div className="flex items-center justify-between gap-6 flex-wrap">
        {footer.brands.map((brand) => (
          <span
            key={brand}
            className="text-sm font-semibold tracking-widest text-muted-foreground/70"
          >
            {brand}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-6">
      {footer.services.map((service) => (
        <div key={service.title} className="flex items-center gap-2.5">
          <service.icon className="size-5 text-muted-foreground shrink-0" />
          <div className="flex flex-col min-w-0">
            <p className="text-sm font-medium text-foreground line-clamp-1">
              {service.title}
            </p>
            <p className="text-xs text-muted-foreground line-clamp-1">
              {service.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function MegaMenuPanel({ menu }: { menu: MegaMenu }) {
  const bg =
    typeof menu.backgroundImage === "string"
      ? { src: menu.backgroundImage }
      : menu.backgroundImage;

  return (
    <div
      className={cn(
        "relative w-[min(94vw,72rem)] h-92 rounded-lg overflow-hidden bg-popover text-popover-foreground",
        menu.dark && "dark",
      )}
    >
      <div className="relative p-6 flex flex-col h-full">
        <div className="grid grid-cols-[repeat(4,1fr)_16rem] gap-8 flex-1 min-h-0">
          <div className="relative col-span-4">
            {bg && (
              <img
                src={bg.src}
                alt=""
                aria-hidden="true"
                className={cn(
                  "absolute pointer-events-none select-none",
                  bg.position ?? "-bottom-4 right-0",
                  bg.width ?? "w-[65%]",
                  bg.height ?? "h-[80%]",
                  bg.fit ?? "object-contain object-bottom",
                )}
              />
            )}
            <div className="relative z-10 grid grid-cols-4 gap-8 h-full">
              {menu.columns.map((column) => (
                <MegaColumn key={column.title} column={column} />
              ))}
            </div>
          </div>
          <div className="border-l border-border pl-6 flex flex-col">
            <MegaSide side={menu.side} />
          </div>
        </div>
        {menu.footer && (
          <div className="mt-6 pt-5 border-t border-border shrink-0">
            <MegaFooter footer={menu.footer} />
          </div>
        )}
      </div>
    </div>
  );
}
