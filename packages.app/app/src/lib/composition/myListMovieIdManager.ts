import { browser } from '$app/environment';
import { StorageBlobStore } from '$lib/services/BlobStore/StorageBlobStore';
import { MyListMovieIdManager } from '$lib/services/MyListMovieIdManager/MyListMovieIdManager';

const ls = browser && localStorage !== undefined ? localStorage : (undefined as unknown as Storage);
const blobStore = new StorageBlobStore<string[]>('my-list-movie-ids', ls);
export const myListMovieIdManager = new MyListMovieIdManager(blobStore);
