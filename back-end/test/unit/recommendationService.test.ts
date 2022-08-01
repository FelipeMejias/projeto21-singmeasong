import { recommendationRepository } from "../../src/repositories/recommendationRepository.js"
import { recommendationService } from "../../src/services/recommendationsService.js"
import { videoData } from "../factories/videoFactory.js"

describe("recommendation service", () => {

    it('should post',async()=>{
        jest.spyOn(recommendationRepository, 'findByName').mockImplementationOnce(() => undefined)
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
    
    it('should downvote',async()=>{
        jest.spyOn(recommendationRepository, 'find').mockImplementationOnce(():any => true)
        const video=videoData()
        jest.spyOn(recommendationRepository, 'updateScore').mockImplementationOnce(():any => {
            return {
                id:1,
                name:video.name,
                youtubeLink:video.youtubeLink,
                score:7
            }
        })
        await recommendationService.downvote(1)
    })

})