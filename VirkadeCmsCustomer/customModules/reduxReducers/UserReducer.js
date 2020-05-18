const defaultState = {
            username:"",
            userId:"",
            password:"",
            securityQ:"",
            securityA:"",
            firstName:"",
            lastName:"",
            emailAddress:"",
            gender:"",
            age:"",
            heightFt:"",
            heightIn:"",
            weight:"",
            idp:"",
            street:"",
            apt:"",
            unit:"",
            city:"",
            state:"",
            postalCode:"",
            typeCode:"PHYSCL_ADRS",
            everVr: false,
            canContact: false,
            reService: false,
            authToken : {
                token: "",
                createdDate: "",
                username: ""
            }
}

export default function userReducer(state = defaultState, action){
    let newState = Object.assign({}, state);
    switch (action.type){
        case 'UPDATE_USER':
            newState[Object.keys(action.user)[0]] = action.user[Object.keys(action.user)[0]];
            return newState;
        default:
            return state;
        } 
}