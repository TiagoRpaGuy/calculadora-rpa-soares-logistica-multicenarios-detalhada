import { addDays, format } from 'date-fns';
import { ScenarioData, ScenarioResult } from '../types';

export const parseCurrency = (value: string): number => {
    if (!value) return 0;
    // Remove R$, dots, replace comma with dot, and handle empty strings
    const clean = value.replace(/[R$\s.]/g, '').replace(',', '.').trim();
    if (!clean) return 0;
    const parsed = parseFloat(clean);
    return isNaN(parsed) ? 0 : parsed;
};

export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

export const calculateScenario = (scenario: ScenarioData, globalTotal?: number): ScenarioResult => {
    const result: ScenarioResult = {
        id: scenario.id,
        nome: `Cenário ${scenario.id}`,
        totalProjeto: 0,
        entradaReais: 0,
        entradaPercentual: 0,
        valorFinanciado: 0,
        quantidadeParcelas: 0,
        valorParcelaMensal: 0,
        valorParcelaSemanal: 0,
        totalSemanas: 0,
        thiagoShare: 0,
        eduardoShare: 0,
        dataPrimeiraParcela: '',
        dataUltimaParcelaMensal: '',
        datasMensais: [],
        datasSemanais: [],
    };

    try {
        // 1. Determine Total Project Value
        let total = parseCurrency(scenario.totalProjeto);

        // If scenario specific total is 0 or empty, try using global total
        if (total === 0 && globalTotal && globalTotal > 0) {
            total = globalTotal;
            // Optionally update the result's implicit total to show it was used? 
            // We just store it in totalProjeto
        }

        result.totalProjeto = total;

        if (total <= 0) {
            // Don't error immediately if just empty, but effectively can't calculate
            if (scenario.parcelas) {
                // result.error = "Defina o Valor do Projeto"; 
            }
            return result;
        }

        // 2. Entry Logic
        let entryVal = parseCurrency(scenario.entradaReais);
        let entryPct = parseFloat(scenario.entradaPercentual.replace(',', '.'));
        if (isNaN(entryPct)) entryPct = 0;

        // Logic: Value takes precedence if present
        if (entryVal > 0) {
            entryPct = (entryVal / total) * 100;
        } else if (entryPct > 0) {
            entryVal = (total * entryPct) / 100;
        }

        result.entradaReais = entryVal;
        result.entradaPercentual = entryPct;
        result.valorFinanciado = Math.max(0, total - entryVal);

        // 3. Parcels
        const parcelas = parseInt(scenario.parcelas);
        if (!isNaN(parcelas) && parcelas > 0) {
            result.quantidadeParcelas = parcelas;
            result.valorParcelaMensal = result.valorFinanciado / parcelas;
            result.valorParcelaSemanal = result.valorParcelaMensal / 4;
            result.totalSemanas = parcelas * 4;

            // Shares
            result.thiagoShare = result.valorParcelaMensal * 0.70;
            result.eduardoShare = result.valorParcelaMensal * 0.30;

            // 4. Dates
            if (scenario.dataPrimeiraParcela) {
                const [y, m, d] = scenario.dataPrimeiraParcela.split('-').map(Number);
                const startDate = new Date(y, m - 1, d);

                result.dataPrimeiraParcela = format(startDate, 'dd/MM/yyyy');

                // Monthly dates (Legacy logic: 30 days)
                for (let i = 0; i < parcelas; i++) {
                    const date = addDays(startDate, 30 * (i + 1));
                    result.datasMensais.push(format(date, 'dd/MM/yyyy'));
                    if (i === parcelas - 1) {
                        result.dataUltimaParcelaMensal = format(date, 'dd/MM/yyyy');
                    }
                }

                // Weekly dates (Legacy logic: 7 days)
                for (let i = 0; i < result.totalSemanas; i++) {
                    const date = addDays(startDate, 7 * (i + 1));
                    result.datasSemanais.push(format(date, 'dd/MM/yyyy'));
                }
            }
        } else {
            // Can't calculate parcels
        }

    } catch (e) {
        result.error = "Erro no cálculo";
    }

    return result;
};
