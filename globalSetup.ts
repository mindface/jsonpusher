import { chromium, FullConfig } from "@playwright/test";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./src/lib/firebaseClient";

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch({headless: false});
  const context = await browser.newContext();
  const page = await context.newPage();

  const userCredential = await signInWithEmailAndPassword(
    auth,
    process.env.TEST_EMAIL ?? "",
    process.env.TEST_PASSWORD ?? "",
  );
  const idToken = await userCredential.user.getIdToken();

  await page.goto("http://localhost:3000/login");

  await page.fill('input[type="email"]', "test@test.com");
  await page.fill('input[type="password"]', "1234ewq1");
  await page.click('button.login-btn');

  await context.storageState({ path: "tests/storage/state.json" });
  await browser.close();
}

export default globalSetup;
