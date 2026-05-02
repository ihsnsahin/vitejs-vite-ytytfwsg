
describe('Login Form', () => {
    const user = {
      email: "ihsansahin777@gmail.com", 
      pass: "Sifre123!" 
      };

    it('should allow a user to login', () => {
        cy.visit("http://localhost:5173/");
        cy.get('[data-cy="input-email"]').type(user.email);
        cy.get('[data-cy="input-password"]').type(user.pass);
        cy.get('[data-cy="input-terms"]').click()
        cy.get('[data-cy="submit"]').click()
        cy.contains("Giriş Başarılı").should("be.visible")
    });
});