import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import GradientText from "./ui/GradientText";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });
  
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, this would send data to your backend
      console.log("Form data:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const contactInfo = [
    {
      icon: "fa-envelope",
      title: "Email",
      content: "hello@carloseduardo.dev",
      link: "mailto:hello@carloseduardo.dev",
      color: "cyan" as const
    },
    {
      icon: "fa-map-marker-alt",
      title: "Location",
      content: "São Paulo, Brazil",
      link: null,
      color: "purple" as const
    },
    {
      icon: "fa-phone-alt",
      title: "Phone",
      content: "+55 11 99999-9999",
      link: "tel:+5511999999999",
      color: "pink" as const
    }
  ];
  
  const socialLinks = [
    { icon: "fa-github", link: "#", color: "cyan" as const },
    { icon: "fa-linkedin", link: "#", color: "purple" as const },
    { icon: "fa-twitter", link: "#", color: "pink" as const },
    { icon: "fa-dribbble", link: "#", color: "cyan" as const }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };
  
  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030610] to-[#050816]"></div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-2 font-['Space_Grotesk']">
            Get In <GradientText>Touch</GradientText>
          </h2>
          <div 
            className="w-20 h-1 bg-[#E879F9] mx-auto mb-6 rounded"
            style={{ boxShadow: "0 0 5px rgba(232, 121, 249, 0.5), 0 0 20px rgba(232, 121, 249, 0.3)" }}
          ></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? I'd love to hear from you!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="bg-[#171717]/20 p-8 rounded-lg border border-[#00FFFF]/20">
              <motion.h3 
                variants={itemVariants}
                className="text-2xl font-['Space_Grotesk'] mb-6"
              >
                <GradientText>Contact Information</GradientText>
              </motion.h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const bgColor = item.color === "cyan" ? "bg-[#00FFFF]/10" : 
                                  item.color === "purple" ? "bg-[#9333EA]/10" : "bg-[#E879F9]/10";
                  const textColor = item.color === "cyan" ? "text-[#00FFFF]" :
                                   item.color === "purple" ? "text-[#9333EA]" : "text-[#E879F9]";
                  
                  return (
                    <motion.div 
                      key={index} 
                      className="flex items-start"
                      variants={itemVariants}
                    >
                      <div className={`${bgColor} p-3 rounded-full mr-4`}>
                        <i className={`fas ${item.icon} ${textColor}`}></i>
                      </div>
                      <div>
                        <h4 className="text-white font-['Space_Grotesk'] mb-1">{item.title}</h4>
                        {item.link ? (
                          <a 
                            href={item.link} 
                            className={`text-gray-300 hover:${textColor} transition-colors duration-300`}
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-gray-300">{item.content}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              <motion.div 
                className="mt-8"
                variants={itemVariants}
              >
                <h4 className="text-white font-['Space_Grotesk'] mb-3">Follow Me</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((item, index) => {
                    const hoverColor = item.color === "cyan" ? "hover:text-[#00FFFF] hover:border-[#00FFFF]" :
                                       item.color === "purple" ? "hover:text-[#9333EA] hover:border-[#9333EA]" :
                                       "hover:text-[#E879F9] hover:border-[#E879F9]";
                    
                    return (
                      <motion.a 
                        key={index}
                        href={item.link} 
                        className={`bg-[#171717]/30 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 ${hoverColor} border border-transparent transition-all duration-300`}
                        whileHover={{ scale: 1.1, y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <i className={`fab ${item.icon}`}></i>
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-[#171717]/20 p-8 rounded-lg border border-[#9333EA]/20">
              <h3 className="text-2xl font-['Space_Grotesk'] mb-6">
                <GradientText>Send Me a Message</GradientText>
              </h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 font-['Space_Grotesk']">Your Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe"
                            className="bg-[#171717]/40 border-[#00FFFF]/30 rounded-lg p-3 text-white focus:border-[#00FFFF] transition-all duration-300"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 font-['Space_Grotesk']">Your Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="john@example.com"
                            className="bg-[#171717]/40 border-[#9333EA]/30 rounded-lg p-3 text-white focus:border-[#9333EA] transition-all duration-300"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 font-['Space_Grotesk']">Subject</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Project Inquiry"
                            className="bg-[#171717]/40 border-[#E879F9]/30 rounded-lg p-3 text-white focus:border-[#E879F9] transition-all duration-300"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 font-['Space_Grotesk']">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Hello, I'd like to discuss a project idea..."
                            className="bg-[#171717]/40 border-[#00FFFF]/30 rounded-lg p-3 text-white focus:border-[#00FFFF] transition-all duration-300"
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#00FFFF] to-[#9333EA] text-white py-6 rounded-lg font-['Space_Grotesk'] hover:from-[#9333EA] hover:to-[#00FFFF] transition-all duration-500"
                    style={{ boxShadow: "0 0 5px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)" }}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"} <i className="fas fa-paper-plane ml-2"></i>
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
