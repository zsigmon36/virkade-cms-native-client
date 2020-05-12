//const HOST = '192.168.1.240'
const HOST = '192.168.1.7'
const PORT = '80'
const API_ADDRESS = '/service'
const QUERY = 'query'
const MUTATION = 'mutation'
const AUTHDATA = 'authData'
const SIGN_IN = 'signIn'
const CREATE_NEW_USER = 'createNewUser'
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
        dataFetch(query, username, authToken = '', callBack)
    },
    createNewUser: function (emailAddress, username, password, securityQ, securityA, firstName, lastName, callBack) {
        let query = GraphQLParamStrings.createNewUser(emailAddress, username, password, securityQ, securityA, firstName, lastName)
        dataFetch(query, username, authToken = '', callBack)
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

    }
}


const dataFetch = function (queryString, username, authToken, callBack, retries = 2) {

    let qs = cmsGraphQLHost;
    let promise = fetch(qs, {
        method: 'POST',
        body: JSON.stringify({ query: queryString }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken,
            'UserName': username
        }
    });

    promise.then(response => response.json())
    .then(results => {
        callBack(jsonData)
    }).catch(error => {
        console.error("Woopsie Daisy, something broke")
        if (retries > 0) { 
            dataFetch(queryString, username, authToken, callBack, --retries)
        }
    });
}