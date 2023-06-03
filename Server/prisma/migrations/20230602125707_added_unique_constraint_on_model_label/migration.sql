/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `Model` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Model_label_key` ON `Model`(`label`);
