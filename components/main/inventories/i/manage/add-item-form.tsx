"use client";
import { uploadToCloudinary } from "@/actions/cdn-upload";
import { addItem } from "@/actions/item/add";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useInventory } from "@/context/inventory-context";
import { fileToBase64 } from "@/lib/utils";
import { ItemInput, itemSchema } from "@/lib/validations/item.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUp } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddItemForm = () => {
  const inventory = useInventory();
  const inventoryId = inventory?.inventoryId;
  const [loading, setLoading] = React.useState(false);

  const form = useForm<ItemInput>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: "",
      description: "",
      quantity: 0,
      price: 0,
      category: "",
      tags: [],
      image: "",
      status: "AVAILABLE",
    },
  });
  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    form.setValue(name as keyof ItemInput, value);
  };
  const uploadItemImage = async (file: File) => {
    const base64_image = await fileToBase64(file);
    const res = await uploadToCloudinary(base64_image as string);
    if (res.success) {
      form.setValue("image", res.url);
    }
    return res.url;
  };
  const addItemToInventory = async (data: ItemInput, inventoryId: number) => {
    setLoading(true);
    try {
      const res = await addItem(data, inventoryId);
      if (res.success) {
        form.reset();
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("Unexpected error while adding item");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col space-y-4 p-5"
        onSubmit={form.handleSubmit((data) => {
          if (inventoryId) {
            addItemToInventory(data, Number(inventoryId));
          } else {
            toast.error("Inventory ID is not available.");
          }
        })}
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Image</FormLabel>
              <FormControl>
                <div className="relative rounded-none overflow-hidden w-full h-50 border-border">
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <Avatar className="aspect-square w-full h-50 rounded-none">
                      <AvatarImage src={form.watch("image")} />
                      <AvatarFallback className="text-center text-4xl font-bold rounded-none">
                        {form
                          .watch("name")
                          ?.split(/[\s-_]/)
                          .map((n) => n.charAt(0).toUpperCase() + n.slice(1))
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <Input
                      name="item_image"
                      id="item_image"
                      type="file"
                      disabled={loading}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          uploadItemImage(file);
                        }
                      }}
                    />
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10 overflow-hidden rounded-none">
                    <Label
                      htmlFor="item_image"
                      className="flex items-end justify-center w-full h-full cursor-pointer"
                    >
                      <span className="flex w-full justify-center bg-black/70 py-5">
                        <ImageUp />
                      </span>
                    </Label>
                  </div>
                </div>
              </FormControl>
              <FormMessage className="text-xs text-red-400 text-end" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input
                  type={"text"}
                  {...field}
                  disabled={loading}
                  onChange={handleInputValueChange}
                  placeholder="Enter item name"
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400 text-end" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Description</FormLabel>
              <FormControl>
                <Input
                  type={"text"}
                  {...field}
                  disabled={loading}
                  onChange={handleInputValueChange}
                  placeholder="Enter item description"
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400 text-end" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Category</FormLabel>
              <FormControl>
                <Select
                  disabled={loading}
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value); // Updates form state correctly
                    form.setValue("category", value); // optional, if you want redundancy
                  }}
                >
                  <SelectTrigger className="w-full">
                    {field.value || "Select Category"}
                  </SelectTrigger>
                  <SelectContent>
                    {category.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-xs text-red-400 text-end" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Quantity</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  type="number"
                  min={1}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder="Enter item quantity"
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400 text-end" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Price</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  min={0}
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder="Enter item quantity"
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400 text-end" />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button disabled={loading} type="submit">
            {loading ? "Adding..." : "Add Item"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddItemForm;

const category = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Clothing" },
  { id: "3", name: "Home Appliances" },
  { id: "4", name: "Books" },
  { id: "5", name: "Sports" },
  { id: "6", name: "Toys" },
  { id: "7", name: "Beauty" },
  { id: "8", name: "Automotive" },
  { id: "9", name: "Health" },
  { id: "10", name: "Grocery" },
  { id: "11", name: "Furniture" },
  { id: "12", name: "Others" },
];
