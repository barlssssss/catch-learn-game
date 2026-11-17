import { createFileRoute } from '@tanstack/react-router'
import { Game } from '@/game/Game'
import '@/game/game.css'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return <Game />
}
