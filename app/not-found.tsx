import { Actions } from "./ui";
import PageHero from "./page-hero";
import PageFrame from "./page-frame";
export default function NotFound() {
  return <PageFrame slug="not-found"><PageHero slug="not-found"><div className="page-hero-copy"><h1>Page introuvable</h1><p><a href="/">Retour à l’accueil</a></p><Actions/></div></PageHero></PageFrame>;
}
