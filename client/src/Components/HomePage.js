function HomePage() {
  return (
    <>
      <h1>HomePage</h1>
      <h5 style={{ textAlign: "start", marginLeft: 25 }}>
        Introduction{" "}
        <span style={{ fontStyle: "italic", fontSize: 10, color: "blue" }}>
          English version
        </span>
      </h5>

      <p>
        Health training skills, by integrating paramedical training, have a
        social responsibility to train all health students, future
        professionals, so that they can respond, with relevance and efficiency,
        to the needs of the health care system of our fellow citizens.<br></br>
        More broadly, digital health have taken a major role in disrupting the
        practices and organizations of the healthcare system.
        <br></br>
        Teaching digital health can only strengthen the skills of future
        professionals, create new professions and support innovation. Finally,
        digital health requires in-depth ethical reflection that must be
        included at the very heart of the university training course.{" "}
      </p>
      <img
        alt="introduction"
        src="http://localhost:5000/uploads/1728774024975.webp"
        style={{ width: 600 }}
      />

      <h5 style={{ textAlign: "start", marginLeft: 25 }}>
        Introduction{" "}
        <span style={{ fontStyle: "italic", fontSize: 10, color: "blue" }}>
          Version française
        </span>
      </h5>
      <p>
        En intégrant les formations paramédicales, les universités à composante
        santé ont la responsabilité sociale de former tous les étudiants en
        santé, futurs professionnels, pour qu’ils puissent répondre, avec
        pertinence et efficience, à l’offre de soins attendue de nos
        concitoyens.<br></br>
        Plus largement, la santé numérique ont pris une place majeure venant
        bouleverser les pratiques et les organisations du système de soins.{" "}
        <br></br>
        L’enseignement par et pour la recherche de la santé numérique ne peut
        que renforcer les compétences des futurs professionnels, faire émerger
        de nouveaux métiers comme soutenir l’innovation.<br></br> Enfin, la
        santé numérique impose des réflexions éthiques approfondies devant être
        incluses au cœur même du parcours de formation universitaire.{" "}
      </p>
    </>
  );
}

export default HomePage;
