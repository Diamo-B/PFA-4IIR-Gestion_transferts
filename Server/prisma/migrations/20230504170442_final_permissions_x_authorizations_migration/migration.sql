/*
  Warnings:

  - You are about to drop the column `permission` on the `AgentCategoryPermission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `AgentCategoryPermission` DROP COLUMN `permission`;

-- CreateTable
CREATE TABLE `Permission` (
    `id` VARCHAR(191) NOT NULL,
    `value` ENUM('read', 'create', 'update', 'delete', 'crud') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AgentCategoryPermissionToPermission` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_AgentCategoryPermissionToPermission_AB_unique`(`A`, `B`),
    INDEX `_AgentCategoryPermissionToPermission_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AgentCategoryPermissionToPermission` ADD CONSTRAINT `_AgentCategoryPermissionToPermission_A_fkey` FOREIGN KEY (`A`) REFERENCES `AgentCategoryPermission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AgentCategoryPermissionToPermission` ADD CONSTRAINT `_AgentCategoryPermissionToPermission_B_fkey` FOREIGN KEY (`B`) REFERENCES `Permission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
