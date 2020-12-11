'use strick';

const userLogout = new LogoutButton();

userLogout.action = () => ApiConnector.logout(response => response.success ? location.reload() : console.log('Error'))

ApiConnector.current(response => {response.success ? ProfileWidget.showProfile(response.data) : console.log('Error')}
);

const userRatesBoard = new RatesBoard();

function refreshCurrencies() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            userRatesBoard.clearTable();
            userRatesBoard.fillTable(response.data);
        }
    });
};
refreshCurrencies();

let updateCurrencies = setInterval(() => refreshCurrencies(), 20000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        let message = string;
        if (response.success) {
            message = `Счёт успешно пополнен на ${data.amount} ${data.currency}`;
            ProfileWidget.showProfile(response.data);
        } else {
            message = response.error;
        }
        moneyManager.setMessage(response.success, message);
    });
}

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        let message = string;
        if (response.success) {
            message = `${data.fromAmount} ${data.fromCurrency} успешно сконвертированы в ${data.targetCurrency}`;
            ProfileWidget.showProfile(response.data);
        } else {
            message = response.error;
        }
        moneyManager.setMessage(response.success, message);
    });
}

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        let message = string;
        if (response.success) {
            message = `${data.amount} ${data.currency} успешно переведены пользователю с ID ${data.to}`;
            ProfileWidget.showProfile(response.data);
        } else {
            message = response.error;
        }
        moneyManager.setMessage(response.success, message);
    });
}


const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if (response.success) {
        updateFavoriresTable(response);
    } else {
        const message = response.error;
        favoritesWidget.setMessage(response.success, message);
    }
});

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        let message = string;
        if (response.success) {
            message = `Пользователь ${data.name} добавлен в адресную книгу`;
            updateFavoriresTable(response);
        } else {
            message = response.error;
        }
        favoritesWidget.setMessage(response.success, message);
    });
}

favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        let message = string;
        if (response.success) {
            message = `Пользователь c ID ${data} удалён`;
            updateFavoriresTable(response);
        } else {
            message = response.error;
        }
        favoritesWidget.setMessage(response.success, message);
    });
}

function updateFavoriresTable(response) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
}