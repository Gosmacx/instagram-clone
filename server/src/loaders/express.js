import express from 'express'
import cors from 'cors'

import routes from '../api/routes'

export default ({ app }) => {

  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }));
  app.use(routes)

}