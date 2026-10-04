import { test, expect } from "@playwright/test";
import { scrollThrough } from "./helpers";

test.describe("regressão visual", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  /**
   * Guarda a refatoração de cores: trocar hex por token não pode mudar nenhum pixel.
   * Partículas (`Math.random`) e o orbe flutuante (animação em JS) não são
   * determinísticos, então ficam invisíveis. Não usar `mask`: o contêiner das partículas
   * é `absolute w-full h-full` e uma máscara sobre ele esconderia o hero e o cabeçalho inteiros.
   */
  test("página inteira permanece idêntica", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    await page.addStyleTag({
      content: "div.overflow-hidden.absolute.top-0.left-0.z-0, div.relative.w-64 { visibility: hidden !important; }",
    });
    await scrollThrough(page);
    await expect(page).toHaveScreenshot("home-1440.png", {
      fullPage: true,
      maxDiffPixels: 50,
    });
  });
});
