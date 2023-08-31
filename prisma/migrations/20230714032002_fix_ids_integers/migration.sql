-- CreateTable
CREATE TABLE "active_visa" (
    "id" SERIAL NOT NULL,
    "country" VARCHAR(18) NOT NULL,

    CONSTRAINT "active_visa_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "availability" (
    "id" SERIAL NOT NULL,
    "availability" VARCHAR(10) NOT NULL,

    CONSTRAINT "availability_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "better_current_situation" (
    "id" SERIAL NOT NULL,
    "situation" VARCHAR NOT NULL,

    CONSTRAINT "better_current_situation_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(20) NOT NULL,
    "last_name" VARCHAR(20) NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "phone_number" VARCHAR(12) NOT NULL,
    "company" VARCHAR(40) NOT NULL,
    "questions" TEXT,

    CONSTRAINT "companies_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies_to_position" (
    "id" SERIAL NOT NULL,
    "id_companies" INTEGER NOT NULL,
    "id_target_position" INTEGER NOT NULL,

    CONSTRAINT "companies_to_position_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "current_job_status" (
    "id" SERIAL NOT NULL,
    "state" VARCHAR NOT NULL,

    CONSTRAINT "current_job_status_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "education_received" (
    "id" SERIAL NOT NULL,
    "career" VARCHAR(80) NOT NULL,
    "name_institution" VARCHAR(60) NOT NULL,
    "type_institution" VARCHAR(60) NOT NULL,
    "id_user_profile" INTEGER NOT NULL,

    CONSTRAINT "education_received_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "frameworks_or_batabase" (
    "id" SERIAL NOT NULL,
    "technology_name" VARCHAR(28) NOT NULL,

    CONSTRAINT "frameworks_or_batabase_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_active_visa" (
    "id" SERIAL NOT NULL,
    "id_active_visa" INTEGER NOT NULL,
    "id_user_profile" INTEGER NOT NULL,

    CONSTRAINT "profile_active_visa_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_current_situation" (
    "id" SERIAL NOT NULL,
    "id_better_current_situation" INTEGER NOT NULL,
    "id_user_profile" INTEGER NOT NULL,

    CONSTRAINT "profile_current_situation_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_to_availability" (
    "id" SERIAL NOT NULL,
    "id_availability" INTEGER NOT NULL,
    "id_user_profile" INTEGER NOT NULL,

    CONSTRAINT "profile_to_availability_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_to_soft_skill" (
    "id" SERIAL NOT NULL,
    "id_soft_skills" INTEGER NOT NULL,
    "id_user_profile" INTEGER NOT NULL,

    CONSTRAINT "profile_to_soft_skill_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_to_years_exp" (
    "id" SERIAL NOT NULL,
    "id_years_experience" INTEGER NOT NULL,
    "id_user_profile" INTEGER NOT NULL,

    CONSTRAINT "profile_to_years_exp_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "programming_language" (
    "id" SERIAL NOT NULL,
    "language" VARCHAR(28) NOT NULL,

    CONSTRAINT "programming_language_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "soft_skills" (
    "id" SERIAL NOT NULL,
    "skill" VARCHAR(28) NOT NULL,

    CONSTRAINT "soft_skills_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "target_position" (
    "id" SERIAL NOT NULL,
    "position" VARCHAR(60) NOT NULL,

    CONSTRAINT "target_position_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "technical_test_tools" (
    "id" SERIAL NOT NULL,
    "approved" BOOLEAN,
    "score" INTEGER,
    "date_completed" DATE,
    "id_tools" INTEGER NOT NULL,
    "id_user_profile" INTEGER NOT NULL,

    CONSTRAINT "technical_test_tools_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "technology_expertise" (
    "id" SERIAL NOT NULL,
    "level" INTEGER NOT NULL,
    "others" TEXT,
    "id_programming_language" INTEGER,
    "id_frameworks_or_batabase" INTEGER,
    "id_tools" INTEGER,
    "id_user_profile" INTEGER NOT NULL,

    CONSTRAINT "technology_expertise_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tools" (
    "id" SERIAL NOT NULL,
    "tool" VARCHAR(28) NOT NULL,

    CONSTRAINT "tools_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tt_framework_base" (
    "id" SERIAL NOT NULL,
    "approved" BOOLEAN,
    "score" INTEGER,
    "date_completed" DATE,
    "id_frameworks_or_batabase" INTEGER NOT NULL,
    "id_user_profile" INTEGER NOT NULL,

    CONSTRAINT "tt_framework_base_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tt_pro_language" (
    "id" SERIAL NOT NULL,
    "approved" BOOLEAN,
    "score" INTEGER,
    "date_completed" DATE,
    "id_programming_language" INTEGER NOT NULL,
    "id_user_profile" INTEGER NOT NULL,

    CONSTRAINT "technical_test_pro_language_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR NOT NULL,
    "last_name" VARCHAR NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "password" VARCHAR,
    "id_user_role" INTEGER NOT NULL,

    CONSTRAINT "user_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profile" (
    "id" SERIAL NOT NULL,
    "phone_number" VARCHAR(12) NOT NULL,
    "city" VARCHAR(20) NOT NULL,
    "country" VARCHAR(18) NOT NULL,
    "genre" VARCHAR(20) NOT NULL,
    "highest_edu_level" VARCHAR(20) NOT NULL,
    "current_edu_status" VARCHAR(20) NOT NULL,
    "english_level" VARCHAR(16) NOT NULL,
    "url_cv" VARCHAR,
    "url_linkedin" VARCHAR,
    "url_github" VARCHAR,
    "url_portfolio" VARCHAR,
    "preferred_project" TEXT,
    "work_expectation" TEXT,
    "id_current_job_status" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "user_profile_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_role" (
    "id" SERIAL NOT NULL,
    "role" VARCHAR NOT NULL,

    CONSTRAINT "user_role_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_to_position" (
    "id" SERIAL NOT NULL,
    "id_target_position" INTEGER NOT NULL,
    "id_user_profile" INTEGER NOT NULL,

    CONSTRAINT "user_to_position_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "years_experience" (
    "id" SERIAL NOT NULL,
    "years" VARCHAR(40) NOT NULL,

    CONSTRAINT "years_experience_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_current_situation_uq" ON "profile_current_situation"("id_user_profile");

-- CreateIndex
CREATE UNIQUE INDEX "profile_to_years_exp_uq" ON "profile_to_years_exp"("id_user_profile");

-- CreateIndex
CREATE UNIQUE INDEX "technical_test_tools_uq" ON "technical_test_tools"("id_tools");

-- CreateIndex
CREATE UNIQUE INDEX "tt_framework_base_uq" ON "tt_framework_base"("id_frameworks_or_batabase");

-- CreateIndex
CREATE UNIQUE INDEX "tt_pro_language_uq" ON "tt_pro_language"("id_programming_language");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_uq" ON "user_profile"("id_user");

-- AddForeignKey
ALTER TABLE "companies_to_position" ADD CONSTRAINT "companies_fk" FOREIGN KEY ("id_companies") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies_to_position" ADD CONSTRAINT "target_position_fk" FOREIGN KEY ("id_target_position") REFERENCES "target_position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education_received" ADD CONSTRAINT "user_profile_fk" FOREIGN KEY ("id_user_profile") REFERENCES "user_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_active_visa" ADD CONSTRAINT "active_visa_fk" FOREIGN KEY ("id_active_visa") REFERENCES "active_visa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_active_visa" ADD CONSTRAINT "user_profile_fk" FOREIGN KEY ("id_user_profile") REFERENCES "user_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_current_situation" ADD CONSTRAINT "better_current_situation_fk" FOREIGN KEY ("id_better_current_situation") REFERENCES "better_current_situation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_current_situation" ADD CONSTRAINT "user_profile_fk" FOREIGN KEY ("id_user_profile") REFERENCES "user_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_to_availability" ADD CONSTRAINT "availability_fk" FOREIGN KEY ("id_availability") REFERENCES "availability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_to_availability" ADD CONSTRAINT "user_profile_fk" FOREIGN KEY ("id_user_profile") REFERENCES "user_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_to_soft_skill" ADD CONSTRAINT "soft_skills_fk" FOREIGN KEY ("id_soft_skills") REFERENCES "soft_skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_to_soft_skill" ADD CONSTRAINT "user_profile_fk" FOREIGN KEY ("id_user_profile") REFERENCES "user_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_to_years_exp" ADD CONSTRAINT "user_profile_fk" FOREIGN KEY ("id_user_profile") REFERENCES "user_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_to_years_exp" ADD CONSTRAINT "years_experience_fk" FOREIGN KEY ("id_years_experience") REFERENCES "years_experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technical_test_tools" ADD CONSTRAINT "tools_fk" FOREIGN KEY ("id_tools") REFERENCES "tools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technical_test_tools" ADD CONSTRAINT "user_profile_fk" FOREIGN KEY ("id_user_profile") REFERENCES "user_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technology_expertise" ADD CONSTRAINT "frameworks_or_batabase_fk" FOREIGN KEY ("id_frameworks_or_batabase") REFERENCES "frameworks_or_batabase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technology_expertise" ADD CONSTRAINT "programming_language_fk" FOREIGN KEY ("id_programming_language") REFERENCES "programming_language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technology_expertise" ADD CONSTRAINT "tools_fk" FOREIGN KEY ("id_tools") REFERENCES "tools"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technology_expertise" ADD CONSTRAINT "user_profile_fk" FOREIGN KEY ("id_user_profile") REFERENCES "user_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tt_framework_base" ADD CONSTRAINT "frameworks_or_batabase_fk" FOREIGN KEY ("id_frameworks_or_batabase") REFERENCES "frameworks_or_batabase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tt_framework_base" ADD CONSTRAINT "user_profile_fk" FOREIGN KEY ("id_user_profile") REFERENCES "user_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tt_pro_language" ADD CONSTRAINT "programming_language_fk" FOREIGN KEY ("id_programming_language") REFERENCES "programming_language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tt_pro_language" ADD CONSTRAINT "user_profile_fk" FOREIGN KEY ("id_user_profile") REFERENCES "user_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_fk" FOREIGN KEY ("id_user_role") REFERENCES "user_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "current_job_status_fk" FOREIGN KEY ("id_current_job_status") REFERENCES "current_job_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_fk" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_position" ADD CONSTRAINT "target_position_fk" FOREIGN KEY ("id_target_position") REFERENCES "target_position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_position" ADD CONSTRAINT "user_profile_fk" FOREIGN KEY ("id_user_profile") REFERENCES "user_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
