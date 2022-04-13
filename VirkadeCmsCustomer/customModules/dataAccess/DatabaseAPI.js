import {connection} from '../../static/props.js';

//queries
const QUERY = 'query';
const GET_ALL_STATES = 'getAllStates';
const GET_USER_BY_USERNAME = 'getUserByUsername';
const GET_AVAIL_PLAY_SESSIONS = 'getAvailableSessions';
const GET_PENDING_PLAY_SESSIONS = 'getPendingSessions';
const GET_LATEST_DOCUMENT_BY_TYPE = 'getLatestDocumentByType';

//mutations
const MUTATION = 'mutation';
const CREATE_NEW_USER = 'createNewUser';
const UPDATE_USER = 'updateUser';
const CREATE_USER_ADDRESS = 'addUserAddress';
const CREATE_PHONE = 'addPhone';
const SIGN_IN = 'signIn';
const SIGN_OUT = 'signOut';
const ADD_COMMENT = 'addComment';
const ADD_USER_LEGAL_DOC = 'addUserLegalDoc';
const RECOVERY_SIGN_IN = 'recoverySignIn';
const SET_NEW_PASSWORD = 'setNewPassword';
const ADD_USER_SESSION = 'addUserSession';

//params & fields
const TYPE = 'type';
const INPUT_USER = 'inputUser';
const AUTHDATA = 'authData';
const EMAILADDRESS = 'emailAddress';
const USERID = 'userId';
const TYPE_CODE = 'typeCode';
const CODE = 'code';
const ADDRESSID = 'addressId';
const STATUSID = 'statusId';
const STATUS = 'status';
const USERNAME = 'username';
const VALIDATED = 'validated';
const PASSWORD = 'password';
const SECURITYQ = 'securityQuestion';
const SECURITYA = 'securityAnswer';
const FIRST_NAME = 'firstName';
const LAST_NAME = 'lastName';
const GENDER = 'gender';
const AGE = 'age';
const HEIGHT = 'height';
const WEIGHT = 'weight';
const IDP = 'idp';
const ACCOUNT_VERIFIED = 'accountVerified';
const PLAYED_BEFORE = 'playedBefore';
const REAL_ESTATE_SERVICE = 'reServices';
const LIABLE_AGREE = 'liableAgree';
const TC_AGREE = 'tcAgree';
const ACTIVE_TC_LEGAL = 'ActiveTCLegal';
const ACTIVE_LIAB_LEGAL = 'ActiveLiabLegal';
const CAN_CONTACT = 'canContact';
const TOKEN = 'token';
const PASSCODE = 'passCode';
const NAME = 'name';
const CREATED_DATE = 'createdDate';

const INPUT_ADDRESS = 'inputAddress';
const ADDRESS = 'address';
const STREET = 'street';
const APT = 'apt';
const STATE = 'state';
const STATE_CODE = 'stateCode';
const STATE_ID = 'stateId';
const UNIT = 'unit';
const CITY = 'city';
const POSTAL_CODE = 'postalCode';

const INPUT_PHONE = 'inputPhone';
const PHONEID = 'phoneId';
const PHONE_COUNTRY_CODE = 'countryCode';
const NUMBER = 'number';
const PHONE_NUMBER = 'phoneNum';
const PHONE_NUMBERS = 'phoneNumbers';

const INPUT_COMMENT = 'inputComment';
const COMMENT_CONTENT = 'commentContent';
const COMMENTID = 'commentId';
const NEW_LINE_TOKEN = '[LF]';

const INPUT_LEGAL = 'inputLegal';
const LEGAL_DOC_ID = 'legalDocId';
const AGREE = 'agree';
const ACTIVE_DATE = 'activeDate';
const EXPIRE_DATE = 'expireDate';
const ENABLED = 'enabled';
const IS_MINOR = 'minor';

const G_SIG = 'gSig';
const P_SIG = 'pSig';

const ACTIVITY_ID = 'activityId';
const ACTIVITY_NAME = 'activityName';
const ACTIVITY = 'activity';

const LOCATION_ID = 'locationId';
const LOCATION_NAME = 'locationName';
const LOCATION = 'location';
const START_DATE = 'startDate';
const END_DATE = 'endDate';
const LENGTH = 'length';
const INPUT_PLAY_SESSION = 'inputPlaySession';
const PAYED = 'payed';
const SESSIONID = 'sessionId';
const COST_PER_MIN = 'costpm';
const SETUP_MINUTES = 'setupMin';
const TAX_RATE = 'taxRate';
const MANAGER = 'manager';

