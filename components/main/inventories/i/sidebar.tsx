import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const InventorySidebar = ({ inventoryId }: { inventoryId: string }) => {
  return (
    <div className="flex flex-col items-start justify-start h-full gap-2 p-1 py-4 border-r border-r-border dark:border-r-border-dark w-40">
      <div className="flex flex-col items-start justify-start w-full h-10 py-2 bg-white rounded-md dark:bg-black">
        {links.map((item) => (
          <InventorySidebarLink
            key={item.link}
            link={item.link.replace("{{inventoryId}}", inventoryId)}
            label={item.label}
          />
        ))}
      </div>
    </div>
  );
};

export const InventorySidebarLink = ({
  link,
  label,
}: {
  link: string;
  label: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <Link
      href={link}
      className={`w-full p-2 text-sm font-semibold text-left transition-colors duration-200 ease-in-out ${
        isActive
          ? "bg-neutral-200 dark:bg-neutral-700 text-foreground border-l-2 border-l-foreground"
          : "hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-foreground hover:border-l-2 hover:border-l-foreground"
      }`}
    >
      {label}
    </Link>
  );
};

const links = [
  { link: "/inv/i/{{inventoryId}}", label: "Overview" },
  { link: "/inv/i/{{inventoryId}}/settings", label: "Settings" },
  { link: "/inv/i/{{inventoryId}}/manage", label: "Manage" },
];
