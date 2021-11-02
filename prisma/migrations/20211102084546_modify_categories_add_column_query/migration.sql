/*
  Warnings:

  - A unique constraint covering the columns `[query]` on the table `main_categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[query]` on the table `service_categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[query]` on the table `sub_categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `query` to the `main_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `query` to the `service_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `query` to the `sub_categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `main_categories` ADD COLUMN `query` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `service_categories` ADD COLUMN `query` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `sub_categories` ADD COLUMN `query` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `main_categories_query_key` ON `main_categories`(`query`);

-- CreateIndex
CREATE UNIQUE INDEX `service_categories_query_key` ON `service_categories`(`query`);

-- CreateIndex
CREATE UNIQUE INDEX `sub_categories_query_key` ON `sub_categories`(`query`);
