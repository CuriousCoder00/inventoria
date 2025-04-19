/*
  Warnings:

  - You are about to drop the column `userId` on the `InventoryActivityLog` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "InventoryActivityLog" DROP CONSTRAINT "InventoryActivityLog_userId_fkey";

-- AlterTable
ALTER TABLE "InventoryActivityLog" DROP COLUMN "userId";
