import React from 'react';
import { ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-[600px] md:h-[700px] flex items-center bg-gray-50 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=2000&auto=format&fit=crop" 
          alt="Doutora atendendo paciente em clínica especializada" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 to-brand-green/40"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <span className="inline-block bg-brand-light/20 backdrop-blur-md px-4 py-1 rounded-full text-sm font-medium tracking-wide mb-6 border border-white/20">
            Excelência em Medicina
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-6xl mb-6 leading-tight">
            Sua saúde, nossa <span className="text-green-300">prioridade</span>.
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8 font-light leading-relaxed">
            Viva Pro Vida plenamente com cuidado humanizado e tecnologia de ponta. 
            Nossa equipe está pronta para cuidar de você e da sua família.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#contact" 
              className="bg-brand-green hover:bg-white hover:text-brand-green text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Agendar Consulta
              <ChevronRight size={18} />
            </a>
            <a 
              href="#services" 
              className="bg-transparent border border-white text-white hover:bg-white hover:text-brand-dark px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center"
            >
              Conhecer Serviços
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;