const DOC_ID = 'docId';
const TITLE = 'title';
const CONTENT = 'content';
const VERSION = 'version';

let cmsGraphQLHost = `${connection.PROTOCOL}://${connection.HOST}:${connection.PORT}${connection.API_ADDRESS}`;

export const DatabaseAPI = {
  signIn: function (
    username,
    password,
    callBack = undefined,
    validated = true,
  ) {
    let query = GraphQLParamStrings.signIn(username, password, validated);
    let authToken = '';
    return dataFetch(query, username, authToken, callBack);
  },
  signOut: function (authToken, callBack = undefined) {
    let query = GraphQLParamStrings.signOut(authToken.username);
    return dataFetch(query, authToken.username, authToken.token, callBack);
  },
  createNewUser: function (userObj, callBack) {
    let query = GraphQLParamStrings.createNewUser(userObj);
    return dataFetch(
      query,
      userObj.username,
      userObj.authToken.token,
      callBack,
    );
  },
  getUserByUserName: function (userObj, callBack) {
    let query = GraphQLParamStrings.getUserByUserName(userObj.username);
    return dataFetch(
      query,
      userObj.username,
      userObj.authToken.token,
      callBack,
    );
  },
  getAllFieldsUserByUserName: function (userObj, callBack) {
    let query = GraphQLParamStrings.getAllFieldsUserByUserName(
      userObj.username,
    );
    return dataFetch(
      query,
      userObj.username,
      userObj.authToken.token,
      callBack,
    );
  },
  updateUser: function (userObj, callBack) {
    let query = GraphQLParamStrings.updateUser(userObj);
    return dataFetch(
      query,
      userObj.username,
      userObj.authToken.token,
      callBack,
    );
  },
  getAllStates: function (userObj, callback) {
    let query = GraphQLParamStrings.getAllStates();
    return dataFetch(
      query,
      userObj.username,
      userObj.authToken.token,
      callback,
    );
  },
  getLatestDocumentByType: function (userObj, docTypeCode, callback) {
    let query = GraphQLParamStrings.getLatestDocumentByType(docTypeCode);
    return dataFetch(
      query,
      userObj.username,
      userObj.authToken.token,
      callback,
    );
  },
  addUserAddress: function (userObj, callback) {
    let query = GraphQLParamStrings.addUserAddress(userObj);
    return dataFetch(
      query,
      userObj.username,
      userObj.authToken.token,
      callback,
    );
  },
  addUserPhone: function (userObj, callback) {
    let query = GraphQLParamStrings.addUserPhone(userObj);
    return dataFetch(
      query,
      userObj.username,
      userObj.authToken.token,
      callback,
    );
  },
  addUserComment: function (userObj, callback) {
    let query = GraphQLParamStrings.addUserComment(userObj);
    return dataFetch(
      query,
      userObj.username,
      userObj.authToken.token,
      callback,
    );
  },
  addUserLegalDoc: function (
    userObj,
    legalTypeCode,
    docId,
    pSig,
    gSig,
    isMinor = false,
    agree = true,
    callback,
  ) {
    let query = GraphQLParamStrings.addUserLegalDoc(
      userObj.username,
      legalTypeCode,
      docId,
      pSig,
      gSig,
      isMinor,
      agree,
    );
    return dataFetch(
      query,
      userObj.username,
      userObj.authToken.token,
      callback,
    );
  },
  //for recovery pw
  getSecurityQ: function (username, callback) {
    let query = GraphQLParamStrings.getSecurityQ(username);
    let authToken = '';
    return dataFetch(query, username, authToken, callback);
  },
  checkSecurityA: function (userObj, callback) {
    let query = GraphQLParamStrings.checkSecurityA(userObj);
    return dataFetch(
      query,
      userObj.username,
      userObj.authToken.token,
      callback,
    );
  },
  setNewPassword: function (userObj, callback) {
    let query = GraphQLParamStrings.setNewPassword(userObj);
    return dataFetch(
      query,
      userObj.username,
      userObj.authToken.token,
      callback,
    );
  },
  //play session creation
  getAvailableSessions: function (userObj, filter, callback) {
    let query = GraphQLParamStrings.getAvailableSessions(filter);
    return dataFetch(
      query,
      userObj.username,
      userObj.authToken.token,
      callback,
    );
  },
  getPendingSessions: function (userObj, filter, callback) {
    let query = GraphQLParamStrings.getPendingSessions(filter);
    return dataFetch(
      query,
      userObj.username,
      userObj.authToken.token,
      callback,
    );
  },
  addUserSession: function (userObj, session, callback) {
    let query = GraphQLParamStrings.addUserSession(userObj, session);
    return dataFetch(
      query,
      userObj.username,
      userObj.authToken.token,
      callback,
    );
  },
};

