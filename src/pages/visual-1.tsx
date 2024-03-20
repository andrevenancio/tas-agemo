import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { Controls } from "@/components/controls"
import { StackCard } from "@/components/stack-card"
import { RootState } from "@/state/store"
import { Step } from "@/types"

import styles from "@/styles/visuals.module.css"

// reference: https://dribbble.com/shots/23169978-Graph

export default function Page() {
  const [steps, setSteps] = useState<Step[]>([])
  const [expandedSteps, setExpandedSteps] = useState<number[]>([])

  const step = useSelector((state: RootState) => state.global.curStep)
  const lastStep = useSelector((state: RootState) => state.global.lastStep)

  useEffect(() => {
    fetch("/api/steps")
      .then((response) => response.json())
      .then((data) => {
        setSteps(data)
      })
  }, [])

  const handleCardClick = (uid: number, stack: boolean) => {
    if (stack) {
      if (expandedSteps.includes(uid)) {
        setExpandedSteps((prevExpandedSteps) =>
          prevExpandedSteps.filter((stepUid) => stepUid !== uid)
        )
      } else {
        setExpandedSteps((prevExpandedSteps) => [...prevExpandedSteps, uid])
      }
    }
  }

  const getExpandedStepsWithSubsteps = (steps: Step[]) => {
    let expandedStepsWithSubsteps: Step[] = []
    steps.forEach((step) => {
      expandedStepsWithSubsteps.push(step)
      if (expandedSteps.includes(step.uid) && step.steps) {
        expandedStepsWithSubsteps.push(...step.steps)
      }
    })
    return expandedStepsWithSubsteps
  }

  const viewData = getExpandedStepsWithSubsteps(steps)

  return (
    <>
      <Controls />
      <div className={styles.container}>
        <div className={styles.content}>
          {viewData.map((item, i) => (
            <StackCard
              key={i}
              {...item}
              step={`${item.uid}/${lastStep}`}
              icon={
                // !expandedSteps.includes(item.uid) &&
                !!item.steps && item.steps.length > 0
              }
              stack={
                !expandedSteps.includes(item.uid) &&
                !!item.steps &&
                item.steps.length > 0
              }
              selected={item.uid <= step}
              onClick={() => handleCardClick(item.uid, !!item.steps)}
            />
          ))}
        </div>
      </div>
    </>
  )
}
