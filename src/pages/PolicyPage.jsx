import '../css/policy.css'
import PolicySection from '../components/PolicySection'


export default function Policy({ Policy }){

  return (
    <main className="container">
      <h1>{Policy.title}</h1>
      <div className="last-updated">{Policy.date}</div>

      <p className="intro-text">{Policy.introText}</p>

      {Policy.policyPoints.map((section, index) => (
        <PolicySection
          key={index}
          Point={section.Point}
          Content={section.content || section.Content}
        />
      ))}
    </main>
  );
}