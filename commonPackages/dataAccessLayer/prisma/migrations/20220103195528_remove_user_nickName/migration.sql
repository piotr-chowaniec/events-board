/*
  Warnings:

  - You are about to drop the column `nick_name` on the `users` table. All the data in the column will be lost.
  - Made the column `first_name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "nick_name",
ALTER COLUMN "first_name" SET NOT NULL,
ALTER COLUMN "last_name" SET NOT NULL;
