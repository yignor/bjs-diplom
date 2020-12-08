'use strick';

const userLogout = new LogoutButton();

userLogout.action = () => ApiConnector.logout(response => response.success ? location.reload() : console.log('Error'))

const userRatesBoard = new RatesBoard();

