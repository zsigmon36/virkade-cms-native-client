//connection details - probs move to config file
//const HOST = '192.168.1.240'
const HOST = '192.168.1.7'
const PORT = '136'
const API_ADDRESS = '/service'
const PROTOCOL = 'http'

//queries
const QUERY = 'query'
const GET_ALL_STATES = 'getAllStates'
const GET_USER_BY_USERNAME = 'getUserByUserName'

//mutations
const MUTATION = 'mutation'
const CREATE_NEW_USER = 'createNewUser'
const UPDATE_USER = 'updateUser'
const SIGN_IN = 'signIn'

//params & fields
const INPUT_USER = 'InputUser'
const AUTHDATA = 'authData'
const EMAILADDRESS = 'emailAddress'
const USERID = 'userId'
const TYPE_CODE = 'typeCode'
const ADDRESSID = 'addressId'
const STATUSID = 'statusId'
const USERNAME = 'userName'
const PASSWORD = 'password'
const SECURITYQ = 'securityQuestion'
const SECURITYA = 'securityAnswer'
const FIRST_NAME = 'firstName'
const LAST_NAME = 'lastName'
const GENDER = 'gender'
const AGE = 'age'
const HEIGHT = 'height'
const WEIGHT = 'weight'
const IDP = 'idp'
const EMAIL_VERIFIED = 'emailVerified'
const PLAYED_BEFORE = 'playedBefore'
const REAL_ESTATE_SERVICE = 'reServices'
const CAN_CONTACT = 'canContact'
const TOKEN = 'token'
const NAME = 'name'
const CREATED_DATE = 'createdDate'

const INPUT_ADDRESS = 'InputAddress'
const STREET = 'street'
const APT = 'apt'
const STATE_CODE = 'stateCode'
const STATE_ID = 'stateId'
const UNIT = 'unit'
const CITY = 'city'
const POSTAL_CODE = 'postalCode'

let cmsGraphQLHost = `${PROTOCOL}://${HOST}:${PORT}${API_ADDRESS}`

export const DatabaseAPI = {
    signIn: function (username, password, callBack = undefined) {
        let query = GraphQLParamStrings.signIn(username, password)
        return dataFetch(query, username, authToken = '', callBack)
    },
    createNewUser: function (userObj, callBack) {
        let query = GraphQLParamStrings.createNewUser(userObj)
        return dataFetch(query, userObj.username, authToken = '', callBack)
    },
    getUserByUserName: function(username, callBack) {
        let query = GraphQLParamStrings.getUserByUserName(username)
        return dataFetch(query, username, authToken = '', callBack)
    },
    updateUser: function (userObj, callBack) {
        let query = GraphQLParamStrings.updateUser(userObj)
        return dataFetch(query, userObj.username, userObj.authToken.token, callBack)
    },
    getAllStates: function (userObj, callback) {
        let query = GraphQLParamStrings.getAllStates()
        return dataFetch(query, userObj.username, userObj.authToken.token, callback)
    },
    addUserAddress: function (userObj, callback) {
        let query = GraphQLParamStrings.addUserAddress(userObj)
        return dataFetch(query, userObj.username, userObj.authToken.token, callback)
    }
}

