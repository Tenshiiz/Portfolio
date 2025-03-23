import React from 'react';
import { motion } from 'framer-motion';

const colorStyles = {
    cyan: {
        text: 'text-[#00FFFF]',
        gradient: 'bg-gradient-to-r from-[#00FFFF] to-[#9333EA]',
        shadow: 'shadow-[0_0_5px_rgba(0,255,255,0.5),0_0_20px_rgba(0,255,255,0.3)]',
        border: 'border-[#00FFFF]/20 hover:border-[#00FFFF]/60',
        bg: 'bg-[#00FFFF]/10',
        badge: 'bg-[#00FFFF]/10 text-[#00FFFF] border-[#00FFFF]/30',
        hover: 'group-hover:text-[#00FFFF]'
    },
    purple: {
        text: 'text-[#9333EA]',
        gradient: 'bg-gradient-to-r from-[#9333EA] to-[#E879F9]',
        shadow: 'shadow-[0_0_5px_rgba(147,51,234,0.5),0_0_20px_rgba(147,51,234,0.3)]',
        border: 'border-[#9333EA]/20 hover:border-[#9333EA]/60',
        bg: 'bg-[#9333EA]/10',
        badge: 'bg-[#9333EA]/10 text-[#9333EA] border-[#9333EA]/30',
        hover: 'group-hover:text-[#9333EA]'
    },
    pink: {
        text: 'text-[#E879F9]',
        gradient: 'bg-gradient-to-r from-[#E879F9] to-[#9333EA]',
        shadow: 'shadow-[0_0_5px_rgba(232,121,249,0.5),0_0_20px_rgba(232,121,249,0.3)]',
        border: 'border-[#E879F9]/20 hover:border-[#E879F9]/60',
        bg: 'bg-[#E879F9]/10',
        badge: 'bg-[#E879F9]/10 text-[#E879F9] border-[#E879F9]/30',
        hover: 'group-hover:text-[#E879F9]'
    }
};

interface SkillItemProps {
    name: string;
    percentage: number;
    color: "cyan" | "purple" | "pink";
}

const SkillItem = ({ name, percentage, color }: SkillItemProps) => {
    return (
        <div className="skill-item">
            <div className="flex justify-between mb-1">
                <span className="text-gray-300">{name}</span>
                <span className={colorStyles[color].text}>{percentage}%</span>
            </div>
            <motion.div
                className="w-full bg-[#030610] rounded-full h-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <motion.div
                    className={`${colorStyles[color].gradient} h-2 rounded-full ${colorStyles[color].shadow}`}
                    style={{ width: `${percentage}%` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                />
            </motion.div>
        </div>
    );
};

export default SkillItem;