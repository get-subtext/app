import { RequestPageService } from '../services/RequestPageService';
import { gateway } from './gateway';

export const requestPageService = new RequestPageService(gateway);
