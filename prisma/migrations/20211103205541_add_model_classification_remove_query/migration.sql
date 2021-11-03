/*
  Warnings:

  - You are about to drop the column `query` on the `classifications` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `classifications_query_key` ON `classifications`;

-- AlterTable
ALTER TABLE `classifications` DROP COLUMN `query`;
