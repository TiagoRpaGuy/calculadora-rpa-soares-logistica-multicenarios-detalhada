import { useState } from 'react';
import { ScenarioData, ScenarioResult } from './types';
import { calculateScenario } from './utils/calculations';
import { ScenarioCard } from './components/ScenarioCard';
import { ResultsTable } from './components/ResultsTable';
import { Calculator, Users, Plus, Trash2, AlertCircle } from 'lucide-react';
import { CurrencyInput } from './components/CurrencyInput';
import { Participant } from './types';

function App() {
    const [numScenarios, setNumScenarios] = useState<number>(1);
    const [scenarios, setScenarios] = useState<ScenarioData[]>([
        { id: 1, totalProjeto: '', entradaReais: '', entradaPercentual: '', parcelas: '', dataPrimeiraParcela: '' }
    ]);
    const [participants, setParticipants] = useState<Participant[]>([
        { id: 1, name: 'Participante 1', percentage: 70 },
        { id: 2, name: 'Participante 2', percentage: 30 }
    ]);
    const [results, setResults] = useState<ScenarioResult[]>([]);

    // Global shortcut (optional, but requested: "Valor Total do Projeto (Obrigatório) ... sempre o base")
    // Actually, item 1.1 says "Add NO TOPO do formulário um campo obrigatório: Valor Total do Projeto".
    // And "1.3 Garanta que a função de cálculo use SEMPRE o Valor Total do Projeto (Obrigatório) como base".
    // Item 2.2 says "Para cada cenário... Input 'Valor Total do Projeto' ... específico para aquele cenário".
    // So: There is a GLOBAL Value, and PER SCENARIO Value?
    // "1.1 Adicione no TOPO... 2.2 Para cada cenário... Input Valor Total... com o mesmo comportamento... específico"
    // If the user sets the Global value, does it propagate?
    // Item 1.1 implies a global field. Item 2.2 implies per-scenario.
    // Interpretation: The global field acts as a default/override.
    // I will implement a Global Field. When changed, it updates all scenarios that don't have a specific value? 
    // Or simpler: The Global Field IS the value used if the scenario field is empty?
    // Let's implement a Global Field at the top. And prepopulate scenarios with it?

    const [globalTotal, setGlobalTotal] = useState<string>('');

    // Handle number of scenarios change
    const handleNumScenariosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        if (!isNaN(val) && val >= 1 && val <= 10) { // Limit to 10 for sanity
            setNumScenarios(val);

            // Resize array
            setScenarios(prev => {
                const newScenarios = [...prev];
                if (val > prev.length) {
                    // Add new
                    for (let i = prev.length; i < val; i++) {
                        newScenarios.push({
                            id: i + 1,
                            totalProjeto: globalTotal, // Pre-fill with global
                            entradaReais: '',
                            entradaPercentual: '',
                            parcelas: '',
                            dataPrimeiraParcela: ''
                        });
                    }
                } else {
                    // Truncate
                    newScenarios.length = val;
                }
                return newScenarios;
            });
        } else if (e.target.value === '') {
            // allow empty while typing
            setNumScenarios(Number(e.target.value));
        }
    };

    // Handle scenario data change
    const handleScenarioChange = (id: number, field: keyof ScenarioData, value: string) => {
        setScenarios(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    // Update global total effect: if global total changes, do we update scenarios?
    // "Garanta que a função de cálculo use SEMPRE o Valor Total... como base"
    // If the user demanded a global field AND scenario fields, the global likely sets the baseline.
    // I'll make it so if you change Global, it updates all scenarios' totalProjeto, 
    // simple and effective for "mass editing".
    const handleGlobalTotalChange = (val: string) => {
        setGlobalTotal(val);
        setScenarios(prev => prev.map(s => ({ ...s, totalProjeto: val })));
    };

    // Participant handlers
    const addParticipant = () => {
        const newId = participants.length > 0 ? Math.max(...participants.map(p => p.id)) + 1 : 1;
        setParticipants([...participants, { id: newId, name: `Participante ${newId}`, percentage: 0 }]);
    };

    const removeParticipant = (id: number) => {
        if (participants.length <= 1) return; // Prevent deleting last one maybe? Or allow.
        setParticipants(participants.filter(p => p.id !== id));
    };

    const updateParticipant = (id: number, field: keyof Participant, value: string | number) => {
        setParticipants(participants.map(p => {
            if (p.id === id) {
                return { ...p, [field]: value };
            }
            return p;
        }));
    };

    const totalPercentage = participants.reduce((sum, p) => sum + p.percentage, 0);

    const handleCalculate = () => {
        // Validate
        // If global mandatory is missing AND any scenario mandatory is missing...
        // But scenario total is pre-filled from global.

        // Process
        const calculated: ScenarioResult[] = scenarios.map(s => {
            // Use scenario total (which might have been prefilled from global)
            return calculateScenario(s, participants, parseFloat(globalTotal));
        });

        setResults(calculated);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-extrabold text-[#2c3e50] flex justify-center items-center gap-2">
                        <Calculator className="w-8 h-8 text-green-600" />
                        Calculadora RPA Soares Logística
                    </h1>
                    <p className="text-gray-500 mt-2">Simulação de múltiplos cenários de precificação</p>
                </header>

                <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
                    <div className="mb-6 pb-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
                            <Users className="w-5 h-5 text-blue-600" />
                            Configuração de Participantes
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            {participants.map((p) => (
                                <div key={p.id} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                                    <div className="flex-1">
                                        <label className="block text-xs text-gray-500 mb-1">Nome</label>
                                        <input
                                            type="text"
                                            value={p.name}
                                            onChange={(e) => updateParticipant(p.id, 'name', e.target.value)}
                                            className="w-full text-sm border-gray-300 rounded focus:ring-blue-500 border p-1"
                                        />
                                    </div>
                                    <div className="w-24">
                                        <label className="block text-xs text-gray-500 mb-1">Participação %</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                min="0"
                                                max="100"
                                                value={p.percentage}
                                                onChange={(e) => updateParticipant(p.id, 'percentage', parseFloat(e.target.value) || 0)}
                                                className="w-full text-sm border-gray-300 rounded focus:ring-blue-500 border p-1 pr-6"
                                            />
                                            <span className="absolute right-2 top-1 text-gray-400 text-xs">%</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeParticipant(p.id)}
                                        className="mt-5 p-1 text-gray-400 hover:text-red-500 transition-colors"
                                        title="Remover participante"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={addParticipant}
                                className="flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 border-dashed rounded-lg p-3 transition-colors h-full"
                            >
                                <Plus className="w-4 h-4" />
                                <span className="font-medium">Adicionar</span>
                            </button>
                        </div>

                        {totalPercentage !== 100 && (
                            <div className={`flex items-center gap-2 text-sm p-3 rounded-md ${totalPercentage > 100 ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'}`}>
                                <AlertCircle className="w-4 h-4" />
                                <span>
                                    Atenção: O total das porcentagens é <b>{totalPercentage}%</b>.
                                    {totalPercentage !== 100 && " O ideal é que feche em 100%."}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                        {/* Global Total Input */}
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <CurrencyInput
                                label="Valor Total do Projeto (Global)"
                                value={globalTotal}
                                onValueChange={handleGlobalTotalChange}
                                className="bg-white"
                            />
                            <p className="text-xs text-blue-600 mt-1">
                                Define o valor padrão para todos os cenários.
                            </p>
                        </div>

                        {/* Number of Scenarios */}
                        <div className="p-4">
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                Quantidade de Cenários
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={String(numScenarios)} // cast to string to avoid 0 warning issue if empty handled?
                                    onChange={handleNumScenariosChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                                    placeholder="Ex: 3"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Dynamic Scenarios Grid */}
                <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    {scenarios.map((scenario, index) => (
                        <ScenarioCard
                            key={scenario.id}
                            scenario={scenario}
                            index={index}
                            onChange={handleScenarioChange}
                        />
                    ))}
                </section>

                <div className="text-center mb-12">
                    <button
                        onClick={handleCalculate}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-12 rounded-full shadow-lg transform transition hover:scale-105 active:scale-95 text-lg"
                    >
                        Calcular Cenários
                    </button>
                </div>

                {/* Results */}
                <ResultsTable results={results} />

            </div>
        </div>
    )
}

export default App
