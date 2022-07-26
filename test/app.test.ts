import { faker } from "@faker-js/faker";
import supertest from "supertest";

import app from "../src/app.js";
import { prisma } from "../src/database.js";

beforeEach(async() => {
});

const agent = supertest(app);

describe("recommendation", () => {

it('post recommendation',async()=>{
    const video=videoData()
    console.log(video)
    const {body} =await agent.post('/').send(video)
    expect(body.status).toBe(201)
})


})

function videoData(){
    const word=faker.internet.domainName()
    return {
        name:word,
        youtubeLink:'https://www.youtube.com/'+word
    }
}
