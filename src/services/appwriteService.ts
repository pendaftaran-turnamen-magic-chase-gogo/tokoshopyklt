import { databases, APPWRITE_CONFIG } from '../lib/appwrite';
import { ID, Query } from 'appwrite';
import { StoreSettings, StoreContent, Testimonial, FaqItem, InfoSection } from '../types';

const { db, collections } = APPWRITE_CONFIG;

// --- SETTINGS ---
export const fetchSettings = async (): Promise<StoreSettings | null> => {
    try {
        const res = await databases.listDocuments(db, collections.storeSettings, [Query.limit(1)]);
        if (res.documents.length > 0) {
            const doc = res.documents[0];
            return {
                storeName: doc.storeName,
                whatsapp: doc.whatsapp,
                qrisImageUrl: doc.qrisImageUrl,
                qrisTimerMinutes: doc.qrisTimerMinutes,
                feeType: doc.feeType,
                feeValue: doc.feeValue
            };
        }
        return null;
    } catch (error) {
        console.error("Fetch Settings Error:", error);
        return null;
    }
};

export const saveSettingsToAppwrite = async (settings: StoreSettings) => {
    try {
        const res = await databases.listDocuments(db, collections.storeSettings, [Query.limit(1)]);
        if (res.documents.length > 0) {
            await databases.updateDocument(db, collections.storeSettings, res.documents[0].$id, settings);
        } else {
            await databases.createDocument(db, collections.storeSettings, ID.unique(), settings);
        }
    } catch (error) {
        console.error("Save Settings Error:", error);
    }
};

// --- TESTIMONIALS ---
export const fetchTestimonials = async (): Promise<Testimonial[]> => {
    try {
        const res = await databases.listDocuments(db, collections.testimonials);
        return res.documents.map(doc => ({
            id: doc.$id,
            name: doc.name,
            text: doc.text,
            rating: doc.rating,
            role: doc.role,
            img: doc.img
        }));
    } catch (error) {
        console.error("Fetch Testimonials Error:", error);
        return [];
    }
};

export const saveTestimonialToAppwrite = async (testi: Testimonial) => {
    try {
        await databases.createDocument(db, collections.testimonials, ID.unique(), {
            name: testi.name,
            text: testi.text,
            rating: testi.rating,
            role: testi.role,
            img: testi.img
        });
    } catch (error) {
        console.error("Save Testimonial Error:", error);
    }
};

// --- FAQS ---
export const fetchFaqs = async (): Promise<FaqItem[]> => {
    try {
        const res = await databases.listDocuments(db, collections.faqs);
        return res.documents.map(doc => ({
            id: doc.$id,
            question: doc.question,
            answer: doc.answer
        }));
    } catch (error) {
        console.error("Fetch FAQs Error:", error);
        return [];
    }
};

export const saveFaqToAppwrite = async (faq: FaqItem) => {
    try {
        await databases.createDocument(db, collections.faqs, ID.unique(), {
            question: faq.question,
            answer: faq.answer
        });
    } catch (error) {
        console.error("Save FAQ Error:", error);
    }
};

// --- STORE INFO ---
export const fetchStoreInfo = async (): Promise<InfoSection[]> => {
    try {
        const res = await databases.listDocuments(db, collections.storeInfo);
        return res.documents.map(doc => ({
            id: doc.$id,
            title: doc.title,
            content: doc.content,
            icon: doc.icon,
            isActive: doc.isActive
        }));
    } catch (error) {
        console.error("Fetch Store Info Error:", error);
        return [];
    }
};

export const saveStoreInfoToAppwrite = async (info: InfoSection) => {
    try {
        await databases.createDocument(db, collections.storeInfo, ID.unique(), {
            title: info.title,
            content: info.content,
            icon: info.icon,
            isActive: info.isActive
        });
    } catch (error) {
        console.error("Save Store Info Error:", error);
    }
};

// --- CLEAR ALL ---
export const clearAppwriteCollection = async (collectionId: string) => {
    try {
        let hasMore = true;
        while (hasMore) {
            const res = await databases.listDocuments(db, collectionId, [Query.limit(100)]);
            if (res.documents.length === 0) {
                hasMore = false;
                break;
            }
            await Promise.all(res.documents.map(doc => databases.deleteDocument(db, collectionId, doc.$id)));
        }
    } catch (error) {
        console.error(`Clear Collection ${collectionId} Error:`, error);
    }
};
