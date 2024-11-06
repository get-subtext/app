import { RequestService } from '$lib/services/RequestService';
import { gateway } from './gateway';
import { userIdService } from './userIdService';

export const requestService = new RequestService(userIdService, gateway);
