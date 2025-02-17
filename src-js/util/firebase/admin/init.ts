import * as admin from "firebase-admin";

/*

    Import explaination here: https://github.com/firebase/firebase-admin-node/issues/593
        - Essentially, have to use the default import for the first use

    Other commented code is potential solutions in different environments to resolve the
    parsing of multi-line environment variables.
        - Solutions sourse: https://stackoverflow.com/a/70281142/20305199

    
    This file is cursed. Please don't touch or you'll get bad juju.

*/

function fbAdminCert() {
    // const { privateKey } = JSON.parse(process.env.FB_A_PRIVATE_KEY || "NULL");
    return {
        "type": process.env.FB_A_TYPE || "NULL",
        "project_id": process.env.FB_A_PROJECT_ID || "NULL",
        "private_key_id": process.env.FB_A_PRIVATE_KEY_ID || "NULL",
        "private_key": process.env.FB_A_PRIVATE_KEY || "NULL",
        /*privateKey,*/
        "client_email": process.env.FB_A_CLIENT_EMAIL || "NULL",
        "client_id": process.env.FB_A_CLIENT_ID || "NULL",
        "auth_uri": process.env.FB_A_AUTH_URI || "NULL",
        "token_uri": process.env.FB_A_TOKEN_URI || "NULL",
        "auth_provider_x509_cert_url": process.env.FB_A_AUTH_PROVIDER_X509_CERT_URL || "NULL",
        "client_x509_cert_url": process.env.FB_A_CLIENT_X509_CERT_URL || "NULL",
        "universe_domain": process.env.FB_A_UNIVERSE_DOMAIN || "NULL",
    } as admin.ServiceAccount;
}
//console.log(fbAdminCert());
export const fbAdminApp = admin.initializeApp({
    credential: admin.credential.cert(fbAdminCert()),
});