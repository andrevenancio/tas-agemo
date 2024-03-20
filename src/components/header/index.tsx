import Image from "next/image"

import styles from "./styles.module.css"
const Profile = () => {
  return (
    <div className={styles.profile}>
      <Image src="/profile.jpg" alt="Andre" width={32} height={32} />
    </div>
  )
}

export const Header = () => {
  return (
    <header className={styles.container}>
      <Image src="/logo.svg" alt="Logo" width={168} height={28} />
      <Profile />
    </header>
  )
}
