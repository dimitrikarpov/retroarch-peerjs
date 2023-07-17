import { Retroarch } from "retroarch-react"
import { Core } from "@/App"
import { Overlay } from "./overlay/overlay"
import { type Retroarch as RetroarchCore } from "retroarch-core"

type Props = {
  core: Core
  rom: Uint8Array
  onStart?: (retroarch: RetroarchCore) => void
}

export const Emulator: React.FunctionComponent<Props> = ({
  rom,
  core,
  onStart,
}) => {
  const coreUrl = `https://cdn.jsdelivr.net/gh/dimitrikarpov/retroarch-peerjs/cores/${core}.js`

  return (
    <Retroarch
      containerClassName="relative max-h-[100dvh] max-w-[100dvw] aspect-[calc(800/600)]  mx-auto my-0"
      canvasBoxClassName="relative aspect-[calc(800/600)] max-h-full max-w-full"
      onStart={onStart}
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
  )
}
