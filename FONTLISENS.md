# Sperre før lansering: to fonter må lisensieres

**Status: IKKE klarert for produksjon.** Denne branchen bruker to fonter som
ikke er lisensiert for kommersiell bruk. De må kjøpes før `redesign/studio-mal`
merges til master og deployes.

## Hva som må kjøpes

| Font | Brukes til | Rettighetshaver | Pris | Lenke |
| --- | --- | --- | --- | --- |
| Suisse Int'l | All brødtekst og UI | Swiss Typefaces | 500 CHF (print + web) | https://www.swisstypefaces.com/fonts/suisse/ |
| GT Sectra Fine | Sitatet, og kun det | Grilli Type | Se nettsted | https://www.grillitype.com/typeface/gt-sectra |

Filene som ligger i `public/fonts/` nå er OnlineWebFonts-konverteringer, altså
ikke rettighetshavernes egne filer. De er merket `demoOnly: true` i
`~/.claude/assets/fonts/library.json`, og lisensvarslene følger med som
`DEMO-ONLY-suisse-intl.txt` og `DEMO-ONLY-gt-sectra-fine.txt` i samme mappe.

Når lisensen er kjøpt: last ned rettighetshavernes egne woff2-filer og bytt ut
konverteringene. Ikke behold konverteringene selv om lisensen er i orden, de er
ikke de samme filene.

## Hvorfor det står her og ikke bare i en samtale

Aleksander valgte 19. august 2026 å bygge redesignet med disse to fontene og
kjøpe lisensen før lansering, framfor å bruke lisensierte erstatninger. Det er
et bevisst valg, men det betyr at det ligger en betalingssperre mellom denne
branchen og prod, og den er usynlig i koden. Derfor denne fila.

## Sjekkliste før merge til master

- [ ] Suisse Int'l-lisens kjøpt hos Swiss Typefaces
- [ ] GT Sectra Fine-lisens kjøpt hos Grilli Type
- [ ] Rettighetshavernes egne woff2-filer lastet ned
- [ ] Konverteringene i `public/fonts/` byttet ut med de kjøpte filene
- [ ] `DEMO-ONLY-*.txt` slettet fra `public/fonts/`
- [ ] Denne fila slettet

Er ikke alle punktene krysset av, skal ikke branchen deployes.
