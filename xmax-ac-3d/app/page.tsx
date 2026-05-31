"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float, Environment, ContactShadows, PresentationControls } from '@react-three/drei';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ThermometerSun, ThermometerSnowflake, Wrench, ShieldCheck, MapPin, Phone, Mail, Clock, Star, Quote, Menu, X, ArrowRight } from 'lucide-react';
import * as THREE from 'three';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- 3D Components (React Three Fiber) ---

function ACImageModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Use the generated dark theme AC image as a texture mapped to a 3D plane
  const texture = useLoader(THREE.TextureLoader, '/ac-dark.png');

  useFrame((state) => {
    if (meshRef.current) {
      // Girando lentamente (slow rotation)
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <planeGeometry args={[7.5, 5]} />
        <meshBasicMaterial 
          map={texture} 
          transparent={true} 
          side={THREE.DoubleSide} 
          toneMapped={false}
        />
      </mesh>
    </Float>
  );
}

function TemperatureParticles() {
  const group = useRef<THREE.Group>(null);
  const count = 100;
  
  // Generate a soft glowing texture for the particles
  const particleTexture = React.useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64; canvas.height = 64;
    const context = canvas.getContext('2d');
    if (context) {
      const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
      gradient.addColorStop(0.5, 'rgba(255,255,255,0.2)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 64, 64);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  const particles = React.useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const isCold = i % 2 === 0;
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 8 - 2,
        ],
        color: isCold ? "#00B4FF" : "#FF3C00",
        speed: Math.random() * 0.01 + 0.005,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.02;
      group.current.children.forEach((child, i) => {
        const p = particles[i];
        child.position.y += p.speed;
        if (child.position.y > 8) child.position.y = -8;
      });
    }
  });

  return (
    <group ref={group}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position as any}>
          <planeGeometry args={[0.3, 0.3]} />
          <meshBasicMaterial 
            color={p.color} 
            map={particleTexture}
            transparent 
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            opacity={0.8} 
          />
        </mesh>
      ))}
    </group>
  );
}

