'use strict';
const fs = require('fs');
const escape = require('escape-html');

const TYPESCRIPT_FILE = `${__dirname}/../node_modules/Angular2/snippets/typescript.json`;
const HTML_FILE = `${__dirname}/../node_modules/Angular2/snippets/html.json`;

const vsTsTemplate = JSON.parse(fs.readFileSync(TYPESCRIPT_FILE, 'utf8'));
const vsHTMLTemplate = JSON.parse(fs.readFileSync(HTML_FILE, 'utf8'));

let webshtormXML = '<templateSet group="Angular2 TypeScript Live Templates">';

webshtormXML += convert(vsTsTemplate, 'typescript');
webshtormXML += convert(vsHTMLTemplate, 'html');

webshtormXML += '</templateSet>';

fs.writeFileSync(`${__dirname}/../dist/ng2-templates.xml`, webshtormXML, 'utf8');

console.log('\x1b[32m', "- created", '\x1b[0m', "/dist/ng2-templates.xml");

function convert(vsTemplate, type) {
  const regex = /\$\{([^\}]+)\}/g;
  let webstormXml = '';
  let context =
      `<context>
         <option name="TypeScript" value="true"/>
       </context>`;

  if (type === 'html') {
    context =
      `<context>
          <option name="HTML_TEXT" value="true" />
          <option name="HTML" value="true" />
          <option name="JADE" value="true" />
      </context>`;
  }



  for (const key in vsTemplate) {
    let vars = [];
    let body = [];
    let varsXml = [];

    for (let line of vsTemplate[key].body) {
      if (regex.test(line)) {
        line = line.replace(regex, (match, p1) => {
          vars.push(p1);
          return `$${p1}$`;
        });
      }
      line = line.replace('$0', '$END$');
      line = escape(line);
      body.push(line);
    }
    if (vars.length) {
      for (const name of vars) {
        varsXml.push(`<variable name="${name}" defaultValue="${name}" alwaysStopAt="true"/>`);
      }
    }

    webstormXml += `
    <template name="${vsTemplate[key].prefix}" value="${body.join('&#10;')}" description="${vsTemplate[key].description}" toReformat="true" toShortenFQNames="true">
      ${varsXml.join("\n      ")}
      ${context}
    </template>
  `
  }
  
  return webstormXml;
}

