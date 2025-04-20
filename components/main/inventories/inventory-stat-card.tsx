import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { InventoryStatCardProps } from "@/lib/index.types";

const InventoryStatCard = ({ title, value, icon }: InventoryStatCardProps) => {
  return (
    <Card className="w-full shadow-md rounded-lg flex flex-col p-4">
      <CardHeader className="flex justify-between items-center dark:text-neutral-300 text-neutral-700 text-sm font-medium">
        {title}
        <div className="text-xl text-neutral-500 dark:text-neutral-400">
          {icon}
        </div>
      </CardHeader>
      <CardContent className="text-3xl font-semibold text-neutral-800 dark:text-neutral-200 mt-2">
        {value}
      </CardContent>
    </Card>
  );
};

export default InventoryStatCard;
