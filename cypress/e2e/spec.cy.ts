describe('e2eTesting', () => {

  const login = (userName:string, password:string) => {
    cy.visit('/login')
    cy.get('input[id="userName"]').type(userName)
    cy.get('input[id="password"]').type(password)
    cy.get('button[type="submit"]').click()
  }

  const logout = () => {
    //Nos aseguramos de que el botón de logout esté visible
    cy.get('div.sm\\:hidden').invoke('show');
    cy.get('a[name="logout"]').should("be.visible").click();
    cy.contains('Inicio de sesión');
  }

  const register = (userName:string, password:string, confirmPassword:string) => {
    cy.visit('/registration')
    cy.get('input[id="userName"]').type(userName)
    cy.get('input[id="password"]').type(password)
    cy.get('input[id="confirmPassword"]').type(confirmPassword)
    cy.get('button[type="submit"]').click()
  }

  const deleteUser = () => {
    cy.contains('¡Login exitoso, aquí puedes modificar los datos de usuario!');
    cy.wait(1000); //Esperamos a que se cargue la información
    cy.get('h2[name="deleteUser"]').click();
  }


  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Inicio de sesión')
  })

  it('Register', () => {
    register('TestUserName123', 'HolaMundo1$', 'HolaMundo1$')
    cy.contains('Inicio de sesión')
  })

  it('Login', () => {
    login('TestUserName123', 'HolaMundo1$')
    cy.contains('¡Login exitoso, aquí puedes modificar los datos de usuario!')
    logout()
  })

  it('Logout', () => {
    login('TestUserName123', 'HolaMundo1$')
    logout()
  })

  it('Delete user', () => {
    login('TestUserName123', 'HolaMundo1$')
    deleteUser();
    cy.contains('Inicio de sesión');
  });

  it('Update user', () => {
    register('TestUserName123', 'HolaMundo1$', 'HolaMundo1$');
    login('TestUserName123', 'HolaMundo1$');
    cy.contains('¡Login exitoso, aquí puedes modificar los datos de usuario!');
    cy.wait(1000); //Esperamos a que se cargue la información
    cy.get('input[id="userName"]').clear().type('TestUserNameUpdated123');
    cy.get('input[id="newPassword"]').clear().type('HolaMundo1$2'); //Contraseña nueva
    cy.get('input[id="confirmNewPassword"]').type('HolaMundo1$2');
    cy.get('button[type="submit"]').click();
    cy.get('input[id="userName"]').should('have.attr', 'placeholder', 'TestUserNameUpdated123');
    logout();
    login('TestUserNameUpdated123', 'HolaMundo1$2');
    deleteUser();
    cy.contains('Inicio de sesión');
  });

})
