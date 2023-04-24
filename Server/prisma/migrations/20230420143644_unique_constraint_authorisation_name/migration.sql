/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Authorisation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Authorisation_name_key` ON `Authorisation`(`name`);
