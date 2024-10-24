import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import 'dotenv/config'
import { Videogame } from './entities/videogame.entity';

@Injectable()
export class VideogamesService {

  constructor(private readonly httpService: HttpService) { }

  private readonly apiUrl = 'https://api.igdb.com/v4/games';
  private buildHeaders() {
    return {
      'Accept': 'application/json',
      'Client-ID': process.env.IGDB_CLIENT_ID,
      'Authorization': process.env.IGDB_ACCESS_TOKEN,
    };
  }
  private buildRequestBody(): string {
    return `
      fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,
      category,checksum,collection,collections,cover,created_at,dlcs,expanded_games,expansions,external_games,
      first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,
      genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,
      player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,
      slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,
      updated_at,url,version_parent,version_title,videos,websites;
    `;
  }

  async fetchGames(): Promise<Videogame[]> {
    try {
      const response = await fetch(
        this.apiUrl,
        {
          method: 'POST',
          headers: this.buildHeaders(),
          body: this.buildRequestBody(),
        }
      );
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const games: Videogame[] = await response.json();
      console.log(games)
      return games;

    } catch (err) {
      console.error("Error fetching games: ", err);
      throw err;
    }
  }


  async fetchGameById(id: string): Promise<Videogame[]> {
    try {
      const response = await fetch(
        this.apiUrl,
        {
          method: 'POST',
          headers: this.buildHeaders(),
          body: `fields *; where id = ${id};`,
        }
      );
      if (!response.ok) {
        throw new Error(`que esta pasando: ${response.statusText}`);
      }

      const games: Videogame[] = await response.json();
      return games;

    } catch (err) {
      console.error("Error fetching games: ", err);
      throw err;
    }
  }

  async fetchGameByName(name: string): Promise<Videogame[]> {
    try {
      const response = await fetch(
        this.apiUrl,
        {
          method: 'POST',
          headers: this.buildHeaders(),
          body: `fields name, involved_companies; search "${name}";`,
        }
      );
      if (!response.ok) {
        throw new Error(`Error on query: ${response.statusText}`);
      }

      const games: Videogame[] = await response.json();
      return games;

    } catch (err) {
      console.error("Error fetching games: ", err);
      throw err;
    }
  }
}