import { WatchPageService } from '$lib/services/WatchPageService';
import { gateway } from './gateway';

export const watchPageService = new WatchPageService(gateway);
