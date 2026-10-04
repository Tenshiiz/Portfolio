import type { Page } from "@playwright/test";

/** Os 4 arquétipos dimensionais de validação de responsividade. */
export const VIEWPORTS = [
  { name: "desktop-1920x1080", width: 1920, height: 1080, touch: false },
  { name: "notebook-1366x768", width: 1366, height: 768, touch: false },
  { name: "tablet-ipad-834x1194", width: 834, height: 1194, touch: true },
  { name: "tablet-surface-960x1440", width: 960, height: 1440, touch: true },
  { name: "phone-390x844", width: 390, height: 844, touch: true },
  { name: "phone-412x915", width: 412, height: 915, touch: true },
] as const;

export const SECTIONS = [
  { label: "Início", id: "inicio" },
  { label: "Sobre", id: "sobre" },
  { label: "Habilidades", id: "habilidades" },
  { label: "Projetos", id: "projetos" },
  { label: "Contato", id: "contato" },
] as const;

/**
 * Percorre a página em passos de 80% da altura do viewport.
 * As seções usam `whileInView` e um listener de scroll, então o conteúdo só
 * existe visualmente depois de ser rolado; sem isso, capturas e checagens
 * de imagem leem um estado com `opacity: 0` e `loading="lazy"` pendente.
 */
export async function scrollThrough(page: Page): Promise<void> {
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = Math.floor((page.viewportSize()?.height ?? 800) * 0.8);
  for (let y = 0; y < total; y += step) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(250);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
}

/** Coleta erros de console, exceções e respostas HTTP >= 400 durante o teste. */
export function collectProblems(page: Page): string[] {
  const problems: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") problems.push(`console.error: ${msg.text()}`);
  });
  page.on("pageerror", (err) => problems.push(`pageerror: ${err.message}`));
  page.on("response", (res) => {
    if (res.status() >= 400) problems.push(`HTTP ${res.status()}: ${res.url()}`);
  });
  return problems;
}
