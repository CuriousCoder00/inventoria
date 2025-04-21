"use client";
import { getInventoryById } from "@/actions/inventory/get-inventory";
import { Inventory } from "@/lib/index.types";
import { InventoryUpdateInput } from "@/lib/validations/inventory.validation";
import React from "react";
import { useForm } from "react-hook-form";
import InventoryImage from "./inventory-image";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import SettingsDialog from "./settings-dialog";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteInventory } from "@/actions/inventory/delete";
import { useRouter } from "next/navigation";
import InventoryStatusNotification from "../status";

const InventorySettingsForm = ({ inventoryId }: { inventoryId: number }) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [inventory, setInventory] = React.useState<Inventory | null>(null);
  const form = useForm<InventoryUpdateInput>({
    defaultValues: {
      name: inventory?.name,
      description: inventory?.description,
    },
  });
  const handleInventoryDeletion = async () => {
    try {
      setLoading(true);
      const res = await deleteInventory(inventoryId);
      if (res.success) {
        toast.success(res.message);
        setInventory(null);
        router.push("/inv");
      } else {
        console.error(res.message)
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Unexpected error while deleting inventory");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      const res = await getInventoryById(inventoryId);
      if (res.success) {
        setInventory(res.inventory);
        form.reset({
          name: res?.inventory?.name,
          description: res?.inventory?.description,
        });
      } else {
        setInventory(null);
      }
      setLoading(false);
    };
    fetchInventory();
    console.log(inventory);
  }, [inventoryId, form]);
  return (
    <div className="flex flex-col items-start justify-start w-full h-full gap-4 max-h-[90dvh] overflow-y-auto">
      <div className="flex items-start justify-start w-full gap-8 max-md:flex-col max-md:items-start">
        <div>
          {inventory ? (
            <InventoryImage
              inventoryId={inventoryId}
              imageUrl={inventory?.image as string}
              name={inventory?.name as string}
            />
          ) : (
            <Skeleton className="h-50 w-50 rounded-full" />
          )}
        </div>
        <div className="flex flex-col items-start justify-start w-full gap-4 relative p-4 border border-border rounded-md h-full bg-background">
          {inventory?.name ? (
            <p className="text-3xl font-bold">{inventory?.name}</p>
          ) : (
            <Skeleton className="h-8 w-1/4" />
          )}
          {inventory?.description ? (
            <p className="text-sm text-muted-foreground md:pr-12">
              {inventory?.description}
            </p>
          ) : (
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          )}
          <div className="absolute top-5 right-5 z-10">
            <SettingsDialog form={form} inventory={inventory as Inventory}>
              <Edit className="h-5 w-5 text-muted-foreground" />
            </SettingsDialog>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start w-full gap-4 border border-red-500 rounded-md p-4 bg-red-950/5">
        {inventory ? (
          <h1 className="text-2xl font-bold">Danger Zone</h1>
        ) : (
          <Skeleton className="h-8 w-1/4" />
        )}
        {inventory ? (
          <Button
            variant="destructive"
            size="lg"
            className="cursor-pointer"
            onClick={handleInventoryDeletion}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete Inventory"}
          </Button>
        ) : (
          <Skeleton className="h-8 w-1/4" />
        )}
        {inventory ? (
          <p className="text-sm text-muted-foreground">
            Deleting an inventory is a permanent action and cannot be undone.
            Please proceed with caution.
          </p>
        ) : (
          <Skeleton className="h-10 w-full" />
        )}
      </div>
    </div>
  );
};

export default InventorySettingsForm;
