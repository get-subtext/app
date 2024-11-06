import { WatchService } from '$lib/services/WatchService';
import { gateway } from './gateway';

export const watchService = new WatchService(gateway);
