-- CreateTable
CREATE TABLE `classifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `query` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `classifications_name_key`(`name`),
    UNIQUE INDEX `classifications_query_key`(`query`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classification_products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `classification_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `classification_products` ADD CONSTRAINT `classification_products_classification_id_fkey` FOREIGN KEY (`classification_id`) REFERENCES `classifications`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `classification_products` ADD CONSTRAINT `classification_products_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
