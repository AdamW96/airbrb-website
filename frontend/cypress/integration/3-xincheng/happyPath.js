context('happy path', () => {
  const dynamicEmail = Math.floor(Math.random() * 100001);
  console.log(dynamicEmail);
  beforeEach(() => {
    cy.visit('localhost:3000');
  })
  it('ui testing one', () => {
    // Registers successfully
    cy.get('#RegisterUser')
      .click({ force: true })
    const FirstName = 'XIN';
    const LastName = 'CHENG';
    const email = dynamicEmail+'@ad.unsw.edu.au';
    const password = 'Cx111111';
    const confirmPassword = 'Cx111111';
    cy.get('#firstName')
      .focus()
      .type(FirstName);
    cy.get('#lastName')
      .focus()
      .type(LastName);
    cy.get('#email')
      .focus()
      .type(email);
    cy.get('#password')
      .focus()
      .type(password);
    cy.get('#confirmPassword')
      .focus()
      .type(confirmPassword);
    cy.get('#register')
      .click()    
    cy.wait(400) 
    cy.get('#Logout')
      .click({ force: true })
    cy.get('#login')
      .click({ force: true })
    cy.get('#emailLogin')
      .focus()
      .type(email);
    cy.get('#PasswordLogin')
      .focus()
      .type(password);
    cy.get('#LoginButton')
      .click()
    cy.wait(400)
    // Creates a new listing successfully
    cy.get('#creatList')
      .click({ force: true })
    cy.get('#entirePlace')
      .click()
    cy.get('#next')
      .click()
    const street = '11 Snape St'
    const city = 'MAROUBRA'
    const state = 'NSW'
    const postcode = '2035'
    const country = '澳大利亚'
    cy.get('#street')
      .focus()
      .type(street);
    cy.get('#city')
      .focus()
      .type(city);
    cy.get('#state')
      .focus()
      .type(state);
    cy.get('#postcode')
      .focus()
      .type(postcode);
    cy.get('#country')
      .focus()
      .type(country);
    cy.get('#next')
      .click()
    const title = 'cgg' + dynamicEmail;
    const price = 888
    const bathroom = 3
    cy.get('#title')
      .focus()
      .type(title);
    cy.get('#price')
      .focus()
      .type(price);
    cy.get('#bathroom')
      .focus()
      .type(bathroom);
    cy.get('#next')
      .click()
    cy.get('#pool')
      .click()
    cy.get('#next')
      .click()
    cy.get('#video')
      .click()
    const youtube = 'https://www.youtube.com/embed/tgbNymZ7vqY'
    cy.get('#youtube')
      .focus()
      .type(youtube);
    cy.get('#submit')
      .click()
    cy.wait(700)
    // Updates the thumbnail and title of the listing successfully
    cy.contains('Edit').click()
    const newTitle = 'new' + dynamicEmail;
    cy.get('#newTitle')
      .focus().clear()
      .type(newTitle);
    const NewThumbnail = 'https://www.youtube.com/watch?v=tollGa3S0o8'
    cy.get('#NewThumbnail')
      .focus().clear()
      .type(NewThumbnail);
    cy.get('#save').click()
    // Publish a listing successfully
    cy.get('#Publish').click()
    cy.get('#date-picker-inline1')
      .click()
      .type(11).type(11).type(2021)
    cy.get('#date-picker-inline2')
      .click()
      .type(21).type(11).type(2021)
    cy.get('#addData')
      .click()
    cy.get('#FinishPublish')
      .click()
    // Unpublish a listing successfully
    cy.get('#Unpublish')
      .click()
    cy.get('#UnpublishButton')
      .click()
    // Before booking, there should be publised room, so we do publish again.
    cy.get('#Publish').click()
    cy.get('#date-picker-inline1')
      .click()
      .type(11).type(11).type(2021)
    cy.get('#date-picker-inline2')
      .click()
      .type(21).type(11).type(2021)
    cy.get('#addData')
      .click()
    cy.get('#FinishPublish')
      .click()
    // You can't book your own house, so we use a new account to log in
    cy.wait(400) 
    cy.get('#Logout')
      .click({ force: true })
    cy.get('#RegisterUser')
      .click({ force: true })
    const FirstNameNew = 'XINNEW';
    const LastNameNew = 'CHENGNEW';
    const emailNew = dynamicEmail + 'new' +'@ad.unsw.edu.au';
    const passwordNew = 'Cx111111';
    const confirmPasswordNew = 'Cx111111';
    cy.get('#firstName')
      .focus()
      .type(FirstNameNew);
    cy.get('#lastName')
      .focus()
      .type(LastNameNew);
    cy.get('#email')
      .focus()
      .type(emailNew);
    cy.get('#password')
      .focus()
      .type(passwordNew);
    cy.get('#confirmPassword')
      .focus()
      .type(confirmPasswordNew);
    cy.get('#register')
      .click()    
    cy.wait(400) 
    // Make a booking successfully 
    cy.get('#Home')
      .click()
    cy.get('#titleOfCard')
      .click()
    cy.wait(400)
    cy.get('#BookButton')
      .click()
    cy.get('#bookStartTime')
      .click()
      .type(11).type(11).type(2021)
    cy.get('#bookEndTime')
      .click()
      .type(21).type(11).type(2021)
    cy.get('#bookSubmit')
      .click()
    // Logs out of the application successfully
    cy.wait(400) 
    cy.get('#Logout')
      .click({ force: true })
    // Logs back into the application successfully
    cy.get('#login')
      .click({ force: true })
    cy.get('#emailLogin')
      .focus()
      .type(email);
    cy.get('#PasswordLogin')
      .focus()
      .type(password);
    cy.get('#LoginButton')
      .click()
    cy.wait(400)
  })
})