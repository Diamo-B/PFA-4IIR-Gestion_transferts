-- CreateTable
CREATE TABLE `Reservation` (
    `id` VARCHAR(191) NOT NULL,
    `ReservationDate` DATETIME(3) NOT NULL,
    `ReturnDate` DATETIME(3) NULL,
    `state` ENUM('PENDING', 'VALIDATED', 'CONFIRMED', 'PAYED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `VehiclesCount` INTEGER NOT NULL DEFAULT 1,
    `Travelers` INTEGER NOT NULL,
    `TotalPrice` DOUBLE NOT NULL DEFAULT 0,
    `Luxury` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `transferPathID` VARCHAR(191) NOT NULL,
    `periodId` VARCHAR(191) NOT NULL,
    `clientID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ExtraToReservation` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ExtraToReservation_AB_unique`(`A`, `B`),
    INDEX `_ExtraToReservation_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ReservationToVehicule` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ReservationToVehicule_AB_unique`(`A`, `B`),
    INDEX `_ReservationToVehicule_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_transferPathID_fkey` FOREIGN KEY (`transferPathID`) REFERENCES `transferPath`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_periodId_fkey` FOREIGN KEY (`periodId`) REFERENCES `Period`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_clientID_fkey` FOREIGN KEY (`clientID`) REFERENCES `Client`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ExtraToReservation` ADD CONSTRAINT `_ExtraToReservation_A_fkey` FOREIGN KEY (`A`) REFERENCES `Extra`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ExtraToReservation` ADD CONSTRAINT `_ExtraToReservation_B_fkey` FOREIGN KEY (`B`) REFERENCES `Reservation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ReservationToVehicule` ADD CONSTRAINT `_ReservationToVehicule_A_fkey` FOREIGN KEY (`A`) REFERENCES `Reservation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ReservationToVehicule` ADD CONSTRAINT `_ReservationToVehicule_B_fkey` FOREIGN KEY (`B`) REFERENCES `Vehicule`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
