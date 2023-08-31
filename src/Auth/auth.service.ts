<<<<<<< HEAD
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import * as argon from "argon2";
import { ConfigService } from "@nestjs/config/dist";
import * as nodemailer from "nodemailer";
import { AuthDto } from "./dto";

@Injectable()
export class AuthService {
  private transporter: nodemailer.Transporter; // Declarar la propiedad transporter
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "tu_correo@gmail.com",
        pass: "tu_contraseña",
      },
    });
  }
=======
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config/dist';
import { Prisma, user } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
>>>>>>> fc3b072bc458183c5138d8b751ffe4ef6c704a5e

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);

    try {
      const createdUser = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
          user_role: {
            connect: {
              id: 1,
            },
          },
          last_name: dto.last_name,
          first_name: dto.first_name,
          user_profile: dto.user_profile,
        },
      });

      return this.signToken(createdUser.id, createdUser.email);
    } catch (error) {
<<<<<<< HEAD
      if (error.code === "P2002") {
        throw new ForbiddenException("Duplicate Credentials");
=======
      if (error.code === 'P2002') {
        throw new ForbiddenException('Duplicate Credentials');
>>>>>>> fc3b072bc458183c5138d8b751ffe4ef6c704a5e
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    //find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
<<<<<<< HEAD
    });
    //if user does not exist throw exception
    if (!user) throw new ForbiddenException("Incorrect Information");
    //compare the psw
    const pwMatches = await argon.verify(user.password, dto.password);
    //if psw is incorrect throw exception
    if (!pwMatches) throw new ForbiddenException("Incorrect Information");
    //send back the user
    return this.signToken(user.id, user.email);
=======
      
    });
    //if user does not exist throw exception
    if (!user) throw new ForbiddenException('Incorrect Information');
    //compare the psw
    const pwMatches = await argon.verify(user.password, dto.password);
    //if psw is incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Incorrect Information');
    //send back the user
    return this.signToken(user.id, user.email);

    
>>>>>>> fc3b072bc458183c5138d8b751ffe4ef6c704a5e
  }

  async signToken(
    userId: number,
<<<<<<< HEAD
    email: string
=======
    email: string,
>>>>>>> fc3b072bc458183c5138d8b751ffe4ef6c704a5e
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
<<<<<<< HEAD
    const secret = this.config.get("JWT_SECRET");

    const token = await this.jwt.signAsync(payload, {
      expiresIn: "30min",
=======
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30min',
>>>>>>> fc3b072bc458183c5138d8b751ffe4ef6c704a5e
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
<<<<<<< HEAD

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const passwordReset = await this.prisma.passwordReset.findUnique({
      where: {
        token: token, // Asegúrate de pasar el token aquí
      },
    });

    if (!passwordReset) {
      throw new NotFoundException("Token de reseteo inválido");
    }

    const user = await this.prisma.user.findUnique({
      where: {
        email: passwordReset.email,
      },
    });

    if (user) {
      const hash = await argon.hash(newPassword);

      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: hash,
        },
      });

      // Eliminar la entrada en la tabla PasswordReset después de usarla
      await this.prisma.passwordReset.delete({
        where: {
          id: passwordReset.id,
        },
      });
    }
  }
  async requestPasswordReset({ email }: { email: string }): Promise<string> {
    const resetToken = this.generateRandomToken();

    await this.prisma.passwordReset.create({
      data: {
        email: email,
        token: resetToken,
      },
    });

    // Enviar correo electrónico con el token de reseteo
    this.sendResetPasswordEmail(email, resetToken);

    return resetToken; // Devuelve el token generado
  }

  private generateRandomToken(): string {
    // Implementación de la generación de token
    const tokenLength = 20;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for (let i = 0; i < tokenLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
    return token;
  }

  private sendResetPasswordEmail(email: string, token: string) {
    const mailOptions = {
      from: "tu_correo@gmail.com",
      to: email,
      subject: "Solicitud de reseteo de contraseña",
      text: `Haz clic en el siguiente enlace para resetear tu contraseña: ${token}`,
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo:", error);
      } else {
        console.log("Correo enviado:", info.response);
      }
    });
  }
=======
>>>>>>> fc3b072bc458183c5138d8b751ffe4ef6c704a5e
}
