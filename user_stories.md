# Project Issues & User Stories

This document tracks all issues and user stories for the project, organized by section and file/folder location.

--

### User Stories
---

### User Stories

#### 1. Home page/Welcome page (#1)
**Status:** Backlog  
**Owner:**

**Description:**
> As a User, I need to see a welcome page when I open the page so that I can begin browsing.

**Details and Assumptions:**
- The homepage consists of the welcome message and branding.
- There is a get started button. When clicked it should redirect to the listing page.

**Acceptance Criteria (Gherkin):**
- Given that when I first open the page I am on the welcome page.
- When I click the get started button.
- Then I should be redirected to the listing page

---

#### 2. Listing Page (#2)
**Status:** Backlog  
**Owner:**

**Description:**
> As a User, I need to see the listing page so that I can browse through the listed items that are being given away.

**Details and Assumptions:**
- Items listed should show the name, image and a description.
- The items name/image should have a link to the details page.

**Acceptance Criteria (Gherkin):**
- Given I land on the listing page from the home page
- When I view available items
- Then I see the gifts listed with their names, images, description and be able to click a link and go to the details page.

---

#### 3. Login page (#3)
**Status:** Backlog  
**Owner:**

**Description:**
> As a Logger/User, I need to login with my email and password so that I can view the items securely and be able to come back to my profile whenever I want.

**Details and Assumptions:**
- Before reaching the details page, users must log in or create an account.
- Authentication is required to protect user data and enable personalized features.
- After authentication, users can access the gift details and their profile.
- Failed logins show error messages.

**Acceptance Criteria (Gherkin):**
- Given I am a new or existing user.
- When I attempt to access the details page I should be prompted to log in with correct credentials before proceeding.
- Then After Authentication I should access the details page and view the gift details securely.

---

#### 4. Details Page (#4)
**Status:** Backlog  
**Owner:**

**Description:**
> As a Logged in user, I need to view the details of a specific gift so that I can learn more about it and interact with the comments.

**Details and Assumptions:**
- Details page includes descriptions, conditions and age of the gift.
- The details page includes a comment section for communication.
- Only authenticated users can access this page.

**Acceptance Criteria (Gherkin):**
- Given I logged in successfully.
- When I click on the details of a product.
- Then I should be redirected to the details page
- And from there I should see the details of that specific gift
- And be able to interact with the comment section.

---

#### 5. Navigation Bar (#5)
**Status:** Backlog  
**Owner:**

**Description:**
> As a User, I need a nav bar with key links so that I can easily move between pages.

**Details and Assumptions:**
- Nav bar includes Home, Listings, Search, Login/Register.
- After Login it displays user's info and Logout option.

**Acceptance Criteria (Gherkin):**
- Given I am logged in
- When I view the nav bar
- Then I should see the links for Home, Listings, Search, Login/Register

---

#### 6. Search and filters (#6)
**Status:** Backlog  
**Owner:**

**Description:**
> As a User, I need to search and filter gift listings so that I can easily match items that match my needs.

**Details and Assumptions:**
- Search filters include category, condition, item age.
- Results update based on the filtered criteria.

**Acceptance Criteria (Gherkin):**
- Given I am on the search bar.
- When I enter a key word or apply filters.
- Then I see only the listings that match my search criteria.

---

#### 7. Profile Page (#7)
**Status:** Backlog  
**Owner:**

**Description:**
> As a logged in User, I need to view and edit my profile so that I can manage my personal information.

**Details and Assumptions:**
- Profile page shows first name, last name and email.
- Users can update their details.

**Acceptance Criteria (Gherkin):**
- Given I am logged in.
- When I navigate to my profiles page.
- Then I see my personal details displayed
- Given I am on my profile page
- When I update my first name and save changes
- Then the new first name is stored in the database
- And the navbar updates to display the new name

---

#### 8. Logout page (#8)
**Status:** Backlog  
**Owner:**

**Description:**
> As a Logged-in User, I need to logout securely so that my sessions end and my account stays protected.

**Details and Assumptions:**
- Logout clears my JWT token/session.
- Navbar reverts to default state.

**Acceptance Criteria (Gherkin):**
- Given I am logged in.
- When I click the logout button.
- Then my session ends and I see login/Register in the navbar.

---

#### 9. Authentication (#9)
**Status:** Backlog  
**Owner:**

**Description:**
> As a Developer, I need to restrict access to certain pages so that only authenticated users can access.

**Details and Assumptions:**
- Details and profile pages require login.
- Unauthorized users are redirected.

**Acceptance Criteria (Gherkin):**
- Given I am not logged in
- When I attempt to access the profile page
- Then I am redirected to the login page
- Given I am not logged in
- When I attempt to access the gift details page
- Then I am redirected to the login page

---

#### 10. Registration (#10)
**Status:** Backlog  
**Owner:**

**Description:**
> As a new user, I need to register with my email, name, and password so that I can create an account and log in later.

**Details and Assumptions:**
- Passwords are hashed and stored securely.
- Registration redirects to login.

**Acceptance Criteria (Gherkin):**
- Given I am on the registration page
- When I submit valid registration details
- Then my account is created, and I am redirected to the login page
- Given I am on the registration page
- When I submit invalid or incomplete details
- Then I see an error message and remain on the registration page

---
