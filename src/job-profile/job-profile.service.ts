import { Injectable, Req, Body, NotFoundException } from "@nestjs/common";
import { JobProfileDto } from "./dto";
import { PrismaService } from "./../prisma/prisma.service";
import { DecodedTokenDto } from "src/user/dto";

@Injectable()
export class JobProfileService {
  constructor(private prisma: PrismaService) {}

  //Funcion para leer Frameworks almacenados en la base datos
  async getFrameworksProfile() {
    const frameworks = await this.prisma.frameworks_or_batabase.findMany();
    return frameworks.map(({ ...rest }) => rest);
  }

  //Funcion para leer Lenguajes almacenados en la base datos
  async getLenaguajesProfile() {
    const language = await this.prisma.programming_language.findMany();
    return language.map(({ ...rest }) => rest);
  }

  //Funcion para leer Herramientas almacenados en la base datos
  async getToolsProfile() {
    const tools = await this.prisma.tools.findMany();
    return tools.map(({ ...rest }) => rest);
  }

  //Funcion para leer Disponibilidad almacenados en la base datos
  async getJobStatus() {
    const jobStatus = await this.prisma.current_job_status.findMany();
    return jobStatus.map(({ ...rest }) => rest);
  }

  //Funcion para leer Posision educativa almacenados en la base datos
  async getJobPosition() {
    const jobPosition = await this.prisma.target_position.findMany();
    return jobPosition.map(({ ...rest }) => rest);
  }

  async getAddProfile() {
    const addProfile = await this.prisma.technology_expertise.findMany();
    return addProfile.map(({ ...rest }) => rest);
  }

  async getJobProfileById(id: number) {
    const profileJobId = await this.prisma.technology_expertise.findUnique({
      where: {
        id,
      },
    });

    return profileJobId;
  }

  //Funcion para crear Perfil laboral datos recibidos del lado del cliente
  async createJobProfile(@Req() req, @Body() dto: JobProfileDto) {
    const user = req.user as DecodedTokenDto;
    try {
      let idTecnology = 1;
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
            idTecnology = technologyExpertise.id;
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
        { id: idTecnology },
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
