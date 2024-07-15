import ClaimUrl from './components/ClaimUrl'
import HeroIllustration from './components/HeroIllustration'

export default function Home() {
  return (
    <section className="flex min-h-svh flex-col-reverse items-center justify-center gap-8 px-5 md:flex-row md:justify-between md:px-16">
      <ClaimUrl />
      <HeroIllustration />
    </section>
  )
}
