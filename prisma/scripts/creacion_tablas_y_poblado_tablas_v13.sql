-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler version: 1.0.4
-- PostgreSQL version: 13.0
-- Project Site: pgmodeler.io
-- Model Author: ---
-- -- object: imakoadmin | type: ROLE --
-- -- DROP ROLE IF EXISTS imakoadmin;
-- CREATE ROLE imakoadmin WITH 
-- 	SUPERUSER
-- 	CREATEDB
-- 	CREATEROLE
-- 	INHERIT
-- 	LOGIN
-- 	REPLICATION
-- 	BYPASSRLS
-- 	 PASSWORD '********';
-- -- ddl-end --
-- 
-- object: adminc10 | type: ROLE --
-- DROP ROLE IF EXISTS adminc10;
CREATE ROLE adminc10 WITH 
	SUPERUSER
	CREATEDB
	CREATEROLE
	INHERIT
	LOGIN
	 PASSWORD 'adminc10dev';
-- ddl-end --


-- Database creation must be performed outside a multi lined SQL file. 
-- These commands were put in this file only as a convenience.
-- 
-- object: c10 | type: DATABASE --
-- DROP DATABASE IF EXISTS c10;
CREATE DATABASE c10
	ENCODING = 'UTF8'
	LC_COLLATE = 'en_US.utf8'
	LC_CTYPE = 'en_US.utf8'
	TABLESPACE = pg_default
	OWNER = adminc10;
-- ddl-end --


-- object: c10 | type: SCHEMA --
-- DROP SCHEMA IF EXISTS c10 CASCADE;
CREATE SCHEMA c10;
-- ddl-end --
ALTER SCHEMA c10 OWNER TO adminc10;
-- ddl-end --

SET search_path TO pg_catalog,public,c10;
-- ddl-end --

-- object: c10."user" | type: TABLE --
-- DROP TABLE IF EXISTS c10."user";
CREATE TABLE c10."user" (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	first_name varchar NOT NULL,
	last_name varchar NOT NULL,
	email varchar(30) NOT NULL,
	password varchar,
	id_user_role bigint NOT NULL,
	CONSTRAINT user_pk PRIMARY KEY (id)
)
TABLESPACE pg_default;
-- ddl-end --
ALTER TABLE c10."user" OWNER TO adminc10;
-- ddl-end --

-- object: c10.companies | type: TABLE --
-- DROP TABLE IF EXISTS c10.companies;
CREATE TABLE c10.companies (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	first_name varchar(20) NOT NULL,
	last_name varchar(20) NOT NULL,
	email varchar(30) NOT NULL,
	phone_number varchar(12) NOT NULL,
	company varchar(40) NOT NULL,
	questions text,
	CONSTRAINT companies_pk PRIMARY KEY (id)
)
TABLESPACE pg_default;
-- ddl-end --
ALTER TABLE c10.companies OWNER TO adminc10;
-- ddl-end --

-- object: c10.user_role | type: TABLE --
-- DROP TABLE IF EXISTS c10.user_role;
CREATE TABLE c10.user_role (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	role varchar NOT NULL,
	CONSTRAINT user_role_pk PRIMARY KEY (id)
)
TABLESPACE pg_default;
-- ddl-end --
ALTER TABLE c10.user_role OWNER TO adminc10;
-- ddl-end --

-- object: c10.user_profile | type: TABLE --
-- DROP TABLE IF EXISTS c10.user_profile;
CREATE TABLE c10.user_profile (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	phone_number varchar(12) NOT NULL,
	city varchar(20) NOT NULL,
	country varchar(18) NOT NULL,
	genre varchar(20) NOT NULL,
	highest_edu_level varchar(20) NOT NULL,
	current_edu_status varchar(20) NOT NULL,
	english_level varchar(16) NOT NULL,
	url_cv varchar,
	url_linkedin varchar,
	url_github varchar,
	url_portfolio varchar,
	preferred_project text,
	work_expectation text,
	id_current_job_status bigint NOT NULL,
	id_user bigint NOT NULL,
	CONSTRAINT user_profile_pk PRIMARY KEY (id)
)
TABLESPACE pg_default;
-- ddl-end --
ALTER TABLE c10.user_profile OWNER TO adminc10;
-- ddl-end --

