import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission with a better feedback mechanism
    alert(`Olá ${formData.name}, recebemos sua solicitação!\n\nNossa equipe entrará em contato pelo telefone ${formData.phone} em breve para confirmar seu agendamento.`);
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info & Map */}
          <div>
            <span className="text-brand-green font-bold tracking-wider uppercase text-sm">Contato</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
              Onde nos encontrar
            </h2>
            <p className="text-gray-600 mb-8">
              Estamos localizados em uma área de fácil acesso em Itaquaquecetuba. 
              Venha nos fazer uma visita ou entre em contato para agendar sua avaliação.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="bg-brand-light p-3 rounded-full text-brand-green">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Endereço</h4>
                  <p className="text-gray-600 text-sm">R. Araxá, 150 - Vila Virginia<br/>Itaquaquecetuba - SP, 08573-100</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-light p-3 rounded-full text-brand-green">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Telefone</h4>
                  <p className="text-gray-600 text-sm">(11) 4642-0000</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-light p-3 rounded-full text-brand-green">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Email</h4>
                  <p className="text-gray-600 text-sm">contato@clinicaprovida.com.br</p>
                </div>
              </div>
            </div>

            {/* Simulated Map */}
            <div id="location" className="w-full h-64 bg-gray-200 rounded-xl overflow-hidden shadow-inner relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.0254794206585!2d-46.3536!3d-23.4912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce633767676767%3A0x1234567890abcdef!2sR.%20Arax%C3%A1%2C%20150%20-%20Vila%20Virginia%2C%20Itaquaquecetuba%20-%20SP%2C%2008573-100!5e0!3m2!1spt-BR!2sbr!4v1600000000000!5m2!1spt-BR!2sbr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  loading="lazy"
                  title="Mapa de Localização"
                ></iframe>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Agendar Consulta</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                  placeholder="Seu nome"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem (Opcional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                  placeholder="Desejo agendar uma consulta para..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-green hover:bg-brand-dark text-white font-bold py-4 rounded-lg transition-colors shadow-lg shadow-brand-green/30 mt-2"
              >
                Solicitar Agendamento
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Seus dados estão seguros conosco. Entraremos em contato para confirmar o horário.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;