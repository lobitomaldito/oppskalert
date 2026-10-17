# E-postsignatur – Aleksander MacKee (Oppskalert)

## Filer

- `signatur-aleksander.html` – selve signaturen
- `aleks-foto.png` – portrettbilde, sirkelbeskåret med clay-brown ring
  (samme bilde som i Appstart-signaturen, ny ringfarge for Oppskalerts palett)

En kopi av bildet ligger også i `public/assets/signatur/` i prosjektet, klar
til å bli med neste gang oppskalert.no deployes.

Logoen er ikke et bilde her – den er satt som tekst («oppskalert.» i ink med
aksentfarget punktum), samme måte header på oppskalert.no selv gjør det på.

## Bildet må ligge på en offentlig URL

Gmail og Outlook kan ikke vise bilder fra en lokal fil – de må hentes fra en
URL som er tilgjengelig på nettet. HTML-filen peker derfor på:

```
https://oppskalert.no/assets/signatur/aleks-foto.png
```

Denne URL-en virker først når oppskalert.no deployes på nytt med filen
inkludert. Fram til det er gjort, viser signaturen et ødelagt bilde-ikon i
stedet for portrettet.

## Slik limer du den inn i Gmail

1. Deploy nettsiden (med det nye bildet) først, se over.
2. Åpne `signatur-aleksander.html` i en nettleser (dobbeltklikk fila).
3. Merk hele signaturen (Cmd+A) og kopier (Cmd+C) – kopier fra den *renderte*
   visningen, ikke fra kildekoden.
4. Gmail → tannhjul øverst til høyre → **Se alle innstillinger** → fanen
   **Generelt** → **Signatur** → **Opprett ny** → lim inn (Cmd+V).
5. Lagre nederst på siden.
