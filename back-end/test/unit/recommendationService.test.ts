import { recommendationRepository } from "../../src/repositories/recommendationRepository.js"
import { recommendationService } from "../../src/services/recommendationsService.js"
import { listOfVideos, videoByScore, videoData } from "../factories/videoFactory.js"
import { jest } from "@jest/globals"
describe("recommendation service", () => {

    it('should post',async()=>{
        jest.spyOn(recommendationRepository, 'findByName').mockImplementationOnce(() :any=> undefined)
        jest.spyOn(recommendationRepository, 'create').mockImplementationOnce(():any => {})
        const video=videoData()
        await recommendationService.insert(video)
        expect(recommendationRepository.create).toBeCalled()
    })
    it('post with existing name',async()=>{
        const video=videoData()
        jest.spyOn(recommendationRepository, 'findByName').mockImplementationOnce(():any => true)
        try {
            await recommendationService.insert(video)
        } catch (error) {
            expect(error.type).toBe("conflict")
            expect(error.message).toBe("Recommendations names must be unique")
        }
    })
    it('should upvote',async()=>{
        jest.spyOn(recommendationRepository, 'find').mockImplementationOnce(():any => true)
        jest.spyOn(recommendationRepository, 'updateScore').mockImplementationOnce(():any => {})
        await recommendationService.upvote(1)
        expect(recommendationRepository.updateScore).toBeCalled()
    })
    it('upvote with unexisting id',async()=>{
        jest.spyOn(recommendationRepository, 'find').mockImplementationOnce(():any => false)
        jest.spyOn(recommendationRepository, 'updateScore').mockImplementationOnce(():any => {})
        expect(recommendationRepository.updateScore).toBeCalled()
        try {
            await recommendationService.upvote(1)
        } catch (error) {
            expect(error.type).toBe("not_found")
        }
    })
    
    
    it('should get',async()=>{
        jest.spyOn(recommendationRepository, 'findAll').mockImplementationOnce(():any => {})
        await recommendationService.get()
        expect(recommendationRepository.findAll).toBeCalled()
    })
    it('should get top',async()=>{
        jest.spyOn(recommendationRepository, 'getAmountByScore').mockImplementationOnce(():any => {})
        await recommendationService.getTop(5)
        expect(recommendationRepository.getAmountByScore).toBeCalled()
    })
    it('should get random',async()=>{
        jest.spyOn(recommendationRepository, 'findAll').mockImplementationOnce(():any => {
            const list=listOfVideos(4)
            return list
        })
        const recommendation =await recommendationService.getRandom()
        expect(recommendation).toBeTruthy()
    })
    it('getting random, receive not found',async()=>{
        jest.spyOn(recommendationRepository, 'findAll').mockImplementationOnce(():any => {
            const list=[]
            return list
        })
        try {
            const recommendation =await recommendationService.getRandom()
        } catch (error) {
            expect(error.type).toBe("not_found")
        }
    })
})

describe("recommendation service downvotes", () => {

    it('should downvote',async()=>{
        jest.spyOn(recommendationRepository, 'find').mockImplementation(():any => true)
        jest.spyOn(recommendationRepository, 'remove').mockImplementation(():any => {})
        jest.spyOn(recommendationRepository, 'updateScore').mockImplementation(():any => {
            const video=videoByScore(2)
            return video
        })
        await recommendationService.downvote(1)
        expect(recommendationRepository.updateScore).toBeCalled()
        expect(recommendationRepository.remove).not.toBeCalled()
    })
    it('should downvote and remove',async()=>{
        jest.spyOn(recommendationRepository, 'find').mockImplementationOnce(():any => true)
        jest.spyOn(recommendationRepository, 'updateScore').mockImplementationOnce(():any => {
            const video=videoByScore(-7)
            return video
        })
        jest.spyOn(recommendationRepository, 'remove').mockImplementationOnce(():any => true)
        await recommendationService.downvote(1)
        expect(recommendationRepository.updateScore).toBeCalled()
        expect(recommendationRepository.remove).toBeCalled()
    })

})