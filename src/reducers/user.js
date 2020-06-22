
export default (state={}, actions) => {
  switch( actions.type ) {

    case 'LOGIN': 
      return {
        uid: actions.uid
      }

    case 'LOGOUT': 
      return {}
      
    default: 
      return state;
  }
}