import { Suspense } from 'react'
import ClaimUrl from './components/ClaimUrl'
import HeroIllustration from './components/HeroIllustration'
import LoginModal from './components/LoginModal/LoginModal'
import SignupModal from './components/SignupModal/SignupModal'

export default function Home() {
  return (
    <section className="flex min-h-svh flex-col-reverse items-center justify-center gap-8 px-6 py-16 sm:flex-row sm:justify-between sm:px-16 sm:py-20">
      <ClaimUrl />
      <Suspense>
        <SignupModal />
      </Suspense>
      <Suspense>
        <LoginModal />
      </Suspense>
      <HeroIllustration />
    </section>
  )
}
