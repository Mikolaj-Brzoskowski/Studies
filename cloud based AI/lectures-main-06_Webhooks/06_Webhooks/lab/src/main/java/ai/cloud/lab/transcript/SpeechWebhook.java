package ai.cloud.lab.transcript;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
class SpeechWebhook {

    @PostMapping("/speech-webhook")
    ResponseEntity<String> speechWebhook(
            @RequestParam(required = false) String validationToken,
            @RequestHeader HttpHeaders headers
    ) {
        if (null != validationToken) {
            System.out.println("validationToken = " + validationToken);
            return ResponseEntity.ok(validationToken);
        }

        validateSignature(headers.getFirst("X-MicrosoftSpeechServices-Signature"));

        processEvent(headers.getFirst("X-MicrosoftSpeechServices-Event"));

        return ResponseEntity.noContent().build();
    }

    private void processEvent(String eventName) {
        System.out.println("Event: " + eventName);
        // TODO do something useful ;)
    }

    private boolean validateSignature(String signature) {
        System.out.println(signature);
        // TODO implement real validation ;)
        return true;
    }
}
