# Stripe einrichten

Damit die "Zahlen"-Buttons funktionieren, müssen Sie einen Stripe-Account einrichten.

## Schritte

1. **Stripe-Account erstellen**  
   Registrieren Sie sich unter: https://dashboard.stripe.com/register

2. **API-Schlüssel holen**  
   - Öffnen Sie https://dashboard.stripe.com/apikeys  
   - Kopieren Sie den **Secret key** (beginnt mit `sk_test_` für Testmodus)

3. **In Ihr Projekt eintragen**  
   - Öffnen Sie die Datei `.env.local` im Projektordner  
   - Fügen Sie folgende Zeile hinzu (ersetzen Sie den Platzhalter durch Ihren Schlüssel):

   ```
   STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
   ```

4. **Server neu starten**  
   Nach dem Ändern von `.env.local` den Dev-Server neu starten:
   ```bash
   npm run dev
   ```

## Testzahlungen

Im **Testmodus** können Sie mit Stripe-Testkarten zahlen, z.B.:
- **Erfolgreiche Zahlung:** `4242 4242 4242 4242`
- Beliebige zukünftige Ablaufdaten und CVC

Weitere Testkarten: https://stripe.com/docs/testing

## Live-Modus

Für echte Zahlungen:
- Verwenden Sie den **Live Secret Key** (`sk_live_...`) statt des Test-Keys
- Aktivieren Sie Ihren Stripe-Account vollständig (Identitätsprüfung)
