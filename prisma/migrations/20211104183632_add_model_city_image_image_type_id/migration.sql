/*
  Warnings:

  - Added the required column `image_type_id` to the `city_images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `city_images` ADD COLUMN `image_type_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `city_images` ADD CONSTRAINT `city_images_image_type_id_fkey` FOREIGN KEY (`image_type_id`) REFERENCES `image_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
