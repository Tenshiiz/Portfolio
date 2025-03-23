# Plano de Refatoração dos Estilos de Cor

## Objetivo
Refatorar a definição de estilos de cor nos componentes `Skills` e `Projects` para eliminar a repetição de código, seguindo o princípio DRY (Don't Repeat Yourself).

## Estratégia
Criar uma função utilitária que gera dinamicamente o objeto de classes Tailwind CSS para uma determinada cor.

## Passos

1.  **[ ] Criar Função Utilitária:**
    -   Criar o arquivo `src/utils/colorStyles.ts`.
    -   Implementar a função `createColorStyles(hexColor)` que retorna um objeto com as classes `border`, `text`, `bg`, e `hover`.

2.  **[ ] Refatorar `Skills` Component:**
    -   Importar a função `createColorStyles` de `src/utils/colorStyles.ts`.
    -   Substituir o objeto de cores estático pela chamada da nova função para cada cor necessária.

3.  **[ ] Refatorar `Projects` Component:**
    -   Importar a função `createColorStyles`.
    -   Atualizar a definição de cores para usar a função geradora.

4.  **[ ] Validação:**
    -   Manter o servidor de desenvolvimento (`npm run dev`) ativo.
    -   Verificar visualmente se todos os estilos de cor nos componentes `Skills` e `Projects` continuam sendo aplicados corretamente.