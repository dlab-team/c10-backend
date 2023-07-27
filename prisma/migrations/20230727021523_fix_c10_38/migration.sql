/*
  Warnings:

  - You are about to drop the `profile_current_situation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profile_to_years_exp` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "profile_current_situation" DROP CONSTRAINT "better_current_situation_fk";

-- DropForeignKey
ALTER TABLE "profile_current_situation" DROP CONSTRAINT "user_profile_fk";

-- DropForeignKey
ALTER TABLE "profile_to_years_exp" DROP CONSTRAINT "user_profile_fk";

-- DropForeignKey
ALTER TABLE "profile_to_years_exp" DROP CONSTRAINT "years_experience_fk";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_role_fk";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "first_name" DROP NOT NULL,
ALTER COLUMN "last_name" DROP NOT NULL,
ALTER COLUMN "id_user_role" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user_profile" ADD COLUMN     "id_better_current_situation" INTEGER,
ADD COLUMN     "id_years_experience" INTEGER,
ALTER COLUMN "highest_edu_level" DROP NOT NULL,
ALTER COLUMN "current_edu_status" DROP NOT NULL,
ALTER COLUMN "english_level" DROP NOT NULL;

-- DropTable
DROP TABLE "profile_current_situation";

-- DropTable
DROP TABLE "profile_to_years_exp";

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_fk" FOREIGN KEY ("id_user_role") REFERENCES "user_role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "better_current_situation_fk" FOREIGN KEY ("id_better_current_situation") REFERENCES "better_current_situation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "years_experience_fk" FOREIGN KEY ("id_years_experience") REFERENCES "years_experience"("id") ON DELETE SET NULL ON UPDATE CASCADE;
