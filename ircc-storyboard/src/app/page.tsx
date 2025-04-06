import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { HowItWorksSection } from '@/components/HowItWorksSection'
import { EmailSignup } from '@/components/EmailSignup'
import { Footer } from '@/components/Footer'
import { NavigationCards } from '@/components/NavigationCards'
 // make sure it's a default export or adjust accordingly
import ClientOnly from '@/components/ClientOnly'

export default function HomePage() {
  return (
    <main className="w-full">
      <HeroSection />

      <ClientOnly>
        <NavigationCards />
      </ClientOnly>

      <AboutSection />
      <HowItWorksSection />
      <EmailSignup />
      <Footer />
    </main>
  )
}
