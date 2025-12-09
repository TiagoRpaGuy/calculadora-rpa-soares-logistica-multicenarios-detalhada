export interface ScenarioData {
    id: number;
    totalProjeto: string;
    entradaReais: string;
    entradaPercentual: string;
    parcelas: string;
    dataPrimeiraParcela: string;
}

export interface ScenarioResult {
    id: number;
    nome: string;
    totalProjeto: number;
    entradaReais: number;
    entradaPercentual: number;
    valorFinanciado: number;
    quantidadeParcelas: number;
    valorParcelaMensal: number;
    valorParcelaSemanal: number;
    totalSemanas: number;
    thiagoShare: number;
    eduardoShare: number;
    dataPrimeiraParcela: string;
    dataUltimaParcelaMensal: string;
    datasMensais: string[];
    datasSemanais: string[];
    error?: string;
}
