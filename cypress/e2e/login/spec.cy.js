
describe('Login Form', () => {
    const user = {
      email: "ihsansahin777@gmail.com", 
      pass: "Sifre123!" 
      };
      const errorMessages = {
  email: 'Please enter a valid email address',
  password:
    'Password must be  at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character',
};
    beforeEach(function () {
    cy.visit('http://localhost:5173/');
  });
    it('should allow a user to login', () => {
        //arrange
        //act
        cy.get('[data-cy="input-email"]').type(user.email);
        cy.get('[data-cy="input-password"]').type(user.pass);
        cy.get('[data-cy="input-terms"]').click()
        cy.get('[data-cy="submit"]').click()
        //assert
        cy.contains("Giriş Başarılı").should("be.visible");
    });
    it('should be an email error message, and the button should be disabled', () => {
        //arrange
        //act
        cy.get('[data-cy="input-email"]').type("ihsansahin777");
        //assert
        cy.contains(errorMessages.email).should("be.visible");
        cy.get('[data-cy="submit"]').should('be.disabled')
    });
   
});