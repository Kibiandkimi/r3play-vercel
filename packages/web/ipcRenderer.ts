import player from '@/web/states/player'
import { IpcChannels, IpcChannelsReturns, IpcChannelsParams } from '@/shared/IpcChannels'
import uiStates from './states/uiStates'

const on = <T extends keyof IpcChannelsParams>(
  channel: T,
  listener: (event: any, params: IpcChannelsReturns[T]) => void
) => {
  window.ipcRenderer?.on(channel, listener)
}

export function ipcRenderer() {
  on(IpcChannels.Play, () => {
    player.play(true)
  })

  on(IpcChannels.Pause, () => {
    player.pause(true)
  })

  on(IpcChannels.PlayOrPause, () => {
    player.playOrPause()
  })

  on(IpcChannels.Next, () => {
    player.nextTrack()
  })

  on(IpcChannels.Previous, () => {
    player.prevTrack()
  })

  on(IpcChannels.Repeat, (e, mode) => {
    player.repeatMode = mode
  })

  on(IpcChannels.FullscreenStateChange, (e, isFullscreen) => {
    uiStates.fullscreen = isFullscreen
  })
}