// --- UI Components ---

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="h-10 w-10 bg-black rounded-xl shadow-md border border-gray-800 flex items-center justify-center overflow-hidden">
              <img src="/logo.jpeg" alt="XMAX" className="w-full h-full object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-white">
              XMAX <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4FF] to-[#FF3C00]">AC</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {['Servicios', 'Proyectos', 'Galería', 'Testimonials', 'Contacto'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-sm font-semibold text-gray-300 hover:text-white relative group transition-colors"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00B4FF] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <button className="relative overflow-hidden bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm shadow-[0_0_20px_rgba(0,180,255,0.2)] hover:shadow-[0_0_30px_rgba(255,60,0,0.3)] transition-all hover:-translate-y-0.5 group">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Cotiza Ahora</span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#00B4FF] to-[#FF3C00] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
          </div>

          <button className="md:hidden p-2 text-gray-300" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    // GSAP Parallax for text elements
    const ctx = gsap.context(() => {
      gsap.to('.hero-text-content', {
        y: -150,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100svh] bg-[#0A0A0A] overflow-hidden" id="inicio">
      
      {/* Subtle background glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-[#00B4FF] rounded-full mix-blend-screen filter blur-[150px] opacity-10"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-[50vw] h-[50vw] bg-[#FF3C00] rounded-full mix-blend-screen filter blur-[150px] opacity-10"></div>
      </div>

      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto cursor-move">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
          <PresentationControls 
            global 
            rotation={[0, 0, 0]} 
            polar={[-0.1, 0.1]} 
            azimuth={[-0.2, 0.2]} 
            config={{ mass: 1, tension: 170, friction: 26 }}
          >
             <ACImageModel />
             <TemperatureParticles />
          </PresentationControls>
        </Canvas>
      </div>

      {/* Foreground UI */}
      <div className="relative z-10 h-full flex flex-col justify-center items-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
        <div className="hero-text-content max-w-3xl mt-20">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6 pointer-events-auto"
          >
            <span className="w-2 h-2 rounded-full bg-[#00B4FF] shadow-[0_0_10px_#00B4FF] animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-gray-300">
              Heating • Cooling • Maintenance
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold text-white leading-[1.05] tracking-tight mb-6 drop-shadow-2xl"
          >
            El Aire Perfecto para tu Hogar en <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4FF] to-[#FF3C00]">Houston</span>.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl font-medium leading-relaxed drop-shadow-md"
          >
            Experimenta el confort absoluto con tecnología premium. Instalación, reparación y mantenimiento con calidad garantizada.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 pointer-events-auto"
          >
            <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-sm md:text-base hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:-translate-y-1 flex items-center justify-center gap-2 group">
              Ver Servicios
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="glass text-white px-8 py-4 rounded-full font-bold text-sm md:text-base hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              Contáctanos Ahora
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current, 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const services = [
    { title: "Enfriamiento Residencial", icon: <ThermometerSnowflake size={28} className="text-[#00B4FF]" />, desc: "Instalación y reparación de sistemas de AC centrales para combatir el calor extremo de Texas con máxima eficiencia.", colSpan: "md:col-span-2" },
    { title: "Calefacción", icon: <ThermometerSun size={28} className="text-[#FF3C00]" />, desc: "Sistemas de heating confiables y bombas de calor para inviernos seguros.", colSpan: "md:col-span-1" },
    { title: "Instalación Minisplit", icon: <ShieldCheck size={28} className="text-gray-300" />, desc: "Tecnología ductless ultra silenciosa. Zonificación perfecta para habitaciones sin romper paredes.", colSpan: "md:col-span-1" },
    { title: "Mantenimiento Preventivo", icon: <Wrench size={28} className="text-[#C0C0C0]" />, desc: "Planes anuales que extienden la vida útil de tus equipos, reducen tu recibo de luz y previenen fallas costosas.", colSpan: "md:col-span-2" }
  ];

  return (
    <section ref={sectionRef} className="py-32 bg-[#0A0A0A] relative" id="servicios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-sm font-extrabold tracking-widest text-[#C0C0C0] uppercase mb-4">Nuestra Especialidad</h2>
          <h3 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight max-w-3xl">
            Soluciones climáticas de <span className="text-gradient">última generación.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((srv, i) => (
            <div 
              key={i}
              ref={el => cardsRef.current[i] = el}
              className={`glass-card p-8 rounded-3xl flex flex-col justify-between group ${srv.colSpan}`}
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#111] shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  {srv.icon}
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">{srv.title}</h4>
                <p className="text-gray-400 font-medium leading-relaxed">{srv.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsAndGallery() {
  return (
    <section className="py-32 bg-[#0A0A0A]" id="proyectos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-sm font-extrabold tracking-widest text-[#00B4FF] uppercase mb-4">Casos Reales & Galería</h2>
          <h3 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            Calidad que se siente.
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="group relative rounded-[2rem] overflow-hidden bg-[#111] h-[400px] border border-white/5">
            <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-bold text-xl">
              [Proyecto Residencial - Imagen Placeholder]
            </div>
          </div>
          <div className="group relative rounded-[2rem] overflow-hidden bg-[#111] h-[400px] border border-white/5">
            <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-bold text-xl">
              [Proyecto Comercial - Imagen Placeholder]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-32 bg-[#0A0A0A] relative overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-sm font-extrabold tracking-widest text-[#FF3C00] uppercase mb-4">Testimonials</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Confianza construida con resultados.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Michael T.", role: "Homeowner, Sugar Land", text: "Profesionalismo puro. Mi AC falló un domingo a 100 grados; llamé a XMAX y en menos de dos horas ya estaban reparando el compresor." },
            { name: "Sarah J.", role: "Business Owner, The Woodlands", text: "Instalaron todo el sistema comercial para mi nueva clínica. El trabajo fue impecable, limpio y cumplieron exactamente con el presupuesto." },
            { name: "David R.", role: "Homeowner, Cypress", text: "Llevo 3 años con su plan de mantenimiento anual. Mis equipos corren como nuevos y mi recibo de luz bajó notablemente." }
          ].map((t, i) => (
            <div key={i} className="glass-card p-10 rounded-[2rem] relative">
              <Quote size={48} className="text-white/10 absolute top-8 right-8" />
              <div className="flex gap-1 text-[#FF3C00] mb-8">
                {[...Array(5)].map((_, j) => <Star key={j} size={18} fill="currentColor" />)}
              </div>
              <p className="text-gray-300 font-medium leading-relaxed mb-8 relative z-10">"{t.text}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-[#222] border border-white/10 flex items-center justify-center font-bold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="py-32 bg-[#0A0A0A]" id="contacto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111] rounded-[3rem] overflow-hidden relative shadow-2xl border border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
            <div className="p-12 md:p-20 text-white flex flex-col justify-between h-full">
              <div>
                <h2 className="text-sm font-extrabold tracking-widest text-[#C0C0C0] uppercase mb-4">Soporte Técnico 24/7</h2>
                <h3 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">¿Necesitas ayuda inmediata?</h3>
                <p className="text-gray-400 text-lg font-medium max-w-md mb-12">Estamos listos para diagnosticar y resolver tu problema de climatización en cualquier área de Houston.</p>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                      <Phone className="text-[#00B4FF]" size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Línea Directa</div>
                      <div className="font-extrabold text-2xl text-white">+1 (713) 555-0199</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                      <Mail className="text-[#FF3C00]" size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Email</div>
                      <div className="font-bold text-xl text-gray-300">contacto@xmaxac.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] p-12 md:p-20 lg:rounded-l-[3rem] border-l border-white/5">
              <h4 className="text-3xl font-extrabold text-white mb-8">Agenda una Cita</h4>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Nombre</label>
                    <input type="text" className="w-full bg-[#111] border border-white/10 text-white px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B4FF]" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Teléfono</label>
                    <input type="tel" className="w-full bg-[#111] border border-white/10 text-white px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B4FF]" placeholder="(713) 000-0000" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-[#00B4FF] to-[#FF3C00] text-white font-extrabold text-lg py-5 rounded-xl hover:shadow-[0_0_30px_rgba(255,60,0,0.3)] transition-all">
                  Enviar Solicitud
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <div className="bg-[#0A0A0A]">
      <Navbar />
      <Hero />
      <Services />
      <ProjectsAndGallery />
      <Testimonials />
      <Contact />
    </div>
  );
}
