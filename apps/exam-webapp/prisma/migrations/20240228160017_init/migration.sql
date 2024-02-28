-- CreateEnum
CREATE TYPE "UsersPrimaryRole" AS ENUM ('FARMER', 'VET', 'SPECIALIST_SCORER', 'AUDITOR', 'RESEARCHER', 'HOOF_TRIMMER', 'CONSULTANT_OR_NUTRITIONIST', 'OTHER');

-- CreateTable
CREATE TABLE "SessionUser" (
    "id" UUID NOT NULL,
    "current_roms_member" BOOL NOT NULL,
    "UsersPrimaryRole" "UsersPrimaryRole" NOT NULL,

    CONSTRAINT "SessionUser_pkey" PRIMARY KEY ("id")
);
