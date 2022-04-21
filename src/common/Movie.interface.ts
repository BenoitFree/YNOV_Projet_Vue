import iCast from "@/common/Cast.Interface";

export default interface iMovie{
    id: number
    name: string
    description: string
    genres: string[]
    imagePath: string
    releaseDate: string
    voteCount: number
    voteAverage: number
    status?: string
    cast?: iCast[]
}