const initialState = {
 accessToken:null,
 userData:null
}

export default (state = initialState, action) => {
 switch (action.type) {
	case 'SET_TOKEN':
	 return { ...state, accessToken: action.payload }
	case 'SET_USERDATA':
	 return { ...state, userData: action.payload }
	default:
	 return state
 }
}
