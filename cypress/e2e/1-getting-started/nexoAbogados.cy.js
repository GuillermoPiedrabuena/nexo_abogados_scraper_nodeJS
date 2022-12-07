var nodemailer = require('nodemailer');
describe('scraping Nexo Abogados for selected cases', {
  retries: {
  runMode: 0,
  openMode: 0
}}, () => { 

    beforeEach('log in' , ()=>{
        cy.visit('https://www.marketplace.nexoabogados.cl/login');
        cy.get(':nth-child(1) > .jss155 > .jss166').type("gpk821016@gmail.com");
        cy.get('.mb-16 > .jss155 > .jss166').type("Gn174027447");
        cy.get('.jss114 > .flex.w-full > .jss206 > .jss178').click();
        cy.get(':nth-child(1) > :nth-child(1) > .text-blue-nexo')
        .should('exist')
    })
    it('get desired case', () => {
            const desiredSubjects = ["Divorcio","Herencias y Posesiones efectivas", "Autodespido"]
            cy.get('[aria-label="custom pagination table"]')
            .find("tbody")
            .children()
            .first()
            .children()
            .eq(1)
            .invoke('text')
            .then((subject)=> {
            expect(desiredSubjects.includes(subject)).to.be.true;
            cy.get(':nth-child(1) > :nth-child(6) > .jss414 > .jss776').click();
            cy.get('.view-button > .jss569 > div > .jss414').click();
            cy.get('.justify-center > .bg-yellow-900').click();
            cy.wait(3000);
            cy.get('.client-contact-info > :nth-child(2)')
            .invoke('text')
            .then((name)=> {
              const clientName = name;
              cy.get(':nth-child(4) > a')
              .invoke('text')
              .then((phone)=> {
                const clientPhone = phone
                cy.get('#case-content > .jss1148 > :nth-child(1)')
                .invoke('text')
                .then((questions)=> {
                  const clientAnswers = questions;

                  const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: 'gnpiedrabuena@defensa-ciudadana.com',
                        pass: 'b i r a v t f l s w p w r e h r'
                    }
                });
                 const mailOpt = {
                    from: 'gnpiedrabuena@defensa-ciudadana.com',
                    to: 'livelex@gmail.com, gnpiedrabuena@defensa-ciudadana.com',
                    subject: `Nuevo cliente de ${subject} de Nexo Abogados! `,
                    text: `
                      Hola Andrea, el software detectó el siguiente cliente para que lo llames
                      ${clientName}
                      contacto: ${clientPhone}
                      Preguntas:
                      ${clientAnswers}
                    `
                 }
                transporter.sendMail(mailOpt, (err, info)=>{
                    if(err){
                        console.log(err)
                    } else {
                          console.log(info)                  
                    }
                })
                  expect(false).to.be.true;

                })
        });
      })
    })
  });
});