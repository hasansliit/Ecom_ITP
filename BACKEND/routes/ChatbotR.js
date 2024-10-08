import express from "express";
import { Chat } from '../model/ChatBot.js'; 
const router = express.Router();

router.post('/', async (req, res) => {
    const userMessage = req.body.message.toLowerCase();
    
    let botMessage = 'Sorry, I do not understand that. Could you ask something else?';

    // chatbot logic
    if (userMessage.includes('order status')) {
        botMessage = 'Please provide your order ID for the status.';
    } else if (userMessage.includes('shipping')) {
        botMessage = 'Shipping takes 3-5 business days.';
    } else if (userMessage.includes('return policy')) {
        botMessage = 'You can return your order within 30 days of purchase.';
    }

    // Save chat conversation to the database
    const newChat = new Chat({
        userMessage: req.body.message,
        botMessage: botMessage,
    });

    await newChat.save();

    res.json({ botMessage });
});

export default router;
