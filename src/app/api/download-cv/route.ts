import { NextResponse } from 'next/server'
import { PDFDocument, rgb, StandardFonts, PDFFont, RGB } from 'pdf-lib'
import { werkervaring, opleidingen, cursussen, vaardigheden, designSkills, talen, hobby, contact } from '@/lib/cv-data'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const width = 595, height = 842 // A4 portrait
  const margin = 48
  const pdfDoc = await PDFDocument.create()
  let page = pdfDoc.addPage([width, height])
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  let y = height - margin

  // Profielfoto toevoegen (originele verhouding, gecentreerd, geen cirkel)
  const imagePath = path.join(process.cwd(), "public", "profielfoto.png")
  if (fs.existsSync(imagePath)) {
    const imageBytes = fs.readFileSync(imagePath)
    const pngImage = await pdfDoc.embedPng(imageBytes)
    const imgDims = pngImage.scale(1)
    // Max breedte/hoogte instellen zodat hij niet te groot wordt
    let maxWidth = 120
    let maxHeight = 120
    let scale = Math.min(maxWidth / imgDims.width, maxHeight / imgDims.height, 1)
    let drawWidth = imgDims.width * scale
    let drawHeight = imgDims.height * scale
    let x = (width - drawWidth) / 2
    let yImg = y - drawHeight
    page.drawImage(pngImage, {
      x,
      y: yImg,
      width: drawWidth,
      height: drawHeight
    })
    y = yImg - 32 // Extra ruimte onder de foto
  }

  function drawCenteredText(text: string, yPos: number, size: number, fontObj: PDFFont, color: RGB) {
    const textWidth = fontObj.widthOfTextAtSize(text, size)
    const x = (width - textWidth) / 2
    page.drawText(text, { x, y: yPos, size, font: fontObj, color })
    return yPos - size - 2
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

  function checkPageBreak(extra = 0) {
    if (y < margin + extra + 40) {
      page = pdfDoc.addPage([width, height]);
      y = height - margin;
    }
  }

  // Naam en titel gecentreerd onder de foto
  y = drawCenteredText("Kenny Timmer", y, 28, fontBold, rgb(0.1,0.1,0.5));
  y = drawCenteredText("CV", y, 18, fontBold, rgb(0.1,0.1,0.5));
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

  const pdfBytes = await pdfDoc.save()
  return new NextResponse(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=Kenny-Timmer-CV.pdf'
    }
  })
} 