import { test, expect } from "@playwright/test";
import { VIEWPORTS, scrollThrough } from "./helpers";

for (const vp of VIEWPORTS) {
  test.describe(`viewport ${vp.name}`, () => {
    test.use({
      viewport: { width: vp.width, height: vp.height },
      hasTouch: vp.touch,
    });

    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await expect(page.locator("h1")).toBeVisible();
    });

    test("não gera overflow horizontal", async ({ page }) => {
      await scrollThrough(page);
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
    });

    test("cabeçalho fixo não cobre o título do hero", async ({ page }) => {
      const header = await page.locator("header").boundingBox();
      const h1 = await page.locator("h1").boundingBox();
      expect(header).not.toBeNull();
      expect(h1).not.toBeNull();
      expect(h1!.y).toBeGreaterThanOrEqual(header!.y + header!.height);
    });

    test("hero cabe na primeira dobra sem cortar os botões de ação", async ({ page }) => {
      const botoes = page.locator("section").first().locator("a", { hasText: /Meu trabalho|Contato/ });
      await expect(botoes).toHaveCount(2);
      for (const i of [0, 1]) {
        const box = await botoes.nth(i).boundingBox();
        expect(box!.y + box!.height).toBeLessThanOrEqual(vp.height);
      }
    });

    // Com `min-h-svh` a altura nunca fica abaixo do viewport, então `<=` só passa se o conteúdo couber.
    if (vp.width >= 1280) {
      test("seção Habilidades cabe em uma tela (100vh)", async ({ page }) => {
        await scrollThrough(page);
        const altura = await page.locator("#habilidades").evaluate((el) => el.getBoundingClientRect().height);
        expect(altura, `seção com ${Math.round(altura)}px num viewport de ${vp.height}px`).toBeLessThanOrEqual(vp.height + 1);
      });
    }

    test("imagens carregam e nenhuma estoura o viewport", async ({ page }) => {
      await scrollThrough(page);
      const imgs = await page.$$eval("img", (els) =>
        els.map((el) => ({
          src: el.currentSrc || el.src,
          ok: el.complete && el.naturalWidth > 0,
          right: el.getBoundingClientRect().right,
        })),
      );
      expect(imgs.length).toBeGreaterThan(0);
      for (const img of imgs) {
        expect(img.ok, `imagem não carregou: ${img.src}`).toBe(true);
        expect(img.right).toBeLessThanOrEqual(vp.width + 1);
      }
    });

    if (vp.width <= 412) {
      test("alvos de toque do cabeçalho e do hero têm no mínimo 44x44px", async ({ page }) => {
        const alvos = page.locator("header button, section:first-of-type a[aria-label]");
        const total = await alvos.count();
        expect(total).toBeGreaterThan(0);
        const pequenos: string[] = [];
        for (let i = 0; i < total; i++) {
          const el = alvos.nth(i);
          if (!(await el.isVisible())) continue;
          const box = await el.boundingBox();
          if (box && (box.width < 44 || box.height < 44)) {
            const nome = (await el.getAttribute("aria-label")) ?? "button do cabeçalho";
            pequenos.push(`${nome}: ${Math.round(box.width)}x${Math.round(box.height)}`);
          }
        }
        expect(pequenos, `alvos menores que 44x44: ${pequenos.join("; ")}`).toEqual([]);
      });
    }

    test("captura de tela da página inteira", async ({ page }) => {
      await scrollThrough(page);
      await page.screenshot({
        path: `test-results/screens/${vp.name}.png`,
        fullPage: true,
      });
    });
  });
}
