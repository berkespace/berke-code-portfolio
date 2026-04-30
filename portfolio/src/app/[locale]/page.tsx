import { Blog } from '@/components/sections/Blog'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { Experience } from '@/components/sections/Experience'
import { FAQ } from '@/components/sections/FAQ'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Testimonials } from '@/components/sections/Testimonials'
import { Tools } from '@/components/sections/Tools'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Projects showViewAll />
      <Experience experiences={[]} />
      <Tools />
      <Testimonials />
      <Blog />
      <FAQ />
      <ContactCTA />
    </main>
  )
}
