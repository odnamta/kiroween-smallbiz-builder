# Requirements Document

## Introduction

This document specifies the requirements for a Code-Free Website Builder designed for small businesses. The system enables business owners with no coding skills to generate professional landing pages by filling out a simple form. The builder produces static HTML/CSS websites with customizable themes and responsive layouts.

## Glossary

- **Website Builder**: The complete system that collects business information and generates static website files
- **Input Form**: The HTML form located at /public/index.html that collects business information from users
- **Generator Script**: The JavaScript code that processes form data and creates website files
- **Base Template**: The HTML template file that serves as the foundation for generated websites
- **Theme**: A visual style configuration (Classic or Kiroween) that determines the appearance of generated websites
- **Generated Files**: The output files (index.html, styles.css, menu.json) created in the /generated directory
- **Static Website**: A website consisting only of HTML, CSS, and JavaScript files without server-side processing or databases

## Requirements

### Requirement 1

**User Story:** As a small business owner with no coding skills, I want to fill out a simple form with my business information, so that the system can auto-generate a professional landing page for me.

#### Acceptance Criteria

1. THE Input Form SHALL collect business_name as a text input field
2. THE Input Form SHALL collect business_type from a predefined list including coffee_shop, bakery, barber_shop, food_stall, laundry_service, and photographer_creator
3. THE Input Form SHALL collect tagline as a text input field
4. THE Input Form SHALL collect short_description as a textarea input field
5. THE Input Form SHALL collect contact_whatsapp as a text input field
6. THE Input Form SHALL collect instagram_handle as a text input field
7. THE Input Form SHALL collect menu_items as a dynamic list where each item contains name and price fields
8. THE Input Form SHALL collect theme_choice from two options: classic or kiroween

### Requirement 2

**User Story:** As a small business owner, I want the system to generate my website files automatically when I submit the form, so that I can immediately see my professional landing page.

#### Acceptance Criteria

1. WHEN the user submits the Input Form, THE Generator Script SHALL execute and process all collected data
2. WHEN the Generator Script executes, THE Website Builder SHALL read the Base Template file
3. WHEN the Generator Script processes data, THE Website Builder SHALL inject the user-provided business information into the Base Template
4. WHEN generation completes, THE Website Builder SHALL create an index.html file in the /generated directory
5. WHEN generation completes, THE Website Builder SHALL create a styles.css file in the /generated directory based on the selected theme
6. WHEN generation completes, THE Website Builder SHALL create a menu.json file in the /generated directory containing the menu items data
7. WHEN generation completes, THE Website Builder SHALL create a deployment-instructions.txt file in the /generated directory with step-by-step deployment guidance

### Requirement 3

**User Story:** As a small business owner, I want my generated website to look professional with my chosen theme, so that my customers see a polished online presence.

#### Acceptance Criteria

1. WHERE theme_choice is "classic", THE Website Builder SHALL generate a styles.css file with classic theme styling
2. WHERE theme_choice is "kiroween", THE Website Builder SHALL generate a styles.css file with kiroween theme styling
3. THE Website Builder SHALL ensure generated websites display business_name prominently in the header
4. THE Website Builder SHALL ensure generated websites display the tagline below the business name
5. THE Website Builder SHALL ensure generated websites display the short_description in a dedicated section
6. THE Website Builder SHALL ensure generated websites display contact_whatsapp as a clickable WhatsApp link
7. THE Website Builder SHALL ensure generated websites display instagram_handle as a clickable Instagram link
8. THE Website Builder SHALL ensure generated websites display all menu_items with their names and prices in a formatted list

### Requirement 4

**User Story:** As a small business owner accessing the website from my phone, I want the generated landing page to look good on mobile devices, so that my customers can view it on any device.

#### Acceptance Criteria

1. THE Website Builder SHALL generate styles.css with mobile-first responsive layout rules
2. THE Website Builder SHALL ensure generated websites adapt their layout for screen widths below 768 pixels
3. THE Website Builder SHALL ensure generated websites maintain readability on screens ranging from 320 pixels to 1920 pixels wide
4. THE Website Builder SHALL ensure all interactive elements in generated websites have touch-friendly sizes of at least 44 pixels

### Requirement 5

**User Story:** As a system administrator, I want the generator to overwrite existing files, so that users can regenerate their websites with updated information.

