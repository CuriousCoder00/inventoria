import { inventoryNameCheck } from "@/actions/inventory/create";
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
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Inventory } from "@/lib/index.types";
import { InventoryInput } from "@/lib/validations/inventory.validation";
import { Loader2, XIcon } from "lucide-react";
import React from "react";

const SettingsDialog = ({
  children,
  inventory,
  form,
}: {
  children: React.ReactNode;
  inventory: Inventory;
  form: any;
}) => {
  const [loading, setLoading] = React.useState(false);
  const [nameExists, setNameExists] = React.useState<boolean | null>(null);
  const [inventoryName, setInventoryName] = React.useState("");
  const [checking, setChecking] = React.useState(false);
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
  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer">{children}</SheetTrigger>
      <SheetContent side="right" className="w-full max-w-lg">
        <SheetHeader>
          <SheetTitle>
            <h1 className="text-2xl font-bold">Edit Inventory Details</h1>
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form className="flex flex-col space-y-4 p-4">
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
                      } w-full`}
                      type="text"
                      {...field}
                      disabled={loading}
                      onChange={onValueChange}
                      value={form.watch("name")}
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
                    <Textarea
                      {...field}
                      value={form.watch("description")}
                      placeholder="Brief of your inventory..."
                      onChange={(e) => {
                        form.setValue("description", e.target.value);
                      }}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400 text-end" />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end w-full gap-4">
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant={"outline"}
                  disabled={loading}
                  onClick={() => {
                    form.reset();
                  }}
                  className="cursor-pointer"
                >
                  <XIcon size={16} /> Cancel
                </Button>
              </SheetTrigger>
              <Button
                disabled={nameExists || loading || inventoryName.length < 3}
                type="submit"
                className="cursor-pointer"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsDialog;
