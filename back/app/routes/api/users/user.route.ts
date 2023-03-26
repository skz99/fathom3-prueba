import { FastifyInstance, FastifyRequest } from "fastify";
import { UserController } from "../../../controllers/user.controller";
import { ApiRequest } from "../../../models/api.model";
import { middleware } from "../../../middlewares/authJwt";
import { User } from "@prisma/client";

interface Params  {
  id: number;
}


async function userRoutes(app: FastifyInstance) {
  app.get('/list-users', async function (req, res) {
    const controller = new UserController();
    const users = await controller.search(req.body as ApiRequest);
    res.send(users);
  })
  app.post('/add', async function (req, res) {
    const controller = new UserController();
    const users = await controller.add(req.body as User);
    res.send(users);
  })
  app.delete('/delete/:id', async function (req: FastifyRequest<{ Params: Params  }>, res) {
    const controller = new UserController();
    const users = await controller.deleteOne(req.params.id);
    res.send(users);
  })
  app.put('/update/:id', async function (req: FastifyRequest<{ Params: Params  }>, res) {
    const controller = new UserController();
    const users = await controller.update(req.body as User, req.params.id);
    res.send(users);
  })
  app.post('/sign-in', async function (req, res) {
    const controller = new UserController();
    const users = await controller.singIn(req.body as ApiRequest);
    res.send(users);
  })
}
export default userRoutes;