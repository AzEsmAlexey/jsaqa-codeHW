describe("Github page tests", () => {
  let page;

  beforeAll(async () => {
    page = await browser.newPage();
  });

  afterAll(async () => {
    await page.close();
  });

  describe("Tests on initial page", () => {
    beforeEach(async () => {
      await page.goto("https://github.com/team");
    });

    test("The h1 header content'", async () => {
      await page.setDefaultTimeout(50000);
      const firstLink = await page.$("header div div a");
      await firstLink.click();
      await page.waitForSelector('h1');
      const title2 = await page.title();
      expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
    });

    test("The first link attribute", async () => {
      await page.setDefaultTimeout(60000);
      const actual = await page.$eval("a", link => link.getAttribute('href'));
      expect(actual).toEqual("#start-of-content");
    });

    test("The page contains Sign in button", async () => {
      await page.setDefaultTimeout(55000);
      const btnSelector = ".btn-large-mktg.btn-mktg";
      await page.waitForSelector(btnSelector, {
        visible: true,
      });
      const actual = await page.$eval(btnSelector, link => link.textContent.trim());
      expect(actual).toContain("Get started with Team");
    });
  });

  describe("Tests on other pages", () => {
    beforeEach(async () => {
      await page.goto("https://github.com/features");
    });

    test("Header content on features page", async () => {
      await page.setDefaultTimeout(50000);
      await page.waitForSelector('h1');
      const title = await page.title();
      expect(title).toEqual('Features | GitHub · GitHub');
    });

    test("Header content on pricing page", async () => {
      await page.setDefaultTimeout(55000);
      await page.goto("https://github.com/pricing");
      await page.waitForSelector('h1');
      const title = await page.title();
      expect(title).toEqual('Pricing · Plans for every developer · GitHub');
    });

    test("Header content on enterprise page", async () => {
      await page.setDefaultTimeout(57000);
      await page.goto("https://enterprise.github.com/");
      await page.waitForSelector('h1');
      const title = await page.title();
      expect(title).toEqual('The AI Powered Developer Platform. · GitHub');
    });
  });
});