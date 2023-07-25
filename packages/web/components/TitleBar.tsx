import Icon from './Icon'
import { IpcChannels } from '@/shared/IpcChannels'
import useIpcRenderer from '@/web/hooks/useIpcRenderer'
import { useState } from 'react'
import { css, cx } from '@emotion/css'
import uiStates from '../states/uiStates'

const Controls = () => {
  const [isMaximized, setIsMaximized] = useState(false)

  useIpcRenderer(IpcChannels.IsMaximized, (e, value) => {
    setIsMaximized(value)
    uiStates.fullscreen = value
  })

  const minimize = () => {
    window.ipcRenderer?.send(IpcChannels.Minimize)
  }

  const maxRestore = () => {
    window.ipcRenderer?.send(IpcChannels.MaximizeOrUnmaximize)
  }

  const close = () => {
    window.ipcRenderer?.send(IpcChannels.Close)
  }

  const classNames = cx(
    'flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition duration-400',
    css`
      height: 28px;
      width: 48px;
      border-radius: 4px;
    `
  )

  return (
    <div className='app-region-no-drag flex h-full items-center'>
      <button onClick={minimize} className={classNames}>
        <Icon className='h-3 w-3' name='windows-minimize' />
      </button>
      <button onClick={maxRestore} className={classNames}>
        <Icon className='h-3 w-3' name={isMaximized ? 'windows-un-maximize' : 'windows-maximize'} />
      </button>
      <button
        onClick={close}
        className={cx(
          classNames,
          css`
            border-radius: 4px 22px 4px 4px;
            margin-right: 4px;
          `
        )}
      >
        <Icon className='h-3 w-3' name='windows-close' />
      </button>
    </div>
  )
}

const TitleBar = () => {
  return (
    <div className='app-region-drag fixed z-30'>
      <div className='flex h-9 w-screen items-center justify-between'>
        <div></div>
        <Controls />
      </div>
    </div>
  )
}

export default TitleBar
