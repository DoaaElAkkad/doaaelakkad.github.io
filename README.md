# Enhanced CV Project for Doaa Elakkad

This repository contains an enhanced version of Doaa Elakkad's CV, including both a Microsoft Word document and a responsive website version designed to be hosted on GitHub Pages.

## Project Overview

This project includes:

1. An enhanced CV in Microsoft Word (.docx) format with improved content and professional formatting
2. A responsive website version of the CV built with HTML, CSS, and JavaScript
3. GitHub Pages configuration for easy hosting

## Repository Structure

```
cv_project/
├── docs/                      # GitHub Pages website files
│   ├── assets/                # Website assets
│   │   ├── css/               # CSS stylesheets
│   │   │   └── style.css      # Main stylesheet
│   │   └── js/                # JavaScript files
│   │       └── main.js        # Main JavaScript functionality
│   ├── index.html             # Website homepage
│   ├── .nojekyll              # Prevents GitHub Pages from using Jekyll
│   └── README.md              # Website-specific documentation
├── Doaa_Elakkad_Enhanced_CV.docx  # Enhanced CV in Word format
├── README.md                  # This file
└── [other project files]      # Analysis and development files
```

## Features

### Enhanced Word Document
- Professional formatting with clear section headings
- Improved content with quantifiable achievements
- Consistent styling throughout the document
- Optimized descriptions for clarity and impact

### Responsive Website
- Modern, clean design that works on all devices (desktop, tablet, mobile)
- Interactive navigation with smooth scrolling
- Timeline-based work experience presentation
- Expandable sections for certifications
- Responsive layout that adapts to different screen sizes
- Visual skill and language proficiency indicators

## Hosting on GitHub Pages

To host this CV website on GitHub Pages:

1. **Fork or clone this repository** to your GitHub account
2. **Go to repository settings** on GitHub
3. **Navigate to the "Pages" section** in the left sidebar
4. **Configure the source**:
   - Select "Deploy from a branch" as the source
   - Choose "main" (or "master") as the branch
   - Select "/docs" as the folder
   - Click "Save"
5. **Wait for deployment** (usually takes a minute or two)
6. **Access your website** at `https://[your-username].github.io/[repository-name]/`

## Local Development

To work with this project locally:

1. **Clone the repository**:
   ```
   git clone https://github.com/[username]/[repository-name].git
   cd [repository-name]
   ```

2. **View the website locally**:
   - Open `docs/index.html` in your web browser

3. **Edit the Word document**:
   - Open `Doaa_Elakkad_Enhanced_CV.docx` with Microsoft Word or compatible software

4. **Make changes to the website**:
   - Edit the HTML, CSS, and JavaScript files in the `docs` directory
   - Refresh your browser to see changes

5. **Commit and push changes**:
   ```
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```

## Customization

### Changing Colors
The website uses a color scheme defined in CSS variables. To change the colors:
1. Open `docs/assets/css/style.css`
2. Locate the `:root` section at the top
3. Modify the color values as desired

### Adding New Sections
To add new sections to the website:
1. Add a new section in `docs/index.html` following the existing pattern
2. Update the navigation menu in the same file
3. Add any necessary CSS styles in `docs/assets/css/style.css`

## License

This project is provided as a template and can be freely used and modified for personal use.

## Contact

For questions or assistance with this template, please contact the repository owner.
