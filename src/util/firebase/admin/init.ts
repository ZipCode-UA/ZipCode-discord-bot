import { initializeApp, credential, ServiceAccount } from "firebase-admin";

function fbAdminCert() {
    return {
        "type": process.env.FB_A_TYPE || "NULL",
        "project_id": process.env.FB_A_PROJECT_ID || "NULL",
        "private_key_id": process.env.FB_A_PRIVATE_KEY_ID || "NULL",
        "private_key": process.env.FB_A_PRIVATE_KEY || "NULL",
        "client_email": process.env.FB_A_CLIENT_EMAIL || "NULL",
        "client_id": process.env.FB_A_CLIENT_ID || "NULL",
        "auth_uri": process.env.FB_A_AUTH_URI || "NULL",
        "token_uri": process.env.FB_A_TOKEN_URI || "NULL",
        "auth_provider_x509_cert_url": process.env.FB_A_AUTH_PROVIDER_X509_CERT_URL || "NULL",
        "client_x509_cert_url": process.env.FB_A_CLIENT_X509_CERT_URL || "NULL",
        "universe_domain": process.env.FB_A_UNIVERSE_DOMAIN || "NULL",
    } as ServiceAccount;
}

export const fbAdminApp = initializeApp({
    credential: credential.cert(fbAdminCert())
});