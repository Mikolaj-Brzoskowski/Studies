---
title: Chmurowe usługi AI
subtitle: Webhooki - ćwiczenia
author: Piotr JANKOWSKI
papersize: a4
lang: pl-PL
...

# Webhooki

## Wymagania

1. Klucze uwierzytelniające nie mogą w żadnym momencie być umieszczone w repozytorium. Jeśli wynikowe pliki zawierają takie dane, usuń je ręcznie przed skomitowaniem.
2. Klucze uwierzytelniające uzyskasz od prowadzącego podczas zajęć.

## Cel zadania

Celem zadania jest uruchomienie webhooka otrzymującego informacje o zdarzeniach z usługi Speech Service w Azure.

## Kontekst

Aplikacja składa się z:

1. części symulującej tworzenie plików dźwiękowych zawierających wypowiadane słowa
2. części reagującej na zdarzenia przetworzenia plików dźwiękowych na tekst (STT, speech-to-text)

Pierwsza część ma również za zadanie uruchamiać procesy batchowe w Azure Speech Service (STT).

## Dokumentacja webhooków w usłudze Speech w Azure

Zapoznaj się z dokumentacją batchowego przetwarzania STT w Azure <https://learn.microsoft.com/en-us/azure/cognitive-services/speech-service/batch-transcription>.

Zapoznaj się z dokumentacją REST API <https://eastus.dev.cognitive.microsoft.com/docs/services/speech-to-text-api-v3-1/operations/WebHooks_Create>.

### Bezpieczeństwo

Zwróć uwagę na zastosowane mechanizmy bezpieczeństwa.

## Aplikacja

Zapoznaj się z aplikacją zawierającą webhook. Uruchom test webhooka w `src/test/java`.

Uruchom aplikację. Sprawdź ręcznie działanie endpointa webhooka.

## Rejestracja webhooka w Azure

**UWAGA**: ta część ćwiczenia może być trudniejsza do przeprowadzenia. Wymaga klucza API oraz możliwości publicznego wystawienia endpointa webhooka. Śledź uważnie proces wykonywany przez prowadzącego.

Uruchom tunel, aby uzyskać publiczny dostęp do endpointa webhooka (ngrok, localtunnel).

Zarejestruj webhook w Azure.

Wykonej testowy batch job i sprawdź rezultaty.

Sprawdź, czy endpoint webhooka otrzymał powiadomienia o zdarzeniach w usłudze w Azure.

## Rezultaty

Zamodeluj architekturę przedstawionego rozwiązania w sposób graficzny. Technika dowolna.

Możesz, ale nie musisz, użyć formalną notację, np. UML, ArchiMate, C4 models itp.

Plik wynikowy wkomituj do swojego repozytorium.
