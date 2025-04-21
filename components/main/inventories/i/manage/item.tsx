import React from "react";
import { X, Package, Tag, BarChart } from "lucide-react";
import { Item } from "@/lib/index.types";

interface ProductDetailProps {
  product: Item;
}

const ItemShowCase: React.FC<ProductDetailProps> = ({ product }) => {
  const formatStatus = (status: string): string => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "AVAILABLE":
        return "bg-emerald-500 text-emerald-800";
      case "OUT_OF_STOCK":
        return "bg-red-500 text-red-800";
      case "UNAVAILABLE":
        return "bg-gray-400 text-gray-800";
      default:
        return "bg-gray-400 text-gray-800";
    }
  };
  const statusColor = getStatusColor(status);
  return (
    <div className="flex items-center justify-center p-4 sm:p-0">
      <div className="relative">
        <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
          <div className="w-full md:w-1/2 h-72 md:h-auto relative">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="h-32 w-32" />
              </div>
            )}
            <div className="absolute top-4 left-4">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}
              >
                {formatStatus(product.status)}
              </span>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-6 overflow-y-auto">
            <div className="pb-6">
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-xl font-semibold">{product.price} Rs.</p>
            </div>

            <div className="border-t py-6">
              <h3 className="text-lg font-medium mb-3">Description</h3>
              <p className="">{product.description}</p>
            </div>

            <div className="border-t py-6">
              <h3 className="text-lg font-medium mb-3">Product Details</h3>

              <div className="grid grid-cols-1 gap-y-4 gap-x-8 sm:grid-cols-2">
                <div className="flex items-center">
                  <Tag className="h-5 w-5 mr-2" />
                  <div>
                    <p className="text-sm">Category</p>
                    <p className="text-sm font-medium">
                      {product.category || "Uncategorized"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <BarChart className="h-5 w-5 mr-2" />
                  <div>
                    <p className="text-sm">Inventory ID</p>
                    <p className="text-sm font-medium">{product.inventoryId}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6 pb-2">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm">Quantity Available</span>
                <span className="text-sm font-medium">
                  {product.quantity} units
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    product.quantity === 0
                      ? "bg-red-600"
                      : product.quantity < 10
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                  }`}
                  style={{
                    width: `${Math.min(100, (product.quantity / 50) * 100)}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemShowCase;
