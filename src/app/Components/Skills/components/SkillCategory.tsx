import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { motion } from 'framer-motion';
import SkillItem from './SkillItem';

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

interface SkillCategoryProps {
    title: string;
    icon: IconDefinition;
    color: "cyan" | "purple" | "pink";
    skills: Array<{ name: string; percentage: number }>;
}

const SkillCategory = ({ title, icon, color, skills }: SkillCategoryProps) => {
    return (
        <motion.div
            className={`bg-[#171717]/30 rounded-lg p-6 border ${colorStyles[color].border} transition-all duration-300 group`}
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center mb-4">
                <div
                    className={`w-12 h-12 rounded-full ${colorStyles[color].bg} flex items-center justify-center ${colorStyles[color].text} mr-4 group-hover:${colorStyles[color].shadow} transition-all duration-300`}
                >
                    <FontAwesomeIcon icon={icon} />
                </div>
                <h3 className="text-xl font-['Space_Grotesk']">{title}</h3>
            </div>
            <div className="space-y-3">
                {skills.map((skill, index) => (
                    <SkillItem
                        key={index}
                        name={skill.name}
                        percentage={skill.percentage}
                        color={color}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default SkillCategory;