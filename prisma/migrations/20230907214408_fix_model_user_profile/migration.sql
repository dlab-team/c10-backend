-- AlterTable
ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user_profile" ALTER COLUMN "phone_number" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "genre" DROP NOT NULL;
