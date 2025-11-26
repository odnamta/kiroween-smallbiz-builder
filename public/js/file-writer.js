/**
 * File Writer Utility Module
 * Handles creation and download of generated files in the browser
 */

/**
 * Creates a Blob object from content with specified MIME type
 * @param {string} content - The file content
 * @param {string} mimeType - The MIME type for the file
 * @returns {Blob} Blob object ready for download
 */
function createFile(content, mimeType) {
  try {
    return new Blob([content], { type: mimeType });
  } catch (error) {
    console.error('Error creating file blob:', error);
    throw new Error('Failed to create file. Your browser may not support this feature.');
  }
}

/**
 * Triggers a browser download for the given blob
 * @param {Blob} blob - The blob to download
 * @param {string} filename - The name for the downloaded file
 */
function downloadFile(blob, filename) {
  try {
    // Check if browser supports download
    if (!window.URL || !window.URL.createObjectURL) {
      throw new Error('Browser does not support file downloads');
    }

    // Create temporary download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading file:', error);
    throw new Error('Failed to download file. Please try using a modern browser like Chrome, Firefox, or Safari.');
  }
}

/**
 * Creates and downloads an HTML file
 * @param {string} content - The HTML content
 * @param {string} filename - Optional filename (defaults to 'index.html')
 */
function createHTMLFile(content, filename = 'index.html') {
  try {
    const blob = createFile(content, 'text/html;charset=utf-8');
    downloadFile(blob, filename);
  } catch (error) {
    console.error('Error creating HTML file:', error);
    throw error;
  }
}

/**
 * Creates and downloads a CSS file
 * @param {string} content - The CSS content
 * @param {string} filename - Optional filename (defaults to 'styles.css')
 */
function createCSSFile(content, filename = 'styles.css') {
  try {
    const blob = createFile(content, 'text/css;charset=utf-8');
    downloadFile(blob, filename);
  } catch (error) {
    console.error('Error creating CSS file:', error);
    throw error;
  }
}

/**
 * Creates and downloads a JSON file
 * @param {object|string} content - The JSON content (object will be stringified)
 * @param {string} filename - Optional filename (defaults to 'menu.json')
 */
function createJSONFile(content, filename = 'menu.json') {
  try {
    // Convert object to JSON string if needed
    const jsonString = typeof content === 'string' ? content : JSON.stringify(content, null, 2);
    const blob = createFile(jsonString, 'application/json;charset=utf-8');
    downloadFile(blob, filename);
  } catch (error) {
    console.error('Error creating JSON file:', error);
    throw error;
  }
}

/**
 * Creates and downloads a text file
 * @param {string} content - The text content
 * @param {string} filename - Optional filename (defaults to 'instructions.txt')
 */
function createTextFile(content, filename = 'instructions.txt') {
  try {
    const blob = createFile(content, 'text/plain;charset=utf-8');
    downloadFile(blob, filename);
  } catch (error) {
    console.error('Error creating text file:', error);
    throw error;
  }
}

/**
 * Creates deployment instructions for small business owners
 * Returns a formatted text guide explaining how to deploy the generated website
 * @returns {string} Deployment instructions text
 */
