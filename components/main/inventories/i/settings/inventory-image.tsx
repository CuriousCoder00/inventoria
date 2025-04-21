"use client";
import { uploadToCloudinary } from "@/actions/cdn-upload";
import { updateImage } from "@/actions/inventory/update";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fileToBase64 } from "@/lib/utils";
import { ImageUp } from "lucide-react";
import React from "react";

const InventoryImage = ({
  inventoryId,
  name,
  imageUrl,
}: {
  inventoryId: number;
  name: string;
  imageUrl: string;
}) => {
  const [image, setImage] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (imageUrl) {
      setImage(imageUrl);
    }
  }, [imageUrl]);
  const uploadInventoryImage = async (file: File) => {
    const base64_image = await fileToBase64(file);
    const res = await uploadToCloudinary(base64_image as string);
    if (res.success) {
      setImage(res.url);
      await updateImage(res.url, inventoryId);
    }
    return res.url;
  };
  return (
    <div className="relative rounded-full overflow-hidden w-50 h-50 border-border">
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <Avatar className="aspect-square w-50 h-50">
          <AvatarImage src={image as string} alt={name as string} />
          <AvatarFallback className="text-center text-4xl font-bold">
            {name
              ?.split(/[\s-_]/)
              .map((n) => n.charAt(0).toUpperCase())
              .join("")}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <Input
          name="avatar"
          id="avatar"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              uploadInventoryImage(file);
            }
          }}
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10 overflow-hidden rounded-full">
        <Label
          htmlFor="avatar"
          className="flex items-end justify-center w-full h-full cursor-pointer"
        >
          <span className="flex w-full justify-center bg-black/70 py-5">
            <ImageUp />
          </span>
        </Label>
      </div>
    </div>
  );
};

export default InventoryImage;
