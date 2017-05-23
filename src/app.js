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
  const variableRegexp = /\$\{([^\}|^0]+)\}/g;
  const caretRegexp = /(\$[1-9])/g;
  let webstormXml = '';
  let context =
      `<context>
         <option name="TypeScript" value="true"/>
       </context>`;

  if (type === 'html') {
    context =
      `<context>
          <option name="HTML" value="true" />
          <option name="JADE" value="true" />
      </context>`;
  }



  for (const key in vsTemplate) {
    let vars = [];
    let body = [];
    let varsXml = [];

    for (let line of vsTemplate[key].body) {
      if (variableRegexp.test(line)) {
        line = line.replace(variableRegexp, (match, p1) => {
          const name = p1.replace(/\d:/, '').replace('-', '');
          const value = p1.replace(/\d:/, '');
          if (!vars.filter(item => item.name === name).length) {
            vars.push({name, value});
          }
          return `$${name}$`;
        });
      }
      if (caretRegexp.test(line)) {
        line = line.replace(caretRegexp, (match, p1) => {
          const name = p1.replace(/\$([1-9])/, 'var$1');
          const value = p1.replace(/\$([1-9])/, '');
          if (!vars.filter(item => item.name === name).length) {
            vars.push({name, value});
          }
          return `$${name}$`;
        });
      }
      line = line.replace('$0', '$END$');
      line = line.replace('${0}', '$END$');
      line = escape(line);
      body.push(line);
    }
    if (vars.length) {
      for (const item of vars) {
        varsXml.push(`<variable name="${item.name}" defaultValue="&quot;${item.value}&quot;" alwaysStopAt="true"/>`);
      }
    }

    webstormXml += `
    <template name="${vsTemplate[key].prefix}" value="${body.join('&#10;')}" description="${escape(vsTemplate[key].description)}" toReformat="false" toShortenFQNames="true">
      ${varsXml.join("\n      ")}
      ${context}
    </template>
  `
  }
  
  return webstormXml;
}

