import { useState } from "react"
import { PlayerScreen } from "./components/player-screen/player-screen"
import { ViewerScreen } from "./components/viewer-screen/viewer-screen"
import { WebRTC } from "./webrtc"
import { StartScreen } from "./components/start-screen/start-screen"

export type Role = "player" | "viewer" | "offline"
export type Core =
  | "fceumm_libretro"
  | "genesis_plus_gx_libretro"
  | "snes9x_libretro"

function App() {
  const [role, setRole] = useState<Role>()
  const [rom, setRom] = useState<Uint8Array>()
  const [core, setCore] = useState<Core>()

  return (
    <>
      {!role && (
        <StartScreen
          rom={rom}
          core={core}
          setRom={setRom}
          setCore={setCore}
          setRole={setRole}
        />
      )}
      <WebRTC>
        {role === "player" && <PlayerScreen />}
        {role === "viewer" && <ViewerScreen />}
      </WebRTC>
    </>
  )
}

export default App
