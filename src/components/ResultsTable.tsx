import React from 'react';
import { formatCurrency } from '../utils/calculations';
import { ScenarioResult } from '../types';

import { ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { ScenarioDetails } from './ScenarioDetails';

interface ResultsTableProps {
    results: ScenarioResult[];
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
    const [expandedIds, setExpandedIds] = useState<number[]>([]);

    const toggleExpand = (id: number) => {
        setExpandedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    if (results.length === 0) {
        return (
            <div className="mt-8 p-4 bg-blue-50 text-blue-700 rounded-md text-center border border-blue-200">
                Nenhum cenário calculado ainda. Preencha os dados e clique em Calcular.
            </div>
        );
    }

    return (
        <div className="mt-8 overflow-x-auto shadow-lg rounded-lg border border-gray-200">
            <table className="w-full text-sm text-left text-gray-600 border-collapse">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b">
                    <tr>
                        <th className="px-4 py-3 w-8"></th>
                        <th scope="col" className="px-6 py-3">Cenário</th>
                        <th scope="col" className="px-6 py-3">Total do Projeto</th>
                        <th scope="col" className="px-6 py-3">Entrada (R$)</th>
                        <th scope="col" className="px-6 py-3">Entrada (%)</th>
                        <th scope="col" className="px-6 py-3 bg-blue-50">Valor Financiado</th>
                        <th scope="col" className="px-6 py-3">Parcelas</th>
                        <th scope="col" className="px-6 py-3 bg-green-50">Valor Parcela</th>
                        <th scope="col" className="px-6 py-3">1ª Parcela</th>
                        <th scope="col" className="px-6 py-3">Última Parcela</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result) => (
                        <React.Fragment key={result.id}>
                            <tr
                                className={`border-b hover:bg-gray-50 cursor-pointer transition-colors ${expandedIds.includes(result.id) ? 'bg-gray-50' : 'bg-white'}`}
                                onClick={() => toggleExpand(result.id)}
                            >
                                <td className="px-4 py-4 text-center">
                                    {expandedIds.includes(result.id) ? (
                                        <ChevronDown className="w-4 h-4 text-gray-500" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                    )}
                                </td>
                                <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">
                                    {result.nome}
                                </td>
                                <td className="px-6 py-4 font-medium">
                                    {formatCurrency(result.totalProjeto)}
                                </td>
                                <td className="px-6 py-4">
                                    {formatCurrency(result.entradaReais)}
                                </td>
                                <td className="px-6 py-4">
                                    {result.entradaPercentual.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}%
                                </td>
                                <td className="px-6 py-4 font-bold text-blue-600 bg-blue-50">
                                    {formatCurrency(result.valorFinanciado)}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {result.quantidadeParcelas}
                                </td>
                                <td className="px-6 py-4 font-bold text-green-600 bg-green-50">
                                    {formatCurrency(result.valorParcelaMensal)}
                                </td>
                                <td className="px-6 py-4">
                                    {result.dataPrimeiraParcela || '-'}
                                </td>
                                <td className="px-6 py-4">
                                    {result.dataUltimaParcelaMensal || '-'}
                                </td>
                            </tr>
                            {expandedIds.includes(result.id) && (
                                <tr>
                                    <td colSpan={10} className="p-0 border-b bg-gray-50">
                                        <div className="slide-down-animation">
                                            <ScenarioDetails scenario={result} />
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>

            {/* Detailed Cards for extra info if needed, e.g. Tiago/Eduardo share, or just keep strict table */}
            {/* User asked for specific columns. I provided them. Values like "Mensal Tiago" are calculated but maybe not shown in main table unless requested?
          User request: "- Cenário, Valor total, Entrada R$, Entrada %, Valor financiado, Quantidade parcelas, Valor parcela, Data 1a, Data Ultima"
          I have covered all of these.
          The legacy app showed Tiago/Eduardo share. I might add them to the table or a detail view?
          I'll stick to the requested table columns to keep it clean, as requested.
      */}
        </div>
    );
};
