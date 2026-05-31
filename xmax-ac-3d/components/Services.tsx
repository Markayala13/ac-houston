"use client";

import { motion } from "framer-motion";
import { Snowflake, Flame, Wrench } from "lucide-react";

const services = [
  {
    title: "Cooling",
    description: "Instalación y reparación de sistemas de enfriamiento para vencer el calor de Houston con eficiencia máxima.",
    icon: <Snowflake className="w-10 h-10 text-ice-blue" />,
    glowClass: "group-hover:shadow-[0_0_30px_rgba(0,180,255,0.2)] border-white/5 group-hover:border-ice-blue/30"
  },
  {
    title: "Heating",
    description: "Sistemas de calefacción confiables y potentes para mantener tu hogar cálido durante los inviernos de Texas.",
    icon: <Flame className="w-10 h-10 text-fire-red" />,
    glowClass: "group-hover:shadow-[0_0_30px_rgba(255,60,0,0.2)] border-white/5 group-hover:border-fire-red/30"
  },
  {
    title: "Maintenance",
    description: "Planes de mantenimiento preventivo para prolongar la vida útil de tus equipos y reducir costos de energía.",
    icon: <Wrench className="w-10 h-10 text-chrome-dark" />,
    glowClass: "group-hover:shadow-[0_0_30px_rgba(229,229,229,0.2)] border-white/5 group-hover:border-white/30"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-32 px-4 relative z-10 bg-deep-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Nuestros Servicios
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-24 h-1 bg-gradient-to-r from-ice-blue to-fire-red mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`group bg-white/[0.02] backdrop-blur-sm border rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 ${service.glowClass}`}
            >
              <div className="bg-white/[0.05] w-20 h-20 rounded-full flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
