import { formatCurrency } from './calculations';
import { ScenarioResult } from '../types';

export const generateScenarioReport = (scenario: ScenarioResult) => {
    const lines = [];
    lines.push('===============================');
    lines.push(`   RELATÓRIO COMPLETO - ${scenario.nome.toUpperCase()}`);
    lines.push('===============================');
    lines.push(`Valor total do projeto: ${formatCurrency(scenario.totalProjeto)}`);
    lines.push(`Entrada: ${formatCurrency(scenario.entradaReais)} (${scenario.entradaPercentual.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%)`);
    lines.push(`Valor financiado: ${formatCurrency(scenario.valorFinanciado)}`);
    lines.push(`Quantidade de parcelas: ${scenario.quantidadeParcelas}`);
    lines.push(`Valor da parcela: ${formatCurrency(scenario.valorParcelaMensal)}`);
    lines.push(`Total do contrato: ${formatCurrency(scenario.totalContrato)}`);
    scenario.participantsShares.forEach((share) => {
        lines.push(`Ganho ${share.name} (${share.percentage}%): ${formatCurrency(share.shareTotal)}`);
        lines.push(`Valor mensal ${share.name}: ${formatCurrency(share.shareMensal)}`);
    });
    lines.push(`Valor semanal estimado: ${formatCurrency(scenario.valorParcelaSemanal)}`);
    lines.push(`Valor diário estimado: ${formatCurrency(scenario.valorDiario)}`);
    lines.push(`Data primeira parcela: ${scenario.dataPrimeiraParcela}`);
    lines.push(`Data última parcela: ${scenario.dataUltimaParcelaMensal}`);

    lines.push('Lista de todas as datas de pagamento:');
    scenario.datasMensais.forEach((date: string) => {
        lines.push(`  - ${date}`);
    });

    const content = lines.join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `relatorio_${scenario.nome.replace(/\s+/g, '_').toLowerCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
