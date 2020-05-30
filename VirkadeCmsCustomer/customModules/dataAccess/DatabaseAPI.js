//connection details - probs move to config file
//const HOST = '192.168.1.240'
const HOST = '192.168.1.7' //move property
const PORT = '136' //move to property
const API_ADDRESS = '/service'
const PROTOCOL = 'http'

//queries
const QUERY = 'query'
const GET_ALL_STATES = 'getAllStates'
const GET_USER_BY_USERNAME = 'getUserByUsername'

//mutations
const MUTATION = 'mutation'
const CREATE_NEW_USER = 'createNewUser'
const UPDATE_USER = 'updateUser'
const CREATE_USER_ADDRESS = 'addUserAddress'
const CREATE_PHONE = 'addPhone'
const SIGN_IN = 'signIn'
const ADD_COMMENT = 'addComment'
const ADD_USER_LEGAL_DOC = 'addUserLegalDoc'

//params & fields
const TYPE = 'type'
const INPUT_USER = 'inputUser'
const AUTHDATA = 'authData'
const EMAILADDRESS = 'emailAddress'
const USERID = 'userId'
const TYPE_CODE = 'typeCode'
const CODE = 'code'
const ADDRESSID = 'addressId'
const STATUSID = 'statusId'
const STATUS = 'status'
const USERNAME = 'username'
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

const INPUT_ADDRESS = 'inputAddress'
const ADDRESS = 'address'
const STREET = 'street'
const APT = 'apt'
const STATE = 'state'
const STATE_CODE = 'stateCode'
const STATE_ID = 'stateId'
const UNIT = 'unit'
const CITY = 'city'
const POSTAL_CODE = 'postalCode'

const INPUT_PHONE = 'inputPhone'
const PHONEID = 'phoneId'
const PHONE_COUNTRY_CODE = 'countryCode'
const PHONE_NUMBER = 'number'
const PHONE_NUMBERS = 'phoneNumbers'

const INPUT_COMMENT = 'inputComment'
const COMMENT_CONTENT = 'commentContent'
const COMMENTID = 'commentId'
const NEW_LINE_TOKEN = '[LF]'

