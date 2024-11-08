import { SearchPageService } from '$lib/services/SearchPageService';
import { gateway } from './gateway';
import { imageLoader } from './imageLoader';

export const searchPageService = new SearchPageService(gateway, imageLoader);
