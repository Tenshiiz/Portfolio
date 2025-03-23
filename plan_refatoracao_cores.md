# Plano de Refatoração para Centralização de Estilos de Cor

## Objetivo
Refatorar o código para eliminar a duplicação de estilos de cor entre os componentes `Skills` e `Projects`, centralizando-os em um único arquivo de tema (princípio DRY).

## Passos

1.  **[ ] Criar Arquivo de Tema:**
    -   **Ação:** Criar um novo arquivo em `src/styles/theme.ts`.
    -   **Conteúdo:** Mover a definição dos objetos `THEME_COLORS` e `colorStyles` para este arquivo. Exportar o objeto `colorStyles`.

2.  **[ ] Atualizar Componente `Skills`:**
    -   **Arquivo:** `src/app/Components/Skills/index.tsx`
    -   **Ação:** Remover a definição local de `THEME_COLORS` e `colorStyles`. Adicionar uma importação: `import { colorStyles } from '../../styles/theme';`.

3.  **[ ] Atualizar Componente `Projects`:**
    -   **Arquivo:** `src/app/Components/Projects/index.tsx`
    -   **Ação:** Remover a definição local de `THEME_COLORS` e `colors`. Renomear o uso de `colors` para `colorStyles` e importar da mesma forma: `import { colorStyles } from '../../styles/theme';`.

4.  **[ ] Validação:**
    -   Manter o servidor de desenvolvimento (`npm run dev`) ativo.
    -   Verificar visualmente se todos os estilos de cor nos componentes `Skills` e `Projects` continuam sendo aplicados corretamente.