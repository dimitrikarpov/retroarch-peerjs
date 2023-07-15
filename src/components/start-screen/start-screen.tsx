import { Core, Role } from "@/App"
import { Card } from "../ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Button } from "../ui/button"
import { ChangeEventHandler, useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog"
import { PlayerConnect } from "./player-connect"
import { ViewerConnect } from "./viewer-connect"
import { ViewerConnectDialog } from "./viewer-connect-dialog"
import { PlayerConnectDialog } from "./player-connect-dialog"

type Props = {
  rom: Uint8Array | undefined
  core: Core | undefined
  setRom: React.Dispatch<React.SetStateAction<Uint8Array | undefined>>
  setCore: React.Dispatch<React.SetStateAction<Core | undefined>>
  setRole: React.Dispatch<React.SetStateAction<Role | undefined>>
}

export const StartScreen: React.FunctionComponent<Props> = ({
  rom,
  core,
  setRom,
  setCore,
  setRole,
}) => {
  const onRomUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (!e.target.files?.[0]) return

    const file = e.target.files?.[0]
    const buffer = await file?.arrayBuffer()

    setRom(new Uint8Array(buffer))
  }

  const onCoreChange = (value: Core) => {
    setCore(value)
  }

  return (
    <div className="ml-auto mr-auto mt-24 w-fit">
      <Card>
        <div className="flex h-[500px] w-[550px] flex-col justify-between p-5">
          <div className="">
            <p className="text-base">
              Select ROM from Your local storage and choose proper platform.
              After game starts You can share gameplay
            </p>
            <p className="mt-2 text-base">
              If You want to connect as viewer click on appropriate button
            </p>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <div>Select ROM:</div>
              <div>
                <input
                  type="file"
                  onChange={onRomUpload}
                  className="focus:shadow-te-primary relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <div>Select Platform:</div>
              <div>
                <Select value={core} onValueChange={onCoreChange}>
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Select a platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="fceumm_libretro">
                        Nintendo Entartainemt System
                      </SelectItem>
                      <SelectItem value="genesis_plus_gx_libretro">
                        Sega Mega Drive
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <div>Do You want to stream the game?:</div>

              <PlayerConnectDialog onConnect={() => setRole("player")} />

              <p className="text-gray-600">not connected</p>
            </div>
          </div>

          <div className="flex justify-between">
            <ViewerConnectDialog onConnect={() => setRole("viewer")} />

            <Button onClick={() => setRole("offline")} disabled={!rom || !core}>
              Start Game
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
