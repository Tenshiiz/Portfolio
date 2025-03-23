# Plano de Refatoração: Integrando Cores ao Tema do Tailwind

## Objetivo
Melhorar a arquitetura de estilos, movendo as cores personalizadas para dentro da configuração do Tailwind CSS (`tailwind.config.ts`). Isso elimina a necessidade de valores arbitrários e do arquivo `theme.ts`, alinhando o projeto com as melhores práticas do Tailwind.

## Passos

1.  **[ ] Criar e Configurar `tailwind.config.ts`:**
    -   **Ação:** Criar um novo arquivo `tailwind.config.ts` na raiz do projeto.
    -   **Conteúdo:** Adicionar a configuração básica do Tailwind, incluindo a seção `content` para escanear os arquivos do projeto. Na seção `theme.extend.colors`, definir as cores `custom-cyan`, `custom-purple`, e `custom-pink` com seus respectivos códigos hexadecimais.

2.  **[ ] Remover o Arquivo `src/styles/theme.ts`:**
    -   **Ação:** Excluir o arquivo, pois sua funcionalidade será substituída pela configuração nativa do Tailwind.

3.  **[ ] Refatorar `Skills/index.tsx`:**
    -   **Ação:** Remover a importação de `theme.ts`. Reescrever o objeto `colorStyles` para que ele use as novas classes do tema (ex: `text-custom-cyan`, `border-custom-purple/20`).

4.  **[ ] Refatorar `Projects/index.tsx`:**
    -   **Ação:** Aplicar a mesma refatoração do passo anterior, atualizando o objeto `colors`.

5.  **[ ] Validação:**
    -   **Ação:** Reiniciar o servidor de desenvolvimento do Next.js para que ele carregue o novo `tailwind.config.ts`. Verificar se todos os estilos de cor continuam funcionando corretamente.