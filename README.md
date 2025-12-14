# Calculadora RPA Soares Logística (v2.2) - Edição Detalhada e Dinâmica

Ferramenta avançada para precificação de projetos RPA, suportando múltiplos cenários, gestão dinâmica de participantes, detalhamento financeiro profundo e exportação de relatórios.

## Funcionalidades Principais

- **Múltiplos Cenários**: Simule até 10 cenários diferentes simultaneamente.
- **Gestão de Participantes**:
  - **Adicione/Remova Participantes**: Configure quem fará parte do projeto. 
  - **Porcentagens Personalizáveis**: Defina a porcentagem de lucro de cada participante.
  - **Validação**: O sistema alerta caso a soma das porcentagens não seja 100%.
- **Detalhamento Financeiro**:
  - Cálculo automático da divisão de lucros (Mensal e Total) por participante.
  - Estimativas de ganho diário e semanal.
  - Valor total do contrato e financiamento.
- **Exportação**: Gere relatórios completos em formato `.txt` contendo os dados do cenário e a divisão detalhada entre os participantes.
- **Interface Moderna**: Construída com React, TypeScript e Tailwind CSS.

## Tecnologias

- **Frontend**: Vite + React + TypeScript
- **Estilização**: Tailwind CSS + Lucide Icons
- **Desktop**: Electron (para geração de executável)
- **Utils**: date-fns

## Como Rodar o Projeto

### Pré-requisitos
- Node.js instalado (versão 18+ recomendada).

### Passo a Passo (Terminal)

1. **Instale as dependências**:
   ```bash
   npm install
   ```

2. **Modo de Desenvolvimento (Web)**:
   ```bash
   npm run dev
   ```
   Acesse a URL indicada (ex: `http://localhost:5173`).

3. **Gere o Executável (.exe)**:
   Para criar o arquivo `.exe` para Windows:
   ```bash
   npm run package
   ```
   O executável será gerado na pasta `dist_exec/Calculadora RPA-win32-x64/`.
   Procure pelo arquivo `Calculadora RPA.exe`.
   
   *(Alternativa: `npm run dist` tenta gerar um instalador, mas pode exibir erros de dependência).*

4. **Gere apenas o build Web**:
   ```bash
   npm run build
   ```
   Os arquivos serão gerados na pasta `dist/`.

## Propósito

Esta ferramenta visa facilitar a negociação e planejamento financeiro de projetos RPA, oferecendo clareza sobre o fluxo de caixa, parcelamento e uma divisão de resultados justa e transparente entre todos os envolvidos no projeto.
