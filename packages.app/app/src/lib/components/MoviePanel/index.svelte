<script lang="ts">
  let _class = '';
  import { base } from '$app/paths';
  import XMarkIcon from '$lib/icons/XMarkIcon.svelte';
  import PlayIcon from '$lib/icons/PlayIcon.svelte';
  import PlusIcon from '$lib/icons/PlusIcon.svelte';
  import { formatRunTimeMins, formatActors, formatRated, formatReleaseYear, formatDirectors, formatGenres } from '@get-subtext/lib.utils';
  import { createEventDispatcher } from 'svelte';
  import * as T from './types';
  import { twMerge } from 'tailwind-merge';
  export { _class as class };
  export let movie: T.Movie;
  export let mode: T.Mode;

  const dispatch = createEventDispatcher();

  const onAddToListClick = (id: string) => {
    const eventDetail: T.MyListEventDetail = { id };
    dispatch('addclick', eventDetail);
  };

  const onRemoveFromListClick = (id: string) => {
    const eventDetail: T.MyListEventDetail = { id };
    dispatch('removeclick', eventDetail);
  };
</script>

<div class={twMerge('flex w-full h-full bg-gray-800', _class)}>
  <div class="w-1/2 relative">
    {#if movie.subtitleCount === 0}
      <div class="absolute top-0 left-0 bg-red-600 bg-opacity-80 font-bold text-white text-center py-1 w-full">No Subtitles</div>
    {/if}
    {#if mode === T.Mode.Play}
      <a href={`${base}/watch/${movie.imdbId}`} class="w-1/2">
        <img src={movie.posterUrl} alt={movie.title} class="w-full h-full object-cover" />
      </a>
    {:else}
      <img src={movie.posterUrl} alt={movie.title} class="w-full h-full object-cover" />
    {/if}
  </div>
  <div class="w-1/2 relative text-sm text-gray-300">
    <div class="absolute top-0 left-0 right-0 p-2">
      <h3 class="text-lg font-semibold text-white">{movie.title}</h3>
      <div class="flex items-center justify-between pb-2">
        <div class="flex space-x-0.5">
          {#if movie.releaseDate !== null}<p>{formatReleaseYear(movie.releaseDate, movie.releaseYear)}</p>{/if}
          {#if movie.runTimeMins !== null && movie.runTimeMins !== null}<p class="text-gray-500">|</p>{/if}
          {#if movie.runTimeMins !== null}<p>{formatRunTimeMins(movie.runTimeMins)}</p>{/if}
        </div>
        {#if movie.rated !== null}<p class="text-xs border border-gray-400 bg-gray-800 px-2">{movie.rated}</p>{/if}
      </div>
      {formatActors(movie.actors, 'Unknown')}
      <!-- <p class="hidden sm:block">
        <span class="text-sm text-gray-500">{movie.genres.length === 1 ? 'Genre' : 'Genres'}:</span>
        {formatGenres(movie.genres, 'Unknown')}
      </p>
      <p class="hidden sm:block">
        <span class="text-sm text-gray-500">Cast:</span>
        {formatActors(movie.actors, 'Unknown')}
      </p>
      <p class="hidden sm:block">
        <span class="text-sm text-gray-500">{movie.directors.length === 1 ? 'Director' : 'Directors'}:</span>
        {formatDirectors(movie.directors, 'Unknown')}
      </p>
      <p class="hidden sm:block">
        {movie.plot}
      </p> -->
    </div>
    <div class="absolute bottom-0 left-0 right-0 p-2">
      {#if mode === T.Mode.Play && movie.subtitleCount > 0}
        <a
          class="flex items-center justify-center w-full h-10 space-x-1 bg-black text-white font-bold hover:bg-gray-900"
          href={`${base}/watch/${movie.imdbId}`}
        >
          <PlayIcon class="text-lg text-white size-6" />
          <span>Play</span>
        </a>
      {/if}
      {#if movie.isOnMyList}
        <button
          class="flex items-center justify-center w-full h-10 space-x-1 bg-yellow-500 text-white font-bold hover:bg-yellow-600"
          on:click={() => onRemoveFromListClick(movie.imdbId)}
        >
          <XMarkIcon class="text-lg text-white size-6" />
          <span>Remove</span>
        </button>
      {:else}
        <button
          class="flex items-center justify-center w-full h-10 space-x-1 bg-black text-white font-bold hover:bg-gray-900"
          on:click={() => onAddToListClick(movie.imdbId)}
        >
          <PlusIcon class="text-lg text-white size-6" />
          <span>Add</span>
        </button>
      {/if}
    </div>
  </div>
</div>
