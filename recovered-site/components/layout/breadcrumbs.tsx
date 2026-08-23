import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Хлебные крошки" className="text-sm">
      <ol
        className="flex flex-wrap items-center gap-x-2 gap-y-1 text-slate-300"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => (
          <li
            key={item.label}
            className="flex items-center gap-2"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {item.href ? (
              <Link
                href={item.href}
                itemProp="item"
                className="inline-block rounded px-1 py-1 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF]"
              >
                <span itemProp="name">{item.label}</span>
              </Link>
            ) : (
              <span aria-current="page" className="inline-block px-1 py-1 text-slate-400">
                <span itemProp="name">{item.label}</span>
              </span>
            )}
            <meta itemProp="position" content={String(index + 1)} />
            {index < items.length - 1 ? (
              <span aria-hidden="true" className="text-slate-600">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
