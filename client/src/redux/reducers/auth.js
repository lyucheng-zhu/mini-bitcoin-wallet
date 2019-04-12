// redux reducers for authentication

const initialState = {
    user: {
      wallets:[]
    },
    isAuth: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      console.log('User logging in...');
      console.log(action.user.username);
      return {
        ...state,
        isAuth: Object.keys(action.user).length > 0 ? true : false,
        user: action.user
      }
    case 'LOG_OUT':
      console.log('User logging out...');
      localStorage.removeItem("auth");
      return {
        ...state,
        isAuth: false,
        user: {}
      }
    case 'CHOOSE_PAYER':
    {
      console.log('Choosing payer...');
      let _user = Object.assign({}, state.user);
      _user.payer = _user.wallets[action.index];
      localStorage.setItem("auth", JSON.stringify(_user));
      return {
        ...state,
        user: _user
      }
    }
    case 'DELETE_WALLET':
    {
      console.log('Dleteing wallet...');
      let _user = Object.assign({}, state.user);
      _user.wallets = _user.wallets.filter(wallet => wallet.Id !== action.walletId);
      if (!_user.wallets) _user.wallets = [];
      localStorage.setItem("auth", JSON.stringify(_user));
      return {
        ...state,
        user: _user
      }
    }
    case 'ADD_WALLET':
    {
      console.log('Adding wallet...');
      let _user = Object.assign({}, state.user);
      _user.wallets.push(action.wallet);
      localStorage.setItem("auth", JSON.stringify(_user));
      return {
        ...state,
        user: _user
      }
    }
    case 'CHOOSE_PAYER':
    {
      console.log('Choosing a payer...');
      let _user = Object.assign({}, state.user);
      let payer = state.user.wallets[action.index];
      _user.payer = payer;
      localStorage.setItem("auth", JSON.stringify(_user));
      return {
        ...state,
        user: _user
      }
    }
    default:
      return state;
  }
}
