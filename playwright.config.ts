import { defineConfig, devices } from "@playwright/test";

/**
 * Configuração E2E. O viewport de cada cenário é definido nos próprios testes
 * (matriz de 4 arquétipos), então o projeto só fixa o navegador.
 * `reuseExistingServer` evita subir um segundo `next dev` na porta 3000.
 */
export default defineConfig({
  testDir: "./e2e",
  outputDir: "./test-results/artifacts",
  fullyParallel: true,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
