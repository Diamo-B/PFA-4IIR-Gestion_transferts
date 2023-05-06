-- DropForeignKey
ALTER TABLE `AgentCategoryPermission` DROP FOREIGN KEY `AgentCategoryPermission_agentId_fkey`;

-- DropForeignKey
ALTER TABLE `AgentCategoryPermission` DROP FOREIGN KEY `AgentCategoryPermission_categoryId_fkey`;

-- AddForeignKey
ALTER TABLE `AgentCategoryPermission` ADD CONSTRAINT `AgentCategoryPermission_agentId_fkey` FOREIGN KEY (`agentId`) REFERENCES `Agent`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AgentCategoryPermission` ADD CONSTRAINT `AgentCategoryPermission_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
