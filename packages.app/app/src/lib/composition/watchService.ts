import { WatchPageService } from '$lib/services/WatchPageService/WatchPageService';
import { gateway } from './gateway';

export const watchService = new WatchPageService(gateway);
