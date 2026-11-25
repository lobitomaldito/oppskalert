# attentio.no

Analysert 18. august 2026. Byrå i Bergen. Nettside, AI, markedsføring, video,
3D-scanning. Bygget på Next.js med Cookiebot, GTM, Elfsight og ucarecdn.
Forsiden er 11 685 px høy.

Du gjettet riktig på at den er AI-laget. Fontvalget er hovedgrunnen, se
motlisten nederst.

## Tre grep som er verdt å ta

### 1. Tallet på gratistilbudet

De skriver **«innen 3 virkedager»**, og de gjentar det tre steder: i
toppbanneret, i en egen tilbudsboks og i knappen. Ikke «raskt», ikke «på få
dager». Et tall du kan holdes til.

Vi sier «Få dager». `CLAUDE.md` har regelen allerede: konkrete tall, ikke
adjektiver. Dette er tredje gang samme funn dukker opp i referansesettet.
Increo setter to timer på workshopen sin, NettsideForBedrift lover
designforslag innen 24 timer, Attentio setter tre virkedager.

Verdt å merke seg: **vårt tilbud er sterkere enn deres.** De lover et
designforslag, vi lover en ferdig side du kan klikke i. Vi beskriver det bare
svakere. Det er den billigste forbedringen på hele lista.

### 2. Bevis før tjenester

Rekkefølgen deres er hero, prosjektbilder, **anmeldelser**, så tjenester.
Stjernerangeringen står allerede inne i heroen.

Hos oss ligger det ene sitatet langt nede, etter tjenestene. `PRODUCT.md`
beskriver kjøperen som brent før og skeptisk. Da bør beviset komme før
pitchen, ikke etter.

### 3. Video-omtaler med ansikt

To kort med avspillingsknapp og navngitte kunder. Ingenting overbeviser en
skeptisk småbedriftseier som å se en annen småbedriftseier si det.

Vi har fire skriftlige sitater og null ansikter. Én video på 30 sekunder fra
en fornøyd kunde ville gjort mer enn alle fire.

## To ting til, mer krevende

**Ekte foto av arbeidet, ikke bare skjermbilder.** Stripa deres viser
byggeplasser, montører og en rørlegger i arbeid. Varmere enn et rutenett av
nettsider. Vi har ingen slike bilder, og det er verdt å begynne å samle dem
når vi leverer.

**Byen i tittelen.** De skriver «for bedrifter i Bergen» i ingressen og
«i Bergen» i `<title>`. Forsiden vår nevner ikke Oslo med et ord.
`/webdesign-oslo` finnes som landingsside, men forsiden tar ikke geografien.

## Motlista

**Fontene.** Instrument Serif i kursiv som aksent, over Bricolage Grotesque.
Instrument Serif står eksplisitt på forbudslista i den globale `CLAUDE.md`,
sammen med Inter og DM Sans, nettopp fordi den leser som AI-generert.
Kursivlinjen som andre linje i hver eneste overskrift er signaturen som
avslører siden.

**Tallraden.** 50+ fornøyde kunder, 98 % kundetilfredshet, 25 %
konverteringsrate på chatbot, 24/7. Ingen kilde på noen av dem.
«98 % kundetilfredshet» er ikke målt, det er valgt. `PRODUCT.md` krever målte
tall, og impeccable har hero-metrikk-malen på banlysten.

**Seks like ikonkort** under «Alt du trenger. Under ett tak.» Det er
identisk-kortrutenett, som står på banlysten. Verre: det utvanner tilbudet.
Et lite byrå som lover nettsider, AI, markedsføring, video, branding og
3D-scanning leser som spredt tynt. Vår styrke er det motsatte.

## Målt

