/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `partners` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reservation_id]` on the table `reservation_tours` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reservation_id]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_id]` on the table `tickets` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_id]` on the table `tours` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `partners_user_id_key` ON `partners`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `reservation_tours_reservation_id_key` ON `reservation_tours`(`reservation_id`);

-- CreateIndex
CREATE UNIQUE INDEX `reviews_reservation_id_key` ON `reviews`(`reservation_id`);

-- CreateIndex
CREATE UNIQUE INDEX `tickets_product_id_key` ON `tickets`(`product_id`);

-- CreateIndex
CREATE UNIQUE INDEX `tours_product_id_key` ON `tours`(`product_id`);
