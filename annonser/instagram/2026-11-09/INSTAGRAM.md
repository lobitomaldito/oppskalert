# Instagram @oppskalert, 9. november 2026

## Slik sto kontoen

- 3 innlegg, 3 følgere. Bioen er bare «oppskalert.», uten hva, hvem eller tilbud.
- Profilbildet er «o.»-monogrammet på lilla bunn, fra den gamle fargepaletten.
- Ingen kontaktknapp, bare «Send melding».
- Alle tre innleggene er i den gamle aubergine-stilen. Siden er hvit med oransje nå.
- Tekstene bryter reglene: «vi»-form, «demo» (heter «gratis utkast» nå), «lynrask»,
  «24/7», doble emneknagger (`##nettside`), #ecommerce og #vibecoding, og
  «Forskning viser 53 %» uten kilde.

## Fiks profilen (ca. 10 minutter i appen)

1. **Profilbilde:** `profilbilde.png` i denne mappa, «o.» i svart og oransje på hvitt, som logoen på siden.
2. **Navn:** `Oppskalert | Nettsider for bedrifter`
   (navnefeltet er søkbart, bioen er det ikke)
3. **Bio:**
   ```
   Aleksander MacKee. Jeg lager nettsider for små bedrifter.
   Gratis utkast av din nye side på 48 timer.
   Fast pris fra 6 990 kr. Oslo
   ```
4. **Lenke:** `https://oppskalert.no/kontakt?utm_source=instagram&utm_medium=bio`
   (da ser PostHog hvem som kommer fra Instagram)
5. **Profesjonell konto:** Rediger profil, bytt til bedriftskonto, kategori
   «Webdesigner». Legg inn telefon 974 09 897 og team@oppskalert.no som
   kontaktknapper. **Arkiver** (ikke slett) de tre gamle innleggene.

## Postene

Rekkefølge: legg ut 1, 2 og 3 med en dags mellomrom, og fest post 1 øverst.

### Post 1: `post-1.png`

```
Hei, jeg heter Aleksander.

Jeg lager nettsider for små bedrifter: håndverkere, terapeuter, rådgivere og alle andre som heller vil jobbe med faget sitt enn med nettsiden.

Slik jobber jeg: Du sender meg adressen til siden du har i dag, eller forteller hva du driver med. På 48 timer får du et utkast av den nye siden din. Det koster ingenting, og du skylder meg ingenting om du sier nei.

Liker du det du ser, gjør jeg den ferdig. Jeg skriver teksten, setter opp siden og tar telefonen når du lurer på noe.

På bildet ser du fire av sidene jeg har laget: Alpha Negotiations, Jakobsen Takst, Steinar Husby og Katrin Glatz Brubakk.

Få et gratis utkast: lenke i profilen.

#nettside #webdesign #småbedrift #oslo
```

### Post 2: `post-2.png`

```
Melanie Dahl er skuespiller og mental trener for scenekunstnere. To yrker, og to slags besøkende: en teatersjef som vil se hva hun har spilt, og en skuespiller med prestasjonsangst som leter etter hjelp.

Den gamle forsiden lenket til 43 undersider. Begge måtte lete seg fram selv.

Nå har forsiden to dører, coaching til venstre og scenekunst til høyre. Du velger før du har lest en setning.

Dette ble også bedre:
· 5 sider hadde adresser som «new-page-5». Nå sier adressen hva siden handler om, og det er adressen folk ser i søketreffet.
· 12 filer måtte lastes før forsiden kom opp. Nå er det 6, som gir kortere ventetid på mobilnett.
· 56 gamle adresser sender videre til riktig ny side, så ingen lenke fra før ender i en feilmelding.

Melanie endrer tekst og bilder selv, rett på siden.

Hele caset: oppskalert.no/arbeid/melanie-dahl

#nettside #webdesign #coach #scenekunst
```

### Post 3: `post-3.png`

```
Hva koster en nettside? Her er prisene mine, de samme som på oppskalert.no/priser.

Enkel, 6 990 kr: én side som viser hva du gjør, med kontaktskjema. For deg som har tekst og bilder klare og vil bli ferdig.

Medium, 12 900 kr: alle sidene du har i dag, med tekstene skrevet om så Google og AI-søk forstår hva du tilbyr.

Komplett, fra 19 900 kr: alt i Medium, pluss booking eller priskalkulator, og tre måneder SEO med en rapport hver måned som viser hva som virker.

Prisene er eks. mva. og betales én gang. Hosting er med, så det kommer ingen månedsregning fra meg.

Før du betaler noe, lager jeg et gratis utkast. Da ser du siden først og bestemmer deg etterpå.

Send meg en melding her, eller ring 974 09 897.

#nettside #webdesign #småbedrift #oslo
```

## Kilder

- Ingen ansiktsbilder (Aleksander, 09.11.2026). Post 1 viser kundesider, profilbildet er logoen.

- Prisene: `src/lib/site.js` på origin/master og `~/.claude/assets/tilbud/MAL.md`.
- Melanie Dahl-tallene: `forEtter` i `src/lib/demo-innhold.js`, målt 30.09.2026.
  Før-bildet står allerede på case-siden.
- Bildene rendres på nytt med `node annonser/instagram/2026-11-09/kilde/render.mjs`.
