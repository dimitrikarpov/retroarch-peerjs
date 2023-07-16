import { useState } from "react"
import { WebRTC } from "./webrtc"
import { StartScreen } from "./components/start-screen/start-screen"
import { NewPlayerScreen } from "./components/start-screen/new-player-screen"
import { NewViewerScreen } from "./components/start-screen/new-viewer-screen"

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
      <WebRTC>
        {!role && (
          <StartScreen
            rom={rom}
            core={core}
            setRom={setRom}
            setCore={setCore}
            setRole={setRole}
          />
        )}
        {role === "player" && <NewPlayerScreen rom={rom!} core={core!} />}
        {role === "viewer" && <NewViewerScreen />}
      </WebRTC>
    </>
  )
}

export default App
