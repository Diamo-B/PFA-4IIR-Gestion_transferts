-- CreateTable
CREATE TABLE `Period` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `start` DATETIME(3) NOT NULL,
    `end` DATETIME(3) NOT NULL,
    `price` DOUBLE NOT NULL,

    UNIQUE INDEX `Period_label_key`(`label`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
