/*
  Warnings:

  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_role_fk";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "first_name" DROP NOT NULL,
ALTER COLUMN "last_name" DROP NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "id_user_role" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_fk" FOREIGN KEY ("id_user_role") REFERENCES "user_role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
