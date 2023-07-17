import { useConnection } from "@/webrtc"
import { useEffect, useRef } from "react"

export const ViewerScreen = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { peerRef } = useConnection()

  useEffect(() => {
    const subscribeOnCall = () => {
      if (!peerRef.current || !videoRef.current) return

      console.log("subscribeOnCall")

      peerRef.current.on("call", (call) => {
        console.log("peer.on.call")

        call.on("stream", (stream) => {
          console.log("call.on.stream", { stream })

          videoRef.current!.srcObject = stream
          setTimeout(() => {
            videoRef.current?.play()
          })
        })

        call.answer()
      })
    }

    subscribeOnCall()
  }, [])

  return (
    <div
      className="grid items-center justify-center h-[100dvh] w-[100dvw]"
      style={{
        backgroundImage:
          "radial-gradient( circle farthest-corner at 10% 20%,  rgba(90,92,106,1) 0%, rgba(32,45,58,1) 81.3% )",
      }}
    >
      <video ref={videoRef} className="w-[800px] h-[600px]"></video>
    </div>
  )
}

// background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(90,92,106,1) 0%, rgba(32,45,58,1) 81.3% );
