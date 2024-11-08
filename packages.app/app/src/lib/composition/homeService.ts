import { HomePageService } from 'app/lib/services/HomePageService';
import { gateway } from './gateway';

export const homeService = new HomePageService(gateway);
