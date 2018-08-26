# S.K.E.L.E.T.O.R - Cherche pas t'as tort

## Framework CSS

### Base
- Hérité de Boostrap 4.x.x
- OOCSS + BEM 
- Architecture Front-End en Atomic Design
- Compilation via Gulp

### CSS
Les CSS sont rangés dans le dossier "style"
- Chaque sous-dossiers à la racine un fichier __index.scss permettant d'appeler les autres fichiers du même dossier.
- Chaque fichier __index.scss est appelé dans le style.scss à la racine.

### Javascript
Les plugins JS sont en jQuery pour la majorité d'entre eux. 
Ils respectent les patterns d'accessibilité.

### Accessibilité
Respecter le RGAA, coder de façon accessible tant en HTML (twig), en CSS et en JS.

## Installation

Via le gulpfile.js

```javascript
npm install --save-dev
gulp
```

Le dossier _**__public**_ sera généré avec tous les dossiers et fichiers (html, css, js).

<hr>

© Lou • Morgane • Mathieu