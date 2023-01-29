package ai.cloud;

import com.microsoft.cognitiveservices.speech.SpeechRecognitionResult;
import org.junit.jupiter.api.Test;

import java.util.concurrent.ExecutionException;

import static org.assertj.core.api.Assertions.assertThat;

class AzureSttTest {

    @Test
    void shouldTranscribeSpeech() throws ExecutionException, InterruptedException {
        // given
        AzureStt underTest = new AzureStt();

        // when
        SpeechRecognitionResult result = underTest.speechToText(
                "src/test/resources/Martin_Sheen_BBC_Radio4_Desert_Island_Discs_3_April_2011_b00zzn2c.wav",
                "en-US"
        );

        // then
        assertThat(result.getText())
                .containsIgnoringCase("we had an awful lot of interest in the show")
                .containsIgnoringCase("but we were the kind of the parallel White House at the time")
                .containsIgnoringCase("and then the Bush administration came in");
    }

    @Test
    void shouldTranscribeSpeech2() throws ExecutionException, InterruptedException {
        // given
        AzureStt underTest = new AzureStt();

        // when
        SpeechRecognitionResult result = underTest.speechToText(
                "src/test/resources/Cytat-Byc-moze-szkola_Eco.wav",
                "en-US"
        );

        // then
        assertThat(result.getText())
                .containsIgnoringCase("być może szkoła nie powinna już uczyć")
                .containsIgnoringCase("tylko właśnie jak filtrować informacje")
                .containsIgnoringCase("ten który potrafi ją znaleźć w ciągu minuty");
    }
}
