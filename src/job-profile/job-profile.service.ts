import { Injectable, Req, Body, NotFoundException } from "@nestjs/common";
import { JobProfileDto } from "./dto";
import { PrismaService } from "./../prisma/prisma.service";
import { DecodedTokenDto } from "src/user/dto";


@Injectable()
export class JobProfileService {
  constructor(private prisma: PrismaService) {}

  async getFrameworksProfile() {
    const frameworks = await this.prisma.frameworks_or_batabase.findMany();
    return frameworks.map(({ ...rest }) => rest);
  }
  async getLenaguajesProfile() {
    const language = await this.prisma.programming_language.findMany();
    return language.map(({ ...rest }) => rest);
  }
  async getToolsProfile() {
    const tools = await this.prisma.tools.findMany();
    return tools.map(({ ...rest }) => rest);
  }

  async createJobProfile(@Req() req, @Body() dto: JobProfileDto) {
    const user = req.user as DecodedTokenDto;
    try {
      const userProfile = [];
      const levelArray = [];
      const othersArray = [];
      const languages = [];
      const frameworks = [];
      const tools = [];

      for (let id_programming_language of dto.idProgrammingLanguage) {
        for (let id_frameworks_or_batabase of dto.idFrameworksOrDatabase) {
          for (let id_tools of dto.idTools) {
            const technologyExpertise =
              await this.prisma.technology_expertise.create({
                data: {
                  level: dto.level,
                  others: dto.others,
                  id_programming_language: id_programming_language,
                  id_frameworks_or_batabase: id_frameworks_or_batabase,
                  id_tools: id_tools,
                  id_user_profile: dto.idUserProfile,
                },
                include: {
                  programming_language: true,
                  frameworks_or_batabase: true,
                  tools: true,
                  user_profile: true,
                },
              });
            userProfile.push(technologyExpertise.user_profile);
            levelArray.push(technologyExpertise.level);
            languages.push(technologyExpertise.programming_language);
            frameworks.push(technologyExpertise.frameworks_or_batabase);
            tools.push(technologyExpertise.tools);
            othersArray.push(technologyExpertise.others);
          }
        }
      }

      return [
        { userProfile: userProfile[0] },
        { level: levelArray[0] },
        { languages: languages },
        { frameworks: frameworks },
        { tools: tools },
        { others: othersArray[0] },
      ];
    } catch (err) {
      if (err.code === "P2025") {
        console.log(
          `usuario con id: ${user.id} err : ${err.meta.cause} : Error : ${err.code}`
        );
        throw new NotFoundException("Perfil de usuario no encontrado");
      } else if (err.code === "P2003") {
        console.log(
          `Error : ${err.code} : Foreign key constraint failed :  ${err.meta.field_name}}`
        );
        throw new NotFoundException(`Value not found : Database Error`);
      }
      throw new Error(err);
    }
  }
}
