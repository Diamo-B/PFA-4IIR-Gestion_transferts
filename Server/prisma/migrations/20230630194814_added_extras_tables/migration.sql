-- AlterTable
ALTER TABLE `image` ADD COLUMN `ExtraId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Extra` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `params` JSON NOT NULL,
    `tarif` DOUBLE NOT NULL,
    `typeId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Extra_label_key`(`label`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExtraType` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ExtraType_label_key`(`label`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Extra` ADD CONSTRAINT `Extra_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `ExtraType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_ExtraId_fkey` FOREIGN KEY (`ExtraId`) REFERENCES `Extra`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
