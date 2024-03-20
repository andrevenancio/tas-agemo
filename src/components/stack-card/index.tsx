import styles from "./styles.module.css"

type StackCardTypes = {
  title: string
  description: string
  step: string
  color?: string
  icon?: boolean
  stack?: boolean
  selected?: boolean
  onClick?: () => void
}

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}

export const StackCard = ({
  title,
  description,
  step,
  color,
  icon,
  stack,
  selected,
  onClick,
}: StackCardTypes) => {
  return (
    <div
      className={`${styles.card} ${selected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <div
        className={styles.stacks}
        style={{
          ...(color && { "--card-custom-color": color }),
          cursor: stack ? "pointer" : "auto",
        }}
      >
        {stack && (
          <div className={styles.stacks}>
            <div className={styles.stack}></div>
            <div className={styles.stack}></div>
            <div className={styles.stack}></div>
          </div>
        )}

        <div className={styles.content}>
          <p className={styles.title}>{title}</p>
          <p className={styles.body}>{description}</p>
          <p className={styles.step}>{step}</p>
          {icon && (
            <span className={styles.icon}>
              <i>layers</i>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
