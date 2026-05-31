"use client";

import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2000&auto=format&fit=crop"
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-deep-black overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-ice-blue/5 via-deep-black to-deep-black pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-white text-center"
        >
          Galería de Trabajo
        </motion.h2>
      </div>

      <div className="flex gap-4 px-4 pb-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="snap-center shrink-0 w-[80vw] md:w-[40vw] h-[50vh] rounded-2xl overflow-hidden relative group"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
              style={{ backgroundImage: `url(${img})` }}
            />
            <div className="absolute inset-0 bg-deep-black/20 group-hover:bg-transparent transition-colors duration-500" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
