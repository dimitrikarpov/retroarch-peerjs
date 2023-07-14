import { useEffect, useRef, useState } from "react"
import { useConnection } from "../../webrtc"
import Peer from "peerjs"
import { Core } from "../../App"
import { RomSelect } from "./rom-select"
import { type Retroarch as RetroarchCore } from "retroarch-core"
import { Emulator } from "./emulator"

export const PlayerScreen = () => {
  const { peerRef, dataConnectionRef } = useConnection()
  const [peerId, setPeerId] = useState<string>()
  const [viewerPeerId, setViewerPeerId] = useState<string>()
  const [dataConnectionReady, setDataConnectionReady] = useState(false)
  //
  const [rom, setRom] = useState<Uint8Array>()
  const [core, setCore] = useState<Core>("fceumm_libretro")
  const [isRomSelected, setIsRomSelected] = useState(false)
  const retroarchRef = useRef<RetroarchCore | null>(null)

  useEffect(() => {
    peerRef.current = new Peer()

    peerRef.current.on("open", function (id) {
      setPeerId(id)
    })

    peerRef.current.on("connection", (conn) => {
      console.log("on.connection", { conn })

      dataConnectionRef.current = conn

      setViewerPeerId(conn.peer)

      conn.on("data", (data) => {
        console.log("connection.on.data", { data })
      })

      conn.on("open", () => {
        console.log("on.open")
      })

      setDataConnectionReady(true)
    })

    console.log({ peerRef })
  }, [])

  const onSendSomething = () => {
    dataConnectionRef.current!.send(Math.random())
  }

  const onStreamClick = () => {
    if (!retroarchRef.current || !peerRef.current || !viewerPeerId) return

    const canvasEl = retroarchRef.current.module.canvas
    const videoStream = canvasEl.captureStream(60)
    // @ts-ignore
    const audioStream = retroarchRef.current.module.RA.xdest
      .stream as MediaStream
    const stream = new MediaStream()
    videoStream.getTracks().forEach((track) => stream.addTrack(track))
    audioStream.getTracks().forEach((track) => stream.addTrack(track))

    var call = peerRef.current.call(viewerPeerId, stream)
  }

  const coreUrl = `https://cdn.jsdelivr.net/gh/dimitrikarpov/retroarch-peerjs/cores/${core}.js`

  console.log({ viewerPeerId })

  return (
    <div>
      <h2>Player screen</h2>
      {peerId && <p>My peer ID is: {peerId}</p>}
      {dataConnectionReady && (
        <button onClick={onSendSomething}>send something</button>
      )}
      {dataConnectionReady && (
        <RomSelect
          core={core}
          setCore={setCore}
          setRom={setRom}
          setIsRomSelected={setIsRomSelected}
        />
      )}
      {isRomSelected && (
        <>
          <h1>ready to start emulator</h1>
          <Emulator
            retroarchRef={retroarchRef}
            romBinary={rom!}
            coreUrl={coreUrl}
          />

          <button onClick={onStreamClick}>stream!</button>
        </>
      )}
    </div>
  )
}
