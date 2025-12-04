import React, { useState, useRef } from 'react';
import { Search, Sparkles, Upload, ArrowRight, Loader2, Info } from 'lucide-react';
import { getHealthAdvice, editMedicalImage } from '../services/geminiService';
import { SearchResponse } from '../types';

const TechIntegration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'search' | 'edit'>('search');

  return (
    <section id="tech" className="py-20 bg-brand-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-brand-green font-bold tracking-wider uppercase text-sm">Inovação</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Tecnologia Aliada à Saúde
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Utilizamos inteligência artificial avançada para fornecer informações atualizadas e 
            ferramentas visuais interativas para nossos pacientes.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-5xl mx-auto border border-brand-green/10">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('search')}
              className={`flex-1 py-6 font-bold text-lg flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'search' ? 'bg-white text-brand-green border-b-4 border-brand-green' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Search size={20} />
              Info Saúde (Search Grounding)
            </button>
            <button
              onClick={() => setActiveTab('edit')}
              className={`flex-1 py-6 font-bold text-lg flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'edit' ? 'bg-white text-brand-green border-b-4 border-brand-green' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Sparkles size={20} />
              Simulador Visual (IA Generativa)
            </button>
          </div>

          <div className="p-6 md:p-10 min-h-[500px]">
            {activeTab === 'search' ? <HealthSearchTool /> : <ImageEditTool />}
          </div>
        </div>
      </div>
    </section>
  );
};

const HealthSearchTool: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await getHealthAdvice(query);
      setResult(data);
    } catch (err) {
      setError("Ocorreu um erro ao buscar informações. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Tire suas dúvidas de saúde</h3>
        <p className="text-gray-600 text-sm">
          Utilize nossa IA conectada ao Google Search para obter informações atualizadas sobre sintomas, 
          prevenção e bem-estar. *Esta ferramenta não substitui uma consulta médica.*
        </p>
      </div>

      <form onSubmit={handleSearch} className="relative mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex: Quais os sintomas da gripe em 2025?"
          className="w-full p-4 pl-6 pr-14 rounded-full border-2 border-brand-green/20 focus:border-brand-green focus:outline-none focus:ring-4 focus:ring-brand-green/10 transition-all text-gray-700 placeholder-gray-400"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute right-2 top-2 bg-brand-green text-white p-2.5 rounded-full hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <ArrowRight size={20} />}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 mb-4">
          {error}
        </div>
      )}

      {result && (
        <div className="animate-fade-in bg-gray-50 rounded-xl p-6 border border-gray-100 flex-grow">
          <div className="prose prose-green max-w-none mb-6 text-gray-700 whitespace-pre-line">
            {result.text}
          </div>
          
          {result.sources.length > 0 && (
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Fontes Verificadas</h4>
              <ul className="grid gap-2">
                {result.sources.map((source, idx) => (
                  <li key={idx}>
                    <a 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-brand-green hover:underline bg-white p-2 rounded shadow-sm border border-gray-100"
                    >
                      <Info size={14} />
                      <span className="truncate">{source.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {!result && !loading && (
        <div className="flex-grow flex items-center justify-center text-gray-400 flex-col gap-4">
          <Search size={48} className="opacity-20" />
          <p>Digite sua pergunta acima para começar.</p>
        </div>
      )}
    </div>
  );
};

const ImageEditTool: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setGeneratedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage || !prompt.trim()) return;

    setLoading(true);
    try {
      const result = await editMedicalImage(selectedImage, prompt);
      setGeneratedImage(result);
    } catch (error) {
      alert("Falha ao editar a imagem. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 h-full">
      <div className="flex-1 flex flex-col gap-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Simulador Visual</h3>
          <p className="text-gray-600 text-sm">
            Experimente nossa IA de edição de imagens. Carregue uma foto e peça alterações.
            <br/><span className="italic text-xs text-gray-400">Ex: "Adicione um sorriso", "Remova o fundo", "Coloque um jaleco".</span>
          </p>
        </div>

        <div className="space-y-4">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer transition-colors ${selectedImage ? 'border-brand-green bg-green-50' : 'border-gray-300 hover:border-brand-green hover:bg-gray-50'}`}
          >
            {selectedImage ? (
              <img src={selectedImage} alt="Preview" className="h-full object-contain p-2" />
            ) : (
              <>
                <Upload className="text-gray-400 mb-2" size={32} />
                <span className="text-sm text-gray-500 font-medium">Clique para carregar uma foto</span>
              </>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Descreva a edição desejada..."
              className="flex-1 p-3 rounded-lg border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none"
            />
            <button
              onClick={handleGenerate}
              disabled={!selectedImage || !prompt || loading}
              className="bg-brand-green text-white px-6 rounded-lg font-medium hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Gerar'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-gray-100 rounded-xl flex items-center justify-center min-h-[300px] border border-gray-200 relative overflow-hidden">
        {generatedImage ? (
          <div className="relative w-full h-full p-2">
            <img src={generatedImage} alt="Resultado IA" className="w-full h-full object-contain" />
            <div className="absolute bottom-4 right-4 bg-brand-green text-white text-xs px-2 py-1 rounded shadow">
              Gerado por Gemini 2.5 Flash
            </div>
          </div>
        ) : (
          <div className="text-center p-8">
            <Sparkles className="mx-auto text-gray-300 mb-3" size={48} />
            <p className="text-gray-400 font-medium">O resultado da edição aparecerá aqui</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechIntegration;