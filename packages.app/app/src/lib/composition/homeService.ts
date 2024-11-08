import { HomePageService } from '$lib/services/HomePageService';
import { gateway } from './gateway';
import { imageLoader } from './imageLoader';

export const homeService = new HomePageService(gateway, imageLoader);
