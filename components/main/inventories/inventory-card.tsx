import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { InventoryCardProps } from "@/lib/index.types";
import { AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

const InventoryCard = ({
  name,
  description,
  items,
  status,
  image,
}: InventoryCardProps) => {
  return (
    <Card className="flex flex-col justify-between py-4 rounded-lg h-full">
      <CardHeader>
        <div className="flex item-center justify-between">
          <div className="flex items-center justify-start w-full h-full gap-2">
            <Avatar>
              <AvatarImage
                src={image as string}
                alt="Inventory Image"
                className="w-10 h-10 rounded-full"
              />
              <AvatarFallback className="rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
                {name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-md font-semibold uppercase">{name}</h3>
          </div>
          <Badge
            className="text-xs h-6"
            variant={
              (status as
                | "default"
                | "secondary"
                | "destructive"
                | "outline"
                | "ACTIVE"
                | "DRAFT"
                | "ARCHIVED"
                | "OUT_OF_STOCK") || "default"
            }
          >
            {status}
          </Badge>
        </div>
        <CardDescription>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <div className="flex items-center justify-start w-full h-full">
            <p className="text-sm text-muted-foreground">
              Total Products: {items.length}
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-start w-full h-full">
            <p className="text-sm text-muted-foreground">No Products</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InventoryCard;
