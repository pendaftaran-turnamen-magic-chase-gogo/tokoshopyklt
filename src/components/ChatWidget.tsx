import React, { useState, useEffect, useRef } from 'react';
import { client, databases, account, APPWRITE_CONFIG } from '../lib/appwrite';
import { ID, Query } from 'appwrite';
import { Send, MessageCircle, User } from 'lucide-react';

interface ChatMessage {
    $id: string;
    message: string;
    sender: string;
    timestamp: number;
}

const ChatWidget: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [userId, setUserId] = useState('anonim');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const initChat = async () => {
            try {
                // Anonymous Login
                try {
                    const session = await account.createAnonymousSession();
                    setUserId(session.userId);
                } catch (e: any) {
                    // If already logged in or other error, try getting current account
                    try {
                        const acc = await account.get();
                        setUserId(acc.$id);
                    } catch (err) {
                        console.log("Session active or error", e);
                    }
                }

                // Load initial messages
                const response = await databases.listDocuments(
                    APPWRITE_CONFIG.db,
                    APPWRITE_CONFIG.collections.chats,
                    [Query.orderAsc('$createdAt'), Query.limit(50)]
                );
                
                const loadedMessages = response.documents.map((doc: any) => ({
                    $id: doc.$id,
                    message: doc.message,
                    sender: doc.sender,
                    timestamp: new Date(doc.$createdAt).getTime()
                }));
                setMessages(loadedMessages);
                scrollToBottom();

                // Subscribe to realtime updates
                const unsubscribe = client.subscribe(
                    `databases.${APPWRITE_CONFIG.db}.collections.${APPWRITE_CONFIG.collections.chats}.documents`,
                    (response: any) => {
                        if (response.events.includes("databases.*.collections.*.documents.*.create")) {
                            const newMsg = {
                                $id: response.payload.$id,
                                message: response.payload.message,
                                sender: response.payload.sender,
                                timestamp: new Date(response.payload.$createdAt).getTime()
                            };
                            setMessages(prev => [...prev, newMsg]);
                            scrollToBottom();
                        }
                    }
                );

                return () => {
                    unsubscribe();
                };
            } catch (err) {
                console.error("Chat Init Error:", err);
            }
        };

        initChat();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        try {
            await databases.createDocument(
                APPWRITE_CONFIG.db,
                APPWRITE_CONFIG.collections.chats,
                ID.unique(),
                {
                    message: input,
                    sender: userId
                }
            );
            setInput('');
        } catch (err: any) {
            alert("Gagal kirim pesan: " + err.message);
        }
    };

    return (
        <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 flex flex-col h-[300px]">
            <div className="bg-rose-600 p-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <MessageCircle size={16} /> Live Chat Penjual
                </div>
                <div className="text-[10px] text-rose-100 bg-rose-700 px-2 py-0.5 rounded-full">Online</div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-800 custom-scrollbar">
                {messages.length === 0 && (
                    <div className="text-center text-slate-500 text-xs py-4">Belum ada pesan. Mulai percakapan!</div>
                )}
                {messages.map((msg) => (
                    <div key={msg.$id} className={`flex ${msg.sender === userId ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-xl p-2.5 text-xs leading-relaxed ${
                            msg.sender === userId 
                                ? 'bg-rose-600 text-white rounded-tr-none' 
                                : 'bg-slate-700 text-slate-200 rounded-tl-none'
                        }`}>
                            {msg.message}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-2 bg-slate-900 border-t border-slate-700 flex gap-2">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Tulis pesan..." 
                    className="flex-1 bg-slate-800 text-white text-xs rounded-xl px-3 py-2 outline-none focus:ring-1 focus:ring-rose-500 border border-transparent"
                />
                <button type="submit" className="bg-rose-600 text-white p-2 rounded-xl hover:bg-rose-500 transition-colors">
                    <Send size={16} />
                </button>
            </form>
        </div>
    );
};

export default ChatWidget;