const INPUT_LEGAL = 'inputLegal'
const LEGAL_DOC_ID = 'legalDocId'
const AGREE = 'agree'
const ACTIVE_DATE = 'activeDate'
const EXPIRE_DATE = 'expireDate'
const ENABLED = 'enabled'
  
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
    getAllFieldsUserByUserName: function(username, callBack) {
        let query = GraphQLParamStrings.getAllFieldsUserByUserName(username)
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
    },
    addUserPhone: function (userObj, callback) {
        let query = GraphQLParamStrings.addUserPhone(userObj)
        return dataFetch(query, userObj.username, userObj.authToken.token, callback)
    },
    addUserComment: function (userObj, callback) {
        let query = GraphQLParamStrings.addUserComment(userObj)
        return dataFetch(query, userObj.username, userObj.authToken.token, callback)
    },
    addUserLegalDoc: function (userObj, legalTypeCode, agree = true, callback) {
        let query = GraphQLParamStrings.addUserLegalDoc(userObj.username, legalTypeCode, agree)
        console.log(query)
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
        let age = userObj.age;
        let weight = userObj.weight;

        if (age === '' || age == undefined){
            age = 0;
        }
        if (weight === '' || age == undefined){
            weight = 0;
        }

        let query = `${MUTATION}{${UPDATE_USER}
            (   
                ${INPUT_USER}:{
                    ${USERID}:${userObj.userId},
                    ${TYPE_CODE}:\"${userObj.userTypeCode}\",
                    ${STATUSID}:${userObj.statusId},
                    ${EMAILADDRESS}:\"${userObj.emailAddress}\",
                    ${USERNAME}:\"${userObj.username}\",
                    ${PASSWORD}:\"${userObj.password}\",
                    ${SECURITYQ}:\"${userObj.securityQ}\",
                    ${SECURITYA}:\"${userObj.securityA}\"
                    ${FIRST_NAME}:\"${userObj.firstName}\",
                    ${LAST_NAME}:\"${userObj.lastName}\",
                    ${GENDER}:\"${userObj.gender}\",
                    ${AGE}:${parseInt(age)},
                    ${HEIGHT}:${height},
                    ${WEIGHT}:${parseInt(weight)},      
                    ${IDP}:${parseFloat(userObj.idp)},
                    ${EMAIL_VERIFIED}:${userObj.emailVerified},
                    ${PLAYED_BEFORE}:${userObj.playedBefore},
                    ${REAL_ESTATE_SERVICE}:${userObj.reServices},
                    ${CAN_CONTACT}:${userObj.canContact},
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
    getAllFieldsUserByUserName: function (username) {
        let query = `${QUERY} { ${GET_USER_BY_USERNAME}
            (
                ${USERNAME}:\"${username}\",
            ){
                ${USERID}
                ${USERNAME} 
                ${TYPE} {
                    ${CODE}
                }
                ${ADDRESS}{
                    ${STATE} {
                        ${STATE_CODE}
                    }
                    ${TYPE}{
                        ${CODE}
                    }
                    ${STREET}
                    ${UNIT}
                    ${APT}
                    ${CITY}
                    ${POSTAL_CODE}
                }
                ${STATUS} {
                    ${STATUSID}
                }
                ${EMAILADDRESS}
                ${PHONE_NUMBERS} {
                    ${PHONE_NUMBER}
                    ${PHONE_COUNTRY_CODE}
                    ${TYPE} {
                        ${CODE}
                    }
                }
                ${SECURITYQ}
                ${FIRST_NAME}
                ${LAST_NAME}
                ${GENDER}
                ${AGE}
                ${HEIGHT}
                ${WEIGHT}
                ${IDP}
                ${EMAIL_VERIFIED}
                ${PLAYED_BEFORE}
                ${REAL_ESTATE_SERVICE}
                ${CAN_CONTACT}
            }
        }`
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

        let unit = userObj.unit;
        let apt = userObj.apt;
        let street = userObj.street;
        let city = userObj.street;
        let state = userObj.state
        let postalCode = userObj.postalCode

        if (unit == undefined){
            unit = ''
        }
        if (apt == undefined){
            apt = ''
        }
        if (street == undefined){
            street = ''
        }
        if (city == undefined){
            city = ''
        }
        if (state == undefined){
            state = ''
        }
        if (postalCode == undefined){
            postalCode = ''
        }

        let query = `${MUTATION}{${CREATE_USER_ADDRESS}
            (   
                ${INPUT_ADDRESS}:{
                    ${STATE_CODE}:\"${state}\",
                    ${TYPE_CODE}:\"${userObj.addressTypeCode}\",
                    ${STREET}:\"${street}\",
                    ${UNIT}:\"${unit}\",
                    ${APT}:\"${apt}\",
                    ${CITY}:\"${city}\",
                    ${POSTAL_CODE}:\"${postalCode}\",
                }
            ){
                    ${ADDRESSID}
        }}`
        return query;
    },
    addUserPhone: function (userObj) {
        let query = `${MUTATION}{${CREATE_PHONE}
            (   
                ${INPUT_PHONE}:{
                    ${USERNAME}:\"${userObj.username}\",
                    ${TYPE_CODE}:\"${userObj.phoneType}\",
                    ${PHONE_COUNTRY_CODE}:${userObj.phoneCountryCode},
                    ${PHONE_NUMBER}:\"${userObj.phoneNumber}\",
                }
            ){
                    ${PHONEID} 
                    ${USERID} 
        }}`
        return query;
    },
    addUserComment: function (userObj) {
        let commentContent = (userObj.commentContent).replace(/\n/g, NEW_LINE_TOKEN)
        let query = `${MUTATION}{${ADD_COMMENT}
            (   
                ${INPUT_COMMENT}:{
                    ${USERNAME}:\"${userObj.username}\",
                    ${TYPE_CODE}:\"${userObj.commentType}\",
                    ${COMMENT_CONTENT}:\"${commentContent}\",
                }
            ){
                    ${COMMENTID} 
                    ${USERID} 
        }}`
        return query;
    },
    addUserLegalDoc: function (username, legalTypeCode, agree) {
        //2020-05-30 02:30:57.311
        let activeDate = new Date()
        let expYear = activeDate.getFullYear() + 1
        activeDate = `${activeDate.getUTCFullYear()}-${activeDate.getUTCMonth()}-${activeDate.getUTCDate()} ${activeDate.getUTCHours()}:${activeDate.getUTCMinutes()}:${activeDate.getUTCSeconds()}.000`
       
        let expireDate = new Date();
        expireDate = `${expYear}-${expireDate.getUTCMonth()}-${expireDate.getUTCDate()} ${expireDate.getUTCHours()}:${expireDate.getUTCMinutes()}:${expireDate.getUTCSeconds()}.000`

        let query = `${MUTATION}{${ADD_USER_LEGAL_DOC}
            (   
                ${INPUT_LEGAL}:{
                    ${USERNAME}:\"${username}\",
                    ${TYPE_CODE}:\"${legalTypeCode}\",
                    ${AGREE}:${agree},
                    ${ACTIVE_DATE}:\"${activeDate}\",
                    ${EXPIRE_DATE}:\"${expireDate}\",
                    ${ENABLED}:true
                }
            ){
                    ${LEGAL_DOC_ID}
        }}`
        return query;
    },
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
            'Username': username
        }
    }).then(response => response.json()
    ).then(results => {
        let data = results.data;
        let errors = results.errors
        if (callBack){
            callBack(data, errors)
        } else {
            return results;
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