/*
  Warnings:

  - A unique constraint covering the columns `[label,typeId]` on the table `Extra` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Extra_label_key` ON `extra`;

-- CreateIndex
CREATE UNIQUE INDEX `Extra_label_typeId_key` ON `Extra`(`label`, `typeId`);
