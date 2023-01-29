package ai.cloud;

import com.microsoft.cognitiveservices.speech.SpeechRecognitionResult;
import com.microsoft.cognitiveservices.speech.SpeechConfig;
import com.microsoft.cognitiveservices.speech.SpeechRecognizer;
import com.microsoft.cognitiveservices.speech.audio.AudioConfig;
import com.microsoft.cognitiveservices.speech.*;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.http.HttpClient;
import java.util.Objects;

public class AzureStt {

    private static final Logger LOGGER = LoggerFactory.getLogger(AzureStt.class);
    private static final String SPEECH_KEY = Objects.requireNonNull(
            System.getenv("SPEECH_KEY"),
            "Missing environment variable SPEECH_KEY");
    private static final String SPEECH_REGION = Objects.requireNonNull(
            System.getenv("SPEECH_REGION"),
            "Missing environment variable SPEECH_REGION");

    public SpeechRecognitionResult speechToText(String sourceFile, String sourceLanguage) throws ExecutionException, InterruptedException {
        SpeechConfig speechConfig = SpeechConfig.fromSubscription(SPEECH_KEY, SPEECH_REGION);
        AudioConfig audioConfig = AudioConfig.fromWavFileInput(sourceFile);
        SpeechRecognizer recognizer = new SpeechRecognizer(speechConfig, audioConfig);

        Future<SpeechRecognitionResult> task = recognizer.recognizeOnceAsync();
        SpeechRecognitionResult result = task.get();

        if (result.getReason() == ResultReason.RecognizedSpeech) {
            System.out.println("RECOGNIZED: Text=" + result.getText());
        } else if (result.getReason() == ResultReason.NoMatch) {
            System.out.println("NOMATCH: Speech could not be recognized.");
        } else if (result.getReason() == ResultReason.Canceled) {
            CancellationDetails cancellation = CancellationDetails.fromResult(result);
            System.out.println("CANCELED: Reason=" + cancellation.getReason());

            if (cancellation.getReason() == CancellationReason.Error) {
                System.out.println("CANCELED: ErrorCode=" + cancellation.getErrorCode());
                System.out.println("CANCELED: ErrorDetails=" + cancellation.getErrorDetails());
                System.out.println("CANCELED: Did you set the speech resource key and region values?");
            }
        }
        return result;
    }



}
