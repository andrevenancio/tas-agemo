import { ReactNode, useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { setStep } from "@/state/reducers/global"
import { RootState } from "@/state/store"

import styles from "./styles.module.css"

const delay = (milliseconds: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}

const Button = ({
  children,
  onClick,
}: {
  children?: ReactNode
  onClick?: () => void
}) => {
  return (
    <div className={styles.button} onClick={onClick}>
      {children}
    </div>
  )
}

export const Controls = () => {
  const [playMode, setPlayMode] = useState(false)
  const step = useSelector((state: RootState) => state.global.curStep)
  const lastStep = useSelector((state: RootState) => state.global.lastStep)
  const dispatch = useDispatch()

  const changeStepWithDelay = useCallback(
    async (nextStep: number, initialDelay: number) => {
      if (nextStep > lastStep) {
        setPlayMode(false)
      } else {
        await delay(initialDelay)
        dispatch(setStep(nextStep))
      }
    },
    [dispatch, lastStep]
  )

  useEffect(() => {
    if (playMode) {
      changeStepWithDelay(step + 1, step === -1 ? 0 : 100 + Math.random() * 500)
    }
  }, [playMode, step, changeStepWithDelay])

  const handleStep = (increment: number) => {
    changeStepWithDelay(step + increment, 0)
  }

  const togglePlay = () => {
    setPlayMode(!playMode)
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.progress}
        style={{ width: `${(step / lastStep) * 100}%` }}
      />
      <div className={styles.controls}>
        <Button onClick={() => handleStep(-1)}>
          <i>skip_previous</i>
        </Button>
        <Button onClick={() => handleStep(+1)}>
          <i>skip_next</i>
        </Button>
        <Button onClick={togglePlay}>
          {playMode ? <i>pause</i> : <i>play_arrow</i>}
        </Button>
      </div>
    </div>
  )
}
