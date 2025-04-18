"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React from "react";
import CreateInventoryDialog from "./create-inventory-dialog";

const InventoryHeader = () => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center justify-start w-full">
        <Input
          placeholder="Search..."
          className="dark:bg-black bg-white h-10 rounded"
          type="search"
        />
      </div>
      <div className="flex items-center justify-end w-full">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">Add Inventory</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>Create Inventory</DialogHeader>
            <DialogDescription>Create a new inventory.</DialogDescription>
            <CreateInventoryDialog />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default InventoryHeader;
