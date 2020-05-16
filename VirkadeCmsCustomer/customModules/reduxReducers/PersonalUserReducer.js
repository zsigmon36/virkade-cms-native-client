const defaultState = {
        gender:undefined,
        age:undefined,
        heightFt:undefined,
        heightIn:undefined,
        weight:undefined,
        idp:undefined,
        street:undefined,
        apt:undefined,
        unit:undefined,
        city:undefined,
        state:undefined,
        postalCode:undefined,
        typeCode:"PHYSCL_ADRS",
    }

export default function personalUserReducer(state = defaultState, action){
    let newState = Object.assign({}, state);
    switch (action.type){
        case 'UPDATE_PERSONAL_USER':
            newState[Object.keys(action.personalUser)[0]] = action.personalUser[Object.keys(action.personalUser)[0]];
            return newState;
        default:
            return state;
        } 
}