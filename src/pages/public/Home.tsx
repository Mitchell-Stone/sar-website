import React from 'react'
import { RouteComponentProps } from "@reach/router"
import Section from "../../components/website/Section"
import Landing from "../../components/website/Landing"
import About from "../../components/website/About"
import Projects from "../../components/website/Projects"
import ContactUs from "../../components/website/ContactUs"
import Footer from "../../components/layout/Footer"


export default function Home(props: RouteComponentProps) {
  return (
    <div>
      <Section height='80vh' type="secondary">
        <Landing />
      </Section>
      <Section height='50vh' type="primary">
        <About />
      </Section>
      <Section height='70vh' type="secondary">
        <Projects />
      </Section>
      <Section height='50vh' type="primary">
        <ContactUs />
      </Section>
      <Section height='30vh' type="secondary">
        <Footer />
      </Section>
    </div>
  )
}
