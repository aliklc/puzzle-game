// app/game/GameTab.tsx

import AuthClientUI from './AuthClientUI'

type AuthTabProps = {
    onAuthChange?: () => void
}

export default function AuthTab({ onAuthChange }: AuthTabProps) {
    return <AuthClientUI onAuthChange={onAuthChange} />
}
