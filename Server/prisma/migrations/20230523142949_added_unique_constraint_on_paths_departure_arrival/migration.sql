/*
  Warnings:

  - A unique constraint covering the columns `[departureId,arrivalId]` on the table `transferPath` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `transferPath_departureId_arrivalId_key` ON `transferPath`(`departureId`, `arrivalId`);
