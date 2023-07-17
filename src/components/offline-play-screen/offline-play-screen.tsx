import { Retroarch } from "retroarch-react"
import { Core } from "@/App"
import { Overlay } from "../overlay/overlay"

type Props = {
  core: Core
  rom: Uint8Array
}

export const OfflinePlayScreen: React.FunctionComponent<Props> = ({
  core,
  rom,
}) => {
  const coreUrl = `https://cdn.jsdelivr.net/gh/dimitrikarpov/retroarch-peerjs/cores/${core}.js`

  return (
    <div
      style={{
        backgroundImage:
          "radial-gradient( circle farthest-corner at 10% 20%,  rgba(151,10,130,1) 0%, rgba(33,33,33,1) 100.2% )",
      }}
    >
      <Retroarch
        containerClassName="relative max-h-[100dvh] max-w-[100dvw] aspect-[calc(800/600)]  mx-auto my-0"
        canvasBoxClassName="relative aspect-[calc(800/600)] max-h-full max-w-full"
      >
        <Retroarch.Overlay
          className="absolute inset-0 flex flex-col justify-end"
          visibleClassName="cursor-default opacity-100"
          hiddenClassName="cursor-none opacity-0"
        >
          <Overlay coreName={core} />
        </Retroarch.Overlay>

        <Retroarch.StartScreen className="absolute inset-0 flex h-full items-center justify-center">
          <Retroarch.StartScreen.Button className="ease focus:shadow-outline m-2 select-none rounded-md border border-indigo-500 bg-indigo-500 px-4 py-2 text-white transition duration-500 hover:bg-indigo-600 focus:outline-none" />
        </Retroarch.StartScreen>

        <Retroarch.LoaderScreen
          className="absolute inset-0 flex h-full items-center justify-center"
          coreUrl={coreUrl}
          romBinary={rom}
          loadOnMount
        >
          <Retroarch.LoaderScreen.Progress />
        </Retroarch.LoaderScreen>
      </Retroarch>
    </div>
  )
}

// background-image: linear-gradient( 109.6deg,  rgba(177,173,219,1) 11.2%, rgba(245,226,226,1) 91.1% );
// background-image: linear-gradient( 109.6deg,  rgba(238,58,136,1) 11.2%, rgba(128,162,245,1) 91.1% );
// background-image: linear-gradient( 65.4deg,  rgba(56,248,249,1) -9.1%, rgba(213,141,240,1) 48%, rgba(249,56,152,1) 111.1% );
// background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(151,10,130,1) 0%, rgba(33,33,33,1) 100.2% );
