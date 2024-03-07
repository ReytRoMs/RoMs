-- AlterTable
ALTER TABLE "SessionUser" ADD COLUMN     "false_negative" INT4 NOT NULL DEFAULT 0;
ALTER TABLE "SessionUser" ADD COLUMN     "false_positive" INT4 NOT NULL DEFAULT 0;
ALTER TABLE "SessionUser" ADD COLUMN     "true_negative" INT4 NOT NULL DEFAULT 0;
ALTER TABLE "SessionUser" ADD COLUMN     "true_positive" INT4 NOT NULL DEFAULT 0;
