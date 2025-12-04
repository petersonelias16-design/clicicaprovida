import React from 'react';
import { Stethoscope, Activity, Heart, UserCheck, ShieldCheck, Microscope } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    title: "Consultas Médicas",
    description: "Atendimento com especialistas em diversas áreas, focado na escuta ativa e diagnóstico preciso.",
    icon: <UserCheck size={32} />
  },
  {
    title: "Exames Especializados",
    description: "Tecnologia diagnóstica avançada para resultados rápidos e confiáveis.",
    icon: <Microscope size={32} />
  },
  {
    title: "Cardiologia",
    description: "Cuidado completo para o seu coração com check-ups e monitoramento contínuo.",
    icon: <Heart size={32} />
  },
  {
    title: "Acompanhamento Contínuo",
    description: "Programas de saúde preventiva para garantir sua qualidade de vida a longo prazo.",
    icon: <Activity size={32} />
  }
];

const Features: React.FC = () => {
  return (
    <>
      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-brand-green font-bold tracking-wider uppercase text-sm">Nossos Serviços</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Cuidado Completo para Você
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group p-8 border border-gray-100 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                <div className="w-14 h-14 bg-brand-light text-brand-green rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-green group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="font-heading font-bold text-xl mb-3 text-gray-800">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-green/10 rounded-full z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop" 
                alt="Médico conversando e atendendo paciente" 
                className="rounded-2xl shadow-2xl relative z-10 w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg z-20 max-w-xs hidden md:block">
                <div className="flex items-center gap-4 mb-2">
                  <ShieldCheck className="text-brand-green" size={32} />
                  <span className="font-bold text-gray-800 text-lg">Excelência Comprovada</span>
                </div>
                <p className="text-xs text-gray-500">Milhares de pacientes satisfeitos com nosso atendimento humanizado.</p>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <span className="text-brand-green font-bold tracking-wider uppercase text-sm">Sobre Nós</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                Cuidado humanizado e tecnologia de ponta
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Na Clínica Pro Vida, acreditamos que a saúde vai além de consultas e exames. 
                Trata-se de acolhimento, entendimento e parceria. Nossa missão é proporcionar 
                uma experiência de saúde que transforme vidas, unindo a expertise de profissionais 
                renomados com a mais alta tecnologia diagnóstica.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-brand-green"></div>
                  Profissionais treinados e atualizados
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-brand-green"></div>
                  Equipamentos modernos e precisos
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-brand-green"></div>
                  Ambiente acolhedor e seguro
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;