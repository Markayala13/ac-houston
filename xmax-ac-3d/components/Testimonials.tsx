"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Robert M.",
    role: "Dueño de Restaurante",
    text: "El equipo de XMAX instaló nuestro sistema comercial en tiempo récord. El aire es perfecto y el ahorro de energía es real.",
    rating: 5,
  },
  {
    name: "Sarah L.",
    role: "Residente en Houston",
    text: "Súper profesionales. Llegaron a tiempo, arreglaron mi AC en pleno verano y el precio fue justo. Los recomiendo totalmente.",
    rating: 5,
  },
  {
    name: "David H.",
    role: "Administrador de Edificio",
    text: "Mantenimiento impecable. La atención al detalle de XMAX nos da tranquilidad durante todo el año.",
    rating: 5,
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-32 px-4 bg-deep-black relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Lo Que Dicen Nuestros Clientes
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-24 h-1 bg-gradient-to-r from-chrome-dark to-white mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, index) => (
            <motion.div
              key={test.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 relative hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex gap-1 mb-6 text-ice-blue">
                {[...Array(test.rating)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-300 italic mb-8 font-light text-lg">
                "{test.text}"
              </p>
              <div>
                <h4 className="text-white font-bold text-xl">{test.name}</h4>
                <span className="text-gray-500 text-sm">{test.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
