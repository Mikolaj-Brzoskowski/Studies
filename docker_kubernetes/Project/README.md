# Bezpieczeństwo aplikacji webowych - projekt

## Nazwy klientów wraz z ich rolą oraz zastosowanym flow
- WebApp - Client - Authorization code grant
- Backend - Resource Owner - Client credentials grant
- API - Resource Server
- Keycloak - Authorization Server
- SingleWebApp - Client - Implicit Grant

Komponenty:
- Keycloak - serwer autoryzacyjny Keycloak
- API - Posiada enpointy chronione jak i ogólnie dostępne zarówno dla WebApp jak i Backendu
- WebApp - wywołuje endpointy GET z zabezpieczanego serwisu z API (zarówno zabezpieczony jak i niezabezpieczony endpoint).
- Backend - serwis odwołujący się do endpointów z zabezpieczanego serwisu z API. Wykorzystywany przez SingleWebApp.
- SingleWebApp


