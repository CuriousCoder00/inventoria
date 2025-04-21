"use client";
import { getItem } from "@/actions/item/get";
import ItemShowCase from "@/components/main/inventories/i/manage/item";
import { Item } from "@/lib/index.types";
import { useParams } from "next/navigation";
import React from "react";

const ItemPage = () => {
  const params = useParams();
  const itemId = params?.itemId as string;

  const [item, setItem] = React.useState<Item | null>(null);

  React.useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await getItem(Number(itemId));
        if (res.success) {
          setItem(res.item);
        } else {
          console.error("Failed to fetch item details");
        }
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };
    fetchItem();
  }, [itemId]);
  return (
    <div className="flex flex-col items-start justify-start w-full h-full gap-4 overflow-hidden max-h-[90dvh]">
      <h1 className="text-2xl font-bold">Item Details</h1>
      {item ? <ItemShowCase product={item} /> : <p>Loading...</p>}
    </div>
  );
};

export default ItemPage;
