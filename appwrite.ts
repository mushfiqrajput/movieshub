import { Client, ID, Query, TablesDB } from "appwrite";
import type { Movie } from './src/types/movie';

const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// TablesDB instead of Databases
const tables = new TablesDB(client);

const tableId = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;

export const updateSearchCount = async (movie: string, moviedata: Movie) => {
  console.log("🔍 updateSearchCount called with:", movie, moviedata);
  try {
    // ✅ List rows instead of listDocuments
    const res = await tables.listRows(databaseId, tableId, [
      Query.equal("movie", movie)
    ]);

    if (res.rows.length > 0) {
      const row = res.rows[0];

      // ✅ Update row instead of updateDocument
      await tables.updateRow(databaseId, tableId, row.$id, {
        count: row.count + 1,
      });
    } else {
      // ✅ Create row instead of createDocument
      await tables.createRow(databaseId, tableId, ID.unique(), {
        movie,
        count: 1,
        movie_id: moviedata.id,
        poster_url: `https://tmdb.org/t/p/w500${moviedata.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Appwrite error:", error);
  }
};


export const getTrendingMovies = async () => {
try {
  const result =  await tables.listRows(databaseId,tableId, [
    Query.limit(5),
    Query.orderDesc("count")
  ])
  return result.rows
} catch (error) {
  console.log(error)
}
}