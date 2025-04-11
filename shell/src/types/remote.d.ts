// types/remoteApp.d.ts
declare module 'remoteApp/Button' {
  import { FC } from 'react'
  const Button: FC<{ label: string }>
  export default Button
}

declare module 'remoteApp/store' {
  import { atom } from 'jotai'
  const useCount: atom<number>
  export default useCount
}
