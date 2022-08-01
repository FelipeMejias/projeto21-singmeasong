import { faker } from "@faker-js/faker";
export function videoData(){
    const word=faker.animal.bird().split(' ')[0]
    return {
        name:word,
        youtubeLink:'https://www.youtube.com/'+word
    }
}

export function videoByScore(score:number){
    const word=faker.animal.bird().split(' ')[0]
    return {
        id:Math.random(),
        name:word,
        youtubeLink:'https://www.youtube.com/'+word,
        score:score
    }
}

export function listOfVideos(quantity:number){
    const list=[]
    for(let i=1;i<=quantity;i++){
        const word=faker.animal.bird().split(' ')[0]
        list.push({
            id:Math.random(),
            name:word,
            youtubeLink:'https://www.youtube.com/'+word,
            score:Math.random()
        })
    }
    return list
}

