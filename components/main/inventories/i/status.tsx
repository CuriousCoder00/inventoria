import { Skeleton } from "@/components/ui/skeleton";
import { XIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const InventoryStatusNotification = ({
  inventoryId,
}: {
  inventoryId: number;
}) => {
  const [hidden, setHidden] = React.useState(false);
  const [isDraft, setIsDraft] = React.useState(true);
  const handleClose = () => {
    setHidden(true);
  };
  if (hidden) return null;
  if (!isDraft) return null;
  return (
    <div className="flex items-center justify-start w-full p-2 px-6 bg-yellow-600/30 gap-2 relative">
      Your inventory is currently in draft mode. You can publish it to make it
      visible to others.{" "}
      <Link
        href={`/inv/i/${inventoryId}/manage`}
        className="text-blue-500 underline"
      >
        Go to settings
      </Link>{" "}
      to publish your inventory.
      <XIcon
        onClick={handleClose}
        size={15}
        className="absolute top-3 right-5 cursor-pointer"
      />
    </div>
  );
};

export default InventoryStatusNotification;
