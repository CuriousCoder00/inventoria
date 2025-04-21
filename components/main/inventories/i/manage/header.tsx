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

const ManageInventoryHeader = () => {
  return (
    <div className="flex items-center justify-between w-full px-4 py-2 border-b border-border">
      <h1 className="text-2xl font-bold">Manage Inventory</h1>
      <div className="flex items-center justify-center gap-4">
        <AddItemDialog />
        <Button>Publish Inventory</Button>
      </div>
    </div>
  );
};

export default ManageInventoryHeader;

const AddItemDialog = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Add Item</Button>
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
