//in src/AlbumTitle.test.jsx
/*
    @jest-environment jsdom
*/ 
import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { AlbumTitle } from './album'

const server = setupServer(
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.json({greeting: 'hello there'}))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays greeting', async () => {
  render(<AlbumTitle />)

  //fireEvent.click(screen.getByText('Load Greeting'))

  //await screen.findByRole('Titulo')

  expect(screen.getByRole('select')).toHaveTextContent('Post')
})
