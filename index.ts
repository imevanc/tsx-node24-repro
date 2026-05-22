import Fastify from 'fastify'

const app = Fastify()
console.log('Fastify loaded:', typeof app.listen)
