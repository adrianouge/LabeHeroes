import { Request, Response } from 'express'
import { AnimeHeroesDatabase } from '../AnimeHeroesDatabase'
import { Hero } from '../models/Hero'

export class AnimeHeroesController {

    public getAnimeHeroes = async (req: Request, res: Response) => {
        try {
            const q = req.query.q as string | undefined

            const animeHeroesDatabase = new AnimeHeroesDatabase()
            const animeHeroes = await animeHeroesDatabase.getAnimeHeroes(q)

            const mappedAnimeHeroes: Hero[] = animeHeroes.map((hero) =>
                new Hero(
                    hero.id,
                    hero.name,
                    hero.alias,
                    hero.age,
                    hero.universe
                ))
            res.status(200).send(mappedAnimeHeroes)
        }

        catch (error) {
            console.log(error)

            if (res.statusCode === 200) {
                res.status(500)
            }
            if (error instanceof Error) {
                res.send(error.message)
            }
            else {
                res.send({ message: "Unexpected error occured." })
            }
        }
    }

    public getAnimeHero = async (req: Request, res: Response) => {
        try {
            const id = req.params.id

            if (id !== ":id") {
                const animeHeroesDatabase = new AnimeHeroesDatabase()
                const animeHeroFound = await animeHeroesDatabase.getAnimeHero(id)

                if (animeHeroFound) {
                    res.status(200).send(animeHeroFound)
                }

                else {
                    res.status(404)
                    throw new Error("No anime hero were found with inserted 'id'.")
                }
            }
            else {
                res.status(400)
                throw new Error("An 'id' must be informed to search for an anime hero.")
            }
        }

        catch (error) {
            console.log(error)

            if (res.statusCode === 200) {
                res.status(500)
            }
            if (error instanceof Error) {
                res.send(error.message)
            }
            else {
                res.send({ message: "Unexpected error occured." })
            }
        }
    }

    public createNewAnimeHero = async (req: Request, res: Response) => {
        try {
            const { id, name, alias, age, universe } = req.body
            const animeHeroesDatabase = new AnimeHeroesDatabase()

            if (req.body) {
                let newHero = new Hero(id, name, alias, age, universe)
                animeHeroesDatabase.createAnimeHero(newHero)

                res.status(200).send("Anime hero created successfully.")
            }

            else {
                res.status(400)
                throw new Error("An 'id', 'name, 'alias', 'age' and 'universe' must be informed to create a new anime hero.")
            }
        }

        catch (error) {
            console.log(error)

            if (res.statusCode === 200) {
                res.status(500)
            }
            if (error instanceof Error) {
                res.send(error.message)
            }
            else {
                res.send({ message: "Unexpected error occured." })
            }
        }
    }

    public editAnimeHero = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const { newAge } = req.body

            const animeHeroesDatabase = new AnimeHeroesDatabase()
            const animeHeroFound = await animeHeroesDatabase.getAnimeHero(id)

            if (animeHeroFound) {
                if (animeHeroFound.age !== newAge) {
                    const editedAnimeHero = new Hero(
                        animeHeroFound.id,
                        animeHeroFound.name,
                        animeHeroFound.alias,
                        animeHeroFound.age,
                        animeHeroFound.universe
                    )
                    editedAnimeHero.setAge(newAge)
                    animeHeroesDatabase.editAnimeHero(editedAnimeHero)
                    res.status(200).send(editedAnimeHero)
                }
                else {
                    res.status(400)
                    throw new Error("New anime hero's age must be different from the one now.")
                }
            }

            else {
                res.status(404)
                throw new Error("Anime hero to edit not found with inserted 'id'.")
            }
        }

        catch (error) {
            console.log(error)

            if (res.statusCode === 200) {
                res.status(500)
            }
            if (error instanceof Error) {
                res.send(error.message)
            }
            else {
                res.send({ message: "Unexpected error occured." })
            }
        }
    }

    public deleteAnimeHero = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const animeHeroesDatabase = new AnimeHeroesDatabase()
            const animeToDelete = await animeHeroesDatabase.getAnimeHero(id)

            if (animeToDelete) {
                animeHeroesDatabase.deleteAnimeHero(id)

                res.status(200).send("Anime hero deleted successfully.")
            }
            else {
                res.status(404)
                throw new Error("Anime hero to delete not found with inserted 'id'.")
            }
        }
        catch (error) {
            console.log(error)

            if (res.statusCode === 200) {
                res.status(500)
            }
            if (error instanceof Error) {
                res.send(error.message)
            }
            else {
                res.send({ message: "Unexpected error occured." })
            }
        }
    }
}
