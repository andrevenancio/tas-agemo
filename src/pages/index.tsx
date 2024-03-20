import Link from "next/link"

import styles from "@/styles/Home.module.css"

export default function Home() {
  return (
    <div className={styles.main}>
      <Link href="/visual-1">Visual 1</Link>
      <Link href="/visual-2">Visual 2</Link>
      <Link href="/visual-3">Visual 3</Link>
    </div>
  )
}
