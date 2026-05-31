"use client";

import { motion } from "framer-motion";
import Hero3DScene from "./Hero3DScene";

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* 3D Background */}
      <Hero3DScene />

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pointer-events-none mt-20">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 drop-shadow-2xl"
        >
          El Aire Perfecto para tu Hogar en <span className="text-ice-blue text-glow-blue">Houston</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light"
        >
          HEATING • COOLING • MAINTENANCE
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto"
        >
          <a href="#services" className="px-8 py-4 bg-ice-blue text-deep-black rounded-full font-bold text-lg transition-transform hover:scale-105 glow-blue hover:bg-blue-400">
            Ver Servicios
          </a>
          <a href="#contact" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg transition-all hover:border-fire-red hover:text-fire-red hover:bg-fire-red/10">
            Contáctanos Ahora
          </a>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs uppercase tracking-widest text-gray-400">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-1 h-8 rounded-full bg-gradient-to-b from-ice-blue to-transparent"
        />
      </motion.div>
    </section>
  );
}
