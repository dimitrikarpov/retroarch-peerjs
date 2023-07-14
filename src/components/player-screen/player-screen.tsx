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

  const corePath = `/cores/${core}.js`

  console.log({ corePath })

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
            coreUrl={`/cores/${core}.js`}
          />
        </>
      )}
    </div>
  )
}
