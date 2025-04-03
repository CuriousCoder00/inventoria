"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import {
  InventoryInput,
  inventorySchema,
} from "@/lib/validations/inventory.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  createInventory,
  inventoryNameCheck,
} from "@/actions/inventory/create";
import { Loader2 } from "lucide-react";

const CreateInventoryForm = () => {
  const [loading, setLoading] = useState(false);
  const [nameExists, setNameExists] = useState<boolean | null>(null);
  const [inventoryName, setInventoryName] = useState("");
  const [checking, setChecking] = useState(false);

  const form = useForm<InventoryInput>({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    setChecking(true);
    if (inventoryName.length < 3) {
      setNameExists(null); // Don't check if less than 3 characters
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const exists = await inventoryNameCheck(inventoryName);
        setNameExists(exists);
        setChecking(false);
      } catch (error) {
        console.error("Error checking inventory name:", error);
      }
    }, 500); // Debounce time: 500ms

    return () => clearTimeout(timeout);
  }, [inventoryName]);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    form.setValue(name as keyof InventoryInput, value);
    if (name === "name") setInventoryName(value);
  };

  const onSubmit = async (data: InventoryInput) => {
    try {
      setLoading(true);
      await createInventory(data);
      form.reset(); // Reset the form after successful creation
      setNameExists(null); // Reset name existence check
      setInventoryName(""); // Reset inventory name
      setChecking(false); // Reset checking state
    } catch (error) {
      console.error("Error creating inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col mx-auto space-y-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inventory Name</FormLabel>
              <FormControl>
                <Input
                  className={`${
                    nameExists
                      ? "border-red-500 animate-bounce animate-out"
                      : "border-green-500"
                  }`}
                  disabled={loading}
                  type="text"
                  {...field}
                  onChange={onValueChange}
                  placeholder="Sun Burn Store"
                />
              </FormControl>
              {inventoryName.length >= 3 && (
                <p
                  className={`text-xs flex items-center justify-start gap-3 ${
                    nameExists ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {checking ? (
                    <Loader2 className="animate-spin mr-1" />
                  ) : nameExists ? (
                    "This inventory name is already taken."
                  ) : (
                    "This inventory name is available."
                  )}
                </p>
              )}
              <FormMessage className="text-xs text-red-400 text-end" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  type="text"
                  {...field}
                  onChange={onValueChange}
                  placeholder="Write a short description about your inventory..."
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400 text-end" />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end">
          <Button
            disabled={nameExists || loading || inventoryName.length < 3}
            type="submit"
          >
            Create Inventory
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateInventoryForm;
