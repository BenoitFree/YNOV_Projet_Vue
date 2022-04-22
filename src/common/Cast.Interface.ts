import iMovie from "@/common/Movie.interface";

export interface iMovieCast extends iMovie {
    character: string
}

export default interface iCast{
    id: number
    name: string
    character?: string
    imagePath: string
    birthday?: string
    deathday?: string
    movies?: iMovieCast[]
}