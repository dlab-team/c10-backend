<<<<<<< HEAD
import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import * as nodemailer from "nodemailer";

@Controller("auth")
export class AuthController {
  private transporter: nodemailer.Transporter;

  constructor(private authService: AuthService) {
    this.transporter = nodemailer.createTransport({
      service: "Gmail", // Cambia esto por tu proveedor de correo
      auth: {
        user: "tu_correo@gmail.com", // Cambia esto por tu dirección de correo
        pass: "tu_contraseña", // Cambia esto por tu contraseña
      },
    });
  }

  @Post("signup")
=======
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
>>>>>>> fc3b072bc458183c5138d8b751ffe4ef6c704a5e
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
<<<<<<< HEAD
  @Post("signin")
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("request-password-reset")
  async requestPasswordReset(@Body() body: { email: string }) {
    const resetToken = await this.authService.requestPasswordReset({
      email: body.email,
    });

    // Enviar correo de solicitud de reseteo de contraseña
    const mailOptions = {
      from: "tu_correo@gmail.com", // Cambia esto por tu dirección de correo
      to: body.email,
      subject: "Solicitud de reseteo de contraseña",
      text: "Haz clic en el siguiente enlace para resetear tu contraseña...",
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo:", error);
      } else {
        console.log("Correo enviado:", info.response);
      }
    });

    return {
      message: "Solicitud de reseteo de contraseña exitosa",
      resetToken: resetToken, // Agrega el token a la respuesta
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post("reset-password")
  async resetPassword(@Body() body: { token: string; newPassword: string }) {
    await this.authService.resetPassword(body.token, body.newPassword);
    return { message: "Reseteo de clave exitoso" };
  }
=======
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
>>>>>>> fc3b072bc458183c5138d8b751ffe4ef6c704a5e
}
