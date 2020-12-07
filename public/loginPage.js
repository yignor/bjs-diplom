'use strick';

const userForm = new UserForm();

userForm.loginFormCallback = data => ApiConnector.login(data, response => !response.success ? userForm.setLoginErrorMessage(response.error) : location.reload());

userForm.registerFormCallback = data => ApiConnector.register(data, response => !response.success ? userForm.setRegisterErrorMessage(response.error) : location.reload());
