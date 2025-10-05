export interface Movie {
  id: number,
  title : string,
  poster_path: string,
  vote_average: number,
  genre_ids: number[];
  release_date: Date
}