const GraphQLParamStrings = {
    signIn: function (username, password) {
        return `${MUTATION} { ${SIGN_IN}
            (
                ${AUTHDATA}:{
                    ${USERNAME}:\"${username}\",
                    ${PASSWORD}:\"${password}\"
                }
            ){
                ${USERNAME},
                ${TOKEN},
                ${CREATED_DATE}
            }
        }`
    },
    createNewUser: function (userObj) {
        let query = `${MUTATION} { ${CREATE_NEW_USER}
            (
                ${EMAILADDRESS}:\"${userObj.emailAddress}\",
                ${AUTHDATA}:{
                    ${USERNAME}:\"${userObj.username}\",
                    ${PASSWORD}:\"${userObj.password}\",
                    ${SECURITYQ}:\"${userObj.securityQ}\",
                    ${SECURITYA}:\"${userObj.securityA}\"
                },
                ${FIRST_NAME}:\"${userObj.firstName}\",
                ${LAST_NAME}:\"${userObj.lastName}\"
            ){
                ${USERNAME} 
                ${USERID}
            }}`
        return query; //.replace(/\s/g, '');

    },
    updateUser: function (userObj) {

        let feet = parseInt(userObj.heightFt);
        let inch = parseInt(userObj.heightIn);
        let height = (feet * 12) + inch;

        let query = `${MUTATION}{${UPDATE_USER}
            (   
                ${INPUT_USER}:{
                    ${EMAILADDRESS}:\"${userObj.emailAddress}\",
                    ${AUTHDATA}:{
                        ${USERNAME}:\"${userObj.username}\",
                        ${PASSWORD}:\"${userObj.password}\",
                        ${SECURITYQ}:\"${userObj.securityQ}\",
                        ${SECURITYA}:\"${userObj.securityA}\"
                    },
                    ${FIRST_NAME}:\"${userObj.firstName}\",
                    ${LAST_NAME}:\"${userObj.lastName}\",
                    ${TYPE_CODE}:\"${userObj.userTypeCode}\",
                    ${STATUSID}:\"${userObj.statusId}\",
                    ${GENDER}:\"${userObj.gender}\",
                    ${AGE}:\"${parseInt(userObj.age)}\",
                    ${WEIGHT}:\"${parseInt(userObj.weight)}\",
                    ${HEIGHT}:\"${height}\",
                    ${IDP}:\"${parseFloat(userObj.idp)}\",
                    ${EMAIL_VERIFIED}:\"${userObj.emailVerified}\",
                    ${PLAYED_BEFORE}:\"${userObj.everVr}\",
                    ${REAL_ESTATE_SERVICE}:\"${userObj.reServices}\",
                    ${CAN_CONTACT}:\"${userObj.canContact}\",
                }
            ){
                ${USERNAME} 
                ${USERID}
            }}`
        return query; //.replace(/\s/g, '');

    },
    getUserByUserName: function (username) {
        let query = `${QUERY} { ${GET_USER_BY_USERNAME}
            (
                ${USERNAME}:\"${username}\",
            ){
                ${USERNAME} 
                ${USERID}
            }}`
        return query; //.replace(/\s/g, '');

    },
    getAllStates: function () {
        let query = `${QUERY} { ${GET_ALL_STATES}
            {
                ${NAME} 
                ${STATE_CODE}
                ${STATE_ID}
            }}`
        return query;
    },
    addUserAddress: function (userObj) {
        let query = `${MUTATION}{${UPDATE_USER}
            (   
                ${INPUT_ADDRESS}:{
                    ${STATE_CODE}:\"${userObj.state}\",
                    ${TYPE_CODE}:\"${userObj.addressTypeCode}\",
                    ${STREET}:\"${userObj.street}\",
                    ${UNIT}:\"${userObj.unit}\",
                    ${APT}:\"${userObj.apt}\",
                    ${CITY}:\"${userObj.city}\",
                    ${POSTAL_CODE}:\"${userObj.postalCode}\",
                }
            ){
                    ${ADDRESSID} 
        }}`
    }
}


const dataFetch = function (queryString, username, authToken, callBack, retries = 1) {

    let qs = cmsGraphQLHost;
    let body = JSON.stringify({ query: queryString });

    fetch(qs, {
        method: 'POST',
        body: body,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken,
            'UserName': username
        }
    }).then(response => response.json()
    ).then(results => {
        data = results.data;
        if (callBack){
            callBack(data)
        } else {
            return data;
        }
    }).catch(error => {
        if (retries > 0) {
            dataFetch(queryString, username, authToken, callBack, --retries)
        } else {
            if (callBack){
                callBack(error)
            } else {
                return error;
            }
        }
    });
}