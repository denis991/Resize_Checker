const fs = require('fs');
const path = process.argv[2];
let html = fs.readFileSync(path, 'utf8');

// Добавляем класс и защиту от копирования
html = html.replace('<body', '<body class="nocopy"');
html = html.replace('</body>', `
<script>
document.addEventListener('contextmenu',e=>e.preventDefault());
document.addEventListener('copy',e=>e.preventDefault());
document.addEventListener('keydown',e=>{
  if((e.ctrlKey||e.metaKey)&&e.key==='c')e.preventDefault();
  if(e.key==='F12')e.preventDefault();
  if((e.ctrlKey||e.metaKey)&&e.shiftKey&&(e.key==='I'||e.key==='J'))e.preventDefault();
});
document.addEventListener('selectstart',e=>e.preventDefault());
</script>
</body>`);

// Добавляем CSS
html = html.replace('</head>', `<style>
.nocopy{user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;}
</style></head>`);

fs.writeFileSync(path, html);
console.log('✅ Защита добавлена');