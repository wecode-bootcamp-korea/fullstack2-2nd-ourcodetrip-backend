/*
  Warnings:

  - You are about to drop the column `name` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `tours` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `cities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `countries` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `image_types` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `main_cateories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `option_list` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `partners` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `payment_types` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `platforms` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `product_types` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `service_categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `sub_categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `ticket_options` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `reviews` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `tickets` DROP COLUMN `name`;

-- AlterTable
ALTER TABLE `tours` DROP COLUMN `name`;

-- AlterTable
ALTER TABLE `user_profile_images` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `cities_name_key` ON `cities`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `countries_name_key` ON `countries`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `image_types_name_key` ON `image_types`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `main_cateories_name_key` ON `main_cateories`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `option_list_name_key` ON `option_list`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `partners_name_key` ON `partners`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `payment_types_name_key` ON `payment_types`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `platforms_name_key` ON `platforms`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `product_types_name_key` ON `product_types`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `products_name_key` ON `products`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `service_categories_name_key` ON `service_categories`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `sub_categories_name_key` ON `sub_categories`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `ticket_options_name_key` ON `ticket_options`(`name`);
