//const HOST = '192.168.1.240'
const HOST = '192.168.1.7'
const PORT = '136'
const API_ADDRESS = '/service'
const QUERY = 'query'
const MUTATION = 'mutation'
const AUTHDATA = 'authData'
const SIGN_IN = 'signIn'
const CREATE_NEW_USER = 'createNewUser'
const UPDATE_USER = 'updateUser'
const GET_USER_BY_USERNAME = 'getUserByUserName'
const USERNAME = 'userName'
const PASSWORD = 'password'
const SECURITYQ = 'securityQuestion'
const SECURITYA = 'securityAnswer'
const FIRST_NAME = 'firstName'
const LAST_NAME = 'lastName'
const TOKEN = 'token'
const EMAILADDRESS = 'emailAddress'
const USERID = 'userId'
const CREATED_DATE = 'createdDate'

let cmsGraphQLHost = `http://${HOST}:${PORT}${API_ADDRESS}`

export const DatabaseAPI = {
    signin: function (username, password, callBack) {
        let query = GraphQLParamStrings.signIn(username, password)
        return dataFetch(query, username, authToken = '', callBack)
    },
    createNewUser: function (userObj, callBack) {
        let query = GraphQLParamStrings.createNewUser(userObj)
        return dataFetch(query, username, authToken = '', callBack)
    },
    getUserByUserName: function(username, callBack) {
        let query = GraphQLParamStrings.getUserByUserName(username)
        return dataFetch(query, username, authToken = '', callBack)
    },
    updateUser: function (userObj, callBack) {
        let query = GraphQLParamStrings.updateUser(userObj)
        return dataFetch(query, username, authToken = '', callBack)
    },
}

const GraphQLParamStrings = {
    signIn: function (username, password) {
        return `"${QUERY}": "{ ${SIGN_IN}
            (
                ${AUTHDATA}:{
                    ${USERNAME}:${username},
                    ${PASSWORD}:${password}
                }
            ){
                ${USERNAME},
                ${TOKEN}
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
        let query = `${MUTATION} { ${UPDATE_USER}
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
    getUserByUserName: function (username) {
        let query = `${QUERY} { ${GET_USER_BY_USERNAME}
            (
                ${USERNAME}:\"${username}\",
            ){
                ${USERNAME} 
                ${USERID}
            }}`
        return query; //.replace(/\s/g, '');

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
        callBack(data)
    }).catch(error => {
        console.error("Woopsie Daisy, something broke")
        if (retries > 0) {
            dataFetch(queryString, username, authToken, callBack, --retries)
        } else {
            alert("Woopsie Daisy, something broke")
        }
    });
}