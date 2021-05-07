import { Cat } from "../models/Cat";

function decode(breed: any): Cat {
    return {
        id: breed.id,
        description: breed.description,
        name: breed.name,
        origin: breed.origin,
        temperament: breed.temperament,
        image_id: breed.image?.id,
        image_url: breed.image?.url,
    };
}

export const getBreedsList = (): Promise<Cat[]> => {
    return fetch("https://api.thecatapi.com/v1/breeds")
        .then(res => res.json())
        .then(res => res.map((breed: any) => decode(breed)))
}