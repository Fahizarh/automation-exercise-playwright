import { test, expect } from "@playwright/test";
const { RegistrationPage } = require("../pages/RegistrationPage");
const { ContactPage } = require("../pages/ContactPage");
const { ProductPage } = require("../pages/ProductPage");

test.describe("Automation Exercise", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const userRegistration = new RegistrationPage(page);
    // Using the Home Page Slider to verify home page is visible
    await expect(userRegistration.homePageSlider).toBeVisible();
  });

  test("Register User", async ({ page }) => {
    const userRegistration = new RegistrationPage(page);

    await userRegistration.logInOrSignUp.click();
    await expect(userRegistration.newUserSignUpText).toBeVisible();

    // Sign Up with Name and Email Address
    const signUpDetails = {
      username: "Test User",
      email: "alpha.testing05@domain.com",
    };
    await userRegistration.signUp(signUpDetails.username, signUpDetails.email);
    await expect(userRegistration.accountInformationText).toBeVisible();

    // Define the test data
    const testData = {
      username: "Test User",
      password: "password123",
      day: "15",
      month: "March",
      year: "1990",
      firstname: "John",
      lastname: "Doe",
      company: "Test Corp",
      address: "123 Test St",
      country: "United States",
      state: "California",
      city: "Los Angeles",
      zipcode: "90001",
      phoneNumber: "123-456-7890",
    };

    await userRegistration.registration(
      testData.username,
      testData.password,
      testData.day,
      testData.month,
      testData.year,
      testData.firstname,
      testData.lastname,
      testData.company,
      testData.address,
      testData.country,
      testData.state,
      testData.city,
      testData.zipcode,
      testData.phoneNumber
    );

    await userRegistration.createAccountButton.click();
    await expect(userRegistration.accountCreatedText).toBeVisible();
    await userRegistration.continueButton.click();
    await userRegistration.isLoggedIn(testData.username);
    await userRegistration.deleteAccount.click();
    await expect(userRegistration.accountDeletedText).toBeVisible();
  });

  test("Login with correct email and password", async ({ page }) => {
    const userRegistration = new RegistrationPage(page);

    await userRegistration.logInOrSignUp.click();

    const logInDetails = {
      email: "user.qa_test02@domain.com",
      password: "TestPassword@123",
      username: "Test User",
    };
    await expect(userRegistration.logIntoAccountText).toBeVisible();
    await userRegistration.logIn(logInDetails.email, logInDetails.password);
    await userRegistration.loginButton.click();
    await userRegistration.isLoggedIn(logInDetails.username);
  });

  test("Login with incorrect email and password", async ({ page }) => {
    const userRegistration = new RegistrationPage(page);

    await userRegistration.logInOrSignUp.click();

    const logInDetails = {
      email: "usertest@domain.com",
      password: "TestPassword",
    };
    await expect(userRegistration.logIntoAccountText).toBeVisible();
    await userRegistration.logIn(logInDetails.email, logInDetails.password);
    await userRegistration.loginButton.click();
    await expect(userRegistration.incorrectLoginError).toBeVisible();
  });

  test("Logout user", async ({ page }) => {
    const userRegistration = new RegistrationPage(page);

    await userRegistration.logInOrSignUp.click();

    const logInDetails = {
      email: "user.qa_test02@domain.com",
      password: "TestPassword@123",
      username: "Test User",
    };
    await expect(userRegistration.logIntoAccountText).toBeVisible();
    await userRegistration.logIn(logInDetails.email, logInDetails.password);
    await userRegistration.loginButton.click();
    await userRegistration.isLoggedIn(logInDetails.username);
    await userRegistration.logOut.click();
    await expect(page).toHaveURL("/login");
  });

  test("Register user with existing email", async ({ page }) => {
    const userRegistration = new RegistrationPage(page);

    await userRegistration.logInOrSignUp.click();

    await expect(userRegistration.newUserSignUpText).toBeVisible();

    // Sign Up with Name and existing Email Address
    const signUpDetails = {
      username: "Test User",
      email: "user.qa_test02@domain.com",
    };
    await userRegistration.signUp(signUpDetails.username, signUpDetails.email);
    await expect(userRegistration.emailExistsError).toBeVisible();
  });

  test("Contact Us Form", async ({ page }) => {
    const userRegistration = new RegistrationPage(page);
    const contactForm = new ContactPage(page);

    const contactFormDetails = {
      name: "Faizah Salami",
      email: "faizahsalami1@gmail.com",
      subject: "Making Inquiry About Website",
      message:
        " I am writing this message to make inquiries about the website.",
    };

    await contactForm.contactUs.click();
    await expect(contactForm.getInTouchText).toBeVisible();
    await contactForm.fillContactForm(
      contactFormDetails.name,
      contactFormDetails.email,
      contactFormDetails.subject,
      contactFormDetails.message
    );
    await expect(contactForm.successAlert).toBeVisible();
    await contactForm.homeButton.click();
    await expect(page).toHaveURL("/");
  });

  test("Verify Test Cases Page", async ({ page }) => {
    const userRegistration = new RegistrationPage(page);
    await userRegistration.testCases.click();
    await expect(page).toHaveURL("/test_cases");
  });

  test("Verify All Products and Product Detail Page", async ({ page }) => {
    const productpage = new ProductPage(page);

    await productpage.products.click();
    await expect(page).toHaveURL("/products");
    await expect(productpage.productsList).toBeVisible();
    await productpage.firstProductDetail();
  });

  test("Search Product", async ({ page }) => {
    const productpage = new ProductPage(page);
    const productName = "Blue Top";

    await productpage.products.click();
    await expect(page).toHaveURL("/products");
    await expect(productpage.productsList).toBeVisible();
    await productpage.searchProduct(productName);
  });

  test("Verify Subscription in Home Page", async ({ page }) => {
    const productpage = new ProductPage(page);
    const emailAddress = "testemail@yahoo.com";

    await productpage.footer.scrollIntoViewIfNeeded();
    await expect(productpage.subscriptionText).toBeVisible();
    await productpage.subscribe(emailAddress);
  });
});