#### Acceptance Criteria

1. WHEN the Generator Script creates index.html, THE Website Builder SHALL overwrite any existing index.html file in the /generated directory
2. WHEN the Generator Script creates styles.css, THE Website Builder SHALL overwrite any existing styles.css file in the /generated directory
3. WHEN the Generator Script creates menu.json, THE Website Builder SHALL overwrite any existing menu.json file in the /generated directory

### Requirement 6

**User Story:** As a developer maintaining this system, I want the codebase to be simple and framework-free, so that it remains easy to understand and modify.

#### Acceptance Criteria

1. THE Website Builder SHALL use only HTML, CSS, and JavaScript without external frameworks
2. THE Website Builder SHALL maintain code with clear variable names and logical structure
3. THE Website Builder SHALL include comments explaining key functionality in the Generator Script
4. THE Website Builder SHALL organize files in a clear directory structure with /public and /generated directories

### Requirement 7

**User Story:** As a user, I want to use the website builder without creating an account, so that I can quickly generate my landing page.

#### Acceptance Criteria

1. THE Website Builder SHALL operate without requiring user authentication
2. THE Website Builder SHALL operate without requiring user registration
3. THE Website Builder SHALL function entirely as a static application without server-side processing
4. THE Website Builder SHALL function without requiring database connectivity

### Requirement 8

**User Story:** As a small business owner, I want to add multiple menu items with different names and prices, so that I can showcase my complete product offering.

#### Acceptance Criteria

1. THE Input Form SHALL provide an "Add Menu Item" button that creates new menu item input fields
2. WHEN the user clicks "Add Menu Item", THE Input Form SHALL display a new set of name and price input fields
3. THE Input Form SHALL allow users to add a minimum of 1 menu item
4. THE Input Form SHALL allow users to add at least 20 menu items
5. THE Input Form SHALL provide a way to remove individual menu items before submission

### Requirement 9

**User Story:** As a small business owner, I want to use a preset template for my business type, so that I can quickly fill in my form with relevant default content.

#### Acceptance Criteria

1. THE Website Builder SHALL define presets for each business_type containing default_tagline, default_short_description, and default_menu_items
2. THE Input Form SHALL display a "Use Preset" button near the business_type dropdown
3. WHEN the user clicks "Use Preset", THE Input Form SHALL populate the tagline field with the default_tagline for the selected business_type
4. WHEN the user clicks "Use Preset", THE Input Form SHALL populate the short_description field with the default_short_description for the selected business_type
5. WHEN the user clicks "Use Preset" for menu-based business types, THE Input Form SHALL replace current menu items with default_menu_items for that business_type
6. THE Input Form SHALL display helper text stating "You can customize these after applying the preset"
7. THE Input Form SHALL allow users to edit all fields after applying a preset
8. THE Website Builder SHALL define coffee_shop preset with coffee-related tagline, description, and menu items
9. THE Website Builder SHALL define bakery preset with bakery-related tagline, description, and menu items
10. THE Website Builder SHALL define barber_shop preset with barber-related tagline, description, and service items
11. THE Website Builder SHALL define food_stall preset emphasizing affordable food in Southeast Asia with relevant menu items
12. THE Website Builder SHALL define laundry_service preset emphasizing fast turnaround and clean clothes with service items
13. THE Website Builder SHALL define photographer_creator preset emphasizing content creation, photo packages, and session offerings

### Requirement 10

**User Story:** As a small business owner with limited technical knowledge, I want clear instructions on how to deploy my generated website, so that I can publish it online without confusion.

#### Acceptance Criteria

1. THE Website Builder SHALL generate a deployment-instructions.txt file in the /generated directory
2. THE deployment-instructions.txt file SHALL contain step-by-step instructions for deploying to static hosting services
3. THE deployment-instructions.txt file SHALL include instructions for Netlify drag-and-drop deployment
4. THE deployment-instructions.txt file SHALL include instructions for GitHub Pages deployment
5. THE deployment-instructions.txt file SHALL reference the generated index.html, styles.css, and menu.json files by name
6. THE deployment-instructions.txt file SHALL use simple, non-technical language appropriate for users with no coding experience
7. THE deployment-instructions.txt file SHALL be formatted with clear sections and numbered steps
