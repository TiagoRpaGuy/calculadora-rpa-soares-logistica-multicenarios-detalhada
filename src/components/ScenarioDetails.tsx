import React from 'react';
import { ScenarioResult } from '../types';
import { formatCurrency } from '../utils/calculations';
import { generateScenarioReport } from '../utils/exportToTxt';
import { Download, Calendar } from 'lucide-react';

interface ScenarioDetailsProps {
    scenario: ScenarioResult;
}

export const ScenarioDetails: React.FC<ScenarioDetailsProps> = ({ scenario }) => {
    return (
        <div className="p-6 bg-gray-50 border-t border-gray-200">
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                Detalhes de {scenario.nome}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {/* Coluna 1: Geral */}
                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                    <h5 className="font-semibold text-gray-600 mb-3 border-b pb-1">Visão Geral</h5>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Valor Total:</span>
                            <span className="font-medium text-gray-900">{formatCurrency(scenario.totalProjeto)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Entrada:</span>
                            <span className="font-medium text-gray-900">
                                {formatCurrency(scenario.entradaReais)} ({scenario.entradaPercentual.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}%)
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Financiado:</span>
                            <span className="font-medium text-blue-600">{formatCurrency(scenario.valorFinanciado)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Total Contrato:</span>
                            <span className="font-medium text-green-700">{formatCurrency(scenario.totalContrato)}</span>
                        </div>
                    </div>
                </div>

                {/* Coluna 2: Parcelamento */}
                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                    <h5 className="font-semibold text-gray-600 mb-3 border-b pb-1">Parcelamento</h5>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Parcelas:</span>
                            <span className="font-medium text-gray-900">{scenario.quantidadeParcelas}x</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Valor Mensal:</span>
                            <span className="font-medium text-gray-900">{formatCurrency(scenario.valorParcelaMensal)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Valor Semanal:</span>
                            <span className="font-medium text-gray-900">{formatCurrency(scenario.valorParcelaSemanal)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Valor Diário:</span>
                            <span className="font-medium text-gray-500 text-xs mt-1">{formatCurrency(scenario.valorDiario)}</span>
                        </div>
                    </div>
                </div>

                {/* Coluna 3: Divisão */}
                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                    <h5 className="font-semibold text-gray-600 mb-3 border-b pb-1">Divisão de Lucros</h5>
                    <div className="space-y-2 text-sm">
                        {scenario.participantsShares.map((share, idx) => (
                            <div key={`mensal-${idx}`} className="flex justify-between">
                                <span className="text-gray-500">{share.name} (Mensal):</span>
                                <span className="font-medium text-indigo-600">{formatCurrency(share.shareMensal)}</span>
                            </div>
                        ))}

                        <div className="border-t pt-2 mt-2">
                            {scenario.participantsShares.map((share, idx) => (
                                <div key={`total-${idx}`} className="flex justify-between text-xs">
                                    <span className="text-gray-500">{share.name} (Total):</span>
                                    <span className="font-bold text-gray-800">{formatCurrency(share.shareTotal)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-md border border-gray-100">
                <div className="flex gap-4 text-sm text-gray-600 mb-4 sm:mb-0">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Início: <b>{scenario.dataPrimeiraParcela}</b></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Fim: <b>{scenario.dataUltimaParcelaMensal}</b></span>
                    </div>
                </div>

                <button
                    onClick={() => generateScenarioReport(scenario)}
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                    <Download className="w-4 h-4" />
                    Exportar Cenário (.txt)
                </button>
            </div>
        </div>
    );
};
