import { NextResponse } from "next/server"
import { PDFDocument, rgb, StandardFonts, PDFFont, RGB } from "pdf-lib"
import { werkervaring, opleidingen, cursussen, vaardigheden, designSkills, talen, hobby, contact } from "@/lib/cv-data"
import fs from "fs"
import path from "path"

export async function GET() {
  // PDF genereren
  const width = 595, height = 842 // A4 portrait
  const margin = 48
  const cardPad = 16
  const cardBg = rgb(0.97,0.97,1)
  const pdfDoc = await PDFDocument.create()
  let page = pdfDoc.addPage([width, height])
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  let y = height - margin

  function newPage() {
    page = pdfDoc.addPage([width, height])
    y = height - margin
  }

  function drawWrappedText(text: string, x: number, yStart: number, maxWidth: number, size: number, fontObj: PDFFont, color: RGB) {
    const words = text.split(' ')
    let line = ''
    let yPos = yStart
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' '
      const testWidth = fontObj.widthOfTextAtSize(testLine, size)
      if (testWidth > maxWidth && n > 0) {
        page.drawText(line, { x, y: yPos, size, font: fontObj, color })
        yPos -= size + 2
        line = words[n] + ' '
      } else {
        line = testLine
      }
    }
    if (line) {
      page.drawText(line, { x, y: yPos, size, font: fontObj, color })
      yPos -= size + 2
    }
    return yPos
  }

  function drawCard(title: string, drawContent: (y: number, x: number, w: number) => number) {
    const cardLeft = margin
    const cardWidth = width - 2 * margin
    let cardY = y - cardPad
    // Simuleer waar de tekst eindigt (zonder te tekenen)
    let simY = cardY
    simY = simY - 20 - 4; // Titel
    simY = drawContent(simY, cardLeft + cardPad, cardWidth - 2 * cardPad)
    const cardHeight = (y - cardPad) - simY + 2 * cardPad
    // Teken eerst de achtergrond
    page.drawRectangle({ x: cardLeft, y: y - cardHeight, width: cardWidth, height: cardHeight, color: cardBg, borderColor: rgb(0.85,0.85,0.95), borderWidth: 1 })
    // Teken nu de tekst
    cardY = y - cardPad
    cardY = drawWrappedText(title, cardLeft + cardPad, cardY, cardWidth - 2 * cardPad, 20, fontBold, rgb(0.1,0.1,0.5))
    cardY -= 4
    cardY = drawContent(cardY, cardLeft + cardPad, cardWidth - 2 * cardPad)
    y = cardY - 2 * cardPad
    if (y < margin + 80) newPage()
    y -= 12
  }

  // Helper voor page break
  function checkPageBreak(extra = 0) {
    if (y < margin + extra + 40) {
      page = pdfDoc.addPage([width, height]);
      y = height - margin;
    }
  }

  // Titel
  y = drawWrappedText("Kenny Timmer", margin, y, width - 2 * margin, 28, fontBold, rgb(0.1,0.1,0.5));
  y = drawWrappedText("CV", margin, y, width - 2 * margin, 18, fontBold, rgb(0.1,0.1,0.5));
  y -= 16;

  // Contactgegevens
  checkPageBreak(60);
  y = drawWrappedText("Contactgegevens", margin, y, width - 2 * margin, 16, fontBold, rgb(0.1,0.1,0.5));
  contact.forEach(c => {
    checkPageBreak(16);
    y = drawWrappedText(`${c.label}: ${c.value.replace(/\n/g, ", ")}`, margin, y, width - 2 * margin, 12, font, rgb(0,0,0));
  });
  y -= 12;

  // Vaardigheden
  checkPageBreak(40);
  y = drawWrappedText("Vaardigheden", margin, y, width - 2 * margin, 16, fontBold, rgb(0.1,0.1,0.5));
  vaardigheden.forEach(v => {
    checkPageBreak(32);
    y = drawWrappedText(v.titel, margin, y, width - 2 * margin, 13, fontBold, rgb(0.1,0.1,0.5));
    y = drawWrappedText(v.tekst, margin, y, width - 2 * margin, 12, font, rgb(0,0,0));
    y -= 4;
  });
  y -= 12;

  // Designvaardigheden
  checkPageBreak(40);
  y = drawWrappedText("Designvaardigheden", margin, y, width - 2 * margin, 16, fontBold, rgb(0.1,0.1,0.5));
  designSkills.forEach(s => {
    checkPageBreak(16);
    y = drawWrappedText(`${s.naam}: ${s.value}/100`, margin, y, width - 2 * margin, 12, font, rgb(0,0,0));
  });
  y -= 12;

  // Talen
  checkPageBreak(32);
  y = drawWrappedText("Talen", margin, y, width - 2 * margin, 16, fontBold, rgb(0.1,0.1,0.5));
  talen.forEach(t => {
    checkPageBreak(16);
    y = drawWrappedText(`${t.taal}: spreken ${t.spreken}, schrijven ${t.schrijven}, lezen ${t.lezen}`, margin, y, width - 2 * margin, 12, font, rgb(0,0,0));
  });
  y -= 12;

  // Opleidingen
  checkPageBreak(40);
  y = drawWrappedText("Opleidingen", margin, y, width - 2 * margin, 16, fontBold, rgb(0.1,0.1,0.5));
  opleidingen.forEach(o => {
    checkPageBreak(16);
    y = drawWrappedText(`${o.periode}: ${o.naam} (${o.diploma ? 'diploma' : 'geen diploma'})`, margin, y, width - 2 * margin, 12, font, rgb(0,0,0));
  });
  y = drawWrappedText("Cursussen", margin, y, width - 2 * margin, 13, fontBold, rgb(0.1,0.1,0.5));
  cursussen.forEach(c => {
    checkPageBreak(16);
    y = drawWrappedText(`${c.jaar}: ${c.naam} (${c.certificaat ? 'certificaat' : 'geen certificaat'})`, margin, y, width - 2 * margin, 12, font, rgb(0,0,0));
  });
  y -= 12;

  // Werkervaring
  checkPageBreak(40);
  y = drawWrappedText("Werkervaring", margin, y, width - 2 * margin, 16, fontBold, rgb(0.1,0.1,0.5));
  werkervaring.forEach(wv => {
    checkPageBreak(32);
    y = drawWrappedText(`${wv.periode}: ${wv.functie}`, margin, y, width - 2 * margin, 13, fontBold, rgb(0.1,0.1,0.5));
    wv.taken.forEach(t => {
      checkPageBreak(14);
      y = drawWrappedText(`- ${t}`, margin + 12, y, width - 2 * margin - 12, 12, font, rgb(0,0,0));
    });
    y -= 4;
  });
  y -= 12;

  // Hobby's & Interesses
  checkPageBreak(32);
  y = drawWrappedText("Hobby's & Interesses", margin, y, width - 2 * margin, 16, fontBold, rgb(0.1,0.1,0.5));
  hobby.forEach(h => {
    checkPageBreak(16);
    y = drawWrappedText(`${h.titel}: ${h.tekst}`, margin, y, width - 2 * margin, 12, font, rgb(0,0,0));
  });

  // Profielfoto toevoegen (alleen op eerste pagina)
  const imagePath = path.join(process.cwd(), "public", "profielfoto.png")
  if (fs.existsSync(imagePath)) {
    const imageBytes = fs.readFileSync(imagePath)
    const jpgImage = await pdfDoc.embedJpg(imageBytes)
    const imgWidth = 100, imgHeight = 100
    page.drawImage(jpgImage, {
      x: margin,
      y: height - margin - imgHeight,
      width: imgWidth,
      height: imgHeight
    })
    // Verschuif y zodat tekst niet over de foto komt
    y = height - margin - imgHeight - 16
  }

  const pdfBytes = await pdfDoc.save()
  return new NextResponse(pdfBytes, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=Kenny-Timmer-CV.pdf"
    }
  })
} 