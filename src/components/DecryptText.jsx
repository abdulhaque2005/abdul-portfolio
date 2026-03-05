import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

const DecryptText = ({ text, speed = 50, className = "" }) => {
    const [displayText, setDisplayText] = useState("");
    const [isScrambling, setIsScrambling] = useState(true);

    useEffect(() => {
        let interval;
        let counter = 0;
        const length = text.length;

        interval = setInterval(() => {
            let scrambled = "";
            for (let i = 0; i < length; i++) {
                if (i < counter) {
                    scrambled += text[i];
                } else {
                    scrambled += characters[Math.floor(Math.random() * characters.length)];
                }
            }

            setDisplayText(scrambled);
            counter += 1 / 3;

            if (counter >= length) {
                clearInterval(interval);
                setDisplayText(text);
                setIsScrambling(false);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return (
        <motion.span
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {displayText}
        </motion.span>
    );
};

export default DecryptText;
