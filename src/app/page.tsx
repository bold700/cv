import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import MasonryCards from "@/components/MasonryCards"
import React from "react"
import { werkervaring, opleidingen, cursussen, vaardigheden, designSkills, talen, hobby, contact } from "@/lib/cv-data"

function chunkArray(array: { naam: string; value: number }[], size: number) {
  const result: { naam: string; value: number }[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

function getCardLength(card: React.ReactNode): number {
  if (typeof card === 'string') return card.length;
  if (React.isValidElement(card)) {
    const el = card as React.ReactElement<any, any>;
    if (typeof el.props.children === 'string') return el.props.children.length;
    if (Array.isArray(el.props.children)) {
      return el.props.children.map(getCardLength).reduce((a: number, b: number) => a + b, 0);
    }
    return 100;
  }
  return 100;
}

function distributeCardsByLength(cards: React.ReactNode[], columns: number): React.ReactNode[][] {
  const colHeights = Array(columns).fill(0);
  const colCards: React.ReactNode[][] = Array.from({ length: columns }, () => []);
  cards.forEach(card => {
    // Zoek de kolom met de minste totale lengte
    const lengths = colHeights;
    const minCol = lengths.indexOf(Math.min(...lengths));
    const len = getCardLength(card);
    colCards[minCol].push(card);
    colHeights[minCol] += len;
  });
  return colCards;
}

export default function Home() {
  const skillColumns = chunkArray(designSkills, Math.ceil(designSkills.length / 3))

  // Verzamel alle cards in een array
  const cards = [
    // Kolom 1
    <Card className="flex flex-col items-center justify-center max-w-full break-words p-0" key="intro">
      <CardHeader className="flex flex-col items-center mt-4">
        <img
          src="/profielfoto.png"
          alt="Profielfoto Kenny Timmer"
          style={{
            borderRadius: '50%',
            width: 160,
            height: 160,
            objectFit: 'cover',
            marginBottom: 16,
            display: 'block'
          }}
        />
        <CardTitle className="pt-4">Kenny Timmer</CardTitle>
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
    <Card className="max-w-full break-words p-0" key="werkervaring">
      <CardHeader>
        <CardTitle className="pt-4">Werkervaring</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {werkervaring.map((job, i) => (
            <div key={i} className="border rounded-lg p-4 bg-muted/50">
              <div className="font-semibold text-sm text-muted-foreground mb-1">{job.periode}</div>
              <div className="font-bold mb-2">{job.functie}</div>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {job.taken.map((taak, j) => (
                  <li key={j}>{taak}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>,
    <Card className="max-w-full break-words p-0" key="skills">
    <CardHeader>
      <CardTitle className="pt-4">Designvaardigheden</CardTitle>
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
                <Progress key={`progress-${i}-${j}`} value={skill.value} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </CardContent>
  </Card>,
    <Card className="max-w-full break-words p-0" key={"hobby-"+hobby[0].titel}>
    <CardHeader>
      <CardTitle className="pt-4">{hobby[0].titel}</CardTitle>
    </CardHeader>
    <CardContent>{hobby[0].tekst}</CardContent>
  </Card>,
    <Card className="max-w-full break-words p-0" key="opleidingen">
      <CardHeader>
        <CardTitle className="pt-4">Opleidingen</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 mb-4">
          {opleidingen.map((o, i) => (
            <div key={i} className="border rounded-lg p-4 bg-muted/50">
              <div className="font-semibold">{o.naam}</div>
              <div className="text-sm text-muted-foreground mb-1">{o.periode}</div>
              <div className="text-sm">Diploma: {o.diploma ? 'ja' : 'nee'}</div>
            </div>
          ))}
        </div>
        <div className="font-semibold mb-2">Cursussen</div>
        <div className="grid grid-cols-1 gap-4">
          {cursussen.map((c, i) => (
            <div key={i} className="border rounded-lg p-4 bg-muted/50">
              <div className="font-semibold">{c.naam}</div>
              <div className="text-sm text-muted-foreground mb-1">{c.jaar}</div>
              <div className="text-sm">Certificaat: {c.certificaat ? 'ja' : 'nee'}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>,
    <Card className="max-w-full break-words p-0" key="vaardigheden">
    <CardHeader>
      <CardTitle className="pt-4">Vaardigheden</CardTitle>
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
      ? [<Card className="max-w-full break-words p-0" key={"hobby-"+hobby[1].titel}><CardHeader><CardTitle className="pt-4">{hobby[1].titel}</CardTitle></CardHeader><CardContent>{hobby[1].tekst}</CardContent></Card>]
      : []
  )
    // Kolom 2
    ,
    <Card className="max-w-full break-words p-0" key="talen">
      <CardHeader>
        <CardTitle className="pt-4">Talen</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {talen.map((t, i) => (
            <div key={i} className="border rounded-lg p-4 bg-muted/50">
              <div className="font-semibold mb-2">{t.taal}</div>
              <ul className="text-sm space-y-1">
                <li><span className="font-medium">Spreken:</span> {t.spreken}</li>
                <li><span className="font-medium">Schrijven:</span> {t.schrijven}</li>
                <li><span className="font-medium">Lezen:</span> {t.lezen}</li>
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>,
    // Kolom 3
    <Card className="max-w-full break-words p-0" id="contact" key="contact">
      <CardHeader>
        <CardTitle className="pt-4">Contactgegevens</CardTitle>
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
    
  ]

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-7xl">
        <MasonryCards cards={cards} />
      </div>
    </main>
  )
}
