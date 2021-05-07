import { Cat } from "../models/Cat";

const URL = "https://api.thecatapi.com/v1";

export const getBreedsList = (): Promise<Cat[]> => {
    return fetch(`${URL}/breeds`)
        .then(res => res.json())
        .then(res => res.map((breed: any) => {
            return {
                id: breed.id,
                description: breed.description,
                name: breed.name,
                origin: breed.origin,
                temperament: breed.temperament,
                image_id: breed.image?.id,
                image_url: breed.image?.url,
            };
        }));
}

export const getBreedImages = (breed: string, page: number): Promise<Cat[]> => {
    return fetch(`${URL}/images/search?page=${page}&limit=10&breed_id=${breed}`)
        .then(res => res.json())
        .then(res => res.map((image: any) => {
            return {
                id: image.breeds[0].id,
                description: image.breeds[0].description,
                name: image.breeds[0].name,
                origin: image.breeds[0].origin,
                temperament: image.breeds[0].temperament,
                image_id: image.id,
                image_url: image.url,
            };
        }));
}

export const getCat = (id: string): Promise<Cat> => {
    return fetch(`${URL}/images/${id}`)
        .then(res => res.json())
        .then(res => {
            return {
                id: res.breeds[0].id,
                description: res.breeds[0].description,
                name: res.breeds[0].name,
                origin: res.breeds[0].origin,
                temperament: res.breeds[0].temperament,
                image_id: res.id,
                image_url: res.url,
            };
        });
}