import express from "express"
import cors from "cors"
import { AnimeHeroesController } from "./database/controllers/AnimeHeroesController"
const app = express()

app.use(cors())
app.use(express.json())

const animeHeroesController = new AnimeHeroesController()

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.get ('/animeheroes', animeHeroesController.getAnimeHeroes)
app.get ('/animehero/:id', animeHeroesController.getAnimeHero)
app.post ('/animeheroes', animeHeroesController.createNewAnimeHero)
app.put ('/animehero/:id', animeHeroesController.editAnimeHero)
app.delete ('/animhero/:id', animeHeroesController.deleteAnimeHero)