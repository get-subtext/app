import { HomeService } from '$lib/services/HomeService';
import { gateway } from './gateway';
import { userIdService } from './userIdService';

export const homeService = new HomeService(userIdService, gateway);
