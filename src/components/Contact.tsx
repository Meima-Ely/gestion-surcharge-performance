import { useState } from 'react';

// ✅ Types explicites
type FormData = {
  nom: string;
  email: string;
  entreprise: string;
  type_projet: string;
  budget: string;
  delai: string;
  description: string;
};

type Status = 'idle' | 'success' | 'error' | 'validation';

const EMPTY_FORM: FormData = {
  nom: '', email: '', entreprise: '',
  type_projet: '', budget: '', delai: '', description: ''
};

const Contact = () => {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [status, setStatus]     = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading]   = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Validation côté client avant envoi
  const validate = (): string | null => {
    if (!formData.nom.trim())         return 'Le nom est requis';
    if (!formData.email.trim())       return 'L\'email est requis';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
                                      return 'Email invalide';
    if (!formData.type_projet)        return 'Le type de projet est requis';
    if (!formData.description.trim()) return 'La description est requise';
    return null;
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setStatus('validation');
      setErrorMsg(validationError);
      return;
    }

    setLoading(true);
    setStatus('idle');

    try {
      const response = await fetch('http://localhost/devis', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(formData)
      });

      if (response.status === 201) {
        setStatus('success');
        setFormData(EMPTY_FORM);
      } else if (response.status === 429) {
        // ✅ Gestion du rate limit (ignoré dans la version originale)
        setStatus('error');
        setErrorMsg('Trop de demandes. Veuillez patienter 1 minute.');
      } else {
        const data = await response.json().catch(() => ({}));
        setStatus('error');
        setErrorMsg(data.error || `Erreur serveur (${response.status})`);
      }
    } catch {
      setStatus('error');
      setErrorMsg('Erreur de connexion. Vérifiez que le backend est lancé.');
    } finally {
      setLoading(false); // ✅ finally garantit le reset même si exception
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Demande de Devis
          </h2>
          <p className="text-xl text-gray-600">
            Décrivez votre projet, nous vous répondons sous 24h
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-2xl shadow-xl">

          {/* ✅ Messages de statut distincts */}
          {status === 'success' && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl text-center font-semibold">
              ✅ Votre demande a été envoyée avec succès !
            </div>
          )}
          {status === 'error' && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl text-center font-semibold">
              ❌ {errorMsg}
            </div>
          )}
          {status === 'validation' && (
            <div className="mb-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-xl text-center font-semibold">
              ⚠️ {errorMsg}
            </div>
          )}

          <div className="space-y-6">
            {/* Nom + Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom complet *
                </label>
                <input
                  type="text" name="nom" value={formData.nom}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email" name="email" value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Entreprise + Type projet */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Entreprise
                </label>
                <input
                  type="text" name="entreprise" value={formData.entreprise}
                  onChange={handleChange}
                  placeholder="Nom de votre entreprise"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Type de projet *
                </label>
                <select
                  name="type_projet" value={formData.type_projet}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                >
                  <option value="">-- Choisir --</option>
                  <option value="Application Web">🌐 Application Web</option>
                  <option value="Application Mobile">📱 Application Mobile</option>
                  <option value="Sécurité Informatique">🔒 Sécurité Informatique</option>
                  <option value="Cloud & DevOps">☁️ Cloud & DevOps</option>
                  <option value="Autre">💡 Autre</option>
                </select>
              </div>
            </div>

            {/* Budget + Délai */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Budget estimé
                </label>
                <select
                  name="budget" value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                >
                  <option value="">-- Choisir --</option>
                  <option value="Moins de 1000$">Moins de 1000$</option>
                  <option value="1000$ - 5000$">1000$ - 5000$</option>
                  <option value="5000$ - 10000$">5000$ - 10000$</option>
                  <option value="Plus de 10000$">Plus de 10000$</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Délai souhaité
                </label>
                <select
                  name="delai" value={formData.delai}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                >
                  <option value="">-- Choisir --</option>
                  <option value="Urgent (1 mois)">🔥 Urgent (1 mois)</option>
                  <option value="Normal (3 mois)">✅ Normal (3 mois)</option>
                  <option value="Flexible (6 mois+)">📅 Flexible (6 mois+)</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description du projet *
              </label>
              <textarea
                name="description" value={formData.description}
                onChange={handleChange} rows={5}
                placeholder="Décrivez votre projet en détail..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span>⏳ Envoi en cours...</span>
              ) : (
                <>
                  <span>Envoyer ma demande</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;