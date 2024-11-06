import { browser } from '$app/environment';
import { MyListMovieIdManager } from '$lib/services/MyListMovieIdManager';
import { StorageBlobStore } from '$lib/services/StorageBlobStore';

const ls = browser && localStorage !== undefined ? localStorage : (undefined as unknown as Storage);
const blobStore = new StorageBlobStore<string[]>('my-list-movie-ids', ls);
export const myListMovieIdManager = new MyListMovieIdManager(blobStore);
