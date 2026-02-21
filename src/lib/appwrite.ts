import { Client, Databases, Account } from 'appwrite';

export const APPWRITE_CONFIG = {
    endpoint: 'https://sgp.cloud.appwrite.io/v1',
    project: '69912660003e0e220cfe',
    db: '69990b77002ee59b3fbf',
    collectionId: 'chats', // Single collection for everything
    webhookId: '69992e9d638207ec2c72',
    webhookSignature: '2ed0c77f47f150d955f7f5d5e3baf7db8ab4b97ca42bf7d2c9c721ee9124bbb9551bb58b3f16363d7cbcfe4113f7c0be9804ef5908e73fb08cea488915863080'
};

export const client = new Client()
    .setEndpoint(APPWRITE_CONFIG.endpoint)
    .setProject(APPWRITE_CONFIG.project);

export const databases = new Databases(client);
export const account = new Account(client);
