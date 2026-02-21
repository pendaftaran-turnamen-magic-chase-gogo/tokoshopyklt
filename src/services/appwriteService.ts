import { databases, APPWRITE_CONFIG } from '../lib/appwrite';
import { ID, Query } from 'appwrite';
import { StoreSettings, StoreContent, Testimonial, FaqItem, InfoSection } from '../types';

const { db, collectionId } = APPWRITE_CONFIG;

// --- SETTINGS ---
export const fetchSettings = async (): Promise<StoreSettings | null> => {
    try {
        const res = await databases.listDocuments(db, collectionId, [
            Query.equal('type', 'setting'),
            Query.limit(1)
        ]);
        if (res.documents.length > 0) {
            const doc = res.documents[0];
            // Parse JSON content if stored as string or map direct fields
            // Assuming we store fields directly as columns for simplicity as requested
            return {
                storeName: doc.name || 'TOKOTOPARYA', // reusing 'name' col for storeName
                whatsapp: doc.whatsapp,
                qrisImageUrl: doc.image, // reusing 'image' col
                qrisTimerMinutes: doc.total || 10, // reusing 'total' col for timer (int)
                feeType: doc.status || 'fixed', // reusing 'status' col for feeType
                feeValue: doc.rating || 0 // reusing 'rating' col for feeValue (float/int)
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
        const res = await databases.listDocuments(db, collectionId, [Query.equal('type', 'setting'), Query.limit(1)]);
        const data = {
            type: 'setting',
            name: settings.storeName,
            whatsapp: settings.whatsapp,
            image: settings.qrisImageUrl,
            total: settings.qrisTimerMinutes,
            status: settings.feeType,
            rating: settings.feeValue
        };

        if (res.documents.length > 0) {
            await databases.updateDocument(db, collectionId, res.documents[0].$id, data);
        } else {
            await databases.createDocument(db, collectionId, ID.unique(), data);
        }
    } catch (error) {
        console.error("Save Settings Error:", error);
    }
};

// --- TESTIMONIALS ---
export const fetchTestimonials = async (): Promise<Testimonial[]> => {
    try {
        const res = await databases.listDocuments(db, collectionId, [Query.equal('type', 'review')]);
        return res.documents.map(doc => ({
            id: doc.$id,
            name: doc.name,
            text: doc.message, // reusing message
            rating: doc.rating,
            role: doc.title, // reusing title for role
            img: doc.image
        }));
    } catch (error) {
        console.error("Fetch Testimonials Error:", error);
        return [];
    }
};

export const saveTestimonialToAppwrite = async (testi: Testimonial) => {
    try {
        await databases.createDocument(db, collectionId, ID.unique(), {
            type: 'review',
            name: testi.name,
            message: testi.text,
            rating: testi.rating,
            title: testi.role,
            image: testi.img
        });
    } catch (error) {
        console.error("Save Testimonial Error:", error);
    }
};

// --- FAQS ---
export const fetchFaqs = async (): Promise<FaqItem[]> => {
    try {
        const res = await databases.listDocuments(db, collectionId, [Query.equal('type', 'faq')]);
        return res.documents.map(doc => ({
            id: doc.$id,
            question: doc.title, // reusing title
            answer: doc.message // reusing message
        }));
    } catch (error) {
        console.error("Fetch FAQs Error:", error);
        return [];
    }
};

export const saveFaqToAppwrite = async (faq: FaqItem) => {
    try {
        await databases.createDocument(db, collectionId, ID.unique(), {
            type: 'faq',
            title: faq.question,
            message: faq.answer
        });
    } catch (error) {
        console.error("Save FAQ Error:", error);
    }
};

// --- STORE INFO ---
export const fetchStoreInfo = async (): Promise<InfoSection[]> => {
    try {
        const res = await databases.listDocuments(db, collectionId, [Query.equal('type', 'info')]);
        return res.documents.map(doc => ({
            id: doc.$id,
            title: doc.title,
            content: doc.message, // reusing message
            icon: doc.image, // reusing image for icon name
            isActive: doc.active
        }));
    } catch (error) {
        console.error("Fetch Store Info Error:", error);
        return [];
    }
};

export const saveStoreInfoToAppwrite = async (info: InfoSection) => {
    try {
        await databases.createDocument(db, collectionId, ID.unique(), {
            type: 'info',
            title: info.title,
            message: info.content,
            image: info.icon,
            active: info.isActive
        });
    } catch (error) {
        console.error("Save Store Info Error:", error);
    }
};

// --- CLEAR ORDERS ONLY ---
export const clearAppwriteOrders = async () => {
    try {
        let hasMore = true;
        while (hasMore) {
            // Only list documents where type is 'order'
            const res = await databases.listDocuments(db, collectionId, [
                Query.equal('type', 'order'),
                Query.limit(100)
            ]);
            
            if (res.documents.length === 0) {
                hasMore = false;
                break;
            }
            
            // Delete them one by one
            await Promise.all(res.documents.map(doc => databases.deleteDocument(db, collectionId, doc.$id)));
        }
    } catch (error) {
        console.error("Clear Orders Error:", error);
        throw error;
    }
};
