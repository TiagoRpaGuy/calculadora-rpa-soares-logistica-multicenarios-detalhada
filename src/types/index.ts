export interface ScenarioData {
    id: number;
    totalProjeto: string;
    entradaReais: string;
    entradaPercentual: string;
    parcelas: string;
    dataPrimeiraParcela: string;
}

export interface Participant {
    id: number;
    name: string;
    percentage: number;
}

export interface ParticipantShare {
    name: string;
    percentage: number;
    shareTotal: number;
    shareMensal: number;
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
    valorDiario: number;
    totalSemanas: number;
    participantsShares: ParticipantShare[];
    totalContrato: number;
    dataPrimeiraParcela: string;
    dataUltimaParcelaMensal: string;
    datasMensais: string[];
    datasSemanais: string[];
    error?: string;
}