-- object: user_role_fk | type: CONSTRAINT --
-- ALTER TABLE c10."user" DROP CONSTRAINT IF EXISTS user_role_fk CASCADE;
ALTER TABLE c10."user" ADD CONSTRAINT user_role_fk FOREIGN KEY (id_user_role)
REFERENCES c10.user_role (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: user_fk | type: CONSTRAINT --
-- ALTER TABLE c10.user_profile DROP CONSTRAINT IF EXISTS user_fk CASCADE;
ALTER TABLE c10.user_profile ADD CONSTRAINT user_fk FOREIGN KEY (id_user)
REFERENCES c10."user" (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: user_profile_uq | type: CONSTRAINT --
-- ALTER TABLE c10.user_profile DROP CONSTRAINT IF EXISTS user_profile_uq CASCADE;
ALTER TABLE c10.user_profile ADD CONSTRAINT user_profile_uq UNIQUE (id_user);
-- ddl-end --

-- object: c10.current_job_status | type: TABLE --
-- DROP TABLE IF EXISTS c10.current_job_status CASCADE;
CREATE TABLE c10.current_job_status (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	state varchar NOT NULL,
	CONSTRAINT current_job_status_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE c10.current_job_status OWNER TO adminc10;
-- ddl-end --

-- object: current_job_status_fk | type: CONSTRAINT --
-- ALTER TABLE c10.user_profile DROP CONSTRAINT IF EXISTS current_job_status_fk CASCADE;
ALTER TABLE c10.user_profile ADD CONSTRAINT current_job_status_fk FOREIGN KEY (id_current_job_status)
REFERENCES c10.current_job_status (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: c10.target_position | type: TABLE --
-- DROP TABLE IF EXISTS c10.target_position CASCADE;
CREATE TABLE c10.target_position (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	"position" varchar(60) NOT NULL,
	CONSTRAINT target_position_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE c10.target_position OWNER TO adminc10;
-- ddl-end --

-- object: c10.user_to_position | type: TABLE --
-- DROP TABLE IF EXISTS c10.user_to_position CASCADE;
CREATE TABLE c10.user_to_position (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	id_target_position bigint NOT NULL,
	id_user_profile bigint NOT NULL,
	CONSTRAINT user_to_position_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE c10.user_to_position OWNER TO adminc10;
-- ddl-end --

-- object: target_position_fk | type: CONSTRAINT --
-- ALTER TABLE c10.user_to_position DROP CONSTRAINT IF EXISTS target_position_fk CASCADE;
ALTER TABLE c10.user_to_position ADD CONSTRAINT target_position_fk FOREIGN KEY (id_target_position)
REFERENCES c10.target_position (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: user_profile_fk | type: CONSTRAINT --
-- ALTER TABLE c10.user_to_position DROP CONSTRAINT IF EXISTS user_profile_fk CASCADE;
ALTER TABLE c10.user_to_position ADD CONSTRAINT user_profile_fk FOREIGN KEY (id_user_profile)
REFERENCES c10.user_profile (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: c10.education_received | type: TABLE --
-- DROP TABLE IF EXISTS c10.education_received CASCADE;
CREATE TABLE c10.education_received (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	career varchar(80) NOT NULL,
	name_institution varchar(60) NOT NULL,
	type_institution varchar(60) NOT NULL,
	id_user_profile bigint NOT NULL,
	CONSTRAINT education_received_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE c10.education_received OWNER TO adminc10;
-- ddl-end --

-- object: user_profile_fk | type: CONSTRAINT --
-- ALTER TABLE c10.education_received DROP CONSTRAINT IF EXISTS user_profile_fk CASCADE;
ALTER TABLE c10.education_received ADD CONSTRAINT user_profile_fk FOREIGN KEY (id_user_profile)
REFERENCES c10.user_profile (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: c10.programming_language | type: TABLE --
-- DROP TABLE IF EXISTS c10.programming_language CASCADE;
CREATE TABLE c10.programming_language (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	language varchar(28) NOT NULL,
	CONSTRAINT programming_language_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE c10.programming_language OWNER TO adminc10;
-- ddl-end --

-- object: c10.technology_expertise | type: TABLE --
-- DROP TABLE IF EXISTS c10.technology_expertise CASCADE;
CREATE TABLE c10.technology_expertise (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	level integer NOT NULL,
	others text,
	id_programming_language bigint,
	id_frameworks_or_batabase bigint,
	id_tools bigint,
	id_user_profile bigint NOT NULL,
	CONSTRAINT technology_expertise_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE c10.technology_expertise OWNER TO adminc10;
-- ddl-end --

-- object: programming_language_fk | type: CONSTRAINT --
-- ALTER TABLE c10.technology_expertise DROP CONSTRAINT IF EXISTS programming_language_fk CASCADE;
ALTER TABLE c10.technology_expertise ADD CONSTRAINT programming_language_fk FOREIGN KEY (id_programming_language)
REFERENCES c10.programming_language (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: c10.frameworks_or_batabase | type: TABLE --
-- DROP TABLE IF EXISTS c10.frameworks_or_batabase CASCADE;
CREATE TABLE c10.frameworks_or_batabase (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	technology_name varchar(28) NOT NULL,
	CONSTRAINT frameworks_or_batabase_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE c10.frameworks_or_batabase OWNER TO adminc10;
-- ddl-end --

-- object: frameworks_or_batabase_fk | type: CONSTRAINT --
-- ALTER TABLE c10.technology_expertise DROP CONSTRAINT IF EXISTS frameworks_or_batabase_fk CASCADE;
ALTER TABLE c10.technology_expertise ADD CONSTRAINT frameworks_or_batabase_fk FOREIGN KEY (id_frameworks_or_batabase)
REFERENCES c10.frameworks_or_batabase (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: c10.tools | type: TABLE --
-- DROP TABLE IF EXISTS c10.tools CASCADE;
CREATE TABLE c10.tools (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	tool varchar(28) NOT NULL,
	CONSTRAINT tools_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE c10.tools OWNER TO adminc10;
-- ddl-end --

-- object: tools_fk | type: CONSTRAINT --
-- ALTER TABLE c10.technology_expertise DROP CONSTRAINT IF EXISTS tools_fk CASCADE;
ALTER TABLE c10.technology_expertise ADD CONSTRAINT tools_fk FOREIGN KEY (id_tools)
REFERENCES c10.tools (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_profile_fk | type: CONSTRAINT --
-- ALTER TABLE c10.technology_expertise DROP CONSTRAINT IF EXISTS user_profile_fk CASCADE;
ALTER TABLE c10.technology_expertise ADD CONSTRAINT user_profile_fk FOREIGN KEY (id_user_profile)
REFERENCES c10.user_profile (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: c10.soft_skills | type: TABLE --
-- DROP TABLE IF EXISTS c10.soft_skills CASCADE;
CREATE TABLE c10.soft_skills (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	skill varchar(28) NOT NULL,
	CONSTRAINT soft_skills_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE c10.soft_skills OWNER TO adminc10;
-- ddl-end --

-- object: c10.profile_to_soft_skill | type: TABLE --
-- DROP TABLE IF EXISTS c10.profile_to_soft_skill CASCADE;
CREATE TABLE c10.profile_to_soft_skill (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	id_soft_skills bigint NOT NULL,
	id_user_profile bigint NOT NULL,
	CONSTRAINT profile_to_soft_skill_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE c10.profile_to_soft_skill OWNER TO adminc10;
-- ddl-end --

-- object: soft_skills_fk | type: CONSTRAINT --
-- ALTER TABLE c10.profile_to_soft_skill DROP CONSTRAINT IF EXISTS soft_skills_fk CASCADE;
ALTER TABLE c10.profile_to_soft_skill ADD CONSTRAINT soft_skills_fk FOREIGN KEY (id_soft_skills)
REFERENCES c10.soft_skills (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: user_profile_fk | type: CONSTRAINT --
-- ALTER TABLE c10.profile_to_soft_skill DROP CONSTRAINT IF EXISTS user_profile_fk CASCADE;
ALTER TABLE c10.profile_to_soft_skill ADD CONSTRAINT user_profile_fk FOREIGN KEY (id_user_profile)
REFERENCES c10.user_profile (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: c10.years_experience | type: TABLE --
-- DROP TABLE IF EXISTS c10.years_experience CASCADE;
CREATE TABLE c10.years_experience (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	years varchar(40) NOT NULL,
	CONSTRAINT years_experience_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE c10.years_experience OWNER TO adminc10;
-- ddl-end --

-- object: c10.profile_to_years_exp | type: TABLE --
-- DROP TABLE IF EXISTS c10.profile_to_years_exp CASCADE;
CREATE TABLE c10.profile_to_years_exp (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	id_years_experience bigint NOT NULL,
	id_user_profile bigint NOT NULL,
	CONSTRAINT profile_to_years_exp_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE c10.profile_to_years_exp OWNER TO adminc10;
-- ddl-end --

-- object: years_experience_fk | type: CONSTRAINT --
-- ALTER TABLE c10.profile_to_years_exp DROP CONSTRAINT IF EXISTS years_experience_fk CASCADE;
ALTER TABLE c10.profile_to_years_exp ADD CONSTRAINT years_experience_fk FOREIGN KEY (id_years_experience)
REFERENCES c10.years_experience (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: user_profile_fk | type: CONSTRAINT --
-- ALTER TABLE c10.profile_to_years_exp DROP CONSTRAINT IF EXISTS user_profile_fk CASCADE;
ALTER TABLE c10.profile_to_years_exp ADD CONSTRAINT user_profile_fk FOREIGN KEY (id_user_profile)
REFERENCES c10.user_profile (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: profile_to_years_exp_uq | type: CONSTRAINT --
-- ALTER TABLE c10.profile_to_years_exp DROP CONSTRAINT IF EXISTS profile_to_years_exp_uq CASCADE;
ALTER TABLE c10.profile_to_years_exp ADD CONSTRAINT profile_to_years_exp_uq UNIQUE (id_user_profile);
-- ddl-end --

-- object: c10.availability | type: TABLE --
-- DROP TABLE IF EXISTS c10.availability CASCADE;
CREATE TABLE c10.availability (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	availability varchar(10) NOT NULL,
	CONSTRAINT availability_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE c10.availability OWNER TO adminc10;
-- ddl-end --

-- object: c10.profile_to_availability | type: TABLE --
-- DROP TABLE IF EXISTS c10.profile_to_availability CASCADE;
CREATE TABLE c10.profile_to_availability (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	id_availability bigint NOT NULL,
	id_user_profile bigint NOT NULL,
	CONSTRAINT profile_to_availability_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE c10.profile_to_availability OWNER TO adminc10;
-- ddl-end --

-- object: availability_fk | type: CONSTRAINT --
-- ALTER TABLE c10.profile_to_availability DROP CONSTRAINT IF EXISTS availability_fk CASCADE;
ALTER TABLE c10.profile_to_availability ADD CONSTRAINT availability_fk FOREIGN KEY (id_availability)
REFERENCES c10.availability (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: user_profile_fk | type: CONSTRAINT --
-- ALTER TABLE c10.profile_to_availability DROP CONSTRAINT IF EXISTS user_profile_fk CASCADE;
ALTER TABLE c10.profile_to_availability ADD CONSTRAINT user_profile_fk FOREIGN KEY (id_user_profile)
REFERENCES c10.user_profile (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: c10.better_current_situation | type: TABLE --
-- DROP TABLE IF EXISTS c10.better_current_situation CASCADE;
CREATE TABLE c10.better_current_situation (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	situation varchar NOT NULL,
	CONSTRAINT better_current_situation_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE c10.better_current_situation OWNER TO adminc10;
-- ddl-end --

-- object: c10.profile_current_situation | type: TABLE --
-- DROP TABLE IF EXISTS c10.profile_current_situation CASCADE;
CREATE TABLE c10.profile_current_situation (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	id_better_current_situation bigint NOT NULL,
	id_user_profile bigint NOT NULL,
	CONSTRAINT profile_current_situation_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE c10.profile_current_situation OWNER TO adminc10;
-- ddl-end --

-- object: better_current_situation_fk | type: CONSTRAINT --
-- ALTER TABLE c10.profile_current_situation DROP CONSTRAINT IF EXISTS better_current_situation_fk CASCADE;
ALTER TABLE c10.profile_current_situation ADD CONSTRAINT better_current_situation_fk FOREIGN KEY (id_better_current_situation)
REFERENCES c10.better_current_situation (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: user_profile_fk | type: CONSTRAINT --
-- ALTER TABLE c10.profile_current_situation DROP CONSTRAINT IF EXISTS user_profile_fk CASCADE;
ALTER TABLE c10.profile_current_situation ADD CONSTRAINT user_profile_fk FOREIGN KEY (id_user_profile)
REFERENCES c10.user_profile (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: profile_current_situation_uq | type: CONSTRAINT --
-- ALTER TABLE c10.profile_current_situation DROP CONSTRAINT IF EXISTS profile_current_situation_uq CASCADE;
ALTER TABLE c10.profile_current_situation ADD CONSTRAINT profile_current_situation_uq UNIQUE (id_user_profile);
-- ddl-end --

-- object: c10.active_visa | type: TABLE --
-- DROP TABLE IF EXISTS c10.active_visa CASCADE;
CREATE TABLE c10.active_visa (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	country varchar(18) NOT NULL,
	CONSTRAINT active_visa_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE c10.active_visa OWNER TO adminc10;
-- ddl-end --

-- object: c10.profile_active_visa | type: TABLE --
-- DROP TABLE IF EXISTS c10.profile_active_visa CASCADE;
CREATE TABLE c10.profile_active_visa (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	id_active_visa bigint NOT NULL,
	id_user_profile bigint NOT NULL,
	CONSTRAINT profile_active_visa_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE c10.profile_active_visa OWNER TO adminc10;
-- ddl-end --

-- object: active_visa_fk | type: CONSTRAINT --
-- ALTER TABLE c10.profile_active_visa DROP CONSTRAINT IF EXISTS active_visa_fk CASCADE;
ALTER TABLE c10.profile_active_visa ADD CONSTRAINT active_visa_fk FOREIGN KEY (id_active_visa)
REFERENCES c10.active_visa (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: user_profile_fk | type: CONSTRAINT --
-- ALTER TABLE c10.profile_active_visa DROP CONSTRAINT IF EXISTS user_profile_fk CASCADE;
ALTER TABLE c10.profile_active_visa ADD CONSTRAINT user_profile_fk FOREIGN KEY (id_user_profile)
REFERENCES c10.user_profile (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: c10.technical_test_tools | type: TABLE --
-- DROP TABLE IF EXISTS c10.technical_test_tools CASCADE;
CREATE TABLE c10.technical_test_tools (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	approved bool,
	score integer,
	date_completed date,
	id_tools bigint NOT NULL,
	id_user_profile bigint NOT NULL,
	CONSTRAINT technical_test_tools_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE c10.technical_test_tools OWNER TO adminc10;
-- ddl-end --

-- object: tools_fk | type: CONSTRAINT --
-- ALTER TABLE c10.technical_test_tools DROP CONSTRAINT IF EXISTS tools_fk CASCADE;
ALTER TABLE c10.technical_test_tools ADD CONSTRAINT tools_fk FOREIGN KEY (id_tools)
REFERENCES c10.tools (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: technical_test_tools_uq | type: CONSTRAINT --
-- ALTER TABLE c10.technical_test_tools DROP CONSTRAINT IF EXISTS technical_test_tools_uq CASCADE;
ALTER TABLE c10.technical_test_tools ADD CONSTRAINT technical_test_tools_uq UNIQUE (id_tools);
-- ddl-end --

-- object: c10.tt_pro_language | type: TABLE --
-- DROP TABLE IF EXISTS c10.tt_pro_language CASCADE;
CREATE TABLE c10.tt_pro_language (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	approved bool,
	score integer,
	date_completed date,
	id_programming_language bigint NOT NULL,
	id_user_profile bigint NOT NULL,
	CONSTRAINT technical_test_pro_language_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE c10.tt_pro_language OWNER TO adminc10;
-- ddl-end --

-- object: programming_language_fk | type: CONSTRAINT --
-- ALTER TABLE c10.tt_pro_language DROP CONSTRAINT IF EXISTS programming_language_fk CASCADE;
ALTER TABLE c10.tt_pro_language ADD CONSTRAINT programming_language_fk FOREIGN KEY (id_programming_language)
REFERENCES c10.programming_language (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: tt_pro_language_uq | type: CONSTRAINT --
-- ALTER TABLE c10.tt_pro_language DROP CONSTRAINT IF EXISTS tt_pro_language_uq CASCADE;
ALTER TABLE c10.tt_pro_language ADD CONSTRAINT tt_pro_language_uq UNIQUE (id_programming_language);
-- ddl-end --

-- object: c10.tt_framework_base | type: TABLE --
-- DROP TABLE IF EXISTS c10.tt_framework_base CASCADE;
CREATE TABLE c10.tt_framework_base (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	approved bool,
	score integer,
	date_completed date,
	id_frameworks_or_batabase bigint NOT NULL,
	id_user_profile bigint NOT NULL,
	CONSTRAINT tt_framework_base_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE c10.tt_framework_base OWNER TO adminc10;
-- ddl-end --

-- object: frameworks_or_batabase_fk | type: CONSTRAINT --
-- ALTER TABLE c10.tt_framework_base DROP CONSTRAINT IF EXISTS frameworks_or_batabase_fk CASCADE;
ALTER TABLE c10.tt_framework_base ADD CONSTRAINT frameworks_or_batabase_fk FOREIGN KEY (id_frameworks_or_batabase)
REFERENCES c10.frameworks_or_batabase (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: tt_framework_base_uq | type: CONSTRAINT --
-- ALTER TABLE c10.tt_framework_base DROP CONSTRAINT IF EXISTS tt_framework_base_uq CASCADE;
ALTER TABLE c10.tt_framework_base ADD CONSTRAINT tt_framework_base_uq UNIQUE (id_frameworks_or_batabase);
-- ddl-end --

-- object: user_profile_fk | type: CONSTRAINT --
-- ALTER TABLE c10.technical_test_tools DROP CONSTRAINT IF EXISTS user_profile_fk CASCADE;
ALTER TABLE c10.technical_test_tools ADD CONSTRAINT user_profile_fk FOREIGN KEY (id_user_profile)
REFERENCES c10.user_profile (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: user_profile_fk | type: CONSTRAINT --
-- ALTER TABLE c10.tt_pro_language DROP CONSTRAINT IF EXISTS user_profile_fk CASCADE;
ALTER TABLE c10.tt_pro_language ADD CONSTRAINT user_profile_fk FOREIGN KEY (id_user_profile)
REFERENCES c10.user_profile (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: user_profile_fk | type: CONSTRAINT --
-- ALTER TABLE c10.tt_framework_base DROP CONSTRAINT IF EXISTS user_profile_fk CASCADE;
ALTER TABLE c10.tt_framework_base ADD CONSTRAINT user_profile_fk FOREIGN KEY (id_user_profile)
REFERENCES c10.user_profile (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: c10.companies_to_position | type: TABLE --
-- DROP TABLE IF EXISTS c10.companies_to_position CASCADE;
CREATE TABLE c10.companies_to_position (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	id_companies bigint NOT NULL,
	id_target_position bigint NOT NULL,
	CONSTRAINT companies_to_position_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE c10.companies_to_position OWNER TO adminc10;
-- ddl-end --

-- object: companies_fk | type: CONSTRAINT --
-- ALTER TABLE c10.companies_to_position DROP CONSTRAINT IF EXISTS companies_fk CASCADE;
ALTER TABLE c10.companies_to_position ADD CONSTRAINT companies_fk FOREIGN KEY (id_companies)
REFERENCES c10.companies (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: target_position_fk | type: CONSTRAINT --
-- ALTER TABLE c10.companies_to_position DROP CONSTRAINT IF EXISTS target_position_fk CASCADE;
ALTER TABLE c10.companies_to_position ADD CONSTRAINT target_position_fk FOREIGN KEY (id_target_position)
REFERENCES c10.target_position (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: "grant_U_cd8e46e7b6" | type: PERMISSION --
GRANT USAGE
   ON SCHEMA public
   TO PUBLIC;
-- ddl-end --


