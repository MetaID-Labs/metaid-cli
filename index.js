#!/usr/bin/env node

import inquirer from 'inquirer'
import fs from 'fs'

function createEntity() {
  const entityName = process.argv[3]

  const entityTemplate = `
import type { EntitySchema } from '@metaid/metaid'

const ${entityName}Schema: EntitySchema = {
  name: '${entityName}',
  nodeName: '', // the name of the brfc node
  versions: [
    {
      version: 1,
      id: "", // the brfc id of the node
      body: [ // the body of the brfc node

      ]
    }
  ]
}

export default ${entityName}Schema
`
  let useDir
  // 1. determine if user has src folder
  if (fs.existsSync('./src')) {
    if (!fs.existsSync('./src/metaid-entities')) {
      fs.mkdirSync('./src/metaid-entities')
    }
    useDir = './src/metaid-entities'
  } else {
    if (!fs.existsSync('./metaid-entities')) {
      fs.mkdirSync('./metaid-entities')
    }
    useDir = './metaid-entities'
  }

  fs.writeFileSync(`${useDir}/${entityName}.entity.ts`, entityTemplate)

  console.log(`🚀 ${entityName}.entity.ts created! 🚀`)
}

createEntity()