| | Verdi |
| --- | --- |
| Grunn | `#08080c` |
| Tekst | `#f0eefa` |
| H1 | Bricolage Grotesque 800, 48 px, sperring -0,04em, linjehøyde 0,9 |
| Ingress | 15 ord, én setning |
| Brødtekst | Bricolage Grotesque 16 px |
| Skrifter | Bricolage Grotesque, Instrument Serif, DM Mono |
| Dokumenthøyde | 11 685 px |
| Tredjeparter | Cookiebot, GTM, Elfsight, ucarecdn, booster-engine |

Ingressen deres treffer normen på 18 ord fra
[norsk-cta.md](norsk-cta.md) presist, og følger samme mal: hva det er, hvem
det er for, hva som inngår.

---

# attentio.no, hele nettstedet

Skrapet 18. august 2026 med puppeteer, som åpnet alle trekkspill før den
leste, så FAQ-svarene ble med.

| | Antall |
| --- | --- |
| Ruter totalt | 40 |
| Tjenestesider | 20 |
| Geo- og prissider | 5 |
| Artikler | 8 |
| FAQ-par | 89 |

## Det viktigste funnet: `/populaere-sok`

En egen side med femten generiske spørsmål og korte svar. «Hva koster en
nettside?», «Hva er SEO?», «Hva er et webbyrå?», «Hva er forskjellen på et
webbyrå og en frilanser?»

Det er ren AEO. Spørsmålene er skrevet for å bli sitert av ChatGPT og Googles
AI-svar, ikke for å bli lest av et menneske som allerede er på siden. Vi har
FAQ per side siden `seo/faq-per-side`, men ingen samleside som denne.

## Fem regler for FAQ, utledet av de 89 parene

1. **Fem spørsmål per side.** Ikke tre, ikke tolv. Nesten hver eneste
   tjenesteside har nøyaktig fem.
2. **Spørsmålene er innvendinger, ikke funksjoner.** «Binder vi oss til lang
   kontrakt?», «Eier vi nettsiden og koden selv?», «Kan dere hjelpe oss med en
   lavere pris?» Ingen spør «hvilke funksjoner har CMS-et».
3. **Svaret begynner med svaret.** «Ja, alltid.» «Nei.» «Kanskje ikke.» Så
   forklaringen. Aldri en oppvarming først.
4. **Hvert svar har minst ett tall.** 3 til 5 uker. 2 500 kr/mnd. 1 måneds
   oppsigelse. 3 virkedager.
5. **Prisspørsmålet besvares.** De fleste norske byråer viker unna. Attentio
   svarer med kroner, også når svaret er et intervall.

## Konkurrentpriser, verdt å kjenne

| Deres tjeneste | Pris |
| --- | --- |
| Skreddersydd nettside | fra 25 000 kr |
| Mal-nettside | 5 000 til 15 000 kr |
| Enterprise | fra 40 000 kr |
| Driftsavtale | fra 2 500 kr/mnd |
| AI-chatbot | 600 kr/mnd årlig, 800 kr/mnd månedlig |
| Chatbot, etablering | 10 000 kr |
| SEO løpende | 5 000 til 20 000 kr/mnd |
| Teknisk SEO engangs | 10 000 til 30 000 kr |

Vår engangspris på **7 990** ligger under deres billigste mal-nettside, og
under en tredjedel av deres skreddersydde. Vår drift på **690** er under en
firedel av deres 2 500. Det er en posisjon, ikke en tilfeldighet, og den
tåler å sies høyt.

## Struktur vi mangler

De har egne sider for `/nettside-bergen`, `/webbyraa-bergen`,
`/ai-chatbot-bergen` og `/nettside-pris`, hver med egen FAQ. Vi har fem
landingssider, men ingen med by i URL-en bortsett fra `/webdesign-oslo`, og
ingen samleside for populære søk.

## Motlista, kort

Instrument Serif i kursiv i hver overskrift, tallrad uten kilde, seks like
ikonkort, og et tjenestespekter fra nettsider til 3D-scanning av bygg. Det
siste er verdt å merke seg: de har **21 tjenestesider**. Det leser som spredt
tynt, og det er nettopp det motsatte av vår posisjon.
