import { BaseDatabase } from './BaseDatabase'
import { Hero } from './models/Hero'

export class AnimeHeroesDatabase extends BaseDatabase {
    public static TABLE_HEROES = "anime_heroes"
    dbConnection = BaseDatabase.connection

    public async getAnimeHeroes(q: string | undefined) {

        if (q) {
            let animeHeroesByNameLike: Hero[] = await this
                .dbConnection(AnimeHeroesDatabase.TABLE_HEROES)
                .where("name", "LIKE", `%${q}%`)

            return animeHeroesByNameLike
        }

        else {
            let allAnimeHeroes: Hero[] = await
                this.dbConnection(AnimeHeroesDatabase.TABLE_HEROES)

            return allAnimeHeroes
        }
    }

    public async getAnimeHero(id: string) {
        const [heroFoundById]: Hero[] | undefined[] = await
            this.dbConnection(AnimeHeroesDatabase.TABLE_HEROES)
                .where({ id })

        return heroFoundById
    }

    public async createAnimeHero(newAnimeHero: Hero) {
        await this
            .dbConnection(AnimeHeroesDatabase.TABLE_HEROES)
            .insert(newAnimeHero)
    }

    public async editAnimeHero(editedAnimeHero: Hero) {
        await this
            .dbConnection(AnimeHeroesDatabase.TABLE_HEROES)
            .update(editedAnimeHero)
            .where({ id: editedAnimeHero.id })
    }

    public async deleteAnimeHero(id: string) {
        await this.dbConnection(AnimeHeroesDatabase.TABLE_HEROES)
            .del()
            .where({ id })
    }
}