const fs = require('fs');

// Simple CSS minifier
function minifyCSS(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s*([{}:;,])\s*/g, '$1') // Remove spaces around special chars
        .replace(/\s+/g, ' ') // Collapse whitespace
        .replace(/;\}/g, '}') // Remove last semicolon
        .trim();
}

// Simple JS minifier (basic)
function minifyJS(js) {
    return js
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
        .replace(/\/\/.*/g, '') // Remove line comments
        .replace(/\s*([{}():;,=+\-*/<>!&|])\s*/g, '$1') // Remove spaces around operators
        .replace(/\s+/g, ' ') // Collapse whitespace
        .replace(/;\s*}/g, '}') // Clean up before braces
        .trim();
}

// Simple HTML minifier
function minifyHTML(html) {
    return html
        .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
        .replace(/>\s+</g, '><') // Remove whitespace between tags
        .replace(/\s+/g, ' ') // Collapse whitespace
        .trim();
}

console.log('🔨 Minifying files...\n');

// Minify CSS
try {
    const css = fs.readFileSync('index.css', 'utf8');
    const minifiedCSS = minifyCSS(css);
    fs.writeFileSync('index.min.css', minifiedCSS);
    console.log(`✅ index.css minified`);
    console.log(`   Original: ${(css.length / 1024).toFixed(2)} KB`);
    console.log(`   Minified: ${(minifiedCSS.length / 1024).toFixed(2)} KB`);
    console.log(`   Saved: ${(((css.length - minifiedCSS.length) / css.length) * 100).toFixed(1)}%\n`);
} catch (e) {
    console.error('❌ Error minifying CSS:', e.message);
}

// Minify JS
try {
    const js = fs.readFileSync('index.js', 'utf8');
    const minifiedJS = minifyJS(js);
    fs.writeFileSync('index.min.js', minifiedJS);
    console.log(`✅ index.js minified`);
    console.log(`   Original: ${(js.length / 1024).toFixed(2)} KB`);
    console.log(`   Minified: ${(minifiedJS.length / 1024).toFixed(2)} KB`);
    console.log(`   Saved: ${(((js.length - minifiedJS.length) / js.length) * 100).toFixed(1)}%\n`);
} catch (e) {
    console.error('❌ Error minifying JS:', e.message);
}

// Minify HTML
try {
    const html = fs.readFileSync('index.html', 'utf8');
    const minifiedHTML = minifyHTML(html);
    fs.writeFileSync('index.min.html', minifiedHTML);
    console.log(`✅ index.html minified`);
    console.log(`   Original: ${(html.length / 1024).toFixed(2)} KB`);
    console.log(`   Minified: ${(minifiedHTML.length / 1024).toFixed(2)} KB`);
    console.log(`   Saved: ${(((html.length - minifiedHTML.length) / html.length) * 100).toFixed(1)}%\n`);
} catch (e) {
    console.error('❌ Error minifying HTML:', e.message);
}

console.log('🎉 Minification complete!');
console.log('\n📁 Minified files created:');
console.log('   - index.min.html');
console.log('   - index.min.js');
console.log('   - index.min.css');
