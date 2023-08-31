/*
  Warnings:

  - Made the column `id_programming_language` on table `technology_expertise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_frameworks_or_batabase` on table `technology_expertise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_tools` on table `technology_expertise` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "technology_expertise" DROP CONSTRAINT "frameworks_or_batabase_fk";

-- DropForeignKey
ALTER TABLE "technology_expertise" DROP CONSTRAINT "programming_language_fk";

-- DropForeignKey
ALTER TABLE "technology_expertise" DROP CONSTRAINT "tools_fk";

-- AlterTable
ALTER TABLE "technology_expertise" ALTER COLUMN "id_programming_language" SET NOT NULL,
ALTER COLUMN "id_frameworks_or_batabase" SET NOT NULL,
ALTER COLUMN "id_tools" SET NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "resetToken" TEXT,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "PasswordReset" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordReset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PasswordReset_token_key" ON "PasswordReset"("token");

-- AddForeignKey
ALTER TABLE "technology_expertise" ADD CONSTRAINT "frameworks_or_batabase_fk" FOREIGN KEY ("id_frameworks_or_batabase") REFERENCES "frameworks_or_batabase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technology_expertise" ADD CONSTRAINT "programming_language_fk" FOREIGN KEY ("id_programming_language") REFERENCES "programming_language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technology_expertise" ADD CONSTRAINT "tools_fk" FOREIGN KEY ("id_tools") REFERENCES "tools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
