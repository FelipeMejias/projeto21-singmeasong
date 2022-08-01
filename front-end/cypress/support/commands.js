Cypress.Commands.add("resetDatabase", () => {
	cy.request("DELETE", "http://localhost:5000/reset").as("resetDatabase");
	cy.wait("@resetDatabase");
});

Cypress.Commands.add("findByName", (name) => {
    const route=`http://localhost:5000/find/${name}`
	cy.request("GET", route).as("findByName").then((res)=>{
        expect(res.body.name).to.equal(name)
    })
});