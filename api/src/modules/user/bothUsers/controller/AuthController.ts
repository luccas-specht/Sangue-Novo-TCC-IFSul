import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticationService } from '@modules/user/bothUsers/service/AuthenticationService';

export class AuthController {
  public async createAuth(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { email, password } = request.body;

    const authenticationService = container.resolve(AuthenticationService);

    const { user, token } = await authenticationService.execute({
      email,
      password,
    });

    return response.json({ user, token });
  }
}
