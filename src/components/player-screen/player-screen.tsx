import { type Retroarch as RetroarchCore } from "retroarch-core"
// import { Emulator } from "./emulator"
import { Core } from "@/App"
import { useConnection } from "@/webrtc"
import { Emulator } from "../emulator/emulator"

type Props = {
  rom: Uint8Array
  core: Core
}

export const PlayerScreen: React.FunctionComponent<Props> = ({ rom, core }) => {
  const { peerRef, dataConnectionRef } = useConnection()

  const onStart = (retroarch: RetroarchCore) => {
    console.log("EMULATOR STARTED")

    if (!peerRef.current || !dataConnectionRef.current) return

    const viewerPeerId = dataConnectionRef.current.peer

    const canvasEl = retroarch.module.canvas
    const videoStream = canvasEl.captureStream(60)
    // @ts-ignore
    const audioStream = retroarch.module.RA.xdest.stream as MediaStream
    const stream = new MediaStream()
    videoStream.getTracks().forEach((track) => stream.addTrack(track))
    audioStream.getTracks().forEach((track) => stream.addTrack(track))

    stream
      .getVideoTracks()[0]
      .applyConstraints({ width: 800, height: 600, frameRate: 60 })

    peerRef.current.call(viewerPeerId, stream)
  }

  return (
    <div
      style={{
        backgroundImage:
          "radial-gradient( circle farthest-corner at 10% 20%,  rgba(151,10,130,1) 0%, rgba(33,33,33,1) 100.2% )",
      }}
    >
      <Emulator core={core} rom={rom} onStart={onStart} />
    </div>
  )
}
