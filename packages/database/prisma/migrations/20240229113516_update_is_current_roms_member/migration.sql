/*
  Warnings:

  - You are about to drop the column `current_roms_member` on the `SessionUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SessionUser" DROP COLUMN "current_roms_member";
ALTER TABLE "SessionUser" ADD COLUMN     "is_current_roms_member" BOOL NOT NULL DEFAULT false;
