/*
  Warnings:

  - You are about to drop the `Authorisation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AgentToAuthorisation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_AgentToAuthorisation` DROP FOREIGN KEY `_AgentToAuthorisation_A_fkey`;

-- DropForeignKey
ALTER TABLE `_AgentToAuthorisation` DROP FOREIGN KEY `_AgentToAuthorisation_B_fkey`;

-- DropTable
DROP TABLE `Authorisation`;

-- DropTable
DROP TABLE `_AgentToAuthorisation`;

-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Category_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AgentCategoryPermission` (
    `id` VARCHAR(191) NOT NULL,
    `agentId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `permission` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AgentCategoryPermission` ADD CONSTRAINT `AgentCategoryPermission_agentId_fkey` FOREIGN KEY (`agentId`) REFERENCES `Agent`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AgentCategoryPermission` ADD CONSTRAINT `AgentCategoryPermission_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
