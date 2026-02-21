import { Client, Databases, Account } from 'appwrite';

export const APPWRITE_CONFIG = {
    endpoint: 'https://sgp.cloud.appwrite.io/v1',
    project: '69912660003e0e220cfe',
    db: '69990b77002ee59b3fbf',
    collectionId: 'chats' // Single collection for everything
};

export const client = new Client()
    .setEndpoint(APPWRITE_CONFIG.endpoint)
    .setProject(APPWRITE_CONFIG.project);

export const databases = new Databases(client);
export const account = new Account(client);
