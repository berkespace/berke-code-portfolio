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
      <div data-speed="0.92">
        <Experience experiences={[]} />
      </div>
      <div data-speed="0.97">
        <Tools />
      </div>
      <div data-speed="0.94">
        <Testimonials />
      </div>
      <div data-speed="0.96">
        <Blog />
      </div>
      <div data-speed="0.93">
        <FAQ />
      </div>
      <div data-speed="0.98">
        <ContactCTA />
      </div>
    </main>
  )
}
