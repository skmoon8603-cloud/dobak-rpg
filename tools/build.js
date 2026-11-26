// 배포용 index.html 만들기: 게임 코드를 한 덩어리로 감싸고(콘솔에서 P·NET 같은 변수에 못 닿게) 난독화한다.
// 사용: node tools/build.js <원본 index.html> <결과 index.html>   (javascript-obfuscator 필요)
const fs = require('fs');
const JO = require(process.env.JO_PATH || 'javascript-obfuscator');
const [src, out] = process.argv.slice(2);
let html = fs.readFileSync(src, 'utf8');
const re = /<script>([\s\S]*?)<\/script>/g;
const parts = []; let m;
while ((m = re.exec(html))) if (!/serviceWorker/.test(m[1])) parts.push({ full: m[0], code: m[1] });
if (parts.length < 2) throw new Error('scripts not found');
const guard = `document.addEventListener('contextmenu',e=>{if(!(e.target&&/INPUT|TEXTAREA/.test(e.target.tagName)))e.preventDefault();});
document.addEventListener('keydown',e=>{const k=(e.key||'').toLowerCase();if(k==='f12'||((e.ctrlKey||e.metaKey)&&e.shiftKey&&['i','j','c'].includes(k))||((e.ctrlKey||e.metaKey)&&k==='u')){e.preventDefault();e.stopPropagation();}},true);`;
const code = '(function(){\n' + guard + '\n' + parts.map((p) => p.code).join('\n;\n') + '\n})();';
const ob = JO.obfuscate(code, {
  compact: true, controlFlowFlattening: false, deadCodeInjection: false, debugProtection: false, selfDefending: false,
  identifierNamesGenerator: 'mangled-shuffled', renameGlobals: false, stringArray: true, stringArrayThreshold: 0.35,
  stringArrayEncoding: [], stringArrayWrappersCount: 1, splitStrings: false, transformObjectKeys: false, unicodeEscapeSequence: false,
  numbersToExpressions: false, simplify: true, target: 'browser',
}).getObfuscatedCode();
html = html.replace(parts[0].full, '<script>' + ob + '</script>');
for (const p of parts.slice(1)) html = html.replace(p.full, '');
fs.writeFileSync(out, html);
console.log('built', out, (html.length / 1024).toFixed(0) + 'KB');
