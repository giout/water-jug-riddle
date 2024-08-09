import yaml from 'yamljs'

const filePath = 'docs/swagger.yaml'

export const swaggerDoc = yaml.load(filePath)