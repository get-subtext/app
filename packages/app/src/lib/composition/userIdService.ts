import { browser } from '$app/environment';
import { StorageBlobStore } from '$lib/services/StorageBlobStore';
import { UserIdService } from '$lib/services/UserIdService';

const ls = browser && localStorage !== undefined ? localStorage : (undefined as unknown as Storage);
const blobStore = new StorageBlobStore<string>('subtext:user-id', ls);

export const userIdService = new UserIdService(blobStore);
