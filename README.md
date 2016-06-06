# Angular 2 TypeScript Live Templates (Snippets) for WebStorm

This script convert Angular 2 for TypeScript and HTML snippets from Visual Studio Code 
(Written by [John Papa](https://github.com/johnpapa/vscode-angular2-snippets)) to WebStorm Live Templates.

![Usage in TypeScript](images/typescript-snippets.gif)

## Installing the templates

### From JetBrains Plugin repository

- Open IDE preferences `Cmd + ,`
- Go to `Plugins -> Browse repositories`
- Type `angular` and install `Angular 2 TypeScript Templates`
- Restart WebStorm

![Install Plugin](images/install-snippets.gif)

### By Copy xml file

- Clone repo or download [ng2-templates.xml](https://github.com/MrZaYaC/ng2-webstorm-snippets/blob/master/dist/ng2-templates.xml)
- Place the XML file in your [templates folder](https://www.jetbrains.com/webstorm/help/project-and-ide-settings.html)
: On OSX that would be ~/Library/Preferences/WebStorm{Version}/templates

- Restart WebStorm

## Usage

Type part of a snippet, press `enter`, and the snippet unfolds.

### TypeScript Snippets
```typescript
ng2-component-root  // Angular 2 root App component
ng2-bootstrap       // Angular 2 bootstraping, for main.ts
ng2-component       // Angular 2 component
ng2-pipe            // Angular 2 pipe
ng2-routes          // Angular 2 @Routes
ng2-route-path      // Angular 2 routing path
ng2-service         // Angular 2 service
ng2-subscribe       // Angular 2 observable subscription
```

### HTML Snippets
```html
ng2-ngClass
ng2-ngFor
ng2-ngIf
ng2-ngModel
ng2-routerLink
ng2-ngStyle
ng2-ngSwitch
```

![Usage in HTML](images/html-snippets.gif)