import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import AddItemForm from "./add-item-form";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { publishInventory } from "@/actions/inventory/publish";
import { useInventory } from "@/context/inventory-context";
import { toast } from "sonner";

const ManageInventoryHeader = () => {
    const inventory = useInventory();
    const inventoryId = inventory?.inventoryId;
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const handlePublish = async () => {
      try {
        setLoading(true);
        const res = await publishInventory(Number(inventoryId));
        if (res.success) {
          toast.success(res.message);
          setOpen(false);
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error("Unexpected error while publishing inventory");
        console.error(error);
      }
    };
  return (
    <div className="flex items-center justify-between w-full px-4 py-2 border-b border-border">
      <h1 className="text-2xl font-bold">Manage Inventory</h1>
      <div className="flex items-center justify-center gap-4">
        <AddItemDialog />
        <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Publish Inventory</Button>
      </DialogTrigger>
      <DialogContent className="fixed inset-0 top-1/3 z-50 flex flex-col items-start gap-5 justify-center w-full h-56 max-h-screen max-w-lg p-12 mx-auto overflow-y-auto bg-background border border-border rounded-md shadow-lg">
      <DialogTrigger>
      <div className="fixed -z-10 inset-0 bg-black/30"></div>
        </DialogTrigger>
        <DialogHeader>
          <DialogTitle>Publish Inventory</DialogTitle>
          <DialogDescription>
            Are you sure you want to publish this inventory? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex items-center justify-between w-full">
          <Button
            onClick={handlePublish}
            variant="destructive"
            className="cursor-pointer"
          >
            Publish
          </Button>
          <DialogTrigger asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
      </div>
    </div>
  );
};

export default ManageInventoryHeader;

const AddItemDialog = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="cursor-pointer" variant="outline">Add Item</Button>
      </SheetTrigger>
      <SheetContent className="max-h-dvh overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add Item</SheetTitle>
        </SheetHeader>
        <AddItemForm />
      </SheetContent>
    </Sheet>
  );
};

const PublishDialog = () => {
  const inventory = useInventory();
  const inventoryId = inventory?.inventoryId;
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handlePublish = async () => {
    try {
      setLoading(true);
      const res = await publishInventory(Number(inventoryId));
      if (res.success) {
        toast.success(res.message);
        setOpen(false);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Unexpected error while publishing inventory");
      console.error(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Publish Inventory</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Publish Inventory</DialogTitle>
          <DialogDescription>
            Are you sure you want to publish this inventory? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={handlePublish}
            variant="destructive"
            className="cursor-pointer"
          >
            Publish
          </Button>
          <DialogTrigger asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
