import { useState } from "react"
import { RoleSelectScreen } from "./components/role-select-screen/role-select-screen"
import { PlayerScreen } from "./components/player-screen/player-screen"
import { ViewerScreen } from "./components/viewer-screen/viewer-screen"
import { WebRTC } from "./webrtc"

export type Role = "player" | "viewer" | undefined
export type Core = "fceumm_libretro" | "genesis_plus_gx_libretro" | "snes9x"

function App() {
  const [role, setRole] = useState<Role>()

  return (
    <>
      {!role && <RoleSelectScreen setRole={setRole} />}
      <WebRTC>
        {role === "player" && <PlayerScreen />}
        {role === "viewer" && <ViewerScreen />}
      </WebRTC>
    </>
  )
}

export default App
