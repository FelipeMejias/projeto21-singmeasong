import { faker } from "@faker-js/faker";
function videoData(){
    const word=faker.animal.bird().split(' ')[0].toLowerCase()
    return {
        name:word,
        youtubeLink:'https://www.youtube.com/'+word
    }
}
const data=videoData()
describe("post videos", () => {
	it("should post a video", () => {
		cy.visit("http://localhost:3000");

		cy.get("input[placeholder*=ame]").type(data.name);
		cy.get("input[placeholder*=you]").type(data.youtubeLink);

		cy.intercept("POST", "/recommendations").as("postVideo");
		cy.get("button").click();
		cy.wait("@postVideo");


		cy.findByName(data.name)
		
	});
});