import { NextResponse } from "next/server"
import { PDFDocument, rgb, StandardFonts, PDFFont, RGB } from "pdf-lib"

export async function GET() {
  // Data (dezelfde structuur als in page.tsx)
  const werkervaring = [
    {
      periode: "2017 - heden",
      functie: "FrieslandCampina, UX Designer (Freelancer)",
      taken: [
        "Optimaliseren van email campagnes",
        "Behoeften, gedrag, de ervaring en de motivaties van gebruikers in kaart brengen",
        "Ontwerpen, Testen en ontwikkelen van interfaces",
        "Uitwerken Functionele requirements",
        "Landingspagina's optimaliseren en designs maken, testen en ontwikkelen",
        "Advertenties optimaliseren, ontwerpen en testen",
        "Het ondersteunen van Start-ups/milkubators projecten (Agile)",
      ],
    },
    {
      periode: "2021 - 2022",
      functie: "Hogeschool, UX Docent",
      taken: [
        "Specialist op het gebied van Interaction Design en User Experience",
        "Samen met operatie, docenten en profesionals werken aan onderwijsontwikkeling en curriculumvernieuwing",
        "Begeleiding studenten",
        "Introductie software (Adobe pakket, Figma, Invision)",
      ],
    },
    {
      periode: "2008 – 2022",
      functie: "AMP-Logistics",
      taken: [
        "Medewerker operatie",
        "IT, Marketing en Operatie werken altijd aan betere, betrouwbaardere producten te maken",
        "Inventarisatie en vertalen van gebruikersbehoefte",
        "UX Designer",
        "Research, ideate, prototype en testen van verschillende websites, detail design websites, applicaties en user interfaces",
        "Design drukwerk",
        "Uitwerken functionele requirements",
        "Fotografie",
      ],
    },
    {
      periode: "2016 – 2018",
      functie: "Bigline, UX Designer",
      taken: [
        "Medewerker operatie",
        "UX Designer",
        "(Re)design webshop, onderzoek, design en testen",
        "Design drukwerk en winkel communicatie",
      ],
    },
    {
      periode: "2015 – 2018",
      functie: "Popal, UX Designer",
      taken: [
        "Medewerker operatie en vertalen gebruikerswensen",
        "Detail Design van nieuwe fietsen, stickers en verpakking",
        "Ontwerpen en bouwen van user interfaces voor landingspagina's en testen van de websites",
        "Redesign logo",
        "Uitwerken functionele requirements",
        "Research, design en communicatie nieuwe fietsen merken",
      ],
    },
  ]
  const opleidingen = [
    { periode: "2008 - 2011", naam: "MBO, Marketing en Communicatie", diploma: true },
    { periode: "2011 - 2015", naam: "HBO, Communicatie en Media Design", diploma: true },
  ]
  const cursussen = [
    { jaar: "2017", naam: "Cursus 'Scrum'", certificaat: false },
    { jaar: "2017", naam: "Cursus 'Agile'", certificaat: false },
  ]
  const vaardigheden = [
    {
      titel: "Overtuigend ontwerpen",
      tekst: "Tijdens mijn studie verdiepte ik me in gedragspsychologie en specialiseerde ik me in UX Design. Ik ontwerp met als doel het gedrag van gebruikers op een positieve en effectieve manier te sturen."
    },
    {
      titel: "Leiding geven",
      tekst: "Bij Defensie help ik dagelijks een team van 8 specialisten. Ik stuur op groei, samenwerking en het verhogen van de UX-volwassenheid binnen de organisatie."
    },
    {
      titel: "Aanpassingsvermogen",
      tekst: "Ik werk vaak in dynamische omgevingen zoals start-ups en grote overheidsorganisaties. Verandering in processen, prioriteiten en teams vraagt van mij een flexibele en oplossingsgerichte houding."
    },
  ]
  const designSkills = [
    { naam: "Adobe Photoshop", value: 90 },
    { naam: "Adobe Illustrator", value: 90 },
    { naam: "Adobe Indesign", value: 90 },
    { naam: "Figma", value: 90 },
    { naam: "InVision", value: 90 },
    { naam: "Adobe After Effects", value: 90 },
    { naam: "Adobe Premiere Pro", value: 90 },
    { naam: "Adobe XD", value: 90 },
    { naam: "Sketch", value: 90 },
    { naam: "Animatie", value: 90 },
    { naam: "HTML & CSS", value: 50 },
    { naam: "Webflow", value: 50 },
    { naam: "Schetsen", value: 90 },
    { naam: "Blender", value: 50 },
    { naam: "Fotografie", value: 90 },
    { naam: "Videografie", value: 90 },
  ]
  const talen = [
    { taal: "Nederlands", spreken: "moedertaal", schrijven: "moedertaal", lezen: "moedertaal" },
    { taal: "Engels", spreken: "goed", schrijven: "goed", lezen: "goed" },
  ]
  const hobby = [
    { titel: "Hobby's", tekst: "Fitness, hardlopen, fietsen en lezen." },
    { titel: "Interesses", tekst: "Tekenen, filmen en fotografie." },
  ]
  const contact = [
    { label: "Naam", value: "Kenny Timmer" },
    { label: "Adres", value: "Harmonieplein 121\n3603 BS Maarssen" },
    { label: "Geboortedatum", value: "25-09-1988" },
    { label: "Telefoon", value: "06-14802802" },
    { label: "E-mail", value: "kcatimmer@gmail.com", link: "mailto:kcatimmer@gmail.com" },
    { label: "Rijbewijs", value: "ja" },
    { label: "Portfolio", value: "www.behance.net/kennytimmer", link: "https://www.behance.net/kennytimmer" },
  ]

  // PDF genereren
  const width = 842, height = 595 // A4 landscape
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
    const cardTop = y
    const cardLeft = margin
    const cardWidth = width - 2 * margin
    let cardY = y - cardPad
    // Titel
    cardY = drawWrappedText(title, cardLeft + cardPad, cardY, cardWidth - 2 * cardPad, 20, fontBold, rgb(0.1,0.1,0.5))
    cardY -= 4
    // Content
    cardY = drawContent(cardY, cardLeft + cardPad, cardWidth - 2 * cardPad)
    // Card achtergrond
    page.drawRectangle({ x: cardLeft, y: cardY - cardPad, width: cardWidth, height: (cardTop - cardY) + 2 * cardPad, color: cardBg, borderColor: rgb(0.85,0.85,0.95), borderWidth: 1 })
    y = cardY - 2 * cardPad
    if (y < margin + 80) newPage()
    y -= 12
  }

  // Titel
  y = drawWrappedText("Kenny Timmer", margin, y, width - 2 * margin, 28, fontBold, rgb(0.1,0.1,0.5))
  y = drawWrappedText("CV", margin, y, width - 2 * margin, 18, fontBold, rgb(0.1,0.1,0.5))
  y -= 8

  // Contact card
  drawCard("Contactgegevens", (cy, x, w) => {
    contact.forEach(c => {
      cy = drawWrappedText(`${c.label}: ${c.value.replace(/\n/g, ", ")}`, x, cy, w, 12, font, rgb(0,0,0))
    })
    return cy
  })

  // Vaardigheden card
  drawCard("Vaardigheden", (cy, x, w) => {
    vaardigheden.forEach(v => {
      cy = drawWrappedText(v.titel, x, cy, w, 14, fontBold, rgb(0.1,0.1,0.5))
      cy = drawWrappedText(v.tekst, x, cy, w, 12, font, rgb(0,0,0))
      cy -= 4
    })
    return cy
  })

  // Designvaardigheden card
  drawCard("Designvaardigheden", (cy, x, w) => {
    designSkills.forEach(s => {
      cy = drawWrappedText(`${s.naam}: ${s.value}%`, x, cy, w, 12, font, rgb(0,0,0))
    })
    return cy
  })

  // Talen card
  drawCard("Talen", (cy, x, w) => {
    talen.forEach(t => {
      cy = drawWrappedText(`${t.taal}: spreken ${t.spreken}, schrijven ${t.schrijven}, lezen ${t.lezen}`, x, cy, w, 12, font, rgb(0,0,0))
    })
    return cy
  })

  // Opleidingen card
  drawCard("Opleidingen", (cy, x, w) => {
    opleidingen.forEach(o => {
      cy = drawWrappedText(`${o.periode}: ${o.naam} (${o.diploma ? 'diploma' : 'geen diploma'})`, x, cy, w, 12, font, rgb(0,0,0))
    })
    cy = drawWrappedText("Cursussen", x, cy, w, 13, fontBold, rgb(0.1,0.1,0.5))
    cursussen.forEach(c => {
      cy = drawWrappedText(`${c.jaar}: ${c.naam} (${c.certificaat ? 'certificaat' : 'geen certificaat'})`, x, cy, w, 12, font, rgb(0,0,0))
    })
    return cy
  })

  // Werkervaring card
  drawCard("Werkervaring", (cy, x, w) => {
    werkervaring.forEach(wv => {
      cy = drawWrappedText(`${wv.periode}: ${wv.functie}`, x, cy, w, 13, fontBold, rgb(0.1,0.1,0.5))
      wv.taken.forEach(t => {
        cy = drawWrappedText(`- ${t}`, x + 12, cy, w - 12, 12, font, rgb(0,0,0))
      })
      cy -= 4
    })
    return cy
  })

  // Hobby card
  drawCard("Hobby's & Interesses", (cy, x, w) => {
    hobby.forEach(h => {
      cy = drawWrappedText(`${h.titel}: ${h.tekst}`, x, cy, w, 12, font, rgb(0,0,0))
    })
    return cy
  })

  const pdfBytes = await pdfDoc.save()
  return new NextResponse(pdfBytes, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=Kenny-Timmer-CV.pdf"
    }
  })
} 