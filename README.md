# Lady Natalie - New Tab Chrome Extension for Visualization

**Lady Natalie** is an elegant, React-based Chrome Extension that transforms the standard new tab into a personalized visualization tool. Designed for **wedding planners** and **brides-to-be**, the extension features a beautiful display of wedding dress images, a dynamic **to-do list**, and a **countdown timer** to the wedding day. This Chrome Extension is highly customizable, allowing users to modify images, tasks, and the countdown to suit their needs, making it not only wedding-focused but adaptable for any user.

## ✨ Key Features

- **Wedding Dress Visualization**:
  - A **high-resolution image** of a wedding dress is displayed on the new tab by default.
  - Users can easily **upload their own images** to replace the default, personalizing their new tab page with an image that resonates with their style or any visualization they want.
  
- **Customizable To-Do List**:
  - A pre-filled **wedding planning** to-do list appears on the page, but users can add, edit, or delete items.
  - Tasks such as booking venues, sending invitations, or dress fittings can be modified, making the list relevant for any kind of event or personal planning.
  - Each task can be checked off, providing a satisfying sense of progress toward the event.

- **Countdown to the Wedding Date**:
  - A fully customizable **countdown** timer is integrated into the page, allowing users to input their wedding date.
  - The extension will automatically calculate and display the number of days left until the big day, providing an elegant and personal touch to the new tab experience.

- **Fully Customizable for Any Event**:
  - Though designed for weddings, the extension is flexible. Users can replace the default **visualization image** and **to-do list** with elements relevant to any event (e.g., birthday parties, corporate events, or even daily tasks).

## 🛠️ Technologies Used

This project leverages cutting-edge technologies and tools to create a smooth and efficient development experience, ensuring high performance and easy customization.

### 1. **React (v18)**

- **Component-Based Architecture**: React’s modular architecture enables you to break down the user interface into reusable components like `Visualization`, `ToDoList`, and `Countdown`. This enhances maintainability and scalability.
- **Fast & Responsive UI**: React’s virtual DOM ensures that the UI updates quickly when the user changes the wedding dress image, modifies the to-do list, or updates the countdown.
- **State Management**: The state of tasks, countdown date, and the selected image is managed within React’s local state and saved persistently through **localStorage**, providing a smooth experience even after browser restarts.

### 2. **Chrome Extensions API**

- **Manifest V3**: Utilizes the latest **Manifest V3** format for building Chrome Extensions, ensuring security and improved performance.
- **New Tab API**: Customizes the default new tab page using the Chrome Extension API, allowing you to completely replace the standard tab with your custom React application.
- **Storage API**: The extension uses Chrome’s **localStorage** to store users’ data locally, meaning the user’s customizations (image, to-do list, countdown) will persist across sessions without any external database requirements.

### 3. **Yarn Package Manager**

- **Dependency Management**: Yarn ensures that all dependencies are installed quickly and reliably. It guarantees a fast and consistent install process, vital for maintaining the project’s structure.
- **Workspaces**: For multi-module extensions, Yarn’s workspace support is essential in managing multiple dependencies across shared code.

### 4. **WebPack**

- **Code Bundling**: WebPack is used to bundle all React components, images, and stylesheets into a production-ready extension. It optimizes the output, ensuring that the extension loads quickly and runs smoothly.
- **Hot Reloading**: During development, WebPack’s hot module replacement (HMR) allows you to see changes instantly without having to reload the extension manually.

### 5. **Sass (SCSS)**

- **Custom Styling**: All custom styles, including the design for the wedding visualization and the to-do list, are written in **Sass**, which makes it easier to manage styles in a scalable way.
- **Variables and Mixins**: Sass enables the use of variables, nested rules, and mixins, making the design more customizable and maintainable in the long term.

### 6. **ESLint + Prettier**

- **Code Quality**: The project uses **ESLint** and **Prettier** to enforce coding standards, ensuring that the codebase remains clean and readable.
- **Error Prevention**: With linting tools, potential errors in the JavaScript code are caught early, reducing bugs and improving development speed.

## 🚀 Installation Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/lady-natalie-chromatin-tab.git
cd lady-natalie-chromatin-tab
```

### Step 2: Install Dependencies

Ensure that you have **Yarn** installed globally. If you don't have Yarn, install it by running:

```bash
npm install -g yarn
```

Afterward, run:

```bash
yarn install
```

### Step 3: Build the Extension

To bundle the React app into a format that can be loaded into Chrome:

```bash
yarn build
```

This command will output the production files into the `build/` directory.

### Step 4: Load the Extension into Chrome

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer Mode** by toggling it on in the top-right corner.
3. Click **Load unpacked** and select the `build/` folder that was generated during the build process.
4. The **Lady Natalie** extension will now be installed and visible whenever a new tab is opened.

### Step 5: Customization

- **Change Visualization Image**: Click the settings gear on the new tab page to upload a custom image that will replace the default wedding dress visualization.
  
- **Edit To-Do List**: Add, remove, or update items in the pre-populated wedding tasks list to suit your own planning needs. These changes will be stored and preserved across sessions.

- **Set Countdown**: Input your wedding date or any important event, and the extension will display a live countdown showing the days remaining.

## 🔧 Future Enhancements

- **Multiple Image Galleries**: Allow users to create a rotating gallery of images that can change periodically on the new tab.
- **Advanced Theme Customization**: Provide users with additional controls over the page’s color scheme, fonts, and layout.
- **Google Calendar Integration**: Synchronize the to-do list items with **Google Calendar** to help users track their wedding planning deadlines seamlessly.

## 🛡 License

This project is licensed under the MIT License. 