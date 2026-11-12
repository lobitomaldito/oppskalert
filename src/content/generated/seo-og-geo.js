/* Spørsmålsinnlegg 4 i seo/seo-klynger.md. «Mer å spørre om» på
   «søkemotoroptimalisering» (google.no, 12.11.2026). OpenSEO 12.11:
   «generative engine optimization» 40/mnd, KD 48.

   Topp 5 på «forskjell på seo og geo» (google.no mobil, 12.11.2026): oversatte
   byråartikler om «SEO vs GEO vs AEO», skrevet for markedsførere. Ingen svarer for en
   liten bedrift som bare vil vite hva den skal gjøre. Vinkelen her: samme grunnarbeid,
   to måter å bli funnet på, og en sjekkliste. Hvordan du blir synlig i ChatGPT
   står i /blogg/synlig-i-chatgpt og gjentas ikke. */

export default {
  slug: "seo-og-geo",
  klynge: "seo",
  title: "Hva er forskjellen på SEO og GEO?",
  description: "SEO gir deg plass i Google-lista. GEO handler om å bli nevnt i svarene fra ChatGPT og Googles AI-oversikter. Slik henger de sammen, og hva du gjør selv.",
  publishDate: "2026-11-12",
  keywords: ["seo og geo", "hva er geo", "generative engine optimization", "forskjell på seo og geo"],
  hero: "/blogg/seo-og-geo.webp",
  svar: "SEO er arbeidet med å komme høyt i lista med lenker Google viser. GEO, generative engine optimization, er arbeidet med å bli nevnt og sitert når ChatGPT, Googles AI-oversikter og lignende svarer. Begge bygger på det samme: en side robotene får lest, som sier tydelig hva du gjør, hvor og for hvem. Google skriver at det ikke finnes egne krav for å vises i AI-oversiktene.",
  faq: [
    { q: "Trenger jeg en egen GEO-avtale i tillegg til SEO?", a: "Nei. Grunnarbeidet er det samme, og AI-sjekken er med i SEO-avtalen min. Det du trenger, er at noen måler begge deler." },
    { q: "Hva er AEO?", a: "Answer engine optimization, å gi korte, direkte svar som søkemotorer og AI kan hente ut. Det brukes om mye av det samme som GEO." },
    { q: "Hvordan ser jeg om ChatGPT nevner bedriften min?", a: "Spør ChatGPT slik en kunde ville gjort, for eksempel «hvem er en god rørlegger i Drammen?», og se om du er med og hvilke sider den viser til. Gjør det fra en ny samtale, så tidligere spørsmål ikke farger svaret." },
  ],
  content: `## Hva er GEO?

GEO står for generative engine optimization. Det er arbeidet med å bli nevnt og sitert når en AI svarer på et spørsmål, i ChatGPT, i Googles AI-oversikter øverst i søkeresultatet, eller i tjenester som Perplexity. Begrepet kommer fra en [forskningsartikkel fra 2023](https://arxiv.org/abs/2311.09735) som målte hva som gjør at en side blir sitert i slike svar.

For en liten bedrift betyr det: når noen spør en AI om «beste parterapeut i Bergen» eller «hva koster en ny hjemmeside», står du i svaret eller ikke.

## Hva er forskjellen på SEO og GEO?

Forskjellen ligger i hvor du blir funnet og hvordan det måles:

- **SEO** gir deg en plass i lista med lenker. Du måler det i plass, visninger og klikk, i Google Search Console.
- **GEO** gir deg en omtale i et skrevet svar. Du måler det i hvor ofte du blir nevnt når du stiller de samme spørsmålene som kundene dine.

Det som gir resultat, er stort sett det samme. AI-tjenestene leter fram sider på nettet og leser dem før de svarer. En side som ikke slipper inn robotene, eller som ikke sier hva bedriften gjør, blir verken funnet i Google eller nevnt i svaret.

## Må du velge mellom SEO og GEO?

Nei. Google skriver i [sin veiledning om AI-funksjonene i søk](https://developers.google.com/search/docs/appearance/ai-features) at det ikke finnes egne krav for å vises i AI-oversiktene, og at det vanlige grunnarbeidet for søk gjelder. Det du gjør for å bli funnet i Google, er også det første steget for å bli nevnt av AI.

Det som kommer i tillegg for GEO, er at AI-svarene ofte henter fra andre sider enn din egen: kataloger, omtalesider og artikler som nevner deg. Jo flere steder som sier det samme om hva du gjør og hvor, jo lettere er det for en AI å gjenta det.

## Hva gjør du for å bli nevnt av AI?

Fem ting du kan sjekke selv:

1. **Slipp inn robotene.** ChatGPT bruker en egen søkerobot, OAI-SearchBot, og [OpenAI forklarer hvordan](https://platform.openai.com/docs/bots) den slippes inn eller stenges ute. Står den blokkert i robots.txt, blir siden ikke lest.
2. **Si det rett ut.** Hva du gjør, hvor du holder til og hva det koster, i første avsnitt. En AI gjengir det som står tydelig, og hopper over det den må gjette.
3. **Svar på spørsmålene kundene stiller.** Én side eller ett avsnitt per spørsmål, med svaret først.
4. **Samme opplysninger overalt.** Navn, adresse og telefon likt på nettsiden, i Google Bedriftsprofil og i katalogene.
5. **Bli nevnt andre steder.** Omtaler, katalogoppføringer og artikler som lenker til deg.

Steg for steg for ChatGPT står i [synlig i ChatGPT](/blogg/synlig-i-chatgpt), og hva AI-oversiktene gjør med klikkene, står i [AI-oversikter i Google](/blogg/ai-oversikter-google).

## Hvordan måler du om det virker?

For SEO bruker du Search Console. For GEO finnes det ikke et like enkelt verktøy fra Google eller OpenAI. Den enkleste målingen er å skrive ned fem spørsmål kundene dine stiller, spørre ChatGPT og Google dem én gang i måneden, og notere om du er med i svaret og hvilke sider som blir sitert.

I SEO-avtalen min er det en AI-sjekk hver måned: jeg stiller de samme spørsmålene og rapporterer om ChatGPT og Google AI nevner deg, og hvem de nevner i stedet.`,
};
