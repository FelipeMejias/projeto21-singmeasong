import { prisma } from "../../src/database.js";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { videoData } from "./videoFactory.js";

export async function deleteAllData() {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`
  }

export async function createTwoVideos() {
    let data =videoData()
    await prisma.recommendation.create({data})
    data =videoData()
    await prisma.recommendation.create({data})

    const video=await recommendationRepository.findByName(data.name)
    return video
}

export async function createThreeVideosAndVote(){
    let data =videoData()
    await prisma.recommendation.create({data})
    await prisma.recommendation.update({
        where:{name:data.name},
        data:{score:7}
    })
    data =videoData()
    await prisma.recommendation.create({data})
    await prisma.recommendation.update({
        where:{name:data.name},
        data:{score:2}
    })
    data =videoData()
    await prisma.recommendation.create({data})
    await prisma.recommendation.update({
        where:{name:data.name},
        data:{score:5}
    })
    return data
}

