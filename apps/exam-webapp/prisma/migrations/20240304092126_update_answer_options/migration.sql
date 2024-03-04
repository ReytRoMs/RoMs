/*
  Warnings:

  - The values [ACCEPTABLE,LAME,VERY_LAME] on the enum `AnswerOption` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "AnswerOption" ADD VALUE 'GOOD';
ALTER TYPE "AnswerOption" ADD VALUE 'IMPERFECT';
ALTER TYPE "AnswerOption" ADD VALUE 'IMPAIRED';
ALTER TYPE "AnswerOption" ADD VALUE 'SEVERELY_IMPAIRED';
ALTER TYPE "AnswerOption"DROP VALUE 'ACCEPTABLE';
ALTER TYPE "AnswerOption"DROP VALUE 'LAME';
ALTER TYPE "AnswerOption"DROP VALUE 'VERY_LAME';
