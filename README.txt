JARO • DELTA – Start-Webseite (mit Karussell)
===============================================

Struktur:
- index.html
- assets/
  - css/style.css
  - js/app.js
  - img/
    - cover-chi.jpg, cover-redstone.jpg, cover-music.jpg (Platzhalter)
    - cat-01.jpg ... cat-10.jpg (Kategorien, Platzhalter)
  - icons/favicon.png

Anpassen:
1) YouTube-Videos in assets/js/app.js (`videos`-Array).
2) Kategorien: Texte & Bilder im `categories`-Array anpassen; eigene Bilder in assets/img/ ablegen.
3) Farben im CSS oben bei `--accent` und `--accent2` ändern.

Bedienung:
- Seitliche Buttons (animierte Pfeile) scrollen die Kategorien.
- Scrollbar ist sichtbar (dunkel + Verlauf), unterstützt Maus/Touch/Keyboard (←/→).


Bildstruktur geändert:
- Kategorien: assets/img/categories/cat-01.jpg ... cat-10.jpg
- Cover: assets/img/covers/cover-chi.jpg, cover-redstone.jpg, cover-music.jpg

Buttons:
- Seitliche Pfeile scrollen jetzt genau 1 Karte pro Klick (Bild-für-Bild).
