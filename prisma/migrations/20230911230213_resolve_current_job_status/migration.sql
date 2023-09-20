/*
  Warnings:

  - You are about to drop the column `id_user_profile` on the `current_job_status` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "current_job_status" DROP CONSTRAINT "user_profile_fk";

-- AlterTable
ALTER TABLE "current_job_status" DROP COLUMN "id_user_profile";

-- AlterTable
ALTER TABLE "user_profile" ADD COLUMN     "id_current_job_status" INTEGER;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "current_job_status_fk" FOREIGN KEY ("id_current_job_status") REFERENCES "current_job_status"("id") ON DELETE SET NULL ON UPDATE CASCADE;
