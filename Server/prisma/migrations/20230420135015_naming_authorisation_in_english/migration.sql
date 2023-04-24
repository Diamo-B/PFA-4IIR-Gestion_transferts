/*
  Warnings:

  - You are about to drop the `Autorisation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AgentToAutorisation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_AgentToAutorisation` DROP FOREIGN KEY `_AgentToAutorisation_A_fkey`;

-- DropForeignKey
ALTER TABLE `_AgentToAutorisation` DROP FOREIGN KEY `_AgentToAutorisation_B_fkey`;

-- DropTable
DROP TABLE `Autorisation`;

-- DropTable
DROP TABLE `_AgentToAutorisation`;

-- CreateTable
CREATE TABLE `Authorisation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `level` ENUM('read', 'write', 'add', 'remove') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AgentToAuthorisation` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AgentToAuthorisation_AB_unique`(`A`, `B`),
    INDEX `_AgentToAuthorisation_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AgentToAuthorisation` ADD CONSTRAINT `_AgentToAuthorisation_A_fkey` FOREIGN KEY (`A`) REFERENCES `Agent`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AgentToAuthorisation` ADD CONSTRAINT `_AgentToAuthorisation_B_fkey` FOREIGN KEY (`B`) REFERENCES `Authorisation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
