import { HomePageService } from '$lib/services/HomePageService/HomePageService';
import { gateway } from './gateway';

export const homeService = new HomePageService(gateway);
