describe("buttons", () => {
	it("should direct to write pages", () => {
		cy.visit("http://localhost:3000")
		cy.contains("Top").click();
		cy.url().should("equal", "http://localhost:3000/top");
        cy.contains("Random").click();
        cy.url().should("equal", "http://localhost:3000/random");
        cy.contains("Home").click();
        cy.url().should("equal", "http://localhost:3000/");
	});
});