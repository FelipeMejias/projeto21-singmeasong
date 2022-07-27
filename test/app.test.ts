import supertest from "supertest";
import app from "../src/app.js";

import { prisma } from "../src/database.js";
import { recommendationRepository } from "../src/repositories/recommendationRepository.js";
import { createThreeVideosAndVote, createTwoVideos, deleteAllData } from "./factories/scenarioFactory.js";
import { videoData } from "./factories/videoFactory.js";

const agent = supertest(app);
const route='/recommendations'

beforeEach(async() => {
    await deleteAllData()
});

describe("recommendation", () => {

    it('post',async()=>{
        const video=videoData()
        await agent.post(route).send(video)
        const result=await recommendationRepository.find(1)
        expect(result).toBeTruthy()
    })

    it('get all',async()=>{
        await createTwoVideos()
        const {body}=await agent.get(route)
        expect(body.length).toBe(2)
    })

    it('get random',async()=>{
        await createTwoVideos()
        const thisRoute=route+`/random`
        const {body}=await agent.get(thisRoute)
        expect(body).toBeTruthy()
    })

    it('get top',async()=>{
        const secondMostVotedVideo=await createThreeVideosAndVote()
        const thisRoute=route+`/top/3`
        const {body}=await agent.get(thisRoute)
        expect(body[1].name).toBe(secondMostVotedVideo.name)
    })

    it('get specific',async()=>{
        const video=await createTwoVideos()
        const thisRoute=route+`/${video.id}`
        const {body}=await agent.get(thisRoute)
        expect(body.name).toBe(video.name)
    })

    it('upvote and downvote',async()=>{
        let video=await createTwoVideos()
        let thisRoute=route+`/${video.id}/upvote`
        await agent.post(thisRoute)
        await agent.post(thisRoute)
        await agent.post(thisRoute)
        thisRoute=route+`/${video.id}/downvote`
        await agent.post(thisRoute)
        video=await recommendationRepository.findByName(video.name)
        expect(video.score).toBe(2)
    })

})

afterAll(async () => {
    await prisma.$disconnect();
  });
  
