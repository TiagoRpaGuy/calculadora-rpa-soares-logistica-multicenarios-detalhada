import React from 'react';
import { ScenarioData } from '../types';
import { CurrencyInput } from './CurrencyInput';

interface ScenarioCardProps {
    scenario: ScenarioData;
    index: number;
    onChange: (id: number, field: keyof ScenarioData, value: string) => void;
    onRemove?: (id: number) => void;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, onChange }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col gap-4 relative">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
                <h3 className="font-bold text-lg text-gray-800">Cenário {scenario.id}</h3>
                {/* Only show remove if we implemented removal, but user asked for "Quantidade de Cenários" input to control count. 
            So manual removal might conflict with the "Number Input". 
            I'll stick to Recriating dynamic scenarios based on count. 
            So no trash button needed if strict count control is used.
        */}
            </div>

            <CurrencyInput
                label="Valor Total do Projeto (Obrigatório)"
                value={scenario.totalProjeto}
                onValueChange={(val) => onChange(scenario.id, 'totalProjeto', val)}
                required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CurrencyInput
                    label="Entrada em R$ (Opcional)"
                    value={scenario.entradaReais}
                    onValueChange={(val) => onChange(scenario.id, 'entradaReais', val)}
                />

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-700">Entrada em % (Opcional)</label>
                    <input
                        type="text" // simplistic percent input
                        value={scenario.entradaPercentual}
                        onChange={(e) => onChange(scenario.id, 'entradaPercentual', e.target.value)}
                        placeholder="Ex: 10"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-700">Quantidade de Parcelas</label>
                    <input
                        type="number"
                        value={scenario.parcelas}
                        onChange={(e) => onChange(scenario.id, 'parcelas', e.target.value)}
                        placeholder="Ex: 12"
                        min="1"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-700">Data 1ª Parcela</label>
                    <input
                        type="date"
                        value={scenario.dataPrimeiraParcela}
                        onChange={(e) => onChange(scenario.id, 'dataPrimeiraParcela', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
            </div>
        </div>
    );
};
