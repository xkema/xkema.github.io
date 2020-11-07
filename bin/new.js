const fs = require('fs');
const name = process.argv.slice(2)[0];

if(!/^[a-z0-9-]+$/.test(name)) {
  console.log('Only lowercase characters, digits and hyphens are allowed for the post names!');
} else {
  try {
    fs.writeFileSync(`_drafts/${name}.md`, `---
title: ${name}
excerpt: placeholder-excerpt
tags:
  - tag-1
  - tag-2
---

Initial content for ${name}.

## post inner title

Continuing content.

`, { flag: 'wx' });
  } catch (err) {
    console.error(err)
  }
}
