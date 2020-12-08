'use strick';

const userLogout = new LogoutButton();

userLogout.action = () => ApiConnector.logout(response => response.success ? location.reload() : console.log('Error'))

ApiConnector.current(response => {response.success ? ProfileWidget.showProfile(response.data) : console.log('Error')}
);

const userRatesBoard = new RatesBoard();

