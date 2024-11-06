import { HomePageService } from '$lib/services/HomePageService/HomePageService';
import { gateway } from './gateway';
import { userIdService } from './userIdService';

export const homeService = new HomePageService(userIdService, gateway);
