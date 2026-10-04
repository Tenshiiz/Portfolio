import { test, expect } from "@playwright/test";
import { SECTIONS, collectProblems, scrollThrough } from "./helpers";

test.describe("documento", () => {
  test("idioma e título", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    await expect(page).toHaveTitle("Carlos Eduardo | Front-end Developer");
  });

  test("sem erros de console, exceções ou respostas HTTP >= 400", async ({ page }) => {
    const problems = collectProblems(page);
    await page.goto("/");
    await scrollThrough(page);
    expect(problems).toEqual([]);
  });
});

test.describe("navegação", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  for (const { label, id } of SECTIONS) {
    test(`menu "${label}" leva à seção #${id}`, async ({ page }) => {
      await page.goto("/");
      await page.locator("header nav").first().getByRole("link", { name: label, exact: true }).click();
      const alvo = page.locator(`#${id}`);
      await expect(alvo, `não existe elemento #${id}`).toHaveCount(1);
      await expect(alvo).toBeInViewport();
    });
  }

  test("botões do hero são links navegáveis (têm href e papel de link)", async ({ page }) => {
    await page.goto("/");
    for (const nome of ["Meu trabalho", "Contato"]) {
      const link = page.getByRole("link", { name: nome, exact: true }).and(page.locator("section a"));
      await expect(link, `"${nome}" não é um link (sem href)`).toHaveCount(1);
    }
  });

  test("nenhum link aponta para '#' vazio", async ({ page }) => {
    await page.goto("/");
    const mortos = await page.$$eval('a[href="#"]', (els) =>
      els.map((el) => el.getAttribute("aria-label") ?? el.textContent?.trim() ?? "(sem texto)"),
    );
    expect(mortos, `links sem destino: ${mortos.join(", ")}`).toEqual([]);
  });

  test("seção Contato oferece e-mail, LinkedIn e GitHub", async ({ page }) => {
    await page.goto("/");
    const contato = page.locator("#contato");
    await contato.scrollIntoViewIfNeeded();
    await expect(contato.getByRole("heading", { name: /Contato/ })).toBeVisible();
    await expect(contato.getByRole("link", { name: "E-mail" })).toHaveAttribute(
      "href",
      "mailto:carlosvanziler50@gmail.com",
    );
    await expect(contato.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", /linkedin\.com\/in\//);
    await expect(contato.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", /github\.com\/Tenshiiz/);
  });

  test("links externos abrem em nova aba com rel='noopener noreferrer'", async ({ page }) => {
    await page.goto("/");
    const externos = await page.$$eval('a[target="_blank"]', (els) =>
      els.map((el) => ({ href: el.getAttribute("href"), rel: el.getAttribute("rel") ?? "" })),
    );
    expect(externos.length).toBeGreaterThan(0);
    for (const l of externos) {
      expect(l.rel, `rel ausente em ${l.href}`).toContain("noopener");
      expect(l.rel, `rel ausente em ${l.href}`).toContain("noreferrer");
    }
  });

  test("seção Sobre aparece ao abrir direto pela âncora #sobre", async ({ page }) => {
    await page.goto("/#sobre");
    // Segundo bloco animado do Sobre (o texto), filho do Container.
    const conteudo = page.locator("#sobre > div > div").nth(1);
    await expect(conteudo).toHaveCSS("opacity", "1", { timeout: 5000 });
  });
});

test.describe("menu móvel", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

  test("botão do menu tem nome acessível e estado expandido", async ({ page }) => {
    await page.goto("/");
    const botao = page.locator("header button");
    await expect(botao).toHaveAccessibleName(/menu/i);
    await expect(botao).toHaveAttribute("aria-expanded", "false");
  });

  test("abre, navega e fecha ao escolher um item", async ({ page }) => {
    await page.goto("/");
    await page.locator("header button").tap();
    const link = page.getByRole("link", { name: "Projetos", exact: true });
    await expect(link).toBeVisible();
    await link.tap();
    await expect(page.locator("#projetos")).toBeInViewport();
    await expect(link).toBeHidden();
  });

  test("Esc fecha o menu e devolve o foco ao botão", async ({ page }) => {
    await page.goto("/");
    const botao = page.locator("header button");
    await botao.tap();
    await expect(botao).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(botao).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByRole("link", { name: "Projetos", exact: true })).toBeHidden();
    await expect(botao).toBeFocused();
  });

  test("painel do menu começa na borda inferior da barra, sem sobrepor", async ({ page }) => {
    await page.goto("/");
    await page.locator("header button").tap();
    const { barra, painel } = await page.evaluate(() => ({
      barra: document.querySelector("header")!.getBoundingClientRect().bottom,
      painel: document.querySelector("#menu-movel")!.getBoundingClientRect().top,
    }));
    expect(Math.abs(painel - barra), `barra termina em ${barra}px, painel começa em ${painel}px`).toBeLessThanOrEqual(1);
  });
});

