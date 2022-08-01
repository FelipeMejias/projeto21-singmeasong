import { faker } from "@faker-js/faker";
export function videoData(){
    const word=faker.animal.bird().split(' ')[0]
    return {
        name:word,
        youtubeLink:'https://www.youtube.com/'+word
    }
}

