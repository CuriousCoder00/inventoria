import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { StatCardProps } from "@/lib/index.types";
import { TrendingDown, TrendingUp } from "lucide-react";

const StatCard = ({title, value, trend}: StatCardProps) => {
    const isTrendPositive = trend.startsWith("+");
    return(
        <Card className="w-full shadow-md rounded-lg flex flex-col p-4">
            <CardHeader className="flex justify-between items-center dark:text-neutral-300 text-neutral-700">{title}</CardHeader>
            <CardContent className="flex justify-between items-center text-4xl font-bold">
                {value}
            </CardContent>
            <CardFooter className="flex justify-start items-center">
                {
                    isTrendPositive ? (
                        <div className="text-green-500 flex items-center">
                            <TrendingUp className="mr-2" />
                            {trend}
                        </div>
                    ) : (
                        <div className="text-red-500 flex items-center">
                            <TrendingDown className="mr-2" />
                            {trend}
                        </div>
                    )
                }
                <span className="ml-1 text-sm dark:text-neutral-500 text-neutral-600">vs last month</span>
            </CardFooter>
        </Card>
    );
}

export default StatCard