test.describe("renderização visual", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("ícones dos projetos e do rodapé renderizam como SVG visível", async ({ page }) => {
    await page.goto("/");
    await scrollThrough(page);
    // Sem o CSS do FontAwesome, `<i class="fas|fab">` não desenha nada; os ícones devem ser SVG inline.
    await expect(page.locator("i.fas, i.fab")).toHaveCount(0);
    for (const icone of ["eye", "github", "arrow-right", "heart"]) {
      const alvo = page.locator(`svg[data-icon="${icone}"]`).first();
      await alvo.scrollIntoViewIfNeeded();
      const box = await alvo.boundingBox();
      expect(box, `ícone "${icone}" ausente`).not.toBeNull();
      expect(box!.width).toBeGreaterThan(4);
    }
  });

  test("fonte do título é uma fonte efetivamente carregada", async ({ page }) => {
    await page.goto("/");
    await scrollThrough(page);
    const r = await page.evaluate(async () => {
      await document.fonts.ready;
      const h1 = document.querySelector("h1");
      const familia = h1 ? getComputedStyle(h1).fontFamily.split(",")[0].replace(/["']/g, "").trim() : "";
      const carregadas = [...document.fonts]
        .filter((f) => f.status === "loaded")
        .map((f) => f.family.replace(/["']/g, ""));
      return { familia, carregadas };
    });
    expect(
      r.carregadas,
      `h1 pede "${r.familia}", fontes carregadas: ${r.carregadas.join(", ")}`,
    ).toContain(r.familia);
  });

  test("todas as imagens passam pelo otimizador do Next e pesam pouco", async ({ page }) => {
    const bytes: number[] = [];
    const leituras: Promise<void>[] = [];
    page.on("response", (res) => {
      if (!res.url().includes("/_next/image")) return;
      leituras.push(res.body().then((b) => void bytes.push(b.length)).catch(() => undefined));
    });
    await page.goto("/");
    await scrollThrough(page);
    await page.waitForLoadState("networkidle");
    await Promise.all(leituras);

    await expect(page.locator('img[src*="/_next/image"]')).toHaveCount(3);
    await expect(page.locator('img:not([src*="/_next/image"])')).toHaveCount(0);
    // Antes: as duas miniaturas de projeto somavam ~3,3 MB servidos crus.
    const total = bytes.reduce((a, b) => a + b, 0);
    expect(total, `imagens otimizadas somam ${Math.round(total / 1024)} KB`).toBeLessThan(800 * 1024);
  });

  test("cabeçalho é transparente no topo e ganha fundo com blur ao rolar", async ({ page }) => {
    const estilo = () =>
      page.locator("header").evaluate((el) => {
        const s = getComputedStyle(el);
        return { fundo: s.backgroundColor, blur: s.backdropFilter };
      });
    await page.goto("/");
    await expect.poll(async () => (await estilo()).fundo).toBe("rgba(0, 0, 0, 0)");
    await page.evaluate(() => window.scrollTo(0, 400));
    await expect.poll(async () => (await estilo()).blur).toContain("blur");
  });

  test("cabeçalho mantém o fundo após F5 no meio da página", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, 2000));
    await page.reload();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(1000);
    await expect
      .poll(() => page.locator("header").evaluate((el) => getComputedStyle(el).backdropFilter))
      .toContain("blur");
  });

  for (const esquema of ["light", "dark"] as const) {
    test(`fundo da página começa no topo, sem revelar o body (${esquema})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: esquema });
      await page.goto("/");
      const topo = await page.evaluate(() => document.getElementById("inicio")!.getBoundingClientRect().top);
      expect(topo, "o contêiner de fundo deve começar em y=0").toBe(0);
    });
  }

  test("spotlight do hero gera um gradiente (classe arbitrária válida)", async ({ page }) => {
    await page.goto("/");
    const fundo = await page
      .locator('div[class*="h-[200%]"]')
      .first()
      .evaluate((el) => getComputedStyle(el).backgroundImage);
    expect(fundo).not.toBe("none");
  });

  test("brilho do ícone de habilidade aparece no hover do cartão", async ({ page }) => {
    await page.goto("/");
    const cartao = page.locator("#habilidades .group").first();
    await cartao.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await cartao.hover();
    await page.waitForTimeout(500);
    const sombra = await cartao
      .locator("[data-skill-icon]")
      .evaluate((el) => getComputedStyle(el).boxShadow);
    expect(sombra).not.toBe("none");
  });
});

test.describe("movimento", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  /** `transform` computado do elemento que flutua no orbe do hero, em dois instantes. */
  async function transformsDoOrbe(page: import("@playwright/test").Page) {
    const orbe = page.locator("section").first().locator("xpath=.//span[text()='</>']/../..");
    const leitura = () => orbe.evaluate((el) => getComputedStyle(el).transform);
    await page.waitForTimeout(1200);
    const antes = await leitura();
    await page.waitForTimeout(1500);
    return { antes, depois: await leitura() };
  }

  test("sem preferência de movimento: partículas por transform e orbe flutuando", async ({ page }) => {
    await page.goto("/");
    const particulas = page.locator("[data-particle]");
    // Criadas em `useEffect`, depois da hidratação: contar logo após o `goto` é uma corrida.
    await expect.poll(() => particulas.count()).toBeGreaterThanOrEqual(20);
    expect(await particulas.first().evaluate((el) => (el as HTMLElement).style.transform)).toContain("translate3d");
    const { antes, depois } = await transformsDoOrbe(page);
    expect(depois, "controle: o orbe deveria estar se movendo").not.toBe(antes);
  });

  test.describe("com prefers-reduced-motion: reduce", () => {
    test.use({ reducedMotion: "reduce" });

    test("não cria partículas", async ({ page }) => {
      await page.goto("/");
      await page.waitForTimeout(500);
      await expect(page.locator("[data-particle]")).toHaveCount(0);
    });

    test("o orbe do hero fica parado", async ({ page }) => {
      await page.goto("/");
      const { antes, depois } = await transformsDoOrbe(page);
      expect(depois).toBe(antes);
    });
  });
});
