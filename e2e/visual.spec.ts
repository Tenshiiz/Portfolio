import { test, expect } from "@playwright/test";
import { scrollThrough } from "./helpers";

test.describe("regressão visual", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  /**
   * Regressão visual da página inteira a 1440 px. O céu (voo e cintilar animados) e o orbe flutuante
   * não são determinísticos, então ficam invisíveis. Não usar `mask`: o contêiner do céu é `fixed inset-0`
   * e uma máscara sobre ele cobriria a viewport inteira. O snapshot depende do sistema operacional e não
   * é versionado; gere o seu com `--update-snapshots`.
   */
  test("página inteira permanece idêntica", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    await page.addStyleTag({
      content: "[data-sky], div.relative.w-64 { visibility: hidden !important; }",
    });
    await scrollThrough(page);
    await expect(page).toHaveScreenshot("home-1440.png", {
      fullPage: true,
      maxDiffPixels: 50,
    });
  });
});
