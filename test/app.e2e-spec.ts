import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from 'src/Auth/dto';
import { EditUserDto } from 'src/user/dto';
import { JobSoughtDto } from 'src/user/profile/dto';

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
    last_name: 'test',
    first_name: 'test',
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
          last_name: 'C10',
          email: 'test@update.com',
        };

        return pactum
          .spec()
          .patch('/users/')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(dto)
          .expectBodyContains(dto.last_name)
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
        last_name: 'SlimFilipin',
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
          .expectBodyContains(dto.last_name)
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

  describe('education', () => {
    const dtoeducation = {
      highest_edu_level: "Institute",
      career_1: "Arquitecto",
      name_institution_1: "DuocUC",
      type_institution_1: "I.P",
      career_2: "Reponedor",
      name_institution_2: "La calle",
      type_institution_2: "escuela",
      current_edu_status: "looking for work",
      english_level: "Basic A1"
    };

    let edu_user: AuthDto = {
      email: 'probemos@test.com',
      password: 'test1234567890',
      last_name: 'probemos',
      first_name: 'ednpoint',
    };

    let token: string;

    it('Should Sign Up', () => {
      return pactum
        .spec()
        .post('/auth/signup')
        .withBody(edu_user)
        .expectStatus(201);
    });

    it('Should sign in', () => {
      return pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          email: edu_user.email,
          password: edu_user.password
        })
        .expectStatus(200)
        .stores('userAt', 'access_token');
    });

    it('Should throw if User Profile is not created', () => {
      return pactum
        .spec()
        .withHeaders({ Authorization: 'Bearer $S{userAt}' })
        .post('/profile/education/addEducation')
        .withBody(dtoeducation)
        .expectStatus(404);
    });

    // it('Should create User Profile', () => {

    // });

    // it('Should create Education', () => {
    //   return pactum
    //     .spec()
    //     .withHeaders({ Authorization: 'Bearer $S{userAt}' })
    //     .post('/profile/education/addEducation')
    //     .withBody(dtoeducation)
    //     .expectStatus(201)
    // });
  })

  describe('jobsought', () => {
    const userJobDto: AuthDto = {
      email: 'jobtest@test.com',
      password: 'test123',
      first_name: 'job',
      last_name: 'test',
      id_user_role: 1,
    }

    const dtoJobSought: JobSoughtDto = {
      work_expectation: "",
      id_availability: [1],
      id_better_current_situation: 1,
      id_active_visa: [2, 1],
    }

    describe('SignUp to get a token ', () => {
      it('Should Sign Up', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: userJobDto.email,
            password: userJobDto.password,
            first_name: userJobDto.first_name,
            last_name: userJobDto.last_name,
            id_user_role: userJobDto.id_user_role,
          })
          .expectStatus(201)
          .stores('userAt', 'access_token');
      });
    });

    describe('Create a job sought', () => {
      it('Should create a job sought', () => {
        return pactum
          .spec()
          .post('/profile/jobSought/addJobSought')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(dtoJobSought)
          .expectStatus(201);
      });

      it('Should create without work expectation', () => {
        return pactum
          .spec()
          .post('/profile/jobSought/addJobSought')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody({
            id_active_visa: [1],
            id_availability: [1],
            id_better_current_situation: 1,
          } as JobSoughtDto)
          .expectStatus(201);
      });

      it('Should create without id active visa', () => {
        return pactum
          .spec()
          .post('/profile/jobSought/addJobSought')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody({
            id_availability: [1],
            id_better_current_situation: 1,
          } as JobSoughtDto)
          .expectStatus(201);
      });

      it('Should create without id availability', () => {
        return pactum
          .spec()
          .post('/profile/jobSought/addJobSought')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody({
            id_better_current_situation: 1,
          } as JobSoughtDto)
          .expectStatus(201);
      });

      it('Should pass empy', () => {
        return pactum
          .spec()
          .post('/profile/jobSought/addJobSought')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody({})
          .expectStatus(200);
      });
    });
  });
});
