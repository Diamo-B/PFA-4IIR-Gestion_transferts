/*
  Warnings:

  - The values [crud] on the enum `Permission_value` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Permission` MODIFY `value` ENUM('read', 'create', 'update', 'delete') NOT NULL;
