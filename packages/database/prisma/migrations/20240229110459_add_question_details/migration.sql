-- CreateEnum
CREATE TYPE "AnswerOption" AS ENUM ('ACCEPTABLE', 'LAME', 'VERY_LAME');

-- AlterTable
ALTER TABLE "SessionUser" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Question" (
    "id" UUID NOT NULL,
    "order" INT4 NOT NULL,
    "youtube_id" UUID NOT NULL,
    "UsersAnswer" "AnswerOption",
    "session_user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_session_user_id_fkey" FOREIGN KEY ("session_user_id") REFERENCES "SessionUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
