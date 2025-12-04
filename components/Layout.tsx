import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre', href: '#about' },
    { name: 'Serviços', href: '#services' },
    { name: 'Localização', href: '#location' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <div className="font-sans text-gray-800 bg-gray-50 flex flex-col min-h-screen">
      {/* Top Bar */}
      <div className="bg-brand-dark text-white text-xs py-2 px-4 hidden md:flex justify-between items-center">
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><MapPin size={14} /> Vila Virginia, Itaquaquecetuba - SP</span>
          <span className="flex items-center gap-1"><Phone size={14} /> (11) 4642-0000</span>
        </div>
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><Clock size={14} /> Seg - Sex: 08h às 18h</span>
        </div>
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-4'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-brand-green rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-brand-dark transition-colors">
              P
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl text-brand-green leading-tight">Pro Vida</span>
              <span className="text-[10px] tracking-widest text-gray-500 uppercase">Clínica Médica</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-gray-600 hover:text-brand-green transition-colors uppercase tracking-wide"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-brand-green hover:bg-brand-dark text-white px-5 py-2 rounded-full font-medium transition-colors text-sm shadow-lg shadow-brand-green/30"
            >
              Agendar Consulta
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t shadow-xl">
            <nav className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-gray-700 font-medium py-2 border-b border-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                className="bg-brand-green text-white py-3 rounded text-center font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                Agendar Agora
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-heading font-bold text-2xl mb-4 text-brand-green">Pro Vida</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Compromisso com a sua saúde através de atendimento humanizado e tecnologia de ponta.
              </p>
              <div className="flex gap-4">
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-brand-green transition-colors"><Instagram size={18} /></a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-brand-green transition-colors"><Facebook size={18} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg">Links Rápidos</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">Quem Somos</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Especialidades</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Fale Conosco</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Serviços</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Clínica Geral</li>
                <li>Cardiologia</li>
                <li>Pediatria</li>
                <li>Exames Laboratoriais</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Contato</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="mt-1 text-brand-green" />
                  <span>R. Araxá, 150 - Vila Virginia,<br/>Itaquaquecetuba - SP, 08573-100</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-brand-green" />
                  <span>(11) 4642-0000</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock size={16} className="text-brand-green" />
                  <span>Seg-Sex: 08h - 18h | Sáb: 08h - 12h</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
            <p>&copy; 2024 Clínica Pro Vida. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;