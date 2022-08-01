import { recommendationRepository } from "../repositories/recommendationRepository.js"

async function deleteAll() {
    await recommendationRepository.deleteAll()
}

async function findByName(name:string) {
    const video=await recommendationRepository.findByName(name)
    return video
}

export const testService={
    deleteAll,findByName
}