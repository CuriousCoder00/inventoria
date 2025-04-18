import {
  createInventory,
  inventoryNameCheck,
} from "@/actions/inventory/create";
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
import {
  InventoryInput,
  inventorySchema,
} from "@/lib/validations/inventory.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateInventoryDialog = () => {
  const [loading, setLoading] = React.useState(false);
  const [nameExists, setNameExists] = React.useState<boolean | null>(null);
  const [inventoryName, setInventoryName] = React.useState("");
  const [checking, setChecking] = React.useState(false);
  const session = useSession();
  const form = useForm<InventoryInput>({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  React.useEffect(() => {
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
      const res = await createInventory(data);
      if (res.success) {
        res.warn
          ? toast.warning(res.message, { duration: 3000 })
          : toast.success(res.message, {
              duration: 3000,
            });
      } else {
        toast.error(res.message, {
          duration: 3000,
        });
      }
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
        className="flex flex-col space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  className={`${
                    nameExists
                      ? "border-red-500 animate-bounce animate-out"
                      : "border-green-500"
                  }`}
                  type="text"
                  {...field}
                  disabled={loading}
                  onChange={onValueChange}
                  placeholder="Inventory Name"
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
                  type="text"
                  {...field}
                  placeholder="Brief of your inventory..."
                  onChange={onValueChange}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400 text-end" />
            </FormItem>
          )}
        />
        <Button
          disabled={nameExists || loading || inventoryName.length < 3}
          type="submit"
          className="w-full mt-4 cursor-pointer"
        >
          Create Inventory
        </Button>
      </form>
    </Form>
  );
};

export default CreateInventoryDialog;
