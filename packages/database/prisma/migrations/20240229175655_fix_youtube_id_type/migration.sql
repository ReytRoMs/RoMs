/*
  Warnings:

  - Changed the type of `youtube_id` on the `Question` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "youtube_id";
ALTER TABLE "Question" ADD COLUMN     "youtube_id" STRING(11) NOT NULL;
