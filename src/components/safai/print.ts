function escapePdf(value: string): string {
  return value.replace(/[^\x20-\x7E]/g, " ").replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function colWidths(labels: string[], total: number): number[] {
  const weight = labels.map((label) => {
    if (/ward|date|code/i.test(label)) return 1.15;
    if (/zone|name|no/i.test(label)) return 1.55;
    return 1;
  });
  const sum = weight.reduce((a, b) => a + b, 0);
  return weight.map((w) => (w / sum) * total);
}

function clip(value: string, width: number, size: number): string {
  const max = Math.max(1, Math.floor((width - 10) / (size * 0.52)));
  const clean = escapePdf(value);
  return clean.length > max ? `${clean.slice(0, max - 1)}.` : clean;
}

export function downloadPdf(filename: string, title: string, columns: string[], rows: string[][]) {
  const pageW = 595;
  const pageH = 842;
  const margin = 22;
  const tableW = pageW - margin * 2;
  const widths = colWidths(columns, tableW);
  const rowH = 18;
  const headH = 22;
  const perPage = 34;
  const chunks: string[][][] = [];
  const source = rows.length ? rows : [];
  for (let i = 0; i < Math.max(source.length, 1); i += perPage) {
    chunks.push(source.slice(i, i + perPage));
  }

  const objects: string[] = [];
  const kids: string[] = [];
  let id = 1;
  const fontId = id++;
  const boldId = id++;
  objects[fontId] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
  objects[boldId] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";

  chunks.forEach((pageRows, pageIndex) => {
    const pageId = id++;
    const contentId = id++;
    kids.push(`${pageId} 0 R`);
    const ops: string[] = [];
    ops.push(`0.08 0.16 0.42 rg 0 764 ${pageW} 78 re f`);
    ops.push(`0.13 0.72 0.55 rg 0 758 ${pageW} 6 re f`);
    ops.push(`1 1 1 rg BT /F2 18 Tf 1 0 0 1 22 808 Tm (Safai Nirikshan) Tj ET`);
    ops.push(`0.82 0.88 1 rg BT /F1 10 Tf 1 0 0 1 22 790 Tm (Nagarpalika Kharkhoda Kshetra) Tj ET`);
    ops.push(`1 1 1 rg BT /F2 11 Tf 1 0 0 1 390 798 Tm (${escapePdf(title)}) Tj ET`);

    let y = 724;
    let x = margin;
    ops.push(`0.20 0.32 0.62 rg ${margin} ${y} ${tableW} ${headH} re f`);
    columns.forEach((label, i) => {
      ops.push(`1 1 1 rg BT /F2 8 Tf 1 0 0 1 ${x + 3} ${y + 7} Tm (${clip(label, widths[i], 8)}) Tj ET`);
      x += widths[i];
    });
    y -= rowH;

    if (!pageRows.length) {
      ops.push(`0.96 0.97 0.99 rg ${margin} ${y} ${tableW} ${rowH} re f`);
      ops.push(`0.35 0.4 0.5 rg BT /F1 10 Tf 1 0 0 1 ${margin + 8} ${y + 7} Tm (No reports in this range.) Tj ET`);
    }

    pageRows.forEach((row, rowIndex) => {
      const bg = rowIndex % 2 === 0 ? "0.96 0.97 0.99" : "1 1 1";
      ops.push(`${bg} rg ${margin} ${y} ${tableW} ${rowH} re f`);
      ops.push(`0.86 0.89 0.93 RG 0.4 w ${margin} ${y} m ${margin + tableW} ${y} l S`);
      let cx = margin;
      row.forEach((cell, i) => {
        const mark = cell === "●" || cell === "○";
        if (mark) {
          const cx0 = cx + widths[i] / 2;
          const cy = y + rowH / 2;
          if (cell === "●") ops.push(`0.13 0.65 0.38 rg ${cx0} ${cy} 5 0 360 arc f`);
          else ops.push(`0.62 0.68 0.76 RG 1.2 w ${cx0} ${cy} 4.5 0 360 arc S`);
        } else {
          const percent = /^(\d+(?:\.\d+)?)%$/.exec(cell);
          const tone = percent
            ? Number(percent[1]) >= 80
              ? "0.10 0.55 0.32"
              : Number(percent[1]) >= 60
                ? "0.72 0.48 0.05"
                : "0.75 0.18 0.18"
            : "0.12 0.16 0.28";
          ops.push(`${tone} rg BT /F1 8 Tf 1 0 0 1 ${cx + 3} ${y + 5} Tm (${clip(cell, widths[i], 8)}) Tj ET`);
        }
        cx += widths[i];
      });
      y -= rowH;
    });

    ops.push(`0.45 0.5 0.6 rg BT /F1 8 Tf 1 0 0 1 22 24 Tm (Nagarpalika Kharkhoda Kshetra  ·  Safai Nirikshan  ·  Last 60 days) Tj ET`);
    ops.push(`0.45 0.5 0.6 rg BT /F1 8 Tf 1 0 0 1 500 24 Tm (Page ${pageIndex + 1} / ${chunks.length}) Tj ET`);
    const stream = ops.join("\n");
    objects[contentId] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
    objects[pageId] = `<< /Type /Page /Parent PAGES 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Contents ${contentId} 0 R /Resources << /Font << /F1 ${fontId} 0 R /F2 ${boldId} 0 R >> >> >>`;
  });

  const pagesId = id++;
  objects[pagesId] = `<< /Type /Pages /Count ${kids.length} /Kids [${kids.join(" ")}] >>`;
  const catalogId = id++;
  objects[catalogId] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [];
  for (let i = 1; i <= catalogId; i++) {
    offsets[i] = pdf.length;
    pdf += `${i} 0 obj\n${(objects[i] ?? "").replaceAll("PAGES", String(pagesId))} \nendobj\n`;
  }
  const xref = pdf.length;
  pdf += `xref\n0 ${catalogId + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= catalogId; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer << /Size ${catalogId + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xref}\n%%EOF`;
  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
}

export function printTable(title: string, columns: string[], rows: string[][]) {
  const head = columns.map((c) => `<th>${escapeHtml(c)}</th>`).join("");
  const body = rows
    .map(
      (row) =>
        `<tr>${row
          .map((cell) => {
            if (cell === "●") return `<td class="yes">●</td>`;
            if (cell === "○") return `<td class="no">○</td>`;
            return `<td>${escapeHtml(cell)}</td>`;
          })
          .join("")}</tr>`,
    )
    .join("");
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title>
    <style>
      body{font-family:sans-serif;padding:24px;color:#14203a;background:#fff}
      h1{margin:0;font-size:22px}
      p{margin:4px 0 16px;color:#5b6b86}
      table{border-collapse:collapse;width:100%}
      th{background:#243f86;color:#fff;padding:8px;font-size:12px;text-align:left}
      td{border-bottom:1px solid #e4e8f0;padding:8px;font-size:12px}
      tr:nth-child(even) td{background:#f6f8fc}
      td.yes{color:#149447;font-size:16px;text-align:center}
      td.no{color:#b7bfcc;font-size:16px;text-align:center}
      .back{margin-top:16px;border:0;border-radius:12px;background:#243f86;color:#fff;padding:12px 16px;font-size:16px}
      @media print { .back{display:none} }
    </style></head><body>
    <h1>Safai Nirikshan</h1><p>Nagarpalika Kharkhoda Kshetra · ${escapeHtml(title)}</p>
    <table><thead><tr>${head}</tr></thead><tbody>${body || "<tr><td>No reports</td></tr>"}</tbody></table>
    <button class="back" type="button" onclick="window.close()">बंद करें</button>
    <script>window.addEventListener("load",function(){setTimeout(function(){window.print()},400)})</script>
    </body></html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");
  if (!win) {
    const frame = document.createElement("iframe");
    frame.style.cssText = "position:fixed;inset:0;width:100%;height:100%;border:0;background:#fff;z-index:9999";
    document.body.appendChild(frame);
    frame.src = url;
    frame.onload = () => setTimeout(() => frame.contentWindow?.print(), 400);
  }
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
