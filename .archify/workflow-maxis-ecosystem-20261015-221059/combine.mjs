import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const overview = fs.readFileSync(path.join(root, '.archify/workflow-maxis-ecosystem-20261015-221059/maxis-ecosystem.html'));
const prototype = fs.readFileSync(path.join(root, '.archify/workflow-maxis-uv-prototype-20261015-220618/maxis-uv-prototype.html'));
const output = path.join(root, 'MAXIS-ecosystem-and-prototype.html');
const payloads = JSON.stringify([overview.toString('base64'), prototype.toString('base64')]);

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>MAXIS | Ecosystem and Prototype Flowcharts</title>
  <meta name="description" content="Two interactive MAXIS flowcharts: a high-level circular water ecosystem and the detailed membrane and UV photocatalysis prototype.">
  <style>
    :root{color-scheme:dark;--bg:#0b1019;--panel:#111a27;--ink:#f1f6fb;--muted:#a6b6c8;--line:#283548;--accent:#8de4c6}
    *{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:78px}
    body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif}
    a{color:inherit}a:focus-visible{outline:3px solid var(--accent);outline-offset:5px}
    .topbar{position:sticky;top:0;z-index:5;border-bottom:1px solid var(--line);background:#0b1019f5;backdrop-filter:blur(12px)}
    .nav{max-width:1600px;margin:auto;min-height:66px;padding:12px 32px;display:flex;gap:24px;align-items:center;justify-content:space-between}
    .wordmark{font-weight:800;letter-spacing:.16em;text-decoration:none;color:var(--accent)}
    nav{display:flex;flex-wrap:wrap;gap:8px}nav a{font-size:13px;text-decoration:none;border:1px solid var(--line);padding:6px 13px;border-radius:30px}nav a:hover{border-color:var(--accent);color:var(--accent)}
    .intro,.section-heading,.footer{max-width:1600px;margin:auto;padding:32px}
    .intro{padding-top:45px;padding-bottom:22px}.eyebrow{font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);margin:0 0 10px}
    h1{font-size:clamp(28px,3vw,46px);line-height:1.15;letter-spacing:-.035em;margin:0 0 16px;font-weight:650}
    .lead{color:var(--muted);max-width:850px;margin:0;font-size:16px}
    .section-heading{display:flex;align-items:flex-start;gap:18px;padding-top:28px;padding-bottom:20px}
    .number{display:grid;place-items:center;flex:none;width:40px;height:40px;border-radius:12px;background:#16302b;color:var(--accent);font-size:13px;font-weight:750}
    h2{font-size:23px;line-height:1.3;letter-spacing:-.025em;margin:0 0 6px}.section-heading p{color:var(--muted);font-size:14px;margin:0;max-width:900px}
    .diagram-shell{border-block:1px solid var(--line);background:#0d1117}
    iframe{width:100%;height:600px;display:block;border:0;background:#0d1117}
    #prototype{margin-top:25px}.footer{font-size:12px;color:var(--muted);padding-block:24px 36px}.footer a{color:var(--accent)}
    @media(max-width:650px){.nav{padding:12px 18px;gap:12px}.intro,.section-heading,.footer{padding-inline:18px}.nav nav a{font-size:11px;padding:5px 9px}.intro{padding-top:30px}.section-heading{gap:12px}h2{font-size:20px}}
    @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
  </style>
</head>
<body>
  <header class="topbar"><div class="nav"><a class="wordmark" href="#top" aria-label="MAXIS home">MAXIS</a><nav aria-label="Flowchart sections"><a href="#ecosystem">01 · Ecosystem overview</a><a href="#prototype">02 · Detailed prototype</a></nav></div></header>
  <main id="top">
    <div class="intro"><p class="eyebrow">Hackathon concept · Two connected views</p><h1>Circular water recovery,<br>from ecosystem to prototype.</h1><p class="lead">The big picture first, then the engineering detail. Explore how waste-derived membranes, proposed UV-assisted photocatalysis, solar assistance and IoT work together in MAXIS.</p></div>
    <section id="ecosystem" aria-labelledby="ecosystem-title">
      <div class="section-heading"><span class="number" aria-hidden="true">01</span><div><h2 id="ecosystem-title">The whole ecosystem</h2><p>A simplified view of resource inputs, the two treatment innovations, quality validation and potential township reuse.</p></div></div>
      <div class="diagram-shell"><iframe id="ecosystem-frame" title="MAXIS high-level ecosystem flowchart" scrolling="no" allow="fullscreen" allowfullscreen></iframe></div>
    </section>
    <section id="prototype" aria-labelledby="prototype-title">
      <div class="section-heading"><span class="number" aria-hidden="true">02</span><div><h2 id="prototype-title">The prototype and MVP</h2><p>The detailed experimental system: membrane holder, controlled UV stage, water-quality gate, sensing, energy metering and test comparisons.</p></div></div>
      <div class="diagram-shell"><iframe id="prototype-frame" title="MAXIS detailed membrane and UV prototype flowchart" scrolling="no" allow="fullscreen" allowfullscreen></iframe></div>
    </section>
  </main>
  <footer class="footer">Proposed prototype. Photocatalytic performance, reduced chemical cleaning and safe non-potable reuse require suitable experimental validation. Both interactive Archify diagrams are included in this single file and work offline.</footer>
  <script>
    (() => {
      const payloads = ${payloads};
      const frames = [document.getElementById('ecosystem-frame'), document.getElementById('prototype-frame')];
      frames.forEach((frame, index) => {
        let pending = false;
        const fit = () => {
          if (pending) return;
          pending = true;
          requestAnimationFrame(() => {
            pending = false;
            try {
              const doc = frame.contentDocument;
              if (!doc || !doc.body) return;
              const height = Math.ceil(Math.max(doc.body.scrollHeight, doc.body.getBoundingClientRect().height) + 64);
              if (height > 0 && Math.abs(frame.getBoundingClientRect().height - height) > 1) frame.style.height = height + 'px';
            } catch (_) {}
          });
        };
        frame.addEventListener('load', () => {
          try {
            const doc = frame.contentDocument;
            doc.body.style.minHeight = '0';
            fit();
            const observer = new ResizeObserver(fit);
            observer.observe(doc.body);
            new MutationObserver(fit).observe(doc.documentElement, {attributes:true,attributeFilter:['data-theme','data-read','data-embed','data-present']});
            if (doc.fonts) doc.fonts.ready.then(fit);
          } catch (_) {}
        });
        frame.srcdoc = new TextDecoder().decode(Uint8Array.from(atob(payloads[index]), c => c.charCodeAt(0)));
        window.addEventListener('resize', fit);
      });
    })();
  </script>
</body>
</html>`;
fs.writeFileSync(output, html);
console.log(JSON.stringify({output, bytes:Buffer.byteLength(html), diagrams:2, selfContained:true}));
