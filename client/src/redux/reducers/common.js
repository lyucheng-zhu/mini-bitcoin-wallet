
const defaultState = {
  appName: '',
  modalModeSignin: false,
  modalModeSignup: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'TOGGLE_MODAL_SIGNIN':
      console.log(`toggling modal: ${action.modalModeSignin}`)
      return {
        ...state,
        modalModeSignin: action.modalModeSignin
      }
    case 'TOGGLE_MODAL_SIGNUP':
      console.log(`toggling modal: ${action.modalModeSignup}`)
      return {
        ...state,
        modalModeSignup: action.modalModeSignup
      }
    default:
      return state;
  }
};
