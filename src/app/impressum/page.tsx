import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum und rechtliche Angaben.',
}

export default function ImpressumPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-10">Impressum</h1>

        <div className="space-y-10 text-white/80 text-sm leading-relaxed">
          <section>
            <p className="font-semibold text-white text-base mb-2">Studio Weblix</p>
            <p className="mb-1">Brodkorbweg 62</p>
            <p className="mb-4">87437 Kempten</p>
            <p className="font-medium text-white mt-4 mb-2">Kontakt</p>
            <p className="mb-1">Tel: 0176 45865595</p>
            <p className="mb-1">E-Mail: studioweblix@gmail.com</p>
            <p>www.studioweblix.de</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Vertretungsberechtigter</h2>
            <p>Ismail Eryilmaz</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Bankverbindung</h2>
            <p className="mb-1">Sparkasse</p>
            <p className="mb-1">IBAN: DE97 0000 0515 4443 13</p>
            <p>BIC: BYLADEM1ALG</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Urheberrecht</h2>
            <p className="mb-3">
              Falls nicht anders angegeben, unterliegen alle Seiten dieses Webangebotes dem Urheberrecht (Copyright). Dies gilt insbesondere für Texte, Bilder, Grafiken und Style-Dateien, einschließlich deren Anordnung auf den Websites.
            </p>
            <p className="mb-3">
              Eine Vervielfältigung oder Verwendung von Websites (oder von Teilen daraus) in anderen elektronischen oder gedruckten Publikationen und deren Veröffentlichung (auch im Internet) ist nur nach vorheriger Genehmigung gestattet.
            </p>
            <p>
              Weiterhin können Bilder, Grafiken, Text- oder sonstige Dateien ganz oder teilweise dem Urheberrecht Dritter unterliegen. Alle innerhalb des Internetangebotes genannten und ggf. durch Dritte geschützten Marken- und Warenzeichen unterliegen uneingeschränkt den Bestimmungen des jeweils gültigen Kennzeichenrechts und den Besitzrechten der jeweiligen eingetragenen Eigentümer. Allein aufgrund der bloßen Nennung in unserem Internetangebot ist nicht der Schluss zu ziehen, dass Markenzeichen nicht durch Rechte Dritter geschützt sind.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Haftungsausschluss</h2>
            <p className="mb-3">
              Der Autor hat alle in seinem Bereich bereitgestellten Informationen nach bestem Wissen und Gewissen erarbeitet und geprüft. Jedoch übernimmt der Autor keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der bereitgestellten Informationen. Haftungsansprüche gegen den Autor, welche sich auf Schäden materieller oder ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen, sofern seitens des Autors kein nachweislich vorsätzliches oder grob fahrlässiges Verschulden vorliegt.
            </p>
            <p>
              Alle Angebote sind freibleibend und unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Verweise und Links (Disclaimer)</h2>
            <p>
              Bei direkten oder indirekten Verweisen auf fremde Websites (&quot;Hyperlinks&quot;), die außerhalb des Verantwortungsbereiches des Autors liegen, würde eine Haftungsverpflichtung ausschließlich in dem Fall in Kraft treten, in dem der Autor von den Inhalten Kenntnis hat und es ihm technisch möglich und zumutbar wäre, die Nutzung im Falle rechtswidriger Inhalte zu verhindern.
            </p>
            <p className="mt-3">
              Der Autor erklärt hiermit ausdrücklich, dass zum Zeitpunkt der Linksetzung keine illegalen Inhalte auf den zu verlinkenden Seiten erkennbar waren. Auf die aktuelle und zukünftige Gestaltung, die Inhalte oder die Urheberschaft der gelinkten/verknüpften Seiten hat der Autor keinerlei Einfluss. Deshalb distanziert er sich hiermit ausdrücklich von allen Inhalten aller gelinkten/verknüpften Seiten, die nach der Linksetzung verändert wurden. Diese Feststellung gilt für alle innerhalb des eigenen Internetangebotes gesetzten Links und Verweise sowie für Fremdeinträge in vom Autor eingerichteten Gästebüchern, Diskussionsforen und Mailinglisten. Für illegale, fehlerhafte oder unvollständige Inhalte und insbesondere für Schäden, die aus der Nutzung oder Nichtnutzung solcherart dargebotener Informationen entstehen, haftet allein der Anbieter der Seite, auf welche verwiesen wurde, nicht derjenige, der über Links auf die jeweilige Veröffentlichung lediglich verweist.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
