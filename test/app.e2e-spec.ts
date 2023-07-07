import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from 'src/Auth/dto';
import { EditUserDto } from 'src/user/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3000);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3000');
  });

  afterAll(() => {
    app.close();
  });

  const dto: AuthDto = {
    email: 'test@c10be.com',
    password: 'test1234567890',
  };
  describe('Auth', () => {
    describe('SignUp', () => {
      it('Should throw if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });

      it('Should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });

      it('Should throw if no info provided', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });

      it('Should Sign Up', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('SignIn', () => {
      it('Should throw if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });

      it('Should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });

      it('Should throw if no info provided', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });

      it('Should Sign Up', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('GetMe', () => {
      it('Should Get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200)
          .stores('userId', 'id');
      });
    });

    describe('EditUser', () => {
      it('Should Edit a User', () => {
        const dto: EditUserDto = {
          firstName: 'C10',
          email: 'test@update.com',
        };

        return pactum
          .spec()
          .patch('/users/')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(dto)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      });
    });

    describe('getUsers', () => {
      it('Should get all the users', () => {
        return pactum
          .spec()
          .get('/users/')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });

    describe('getUserById', () => {
      it('Should get the user by id', () => {
        return pactum
          .spec()
          .get('/users/{id}')
          .withPathParams('id', '$S{userId}')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200)
          .expectBodyContains('$S{userId}');
      });
    });

    describe('editUserById', () => {
      const dto: EditUserDto = {
        firstName: 'SlimFilipin',
        email: 'testUserById@c10.com',
      };
      it('Should edit the user', () => {
        return pactum
          .spec()
          .patch('/users/{id}')
          .withPathParams('id', '$S{userId}')
          .withBody(dto)
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      });
    });

    describe('deleteUserById', () => {
      it('Should delete the user', () => {
        return pactum
          .spec()
          .delete('/users/{id}')
          .withPathParams('id', '$S{userId}')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200);
      });
    });
  });
});
