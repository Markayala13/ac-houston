"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-4 bg-black relative border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fire-red/5 via-deep-black to-deep-black pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
            >
              Hablemos de tu Proyecto
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-gray-400 text-lg mb-12 font-light max-w-md"
            >
              Solicita una cotización sin compromiso o agenda un servicio de mantenimiento con nuestros expertos hoy mismo.
            </motion.p>

            <div className="space-y-8">
              {[
                { icon: <Phone className="w-6 h-6" />, text: "+1 (555) 123-4567", label: "Llámanos" },
                { icon: <Mail className="w-6 h-6" />, text: "contacto@xmaxac.com", label: "Escríbenos" },
                { icon: <MapPin className="w-6 h-6" />, text: "Houston, Texas", label: "Ubicación" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-6 group"
                >
                  <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center text-ice-blue border border-white/10 group-hover:border-ice-blue/50 group-hover:shadow-[0_0_20px_rgba(0,180,255,0.2)] transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <span className="block text-gray-500 text-sm mb-1">{item.label}</span>
                    <span className="text-white font-bold text-lg">{item.text}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.form 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 lg:p-12 backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-gray-400 text-sm pl-1">Nombre</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ice-blue focus:ring-1 focus:ring-ice-blue transition-all" placeholder="Tu nombre" />
              </div>
              <div className="space-y-2">
                <label className="text-gray-400 text-sm pl-1">Teléfono</label>
                <input type="tel" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ice-blue focus:ring-1 focus:ring-ice-blue transition-all" placeholder="Tu teléfono" />
              </div>
            </div>
            
            <div className="space-y-2 mb-6">
              <label className="text-gray-400 text-sm pl-1">Servicio de Interés</label>
              <select className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ice-blue focus:ring-1 focus:ring-ice-blue transition-all appearance-none">
                <option value="cooling">Cooling (Instalación/Reparación)</option>
                <option value="heating">Heating (Instalación/Reparación)</option>
                <option value="maintenance">Mantenimiento</option>
                <option value="other">Otro</option>
              </select>
            </div>

            <div className="space-y-2 mb-8">
              <label className="text-gray-400 text-sm pl-1">Mensaje</label>
              <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ice-blue focus:ring-1 focus:ring-ice-blue transition-all resize-none" placeholder="¿Cómo podemos ayudarte?"></textarea>
            </div>

            <button type="button" className="w-full bg-gradient-to-r from-ice-blue to-blue-500 hover:from-blue-400 hover:to-blue-600 text-deep-black font-bold text-lg py-4 rounded-lg transition-all glow-blue hover:scale-[1.02]">
              Enviar Mensaje
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
