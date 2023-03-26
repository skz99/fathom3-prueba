
import { PrismaClient, User } from '@prisma/client';
import { SecretPassJwt } from '../config/auth.config';
import { ApiRequest, ApiResponse } from '../models/api.model';
const prisma = new PrismaClient();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

export class UserController {

    constructor() {//private wsParams: IWebserviceParams) {

    }

    async singIn(request: ApiRequest): Promise<ApiResponse<User>> {
        try {
            const rtn = new ApiResponse<User>();
            const user = await prisma.user.findUnique({
                where: {
                    email: request.filters.username,
                },
            })
            if (!user) {
                throw new Error('El usuario no existe.');
            }

            const passwordIsValid = await bcrypt.compare(request.filters.password, user.password);

            if (!passwordIsValid) {
                throw new Error('Contraseña incorrecta')
            }

            const tokenData: any = {
                id: user.id,
                email: user.email,
            };
            tokenData['default_lang'] = user.default_lang;

            let token = jwt.sign(tokenData, SecretPassJwt, {
                expiresIn: 86400 // 24 hours
            });
            rtn.extra = { accessToken: token };
            rtn.data = [user];
            rtn.success = true;
            return rtn;
        } catch (error: any) {
            const rtn = new ApiResponse<any>();
            rtn.message = error.toString();
            rtn.status = 422;
            return rtn;
        }
    }

    async search(request: ApiRequest): Promise<ApiResponse<User>> {
        const rtn: ApiResponse<User> = new ApiResponse<User>();
        try {
            rtn.data = await prisma.user.findMany();
            rtn.success = true;
            rtn.status = 200;
        } catch (error: any) {
            rtn.success = false;
            rtn.status = 422;
            rtn.message = error.toString();
        } finally {
            return rtn;
        }
    }

    async add(user: User): Promise<ApiResponse<User>> {
        const rtn: ApiResponse<User> = new ApiResponse<User>();
        const password = user.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            rtn.data.push(await prisma.user.create({
                data: {
                    email: user.email,
                    name: user.name,
                    surname: user.surname,
                    default_lang: user.default_lang,
                    password: hashedPassword
                },
            }));
            rtn.success = true;
            rtn.status = 200;
        } catch (error: any) {
            rtn.success = false;
            rtn.status = 422;
            rtn.message = error.toString();
        } finally {
            return rtn;
        }

    }

    async deleteOne(id: number): Promise<ApiResponse<User>> {
        const rtn: ApiResponse<User> = new ApiResponse<User>();
        try {
            rtn.data.push(await prisma.user.delete({
                where: {
                    id: +id
                }
            }))
        } catch (error: any) {
            rtn.success = false;
            rtn.status = 422;
            rtn.message = error.toString();
        } finally {
            return rtn;
        }
    }

    async update(user: User, id: number): Promise<ApiResponse<User>> {
        const rtn: ApiResponse<User> = new ApiResponse<User>();
        try {
            rtn.data.push(await prisma.user.update({
                where: {
                    id: +id,
                },
                data: {
                    email: user.email,
                    name: user.name,
                    surname: user.surname,
                    default_lang: user.default_lang,
                },
            }))
        } catch (error: any) {
            rtn.success = false;
            rtn.status = 422;
            rtn.message = error.toString();
        } finally {
            return rtn;
        }
    }
}