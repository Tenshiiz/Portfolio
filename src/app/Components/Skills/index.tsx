

import { faCode, faPalette, faTools } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

interface SkillItemProps {
    name: string;
    percentage: number;
    color: "cyan" | "purple" | "pink";
}

const SkillItem = ({ name, percentage, color }: SkillItemProps) => {
    const colorStyles = {
        cyan: {
            text: "text-[#00FFFF]",
            gradient: "bg-gradient-to-r from-[#00FFFF] to-[#9333EA]",
            shadow: "shadow-[0_0_5px_rgba(0,255,255,0.5),0_0_20px_rgba(0,255,255,0.3)]"
        },
        purple: {
            text: "text-[#9333EA]",
            gradient: "bg-gradient-to-r from-[#9333EA] to-[#E879F9]",
            shadow: "shadow-[0_0_5px_rgba(147,51,234,0.5),0_0_20px_rgba(147,51,234,0.3)]"
        },
        pink: {
            text: "text-[#E879F9]",
            gradient: "bg-gradient-to-r from-[#E879F9] to-[#9333EA]",
            shadow: "shadow-[0_0_5px_rgba(232,121,249,0.5),0_0_20px_rgba(232,121,249,0.3)]"
        }
    };

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

interface SkillCategoryProps {
    title: string;
    icon: "faCode" | "faPalette" | "faTools";
    color: "cyan" | "purple" | "pink";
    skills: Array<{ name: string; percentage: number }>;
}

const SkillCategory = ({ title, icon, color, skills }: SkillCategoryProps) => {
    const colorStyles = {
        cyan: {
            border: "border-[#00FFFF]/20 hover:border-[#00FFFF]/60",
            bg: "bg-[#00FFFF]/10",
            text: "text-[#00FFFF]",
            shadow: "shadow-[0_0_5px_rgba(0,255,255,0.5),0_0_20px_rgba(0,255,255,0.3)]"
        },
        purple: {
            border: "border-[#9333EA]/20 hover:border-[#9333EA]/60",
            bg: "bg-[#9333EA]/10",
            text: "text-[#9333EA]",
            shadow: "shadow-[0_0_5px_rgba(147,51,234,0.5),0_0_20px_rgba(147,51,234,0.3)]"
        },
        pink: {
            border: "border-[#E879F9]/20 hover:border-[#E879F9]/60",
            bg: "bg-[#E879F9]/10",
            text: "text-[#E879F9]",
            shadow: "shadow-[0_0_5px_rgba(232,121,249,0.5),0_0_20px_rgba(232,121,249,0.3)]"
        }
    };

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
                    {/* @ts-expect-error: FontAwesomeIcon expects a string literal for icon */}
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

const additionalSkills = [
    { name: "JavaScript", color: "cyan" as const },
    { name: "Redux", color: "purple" as const },
    { name: "Jest", color: "pink" as const },
    { name: "GraphQL", color: "cyan" as const },
    { name: "Node.js", color: "purple" as const },
    { name: "Webpack", color: "pink" as const },
    { name: "Framer Motion", color: "cyan" as const },
    { name: "Vercel", color: "purple" as const },
    { name: "RESTful APIs", color: "pink" as const },
];

const colorClasses = {
    cyan: "bg-[#00FFFF]/10 text-[#00FFFF] border-[#00FFFF]/30",
    purple: "bg-[#9333EA]/10 text-[#9333EA] border-[#9333EA]/30",
    pink: "bg-[#E879F9]/10 text-[#E879F9] border-[#E879F9]/30"
};

export default function SkillsSection() {
    const skillCategories = [
        {
            title: "Desenvolvimento FrontEnd",
            icon: faCode,
            color: "cyan" as const,
            skills: [
                { name: "React & Next.js", percentage: 95 },
                { name: "TypeScript", percentage: 90 },
                { name: "HTML5 & CSS3", percentage: 98 }
            ]
        },
        {
            title: "CSS Frameworks",
            icon: faPalette,
            color: "purple" as const,
            skills: [
                { name: "Tailwind CSS", percentage: 96 },
                { name: "Styled Components", percentage: 85 },
                { name: "SASS/SCSS", percentage: 90 }
            ]
        },
        {
            title: "Ferramentas e outros",
            icon: faTools,
            color: "pink" as const,
            skills: [
                { name: "Git & GitHub", percentage: 92 },
                { name: "Figma & Design", percentage: 50 },
                { name: "Performance Optimization", percentage: 88 }
            ]
        }
    ];

    return (
        <section id="skills" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#050816] to-[#030610]"></div>
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold mb-2 font-['Space_Grotesk']">
                        Minhas{" "}
                        <span className="bg-gradient-to-r from-[#00FFFF] to-[#9333EA] bg-clip-text text-transparent ">
                            Habilidades
                        </span>
                    </h2>
                    <div
                        className="w-20 h-1 bg-[#9333EA] mx-auto mb-6 rounded"
                        style={{ boxShadow: "0 0 5px rgba(147, 51, 234, 0.5), 0 0 20px rgba(147, 51, 234, 0.3)" }}
                    ></div>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Im proficient in a wide range of front-end technologies and constantly expanding my skill set to stay ahead in the ever-evolving tech landscape.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category, index) => (
                        
                        <SkillCategory
                            key={index}
                            title={category.title}
                            // @ts-expect-error : mt bugado
                            icon={category.icon}
                            color={category.color}
                            skills={category.skills}
                        />
                    ))}

                    {/* Additional skills in badges */}
                    <motion.div
                        className="lg:col-span-3 mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-xl font-['Space_Grotesk'] mb-4 text-center">Tecnologias Adicionais</h3>
                        <div className="flex flex-wrap justify-center gap-2">
                            {additionalSkills.map((skill, index) => (
                                <motion.span
                                    key={index}
                                    className={`px-3 py-1 ${colorClasses[skill.color]} rounded-full border text-sm`}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.05 * index, duration: 0.3 }}
                                >
                                    {skill.name}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