const GraphQLParamStrings = {
  signIn: function (username, password, validated) {
    return `${MUTATION} { ${SIGN_IN}
            (
                ${AUTHDATA}:{
                    ${USERNAME}:"${username}",
                    ${PASSWORD}:"${password}"
                },
                ${VALIDATED}:${validated}
            ){
                ${USERNAME},
                ${TOKEN},
                ${CREATED_DATE}
            }
        }`;
  },
  signOut: function (username) {
    return `${MUTATION} { ${SIGN_OUT} ( ${USERNAME}:\"${username}\" ) }`;
  },
  createNewUser: function (userObj) {
    let query = `${MUTATION} { ${CREATE_NEW_USER}
            (
                ${EMAILADDRESS}:\"${userObj.emailAddress}\",
                ${AUTHDATA}:{
                    ${USERNAME}:\"${userObj.username}\",
                    ${PASSWORD}:\"${userObj.password}\",
                    ${SECURITYQ}:\"${userObj.securityQuestion}\",
                    ${SECURITYA}:\"${userObj.securityAnswer}\"
                },
                ${FIRST_NAME}:\"${userObj.firstName}\",
                ${LAST_NAME}:\"${userObj.lastName}\"
            ){
                ${USERNAME} 
                ${USERID}
            }}`;
    return query; //.replace(/\s/g, '');
  },
  updateUser: function (userObj) {
    let feet = parseInt(userObj.heightFt, 10);
    let inch = parseInt(userObj.heightIn, 10);
    let height = feet * 12 + inch;
    let age = userObj.age;
    let weight = userObj.weight;

    if (age === '' || age == undefined) {
      age = 0;
    }
    if (weight === '' || age == undefined) {
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
                    ${SECURITYQ}:\"${userObj.securityQuestion}\",
                    ${SECURITYA}:\"${userObj.securityAnswer}\"
                    ${FIRST_NAME}:\"${userObj.firstName}\",
                    ${LAST_NAME}:\"${userObj.lastName}\",
                    ${GENDER}:\"${userObj.gender}\",
                    ${AGE}:${parseInt(age, 10)},
                    ${HEIGHT}:${height},
                    ${WEIGHT}:${parseInt(weight, 10)},      
                    ${IDP}:${parseFloat(userObj.idp)},
                    ${ACCOUNT_VERIFIED}:${userObj.accountVerified},
                    ${PLAYED_BEFORE}:${userObj.playedBefore},
                    ${REAL_ESTATE_SERVICE}:${userObj.reServices},
                    ${CAN_CONTACT}:${userObj.canContact},
                }
            ){
                ${USERNAME} 
                ${USERID}
            }}`;
    return query; //.replace(/\s/g, '');
  },
  getUserByUserName: function (username) {
    let query = `${QUERY} { ${GET_USER_BY_USERNAME}
            (
                ${USERNAME}:\"${username}\",
            ){
                ${USERNAME} 
                ${USERID}
            }}`;
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
                    ${NUMBER}
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
                ${ACCOUNT_VERIFIED}
                ${PLAYED_BEFORE}
                ${REAL_ESTATE_SERVICE}
                ${CAN_CONTACT}
                ${LIABLE_AGREE}
                ${TC_AGREE}
                ${IS_MINOR}
                ${ACTIVE_TC_LEGAL} {
                  ${LEGAL_DOC_ID}
                  ${P_SIG}
                  ${G_SIG}
                }
                ${ACTIVE_LIAB_LEGAL} {
                  ${LEGAL_DOC_ID}
                  ${P_SIG}
                  ${G_SIG}
                }
            }
        }`;
    return query; //.replace(/\s/g, '');
  },
  getAllStates: function () {
    let query = `${QUERY} { ${GET_ALL_STATES}
            {
                ${NAME} 
                ${STATE_CODE}
                ${STATE_ID}
            }}`;
    return query;
  },
  getLatestDocumentByType: function (docTypeCode) {
    let query = `${QUERY} { ${GET_LATEST_DOCUMENT_BY_TYPE}
            (
               ${TYPE_CODE}:\"${docTypeCode}\",
            ){
                ${DOC_ID} 
                ${TITLE}
                ${CONTENT}
                ${VERSION}
            }}`;
    return query;
  },
  addUserAddress: function (userObj) {
    let unit = userObj.unit;
    let apt = userObj.apt;
    let street = userObj.street;
    let city = userObj.city;
    let state = userObj.state;
    let postalCode = userObj.postalCode;

    if (unit == undefined) {
      unit = '';
    }
    if (apt == undefined) {
      apt = '';
    }
    if (street == undefined) {
      street = '';
    }
    if (city == undefined) {
      city = '';
    }
    if (state == undefined) {
      state = '';
    }
    if (postalCode == undefined) {
      postalCode = '';
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
        }}`;
    return query;
  },
  addUserPhone: function (userObj) {
    let query = `${MUTATION}{${CREATE_PHONE}
            (   
                ${INPUT_PHONE}:{
                    ${USERNAME}:\"${userObj.username}\",
                    ${TYPE_CODE}:\"${userObj.phoneType}\",
                    ${PHONE_COUNTRY_CODE}:${userObj.phoneCountryCode},
                    ${NUMBER}:\"${userObj.phoneNumber}\",
                }
            ){
                    ${PHONEID} 
                    ${USERID} 
        }}`;
    return query;
  },
  addUserComment: function (userObj) {
    let commentContent = userObj.commentContent.replace(/\n/g, NEW_LINE_TOKEN);
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
        }}`;
    return query;
  },
  addUserLegalDoc: function (
    username,
    legalTypeCode,
    docId,
    pSig,
    gSig,
    isMinor,
    agree,
  ) {
    //2020-05-30 02:30:57.311
    let curDate = new Date();
    let expYear = curDate.getFullYear() + 1;
    let activeDate = `${curDate.getFullYear()}-${
      curDate.getMonth() + 1
    }-${curDate.getDate()} ${curDate.getHours()}:${curDate.getMinutes()}:${curDate.getSeconds()}.0`;
    let expireDate = `${expYear}-${
      curDate.getMonth() + 1
    }-${curDate.getDate()} ${curDate.getHours()}:${curDate.getMinutes()}:${curDate.getSeconds()}.0`;
    if (!gSig) {
      gSig = '';
    }
    let query = `${MUTATION}{${ADD_USER_LEGAL_DOC}
            (   
                ${INPUT_LEGAL}:{
                    ${USERNAME}:"${username}",
                    ${TYPE_CODE}:"${legalTypeCode}",
                    ${AGREE}:${agree},
                    ${DOC_ID}:${docId},
                    ${P_SIG}:"${pSig}",
                    ${G_SIG}:"${gSig}",
                    ${IS_MINOR}:${isMinor},
                    ${ACTIVE_DATE}:"${activeDate}",
                    ${EXPIRE_DATE}:"${expireDate}",
                    ${ENABLED}:true
                }
            ){
                    ${LEGAL_DOC_ID}
        }}`;
    return query;
  },
  getSecurityQ: function (username) {
    let query = `${QUERY} { ${GET_USER_BY_USERNAME}
            (
                ${USERNAME}:\"${username}\",
            ){
                ${SECURITYQ} 
                ${USERNAME}
                ${EMAILADDRESS}
            }}`;
    return query; //.replace(/\s/g, '');
  },
  checkSecurityA: function (userObj) {
    return `${MUTATION} { ${RECOVERY_SIGN_IN}
            (
                ${AUTHDATA}:{
                    ${USERNAME}:\"${userObj.username}\",
                    ${SECURITYA}:\"${userObj.securityAnswer}\"
                }
            )
        }`;
  },
  setNewPassword: function (userObj) {
    let query = `${MUTATION} { ${SET_NEW_PASSWORD}
            (
                ${USERNAME}:\"${userObj.username}\",
                ${PASSCODE}:\"${userObj.passcode}\",
                ${PASSWORD}:\"${userObj.password}\"
            )
        }`;
    return query; //.replace(/\s/g, '');
  },
  getAvailableSessions: function (filter) {
    let paramString = '';
    if (filter && (filter.selActivityFilter || filter.selLocationFilter)) {
      paramString += '(';
    }
    if (filter && filter.selActivityFilter) {
      paramString += `${ACTIVITY_ID}:${filter.selActivityFilter}`;
    }
    if (filter && filter.selLocationFilter) {
      if (paramString.length > 1) {
        paramString += ',';
      }
      paramString += `${LOCATION_ID}:${filter.selLocationFilter}`;
    }
    if (filter && (filter.selActivityFilter || filter.selLocationFilter)) {
      paramString += ')';
    }
    let query = `${QUERY} { ${GET_AVAIL_PLAY_SESSIONS}
                ${paramString}
            {
                ${START_DATE}
                ${END_DATE}
                ${LENGTH}
                ${LOCATION}{
                    ${NAME}
                    ${TAX_RATE}
                }
                ${ACTIVITY}{
                    ${NAME}
                    ${COST_PER_MIN}
                    ${SETUP_MINUTES}
                }
            }
        }`;
    return query; //.replace(/\s/g, '');
  },
  getPendingSessions: function (filter) {
    let paramString = '';
    if (
      filter &&
      (filter.selActivityFilter ||
        filter.selLocationFilter ||
        filter.selPayedFilter)
    ) {
      paramString += '(';
    }
    if (filter && filter.selActivityFilter) {
      paramString += `${ACTIVITY_ID}:${filter.selActivityFilter}`;
    }
    if (filter && filter.selLocationFilter) {
      if (paramString.length > 1) {
        paramString += ',';
      }
      paramString += `${LOCATION_ID}:${filter.selLocationFilter}`;
    }
    if (filter && filter.selPayedFilter && filter.selPayedFilter !== '') {
      if (paramString.length > 1) {
        paramString += ',';
      }
      paramString += `${PAYED}:${filter.selPayedFilter === PAYED}`;
    }
    if (
      filter &&
      (filter.selActivityFilter ||
        filter.selLocationFilter ||
        filter.selPayedFilter)
    ) {
      paramString += ')';
    }
    let query = `${QUERY} { ${GET_PENDING_PLAY_SESSIONS}
                ${paramString}
            {
                ${SESSIONID}
                ${START_DATE}
                ${END_DATE}
                ${USERID}
                ${USERNAME}
                ${FIRST_NAME}
                ${LAST_NAME}
                ${ACTIVITY}{
                    ${NAME}
                    ${COST_PER_MIN}
                    ${SETUP_MINUTES}
                    ${ACTIVITY_ID}
                }${LOCATION}{
                    ${NAME}
                    ${PHONE_NUMBER}
                    ${MANAGER}
                    ${LOCATION_ID}
                }
            }
        }`;
    return query; //.replace(/\s/g, '');
  },
  addUserSession: function (userObj, session) {
    let query = `${MUTATION} { ${ADD_USER_SESSION}
            (
                ${INPUT_PLAY_SESSION}: {
                    ${START_DATE}:"${session.startDate}",
                    ${END_DATE}:"${session.endDate}",
                    ${LENGTH}:${session.length},
                    ${LOCATION_NAME}:"${session.location.name}",
                    ${ACTIVITY_NAME}:"${session.activity.name}",
                    ${PAYED}:false,
                    ${USERNAME}:"${userObj.username}",
                }
            )
            {
                ${SESSIONID}
            }
        }`;
    return query; //.replace(/\s/g, '');
  },
};

const dataFetch = function (
  queryString,
  username,
  authToken,
  callBack,
  retries = 0,
) {
  let qs = cmsGraphQLHost;
  let body = JSON.stringify({query: queryString});

  fetch(qs, {
    method: 'POST',
    mode: 'cors',
    body: body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + authToken,
      Username: username,
    },
  })
    .then(response => {
      return response.json();
    })
    .then(results => {
      let data = results.data;
      let errors = results.errors;
      if (callBack) {
        callBack(data, errors);
      } else {
        return results;
      }
    })
    .catch(error => {
      if (retries > 0) {
        dataFetch(queryString, username, authToken, callBack, --retries);
      } else {
        if (callBack) {
          callBack(error);
        } else {
          return error;
        }
      }
    });
};
