import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import MasonryCards from "@/components/MasonryCards"
import React from "react"

// Data uit andere pagina's (gekopieerd)
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

function chunkArray(array: { naam: string; value: number }[], size: number) {
  const result: { naam: string; value: number }[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

export default function Home() {
  const skillColumns = chunkArray(designSkills, Math.ceil(designSkills.length / 3))

  // Verzamel alle cards in een array
  const cards = [
    // Kolom 1
    <Card className="flex flex-col items-center justify-center" key="intro">
      <CardHeader className="flex flex-col items-center">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src="/profielfoto.jpg" alt="Kenny Timmer" />
          <AvatarFallback>KT</AvatarFallback>
        </Avatar>
        <CardTitle>Kenny Timmer</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="mb-4">
          Ik help om jouw uitdagingen te vertalen naar heldere, creatieve oplossingen.<br /><br />
          Klanten werken graag met mij omdat ik focus op wat echt telt: problemen oplossen, impact maken en het proces simpel en effectief houden.<br /><br />
          Samen brengen we jouw visie tot leven.
        </p>
        <Button asChild>
          <a href="/api/download-cv" download>
            Download CV
          </a>
        </Button>
      </CardContent>
    </Card>,
    <Card key="opleidingen">
      <CardHeader>
        <CardTitle>Opleidingen</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {opleidingen.map((o, i) => (
            <li key={i} className="flex justify-between">
              <span>{o.periode}</span>
              <span>{o.naam}</span>
              <span className="text-sm text-muted-foreground">Diploma: {o.diploma ? 'ja' : 'nee'}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 font-semibold">Cursussen</div>
        <ul className="space-y-2">
          {cursussen.map((c, i) => (
            <li key={i} className="flex justify-between">
              <span>{c.jaar}</span>
              <span>{c.naam}</span>
              <span className="text-sm text-muted-foreground">Certificaat: {c.certificaat ? 'ja' : 'nee'}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>,
    // Kolom 2
    <Card key="skills">
      <CardHeader>
        <CardTitle>Designvaardigheden</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skillColumns.map((col, i) => (
            <ul key={i} className="space-y-4">
              {col.map((skill: { naam: string; value: number }, j: number) => (
                <li key={j}>
                  <div className="flex justify-between mb-1">
                    <span>{skill.naam}</span>
                    <span className="text-sm text-muted-foreground">{skill.value}%</span>
                  </div>
                  <Progress value={skill.value} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </CardContent>
    </Card>,
    <Card key="vaardigheden">
      <CardHeader>
        <CardTitle>Vaardigheden</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {vaardigheden.map((v, i) => (
            <li key={i}>
              <span className="font-medium">{v.titel}</span><br />
              {v.tekst}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>,
    ...(
      hobby[1]
        ? [<Card key={"hobby-"+hobby[1].titel}><CardHeader><CardTitle>{hobby[1].titel}</CardTitle></CardHeader><CardContent>{hobby[1].tekst}</CardContent></Card>]
        : []
    ),
    <Card key="talen">
      <CardHeader>
        <CardTitle>Talen</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="pr-4">Taal</th>
              <th className="pr-4">Spreken</th>
              <th className="pr-4">Schrijven</th>
              <th>Lezen</th>
            </tr>
          </thead>
          <tbody>
            {talen.map((t, i) => (
              <tr key={i}>
                <td>{t.taal}</td>
                <td>{t.spreken}</td>
                <td>{t.schrijven}</td>
                <td>{t.lezen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>,
    // Kolom 3
    <Card key={"hobby-"+hobby[0].titel}>
      <CardHeader>
        <CardTitle>{hobby[0].titel}</CardTitle>
      </CardHeader>
      <CardContent>{hobby[0].tekst}</CardContent>
    </Card>,
    <Card id="contact" key="contact">
      <CardHeader>
        <CardTitle>Contactgegevens</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
          {contact.map((c) => (
            <React.Fragment key={c.label}>
              <dt className="font-medium">{c.label}</dt>
              <dd>
                {c.link ? (
                  <a href={c.link} className="underline" target="_blank" rel="noopener noreferrer">{c.value}</a>
                ) : (
                  c.value.split("\n").map((line, j) => (
                    <span key={j}>
                      {line}
                      {j !== c.value.split("\n").length - 1 && <br />}
                    </span>
                  ))
                )}
              </dd>
            </React.Fragment>
          ))}
        </dl>
      </CardContent>
    </Card>,
    // Kolom 3 (laatste): Werkervaring
    <Card key="werkervaring">
      <CardHeader>
        <CardTitle>Werkervaring</CardTitle>
      </CardHeader>
      <CardContent>
        {werkervaring.map((job, i) => (
          <div key={i} className="mb-4">
            <div className="font-semibold text-sm text-muted-foreground">{job.periode}</div>
            <div className="font-bold">{job.functie}</div>
            <ul className="list-disc pl-5 text-sm">
              {job.taken.map((taak, j) => (
                <li key={j}>{taak}</li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>,
  ]

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-7xl">
        <MasonryCards cards={cards} />
      </div>
    </main>
  )
}
