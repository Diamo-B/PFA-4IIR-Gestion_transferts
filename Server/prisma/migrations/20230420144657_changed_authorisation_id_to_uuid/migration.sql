/*
  Warnings:

  - The primary key for the `Authorisation` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `_AgentToAuthorisation` DROP FOREIGN KEY `_AgentToAuthorisation_B_fkey`;

-- AlterTable
ALTER TABLE `Authorisation` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `_AgentToAuthorisation` MODIFY `B` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `_AgentToAuthorisation` ADD CONSTRAINT `_AgentToAuthorisation_B_fkey` FOREIGN KEY (`B`) REFERENCES `Authorisation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
