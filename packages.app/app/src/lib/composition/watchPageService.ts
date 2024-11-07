import { WatchPageService } from '$lib/services/WatchPageService/WatchPageService';
import { gateway } from './gateway';

export const watchPageService = new WatchPageService(gateway);
