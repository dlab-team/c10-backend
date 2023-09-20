/*
  Warnings:

  - You are about to drop the column `id_current_job_status` on the `user_profile` table. All the data in the column will be lost.
  - Added the required column `id_user_profile` to the `current_job_status` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_profile" DROP CONSTRAINT "current_job_status_fk";

-- AlterTable
ALTER TABLE "current_job_status" ADD COLUMN     "id_user_profile" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user_profile" DROP COLUMN "id_current_job_status";

-- AddForeignKey
ALTER TABLE "current_job_status" ADD CONSTRAINT "user_profile_fk" FOREIGN KEY ("id_user_profile") REFERENCES "user_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
