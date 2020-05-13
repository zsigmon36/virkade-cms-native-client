//const HOST = '192.168.1.240'
const HOST = '192.168.1.7'
const PORT = '80'
const API_ADDRESS = '/service'
const QUERY = 'query'
const MUTATION = 'mutation'
const AUTHDATA = 'authData'
const SIGN_IN = 'signIn'
const CREATE_NEW_USER = 'createNewUser'
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
    createNewUser: function (emailAddress, username, password, securityQ, securityA, firstName, lastName, callBack) {
        let query = GraphQLParamStrings.createNewUser(emailAddress, username, password, securityQ, securityA, firstName, lastName)
        return dataFetch(query, username, authToken = '', callBack)
    },
    getUserByUserName: function(username, callBack) {
        let query = GraphQLParamStrings.getUserByUserName(username, callBack)
        return dataFetch(query, username, authToken = '', callBack)
    }
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
    createNewUser: function (emailAddress, username, password, securityQ, securityA, firstName, lastName) {
        let query = `${MUTATION} { ${CREATE_NEW_USER}
            (
                ${EMAILADDRESS}:\"${emailAddress}\",
                ${AUTHDATA}:{
                    ${USERNAME}:\"${username}\",
                    ${PASSWORD}:\"${password}\",
                    ${SECURITYQ}:\"${securityQ}\",
                    ${SECURITYA}:\"${securityA}\"
                },
                ${FIRST_NAME}:\"${firstName}\",
                ${LAST_NAME}:\"${lastName}\"
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
        }
    });
}