-- DropForeignKey
ALTER TABLE "InventoryActivityLog" DROP CONSTRAINT "InventoryActivityLog_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "SystemActivityLog" DROP CONSTRAINT "SystemActivityLog_userId_fkey";

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemActivityLog" ADD CONSTRAINT "SystemActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryActivityLog" ADD CONSTRAINT "InventoryActivityLog_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
