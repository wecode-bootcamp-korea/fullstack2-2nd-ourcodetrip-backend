/*
  Warnings:

  - A unique constraint covering the columns `[english_name]` on the table `cities` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `english_name` to the `cities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cities` ADD COLUMN `english_name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `cities_english_name_key` ON `cities`(`english_name`);