function createDeploymentInstructions() {
  const instructions = `DEPLOYMENT INSTRUCTIONS
=======================

Congratulations! Your website has been generated successfully! 🎉

You now have three files:
- index.html (your landing page)
- styles.css (your website styling)
- menu.json (your menu data)

These files work together to create your complete website.


HOW TO DEPLOY YOUR WEBSITE
===========================

Option 1: Netlify (Recommended - Easiest!)
-------------------------------------------
Netlify is the easiest way to get your website online for free.

1. Go to https://app.netlify.com/drop
2. Drag and drop ALL THREE FILES (index.html, styles.css, menu.json) 
   into the upload area on the page
3. Wait a few seconds for the upload to complete
4. Netlify will give you a free website URL that looks like:
   https://your-site-name.netlify.app
5. Share this URL with your customers!

Optional: You can change your site name in Netlify settings to make 
it easier to remember.


Option 2: GitHub Pages (Free Forever)
--------------------------------------
GitHub Pages is great if you want to keep your website files organized.

1. Create a free GitHub account at https://github.com
2. Click the "+" button in the top right and select "New repository"
3. Name your repository (example: my-business-website)
4. Make sure it's set to "Public"
5. Click "Create repository"
6. Click "uploading an existing file"
7. Drag and drop all three files (index.html, styles.css, menu.json)
8. Click "Commit changes"
9. Go to your repository Settings > Pages
10. Under "Source", select "main" branch and click Save
11. Your website will be live at:
    https://your-username.github.io/repository-name

It may take a few minutes for your site to appear online.


Option 3: Other Free Hosting Services
--------------------------------------
You can also use these popular free hosting services:

Vercel:
- Go to https://vercel.com
- Sign up for free
- Click "Add New Project"
- Upload your three files
- Your site will be live in seconds!

Cloudflare Pages:
- Go to https://pages.cloudflare.com
- Sign up for free
- Click "Create a project"
- Upload your three files
- Get a free website URL instantly!

Firebase Hosting:
- Go to https://firebase.google.com
- Sign up and create a new project
- Follow their hosting setup guide
- Upload your three files

All of these services offer free hosting for small business websites.


UPDATING YOUR WEBSITE
======================
Need to change your menu prices or business information?

1. Go back to the website builder form
2. Make your changes (update prices, add new items, etc.)
3. Click "Generate Website" again
4. Download the new files
5. Upload the new files to your hosting service
   (They will automatically replace the old ones)

Your website will update with the new information!


IMPORTANT TIPS
==============
✓ Always upload ALL THREE files together (index.html, styles.css, menu.json)
✓ Keep the filenames exactly as they are - don't rename them
✓ If your website doesn't look right, try clearing your browser cache
✓ Make sure you're uploading to the root folder (not inside a subfolder)
✓ Your website works on all devices - phones, tablets, and computers


TROUBLESHOOTING
===============
Problem: My website looks plain (no colors or styling)
Solution: Make sure you uploaded the styles.css file along with index.html

Problem: My website shows "file not found" errors
Solution: Check that all three files are in the same folder on your hosting

Problem: Changes don't appear after updating
Solution: Clear your browser cache or try viewing in a private/incognito window

Problem: The website doesn't work on my phone
Solution: Your website is mobile-friendly! Try refreshing the page or clearing 
your browser cache on your phone


NEED MORE HELP?
===============
- Check your hosting service's help documentation
- Most hosting services have live chat support
- Make sure you're using a modern web browser (Chrome, Firefox, Safari, or Edge)


Thank you for using the Code-Free Website Builder!
Your business deserves a great online presence. 🚀`;

  return instructions;
}

/**
 * Creates and downloads a ZIP file containing all website files
 * @param {Object} files - Object with filename: content pairs
 * @param {string} zipFilename - Name for the ZIP file
 * @returns {Promise<void>}
 */
async function createZipFile(files, zipFilename = 'ghosthost-website.zip') {
  try {
    // Check if JSZip is available
    if (typeof JSZip === 'undefined') {
      console.warn('JSZip not loaded, falling back to individual downloads');
      return false;
    }

    const zip = new JSZip();
    
    // Add each file to the ZIP
    for (const [filename, content] of Object.entries(files)) {
      zip.file(filename, content);
    }
    
    // Generate the ZIP file
    const zipBlob = await zip.generateAsync({ 
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    });
    
    // Download the ZIP
    downloadFile(zipBlob, zipFilename);
    return true;
  } catch (error) {
    console.error('Error creating ZIP file:', error);
    return false;
  }
}

// Make functions available globally for non-module scripts
if (typeof window !== 'undefined') {
  window.createFile = createFile;
  window.downloadFile = downloadFile;
  window.createHTMLFile = createHTMLFile;
  window.createCSSFile = createCSSFile;
  window.createJSONFile = createJSONFile;
  window.createTextFile = createTextFile;
  window.createDeploymentInstructions = createDeploymentInstructions;
  window.createZipFile = createZipFile;
}
